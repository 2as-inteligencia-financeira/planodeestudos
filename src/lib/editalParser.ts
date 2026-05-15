// Transforma um arquivo .ts de edital em objeto de dados.
// Suporta sedes2026_data.ts (Quadrix) e tcu_ce_data.ts (Cebraspe/FGV).

export interface ParsedEditalData {
  edital: Record<string, unknown>
  cronograma: unknown[]
  fases: unknown[]
  benchmarks: Record<string, unknown>
  quadrixPerfil: Record<string, unknown>
  config?: Record<string, unknown>     // presente em planos PRÉ-EDITAL (ex: TCU)
  bancaPerfil?: Record<string, unknown> // substitui quadrixPerfil quando banca != Quadrix
}

/**
 * Remove blocos interface/type que podem ter braces aninhadas.
 * Percorre caractere a caractere contando { } para achar o fim exato.
 */
function removeInterfaceAndTypeBlocks(code: string): string {
  const result: string[] = []
  let i = 0
  while (i < code.length) {
    // Detectar "export interface Foo {" ou "interface Foo {"
    const kw = /(export\s+)?interface\s+\w+[^{]*\{/.exec(code.slice(i))
    if (!kw) {
      result.push(code.slice(i))
      break
    }

    const relStart = kw.index
    const absStart = i + relStart
    // Check that the keyword is NOT inside a string (simple heuristic: starts at col 0 or after whitespace)
    // Only remove if keyword appears at start of the slice (meaning we advanced correctly)
    if (relStart > 0) {
      result.push(code.slice(i, absStart))
    } else {
      // absStart === i, nothing to push
    }

    // Find the opening brace position
    const openBrace = absStart + kw[0].length - 1 // last char of kw[0] is '{'

    // Walk braces
    let depth = 0
    let j = openBrace
    while (j < code.length) {
      const c = code[j]
      if (c === '{') depth++
      else if (c === '}') {
        depth--
        if (depth === 0) { j++; break }
      }
      j++
    }
    i = j // skip past the interface block
  }
  return result.join('')
}

export function parseEditalTs(source: string): ParsedEditalData {
  let code = source

  // 1. Remove single-line type aliases: export type Foo = "A" | "B";
  code = code.replace(/^export\s+type\s+\w+\s*=\s*[^;]+;$/gm, '')

  // 2. Remove interface blocks (including nested braces like blocoA: { ... })
  code = removeInterfaceAndTypeBlocks(code)

  // 3. Remove type casts — handles BOTH uppercase (TypeName) and lowercase/primitives
  //    Matches: as Foo, as string, as string | null, as string | undefined, as const,
  //             as Foo<Bar>, as Foo[], as "literal", etc.
  //    Uses a loop to strip consecutive casts safely.
  //    Strategy: strip "as <TypeExpression>" where TypeExpression ends at , ) ; } \n
  code = code.replace(
    /\s+as\s+(?:"[^"]*"|'[^']*'|[A-Za-z_][\w<>[\]]*(?:\s*\|\s*[A-Za-z_][\w<>[\]]*(?:\s*\|\s*[A-Za-z_][\w<>[\]]*)*)?)/g,
    ''
  )
  // Also strip remaining bare "as const" or "as readonly ..." that might survive
  code = code.replace(/\s+as\s+readonly\s+[A-Za-z_][\w<>[\]]*/g, '')

  // 4. Remove type annotations on const declarations: const FOO: SomeType =
  //    Extended to handle complex types including union/intersection
  code = code.replace(/(const\s+\w+)\s*:\s*[A-Za-z_][\w<>[\],\s|&.?]*/gm, '$1')

  // 5. Strip export keyword from const/let/var
  code = code.replace(/^export\s+(?:const|let|var)\s+/gm, 'var ')

  // 6. Handle export default → var __default
  code = code.replace(/^export\s+default\s+/gm, 'var __default = ')

  // 7. Collect all top-level var names to expose
  const varNames: string[] = []
  const varRe = /^var\s+(\w+)\s*=/gm
  let m: RegExpExecArray | null
  while ((m = varRe.exec(code)) !== null) {
    if (!varNames.includes(m[1])) varNames.push(m[1])
  }

  const collect = varNames
    .map(n => `try { __e['${n}'] = ${n}; } catch(_) {}`)
    .join('\n')

  const fullCode = `var __e = {};\n${code}\n${collect}\nreturn __e;`

  // eslint-disable-next-line no-new-func
  const fn = new Function(fullCode)
  const exp = fn() as Record<string, unknown>

  const def = exp['__default'] as Record<string, unknown> | undefined

  const edital = (def?.edital ??
    exp['EDITAL_TCU_CE'] ??
    exp['EDITAL_SEDES_2026'] ??
    exp['EDITAL'] ??
    {}) as Record<string, unknown>

  const config = (def?.config ?? exp['CONFIG']) as Record<string, unknown> | undefined
  const bancaPerfil = (def?.bancaPerfil ?? exp['BANCA_PERFIL']) as Record<string, unknown> | undefined

  return {
    edital,
    cronograma: (def?.cronograma ?? exp['CRONOGRAMA_RELATIVO'] ?? exp['CRONOGRAMA'] ?? []) as unknown[],
    fases:      (def?.fases      ?? exp['FASES']      ?? []) as unknown[],
    benchmarks: (def?.benchmarks ?? exp['BENCHMARKS'] ?? {}) as Record<string, unknown>,
    quadrixPerfil: (def?.quadrixPerfil ?? exp['QUADRIX_PERFIL'] ?? {}) as Record<string, unknown>,
    ...(config ? { config } : {}),
    ...(bancaPerfil ? { bancaPerfil } : {}),
  }
}

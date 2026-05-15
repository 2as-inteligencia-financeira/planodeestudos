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

export function parseEditalTs(source: string): ParsedEditalData {
  let code = source

  // 1. Remove single-line type aliases: export type Foo = "A" | "B";
  code = code.replace(/^export\s+type\s+\w+\s*=\s*[^;]+;$/gm, '')

  // 2. Remove interface blocks — [^}]* matches newlines, interfaces have no nested {}
  code = code.replace(/export\s+interface\s+\w+(?:<[^>]*>)?\s*\{[^}]*\}/gs, '')

  // 3. Remove type casts: `"VALUE" as TypeName`
  code = code.replace(/\s+as\s+[A-Z][A-Za-z0-9_]*/g, '')

  // 4. Remove type annotations on const declarations: const FOO: Type[] =
  code = code.replace(/(const\s+\w+)\s*:\s*[A-Za-z_][\w<>[\],\s|&.]*(?=\s*=)/gm, '$1')

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

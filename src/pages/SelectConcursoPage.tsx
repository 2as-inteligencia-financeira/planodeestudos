import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CONCURSOS } from '../data/concursos'
import type { ConcursoMeta } from '../data/concursos'
import { useProfile } from '../hooks/useProfile'
import { useImportedConcursos } from '../hooks/useImportedConcursos'
import { parseEditalTs } from '../lib/editalParser'
import { useAuth } from '../contexts/AuthContext'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import type { ImportedConcurso } from '../hooks/useImportedConcursos'

// ── helpers ─────────────────────────────────────────────────────────────────

function formatDataProva(iso: string) {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

function diasRestantes(dataProva: string) {
  return Math.ceil(
    (new Date(dataProva + 'T12:00:00').getTime() - Date.now()) / 86_400_000,
  )
}

// Deriva ConcursoMeta a partir dos dados parseados do arquivo importado
function metaFromEdital(edital: Record<string, unknown>, fileName: string): ConcursoMeta {
  const slug = fileName
    .replace(/\.ts$/, '')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .toLowerCase()

  return {
    id: `imported_${slug}`,
    nome:        String(edital.cargo        ?? edital.nome        ?? fileName),
    nomeCompleto:String(edital.cargo        ?? edital.nomeCompleto ?? ''),
    banca:       String(edital.banca        ?? '—'),
    orgao:       String(edital.orgao        ?? '—'),
    cargo:       String(edital.codigo       ?? edital.cargo       ?? '—'),
    dataProva:   String(edital.dataProva    ?? '2099-12-31'),
    cor:         '#6366f1',
    ativo:       true,
  }
}

// ── Toast ────────────────────────────────────────────────────────────────────

interface ToastState { msg: string; ok: boolean }

function Toast({ toast, onDone }: { toast: ToastState; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 4000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        background: toast.ok ? '#0a0a0a' : '#dc2626',
        color: '#fff',
        padding: '12px 20px',
        fontSize: '0.85rem',
        fontFamily: 'inherit',
        maxWidth: 380,
        zIndex: 100,
        lineHeight: 1.5,
        boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
      }}
    >
      {toast.msg}
    </div>
  )
}

// ── Card de concurso ─────────────────────────────────────────────────────────

function ConcursoCard({
  c,
  onNavigate,
  onRemove,
}: {
  c: ConcursoMeta
  onNavigate: () => void
  onRemove?: () => void
}) {
  const dias = diasRestantes(c.dataProva)

  return (
    <div
      onClick={() => c.ativo && onNavigate()}
      style={{
        background: '#ffffff',
        border: '1px solid #e2e2dc',
        opacity: c.ativo ? 1 : 0.5,
        cursor: c.ativo ? 'pointer' : 'default',
        position: 'relative',
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={e => {
        if (!c.ativo) return
        ;(e.currentTarget as HTMLDivElement).style.borderColor = c.cor
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLDivElement).style.borderColor = '#e2e2dc'
      }}
    >
      {/* linha accent */}
      <div style={{ height: 3, background: c.cor }} />

      <div style={{ padding: '20px 24px 24px' }}>
        {/* badges topo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          {!c.ativo && (
            <span
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: '#f0f0ea',
                color: '#999',
                padding: '2px 8px',
              }}
            >
              Em Breve
            </span>
          )}
          {c.id.startsWith('imported_') && (
            <span
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: '#ede9fe',
                color: '#5b21b6',
                padding: '2px 8px',
              }}
            >
              Importado
            </span>
          )}
        </div>

        {/* nome */}
        <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#0a0a0a', marginBottom: 4 }}>
          {c.nome}
        </h3>
        <p style={{ fontWeight: 300, fontSize: '0.8rem', color: '#606060', lineHeight: 1.5, marginBottom: 16 }}>
          {c.nomeCompleto}
        </p>

        {/* meta info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
          {[
            ['Banca', c.banca],
            ['Órgão', c.orgao],
            ['Cargo', c.cargo],
            ['Prova', formatDataProva(c.dataProva)],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.65rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#999' }}>
                {label}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#606060', fontWeight: 500 }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* dias restantes */}
        {c.ativo && (
          <div style={{ borderTop: '1px solid #e2e2dc', paddingTop: 14, display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: c.cor, letterSpacing: '-0.03em', lineHeight: 1 }}>
              {dias > 0 ? dias : 0}
            </span>
            <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.65rem', color: '#999' }}>
              dias restantes
            </span>
          </div>
        )}

        {/* botão remover (só importados) */}
        {onRemove && (
          <button
            onClick={e => { e.stopPropagation(); onRemove() }}
            style={{
              marginTop: 12,
              background: 'none',
              border: '1px solid #e2e2dc',
              color: '#999',
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '4px 10px',
              cursor: 'pointer',
            }}
          >
            Remover
          </button>
        )}
      </div>
    </div>
  )
}

// ── Página principal ─────────────────────────────────────────────────────────

export default function SelectConcursoPage() {
  const navigate = useNavigate()
  const { profile } = useProfile()
  const { user, role } = useAuth()
  const { imported, addConcurso, removeConcurso } = useImportedConcursos()
  const fileRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<ToastState | null>(null)
  const [planosVinculados, setPlanosVinculados] = useState<ImportedConcurso[]>([])

  useEffect(() => {
    if (!user || !isSupabaseConfigured) return
    async function carregarPlanos() {
      const { data } = await supabase
        .from('aluno_planos')
        .select('planos(id, nome, conteudo, arquivo_nome)')
        .eq('aluno_id', user!.id)
        .eq('ativo', true)
      if (!data) return
      const planos: ImportedConcurso[] = (data as unknown as { planos: { id: string; nome: string; conteudo: unknown; arquivo_nome: string | null } | null }[])
        .map((row) => {
          const p = row.planos
          if (!p) return null
          const content = p.conteudo as { edital?: Record<string, unknown> }
          const edital = content?.edital || {}
          return {
            id: `plano_${p.id}`,
            meta: {
              id: `plano_${p.id}`,
              nome: p.nome,
              nomeCompleto: String(edital.nomeCompleto ?? edital.cargo ?? p.nome),
              banca: String(edital.banca ?? '—'),
              orgao: String(edital.orgao ?? '—'),
              cargo: String(edital.cargo ?? '—'),
              dataProva: String(edital.dataProva ?? '2099-12-31'),
              cor: '#6366f1',
              ativo: true,
            },
            rawData: content as import('../lib/editalParser').ParsedEditalData,
            importadoEm: new Date().toISOString(),
          }
        })
        .filter(Boolean) as ImportedConcurso[]
      setPlanosVinculados(planos)
    }
    carregarPlanos()
  }, [user])

  const primeiroNome = profile?.nome?.split(' ')[0]

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)

    const reader = new FileReader()
    reader.onload = ev => {
      try {
        const source = ev.target?.result as string
        const parsed = parseEditalTs(source)
        const meta = metaFromEdital(parsed.edital, file.name)
        addConcurso(meta, parsed)
        setToast({
          ok: true,
          msg: `Edital de "${meta.nome}" (${meta.banca}) carregado com sucesso.`,
        })
      } catch (err) {
        console.error(err)
        setToast({ ok: false, msg: 'Erro ao processar o arquivo. Verifique se é um .ts válido no formato EditalPlanner.' })
      } finally {
        setLoading(false)
        // reset para permitir reimportar o mesmo arquivo
        if (fileRef.current) fileRef.current.value = ''
      }
    }
    reader.readAsText(file)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0ea' }}>
      {/* Header */}
      <header style={{ background: '#fafaf7', borderBottom: '1px solid #e2e2dc' }}>
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            padding: '0 32px',
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontWeight: 800, letterSpacing: '-0.04em', fontSize: '1.25rem' }}>
              <span style={{ color: '#f59e0b' }}>2</span>
              <span style={{ color: '#0a0a0a' }}>AS</span>
            </span>
            <span
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#999',
              }}
            >
              Plano de Estudos
            </span>
          </div>

          {/* Perfil + botão Admin/Mentor */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {(role === 'admin' || role === 'mentor') && (
              <button
                onClick={() => navigate('/mentor')}
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: role === 'admin' ? '#0a0a0a' : '#f59e0b',
                  color: role === 'admin' ? '#ffffff' : '#0a0a0a',
                  border: 'none',
                  padding: '4px 10px',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                {role === 'admin' ? 'Painel Admin' : 'Painel Mentor'}
              </button>
            )}
            {primeiroNome ? (
              <>
                <span style={{ color: '#606060', fontWeight: 300, fontSize: '0.875rem' }}>
                  Olá, {primeiroNome}.
                </span>
                <button
                  onClick={() => navigate('/perfil')}
                  style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#999', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Perfil
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/perfil')}
                style={{ color: '#f59e0b', fontWeight: 500, fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Configurar perfil →
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 32px' }}>
        {/* Título + botão importar */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <p
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#999',
                marginBottom: 12,
              }}
            >
              Selecione o Concurso
            </p>
            <h1 style={{ fontWeight: 800, fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-0.03em', color: '#0a0a0a', lineHeight: 1.1 }}>
              Plano de Estudos
            </h1>
            <h2 style={{ fontWeight: 300, fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-0.02em', color: '#0a0a0a', lineHeight: 1.1 }}>
              para Concursos
            </h2>
          </div>

          {/* Botão importar — só admin/mentor */}
          {(role === 'admin' || role === 'mentor') && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <input
                ref={fileRef}
                type="file"
                accept=".ts"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <button
                onClick={() => fileRef.current?.click()}
                disabled={loading}
                style={{
                  background: loading ? '#e2e2dc' : '#f59e0b',
                  color: '#0a0a0a',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  padding: '10px 20px',
                  cursor: loading ? 'default' : 'pointer',
                  letterSpacing: '-0.01em',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#d97706' }}
                onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = '#f59e0b' }}
              >
                {loading ? 'Carregando…' : '+ Importar Edital .ts'}
              </button>
              <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.6rem', color: '#999', letterSpacing: '0.04em' }}>
                Arquivo gerado pelo Claude com a estrutura EditalPlanner
              </span>
            </div>
          )}
        </div>

        {/* Planos vinculados pelo mentor/admin */}
        {planosVinculados.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6366f1', marginBottom: 12 }}>
              Planos do seu mentor
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 1, background: '#e2e2dc' }}>
              {planosVinculados.map(ic => (
                <ConcursoCard
                  key={ic.id}
                  c={ic.meta}
                  onNavigate={() => navigate(`/${ic.id}/dashboard`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Grid — editais fixos + importados (oculto para alunos que já têm planos vinculados) */}
        {(role === 'admin' || role === 'mentor' || planosVinculados.length === 0) && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 1, background: '#e2e2dc' }}>
            {CONCURSOS.map(c => (
              <ConcursoCard
                key={c.id}
                c={c}
                onNavigate={() => navigate(`/${c.id}/dashboard`)}
              />
            ))}
            {imported.map(ic => (
              <ConcursoCard
                key={ic.id}
                c={ic.meta}
                onNavigate={() => navigate(`/${ic.id}/dashboard`)}
                onRemove={() => removeConcurso(ic.id)}
              />
            ))}
          </div>
        )}

        {/* Mensagem quando não há importados ainda */}
        {imported.length === 0 && (
          <p style={{ marginTop: 32, fontFamily: '"DM Mono", monospace', fontSize: '0.7rem', color: '#bbb', letterSpacing: '0.04em' }}>
            Nenhum edital importado ainda. Clique em "Importar Edital .ts" para adicionar um novo concurso.
          </p>
        )}
      </main>

      {/* Rodapé */}
      <footer style={{ maxWidth: 1000, margin: '0 auto', padding: '0 32px 48px' }}>
        <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.65rem', color: '#bbb', letterSpacing: '0.06em' }}>
          2AS Inteligência Financeira
        </p>
      </footer>

      {/* Toast */}
      {toast && <Toast toast={toast} onDone={() => setToast(null)} />}
    </div>
  )
}

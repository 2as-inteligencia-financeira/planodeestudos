import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../contexts/AuthContext'
import type { UserRole } from '../contexts/AuthContext'

type Profile = {
  id: string
  nome: string
  email: string | null
  role: string
  mentor_id: string | null
  created_at: string
}

type AlunoStats = Profile & {
  diasConcluidos: number
  totalCorrecoes: number
  melhorNota: number | null
  ultimaAtividade: string | null
}

const mono: React.CSSProperties = {
  fontFamily: '"DM Mono", monospace',
  fontSize: '0.65rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  color: '#999999',
}

export default function MentorPage() {
  const { user, role, signOut } = useAuth()
  const navigate = useNavigate()
  const isAdmin = role === 'admin'

  const [aba, setAba] = useState<'alunos' | 'mentores'>('alunos')
  const [mentores, setMentores] = useState<Profile[]>([])
  const [alunos, setAlunos] = useState<AlunoStats[]>([])
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState<string | null>(null)

  const carregar = useCallback(async () => {
    if (!user) return
    setCarregando(true)

    const [{ data: profMentores }, { data: profAlunos }] = await Promise.all([
      supabase.from('profiles').select('*').eq('role', 'mentor'),
      isAdmin
        ? supabase.from('profiles').select('*').eq('role', 'aluno')
        : supabase.from('profiles').select('*').eq('role', 'aluno').eq('mentor_id', user.id),
    ])

    setMentores(profMentores || [])

    const stats: AlunoStats[] = await Promise.all(
      (profAlunos || []).map(async (p: Profile) => {
        const [{ count: diasConcluidos }, { data: correcoes }] = await Promise.all([
          supabase.from('progresso').select('*', { count: 'exact', head: true })
            .eq('user_id', p.id).eq('feito', true),
          supabase.from('correcoes').select('nota_final, created_at')
            .eq('user_id', p.id).order('created_at', { ascending: false }),
        ])
        const notas = (correcoes || []).map((c: { nota_final: number }) => c.nota_final)
        return {
          ...p,
          diasConcluidos: diasConcluidos || 0,
          totalCorrecoes: notas.length,
          melhorNota: notas.length > 0 ? Math.max(...notas) : null,
          ultimaAtividade: correcoes?.[0]?.created_at ?? null,
        }
      })
    )

    setAlunos(stats)
    setCarregando(false)
  }, [user, isAdmin])

  useEffect(() => { carregar() }, [carregar])

  async function promoverMentor(p: Profile) {
    setSalvando(p.id)
    await supabase.from('profiles').update({ role: 'mentor' }).eq('id', p.id)
    await carregar()
    setSalvando(null)
  }

  async function demoverParaAluno(p: Profile) {
    setSalvando(p.id)
    await supabase.from('profiles').update({ role: 'aluno', mentor_id: null }).eq('id', p.id)
    await carregar()
    setSalvando(null)
  }

  async function atribuirMentor(alunoId: string, mentorId: string) {
    setSalvando(alunoId)
    await supabase.from('profiles').update({ mentor_id: mentorId || null }).eq('id', alunoId)
    await carregar()
    setSalvando(null)
  }

  return (
    <div className="min-h-screen" style={{ background: '#f0f0ea' }}>
      <header style={{ background: '#fafaf7', borderBottom: '1px solid #e2e2dc' }}>
        <div className="max-w-5xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} style={{ color: '#606060', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer' }}>
              ← Plano
            </button>
            <span className="text-xl" style={{ fontWeight: 800, letterSpacing: '-0.04em' }}>
              <span style={{ color: '#f59e0b' }}>2</span><span style={{ color: '#0a0a0a' }}>AS</span>
            </span>
            <span style={{ ...mono, color: '#0a0a0a', fontWeight: 700 }}>/ {isAdmin ? 'Admin' : 'Mentor'}</span>
            <span style={{
              ...mono,
              background: isAdmin ? '#0a0a0a' : '#f59e0b',
              color: isAdmin ? '#ffffff' : '#0a0a0a',
              padding: '2px 8px',
              fontWeight: 700,
            }}>{(role as UserRole)?.toUpperCase()}</span>
          </div>
          <button
            onClick={signOut}
            style={{ fontSize: '0.8rem', color: '#606060', background: 'none', border: '1px solid #e2e2dc', padding: '6px 14px', cursor: 'pointer' }}
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-10">
        {/* Título + contadores */}
        <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#0a0a0a', marginBottom: 4 }}>
              {isAdmin ? 'Painel Admin' : 'Painel do Mentor'}
            </h1>
            <p style={{ ...mono }}>{isAdmin ? 'Visão global — todos os usuários da plataforma' : 'Seus alunos cadastrados'}</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {isAdmin && (
              <div style={{ background: '#ffffff', border: '1px solid #e2e2dc', padding: '12px 20px', textAlign: 'center', minWidth: 100 }}>
                <p style={{ fontSize: '1.75rem', fontWeight: 800, color: '#6366f1', letterSpacing: '-0.03em' }}>{mentores.length}</p>
                <p style={mono}>mentores</p>
              </div>
            )}
            <div style={{ background: '#ffffff', border: '1px solid #e2e2dc', padding: '12px 20px', textAlign: 'center', minWidth: 100 }}>
              <p style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f59e0b', letterSpacing: '-0.03em' }}>{alunos.length}</p>
              <p style={mono}>alunos</p>
            </div>
          </div>
        </div>

        {/* Abas (só admin vê a aba Mentores) */}
        {isAdmin && (
          <div style={{ display: 'flex', borderBottom: '1px solid #e2e2dc', marginBottom: 24 }}>
            {(['alunos', 'mentores'] as const).map(a => (
              <button
                key={a}
                onClick={() => setAba(a)}
                style={{
                  padding: '10px 24px',
                  background: 'none',
                  border: 'none',
                  borderBottom: aba === a ? '2px solid #0a0a0a' : '2px solid transparent',
                  fontWeight: aba === a ? 700 : 400,
                  fontSize: '0.875rem',
                  color: aba === a ? '#0a0a0a' : '#606060',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {a}
              </button>
            ))}
          </div>
        )}

        {carregando ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#999' }}>Carregando...</div>
        ) : aba === 'alunos' ? (
          <TabelaAlunos
            alunos={alunos}
            mentores={mentores}
            isAdmin={isAdmin}
            salvando={salvando}
            onAtribuirMentor={atribuirMentor}
            onPromover={promoverMentor}
          />
        ) : (
          <TabelaMentores
            mentores={mentores}
            alunos={alunos}
            salvando={salvando}
            onDemover={demoverParaAluno}
          />
        )}
      </main>
    </div>
  )
}

function TabelaAlunos({
  alunos,
  mentores,
  isAdmin,
  salvando,
  onAtribuirMentor,
  onPromover,
}: {
  alunos: AlunoStats[]
  mentores: Profile[]
  isAdmin: boolean
  salvando: string | null
  onAtribuirMentor: (alunoId: string, mentorId: string) => void
  onPromover: (p: Profile) => void
}) {
  if (alunos.length === 0) return (
    <div style={{ background: '#ffffff', border: '1px solid #e2e2dc', padding: 40, textAlign: 'center' }}>
      <p style={{ color: '#606060', fontSize: '0.95rem' }}>Nenhum aluno cadastrado ainda.</p>
    </div>
  )

  const cols = isAdmin
    ? ['Aluno', 'Mentor', 'Dias', 'Correções', 'Melhor nota', 'Última atividade', '']
    : ['Aluno', 'Dias', 'Correções', 'Melhor nota', 'Última atividade']

  return (
    <div style={{ background: '#ffffff', border: '1px solid #e2e2dc', overflow: 'auto' }}>
      <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#fafaf7', borderBottom: '1px solid #e2e2dc' }}>
            {cols.map(h => (
              <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: '"DM Mono", monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#999' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {alunos.map(a => (
            <tr key={a.id} style={{ borderBottom: '1px solid #f0f0ea' }}>
              <td style={{ padding: '12px 16px' }}>
                <p style={{ fontWeight: 600, color: '#0a0a0a' }}>{a.nome}</p>
                {a.email && <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.65rem', color: '#999', marginTop: 2 }}>{a.email}</p>}
              </td>
              {isAdmin && (
                <td style={{ padding: '12px 16px' }}>
                  <select
                    disabled={salvando === a.id}
                    value={a.mentor_id || ''}
                    onChange={e => onAtribuirMentor(a.id, e.target.value)}
                    style={{ fontSize: '0.8rem', border: '1px solid #e2e2dc', padding: '4px 8px', background: '#fff', color: '#606060', cursor: 'pointer' }}
                  >
                    <option value="">— sem mentor —</option>
                    {mentores.map(m => (
                      <option key={m.id} value={m.id}>{m.nome}</option>
                    ))}
                  </select>
                </td>
              )}
              <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0a0a0a' }}>{a.diasConcluidos}</td>
              <td style={{ padding: '12px 16px', color: '#606060' }}>{a.totalCorrecoes}</td>
              <td style={{ padding: '12px 16px' }}>
                {a.melhorNota !== null ? (
                  <span style={{ fontWeight: 700, color: a.melhorNota >= 60 ? '#059669' : '#dc2626' }}>{a.melhorNota} pts</span>
                ) : <span style={{ color: '#999' }}>—</span>}
              </td>
              <td style={{ padding: '12px 16px', color: '#999', fontSize: '0.78rem' }}>
                {a.ultimaAtividade ? new Date(a.ultimaAtividade).toLocaleDateString('pt-BR') : '—'}
              </td>
              {isAdmin && (
                <td style={{ padding: '12px 16px' }}>
                  <button
                    disabled={salvando === a.id}
                    onClick={() => onPromover(a)}
                    style={{ fontSize: '0.72rem', fontFamily: '"DM Mono", monospace', background: 'none', border: '1px solid #e2e2dc', color: '#606060', padding: '3px 10px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em' }}
                  >
                    {salvando === a.id ? '...' : 'Tornar Mentor'}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TabelaMentores({
  mentores,
  alunos,
  salvando,
  onDemover,
}: {
  mentores: Profile[]
  alunos: AlunoStats[]
  salvando: string | null
  onDemover: (p: Profile) => void
}) {
  if (mentores.length === 0) return (
    <div style={{ background: '#ffffff', border: '1px solid #e2e2dc', padding: 40, textAlign: 'center' }}>
      <p style={{ color: '#606060', fontSize: '0.95rem' }}>Nenhum mentor cadastrado ainda.</p>
      <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.65rem', color: '#999', marginTop: 8 }}>
        Na aba Alunos, clique em "Tornar Mentor" para promover um aluno.
      </p>
    </div>
  )

  return (
    <div style={{ background: '#ffffff', border: '1px solid #e2e2dc', overflow: 'auto' }}>
      <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#fafaf7', borderBottom: '1px solid #e2e2dc' }}>
            {['Mentor', 'E-mail', 'Alunos vinculados', 'Cadastro', ''].map(h => (
              <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: '"DM Mono", monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#999' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mentores.map(m => {
            const qtd = alunos.filter(a => a.mentor_id === m.id).length
            return (
              <tr key={m.id} style={{ borderBottom: '1px solid #f0f0ea' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600, color: '#0a0a0a' }}>{m.nome}</td>
                <td style={{ padding: '12px 16px', fontFamily: '"DM Mono", monospace', fontSize: '0.72rem', color: '#999' }}>{m.email || '—'}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontWeight: 700, color: qtd > 0 ? '#6366f1' : '#999' }}>{qtd}</span>
                </td>
                <td style={{ padding: '12px 16px', color: '#999', fontSize: '0.78rem' }}>
                  {new Date(m.created_at).toLocaleDateString('pt-BR')}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <button
                    disabled={salvando === m.id}
                    onClick={() => onDemover(m)}
                    style={{ fontSize: '0.72rem', fontFamily: '"DM Mono", monospace', background: 'none', border: '1px solid #e2e2dc', color: '#dc2626', padding: '3px 10px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em' }}
                  >
                    {salvando === m.id ? '...' : 'Remover Mentor'}
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

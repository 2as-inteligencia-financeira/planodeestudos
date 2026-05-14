import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../contexts/AuthContext'
import type { UserRole } from '../contexts/AuthContext'

type AlunoStats = {
  id: string
  nome: string
  email: string | null
  diasConcluidos: number
  totalCorrecoes: number
  melhorNota: number | null
  ultimaAtividade: string | null
}

export default function MentorPage() {
  const { user, role, signOut } = useAuth()
  const navigate = useNavigate()
  const [alunos, setAlunos] = useState<AlunoStats[]>([])
  const [carregando, setCarregando] = useState(true)
  const isAdmin = role === 'admin'

  useEffect(() => {
    if (!user) return
    async function carregar() {
      setCarregando(true)
      // Admin vê todos os alunos; mentor vê apenas os seus
      const query = supabase.from('profiles').select('id, nome, email').eq('role', 'aluno')
      if (!isAdmin) query.eq('mentor_id', user!.id)
      const { data: profiles } = await query

      if (!profiles) { setCarregando(false); return }

      const stats: AlunoStats[] = await Promise.all(
        profiles.map(async (p: { id: string; nome: string; email: string | null }) => {
          const [{ count: diasConcluidos }, { data: correcoes }] = await Promise.all([
            supabase.from('progresso').select('*', { count: 'exact', head: true })
              .eq('user_id', p.id).eq('feito', true),
            supabase.from('correcoes').select('nota_final, created_at')
              .eq('user_id', p.id).order('created_at', { ascending: false }),
          ])
          const notas = (correcoes || []).map((c: { nota_final: number }) => c.nota_final)
          const melhorNota = notas.length > 0 ? Math.max(...notas) : null
          const ultimaAtividade = correcoes && correcoes[0] ? correcoes[0].created_at : null
          return {
            id: p.id,
            nome: p.nome,
            email: p.email,
            diasConcluidos: diasConcluidos || 0,
            totalCorrecoes: notas.length,
            melhorNota,
            ultimaAtividade,
          }
        })
      )
      setAlunos(stats)
      setCarregando(false)
    }
    carregar()
  }, [user])

  const monoLabel: React.CSSProperties = {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.65rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: '#999999',
  }

  return (
    <div className="min-h-screen" style={{ background: '#f0f0ea' }}>
      <header style={{ background: '#fafaf7', borderBottom: '1px solid #e2e2dc' }}>
        <div className="max-w-5xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} style={{ color: '#606060', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer' }}>
              ← Início
            </button>
            <span className="text-xl" style={{ fontWeight: 800, letterSpacing: '-0.04em' }}>
              <span style={{ color: '#f59e0b' }}>2</span><span style={{ color: '#0a0a0a' }}>AS</span>
            </span>
            <span style={{ ...monoLabel, color: '#0a0a0a', fontWeight: 700 }}>/ {isAdmin ? 'Admin' : 'Mentor'}</span>
            <span style={{
              ...monoLabel,
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
        <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#0a0a0a', marginBottom: 4 }}>
              {isAdmin ? 'Painel Admin' : 'Painel do Mentor'}
            </h1>
            <p style={{ ...monoLabel }}>{isAdmin ? 'Visão global — todos os alunos da plataforma' : 'Visão geral dos seus alunos cadastrados'}</p>
          </div>
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e2dc',
              padding: '12px 20px',
              textAlign: 'center',
              minWidth: 120,
            }}
          >
            <p style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f59e0b', letterSpacing: '-0.03em' }}>
              {alunos.length}
            </p>
            <p style={monoLabel}>alunos</p>
          </div>
        </div>

        {carregando ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#999' }}>Carregando...</div>
        ) : alunos.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e2e2dc',
              padding: 40,
              textAlign: 'center',
            }}
          >
            <p style={{ color: '#606060', fontSize: '0.95rem', marginBottom: 8 }}>Nenhum aluno cadastrado ainda.</p>
            <p style={{ ...monoLabel }}>
              Para vincular um aluno, crie a conta dele e defina <code>mentor_id = seu ID</code> na tabela <code>profiles</code>.
            </p>
          </div>
        ) : (
          <div style={{ background: '#ffffff', border: '1px solid #e2e2dc', overflow: 'hidden' }}>
            <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#fafaf7', borderBottom: '1px solid #e2e2dc' }}>
                  {['Aluno', 'Dias concluídos', 'Correções', 'Melhor nota', 'Última atividade'].map((h) => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', ...monoLabel }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {alunos.map((a) => (
                  <tr key={a.id} style={{ borderBottom: '1px solid #f0f0ea' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <p style={{ fontWeight: 600, color: '#0a0a0a' }}>{a.nome}</p>
                      {a.email && <p style={{ ...monoLabel, marginTop: 2 }}>{a.email}</p>}
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0a0a0a' }}>
                      {a.diasConcluidos}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#606060' }}>{a.totalCorrecoes}</td>
                    <td style={{ padding: '12px 16px' }}>
                      {a.melhorNota !== null ? (
                        <span style={{ fontWeight: 700, color: a.melhorNota >= 60 ? '#059669' : '#dc2626' }}>
                          {a.melhorNota} pts
                        </span>
                      ) : (
                        <span style={{ color: '#999' }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#999', fontSize: '0.78rem' }}>
                      {a.ultimaAtividade
                        ? new Date(a.ultimaAtividade).toLocaleDateString('pt-BR')
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}

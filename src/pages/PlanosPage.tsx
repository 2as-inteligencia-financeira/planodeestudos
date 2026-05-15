import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../contexts/AuthContext'
import { parseEditalTs } from '../lib/editalParser'

type Plano = {
  id: string
  nome: string
  descricao: string | null
  arquivo_nome: string | null
  created_at: string
  criado_por: string | null
}

type Profile = {
  id: string
  nome: string
  email: string | null
  role: string
}

type AlunoVinculo = {
  aluno_id: string
  ativo: boolean
  profiles: { nome: string; email: string | null }
}

const mono: React.CSSProperties = {
  fontFamily: '"DM Mono", monospace',
  fontSize: '0.65rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
  color: '#999',
}

export default function PlanosPage() {
  const { user, role } = useAuth()
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const isAdmin = role === 'admin'

  const [planos, setPlanos] = useState<Plano[]>([])
  const [alunos, setAlunos] = useState<Profile[]>([])
  const [carregando, setCarregando] = useState(true)
  const [planoAberto, setPlanoAberto] = useState<string | null>(null)
  const [vinculos, setVinculos] = useState<Record<string, AlunoVinculo[]>>({})
  const [uploading, setUploading] = useState(false)
  const [erro, setErro] = useState('')

  const carregar = useCallback(async () => {
    if (!user) return
    setCarregando(true)

    const [{ data: pls }, { data: als }] = await Promise.all([
      supabase.from('planos').select('id,nome,descricao,arquivo_nome,created_at,criado_por').order('created_at', { ascending: false }),
      isAdmin
        ? supabase.from('profiles').select('id,nome,email,role').eq('role', 'aluno')
        : supabase.from('profiles').select('id,nome,email,role').eq('role', 'aluno').eq('mentor_id', user.id),
    ])

    setPlanos(pls || [])
    setAlunos(als || [])
    setCarregando(false)
  }, [user, isAdmin])

  useEffect(() => { carregar() }, [carregar])

  async function carregarVinculos(planoId: string) {
    if (vinculos[planoId]) { setPlanoAberto(planoAberto === planoId ? null : planoId); return }
    const { data } = await supabase
      .from('aluno_planos')
      .select('aluno_id, ativo, profiles(nome, email)')
      .eq('plano_id', planoId)
    setVinculos(v => ({ ...v, [planoId]: (data || []) as unknown as AlunoVinculo[] }))
    setPlanoAberto(planoAberto === planoId ? null : planoId)
  }

  async function vincularAluno(planoId: string, alunoId: string, ativo: boolean) {
    if (ativo) {
      await supabase.from('aluno_planos').upsert({ plano_id: planoId, aluno_id: alunoId, ativo: true })
    } else {
      await supabase.from('aluno_planos').delete().eq('plano_id', planoId).eq('aluno_id', alunoId)
    }
    // Refresh vinculos for this plano
    const { data } = await supabase
      .from('aluno_planos')
      .select('aluno_id, ativo, profiles(nome, email)')
      .eq('plano_id', planoId)
    setVinculos(v => ({ ...v, [planoId]: (data || []) as unknown as AlunoVinculo[] }))
  }

  async function excluirPlano(planoId: string) {
    if (!confirm('Excluir este plano? Todos os vínculos serão removidos.')) return
    await supabase.from('aluno_planos').delete().eq('plano_id', planoId)
    await supabase.from('planos').delete().eq('id', planoId)
    carregar()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setErro('')
    setUploading(true)

    const reader = new FileReader()
    reader.onload = async ev => {
      try {
        const source = ev.target?.result as string
        const parsed = parseEditalTs(source)
        const nome = String(parsed.edital?.cargo ?? parsed.edital?.nome ?? file.name.replace('.ts', ''))
        const descricao = [
          parsed.edital?.banca ? `Banca: ${parsed.edital.banca}` : '',
          parsed.edital?.orgao ? `Órgão: ${parsed.edital.orgao}` : '',
          parsed.edital?.dataProva ? `Prova: ${parsed.edital.dataProva}` : '',
        ].filter(Boolean).join(' · ')

        const { error } = await supabase.from('planos').insert({
          nome,
          descricao: descricao || null,
          arquivo_nome: file.name,
          conteudo: parsed,
          criado_por: user!.id,
        })
        if (error) throw error
        carregar()
      } catch (err: unknown) {
        setErro(err instanceof Error ? err.message : 'Erro ao processar arquivo')
      } finally {
        setUploading(false)
        if (fileRef.current) fileRef.current.value = ''
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="min-h-screen" style={{ background: '#f0f0ea' }}>
      <header style={{ background: '#fafaf7', borderBottom: '1px solid #e2e2dc' }}>
        <div className="max-w-5xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/mentor')} style={{ color: '#606060', fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer' }}>
              ← Painel
            </button>
            <span style={{ fontWeight: 800, letterSpacing: '-0.04em', fontSize: '1.1rem' }}>
              <span style={{ color: '#f59e0b' }}>2</span><span style={{ color: '#0a0a0a' }}>AS</span>
            </span>
            <span style={{ ...mono, color: '#0a0a0a', fontWeight: 700 }}>/ Planos de Estudo</span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {erro && <span style={{ fontSize: '0.78rem', color: '#dc2626' }}>{erro}</span>}
            <input ref={fileRef} type="file" accept=".ts" style={{ display: 'none' }} onChange={handleFileChange} />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              style={{ padding: '8px 18px', background: uploading ? '#e2e2dc' : '#f59e0b', border: 'none', fontWeight: 700, fontSize: '0.8rem', cursor: uploading ? 'default' : 'pointer' }}
            >
              {uploading ? 'Carregando...' : '+ Upload Edital .ts'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-10">
        <div className="mb-8">
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#0a0a0a', marginBottom: 4 }}>
            Planos de Estudo
          </h1>
          <p style={mono}>Faça upload de editais e vincule a alunos específicos</p>
        </div>

        {carregando ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#999' }}>Carregando...</div>
        ) : planos.length === 0 ? (
          <div style={{ background: '#fff', border: '1px solid #e2e2dc', padding: 48, textAlign: 'center' }}>
            <p style={{ color: '#606060', marginBottom: 8 }}>Nenhum plano criado ainda.</p>
            <p style={mono}>Clique em "Upload Edital .ts" para criar o primeiro plano.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: '#e2e2dc' }}>
            {planos.map(p => {
              const aberto = planoAberto === p.id
              const vins = vinculos[p.id] || []
              const vinculadosIds = new Set(vins.map(v => v.aluno_id))

              return (
                <div key={p.id} style={{ background: '#fff' }}>
                  {/* Row do plano */}
                  <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 700, color: '#0a0a0a', fontSize: '0.95rem' }}>{p.nome}</p>
                      {p.descricao && <p style={{ ...mono, marginTop: 3 }}>{p.descricao}</p>}
                      {p.arquivo_nome && <p style={{ ...mono, color: '#bbb', marginTop: 2 }}>{p.arquivo_nome}</p>}
                    </div>
                    <span style={{ ...mono, color: '#bbb' }}>
                      {new Date(p.created_at).toLocaleDateString('pt-BR')}
                    </span>
                    <span style={{ fontWeight: 700, color: vins.length > 0 ? '#6366f1' : '#999', fontSize: '0.8rem' }}>
                      {aberto ? `${vinculadosIds.size} alunos` : `${vins.length}`}
                    </span>
                    <button
                      onClick={() => carregarVinculos(p.id)}
                      style={{ padding: '6px 14px', background: aberto ? '#0a0a0a' : '#fff', color: aberto ? '#fff' : '#606060', border: '1px solid #e2e2dc', fontSize: '0.78rem', cursor: 'pointer' }}
                    >
                      {aberto ? 'Fechar' : 'Vincular Alunos'}
                    </button>
                    <button
                      onClick={() => excluirPlano(p.id)}
                      style={{ padding: '6px 10px', background: 'none', border: '1px solid #e2e2dc', color: '#dc2626', fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      ✕
                    </button>
                  </div>

                  {/* Painel de vínculos */}
                  {aberto && (
                    <div style={{ borderTop: '1px solid #f0f0ea', padding: '16px 20px', background: '#fafaf7' }}>
                      {alunos.length === 0 ? (
                        <p style={mono}>Nenhum aluno cadastrado.</p>
                      ) : (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {alunos.map(a => {
                            const vinculado = vinculadosIds.has(a.id)
                            return (
                              <button
                                key={a.id}
                                onClick={() => vincularAluno(p.id, a.id, !vinculado)}
                                style={{
                                  padding: '6px 14px',
                                  background: vinculado ? '#6366f1' : '#fff',
                                  color: vinculado ? '#fff' : '#606060',
                                  border: `1px solid ${vinculado ? '#6366f1' : '#e2e2dc'}`,
                                  fontSize: '0.82rem',
                                  cursor: 'pointer',
                                  fontWeight: vinculado ? 600 : 400,
                                  display: 'flex', alignItems: 'center', gap: 6,
                                }}
                              >
                                {vinculado ? '✓ ' : ''}{a.nome}
                                {a.email && <span style={{ ...mono, fontSize: '0.58rem', opacity: 0.7 }}>{a.email}</span>}
                              </button>
                            )
                          })}
                        </div>
                      )}
                      <p style={{ ...mono, marginTop: 12 }}>
                        Clique no aluno para vincular/desvincular. O plano aparece automaticamente para ele no login.
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

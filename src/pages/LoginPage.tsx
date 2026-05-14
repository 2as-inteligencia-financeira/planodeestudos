import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

type Mode = 'login' | 'cadastro'

export default function LoginPage() {
  const { signIn, signUp, role } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('login')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  function redirectByRole(r: string | null) {
    if (r === 'admin' || r === 'mentor') navigate('/mentor')
    else navigate('/')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      if (mode === 'login') {
        const { error } = await signIn(email, senha)
        if (error) throw error
        redirectByRole(role)
      } else {
        if (!nome.trim()) throw new Error('Informe seu nome.')
        const { error } = await signUp(email, senha, nome.trim())
        if (error) throw error
        navigate('/')
      }
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setCarregando(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 14px',
    border: '1px solid #e2e2dc',
    borderRadius: 0,
    background: '#ffffff',
    color: '#0a0a0a',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.68rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: '#999999',
    marginBottom: 6,
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#f0f0ea' }}>
      {/* Logo */}
      <div className="mb-10 text-center">
        <span className="text-3xl" style={{ fontWeight: 800, letterSpacing: '-0.04em' }}>
          <span style={{ color: '#f59e0b' }}>2</span>
          <span style={{ color: '#0a0a0a' }}>AS</span>
        </span>
        <p
          className="mt-1"
          style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#999999', textTransform: 'uppercase' }}
        >
          Inteligência Financeira
        </p>
      </div>

      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e2e2dc',
          padding: '40px 40px',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <h1
          className="mb-6"
          style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.03em', color: '#0a0a0a' }}
        >
          {mode === 'login' ? 'Entrar na plataforma' : 'Criar conta'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'cadastro' && (
            <div>
              <label style={labelStyle}>Nome completo</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                style={inputStyle}
                required
              />
            </div>
          )}
          <div>
            <label style={labelStyle}>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              style={inputStyle}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
              required
              minLength={6}
            />
          </div>

          {erro && (
            <p style={{ fontSize: '0.82rem', color: '#dc2626', background: '#fef2f2', padding: '8px 12px', border: '1px solid #fecaca' }}>
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={carregando}
            style={{
              width: '100%',
              padding: '12px',
              background: carregando ? '#e2e2dc' : '#f59e0b',
              color: '#0a0a0a',
              border: 'none',
              borderRadius: 0,
              fontWeight: 700,
              fontSize: '0.875rem',
              cursor: carregando ? 'not-allowed' : 'pointer',
              letterSpacing: '0.02em',
            }}
          >
            {carregando ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <div className="mt-6 text-center">
          {mode === 'login' ? (
            <p style={{ fontSize: '0.82rem', color: '#606060' }}>
              Não tem conta?{' '}
              <button
                onClick={() => { setMode('cadastro'); setErro('') }}
                style={{ color: '#f59e0b', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Criar conta
              </button>
            </p>
          ) : (
            <p style={{ fontSize: '0.82rem', color: '#606060' }}>
              Já tem conta?{' '}
              <button
                onClick={() => { setMode('login'); setErro('') }}
                style={{ color: '#f59e0b', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Entrar
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

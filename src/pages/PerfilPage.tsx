import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../hooks/useProfile'
import type { StudentProfile } from '../types/profile'

export default function PerfilPage() {
  const navigate = useNavigate()
  const { profile, saveProfile, clearProfile } = useProfile()

  const [nome, setNome] = useState(profile?.nome || '')
  const [email, setEmail] = useState(profile?.email || '')
  const [objetivo, setObjetivo] = useState(profile?.objetivo || '')
  const [horasEstudoDia, setHorasEstudoDia] = useState<number>(profile?.horasEstudoDia || 3)

  function handleSalvar(e: React.FormEvent) {
    e.preventDefault()
    if (!nome.trim()) return
    const p: StudentProfile = {
      nome: nome.trim(),
      email: email.trim() || undefined,
      objetivo: objetivo.trim() || undefined,
      horasEstudoDia: horasEstudoDia || undefined,
      criadoEm: profile?.criadoEm || new Date().toISOString(),
    }
    saveProfile(p)
    navigate('/')
  }

  function handleApagar() {
    if (window.confirm('Apagar todos os dados salvos (perfil e progresso)? Esta ação não pode ser desfeita.')) {
      clearProfile()
      localStorage.removeItem('pec_progresso')
      navigate('/')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e2e2dc',
    borderRadius: 0,
    background: '#ffffff',
    color: '#0a0a0a',
    fontSize: '0.9rem',
    outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.7rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: '#999999',
    marginBottom: 6,
  }

  return (
    <div className="min-h-screen" style={{ background: '#f0f0ea' }}>
      {/* Header */}
      <header style={{ background: '#fafaf7', borderBottom: '1px solid #e2e2dc' }}>
        <div className="max-w-2xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              style={{
                color: '#606060',
                fontWeight: 400,
                fontSize: '0.875rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              ← Voltar
            </button>
            <span
              className="text-xl"
              style={{ fontWeight: 800, letterSpacing: '-0.04em' }}
            >
              <span style={{ color: '#f59e0b' }}>2</span>
              <span style={{ color: '#0a0a0a' }}>AS</span>
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-8 py-12">
        <h1
          className="text-4xl mb-8"
          style={{ fontWeight: 800, letterSpacing: '-0.03em', color: '#0a0a0a' }}
        >
          Seu perfil
        </h1>

        <form onSubmit={handleSalvar} className="space-y-6">
          <div>
            <label style={labelStyle}>
              Nome completo <span style={{ color: '#f59e0b' }}>*</span>
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Seu nome completo"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>E-mail (opcional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Objetivo pessoal (opcional)</label>
            <textarea
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              rows={3}
              placeholder="Ex: Aprovação no cargo 400 SEDES DF"
              style={{
                ...inputStyle,
                resize: 'vertical',
                lineHeight: 1.6,
              }}
            />
          </div>

          <div>
            <label style={labelStyle}>Meta de horas de estudo por dia</label>
            <input
              type="number"
              value={horasEstudoDia}
              onChange={(e) => setHorasEstudoDia(Number(e.target.value))}
              min={1}
              max={12}
              style={{ ...inputStyle, width: 120 }}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              style={{
                background: '#f59e0b',
                color: '#0a0a0a',
                border: 'none',
                borderRadius: 0,
                padding: '12px 28px',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                letterSpacing: '0.02em',
              }}
            >
              Salvar perfil
            </button>
          </div>
        </form>

        {/* Zona de perigo */}
        <div
          className="mt-16"
          style={{ borderTop: '1px solid #e2e2dc', paddingTop: 32 }}
        >
          <p
            className="font-mono text-xs uppercase mb-4"
            style={{ color: '#999999', letterSpacing: '0.08em' }}
          >
            Zona de Perigo
          </p>
          <button
            onClick={handleApagar}
            style={{
              background: 'none',
              color: '#dc2626',
              border: '1px solid #dc2626',
              borderRadius: 0,
              padding: '10px 20px',
              fontWeight: 500,
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            Apagar todos os dados
          </button>
          <p
            className="mt-2 text-xs"
            style={{ color: '#999999' }}
          >
            Remove perfil e progresso do cronograma. Ação irreversível.
          </p>
        </div>
      </main>
    </div>
  )
}

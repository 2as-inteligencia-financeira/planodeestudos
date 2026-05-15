import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useConcurso } from '../contexts/ConcursoContext'
import { useProfile } from '../hooks/useProfile'

function formatDataProva(iso: string) {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export default function Layout() {
  const { meta, config, bancaPerfil } = useConcurso()
  const { profile } = useProfile()
  const navigate = useNavigate()
  const [avisoDismissed, setAvisoDismissed] = useState(false)

  const primeiroNome = profile?.nome?.split(' ')[0]

  const isPreEdital = (config as Record<string, unknown> | undefined)?.status === 'PRE_EDITAL'
  const aviso = (config as Record<string, unknown> | undefined)?.aviso as string | undefined

  const diasAteProva = meta.dataProva
    ? Math.ceil((new Date(meta.dataProva).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null

  // Rótulo dinâmico do link de perfil da banca
  const bancaLabel = bancaPerfil
    ? `Perfil ${(bancaPerfil as Record<string, unknown>).estilo
        ? ((bancaPerfil as Record<string, unknown>).estilo as Record<string, unknown>).bancaProvavel as string ?? meta.banca
        : meta.banca}`
    : `Perfil ${meta.banca}`

  const navItems = [
    { to: `/${meta.id}/dashboard`, label: 'Dashboard' },
    { to: `/${meta.id}/cronograma`, label: 'Cronograma' },
    { to: `/${meta.id}/edital`, label: 'Edital' },
    { to: `/${meta.id}/teoria`, label: 'Teoria' },
    { to: `/${meta.id}/questoes`, label: 'Questões' },
    { to: `/${meta.id}/simulados`, label: 'Simulados' },
    { to: `/${meta.id}/estudo-caso`, label: 'Estudo de Caso' },
    { to: `/${meta.id}/quadrix`, label: bancaLabel },
    { to: `/${meta.id}/fases`, label: 'Fases' },
    { to: `/${meta.id}/progresso`, label: 'Progresso' },
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          background: '#fafaf7',
          borderRight: '1px solid #e2e2dc',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Logo + título */}
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid #e2e2dc' }}>
          <div className="flex items-baseline gap-2 mb-1">
            <span
              style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}
            >
              <span style={{ color: '#f59e0b' }}>2</span>
              <span style={{ color: '#0a0a0a' }}>AS</span>
            </span>
          </div>
          <p
            style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#999999',
            }}
          >
            Plano de Estudos
          </p>
        </div>

        {/* Bloco concurso */}
        <div
          style={{
            margin: '12px 12px 0',
            padding: '12px 14px',
            background: '#ffffff',
            border: '1px solid #e2e2dc',
          }}
        >
          {/* Badge PRÉ-EDITAL */}
          {isPreEdital && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                background: '#fef3c7',
                border: '1px solid #fcd34d',
                padding: '2px 7px',
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: '0.55rem', fontFamily: '"DM Mono", monospace', letterSpacing: '0.08em', color: '#92400e', fontWeight: 700 }}>
                PRÉ-EDITAL
              </span>
            </div>
          )}
          <p style={{ fontWeight: 700, fontSize: '0.8rem', color: '#0a0a0a', marginBottom: 2 }}>
            {meta.nome}
          </p>
          <p
            style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.65rem',
              color: '#999999',
              letterSpacing: '0.04em',
            }}
          >
            {meta.banca} · {meta.cargo}
          </p>
        </div>

        {/* Card dias até prova */}
        <div style={{ padding: '12px 12px 0' }}>
          <div
            style={{
              padding: '14px',
              background: '#ffffff',
              border: `1px solid ${isPreEdital ? '#fcd34d' : '#e2e2dc'}`,
            }}
          >
            {diasAteProva !== null ? (
              <>
                <p
                  style={{
                    fontSize: '2.25rem',
                    fontWeight: 800,
                    color: '#f59e0b',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}
                >
                  {diasAteProva}
                </p>
                <p
                  style={{
                    fontFamily: '"DM Mono", monospace',
                    fontSize: '0.65rem',
                    color: '#999999',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginTop: 4,
                  }}
                >
                  dias até a prova
                </p>
                <p
                  style={{
                    fontFamily: '"DM Mono", monospace',
                    fontSize: '0.65rem',
                    color: '#c0c0ba',
                    marginTop: 2,
                  }}
                >
                  {formatDataProva(meta.dataProva!)}
                </p>
              </>
            ) : (
              <>
                <p
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#92400e',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.3,
                  }}
                >
                  Data a definir
                </p>
                <p
                  style={{
                    fontFamily: '"DM Mono", monospace',
                    fontSize: '0.65rem',
                    color: '#b45309',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginTop: 6,
                  }}
                >
                  aguardando edital
                </p>
              </>
            )}
          </div>
        </div>

        {/* Saudação */}
        <div style={{ padding: '12px 14px 4px' }}>
          {primeiroNome ? (
            <p style={{ fontWeight: 300, fontSize: '0.85rem', color: '#606060' }}>
              Olá, {primeiroNome}.
            </p>
          ) : (
            <button
              onClick={() => navigate('/perfil')}
              style={{
                background: 'none',
                border: 'none',
                color: '#f59e0b',
                fontSize: '0.8rem',
                fontWeight: 500,
                cursor: 'pointer',
                padding: 0,
              }}
            >
              Configurar perfil →
            </button>
          )}
        </div>

        {/* Navegação */}
        <nav style={{ flex: 1, padding: '8px 8px', overflowY: 'auto' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'block',
                padding: '8px 12px',
                marginBottom: 2,
                fontSize: '0.82rem',
                fontWeight: isActive ? 700 : 400,
                color: isActive ? '#0a0a0a' : '#606060',
                background: isActive ? '#f59e0b' : 'transparent',
                textDecoration: 'none',
                transition: 'background 0.1s, color 0.1s',
              })}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                if (el.getAttribute('aria-current') !== 'page') {
                  el.style.background = '#e2e2dc'
                }
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                if (el.getAttribute('aria-current') !== 'page') {
                  el.style.background = 'transparent'
                }
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Rodapé sidebar */}
        <div style={{ padding: '12px 14px 20px', borderTop: '1px solid #e2e2dc' }}>
          <NavLink
            to="/"
            style={{ display: 'block', fontSize: '0.75rem', color: '#999999', textDecoration: 'none', marginBottom: 6 }}
          >
            ← Concursos
          </NavLink>
          <NavLink
            to="/perfil"
            style={{ display: 'block', fontSize: '0.75rem', color: '#999999', textDecoration: 'none' }}
          >
            ⚙ Perfil
          </NavLink>
        </div>
      </aside>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          marginLeft: 260,
          minHeight: '100vh',
          background: '#f0f0ea',
        }}
      >
        {/* Banner PRÉ-EDITAL */}
        {isPreEdital && !avisoDismissed && aviso && (
          <div
            style={{
              background: '#fffbeb',
              borderBottom: '2px solid #f59e0b',
              padding: '10px 40px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
            }}
          >
            <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: 1 }}>⚠️</span>
            <div style={{ flex: 1 }}>
              <span
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  fontWeight: 700,
                  color: '#92400e',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: 2,
                }}
              >
                PRÉ-EDITAL
              </span>
              <p style={{ fontSize: '0.8rem', color: '#78350f', lineHeight: 1.5 }}>
                {aviso}
              </p>
            </div>
            <button
              onClick={() => setAvisoDismissed(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#92400e',
                cursor: 'pointer',
                fontSize: '1rem',
                flexShrink: 0,
                padding: '0 4px',
              }}
              title="Fechar aviso"
            >
              ×
            </button>
          </div>
        )}

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 40px' }}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

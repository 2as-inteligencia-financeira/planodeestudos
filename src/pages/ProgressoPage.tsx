import { useState } from 'react'
import { useConcurso } from '../contexts/ConcursoContext'
import { useProgresso } from '../hooks/useProgresso'
import ProgressBar from '../components/ProgressBar'

function formatDate(s: string) {
  const [, m, d] = s.split('-')
  return `${d}/${m}`
}

export default function ProgressoPage() {
  const { cronograma, fases, benchmarks, meta } = useConcurso()
  const { progresso, resetProgresso } = useProgresso(meta.id)
  const [confirmarReset, setConfirmarReset] = useState(false)

  function handleReset() {
    if (confirmarReset) {
      resetProgresso()
      setConfirmarReset(false)
    } else {
      setConfirmarReset(true)
    }
  }

  const todayStr = new Date().toISOString().split('T')[0]

  // Semana atual
  function getDiasSemanaAtual() {
    for (const s of cronograma) {
      if (s.dias.some((d) => d.data === todayStr)) return s.dias
      const datas = s.dias.map((d) => d.data).sort()
      if (todayStr >= datas[0] && todayStr <= datas[datas.length - 1]) return s.dias
    }
    return []
  }

  // Métricas gerais
  const todosDias = cronograma.flatMap((s) => s.dias)
  const totalDias = todosDias.length
  const diasConcluidos = todosDias.filter((d) => progresso[d.data]).length
  const pctGeral = totalDias > 0 ? (diasConcluidos / totalDias) * 100 : 0

  // Por fase
  const faseStats = fases.map((fase) => {
    const semanasF = cronograma.filter((s) => s.fase === fase.id)
    const diasF = semanasF.flatMap((s) => s.dias)
    const total = diasF.length
    const feitos = diasF.filter((d) => progresso[d.data]).length
    const pct = total > 0 ? (feitos / total) * 100 : 0
    return { fase, total, feitos, pct }
  })

  const diasSemanaAtual = getDiasSemanaAtual()

  const distHoras = benchmarks.distribuicaoHorasEstudoPorDisciplina
  const distEntries = Object.entries(distHoras).map(([key, val]) => {
    const labels: Record<string, string> = {
      linguaPortuguesa: 'Língua Portuguesa',
      conhecimentosDF: 'Conhecimentos DF',
      tga: 'TGA',
      gestaoPessoas: 'Gestão de Pessoas',
      afo: 'AFO',
      osm: 'OS&M',
      projetos: 'Projetos',
      suasLoas: 'SUAS/LOAS',
      direitos: 'Direitos',
      programasDF: 'Programas DF',
    }
    const pct = parseInt(String(val).replace('%', '')) || 0
    return { label: labels[key] || key, pct, val }
  })

  const monoLabel: React.CSSProperties = {
    fontFamily: '"DM Mono", monospace',
    fontSize: '0.65rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: '#999999',
  }

  const faseBarColors = ['#f59e0b', '#d97706', '#b45309', '#92400e']

  const barColors = [
    '#f59e0b', '#d97706', '#b45309', '#92400e',
    '#606060', '#0a0a0a', '#999999', '#e2e2dc',
    '#f0f0ea', '#fafaf7',
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#0a0a0a', marginBottom: 4 }}>
            Progresso
          </h1>
          <p style={{ ...monoLabel, fontSize: '0.7rem' }}>
            Acompanhe sua evolução ao longo das {benchmarks.semanasEstudo} semanas
          </p>
        </div>
        <button
          onClick={handleReset}
          style={{
            padding: '8px 16px',
            fontSize: '0.8rem',
            fontWeight: 600,
            background: confirmarReset ? '#dc2626' : 'none',
            color: confirmarReset ? '#ffffff' : '#dc2626',
            border: '1px solid #dc2626',
            borderRadius: 0,
            cursor: 'pointer',
          }}
        >
          {confirmarReset ? 'Confirmar reset' : 'Resetar progresso'}
        </button>
      </div>

      {confirmarReset && (
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.82rem',
          }}
        >
          <p style={{ color: '#991b1b' }}>Tem certeza? Isso apagará todo o progresso salvo.</p>
          <button
            onClick={() => setConfirmarReset(false)}
            style={{ color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Resumo geral */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { val: totalDias, label: 'Total de dias' },
          { val: diasConcluidos, label: 'Concluídos' },
          { val: `${pctGeral.toFixed(0)}%`, label: 'Progresso geral' },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e2dc',
              padding: '20px 16px',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0a0a0a', letterSpacing: '-0.03em' }}>
              {item.val}
            </p>
            <p style={{ ...monoLabel, marginTop: 4 }}>{item.label}</p>
          </div>
        ))}
      </div>

      {/* Barra geral */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e2dc', padding: '20px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#606060', marginBottom: 8 }}>
          <span style={{ fontWeight: 600, color: '#0a0a0a' }}>Progresso total do cronograma</span>
          <span>{diasConcluidos} / {totalDias} dias</span>
        </div>
        <ProgressBar value={pctGeral} color="bg-amber-400" height="h-3" showLabel />
      </div>

      {/* Por fase */}
      <section>
        <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#0a0a0a', marginBottom: 12 }}>Progresso por Fase</h2>
        <div className="space-y-3">
          {faseStats.map(({ fase, total, feitos, pct }, idx) => (
            <div key={fase.id} style={{ background: '#ffffff', border: '1px solid #e2e2dc', padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0a0a0a' }}>{fase.nome}</p>
                  <p style={{ ...monoLabel, marginTop: 2 }}>{fase.periodo}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0a0a0a' }}>{feitos}/{total}</p>
                  <p style={{ ...monoLabel, marginTop: 2 }}>{pct.toFixed(0)}%</p>
                </div>
              </div>
              <div style={{ width: '100%', height: 6, background: '#f0f0ea' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${Math.max(pct, 2)}%`,
                    background: faseBarColors[idx] || '#f59e0b',
                    transition: 'width 0.5s',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Esta semana */}
      {diasSemanaAtual.length > 0 && (
        <section>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#0a0a0a', marginBottom: 12 }}>Esta Semana</h2>
          <div style={{ background: '#ffffff', border: '1px solid #e2e2dc', overflow: 'hidden' }}>
            <table style={{ width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#fafaf7', borderBottom: '1px solid #e2e2dc' }}>
                  {['Dia', 'Data', 'Bloco A', 'Status'].map((h) => (
                    <th key={h} style={{ padding: '8px 16px', textAlign: 'left', ...monoLabel }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {diasSemanaAtual.map((dia) => {
                  const feito = progresso[dia.data]
                  const isHoje = dia.data === todayStr
                  return (
                    <tr
                      key={dia.data}
                      style={{
                        borderBottom: '1px solid #f0f0ea',
                        background: isHoje ? 'rgba(245,158,11,0.06)' : feito ? 'rgba(0,0,0,0.01)' : '#ffffff',
                      }}
                    >
                      <td style={{ padding: '10px 16px', fontWeight: 500, color: '#0a0a0a' }}>{dia.diaSemana}</td>
                      <td style={{ padding: '10px 16px', color: '#606060' }}>{formatDate(dia.data)}</td>
                      <td style={{ padding: '10px 16px', color: '#606060', fontSize: '0.78rem' }}>
                        {dia.blocoA.disciplina} — {dia.blocoA.topico.slice(0, 50)}{dia.blocoA.topico.length > 50 ? '…' : ''}
                      </td>
                      <td style={{ padding: '10px 16px' }}>
                        <span
                          style={{
                            ...monoLabel,
                            background: feito ? '#d1fae5' : isHoje ? 'rgba(245,158,11,0.15)' : '#f0f0ea',
                            color: feito ? '#065f46' : isHoje ? '#92400e' : '#999999',
                            padding: '2px 8px',
                            fontWeight: 700,
                          }}
                        >
                          {feito ? 'FEITO' : isHoje ? 'HOJE' : 'PENDENTE'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Benchmarks */}
      <section>
        <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#0a0a0a', marginBottom: 12 }}>Benchmarks</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div style={{ background: '#ffffff', border: '1px solid #e2e2dc', padding: '20px' }}>
            <p style={{ ...monoLabel, marginBottom: 12 }}>Mínimos de Aprovação</p>
            <div className="space-y-2">
              {[
                { label: 'Gerais (20q)', val: `${benchmarks.minimoAprovacaoGerais} questões` },
                { label: 'Específicos', val: `${benchmarks.minimoAprovacaoEspecificos}%` },
                { label: 'Discursiva', val: `${benchmarks.minimoAprovacaoDiscursiva}%` },
              ].map((row) => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                  <span style={{ color: '#606060' }}>{row.label}</span>
                  <span style={{ fontWeight: 700, color: '#f59e0b' }}>{row.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e2dc', padding: '20px' }}>
            <p style={{ ...monoLabel, marginBottom: 12 }}>Metas por Fase</p>
            <div className="space-y-2">
              {Object.entries(benchmarks.metaPorFase).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                  <span style={{ color: '#606060' }}>{key.replace('fase', 'Fase ')}</span>
                  <span style={{ fontWeight: 700, color: '#0a0a0a' }}>{val}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Distribuição de horas */}
      <section>
        <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#0a0a0a', marginBottom: 12 }}>
          Distribuição de Horas por Disciplina
        </h2>
        <div style={{ background: '#ffffff', border: '1px solid #e2e2dc', padding: '20px' }}>
          <div className="space-y-3">
            {distEntries.map(({ label, pct, val }, i) => (
              <div key={label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: 4 }}>
                  <span style={{ color: '#0a0a0a' }}>{label}</span>
                  <span style={{ ...monoLabel, color: '#999999' }}>{val}</span>
                </div>
                <div style={{ width: '100%', height: 18, background: '#f0f0ea' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${Math.max(pct, 3)}%`,
                      background: barColors[i % barColors.length],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingRight: 6,
                      transition: 'width 0.5s',
                    }}
                  >
                    <span style={{ color: '#ffffff', fontSize: '0.65rem', fontWeight: 700 }}>{pct}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 20,
              paddingTop: 20,
              borderTop: '1px solid #e2e2dc',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 12,
              textAlign: 'center',
            }}
          >
            {[
              { val: benchmarks.semanasEstudo, label: 'semanas de estudo' },
              { val: `${benchmarks.horasEstudoTotal}h`, label: 'horas estimadas' },
              { val: benchmarks.diasAteProva, label: 'dias originais' },
            ].map((item) => (
              <div key={item.label}>
                <p style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0a0a0a', letterSpacing: '-0.02em' }}>
                  {item.val}
                </p>
                <p style={{ ...monoLabel, marginTop: 2 }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

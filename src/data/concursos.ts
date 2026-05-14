export interface ConcursoMeta {
  id: string
  nome: string
  nomeCompleto: string
  banca: string
  orgao: string
  cargo: string
  dataProva: string // ISO "2026-09-06"
  cor: string       // hex para accent do card
  ativo: boolean    // false = em breve / desabilitado
}

export const CONCURSOS: ConcursoMeta[] = [
  {
    id: 'sedes2026',
    nome: 'SEDES DF 2026',
    nomeCompleto: 'Especialista em Desenvolvimento e Assistência Social — Administração',
    banca: 'Quadrix',
    orgao: 'SEDES-DF / SMDF / SEJUS',
    cargo: 'Cargo 400',
    dataProva: '2026-09-06',
    cor: '#f59e0b',
    ativo: true,
  },
]

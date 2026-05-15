export interface ConcursoMeta {
  id: string
  nome: string
  nomeCompleto: string
  banca: string
  orgao: string
  cargo: string
  dataProva: string | null // ISO "2026-09-06" or null for PRÉ-EDITAL
  cor: string       // hex para accent do card
  ativo: boolean    // false = em breve / desabilitado
  status?: 'EDITAL_PUBLICADO' | 'PRE_EDITAL' // opcional; ausente = EDITAL_PUBLICADO
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

// ============================================================
// SEDES DF 2026 — EDAS Administração (Cargo 400)
// Banca: Quadrix | Prova: 06/09/2026
// Gerado em: 14/05/2026
// ============================================================

export type QuadrixPeso = "MUITO_ALTO" | "ALTO" | "MEDIO" | "BAIXO";

export interface Topico {
  id: string;
  nome: string;
  quadrixPeso: QuadrixPeso;
  quadrixDica: string;
  estimativaQuestoes: string;
  subtopicos?: string[];
}

export interface Disciplina {
  id: string;
  nome: string;
  quadrixPerfil: string;
  topics: Topico[];
}

export interface Secao {
  id: string;
  nome: string;
  questoes: number;
  peso: number;
  minimoAprovacao: number;
  disciplines: Disciplina[];
}

// ============================================================
// PERFIL DA BANCA
// ============================================================

export const QUADRIX_PERFIL = {
  estilo: "Aplicação > Memorização. Quadrix privilegia questões de interpretação e situações-problema.",
  nivelDificuldade: "Médio-alto nas específicas. Gerais costumam ser mais diretas.",
  atencoes: [
    "Adora cobrar legislação com alterações recentes — sempre checar a versão vigente",
    "Em LP, quase nunca cobra ortografia pura — foco em interpretação e morfossintaxe",
    "Em SUAS/LOAS cobra muito a distinção entre Proteção Básica e Especial",
    "Em AFO cobra os ESTÁGIOS (empenho/liquidação/pagamento) em toda prova",
    "Em TGA, Fayol e as funções PODC aparecem em pelo menos 2 questões",
    "Ética no serviço público quase sempre tem 1 questão garantida",
    "Questões de Gestão por Competências cresceram muito nas últimas provas Quadrix",
    "BSC com as 4 perspectivas é cobrado em todas as provas de Administração",
    "Lei Maria da Penha: edital garante mínimo 3 questões — prioridade máxima",
    "Legislação do DF (LC 840/2011): regime disciplinar é o trecho mais cobrado",
  ],
  discursiva: {
    formato: "Estudo de caso — múltiplos questionamentos em texto dissertativo",
    extensao: "Mínimo 20 linhas, máximo 30 linhas",
    criterios: {
      CAC: "Conteúdo e Atendimento ao Comando (peso 7)",
      OT: "Organização Textual (peso 1,5)",
      DLP: "Domínio da Língua Portuguesa (peso 1,5)",
    },
    tematica: "Gestão de políticas socioassistenciais, SUAS, desafios administrativos em contexto público",
    dica: "Sempre estruture: contextualização (2-3 linhas) → problema identificado → causas → soluções → indicadores de monitoramento",
  },
};

// ============================================================
// EDITAL VERTICALIZADO — COMPLETO COM INSIGHTS QUADRIX
// ============================================================

export const EDITAL_SEDES_2026 = {
  cargo: "Especialista em Desenvolvimento e Assistência Social — Administração",
  codigo: "Cargo 400",
  banca: "Quadrix",
  orgao: "SEDES-DF / SMDF / SEJUS",
  dataProva: "2026-09-06",
  turno: "Matutino",
  duracao: "4 horas",
  totalQuestoes: 60,
  taxaInscricao: 113.00,
  periodoInscricoes: { inicio: "2026-06-09", fim: "2026-07-13" },
  cronograma: {
    publicacaoEdital: "2026-05-14",
    inicioInscricoes: "2026-06-09",
    fimInscricoes: "2026-07-13",
    dataProva: "2026-09-06",
    gabaritoPreliminiar: "2026-09-09",
    resultadoFinal: "2027-04-02",
  },
  sections: [

    // =========================================================
    // SEÇÃO 1 — CONHECIMENTOS GERAIS (20 questões, peso 1)
    // =========================================================
    {
      id: "gerais",
      nome: "Conhecimentos Gerais",
      questoes: 20,
      peso: 1,
      minimoAprovacao: 10,
      disciplines: [

        // -------------------------------------------------
        // LÍNGUA PORTUGUESA
        // -------------------------------------------------
        {
          id: "lp",
          nome: "Língua Portuguesa",
          quadrixPerfil: "Quadrix cobra 7-9 questões de LP. Foco absoluto em interpretação (30%) e morfossintaxe (40%). Ortografia pura raramente aparece.",
          topics: [
            {
              id: "lp-01",
              nome: "Compreensão e interpretação de textos de gêneros variados",
              quadrixPeso: "MUITO_ALTO" as QuadrixPeso,
              quadrixDica: "Sempre há 2-3 questões. Leia o texto inteiro antes. Quadrix cobra inferência, linguagem figurada e sentido contextual. Evite respostas absolutas ('sempre', 'nunca').",
              estimativaQuestoes: "2-3",
            },
            {
              id: "lp-02",
              nome: "Reconhecimento de tipos e gêneros textuais",
              quadrixPeso: "MEDIO" as QuadrixPeso,
              quadrixDica: "Costuma vir embutido na questão de interpretação. Saiba distinguir dissertativo-argumentativo, expositivo, narrativo e injuntivo.",
              estimativaQuestoes: "0-1",
            },
            {
              id: "lp-03",
              nome: "Domínio da ortografia oficial",
              quadrixPeso: "BAIXO" as QuadrixPeso,
              quadrixDica: "Quadrix raramente cobra ortografia isolada. Pode aparecer como parte de questão de reescrita. Foque em acento diferencial e hífen.",
              estimativaQuestoes: "0-1",
            },
            {
              id: "lp-04",
              nome: "Mecanismos de coesão textual — referenciação, conectores, tempos e modos verbais",
              quadrixPeso: "MUITO_ALTO" as QuadrixPeso,
              quadrixDica: "Questão garantida. Quadrix adora testar o valor semântico dos conectivos (embora, porém, contudo, logo, portanto). Saiba substituição de pronomes e referenciação anafórica.",
              estimativaQuestoes: "1-2",
            },
            {
              id: "lp-05",
              nome: "Estrutura morfossintática — classes de palavras, coordenação, subordinação",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Foco em identificar o tipo de oração subordinada e sua função. Classes de palavras vêm em contexto, não isoladas.",
              estimativaQuestoes: "1",
            },
            {
              id: "lp-06",
              nome: "Emprego dos sinais de pontuação",
              quadrixPeso: "MEDIO" as QuadrixPeso,
              quadrixDica: "Vem quase sempre como questão de reescrita (reescrever o período mantendo o sentido). Domine o uso de vírgula no sujeito composto e nas orações adjetivas.",
              estimativaQuestoes: "0-1",
            },
            {
              id: "lp-07",
              nome: "Concordância verbal e nominal",
              quadrixPeso: "MUITO_ALTO" as QuadrixPeso,
              quadrixDica: "Quadrix adora os casos especiais: sujeito composto posposto, pronomes de tratamento, partitivos. Muito cobrado em redação oficial também.",
              estimativaQuestoes: "1-2",
            },
            {
              id: "lp-08",
              nome: "Regência verbal e nominal",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Verbos mais cobrados: assistir, visar, aspirar, preferir, obedecer. Regência nominal de 'alusão', 'dúvida', 'objeção'.",
              estimativaQuestoes: "1",
            },
            {
              id: "lp-09",
              nome: "Emprego do sinal indicativo de crase",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Quadrix testa crase antes de pronomes demonstrativos (aquela/aquele), antes de nomes de cidades e em locuções. Regra: fusão de 'a' preposição + 'a' artigo feminino.",
              estimativaQuestoes: "1",
            },
            {
              id: "lp-10",
              nome: "Colocação dos pronomes átonos",
              quadrixPeso: "MEDIO" as QuadrixPeso,
              quadrixDica: "Foco em próclise com palavras atrativas (negação, pronomes relativos, conjunções subordinativas). Ênclise com verbo no início do período.",
              estimativaQuestoes: "0-1",
            },
            {
              id: "lp-11",
              nome: "Reescrita de frases e parágrafos — significação, substituição, reorganização",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Tipo favorito do Quadrix: reescrever mantendo o sentido. Avalia concordância, regência, coesão e pontuação ao mesmo tempo. Pratique muito.",
              estimativaQuestoes: "1",
            },
          ],
        },

        // -------------------------------------------------
        // CONHECIMENTOS DO DF + LEGISLAÇÃO + PRIMEIROS SOCORROS
        // -------------------------------------------------
        {
          id: "df-leg",
          nome: "Conhecimentos do DF, Política para Mulheres, Legislação e Primeiros Socorros",
          quadrixPerfil: "Quadrix cobra ~8-10 questões desta disciplina. Lei Maria da Penha é garantido mínimo 3. LC 840 (regime disciplinar) é o trecho mais cobrado da legislação do servidor.",
          topics: [
            {
              id: "df-01",
              nome: "Realidade do DF e da RIDE — aspectos étnicos, sociais, históricos, geográficos, culturais, políticos e econômicos",
              quadrixPeso: "MEDIO" as QuadrixPeso,
              quadrixDica: "Quadrix cobra atualidades do DF (índices socioeconômicos, estrutura administrativa, regiões administrativas) e a legislação da RIDE (LC 94/1998 + Decreto 7.469/2011).",
              estimativaQuestoes: "1-2",
              subtopicos: [
                "Estrutura administrativa do DF (RA, CLDF, Governador)",
                "Indicadores socioeconômicos do DF",
                "RIDE-DF: municípios integrantes e objetivos",
                "LC Federal 94/1998 e Decreto 7.469/2011",
              ],
            },
            {
              id: "df-02",
              nome: "Plano Distrital de Política para Mulheres — PDPM",
              quadrixPeso: "MEDIO" as QuadrixPeso,
              quadrixDica: "Cobra conceitos gerais, eixos do plano e interface com a assistência social. Vem associado às questões de Lei Maria da Penha.",
              estimativaQuestoes: "0-1",
            },
            {
              id: "df-03",
              nome: "Lei Orgânica do DF — Título VI (Ordem Social e Meio Ambiente)",
              quadrixPeso: "MEDIO" as QuadrixPeso,
              quadrixDica: "Foco nos artigos sobre assistência social, saúde e educação. Quadrix cobra a distinção entre competências do DF vs. municípios.",
              estimativaQuestoes: "1",
            },
            {
              id: "df-04",
              nome: "LC 840/2011 — Regime Jurídico dos Servidores do DF",
              quadrixPeso: "MUITO_ALTO" as QuadrixPeso,
              quadrixDica: "COBRADO EM TODA PROVA DO DF. Foco em: Título I (disposições preliminares), Título V (deveres), Título VI (regime disciplinar — penalidades e prazos) e Título VII (PAD). Memorize as penalidades e seus prazos prescritivos.",
              estimativaQuestoes: "2-3",
              subtopicos: [
                "Título I — Disposições preliminares: cargo, função, provimento",
                "Título V — Deveres do servidor (art. 14)",
                "Título VI — Regime disciplinar: infrações e penalidades (advertência, suspensão, demissão, cassação, destituição)",
                "Prazos de prescrição: 5 anos (demissão), 2 anos (suspensão), 180 dias (advertência)",
                "Título VII — PAD: sindicância e processo disciplinar",
              ],
            },
            {
              id: "df-05",
              nome: "Lei Maria da Penha — Lei 11.340/2006 e alterações",
              quadrixPeso: "MUITO_ALTO" as QuadrixPeso,
              quadrixDica: "MÍNIMO 3 QUESTÕES GARANTIDAS em edital. Quadrix cobra: definição de violência doméstica (formas — física, psicológica, sexual, patrimonial, moral), medidas protetivas de urgência, Juizados de Violência Doméstica, assistência à mulher. Leia a lei completa.",
              estimativaQuestoes: "3-4",
              subtopicos: [
                "Art. 5º — Conceito de violência doméstica e relações de afeto",
                "Art. 7º — Formas de violência doméstica: física, psicológica, sexual, patrimonial e moral",
                "Arts. 18-24 — Medidas protetivas de urgência",
                "Art. 33 — Competência dos Juizados de Violência Doméstica",
                "Alterações recentes: Lei 13.827/2019 (afastamento imediato), Lei 14.550/2023",
              ],
            },
            {
              id: "df-06",
              nome: "Lei Distrital 7.484/2024 — Lei de criação da carreira SUAS/DF",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Lei nova, específica para este concurso. Quadrix cobra estrutura da carreira (EDAS e TDAS), requisitos, atribuições e jornada. Leia integralmente — é curta.",
              estimativaQuestoes: "1-2",
            },
            {
              id: "df-07",
              nome: "Noções básicas de primeiros socorros",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Quadrix cobra o protocolo de ação (reconhecer → acionar SAMU/192 → agir). Vem como situação-problema: 'João está inconsciente, o que fazer?'. Memorize as condutas por situação.",
              estimativaQuestoes: "1-2",
              subtopicos: [
                "Cuidados iniciais com a vítima: segurança da cena, avaliação da consciência",
                "Acionamento do socorro: SAMU 192, Bombeiros 193",
                "Engasgo: manobra de Heimlich (adultos e bebês)",
                "Sangramento: pressão direta, não usar torniquete caseiro",
                "Fratura: imobilização, não movimentar",
                "Queimadura: água corrente fria (mínimo 10min), não usar pasta dental",
                "Desmaio: deitar com pernas elevadas, afrouxar roupas",
                "Convulsão: não segurar, afastar objetos, decúbito lateral após crise",
                "Intoxicação: não induzir vômito, acionar CIATOX",
              ],
            },
          ],
        },
      ],
    } as Secao,

    // =========================================================
    // SEÇÃO 2 — CONHECIMENTOS ESPECÍFICOS (40 questões, peso 2)
    // =========================================================
    {
      id: "especificos",
      nome: "Conhecimentos Específicos",
      questoes: 40,
      peso: 2,
      minimoAprovacao: 40,
      disciplines: [

        // -------------------------------------------------
        // BLOCO COMUM A TODOS OS EDAS
        // -------------------------------------------------
        {
          id: "suas-fund",
          nome: "Fundamentos, Organização, Gestão e Marcos Normativos da Assistência Social",
          quadrixPerfil: "Quadrix cobra ~6-8 questões deste bloco. LOAS/PNAS/SUAS são a espinha dorsal. A distinção Proteção Básica x Especial cai em toda prova.",
          topics: [
            {
              id: "suas-01",
              nome: "LOAS, PNAS/2004 e SUAS — princípios, diretrizes, objetivos, proteções, seguranças, matricialidade",
              quadrixPeso: "MUITO_ALTO" as QuadrixPeso,
              quadrixDica: "LOAS: arts. 1-4 (objetivos e princípios), art. 6 (organização), art. 6-A a 6-D (benefícios). PNAS: princípios (supremacia, universalização, respeito à dignidade, igualdade) e diretrizes (descentralização, participação). Seguranças: acolhida, convívio, renda e autonomia.",
              estimativaQuestoes: "2-3",
              subtopicos: [
                "Lei 8.742/1993 — LOAS: princípios, objetivos, diretrizes",
                "PNAS/2004: proteção social básica e especial (média e alta complexidade)",
                "Seguranças socioassistenciais: acolhida, convívio/vivência, renda/sustento autônomo, apoio e auxílio",
                "Matricialidade sociofamiliar: família como referência central",
                "Territorialização: organização por território de referência",
                "Intersetorialidade: interface com saúde, educação, habitação",
              ],
            },
            {
              id: "suas-02",
              nome: "NOB/SUAS 2012 — responsabilidades, cofinanciamento, gestão do trabalho, rede",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Quadrix foca nas responsabilidades de cada ente (União, Estados, Municípios/DF) e no cofinanciamento. Cobrado: qual ente financia o quê.",
              estimativaQuestoes: "1-2",
              subtopicos: [
                "Responsabilidades da União: cofinanciar, normatizar, coordenar SUAS",
                "Responsabilidades dos Estados: apoio técnico e financeiro aos municípios",
                "Responsabilidades dos Municípios/DF: executar serviços e gerir a rede local",
                "Cofinanciamento federal: pisos (PSB, PSE média e alta complexidade)",
                "Gestão do trabalho no SUAS: NOB-RH/SUAS",
                "Vigilância socioassistencial: monitoramento e avaliação",
              ],
            },
            {
              id: "suas-03",
              nome: "NOB-RH/SUAS — Resolução CNAS 269/2006",
              quadrixPeso: "MEDIO" as QuadrixPeso,
              quadrixDica: "Cobra equipe de referência CRAS (mínimo 2 técnicos nível superior para até 500 famílias/ano), composição das equipes e princípios da gestão do trabalho.",
              estimativaQuestoes: "0-1",
              subtopicos: [
                "Equipe de referência CRAS: composição mínima por porte do município",
                "Equipe de referência CREAS: composição por abrangência",
                "Princípios da gestão do trabalho: capacitação permanente, carreira",
                "Parâmetros de carga horária dos trabalhadores do SUAS",
              ],
            },
            {
              id: "suas-04",
              nome: "Tipificação Nacional de Serviços Socioassistenciais",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Quadrix adora testar qual serviço pertence a qual nível de proteção. Memorize: PAIF e SCFV = proteção básica (CRAS). PAEFI, Abordagem Social, Acolhimento = especial.",
              estimativaQuestoes: "1-2",
              subtopicos: [
                "Proteção Social Básica — CRAS: PAIF, SCFV (por faixa etária)",
                "PSE Média Complexidade — CREAS: PAEFI, Abordagem Social, serviços em situações específicas",
                "PSE Alta Complexidade: acolhimento institucional (crianças, idosos, adultos, mulheres em situação de violência), República, Família Acolhedora, Medida Socioeducativa",
              ],
            },
            {
              id: "suas-05",
              nome: "Instâncias de pactuação e controle social — CIT, CIB, Conselhos, Conferências",
              quadrixPeso: "MEDIO" as QuadrixPeso,
              quadrixDica: "Distinguir: CIT (pactuação tripartite — União, estados, municípios), CIB (bipartite — estado e municípios). Conselhos = deliberação + controle social.",
              estimativaQuestoes: "0-1",
            },
            {
              id: "suas-06",
              nome: "CadÚnico e Protocolo de Gestão Integrada de Serviços, Benefícios e Transferências",
              quadrixPeso: "MEDIO" as QuadrixPeso,
              quadrixDica: "CadÚnico como porta de entrada de múltiplos benefícios. Protocolo de Gestão Integrada: articulação entre BPC, Bolsa Família e serviços socioassistenciais.",
              estimativaQuestoes: "0-1",
            },
            {
              id: "suas-07",
              nome: "MROSC — Lei 13.019/2014: parceria, chamamento público, execução, monitoramento, prestação de contas",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Quadrix cobra: distinção Termo de Colaboração x Termo de Fomento (quem propõe?), chamamento público (regra) x dispensa/inexigibilidade, obrigatoriedade de prestação de contas.",
              estimativaQuestoes: "1",
              subtopicos: [
                "Termo de Colaboração: OSC executa proposta da Administração",
                "Termo de Fomento: OSC propõe, Administração apoia",
                "Acordo de Cooperação: sem repasse financeiro",
                "Chamamento público: obrigatório, salvo dispensa/inexigibilidade",
                "Conselho gestor / accountability: controle social dos recursos",
              ],
            },
          ],
        },

        {
          id: "direitos",
          nome: "Direitos, Violações de Direitos e Vulnerabilidades Sociais",
          quadrixPerfil: "Quadrix cobra ~3-5 questões. Foco em ECA, Lei Maria da Penha (já na parte de gerais tb) e Estatuto do Idoso. Temas de diversidade cresceram muito.",
          topics: [
            {
              id: "dir-01",
              nome: "Crianças, adolescentes e juventude — ECA, Estatuto Digital, SINASE, violência",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "ECA: prioridade absoluta, doutrina da proteção integral, convivência familiar. SINASE: medidas socioeducativas (advertência, LA, PSC, semiliberdade, internação). Estatuto Digital (Lei 14.811/2024): proteção no ambiente digital.",
              estimativaQuestoes: "1-2",
            },
            {
              id: "dir-02",
              nome: "Mulheres e violência de gênero — Lei Maria da Penha, medidas protetivas, rede de atendimento",
              quadrixPeso: "MUITO_ALTO" as QuadrixPeso,
              quadrixDica: "Complementa as questões da parte de gerais. Aqui foca em políticas públicas: Casa da Mulher Brasileira, CREAS especializado, Delegacias da Mulher, Casas-Abrigo.",
              estimativaQuestoes: "1",
            },
            {
              id: "dir-03",
              nome: "Pessoa idosa e PcD — Estatuto da Pessoa Idosa, Política Nacional do Idoso, LBI",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Estatuto do Idoso: prioridade de atendimento, BPC, acesso a serviços. LBI (Lei 13.146/2015): modelo social de deficiência (não mais médico). Cobra conceito de 'pessoa com deficiência' na LBI.",
              estimativaQuestoes: "1",
            },
            {
              id: "dir-04",
              nome: "População em situação de rua, pobreza e exclusão social",
              quadrixPeso: "MEDIO" as QuadrixPeso,
              quadrixDica: "Decreto 7.053/2009: Política Nacional. Centro POP: serviço para população em situação de rua. Foco em princípios (cidadania, não discriminação, respeito às escolhas).",
              estimativaQuestoes: "0-1",
            },
            {
              id: "dir-05",
              nome: "Diversidade, equidade, relações étnico-raciais, diversidade sexual e homotransfobia",
              quadrixPeso: "MEDIO" as QuadrixPeso,
              quadrixDica: "Quadrix cobrou muito em concursos recentes: STF equiparou homotransfobia ao crime de racismo (ADO 26/MI 4733). Interseccionalidade: raça + gênero + classe.",
              estimativaQuestoes: "0-1",
            },
          ],
        },

        {
          id: "programas-df",
          nome: "Programas, Benefícios e Instrumentos Socioassistenciais do DF",
          quadrixPerfil: "Legislação específica do DF — NOVA neste edital. Quadrix cobra detalhes da lei. Leia as normas indicadas.",
          topics: [
            {
              id: "prog-01",
              nome: "Cartão Prato Cheio — Lei 7.009/2021 e Decreto 42.873/2021",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Programa de provimento alimentar emergencial do DF. Cobra: beneficiários (famílias em extrema pobreza), valor, critérios de acesso e gestão pela SEDES.",
              estimativaQuestoes: "0-1",
            },
            {
              id: "prog-02",
              nome: "Cartão Gás — Lei 6.938/2021 e Decreto 42.376/2021",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Subsidio para aquisição de GLP. Beneficiários: famílias inscritas no CadÚnico com baixa renda. Gestão compartilhada SEDES + AGEFIS.",
              estimativaQuestoes: "0-1",
            },
            {
              id: "prog-03",
              nome: "Plano DF Social — Lei 7.008/2021 + Decreto 42.872/2021 + Portaria 42/2023",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Política de desenvolvimento social do DF. Cobra: objetivos, eixos, público-alvo e articulação com o SUAS.",
              estimativaQuestoes: "0-1",
            },
            {
              id: "prog-04",
              nome: "Benefícios Eventuais do DF — Lei 5.165/2013 e Decreto 35.191/2014",
              quadrixPeso: "MEDIO" as QuadrixPeso,
              quadrixDica: "Benefícios eventuais: natalidade, morte, vulnerabilidade temporária, calamidade. Distinção de benefícios contínuos (BPC) vs. eventuais.",
              estimativaQuestoes: "0-1",
            },
            {
              id: "prog-05",
              nome: "SISAN / Restaurante Comunitário — Decreto 33.329/2011",
              quadrixPeso: "MEDIO" as QuadrixPeso,
              quadrixDica: "Sistema Nacional de Segurança Alimentar no DF. Restaurantes Comunitários: equipamentos públicos para alimentação subsidiada a famílias vulneráveis.",
              estimativaQuestoes: "0-1",
            },
          ],
        },

        // -------------------------------------------------
        // BLOCO ESPECÍFICO — ADMINISTRAÇÃO (Cargo 400)
        // -------------------------------------------------
        {
          id: "tga",
          nome: "Teoria Geral e Processos Administrativos",
          quadrixPerfil: "Quadrix cobra ~6-8 questões deste bloco. PODC + Fayol + estruturas organizacionais + BSC são garantidos. Cultua organizacional cresceu muito.",
          topics: [
            {
              id: "tga-01",
              nome: "Evolução do pensamento administrativo — Taylor, Fayol, Weber, Relações Humanas, Sistêmica, Contingencial",
              quadrixPeso: "MUITO_ALTO" as QuadrixPeso,
              quadrixDica: "Quadrix adora associar: 'qual teoria defende X?'. Grave: Taylor = eficiência operacional; Fayol = funções adm; Weber = burocracia/legalidade; Mayo = fator humano; Burns & Stalker = contingencial.",
              estimativaQuestoes: "1-2",
              subtopicos: [
                "Administração Científica (Taylor): tempo-movimento, homo economicus",
                "Teoria Clássica (Fayol): 14 princípios, 5 funções (POD-C-C)",
                "Burocracia (Weber): dominação legal-racional, impessoalidade",
                "Relações Humanas (Mayo/Elton): Experiência de Hawthorne, grupos informais",
                "Behaviorismo (Simon): racionalidade limitada, satisficing",
                "Teoria dos Sistemas (Bertalanffy): sistema aberto, feedback, homeostase",
                "Contingencial (Burns & Stalker): estrutura orgânica vs. mecanicista",
              ],
            },
            {
              id: "tga-02",
              nome: "Funções administrativas — PODC: planejamento, organização, direção e controle",
              quadrixPeso: "MUITO_ALTO" as QuadrixPeso,
              quadrixDica: "CERTO ABSOLUTO em prova Quadrix. Vem em situação-problema: 'ao elaborar o orçamento, o gestor exerce qual função?'. Planejamento: definir objetivos. Organização: alocar recursos. Direção: liderar. Controle: verificar conformidade.",
              estimativaQuestoes: "1-2",
            },
            {
              id: "tga-03",
              nome: "Planejamento estratégico, tático e operacional — missão, visão, SWOT, APO, BSC, processo decisório",
              quadrixPeso: "MUITO_ALTO" as QuadrixPeso,
              quadrixDica: "BSC: 4 perspectivas (financeira, clientes, processos internos, aprendizado e crescimento). SWOT: interno (forças/fraquezas) x externo (oportunidades/ameaças). APO: Drucker — metas acordadas entre gestor e subordinado.",
              estimativaQuestoes: "1-2",
              subtopicos: [
                "Níveis: estratégico (longo prazo/alta cúpula), tático (médio prazo/gerências), operacional (curto prazo/execução)",
                "Missão, visão, valores: identidade organizacional",
                "Análise SWOT: forças, fraquezas, oportunidades, ameaças",
                "APO: participação na definição de metas, avaliação por resultados",
                "BSC: mapa estratégico, 4 perspectivas, indicadores e metas",
                "Processo decisório: modelo racional, racionalidade limitada (Simon), lata de lixo (Cohen/March)",
              ],
            },
            {
              id: "tga-04",
              nome: "Estruturas organizacionais, departamentalização, cultura, liderança, motivação, comunicação, descentralização, delegação",
              quadrixPeso: "MUITO_ALTO" as QuadrixPeso,
              quadrixDica: "Estruturas: linear (autoridade única), funcional (especialização), linha-staff, matricial (dupla autoridade — CUIDADO). Cultura: Schein (artefatos, valores, pressupostos). Liderança: Hersey & Blanchard (situacional).",
              estimativaQuestoes: "2-3",
              subtopicos: [
                "Departamentalização: por função, produto, territorial, cliente, processo, matricial",
                "Cultura organizacional: Schein (3 níveis), Handy (4 tipos), Deal & Kennedy",
                "Clima organizacional: percepção do ambiente de trabalho (pode mudar rapidamente)",
                "Liderança situacional (Hersey & Blanchard): E1/E2/E3/E4 x M1/M2/M3/M4",
                "Liderança transformacional vs. transacional",
                "Comunicação: formal x informal, vertical x horizontal, ruído, feedback",
                "Descentralização: delegação de autoridade; desconcentração: delegação de competência",
              ],
            },
          ],
        },

        {
          id: "osm",
          nome: "Organização, Sistemas, Métodos (OS&M) e Qualidade",
          quadrixPerfil: "Quadrix cobra ~4-5 questões. PDCA, BSC, 5S e fluxogramas são garantidos. Modelos de excelência do setor público cresceram.",
          topics: [
            {
              id: "osm-01",
              nome: "Arquitetura organizacional — mapeamento, análise e distribuição de processos e do trabalho",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "BPM (Business Process Management): mapeamento AS-IS (como é) → análise → TO-BE (como deve ser). BPMN: notação padrão para fluxogramas de processo.",
              estimativaQuestoes: "1",
              subtopicos: [
                "Processo: conjunto de atividades que transformam insumos em produtos/serviços",
                "Mapeamento AS-IS e TO-BE",
                "BPM: gestão por processos vs. gestão funcional",
                "Cadeia de valor (Porter): atividades primárias e de apoio",
              ],
            },
            {
              id: "osm-02",
              nome: "Gráficos de organização e controle — organogramas, fluxogramas, manuais e formulários",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Quadrix testa a simbologia básica de fluxograma (losango = decisão, retângulo = atividade, oval = início/fim). Organograma: vertical, horizontal e circular.",
              estimativaQuestoes: "1",
            },
            {
              id: "osm-03",
              nome: "Gestão da qualidade — PDCA, 5S, Six Sigma, ISO, modelos de excelência da gestão pública",
              quadrixPeso: "MUITO_ALTO" as QuadrixPeso,
              quadrixDica: "PDCA: Plan (planejar), Do (executar), Check (verificar), Act (agir/corrigir). 5S: Seiri, Seiton, Seisou, Seiketsu, Shitsuke. Six Sigma: redução de defeitos/variabilidade. MEG (Modelo de Excelência da Gestão): GESPÚBLICA/ENAP.",
              estimativaQuestoes: "1-2",
              subtopicos: [
                "PDCA: ciclo de melhoria contínua; SDCA: ciclo de manutenção",
                "5S: senso de utilização, organização, limpeza, saúde/padronização, autodisciplina",
                "Ferramentas da qualidade: diagrama de Ishikawa (causa-efeito), Pareto, histograma, dispersão",
                "Six Sigma: DMAIC (definir, medir, analisar, melhorar, controlar)",
                "ISO 9001: requisitos para sistema de gestão da qualidade",
                "MEGP / Instrumento para Avaliação da Gestão Pública (IAGP)",
              ],
            },
            {
              id: "osm-04",
              nome: "Indicadores de desempenho (KPIs) e Balanced Scorecard",
              quadrixPeso: "MUITO_ALTO" as QuadrixPeso,
              quadrixDica: "BSC aparece em TODA prova de Administração Quadrix. As 4 perspectivas: Financeira (resultado), Clientes (satisfação), Processos Internos (eficiência), Aprendizado e Crescimento (capacidade). Indicadores: eficácia (resultado), eficiência (uso de recursos), efetividade (impacto).",
              estimativaQuestoes: "1-2",
            },
          ],
        },

        {
          id: "proj",
          nome: "Gestão de Projetos",
          quadrixPerfil: "Quadrix cobra ~1-2 questões. Foco em conceitos básicos do PMBOK e distinguir projeto de processo/operação.",
          topics: [
            {
              id: "proj-01",
              nome: "Elaboração, análise, avaliação e etapas dos projetos",
              quadrixPeso: "MEDIO" as QuadrixPeso,
              quadrixDica: "Projeto: temporário, resultado único. Ciclo de vida: iniciação, planejamento, execução, monitoramento/controle, encerramento. EAP (Estrutura Analítica do Projeto).",
              estimativaQuestoes: "1",
              subtopicos: [
                "Projeto vs. processo: temporário (projeto) vs. contínuo (processo)",
                "Ciclo de vida: iniciação → planejamento → execução → monitoramento → encerramento",
                "Restrições triplas: escopo, tempo, custo (+ qualidade)",
                "EAP: decomposição hierárquica do trabalho",
                "Partes interessadas (stakeholders): identificação e gestão",
              ],
            },
            {
              id: "proj-02",
              nome: "Modelos de gestão de projetos — PMBOK, ágil, PRINCE2",
              quadrixPeso: "MEDIO" as QuadrixPeso,
              quadrixDica: "Quadrix cobra o básico: 5 grupos de processos PMBOK e distinção preditivo (cascata) vs. adaptativo (ágil/Scrum).",
              estimativaQuestoes: "0-1",
            },
          ],
        },

        {
          id: "afo",
          nome: "Administração Financeira e Orçamentária (AFO)",
          quadrixPerfil: "Quadrix cobra ~5-7 questões. Estágios da despesa (empenho/liquidação/pagamento) caem em TODA prova. PPA/LDO/LOA e LRF são garantidos.",
          topics: [
            {
              id: "afo-01",
              nome: "Princípios e processo orçamentário — PPA, LDO e LOA — métodos, técnicas e normas legais",
              quadrixPeso: "MUITO_ALTO" as QuadrixPeso,
              quadrixDica: "Distinção fundamental: PPA (4 anos, objetivos e metas), LDO (1 ano, metas fiscais e prioridades), LOA (1 ano, autorização da despesa). Princípios: unidade, universalidade, anualidade, exclusividade, equilíbrio, legalidade.",
              estimativaQuestoes: "1-2",
              subtopicos: [
                "PPA: vigência, conteúdo (programas e ações) e elaboração",
                "LDO: metas fiscais, riscos fiscais, Anexo de Metas, PLOA compatível com PPA",
                "LOA: categorias econômicas (correntes e capital), programas, ações",
                "Princípios orçamentários: unidade, universalidade, anualidade, exclusividade, não vinculação, orçamento bruto",
                "Técnicas: orçamento por programas, base zero, incremental, participativo",
              ],
            },
            {
              id: "afo-02",
              nome: "Receita pública — categorias, fontes, estágios e dívida ativa",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Estágios da receita: lançamento → arrecadação → recolhimento. Dívida ativa: crédito tributário e não tributário vencido e não pago. Receitas originárias (patrimônio) vs. derivadas (tributos).",
              estimativaQuestoes: "1",
            },
            {
              id: "afo-03",
              nome: "Despesa pública — categorias e estágios",
              quadrixPeso: "MUITO_ALTO" as QuadrixPeso,
              quadrixDica: "ORDEM DOS ESTÁGIOS: Fixação → Empenho → Liquidação → Pagamento. Empenho: reserva. Liquidação: verificação do direito adquirido. Pagamento: extinção da obrigação. Quadrix cobra em qual estágio ocorre cada ato.",
              estimativaQuestoes: "1-2",
              subtopicos: [
                "Empenho: estimativo, global e ordinário",
                "Liquidação: verificação da entrega do bem/serviço",
                "Pagamento: ordem bancária, cheque",
                "Despesas correntes: pessoal, juros, custeio",
                "Despesas de capital: investimentos, inversões financeiras, amortização",
              ],
            },
            {
              id: "afo-04",
              nome: "Suprimento de fundos, Restos a Pagar e Despesas de Exercícios Anteriores",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Restos a pagar: processados (liquidados mas não pagos) e não processados (empenhados mas não liquidados). Suprimento de fundos: despesas urgentes e excepcionais (cartão corporativo).",
              estimativaQuestoes: "1",
            },
            {
              id: "afo-05",
              nome: "SIAFEM-DF e sistemas de planejamento e execução financeira no DF",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "SIAFEM é o sistema contábil-financeiro do DF. Quadrix cobra: finalidade (registro, controle e geração de informações), integração com SIGGO e demais sistemas do GDF.",
              estimativaQuestoes: "1",
            },
            {
              id: "afo-06",
              nome: "Lei de Responsabilidade Fiscal — LRF (LC 101/2000)",
              quadrixPeso: "MUITO_ALTO" as QuadrixPeso,
              quadrixDica: "LRF: equilíbrio fiscal, transparência, controle e responsabilidade. Cobra: limites de gastos com pessoal (50% RCL União, 60% estados e municípios), conceito de RCL, medidas de ajuste.",
              estimativaQuestoes: "1",
              subtopicos: [
                "Receita Corrente Líquida (RCL): conceito e cálculo",
                "Limites de despesa com pessoal: 50% RCL (União), 60% (estados e municípios/DF)",
                "Metas de resultado primário e nominal",
                "Vedações em anos eleitorais",
                "Relatório de Gestão Fiscal e Relatório Resumido da Execução Orçamentária",
              ],
            },
          ],
        },

        {
          id: "gp",
          nome: "Gestão de Pessoas no Setor Público",
          quadrixPerfil: "Quadrix cobra ~5-7 questões. Teorias de motivação e liderança situacional são garantidas. Gestão por competências cresceu muito. Tendências em GP setor público é tema atual.",
          topics: [
            {
              id: "gp-01",
              nome: "Conceitos, importância e fundamentos da administração na gestão de pessoas",
              quadrixPeso: "MEDIO" as QuadrixPeso,
              quadrixDica: "Evolução: de Administração de Pessoal → RH → Gestão de Pessoas → Gestão Estratégica de Pessoas. No setor público: legalidade, impessoalidade e concurso como base.",
              estimativaQuestoes: "0-1",
            },
            {
              id: "gp-02",
              nome: "Comportamento organizacional — indivíduo, grupos e equipes; conflito; mudança",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Grupo vs. equipe: equipe tem objetivo compartilhado e responsabilidade mútua. Conflito: funcional (construtivo) vs. disfuncional. Gestão da mudança: resistência, modelos de Lewin (descongelar-mover-recongelar).",
              estimativaQuestoes: "1",
            },
            {
              id: "gp-03",
              nome: "Teorias de motivação — Maslow, Herzberg, McClelland, Vroom, Adams",
              quadrixPeso: "MUITO_ALTO" as QuadrixPeso,
              quadrixDica: "Cai em TODA prova. Maslow: hierarquia de necessidades (fisiológicas → segurança → social → estima → autorrealização). Herzberg: higiênicos (previnem insatisfação) vs. motivacionais (geram satisfação). Vroom: expectativa, instrumentalidade, valência. Adams: equidade.",
              estimativaQuestoes: "1-2",
              subtopicos: [
                "Maslow: pirâmide, satisfação de baixo para cima, apenas necessidade não satisfeita motiva",
                "Herzberg (2 fatores): higiênicos (salário, condições) vs. motivacionais (realização, reconhecimento)",
                "McClelland (3 necessidades): realização, afiliação e poder",
                "Vroom (Expectância): Motivação = Expectativa × Instrumentalidade × Valência",
                "Adams (Equidade): comparação com outros, iniquidade gera tensão",
                "McGregor: Teoria X (controle) vs. Teoria Y (autonomia)",
              ],
            },
            {
              id: "gp-04",
              nome: "Liderança — estilos, teorias situacionais e contemporâneas",
              quadrixPeso: "MUITO_ALTO" as QuadrixPeso,
              quadrixDica: "Hersey & Blanchard (Situacional): 4 estilos (E1-direção, E2-orientação, E3-apoio, E4-delegação) × 4 níveis de maturidade (M1-M4). Transformacional: carismático, inspirador. Transacional: troca.",
              estimativaQuestoes: "1",
            },
            {
              id: "gp-05",
              nome: "Recrutamento, seleção, análise e descrição de cargos",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Setor público: recrutamento por concurso (externo) ou remoção/redistribuição (interno). Análise de cargo: tarefas, responsabilidades, requisitos. Descrição: CBO.",
              estimativaQuestoes: "1",
            },
            {
              id: "gp-06",
              nome: "Gestão de desempenho — métodos, avaliação, T&D, capacitação",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Métodos de avaliação: escalas gráficas, 360°, BARS, APO. No setor público: avaliação de desempenho vinculada à estabilidade (probatório) e à progressão. T&D: levantamento de necessidades → programação → execução → avaliação (Kirkpatrick).",
              estimativaQuestoes: "1",
            },
            {
              id: "gp-07",
              nome: "Gestão por competências",
              quadrixPeso: "MUITO_ALTO" as QuadrixPeso,
              quadrixDica: "Decreto 9.991/2019 (Política Nacional de Desenvolvimento de Pessoas no setor federal). CHA: Conhecimentos, Habilidades e Atitudes. Competências organizacionais (core) vs. individuais. Mapeamento → avaliação → desenvolvimento.",
              estimativaQuestoes: "1",
            },
            {
              id: "gp-08",
              nome: "Administração de cargos, carreiras e salários; remuneração no setor público",
              quadrixPeso: "MEDIO" as QuadrixPeso,
              quadrixDica: "Setor público: vencimento + gratificações + adicionais. Subsídio: remuneração única. Plano de carreira: progressão (tempo) vs. promoção (mérito).",
              estimativaQuestoes: "0-1",
            },
            {
              id: "gp-09",
              nome: "Tendências em gestão de pessoas no setor público",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Quadrix cobrou muito em 2023-2025: teletrabalho/trabalho remoto no setor público, equipes ágeis, gestão de diversidade, saúde mental do servidor. Interface com reforma administrativa.",
              estimativaQuestoes: "1",
            },
            {
              id: "gp-10",
              nome: "Ética no serviço público — comportamento, atitudes e organização do trabalho",
              quadrixPeso: "ALTO" as QuadrixPeso,
              quadrixDica: "Decreto 1.171/1994: Código de Ética do servidor federal (referência mesmo no DF). Princípios: moralidade, probidade, honestidade. Vedações: uso do cargo para benefício próprio.",
              estimativaQuestoes: "1",
            },
          ],
        },
      ],
    } as Secao,
  ],
};

// ============================================================
// CRONOGRAMA DE ESTUDOS — 16 SEMANAS (18/Mai a 05/Set/2026)
// ============================================================

export interface DiaEstudo {
  data: string;
  diaSemana: string;
  blocoA: { disciplina: string; topico: string; duracao: 60 };
  blocoB: { disciplina: string; topico: string; duracao: 90 };
  blocoC: { atividade: string; duracao: 30 };
  isSimulado: boolean;
}

export interface SemanaEstudo {
  semana: number;
  fase: number;
  periodo: string;
  foco: string;
  metaAcerto: number;
  dias: DiaEstudo[];
}

export const FASES = [
  {
    id: 1,
    nome: "Fase 1 — Fundamentos",
    semanas: "1-6",
    periodo: "18/Mai a 27/Jun",
    descricao: "Construção do alicerce em LP, Conhecimentos DF e matérias específicas de maior peso: TGA, GP e AFO.",
    metaAcerto: 55,
    objetivos: [
      "Dominar as funções administrativas PODC",
      "Conhecer as teorias de motivação e liderança",
      "Entender o ciclo orçamentário completo",
      "Mapear toda a estrutura do SUAS e LOAS",
      "Memorizar a estrutura da Lei Maria da Penha",
      "Dominar o regime disciplinar da LC 840/2011",
    ],
  },
  {
    id: 2,
    nome: "Fase 2 — Aprofundamento",
    semanas: "7-11",
    periodo: "29/Jun a 01/Ago",
    descricao: "Aprofundar OS&M, Qualidade, Projetos, legislação socioassistencial do DF e direitos. Eliminar lacunas identificadas na Fase 1.",
    metaAcerto: 65,
    objetivos: [
      "Dominar fluxogramas, PDCA, BSC e ISO",
      "Conhecer todos os programas socioassistenciais do DF",
      "Aprofundar MROSC e instâncias de controle",
      "Elevar desempenho nos Conhecimentos Gerais",
      "Treinar estudo de caso discursiva",
    ],
  },
  {
    id: 3,
    nome: "Fase 3 — Volume de Questões",
    semanas: "12-14",
    periodo: "03 a 22/Ago",
    descricao: "Máximo volume de questões Quadrix. Cada dia: 40-60 questões + revisão focada nos erros. Zero conteúdo novo.",
    metaAcerto: 72,
    objetivos: [
      "Resolver mínimo 500 questões no total da fase",
      "Identificar e eliminar padrões de erro recorrente",
      "Treinar gestão de tempo (60 questões em 4h)",
      "3 estudo de caso completo com cronometro",
    ],
  },
  {
    id: 4,
    nome: "Fase 4 — Reta Final",
    semanas: "15-16",
    periodo: "24/Ago a 05/Set",
    descricao: "Apenas simulados completos e revisão dos pontos críticos. Preservar energia para a prova.",
    metaAcerto: 78,
    objetivos: [
      "3 simulados completos com gabarito",
      "Revisão rápida (flashcards) dos tópicos de maior erro",
      "Descanso na véspera",
    ],
  },
];

export const CRONOGRAMA: SemanaEstudo[] = [

  // ===================================================
  // FASE 1 — FUNDAMENTOS (Semanas 1-6)
  // ===================================================

  {
    semana: 1,
    fase: 1,
    periodo: "18 a 23/Mai",
    foco: "Interpretação de texto + Evolução TGA + Intro GP + Ciclo orçamentário + SUAS fundamentos",
    metaAcerto: 50,
    dias: [
      { data: "2026-05-18", diaSemana: "Segunda", blocoA: { disciplina: "Língua Portuguesa", topico: "Compreensão e interpretação de textos — tipos de texto, inferência, linguagem figurada", duracao: 60 }, blocoB: { disciplina: "TGA", topico: "Evolução do pensamento administrativo: Taylor, Fayol, Weber — características e críticas", duracao: 90 }, blocoC: { atividade: "10 questões TGA clássico Quadrix", duracao: 30 }, isSimulado: false },
      { data: "2026-05-19", diaSemana: "Terça", blocoA: { disciplina: "Conhecimentos do DF", topico: "Realidade do DF e RIDE — estrutura administrativa, LC 94/1998, Decreto 7.469/2011", duracao: 60 }, blocoB: { disciplina: "Gestão de Pessoas", topico: "Conceitos de GP, evolução histórica, funções do órgão de RH no setor público", duracao: 90 }, blocoC: { atividade: "10 questões GP conceitos básicos", duracao: 30 }, isSimulado: false },
      { data: "2026-05-20", diaSemana: "Quarta", blocoA: { disciplina: "Língua Portuguesa", topico: "Coesão textual — elementos de referenciação, conectivos e seu valor semântico", duracao: 60 }, blocoB: { disciplina: "AFO", topico: "Ciclo orçamentário — PPA, LDO e LOA: conceitos, vigência, conteúdo e hierarquia", duracao: 90 }, blocoC: { atividade: "10 questões AFO orçamento básico", duracao: 30 }, isSimulado: false },
      { data: "2026-05-21", diaSemana: "Quinta", blocoA: { disciplina: "LC 840/2011", topico: "Títulos I e V — disposições preliminares e deveres do servidor do DF", duracao: 60 }, blocoB: { disciplina: "SUAS/LOAS", topico: "LOAS: objetivos, princípios e diretrizes. SUAS: proteção social básica e especial — conceitos e diferenças", duracao: 90 }, blocoC: { atividade: "10 questões SUAS/LOAS fundamentos", duracao: 30 }, isSimulado: false },
      { data: "2026-05-22", diaSemana: "Sexta", blocoA: { disciplina: "Lei Maria da Penha", topico: "Arts. 1º-7º — conceito de violência doméstica, formas de violência (física, psicológica, sexual, patrimonial, moral)", duracao: 60 }, blocoB: { disciplina: "PNAS/2004", topico: "Organização da assistência social — proteções afiançadas, seguranças socioassistenciais, matricialidade sociofamiliar", duracao: 90 }, blocoC: { atividade: "10 questões Lei Maria da Penha arts. 1-7", duracao: 30 }, isSimulado: false },
      { data: "2026-05-23", diaSemana: "Sábado", blocoA: { disciplina: "SIMULADO", topico: "20 questões: LP (10) + TGA (10)", duracao: 60 }, blocoB: { disciplina: "CORREÇÃO + ESTUDO DE CASO", topico: "Corrigir simulado + Leitura de estudo de caso Quadrix anterior (SUAS)", duracao: 90 }, blocoC: { atividade: "Revisão dos erros e anotação nos flashcards", duracao: 30 }, isSimulado: true },
    ],
  },

  {
    semana: 2,
    fase: 1,
    periodo: "25 a 30/Mai",
    foco: "Morfossintaxe LP + PODC + Comportamento organizacional + Receita/Despesa pública + NOB-SUAS",
    metaAcerto: 52,
    dias: [
      { data: "2026-05-25", diaSemana: "Segunda", blocoA: { disciplina: "Língua Portuguesa", topico: "Morfossintaxe: classes de palavras (substantivo, adjetivo, verbo, pronome, conjunção) — em contexto", duracao: 60 }, blocoB: { disciplina: "TGA", topico: "Funções administrativas PODC: Planejamento e Organização — níveis estratégico, tático e operacional", duracao: 90 }, blocoC: { atividade: "10 questões PODC Quadrix", duracao: 30 }, isSimulado: false },
      { data: "2026-05-26", diaSemana: "Terça", blocoA: { disciplina: "Conhecimentos do DF", topico: "LODF — Título VI: Ordem Social e Meio Ambiente. Direitos sociais no DF", duracao: 60 }, blocoB: { disciplina: "Gestão de Pessoas", topico: "Comportamento organizacional: grupos e equipes, conflito (funcional e disfuncional), gestão da mudança (Lewin)", duracao: 90 }, blocoC: { atividade: "10 questões comportamento organizacional", duracao: 30 }, isSimulado: false },
      { data: "2026-05-27", diaSemana: "Quarta", blocoA: { disciplina: "Língua Portuguesa", topico: "Concordância verbal e nominal — casos especiais: sujeito composto posposto, coletivos, pronomes de tratamento", duracao: 60 }, blocoB: { disciplina: "AFO", topico: "Receita pública: categorias econômicas, fontes, estágios (lançamento/arrecadação/recolhimento) e dívida ativa", duracao: 90 }, blocoC: { atividade: "10 questões receita pública Quadrix", duracao: 30 }, isSimulado: false },
      { data: "2026-05-28", diaSemana: "Quinta", blocoA: { disciplina: "LC 840/2011", topico: "Título VI — Regime Disciplinar: infrações, penalidades (advertência, suspensão, demissão, cassação, destituição) e prazos de prescrição", duracao: 60 }, blocoB: { disciplina: "NOB-SUAS", topico: "Responsabilidades de cada ente federado, cofinanciamento — pisos de proteção social básica e especial", duracao: 90 }, blocoC: { atividade: "10 questões LC 840 regime disciplinar", duracao: 30 }, isSimulado: false },
      { data: "2026-05-29", diaSemana: "Sexta", blocoA: { disciplina: "Lei Maria da Penha", topico: "Arts. 8º-24: atendimento, medidas protetivas de urgência — tipos e concessão ex officio", duracao: 60 }, blocoB: { disciplina: "PNAS/SUAS", topico: "Seguranças socioassistenciais (acolhida, convívio, renda, autonomia). Territorialização e intersetorialidade", duracao: 90 }, blocoC: { atividade: "10 questões medidas protetivas Maria da Penha", duracao: 30 }, isSimulado: false },
      { data: "2026-05-30", diaSemana: "Sábado", blocoA: { disciplina: "SIMULADO", topico: "20 questões: GP (10) + AFO (10)", duracao: 60 }, blocoB: { disciplina: "CORREÇÃO + ESTUDO DE CASO", topico: "Corrigir simulado + Estudo de caso: planejamento estratégico em órgão de assistência social", duracao: 90 }, blocoC: { atividade: "Revisão de erros e flashcards", duracao: 30 }, isSimulado: true },
    ],
  },

  {
    semana: 3,
    fase: 1,
    periodo: "01 a 06/Jun",
    foco: "Regência + Crase + PODC (Direção/Controle) + Liderança + Despesa pública + NOB-RH + Tipificação SUAS",
    metaAcerto: 54,
    dias: [
      { data: "2026-06-01", diaSemana: "Segunda", blocoA: { disciplina: "Língua Portuguesa", topico: "Regência verbal e nominal — verbos mais cobrados (assistir, visar, aspirar, preferir, obedecer)", duracao: 60 }, blocoB: { disciplina: "TGA", topico: "Funções administrativas: Direção (liderança, motivação, comunicação) e Controle (padrões, medição, correção)", duracao: 90 }, blocoC: { atividade: "10 questões funções administrativas Quadrix", duracao: 30 }, isSimulado: false },
      { data: "2026-06-02", diaSemana: "Terça", blocoA: { disciplina: "Conhecimentos do DF", topico: "PDPM — Plano Distrital de Política para Mulheres: eixos, objetivos e interface com SUAS", duracao: 60 }, blocoB: { disciplina: "Gestão de Pessoas", topico: "Liderança: teorias dos traços, comportamental (Blake & Mouton), situacional (Hersey & Blanchard) e transformacional", duracao: 90 }, blocoC: { atividade: "10 questões liderança Quadrix", duracao: 30 }, isSimulado: false },
      { data: "2026-06-03", diaSemana: "Quarta", blocoA: { disciplina: "Língua Portuguesa", topico: "Crase: regras gerais, antes de pronomes demonstrativos, nomes de cidades e locuções", duracao: 60 }, blocoB: { disciplina: "AFO", topico: "Despesa pública: categorias econômicas, ESTÁGIOS (empenho/liquidação/pagamento) — detalhamento e casos práticos", duracao: 90 }, blocoC: { atividade: "10 questões estágios da despesa Quadrix", duracao: 30 }, isSimulado: false },
      { data: "2026-06-04", diaSemana: "Quinta", blocoA: { disciplina: "LC 840/2011", topico: "Título VII — PAD: sindicância e processo administrativo disciplinar. Fases, contraditório e ampla defesa", duracao: 60 }, blocoB: { disciplina: "SUAS", topico: "NOB-RH/SUAS (Res. 269/2006): equipes de referência CRAS e CREAS — composição mínima por porte", duracao: 90 }, blocoC: { atividade: "10 questões PAD + NOB-RH", duracao: 30 }, isSimulado: false },
      { data: "2026-06-05", diaSemana: "Sexta", blocoA: { disciplina: "Lei Maria da Penha", topico: "Arts. 25-46 + alterações recentes (Lei 13.827/2019, Lei 14.550/2023). Juizados de violência doméstica", duracao: 60 }, blocoB: { disciplina: "SUAS", topico: "Tipificação Nacional de Serviços Socioassistenciais: serviços da proteção básica (PAIF, SCFV) e especial (PAEFI, Abordagem Social, Acolhimento)", duracao: 90 }, blocoC: { atividade: "10 questões Tipificação + Maria da Penha final", duracao: 30 }, isSimulado: false },
      { data: "2026-06-06", diaSemana: "Sábado", blocoA: { disciplina: "SIMULADO", topico: "20 questões: LC 840 (5) + Maria da Penha (5) + SUAS/LOAS (10)", duracao: 60 }, blocoB: { disciplina: "CORREÇÃO + ESTUDO DE CASO", topico: "Estudo de caso: gestão de equipes em CRAS — análise problema, causas, soluções e indicadores", duracao: 90 }, blocoC: { atividade: "Revisão de erros e flashcards", duracao: 30 }, isSimulado: true },
    ],
  },

  {
    semana: 4,
    fase: 1,
    periodo: "08 a 13/Jun",
    foco: "Pontuação + Reescrita + Estruturas organizacionais + Motivação + Suprimento/Restos + CadÚnico + Primeiros Socorros",
    metaAcerto: 56,
    dias: [
      { data: "2026-06-08", diaSemana: "Segunda", blocoA: { disciplina: "Língua Portuguesa", topico: "Emprego dos sinais de pontuação — vírgula, ponto e vírgula, dois pontos: casos especiais", duracao: 60 }, blocoB: { disciplina: "TGA", topico: "Estruturas organizacionais: linear, funcional, linha-staff, matricial, por projetos, rede. Vantagens e desvantagens", duracao: 90 }, blocoC: { atividade: "10 questões estruturas organizacionais", duracao: 30 }, isSimulado: false },
      { data: "2026-06-09", diaSemana: "Terça", blocoA: { disciplina: "Primeiros Socorros", topico: "Engasgo (Heimlich adultos e bebês), sangramento (pressão direta, torniquete), fratura (imobilização)", duracao: 60 }, blocoB: { disciplina: "Gestão de Pessoas", topico: "Teorias de motivação: Maslow, Herzberg (2 fatores), McClelland (3 necessidades), McGregor (X e Y)", duracao: 90 }, blocoC: { atividade: "10 questões motivação Quadrix", duracao: 30 }, isSimulado: false },
      { data: "2026-06-10", diaSemana: "Quarta", blocoA: { disciplina: "Língua Portuguesa", topico: "Reescrita de frases e parágrafos — substituição mantendo sentido, reorganização, mudança de gênero textual", duracao: 60 }, blocoB: { disciplina: "AFO", topico: "Suprimento de fundos, Restos a Pagar (processados e não processados) e Despesas de Exercícios Anteriores", duracao: 90 }, blocoC: { atividade: "10 questões AFO restos a pagar e créditos adicionais", duracao: 30 }, isSimulado: false },
      { data: "2026-06-11", diaSemana: "Quinta", blocoA: { disciplina: "Lei 7.484/2024", topico: "Lei da carreira SUAS/DF — estrutura, cargos EDAS/TDAS, requisitos, atribuições, jornada, remuneração", duracao: 60 }, blocoB: { disciplina: "SUAS", topico: "Instâncias de pactuação e controle social: CIT, CIB, CNAS, Conselhos estaduais/municipais e Conferências", duracao: 90 }, blocoC: { atividade: "10 questões instâncias SUAS + Lei 7.484", duracao: 30 }, isSimulado: false },
      { data: "2026-06-12", diaSemana: "Sexta", blocoA: { disciplina: "Primeiros Socorros", topico: "Queimadura, desmaio, convulsão e intoxicação — condutas corretas e o que NÃO fazer", duracao: 60 }, blocoB: { disciplina: "SUAS", topico: "CadÚnico: porta de entrada, critérios de inclusão, articulação com BPC e transferências de renda. Protocolo Gestão Integrada", duracao: 90 }, blocoC: { atividade: "10 questões Primeiros Socorros + CadÚnico", duracao: 30 }, isSimulado: false },
      { data: "2026-06-13", diaSemana: "Sábado", blocoA: { disciplina: "SIMULADO", topico: "30 questões Gerais completo: LP (10) + DF/Legislação (10) + Primeiros Socorros (10)", duracao: 60 }, blocoB: { disciplina: "CORREÇÃO + ESTUDO DE CASO", topico: "Corrigir + Intro Estudo de Caso discursiva: estrutura de resposta (contextualização → problema → causas → soluções → indicadores)", duracao: 90 }, blocoC: { atividade: "Revisão e planejamento da semana 5", duracao: 30 }, isSimulado: true },
    ],
  },

  {
    semana: 5,
    fase: 1,
    periodo: "15 a 20/Jun",
    foco: "Revisão LP completa + Cultura organizacional + R&S + LRF + MROSC + Programas DF",
    metaAcerto: 58,
    dias: [
      { data: "2026-06-15", diaSemana: "Segunda", blocoA: { disciplina: "Língua Portuguesa", topico: "Revisão completa LP: simulado 20 questões focado nos tópicos com mais erro", duracao: 60 }, blocoB: { disciplina: "TGA", topico: "Cultura e clima organizacional: Schein (3 níveis), Handy (4 tipos), cultura x clima, cultura forte e fraca", duracao: 90 }, blocoC: { atividade: "10 questões cultura organizacional Quadrix", duracao: 30 }, isSimulado: false },
      { data: "2026-06-16", diaSemana: "Terça", blocoA: { disciplina: "Conhecimentos do DF", topico: "Revisão geral Conhecimentos DF: simulado 10 questões (LODF, PDPM, LC 840, Lei Maria da Penha, Lei 7.484)", duracao: 60 }, blocoB: { disciplina: "Gestão de Pessoas", topico: "Recrutamento e seleção no setor público. Análise e descrição de cargos. Integração de pessoal (onboarding)", duracao: 90 }, blocoC: { atividade: "10 questões R&S setor público", duracao: 30 }, isSimulado: false },
      { data: "2026-06-17", diaSemana: "Quarta", blocoA: { disciplina: "Língua Portuguesa", topico: "Colocação pronominal: próclise, ênclise, mesóclise — palavras atrativas e regras de uso", duracao: 60 }, blocoB: { disciplina: "AFO", topico: "LRF (LC 101/2000): RCL, limites de pessoal (50%/60%), metas fiscais, relatórios obrigatórios. SIAFEM-DF: finalidade e integração", duracao: 90 }, blocoC: { atividade: "10 questões LRF Quadrix", duracao: 30 }, isSimulado: false },
      { data: "2026-06-18", diaSemana: "Quinta", blocoA: { disciplina: "MROSC", topico: "Lei 13.019/2014: Termo de Colaboração x Termo de Fomento x Acordo de Cooperação. Chamamento público — regra e exceções", duracao: 60 }, blocoB: { disciplina: "SUAS", topico: "Direitos e vulnerabilidades: ECA (doutrina proteção integral, prioridade absoluta), SINASE (medidas socioeducativas)", duracao: 90 }, blocoC: { atividade: "10 questões MROSC + ECA", duracao: 30 }, isSimulado: false },
      { data: "2026-06-19", diaSemana: "Sexta", blocoA: { disciplina: "Programas DF", topico: "Cartão Prato Cheio (Lei 7.009/2021), Cartão Gás (Lei 6.938/2021), Plano DF Social (Lei 7.008/2021)", duracao: 60 }, blocoB: { disciplina: "SUAS/Direitos", topico: "Estatuto Idoso, Política Nacional do Idoso, LBI (modelo social x médico). População em situação de rua (Decreto 7.053/2009)", duracao: 90 }, blocoC: { atividade: "10 questões Programas DF + Estatuto Idoso", duracao: 30 }, isSimulado: false },
      { data: "2026-06-20", diaSemana: "Sábado", blocoA: { disciplina: "SIMULADO", topico: "SIMULADO COMPLETO: 60 questões (20 gerais + 40 específicos) — META: ≥55%", duracao: 60 }, blocoB: { disciplina: "CORREÇÃO COMPLETA", topico: "Análise detalhada: % por disciplina, padrão de erro, tópicos prioritários para Fase 2", duracao: 90 }, blocoC: { atividade: "Atualizar dashboard de progresso", duracao: 30 }, isSimulado: true },
    ],
  },

  {
    semana: 6,
    fase: 1,
    periodo: "22 a 27/Jun",
    foco: "Fechamento Fase 1: Processo decisório + Gestão desempenho + Gestão mudança + Benefícios Eventuais + Diversidade",
    metaAcerto: 60,
    dias: [
      { data: "2026-06-22", diaSemana: "Segunda", blocoA: { disciplina: "Língua Portuguesa", topico: "Tipos e gêneros textuais: dissertativo-argumentativo, expositivo, narrativo, injuntivo. Simulado 10 questões LP focado em interpretação", duracao: 60 }, blocoB: { disciplina: "TGA", topico: "Processo decisório e modelos: racional, racionalidade limitada (Simon/satisficing), modelo político, 'lata de lixo'. Comunicação organizacional", duracao: 90 }, blocoC: { atividade: "10 questões processo decisório + comunicação", duracao: 30 }, isSimulado: false },
      { data: "2026-06-23", diaSemana: "Terça", blocoA: { disciplina: "Conhecimentos do DF", topico: "Revisão final LC 840/2011: simulado 10 questões focado em regime disciplinar e PAD", duracao: 60 }, blocoB: { disciplina: "Gestão de Pessoas", topico: "Gestão de desempenho: métodos (escalas gráficas, 360°, BARS, APO), erros de avaliação. T&D: ciclo e modelo de Kirkpatrick", duracao: 90 }, blocoC: { atividade: "10 questões gestão de desempenho Quadrix", duracao: 30 }, isSimulado: false },
      { data: "2026-06-24", diaSemana: "Quarta", blocoA: { disciplina: "Língua Portuguesa", topico: "Revisão geral focada nos tipos de questão que mais errou. Resolução de questões Quadrix anteriores", duracao: 60 }, blocoB: { disciplina: "AFO", topico: "Revisão completa AFO: simulado 20 questões. Foco em estágios, LRF e PPA/LDO/LOA", duracao: 90 }, blocoC: { atividade: "Revisão dos erros AFO", duracao: 30 }, isSimulado: false },
      { data: "2026-06-25", diaSemana: "Quinta", blocoA: { disciplina: "Programas DF", topico: "Benefícios Eventuais (Lei 5.165/2013), SISAN/Restaurante Comunitário (Decreto 33.329/2011)", duracao: 60 }, blocoB: { disciplina: "SUAS", topico: "Revisão integradora SUAS/LOAS/PNAS: simulado 20 questões focado nas distinções proteção básica x especial", duracao: 90 }, blocoC: { atividade: "Flashcards SUAS/LOAS", duracao: 30 }, isSimulado: false },
      { data: "2026-06-26", diaSemana: "Sexta", blocoA: { disciplina: "Ética", topico: "Ética no serviço público: Decreto 1.171/1994, princípios, vedações, penalidades. Probidade administrativa", duracao: 60 }, blocoB: { disciplina: "Direitos/Diversidade", topico: "Diversidade sexual e relações étnico-raciais: homotransfobia (STF-ADO26), racismo estrutural, interseccionalidade, política de cotas", duracao: 90 }, blocoC: { atividade: "10 questões ética + diversidade", duracao: 30 }, isSimulado: false },
      { data: "2026-06-27", diaSemana: "Sábado", blocoA: { disciplina: "SIMULADO FASE 1 FINAL", topico: "60 questões completo — META: ≥60%", duracao: 60 }, blocoB: { disciplina: "DIAGNÓSTICO", topico: "Análise por disciplina: identificar top 3 tópicos mais fracos para priorizar na Fase 2", duracao: 90 }, blocoC: { atividade: "Planejamento ajuste Fase 2", duracao: 30 }, isSimulado: true },
    ],
  },

  // ===================================================
  // FASE 2 — APROFUNDAMENTO (Semanas 7-11)
  // ===================================================

  {
    semana: 7,
    fase: 2,
    periodo: "29/Jun a 04/Jul",
    foco: "OS&M: Mapeamento de processos + Qualidade (PDCA + 5S) + Gestão por competências + Reforço AFO",
    metaAcerto: 62,
    dias: [
      { data: "2026-06-29", diaSemana: "Segunda", blocoA: { disciplina: "Língua Portuguesa", topico: "Questões Quadrix anteriores (banco): 15 questões — focar nos tipos de erro da Fase 1", duracao: 60 }, blocoB: { disciplina: "OS&M", topico: "Mapeamento de processos: BPM, BPMN, cadeia de valor (Porter), análise AS-IS e TO-BE", duracao: 90 }, blocoC: { atividade: "10 questões BPM e processos Quadrix", duracao: 30 }, isSimulado: false },
      { data: "2026-06-30", diaSemana: "Terça", blocoA: { disciplina: "Conhecimentos DF", topico: "Revisão focada nos erros da Fase 1. Simulado temático 15 questões Conhecimentos DF", duracao: 60 }, blocoB: { disciplina: "Gestão de Pessoas", topico: "Gestão por competências: CHA, mapeamento, avaliação e desenvolvimento. Decreto 9.991/2019 — PNDP", duracao: 90 }, blocoC: { atividade: "10 questões gestão por competências Quadrix", duracao: 30 }, isSimulado: false },
      { data: "2026-07-01", diaSemana: "Quarta", blocoA: { disciplina: "Língua Portuguesa", topico: "Prática: 15 questões variadas Quadrix — todas as tipologias", duracao: 60 }, blocoB: { disciplina: "OS&M", topico: "Gráficos de organização: organogramas (tipos), fluxogramas (simbologia completa), manuais administrativos e formulários", duracao: 90 }, blocoC: { atividade: "10 questões fluxogramas e organogramas", duracao: 30 }, isSimulado: false },
      { data: "2026-07-02", diaSemana: "Quinta", blocoA: { disciplina: "LOAS", topico: "LOAS aprofundado: BPC (critérios, renda per capita, revisão 2 anos), benefícios eventuais, OSC na assistência social", duracao: 60 }, blocoB: { disciplina: "OS&M/Qualidade", topico: "PDCA: plan-do-check-act + SDCA. Ferramentas da qualidade: Ishikawa, Pareto, histograma, folha de verificação, diagrama de dispersão", duracao: 90 }, blocoC: { atividade: "10 questões PDCA + ferramentas qualidade", duracao: 30 }, isSimulado: false },
      { data: "2026-07-03", diaSemana: "Sexta", blocoA: { disciplina: "Violência de gênero", topico: "Política Nacional de Enfrentamento à Violência contra as Mulheres: rede de atendimento, Casa da Mulher Brasileira, Casas-Abrigo", duracao: 60 }, blocoB: { disciplina: "OS&M/Qualidade", topico: "5S (seiri, seiton, seisou, seiketsu, shitsuke), Six Sigma (DMAIC), ISO 9001, MEGP/IAGP — gestão pública por excelência", duracao: 90 }, blocoC: { atividade: "10 questões 5S + Six Sigma + ISO Quadrix", duracao: 30 }, isSimulado: false },
      { data: "2026-07-04", diaSemana: "Sábado", blocoA: { disciplina: "SIMULADO", topico: "30 questões OS&M + Qualidade + GP competências", duracao: 60 }, blocoB: { disciplina: "ESTUDO DE CASO", topico: "Proposta de estudo de caso: gestão da qualidade em CRAS. Escrever resposta completa (20-30 linhas)", duracao: 90 }, blocoC: { atividade: "Revisão erros e flashcards OS&M", duracao: 30 }, isSimulado: true },
    ],
  },

  {
    semana: 8,
    fase: 2,
    periodo: "06 a 11/Jul",
    foco: "BSC + KPIs + Gestão de Projetos + Cargos e Carreiras + NOB-SUAS aprofundado + Tipificação detalhada",
    metaAcerto: 64,
    dias: [
      { data: "2026-07-06", diaSemana: "Segunda", blocoA: { disciplina: "Língua Portuguesa", topico: "Questões Quadrix: interpretação avançada + coesão + concordância (20 questões)", duracao: 60 }, blocoB: { disciplina: "OS&M", topico: "BSC: mapa estratégico, 4 perspectivas (financeira, clientes, processos internos, aprendizado), indicadores lead e lag, metas", duracao: 90 }, blocoC: { atividade: "10 questões BSC Quadrix", duracao: 30 }, isSimulado: false },
      { data: "2026-07-07", diaSemana: "Terça", blocoA: { disciplina: "Conhecimentos DF", topico: "Revisão Maria da Penha: 15 questões Quadrix focadas nas alterações recentes e medidas protetivas", duracao: 60 }, blocoB: { disciplina: "Gestão de Pessoas", topico: "Administração de cargos, carreiras e salários: plano de cargos, progressão x promoção, subsídio vs. vencimento no setor público. Saúde e QVT", duracao: 90 }, blocoC: { atividade: "10 questões cargos e carreiras setor público", duracao: 30 }, isSimulado: false },
      { data: "2026-07-08", diaSemana: "Quarta", blocoA: { disciplina: "Língua Portuguesa", topico: "Questões Quadrix: regência + crase + colocação pronominal (15 questões banco Quadrix)", duracao: 60 }, blocoB: { disciplina: "Gestão de Projetos", topico: "PMBOK: 5 grupos de processos (iniciação, planejamento, execução, monitoramento/controle, encerramento) e restrições triplas", duracao: 90 }, blocoC: { atividade: "10 questões gestão de projetos Quadrix", duracao: 30 }, isSimulado: false },
      { data: "2026-07-09", diaSemana: "Quinta", blocoA: { disciplina: "PNAS", topico: "PNAS/2004 aprofundada: princípios, objetivos, usuários, organização da assistência, relação com outras políticas", duracao: 60 }, blocoB: { disciplina: "Gestão de Projetos", topico: "Métodos ágeis: Scrum (sprint, backlog, cerimônias), Kanban. Preditivo vs. adaptativo. Escritório de projetos (PMO)", duracao: 90 }, blocoC: { atividade: "10 questões ágil vs. preditivo", duracao: 30 }, isSimulado: false },
      { data: "2026-07-10", diaSemana: "Sexta", blocoA: { disciplina: "NOB-SUAS", topico: "NOB-SUAS revisão detalhada: vigilância socioassistencial, avaliação e monitoramento, financiamento fundo a fundo", duracao: 60 }, blocoB: { disciplina: "SUAS", topico: "Tipificação aprofundada: PAIF (objetivos, público, atividades), SCFV (por faixa etária), PAEFI, Abordagem Social, serviços de acolhimento (cada modalidade)", duracao: 90 }, blocoC: { atividade: "10 questões Tipificação Nacional detalhada", duracao: 30 }, isSimulado: false },
      { data: "2026-07-11", diaSemana: "Sábado", blocoA: { disciplina: "SIMULADO", topico: "40 questões específicos: TGA+OS&M+GP+AFO (20) + SUAS/LOAS/Legislação (20)", duracao: 60 }, blocoB: { disciplina: "ESTUDO DE CASO", topico: "Estudo de caso: implantação de BSC em secretaria de assistência social. Resposta escrita cronometrada (40min)", duracao: 90 }, blocoC: { atividade: "Revisão e feedback da discursiva", duracao: 30 }, isSimulado: true },
    ],
  },

  {
    semana: 9,
    fase: 2,
    periodo: "13 a 18/Jul",
    foco: "AFO revisão avançada + Tendências GP + Programas DF detalhados + MROSC aprofundado + Reforço SUAS",
    metaAcerto: 65,
    dias: [
      { data: "2026-07-13", diaSemana: "Segunda", blocoA: { disciplina: "Língua Portuguesa", topico: "Simulado AFO + LP integrado: 20 questões (10 LP + 10 AFO com contexto de textos orçamentários)", duracao: 60 }, blocoB: { disciplina: "AFO", topico: "Revisão e aprofundamento: créditos adicionais (suplementares, especiais, extraordinários), descentralização orçamentária e financeira", duracao: 90 }, blocoC: { atividade: "15 questões AFO avançadas Quadrix", duracao: 30 }, isSimulado: false },
      { data: "2026-07-14", diaSemana: "Terça", blocoA: { disciplina: "LC 840/2011", topico: "Revisão completa LC 840: simulado 15 questões com foco em penalidades, prazos e PAD", duracao: 60 }, blocoB: { disciplina: "Gestão de Pessoas", topico: "Tendências em GP no setor público: teletrabalho (Lei 13.709/2018 e IN), saúde mental do servidor, equipes multidisciplinares, gestão de diversidade", duracao: 90 }, blocoC: { atividade: "10 questões tendências GP setor público", duracao: 30 }, isSimulado: false },
      { data: "2026-07-15", diaSemana: "Quarta", blocoA: { disciplina: "Língua Portuguesa", topico: "Banco de questões Quadrix: 20 questões difíceis de LP — análise das pegadinhas mais frequentes", duracao: 60 }, blocoB: { disciplina: "AFO", topico: "Questões difíceis AFO Quadrix: SIAFEM, controle interno e externo, TCU, CGU, TCDF — competências", duracao: 90 }, blocoC: { atividade: "Revisão dos erros AFO avançado", duracao: 30 }, isSimulado: false },
      { data: "2026-07-16", diaSemana: "Quinta", blocoA: { disciplina: "Programas DF", topico: "Revisão detalhada: Cartão Prato Cheio, Cartão Gás, DF Social, Benefícios Eventuais, SISAN — questões de lei por lei", duracao: 60 }, blocoB: { disciplina: "SUAS", topico: "MROSC aprofundado: parcerias com OSC, chamamento público, prestação de contas, monitoramento. Interface com SUAS", duracao: 90 }, blocoC: { atividade: "10 questões Programas DF + MROSC", duracao: 30 }, isSimulado: false },
      { data: "2026-07-17", diaSemana: "Sexta", blocoA: { disciplina: "Revisão Geral", topico: "Revisão dos flashcards de todos os temas: revisão espaçada dos tópicos estudados nas semanas 1-8", duracao: 60 }, blocoB: { disciplina: "SUAS", topico: "Revisão integradora: proteção básica x especial (média e alta complexidade) — CRAS e CREAS: competências, serviços e diferenças", duracao: 90 }, blocoC: { atividade: "10 questões CRAS x CREAS Quadrix", duracao: 30 }, isSimulado: false },
      { data: "2026-07-18", diaSemana: "Sábado", blocoA: { disciplina: "SIMULADO COMPLETO", topico: "60 questões — META: ≥65%", duracao: 60 }, blocoB: { disciplina: "CORREÇÃO + ESTUDO DE CASO", topico: "Análise detalhada + Estudo de caso: Reestruturação do CREAS — problema, causas, soluções com base no SUAS", duracao: 90 }, blocoC: { atividade: "Atualizar tracking de progresso", duracao: 30 }, isSimulado: true },
    ],
  },

  {
    semana: 10,
    fase: 2,
    periodo: "20 a 25/Jul",
    foco: "Integração TGA + GP + OS&M — questões aplicadas + Direitos vulnerabilidades integração + Ética",
    metaAcerto: 67,
    dias: [
      { data: "2026-07-20", diaSemana: "Segunda", blocoA: { disciplina: "Língua Portuguesa", topico: "Banco de questões Quadrix TGA: 15 questões de TGA com texto (questões contextualizadas)", duracao: 60 }, blocoB: { disciplina: "TGA", topico: "Revisão integradora TGA: conexão entre teorias (de Taylor → Contingencial). Questões de prova que integram teorias", duracao: 90 }, blocoC: { atividade: "15 questões TGA difíceis Quadrix", duracao: 30 }, isSimulado: false },
      { data: "2026-07-21", diaSemana: "Terça", blocoA: { disciplina: "Conhecimentos DF", topico: "Simulado integrado Conhecimentos DF: 20 questões completas — LP (5) + DF (5) + Legislação (5) + PS (5)", duracao: 60 }, blocoB: { disciplina: "Ética + Gestão de Pessoas", topico: "Ética no serviço público: Decreto 1.171/1994, PNDP, competência interpessoal, gerenciamento de conflitos", duracao: 90 }, blocoC: { atividade: "10 questões ética + relações interpessoais", duracao: 30 }, isSimulado: false },
      { data: "2026-07-22", diaSemana: "Quarta", blocoA: { disciplina: "Língua Portuguesa", topico: "Questões difíceis LP Quadrix: 20 questões estilo prova real — simulando as 20 gerais", duracao: 60 }, blocoB: { disciplina: "AFO + OS&M", topico: "Integração AFO + BSC: uso de indicadores orçamentários como KPIs. SIAFEM como suporte ao controle", duracao: 90 }, blocoC: { atividade: "15 questões AFO avançadas", duracao: 30 }, isSimulado: false },
      { data: "2026-07-23", diaSemana: "Quinta", blocoA: { disciplina: "SUAS/LOAS", topico: "Revisão integradora SUAS/LOAS/PNAS: 20 questões Quadrix — focar nas distinções e pegadinhas", duracao: 60 }, blocoB: { disciplina: "Direitos", topico: "Revisão integrada: ECA + SINASE + Estatuto Idoso + LBI + Pop rua + Diversidade — questões aplicadas", duracao: 90 }, blocoC: { atividade: "15 questões direitos integrados", duracao: 30 }, isSimulado: false },
      { data: "2026-07-24", diaSemana: "Sexta", blocoA: { disciplina: "Revisão Geral", topico: "Flashcards completos: revisão espaçada de todas as disciplinas", duracao: 60 }, blocoB: { disciplina: "GP + Projetos", topico: "Revisão GP: motivação + liderança + competências + tendências. Revisão Projetos: ciclo de vida e métodos", duracao: 90 }, blocoC: { atividade: "15 questões GP + Projetos Quadrix", duracao: 30 }, isSimulado: false },
      { data: "2026-07-25", diaSemana: "Sábado", blocoA: { disciplina: "SIMULADO COMPLETO", topico: "60 questões — META: ≥67%", duracao: 60 }, blocoB: { disciplina: "ESTUDO DE CASO + CORREÇÃO", topico: "EC Quadrix-style: gestão de pessoal em SEDES. Corrigir simulado e mapear tópicos fracos", duracao: 90 }, blocoC: { atividade: "Plano de ataque Semana 11 (pontos fracos)", duracao: 30 }, isSimulado: true },
    ],
  },

  {
    semana: 11,
    fase: 2,
    periodo: "27/Jul a 01/Ago",
    foco: "Fechamento Fase 2: Revisão completa integradora + simulados temáticos por disciplina",
    metaAcerto: 70,
    dias: [
      { data: "2026-07-27", diaSemana: "Segunda", blocoA: { disciplina: "Língua Portuguesa", topico: "Revisão final LP Fase 2: 20 questões com foco nas questões que ainda erra", duracao: 60 }, blocoB: { disciplina: "TGA + OS&M", topico: "Simulado integrado TGA + OS&M: 30 questões — cobrir todas as subdivisões", duracao: 90 }, blocoC: { atividade: "Análise de erros por subtópico", duracao: 30 }, isSimulado: false },
      { data: "2026-07-28", diaSemana: "Terça", blocoA: { disciplina: "Conhecimentos DF", topico: "Simulado final Conhecimentos DF Fase 2: 20 questões (todas as disciplinas da parte gerais)", duracao: 60 }, blocoB: { disciplina: "Gestão de Pessoas", topico: "Simulado GP completo: 30 questões cobrindo todo o programa. Análise e correção", duracao: 90 }, blocoC: { atividade: "Flashcards GP — pontos de erro", duracao: 30 }, isSimulado: false },
      { data: "2026-07-29", diaSemana: "Quarta", blocoA: { disciplina: "Língua Portuguesa", topico: "Questões LP Quadrix 2022-2025: banco específico de questões da banca", duracao: 60 }, blocoB: { disciplina: "AFO", topico: "Simulado AFO completo: 30 questões cobrindo todo o programa. Análise e correção", duracao: 90 }, blocoC: { atividade: "Flashcards AFO — pontos de erro", duracao: 30 }, isSimulado: false },
      { data: "2026-07-30", diaSemana: "Quinta", blocoA: { disciplina: "Programas + MROSC", topico: "Revisão Programas DF + MROSC: 20 questões simulado temático", duracao: 60 }, blocoB: { disciplina: "SUAS/LOAS", topico: "Simulado SUAS/LOAS completo: 30 questões cobrindo todo o bloco comum EDAS", duracao: 90 }, blocoC: { atividade: "Flashcards SUAS/LOAS", duracao: 30 }, isSimulado: false },
      { data: "2026-07-31", diaSemana: "Sexta", blocoA: { disciplina: "Ética + Diversidade", topico: "Revisão ética + diversidade: 15 questões simulado temático", duracao: 60 }, blocoB: { disciplina: "Projetos + Tendências", topico: "Revisão Projetos + Tendências GP + Competências: 20 questões integradas", duracao: 90 }, blocoC: { atividade: "Revisão geral flashcards todas as disciplinas", duracao: 30 }, isSimulado: false },
      { data: "2026-08-01", diaSemana: "Sábado", blocoA: { disciplina: "SIMULADO FASE 2 FINAL", topico: "60 questões completo — META: ≥70%", duracao: 60 }, blocoB: { disciplina: "DIAGNÓSTICO FASE 2", topico: "Mapeamento final: % por disciplina. Definir top 5 tópicos para reforço na Fase 3", duracao: 90 }, blocoC: { atividade: "Planejamento Fase 3: Volume", duracao: 30 }, isSimulado: true },
    ],
  },

  // ===================================================
  // FASE 3 — VOLUME DE QUESTÕES (Semanas 12-14)
  // ===================================================

  {
    semana: 12,
    fase: 3,
    periodo: "03 a 08/Ago",
    foco: "VOLUME: Foco em Conhecimentos Gerais — 40-50 questões/dia + revisão de erros",
    metaAcerto: 72,
    dias: [
      { data: "2026-08-03", diaSemana: "Segunda", blocoA: { disciplina: "LP — Volume", topico: "30 questões LP Quadrix — interpretação + coesão + concordância", duracao: 60 }, blocoB: { disciplina: "LP + DF — Volume", topico: "20 questões LP difíceis + 20 questões Conhecimentos DF (todos os temas)", duracao: 90 }, blocoC: { atividade: "Revisão intensiva dos erros", duracao: 30 }, isSimulado: false },
      { data: "2026-08-04", diaSemana: "Terça", blocoA: { disciplina: "LC 840 — Volume", topico: "20 questões LC 840 Quadrix: regime disciplinar + PAD", duracao: 60 }, blocoB: { disciplina: "Maria da Penha — Volume", topico: "15 questões Maria da Penha + 15 questões Lei 7.484 + Primeiros Socorros (10)", duracao: 90 }, blocoC: { atividade: "Revisão intensiva dos erros legislação", duracao: 30 }, isSimulado: false },
      { data: "2026-08-05", diaSemana: "Quarta", blocoA: { disciplina: "LP — Volume", topico: "30 questões LP: morfossintaxe + regência + crase", duracao: 60 }, blocoB: { disciplina: "TGA — Volume", topico: "40 questões TGA: teorias + PODC + estruturas + cultura + processo decisório", duracao: 90 }, blocoC: { atividade: "Revisão erros TGA + LP", duracao: 30 }, isSimulado: false },
      { data: "2026-08-06", diaSemana: "Quinta", blocoA: { disciplina: "DF Atualidades", topico: "Revisão LODF + PDPM + realidade DF: 20 questões simulado", duracao: 60 }, blocoB: { disciplina: "GP — Volume", topico: "40 questões GP completo: motivação + liderança + competências + R&S + desempenho", duracao: 90 }, blocoC: { atividade: "Revisão erros GP", duracao: 30 }, isSimulado: false },
      { data: "2026-08-07", diaSemana: "Sexta", blocoA: { disciplina: "LP + DF — Volume", topico: "20 questões gerais integrados simulando os 20 da prova real", duracao: 60 }, blocoB: { disciplina: "AFO — Volume", topico: "40 questões AFO: PPA/LDO/LOA + estágios + LRF + SIAFEM + Restos a Pagar", duracao: 90 }, blocoC: { atividade: "Revisão erros AFO", duracao: 30 }, isSimulado: false },
      { data: "2026-08-08", diaSemana: "Sábado", blocoA: { disciplina: "SIMULADO COMPLETO", topico: "60 questões com tempo (4h simuladas) — META: ≥72%", duracao: 60 }, blocoB: { disciplina: "ESTUDO DE CASO CRONOMETRADO", topico: "Estudo de caso: 40 minutos para escrever 20-30 linhas. Revisar critérios CAC, OT e DLP", duracao: 90 }, blocoC: { atividade: "Análise de desempenho e ajuste", duracao: 30 }, isSimulado: true },
    ],
  },

  {
    semana: 13,
    fase: 3,
    periodo: "10 a 15/Ago",
    foco: "VOLUME: Foco em Específicos de Administração — 40-50 questões/dia",
    metaAcerto: 74,
    dias: [
      { data: "2026-08-10", diaSemana: "Segunda", blocoA: { disciplina: "LP — Manutenção", topico: "15 questões LP para manutenção do nível", duracao: 60 }, blocoB: { disciplina: "TGA + OS&M — Volume", topico: "50 questões integradas TGA + OS&M + Qualidade + Projetos", duracao: 90 }, blocoC: { atividade: "Revisão erros TGA/OS&M", duracao: 30 }, isSimulado: false },
      { data: "2026-08-11", diaSemana: "Terça", blocoA: { disciplina: "DF — Manutenção", topico: "15 questões Conhecimentos DF para manutenção", duracao: 60 }, blocoB: { disciplina: "GP — Volume intensivo", topico: "50 questões GP: todas as subdivisões. Foco dobrado nos tópicos de erro", duracao: 90 }, blocoC: { atividade: "Revisão erros GP intensivo", duracao: 30 }, isSimulado: false },
      { data: "2026-08-12", diaSemana: "Quarta", blocoA: { disciplina: "LP — Manutenção", topico: "15 questões LP interpretação avançada", duracao: 60 }, blocoB: { disciplina: "AFO — Volume intensivo", topico: "50 questões AFO: foco nos tópicos de maior erro", duracao: 90 }, blocoC: { atividade: "Revisão erros AFO intensivo", duracao: 30 }, isSimulado: false },
      { data: "2026-08-13", diaSemana: "Quinta", blocoA: { disciplina: "DF — Manutenção", topico: "15 questões legislação DF para manutenção", duracao: 60 }, blocoB: { disciplina: "OS&M + BSC + Projetos", topico: "40 questões: BSC (15) + PDCA/qualidade (15) + Gestão de Projetos (10)", duracao: 90 }, blocoC: { atividade: "Revisão erros OS&M/BSC", duracao: 30 }, isSimulado: false },
      { data: "2026-08-14", diaSemana: "Sexta", blocoA: { disciplina: "LP — Volume", topico: "20 questões LP — banco Quadrix específico", duracao: 60 }, blocoB: { disciplina: "TGA + GP + AFO — Revisão Integrada", topico: "40 questões simulado integrado das 3 maiores disciplinas específicas", duracao: 90 }, blocoC: { atividade: "Análise final erros semana 13", duracao: 30 }, isSimulado: false },
      { data: "2026-08-15", diaSemana: "Sábado", blocoA: { disciplina: "SIMULADO COMPLETO", topico: "60 questões 4h cronometradas — META: ≥74%", duracao: 60 }, blocoB: { disciplina: "ESTUDO DE CASO COMPLETO", topico: "EC completo 40min: APO + BSC em órgão público de assistência social", duracao: 90 }, blocoC: { atividade: "Análise de desempenho semana 13", duracao: 30 }, isSimulado: true },
    ],
  },

  {
    semana: 14,
    fase: 3,
    periodo: "17 a 22/Ago",
    foco: "VOLUME: Foco em Bloco Socioassistencial — SUAS/LOAS/Direitos/Programas DF",
    metaAcerto: 75,
    dias: [
      { data: "2026-08-17", diaSemana: "Segunda", blocoA: { disciplina: "LP — Manutenção", topico: "15 questões LP", duracao: 60 }, blocoB: { disciplina: "SUAS/LOAS — Volume", topico: "50 questões SUAS/LOAS/PNAS/NOB: todas as subdivisões, foco nas distinções difíceis", duracao: 90 }, blocoC: { atividade: "Revisão erros SUAS", duracao: 30 }, isSimulado: false },
      { data: "2026-08-18", diaSemana: "Terça", blocoA: { disciplina: "DF — Manutenção", topico: "15 questões Conhecimentos DF", duracao: 60 }, blocoB: { disciplina: "Direitos — Volume", topico: "40 questões: ECA (15) + LBI/Estatuto Idoso (10) + Pop rua (5) + Diversidade (10)", duracao: 90 }, blocoC: { atividade: "Revisão erros Direitos", duracao: 30 }, isSimulado: false },
      { data: "2026-08-19", diaSemana: "Quarta", blocoA: { disciplina: "LP — Volume", topico: "20 questões LP difíceis Quadrix", duracao: 60 }, blocoB: { disciplina: "Programas DF + MROSC — Volume", topico: "30 questões Programas DF (20) + MROSC (10): questões de lei", duracao: 90 }, blocoC: { atividade: "Revisão erros Programas DF", duracao: 30 }, isSimulado: false },
      { data: "2026-08-20", diaSemana: "Quinta", blocoA: { disciplina: "Legislação DF — Volume", topico: "20 questões Maria da Penha + Lei 7.484", duracao: 60 }, blocoB: { disciplina: "SUAS Integração", topico: "40 questões integradas: SUAS + Direitos + Programas DF (simulando os 40 específicos reais)", duracao: 90 }, blocoC: { atividade: "Revisão erros bloco social", duracao: 30 }, isSimulado: false },
      { data: "2026-08-21", diaSemana: "Sexta", blocoA: { disciplina: "LP + DF — Volume", topico: "20 questões gerais (10 LP + 10 DF) simulando condições reais da prova", duracao: 60 }, blocoB: { disciplina: "Específicos Completos", topico: "40 questões específicas integradas (20 Adm + 20 Socioassistencial)", duracao: 90 }, blocoC: { atividade: "Análise final de erros Fase 3", duracao: 30 }, isSimulado: false },
      { data: "2026-08-22", diaSemana: "Sábado", blocoA: { disciplina: "SIMULADO COMPLETO", topico: "60 questões 4h real — META: ≥75%", duracao: 60 }, blocoB: { disciplina: "DIAGNÓSTICO + ESTUDO DE CASO", topico: "Análise de desempenho Fase 3. EC: gestão de benefícios assistenciais no DF — estrutura de resposta completa", duracao: 90 }, blocoC: { atividade: "Planejamento Fase 4 — Reta Final", duracao: 30 }, isSimulado: true },
    ],
  },

  // ===================================================
  // FASE 4 — RETA FINAL (Semanas 15-16)
  // ===================================================

  {
    semana: 15,
    fase: 4,
    periodo: "24 a 29/Ago",
    foco: "RETA FINAL: Simulados alternados com revisão dos tópicos de erro recorrente",
    metaAcerto: 77,
    dias: [
      { data: "2026-08-24", diaSemana: "Segunda", blocoA: { disciplina: "Revisão Crítica", topico: "Top 5 tópicos com maior erro histórico: revisão focada, 30min por tópico", duracao: 60 }, blocoB: { disciplina: "Questões Temáticas", topico: "40 questões focadas nos 5 tópicos mais errados", duracao: 90 }, blocoC: { atividade: "Atualização flashcards críticos", duracao: 30 }, isSimulado: false },
      { data: "2026-08-25", diaSemana: "Terça", blocoA: { disciplina: "SIMULADO COMPLETO", topico: "60 questões + estudo de caso cronometrado (4h total) — META: ≥77%", duracao: 60 }, blocoB: { disciplina: "CORREÇÃO", topico: "Correção detalhada por questão. Anotar padrões de erro", duracao: 90 }, blocoC: { atividade: "Lista de pontos críticos para últimas revisões", duracao: 30 }, isSimulado: true },
      { data: "2026-08-26", diaSemana: "Quarta", blocoA: { disciplina: "Revisão LP", topico: "20 questões LP — revisão rápida focada no que ainda erra", duracao: 60 }, blocoB: { disciplina: "Revisão SUAS/AFO", topico: "30 questões SUAS (15) + AFO (15) — revisão final", duracao: 90 }, blocoC: { atividade: "Flashcards rápidos", duracao: 30 }, isSimulado: false },
      { data: "2026-08-27", diaSemana: "Quinta", blocoA: { disciplina: "SIMULADO COMPLETO", topico: "60 questões — META: ≥77%", duracao: 60 }, blocoB: { disciplina: "ESTUDO DE CASO", topico: "Estudo de caso: 40min. Corrigir com critérios CAC/OT/DLP", duracao: 90 }, blocoC: { atividade: "Revisão de erros", duracao: 30 }, isSimulado: true },
      { data: "2026-08-28", diaSemana: "Sexta", blocoA: { disciplina: "Revisão DF/Legislação", topico: "20 questões Conhecimentos DF — foco no que ainda erra", duracao: 60 }, blocoB: { disciplina: "Revisão TGA + GP", topico: "30 questões TGA (15) + GP (15) — revisão final", duracao: 90 }, blocoC: { atividade: "Flashcards finais", duracao: 30 }, isSimulado: false },
      { data: "2026-08-29", diaSemana: "Sábado", blocoA: { disciplina: "SIMULADO COMPLETO", topico: "60 questões 4h — SIMULADO FINAL FASE 4 — META: ≥78%", duracao: 60 }, blocoB: { disciplina: "CORREÇÃO + ESTRATÉGIA PROVA", topico: "Definir estratégia de prova: ordem das questões, gestão de tempo (60q em 4h = 4min/q)", duracao: 90 }, blocoC: { atividade: "Checklist logístico da prova (documentos, material)", duracao: 30 }, isSimulado: true },
    ],
  },

  {
    semana: 16,
    fase: 4,
    periodo: "31/Ago a 05/Set",
    foco: "SEMANA DA PROVA: Manutenção leve + descanso + preparação logística",
    metaAcerto: 78,
    dias: [
      { data: "2026-08-31", diaSemana: "Segunda", blocoA: { disciplina: "Revisão Leve", topico: "Flashcards rápidos: LP (10 cartões) + SUAS/LOAS (10 cartões) + AFO (10 cartões)", duracao: 60 }, blocoB: { disciplina: "Questões Leves", topico: "30 questões variadas — ritmo confortável, sem pressão. Manutenção do estado cognitivo", duracao: 90 }, blocoC: { atividade: "Revisão logística: local de prova, horário, material", duracao: 30 }, isSimulado: false },
      { data: "2026-09-01", diaSemana: "Terça", blocoA: { disciplina: "Revisão Leve", topico: "Flashcards: TGA (10) + GP (10) + Programas DF (10)", duracao: 60 }, blocoB: { disciplina: "Questões Leves", topico: "30 questões — foco nas que domina para reforçar confiança", duracao: 90 }, blocoC: { atividade: "Estudo de caso leve: releitura de caso modelo", duracao: 30 }, isSimulado: false },
      { data: "2026-09-02", diaSemana: "Quarta", blocoA: { disciplina: "Revisão Final", topico: "Flashcards: Legislação DF (Lei Maria da Penha + LC 840) — 20 cartões críticos", duracao: 60 }, blocoB: { disciplina: "Simulado Parcial Leve", topico: "20 questões gerais + 20 questões específicas — ritmo tranquilo", duracao: 90 }, blocoC: { atividade: "Confirmar local de prova, rota, transporte", duracao: 30 }, isSimulado: false },
      { data: "2026-09-03", diaSemana: "Quinta", blocoA: { disciplina: "Revisão Mínima", topico: "Apenas flashcards dos pontos críticos — máximo 30min de estudo ativo", duracao: 60 }, blocoB: { disciplina: "Descanso Ativo", topico: "Releitura dos resumos dos tópicos-chave (sem fazer questões). Revisar estrutura de resposta da discursiva", duracao: 90 }, blocoC: { atividade: "Preparar material para a prova: caneta azul/preta transparente, documento, comprovante de inscrição", duracao: 30 }, isSimulado: false },
      { data: "2026-09-04", diaSemana: "Sexta", blocoA: { disciplina: "VÉSPERA DA PROVA", topico: "Revisão MÍNIMA: apenas os 10 flashcards mais críticos. Máximo 1h de estudo", duracao: 60 }, blocoB: { disciplina: "DESCANSO", topico: "Não estudar à tarde. Dormir cedo (mínimo 8h de sono antes da prova)", duracao: 90 }, blocoC: { atividade: "Alimentação adequada, hidratação, relaxamento", duracao: 30 }, isSimulado: false },
      { data: "2026-09-05", diaSemana: "Sábado", blocoA: { disciplina: "DIA DA PROVA", topico: "Chegar 1h antes. Prova objetiva + discursiva: 4h. Turno MATUTINO (EDAS)", duracao: 60 }, blocoB: { disciplina: "ESTRATÉGIA DE PROVA", topico: "Gerais: 30min (20q). Específicas: 2h (40q). Discursiva: 1h20. Revisão final: 10min.", duracao: 90 }, blocoC: { atividade: "06/09/2026 — DIA DA PROVA", duracao: 30 }, isSimulado: false },
    ],
  },
];

// ============================================================
// BENCHMARKS E METAS
// ============================================================

export const BENCHMARKS = {
  minimoAprovacaoGerais: 10,
  minimoAprovacaoEspecificos: 40,
  minimoAprovacaoDiscursiva: 50,
  metaPorFase: {
    fase1: 60,
    fase2: 70,
    fase3: 75,
    fase4: 78,
  },
  distribuicaoHorasEstudoPorDisciplina: {
    linguaPortuguesa: "10% do tempo",
    conhecimentosDF: "10% do tempo",
    tga: "12% do tempo",
    gestaoPessoas: "12% do tempo",
    afo: "12% do tempo",
    osm: "10% do tempo",
    projetos: "4% do tempo",
    suasLoas: "14% do tempo",
    direitos: "8% do tempo",
    programasDF: "8% do tempo",
  },
  diasAteProva: 115,
  semanasEstudo: 16,
  horasEstudoTotal: Math.round(115 * (5 / 6) * 3),
};

// ============================================================
// EXPORT DEFAULT
// ============================================================

export default {
  edital: EDITAL_SEDES_2026,
  cronograma: CRONOGRAMA,
  fases: FASES,
  benchmarks: BENCHMARKS,
  quadrixPerfil: QUADRIX_PERFIL,
};

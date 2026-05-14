// ============================================================
// SEDES DF 2026 — TEMAS PARA ESTUDO DE CASO (Discursiva)
// Cargo 400 | Formato: texto dissertativo, 20-30 linhas
// Critérios: CAC (×7) + OT (×1,5) + DLP (×1,5)
// ============================================================

export type Dificuldade = "FACIL" | "MEDIO" | "DIFICIL";

export interface TemaEstudoCaso {
  id: string;
  titulo: string;
  disciplinas: string[];
  dificuldade: Dificuldade;
  contexto: string;
  comando: string;
  perguntasOrientadoras: string[];
  pontosObrigatorios: string[];
  estruturaSugerida: string[];
  legislacaoRelevante: string[];
  indicadoresMonitoramento: string[];
  dicaDiscursiva: string;
  respostaModeloEsquema: string[];
}

export const TEMAS_ESTUDO_CASO: TemaEstudoCaso[] = [

  {
    id: "ec-001",
    titulo: "Gestão da qualidade no CRAS: tempo de espera e satisfação dos usuários",
    disciplinas: ["OS&M e Qualidade", "Gestão de Pessoas", "SUAS/PNAS"],
    dificuldade: "MEDIO",
    contexto: `O CRAS São Sebastião atende mensalmente 800 famílias e apresenta tempo médio de espera de 45 minutos — bem acima da meta de 20 minutos. A gestora identificou, por meio de escuta qualificada, que a demanda se concentra nas terças e quintas-feiras de manhã, enquanto a equipe está uniformemente distribuída durante a semana. Além disso, há sobreposição de atividades entre técnicos e recepcionistas, gerando retrabalho. A equipe está desmotivada, com alta rotatividade.`,
    comando: `Com base no caso apresentado, discorra sobre as causas do problema identificado, as ferramentas de gestão da qualidade aplicáveis e as estratégias de gestão de pessoas para enfrentar a desmotivação da equipe, propondo indicadores para monitorar as melhorias.`,
    perguntasOrientadoras: [
      "Quais são as causas do excesso de tempo de espera?",
      "Quais ferramentas da qualidade podem ser utilizadas para diagnosticar e resolver o problema?",
      "Como o PDCA pode ser aplicado neste caso?",
      "Que estratégias de gestão de pessoas abordariam a desmotivação e a rotatividade?",
      "Quais indicadores permitem monitorar a evolução do atendimento?",
    ],
    pontosObrigatorios: [
      "Identificação das causas: concentração de demanda + sobreposição de atividades + desmotivação",
      "Diagrama de Ishikawa (causa-efeito) para mapear causas do problema",
      "Aplicação do PDCA: P (redistribuição de equipe por horário de pico), D (implementação), C (monitoramento), A (ajuste)",
      "Ferramentas: Diagrama de Pareto para priorizar causas; fluxograma para redesenhar o processo",
      "Gestão de pessoas: teoria motivacional (Herzberg — fatores motivacionais); gestão de desempenho",
      "Indicadores: tempo médio de espera, taxa de satisfação dos usuários, absenteísmo/rotatividade",
      "Base legal: PNAS/2004 — segurança de acolhida",
    ],
    estruturaSugerida: [
      "CONTEXTUALIZAÇÃO (3 linhas): apresentar o problema e sua relevância no SUAS",
      "DIAGNÓSTICO DAS CAUSAS (5 linhas): Ishikawa — causas (método, mão de obra, meio ambiente, etc.)",
      "FERRAMENTAS DE QUALIDADE (5 linhas): PDCA aplicado ao caso + Pareto + fluxograma",
      "GESTÃO DE PESSOAS (5 linhas): causas da desmotivação + estratégias (Herzberg + gestão por competências)",
      "INDICADORES (4 linhas): métricas de resultado, eficiência e satisfação",
      "CONCLUSÃO (3 linhas): síntese da abordagem integrada",
    ],
    legislacaoRelevante: [
      "PNAS/2004 — segurança de acolhida e qualidade do atendimento",
      "NOB-RH/SUAS (Res. 269/2006) — equipe de referência e gestão do trabalho",
      "Tipificação Nacional de Serviços Socioassistenciais — PAIF",
    ],
    indicadoresMonitoramento: [
      "Tempo médio de espera por atendimento (meta: ≤20 min)",
      "Taxa de satisfação dos usuários (pesquisa semestral)",
      "Índice de absenteísmo da equipe técnica",
      "Número de famílias atendidas por técnico/mês",
      "Taxa de rotatividade da equipe (turnover)",
    ],
    dicaDiscursiva: "Integre as ferramentas de qualidade (Ishikawa, PDCA) com as teorias de GP (Herzberg, liderança situacional). O Quadrix valoriza respostas que conectam as disciplinas ao contexto da política de assistência social — não use conceitos soltos, contextualize sempre no SUAS.",
    respostaModeloEsquema: [
      "1. O problema central é a superlotação concentrada e a desmotivação da equipe",
      "2. Ferramenta diagnóstica: Ishikawa (6Ms) — identificar as causas raiz",
      "3. Ferramenta de melhoria: PDCA — planejar redistribuição + implementar + verificar + padronizar",
      "4. GP: fatores motivacionais de Herzberg (reconhecimento, crescimento) + liderança situacional",
      "5. Indicadores: TME, satisfação, absenteísmo",
      "6. Base: PNAS/2004 — acolhida qualificada como direito do usuário",
    ],
  },

  {
    id: "ec-002",
    titulo: "Implementação do BSC em Secretaria de Assistência Social",
    disciplinas: ["TGA — Planejamento Estratégico", "OS&M", "AFO"],
    dificuldade: "DIFICIL",
    contexto: `A Secretaria de Desenvolvimento Social do DF enfrenta dificuldade em demonstrar resultados da política de assistência social ao gestor público. Os relatórios existentes medem apenas o número de atendimentos realizados, sem avaliar impacto, eficiência ou qualidade. A Secretária deseja implementar o Balanced Scorecard (BSC) para alinhar as ações dos CRAS e CREAS à estratégia institucional e melhorar a prestação de contas à sociedade.`,
    comando: `Descreva como o BSC poderia ser implementado nesse contexto, identificando objetivos estratégicos e indicadores para cada perspectiva, e discuta os desafios específicos da adoção dessa ferramenta no setor público de assistência social.`,
    perguntasOrientadoras: [
      "Quais são as 4 perspectivas do BSC e como se aplicam ao setor público?",
      "Que objetivos estratégicos e indicadores poderiam compor cada perspectiva?",
      "Qual é a relação de causa e efeito entre as perspectivas?",
      "Quais desafios existem para adotar o BSC em uma organização pública?",
      "Como o BSC se conecta com o planejamento orçamentário (PPA/LDO/LOA)?",
    ],
    pontosObrigatorios: [
      "As 4 perspectivas: Financeira/Eficiência, Cidadãos/Usuários, Processos Internos, Aprendizado e Crescimento",
      "No setor público, a perspectiva de CLIENTES (cidadãos) geralmente se posiciona acima da financeira",
      "Relação de causa e efeito: Aprendizado → Processos → Cidadãos → Eficiência orçamentária",
      "Objetivos e indicadores por perspectiva: exemplos concretos do SUAS",
      "Desafios: resistência à mudança, cultura burocrática, dificuldade em mensurar impacto social",
      "Conexão BSC-PPA: os objetivos estratégicos do BSC devem alimentar os programas e metas do PPA",
    ],
    estruturaSugerida: [
      "CONTEXTUALIZAÇÃO (3 linhas): limitação dos relatórios atuais e necessidade de visão estratégica",
      "BSC NO SETOR PÚBLICO (4 linhas): adaptação das 4 perspectivas + missão pública acima do resultado financeiro",
      "OBJETIVOS E INDICADORES POR PERSPECTIVA (8 linhas): exemplos concretos para cada perspectiva",
      "RELAÇÃO CAUSAL (3 linhas): cadeia Aprendizado → Processos → Cidadãos → Eficiência",
      "DESAFIOS E COMO SUPERÁ-LOS (5 linhas): resistência, cultura, mensuração de impacto",
      "CONCLUSÃO (2 linhas): BSC como instrumento de accountability social",
    ],
    legislacaoRelevante: [
      "CF/88 — art. 37 (princípios da Administração Pública)",
      "LC 101/2000 — LRF (metas fiscais e transparência)",
      "PNAS/2004 — monitoramento e avaliação das políticas",
      "NOB-SUAS 2012 — vigilância socioassistencial",
    ],
    indicadoresMonitoramento: [
      "Perspectiva Cidadãos: % de famílias em extrema pobreza com acesso ao SUAS; índice de satisfação",
      "Perspectiva Processos: tempo médio de atendimento; % de encaminhamentos resolvidos",
      "Perspectiva Aprendizado: % de servidores capacitados; taxa de implantação do sistema de informação",
      "Perspectiva Financeira: custo por família atendida; % de execução orçamentária",
    ],
    dicaDiscursiva: "Este tema integra TGA (BSC/planejamento estratégico), AFO (conexão com PPA/LOA) e SUAS (indicadores socioassistenciais). A banca espera que você domine as 4 perspectivas E suas relações de causa e efeito, além de propor indicadores realistas para o contexto do SUAS.",
    respostaModeloEsquema: [
      "1. O BSC supera a limitação de medir apenas volume, permitindo medir qualidade, eficiência e impacto",
      "2. No setor público: Cidadãos vem acima de Financeiro (missão ≠ lucro)",
      "3. Perspectivas + indicadores para o SUAS (ex: % famílias acompanhadas; tempo de espera; capacitação)",
      "4. Desafios: resistência cultural, dificuldade em quantificar bem-estar social",
      "5. Solução: engajamento da equipe, treinamento, conexão com PPA",
    ],
  },

  {
    id: "ec-003",
    titulo: "Gestão de equipe em CREAS: conflito, desmotivação e liderança situacional",
    disciplinas: ["Gestão de Pessoas", "Ética", "SUAS"],
    dificuldade: "MEDIO",
    contexto: `A coordenadora do CREAS de Brasília assumiu a gestão de uma equipe heterogênea: dois técnicos com mais de 10 anos de experiência no SUAS (alta competência, mas resistência a mudanças), dois servidores recém-ingressos via concurso (entusiasmo alto, mas pouca experiência), e um técnico administrativo que faz o mínimo exigido. Há conflitos interpessoais frequentes entre os grupos. A coordenadora precisa definir a abordagem de liderança para cada perfil e propor ações para gerir os conflitos.`,
    comando: `Com base na Liderança Situacional de Hersey e Blanchard e nas teorias de motivação, descreva como a coordenadora deve liderar cada perfil de servidor, propondo estratégias de gestão de conflitos e indicadores para acompanhar o clima organizacional.`,
    perguntasOrientadoras: [
      "Qual estilo de liderança é adequado para cada perfil de servidor?",
      "Como as teorias de motivação explicam o comportamento de cada grupo?",
      "Quais estratégias de gestão de conflitos são indicadas?",
      "Como o clima organizacional pode ser monitorado?",
      "Qual é o papel do gestor público em promover um ambiente ético e colaborativo?",
    ],
    pontosObrigatorios: [
      "Liderança Situacional: identificar o nível de maturidade de cada grupo (M1 a M4) e o estilo correspondente",
      "Técnicos experientes com resistência: M3 (alta comp, comprometimento baixo) → E3 (apoio)",
      "Recém-ingressos entusiasmados: M1/M2 → E1/E2 (direção ou persuasão)",
      "Servidor desmotivado: diagnóstico motivacional (Herzberg: falta de motivadores?) → intervenção",
      "Gestão de conflitos: conflito funcional vs. disfuncional; mediação; acordos de convivência",
      "Ética: probidade, impessoalidade, respeito à dignidade no trato interpessoal",
      "Indicadores: clima organizacional (pesquisa), absenteísmo, turnover, produtividade",
    ],
    estruturaSugerida: [
      "CONTEXTUALIZAÇÃO (2 linhas): apresentar o desafio de liderar equipe heterogênea",
      "DIAGNÓSTICO DE MATURIDADE POR PERFIL (6 linhas): aplicar Hersey & Blanchard a cada grupo",
      "ESTRATÉGIAS MOTIVACIONAIS (5 linhas): Herzberg + McClelland para cada perfil",
      "GESTÃO DE CONFLITOS (5 linhas): identificar tipo + estratégia (mediação, negociação, acordo)",
      "ÉTICA E CLIMA ORGANIZACIONAL (4 linhas): papel da gestora + decreto 1.171/1994",
      "INDICADORES DE MONITORAMENTO (3 linhas): pesquisa de clima + métricas",
    ],
    legislacaoRelevante: [
      "Decreto 1.171/1994 — Código de Ética dos Servidores Públicos",
      "LC 840/2011 — deveres do servidor (Título V)",
      "NOB-RH/SUAS — gestão do trabalho no SUAS",
    ],
    indicadoresMonitoramento: [
      "Índice de clima organizacional (pesquisa semestral)",
      "Taxa de absenteísmo por equipe",
      "Número de conflitos formalizados/mês",
      "Taxa de cumprimento de metas individuais",
    ],
    dicaDiscursiva: "Este tema exige domínio da Liderança Situacional com os 4 perfis e seus respectivos estilos. Não descreva a teoria abstratamente — aplique ao caso concreto de cada grupo de servidores. O Quadrix valoriza a aplicação prática.",
    respostaModeloEsquema: [
      "1. Técnicos experientes/resistentes: M3 → E3 (apoio e compartilhamento de decisões)",
      "2. Novatos entusiasmados: M1 → E1 (direção clara e supervisão próxima)",
      "3. Desmotivado: diagnóstico Herzberg → oferecer motivadores (responsabilidade, crescimento)",
      "4. Conflitos: mediação + acordo de convivência + separar conflito funcional de disfuncional",
      "5. Ética: Decreto 1.171 — urbanidade, probidade, respeito",
      "6. Indicadores: pesquisa de clima + absenteísmo",
    ],
  },

  {
    id: "ec-004",
    titulo: "Planejamento orçamentário para ampliação de serviços socioassistenciais",
    disciplinas: ["AFO", "TGA — PODC", "SUAS"],
    dificuldade: "DIFICIL",
    contexto: `A Subsecretaria de Assistência Social do DF está elaborando o Plano de Trabalho para inclusão de novos serviços socioassistenciais na Proposta Orçamentária. A demanda inclui: abertura de dois novos CRAS em regiões com IDH baixo, implantação de um Centro POP para população em situação de rua e contratação de 40 novos técnicos via concurso público. O prazo é a compatibilização com a LDO para o exercício seguinte.`,
    comando: `Descreva o processo de planejamento e a relação entre o plano de expansão dos serviços e os instrumentos orçamentários (PPA, LDO e LOA), identificando as funções administrativas (PODC) envolvidas em cada etapa e os riscos de gestão a serem considerados.`,
    perguntasOrientadoras: [
      "Qual é a hierarquia entre PPA, LDO e LOA e como o plano de expansão se insere nela?",
      "Quais funções do PODC estão envolvidas em cada fase do processo?",
      "Que riscos fiscais e de gestão devem ser considerados?",
      "Como a LRF limita o planejamento de expansão de pessoal?",
      "Como o SUAS se organiza para executar a ampliação planejada?",
    ],
    pontosObrigatorios: [
      "Hierarquia: PPA (metas plurianuais) → LDO (prioridades anuais) → LOA (autorização)",
      "PODC: Planejamento (elaborar o plano de expansão); Organização (estruturar os novos CRAS); Direção (mobilizar equipes); Controle (monitorar metas)",
      "LRF: limite de pessoal — antes de contratar 40 técnicos, verificar se o DF está dentro do limite de 60% da RCL",
      "Riscos: contingenciamento orçamentário, resistência política, déficit de RH qualificado",
      "SUAS: articulação com NOB-SUAS (responsabilidade do DF de executar serviços e gerir rede)",
      "Indicadores de monitoramento da expansão",
    ],
    estruturaSugerida: [
      "CONTEXTUALIZAÇÃO (3 linhas): diagnóstico da demanda e justificativa da expansão",
      "PLANEJAMENTO ORÇAMENTÁRIO (6 linhas): PPA → LDO → LOA e como o plano se insere",
      "FUNÇÕES ADMINISTRATIVAS (5 linhas): PODC aplicado a cada etapa do processo",
      "RISCOS E LIMITES LEGAIS (5 linhas): LRF, contingenciamento, riscos operacionais",
      "MONITORAMENTO (4 linhas): indicadores de execução orçamentária e de impacto social",
      "CONCLUSÃO (2 linhas): planejamento integrado como garantia da efetividade",
    ],
    legislacaoRelevante: [
      "CF/88 — arts. 165-169 (PPA, LDO, LOA)",
      "LC 101/2000 — LRF (limites de pessoal e vedações)",
      "LOAS — art. 6 (organização da assistência social)",
      "NOB-SUAS 2012 — responsabilidades do DF",
    ],
    indicadoresMonitoramento: [
      "% de execução orçamentária dos novos CRAS no exercício",
      "Número de famílias atendidas nos novos equipamentos (meta anual)",
      "% da RCL comprometido com pessoal após contratação (limite: 60%)",
      "Prazo de implantação dos novos equipamentos (benchmark: 12 meses)",
    ],
    dicaDiscursiva: "Este tema integra AFO com TGA (PODC) e SUAS. A pegadinha é a LRF: antes de propor contratação de servidores, demonstre que está dentro do limite de 60% da RCL para o DF. O Quadrix valoriza candidatos que integram as disciplinas, não que as tratam em silos separados.",
    respostaModeloEsquema: [
      "1. PPA: incluir metas de expansão (4 anos); LDO: priorizar; LOA: autorizar a despesa",
      "2. PODC: P = plano de expansão; O = estruturar os novos equipamentos; D = gestão de equipes; C = monitorar indicadores",
      "3. LRF: verificar limite de pessoal (60% RCL) antes da contratação",
      "4. Riscos: contingenciamento, rotatividade de pessoal, cobertura territorial",
      "5. Indicadores: famílias atendidas, % execução, custo por família",
    ],
  },

  {
    id: "ec-005",
    titulo: "Violência doméstica e rede de proteção: articulação intersetorial no SUAS",
    disciplinas: ["SUAS/Direitos", "Lei Maria da Penha", "Gestão de Pessoas"],
    dificuldade: "MEDIO",
    contexto: `Uma mulher chega ao CREAS relatando que é vítima de violência doméstica praticada pelo companheiro. Ela apresenta marcas físicas, relata ameaças constantes e diz que o agressor tirou seus documentos e a impede de trabalhar. Tem dois filhos menores. A equipe do CREAS precisa definir os encaminhamentos e acionar a rede de proteção, respeitando os protocolos do SUAS e da Lei Maria da Penha.`,
    comando: `Descreva os procedimentos que a equipe do CREAS deve adotar para atender essa demanda, identificando as formas de violência presentes, os serviços da rede a serem acionados e os instrumentos legais de proteção disponíveis. Proponha indicadores para monitorar o acompanhamento do caso.`,
    perguntasOrientadoras: [
      "Quais formas de violência doméstica estão presentes no caso?",
      "Qual é o papel do CREAS no atendimento a essa demanda?",
      "Quais serviços da rede intersetorial devem ser acionados?",
      "Quais medidas protetivas de urgência são cabíveis?",
      "Como os filhos menores são protegidos nesse contexto?",
    ],
    pontosObrigatorios: [
      "Formas de violência: física (marcas), psicológica (ameaças), patrimonial (retenção de documentos, impedimento de trabalhar)",
      "CREAS: serviço de PSE média complexidade — PAEFI — acompanhamento especializado com vínculo familiar presente",
      "Rede a acionar: Delegacia da Mulher, Casa-Abrigo, DEAM, Juizado de Violência Doméstica, CRAM, MP",
      "Medidas protetivas: afastamento do agressor, proibição de aproximação, alimentos, guarda (arts. 18-24 LMP)",
      "Proteção dos filhos: ECA — dever de notificar ao Conselho Tutelar se houver risco para as crianças",
      "PAEFI + Abordagem Social como ferramentas do CREAS",
    ],
    estruturaSugerida: [
      "CONTEXTUALIZAÇÃO (2 linhas): situação de violência múltipla e urgência do atendimento",
      "FORMAS DE VIOLÊNCIA (4 linhas): identificar e classificar cada forma presente (art. 7º LMP)",
      "ATUAÇÃO DO CREAS (5 linhas): PAEFI + escuta qualificada + plano de atendimento individualizado",
      "REDE INTERSETORIAL (5 linhas): articulação com segurança pública, saúde, judiciário, habitação",
      "MEDIDAS PROTETIVAS (5 linhas): LMP arts. 18-24 + Lei 13.827/2019",
      "CRIANÇAS E INDICADORES (4 linhas): ECA + Conselho Tutelar + indicadores do caso",
    ],
    legislacaoRelevante: [
      "Lei 11.340/2006 — Lei Maria da Penha (arts. 5, 7, 18-24)",
      "Lei 13.827/2019 — afastamento imediato pelo delegado",
      "ECA (Lei 8.069/1990) — proteção da criança em situação de risco",
      "PNAS/2004 — Proteção Social Especial de Média Complexidade",
      "Tipificação Nacional — PAEFI",
    ],
    indicadoresMonitoramento: [
      "Número de encaminhamentos realizados para a rede (Delegacia, CRAM, Juizado)",
      "% de casos com medida protetiva concedida em até 48h",
      "Número de atendimentos de acompanhamento realizados no mês",
      "Taxa de retorno da vítima ao CREAS para continuidade do acompanhamento",
    ],
    dicaDiscursiva: "Este tema integra Lei Maria da Penha com SUAS (PAEFI/CREAS) e ECA (crianças em risco). É o tipo de questão mais provável para o cargo de Administração do SUAS, pois exige conhecimento da rede de proteção integrada. Cuidado para não confundir CRAS (básica, sem violação) com CREAS (especial, com violação).",
    respostaModeloEsquema: [
      "1. Violência: física + psicológica + patrimonial (art. 7º LMP)",
      "2. CREAS: PAEFI — acompanhamento especializado (vínculo preservado)",
      "3. Rede: DEAM + Casa-Abrigo + Juizado VD + CRAM + Saúde + Habitação",
      "4. Medidas protetivas: afastamento + proibição de aproximação + Lei 13.827/2019",
      "5. Crianças: Conselho Tutelar + ECA (proteção integral e prioridade absoluta)",
      "6. Indicadores: encaminhamentos, medidas protetivas, retorno ao acompanhamento",
    ],
  },

  {
    id: "ec-006",
    titulo: "Implementação do 5S e mapeamento de processos em unidade do SUAS",
    disciplinas: ["OS&M", "Gestão de Pessoas", "TGA"],
    dificuldade: "FACIL",
    contexto: `Uma unidade de acolhimento institucional para idosos do DF apresenta desorganização nos arquivos dos usuários, ausência de fluxos padronizados de atendimento e ambiente físico inadequado. A gestora quer implementar o programa 5S e redesenhar os processos de trabalho para melhorar a qualidade do serviço prestado.`,
    comando: `Descreva como o programa 5S deve ser implementado nessa unidade e como o mapeamento de processos (BPM) pode contribuir para redesenhar o fluxo de atendimento, propondo indicadores de monitoramento.`,
    perguntasOrientadoras: [
      "Quais são os 5 sensos e como se aplicam a essa unidade?",
      "O que é BPM e como o mapeamento AS-IS e TO-BE contribui para a melhoria?",
      "Que resistências podem surgir da equipe e como gerenciá-las?",
      "Como a gestão da mudança (Lewin) pode ser aplicada?",
      "Quais indicadores medem o sucesso da implementação?",
    ],
    pontosObrigatorios: [
      "5S: SEIRI (eliminar arquivos desnecessários), SEITON (organizar arquivos por ordem), SEISOU (limpeza), SEIKETSU (padronizar), SHITSUKE (disciplina para manter)",
      "BPM: mapeamento AS-IS (processo atual) → análise de gargalos → TO-BE (processo redesenhado)",
      "Fluxograma: ferramenta visual para representar o novo processo",
      "Gestão da mudança (Lewin): descongelar (sensibilizar a equipe), mover (implementar), recongelar (padronizar)",
      "Resistência à mudança: comunicação, participação da equipe no redesenho, treinamento",
      "Indicadores: índice de organização dos arquivos, tempo de localização de prontuários, satisfação dos idosos",
    ],
    estruturaSugerida: [
      "CONTEXTUALIZAÇÃO (2 linhas): diagnóstico da desorganização e impacto na qualidade do serviço",
      "5S APLICADO À UNIDADE (6 linhas): cada senso com exemplo concreto para a unidade",
      "BPM E MAPEAMENTO (5 linhas): AS-IS → análise → TO-BE + fluxograma do novo processo",
      "GESTÃO DA MUDANÇA (5 linhas): Lewin (descongelar-mover-recongelar) + resistências e como superar",
      "INDICADORES (3 linhas): métricas de organização, eficiência e qualidade",
      "CONCLUSÃO (2 linhas): 5S + BPM como base para a melhoria contínua",
    ],
    legislacaoRelevante: [
      "Tipificação Nacional — Serviço de Acolhimento Institucional para Idosos",
      "Estatuto da Pessoa Idosa (Lei 10.741/2003) — qualidade dos serviços de acolhimento",
    ],
    indicadoresMonitoramento: [
      "Tempo médio para localização de prontuário de usuário (meta: < 2 min)",
      "% de espaços organizados conforme padrão 5S (auditoria mensal)",
      "Número de reclamações sobre organização registradas no período",
      "Satisfação dos usuários com as condições do ambiente (pesquisa semestral)",
    ],
    dicaDiscursiva: "Tema mais tranquilo — exige apenas o domínio do 5S, BPM e gestão da mudança. Aplique cada conceito ao contexto da unidade de acolhimento. O Quadrix espera que você conecte cada senso do 5S com uma situação concreta da unidade.",
    respostaModeloEsquema: [
      "1. 5S: eliminar documentos velhos (Seiri) → organizar por ordem/cor (Seiton) → limpar (Seisou) → padronizar (Seiketsu) → disciplinar a equipe (Shitsuke)",
      "2. BPM: mapear o fluxo atual (AS-IS) → identificar gargalos → redesenhar (TO-BE)",
      "3. Lewin: sensibilizar equipe (descongelar) → implementar novo fluxo (mover) → padronizar e auditar (recongelar)",
      "4. Indicadores: tempo de localização de prontuário, % de conformidade com 5S",
    ],
  },

  {
    id: "ec-007",
    titulo: "Parceria com OSC para ampliar serviços: aplicação do MROSC",
    disciplinas: ["SUAS", "MROSC", "AFO"],
    dificuldade: "MEDIO",
    contexto: `A SEDES precisa ampliar o serviço de acolhimento para mulheres vítimas de violência doméstica no DF. O Governo do Distrito Federal não tem imóvel disponível imediatamente e quer firmar parceria com uma organização da sociedade civil experiente na área para operar uma Casa-Abrigo. A parceria envolverá repasse de recursos públicos e a execução seguirá o plano de trabalho definido pela própria Secretaria.`,
    comando: `Descreva o instrumento jurídico adequado para essa parceria, o processo de seleção da OSC, as obrigações de prestação de contas e os mecanismos de controle, à luz da Lei 13.019/2014 (MROSC).`,
    perguntasOrientadoras: [
      "Qual instrumento do MROSC é adequado e por quê?",
      "Como o chamamento público deve ser conduzido?",
      "Quais são as obrigações da OSC e da Administração na execução da parceria?",
      "Como é feita a prestação de contas?",
      "Qual é o papel do controle social nessa parceria?",
    ],
    pontosObrigatorios: [
      "Instrumento: Termo de COLABORAÇÃO (Administração propõe o plano de trabalho + OSC executa)",
      "Chamamento público: obrigatório para TC e TF (salvo dispensa/inexigibilidade)",
      "Obrigações da OSC: prestação de contas, transparência, inserção de dados no SICONV",
      "Comissão de Monitoramento e Avaliação: responsável pelo acompanhamento da execução",
      "Vedações: recursos não podem pagar salário do dirigente da OSC nem despesas não previstas",
      "Controle social: Conselho de Assistência Social fiscaliza o uso dos recursos",
    ],
    estruturaSugerida: [
      "CONTEXTUALIZAÇÃO (2 linhas): necessidade de parceria e escolha do instrumento",
      "INSTRUMENTO E JUSTIFICATIVA (4 linhas): Termo de Colaboração vs. Fomento — quem propõe?",
      "CHAMAMENTO PÚBLICO (5 linhas): processo seletivo, edital, critérios de habilitação e julgamento",
      "EXECUÇÃO E OBRIGAÇÕES (5 linhas): responsabilidades da OSC e da Administração",
      "PRESTAÇÃO DE CONTAS E CONTROLE (5 linhas): relatórios, monitoramento, Comissão, CMAS",
      "CONCLUSÃO (2 linhas): transparência e controle social como garantias da efetividade",
    ],
    legislacaoRelevante: [
      "Lei 13.019/2014 — MROSC (Termo de Colaboração, chamamento público, prestação de contas)",
      "Lei 11.340/2006 — serviços de proteção à mulher (Casa-Abrigo)",
      "PNAS/2004 — Proteção Social Especial de Alta Complexidade",
    ],
    indicadoresMonitoramento: [
      "% de execução orçamentária da parceria no exercício",
      "Número de mulheres acolhidas na Casa-Abrigo/mês",
      "Prazo de apresentação dos relatórios de prestação de contas",
      "Número de visitas de monitoramento realizadas pela Comissão",
    ],
    dicaDiscursiva: "A chave deste tema é saber POR QUE o instrumento é o Termo de Colaboração (não Fomento): porque quem propõe é a Administração (SEDES), não a OSC. Explique essa diferença com clareza no início da resposta.",
    respostaModeloEsquema: [
      "1. Instrumento: Termo de Colaboração — SEDES propõe, OSC executa",
      "2. Chamamento público: edital com critérios técnicos + habilitação da OSC",
      "3. Execução: OSC segue plano da SEDES + Comissão de Monitoramento acompanha",
      "4. Prestação de contas: parcial (bimestral) e final; vedações do MROSC",
      "5. Controle social: CMAS fiscaliza + transparência ativa (portal da parceria)",
    ],
  },

  {
    id: "ec-008",
    titulo: "Concurso público e gestão do ingresso: recrutamento, seleção e integração no SUAS",
    disciplinas: ["Gestão de Pessoas", "TGA", "LC 840/2011"],
    dificuldade: "MEDIO",
    contexto: `A SEDES realizou concurso público para provimento de vagas de EDAS — Administração. Após homologação, 30 servidores tomaram posse e estão sendo integrados à Secretaria. A gestora de RH identificou que: metade dos aprovados tem formação na área privada e pouca familiaridade com o setor público; há déficit de servidores em CRAS do interior do DF; e a Secretaria não possui um plano estruturado de integração (onboarding).`,
    comando: `Descreva um programa de integração (onboarding) para os novos servidores, incluindo ações de desenvolvimento por competências, a estrutura de acompanhamento no estágio probatório e as implicações da LC 840/2011 para o servidor em estágio probatório.`,
    perguntasOrientadoras: [
      "O que é um programa de integração (onboarding) e quais são seus componentes?",
      "Como a gestão por competências orienta o desenvolvimento dos novos servidores?",
      "Quais são as obrigações e direitos do servidor em estágio probatório segundo a LC 840/2011?",
      "Qual estilo de liderança é adequado para servidores recém-ingressos?",
      "Como monitorar o desenvolvimento durante o estágio probatório?",
    ],
    pontosObrigatorios: [
      "Onboarding: acolhida institucional, apresentação da missão/visão/valores, treinamento inicial, mentoria",
      "Gestão por competências (CHA): mapeamento das competências exigidas para o cargo vs. o que os novos servidores já têm (gap)",
      "Estágio probatório (LC 840/2011): período de avaliação para aquisição de estabilidade; critérios — assiduidade, disciplina, capacidade de iniciativa, produtividade, responsabilidade",
      "Liderança situacional: E1 (Direção) para servidores novatos (M1/M2)",
      "PDI (Plano de Desenvolvimento Individual): metas de desenvolvimento durante o estágio",
      "Decreto 9.991/2019 (PNDP): política de desenvolvimento de pessoas no setor público",
    ],
    estruturaSugerida: [
      "CONTEXTUALIZAÇÃO (2 linhas): desafio de integrar servidores com perfil de setor privado",
      "PROGRAMA DE INTEGRAÇÃO — ONBOARDING (6 linhas): fases, conteúdos e responsáveis",
      "GESTÃO POR COMPETÊNCIAS (5 linhas): mapeamento de gaps + PDI + capacitação",
      "ESTÁGIO PROBATÓRIO (LC 840/2011) (5 linhas): critérios, avaliações periódicas, consequências",
      "LIDERANÇA E ACOMPANHAMENTO (4 linhas): E1 para novatos + mentoria",
      "INDICADORES (3 linhas): desempenho no estágio + satisfação + gap de competências",
    ],
    legislacaoRelevante: [
      "LC 840/2011 — estágio probatório e aquisição de estabilidade",
      "Decreto 9.991/2019 — PNDP (Política Nacional de Desenvolvimento de Pessoas)",
      "CF/88 — art. 41 (estabilidade e estágio probatório)",
    ],
    indicadoresMonitoramento: [
      "% de servidores com PDI elaborado nos primeiros 30 dias",
      "Resultado das avaliações do estágio probatório (bimestral)",
      "% de gap de competências fechado ao final do estágio",
      "Satisfação dos novos servidores com o programa de integração (pesquisa ao final do 1º mês)",
    ],
    dicaDiscursiva: "Este tema integra GP (onboarding, gestão por competências, liderança situacional) com a LC 840/2011 (estágio probatório) — que é Conhecimento Geral do DF mas relevante para a gestão. Uma boa resposta conecta o plano de desenvolvimento individual com os critérios de avaliação do estágio probatório.",
    respostaModeloEsquema: [
      "1. Onboarding: 3 fases — pré-ingresso (informações), primeiro dia (acolhida), primeiros 90 dias (treinamento + mentoria)",
      "2. Competências: mapear o gap CHA dos novatos → PDI individual",
      "3. Estágio probatório (LC 840): assiduidade, disciplina, produtividade, responsabilidade, capacidade de iniciativa",
      "4. Liderança E1 (direção) para novatos — instruções claras e acompanhamento próximo",
      "5. Indicadores: avaliações de estágio + gap de competências + satisfação",
    ],
  },

  {
    id: "ec-009",
    titulo: "Política para população em situação de rua: territorialização e abordagem social",
    disciplinas: ["SUAS/Direitos", "TGA", "Gestão de Pessoas"],
    dificuldade: "MEDIO",
    contexto: `O CREAS do Plano Piloto identificou, por meio da vigilância socioassistencial, aumento de 40% na população em situação de rua na Asa Norte nos últimos 6 meses. O Centro POP está com capacidade lotada e a equipe de abordagem social realiza o mapeamento do território, mas não tem protocolo padronizado para encaminhamento dos usuários. Muitos retornam às ruas após períodos de acolhimento por falta de articulação com a rede de saúde e trabalho.`,
    comando: `Proponha estratégias de gestão para ampliar e qualificar o atendimento à população em situação de rua, incluindo articulação da rede intersetorial, melhorias no processo de abordagem social e indicadores de monitoramento, com base na Política Nacional para a População em Situação de Rua (Decreto 7.053/2009).`,
    perguntasOrientadoras: [
      "Quais são os princípios da Política Nacional para a PSR?",
      "Como deve funcionar a articulação entre o CREAS, Centro POP e outros serviços?",
      "Quais são as fases da abordagem social e como padronizá-las?",
      "Como a gestão por processos (BPM) pode melhorar o fluxo de encaminhamento?",
      "Quais indicadores permitem monitorar a evolução do atendimento?",
    ],
    pontosObrigatorios: [
      "Decreto 7.053/2009: princípios — igualdade, respeito à dignidade, não discriminação, autonomia",
      "Centro POP: equipamento específico para PSR de média complexidade (CREAS especializado)",
      "Abordagem Social: serviço de proteção especial para pessoas em espaços públicos",
      "Articulação intersetorial: saúde (CAPS, UBS), habitação (programas de moradia), trabalho/renda",
      "Protocolo de abordagem: abordagem → escuta → verificação de documentação → plano individual → encaminhamento → acompanhamento",
      "BPM: mapeamento do fluxo atual + redesenho com padronização dos encaminhamentos",
    ],
    estruturaSugerida: [
      "CONTEXTUALIZAÇÃO (2 linhas): diagnóstico do aumento da PSR e gargalos identificados",
      "POLÍTICA NACIONAL PSR (4 linhas): princípios do Decreto 7.053/2009 + Centro POP",
      "PROCESSO DE ABORDAGEM PADRONIZADO (6 linhas): protocolo + BPM (AS-IS → TO-BE)",
      "ARTICULAÇÃO INTERSETORIAL (5 linhas): rede — saúde, habitação, trabalho, justiça",
      "GESTÃO DE PESSOAS (4 linhas): capacitação da equipe de abordagem + gestão situacional",
      "INDICADORES (4 linhas): acesso, encaminhamento, retorno às ruas",
    ],
    legislacaoRelevante: [
      "Decreto 7.053/2009 — Política Nacional para PSR",
      "Tipificação Nacional — Serviço Especializado em Abordagem Social e Centro POP",
      "PNAS/2004 — PSE média complexidade",
    ],
    indicadoresMonitoramento: [
      "Número de pessoas abordadas/mês na Asa Norte",
      "% de encaminhamentos com continuidade (retorno em 30 dias)",
      "Taxa de reinserção produtiva (emprego/renda) no semestre",
      "% de usuários com documentação regularizada após 90 dias de acompanhamento",
    ],
    dicaDiscursiva: "Tema que integra política social específica (PSR) com gestão de processos (BPM) e intersetorialidade. Demonstre conhecimento do Decreto 7.053/2009 E conecte com o SUAS (CREAS/Centro POP). O Quadrix valoriza propostas que mostrem como articular a rede — não apenas listar os equipamentos.",
    respostaModeloEsquema: [
      "1. PSR: Decreto 7.053 — dignidade, não discriminação, autonomia",
      "2. Centro POP: equipamento de referência (CREAS especializado para PSR)",
      "3. Protocolo de abordagem: mapeamento AS-IS → redesenho TO-BE com fluxograma",
      "4. Rede: CAPS (saúde mental) + UBS + CEHAB (moradia) + SINE (emprego)",
      "5. Indicadores: abordagens realizadas, encaminhamentos efetivos, reinserção produtiva",
    ],
  },

  {
    id: "ec-010",
    titulo: "Controle interno e transparência: SIAFEM-DF e relatórios de gestão",
    disciplinas: ["AFO", "TGA", "Ética"],
    dificuldade: "DIFICIL",
    contexto: `A auditoria interna da SEDES identificou que 30% dos relatórios de execução orçamentária estão sendo entregues fora do prazo, há inconsistências entre os dados do SIAFEM-DF e os relatórios manuais, e dois contratos de serviços socioassistenciais apresentam pagamentos sem a devida liquidação. O Tribunal de Contas do DF solicitou esclarecimentos sobre a gestão dos recursos.`,
    comando: `Identifique as irregularidades presentes no caso, descreva as correções necessárias e proponha um sistema de controle interno para prevenir tais situações, considerando as exigências da LRF e os princípios da Administração Pública.`,
    perguntasOrientadoras: [
      "Quais irregularidades foram identificadas e qual é sua gravidade?",
      "Quais estágios da despesa foram violados?",
      "O que determina a LRF sobre transparência e relatórios obrigatórios?",
      "Como deve funcionar um sistema de controle interno eficiente?",
      "Quais são as responsabilidades dos gestores nesse contexto?",
    ],
    pontosObrigatorios: [
      "Irregularidades: (1) relatórios fora do prazo — viola RREO/RGF da LRF; (2) dados inconsistentes — viola princípio da transparência; (3) pagamento sem liquidação — viola estágios da despesa (art. 63 Lei 4.320/64)",
      "Estágios: pagamento sem liquidação é grave — viola o ciclo empenho-liquidação-PAGAMENTO",
      "LRF: RREO bimestral; RGF quadrimestral; transparência é pilar da LRF",
      "SIAFEM-DF: sistema de controle financeiro do DF — todas as transações devem estar registradas",
      "Controle interno: segregação de funções; conferência cruzada SIAFEM vs. relatórios; cronograma de relatórios",
      "Responsabilidade do gestor: LC 840/2011 — o gestor responde pelos atos de sua gestão",
    ],
    estruturaSugerida: [
      "CONTEXTUALIZAÇÃO (2 linhas): diagnóstico das irregularidades e riscos",
      "IDENTIFICAÇÃO E CLASSIFICAÇÃO DAS IRREGULARIDADES (5 linhas): detalhar cada irregularidade + base legal",
      "CORREÇÕES IMEDIATAS (4 linhas): regularizar os pagamentos + atualizar o SIAFEM",
      "SISTEMA DE CONTROLE INTERNO (6 linhas): segregação de funções + conferência + cronograma",
      "LRF E TRANSPARÊNCIA (5 linhas): relatórios obrigatórios + responsabilidade do gestor",
      "INDICADORES (3 linhas): conformidade, prazos, consistência dos dados",
    ],
    legislacaoRelevante: [
      "LC 101/2000 — LRF (RREO, RGF, transparência)",
      "Lei 4.320/1964 — estágios da despesa (arts. 58-64)",
      "CF/88 — art. 37 (princípios) e art. 70-75 (controle interno e externo)",
      "LC 840/2011 — responsabilidade do servidor",
    ],
    indicadoresMonitoramento: [
      "% de relatórios (RREO/RGF) entregues dentro do prazo (meta: 100%)",
      "% de despesas com liquidação antes do pagamento (meta: 100%)",
      "Número de inconsistências SIAFEM vs. relatórios manuais identificadas/mês",
      "Prazo de resposta a solicitações do TCDF (meta: < 30 dias)",
    ],
    dicaDiscursiva: "Este é o tema mais técnico e difícil — exige domínio de AFO (estágios, LRF, relatórios) + conhecimento de controle interno. O ponto chave: pagamento sem liquidação é a irregularidade mais grave pois viola um estágio obrigatório da despesa pública. Use a sequência 'identificação → correção → prevenção' na estrutura.",
    respostaModeloEsquema: [
      "1. Irregularidades: relatórios fora do prazo (LRF) + dados inconsistentes (transparência) + pagamento sem liquidação (Lei 4.320)",
      "2. Mais grave: pagamento sem liquidação — viola sequência obrigatória dos estágios",
      "3. LRF: RREO (bimestral) e RGF (quadrimestral) são obrigatórios",
      "4. Controle interno: segregação de funções + conferência cruzada + cronograma de relatórios",
      "5. Responsabilidade: LC 840/2011 — gestor responde por omissão",
    ],
  },

];

// ============================================================
// ESTRUTURA DE RESPOSTA MODELO PARA A DISCURSIVA
// ============================================================

export const ESTRUTURA_DISCURSIVA = {
  totalLinhas: { min: 20, max: 30 },
  criterios: {
    CAC: { peso: 7, descricao: "Conteúdo e Atendimento ao Comando — o que deve conter" },
    OT: { peso: 1.5, descricao: "Organização Textual — coerência, coesão, estrutura dissertativa" },
    DLP: { peso: 1.5, descricao: "Domínio da Língua Portuguesa — gramática, ortografia, pontuação" },
  },
  formulaCalculo: "[(CAC × 7) + (OT × 1.5) + (DLP × 1.5)] ÷ 0,3",
  estruturaPadrao: [
    "PARÁGRAFO 1 — CONTEXTUALIZAÇÃO (3-4 linhas): apresentar o problema/tema e sua relevância no contexto socioassistencial",
    "PARÁGRAFO 2 — DIAGNÓSTICO/CAUSAS (4-5 linhas): analisar as causas do problema, citar base legal ou teórica",
    "PARÁGRAFO 3 — PROPOSTAS/SOLUÇÕES (6-8 linhas): propor ações concretas, referenciar conceitos e legislação",
    "PARÁGRAFO 4 — INDICADORES DE MONITORAMENTO (3-4 linhas): propor indicadores mensuráveis",
    "PARÁGRAFO 5 — CONCLUSÃO (2-3 linhas): síntese das propostas e impacto esperado",
  ],
  dicasGerais: [
    "Nunca comece com 'o presente estudo de caso...' ou 'o caso em análise...': contextualice diretamente o tema",
    "Cite legislação de forma natural no texto: '...conforme determina a PNAS/2004...'",
    "Use conectivos para articular ideias: portanto, dessa forma, além disso, em contrapartida",
    "Indicadores devem ser mensuráveis: evite 'melhorar o atendimento' — diga 'reduzir o tempo médio de espera para X minutos'",
    "Mantenha a coerência temática: cada parágrafo deve contribuir para responder o comando",
    "Atenção ao número de linhas: conte antes de entregar — mínimo 20, máximo 30",
  ],
};

export default TEMAS_ESTUDO_CASO;

// ============================================================
// SEDES DF 2026 — BANCO DE QUESTÕES (Estilo Quadrix)
// Cargo 400 | Múltipla Escolha — 5 alternativas (A-E)
// ============================================================

export type Dificuldade = "FACIL" | "MEDIO" | "DIFICIL";
export type Gabarito = "a" | "b" | "c" | "d" | "e";

export interface Questao {
  id: string;
  disciplinaId: string;
  topico: string;
  dificuldade: Dificuldade;
  enunciado: string;
  opcoes: { a: string; b: string; c: string; d: string; e: string };
  gabarito: Gabarito;
  comentario: string;
}

export const QUESTOES: Questao[] = [

  // ============================================================
  // LÍNGUA PORTUGUESA
  // ============================================================

  {
    id: "lp-001",
    disciplinaId: "lp",
    topico: "Coesão textual — conectivos",
    dificuldade: "MEDIO",
    enunciado: `Assinale a alternativa em que o conectivo destacado estabelece a mesma relação de sentido que o conectivo sublinhado no trecho: "A gestora reconheceu a importância do programa, CONTUDO não havia recursos disponíveis para sua implementação imediata."`,
    opcoes: {
      a: "O CRAS foi inaugurado há três anos; PORTANTO, já atende mais de mil famílias.",
      b: "A equipe foi capacitada; LOGO, os resultados melhoraram significativamente.",
      c: "O benefício foi concedido, EMBORA o requerente não atendesse a todos os critérios.",
      d: "O servidor cumpriu o prazo; TODAVIA, o relatório apresentava inconsistências.",
      e: "A política foi aprovada PORQUE havia demanda comprovada no território.",
    },
    gabarito: "d",
    comentario: "'Contudo' estabelece relação de adversidade/oposição. A alternativa D usa 'todavia', que também é adversativo e estabelece a mesma relação de oposição entre as orações. As demais: A e B usam conectivos de conclusão/consequência (portanto, logo); C usa 'embora' que é concessivo (admite mais a ressalva do que se opõe); E usa 'porque', que é causal.",
  },

  {
    id: "lp-002",
    disciplinaId: "lp",
    topico: "Coesão textual — 'uma vez que'",
    dificuldade: "MEDIO",
    enunciado: `Em relação ao emprego do conectivo "uma vez que", assinale a alternativa CORRETA.`,
    opcoes: {
      a: "'Uma vez que' é um conectivo temporal que indica o momento em que algo ocorreu.",
      b: "O conectivo 'uma vez que' estabelece relação de causa, sendo equivalente a 'já que' e 'visto que'.",
      c: "'Uma vez que' estabelece relação de concessão, equivalendo a 'embora'.",
      d: "O conectivo 'uma vez que' introduz sempre uma oração consequência.",
      e: "'Uma vez que' e 'desde que' são sinônimos e indicam condição apenas.",
    },
    gabarito: "b",
    comentario: "'Uma vez que' é um conectivo de valor CAUSAL (= já que, visto que, porquanto). Muitos candidatos confundem com sentido temporal por causa da palavra 'vez'. Ex: 'Uma vez que o servidor faltou sem justificativa, a advertência foi aplicada' = 'Como o servidor faltou...'",
  },

  {
    id: "lp-003",
    disciplinaId: "lp",
    topico: "Concordância verbal — HAVER existencial",
    dificuldade: "MEDIO",
    enunciado: `Assinale a alternativa em que a concordância verbal está CORRETA segundo a norma padrão da língua portuguesa.`,
    opcoes: {
      a: "Haviam várias famílias aguardando atendimento no CRAS naquela manhã.",
      b: "Existia, naquele município, centenas de famílias sem cadastro no CadÚnico.",
      c: "Fazem dois anos que o novo CREAS foi inaugurado no Distrito Federal.",
      d: "Havia inúmeros servidores insatisfeitos com as condições de trabalho.",
      e: "Houveram mudanças significativas na legislação socioassistencial em 2024.",
    },
    gabarito: "d",
    comentario: "O verbo HAVER, no sentido existencial, é IMPESSOAL — fica sempre no singular. 'Havia inúmeros servidores' está correto. Análise dos erros: A — 'Haviam' (errado, impessoal); B — 'Existia... centenas' (errado, existir não é impessoal — deve concordar com 'centenas': existiam); C — 'Fazem dois anos' (errado, FAZER temporal é impessoal: faz); E — 'Houveram' (errado, impessoal: houve).",
  },

  {
    id: "lp-004",
    disciplinaId: "lp",
    topico: "Regência verbal — verbos problemáticos",
    dificuldade: "MEDIO",
    enunciado: `Assinale a alternativa em que o emprego da regência verbal está em DESACORDO com a norma culta.`,
    opcoes: {
      a: "O servidor aspirava a uma promoção por merecimento após dez anos de dedicação.",
      b: "A gestora assistiu à reunião de planejamento realizada na secretaria.",
      c: "Os usuários obedeceram às instruções fornecidas pela equipe técnica.",
      d: "A equipe visou melhorar os indicadores de atendimento do CRAS.",
      e: "Os servidores preferiram o trabalho presencial do que o teletrabalho.",
    },
    gabarito: "e",
    comentario: "O verbo PREFERIR exige a preposição 'A' no segundo termo: 'preferiram o trabalho presencial AO teletrabalho'. O uso de 'do que' com 'preferir' é incorreto na norma culta. Análise das demais: A — correta (aspirar a = almejar); B — correta (assistir a = ver/presenciar); C — correta (obedecer a); D — correta (visar + infinitivo sem 'a' é aceito na norma contemporânea).",
  },

  {
    id: "lp-005",
    disciplinaId: "lp",
    topico: "Crase",
    dificuldade: "MEDIO",
    enunciado: `Assinale a alternativa em que o emprego da crase está CORRETO em todos os casos.`,
    opcoes: {
      a: "Às vezes, à tarde, o gestor se referia à aquela proposta rejeitada.",
      b: "O servidor chegou às 14h e encaminhou o processo à Subsecretaria.",
      c: "A equipe foi à reunião e voltou à pé, pois o trajeto era curto.",
      d: "Refiro-me à esta questão e à aquela outra apresentada ontem.",
      e: "O técnico aspira à ser promovido e visa à um cargo de gestão.",
    },
    gabarito: "b",
    comentario: "Análise das alternativas: A — 'à aquela' está errado (não se usa crase antes de 'aquela' quando já há o 'à' preposição... na verdade, 'àquela' é correto (fusão de a+aquela), mas 'à aquela' com espaço está errado — deve ser 'àquela'. Além disso, 'às vezes' e 'à tarde' estão corretos. A opção B está correta: 'às 14h' (crase antes de horas) e 'à Subsecretaria' (crase antes de substantivo feminino determinado). C — 'à pé' errado (locução 'a pé' não admite crase). D — 'à esta' errado (não há crase antes de pronomes demonstrativos com 'e': esta, esse, este). E — 'aspira à ser promovido' errado (não há crase antes de verbo).",
  },

  {
    id: "lp-006",
    disciplinaId: "lp",
    topico: "Interpretação de texto — inferência",
    dificuldade: "MEDIO",
    enunciado: `Leia o trecho: "A política de assistência social, ao longo das últimas décadas, deixou de ser encarada como caridade para tornar-se um direito do cidadão. Essa transformação, porém, ainda não se reflete plenamente na consciência coletiva, que frequentemente associa o beneficiário ao estigma da incapacidade." Com base no trecho, é CORRETO inferir que:`,
    opcoes: {
      a: "A política de assistência social ainda não é reconhecida legalmente como direito do cidadão.",
      b: "O autor defende que a assistência social deve voltar a ter caráter caritativo.",
      c: "Apesar da evolução legal, persiste na sociedade uma percepção equivocada sobre o beneficiário.",
      d: "A transformação mencionada é recente e ocorreu apenas nos últimos cinco anos.",
      e: "O estigma associado ao beneficiário é exclusivo de países em desenvolvimento.",
    },
    gabarito: "c",
    comentario: "O texto afirma que houve transformação (de caridade para direito), mas que ela 'ainda não se reflete plenamente na consciência coletiva'. Isso permite inferir que a percepção social equivocada persiste, apesar da evolução legal — o que corresponde à alternativa C. As demais extrapolam ou contradizem o texto: A inverte o sentido; B contradiz o texto; D não tem base no trecho; E extrapola o que o texto afirma.",
  },

  // ============================================================
  // CONHECIMENTOS DO DF / LEGISLAÇÃO
  // ============================================================

  {
    id: "df-001",
    disciplinaId: "df-leg",
    topico: "LC 840/2011 — prazos prescricionais",
    dificuldade: "MEDIO",
    enunciado: `De acordo com a Lei Complementar nº 840/2011, que institui o Regime Jurídico dos Servidores Públicos Civis do Distrito Federal, assinale a alternativa que apresenta CORRETAMENTE os prazos prescricionais para a aplicação das penalidades disciplinares.`,
    opcoes: {
      a: "Advertência: 1 ano; Suspensão: 2 anos; Demissão: 5 anos.",
      b: "Advertência: 180 dias; Suspensão: 2 anos; Demissão, cassação e destituição: 5 anos.",
      c: "Advertência: 180 dias; Suspensão: 1 ano; Demissão: 3 anos.",
      d: "Advertência: 90 dias; Suspensão: 2 anos; Demissão: 5 anos.",
      e: "Advertência: 180 dias; Suspensão: 3 anos; Demissão, cassação e destituição: 5 anos.",
    },
    gabarito: "b",
    comentario: "Os prazos prescricionais da LC 840/2011 são: Advertência = 180 dias; Suspensão = 2 anos; Demissão, Cassação de aposentadoria/disponibilidade e Destituição de cargo em comissão = 5 anos. A pegadinha clássica é confundir 'advertência' com 1 ano (correto: 180 dias) e 'suspensão' com prazo diferente de 2 anos.",
  },

  {
    id: "df-002",
    disciplinaId: "df-leg",
    topico: "LC 840/2011 — sindicância e PAD",
    dificuldade: "MEDIO",
    enunciado: `Sobre o processo de apuração de infrações disciplinares previsto na LC 840/2011, assinale a alternativa CORRETA.`,
    opcoes: {
      a: "A sindicância pode resultar em aplicação de qualquer penalidade disciplinar, inclusive a demissão.",
      b: "O Processo Administrativo Disciplinar (PAD) é dispensável quando a infração é manifesta e confessada.",
      c: "A sindicância tem prazo de 30 dias, podendo ser prorrogada por mais 30 dias, e pode resultar em advertência ou suspensão de até 30 dias.",
      d: "A sindicância e o PAD são procedimentos alternativos, podendo a autoridade escolher qual utilizar independentemente da penalidade prevista.",
      e: "O PAD pode ser instaurado diretamente, sem necessidade de sindicância prévia, apenas para apurar infrações sujeitas à pena de advertência.",
    },
    gabarito: "c",
    comentario: "A sindicância tem prazo de 30 dias (prorrogável por igual período) e pode resultar em: arquivamento, advertência ou suspensão de até 30 dias. Para penas mais graves (suspensão superior a 30 dias e demissão), é obrigatório o PAD. A e B estão erradas pois a sindicância não pode resultar em demissão, e o PAD não pode ser dispensado mesmo com confissão. D está errada — não é livre escolha. E está errada — PAD não é usado para advertência (essa cabe à sindicância).",
  },

  {
    id: "df-003",
    disciplinaId: "df-leg",
    topico: "Lei Maria da Penha — formas de violência",
    dificuldade: "FACIL",
    enunciado: `João, após separação conjugal, reteve os documentos pessoais e o cartão bancário de sua ex-companheira Maria, impedindo-a de acessar seus recursos financeiros. De acordo com a Lei nº 11.340/2006 (Lei Maria da Penha), essa conduta configura violência doméstica na forma:`,
    opcoes: {
      a: "Psicológica, pois causa sofrimento emocional à vítima.",
      b: "Moral, pois consiste em ato que visa diminuir a honra da vítima.",
      c: "Física, pois implica restrição à liberdade de locomoção da vítima.",
      d: "Patrimonial, pois configura retenção de documentos pessoais e bens da vítima.",
      e: "Sexual, pois interfere na autonomia da vítima.",
    },
    gabarito: "d",
    comentario: "O art. 7º, IV, da Lei 11.340/2006 define violência patrimonial como 'qualquer conduta que configure retenção, subtração, destruição parcial ou total de seus objetos, instrumentos de trabalho, documentos pessoais, bens, valores e direitos ou recursos econômicos'. A retenção de documentos e cartão bancário se enquadra exatamente nessa definição. Embora a conduta também possa gerar sofrimento psicológico, a forma específica aqui é a patrimonial.",
  },

  {
    id: "df-004",
    disciplinaId: "df-leg",
    topico: "Lei Maria da Penha — medidas protetivas",
    dificuldade: "MEDIO",
    enunciado: `Com base na Lei nº 11.340/2006 e suas alterações, assinale a alternativa CORRETA sobre as medidas protetivas de urgência.`,
    opcoes: {
      a: "As medidas protetivas de urgência só podem ser concedidas pelo Ministério Público.",
      b: "O juiz deve conceder ou negar as medidas protetivas de urgência no prazo máximo de 72 horas.",
      c: "A Lei 13.827/2019 possibilitou que delegado de polícia ou policial aplique imediatamente medida protetiva de afastamento do lar, em casos de risco atual ou iminente à vida ou integridade da ofendida.",
      d: "As medidas protetivas de urgência somente podem ser concedidas após o inquérito policial estar instaurado.",
      e: "A medida protetiva de afastamento do lar implica, automaticamente, a suspensão do poder familiar.",
    },
    gabarito: "c",
    comentario: "A Lei 13.827/2019 (que alterou a LMP) permitiu que o delegado de polícia — e na ausência dele, o policial — aplique de imediato a medida protetiva de afastamento do lar em situação de risco atual ou iminente. Antes dessa alteração, era necessário aguardar a decisão judicial. Análise dos erros: A — o juiz (não só o MP) concede; B — o prazo legal é 48h (não 72h); D — não se exige inquérito instaurado; E — o afastamento do lar não implica automaticamente suspensão do poder familiar.",
  },

  {
    id: "df-005",
    disciplinaId: "df-leg",
    topico: "Primeiros Socorros — condutas",
    dificuldade: "FACIL",
    enunciado: `Um servidor presencia uma colega entrar em convulsão no ambiente de trabalho. De acordo com as noções básicas de primeiros socorros, qual é a conduta CORRETA a ser adotada?`,
    opcoes: {
      a: "Segurar firmemente a pessoa para evitar que se machuque durante os movimentos convulsivos.",
      b: "Introduzir um objeto rígido entre os dentes da vítima para evitar que morda a língua.",
      c: "Afastar objetos que possam machucar a vítima e, após a crise, colocá-la em decúbito lateral de segurança.",
      d: "Oferecer água à vítima durante a crise para hidratá-la.",
      e: "Aplicar pressão no peito da vítima para controlar os movimentos involuntários.",
    },
    gabarito: "c",
    comentario: "As condutas corretas em caso de convulsão são: NÃO segurar a pessoa; NÃO colocar objetos na boca; afastar objetos que possam machucar; cronometrar a duração da crise; após a crise, colocar em decúbito lateral (posição de recuperação) para evitar aspiração em caso de vômito; acionar socorro. As alternativas A, B, D e E descrevem condutas incorretas que podem causar dano adicional.",
  },

  {
    id: "df-006",
    disciplinaId: "df-leg",
    topico: "Lei 7.484/2024 — carreira SUAS/DF",
    dificuldade: "MEDIO",
    enunciado: `A Lei Distrital nº 7.484/2024, que estrutura a carreira pública de Desenvolvimento e Assistência Social no Distrito Federal, institui dois cargos. Assinale a alternativa que os identifica CORRETAMENTE, incluindo o nível de escolaridade exigido para o cargo de Especialista.`,
    opcoes: {
      a: "Agente Social (nível médio) e Especialista em Desenvolvimento e Assistência Social (nível superior).",
      b: "Técnico em Desenvolvimento e Assistência Social — TDAS (nível médio) e Especialista em Desenvolvimento e Assistência Social — EDAS (nível superior).",
      c: "Assistente Social (nível médio) e Gestor em Assistência Social (nível superior).",
      d: "Técnico em Assistência Social (nível técnico) e Analista em Assistência Social (nível superior).",
      e: "Auxiliar de Desenvolvimento Social (nível fundamental) e Especialista em Assistência Social (nível superior).",
    },
    gabarito: "b",
    comentario: "A Lei 7.484/2024 criou os cargos de TDAS (Técnico em Desenvolvimento e Assistência Social — nível médio) e EDAS (Especialista em Desenvolvimento e Assistência Social — nível superior), que compõem a Carreira Pública de Desenvolvimento e Assistência Social do DF. Este concurso seleciona candidatos para ambos os cargos.",
  },

  // ============================================================
  // TEORIA GERAL DA ADMINISTRAÇÃO
  // ============================================================

  {
    id: "tga-001",
    disciplinaId: "tga",
    topico: "Escolas da Administração",
    dificuldade: "FACIL",
    enunciado: `A Experiência de Hawthorne, conduzida por Elton Mayo nas décadas de 1920 e 1930, deu origem a qual escola do pensamento administrativo e qual foi sua principal conclusão?`,
    opcoes: {
      a: "Teoria Clássica; a eficiência organizacional decorre da especialização das funções.",
      b: "Teoria da Burocracia; a legalidade e a impessoalidade são os pilares da organização eficiente.",
      c: "Teoria das Relações Humanas; as condições sociais e emocionais influenciam a produtividade mais do que as condições físicas.",
      d: "Teoria Contingencial; a eficiência depende do ambiente externo da organização.",
      e: "Administração Científica; o tempo e o movimento dos trabalhadores determinam a eficiência.",
    },
    gabarito: "c",
    comentario: "A Experiência de Hawthorne revelou que fatores sociais e emocionais — como a atenção dada aos trabalhadores, o senso de pertencimento ao grupo e as relações interpessoais — influenciam a produtividade de forma mais significativa do que as condições físicas de trabalho (iluminação, temperatura etc.). Esse resultado deu origem à Escola das Relações Humanas, cujo principal representante é Elton Mayo.",
  },

  {
    id: "tga-002",
    disciplinaId: "tga",
    topico: "Escolas — Burocracia (Weber)",
    dificuldade: "MEDIO",
    enunciado: `Sobre a Teoria da Burocracia de Max Weber, assinale a alternativa INCORRETA.`,
    opcoes: {
      a: "A burocracia weberiana é baseada na dominação legal-racional, em que a autoridade decorre de normas e regulamentos formais.",
      b: "A impessoalidade é uma característica central da burocracia, garantindo que as decisões sejam tomadas com base em regras, não em preferências pessoais.",
      c: "Weber reconhecia que a burocracia era o modelo ideal de organização, mas identificava suas disfunções como obstáculos à eficiência.",
      d: "A separação entre a propriedade pessoal do funcionário e os bens da organização é uma característica do modelo burocrático.",
      e: "Na burocracia, as regras e regulamentos escritos garantem continuidade e uniformidade, independentemente das pessoas que ocupam os cargos.",
    },
    gabarito: "c",
    comentario: "Weber descreveu a burocracia como um 'tipo ideal' (conceito metodológico) e identificou suas características. Porém, quem sistematizou as disfunções burocráticas foi Robert Merton (não Weber). Weber via a burocracia racional-legal como a forma mais eficiente de dominação, mas não tratou extensivamente das disfunções em seu modelo original. As demais alternativas descrevem corretamente as características do modelo burocrático weberiano.",
  },

  {
    id: "tga-003",
    disciplinaId: "tga",
    topico: "PODC — funções administrativas",
    dificuldade: "FACIL",
    enunciado: `A gestora de uma Secretaria de Assistência Social elaborou um plano de ação com metas de atendimento para o próximo ano, identificando os recursos necessários e as estratégias para alcançar os objetivos definidos. Essa atividade corresponde a qual função administrativa?`,
    opcoes: {
      a: "Organização, pois envolve a estruturação dos recursos disponíveis.",
      b: "Direção, pois implica liderança e tomada de decisão.",
      c: "Controle, pois estabelece padrões que serão verificados posteriormente.",
      d: "Planejamento, pois define objetivos e os meios para alcançá-los.",
      e: "Coordenação, pois articula as diferentes áreas da secretaria.",
    },
    gabarito: "d",
    comentario: "A elaboração de plano de ação com metas, recursos e estratégias é a essência do PLANEJAMENTO — função que define o que fazer e como fazer para alcançar os objetivos. As demais funções têm papel distinto: Organização estrutura os recursos; Direção influencia as pessoas; Controle verifica a conformidade com o planejado.",
  },

  {
    id: "tga-004",
    disciplinaId: "tga",
    topico: "BSC — perspectivas",
    dificuldade: "MEDIO",
    enunciado: `No modelo do Balanced Scorecard (BSC) aplicado ao setor público, analise as afirmativas e assinale a CORRETA.`,
    opcoes: {
      a: "A perspectiva financeira é a base do BSC, pois o equilíbrio fiscal é o objetivo central das organizações públicas.",
      b: "As quatro perspectivas do BSC são: financeira, operacional, de pessoas e de tecnologia.",
      c: "A perspectiva de Aprendizado e Crescimento é a base causal do BSC, e a perspectiva financeira representa o resultado final.",
      d: "No setor público, o BSC não pode ser utilizado, pois suas perspectivas foram criadas exclusivamente para organizações privadas.",
      e: "A perspectiva de Clientes avalia o desempenho financeiro da organização perante seus financiadores.",
    },
    gabarito: "c",
    comentario: "No BSC, a relação de causa e efeito ocorre de baixo para cima: Aprendizado e Crescimento (base) → Processos Internos → Clientes → Financeiro (resultado). No setor público, a perspectiva de Clientes geralmente se posiciona como objetivo principal (missão), podendo até vir antes da financeira. As 4 perspectivas corretas são: Financeira, Clientes, Processos Internos e Aprendizado e Crescimento.",
  },

  {
    id: "tga-005",
    disciplinaId: "tga",
    topico: "Estruturas organizacionais",
    dificuldade: "MEDIO",
    enunciado: `Em uma secretaria de governo, um servidor técnico é subordinado simultaneamente ao seu chefe de departamento funcional (área de tecnologia) e ao gerente do projeto de modernização do SUAS que está sendo implementado. Essa estrutura organizacional é denominada:`,
    opcoes: {
      a: "Linear, pois há hierarquia clara de autoridade.",
      b: "Funcional, pois o servidor é especialista em tecnologia.",
      c: "Linha-Staff, pois há uma assessoria técnica ao projeto.",
      d: "Matricial, pois há dupla subordinação simultânea.",
      e: "Em rede, pois há conexão entre diferentes unidades.",
    },
    gabarito: "d",
    comentario: "A estrutura MATRICIAL é aquela em que o funcionário tem dois chefes simultaneamente: um chefe funcional (área técnica de origem) e um gerente de projeto. A dupla subordinação é a característica definidora da estrutura matricial. Sua vantagem é a flexibilidade; sua desvantagem é o potencial de conflito de ordens.",
  },

  {
    id: "tga-006",
    disciplinaId: "tga",
    topico: "SWOT — análise",
    dificuldade: "FACIL",
    enunciado: `A coordenadora do CRAS realizou uma análise SWOT da unidade. Ela identificou que a equipe é altamente capacitada e engajada. Porém, notou que a legislação recentemente ampliou o rol de serviços que o CRAS pode oferecer, o que representa uma chance de atender mais famílias. Esses dois fatores, respectivamente, são classificados como:`,
    opcoes: {
      a: "Oportunidade e Força.",
      b: "Força e Oportunidade.",
      c: "Força e Ameaça.",
      d: "Oportunidade e Fraqueza.",
      e: "Fraqueza e Oportunidade.",
    },
    gabarito: "b",
    comentario: "Na análise SWOT: Equipe capacitada e engajada = FORÇA (fator INTERNO positivo, controlável pela organização). Ampliação legal dos serviços = OPORTUNIDADE (fator EXTERNO positivo, não controlável pela organização, mas aproveitável). A chave da SWOT é distinguir INTERNO (força/fraqueza) de EXTERNO (oportunidade/ameaça).",
  },

  // ============================================================
  // GESTÃO DE PESSOAS
  // ============================================================

  {
    id: "gp-001",
    disciplinaId: "gp",
    topico: "Motivação — Herzberg",
    dificuldade: "MEDIO",
    enunciado: `Paulo é servidor do CREAS há 5 anos e recebeu um aumento salarial. Apesar disso, ainda se sente desmotivado e relata não encontrar sentido no trabalho. Com base na Teoria dos Dois Fatores de Herzberg, qual é a explicação mais adequada para essa situação?`,
    opcoes: {
      a: "O aumento salarial deveria ter gerado motivação intrínseca, mas Paulo não tem as necessidades de estima satisfeitas.",
      b: "O salário é um fator higiênico: sua presença evita insatisfação, mas não gera satisfação ou motivação. Paulo carece de fatores motivacionais, como reconhecimento e realização.",
      c: "Segundo Herzberg, necessidades de ordem superior (como autoestima) devem ser satisfeitas antes das de ordem inferior (como salário).",
      d: "Paulo está insatisfeito porque seus fatores de afiliação não foram atendidos, o que impede a motivação.",
      e: "A situação confirma a Teoria X de McGregor: Paulo não gosta de trabalhar e precisa de mais controle.",
    },
    gabarito: "b",
    comentario: "Herzberg distingue: Fatores Higiênicos (salário, condições, segurança) — quando presentes, apenas evitam insatisfação, mas NÃO geram motivação. Fatores Motivacionais (realização, reconhecimento, crescimento, o trabalho em si) — quando presentes, geram satisfação e motivação genuína. Paulo recebeu aumento (higiênico) mas não tem motivadores (reconhecimento, sentido no trabalho). A alternativa C descreve Maslow (hierarquia), não Herzberg.",
  },

  {
    id: "gp-002",
    disciplinaId: "gp",
    topico: "Liderança situacional",
    dificuldade: "MEDIO",
    enunciado: `Uma nova servidora acaba de ser contratada para o CRAS. Ela tem alto entusiasmo pelo trabalho, mas ainda possui baixa competência técnica nas atribuições do cargo. De acordo com a Liderança Situacional de Hersey e Blanchard, qual estilo de liderança é mais adequado para o seu gestor adotar?`,
    opcoes: {
      a: "E4 — Delegação: deixar a servidora desenvolver suas próprias soluções com autonomia total.",
      b: "E3 — Apoio: compartilhar decisões com a servidora, priorizando o relacionamento.",
      c: "E2 — Persuasão/Orientação: explicar as decisões, esclarecer dúvidas e encorajar a servidora.",
      d: "E1 — Direção/Determinação: fornecer instruções detalhadas e acompanhar de perto as tarefas.",
      e: "Transformacional: inspirar a servidora com uma visão de futuro para que se desenvolva sozinha.",
    },
    gabarito: "d",
    comentario: "Na Liderança Situacional, o M1 (baixa competência + alto comprometimento) exige o E1 — Direção: o líder determina o que fazer, como fazer e acompanha de perto. Como a servidora tem entusiasmo (comprometimento alto) mas pouca competência, o gestor deve focar na tarefa, fornecendo instruções claras e supervisão próxima. E4 é para M4 (alta comp + alto compr); E3 é para M3; E2 é para M2.",
  },

  {
    id: "gp-003",
    disciplinaId: "gp",
    topico: "Gestão por competências — CHA",
    dificuldade: "FACIL",
    enunciado: `O conceito de competência, no modelo de gestão por competências, é representado pela sigla CHA. Assinale a alternativa que descreve CORRETAMENTE cada componente dessa sigla.`,
    opcoes: {
      a: "Capacidade, Habilidade e Autonomia.",
      b: "Conhecimento, Habilidade e Atitude.",
      c: "Competência, Habilitação e Ação.",
      d: "Conhecimento, Hierarquia e Avaliação.",
      e: "Capacitação, Habilidade e Aplicação.",
    },
    gabarito: "b",
    comentario: "CHA = Conhecimento (saber — o conjunto de informações que a pessoa possui), Habilidade (saber fazer — a capacidade prática de aplicar o conhecimento) e Atitude (querer fazer — a disposição, o comportamento para agir). A competência só se manifesta quando os três componentes estão presentes: saber + saber fazer + querer fazer.",
  },

  {
    id: "gp-004",
    disciplinaId: "gp",
    topico: "Motivação — Maslow vs. Herzberg",
    dificuldade: "DIFICIL",
    enunciado: `Analise as afirmativas sobre as teorias de motivação e assinale a alternativa CORRETA.`,
    opcoes: {
      a: "Maslow e Herzberg chegam às mesmas conclusões: salário e realização pessoal são igualmente motivadores.",
      b: "Os fatores higiênicos de Herzberg correspondem aproximadamente às necessidades de ordem superior da pirâmide de Maslow.",
      c: "Segundo Maslow, uma necessidade completamente satisfeita continua motivando o comportamento indefinidamente.",
      d: "Os fatores motivacionais de Herzberg (realização, reconhecimento) correspondem às necessidades de nível superior de Maslow (estima e autorrealização).",
      e: "A Teoria de Vroom e a de Maslow chegam à mesma conclusão: o dinheiro não é motivador em nenhuma circunstância.",
    },
    gabarito: "d",
    comentario: "A correlação correta entre Maslow e Herzberg: Fatores HIGIÊNICOS (salário, segurança, condições) correspondem às necessidades de ORDEM INFERIOR de Maslow (fisiológicas e segurança). Fatores MOTIVACIONAIS (realização, reconhecimento, crescimento) correspondem às necessidades de ORDEM SUPERIOR (estima e autorrealização). A satisfação de uma necessidade em Maslow FAZ com que ela deixe de motivar (não continua motivando indefinidamente — C está errada).",
  },

  {
    id: "gp-005",
    disciplinaId: "gp",
    topico: "Avaliação de desempenho — 360°",
    dificuldade: "MEDIO",
    enunciado: `O método de avaliação de desempenho 360° distingue-se dos métodos tradicionais principalmente por:`,
    opcoes: {
      a: "Utilizar apenas a autoavaliação do servidor, eliminando o viés da chefia.",
      b: "Basear-se exclusivamente em metas quantitativas, objetivando a avaliação.",
      c: "Coletar feedback de múltiplas fontes: chefia, pares, subordinados e o próprio avaliado.",
      d: "Ser aplicado apenas em cargos de gestão, não se estendendo a servidores operacionais.",
      e: "Eliminar a necessidade de critérios predefinidos, tornando a avaliação mais subjetiva e humana.",
    },
    gabarito: "c",
    comentario: "O método 360° (ou avaliação em múltiplas fontes) coleta feedback de todos os níveis: chefia direta (de cima para baixo), pares/colegas (horizontal), subordinados (de baixo para cima) e autoavaliação. Essa abrangência é sua principal característica. Sua vantagem é a visão mais completa do desempenho; sua desvantagem é a maior complexidade operacional e o risco de conflitos interpessoais.",
  },

  // ============================================================
  // AFO
  // ============================================================

  {
    id: "afo-001",
    disciplinaId: "afo",
    topico: "PPA, LDO e LOA — distinções",
    dificuldade: "FACIL",
    enunciado: `Assinale a alternativa que descreve CORRETAMENTE a função da Lei de Diretrizes Orçamentárias (LDO) no processo orçamentário brasileiro.`,
    opcoes: {
      a: "A LDO autoriza a realização de despesas e a arrecadação de receitas para o exercício financeiro.",
      b: "A LDO estabelece os objetivos, diretrizes e metas da Administração para o período de quatro anos.",
      c: "A LDO define as metas e prioridades da Administração, orienta a elaboração da LOA e estabelece as metas fiscais para o exercício.",
      d: "A LDO detalha as ações e programas de governo, especificando os recursos alocados para cada unidade orçamentária.",
      e: "A LDO é o instrumento que autoriza créditos adicionais ao orçamento já aprovado.",
    },
    gabarito: "c",
    comentario: "A LDO tem três funções principais: (1) estabelecer metas e prioridades para o exercício seguinte; (2) orientar a elaboração da LOA, tornando-a compatível com o PPA; (3) estabelecer as metas fiscais e de resultado nominal e primário. A LDO NÃO autoriza despesas (esse é papel da LOA). O PPA (4 anos) descreve objetivos de longo prazo. A LOA é o orçamento anual que autoriza a execução.",
  },

  {
    id: "afo-002",
    disciplinaId: "afo",
    topico: "Estágios da despesa",
    dificuldade: "MEDIO",
    enunciado: `A Secretaria de Desenvolvimento Social firmou contrato para aquisição de equipamentos para os CRAS do DF. O fornecedor entregou os equipamentos e a equipe técnica conferiu se os itens estavam de acordo com as especificações contratuais. Com base nos estágios da despesa pública, qual estágio está sendo realizado nesse momento?`,
    opcoes: {
      a: "Empenho, pois a obrigação de pagamento foi criada com a assinatura do contrato.",
      b: "Liquidação, pois está sendo verificado o direito adquirido pelo credor com base na entrega dos bens.",
      c: "Pagamento, pois o fornecedor entregou o que foi contratado.",
      d: "Fixação, pois o orçamento prevê a despesa.",
      e: "Suprimento de fundos, pois se trata de despesa realizada previamente.",
    },
    gabarito: "b",
    comentario: "A LIQUIDAÇÃO (art. 63 da Lei 4.320/1964) é o estágio em que se verifica o direito adquirido pelo credor, tendo por base os títulos e documentos comprobatórios do respectivo crédito — no caso, a conferência de que os equipamentos foram entregues conforme especificado. O EMPENHO ocorreu na assinatura do contrato. O PAGAMENTO ocorrerá depois, com a entrega do numerário.",
  },

  {
    id: "afo-003",
    disciplinaId: "afo",
    topico: "Restos a pagar",
    dificuldade: "MEDIO",
    enunciado: `Ao final do exercício financeiro, a Secretaria de Assistência Social registrou duas situações: (I) despesa empenhada para capacitação de servidores, mas o serviço ainda não foi prestado; (II) despesa empenhada e liquidada referente a material de consumo entregue, mas cujo pagamento não foi efetuado. Essas situações configuram, respectivamente:`,
    opcoes: {
      a: "Restos a Pagar Processados (I) e Restos a Pagar Não Processados (II).",
      b: "Restos a Pagar Não Processados (I) e Restos a Pagar Processados (II).",
      c: "Despesas de Exercícios Anteriores (I) e Suprimento de Fundos (II).",
      d: "Empenho Estimativo (I) e Empenho Ordinário (II).",
      e: "Crédito Suplementar (I) e Restos a Pagar Processados (II).",
    },
    gabarito: "b",
    comentario: "Restos a Pagar NÃO PROCESSADOS = despesa empenhada, mas NÃO liquidada (o serviço ainda não foi prestado — situação I). Restos a Pagar PROCESSADOS = despesa empenhada E liquidada, mas não paga (o bem foi entregue e verificado, mas o pagamento não saiu — situação II). Macete: 'Processado' = o processo chegou até a liquidação.",
  },

  {
    id: "afo-004",
    disciplinaId: "afo",
    topico: "LRF — limites de pessoal",
    dificuldade: "MEDIO",
    enunciado: `De acordo com a Lei de Responsabilidade Fiscal (LC 101/2000), qual é o limite de gastos com pessoal estabelecido para o Distrito Federal?`,
    opcoes: {
      a: "50% da Receita Corrente Líquida (RCL), pois o DF é equiparado à União.",
      b: "55% da Receita Corrente Líquida (RCL), por ser um ente federado especial.",
      c: "60% da Receita Corrente Líquida (RCL), pois o DF é equiparado a Estado e Município.",
      d: "65% da Receita Corrente Líquida (RCL), considerando as atribuições únicas do DF.",
      e: "Não há limite fixo; o DF define seu próprio teto por lei distrital.",
    },
    gabarito: "c",
    comentario: "A LRF estabelece: União = 50% da RCL; Estados, Municípios e DF = 60% da RCL. O DF, por acumular as competências de Estado e Município, é equiparado a ambos e tem o limite de 60%. Esta é uma pegadinha clássica do Quadrix, que testa se o candidato sabe que o DF não tem limite diferenciado — é 60%, como estados e municípios.",
  },

  // ============================================================
  // OS&M E QUALIDADE
  // ============================================================

  {
    id: "osm-001",
    disciplinaId: "osm",
    topico: "PDCA — ciclo de melhoria",
    dificuldade: "FACIL",
    enunciado: `A coordenadora de uma unidade do SUAS identificou que o tempo médio de espera para atendimento no CRAS está acima da meta estabelecida. Ela reuniu a equipe, analisou as causas do problema (excesso de demanda em horários específicos) e elaborou um novo fluxo de atendimento para distribuir melhor os horários. Qual fase do ciclo PDCA está sendo realizada?`,
    opcoes: {
      a: "D (Do/Executar), pois a solução está sendo implementada.",
      b: "C (Check/Verificar), pois os resultados estão sendo mensurados.",
      c: "A (Act/Agir), pois uma ação corretiva está sendo planejada.",
      d: "P (Plan/Planejar), pois o problema foi identificado, analisado e um plano de ação foi elaborado.",
      e: "S (Standardize), pois o fluxo está sendo padronizado.",
    },
    gabarito: "d",
    comentario: "A fase P (Plan/Planejar) do PDCA envolve: identificar o problema, analisar as causas e elaborar o plano de ação. A coordenadora identificou o problema (tempo de espera alto), analisou a causa (distribuição inadequada da demanda) e elaborou o plano (novo fluxo de atendimento). A fase D seria quando o novo fluxo fosse implementado.",
  },

  {
    id: "osm-002",
    disciplinaId: "osm",
    topico: "5S — sensos",
    dificuldade: "FACIL",
    enunciado: `Durante a implementação do programa 5S em uma unidade de acolhimento, a equipe realizou uma força-tarefa para eliminar arquivos desnecessários, equipamentos quebrados e materiais sem utilidade no setor. Esse momento da implantação do 5S corresponde ao senso de:`,
    opcoes: {
      a: "Seiketsu (Padronização), pois estão criando padrões de organização.",
      b: "Shitsuke (Disciplina), pois a equipe está seguindo regras estabelecidas.",
      c: "Seisou (Limpeza), pois estão retirando sujeira e objetos indesejados.",
      d: "Seiri (Utilização), pois estão separando o necessário do desnecessário.",
      e: "Seiton (Organização), pois estão ordenando os materiais.",
    },
    gabarito: "d",
    comentario: "SEIRI (Utilização/Senso de uso) = identificar e eliminar tudo que é desnecessário no ambiente de trabalho. A equipe está fazendo exatamente isso: separando o que é útil (manter) do que não é (eliminar). Seiton = organizar o que ficou; Seisou = limpar; Seiketsu = padronizar; Shitsuke = manter por disciplina.",
  },

  {
    id: "osm-003",
    disciplinaId: "osm",
    topico: "Fluxogramas — simbologia",
    dificuldade: "FACIL",
    enunciado: `Em um fluxograma de processo, o símbolo em formato de LOSANGO (diamante) representa:`,
    opcoes: {
      a: "Uma atividade ou tarefa a ser executada.",
      b: "O início ou fim do processo.",
      c: "Um ponto de decisão, onde o fluxo pode tomar dois ou mais caminhos.",
      d: "Um documento gerado pelo processo.",
      e: "Um conector entre diferentes partes do fluxograma.",
    },
    gabarito: "c",
    comentario: "Na simbologia padrão de fluxogramas: LOSANGO/DIAMANTE = ponto de decisão (pergunta sim/não). RETÂNGULO = atividade/processo. OVAL = início ou fim. PARALELOGRAMO = dados/informação (entrada ou saída). CÍRCULO = conector entre partes do fluxograma. O Quadrix frequentemente apresenta uma figura de fluxograma e pede para identificar o que representa cada símbolo.",
  },

  {
    id: "osm-004",
    disciplinaId: "osm",
    topico: "BSC — perspectivas",
    dificuldade: "MEDIO",
    enunciado: `No Balanced Scorecard (BSC) de uma Secretaria de Assistência Social, o objetivo 'aumentar a satisfação dos usuários com os serviços do CRAS' está inserido em qual perspectiva?`,
    opcoes: {
      a: "Perspectiva Financeira, pois a satisfação gera eficiência no uso de recursos.",
      b: "Perspectiva de Aprendizado e Crescimento, pois indica evolução da organização.",
      c: "Perspectiva de Processos Internos, pois depende da qualidade dos processos de atendimento.",
      d: "Perspectiva de Clientes (usuários), pois mede como a organização aparece para quem utiliza seus serviços.",
      e: "Perspectiva Financeira, pois impacta diretamente no orçamento da secretaria.",
    },
    gabarito: "d",
    comentario: "A perspectiva de CLIENTES (ou usuários, no setor público) abrange objetivos relacionados à visão dos usuários sobre a organização: satisfação, qualidade do atendimento, tempo de espera, acesso. 'Aumentar a satisfação dos usuários' é um objetivo típico da perspectiva de Clientes. A perspectiva de Processos Internos mediria os processos que permitem atingir essa satisfação.",
  },

  // ============================================================
  // SUAS / LOAS / LEGISLAÇÃO SOCIOASSISTENCIAL
  // ============================================================

  {
    id: "suas-001",
    disciplinaId: "suas-fund",
    topico: "Proteção Social Básica vs. Especial",
    dificuldade: "FACIL",
    enunciado: `Uma família é identificada pela equipe do CRAS como estando em situação de vulnerabilidade social, sem renda formal, com filhos em idade escolar em situação de risco de evasão, mas sem violação de direitos identificada. O acompanhamento adequado para essa família deve ser realizado por qual serviço?`,
    opcoes: {
      a: "PAEFI, pois a família apresenta situação de risco.",
      b: "Serviço de Acolhimento Institucional, pois os filhos precisam de proteção.",
      c: "PAIF, pois é o serviço de proteção social básica voltado ao acompanhamento de famílias em vulnerabilidade.",
      d: "Abordagem Social, pois a família precisa ser localizada no território.",
      e: "SINASE, pois envolve adolescentes em situação de risco.",
    },
    gabarito: "c",
    comentario: "O PAIF (Serviço de Proteção e Atendimento Integral à Família) é o serviço obrigatório do CRAS, voltado ao acompanhamento de famílias em situação de vulnerabilidade social, com objetivo preventivo — antes que direitos sejam violados. Como não há violação de direitos identificada, o serviço adequado é o PAIF (básica), não o PAEFI (especial — para famílias com direitos já violados).",
  },

  {
    id: "suas-002",
    disciplinaId: "suas-fund",
    topico: "NOB-SUAS — responsabilidades dos entes",
    dificuldade: "MEDIO",
    enunciado: `De acordo com a NOB-SUAS 2012, qual é a responsabilidade dos municípios e do Distrito Federal na gestão do SUAS?`,
    opcoes: {
      a: "Normatizar a Política Nacional de Assistência Social e coordenar o SUAS em âmbito nacional.",
      b: "Prestar apoio técnico aos municípios de menor porte e cofinanciar os serviços estaduais.",
      c: "Executar os serviços e programas de proteção social, gerir a rede local, e inserir dados nos sistemas de informação.",
      d: "Financiar exclusivamente os serviços de alta complexidade, repassando recursos diretamente para as OSC.",
      e: "Estabelecer os pisos de proteção social básica e especial e repassá-los aos estados.",
    },
    gabarito: "c",
    comentario: "Os municípios e o DF são os executores na ponta do SUAS: operam os CRAS, CREAS e demais equipamentos; acompanham as famílias; gerem a rede local de serviços; alimentam os sistemas de informação (REDE SUAS). A responsabilidade de normatizar e coordenar o SUAS nacional é da União; a de apoiar tecnicamente os municípios é dos Estados.",
  },

  {
    id: "suas-003",
    disciplinaId: "suas-fund",
    topico: "Tipificação — CRAS vs. CREAS",
    dificuldade: "MEDIO",
    enunciado: `Analise os serviços abaixo e assinale a alternativa que os associa CORRETAMENTE ao equipamento responsável por sua oferta.`,
    opcoes: {
      a: "PAIF (CREAS) e PAEFI (CRAS).",
      b: "Serviço de Convivência e Fortalecimento de Vínculos — SCFV (CREAS) e Abordagem Social (CRAS).",
      c: "PAIF (CRAS) e PAEFI (CREAS).",
      d: "PAEFI (CRAS) e Acolhimento Institucional (CREAS).",
      e: "PAIF (CRAS) e Acolhimento Institucional (CRAS).",
    },
    gabarito: "c",
    comentario: "PAIF = CRAS (proteção social básica — acompanhamento de famílias em vulnerabilidade). PAEFI = CREAS (proteção social especial de média complexidade — famílias com direitos violados). O SCFV também é ofertado no CRAS (grupos de convivência por faixa etária). O Acolhimento Institucional é de alta complexidade e não é ofertado nos CRAS nem nos CREAS, mas em unidades específicas.",
  },

  {
    id: "suas-004",
    disciplinaId: "suas-fund",
    topico: "MROSC — tipos de parceria",
    dificuldade: "MEDIO",
    enunciado: `A SEDES identificou necessidade de ampliar os serviços de acolhimento para mulheres vítimas de violência no DF e selecionou uma OSC para executar o programa, nos moldes definidos pela própria Secretaria. De acordo com a Lei 13.019/2014 (MROSC), o instrumento jurídico adequado para essa parceria é:`,
    opcoes: {
      a: "Termo de Fomento, pois a OSC propõe a iniciativa e a Administração a financia.",
      b: "Acordo de Cooperação, pois não há repasse financeiro envolvido.",
      c: "Contrato Administrativo, pois a OSC está prestando serviço remunerado.",
      d: "Termo de Colaboração, pois a proposta é da Administração e a OSC executa o plano de trabalho.",
      e: "Convênio, pois é o instrumento tradicional de repasse para OSC.",
    },
    gabarito: "d",
    comentario: "No MROSC: TERMO DE COLABORAÇÃO = a Administração propõe o programa e a OSC o executa. TERMO DE FOMENTO = a OSC propõe a iniciativa e a Administração a apoia financeiramente. Como a SEDES definiu o programa e está selecionando OSC para executá-lo, o instrumento adequado é o Termo de Colaboração. O convênio foi substituído por esses novos instrumentos para parcerias com OSC.",
  },

  {
    id: "suas-005",
    disciplinaId: "suas-fund",
    topico: "CIT e CIB — instâncias de pactuação",
    dificuldade: "MEDIO",
    enunciado: `A pactuação entre os gestores federal, estaduais e municipais de assistência social sobre os critérios de partilha dos recursos do cofinanciamento federal para os serviços do SUAS compete a qual instância?`,
    opcoes: {
      a: "CNAS, pois é o Conselho nacional responsável por deliberar sobre a política.",
      b: "CIB, pois reúne representantes do estado e dos municípios para pactuações.",
      c: "CIT, pois é a instância tripartite que reúne Union, estados e municípios.",
      d: "Conferência Nacional de Assistência Social, pois é o fórum máximo de deliberação.",
      e: "MDS (atual MDS), pois é o órgão federal responsável pelo financiamento.",
    },
    gabarito: "c",
    comentario: "A CIT (Comissão Intergestores Tripartite) é a instância de âmbito federal que reúne os três níveis de governo (União — por meio do MDS, Estados — por meio do FONSEAS, e Municípios — por meio do CONGEMAS) para pactuações sobre gestão, financiamento e operacionalização do SUAS em âmbito nacional. A CIB é bipartite (estado + municípios) e atua no âmbito estadual.",
  },

  {
    id: "suas-006",
    disciplinaId: "suas-fund",
    topico: "LOAS — seguranças socioassistenciais",
    dificuldade: "MEDIO",
    enunciado: `A PNAS/2004 define as seguranças socioassistenciais como dimensões fundamentais da proteção social. A segurança voltada ao fortalecimento dos laços familiares e comunitários, por meio de ações de socialização e participação, denomina-se:`,
    opcoes: {
      a: "Segurança de acolhida.",
      b: "Segurança de renda e sustento autônomo.",
      c: "Segurança de convívio e vivência familiar e comunitária.",
      d: "Segurança de apoio e auxílio.",
      e: "Segurança de desenvolvimento da autonomia individual.",
    },
    gabarito: "c",
    comentario: "As seguranças socioassistenciais da PNAS são: (1) Acolhida: atendimento humanizado, escuta, encaminhamento; (2) Convívio e vivência familiar e comunitária: fortalecimento de vínculos, socialização, participação comunitária; (3) Renda e sustento autônomo: acesso a benefícios e oportunidades de inserção produtiva; (4) Apoio e auxílio: benefícios eventuais; (5) Desenvolvimento da autonomia individual, familiar e social.",
  },

  // ============================================================
  // PROGRAMAS DO DF
  // ============================================================

  {
    id: "df-prog-001",
    disciplinaId: "programas-df",
    topico: "Benefícios Eventuais",
    dificuldade: "MEDIO",
    enunciado: `O benefício eventual, conforme a Lei Distrital nº 5.165/2013 e o Decreto nº 35.191/2014, distingue-se do Benefício de Prestação Continuada (BPC) principalmente porque:`,
    opcoes: {
      a: "O benefício eventual é concedido apenas a idosos e pessoas com deficiência.",
      b: "O benefício eventual é de caráter contínuo e mensal, enquanto o BPC é episódico.",
      c: "O BPC é federal e contributivo, enquanto o benefício eventual é estadual.",
      d: "O benefício eventual é de caráter suplementar e temporário, destinado a situações específicas como nascimento, morte, vulnerabilidade temporária e calamidade.",
      e: "O BPC é gerido pelos municípios, enquanto o benefício eventual é gerido pela União.",
    },
    gabarito: "d",
    comentario: "Benefícios Eventuais são aqueles de caráter EPISÓDICO (não contínuos), destinados a cobrir situações específicas e temporárias: natalidade (nascimento de criança), funeral (morte na família), vulnerabilidade temporária (perda de renda, acidente) e calamidade. O BPC, ao contrário, é mensal e contínuo, garantindo 1 salário mínimo a idosos ≥65 anos ou PcD em pobreza.",
  },

  {
    id: "df-prog-002",
    disciplinaId: "programas-df",
    topico: "Cartão Prato Cheio",
    dificuldade: "FACIL",
    enunciado: `O Programa Cartão Prato Cheio, instituído pela Lei Distrital nº 7.009/2021, tem como objetivo principal:`,
    opcoes: {
      a: "Subsidiar a aquisição de gás de cozinha (GLP) para famílias de baixa renda.",
      b: "Promover a inclusão produtiva de famílias em situação de extrema pobreza.",
      c: "Oferecer refeições subsidiadas em restaurantes comunitários do DF.",
      d: "Prover alimentação em caráter emergencial a famílias em situação de extrema pobreza, mediante concessão de benefício pecuniário.",
      e: "Garantir acesso a alimentos orgânicos produzidos na região do DF para famílias inscritas no CadÚnico.",
    },
    gabarito: "d",
    comentario: "O Cartão Prato Cheio é um programa de PROVIMENTO ALIMENTAR DIRETO EM CARÁTER EMERGENCIAL, que concede um benefício financeiro (pecúnio) para que famílias em situação de extrema pobreza, inscritas no CadÚnico, possam adquirir alimentos. O subsídio ao GLP é o Cartão Gás (Lei 6.938/2021). Restaurantes Comunitários são outro programa distinto.",
  },

  // ============================================================
  // GESTÃO DE PROJETOS
  // ============================================================

  {
    id: "proj-001",
    disciplinaId: "proj",
    topico: "PMBOK — grupos de processos",
    dificuldade: "MEDIO",
    enunciado: `Um gerente de projetos está desenvolvendo o termo de abertura do projeto e identificando as partes interessadas. De acordo com o PMBOK, essas atividades correspondem a qual grupo de processos?`,
    opcoes: {
      a: "Planejamento, pois envolvem a definição de estratégias para o projeto.",
      b: "Execução, pois colocam o projeto em andamento.",
      c: "Iniciação, pois são realizadas no início do projeto para formalmente autorizar e definir seu escopo.",
      d: "Monitoramento e Controle, pois acompanham o andamento do projeto.",
      e: "Encerramento, pois formalizam a conclusão do projeto.",
    },
    gabarito: "c",
    comentario: "O grupo de processos de INICIAÇÃO inclui: (1) desenvolver o Termo de Abertura do Projeto (TAP) — que formalmente autoriza o projeto; (2) identificar as Partes Interessadas (stakeholders). Esses são os primeiros processos realizados, antes mesmo do planejamento detalhado. Os 5 grupos do PMBOK são: Iniciação, Planejamento, Execução, Monitoramento/Controle e Encerramento.",
  },

  {
    id: "proj-002",
    disciplinaId: "proj",
    topico: "Projetos — conceito e características",
    dificuldade: "FACIL",
    enunciado: `Um servidor questiona se o PAIF — serviço permanente do CRAS que atende famílias continuamente — pode ser classificado como projeto. Assinale a alternativa que explica CORRETAMENTE por que o PAIF NÃO é um projeto.`,
    opcoes: {
      a: "O PAIF não é um projeto porque não tem objetivos definidos.",
      b: "O PAIF não é um projeto porque envolve múltiplas equipes.",
      c: "O PAIF não é um projeto porque é uma operação contínua e permanente, sem data de término definida, enquanto um projeto é temporário e possui resultado único.",
      d: "O PAIF não é um projeto porque é financiado por recursos públicos.",
      e: "O PAIF não é um projeto porque não gera produto ou serviço.",
    },
    gabarito: "c",
    comentario: "Um projeto se caracteriza por ser TEMPORÁRIO (tem início e fim definidos) e produzir resultado ÚNICO. O PAIF é uma OPERAÇÃO contínua, sem data de término — faz parte da rotina permanente dos CRAS. A distinção projeto × processo/operação é fundamental: processos/operações são repetitivos e contínuos; projetos são únicos e temporários.",
  },

  // ============================================================
  // ÉTICA
  // ============================================================

  {
    id: "gp-etica-001",
    disciplinaId: "gp",
    topico: "Ética no serviço público",
    dificuldade: "MEDIO",
    enunciado: `Um servidor público, ao receber uma demanda de um familiar seu para ser atendido preferencialmente em serviço público, sem seguir a fila regular, decide por atendê-lo de imediato. Essa conduta viola qual princípio da Administração Pública previsto na Constituição Federal e qual dispositivo do Código de Ética dos Servidores Públicos (Decreto 1.171/1994)?`,
    opcoes: {
      a: "Viola a legalidade, pois a conduta não está prevista em lei.",
      b: "Viola a impessoalidade e a moralidade, pois a conduta beneficia alguém por razões pessoais, em detrimento dos demais usuários.",
      c: "Viola apenas a eficiência, pois atrapalha o fluxo normal de atendimento.",
      d: "Não viola nenhum princípio, pois foi uma decisão pessoal do servidor.",
      e: "Viola a publicidade, pois o ato não foi registrado formalmente.",
    },
    gabarito: "b",
    comentario: "O servidor violou os princípios de IMPESSOALIDADE (a Administração deve tratar todos os cidadãos igualmente, sem favoritismos) e MORALIDADE (a conduta deve estar em conformidade com os padrões éticos do serviço público). O Decreto 1.171/1994 veda ao servidor usar o cargo para obter vantagens para si ou para terceiros (o atendimento preferencial configura uso indevido da posição funcional).",
  },

];

export default QUESTOES;

// ============================================================
// SEDES DF 2026 — TEORIA POR TÓPICO (Quadrix-Focused)
// Cargo 400 | Banca: Quadrix | Prova: 06/09/2026
// ============================================================

export type QuadrixPeso = "MUITO_ALTO" | "ALTO" | "MEDIO" | "BAIXO";

export interface TeoriaTema {
  id: string;
  disciplinaId: string;
  topico: string;
  quadrixPeso: QuadrixPeso;
  resumo: string;
  pontosChave: string[];
  esquema: string[];
  pegadinhas: string[];
  dicaQuadrix: string;
  referencias: string[];
}

export const TEORIA: TeoriaTema[] = [

  // ============================================================
  // LÍNGUA PORTUGUESA
  // ============================================================

  {
    id: "lp-interpretacao",
    disciplinaId: "lp",
    topico: "Compreensão e interpretação de textos",
    quadrixPeso: "MUITO_ALTO",
    resumo: `A interpretação de textos é a maior fatia das provas Quadrix de LP. O candidato precisa dominar dois níveis de leitura: o nível explícito (o que o texto diz) e o nível inferencial (o que o texto implica ou pressupõe). Inferência é o processo de deduzir informações que não estão literalmente no texto, mas que podem ser extraídas do raciocínio. Pressuposto é algo que o enunciado toma como verdadeiro sem afirmar diretamente. Implicatura é o que se comunica além do que se diz literalmente.

A linguagem figurada exige atenção especial: metáfora (substituição por semelhança), metonímia (substituição por contiguidade — parte pelo todo, causa pelo efeito), hipérbole (exagero expressivo), eufemismo (suavização), ironia (sentido contrário ao literal). O Quadrix adora perguntar o "sentido de X no contexto" — e a resposta correta sempre depende do contexto imediato.

Para questões de interpretação, jamais extrapole o texto. A resposta correta é aquela que pode ser comprovada pelo texto; a errada é aquela que adiciona informação não presente ou contradiz o que foi dito. Cuidado com opções que usam termos absolutos como "sempre", "nunca", "todos", "apenas" — geralmente são armadilhas.`,
    pontosChave: [
      "Inferência: dedução a partir do texto, não do conhecimento prévio",
      "Pressuposto: o que o texto toma como dado sem afirmar diretamente",
      "Implicatura: o que é comunicado além do literal",
      "Metáfora: substituição por semelhança; metonímia: por contiguidade",
      "Hipérbole: exagero; eufemismo: suavização; ironia: sentido oposto",
      "Nunca extrapole o texto — a resposta está sempre no texto",
      "Questão de 'sentido no contexto': o contexto imediato é soberano",
    ],
    esquema: [
      "NÍVEL 1 — Explícito: o que o texto afirma diretamente",
      "NÍVEL 2 — Implícito: inferências e pressupostos",
      "NÍVEL 3 — Crítico: posição do autor, intenção, efeito de sentido",
      "ARMADILHA CLÁSSICA: opção correta em outro texto, errada neste",
    ],
    pegadinhas: [
      "Questão pede 'o que o autor afirma' — não confunda com 'o que o autor implica'",
      "Opção que usa 'sempre' ou 'nunca' geralmente é errada",
      "Cuidado com negações duplas — leia com calma",
      "Quadrix frequentemente inclui uma opção 'verdadeira em geral mas não comprovada no texto' — essa é a pegadinha principal",
    ],
    dicaQuadrix: "Quadrix privilegia inferências razoáveis e linguagem figurada. Quase sempre há uma questão com 'qual o sentido do trecho em destaque'. Treine lendo editoriais de jornal e identificando os pressupostos.",
    referencias: ["Gramática Normativa — concordância com contexto", "Teoria dos atos de fala — Austin/Searle", "Linguística textual — Ingedore Koch"],
  },

  {
    id: "lp-coesao",
    disciplinaId: "lp",
    topico: "Mecanismos de coesão textual — conectivos e referenciação",
    quadrixPeso: "MUITO_ALTO",
    resumo: `Coesão textual é a propriedade que faz as partes do texto se conectarem e formarem uma unidade. Os principais mecanismos são: referenciação (uso de pronomes e expressões para retomar ou antecipar elementos do texto) e sequenciação (uso de conectivos que estabelecem relações lógicas entre os segmentos).

Na referenciação, os pronomes pessoais, demonstrativos e relativos retomam termos já mencionados (anáfora) ou antecipam termos que virão (catáfora). O Quadrix adora pedir: "o pronome destacado retoma qual termo?". A resposta exige atenção ao gênero e número do pronome em relação ao substantivo que ele representa.

Os conectivos são classificados por sua função semântica: ADIÇÃO (e, também, além disso, outrossim), ADVERSIDADE/OPOSIÇÃO (mas, porém, contudo, todavia, no entanto, entretanto), CONCESSÃO (embora, apesar de, mesmo que, ainda que — admite uma ressalva), CAUSA (porque, pois, já que, uma vez que, visto que), CONSEQUÊNCIA (logo, portanto, assim, por isso, de modo que), FINALIDADE (para, a fim de, com o intuito de), CONDIÇÃO (se, caso, desde que, contanto que), COMPARAÇÃO (como, assim como, da mesma forma), EXPLICAÇÃO (pois — quando posposto ao verbo, que).

Diferença crucial: POIS como conjunção causal vem ANTES da causa ("Não compareceu, pois estava doente"); POIS como explicativa vem DEPOIS da afirmação ("Não compareças, pois há risco"). PORTANTO é conclusivo; ENTRETANTO é adversativo — o Quadrix sempre os testa em contexto de substituição.`,
    pontosChave: [
      "Anáfora: o pronome retoma algo já dito (mais comum)",
      "Catáfora: o pronome antecipa algo que virá",
      "ADIÇÃO: e, também, além disso, outrossim, ademais",
      "ADVERSIDADE: mas, porém, contudo, todavia, no entanto, entretanto",
      "CONCESSÃO: embora, apesar de, mesmo que, ainda que (não elimina a ideia principal)",
      "CAUSA: porque, pois (antes), já que, uma vez que, visto que",
      "CONSEQUÊNCIA: logo, portanto, assim, de modo que, por conseguinte",
      "CONDIÇÃO: se, caso, desde que, contanto que",
    ],
    esquema: [
      "CONCESSÃO (embora) ≠ ADVERSIDADE (mas) — ambas opõem, mas concessão admite mais",
      "POIS posição: antes do sujeito = causal; após vírgula = explicativo",
      "PORTANTO = conclusão de argumento anterior",
      "ENTRETANTO / CONTUDO / TODAVIA = adversativo forte (equivalem a 'mas')",
      "UMA VEZ QUE = causal (= 'já que', 'visto que') — não é temporal!",
    ],
    pegadinhas: [
      "'Uma vez que' NÃO é temporal — é causal/condicional. Quadrix testa isso direto.",
      "'Pois' posposto ao verbo ('Não vás, pois é tarde') = explicativo, não causal",
      "'Embora' estabelece concessão — a oração principal prevalece sobre a concessiva",
      "Substituir 'mas' por 'porém' ou 'contudo' — todos adversativos, são substituíveis entre si",
      "'Todavia' e 'entretanto' são adversativos, não têm conotação temporal",
    ],
    dicaQuadrix: "Quadrix apresenta um trecho e pede 'qual conectivo poderia substituir X sem alterar o sentido'. Domine a família de cada conectivo. Erros clássicos: confundir 'uma vez que' (causal) com ideia temporal, e 'embora' (concessão) com 'mas' (adversidade simples).",
    referencias: ["ABNT: normas de coesão textual", "Ingedore Koch — Coesão e coerência textuais"],
  },

  {
    id: "lp-concordancia",
    disciplinaId: "lp",
    topico: "Concordância verbal e nominal — casos especiais",
    quadrixPeso: "MUITO_ALTO",
    resumo: `A concordância verbal estabelece que o verbo concorda com o sujeito em número e pessoa. A concordância nominal estabelece que adjetivos, artigos, pronomes e numerais concordam com o substantivo em gênero e número. O Quadrix foca nos casos especiais, não nas regras gerais.

CONCORDÂNCIA VERBAL — casos Quadrix: (1) Sujeito composto posposto ao verbo — o verbo pode concordar com o mais próximo ou ir para o plural. (2) Pronomes de tratamento (Vossa Excelência, Você) — verbo na 3ª pessoa. (3) Coletivos no singular — verbo no singular. (4) "A maioria/a maior parte + de + plural" — verbo geralmente no singular (concordância com o núcleo "maioria"). (5) Verbos impessoais (haver no sentido de existir, fazer indicando tempo) — sempre no singular. "Havia muitas pessoas" (correto); "Haviam muitas pessoas" (errado). (6) Sujeito oracional — verbo na 3ª pessoa do singular.

CONCORDÂNCIA NOMINAL — casos Quadrix: (1) Adjetivo posposto a dois ou mais substantivos de gêneros diferentes — plural masculino. (2) Expressões "é proibido / é necessário / é bom / é preciso" sem artigo — invariáveis. (3) "Anexo" / "Incluso" — concordam com o substantivo a que se referem. "Seguem anexas as cópias" (correto). (4) "Mesmo" / "Próprio" — concordam com o sujeito. (5) "Obrigado/a" — concorda com o falante.`,
    pontosChave: [
      "HAVER existencial = impessoal = sempre singular: 'havia', 'haverá', 'houve'",
      "FAZER temporal = impessoal: 'faz dois anos', 'há dois meses'",
      "Pronomes de tratamento: verbo sempre na 3ª pessoa (Vossa Excelência FAZ)",
      "Coletivo no singular: 'A equipe decidiu' (não 'decidiram')",
      "'A maioria dos servidores votou' — concorda com 'maioria' (singular)",
      "ANEXO concorda com o substantivo: 'seguem ANEXAS as cópias'",
      "'É bom / é proibido / é necessário' sem artigo: invariável",
    ],
    esquema: [
      "HAVER (existir/ocorrer) → impessoal → SINGULAR",
      "FAZER (tempo) → impessoal → SINGULAR",
      "SUJEITO COMPOSTO posposto → singular com o mais próximo OU plural",
      "COLETIVO → singular (a população votou)",
      "MAIORIA/MINORIA/PARTE → singular (a maioria aprovou)",
    ],
    pegadinhas: [
      "'Haviam muitas vagas' — ERRADO. Haver existencial é impessoal.",
      "'Existiam muitas vagas' — CORRETO. Existir não é impessoal.",
      "'Fazem dois anos' — ERRADO. Fazer temporal é impessoal.",
      "A diferença entre 'há' (=faz) e 'há' (=existem): 'Há dois anos' (faz tempo) vs. 'Há vagas' (existem)",
      "'Os documentos seguem em anexo' (sem concordar) vs. 'As cópias seguem anexas' (concordando com cópias)",
    ],
    dicaQuadrix: "Quadrix ama 'haviam' vs. 'havia' em contexto de edital/relatório administrativo. Sempre vem numa oração relativa: 'os problemas que haviam/havia sido identificados'. O verbo HAVER existencial é impessoal — sempre singular.",
    referencias: ["Decreto 9.758/2019 — Formulários e correspondências do serviço público", "Normas de concordância — Cunha & Cintra"],
  },

  {
    id: "lp-regencia",
    disciplinaId: "lp",
    topico: "Regência verbal e nominal",
    quadrixPeso: "ALTO",
    resumo: `Regência é a relação de dependência entre um verbo (ou nome) e seus complementos. Um verbo transitivo direto não admite preposição antes do complemento; um verbo transitivo indireto exige preposição. A regência nominal é a relação entre um substantivo ou adjetivo e seu complemento.

VERBOS MAIS COBRADOS PELO QUADRIX:
- ASSISTIR: transitivo direto no sentido de 'prestar assistência' (assistiu o paciente). Transitivo INDIRETO com 'a' no sentido de 'ver/presenciar': 'assistiu ao jogo'.
- VISAR: TD no sentido de 'assinar/pôr visto' (visou o documento). TI com 'a' no sentido de 'ter como objetivo': 'visa a melhorar' ou 'visa melhorar' (ambas aceitas pela nova gramática).
- ASPIRAR: TD no sentido de 'sorver': 'aspirou o pó'. TI com 'a' no sentido de 'almejar': 'aspira a um cargo melhor'.
- IMPLICAR: TD no sentido de 'acarretar': 'a decisão implicou mudanças'. TI com 'com' no sentido de 'comprometer': 'não implicou com ninguém'.
- OBEDECER / DESOBEDECER: sempre TI com 'a': 'obedeceu à ordem'.
- PREFERIR: TI. 'Prefiro X a Y' (nunca 'mais' ou 'do que').

REGÊNCIA NOMINAL mais cobrada:
- "Apto PARA" o cargo. "Alheio A" o problema. "Ansioso POR/PARA" a resposta. "Favorável A". "Contrário A". "Alusão A". "Dúvida SOBRE/EM". "Objeção A". "Necessidade DE".`,
    pontosChave: [
      "ASSISTIR: 'ao jogo' (TI, ver) / 'o paciente' (TD, ajudar)",
      "ASPIRAR: 'o ar' (TD, sorver) / 'a um cargo' (TI, almejar)",
      "OBEDECER: sempre TI com 'a' — 'obedeceu à lei'",
      "PREFERIR: 'X a Y' — NUNCA 'prefiro mais X do que Y'",
      "IMPLICAR (acarretar): TD sem preposição",
      "VISAR (objetivo): 'visa a' ou 'visa' — ambas aceitas",
      "Apto PARA / Favorável A / Contrário A / Alusão A",
    ],
    esquema: [
      "ASSISTIR: TD = ajudar; TI (a) = ver/presenciar",
      "ASPIRAR: TD = sorver; TI (a) = desejar",
      "IMPLICAR: TD = acarretar; TI (com) = incomodar",
      "OBEDECER: sempre TI → 'obedeceu À lei'",
      "PREFERIR: TI → 'prefere X A Y'",
    ],
    pegadinhas: [
      "'Prefiro mais suco do que café' — ERRADO em duas coisas: 'mais' e 'do que'",
      "'Assistiu o jogo' — ERRADO no sentido de 'ver'. Deve ser 'assistiu AO jogo'",
      "'Ele visa um cargo' no sentido de almejar — aceito hoje, mas a forma clássica é 'visa A'",
      "'Implicou com o colega' = importunou. 'Implicou mudanças' = acarretou (sem preposição)",
      "'Obedeceu a lei' sem crase — ERRADO. 'Obedeceu À lei' (preposição 'a' + artigo 'a' = crase)",
    ],
    dicaQuadrix: "As questões de regência do Quadrix vêm em contexto de redação oficial ou de reescrita de trechos. Memorize os verbos em pares (TD x TI) e os principais nomes com suas preposições obrigatórias.",
    referencias: ["Manual de Redação da Presidência da República", "Cunha & Cintra — Nova Gramática do Português Contemporâneo"],
  },

  {
    id: "lp-crase",
    disciplinaId: "lp",
    topico: "Crase — obrigatória, facultativa e proibida",
    quadrixPeso: "ALTO",
    resumo: `A crase é a fusão da preposição 'a' com o artigo definido feminino 'a(s)' ou com o pronome demonstrativo 'aquele(a)'. Para verificar se há crase, teste com um substantivo masculino equivalente: se ficar 'ao', então no feminino há crase ('à').

CRASE OBRIGATÓRIA: antes de substantivos femininos determinados (à secretaria, à reunião); antes de horas (às 9h, à meia-noite); nas locuções prepositivas e adverbiais femininas (à tarde, à vista, à medida que, à proporção que); antes de 'aquela/aquele/aquilo' (Refiro-me àquela proposta); nas expressões 'à moda de', 'à brasileira', 'à francesa'.

CRASE PROIBIDA: antes de verbos (Vi ao chegar ≠ Vi à chegar — nunca crase antes de verbo); antes de palavras masculinas (referiu-se a um projeto); antes de pronomes pessoais, demonstrativos começando por 'e' (esta, esse), possessivos no singular sem substantivo (a nossa proposta, não à nossa proposta); antes da palavra 'casa' sem adjetivo (Fui a casa; mas Fui à casa de Ana); antes de 'terra' no sentido de terra firme (Chegaram a terra); antes de nomes de cidades que não admitem artigo (Viajou a Brasília, a Paris — mas: Viajou à São Paulo, porque admite 'a São Paulo' com artigo).

CRASE FACULTATIVA: antes de nomes femininos de cidades (Fui a/à Brasília); antes de pronomes possessivos femininos (à/a minha proposta); antes de 'casa' com adjetivo (à minha casa).`,
    pontosChave: [
      "TESTE: substitua por substantivo masculino. 'ao' masculino = 'à' feminino",
      "ANTES DE VERBOS: NUNCA há crase",
      "HORAS: sempre crase — 'às 9h', 'à meia-noite', 'às 14h'",
      "LOCUÇÕES: à tarde, à noite, à vista, às vezes, à medida que",
      "'Aquele/aquela/aquilo': crase obrigatória — àquele, àquela, àquilo",
      "CIDADES: Brasília não exige artigo → 'a Brasília'. São Paulo exige → 'à São Paulo'",
      "CASA sem adjetivo: 'Fui a casa'. Com adjetivo: 'Fui à casa de Ana'",
    ],
    esquema: [
      "REGRA DO 'AO': faço com masculino → 'ao' → com feminino = crase (à)",
      "ANTES DE VERBO = proibido",
      "ANTES DE PRONOME = proibido (exceto 'aquela/aquele/aquilo')",
      "HORAS = sempre crase",
      "PRONOME DEMONSTRATIVO 'AQUELE' = crase → àquele",
    ],
    pegadinhas: [
      "'Refiro-me a esta questão' — sem crase (pronome demonstrativo com 'e')",
      "'Refiro-me àquela questão' — com crase (aquela = a+aquela)",
      "'Fui a pé' — sem crase (locução 'a pé' não tem artigo feminino)",
      "'Graças à sua ajuda' — com crase (locução 'graças a' + artigo 'a')",
      "'A partir de amanhã' — sem crase antes de 'a partir de' seguido de masculino/adv.",
      "'Estava disposto a aceitar' — sem crase antes de verbo",
    ],
    dicaQuadrix: "O Quadrix testa crase em contexto de ofício ou relatório administrativo. Foco em: àquela proposta (pronome dem.), às reuniões (plural), à medida que (locução), e nos casos com 'a casa / à casa'.",
    referencias: ["Decreto 9.758/2019 — Linguagem e estilo administrativo"],
  },

  // ============================================================
  // CONHECIMENTOS DO DF / LEGISLAÇÃO
  // ============================================================

  {
    id: "df-lc840",
    disciplinaId: "df-leg",
    topico: "LC 840/2011 — Regime Jurídico dos Servidores do DF",
    quadrixPeso: "MUITO_ALTO",
    resumo: `A Lei Complementar nº 840/2011 é o Estatuto dos Servidores Públicos Civis do Distrito Federal. Para esta prova, quatro títulos são exigidos: Título I (disposições preliminares), Título V (deveres), Título VI (regime disciplinar) e Título VII (processos de apuração de infração disciplinar).

TÍTULO I — DISPOSIÇÕES PRELIMINARES: Define cargo público (conjunto de atribuições, responsabilidades e deveres cometidos ao servidor efetivo). Provimento: formas de ingresso no cargo (nomeação para cargo efetivo por aprovação em concurso; nomeação para cargo em comissão; promoção; readaptação; reversão; aproveitamento; reintegração; recondução).

TÍTULO V — DEVERES: O servidor é obrigado a exercer com zelo e dedicação as atribuições do cargo; ser leal às instituições; observar as normas legais; cumprir ordens superiores, exceto as manifestamente ilegais; manter conduta compatível com a moralidade administrativa; tratar com urbanidade as pessoas.

TÍTULO VI — REGIME DISCIPLINAR: As penalidades disciplinares são: advertência (infrações leves), suspensão (infrações médias — até 90 dias), demissão (infrações graves), cassação de aposentadoria ou disponibilidade, e destituição de cargo em comissão. PRAZOS PRESCRICIONAIS: advertência (180 dias), suspensão (2 anos), demissão/cassação/destituição (5 anos). A prescrição começa a contar da data em que o fato se tornou conhecido.

TÍTULO VII — PAD: Sindicância (prazo de 30 dias, prorrogável por igual período) pode resultar em arquivamento, advertência ou suspensão até 30 dias. Para penas mais graves, é obrigatório o Processo Administrativo Disciplinar. O PAD assegura contraditório e ampla defesa.`,
    pontosChave: [
      "Penalidades: Advertência → Suspensão (até 90 dias) → Demissão → Cassação → Destituição",
      "Prescrição ADVERTÊNCIA: 180 dias",
      "Prescrição SUSPENSÃO: 2 anos",
      "Prescrição DEMISSÃO/CASSAÇÃO/DESTITUIÇÃO: 5 anos",
      "Sindicância: prazo 30 dias (+30 prorrogável) — pode resultar em advertência ou suspensão até 30 dias",
      "PAD é obrigatório para penas de suspensão superior a 30 dias e demissão",
      "Contraditório e ampla defesa: garantias do PAD (art. 5º, LV, CF)",
    ],
    esquema: [
      "ADVERTÊNCIA: leve → prescrição 180 dias → sindicância basta",
      "SUSPENSÃO: média → prescrição 2 anos → até 30 dias: sindicância; mais de 30: PAD",
      "DEMISSÃO: grave → prescrição 5 anos → PAD obrigatório",
      "CASSAÇÃO: aposentadoria indevida → prescrição 5 anos",
      "DESTITUIÇÃO: cargo em comissão → prescrição 5 anos",
    ],
    pegadinhas: [
      "Prescrição da DEMISSÃO é 5 ANOS, não 2 anos",
      "Sindicância pode resultar em suspensão até 30 dias — não confunda com PAD",
      "O prazo da sindicância é 30 dias, prorrogável por mais 30 (60 dias no total)",
      "A pena de CASSAÇÃO incide sobre aposentadoria ou disponibilidade — não é 'demissão de aposentado'",
      "Advertência: prescrição 180 DIAS (não 1 ano, não 2 anos)",
    ],
    dicaQuadrix: "Quadrix adora criar situações onde o candidato confunde os prazos prescricionais. Memorize: 180 dias (advertência), 2 anos (suspensão), 5 anos (demissão/cassação/destituição). A outra pegadinha favorita é sobre sindicância vs. PAD — qual procedimento cabe para qual penalidade.",
    referencias: ["LC 840/2011 — Títulos I, V, VI e VII", "CF/88 — Art. 5º, LV (contraditório e ampla defesa)"],
  },

  {
    id: "df-mariapenha",
    disciplinaId: "df-leg",
    topico: "Lei Maria da Penha — Lei 11.340/2006",
    quadrixPeso: "MUITO_ALTO",
    resumo: `A Lei 11.340/2006 (Lei Maria da Penha) cria mecanismos para coibir a violência doméstica e familiar contra a mulher. Para esta prova, o edital garante MÍNIMO 3 QUESTÕES sobre esta lei.

CONCEITO DE VIOLÊNCIA DOMÉSTICA (art. 5º): qualquer ação ou omissão baseada no gênero que cause morte, lesão, sofrimento físico, sexual ou psicológico, ou dano moral ou patrimonial à mulher. O âmbito de incidência é o lar, a unidade doméstica, ou qualquer relação íntima de afeto (independentemente de coabitação). A lei se aplica independentemente de orientação sexual.

FORMAS DE VIOLÊNCIA (art. 7º): (1) FÍSICA: qualquer conduta que ofenda a integridade ou saúde corporal; (2) PSICOLÓGICA: qualquer conduta que cause dano emocional e diminuição da autoestima, limite ou impeça a liberdade; (3) SEXUAL: qualquer conduta que a constranja a presenciar, manter ou participar de relação sexual não desejada, mediante intimidação, ameaça, coação ou uso da força; (4) PATRIMONIAL: qualquer conduta que configure retenção, subtração, destruição parcial ou total de objetos, instrumentos de trabalho, documentos pessoais, bens e valores; (5) MORAL: qualquer conduta que configure calúnia, difamação ou injúria.

MEDIDAS PROTETIVAS DE URGÊNCIA (arts. 18-24): O juiz poderá conceder, de imediato, em 48 horas, medidas como: suspensão da posse ou restrição do porte de armas; afastamento do lar; proibição de aproximação da ofendida (fixando distância mínima); proibição de contato; proibição de frequentar determinados lugares; restrição ou suspensão de visitas a dependentes menores. Pela Lei 13.827/2019, o delegado ou policial pode aplicar algumas medidas protetivas imediatamente, sem necessidade de aguardar o juiz.

JUIZADOS DE VIOLÊNCIA DOMÉSTICA (art. 14): competência cível e criminal para processar, julgar e executar causas decorrentes da violência doméstica.`,
    pontosChave: [
      "5 FORMAS de violência: física, psicológica, sexual, patrimonial e MORAL",
      "Âmbito: unidade doméstica, família, relação íntima de afeto — sem coabitação",
      "Independe de orientação sexual — aplica-se também a casais homoafetivos",
      "Medidas protetivas: juiz decide em 48 horas",
      "Lei 13.827/2019: delegado pode conceder afastamento imediato sem aguardar juiz",
      "Juizado de Violência Doméstica: competência cível E criminal",
      "Violência moral: calúnia, difamação ou injúria",
    ],
    esquema: [
      "FÍSICA: integridade corporal",
      "PSICOLÓGICA: saúde emocional, autoestima, liberdade",
      "SEXUAL: atos sexuais não desejados por força/ameaça",
      "PATRIMONIAL: bens, documentos, instrumentos de trabalho",
      "MORAL: calúnia (fato falso), difamação (fato verdadeiro), injúria (atributos negativos)",
    ],
    pegadinhas: [
      "A lei NÃO exige coabitação — relação de afeto passada basta",
      "A violência MORAL é específica: calúnia, difamação ou injúria — não é 'qualquer ofensa verbal'",
      "Medidas protetivas NÃO exigem inquérito instaurado — podem ser concedidas antes",
      "O juizado tem competência CÍVEL E CRIMINAL (não apenas criminal)",
      "A lei se aplica também a mulheres trans (entendimento do STJ/STF)",
    ],
    dicaQuadrix: "O Quadrix ama cobrar: (1) as 5 formas de violência com definições; (2) se a lei exige coabitação (não exige); (3) as medidas protetivas de urgência e quem pode concedê-las; (4) a Lei 13.827/2019 (delegado pode afastar agressor imediatamente). Leia os arts. 5º, 7º, 18-24.",
    referencias: ["Lei 11.340/2006 — arts. 5, 7, 14, 18-24", "Lei 13.827/2019 (afastamento imediato)", "Lei 14.550/2023 (atualização)"],
  },

  {
    id: "df-primeirossocorros",
    disciplinaId: "df-leg",
    topico: "Noções básicas de primeiros socorros",
    quadrixPeso: "ALTO",
    resumo: `Primeiros socorros são os cuidados imediatos prestados a uma vítima de acidente ou mal súbito antes da chegada do socorro especializado. A sequência básica: (1) Reconhecer a situação; (2) Garantir a segurança da cena; (3) Acionar o socorro (SAMU 192, Bombeiros 193); (4) Prestar os cuidados básicos.

ENGASGO: em adultos conscientes, usar a Manobra de Heimlich (compressões abdominais). Em bebês menores de 1 ano: 5 palmadas nas costas + 5 compressões torácicas. Nunca colocar o dedo na boca às cegas.

SANGRAMENTO: pressão direta e firme sobre o ferimento com pano limpo. Manter a pressão. Elevar o membro se possível. NÃO usar torniquete caseiro (pode causar isquemia). Chamar o socorro.

FRATURA: imobilizar o membro fraturado na posição em que se encontra. NÃO tentar reposicionar. Apoiar acima e abaixo da fratura. NÃO movimentar o acidentado sem imobilização.

QUEIMADURA: água corrente fria por no mínimo 10 minutos. NÃO usar pasta dental, manteiga, clara de ovo ou qualquer outra substância. NÃO estourar bolhas. Cobrir com pano limpo.

DESMAIO: deitar o paciente com as pernas elevadas (aumenta retorno venoso). Afrouxar roupas e acessórios. Garantir ventilação.

CONVULSÃO: NÃO segurar a pessoa. NÃO colocar objetos na boca. Afastar objetos que possam machucar. Após a crise: colocar em decúbito lateral de segurança (para evitar aspiração).

INTOXICAÇÃO: NÃO induzir vômito (pode agravar). Acionar CIATOX (0800 722 6001) ou SAMU 192. Levar embalagem do produto ao hospital.`,
    pontosChave: [
      "SAMU: 192 | BOMBEIROS: 193",
      "ENGASGO adulto: Heimlich (compressões abdominais)",
      "ENGASGO bebê: 5 palmadas nas costas + 5 compressões torácicas",
      "SANGRAMENTO: pressão direta — NÃO usar torniquete caseiro",
      "QUEIMADURA: água corrente 10 min — NÃO usar pasta dental",
      "FRATURA: imobilizar — NÃO reposicionar o membro",
      "CONVULSÃO: NÃO segurar — decúbito lateral após a crise",
      "INTOXICAÇÃO: NÃO induzir vômito — acionar CIATOX",
    ],
    esquema: [
      "ENGASGO: Heimlich (adulto/criança > 1 ano) / palmadas + compressões (bebê)",
      "SANGRAMENTO: pressão direta + elevar membro",
      "QUEIMADURA: água corrente fria ≥10min + cobrir",
      "FRATURA: imobilizar sem mexer",
      "DESMAIO: pernas elevadas",
      "CONVULSÃO: afastar, não segurar, lateral após",
      "INTOXICAÇÃO: não vomitar, acionar socorro",
    ],
    pegadinhas: [
      "NUNCA: torniquete caseiro, pasta dental em queimadura, vômito em intoxicação",
      "NUNCA: colocar objeto na boca em convulsão",
      "NUNCA: mover vítima de fratura sem imobilização",
      "Quadrix apresenta a situação e pede qual conduta é CORRETA — saiba também o que NÃO fazer",
    ],
    dicaQuadrix: "O Quadrix sempre apresenta uma situação-problema: 'João está com o dedo encravado na garganta, o que fazer?'. Memorize as condutas por situação em dois campos: O QUE FAZER e O QUE NÃO FAZER. As pegadinhas são sempre sobre as proibições.",
    referencias: ["Manual de Primeiros Socorros — Cruz Vermelha Brasileira", "Resolução CFM sobre primeiros socorros"],
  },

  // ============================================================
  // TEORIA GERAL DA ADMINISTRAÇÃO
  // ============================================================

  {
    id: "tga-evolucao",
    disciplinaId: "tga",
    topico: "Evolução do pensamento administrativo — escolas e teorias",
    quadrixPeso: "MUITO_ALTO",
    resumo: `A Teoria Geral da Administração evoluiu ao longo do século XX, cada escola respondendo às limitações da anterior.

ADMINISTRAÇÃO CIENTÍFICA (Taylor, 1911): foco na eficiência da tarefa individual. Princípios: planejamento (substituir improviso), preparo, controle, execução. Homo economicus (trabalhador motivado exclusivamente por dinheiro). Divisão do trabalho especializada. Crítica: visão mecanicista e desumanizante.

TEORIA CLÁSSICA (Fayol, 1916): foco nas funções da organização como um todo. 5 funções do administrador: prever/planejar, organizar, comandar, coordenar, controlar (POD-C-C). 14 princípios: unidade de comando, unidade de direção, divisão do trabalho, hierarquia (cadeia escalar), amplitude de controle, remuneração, etc.

TEORIA DA BUROCRACIA (Weber, 1922): dominação legal-racional como base da autoridade. Características: normas e regulamentos escritos, caráter formal, divisão do trabalho, hierarquia de autoridade, impessoalidade, separação entre propriedade pessoal e propriedade do cargo. Disfunções: apego excessivo às regras, papelório, resistência à mudança.

TEORIA DAS RELAÇÕES HUMANAS (Mayo/Elton, 1927-1932): foco no fator humano. Experiência de Hawthorne: descobriu que condições sociais (atenção dos pesquisadores) aumentavam a produtividade, independente das condições físicas. Grupos informais têm influência sobre o comportamento.

BEHAVIORISMO (Simon, 1947): conceito de racionalidade limitada (o decisor não é totalmente racional — busca a decisão "satisfatória", não a ótima). Satisficing.

TEORIA DOS SISTEMAS (Bertalanffy, 1950s): a organização é um sistema aberto que interage com o ambiente. Componentes: entrada, processamento, saída, retroalimentação (feedback), homeostase.

TEORIA CONTINGENCIAL (Burns & Stalker, 1960s): não existe uma estrutura organizacional ideal para todas as situações. A melhor estrutura depende do ambiente: estável → estrutura mecanicista (burocrática); instável → estrutura orgânica (flexível).`,
    pontosChave: [
      "TAYLOR: tarefa/operação → homo economicus → eficiência",
      "FAYOL: organização como todo → 5 funções (PODCC) → 14 princípios",
      "WEBER: burocracia → legalidade → impessoalidade",
      "MAYO: fator humano → Hawthorne → grupos informais",
      "SIMON: racionalidade limitada → satisficing",
      "BERTALANFFY: sistema aberto → entrada-processamento-saída-feedback",
      "CONTINGENCIAL: não existe solução universal → depende do ambiente",
    ],
    esquema: [
      "Taylor → foco na TAREFA",
      "Fayol → foco na ESTRUTURA",
      "Weber → foco na AUTORIDADE (legal-racional)",
      "Mayo → foco nas PESSOAS",
      "Simon → foco na DECISÃO",
      "Bertalanffy → foco no SISTEMA",
      "Contingencial → foco no AMBIENTE",
    ],
    pegadinhas: [
      "Fayol definiu 5 funções do ADMINISTRADOR (não as funções da empresa em si)",
      "Teoria das Relações Humanas não surgiu contra Taylor por 'humanismo' — surgiu de dados experimentais de Hawthorne",
      "Racionalidade limitada (Simon): o decisor busca a solução satisfatória ('satisficing'), não a ótima",
      "Weber: burocracia é um MODELO IDEAL — não é sinônimo de ineficiência (no texto do Weber)",
      "Contingencial: estrutura MECANICISTA (ambiente estável) ≠ ORGÂNICA (ambiente instável)",
    ],
    dicaQuadrix: "Quadrix apresenta uma afirmação sobre uma teoria e pede 'a qual escola pertence' ou 'qual autor a defende'. Grave o par: Taylor-tarefa, Fayol-funções administrativas, Weber-burocracia, Mayo-relações humanas, Simon-decisão/racionalidade limitada, Contingencial-ambiente.",
    referencias: ["CHIAVENATO — Introdução à TGA", "Maximiano — Teoria Geral da Administração"],
  },

  {
    id: "tga-podc",
    disciplinaId: "tga",
    topico: "Funções administrativas — PODC",
    quadrixPeso: "MUITO_ALTO",
    resumo: `As quatro funções administrativas (PODC) formam o ciclo de gestão. O Quadrix quase sempre apresenta uma situação e pergunta qual função está sendo exercida.

PLANEJAMENTO: definir objetivos, estabelecer estratégias para alcançá-los e desenvolver planos para integrar e coordenar as atividades. Níveis: estratégico (longo prazo, toda a organização, alta cúpula), tático (médio prazo, unidades/departamentos, gerências) e operacional (curto prazo, tarefas específicas, supervisores). Ferramentas: SWOT, BSC, APO, missão e visão.

ORGANIZAÇÃO: estruturar os recursos humanos, materiais e financeiros para alcançar os objetivos. Inclui: definir cargos e funções, estabelecer hierarquia e linhas de autoridade, alocar recursos, criar departamentos. Exemplos de ato organizacional: criar um organograma, definir quem responde a quem.

DIREÇÃO: influenciar e guiar as pessoas para que alcancem os objetivos. Envolve liderança, motivação, comunicação e gerenciamento de conflitos. É a função mais ligada ao aspecto humano da gestão.

CONTROLE: verificar se os resultados obtidos estão de acordo com os objetivos estabelecidos. Etapas do controle: (1) estabelecer padrões, (2) medir o desempenho, (3) comparar o desempenho com o padrão, (4) tomar ação corretiva. O controle é retrospectivo (avalia o que foi feito) mas também preventivo (identifica desvios antes que causem problemas graves).`,
    pontosChave: [
      "PLANEJAMENTO: definir objetivos e como alcançá-los",
      "ORGANIZAÇÃO: estruturar recursos para os objetivos",
      "DIREÇÃO: influenciar pessoas (liderança + motivação + comunicação)",
      "CONTROLE: verificar se objetivos foram alcançados + ação corretiva",
      "Elaborar orçamento = PLANEJAMENTO",
      "Criar organograma = ORGANIZAÇÃO",
      "Reunir equipe para motivar = DIREÇÃO",
      "Relatório de desempenho = CONTROLE",
    ],
    esquema: [
      "P → O QUE fazer e COMO (objetivos + estratégias)",
      "O → QUEM faz o quê (estrutura, cargos, hierarquia)",
      "D → FAZER acontecer (liderança, motivação)",
      "C → VERIFICAR se aconteceu (padrão + medição + correção)",
    ],
    pegadinhas: [
      "'Ao elaborar o planejamento estratégico, o gestor exerce qual função?' — PLANEJAMENTO (não direção)",
      "'Ao monitorar os indicadores e identificar desvios, o gestor exerce qual função?' — CONTROLE",
      "'Ao distribuir tarefas e definir responsabilidades, o gestor exerce qual função?' — ORGANIZAÇÃO",
      "Fayol criou 5 funções (prever, organizar, comandar, coordenar, controlar) — PODC é a versão moderna com 4",
      "CONTROLE não é punição — é verificação e correção de rumos",
    ],
    dicaQuadrix: "A questão típica do Quadrix: 'O gestor elaborou o mapa estratégico e definiu indicadores de resultado. Essa atividade corresponde a qual função administrativa?' (PLANEJAMENTO). Ou: 'O gestor identificou que a meta de atendimentos não foi atingida e convocou reunião para analisar as causas.' (CONTROLE).",
    referencias: ["Robbins & Coulter — Administração", "Chiavenato — Administração Geral e Pública"],
  },

  {
    id: "tga-planejamento",
    disciplinaId: "tga",
    topico: "Planejamento estratégico — SWOT, BSC, APO e processo decisório",
    quadrixPeso: "MUITO_ALTO",
    resumo: `O planejamento estratégico é o processo de longo prazo que define a direção da organização. Suas principais ferramentas são amplamente cobradas pelo Quadrix.

ANÁLISE SWOT (FOFA): Strengths (Forças — internas e positivas), Weaknesses (Fraquezas — internas e negativas), Opportunities (Oportunidades — externas e positivas), Threats (Ameaças — externas e negativas). A distinção interno/externo é a mais cobrada: forças e fraquezas são controláveis (internas); oportunidades e ameaças não são controláveis (externas).

BALANCED SCORECARD (BSC — Kaplan e Norton): ferramenta que traduz a estratégia em objetivos, indicadores, metas e iniciativas distribuídos em 4 perspectivas: (1) FINANCEIRA: como a organização aparece para os acionistas/governo? (2) CLIENTES: como a organização aparece para seus clientes/usuários? (3) PROCESSOS INTERNOS: em quais processos a organização precisa ser excelente? (4) APRENDIZADO E CRESCIMENTO: como a organização mantém sua capacidade de mudar e melhorar? As perspectivas têm relação de causa e efeito: Aprendizado → Processos → Clientes → Financeiro.

ADMINISTRAÇÃO POR OBJETIVOS (APO — Drucker): processo em que gestores e subordinados CONJUNTAMENTE definem os objetivos do departamento, identificam os resultados esperados de cada indivíduo e usam essas medidas para avaliar o desempenho. Característica central: participação e negociação na definição das metas.

PROCESSO DECISÓRIO: modelos — (1) Racional: coleta todas as informações, avalia todas as alternativas, escolhe a ótima; (2) Racionalidade limitada (Simon): busca a alternativa satisfatória, não a ótima ("satisficing"); (3) Modelo político: coalizões entre interesses divergentes; (4) Lata de lixo (Cohen/March): problemas, soluções, participantes e oportunidades de escolha se encontram aleatoriamente.`,
    pontosChave: [
      "SWOT: Forças/Fraquezas = INTERNAS; Oportunidades/Ameaças = EXTERNAS",
      "BSC: 4 perspectivas — Financeira, Clientes, Processos Internos, Aprendizado",
      "BSC: relação de causa e efeito — base → ápice (Aprendizado → Financeiro)",
      "APO: objetivos definidos CONJUNTAMENTE entre gestor e subordinado",
      "APO: avaliação de desempenho por resultados, não por atividades",
      "Simon: racionalidade LIMITADA — busca solução 'boa o suficiente', não a ótima",
      "BSC: indicadores LEAD (antecedentes/causa) e LAG (resultado/efeito)",
    ],
    esquema: [
      "SWOT: INTERNO (forças/fraquezas) × EXTERNO (oport./ameaças)",
      "BSC: APRENDIZADO → PROCESSOS → CLIENTES → FINANCEIRO",
      "APO: gestor + subordinado → negociam metas → avaliam por resultado",
      "Decisão RACIONAL: ótima | LIMITADA: satisfatória",
    ],
    pegadinhas: [
      "SWOT: 'capacitação dos servidores' = interna (força ou fraqueza) — não é ameaça",
      "'Mudança na legislação' = EXTERNA (oportunidade ou ameaça) — não é fraqueza",
      "Na APO, as metas são NEGOCIADAS — não impostas pelo gestor",
      "BSC: a perspectiva FINANCEIRA é o RESULTADO FINAL, não a base",
      "A perspectiva de Aprendizado e Crescimento É a base do BSC (não a financeira)",
    ],
    dicaQuadrix: "BSC: Quadrix sempre testa as 4 perspectivas E a relação de causa e efeito (qual perspectiva é a base e qual é o resultado final). SWOT: a questão mostra uma situação e pede se é força/fraqueza/oportunidade/ameaça — foque sempre em 'é interno ou externo?'",
    referencias: ["Kaplan & Norton — A Estratégia em Ação", "Drucker — The Practice of Management"],
  },

  {
    id: "tga-estruturas",
    disciplinaId: "tga",
    topico: "Estruturas organizacionais e cultura organizacional",
    quadrixPeso: "MUITO_ALTO",
    resumo: `As estruturas organizacionais determinam como as atividades são divididas, agrupadas e coordenadas.

LINEAR (ou hierárquica): autoridade única e centralizada. Cada subordinado obedece a apenas um superior. Vantagem: simplicidade e clareza. Desvantagem: rigidez e sobrecarga do topo.

FUNCIONAL: baseada na especialização das funções. Um subordinado pode receber ordens de mais de um superior (especialistas). Vantagem: especialização. Desvantagem: dificuldade de coordenação, conflito de ordens.

LINHA-STAFF (linha e assessoria): combina a estrutura linear com órgãos de assessoria (staff). O staff não tem autoridade de linha — apenas aconselha. O gerente de linha decide; o staff apoia.

MATRICIAL: dois critérios de departamentalização simultaneamente (ex: funcional + por projetos). O funcionário tem dois chefes: o gerente funcional e o gerente de projeto. Vantagem: flexibilidade. Desvantagem: dualidade de comando, conflito de autoridade.

DEPARTAMENTALIZAÇÃO: critérios para agrupar as atividades: por função (mais comum), por produto/serviço, por território, por cliente, por processo, por projetos e matricial.

CULTURA ORGANIZACIONAL (Schein): conjunto de valores, crenças e pressupostos que orientam o comportamento na organização. 3 níveis: (1) Artefatos (visible — o que se vê: layout, vestimenta, linguagem); (2) Valores adotados (o que as pessoas dizem que valorizam); (3) Pressupostos básicos (o que de fato orienta o comportamento — inconsciente).

CLIMA ORGANIZACIONAL: percepção coletiva dos funcionários sobre o ambiente de trabalho. É mais superficial e mutável que a cultura.`,
    pontosChave: [
      "LINEAR: um chefe → clareza; mas rígida",
      "FUNCIONAL: vários chefes especialistas → conflito de ordens",
      "LINHA-STAFF: staff assessora mas NÃO comanda",
      "MATRICIAL: dois chefes (funcional + projeto) → conflito de autoridade",
      "SCHEIN: 3 níveis — artefatos (visíveis), valores, pressupostos (invisíveis/inconscientes)",
      "CULTURA: difícil de mudar; CLIMA: mais superficial e mutável",
    ],
    esquema: [
      "LINEAR: 1 chefe só — simples, rígida",
      "FUNCIONAL: vários chefes especialistas — risco conflito",
      "LINHA-STAFF: linha decide + staff aconselha",
      "MATRICIAL: 2 chefes simultâneos — flexível mas conflituosa",
      "SCHEIN: artefatos → valores → pressupostos (da superfície ao fundo)",
    ],
    pegadinhas: [
      "No STAFF: o assessor não tem autoridade para dar ordens — apenas aconselha",
      "Na estrutura MATRICIAL: o funcionário TEM dois chefes ao mesmo tempo (não é opcional)",
      "CLIMA ≠ CULTURA: clima é percepção, muda rápido; cultura é profunda, muda devagar",
      "Schein: 'pressupostos básicos' são INCONSCIENTES — são a camada mais profunda",
      "Departamentalização POR PROCESSO ≠ gestão por processos (BPM) — são conceitos diferentes",
    ],
    dicaQuadrix: "Quadrix adora questões sobre qual estrutura 'apresenta dupla subordinação' (matricial) ou 'o staff não tem autoridade de linha' (linha-staff). Sobre cultura, a questão favorita é identificar o nível de Schein a partir de um exemplo concreto.",
    referencias: ["Chiavenato — TGA", "Schein — Organizational Culture and Leadership"],
  },

  // ============================================================
  // GESTÃO DE PESSOAS
  // ============================================================

  {
    id: "gp-motivacao",
    disciplinaId: "gp",
    topico: "Teorias de motivação — Maslow, Herzberg, McClelland, Vroom, Adams, McGregor",
    quadrixPeso: "MUITO_ALTO",
    resumo: `As teorias de motivação são garantidas em toda prova de GP do Quadrix. Dominá-las comparativamente é fundamental.

MASLOW (Hierarquia das Necessidades): pirâmide de 5 níveis — fisiológicas (base), segurança, sociais/afiliação, estima, autorrealização (topo). Premissa: apenas a necessidade insatisfeita motiva. Uma pessoa sobe para o próximo nível só quando o anterior está suficientemente satisfeito.

HERZBERG (Dois Fatores / Higiene-Motivação): FATORES HIGIÊNICOS: se ausentes, causam insatisfação; se presentes, NÃO geram satisfação — apenas evitam insatisfação. Exemplos: salário, condições de trabalho, segurança, política da empresa, relacionamento com chefia. FATORES MOTIVACIONAIS: se presentes, geram satisfação e motivação. Exemplos: realização, reconhecimento, responsabilidade, progresso, crescimento profissional, o trabalho em si. Conclusão: para motivar de verdade, não basta eliminar insatisfação (higiene) — é preciso oferecer motivadores.

McCLELLAND (Três Necessidades Adquiridas): necessidade de REALIZAÇÃO (fazer bem feito, superar desafios), necessidade de AFILIAÇÃO (relacionamentos positivos, ser aceito), necessidade de PODER (influenciar e controlar outros). São aprendidas pela cultura e experiências de vida.

VROOM (Teoria da Expectativa): Motivação = Expectativa × Instrumentalidade × Valência. EXPECTATIVA: crença de que o esforço leva ao desempenho. INSTRUMENTALIDADE: crença de que o desempenho leva à recompensa. VALÊNCIA: valor atribuído à recompensa.

ADAMS (Equidade): as pessoas comparam sua relação esforço/recompensa com a de outros. Se percebem inequidade, reduzem o esforço ou pedem aumento.

McGREGOR (X e Y): Teoria X — o trabalhador não gosta de trabalhar, precisa ser controlado, coagido, prefere ser dirigido. Teoria Y — o trabalhador pode se auto-dirigir, é criativo, aceita responsabilidade.`,
    pontosChave: [
      "MASLOW: necessidade insatisfeita motiva; sobe a pirâmide do básico ao complexo",
      "HERZBERG: higiênicos (evitam insatisfação) ≠ motivacionais (geram satisfação)",
      "SALÁRIO é fator HIGIÊNICO em Herzberg — não gera satisfação, só evita insatisfação",
      "McCLELLAND: realização, afiliação, poder — adquiridas pela experiência",
      "VROOM: Motivação = E × I × V (expectativa × instrumentalidade × valência)",
      "ADAMS: inequidade percebida → redução de esforço ou reivindicação",
      "McGREGOR X: controle externo; Y: autodireção",
    ],
    esquema: [
      "MASLOW: pirâmide — fisiológica → segurança → social → estima → autorrealização",
      "HERZBERG: higiene (salário, condições) = ausência de insatisfação; motivação (realização) = satisfação",
      "VROOM: esforço → desempenho (expectativa) → recompensa (instrumentalidade) → valor (valência)",
      "ADAMS: equidade = minha relação esforço/recompensa vs. dos outros",
    ],
    pegadinhas: [
      "Salário ALTO não motiva (Herzberg) — apenas evita insatisfação",
      "Maslow: satisfeita uma necessidade, ela deixa de motivar — a próxima passa a motivar",
      "McClelland: não são inatas — são APRENDIDAS",
      "Vroom: se qualquer uma das três variáveis = zero, motivação = zero",
      "Adams: inequidade pode ser percebida para MAIS ou para MENOS (ambas geram tensão)",
    ],
    dicaQuadrix: "Quadrix adora apresentar uma situação e pedir 'qual teoria explica esse comportamento'. Padrões: 'João reduziu seu esforço depois de descobrir que seu colega ganha mais' = Adams (equidade). 'Maria não se sente motivada mesmo com aumento de salário' = Herzberg. 'Pedro só pensa em ser reconhecido' = Herzberg (motivacional) ou Maslow (estima).",
    referencias: ["Maslow — A Theory of Human Motivation", "Herzberg — Work and the Nature of Man", "Vroom — Work and Motivation"],
  },

  {
    id: "gp-lideranca",
    disciplinaId: "gp",
    topico: "Liderança — estilos, teorias situacionais e contemporâneas",
    quadrixPeso: "MUITO_ALTO",
    resumo: `A liderança é o processo de influenciar pessoas para que ajam de determinada forma.

ESTILOS CLÁSSICOS (White & Lippitt): Autocrático (líder decide tudo, sem participação), Democrático (participação do grupo nas decisões), Liberal/Laissez-faire (grupo tem total autonomia).

GRADE GERENCIAL (Blake & Mouton): eixo horizontal = preocupação com a produção; eixo vertical = preocupação com as pessoas. Estilo ideal: 9.9 (alta produção + alta preocupação com pessoas = liderança em equipe).

LIDERANÇA SITUACIONAL (Hersey & Blanchard): o líder adapta seu estilo ao nível de maturidade/prontidão do liderado. 4 estilos (E) × 4 níveis de maturidade (M):
- M1 (baixa competência, baixo comprometimento) → E1 Direção/Determinar (alta tarefa, baixo relacionamento)
- M2 (alguma competência, comprometimento variável) → E2 Persuasão/Orientar (alta tarefa, alto relacionamento)
- M3 (alta competência, comprometimento variável) → E3 Apoio/Compartilhar (baixa tarefa, alto relacionamento)
- M4 (alta competência, alto comprometimento) → E4 Delegação/Delegar (baixa tarefa, baixo relacionamento)

LIDERANÇA TRANSFORMACIONAL vs. TRANSACIONAL: Transformacional: o líder inspira, cria visão de futuro, provoca mudanças (carisma, estimulação intelectual, consideração individualizada). Transacional: baseada em troca — recompensa por desempenho (reforço condicional). A maioria dos líderes eficazes combina ambas.

LIDERANÇA SERVIDORA: líder coloca as necessidades dos liderados acima das suas. Empoderamento da equipe.`,
    pontosChave: [
      "HERSEY & BLANCHARD: adaptar estilo ao nível de MATURIDADE do liderado",
      "M1 → E1 Direção (foco na tarefa, pouco relacionamento)",
      "M2 → E2 Persuasão (foco em tarefa E relacionamento)",
      "M3 → E3 Apoio (relacionamento alto, tarefa baixa)",
      "M4 → E4 Delegação (baixo nos dois — o liderado é autônomo)",
      "TRANSFORMACIONAL: visão, inspiração, mudança de valores",
      "TRANSACIONAL: troca — desempenho por recompensa",
    ],
    esquema: [
      "M1 (não sabe, não quer) → E1 (DIZER o que fazer)",
      "M2 (sabe um pouco, quer mas inseguro) → E2 (VENDER a decisão)",
      "M3 (sabe, mas inseguro/resistente) → E3 (COMPARTILHAR decisão)",
      "M4 (sabe e quer) → E4 (DELEGAR completamente)",
    ],
    pegadinhas: [
      "No E4 (delegação), o líder NÃO abandona o liderado — acompanha sem interferir diretamente",
      "Liderança LAISSEZ-FAIRE ≠ delegação de Hersey — laissez-faire é ausência de liderança",
      "Transformacional não é apenas 'carismático' — inclui estimulação intelectual e atenção individual",
      "Blake & Mouton: estilo 9.1 (alta produção, baixa pessoa) = autocrático; 1.9 = paternalista",
    ],
    dicaQuadrix: "Situacional de Hersey & Blanchard é a teoria mais cobrada em provas de Administração do Quadrix. Questão típica: 'Um novo servidor sem experiência se junta à equipe. Qual estilo de liderança é mais adequado?' (E1 — Direção).",
    referencias: ["Hersey & Blanchard — Situational Leadership", "Burns — Leadership (transformacional)"],
  },

  {
    id: "gp-competencias",
    disciplinaId: "gp",
    topico: "Gestão por competências no setor público",
    quadrixPeso: "MUITO_ALTO",
    resumo: `Gestão por competências é o modelo de gestão de pessoas que identifica, avalia, desenvolve e utiliza as competências dos servidores para atingir os objetivos organizacionais.

COMPETÊNCIA = CHA: Conhecimentos (saber), Habilidades (saber fazer), Atitudes (querer fazer). A competência não é apenas saber — é a entrega efetiva.

TIPOS DE COMPETÊNCIAS: Organizacionais (core competencies) = o que diferencia a organização como um todo. Funcionais = competências específicas de determinadas funções ou áreas. Individuais = competências de cada pessoa.

GAPS DE COMPETÊNCIA: diferença entre o que a organização precisa e o que os servidores têm. O processo de gestão por competências visa mapear e fechar esses gaps.

CICLO: (1) Mapeamento das competências necessárias (do planejamento estratégico para baixo); (2) Avaliação das competências existentes; (3) Identificação dos gaps; (4) Desenvolvimento (T&D, coaching, rotação de cargos); (5) Acompanhamento.

NO SETOR PÚBLICO: Decreto 9.991/2019 (Política Nacional de Desenvolvimento de Pessoas — PNDP) regulamentou a gestão por competências no Executivo Federal. Prevê: mapeamento de competências, plano de desenvolvimento individual (PDI), escola de governo.

AVALIAÇÃO DE DESEMPENHO por competências: método 360° (avaliação por pares, subordinados, chefia e autoavaliação); BARS (escalas de comportamento ancoradas); escalas gráficas; APO (por resultados).`,
    pontosChave: [
      "CHA: Conhecimentos + Habilidades + Atitudes = Competência",
      "GAP: diferença entre competência necessária e a disponível",
      "Decreto 9.991/2019: PNDP — gestão por competências no federal",
      "360°: avaliação por TODOS os ângulos (chefia, pares, subordinados, autoavaliação)",
      "Competências ORGANIZACIONAIS (core) = diferenciam a organização",
      "Competências INDIVIDUAIS = específicas de cada servidor",
    ],
    esquema: [
      "MAPEAMENTO → AVALIAÇÃO → GAP → DESENVOLVIMENTO → ACOMPANHAMENTO",
      "CHA: saber (C) + saber fazer (H) + querer fazer (A)",
    ],
    pegadinhas: [
      "Competência NÃO é apenas conhecimento — inclui habilidade e atitude",
      "360° é mais abrangente que a avaliação tradicional (só chefia), mas mais complexa",
      "Decreto 9.991 é federal — mas o conceito de gestão por competências é cobrado para o DF também",
      "Core competency (Prahalad & Hamel) = competência ORGANIZACIONAL, não individual",
    ],
    dicaQuadrix: "Gestão por competências é um dos tópicos que mais cresceu nas provas Quadrix recentes. Foco em: CHA, gap de competência, decreto 9.991 (PNDP) e os métodos de avaliação de desempenho (360°, BARS, APO).",
    referencias: ["Decreto 9.991/2019 — PNDP", "Prahalad & Hamel — The Core Competence of the Corporation"],
  },

  // ============================================================
  // AFO — ADMINISTRAÇÃO FINANCEIRA E ORÇAMENTÁRIA
  // ============================================================

  {
    id: "afo-ppa-ldo-loa",
    disciplinaId: "afo",
    topico: "Ciclo orçamentário — PPA, LDO e LOA",
    quadrixPeso: "MUITO_ALTO",
    resumo: `O processo orçamentário brasileiro é composto por três leis que se complementam e têm hierarquia entre si.

PLANO PLURIANUAL (PPA): vigência de 4 anos. Estabelece os objetivos, diretrizes e metas da Administração Pública para as despesas de capital e delas decorrentes, e para as relativas a programas de duração continuada. Elaborado no primeiro ano de mandato e vigente até o primeiro ano do mandato seguinte. É o instrumento de planejamento de médio prazo.

LEI DE DIRETRIZES ORÇAMENTÁRIAS (LDO): vigência de 1 ano. Compatibiliza o PPA com a LOA. Define: metas e prioridades da Administração para o exercício; diretrizes para elaboração da LOA; alterações na legislação tributária; metas fiscais; riscos fiscais. A LDO NÃO autoriza despesa — só direciona a elaboração da LOA.

LEI ORÇAMENTÁRIA ANUAL (LOA): vigência de 1 ano. É o instrumento legal que AUTORIZA a realização de despesas e a arrecadação de receitas. Composta por três orçamentos: fiscal, da seguridade social e de investimento das estatais. A LOA deve ser compatível com o PPA e com a LDO.

PRINCÍPIOS ORÇAMENTÁRIOS: Unidade (um único orçamento), Universalidade (todas receitas e despesas), Anualidade (vigência de 1 ano), Exclusividade (só contém matéria orçamentária, salvo exceções constitucionais), Não vinculação de receitas de impostos, Orçamento bruto (sem compensação de valores), Equilíbrio (receitas = despesas), Legalidade.`,
    pontosChave: [
      "PPA: 4 anos, objetivos e metas de médio prazo",
      "LDO: 1 ano, prioridades + metas fiscais + diretrizes para LOA",
      "LOA: 1 ano, AUTORIZA despesas (não planejamento — execução começa aqui)",
      "HIERARQUIA: PPA → LDO → LOA (nenhuma pode contrariar a anterior)",
      "LDO NÃO autoriza despesa — apenas direciona a elaboração da LOA",
      "PRINCÍPIO DA EXCLUSIVIDADE: LOA só trata de matéria orçamentária",
    ],
    esquema: [
      "PPA (4 anos): PLANEJAR no médio prazo",
      "LDO (1 ano): DIRECIONAR a elaboração da LOA",
      "LOA (1 ano): AUTORIZAR a execução",
    ],
    pegadinhas: [
      "PPA vigora 4 anos, mas é elaborado no 1º ano de mandato → vence no 1º ano do mandato seguinte",
      "LDO não autoriza despesa — esse papel é da LOA",
      "LOA autoriza mas não OBRIGA gastos — é limite máximo, não mínimo",
      "O princípio da ANUALIDADE significa vigência de 1 ano (não que só pode ser aprovado anualmente)",
      "PRINCÍPIO DA EXCLUSIVIDADE: LOA não pode ter dispositivos estranhos ao orçamento, salvo autorização de créditos suplementares e ARO",
    ],
    dicaQuadrix: "Quadrix sempre testa a distinção entre PPA, LDO e LOA em questão de aplicação: 'Qual instrumento estabelece as metas fiscais e direciona a elaboração do orçamento anual?' (LDO). Ou: 'O orçamento que autoriza a realização de despesas no exercício é o...' (LOA).",
    referencias: ["CF/88 — arts. 165-169", "Lei 4.320/1964", "Lei Complementar 101/2000 (LRF)"],
  },

  {
    id: "afo-despesa",
    disciplinaId: "afo",
    topico: "Despesa pública — categorias e estágios",
    quadrixPeso: "MUITO_ALTO",
    resumo: `A despesa pública é o conjunto de dispêndios realizados pela Administração para custear os serviços públicos e realizar investimentos.

CATEGORIAS ECONÔMICAS: Despesas Correntes (manutenção das atividades): Pessoal e Encargos, Juros e Encargos da Dívida, Outras Despesas Correntes (custeio, transferências correntes). Despesas de Capital (investimentos): Investimentos, Inversões Financeiras, Amortização da Dívida.

ESTÁGIOS DA DESPESA (ORDEM OBRIGATÓRIA):
1. FIXAÇÃO (ou dotação): a despesa é autorizada pela LOA (nem sempre é listada como estágio propriamente dito)
2. EMPENHO: ato pelo qual a autoridade competente cria para o Estado a obrigação de pagamento pendente de condição. É a RESERVA de dotação orçamentária. Produz o documento "nota de empenho" (NE). Tipos: ordinário (montante certo e determinado), estimativo (montante não determinado com precisão), global (contrato).
3. LIQUIDAÇÃO: verificação do direito adquirido pelo credor, tendo por base documentos comprobatórios da entrega do bem ou serviço. O Estado verifica se o que foi contratado foi de fato entregue.
4. PAGAMENTO: despacho que determina a entrega do numerário ao credor. É o último estágio — extingue a obrigação.

RESTOS A PAGAR: despesas empenhadas mas não pagas no exercício. PROCESSADOS: empenhados E liquidados — o Estado reconhece a dívida. NÃO PROCESSADOS: empenhados mas não liquidados — o Estado ainda não verificou a entrega.`,
    pontosChave: [
      "ORDEM: Empenho → Liquidação → Pagamento",
      "EMPENHO: reserva orçamentária / nota de empenho (NE)",
      "LIQUIDAÇÃO: verificação da entrega do bem/serviço",
      "PAGAMENTO: extinção da obrigação / entrega do dinheiro",
      "RESTOS A PAGAR PROCESSADOS: empenhado + liquidado, não pago",
      "RESTOS A PAGAR NÃO PROCESSADOS: empenhado, não liquidado",
    ],
    esquema: [
      "EMPENHO: 'Vou gastar com X' → reserva a dotação",
      "LIQUIDAÇÃO: 'X foi entregue conforme combinado' → verifica a entrega",
      "PAGAMENTO: 'Aqui está o dinheiro de X' → extingue a obrigação",
    ],
    pegadinhas: [
      "'Em qual estágio o Estado reconhece a entrega do bem?' — LIQUIDAÇÃO",
      "'Em qual estágio é criada a obrigação de pagamento?' — EMPENHO",
      "'Despesa empenhada e liquidada, mas não paga no final do ano' = Restos a Pagar PROCESSADO",
      "Empenho NÃO é pagamento — apenas reserva a dotação",
      "Pode haver empenho sem liquidação? SIM (estimativo, por ex.) — mas não pode haver pagamento sem liquidação",
    ],
    dicaQuadrix: "Os estágios da despesa caem em TODA prova de AFO do Quadrix. Questão típica: 'O gestor verificou que os móveis adquiridos foram entregues conforme especificado. Qual estágio da despesa está sendo realizado?' (LIQUIDAÇÃO). Ou: 'A criação da obrigação de pagamento, decorrente de contrato assinado, corresponde a qual estágio?' (EMPENHO).",
    referencias: ["Lei 4.320/1964 — arts. 58-64", "Lei Complementar 101/2000"],
  },

  {
    id: "afo-lrf",
    disciplinaId: "afo",
    topico: "Lei de Responsabilidade Fiscal — LRF (LC 101/2000)",
    quadrixPeso: "MUITO_ALTO",
    resumo: `A Lei de Responsabilidade Fiscal (LC 101/2000) estabelece normas de finanças públicas voltadas para a responsabilidade na gestão fiscal. Seus pilares são: planejamento, transparência, controle e responsabilidade.

RECEITA CORRENTE LÍQUIDA (RCL): somatório das receitas tributárias, de contribuições, patrimoniais, industriais, agropecuárias, de serviços, transferências correntes e outras receitas correntes, deduzidos transferências constitucionais e legais, contribuições ao RPPS e RGPS.

LIMITES DE GASTOS COM PESSOAL: União: 50% da RCL. Estados, Municípios e DF: 60% da RCL. O DF é equiparado a Estado e Município — limite é 60%.

RELATÓRIOS OBRIGATÓRIOS: Relatório Resumido da Execução Orçamentária (RREO): publicado bimestralmente. Relatório de Gestão Fiscal (RGF): publicado quadrimestralmente.

VEDAÇÕES EM ANO ELEITORAL: a LRF proíbe, no último semestre do mandato, aumentos de gastos com pessoal, concessão de vantagens, criação de cargos, emissão de títulos sem aprovação legislativa.

RESULTADO PRIMÁRIO vs. NOMINAL: Resultado primário = receitas menos despesas, excluindo encargos da dívida. Resultado nominal = receitas menos despesas, incluindo encargos. É o resultado primário que mede a capacidade de o governo pagar sua dívida.`,
    pontosChave: [
      "LIMITE PESSOAL: União = 50% RCL; Estados/Municípios/DF = 60% RCL",
      "RREO: publicado BIMESTRALMENTE",
      "RGF: publicado QUADRIMESTRALMENTE",
      "LRF = LC 101/2000 (não é lei ordinária — é lei COMPLEMENTAR)",
      "DF: limite de pessoal = 60% (equiparado a Estado/Município)",
    ],
    esquema: [
      "50% RCL → UNIÃO",
      "60% RCL → ESTADOS, MUNICÍPIOS e DF",
      "RREO: bimestral (a cada 2 meses)",
      "RGF: quadrimestral (a cada 4 meses)",
    ],
    pegadinhas: [
      "DF: 50% ou 60%? → 60% (equiparado a Estado/Município)",
      "RREO é bimestral (6 vezes por ano); RGF é quadrimestral (3 vezes por ano)",
      "LRF é LEI COMPLEMENTAR — não pode ser alterada por lei ordinária",
      "Resultado PRIMÁRIO exclui encargos da dívida; NOMINAL inclui — são diferentes",
    ],
    dicaQuadrix: "Quadrix adora a confusão entre o limite da União (50%) e de estados/municípios (60%). Também testa qual relatório é bimestral (RREO) e qual é quadrimestral (RGF). Para o DF, o limite é 60% — candidatos erram por pensar que o DF, por ser diferenciado, teria limite menor.",
    referencias: ["LC 101/2000 — LRF", "CF/88 — art. 169"],
  },

  // ============================================================
  // OS&M E QUALIDADE
  // ============================================================

  {
    id: "osm-qualidade",
    disciplinaId: "osm",
    topico: "Gestão da qualidade — PDCA, 5S, Six Sigma, ferramentas",
    quadrixPeso: "MUITO_ALTO",
    resumo: `A gestão da qualidade abrange um conjunto de ferramentas e técnicas para melhorar continuamente os processos e resultados.

CICLO PDCA (Deming/Shewhart): P (Plan/Planejar): identificar o problema, analisar causas, definir ações corretivas. D (Do/Executar): implementar as ações planejadas. C (Check/Verificar): monitorar os resultados e comparar com o planejado. A (Act/Agir): padronizar se deu certo (SDCA — o ciclo de manutenção); ou replanejar se não deu. SDCA = ciclo de manutenção do padrão atingido.

5S (metodologia japonesa de organização): (1) SEIRI (Utilização): eliminar o desnecessário; (2) SEITON (Organização): um lugar para cada coisa, cada coisa em seu lugar; (3) SEISOU (Limpeza): manter o ambiente limpo; (4) SEIKETSU (Padronização/Saúde): padronizar os três primeiros S; (5) SHITSUKE (Disciplina): manter os padrões por autodisciplina.

SIX SIGMA: metodologia focada na redução de defeitos e variabilidade. Meta: 3,4 defeitos por milhão de oportunidades. Ciclo DMAIC: Definir, Medir, Analisar, Melhorar (Improve), Controlar.

FERRAMENTAS DA QUALIDADE: Diagrama de Ishikawa (espinha de peixe): causa-efeito, identifica as causas raiz de um problema (6Ms: Método, Máquina, Mão de obra, Material, Meio ambiente, Medição). Diagrama de Pareto: 80% dos efeitos são causados por 20% das causas — priorização. Histograma: distribuição de frequência. Carta de controle: monitoramento de processos ao longo do tempo.

ISO 9001: norma internacional de sistema de gestão da qualidade. Foco em satisfação do cliente e melhoria contínua. Baseia-se no ciclo PDCA.`,
    pontosChave: [
      "PDCA: Plan → Do → Check → Act (ciclo de melhoria contínua)",
      "SDCA: Standardize → Do → Check → Act (ciclo de MANUTENÇÃO do padrão)",
      "5S: Utilização → Organização → Limpeza → Padronização → Disciplina",
      "SIX SIGMA: 3,4 defeitos/milhão; ciclo DMAIC",
      "ISHIKAWA: causa-efeito, 6Ms (método, máquina, mão de obra, material, meio, medição)",
      "PARETO: 80% dos problemas têm 20% das causas — priorize os 20%",
    ],
    esquema: [
      "PDCA: planejar → fazer → checar → agir (melhoria)",
      "SDCA: padronizar → fazer → checar → agir (manutenção)",
      "5S: eliminar → organizar → limpar → padronizar → disciplinar",
      "DMAIC: definir → medir → analisar → melhorar → controlar",
    ],
    pegadinhas: [
      "PDCA ≠ SDCA: PDCA é para MELHORIA; SDCA é para manter o padrão já alcançado",
      "No PDCA, o 'A' de Act pode significar padronizar (se deu certo) OU replanejar (se não deu)",
      "5S: o QUARTO S (Seiketsu) é padronização, não saúde (embora seja traduzido como 'senso de saúde' em algumas versões)",
      "Diagrama de Pareto: mostra prioridades — não mostra causas (isso é Ishikawa)",
      "Six Sigma DMAIC é para MELHORAR processo existente; DMADV é para criar processo novo",
    ],
    dicaQuadrix: "PDCA é garantido em toda prova. Questão típica: 'O gestor identificou desvios nos indicadores de atendimento e convocou equipe para replanejar as ações. Em qual fase do PDCA está?' (Plan ou Act, dependendo do contexto). Para 5S: identifica a fase a partir de um exemplo concreto.",
    referencias: ["Deming — Out of the Crisis", "ABNT NBR ISO 9001:2015"],
  },

  {
    id: "osm-bsc",
    disciplinaId: "osm",
    topico: "Balanced Scorecard (BSC) e indicadores de desempenho",
    quadrixPeso: "MUITO_ALTO",
    resumo: `O BSC (Kaplan e Norton, 1992) é uma ferramenta de gestão estratégica que traduz a visão e a estratégia da organização em objetivos, indicadores, metas e iniciativas, distribuídos em quatro perspectivas com relação de causa e efeito.

4 PERSPECTIVAS DO BSC:
(1) FINANCEIRA: resultados econômico-financeiros. Para o setor público, pode ser substituída por perspectiva de 'eficiência no uso dos recursos públicos' ou 'cumprimento do orçamento'. Pergunta: "Como devemos aparecer perante nossos financiadores?"
(2) CLIENTES (ou cidadãos no setor público): satisfação e relacionamento com usuários. Pergunta: "Como devemos aparecer perante nossos clientes/usuários?"
(3) PROCESSOS INTERNOS: excelência nos processos críticos. Pergunta: "Em quais processos devemos ter excelência para satisfazer clientes e atingir resultados financeiros?"
(4) APRENDIZADO E CRESCIMENTO: capacidade organizacional — pessoas, sistemas, cultura. É a BASE do BSC. Pergunta: "Como devemos aprender e melhorar para criar valor?"

RELAÇÃO DE CAUSA E EFEITO (de baixo para cima): Aprendizado e Crescimento → Processos Internos → Clientes → Financeiro.

MAPA ESTRATÉGICO: representação visual das relações de causa e efeito entre os objetivos estratégicos nas 4 perspectivas.

INDICADORES: Lead (indicadores de tendência/causa — antecipam o resultado) vs. Lag (indicadores de resultado/efeito — medem o que já aconteceu). Ex: horas de treinamento (lead) vs. índice de satisfação dos usuários (lag).

INDICADORES DE DESEMPENHO: Eficácia (atingimento do objetivo), Eficiência (relação resultado/recursos), Efetividade (impacto na sociedade), Economicidade (uso otimizado dos recursos).`,
    pontosChave: [
      "BSC: 4 perspectivas — Financeira, Clientes, Processos, Aprendizado",
      "BASE do BSC: Aprendizado e Crescimento (não Financeira)",
      "TOPO do BSC: Financeiro (resultado final)",
      "CAUSA → EFEITO: Aprendizado → Processos → Clientes → Financeiro",
      "INDICADOR LEAD: antecedente/causa (previsivo)",
      "INDICADOR LAG: resultado/efeito (histórico)",
      "MAPA ESTRATÉGICO: visualiza as relações de causa e efeito",
    ],
    esquema: [
      "RESULTADO (Financeiro) ← CLIENTES ← PROCESSOS ← BASE (Aprendizado)",
      "LEAD: prediz o futuro | LAG: registra o passado",
      "Eficácia = atingiu o objetivo? | Eficiência = com quais recursos? | Efetividade = qual impacto?",
    ],
    pegadinhas: [
      "A perspectiva FINANCEIRA é o RESULTADO, não a base",
      "A perspectiva APRENDIZADO é a BASE, não o resultado",
      "BSC não é apenas 'financeiro' — é o EQUILÍBRIO entre as 4 perspectivas",
      "Indicador LEAD não é sempre 'mais importante' — depende do objetivo",
      "No SETOR PÚBLICO: perspectiva de clientes geralmente vem ANTES da financeira (missão vem primeiro)",
    ],
    dicaQuadrix: "BSC cai em toda prova de Administração do Quadrix — sem exceção. Foco em: identificar a perspectiva a partir de um exemplo, saber que aprendizado é a base e financeiro é o topo, e distinguir lead de lag.",
    referencias: ["Kaplan & Norton — The Balanced Scorecard", "ENAP — Balanced Scorecard na Gestão Pública"],
  },

  // ============================================================
  // SUAS / LOAS / LEGISLAÇÃO SOCIOASSISTENCIAL
  // ============================================================

  {
    id: "suas-loas",
    disciplinaId: "suas-fund",
    topico: "LOAS, PNAS/2004 e SUAS — fundamentos",
    quadrixPeso: "MUITO_ALTO",
    resumo: `A assistência social brasileira é estruturada por três marcos normativos complementares: LOAS, PNAS e SUAS.

LOAS (Lei 8.742/1993 — Lei Orgânica da Assistência Social): direito do cidadão e dever do Estado. Política de seguridade social não contributiva, que provê os mínimos sociais. OBJETIVOS: proteção à família, à maternidade, à infância, à adolescência e à velhice; amparo às crianças e adolescentes carentes; promoção da integração ao mercado de trabalho; habilitação e reabilitação de PcD; garantia de BPC ao idoso e ao deficiente.

PRINCÍPIOS da Assistência Social (LOAS): Supremacia do atendimento às necessidades sociais sobre as exigências de rentabilidade econômica; Universalização dos direitos sociais; Respeito à dignidade do cidadão, à sua autonomia e ao seu direito a benefícios e serviços; Igualdade de direitos no acesso ao atendimento; Divulgação ampla dos benefícios, serviços, programas e projetos.

PNAS/2004 (Política Nacional de Assistência Social): operacionaliza a LOAS. Define: proteção social básica (prevenir situações de risco) e proteção social especial (atender famílias/indivíduos com direitos violados). Nível de complexidade da proteção especial: média complexidade (violação sem rompimento familiar — CREAS) e alta complexidade (necessidade de acolhimento — afasta da família).

SEGURANÇAS SOCIOASSISTENCIAIS (PNAS): acolhida; convívio e vivência familiar e comunitária; renda e sustento autônomo; apoio e auxílio; desenvolvimento da autonomia.

SUAS: sistema descentralizado e participativo que organiza os serviços, benefícios e ações da Assistência Social. Princípios: territorialização, matricialidade sociofamiliar, descentralização político-administrativa, financiamento partilhado, controle social, qualificação de recursos humanos.`,
    pontosChave: [
      "LOAS: direito NÃO CONTRIBUTIVO (não exige contribuição prévia)",
      "PROTEÇÃO BÁSICA: CRAS → previne situações de risco",
      "PROTEÇÃO ESPECIAL MÉDIA: CREAS → violação sem rompimento familiar",
      "PROTEÇÃO ESPECIAL ALTA: Acolhimento institucional → rompimento ou ameaça de rompimento",
      "MATRICIALIDADE SOCIOFAMILIAR: família é o centro das ações",
      "5 SEGURANÇAS: acolhida, convívio, renda, apoio/auxílio, autonomia",
    ],
    esquema: [
      "BÁSICA (CRAS): prevenir → famílias vulneráveis (sem violação)",
      "ESPECIAL MÉDIA (CREAS): atender → violação de direitos, vínculo familiar preservado",
      "ESPECIAL ALTA: acolher → rompimento ou ameaça de rompimento familiar",
    ],
    pegadinhas: [
      "Assistência social NÃO exige contribuição prévia (diferente da Previdência Social)",
      "CRAS é básica (PAIF, SCFV) — CREAS é especial de média complexidade",
      "Alta complexidade NÃO significa que a situação é 'mais grave' apenas — significa que há necessidade de ACOLHIMENTO (afastamento da família)",
      "A PNAS é de 2004, não de 1993 — a LOAS é de 1993",
    ],
    dicaQuadrix: "A distinção proteção básica × especial (média × alta) é a questão mais cobrada do bloco SUAS. Memorize: básica = prevenção (CRAS), especial média = atendimento com vínculo familiar (CREAS), especial alta = acolhimento (unidades de acolhimento). O Quadrix apresenta uma situação e pede o nível de proteção adequado.",
    referencias: ["LOAS — Lei 8.742/1993", "PNAS/2004 — Resolução CNAS 145/2004", "NOB-SUAS 2012"],
  },

  {
    id: "suas-tipificacao",
    disciplinaId: "suas-fund",
    topico: "Tipificação Nacional de Serviços Socioassistenciais — serviços por nível de proteção",
    quadrixPeso: "ALTO",
    resumo: `A Tipificação Nacional de Serviços Socioassistenciais (Resolução CNAS 109/2009) organiza os serviços do SUAS por nível de proteção.

PROTEÇÃO SOCIAL BÁSICA (PSB) — ofertados no CRAS:
• PAIF (Serviço de Proteção e Atendimento Integral à Família): trabalho social continuado com famílias em situação de vulnerabilidade, visando prevenir situações de risco. É obrigatório em todo CRAS.
• SCFV (Serviço de Convivência e Fortalecimento de Vínculos): complementar ao PAIF, em grupo, por faixa etária. Para crianças (0-6 e 6-15), adolescentes (15-17), jovens e adultos, idosos.
• Serviço de Proteção Social Básica no Domicílio para PcD e idosos.

PROTEÇÃO SOCIAL ESPECIAL DE MÉDIA COMPLEXIDADE — ofertados no CREAS:
• PAEFI (Serviço de Proteção e Atendimento Especializado a Famílias e Indivíduos): atende famílias com direitos violados, mas sem rompimento do vínculo familiar.
• Serviço Especializado em Abordagem Social: equipes em espaços públicos para localizar populações em situação de rua e encaminhá-las à rede.
• Serviço de Proteção Social a Adolescentes em Cumprimento de Medida Socioeducativa (LA e PSC).
• Serviço de Proteção Social Especial para PcD e idosos.

PROTEÇÃO SOCIAL ESPECIAL DE ALTA COMPLEXIDADE:
• Serviço de Acolhimento Institucional: crianças e adolescentes, adultos e famílias, mulheres em situação de violência doméstica, jovens entre 18 e 21 anos, idosos, PcD. Modalidades: abrigo institucional, casa-lar, casa de passagem, república.
• Serviço de Acolhimento em República: para adultos em processo de saída das ruas.
• Serviço de Acolhimento em Família Acolhedora: alternativa ao acolhimento institucional para crianças.
• Serviço de Proteção em Situações de Calamidades Públicas e de Emergências.`,
    pontosChave: [
      "CRAS: PAIF (obrigatório) + SCFV (por faixa etária)",
      "CREAS: PAEFI (famílias com direitos violados) + Abordagem Social",
      "ALTA COMPLEXIDADE: acolhimento (afastamento provisório da família)",
      "SCFV: por faixa etária — crianças (0-6 e 6-15), adolescentes, jovens, adultos, idosos",
      "Família Acolhedora: alternativa à acolhida institucional para crianças",
      "República: para adultos em saída das ruas — provisório",
    ],
    esquema: [
      "BÁSICA (CRAS): PAIF + SCFV",
      "ESPECIAL MÉDIA (CREAS): PAEFI + Abordagem Social + MSE (LA/PSC)",
      "ESPECIAL ALTA: Acolhimento + República + Família Acolhedora",
    ],
    pegadinhas: [
      "PAIF é o serviço OBRIGATÓRIO do CRAS — não pode faltar",
      "Abordagem Social é de MÉDIA complexidade (CREAS) — não confunda com alta",
      "Medida socioeducativa de Internação é do sistema socioeducativo, não do SUAS diretamente",
      "LA (Liberdade Assistida) e PSC (Prestação de Serviço à Comunidade) são MSE de meio aberto → CREAS",
    ],
    dicaQuadrix: "Quadrix apresenta um serviço e pede onde deve ser ofertado (CRAS ou CREAS). Ou apresenta uma situação e pede qual serviço é adequado. Mais cobrado: PAIF (CRAS), PAEFI (CREAS), Abordagem Social (CREAS — média), Acolhimento Institucional (alta complexidade).",
    referencias: ["Resolução CNAS 109/2009 — Tipificação Nacional", "NOB-SUAS 2012"],
  },

  {
    id: "suas-nob",
    disciplinaId: "suas-fund",
    topico: "NOB-SUAS 2012 — responsabilidades dos entes e cofinanciamento",
    quadrixPeso: "ALTO",
    resumo: `A Norma Operacional Básica do SUAS (NOB/SUAS 2012 — Resolução CNAS 33/2012) regulamenta a gestão do SUAS, definindo responsabilidades, instrumentos de gestão, financiamento e sistema de informação.

RESPONSABILIDADES POR ENTE FEDERADO:
UNIÃO: coordenar e regulamentar o SUAS em âmbito nacional; financiar os serviços (cofinanciar); prestar assessoria técnica; normatizar; organizar e coordenar o sistema de informação; manter o BPC.

ESTADOS: cofinanciar serviços; prestar apoio técnico aos municípios de menor capacidade; executar serviços de proteção social especial de alta complexidade nos municípios não habilitados; coordenar o SUAS em nível estadual.

MUNICÍPIOS E DF: executar serviços e programas de proteção social básica e especial; gerir a rede local; inserir dados no sistema de informação (REDE SUAS/SIBEC); cofinanciar; gerir o Fundo Municipal de Assistência Social.

COFINANCIAMENTO: divide-se entre União, Estados e Municípios. Feito por meio de pisos: Piso de Proteção Social Básica (PPSB) — para CRAS e serviços básicos. Piso de Proteção Social Especial de Média e Alta Complexidade — para CREAS e serviços especiais. O modelo é "fundo a fundo" (recursos do Fundo Nacional vão direto para os fundos estaduais e municipais).

HABILITAÇÃO DOS MUNICÍPIOS: municípios habilitados em gestão básica podem executar apenas PSB; habilitados em gestão plena executam PSB e PSE.

VIGILÂNCIA SOCIOASSISTENCIAL: subsistema do SUAS que produz diagnósticos sobre vulnerabilidades e riscos no território, orientando o planejamento das ações.`,
    pontosChave: [
      "UNIÃO: coordenar, normatizar, cofinanciar, manter o BPC",
      "ESTADOS: apoio técnico, cofinanciar, executar PSE alta nos municípios não habilitados",
      "MUNICÍPIOS/DF: executar os serviços, gerir a rede local, gerir o Fundo Municipal",
      "COFINANCIAMENTO: fundo a fundo (FNS → FEAS → FMAS)",
      "VIGILÂNCIA SOCIOASSISTENCIAL: diagnóstico territorial",
      "HABILITAÇÃO BÁSICA: só PSB; PLENA: PSB + PSE",
    ],
    esquema: [
      "UNIÃO → coordena e normatiza o todo",
      "ESTADO → apoia os municípios menores e executa PSE alta quando município não consegue",
      "MUNICÍPIO/DF → executa na ponta (CRAS e CREAS)",
    ],
    pegadinhas: [
      "Execução dos serviços é do MUNICÍPIO — não da União",
      "BPC é mantido pela UNIÃO — não pelo município",
      "Estados podem executar PSE alta complexidade quando municípios não têm capacidade",
      "Vigilância socioassistencial = diagnóstico territorial (não é controle social — isso são os Conselhos)",
    ],
    dicaQuadrix: "Quadrix pergunta qual ente tem qual responsabilidade. Foque nos casos onde a responsabilidade não é óbvia: Estado executando serviços de alta complexidade (quando município não tem capacidade) e BPC sendo mantido pela União.",
    referencias: ["Resolução CNAS 33/2012 — NOB-SUAS", "Lei 8.742/1993 — LOAS"],
  },

  {
    id: "suas-mrosc",
    disciplinaId: "suas-fund",
    topico: "MROSC — Lei 13.019/2014 e parcerias com OSC",
    quadrixPeso: "ALTO",
    resumo: `O Marco Regulatório das Organizações da Sociedade Civil (MROSC — Lei 13.019/2014) regulamenta as parcerias entre a Administração Pública e as Organizações da Sociedade Civil (OSC).

INSTRUMENTOS DE PARCERIA:
• TERMO DE COLABORAÇÃO: proposto pela Administração Pública; OSC executa o plano de trabalho. Exige chamamento público (salvo exceções). Para ações decorrentes de programas e projetos da Administração.
• TERMO DE FOMENTO: proposto pela OSC; Administração apoia financeiramente a iniciativa da sociedade civil. Exige chamamento público (salvo exceções).
• ACORDO DE COOPERAÇÃO: sem repasse financeiro. Pode dispensar o chamamento público.

QUEM PROPÕE?
- Administração propõe → Termo de COLABORAÇÃO
- OSC propõe → Termo de FOMENTO
(Mnemônico: Colaboração = Governo Colabora com a OSC = Governo propõe)

CHAMAMENTO PÚBLICO: regra geral obrigatória para Termos de Colaboração e Fomento. Objetivo: selecionar a OSC mais adequada de forma isonômica e transparente.

OBRIGAÇÕES DA OSC: prestação de contas; acompanhamento e avaliação; inserção de dados no SICONV; transparência na execução.

COMISSÃO DE MONITORAMENTO E AVALIAÇÃO: responsável por monitorar a execução das parcerias, avaliar o cumprimento do objeto, propor ações corretivas.

VEDAÇÕES IMPORTANTES: é vedado utilizar recursos de parceria para pagamento de salários do dirigente da OSC; para pagamento de taxas bancárias (exceto quando previsto); para finalidades alheias ao objeto da parceria.`,
    pontosChave: [
      "COLABORAÇÃO: Administração propõe → OSC executa",
      "FOMENTO: OSC propõe → Administração financia",
      "ACORDO DE COOPERAÇÃO: sem repasse financeiro",
      "CHAMAMENTO PÚBLICO: obrigatório (salvo dispensa/inexigibilidade)",
      "Prestação de contas: obrigatória nas parcerias com transferência de recursos",
    ],
    esquema: [
      "Governo propõe → COLABORAÇÃO",
      "OSC propõe → FOMENTO",
      "Sem dinheiro → ACORDO DE COOPERAÇÃO",
    ],
    pegadinhas: [
      "Termo de FOMENTO: quem propõe é a OSC, não o governo",
      "Acordo de cooperação pode dispensar chamamento público (sem repasse financeiro)",
      "MROSC aplica-se a OSC — não a consórcios públicos ou entidades privadas com fins lucrativos",
      "O dirigente da OSC não pode usar os recursos parceiros para remunerar a si mesmo",
    ],
    dicaQuadrix: "Quadrix cobra a distinção entre Colaboração e Fomento pelo critério de QUEM PROPÕE. Questão típica: 'A SEDES identificou necessidade de ampliar atendimento em CRAS e selecionou OSC para executar o plano. Qual instrumento de parceria deve ser utilizado?' (Termo de Colaboração — Administração propõe).",
    referencias: ["Lei 13.019/2014 — MROSC", "Decreto 8.726/2016 (regulamentação federal)"],
  },

  {
    id: "suas-instancias",
    disciplinaId: "suas-fund",
    topico: "Instâncias de pactuação e controle social — CIT, CIB, Conselhos, Conferências",
    quadrixPeso: "MEDIO",
    resumo: `O SUAS conta com instâncias específicas de pactuação (negociação entre gestores) e controle social (participação da sociedade civil).

INSTÂNCIAS DE PACTUAÇÃO:
CIT (Comissão Intergestores Tripartite): âmbito nacional; composta por representantes da União (MDS), estados (FONSEAS) e municípios (CONGEMAS). Pactua critérios de partilha, habilitação, financiamento.
CIB (Comissão Intergestores Bipartite): âmbito estadual; composta por representantes do Estado e dos Municípios. Pactua questões de âmbito estadual.

INSTÂNCIAS DE DELIBERAÇÃO E CONTROLE SOCIAL:
CNAS (Conselho Nacional de Assistência Social): âmbito federal; composição paritária (governo + sociedade civil). Principal função: deliberar sobre a Política Nacional, aprovar o Plano Decenal.
Conselhos Estaduais (CEAS) e Municipais (CMAS): controlam a execução da política nos seus âmbitos; aprovam planos; fiscalizam recursos.
FNAS, FEAS, FMAS: Fundos de Assistência Social que recebem e distribuem os recursos.
CONFERÊNCIAS: espaço de avaliação e proposição da política, com participação da sociedade. Ocorrem a cada 4 anos nos três níveis (municipal, estadual e nacional).

DIFERENÇA FUNDAMENTAL:
CIT/CIB = PACTUAÇÃO entre GESTORES (União, estados, municípios)
Conselhos = CONTROLE SOCIAL (participação da sociedade civil + governo)`,
    pontosChave: [
      "CIT: tripartite — União + Estados + Municípios; pactuação NACIONAL",
      "CIB: bipartite — Estado + Municípios; pactuação ESTADUAL",
      "CNAS/CEAS/CMAS: controle social — paridade governo + sociedade civil",
      "CONFERÊNCIAS: avaliação e proposição — a cada 4 anos",
      "DIFERENÇA: CIT/CIB pactuam entre gestores; Conselhos controlam com a sociedade",
    ],
    esquema: [
      "PACTUAÇÃO: CIT (nacional, tripartite) / CIB (estadual, bipartite)",
      "CONTROLE SOCIAL: Conselhos (CNAS/CEAS/CMAS) / Conferências",
    ],
    pegadinhas: [
      "CIT é TRIPARTITE (3 entes); CIB é BIPARTITE (2 entes — estado e municípios)",
      "Conselhos têm função DELIBERATIVA e de controle (não apenas consultiva)",
      "Conferência: a cada 4 anos (não anual)",
      "CNAS está na esfera FEDERAL (não municipal)",
    ],
    dicaQuadrix: "Questão mais cobrada: distinguir CIT de CIB (tripartite vs. bipartite) e distinguir CIT/CIB (gestores) de Conselhos (controle social). O Quadrix apresenta uma ação (ex: 'aprovar critérios de partilha dos recursos federais') e pede qual instância é responsável (CIT, pois é nacional e tripartite).",
    referencias: ["NOB-SUAS 2012 — Cap. IV", "Lei 8.742/1993 — art. 17 (CNAS)"],
  },

  {
    id: "direitos-eca",
    disciplinaId: "direitos",
    topico: "ECA, SINASE e direitos de crianças e adolescentes",
    quadrixPeso: "ALTO",
    resumo: `O Estatuto da Criança e do Adolescente (ECA — Lei 8.069/1990) regulamenta os direitos de crianças (até 12 anos incompletos) e adolescentes (12 a 18 anos).

DOUTRINA DA PROTEÇÃO INTEGRAL: a criança e o adolescente são sujeitos de direitos, não objetos de tutela. Todos os direitos fundamentais reconhecidos aos adultos, mais direitos especiais decorrentes da condição peculiar de pessoa em desenvolvimento.

PRINCÍPIO DA PRIORIDADE ABSOLUTA: preferência na formulação de políticas, destinação privilegiada de recursos, primazia de socorro e proteção. QUEM DEVE GARANTIR: família, sociedade e Estado (conjuntamente — Doutrina da Co-responsabilidade).

CONVIVÊNCIA FAMILIAR E COMUNITÁRIA: toda criança tem direito à convivência com sua família. O afastamento familiar só é admitido em situação excepcional, como último recurso, por período mais breve possível. Medidas: encaminhamento para família extensa, família acolhedora, acolhimento institucional.

SINASE (Lei 12.594/2012): Sistema Nacional de Atendimento Socioeducativo. Medidas socioeducativas (para adolescentes em conflito com a lei): (1) ADVERTÊNCIA; (2) OBRIGAÇÃO DE REPARAR O DANO; (3) PRESTAÇÃO DE SERVIÇOS À COMUNIDADE (PSC); (4) LIBERDADE ASSISTIDA (LA); (5) SEMILIBERDADE; (6) INTERNAÇÃO. Princípio: a medida deve ter caráter educativo, não punitivo. Internação: máximo 3 anos para adolescentes.

ESTATUTO DIGITAL (Lei 14.811/2024): proteção de crianças e adolescentes no ambiente digital — combate ao bullying, cyberbullying, pornografia infantil digital, grooming.`,
    pontosChave: [
      "Criança: até 12 anos incompletos; Adolescente: 12 a 18 anos",
      "PROTEÇÃO INTEGRAL: sujeitos de direitos + direitos especiais",
      "PRIORIDADE ABSOLUTA: família + sociedade + Estado (co-responsabilidade)",
      "Afastamento familiar: EXCEPCIONAL, último recurso",
      "SINASE: 6 medidas socioeducativas (advertência, reparação, PSC, LA, semiliberdade, internação)",
      "Internação: máximo 3 anos",
    ],
    esquema: [
      "Medidas em MEIO ABERTO: advertência, reparação, PSC, LA",
      "Medidas em MEIO FECHADO: semiliberdade, internação",
    ],
    pegadinhas: [
      "Adolescente com menos de 18 anos NÃO vai para presídio — vai para unidade socioeducativa",
      "INTERNAÇÃO: prazo máximo 3 anos (não ilimitado); liberação compulsória aos 21 anos",
      "PSC e LA são cumpridas em MEIO ABERTO — o adolescente não é retirado do convívio",
      "ECA se aplica a TODOS — ricos, pobres, filhos de qualquer família",
    ],
    dicaQuadrix: "Foco nas medidas socioeducativas (em especial a distinção meio aberto × meio fechado) e na doutrina da proteção integral. Para esta prova, o SINASE é relevante no contexto da proteção social especial de média complexidade (PSC e LA são acompanhadas pelo CREAS).",
    referencias: ["Lei 8.069/1990 — ECA", "Lei 12.594/2012 — SINASE", "Lei 14.811/2024 — Estatuto Digital"],
  },

  {
    id: "programas-df-todos",
    disciplinaId: "programas-df",
    topico: "Programas socioassistenciais do DF — Cartão Prato Cheio, Cartão Gás, DF Social, Benefícios Eventuais, SISAN",
    quadrixPeso: "ALTO",
    resumo: `Os programas do DF são específicos deste edital e devem ser estudados a partir das leis indicadas.

CARTÃO PRATO CHEIO (Lei 7.009/2021 e Decreto 42.873/2021): programa de provimento alimentar direto em caráter emergencial. Beneficiários: famílias em situação de extrema pobreza (renda per capita inferior a 1/4 do salário mínimo) inscritas no CadÚnico. Gestor: SEDES. Benefício: pecúnio mensal para aquisição de alimentos.

CARTÃO GÁS (Lei 6.938/2021 e Decreto 42.376/2021): auxílio para aquisição de GLP (gás de cozinha). Beneficiários: famílias inscritas no CadÚnico com baixa renda. Gestão: SEDES em parceria com AGEFIS.

PLANO DF SOCIAL (Lei 7.008/2021, Decreto 42.872/2021, Portaria 42/2023): política pública de desenvolvimento social do DF, articulando programas e projetos de assistência social, segurança alimentar, geração de renda e inclusão produtiva. Integra ações de diversas secretarias.

BENEFÍCIOS EVENTUAIS (Lei 5.165/2013 e Decreto 35.191/2014): benefícios assistenciais de caráter suplementar e temporário. Destinados a famílias em situação de vulnerabilidade temporária decorrente de: nascimento (natalidade), morte (funeral), vulnerabilidade temporária (perda de renda, acidente), calamidade pública. Diferem dos benefícios contínuos (como BPC): são episódicos, não mensais.

SISAN / RESTAURANTE COMUNITÁRIO (Seção II do Decreto 33.329/2011): Sistema Nacional de Segurança Alimentar e Nutricional no DF. Restaurantes Comunitários: equipamentos públicos que ofertam refeições nutritivas a preços acessíveis para famílias em vulnerabilidade alimentar. Integram a política de segurança alimentar junto com Bancos de Alimentos e Cozinhas Comunitárias.`,
    pontosChave: [
      "PRATO CHEIO: extrema pobreza + CadÚnico → pecúnio para alimentos",
      "CARTÃO GÁS: CadÚnico + baixa renda → subsidio GLP",
      "DF SOCIAL: política transversal — integra assistência + alimentação + renda",
      "BENEFÍCIOS EVENTUAIS: natalidade, morte, vulnerabilidade temporária, calamidade",
      "BENEFÍCIO EVENTUAL ≠ BPC: eventual é episódico; BPC é contínuo",
      "RESTAURANTE COMUNITÁRIO: refeições acessíveis para vulneráveis",
    ],
    esquema: [
      "PRATO CHEIO: emergência alimentar → dinheiro para comprar comida",
      "CARTÃO GÁS: subsidio para GLP",
      "BENEFÍCIO EVENTUAL: situação específica → auxílio único (não mensal)",
      "RESTAURANTE COMUNITÁRIO: refeição subsidiada no local",
    ],
    pegadinhas: [
      "BPC (BPC ao idoso/PcD) é benefício CONTÍNUO — benefício eventual é EPISÓDICO",
      "Cartão Prato Cheio é para extrema pobreza (< 1/4 SM per capita) — não é qualquer família CadÚnico",
      "SISAN é o sistema nacional; os Restaurantes Comunitários são equipamentos da política local do DF",
    ],
    dicaQuadrix: "Para este edital, Quadrix cobrará os detalhes da lei — gestores, critérios de elegibilidade, tipo de benefício. Foque em: qual programa oferece que benefício, qual o gestor responsável e qual o critério de acesso.",
    referencias: ["Lei 7.009/2021", "Lei 6.938/2021", "Lei 7.008/2021", "Lei 5.165/2013", "Decreto 33.329/2011"],
  },

];

export default TEORIA;

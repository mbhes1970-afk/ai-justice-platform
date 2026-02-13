// AI Justice Platform — Module Definitions
// All 12 internal + 4 public workflows

export const MODULES = {
  // ====== INTERN: KERN ======
  zaakbeheer: {
    id: 'zaakbeheer',
    icon: '📋',
    mode: 'intern',
    category: 'kern',
    nl: {
      name: 'Zaakbeheer',
      desc: 'Zaak-intake, dossiertoewijzing, statusoverzicht',
      welcome: 'Welkom bij Zaakbeheer. Ik help u met zaak-intake, dossiertoewijzing en termijnbewaking.',
      placeholder: 'Beschrijf de zaak of vraag over dossiertoewijzing...',
    },
    en: {
      name: 'Case Management',
      desc: 'Case intake, file assignment, status overview',
      welcome: 'Welcome to Case Management. I help with case intake, file assignment and deadline monitoring.',
      placeholder: 'Describe the case or ask about file assignment...',
    },
    systemPrompt: 'Je bent een AI-assistent voor zaakbeheer bij de Nederlandse Rechtspraak. Help bij zaak-intake, dossiertoewijzing, statusoverzicht, deadlines en rolzitting-administratie. Gebruik formele juridische terminologie. Structureer altijd: zaaknummer, rechtsgebied, partijen, status.',
    quickActions: {
      nl: [
        { id: 'new_case', label: '📋 Nieuwe zaak', action: 'Registreer een nieuwe zaak. Vraag naar: rechtsgebied, partijen, aard van het geschil.' },
        { id: 'assign', label: '👤 Toewijzen', action: 'Help bij het toewijzen van een rechter aan deze zaak.' },
        { id: 'deadlines', label: '⏰ Termijnen', action: 'Overzicht van lopende termijnen en deadlines.' },
        { id: 'record', label: '🎙️ Start Opname', action: 'record' },
      ],
      en: [
        { id: 'new_case', label: '📋 New case', action: 'Register a new case. Ask for: legal domain, parties, nature of dispute.' },
        { id: 'assign', label: '👤 Assign', action: 'Help assigning a judge to this case.' },
        { id: 'deadlines', label: '⏰ Deadlines', action: 'Overview of running deadlines.' },
        { id: 'record', label: '🎙️ Start Recording', action: 'record' },
      ],
    },
    workflow: {
      nl: ['Zaak intake', 'Toewijzing', 'Termijnen', 'Rolzitting', 'Afdoening'],
      en: ['Case intake', 'Assignment', 'Deadlines', 'Roll hearing', 'Disposition'],
    },
  },

  vonnis: {
    id: 'vonnis',
    icon: '⚖️',
    mode: 'intern',
    category: 'kern',
    nl: {
      name: 'Vonnis Ondersteuning',
      desc: 'Concept-vonnis, strafmaat, motivering',
      welcome: 'Welkom bij Vonnis Ondersteuning. Ik help bij het structureren van vonnissen, strafmaat-analyse en motivering.',
      placeholder: 'Beschrijf de feiten of vraag over strafmaat...',
    },
    en: {
      name: 'Verdict Support',
      desc: 'Draft verdict, sentencing, reasoning',
      welcome: 'Welcome to Verdict Support. I help structure verdicts, analyze sentencing and reasoning.',
      placeholder: 'Describe the facts or ask about sentencing...',
    },
    systemPrompt: 'Je bent een AI-assistent voor vonnis-ondersteuning bij de Nederlandse Rechtspraak. Help bij het structureren van concept-vonnissen, strafmaat-analyse (LOVS-oriëntatiepunten), en het formuleren van motiveringen. BELANGRIJK: Genereer altijd een CONCEPT — de rechter beslist. Markeer alle output als "CONCEPT — vereist rechterlijke goedkeuring".',
    quickActions: {
      nl: [
        { id: 'structure', label: '📐 Structureer feiten', action: 'Structureer de feiten van deze zaak voor het vonnis.' },
        { id: 'sentence', label: '⚖️ Strafmaat check', action: 'Analyseer de strafmaat op basis van LOVS-oriëntatiepunten en vergelijkbare uitspraken.' },
        { id: 'reasoning', label: '📝 Motivering', action: 'Help bij het formuleren van de motivering.' },
        { id: 'case_law', label: '🔍 Jurisprudentie', action: 'Zoek relevante jurisprudentie voor deze zaak.' },
        { id: 'record', label: '🎙️ Dicteer vonnis', action: 'record' },
      ],
      en: [
        { id: 'structure', label: '📐 Structure facts', action: 'Structure the facts of this case for the verdict.' },
        { id: 'sentence', label: '⚖️ Sentence check', action: 'Analyze sentencing based on LOVS orientation points.' },
        { id: 'reasoning', label: '📝 Reasoning', action: 'Help formulate the reasoning.' },
        { id: 'case_law', label: '🔍 Case law', action: 'Find relevant case law for this case.' },
        { id: 'record', label: '🎙️ Dictate verdict', action: 'record' },
      ],
    },
    workflow: {
      nl: ['Feiten', 'Juridisch kader', 'Strafmaat check', 'Concept vonnis', 'Review'],
      en: ['Facts', 'Legal framework', 'Sentence check', 'Draft verdict', 'Review'],
    },
  },

  // ====== INTERN: ONDERZOEK ======
  onderzoek: {
    id: 'onderzoek',
    icon: '🔍',
    mode: 'intern',
    category: 'onderzoek',
    nl: {
      name: 'Juridisch Onderzoek',
      desc: 'Wetgeving, jurisprudentie, procesreglement',
      welcome: 'Welkom bij Juridisch Onderzoek. Stel uw vraag over wetgeving, jurisprudentie of procesreglement.',
      placeholder: 'Zoek in wetgeving of jurisprudentie...',
    },
    en: {
      name: 'Legal Research',
      desc: 'Legislation, case law, procedural rules',
      welcome: 'Welcome to Legal Research. Ask about legislation, case law or procedural rules.',
      placeholder: 'Search legislation or case law...',
    },
    systemPrompt: 'Je bent een juridisch onderzoeksassistent voor de Nederlandse Rechtspraak. Je hebt kennis van het Burgerlijk Wetboek, Wetboek van Strafrecht, Wetboek van Strafvordering, Awb, en het procesreglement. Verwijs altijd naar specifieke wetsartikelen en ECLI-nummers waar mogelijk.',
    quickActions: {
      nl: [
        { id: 'article', label: '📖 Wetsartikel', action: 'Zoek een specifiek wetsartikel.' },
        { id: 'ecli', label: '🏛️ Jurisprudentie', action: 'Zoek relevante jurisprudentie (ECLI).' },
        { id: 'reglement', label: '📋 Procesreglement', action: 'Raadpleeg het procesreglement.' },
      ],
      en: [
        { id: 'article', label: '📖 Legal article', action: 'Search for a specific legal article.' },
        { id: 'ecli', label: '🏛️ Case law', action: 'Search relevant case law (ECLI).' },
        { id: 'reglement', label: '📋 Procedural rules', action: 'Consult the procedural rules.' },
      ],
    },
  },

  dossier: {
    id: 'dossier',
    icon: '📄',
    mode: 'intern',
    category: 'onderzoek',
    nl: {
      name: 'Dossieranalyse',
      desc: 'Samenvatting, tijdlijn, kernpunten',
      welcome: 'Welkom bij Dossieranalyse. Upload of beschrijf processtukken — ik maak een samenvatting, tijdlijn en kernpunten-extractie.',
      placeholder: 'Plak processtukken of beschrijf het dossier...',
    },
    en: {
      name: 'File Analysis',
      desc: 'Summary, timeline, key points',
      welcome: 'Welcome to File Analysis. Upload or describe case documents — I\'ll create a summary, timeline and key point extraction.',
      placeholder: 'Paste pleadings or describe the file...',
    },
    systemPrompt: 'Je bent een AI-assistent voor dossieranalyse bij de Nederlandse Rechtspraak. Analyseer processtukken en maak: 1) Een beknopte samenvatting, 2) Een chronologische tijdlijn, 3) Kernpunten extractie, 4) Eventuele tegenstrijdigheden. Gebruik formele juridische terminologie.',
    quickActions: {
      nl: [
        { id: 'summary', label: '📝 Samenvatting', action: 'Maak een samenvatting van het dossier.' },
        { id: 'timeline', label: '📅 Tijdlijn', action: 'Genereer een chronologische tijdlijn.' },
        { id: 'conflicts', label: '⚠️ Tegenstrijdigheden', action: 'Markeer mogelijke tegenstrijdigheden.' },
        { id: 'record', label: '🎙️ Start Opname', action: 'record' },
      ],
      en: [
        { id: 'summary', label: '📝 Summary', action: 'Create a file summary.' },
        { id: 'timeline', label: '📅 Timeline', action: 'Generate a chronological timeline.' },
        { id: 'conflicts', label: '⚠️ Contradictions', action: 'Flag possible contradictions.' },
        { id: 'record', label: '🎙️ Start Recording', action: 'record' },
      ],
    },
    workflow: {
      nl: ['Upload dossier', 'Samenvatting', 'Tijdlijn', 'Kernpunten', 'Export'],
      en: ['Upload file', 'Summary', 'Timeline', 'Key points', 'Export'],
    },
  },

  transcriptie: {
    id: 'transcriptie',
    icon: '🎤',
    mode: 'intern',
    category: 'onderzoek',
    nl: {
      name: 'Zittingstranscriptie',
      desc: 'Real-time transcriptie, spreker-detectie',
      welcome: 'Welkom bij Zittingstranscriptie. Start een opname om een zitting live te transcriberen.',
      placeholder: 'Start een opname of plak een transcript...',
    },
    en: {
      name: 'Hearing Transcription',
      desc: 'Real-time transcription, speaker detection',
      welcome: 'Welcome to Hearing Transcription. Start a recording to transcribe a hearing live.',
      placeholder: 'Start a recording or paste a transcript...',
    },
    systemPrompt: 'Je bent een AI-assistent voor zittingstranscriptie bij de Nederlandse Rechtspraak. Verwerk het transcript en: 1) Identificeer sprekers (rechter, OvJ, advocaat, verdachte, getuige), 2) Structureer per spreker, 3) Markeer belangrijke momenten, 4) Genereer een procesverbaal. Gebruik formele juridische terminologie.',
    quickActions: {
      nl: [
        { id: 'record', label: '🎙️ Start Opname', action: 'record' },
        { id: 'speakers', label: '👥 Sprekers', action: 'Identificeer en label de sprekers in het transcript.' },
        { id: 'pv', label: '📋 Genereer PV', action: 'Genereer een procesverbaal van de zitting.' },
      ],
      en: [
        { id: 'record', label: '🎙️ Start Recording', action: 'record' },
        { id: 'speakers', label: '👥 Speakers', action: 'Identify and label speakers in the transcript.' },
        { id: 'pv', label: '📋 Generate PV', action: 'Generate a hearing report.' },
      ],
    },
  },

  strafmaat: {
    id: 'strafmaat',
    icon: '📊',
    mode: 'intern',
    category: 'onderzoek',
    nl: {
      name: 'Strafmaat Analyse',
      desc: 'LOVS-oriëntatiepunten, vergelijkbare zaken',
      welcome: 'Welkom bij Strafmaat Analyse. Beschrijf het delict — ik zoek vergelijkbare uitspraken en LOVS-oriëntatiepunten.',
      placeholder: 'Beschrijf het delict en de omstandigheden...',
    },
    en: {
      name: 'Sentencing Analysis',
      desc: 'LOVS orientation points, comparable cases',
      welcome: 'Welcome to Sentencing Analysis. Describe the offense — I\'ll find comparable rulings and LOVS orientation points.',
      placeholder: 'Describe the offense and circumstances...',
    },
    systemPrompt: 'Je bent een AI-assistent voor strafmaat-analyse bij de Nederlandse Rechtspraak. Gebruik LOVS-oriëntatiepunten als basis. Zoek vergelijkbare uitspraken. Houd rekening met strafverzwarende en strafverminderende omstandigheden. Geef altijd een range, nooit een exact advies.',
    quickActions: {
      nl: [
        { id: 'lovs', label: '📊 LOVS check', action: 'Zoek de LOVS-oriëntatiepunten voor dit delict.' },
        { id: 'compare', label: '🔍 Vergelijk', action: 'Zoek vergelijkbare uitspraken en straffen.' },
        { id: 'factors', label: '⚖️ Omstandigheden', action: 'Analyseer strafverzwarende en strafverminderende omstandigheden.' },
      ],
      en: [
        { id: 'lovs', label: '📊 LOVS check', action: 'Find LOVS orientation points for this offense.' },
        { id: 'compare', label: '🔍 Compare', action: 'Find comparable rulings and sentences.' },
        { id: 'factors', label: '⚖️ Factors', action: 'Analyze aggravating and mitigating factors.' },
      ],
    },
  },

  // ====== INTERN: GRIFFIE ======
  planning: {
    id: 'planning',
    icon: '📅',
    mode: 'intern',
    category: 'griffie',
    nl: {
      name: 'Zittingsplanning',
      desc: 'Rooster, zaalindeling, beschikbaarheid',
      welcome: 'Welkom bij Zittingsplanning. Ik help bij roosteroptimalisatie, zaalindeling en beschikbaarheid.',
      placeholder: 'Vraag over zittingsplanning...',
    },
    en: {
      name: 'Hearing Planning',
      desc: 'Schedule, room allocation, availability',
      welcome: 'Welcome to Hearing Planning. I help with schedule optimization, room allocation and availability.',
      placeholder: 'Ask about hearing planning...',
    },
    systemPrompt: 'Je bent een AI-assistent voor zittingsplanning bij de Nederlandse Rechtspraak. Help bij roosteroptimalisatie, zaalindeling, conflicten detecteren en prioritering van zaken.',
  },

  correspondentie: {
    id: 'correspondentie',
    icon: '📨',
    mode: 'intern',
    category: 'griffie',
    nl: {
      name: 'Correspondentie',
      desc: 'Oproepingen, beschikkingen, kennisgevingen',
      welcome: 'Welkom bij Correspondentie. Ik genereer oproepingen, beschikkingen en kennisgevingen.',
      placeholder: 'Welk type brief moet worden opgesteld?',
    },
    en: {
      name: 'Correspondence',
      desc: 'Summons, orders, notifications',
      welcome: 'Welcome to Correspondence. I generate summons, orders and notifications.',
      placeholder: 'What type of letter needs to be drafted?',
    },
    systemPrompt: 'Je bent een AI-assistent voor griffie-correspondentie bij de Nederlandse Rechtspraak. Genereer formele juridische brieven: oproepingen, beschikkingen, kennisgevingen. Gebruik de juiste juridische formuleringen en verplichte onderdelen.',
    quickActions: {
      nl: [
        { id: 'summon', label: '📨 Oproeping', action: 'Genereer een oproeping voor de zitting.' },
        { id: 'order', label: '📜 Beschikking', action: 'Stel een concept-beschikking op.' },
        { id: 'notify', label: '📩 Kennisgeving', action: 'Genereer een kennisgeving.' },
      ],
      en: [
        { id: 'summon', label: '📨 Summons', action: 'Generate a hearing summons.' },
        { id: 'order', label: '📜 Order', action: 'Draft an order.' },
        { id: 'notify', label: '📩 Notification', action: 'Generate a notification.' },
      ],
    },
  },

  rolbeheer: {
    id: 'rolbeheer',
    icon: '📂',
    mode: 'intern',
    category: 'griffie',
    nl: {
      name: 'Rolbeheer',
      desc: 'Rolzittingen, uitstel, comparitie',
      welcome: 'Welkom bij Rolbeheer. Ik help bij rolzitting-administratie, uitstelverzoeken en comparitie-planning.',
      placeholder: 'Vraag over rolbeheer...',
    },
    en: {
      name: 'Roll Management',
      desc: 'Roll hearings, postponements, comparisons',
      welcome: 'Welcome to Roll Management. I help with roll hearing administration and postponement requests.',
      placeholder: 'Ask about roll management...',
    },
    systemPrompt: 'Je bent een AI-assistent voor rolbeheer bij de Nederlandse Rechtspraak. Help bij rolkaart bijwerken, uitstelverzoeken verwerken, termijnen bewaken en comparitie-planning.',
  },

  // ====== INTERN: KENNIS ======
  procesreglement: {
    id: 'procesreglement',
    icon: '📜',
    mode: 'intern',
    category: 'kennis',
    nl: {
      name: 'Procesreglement',
      desc: 'Naleving, termijnen, vormvereisten',
      welcome: 'Welkom bij Procesreglement Check. Ik controleer naleving van het procesreglement, berekent termijnen en valideert vormvereisten.',
      placeholder: 'Welk procesreglement-onderdeel wilt u checken?',
    },
    en: {
      name: 'Procedural Rules',
      desc: 'Compliance, deadlines, formal requirements',
      welcome: 'Welcome to Procedural Rules Check. I verify compliance, calculate deadlines and validate formal requirements.',
      placeholder: 'Which procedural rule do you want to check?',
    },
    systemPrompt: 'Je bent een AI-assistent voor procesreglement-compliance bij de Nederlandse Rechtspraak. Check naleving van het procesreglement, bereken termijnen en valideer vormvereisten. Verwijs naar specifieke artikelen uit het procesreglement.',
  },

  compliance: {
    id: 'compliance',
    icon: '🇪🇺',
    mode: 'intern',
    category: 'kennis',
    nl: {
      name: 'EU AI Act Compliance',
      desc: 'High-risk AI monitoring, bias-detectie',
      welcome: 'Welkom bij EU AI Act Compliance. Dit platform valt onder Art. 6/Annex III als high-risk AI in rechtspraak. Ik monitor transparantie, bias en menselijke controle.',
      placeholder: 'Vraag over AI Act compliance...',
    },
    en: {
      name: 'EU AI Act Compliance',
      desc: 'High-risk AI monitoring, bias detection',
      welcome: 'Welcome to EU AI Act Compliance. This platform falls under Art. 6/Annex III as high-risk AI in justice. I monitor transparency, bias and human oversight.',
      placeholder: 'Ask about AI Act compliance...',
    },
    systemPrompt: 'Je bent een AI-compliance assistent. Dit systeem valt onder EU AI Act Art. 6/Annex III als high-risk AI-systeem in de rechtspraak. Monitor en rapporteer over: transparantie (Art. 13), menselijk toezicht (Art. 14), nauwkeurigheid en bias (Art. 15), en audit trail (Art. 12).',
  },

  // ====== PUBLIEK ======
  zaakstatus: {
    id: 'zaakstatus',
    icon: '📋',
    mode: 'publiek',
    nl: {
      name: 'Zaakstatus',
      desc: 'Status van uw zaak opvragen',
      welcome: 'Welkom. Hier kunt u de status van uw lopende zaak opvragen. Voer uw zaaknummer in.',
      placeholder: 'Voer uw zaaknummer in...',
    },
    en: {
      name: 'Case Status',
      desc: 'Check your case status',
      welcome: 'Welcome. You can check the status of your pending case here. Enter your case number.',
      placeholder: 'Enter your case number...',
    },
    systemPrompt: 'Je bent een vriendelijke assistent voor het publiek bij de Nederlandse Rechtspraak. Help burgers hun zaakstatus te begrijpen. Gebruik toegankelijke taal, vermijd juridisch jargon. Leg processtappen helder uit.',
  },

  rechten: {
    id: 'rechten',
    icon: '⚖️',
    mode: 'publiek',
    nl: {
      name: 'Rechten & Procedures',
      desc: 'Procesrecht, beroep, griffierechten, pro deo',
      welcome: 'Welkom. Ik informeer u over uw rechten, procedures, beroepsmogelijkheden en kosten.',
      placeholder: 'Stel uw vraag over rechten of procedures...',
    },
    en: {
      name: 'Rights & Procedures',
      desc: 'Procedural law, appeals, court fees, legal aid',
      welcome: 'Welcome. I provide information about your rights, procedures, appeal options and costs.',
      placeholder: 'Ask about rights or procedures...',
    },
    systemPrompt: 'Je bent een publieksvriendelijke assistent voor de Nederlandse Rechtspraak. Informeer burgers over hun rechten, procedures, beroepsmogelijkheden, griffierechten en pro deo. Gebruik eenvoudige, toegankelijke taal.',
  },

  agenda: {
    id: 'agenda',
    icon: '📅',
    mode: 'publiek',
    nl: {
      name: 'Zittingsagenda',
      desc: 'Openbare zittingen bekijken',
      welcome: 'Welkom bij de Zittingsagenda. Zoek openbare zittingen op datum, locatie of zaaknummer.',
      placeholder: 'Zoek op datum, locatie of zaaknummer...',
    },
    en: {
      name: 'Hearing Calendar',
      desc: 'View public hearings',
      welcome: 'Welcome to the Hearing Calendar. Search public hearings by date, location or case number.',
      placeholder: 'Search by date, location or case number...',
    },
    systemPrompt: 'Je bent een assistent voor de zittingsagenda van de Nederlandse Rechtspraak. Help bij het zoeken naar openbare zittingen. Geef informatie over datum, tijd, locatie en aard van de zitting.',
  },

  slachtofferhulp: {
    id: 'slachtofferhulp',
    icon: '🤝',
    mode: 'publiek',
    nl: {
      name: 'Slachtofferhulp',
      desc: 'Spreekrecht, schadevergoeding, voeging',
      welcome: 'Welkom bij Slachtofferhulp. Ik informeer u over spreekrecht, schadevergoeding en uw mogelijkheden als slachtoffer.',
      placeholder: 'Stel uw vraag over uw rechten als slachtoffer...',
    },
    en: {
      name: 'Victim Support',
      desc: 'Right to speak, compensation, joinder',
      welcome: 'Welcome to Victim Support. I provide information about your right to speak, compensation and your options as a victim.',
      placeholder: 'Ask about your rights as a victim...',
    },
    systemPrompt: 'Je bent een empathische assistent voor slachtofferhulp bij de Nederlandse Rechtspraak. Informeer over spreekrecht, schadevergoeding via voeging, Slachtofferhulp Nederland, en rechten van slachtoffers. Wees warm en begripvol.',
  },
};

// Categories for sidebar grouping
export const CATEGORIES = {
  intern: {
    kern: { nl: 'Kern', en: 'Core', icon: '🔴' },
    onderzoek: { nl: 'Onderzoek & Analyse', en: 'Research & Analysis', icon: '🟡' },
    griffie: { nl: 'Griffie & Planning', en: 'Registry & Planning', icon: '🟢' },
    kennis: { nl: 'Kennis & Compliance', en: 'Knowledge & Compliance', icon: '🟣' },
  },
  publiek: {
    nl: 'Publiek',
    en: 'Public',
  },
};

// Get modules by mode
export function getModulesByMode(mode) {
  return Object.values(MODULES).filter(m => m.mode === mode);
}

// Get modules by category
export function getModulesByCategory(mode, category) {
  return Object.values(MODULES).filter(m => m.mode === mode && m.category === category);
}

export type Lang = "en" | "rw";

/**
 * Bilingual UI copy. Kinyarwanda strings are a first draft — have a native
 * speaker on the team review them before launch.
 */
export const dict = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      how: "How it works",
      partners: "Partners",
      contact: "Contact",
      signIn: "Sign in",
      getStarted: "Get started",
    },
    hero: {
      eyebrow: "AI-supported maternal health · Rwanda",
      title1: "The warning can come",
      title2: "before the emergency.",
      lead:
        "MamaCare connects a mother, her family, her Community Health Worker and her clinic into one continuous picture of the pregnancy — so a warning sign is never missed.",
      ctaPrimary: "Start a check-in",
      ctaSecondary: "See how it works",
      scroll: "Scroll",
      badgeRisk: "Risk reviewed",
      badgeLang: "Kinyarwanda · English",
    },
    login: {
      title: "Welcome back",
      subtitle: "Sign in to your MamaCare account.",
      google: "Continue with Google",
      or: "or continue with email",
      email: "Email address",
      password: "Password",
      forgot: "Forgot password?",
      submit: "Sign in",
      noAccount: "New to MamaCare?",
      create: "Create an account",
      demoHint: "Demo accounts (password: mamacare): demo@ · mother@ · family@ · supervisor@ · provider@ · analyst@ · care@ · researcher@ · admin@ mamacare.rw",
    },
    common: {
      notDiagnosis:
        "MamaCare does not diagnose. It helps mothers, families and health workers recognise risk earlier — and act sooner.",
      emergency: "In an emergency call 912",
    },
    story: {
      eyebrow: "The problem",
      heading: "Every sign looked ordinary.",
      lead:
        "A mother feels one sign at home. A family member notices a second. A Community Health Worker hears a third. A clinic sees a fourth. They never meet in one place, in time.",
      signs: [
        { when: "Day 1", what: "Her wedding ring feels a little tight." },
        { when: "A few days later", what: "A headache." },
        { when: "The next week", what: "The window blurs. She blinks — it's gone." },
        { when: "Two days later", what: "The baby has gone quiet." },
      ],
      diagnosisLabel: "What was actually happening",
      diagnosisName: "Preeclampsia.",
      diagnosisText: "Four ordinary signs. One dangerous, treatable condition — missed until it was severe.",
      quote: "“Babies rest before they’re born, dear. It’s a good sign.”",
      quoteAttribution: "— what her aunt said. So she waited.",
      flipFront: "That’s what her aunt said.",
      flipBack: "Here is what her body was saying.",
      flipCta: "Hear the whole week ↗",
      readAria: "Read what was really happening",
      readWholeAria: "Read Aline’s whole story",
      inviteEyebrow: "Three minutes",
      inviteTitle1: "There is more to this week",
      inviteTitle2: "than four lines.",
      inviteText: "Press play. Let it be told to you.",
    },
    connects: {
      eyebrow: "Our insight",
      heading: "One continuous picture of every pregnancy.",
      lead:
        "The information already exists — it is just held by four different people. MamaCare brings it together into a single timeline that everyone caring for her can act on.",
      people: [
        { title: "Mother", text: "Shares symptoms and concerns in her own words — by chat, WhatsApp or SMS." },
        { title: "Family", text: "Notices changes at home and provides support between visits." },
        { title: "Community Health Worker", text: "Observes on home visits and shares key information with the clinic." },
        { title: "Healthcare provider", text: "Adds clinical data, reviews escalations and closes the loop." },
      ],
      closing: "Four voices. One early-warning signal.",
    },
    flow: {
      eyebrow: "How it works",
      heading: "From conversation to action.",
      subtextBold: "The language model understands.",
      subtextRest: "A risk model evaluates. Clinical rules guide the action.",
      steps: [
        { title: "Speak", text: "In Kinyarwanda or English — by web, app, WhatsApp or SMS. Text, voice or a photo." },
        { title: "Understand", text: "A language model listens, asks useful follow-up questions and turns the conversation into structured health information." },
        { title: "Assess", text: "A medically reviewed risk model weighs symptoms, pregnancy stage, history, measurements and what CHWs and clinicians have observed." },
        { title: "Guide", text: "Clinical rules decide the next step: safe information, a recommendation to contact a professional, or an escalation." },
        { title: "Act", text: "The right person is alerted through the right care pathway — and the loop is closed back to the CHW." },
      ],
      exploreCta: "Explore the full flow",
      stepLabel: "Step",
    },
    stats: {
      eyebrow: "What we heard",
      heading: "Not a guess. A gap we heard directly.",
      items: [
        { label: "field interviews across 5 facilities", note: "Mothers, families, CHWs and midwives" },
        { label: "of mothers don't seek care for “minor” signs", note: "Headache, swollen feet, blurred vision" },
        { label: "of midwives saw minor signs become critical", note: "From our interviews" },
        { label: "Community Health Workers in Rwanda", note: "The network we build on" },
      ],
      closing: "The problem isn’t awareness. It’s that the warning sign has nowhere to go in real time.",
    },
    safety: {
      eyebrow: "Responsible by design",
      heading: "Safety is not a caveat. It’s the architecture.",
      lead: "For a maternal-health tool, trust is the product. These are the commitments we build against.",
      pillars: [
        { title: "Humans decide", text: "MamaCare supports — never replaces — doctors, midwives and CHWs. It does not diagnose." },
        { title: "Medically reviewed rules", text: "Every recommended action follows clinical rules reviewed by health professionals, fully auditable." },
        { title: "Data protection", text: "Consent first. Health data handled under Rwanda's data-protection law, with independent ethics review." },
        { title: "Built for Kinyarwanda", text: "Misunderstanding is a safety risk. When the system is unsure, it asks — or hands over to a person." },
        { title: "A clear care pathway", text: "Escalations go to a named CHW and facility, through a defined channel, with the loop closed back." },
      ],
    },
    ctaBand: {
      heading: "Let’s make sure the warning is not missed.",
      primary: "Get started",
      secondary: "Partner with us",
    },
    footer: {
      headline: "No warning sign should go unheard.",
      startConversation: "Start a conversation",
      createAccount: "Create an account",
      tagline: "Two hearts, timely care",
      disclaimerLead:
        "MamaCare is a decision-support tool. It does not diagnose and does not replace doctors, midwives or Community Health Workers. In an emergency, ",
      call912: "call 912",
      copyright: "MamaCare · Kigali, Rwanda",
      columns: [
        {
          title: "Product",
          links: [
            { label: "How it works" },
            { label: "For mothers" },
            { label: "For families" },
            { label: "For health workers" },
            { label: "FAQ" },
          ],
        },
        {
          title: "Company",
          links: [
            { label: "About" },
            { label: "Partners" },
            { label: "Research" },
            { label: "Team" },
            { label: "Join us" },
            { label: "Contact" },
          ],
        },
        {
          title: "Trust",
          links: [
            { label: "Safety & ethics" },
            { label: "Consent" },
            { label: "Privacy" },
            { label: "Terms" },
            { label: "Emergency" },
            { label: "System status" },
          ],
        },
      ],
    },
  },
  rw: {
    nav: {
      home: "Ahabanza",
      about: "Ibyerekeye",
      how: "Uko bikora",
      partners: "Abafatanyabikorwa",
      contact: "Twandikire",
      signIn: "Injira",
      getStarted: "Tangira",
    },
    hero: {
      eyebrow: "Ubuzima bw'umubyeyi bushyigikiwe na AI · Rwanda",
      title1: "Ikimenyetso gishobora kuza",
      title2: "mbere y'ibyihutirwa.",
      lead:
        "MamaCare ihuza umubyeyi, umuryango we, umujyanama w'ubuzima n'ivuriro mu ishusho imwe ihoraho y'inda — kugira ngo nta kimenyetso cy'akaga kibura kubonwa.",
      ctaPrimary: "Tangira isuzuma",
      ctaSecondary: "Reba uko bikora",
      scroll: "Manuka",
      badgeRisk: "Ingaruka zasuzumwe",
      badgeLang: "Ikinyarwanda · Icyongereza",
    },
    login: {
      title: "Murakaza neza",
      subtitle: "Injira muri konti yawe ya MamaCare.",
      google: "Komeza ukoresheje Google",
      or: "cyangwa ukoreshe imeyili",
      email: "Aderesi ya imeyili",
      password: "Ijambobanga",
      forgot: "Wibagiwe ijambobanga?",
      submit: "Injira",
      noAccount: "Uri mushya kuri MamaCare?",
      create: "Fungura konti",
      demoHint: "Igerageza (ijambobanga: mamacare): demo@ · mother@ · family@ · supervisor@ · provider@ · analyst@ · care@ · researcher@ · admin@ mamacare.rw",
    },
    common: {
      notDiagnosis:
        "MamaCare ntisuzuma indwara. Ifasha ababyeyi, imiryango n'abakozi b'ubuzima kumenya ingaruka hakiri kare — no gufata ingamba vuba.",
      emergency: "Mu byihutirwa hamagara 912",
    },
    story: {
      eyebrow: "Ikibazo",
      heading: "Buri kimenyetso cyasaga nk'ibisanzwe.",
      lead:
        "Umubyeyi yumva ikimenyetso kimwe mu rugo. Umuntu wo mu muryango abona icya kabiri. Umujyanama w'ubuzima yumva icya gatatu. Ivuriro ribona icya kane. Ntibihura ahantu hamwe, ku gihe.",
      signs: [
        { when: "Umunsi wa mbere", what: "Impeta ye y'ubukwe yumva imufatanye gato." },
        { when: "Nyuma y'iminsi mike", what: "Umutwe umubabaza." },
        { when: "Icyumweru gikurikira", what: "Amaso arabona ibintu bidasobanutse. Arahumbya — bikagenda." },
        { when: "Nyuma y'iminsi ibiri", what: "Umwana ntiyimuka." },
      ],
      diagnosisLabel: "Icyari cyabaye by'ukuri",
      diagnosisName: "Preeklampusi.",
      diagnosisText: "Ibimenyetso bine bisanzwe. Indwara imwe y'akaga ishobora kuvurwa — yabuze kubonwa kugeza igihe yagize ingaruka.",
      quote: "“Abana baruhuka mbere yo kuvuka, mukobwa. Ni ikimenyetso cyiza.”",
      quoteAttribution: "— uko mukuru we yabivuze. Nuko ategereza.",
      flipFront: "Uko mukuru we yabivuze.",
      flipBack: "Dore icyo umubiri we wari uvuga.",
      flipCta: "Umva icyumweru cyose ↗",
      readAria: "Soma ibyari byabaye by'ukuri",
      readWholeAria: "Soma inkuru yose ya Aline",
      inviteEyebrow: "Iminota itatu",
      inviteTitle1: "Hari byinshi kuri iki cyumweru",
      inviteTitle2: "kurusha imirongo ine.",
      inviteText: "Kanda kugira ngo urebe. Reka babikubwire.",
    },
    connects: {
      eyebrow: "Icyo twabonye",
      heading: "Ishusho imwe ihoraho ya buri gutwita.",
      lead:
        "Amakuru asanzwe ahari — ariko afitwe n'abantu bane batandukanye. MamaCare ayahuza mu gihe kimwe abamwitaho bose bashobora gukoreraho.",
      people: [
        { title: "Umubyeyi", text: "Asangira ibimenyetso n'impungenge mu magambo ye — binyuze mu ganira, WhatsApp cyangwa SMS." },
        { title: "Umuryango", text: "Yibonera impinduka mu rugo kandi agatanga ubufasha hagati y'inama." },
        { title: "Umujyanama w'ubuzima", text: "Arebera mu ngendo z'urugo maze agasangira amakuru y'ingenzi n'ivuriro." },
        { title: "Umukozi w'ubuvuzi", text: "Yongeramo amakuru y'ubuvuzi, akareba ibyihutirwa maze agasoza urunigi." },
      ],
      closing: "Amajwi ane. Ikimenyetso kimwe cy'iburira mbere y'igihe.",
    },
    flow: {
      eyebrow: "Uko bikora",
      heading: "Kuva mu kiganiro kugera ku igikorwa.",
      subtextBold: "Porogaramu y'ururimi irumva.",
      subtextRest: "Uburyo bw'ingaruka burasesengura. Amategeko y'ubuvuzi ayobora igikorwa.",
      steps: [
        { title: "Vuga", text: "Mu Kinyarwanda cyangwa Icyongereza — binyuze kuri interineti, porogaramu, WhatsApp cyangwa SMS. Amagambo, ijwi cyangwa ifoto." },
        { title: "Sobanukirwa", text: "Porogaramu y'ururimi irumva, ikabaza ibibazo by'ingenzi maze igahindura ikiganiro amakuru y'ubuzima yateguwe." },
        { title: "Sesengura", text: "Uburyo bw'ingaruka bwasuzumwe n'abaganga busuzuma ibimenyetso, icyiciro cy'inda, amateka, ibipimo n'ibyo abajyanama n'abaganga babonye." },
        { title: "Yobora", text: "Amategeko y'ubuvuzi afata icyemezo ku cy'ingenzi gikurikira: amakuru y'umutekano, inama yo kuvugana n'umuhanga, cyangwa kwihutisha." },
        { title: "Kora", text: "Umuntu ubikwiye amenyeshwa binyuze mu nzira nyayo y'ubuvuzi — kandi urunigi rugasozwa rugasubira ku mujyanama w'ubuzima." },
      ],
      exploreCta: "Reba inzira yose",
      stepLabel: "Intambwe",
    },
    stats: {
      eyebrow: "Ibyo twumvise",
      heading: "Ntabwo ari ukwibaza. Ni icyuho twumvise ubwacu.",
      items: [
        { label: "ibiganiro by'ubushakashatsi mu bigo 5", note: "Ababyeyi, imiryango, abajyanama n'ababyaza" },
        { label: "by'ababyeyi ntibashaka ubuvuzi ku bimenyetso ‛ito”", note: "Umutwe, ibirenge birenze, amaso adasobanutse" },
        { label: "by'ababyaza babonye ibimenyetso bito bihindukamo ibikomeye", note: "Byavuye mu biganiro byacu" },
        { label: "b'abajyanama b'ubuzima mu Rwanda", note: "Urusobe dukoreraho" },
      ],
      closing: "Ikibazo si ukumenya. Ni uko ikimenyetso cy'iburira kidafite aho kijya ako kanya.",
    },
    safety: {
      eyebrow: "Byubatswe ku bushobozi",
      heading: "Umutekano si inama y'ubwitonzi. Ni imiterere y'ikigo.",
      lead: "Ku gikoresho cy'ubuzima bw'umubyeyi, icyizere ni cyo gicuruzwa. Aya ni amasezerano twiyemeje.",
      pillars: [
        { title: "Abantu ni bo bafata icyemezo", text: "MamaCare ifasha — ntisimbura — abaganga, ababyaza n'abajyanama b'ubuzima. Ntisuzuma indwara." },
        { title: "Amategeko yasuzumwe n'abaganga", text: "Buri gikorwa cyasabwe gikurikiza amategeko y'ubuvuzi yasuzumwe n'abahanga b'ubuzima, kandi bishobora kugenzurwa byose." },
        { title: "Kurinda amakuru", text: "Uruhushya mbere ya byose. Amakuru y'ubuzima acungwa hakurikijwe amategeko y'u Rwanda ku kurinda amakuru, hamwe no gusuzumwa n'abigenga." },
        { title: "Byubatswe ku Kinyarwanda", text: "Kutumvikana ni akaga ku mutekano. Iyo sisitemu itizeye, ibaza — cyangwa igahereza umuntu." },
        { title: "Inzira igaragara y'ubuvuzi", text: "Ibyihutirwa bijya ku mujyanama n'ikigo byagenwe, binyuze mu nzira yagenwe, urunigi rugasozwa rukagaruka." },
      ],
    },
    ctaBand: {
      heading: "Reka twizere ko ikimenyetso kidatakara.",
      primary: "Tangira",
      secondary: "Fatanya natwe",
    },
    footer: {
      headline: "Nta kimenyetso cy'iburira gikwiye kutumvwa.",
      startConversation: "Tangira ikiganiro",
      createAccount: "Fungura konti",
      tagline: "Imitima ibiri, ubwitonzi bumwe",
      disclaimerLead:
        "MamaCare ni igikoresho gifasha gufata ibyemezo. Ntisuzuma indwara kandi ntisimbura abaganga, ababyaza cyangwa abajyanama b'ubuzima. Mu byihutirwa, ",
      call912: "hamagara 912",
      copyright: "MamaCare · Kigali, u Rwanda",
      columns: [
        {
          title: "Igikorwa",
          links: [
            { label: "Uko bikora" },
            { label: "Ku babyeyi" },
            { label: "Ku miryango" },
            { label: "Ku bakozi b'ubuzima" },
            { label: "Ibibazo bikunze kubazwa" },
          ],
        },
        {
          title: "Sosiyete",
          links: [
            { label: "Ibyerekeye" },
            { label: "Abafatanyabikorwa" },
            { label: "Ubushakashatsi" },
            { label: "Itsinda" },
            { label: "Twiyunge" },
            { label: "Twandikire" },
          ],
        },
        {
          title: "Icyizere",
          links: [
            { label: "Umutekano n'imyitwarire" },
            { label: "Uruhushya" },
            { label: "Ibanga" },
            { label: "Amategeko" },
            { label: "Ibyihutirwa" },
            { label: "Uko sisitemu imeze" },
          ],
        },
      ],
    },
  },
} as const;

export type Dict = (typeof dict)["en"];

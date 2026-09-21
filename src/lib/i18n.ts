export type Lang = "en" | "rw";

/**
 * Bilingual UI copy. Kinyarwanda strings are a first draft --- have a native
 * speaker on the team review them before launch.
 */
export const dict = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      how: "How it works",
      contact: "Contact",
      signIn: "Sign in",
      getStarted: "Get started",
    },
    hero: {
      eyebrow: "AI-supported maternal health · Rwanda",
      title1: "The warning can come",
      title2: "before the emergency.",
      lead:
        "MamaCare connects a mother, her family, her Community Health Worker and her clinic into one continuous picture of the pregnancy --- so a warning sign is never missed.",
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
      demoHint: "Demo: demo@mamacare.rw / mamacare",
    },
    common: {
      notDiagnosis:
        "MamaCare does not diagnose. It helps mothers, families and health workers recognise risk earlier --- and act sooner.",
      emergency: "In an emergency call 912",
    },
  },
  rw: {
    nav: {
      home: "Ahabanza",
      about: "Ibyerekeye",
      how: "Uko bikora",
      contact: "Twandikire",
      signIn: "Injira",
      getStarted: "Tangira",
    },
    hero: {
      eyebrow: "Ubuzima bw'umubyeyi bushyigikiwe na AI · Rwanda",
      title1: "Ikimenyetso gishobora kuza",
      title2: "mbere y'ibyihutirwa.",
      lead:
        "MamaCare ihuza umubyeyi, umuryango we, umujyanama w'ubuzima n'ivuriro mu ishusho imwe ihoraho y'inda --- kugira ngo nta kimenyetso cy'akaga kibura kubonwa.",
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
      demoHint: "Igerageza: demo@mamacare.rw / mamacare",
    },
    common: {
      notDiagnosis:
        "MamaCare ntisuzuma indwara. Ifasha ababyeyi, imiryango n'abakozi b'ubuzima kumenya ingaruka hakiri kare --- no gufata ingamba vuba.",
      emergency: "Mu byihutirwa hamagara 912",
    },
  },
} as const;

export type Dict = (typeof dict)["en"];

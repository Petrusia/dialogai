export const headerNav = [
  { href: "/#apie", id: "apie", label: "Apie" },
  { href: "/#kodel", id: "kodel", label: "Kodėl dabar?" },
  { href: "/#kaip", id: "kaip", label: "Procesas" },
  { href: "/#erdves", id: "erdves", label: "Erdvės" },
  { href: "/#duk", id: "duk", label: "DUK" },
  { href: "/#parama", id: "parama", label: "Parama" },
] as const;

export const footerNav = [
  { href: "/#apie", label: "Apie dialogą" },
  { href: "/#kodel", label: "Kodėl dabar?" },
  { href: "/#kaip", label: "Kaip vyksta?" },
  { href: "/#erdves", label: "Erdvės" },
  { href: "/#duk", label: "DUK" },
  { href: "/#parama", label: "Parama" },
  { href: "/straipsniai", label: "Straipsniai" },
] as const;

export const sectionIds = headerNav.map((item) => item.id);

export const hero = {
  title: "Pakalbėkime iš esmės.",
  accent: "Atvirai, giliai, be pykčio.",
  lead: "Kviečiame pradėti Viešą dialogą jūsų erdvėje – organizacijoje, bendruomenės namuose, bibliotekoje, muziejuje ar kieme.",
  cta: "Paprašyti dialogo savo erdvėje",
  stats: [
    { label: "trukmė", value: "90–120", note: "minučių dialogas" },
    { label: "grupė", value: "12–60", note: "dalyvių" },
    { label: "komanda", value: "2–3", note: "fasilitatoriai" },
  ],
};

export const highlights = [
  {
    src: "/assets/highlight-1.webp",
    title: "Ne debatai",
    text: "Tikslas – ne laimėti ginčą, o suprasti patirtis, poreikius ir tai, kas iš tiesų vyksta.",
  },
  {
    src: "/assets/highlight-2.webp",
    title: "Nešališka struktūra",
    text: "Pokalbį laiko metodo apmokyti fasilitatoriai, saugantys orumą ir lygiateisį dalyvavimą.",
  },
  {
    src: "/assets/highlight-3.webp",
    title: "Saugiai drąsu",
    text: "Erdvė, kurioje galima kalbėti jautriomis temomis be etikečių, kaltinimų ir pykčio.",
  },
];

export const why = {
  kicker: "Kodėl dabar?",
  title: "Tikras pokalbis tampa bendruomenės atsparumu.",
  paragraphs: [
    "Gyvename informacinės gausos laike: atsakymus gauname akimirksniu, o nuomonių – tiek, kiek žmonių.",
    "Žinutės keičia žmogiškus pokalbius, tolstame vieni nuo kitų. Todėl dabar ypač svarbu grįžti prie tikrų, gilių pokalbių – čia ir dabar, su gyvu žmogumi.",
    "Tikime, kad gilus pokalbis yra bendruomeniškumo šerdis, brandos šaltinis – kažkas beveik sakralaus, ką verta puoselėti ir išsaugoti.",
  ],
  cards: [
    {
      src: "/assets/why-1.webp",
      kicker: "laisvas žmogus",
      title: "Asmeninė laisvė",
      text: "Laisvas žmogus – gebantis mąstyti savo galva, turintis drąsos žvelgti plačiau ir rinktis sąmoningai.",
      variant: "dark",
    },
    {
      src: "/assets/why-2.webp",
      kicker: "ryšys",
      title: "Ryšys bendruomenėje",
      text: "Kuria tikrus, kokybiškus santykius tarp skirtingai mąstančių žmonių.",
      variant: "default",
    },
    {
      src: "/assets/why-3.webp",
      kicker: "atviras žvilgsnis",
      title: "Platesnis akiratis",
      text: "Padeda geriau suprasti pokyčius, išgirsti kitą patirtį ir pamatyti tai, ko nepastebime savo informaciniame burbule.",
      variant: "soft",
    },
  ],
} as const;

export const method = {
  kicker: "Metodas",
  title: "Kas yra „Viešojo dialogo“ metodas?",
  paragraphs: [
    "Viešasis dialogas nėra debatai, ginčas ar tribūninė diskusija. Tai struktūruotas, nešališkai fasilituojamas pokalbis bendro intereso tema.",
    "Mūsų Viešojo dialogo praktikai pasirūpina, kad kiekvienas balsas būtų išgirstas, kiekviena patirtis – priimta su pagarba.",
  ],
  principles: [
    {
      number: "01",
      title: "Kalbame iš patirties, ne iš etikečių",
      text: "Ne „jie visi…“, o „aš patyriau…“. Tai padeda matyti žmogų, o ne jo stovyklą ar etiketę.",
    },
    {
      number: "02",
      title: "Keliame atvirus, tyrinėjančius klausimus",
      text: "Ne „už ar prieš?“, o „kas iš tiesų vyksta ir ko kam reikia?“. Klausimai padeda eiti giliau.",
    },
    {
      number: "03",
      title: "Kuriame saugiai drąsią erdvę",
      text: "Pagarbos taisyklės, lygiateisis dalyvavimas ir besąlyginis kiekvieno priėmimas.",
    },
  ],
};

export const nansen = {
  image: "/assets/nansen-photo.webp",
  alt: "Nansen Center for Peace and Dialogue fasilitatoriai dialogo sesijoje",
  originKicker: "Metodo kilmė",
  title: "Nansen Center for Peace and Dialogue",
  origin: "Norvegijoje gimusi dialogo praktika, skirta padėti žmonėms kalbėtis ten, kur paprastas pokalbis tampa sunkus.",
  link: "Sužinoti apie Nansen centrą →",
  experienceKicker: "Tarptautinė patirtis",
  headline: "Išbandyta konfliktų zonose. Pritaikoma bendruomenėse.",
  stat: "30+",
  statLabel: "metų dialogo praktikos konfliktų zonose ir bendruomenėse",
  paragraphs: [
    "Viešojo dialogo metodą sukūrė Nansen Center for Peace and Dialogue Norvegijoje.",
    "Šis metodas taikomas karo, karštų konfliktų ir visuomeninės įtampos aplinkose, taip pat bibliotekose, muziejuose, savivaldybėse, mokyklose, NVO tinkluose ir organizacijose.",
  ],
};

export const spaces = {
  kicker: "Erdvės",
  title: "Kur gali vykti dialogas?",
  intro: "Dialogas tinka ten, kur žmonėms svarbu kalbėtis apie bendrus klausimus, įtampas, pokyčius ar temas, kurios paliečia bendruomenės gyvenimą.",
  note: "Dialogai taip pat gali vykti muziejuose, NVO tinkluose, verslo organizacijose ar kitose žmonėms patogiose viešose erdvėse.",
  items: [
    { src: "/assets/space-organizacijos.webp", title: "Organizacijose", text: "Kai komandai reikia kalbėti apie pokyčius, įtampas ar bendrą kryptį.", variant: "default" },
    { src: "/assets/space-bendruomenes.webp", title: "Bendruomenėse", text: "Bendruomenės namuose, kieme ar kaimynystėje.", variant: "default" },
    { src: "/assets/space-bibliotekos.webp", title: "Bibliotekose", text: "Atvirose kultūros ir mokymosi erdvėse.", variant: "default" },
    { src: "/assets/space-mokyklos.webp", title: "Mokyklose", text: "Mokiniams, tėvams, mokytojams ar visai bendruomenei.", variant: "default" },
    { src: "/assets/space-savivaldybes.webp", title: "Savivaldybėse", text: "Kai svarbu įtraukti gyventojus ir girdėti skirtingas patirtis.", variant: "default" },
    { src: "/assets/space-kaimynystes.webp", title: "Kaimynystėse", text: "Gyviems susitikimams ten, kur žmonės kasdien gyvena kartu.", variant: "dark" },
  ],
} as const;

export const process = {
  kicker: "Procesas",
  title: "Kaip tai vyksta?",
  steps: [
    { number: "01", title: "Susisiekiate su mumis", text: "Parašote, kokioje erdvėje ar bendruomenėje norėtumėte pradėti dialogą ir kokia tema šiuo metu jums rūpi.", variant: "default" },
    { number: "02", title: "Drauge suformuluojame temą", text: "Išgryniname bendro intereso klausimą: ne „už ar prieš“, o kas iš tiesų vyksta ir ko kam reikia.", variant: "default" },
    { number: "03", title: "Parenkate erdvę ir kviečiate dalyvius", text: "Reikalinga patogi, tyli ir saugi aplinka, kurioje dalyviai gali susėsti U forma arba bendru ratu.", variant: "default" },
    { number: "04", title: "Mes fasilituojame dialogą", text: "Laikome procesą: saugome pagarbą, lygiateisį dalyvavimą ir pasirūpiname, kad kiekvienas balsas būtų išgirstas.", variant: "dark" },
    { number: "05", title: "Aptariame įžvalgas ir tolimesnius žingsnius", text: "Po dialogo galima aptarti, kas buvo išgirsta, kokios temos liko svarbios ir ar reikalingas tęstinis susitikimas.", variant: "default" },
  ],
} as const;

export const faq = {
  practical: {
    kicker: "Formatas",
    title: "Praktinė informacija",
    items: [
      { label: "Trukmė", text: "Įprastai 90–120 min. + 10–15 min. pertraukai ir pabaigos santraukai." },
      { label: "Dalyvių skaičius", text: "Nuo 12 iki 60 žmonių. Didėjant grupei, dirbame su keliomis mažomis grupėmis ir bendru ratu." },
      { label: "Fasilitatoriai", text: "2–3 metodo apmokyti asmenys." },
      { label: "Erdvė", text: "Patogi, tyli ir saugi aplinka, kurioje visi gali matyti vieni kitus." },
    ],
  },
  team: {
    kicker: "Komanda",
    title: "Viešojo dialogo praktikai",
    paragraphs: [
      "Mūsų komanda – Public Dialogue metodo praktikai ir fasilitatoriai. Dirbame nešališkai, saugodami orumą, lygiateisį dalyvavimą ir vadovaudamiesi „nedaryti žalos“ principu.",
      "Prireikus suburiame kelių fasilitatorių komandą, kad procesas būtų stabilus net įtampos akimirkomis.",
    ],
  },
  questions: {
    kicker: "DUK",
    title: "Dažniausi klausimai",
    items: [
      { question: "Ar dialogai tinka „karštoms“ temoms?", answer: "Taip, jei sutariame dėl saugiai drąsių taisyklių ir turime nešališką fasilitavimą.", open: true },
      { question: "Ar tai debatai?", answer: "Ne. Viešasis dialogas nėra skirtas laimėti ginčą.", open: false },
    ],
  },
};

export const cta = {
  kicker: "Kvietimas",
  title: "Paprašyk Viešo dialogo savo erdvėje",
  paragraphs: [
    "Jei jauti, kad subrendo metas pokalbiui iš esmės. Jei pastebi, kad kolegos ar kaimynai tampa svetimi vieni kitiems, kad nesutarimai ima skaldyti bendros veiklos prasmingumą – parašyk mums.",
    "Mes atvyksime ir padėsime sukurti saugią, pagarbią ir gyvą erdvę pokalbiui.",
  ],
  boxTitle: "Pradėkite nuo vienos žinutės",
  boxText: "Papasakokite, kokia tema bręsta jūsų bendruomenėje ar organizacijoje.",
  button: "Paprašyti dialogo",
};

export const support = {
  kicker: "Parama",
  title: "Padėkite dialogams vykti plačiau",
  paragraphs: [
    "Ši iniciatyva remiasi savanoryste ir jūsų pasitikėjimu. Jei norite, kad dialogų būtų daugiau – paremkite mūsų darbą ir padėkite plėsti Viešųjų dialogų geografiją.",
  ],
  purpose: "Viešojo dialogo sesijos",
};

export const footer = {
  copyright: "© 2026 Domus Solis. Visos teisės saugomos.",
};

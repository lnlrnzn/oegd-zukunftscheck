export interface Expert {
  id: string;
  name: string;
  vorname: string;
  nachname: string;
  titel?: string;
  abschluss: string;
  rolle: string;
  firma: string;
  bereich: string;
  kernkompetenzen: string[];
  bio: string;
  initialen: string;
  photo?: string;
  akzent: "blue" | "navy" | "green" | "yellow";
}

export const EXPERTS: Expert[] = [
  {
    id: "kuns",
    name: "Dr. Melanie Kuns",
    vorname: "Melanie",
    nachname: "Kuns",
    titel: "Dr.",
    abschluss: "Master Public Health",
    rolle: "Managerin",
    firma: "Kienbaum Consultants International",
    bereich: "Public & Healthcare",
    kernkompetenzen: [
      "Public Management & Health Care Management",
      "Organisationsentwicklung im ÖGD",
      "Personalbedarfsermittlung",
      "Pakt-ÖGD-Begleitung",
    ],
    bio: "Fast 30 Jahre Beratungserfahrung im Public und Health Care Management. Dozentin an der Akademie für das Öffentliche Gesundheitswesen. Hat zahlreiche Gesundheitsämter im Rahmen des Pakts für den ÖGD begleitet (u.a. Krefeld, Potsdam, Rhein-Sieg-Kreis, Pinneberg, Schleswig-Flensburg) und die Fusion der Gesundheitsämter Stadt und Landkreis Osnabrück konzipiert.",
    initialen: "MK",
    photo: "/experts/melanie.jpg",
    akzent: "green",
  },
  {
    id: "oguz-burchart",
    name: "Iris Oguz-Burchart",
    vorname: "Iris",
    nachname: "Oguz-Burchart",
    abschluss: "",
    rolle: "Senior Manager",
    firma: "Kienbaum Consultants International",
    bereich: "Public & Healthcare",
    kernkompetenzen: [
      "Reorganisation & Organisationsanalysen",
      "Personalbedarfsberechnungen",
      "Change- & Kulturmanagement",
      "Benchmarking",
    ],
    bio: "Senior Manager mit Schwerpunkt auf Reorganisation, Organisationsdesign und Haushaltskonsolidierung. Berät Kommunen, Länder und Bund, Berufsgenossenschaften und Sozialversicherungsträger sowie Wissenschaftseinrichtungen und Kirchen zu Steuerungssystemen und Umsetzungsbegleitung.",
    initialen: "IO",
    photo: "/experts/iris.jpg",
    akzent: "navy",
  },
  {
    id: "elflein",
    name: "Fabian Elflein",
    vorname: "Fabian",
    nachname: "Elflein",
    abschluss: "MBA Global Executive Management",
    rolle: "Manager",
    firma: "Kienbaum Consultants International",
    bereich: "Public & Healthcare · IT-Steuerung und Digitalisierung",
    kernkompetenzen: [
      "Digitalisierungs- und Transformationsprogramme",
      "Governance & Steuerungsmodelle",
      "IT-Organisation Bund/Land/Kommune",
      "Top-Management-Beratung",
    ],
    bio: "Über 15 Jahre Erfahrung in strategischer Organisations- und IT-Beratung für öffentliche Auftraggeber auf Bundes-, Landes- und kommunaler Ebene (u.a. BMI, BMAS, BMWSB, Bundesagentur für Arbeit). Zertifiziert in Scrum, SAFe, ITIL 4, COBIT 5, Prince2 Agile und Six Sigma Black Belt.",
    initialen: "FE",
    photo: "/experts/fabian.jpg",
    akzent: "blue",
  },
  {
    id: "lorenzen",
    name: "Matti Lorenzen",
    vorname: "Matti",
    nachname: "Lorenzen",
    abschluss: "M. Sc. Betriebswirtschaftslehre",
    rolle: "Consultant",
    firma: "Kienbaum Consultants International",
    bereich: "Public & Healthcare",
    kernkompetenzen: [
      "Prozessmanagement im ÖGD",
      "Prozessdigitalisierung",
      "Personalbedarfsermittlung",
      "Datenbasierte Auswertungen",
    ],
    bio: "Consultant mit Fokus auf Prozessmanagement in öffentlichen und Sozialversicherungs-Organisationen. Bringt Vorerfahrung aus dem Gesundheitswesen mit (u.a. strategische Transformationsprojekte in einer großen Vorsorgeklinik). Projekte in Kreisverwaltungen, Kommunen und Berufsgenossenschaften. Zertifiziert in Scrum (PSM I) und PRINCE2.",
    initialen: "ML",
    photo: "/experts/matti.jpg",
    akzent: "yellow",
  },
];

export const EXPERTS_KONTAKT = {
  firma: "Kienbaum Consultants International GmbH",
  geschaeftsbereich: "Public & Healthcare",
  website: "https://www.kienbaum.com/",
};

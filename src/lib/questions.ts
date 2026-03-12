export interface Question {
  id: number;
  prozess: string;
  frage: string;
  optionen: { label: string; wert: number }[];
}

export const questions: Question[] = [
  {
    id: 1,
    prozess: "Amtsärztliche Begutachtungen",
    frage:
      "Wie läuft der Prozess der amtsärztlichen Begutachtungen in Ihrem Amt ab?",
    optionen: [
      { label: "Vollständig digital (Terminbuchung, Dokumentation, Befundübermittlung)", wert: 0 },
      { label: "Teilweise digital (z.\u00A0B. digitale Dokumentation, aber Papierformulare)", wert: 1 },
      { label: "Überwiegend analog (Papierakten, manuelle Terminvergabe)", wert: 2 },
    ],
  },
  {
    id: 2,
    prozess: "Einstellungsuntersuchungen",
    frage:
      "Wie werden Einstellungsuntersuchungen in Ihrem Amt organisiert und dokumentiert?",
    optionen: [
      { label: "Vollständig digital (Online-Anmeldung, digitale Befunde, automatisierte Bescheide)", wert: 0 },
      { label: "Teilweise digital (z.\u00A0B. digitale Befunde, aber manuelle Terminplanung)", wert: 1 },
      { label: "Überwiegend analog (Papierformulare, Aktenordner)", wert: 2 },
    ],
  },
  {
    id: 3,
    prozess: "Medizinalstatistik / Berichtswesen",
    frage:
      "Wie erstellen Sie Ihre Medizinalstatistiken und Berichte?",
    optionen: [
      { label: "Vollständig digital (automatisierte Auswertungen, Dashboard-basiert)", wert: 0 },
      { label: "Teilweise digital (Excel-basiert, manuelle Zusammenführung)", wert: 1 },
      { label: "Überwiegend analog (händische Erfassung, Papierberichte)", wert: 2 },
    ],
  },
  {
    id: 4,
    prozess: "Hygieneüberwachung / -begehungen",
    frage:
      "Wie werden Hygieneüberwachungen und -begehungen in Ihrem Amt durchgeführt?",
    optionen: [
      { label: "Vollständig digital (mobile Erfassung vor Ort, digitale Checklisten, automatisierte Berichte)", wert: 0 },
      { label: "Teilweise digital (z.\u00A0B. Nachbereitung digital, Vor-Ort-Erfassung auf Papier)", wert: 1 },
      { label: "Überwiegend analog (Papierprotokolle, manuelle Nachbereitung)", wert: 2 },
    ],
  },
  {
    id: 5,
    prozess: "Schulärztliche Gutachten",
    frage:
      "Wie werden schulärztliche Gutachten in Ihrem Amt erstellt und verwaltet?",
    optionen: [
      { label: "Vollständig digital (digitale Untersuchungsbögen, elektronische Übermittlung an Schulen)", wert: 0 },
      { label: "Teilweise digital (z.\u00A0B. digitale Erfassung, aber Papierversand)", wert: 1 },
      { label: "Überwiegend analog (Papierformulare, händische Archivierung)", wert: 2 },
    ],
  },
  {
    id: 6,
    prozess: "Einschulungsuntersuchungen",
    frage:
      "Wie laufen Einschulungsuntersuchungen organisatorisch ab?",
    optionen: [
      { label: "Vollständig digital (Online-Terminbuchung, digitale Befunderhebung, elektronischer Datenaustausch)", wert: 0 },
      { label: "Teilweise digital (z.\u00A0B. digitale Dokumentation, aber Einladung per Post)", wert: 1 },
      { label: "Überwiegend analog (Papiereinladungen, Papierbögen, manuelle Auswertung)", wert: 2 },
    ],
  },
  {
    id: 7,
    prozess: "Zahnärztliche Reihenuntersuchungen",
    frage:
      "Wie werden zahnärztliche Reihenuntersuchungen in Kitas und Schulen durchgeführt?",
    optionen: [
      { label: "Vollständig digital (mobile Erfassung, automatisierte Elternbriefe, digitale Statistik)", wert: 0 },
      { label: "Teilweise digital (z.\u00A0B. digitale Statistik, aber Erfassung auf Papier)", wert: 1 },
      { label: "Überwiegend analog (Papierbefundbögen, händische Auswertung)", wert: 2 },
    ],
  },
  {
    id: 8,
    prozess: "Meldepflichtige Erkrankungen (IfSG)",
    frage:
      "Wie werden Meldungen nach dem Infektionsschutzgesetz in Ihrem Amt bearbeitet?",
    optionen: [
      { label: "Vollständig digital (DEMIS-Anbindung, automatisierte Workflows, digitale Kontaktnachverfolgung)", wert: 0 },
      { label: "Teilweise digital (z.\u00A0B. DEMIS-Eingang, aber manuelle Nachbearbeitung)", wert: 1 },
      { label: "Überwiegend analog (Faxmeldungen, Papierakten, manuelle Weiterleitung)", wert: 2 },
    ],
  },
  {
    id: 9,
    prozess: "Todesbescheinigungen / Leichenschau",
    frage:
      "Wie werden Todesbescheinigungen und Leichenschau-Dokumentation verwaltet?",
    optionen: [
      { label: "Vollständig digital (elektronische Todesbescheinigung, digitale Archivierung)", wert: 0 },
      { label: "Teilweise digital (z.\u00A0B. Scannen der Papierbescheinigungen, digitale Statistik)", wert: 1 },
      { label: "Überwiegend analog (Papier-Todesbescheinigungen, physische Archive)", wert: 2 },
    ],
  },
  {
    id: 10,
    prozess: "Krisenmanagement (PsychKG / Katastrophenschutz)",
    frage:
      "Wie ist Ihr Amt für Krisenmanagement und Einsätze nach PsychKG aufgestellt?",
    optionen: [
      { label: "Vollständig digital (digitale Einsatzplanung, elektronische Dokumentation, Lagezentrum-Software)", wert: 0 },
      { label: "Teilweise digital (z.\u00A0B. digitale Kommunikation, aber Papier-Einsatzpläne)", wert: 1 },
      { label: "Überwiegend analog (Papier-Einsatzpläne, Telefonketten, physische Akten)", wert: 2 },
    ],
  },
];

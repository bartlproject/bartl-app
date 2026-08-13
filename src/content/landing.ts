// SPDX-License-Identifier: CC-BY-4.0
export const landingCopy = {
  de: {
    heroEyebrow: "Ein Startpfad. Mehrere Zustände.",
    heroTitle:
      "Installieren, wiederherstellen, aktualisieren: ein gemeinsamer Startpfad.",
    heroBody:
      "Bartl ist ein offenes Entwurfsmuster für den Lebenszyklus zustandsbehafteter Anwendungen. Beim Start beobachtet der Mechanismus lokalen Zustand, einen verfügbaren Sicherungsstand sowie Engine- und Zustandsversion. Daraus folgt initialisieren, wiederherstellen, produktspezifisch migrieren, bedienen oder kontrolliert abbrechen.",
    heroPrimary: "WordPress-Referenz ausführen",
    heroPrimaryAria:
      "Ausführbare WordPress-Referenz auf Codeberg öffnen, neuer Tab",
    heroSecondary: "Entscheidungslogik ansehen",
    heroDerivation: "Herleitung lesen",
    heroSpec: "Technische Spec lesen",
    problemEyebrow: "Das konkrete Problem",
    problemTitle: "Operationsnamen sind kein Zustand.",
    problemBody: [
      "Erstinstallation, Wiederherstellung und Update werden oft als getrennte Prozeduren modelliert. Dann entscheidet der aufgerufene Befehl, obwohl dieselben Tatsachen am Ziel maßgeblich sind.",
      "Bartl beginnt deshalb immer mit derselben Beobachtung. Gibt es gültigen lokalen Zustand? Liegt ein gültiger Sicherungsstand vor? Wie verhalten sich Engine- und Zustandsversion? Erst diese Antworten bestimmen die Aktion.",
    ],
    mechanismEyebrow: "Entscheidungslogik",
    mechanismTitle:
      "Der Zustand wählt den Pfad, nicht der Name einer angeforderten Operation.",
    mechanismBody:
      "Wähle unter dem Pseudocode einen beobachteten Fall. Der Mechanismus prüft widersprüchliche oder unvollständige Eingaben, bevor er Zustand verwendet oder verändert.",
    tableTitle: "Zustand und Aktion",
    tableState: "Beobachtung",
    tableAction: "Aktion",
    tableCaption: "Zuordnung von beobachtetem Zustand und Startaktion",
    decisionRows: [
      ["Lokaler Zustand, Versionen gleich", "bedienen"],
      ["Lokaler Zustand, Engine neuer", "produktspezifisch migrieren, erneut beobachten"],
      ["Lokaler Zustand, Engine älter", "als Downgrade kontrolliert abbrechen"],
      ["Kein lokaler Zustand, gültiger Sicherungsstand", "Backup prüfen, wiederherstellen, erneut beobachten"],
      ["Kein lokaler Zustand, kein Sicherungsstand", "initialisieren, erneut beobachten"],
      ["Widersprüchliche oder unvollständige Eingaben", "kontrolliert abbrechen"],
    ],
    inputsEyebrow: "Technischer Vertrag",
    inputsTitle: "Vier Eingaben muß die Anwendung eindeutig verarbeiten.",
    inputsBody:
      "Der gemeinsame Startpfad bleibt klein, wenn Release, Zustand, Sicherung und Konfiguration voneinander getrennt sind.",
    inputs: [
      {
        title: "Versioniertes Release",
        body: "Ein unveränderliches Anwendungsartefakt mit bekannter Engine-Version und der produktspezifischen Migrationslogik, die zu diesem Release gehört.",
      },
      {
        title: "Vollständig deklarierter Zustand",
        body: "Alle veränderlichen Daten und Metadaten einschließlich einer zuverlässig ermittelbaren Zustandsversion. Nicht deklarierter Zustand kann nicht belastbar gesichert oder wiederhergestellt werden.",
      },
      {
        title: "Gültiger Sicherungsstand",
        body: "Ein vollständig veröffentlichter und vor Verwendung geprüfter Stand. Für eine echte Erstinitialisierung muß eindeutig feststehen, daß kein solcher Stand vorliegt.",
      },
      {
        title: "Zielkonfiguration",
        body: "Vom Ziel gelieferte Endpunkte und Zugangsdaten. Sie werden beim Start gebunden und gehören weder in das Release noch in den gesicherten Zustand.",
      },
    ],
    referenceEyebrow: "Ausführbare Referenz",
    referenceTitle: "WordPress, MySQL und Docker Compose als prüfbares Beispiel.",
    referenceBody:
      "bartl-wordpress setzt den Mechanismus für eine festgeschriebene WordPress-Konfiguration um. Datenbank und Uploads bilden den Zustand. WordPress-Core, Plugins und Themes bleiben unveränderlicher Image-Inhalt.",
    referenceFacts: [
      ["Zustand", "MySQL-Datenbank und wp-content/uploads"],
      ["Release", "WordPress-Core, Plugins und Themes im Image"],
      ["Backup", "Prüfsummen für alle Bestandteile und .sha256 als Commit-Marker"],
      ["Restore", "Nur auf einem leeren, kompatiblen Ziel mit vollständigen Eingaben"],
      ["Fehlerfall", "Abbruch bei fehlenden, unvollständigen oder widersprüchlichen Eingaben"],
    ],
    quickstartTitle: "Quickstart",
    quickstartBody:
      "Voraussetzung ist ein Linux-Host mit Docker und Docker Compose. Ohne WORDPRESS_PUBLIC_URL läuft die lokale Referenz unter http://localhost:8080.",
    backupLabel: "Nach der WordPress-Initialisierung einen Sicherungsstand veröffentlichen:",
    referenceLink: "Repository und Runbook auf Codeberg",
    referenceAria: "bartl-wordpress auf Codeberg öffnen, neuer Tab",
    proofTitle: "Nachweisgrenze",
    proofBody:
      "Die Referenz belegt den Mechanismus nur für diese WordPress-Konfiguration. Sie belegt weder andere Anwendungen noch die Qualität einer Zielumgebung oder eine bestimmte Wiederanlaufzeit.",
    scopeEyebrow: "Klare Grenze",
    scopeTitle: "Was Bartl leistet und was ausdrücklich nicht.",
    doesTitle: "Bartl leistet",
    does: [
      "lokalen Zustand, Sicherungsstand sowie Engine- und Zustandsversion beobachten",
      "den Startpfad aus diesen Beobachtungen wählen",
      "Backups vor ihrer Verwendung prüfen",
      "produktspezifische Migration aufrufen",
      "bei Downgrade, Inkonsistenz oder fehlenden Voraussetzungen abbrechen",
      "denselben Pfad bei Normalstart und Restore verwenden",
    ],
    doesNotTitle: "Bartl leistet nicht",
    doesNot: [
      "Zielinfrastruktur bereitstellen",
      "Netzwerk, DNS, TLS oder Identity einrichten",
      "externen Backup-Speicher betreiben",
      "Backups oder Migrationen für beliebige Produkte erzeugen",
      "Verfügbarkeit oder Wiederanlaufzeiten garantieren",
      "Traffic oder Schreibautorität koordinieren",
      "einen vollständigen Betriebs- oder Recovery-Prozeß ersetzen",
    ],
    fitEyebrow: "Eignung",
    fitTitle: "Das Muster braucht eine saubere Zustandsgrenze.",
    suitableTitle: "Geeignet, wenn",
    suitable: [
      "der veränderliche Zustand vollständig benannt und versioniert werden kann",
      "Release, Zustand und Zielkonfiguration sauber getrennt sind",
      "Backup-Integrität und Restore automatisiert geprüft werden können",
      "produktspezifische Migrationen deterministisch aufgerufen werden können",
    ],
    unsuitableTitle: "Nicht geeignet, wenn",
    unsuitable: [
      "kritischer Zustand unbekannt oder über unkontrollierte Orte verteilt bleibt",
      "ein leerer, gültiger und beschädigter Zustand nicht unterscheidbar sind",
      "Release und Laufzeitzustand nicht voneinander getrennt werden können",
      "der Startmechanismus externe Betriebsaufgaben vollständig übernehmen soll",
    ],
    ctaTitle: "Den Mechanismus am laufenden Beispiel prüfen.",
    ctaBody:
      "Die Referenz ausführen, einen Sicherungsstand erzeugen und den Start auf einem leeren kompatiblen Ziel beobachten. Die Spec beschreibt den engen Vertrag dahinter.",
    ctaPrimary: "Referenz auf Codeberg öffnen",
    ctaDerivation: "Warum dieser Mechanismus so aussieht",
    ctaSecondary: "Technische Spec lesen",
  },
  en: {
    heroEyebrow: "One startup path. Multiple states.",
    heroTitle: "Install, restore, upgrade: one shared startup path.",
    heroBody:
      "Bartl is an open design pattern for the lifecycle of stateful applications. At startup, the mechanism observes local state, an available backup, and the engine and state versions. It then initializes, restores, invokes product-specific migration, serves, or aborts in a controlled way.",
    heroPrimary: "Run the WordPress reference",
    heroPrimaryAria:
      "Open the executable WordPress reference on Codeberg in a new tab",
    heroSecondary: "See the decision logic",
    heroDerivation: "Read the derivation",
    heroSpec: "Read the technical spec",
    problemEyebrow: "The concrete problem",
    problemTitle: "Operation names are not state.",
    problemBody: [
      "Fresh installation, restore, and upgrade are often modeled as separate procedures. The requested command then determines the path even though the same facts at the target are what matter.",
      "Bartl always starts with the same observation. Is valid local state present? Is a valid backup available? How do the engine and state versions compare? Only those answers determine the action.",
    ],
    mechanismEyebrow: "Decision logic",
    mechanismTitle:
      "State selects the path, not the name of a requested operation.",
    mechanismBody:
      "Select an observed case below the pseudocode. The mechanism checks contradictory or incomplete inputs before it uses or changes state.",
    tableTitle: "State and action",
    tableState: "Observation",
    tableAction: "Action",
    tableCaption: "Mapping of observed state to startup action",
    decisionRows: [
      ["Local state, versions equal", "serve"],
      ["Local state, newer engine", "run product-specific migration, observe again"],
      ["Local state, older engine", "abort the downgrade in a controlled way"],
      ["No local state, valid backup", "verify the backup, restore, observe again"],
      ["No local state, no backup", "initialize, observe again"],
      ["Contradictory or incomplete inputs", "abort in a controlled way"],
    ],
    inputsEyebrow: "Technical contract",
    inputsTitle: "The application must handle four inputs unambiguously.",
    inputsBody:
      "The shared startup path stays small when release, state, backup, and configuration remain separate.",
    inputs: [
      {
        title: "Versioned release",
        body: "An immutable application artifact with a known engine version and the product-specific migration logic that belongs to that release.",
      },
      {
        title: "Fully declared state",
        body: "All mutable data and metadata, including a reliably detectable state version. Undeclared state cannot be backed up or restored dependably.",
      },
      {
        title: "Valid backup",
        body: "A fully published backup that is verified before use. For a genuine first initialization, the absence of such a backup must be unambiguous.",
      },
      {
        title: "Target configuration",
        body: "Endpoints and credentials supplied by the target. They are bound at startup and belong neither in the release nor in the backed-up state.",
      },
    ],
    referenceEyebrow: "Executable reference",
    referenceTitle: "WordPress, MySQL, and Docker Compose as an inspectable example.",
    referenceBody:
      "bartl-wordpress implements the mechanism for one pinned WordPress configuration. The database and uploads are state. WordPress core, plugins, and themes remain immutable image content.",
    referenceFacts: [
      ["State", "MySQL database and wp-content/uploads"],
      ["Release", "WordPress core, plugins, and themes in the image"],
      ["Backup", "Checksums for every member and .sha256 as the commit marker"],
      ["Restore", "Only to an empty, compatible target with complete inputs"],
      ["Failure", "Abort on missing, incomplete, or contradictory inputs"],
    ],
    quickstartTitle: "Quickstart",
    quickstartBody:
      "The prerequisite is a Linux host with Docker and Docker Compose. Without WORDPRESS_PUBLIC_URL, the local reference runs at http://localhost:8080.",
    backupLabel: "Publish a backup after WordPress has been initialized:",
    referenceLink: "Repository and runbook on Codeberg",
    referenceAria: "Open bartl-wordpress on Codeberg in a new tab",
    proofTitle: "Evidence boundary",
    proofBody:
      "The reference demonstrates the mechanism only for this WordPress configuration. It demonstrates neither other applications nor the quality of a target environment or a particular restart time.",
    scopeEyebrow: "Explicit boundary",
    scopeTitle: "What Bartl does and expressly does not do.",
    doesTitle: "Bartl does",
    does: [
      "observe local state, backup availability, and engine and state versions",
      "select the startup path from those observations",
      "verify backups before using them",
      "invoke product-specific migration",
      "abort on downgrade, inconsistency, or missing prerequisites",
      "use the same path for normal startup and restore",
    ],
    doesNotTitle: "Bartl does not",
    doesNot: [
      "provision target infrastructure",
      "configure network, DNS, TLS, or identity",
      "operate external backup storage",
      "create backups or migrations for arbitrary products",
      "guarantee availability or restart times",
      "coordinate traffic or write authority",
      "replace a complete operations or recovery process",
    ],
    fitEyebrow: "Fit",
    fitTitle: "The pattern requires a clean state boundary.",
    suitableTitle: "A good fit when",
    suitable: [
      "mutable state can be named completely and versioned",
      "release, state, and target configuration are cleanly separated",
      "backup integrity and restore can be checked automatically",
      "product-specific migrations can be invoked deterministically",
    ],
    unsuitableTitle: "Not a fit when",
    unsuitable: [
      "critical state is unknown or spread across uncontrolled locations",
      "empty, valid, and damaged state cannot be distinguished",
      "release and runtime state cannot be separated",
      "the startup mechanism is expected to perform every external operating task",
    ],
    ctaTitle: "Inspect the mechanism in a running example.",
    ctaBody:
      "Run the reference, publish a backup, and observe startup on an empty compatible target. The spec describes the narrow contract behind it.",
    ctaPrimary: "Open the reference on Codeberg",
    ctaDerivation: "Why the mechanism looks this way",
    ctaSecondary: "Read the technical spec",
  },
} as const;

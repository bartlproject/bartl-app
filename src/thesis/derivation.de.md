<!-- SPDX-License-Identifier: CC-BY-4.0 -->

# Bartl

Ein Entwurfsmuster für den Lebenszyklus zustandsbehafteter Anwendungen. Beim Start entscheidet ein Mechanismus anhand des vorgefundenen Zustands, eines extern verfügbaren Backups und der Versionen. Er folgt nicht einer vom Betreiber angeforderten Operation.

Website: [bartl.app/de](https://bartl.app/de/)

## Zweck und Wirkungsmodell

Eine Organisation erfüllt ihren Auftrag nur, wenn berechtigte Nutzer die erforderliche Fachleistung erhalten. Dazu müssen sie die Anwendung erreichen, und die Anwendung muß ihre erforderlichen Abhängigkeiten erreichen. Anwendung, Zustand und Abhängigkeiten müssen dabei nicht nur verfügbar, sondern auch fachlich richtig und vertrauenswürdig sein.

```text
Auftrag
-> erforderliche Fachleistung
-> verantwortete Schutz- und Betriebsziele
-> benötigte Fähigkeiten und Nachweise
```

Resilienz bezeichnet die Fähigkeit, eine Fachleistung unter einer benannten Störung aufrechtzuerhalten oder innerhalb verantworteter Schadensgrenzen wiederherzustellen. Wechselfähigkeit bezeichnet die nachgewiesene betriebliche Fähigkeit, die vollständige Leistungskette in eine andere Betriebsdomäne zu verlagern. Souveränität bezeichnet die Fähigkeit der Organisation, unabhängig zu entscheiden und diese Entscheidung ohne untragbare fremde Abhängigkeit wirksam auszuführen. Souveränität ist keine Eigenschaft eines Providers oder Produkts.

Keine dieser Fähigkeiten folgt allgemein aus einer anderen. Ein providerinternes Failover kann resilient sein, ohne einen unabhängigen Wechsel zu erlauben. Ein portabler Export kann einen Wechsel ermöglichen, ohne RTO, RPO oder fachliche Funktion zu halten. Erst ein benanntes Bedrohungsprofil verbindet die Anforderungen.

```text
Bedrohungsprofil "Verlust der bisherigen Providerdomäne"
-> Resilienz: Fachleistung innerhalb der Schutzgrenzen wiederherstellen
-> Souveränität: Wechsel unabhängig entscheiden und wirksam ausführen
-> gemeinsame Bedingung: Recovery ohne Mitwirkung der verlorenen Domäne
```

Ein Produktionsausfall wirft drei Geschäftsfragen auf. Wie viele Nutzer sind betroffen, wann ist die erforderliche Fachleistung wieder verfügbar und welcher Datenstand läßt sich wiederherstellen? Der Bartl-Pfad macht den produktseitigen Anwendungs- und Zustandsanteil hinter den letzten beiden Antworten wiederholbar. Konkrete RTO- und RPO-Werte hängen zusätzlich von Backup-Takt, Zielbereitstellung, Übertragung, Erreichbarkeit und fachlicher Abnahme ab.

## Die Recovery-Entscheidung

Jede Fachleistung erhält eine Recovery-Entscheidung mit bedrohungsspezifischem Schutzprofil. Nicht jede Fachleistung benötigt dieselbe RTO, RPO, Zielvorhaltung oder Drill-Tiefe. Eine schwer lösbare Betriebs- oder Vertragsabhängigkeit darf aber nicht erstmals eingegangen, verlängert oder erneut akzeptiert werden, bevor die Entscheidung getroffen ist.

Die Recovery-Entscheidung benennt mindestens:

- Auftrag, Fachleistung und den im Notbetrieb erforderlichen Mindestfunktionsumfang;
- Bedrohungsprofil und verlorene oder nicht mehr vertrauenswürdige Betriebs- und Vertragsdomänen;
- RTO, RPO, Blast Radius und die Frist bis zum vollständigen Normalbetrieb;
- benötigte Recovery-Verträge für Anwendung, Zustand und jede notwendige Abhängigkeit;
- verantwortliche Fach-, Produkt-, Betriebs-, Sicherheits- und Risikorollen;
- den Stand der Nachweise und den nächsten erforderlichen Drill;
- verbleibende Lücken und genau einen verantworteten Ausgang.

Zulässige Ausgänge sind Erfüllung, Transformation der bestehenden Anwendung, Ersatz durch ein anderes Produkt oder vorbereitetes Ersatzverfahren sowie eine befristete Ausnahme. Eine Ausnahme benennt Risikoträger, Kompensationsmaßnahmen, Ablaufdatum und die nächste Entscheidung. "Teilweise erfüllt" ist ein Befund, aber kein abgeschlossener Ausgang.

Die Fachverantwortung bestimmt Fachleistung, Mindestfunktionsumfang und Entscheidung. Produkt, Betrieb und Sicherheit liefern die jeweiligen Nachweise. Eine Ausnahme darf nur der dafür mandatierte Risikoträger akzeptieren.

## Verketteter Service-Recovery-Vertrag

Der Service-Recovery-Vertrag beschreibt die vollständige Leistungskette vom Nutzer bis zum fachlichen Ergebnis. Er kann durch die Wiederherstellung derselben Anwendung oder durch ein vorab qualifiziertes Ersatzverfahren erfüllt werden. Ein Ersatzverfahren kann Resilienz und souveräne Handlungsfähigkeit tragen, ist aber nicht Bartl-konform.

Bei einer Bartl-Wiederherstellung bleibt die fachliche Anwendungsidentität erhalten. Ein akzeptiertes Release derselben Produktlinie wird mit einer lückenlos zuordenbaren Zustandslinie verbunden und fachlich abgenommen. Eine geprüfte Migration beim Restore ist zulässig. Ein funktional gleichwertiges anderes Produkt bleibt ein Ersatzverfahren.

Jede nicht durch Bartl transportierte Abhängigkeit benötigt einen eigenen Recovery- oder Ersatzvertrag. Dazu können Datenbank, Schlüssel und HSM, Lizenz- und Installationsrechte, Netz, Identity, Service-Adresse und Zielkapazität gehören. Der Gesamtnachweis ist erst geschlossen, wenn alle für den Mindestfunktionsumfang notwendigen Verträge erfüllt sind.

Ein Recovery Set steht nur dann unter unabhängiger Verfügungsgewalt, wenn Releases, Zustände, Schlüssel, Vertrauensanker und Verfahrensinformationen nach vollständigem Verlust der bisherigen Betriebs- und Administrationsdomäne erreichbar und nutzbar bleiben. Ein Speicherort bei einem anderen Provider oder mehrere Kopien genügen dafür nicht, wenn Konten, Schlüssel oder Administration weiterhin dieselbe Fehlerdomäne bilden.

RTO und RPO sind Sollgrenzen. RTA und RPA halten die im Drill tatsächlich erreichte Wiederanlaufzeit und den tatsächlich zu erwartenden Datenverlust fest. Innerhalb der RTO muß der definierte Mindestfunktionsumfang fachlich abgenommen sein. Der vollständige Normalbetrieb folgt innerhalb einer gesondert verantworteten Wiederherstellungsfrist.

## Nachweisstufen und Aussagegrenzen

| Aussage                                          | Mindestens erforderlicher Nachweis                                                                                                                      | Nicht belegt                                                                  |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Bartl-konform                                    | Versionierter Produktvertrag, akzeptiertes Release und Recovery Point, erfolgreicher Restore oder Migration bis zur produktseitigen Abnahmebereitschaft | vollständige Fachleistung, RTO/RPO oder Providerwechsel                       |
| Recovery-fähig für ein benanntes Schutzprofil    | Geschlossene Recovery-Vertragskette, technisch entzogene Quelle, RTA/RPA innerhalb der Grenzen und fachlich abgenommener Mindestfunktionsumfang         | produktive Umschaltung und neue Schreibautorität                              |
| Praktisch providerwechselfähig für dieses Profil | Zusätzlich ein Exit-Drill mit stabiler Service-Adresse, Fencing, eindeutiger Schreibautorität sowie Fortschalt- und Rückfallentscheidung                | allgemeine Wechselfähigkeit anderer Anwendungen, Ziele oder Bedrohungsprofile |

Souveränität bleibt eine Eigenschaft der Organisation. Keines der drei Labels macht einen Provider, ein Produkt oder einen einzelnen Drill "souverän".

Der Bartl- und Produktnachweis wird bei materiellen Änderungen an Release, Zustandsvertrag oder Migrationslogik erneuert. Der Ende-zu-Ende-Nachweis wird bei Änderungen an Schutzprofil, Ziel, Identity, Netz oder Cutover sowie zusätzlich periodisch erneuert. Ein erfolgreicher Lauf bleibt kein zeitlich unbegrenztes Zertifikat.

Beim Recovery-Drill sind Quellzugang, Quelladministration und Quell-APIs für das Recovery-Team technisch entzogen. Recovery Set und Evidence-Archiv liegen außerhalb dieser Domäne. Jede notwendige Rückfrage an die Quelle ist ein Befund. Erst der zusätzliche Exit-Drill prüft Nutzerumschaltung, Fencing und Schreibautorität.

Bis zum Authority Commit darf ein Exit abgebrochen und eine unveränderte eingefrorene Quelle reaktiviert werden. Nach autoritativen Schreibzugriffen am Ziel gibt es keinen Rücksprung auf die alte Generation. Ein weiterer Ausfall führt zu einer neuen Recovery-Generation aus einem akzeptierten Stand.

## Der kanonische Bartl-Schnitt

### Leitgedanke

Wiederherstellbarkeit ist keine Notfallzugabe, sondern eine Voraussetzung für verantwortbaren Betrieb. Ein separater, selten benutzter Restore-Pfad veraltet. Ein regelmäßig benutzter gemeinsamer Mechanismus für Installation, Wiederherstellung, Upgrade und Migration hält die Recovery-Fähigkeit im normalen Lebenszyklus.

### Muster

Bartl verantwortet das festgeschriebene Anwendungsrelease, den deklarierten Zustand sowie den Pfad für Initialisierung, Wiederherstellung und Migration bis `serving()`. Es verzweigt nach beobachteten Tatsachen am Ziel und nicht nach Operationsnamen.

`serving()` bedeutet, daß Release und Zustand kompatibel, intern konsistent und durch die vom Produkt bereitgestellten Prüfungen abnahmebereit sind. Der Zustand belegt weder Nutzererreichbarkeit noch den fachlich abgenommenen Notbetrieb.

Der Vertrag gilt als Anforderung für jede Anwendung, die diesen Teil der Wechselfähigkeit beansprucht. Eine Referenz beweist nicht die Konformität anderer Anwendungen. Jedes Produkt muß sein Zustandsinventar, seine Migrationslogik, seine Sicherung und seinen Wiederanlauf selbst implementieren und ausführen.

### Umgebender Service-Recovery-Vertrag

Die vollständige Fachleistung benötigt zusätzlich ein qualifiziertes und provisionierbares Ziel, vertrauenswürdige Software- und Recovery-Lieferketten, Identity und Berechtigungen, Nutzer- und Abhängigkeitserreichbarkeit, eine stabile Service-Identität, eindeutige Schreibautorität, Aktivierung und fachliche Abnahme. Diese Bedingungen entscheiden über den Ende-zu-Ende-Drill. Sie sind nicht Teil des Bartl-Mechanismus.

## Vertrag mit vier Eingaben

Der Startmechanismus beruht auf vier Eingaben, die das Produkt und seine Umgebung bereitstellen.

| Eingabe                                              | Bedeutung                                                                                                               |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Festgeschriebenes und akzeptiertes Anwendungsrelease | Unveränderliches Release einschließlich produktbezogener Migrationslogik                                                |
| Deklariertes Zustandsinventar                        | Portabler veränderlicher Zustand einschließlich Zustandsversion                                                         |
| Dauerhafter, unabhängig kontrollierter Store         | Vom Quellbetrieb unabhängig verfügbarer Speicher mit einem vollständig veröffentlichten und akzeptierten Recovery Point |
| Zielkonfiguration                                    | Vom Ziel bereitgestellte Konfiguration wie Endpunkt und Zugangsdaten                                                    |

Für die WordPress-Referenz besteht das Zustandsinventar aus Datenbank und Uploads. Zum Anwendungsrelease gehören WordPress-Core, Plugins und Themes. Endpunkt und Zugangsdaten liefert die Zielumgebung. Diese Trennung ist Teil des Vertrags. Ein Image ersetzt weder Datenbank noch Uploads, und Zugangsdaten gehören nicht in das Backup-Format.

Technische Integritätsprüfung und Vertrauensentscheidung sind verschieden. Prüfsummen erkennen eine nachträgliche Veränderung, aber keinen bereits kompromittierten Build und keinen fachlich falschen Sicherungsstand. Produkt und Betreiber müssen deshalb festlegen, welche Kombination aus Release und Recovery Point akzeptiert ist. Eine Supply-Chain-Attacke kann diese Akzeptanz aufheben, ohne daß eine Prüfsumme fehlschlägt. Herkunftsnachweis, Trust Roots, Schlüsselrotation und fachliche Vertrauensentscheidung liegen außerhalb von Bartl.

Aus den vier Eingaben leitet der Mechanismus drei Beobachtungen für seine Verzweigung ab: Existiert gültiger lokaler Zustand? Ist ein vollständig veröffentlichter und akzeptierter Recovery Point verfügbar? Wie verhält sich die Engine-Version zur Zustandsversion?

## Beobachteter Startpfad

Der Mechanismus prüft zuerst den lokalen Zustand. Ist er vorhanden, vergleicht er Engine- und Zustandsversion. Ist keiner vorhanden, versucht er ein externes Backup zu beziehen und zu prüfen. Erst ohne ein gültiges Backup initialisiert er einen neuen Zustand.

```python
until serving():
    if local_state_exists():
        if engine_version == state_version: serving()
        elif engine_version > state_version: migrate()
        else: abort("downgrade")
    elif valid_external_backup(): restore()
    else: init()
```

Nach `init()`, `restore()` oder `migrate()` wird der Zustand erneut beobachtet. Der Code verzweigt damit nach Tatsachen am Ziel, nicht nach Labels wie "Restore", "Upgrade" oder "Migration". Ein Fehlschlag wird nicht dadurch geheilt, daß ein anderer Operationsname gewählt wird. Die Anwendung muß erkennen können, ob lokaler Zustand gültig ist. Nicht jede inhaltliche Korruption ist allein aus seiner Existenz ableitbar.

## Folgerungen aus dem Mechanismus

Ein Neustart führt bei gleichem, gültigem lokalem Zustand direkt zum Dienst. Ohne lokalen Zustand führt ein gültiges externes Backup über `restore()` zurück zum Versionsvergleich. Fehlt beides, erzeugt `init()` einen neuen Zustand.

Ein Upgrade mit neuerer Engine benötigt produktbezogene Migrationslogik. Bartl stellt den Entscheidungspunkt bereit, aber keine universelle Migration. Eine ältere Engine als der Zustand bricht ab.

Wiederherstellung, Migration und Evakuierung können denselben Anwendungs- und Zustandspfad nutzen, wenn das Ziel mit der Anwendung kompatibel und ein akzeptierter Recovery Point extern verfügbar ist. Bei einem Zielwechsel ändern sich Provider, Endpunkt und Konfiguration, nicht die Bedeutung von Release, Datenbank, Dateien und Zustandsversion.

Nach autoritativen Schreibzugriffen auf einem neuen Ziel darf eine frühere Recovery-Generation nicht wieder aktiviert werden. Bei einem weiteren Ausfall wählt die umgebende Orchestrierung einen akzeptierten Datenstand und aktiviert eine neue Generation auf dem nächsten Ziel. Bartl führt dort wieder denselben Anwendungs- und Zustandspfad aus. Es verwaltet weder globale Generationen noch Schreibautorität oder Cutover.

Daraus folgen ein einheitlicher Ausführungspfad und weniger unterschiedliche Betriebsabläufe für diesen Ausschnitt. Daraus folgen nicht automatisch Wiederherstellungswerte, portable Backups, korrekte Migrationen, eine vertrauenswürdige Lieferkette oder eine vollständige Betriebsorganisation. Diese Eigenschaften müssen jeweils nachgewiesen und betrieben werden.

## Anforderungen an das Produkt

Damit das Muster funktioniert, muß das Produkt mindestens:

- deklarieren, welche Datenbanken, Verzeichnisse und Metadaten den veränderlichen Zustand bilden;
- Zustand versionieren und die Version sicher ermitteln;
- eine neue Zustandsversion mit getesteter, produktbezogener Migrationslogik erzeugen;
- ein Backup-Format erstellen und dessen Wiederherstellbarkeit prüfen;
- einen frischen, leeren Zustand eindeutig initialisieren;
- teilweise erzeugten oder beschädigten Zustand so behandeln, daß der nächste Start wieder eine belastbare Entscheidung treffen kann;
- produktseitige technische und semantische Prüfkriterien für den wiederhergestellten Zustand bereitstellen.

Die Runtime stellt erfüllte Voraussetzungen bereit, etwa erreichbare Datenbank, Speicher und Netzwerk. Bartl ersetzt diese Voraussetzungen nicht.

## Einordnung in einen Providerwechsel

Bei einem Providerwechsel, der dieselbe Anwendung und ihre Zustandslinie erhält, ist der Bartl-Pfad ein notwendiger Baustein für Anwendung und Zustand, aber nicht sein Ersatz. Ein qualifiziertes Ersatzverfahren folgt einem anderen Vertrag.

| Abschnitt                       | Ergebnis                                                                                    | Zuständigkeit              |
| ------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------- |
| Entscheidung und Qualifizierung | Unabhängige Entscheidung und geeignetes Ziel                                                | Betreiber                  |
| Ziel vorbereiten                | Provisionierte Runtime, Netzwerk, Identität, Speicher und Konfiguration                     | Betreiber und Zielumgebung |
| Recovery Set bereitstellen      | Akzeptiertes Release und akzeptierter Recovery Point außerhalb des bisherigen Quellbetriebs | Betreiber und Produkt      |
| Anwendung und Zustand starten   | Wiederherstellung, Initialisierung oder Migration nach beobachtetem Zustand                 | Bartl und Produktlogik     |
| Dienst aktivieren               | Stabile Adresse, eindeutige Schreibautorität, Fencing, Abnahme und Fortschaltregeln         | Betreiber                  |

Die Tabelle trennt bewußt den wiederverwendbaren Startmechanismus vom Wechselverfahren. Sie verspricht weder einen vollständigen Providerwechsel noch automatische Erreichbarkeit oder Vertrauenswürdigkeit.

## Referenz und Nachweisgrenzen

Die ausführbare Referenz [bartl-wordpress](https://codeberg.org/bartlapp/bartl-wordpress) macht den Vertrag für WordPress inspizierbar. Zustand, Image-Inhalt, Zielkonfiguration und Startentscheidung können im Code nachvollzogen werden.

Die Referenz belegt den Anwendungs- und Zustandsvertrag dieser festgeschriebenen Anwendungsklasse. Sie belegt keine Konformität anderer Produkte, keine festen RPO- oder RTO-Werte und keinen vollständigen Ende-zu-Ende-Providerwechsel. Diese Nachweise entstehen erst aus dem jeweiligen Produkt, einem akzeptierten Recovery Set, der Zielumgebung und einem ausgeführten Drill.

## Begriffsgrundlagen und Quellen

Die Begriffsordnung folgt etablierten Primärquellen, ohne deren unterschiedliche Geltungsbereiche gleichzusetzen:

- Die [Strategie zur Stärkung der Digitalen Souveränität des IT-Planungsrats](https://www.it-planungsrat.de/fileadmin/beschluesse/2021/Beschluss2021-09_Strategie_zur_Staerkung_der_digitalen_Souveraenitaet.pdf) versteht Souveränität als selbständige, selbstbestimmte und sichere Handlungsfähigkeit. Wechselmöglichkeit, Gestaltungsfähigkeit und Einfluß auf Anbieter sind getrennte strategische Ziele.
- [NIST Cyber Resiliency](https://csrc.nist.gov/glossary/term/cyber_resiliency) bezeichnet die Fähigkeit, widrige Bedingungen vorauszusehen, ihnen standzuhalten, sich von ihnen zu erholen und sich anzupassen, damit Mission oder Geschäftsziel erreicht werden können.
- Der [BSI-Standard 200-4 Business Continuity Management](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/BSI-Standards/BSI-Standard-200-4-Business-Continuity-Management/bsi-standard-200-4_Business_Continuity_Management_node.html) leitet Wiederanlaufanforderungen aus zeitkritischen Geschäftsprozessen ab und unterscheidet Notbetriebsniveau, RTO/RPO, RTA/RPA, Wiederanlauf und Wiederherstellung. Er läßt für den Notbetrieb auch Ausweich- und Ersatzlösungen zu.
- Die [EU-Datenverordnung](https://eur-lex.europa.eu/eli/reg/2023/2854/oj/deu?locale=de) definiert den Wechsel zwischen Datenverarbeitungsdiensten derselben Dienstart oder zu eigener Infrastruktur. Dieser rechtliche Switching-Begriff verlangt weder dieselbe Anwendung noch einen erfolgreichen Disaster-Recovery-Drill.
- [DORA](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32022R2554) beschreibt digitale operationale Resilienz als fortbestehende operationale Integrität und Zuverlässigkeit auch während Störungen und auch mit Hilfe von ICT-Drittanbietern. Resilienz allein belegt deshalb keine unabhängige Wechselfähigkeit.

Die Bartl-Orientierung ist mit der Begriffs- und Anforderungslogik des BSI-Standards 200-4 vereinbar. Sie beginnt bei Auftrag und Fachleistung, verwendet bedrohungsspezifische Schutzprofile, trennt Not- und Normalbetrieb und verlangt gemessene Nachweise. Das Bartl-Muster allein ist jedoch weder ein Business Continuity Management System noch ein vollständiger BSI-Konformitätsnachweis. Ein Nachweis, daß die anwendbaren Anforderungen des BSI-Standards 200-4 erfüllt sind, entsteht erst im organisatorischen Geltungsbereich aus Schutzprofil, Rollen, verketteten Recovery-Verträgen, Zielumgebung, Plänen, fachlicher Abnahme und ausgeführten Übungen.

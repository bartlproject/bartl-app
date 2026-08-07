<!-- SPDX-License-Identifier: CC-BY-4.0 -->

# Bartl

Ein Entwurfsmuster für zustandsbehaftete Anwendungen. Beim Start entscheidet ein Mechanismus anhand des vorgefundenen Zustands, eines extern verfügbaren Backups und der Versionen. Er folgt nicht einer vom Betreiber angeforderten Operation.

Website: [bartl.app/de](https://bartl.app/de/)

## Problem und Geschäftsfragen

Ein Produktionsausfall wirft drei Geschäftsfragen auf: Wie viele Nutzer sind betroffen, wann ist der Dienst wieder erreichbar und welcher Datenstand läßt sich wiederherstellen?

Bartl behandelt den Teil dieser Fragen, der von Anwendung und deklariertem Zustand abhängt. Es ersetzt getrennte Verfahren für Installation, Wiederherstellung und Upgrade durch einen beobachteten Startpfad. Daraus folgt keine Zusage für eine bestimmte Wiederherstellungszeit oder einen bestimmten Datenverlust. Beides hängt auch von Backup-Takt, verfügbarer Zielumgebung, Übertragung und Erreichbarkeit ab.

## Vertrag mit vier Eingaben

Der Startmechanismus beruht auf vier Eingaben, die das Produkt und seine Umgebung bereitstellen.

| Eingabe                                         | Bedeutung                                                                                          |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Festgeschriebenes Anwendungsrelease oder Engine | Unveränderliches Release einschließlich produktbezogener Migrationslogik                           |
| Deklariertes Zustandsinventar                   | Portabler veränderlicher Zustand einschließlich Zustandsversion                                    |
| Dauerhafter, unabhängiger Store                 | Vom Quellbetrieb unabhängiger Speicher mit einem vollständig veröffentlichten und geprüften Backup |
| Zielkonfiguration                               | Vom Ziel bereitgestellte Konfiguration wie Endpunkt und Zugangsdaten                               |

Für die WordPress-Referenz ist das Zustandsinventar Datenbank und Uploads. Zum Anwendungsrelease gehören WordPress-Core, Plugins und Themes. Endpunkt und Zugangsdaten liefert die Zielumgebung. Diese Trennung ist Teil des Vertrags: Ein Image ersetzt weder Datenbank noch Uploads, und Zugangsdaten gehören nicht in das Backup-Format.

Aus diesen vier Eingaben leitet der Mechanismus drei Beobachtungen für seine Verzweigung ab: Existiert gültiger lokaler Zustand? Ist ein vollständig veröffentlichtes und geprüftes Backup verfügbar? Wie verhält sich die Engine-Version zur Zustandsversion?

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

Nach `init()`, `restore()` oder `migrate()` wird der Zustand erneut beobachtet. Der Code verzweigt damit nach Tatsachen am Ziel, nicht nach Labels wie „Restore“, „Upgrade“ oder „Migration“. Ein Fehlschlag wird nicht dadurch geheilt, daß ein anderer Operationsname gewählt wird. Die Anwendung muß erkennen können, ob lokaler Zustand gültig ist; nicht jede inhaltliche Korruption ist allein aus seiner Existenz ableitbar.

## Folgerungen aus dem Mechanismus

Ein Neustart führt bei gleichem, gültigem lokalem Zustand direkt zum Dienst. Ohne lokalen Zustand führt ein gültiges externes Backup über `restore()` zurück zum Versionsvergleich. Fehlt beides, erzeugt `init()` einen neuen Zustand.

Ein Upgrade mit neuerer Engine benötigt produktbezogene Migrationslogik. Bartl stellt den Entscheidungspunkt bereit, aber keine universelle Migration. Eine ältere Engine als der Zustand bricht ab. Ein Rückweg erfordert einen geeigneten Sicherungsstand vor dem Upgrade und folgt dann dem Wiederherstellungspfad.

Wiederherstellung und Migration können denselben Anwendungs- und Zustandspfad nutzen, aber nur unter zwei Bedingungen: Das Ziel ist mit der Anwendung kompatibel, und ein gültiger Zustand ist extern verfügbar. Bei einer Migration ändert sich das Ziel, nicht die Bedeutung von Datenbank, Uploads, Image-Inhalt oder Konfiguration.

Daraus folgen ein einheitlicher Ausführungspfad und weniger unterschiedliche Betriebsabläufe für diesen Ausschnitt. Daraus folgen nicht automatisch Wiederherstellungswerte, portable Backups, korrekte Migrationen oder eine vollständige Betriebsorganisation. Diese Eigenschaften müssen jeweils nachgewiesen und betrieben werden.

## Anforderungen an das Produkt

Damit das Muster funktioniert, muß das Produkt mindestens Folgendes liefern:

- deklarieren, welche Datenbanken, Verzeichnisse und Metadaten den veränderlichen Zustand bilden;
- Zustand versionieren und die Version sicher ermitteln;
- eine neue Zustandsversion mit getesteter, produktbezogener Migrationslogik erzeugen;
- ein Backup-Format erstellen und dessen Wiederherstellbarkeit prüfen;
- einen frischen, leeren Zustand eindeutig initialisieren;
- Fehler und teilweise erzeugten Zustand so behandeln, daß der nächste Start wieder eine belastbare Entscheidung treffen kann.

Die Runtime stellt erfüllte Voraussetzungen bereit, etwa erreichbare Datenbank, Speicher und Netzwerk. Bartl ersetzt diese Voraussetzungen nicht.

## Grenzen des Musters

Bartl verantwortet Anwendungsrelease, deklarierten Zustand sowie den Pfad für Wiederherstellung, Initialisierung und Migration. Es nutzt die Endpunkt- und Zugangskonfiguration, die das Ziel bereitstellt.

Außerhalb von Bartl liegen die unabhängige Wechselentscheidung, die Qualifizierung eines Providers, Zielprovisionierung, der Betrieb eines neutralen Speichers, Erreichbarkeit von Identitäten und Abhängigkeiten, DNS und TLS, eine stabile Dienstadresse, Cutover, Abnahme und Rollback-Orchestrierung. Bartl allein macht weder Nutzer noch Abhängigkeiten erreichbar.

## Einordnung in einen Providerwechsel

Ein Providerwechsel ist ein Ende-zu-Ende-Vorhaben. Der Bartl-Pfad ist darin ein notwendiger Baustein für Anwendung und Zustand, aber nicht sein Ersatz.

| Abschnitt                       | Ergebnis                                                                    | Zuständigkeit              |
| ------------------------------- | --------------------------------------------------------------------------- | -------------------------- |
| Entscheidung und Qualifizierung | Unabhängige Entscheidung und geeignetes Ziel                                | Betreiber                  |
| Ziel vorbereiten                | Provisionierte Runtime, Netzwerk, Identität, Speicher und Konfiguration     | Betreiber und Zielumgebung |
| Zustand bereitstellen           | Gültiges Backup in einem neutral betriebenen, erreichbaren Speicher         | Betreiber                  |
| Anwendung und Zustand starten   | Wiederherstellung, Initialisierung oder Migration nach beobachtetem Zustand | Bartl und Produktlogik     |
| Dienst umschalten               | Stabile Adresse, DNS/TLS, Cutover, Abnahme und Rollback                     | Betreiber                  |

Die Tabelle trennt bewusst den wiederverwendbaren Startmechanismus vom Wechselverfahren. Sie verspricht weder einen vollständigen Providerwechsel noch eine automatische Erreichbarkeit oder Komplexitätsfreiheit.

## Referenz und Nachweisgrenzen

Die ausführbare Referenz [bartl-wordpress](https://codeberg.org/bartlapp/bartl-wordpress) macht den Vertrag für WordPress inspizierbar: Zustand, Image-Inhalt, Zielkonfiguration und die Startentscheidung können im Code nachvollzogen werden.

Die Referenz ist kein öffentlicher Nachweis eines Providerwechsels. Sie belegt auch keine universelle Anwendbarkeit, keine festen RPO- oder RTO-Werte und keine vollständige Migrationsfähigkeit für andere Produkte. Diese Nachweise entstehen erst aus dem jeweiligen Produkt, der Zielumgebung, den Backups und geübten Ende-zu-Ende-Verfahren.

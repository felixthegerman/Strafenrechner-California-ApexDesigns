# California Strafrechner

Die Website läuft vollständig im Browser. Es ist kein Server nötig.

## Enthalten

- Oberfläche komplett auf Deutsch oder Englisch umschaltbar
- 815 durchsuchbare Einträge, darunter ein deutlich erweiterter California-Vehicle-Code-Katalog sowie 63 Fish-, Wildlife- und Naturschutz-Einträge
- Strafrechner mit PDF-, DOC-, Discord-Codeblock- und Components-V2-Export
- Modernisierte Discord-Components-V2-Ausgabe für Rechner, Strafzettel und Berichte
- Strafzettel mit automatischer Fallakten-/Citation-Nummer und Datum/Uhrzeit
- Signatur durch Tippen oder Zeichnen
- Straßen- und Bootsverkehrsverstöße mit Bußgeld- und Festnahmehinweisen
- Acht dynamische Polizeiberichte: Festnahme, Einsatz, OIS, Use of Force, Unfall, Fahrzeugdurchsuchung, Beweismittel und Verkehrskontrolle
- Pflichtfeldprüfung, Datenschutzfilter, Charges-Suche, Unterschrift sowie PDF-/DOC-Export für Berichte
- Berichte mit getrennten Einzelfeldern, automatischem Datum/Uhrzeit, Pflicht-Narrativ und Behördenauswahl im Berichte-Panel
- Berichtversand an Discord ist für eine sichere Backend-Konfiguration vorbereitet; Webhook-URLs werden nicht im Browser eingegeben oder gespeichert
- Passwortgeschütztes lokales Berichtsarchiv
- Verschlüsseltes Admin-Menü für getrennte Strafzettel- und Berichts-Webhooks je Behörde
- Bericht-PDFs mit denselben logisch getrennten Kategorien wie die Eingabeformulare
- Berichte können ausdrücklich ohne Straftat nur zur Dokumentation angelegt werden

## Kostenlos öffentlich bereitstellen

### GitHub Pages

1. Kostenloses Konto auf https://github.com erstellen.
2. Neues öffentliches Repository anlegen.
3. Den Inhalt des Ordners `dist` hochladen.
4. Unter **Settings → Pages** als Quelle den Hauptbranch und den Ordner `/ (root)` auswählen.
5. Nach einigen Minuten erscheint dort die öffentliche Adresse.

### Cloudflare Pages

1. Kostenloses Konto auf https://pages.cloudflare.com erstellen.
2. **Upload assets** wählen.
3. Den Inhalt von `dist` hochladen.
4. Cloudflare stellt sofort eine öffentliche `pages.dev`-Adresse bereit.

## Hinweis

Die Angaben sind allgemeine, teils geschätzte Informationen und keine Rechtsberatung. Vor realer Verwendung immer Gesetzestext, County-Regeln und konkreten Sachverhalt prüfen.

PDF-Dateien werden derzeit separat über den Druckdialog gespeichert. Der Discord-Versand überträgt die strukturierte Akte, hängt aber noch keine PDF-Datei an; dafür muss die PDF-Erzeugung in der Serverfunktion eingerichtet werden.

## Zentrale Webhook-Datenbank

Die vorbereitete Supabase-/PostgreSQL-Lösung befindet sich in `supabase/`. Die vollständige kostenlose Einrichtung steht in `SUPABASE-SETUP.md`. Webhook-URLs bleiben dabei ausschließlich auf dem Server und werden nicht an GitHub Pages ausgeliefert.

Alternativ kann die einzelne Datei `webhook-database.sql` direkt im Supabase SQL Editor oder in einer PostgreSQL-Datenbank ausgeführt werden. Sie legt die Tabelle, alle Behörden, URL-Prüfungen, Zeitstempel und gesperrte Browserrechte an.

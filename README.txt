CALIFORNIA STRAFRECHNER – START & KOSTENLOSE VERÖFFENTLICHUNG
==============================================================

1. LOKAL STARTEN
----------------
ZIP-Datei entpacken und index.html doppelt anklicken. Die Seite läuft vollständig
im Browser und benötigt keinen Server. JavaScript muss aktiviert sein.

2. KOSTENLOS ÖFFENTLICH MACHEN – GITHUB PAGES
---------------------------------------------
1) Kostenloses Konto auf https://github.com erstellen oder anmelden.
2) Oben rechts auf „New repository“ klicken.
3) Einen Namen vergeben, „Public“ auswählen und das Repository erstellen.
4) „uploading an existing file“ wählen und ALLE Dateien aus diesem entpackten
   Ordner hochladen (index.html muss ganz oben liegen).
5) Änderungen mit „Commit changes“ speichern.
6) Im Repository „Settings“ > „Pages“ öffnen.
7) Unter „Build and deployment“ die Quelle „Deploy from a branch“ wählen.
8) Branch „main“, Ordner „/(root)“ wählen und speichern.
9) Nach einigen Minuten erscheint dort die öffentliche Adresse.

Spätere Aktualisierung: Dateien im Repository erneut hochladen und ersetzen.
GitHub veröffentlicht die Änderung automatisch.

3. ALTERNATIVE – CLOUDFLARE PAGES (DRAG & DROP)
------------------------------------------------
1) Kostenloses Konto auf https://dash.cloudflare.com erstellen oder anmelden.
2) „Workers & Pages“ > „Create application“ > „Pages“ öffnen.
3) „Direct Upload“ bzw. „Drag and drop your files“ wählen.
4) Einen Projektnamen vergeben und den entpackten Ordner hochladen.
5) „Deploy site“ wählen. Danach wird eine öffentliche pages.dev-Adresse angezeigt.

Hinweis: Bei Cloudflare kann ein Direct-Upload-Projekt später nicht einfach auf
Git-Integration umgestellt werden; dafür müsste ein neues Projekt angelegt werden.

4. BEDIENUNG & EXPORT
---------------------
- Im Tab „Rechner“ Behörde/Fraktion eintragen und Delikte hinzufügen.
- DE/EN oben rechts schaltet die verfügbaren Deliktnamen um. Amtliche Einträge,
  für die keine geprüfte deutsche Übersetzung hinterlegt ist, bleiben Englisch.
- „Als PDF speichern“ öffnet den Druckdialog. Dort als Ziel „Als PDF speichern“ wählen.
- „Für Google Docs“ lädt eine DOC-Datei. Diese in Google Drive hochladen und mit
  Google Docs öffnen; alternativ funktioniert sie in Microsoft Word.
- Der Discord-Codeblock enthält automatisch „Akte von Behörde“ (ohne Unterstriche).
- Der Tab „Embed JSON“ erzeugt eine Discord-API-Payload mit Components V2,
  Container, Textblöcken und Trennlinien. Sie muss von einem Bot/Webhook gesendet werden.
- Unklare Strafwerte werden als Näherung berechnet und mit „≈“/„geschätzt“ markiert.
- Die mögliche Kaution orientiert sich am Los-Angeles-County-Schedule 2026. Sie ist
  kein verbindlicher Betrag: OR/Release, Magistrate Review, Geldkaution oder keine
  Freilassung können je nach Tat, Vorgeschichte, Risiko und richterlicher Entscheidung gelten.

5. WICHTIGER RECHTLICHER HINWEIS
--------------------------------
Die Anwendung ist ein Informations- und Organisationswerkzeug, keine Rechtsberatung.
Automatisch erfasste Gesetzesabschnitte können Verweisnormen oder Sonderfälle enthalten.
Vor Nutzung immer den aktuellen amtlichen Gesetzestext, Tatbestand, Vorstrafen,
Enhancements, Mindeststrafen, concurrent sentencing und Penal Code 654 prüfen.

Offizielle Quellen:
https://leginfo.legislature.ca.gov/
https://lascpubstorage.blob.core.windows.net/cpw/LIBOPSCriminal-32-FelonyBailSchedule.pdf
https://docs.discord.com/developers/components/reference
https://docs.github.com/en/pages/quickstart
https://developers.cloudflare.com/pages/get-started/direct-upload/

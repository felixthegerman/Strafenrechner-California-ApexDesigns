# Zentrale SQL-Datenbank für Webhooks

Diese Variante nutzt Supabase (PostgreSQL + Edge Functions). Die Webhook-URLs sind niemals Teil der GitHub-Pages-Dateien und können von normalen Browsern nicht direkt aus der Datenbank gelesen werden.

## Einrichtung

1. Auf https://supabase.com ein kostenloses Projekt erstellen.
2. Supabase CLI installieren und im Projektordner anmelden: `supabase login`.
3. Projekt verknüpfen: `supabase link --project-ref DEINE_PROJECT_REF`.
4. SQL anwenden: `supabase db push`.
5. Geheimnisse setzen:
   `supabase secrets set ADMIN_PASSWORD='cali-LE0-adm1n-#1+A' ALLOWED_ORIGIN='https://DEIN-NAME.github.io'`
6. Funktionen veröffentlichen:
   `supabase functions deploy admin-webhooks --no-verify-jwt`
   `supabase functions deploy discord-dispatch --no-verify-jwt`

`SUPABASE_SERVICE_ROLE_KEY` und `SUPABASE_URL` stellt Supabase den Funktionen automatisch bereit. Den Service-Role-Key niemals in GitHub Pages oder JavaScript eintragen.

## Website verbinden

Die Funktionen liegen danach unter:

- `https://PROJECT_REF.supabase.co/functions/v1/admin-webhooks`
- `https://PROJECT_REF.supabase.co/functions/v1/discord-dispatch`

Für die endgültige Verbindung der Website wird nur `PROJECT_REF` benötigt. Das Admin-Passwort wird bei jedem Admin-/Versandaufruf über HTTPS geprüft und nicht in der SQL-Tabelle gespeichert.

## Sicherheitsmodell

- Row Level Security ist aktiv.
- `anon` und `authenticated` haben keine Tabellenrechte.
- Nur Edge Functions mit dem Service-Role-Key greifen auf Webhook-URLs zu.
- Versand erfordert zusätzlich das Admin-Passwort.
- CORS akzeptiert nur die eingestellte GitHub-Pages-Domain.


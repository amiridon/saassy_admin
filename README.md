## Saassy Admin

A starter SaaS admin dashboard stack built with:

- Blazor WebAssembly (client) + ASP.NET Core API (server)
- ASP.NET Core Identity + Duende IdentityServer (development mode) for authentication & authorization
- SQLite for local development persistence (file: `app.db`)
- Modern, accessible landing page styling (progressive enhancement + prefers-color-scheme support)

### Goals

Provide an immediately runnable full‑stack starter where you can:
1. Run the app with one command
2. Register a new user (no email confirm required in dev)
3. Login / Logout
4. Extend API + UI with a clean separation

---
## Project Structure

```
src/
	SaassyAdmin.Client/
		Client/   <- Blazor WebAssembly front-end
		Server/   <- ASP.NET Core host + API + Identity + IdentityServer
		Shared/   <- Shared DTOs / models
tests/
	SaassyAdmin.Tests/ <- xUnit integration tests (WebApplicationFactory)
SaassyAdmin.sln
```

Key files:
- `src/SaassyAdmin.Client/Server/Program.cs` – composition root, DB migration, Identity config
- `src/SaassyAdmin.Client/Server/appsettings.json` – connection string using `DataSource=app.db`
- `src/SaassyAdmin.Client/Client/Pages/Index.razor` – landing page (hero + features)
- `src/SaassyAdmin.Client/Client/wwwroot/css/app.css` – extended design system additions

---
## Prerequisites

- .NET 6 SDK (scaffold uses net6.0 runtime for server & client)
- PowerShell 7+ (for the examples below) or compatible shell

---
## Getting Started

Clone and restore (if not already):

```pwsh
dotnet restore SaassyAdmin.sln
```

Run the development server (serves both API & WASM):

```pwsh
dotnet run --project src/SaassyAdmin.Client/Server/SaassyAdmin.Client.Server.csproj
```

Then browse to the indicated `https://localhost:****` URL (or `http://localhost:****`).

### First Run Behavior

- Database file `app.db` will be created automatically (migrations are applied on startup in development).
- Landing page shows Sign In / Register CTAs.
- Use Register to create your first user; you'll stay authenticated.

---
## Authentication Overview

The solution uses the built‑in Individual Auth (Identity + IdentityServer) template variant:

- ASP.NET Core Identity stores users & claims in SQLite.
- IdentityServer is configured for local API + SPA JWT issuance (development license warning is expected).
- Email confirmation is disabled for rapid dev iteration (`RequireConfirmedAccount = false`). Re‑enable before production.

To sign out: the `LoginDisplay` component triggers a sign-out flow via `SignOutSessionStateManager` and navigates to `/authentication/logout`.

### Switching Databases Later

Swap to SQL Server / PostgreSQL by:
1. Adding provider package (e.g. `Microsoft.EntityFrameworkCore.SqlServer`)
2. Updating `UseSqlite` -> appropriate `UseSqlServer` / `UseNpgsql`
3. Creating & applying migrations again

---
## Entity Framework Core Migrations

Create a new migration after model changes:

```pwsh
dotnet ef migrations add <MigrationName> --project src/SaassyAdmin.Client/Server --startup-project src/SaassyAdmin.Client/Server
```

Apply manually (if you disable automatic migration):

```pwsh
dotnet ef database update --project src/SaassyAdmin.Client/Server --startup-project src/SaassyAdmin.Client/Server
```

---
## Testing

Integration tests leverage `WebApplicationFactory` to spin up the server in-memory.

Run the test suite:

```pwsh
dotnet test SaassyAdmin.sln
```

The sample tests assert successful page delivery; extend with:
- Registration POST scenario
- Authenticated API request using acquired access token
- Negative cases (invalid credentials)

---
## Styling & UX Principles

Implemented improvements:
- Gradient brand accent, glass panels, accessible focus outlines
- Dark & light mode adaptation (`prefers-color-scheme`)
- Reduced motion friendly (no large animations added yet)

Suggested next steps:
- Add a central design tokens file & component library
- Introduce Tailwind or CSS variables build pipeline if scaling
- Add automated accessibility tests (e.g. Playwright + axe)

---
## Security Hardening Checklist (For Later)

- Enforce HTTPS redirection + HSTS (already on in non-dev)
- Re‑enable email confirmation & password reset workflows
- Configure Identity password policies (length, complexity)
- Add rate limiting on auth endpoints (ASP.NET Core rate limiting middleware)
- Rotate to production signing credentials for IdentityServer
- Add CSP headers & remove inline styles where possible

---
## Roadmap Ideas

- Multi-tenant support via a TenantId claim & scoped filters
- Audit logging with EF Core interceptors
- OpenAPI (Swagger) exposure for the API project
- Role/Policy administration UI page

---
## Quick Commands Reference

```pwsh
# Run everything
dotnet run --project src/SaassyAdmin.Client/Server/SaassyAdmin.Client.Server.csproj

# Run tests
dotnet test SaassyAdmin.sln

# Add migration
dotnet ef migrations add Initial --project src/SaassyAdmin.Client/Server --startup-project src/SaassyAdmin.Client/Server
```

---
## VS Code Run & Debug

A compound launch configuration is provided.

1. Open the Run & Debug panel
2. Select `Full Stack (Server + WASM)`
3. Press F5 (or the green arrow)

What happens now:
- Solution builds (`build` task)
- Server launches in the integrated terminal
- When the server prints `Now listening on: https://...` the `serverReadyAction` opens the URL in your default browser
- The Chrome debug instance also launches (if selected in the compound) pointing to the configured URL

Hot reload: The standard debugger session supports most hot reload edits. If you need file‑watch continuous rebuild, run separately:
```pwsh
dotnet watch run --project src/SaassyAdmin.Client/Server/SaassyAdmin.Client.Server.csproj
```

### Avoiding Port Conflicts

If you see `address already in use` on port 7119:
1. Ensure you don't have a lingering `dotnet watch` or previous debug session still running.
2. On Windows you can find the PID:
	```pwsh
	netstat -ano | Select-String 7119
	# Then
	taskkill /PID <pid> /F
	```
3. Or change the HTTPS port in `Properties/launchSettings.json` and the `url` in `.vscode/launch.json`.

### Custom Port Support
The Chrome config currently hardcodes `https://localhost:7119`. If Kestrel assigns a different port, update:
`launch.json` > `Blazor WASM (Chrome)` > `url`.

If your dev HTTPS port differs (see console output when you run manually), update:
- `url` in `.vscode/launch.json`
- Optionally the `inspectUri` if you customize Chrome debugging

For faster inner loop you can start only the server (`Server (API)`) and open the browser yourself.

---
## License

See `LICENSE`.

---
## Notes

Duende IdentityServer displays a development license warning; this is expected for template usage and must be licensed before production deployment.

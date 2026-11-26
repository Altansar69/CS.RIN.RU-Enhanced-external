# CS.RIN.RU Enhanced for Steam (Millennium plugin)

The same features as the userscript, inside the Steam client, through [Millennium](https://steambrew.app/):

- a **CS.RIN.RU** button on every game's store page, next to the other links;
- the game's CS.RIN.RU tags (`[Cracked]`, `[Uncracked]`…) shown in its title;
- optional **SteamDB** and **PCGamingWiki** buttons.

The Steam client can't reach cs.rin.ru from the page itself, so the plugin's Lua backend does the request (and passes the forum's security check) on its behalf.

## Installation

1. Install [Millennium](https://steambrew.app/).
2. From the **[latest release](../../../../releases/latest)**, download `com.altansar.csrinru.star`.
3. Put it in `<Steam>\millennium\plugins\`.
4. In Steam: **Millennium → Plugins**, enable **CS.RIN.RU Enhanced**, then restart Steam.

**Coming from the old folder version** (the `cs-rin-ru-enhanced` folder): close Steam, delete `<Steam>\millennium\plugins\cs-rin-ru-enhanced`, then install the `.star`. Your settings are kept.

Settings (default tag, SteamDB and PCGamingWiki buttons) are in **Millennium → Plugins → CS.RIN.RU Enhanced** and saved in `%APPDATA%\CsRinRuEnhanced\settings.json`.

## Building

Built with [Starlight](https://www.npmjs.com/package/@steambrew/starlight): from this folder, `bun install` then `bun run build` (installs the `.star` into your local Millennium).

- `millennium.toml`: plugin declaration and build settings.
- `webview/preload.ts`: the button and tags on store pages.
- `frontend/index.tsx`: the settings panel.
- `backend/main.lua`, `backend/settings.lua`: cs.rin.ru requests and settings.

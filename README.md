# ![Icon of CS.RIN.RU](https://i.ibb.co/zXtW7WD/csrinfavicon32.png) CS RIN RU Enhanced (external)
![License](https://img.shields.io/badge/License-UNLICENSE-red) ![Release](https://img.shields.io/github/v/release/Altansar69/CS.RIN.RU-Enhanced-external) ![OS](https://img.shields.io/badge/OS-Windows%2FmacOS%2FLinux-green)

Extension of [CS RIN RU Enhanced mod](https://github.com/SubZeroPL/cs-rin-ru-enhanced-mod) for everything concerning the forum that acts on external game pages rather than on the forum itself.

Official forum topic: https://cs.rin.ru/forum/viewtopic.php?f=14&t=75717

## 🔧 Features
- Adds a CS.RIN.RU link to game pages on [Steam](https://store.steampowered.com), [SteamDB](https://steamdb.info), [PCGamingWiki](https://www.pcgamingwiki.com), [GG.Deals](https://gg.deals), [IsThereAnyDeal](https://isthereanydeal.com), and [IGDB](https://www.igdb.com).
- Uses the exact Steam AppID route (`https://cs.rin.ru/app/{appid}`), avoiding approximate forum searches and ambiguous results.
- Displays the tags from the matching CS.RIN.RU topic in the page title when they can be retrieved (`[CRACKED]`, `[UNCRACKED]`, etc.). Brackets that are part of the game's actual title are preserved and are not treated as forum tags.
- A separate [Millennium plugin](https://cs.rin.ru/forum/viewtopic.php?f=20&t=156500) provides the same integration inside Steam's desktop client.

GG.Deals support is limited to base games for which a Steam AppID can be found; special editions, bundles, and packs may not have one.

## 🧑‍🤝‍🧑 Other related projects
- [CS RIN RU Enhanced mod](https://github.com/SubZeroPL/cs-rin-ru-enhanced-mod) - Main project

## 📅 TODO (planned features):
see: [issues](https://github.com/Altansar69/CS.RIN.RU-Enhanced-external/issues)

## 🔨 Installation:
1) Download a script extension like [Violentmonkey](https://violentmonkey.github.io/) or [Tampermonkey](https://www.tampermonkey.net/).
2) Simply click on [this link](https://raw.githubusercontent.com/Altansar69/CS.RIN.RU-Enhanced-external/v2.0/CS-RIN-RU-ENHANCED-external.user.js) and a pop-up window should appear asking you if you wish to install the extension.

**Notes:** The script supports automatic updates, which means you don't have to download it again each time it's updated.

*Developed & tested with [Violentmonkey](https://violentmonkey.github.io/) and [Tampermonkey](https://www.tampermonkey.net/) on [Firefox](https://www.mozilla.org/) and Chromium ([Brave](https://brave.com/)).*

## 🔢 Versioning
This project is following semantic versioning schema.

## 🤝 Credits
- [Altansar69](https://github.com/Altansar69) - Has created the project
- [Reddiepoint](https://github.com/Reddiepoint) - Project co-creator
- [SubZeroPL](https://github.com/SubZeroPL) - Project co-creator

## 📄 License
This software is under the Unlicense, terms of which are available in [LICENSE](LICENSE).

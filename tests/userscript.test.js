const test = require("node:test");
const assert = require("node:assert/strict");
const { JSDOM } = require("jsdom");

const {
    addRinLinkToIGDB,
    addRinLinkToIsThereAnyDeal,
    addWhenReady,
    extractRinTags,
    findRinTopicTitle,
    getAppIdFromUrl,
    getRinAppUrl,
    hexToRgb,
    normalizeTag
} = require("../CS-RIN-RU-ENHANCED-external.user.js");

function useDom(t, html, url) {
    const dom = new JSDOM(html, { url });
    global.document = dom.window.document;
    global.window = dom.window;
    global.NodeFilter = dom.window.NodeFilter;
    global.DOMParser = dom.window.DOMParser;
    global.getComputedStyle = dom.window.getComputedStyle;
    global.MutationObserver = dom.window.MutationObserver;
    global.GM_xmlhttpRequest = ({ onload }) => onload({
        responseText: '<div id="pageheader"><a class="titles" href="./viewtopic.php?t=1">Example Game [Cracked]</a></div>'
    });
    t.after(() => {
        dom.window.close();
        delete global.document;
        delete global.window;
        delete global.NodeFilter;
        delete global.DOMParser;
        delete global.getComputedStyle;
        delete global.MutationObserver;
        delete global.GM_xmlhttpRequest;
    });
    return dom.window.document;
}

test("builds the direct CS.RIN.RU app route", () => {
    assert.equal(getRinAppUrl("730"), "https://cs.rin.ru/app/730");
});

test("extracts Steam app IDs with or without a trailing slash", () => {
    assert.equal(getAppIdFromUrl("https://store.steampowered.com/app/730/CounterStrike_2/"), "730");
    assert.equal(getAppIdFromUrl("https://store.steampowered.com/app/70"), "70");
    assert.equal(getAppIdFromUrl("https://example.org/game/70"), undefined);
});

test("does not treat square brackets from the game name as RIN tags", () => {
    assert.deepEqual(
        extractRinTags("[Info] REDACTED [Demo] [Cracked]", "REDACTED [Demo]"),
        ["[Info]", "[Cracked]"]
    );
});

test("reads the native phpBB topic title returned by the AppID route", () => {
    const element = { textContent: "[Release] Example Game [Cracked]" };
    const doc = {
        querySelectorAll(selector) {
            return selector.startsWith("#pageheader a.titles") ? [element] : [];
        }
    };
    assert.equal(findRinTopicTitle(doc), "[Release] Example Game [Cracked]");
});

test("subtracts duplicate title brackets only as many times as they occur", () => {
    assert.deepEqual(
        extractRinTags("Game [VR] [VR] [Scene]", "Game [vr]"),
        ["[VR]", "[Scene]"]
    );
});

test("normalizes tags and padded hexadecimal colours", () => {
    assert.equal(normalizeTag("[  CRACKED ]"), "cracked");
    assert.deepEqual(hexToRgb("abc"), [0, 10, 188]);
});

test("adds a native direct AppID link on IsThereAnyDeal", (t) => {
    const document = useDom(t, `
        <h1>Example Game</h1>
        <a href="https://store.steampowered.com/app/730/">Steam</a>
        <div class="links external"><ul><li><a class="link" href="https://steamdb.info/app/730/"><i><img alt="SteamDB"></i> SteamDB</a></li></ul></div>
    `, "https://isthereanydeal.com/game/example/info/");

    addRinLinkToIsThereAnyDeal();

    const link = document.querySelector('a[href="https://cs.rin.ru/app/730"]');
    assert.ok(link);
    assert.match(link.textContent, /CS\.RIN\.RU/);
    assert.match(document.querySelector("h1").textContent, /\[Cracked\]/);
});

test("restores the IsThereAnyDeal link when hydration removes it", async (t) => {
    const document = useDom(t, `
        <h1>Valheim</h1>
        <a href="https://store.steampowered.com/app/892970/">Steam reviews</a>
        <div class="links external"><ul><li><a class="link" href="https://steamdb.info/app/892970/"><i><img alt="SteamDB"></i> SteamDB</a></li></ul></div>
    `, "https://isthereanydeal.com/game/valheim/info/");

    const watcher = addWhenReady(addRinLinkToIsThereAnyDeal, 1000, true);
    const firstLink = document.querySelector('[data-csrin-link="itad"]');
    assert.ok(firstLink);
    firstLink.closest("li").remove();
    await new Promise((resolve) => setTimeout(resolve, 0));

    const restoredLinks = document.querySelectorAll('[data-csrin-link="itad"]');
    assert.equal(restoredLinks.length, 1);
    assert.equal(restoredLinks[0].href, "https://cs.rin.ru/app/892970");
    watcher.disconnect();
});

test("adds a site-native direct AppID link on IGDB", (t) => {
    const document = useDom(t, `
        <h1>Example Game</h1>
        <ul><li><a class="external-link" href="https://store.steampowered.com/app/730">Steam</a></li></ul>
    `, "https://www.igdb.com/games/example-game");

    addRinLinkToIGDB();

    const link = document.querySelector('a[href="https://cs.rin.ru/app/730"]');
    assert.ok(link);
    assert.equal(link.className, "external-link");
    assert.equal(link.textContent.trim(), "");
    const icon = link.querySelector('img[alt="CS.RIN.RU"]');
    assert.ok(icon);
    assert.equal(link.style.width, "32px");
    assert.equal(link.style.height, "32px");
    assert.equal(link.style.padding, "0px");
    assert.equal(icon.style.width, "100%");
    assert.equal(icon.style.height, "100%");
    assert.equal(icon.style.objectFit, "contain");
    assert.equal(icon.style.objectPosition, "center");
    assert.equal(link.title, "View on CS.RIN.RU");
});

test("waits for IGDB to render its Steam link", async (t) => {
    const document = useDom(t, `
        <h1>Valheim</h1>
        <ul id="links"></ul>
    `, "https://www.igdb.com/games/valheim");

    addWhenReady(addRinLinkToIGDB, 1000);
    document.querySelector("#links").insertAdjacentHTML(
        "beforeend",
        '<li><a class="external-link" href="https://store.steampowered.com/app/892970">Steam</a></li>'
    );
    await new Promise((resolve) => setTimeout(resolve, 0));

    const links = document.querySelectorAll('a[href="https://cs.rin.ru/app/892970"]');
    assert.equal(links.length, 1);
    assert.equal(links[0].dataset.csrinLink, "igdb");
});

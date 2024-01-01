// ==UserScript==
// @name            CS.RIN.RU Enhanced (External)
// @name:fr         CS.RIN.RU Amélioré (Externe)
// @name:pt         CS.RIN.RU Melhorado (Externo)
// @namespace       Altansar
// @version         1.0.0
// @description     Everything that concerns CS.RIN.RU - Steam Underground Community but does not act on the site.
// @description:fr  Tout ce qui concerne CS.RIN.RU - Steam Underground Community mais qui n'agit pas sur le site.
// @description:pt  W.I.P.
// @match           *://store.steampowered.com/app/*
// @match           *://steamdb.info/app/*
// @icon            https://i.ibb.co/p1k6cq6/image.png
// @grant           GM_xmlhttpRequest
// ==/UserScript==

function addRinLinkToSteam() {
    if (!document.location.origin.match("store.steampowered.com")) {
        return;
    }
    const page = "steam"
    const rinButton = addRinButton(page);

    const pageUrl = document.querySelectorAll(".game_area_bubble").length === 0
        ? document.location.pathname // Game page
        : document.querySelectorAll(".game_area_bubble > div > p > a")[0].getAttribute("href"); // DLC Page
    const regex = /\/app\/(\d+)\//;
    const appId = pageUrl.match(regex)[1];

    updatePage(appId, rinButton, page);

}

addRinLinkToSteam();

function addRinLinkToSteamDB() {
    if (!document.location.origin.match("steamdb.info")) {
        return;
    }
    const page = "steamdb"
    const rinButton = addRinButton(page);
    const appId = document.querySelectorAll('.span3')[0].nextElementSibling.textContent;

    updatePage(appId, rinButton, page)
}

addRinLinkToSteamDB();


function addRinButton(page) {
    const rinImage = "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAAeHh4EHh4eCB4eHgAeHh4AHh4eAB4eHgAeHh4iHh4ejB4eHiMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHh4efB4eHqYeHh4BHh4eAB4eHgAeHh4AHh4ehB4eHuUeHh4PAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4eHpIeHh7/Hh4emh4eHgAeHh4AHh4eAB4eHrgeHh63AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeHh4PHh4euR4eHv8eHh4zHh4eAB4eHhIeHh7uExMv/wYGQf8FBTr/BQU6/wUFOf8FBTn/BQU6/wUFQP8GBkf/Hh4eAB4eHjQeHh7/Hh4egR4eHgAeHh5+Hh4e/w4OM/8GBiX/Bwca/wgIG/9WVl//FRUk/wcHG/8HByf/BwdB/x4eHgAeHh4IHh4e2x4eHtceHh5hHh4e/x4eHqIKCjr/EBAk/xMTE/89PT3/09PT/0VFRf8TExP/EBAk/woKPf8KCk3/Dg5M/xkZMv8eHh7/Hh4e/x4eHv8bGzn/MDBH/2pqcP/k5OT/srKy/21tbf/v7+//hoaG/yUlN/8QEEP/DAxN/zIyQv8rKzD/Hh4e/x4eHv8qKjL/UFBa/9PT0/+ZmZv/QEBA/zs7O/87Ozv/f39//9jY2P98fIT/FhZJ/xAQTv9FRVD/ODg4/x4eHv8eHh7/Pz8//1BQUP9WVlb/UFBQ/1BQUP9QUFD/UFBQ/1NTU/9wcHD/ODhM/x0dTv8SElH/V1dh/09PT/8eHh7/Hh4e/ysrK/8/Pz//WVlZ/1paWv9gYGD/ZGRk/2RkZP9kZGT/ZGRk/0ZGXP8jI1T/FBRT/2dncf9iYmL/Hh4e/x4eHv8eHh7/Hh4e/yAgIP8xMTP/U1Nf/0xMZP9MTGP/TExj/0xMZP84OF7/GxtU/xYWVP92doD/hoaG/0FBQf8eHh7/IyMj/ycnJ/8gICD/JSUm/y8vO/8vL1L/Nzdg/zQ0Yf8zM2H/JiZb/xcXU/8XF1b/hoaP/5mZmf+Li4v/JSUl/yYmJv96enr/ioqK/2pqff86OmL/Hh4eDBMTWQATE1n/ExNZ/wAAAAAAAAAAERFU/4eHlv+RkZr/jY2Y/1RUWv9LS1H/f3+P/35+j/9fX3//MTFk/xsbYQAbG2EAGxth/xsbYf8AAAAAAAAAAA4OUv8ZGVj/Jydg/ywsYv8xMWX/NTVo/zo6av8+Pm3/LS1k/yUlXv8bG2EAGxthABsbYf8bG2H/AAAAAAAAAAAbG2EAGxthABsbYQAbG2EAGxthABsbYQAbG2EAGxthABsbYQAbG2EAGxthABsbYQAbG2H/Gxth/wAAAAAAAAAAPH8AABx/AAAc/wAACAAAAIgAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMAAAAzAAAAMwAA//MAAA==";
    const rinButton = document.createElement("a");
    rinButton.className = "btnv6_blue_hoverfade btn_medium";
    rinButton.style.marginLeft = "0.280em";
    const spanElement = document.createElement("span");
    spanElement.dataset.tooltipText = "View on CS.RIN.RU";
    const imgElement = document.createElement("img");
    imgElement.className = "ico16";
    imgElement.setAttribute("src", rinImage);
    spanElement.appendChild(imgElement);

    if (page === "steamdb") {
        spanElement.append("CS.RIN.RU");
    }

    rinButton.append(spanElement);
    const otherSiteInfo = page === "steam"
        ? document.querySelector('.apphub_OtherSiteInfo')
        : page === "steamdb"
            ? document.querySelectorAll('.app-links')[1]
            : null;
    otherSiteInfo.insertBefore(rinButton, otherSiteInfo.firstChild);

    return rinButton;
}

function updatePage(appId, rinButton, page) {
     getRinTopic(appId, function (url, tags) {
        // Adds the cs.rin topic "href" attribute to the button
        addRinUrl(rinButton, url);
        addRinTags(tags, page);
    });
}

function getRinTopic(appId, callback) {
    const rinSearchUrl = `https://cs.rin.ru/forum/search.php?keywords=${appId}&fid%5B%5D=10&sr=topics&sf=firstpost`;
    let redirectUrl = "";
    GM_xmlhttpRequest({
        method: "GET", url: rinSearchUrl, onload: function (response) {
            // Parse the response as HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(response.responseText, "text/html");
            const topicSelector = doc.querySelectorAll(".titles:not(:first-child), .topictitle")[0];
            const rinURL = topicSelector
                ? topicSelector.getAttribute("href") // cs.rin URL for the game
                : "posting.php?mode=post&f=10"; // Create a new topic in the CS.RIN forum

            redirectUrl = "https://cs.rin.ru/forum/" + rinURL;

            // const tags = topicSelector.text.match(/\[([^\]]+)]/g).slice(1);
            const tags = topicSelector
                ? topicSelector.text.match(/\[([^\]]+)]/g).slice(1)
                : ["[Not on RIN]"];
            let tagsJoined = tags.join(" ");
            if (tagsJoined.length === 0) { //Default tags
                tags.push("[Cracked easily]");
            }

            // Call the callback function with the URL and tags
            if (callback && typeof callback === "function") {
                callback(redirectUrl, tags);
            }
        }
    });

}

function addRinUrl(rinButton, url) {
    rinButton.setAttribute("href", url);
}

function addRinTagsSteam(tags) {
    const titleElem = document.getElementById("appHubAppName");
    titleElem.textContent += " " + tags;

    return titleElem;

}

function addRinTagsSteamDB(tags) {
    let titleElem = document.querySelector('[itemprop="name"]');
    titleElem.textContent += " " + tags;

    return titleElem;
}

function addRinTags(tags, page) {
    const titleElem = page === "steam"
        ? addRinTagsSteam(tags)
        : page === "steamdb"
            ? addRinTagsSteamDB(tags)
            : null;

    const bracketRegex = /[\[\]]/g;

    let newContent = titleElem.textContent;

    tags.forEach(tag => {
        const color = colorize(tag, titleElem);
        const tagSpan = `<span style='color:${color};'>[</span>` +
            `<span style='color:${color};font-size: 0.9em;'>` +
            `${tag.replace(bracketRegex, "")}</span>` +
            `<span style='color:${color};'>]</span>`;
        newContent = newContent.replace(tag, tagSpan);
    });

    titleElem.innerHTML = newContent;
}
function hexToRgb(hex) {
    return [parseInt(hex.substring(0, 2), 16), parseInt(hex.substring(2, 4), 16), parseInt(hex.substring(4, 6), 16)];
}


function colorize(str, parentElem) {
    let lstr = str.toLowerCase();
    let hash = 0;
    for (let i = 0; i < lstr.length; i++) {
        hash = lstr.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
    let rgb = hexToRgb(color);

    while (!getComputedStyle(parentElem).getPropertyValue("background-color").match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)) {
        parentElem = parentElem.parentElement
    }
    let bgColour = getComputedStyle(parentElem).getPropertyValue("background-color");
    let matches = bgColour.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    const bgRgb = [parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])]

    while (Math.abs(rgb[0] + rgb[1] + rgb[2] - (bgRgb[0] + bgRgb[1] + bgRgb[2])) < 300) {
        hash = (hash << 5) - hash;
        color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
        rgb = hexToRgb(color);
    }

    return '#' + color.padStart(6, '0');
}
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

    const linkElement = document.createElement("a");
    linkElement.classList.add("btnv6_blue_hoverfade");
    linkElement.classList.add("btn_medium");
    linkElement.style.marginLeft = '0.280em';
    const spanElement = document.createElement("span");
    spanElement.setAttribute("data-tooltip-text", "View on CS.RIN.RU");
    const imgElement = document.createElement("img");
    imgElement.classList.add("ico16");
    imgElement.setAttribute("src", "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAAeHh4EHh4eCB4eHgAeHh4AHh4eAB4eHgAeHh4iHh4ejB4eHiMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHh4efB4eHqYeHh4BHh4eAB4eHgAeHh4AHh4ehB4eHuUeHh4PAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4eHpIeHh7/Hh4emh4eHgAeHh4AHh4eAB4eHrgeHh63AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeHh4PHh4euR4eHv8eHh4zHh4eAB4eHhIeHh7uExMv/wYGQf8FBTr/BQU6/wUFOf8FBTn/BQU6/wUFQP8GBkf/Hh4eAB4eHjQeHh7/Hh4egR4eHgAeHh5+Hh4e/w4OM/8GBiX/Bwca/wgIG/9WVl//FRUk/wcHG/8HByf/BwdB/x4eHgAeHh4IHh4e2x4eHtceHh5hHh4e/x4eHqIKCjr/EBAk/xMTE/89PT3/09PT/0VFRf8TExP/EBAk/woKPf8KCk3/Dg5M/xkZMv8eHh7/Hh4e/x4eHv8bGzn/MDBH/2pqcP/k5OT/srKy/21tbf/v7+//hoaG/yUlN/8QEEP/DAxN/zIyQv8rKzD/Hh4e/x4eHv8qKjL/UFBa/9PT0/+ZmZv/QEBA/zs7O/87Ozv/f39//9jY2P98fIT/FhZJ/xAQTv9FRVD/ODg4/x4eHv8eHh7/Pz8//1BQUP9WVlb/UFBQ/1BQUP9QUFD/UFBQ/1NTU/9wcHD/ODhM/x0dTv8SElH/V1dh/09PT/8eHh7/Hh4e/ysrK/8/Pz//WVlZ/1paWv9gYGD/ZGRk/2RkZP9kZGT/ZGRk/0ZGXP8jI1T/FBRT/2dncf9iYmL/Hh4e/x4eHv8eHh7/Hh4e/yAgIP8xMTP/U1Nf/0xMZP9MTGP/TExj/0xMZP84OF7/GxtU/xYWVP92doD/hoaG/0FBQf8eHh7/IyMj/ycnJ/8gICD/JSUm/y8vO/8vL1L/Nzdg/zQ0Yf8zM2H/JiZb/xcXU/8XF1b/hoaP/5mZmf+Li4v/JSUl/yYmJv96enr/ioqK/2pqff86OmL/Hh4eDBMTWQATE1n/ExNZ/wAAAAAAAAAAERFU/4eHlv+RkZr/jY2Y/1RUWv9LS1H/f3+P/35+j/9fX3//MTFk/xsbYQAbG2EAGxth/xsbYf8AAAAAAAAAAA4OUv8ZGVj/Jydg/ywsYv8xMWX/NTVo/zo6av8+Pm3/LS1k/yUlXv8bG2EAGxthABsbYf8bG2H/AAAAAAAAAAAbG2EAGxthABsbYQAbG2EAGxthABsbYQAbG2EAGxthABsbYQAbG2EAGxthABsbYQAbG2H/Gxth/wAAAAAAAAAAPH8AABx/AAAc/wAACAAAAIgAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMAAAAzAAAAMwAA//MAAA==");
    spanElement.appendChild(imgElement);
    linkElement.appendChild(spanElement);
    const otherSiteInfo = document.querySelector('.apphub_OtherSiteInfo');
    otherSiteInfo.insertBefore(linkElement, otherSiteInfo.firstChild);
    const url = document.querySelectorAll(".game_area_bubble").length === 0
        ? document.location.pathname // Game page
        : document.querySelectorAll(".game_area_bubble > div > p > a")[0].getAttribute("href"); // DLC Page
    const regex = /\/app\/(\d+)\//;
    const appId = url.match(regex)[1];
    const urlToFetch = `https://cs.rin.ru/forum/search.php?keywords=${appId}&fid%5B%5D=10&sr=topics&sf=firstpost`;
    GM_xmlhttpRequest({
        method: "GET", url: urlToFetch, onload: function (response) {
            // Parse the response as HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(response.responseText, "text/html");
            const topicSelector = doc.querySelectorAll(".titles:not(:first-child), .topictitle")[0];
            const urlToRedirect = "https://cs.rin.ru/forum/" + topicSelector.getAttribute('href'); // url cs.rin of the game
            // Adds the "href" attribute to the element
            linkElement.setAttribute("href", urlToRedirect);
            const tags = topicSelector.text.match(/\[([^\]]+)]/g).slice(1);
            let tagsJoined = tags.join(" ");
            console.log(tags);
            if (tagsJoined.length === 0) { //Default tags
                tagsJoined = "[Cracked easily]";
                tags.push("[Cracked easily]");
                console.log(tags);
            }
            document.getElementById("appHubAppName").textContent += " " + tagsJoined;
            const titleElem = document.getElementById("appHubAppName");
            const parentElem = titleElem.parentElement
            if (titleElem.id !== "colorize") {
                titleElem.id = "colorize";
                tags.forEach(function (tag) {
                    const color = colorize(tag, parentElem);
                    titleElem.innerHTML = titleElem.innerHTML.replace(tag, "<span style='color:" + color + ";'>[</span><span style='color:" + color + ";font-size: 0.9em;'>" + tag.replace(/[\[\]]/g, "") + "</span><span style='color:" + color + ";'>]</span>");
                });
            }
        }
    });
}

addRinLinkToSteam();

function addRinLinkToSteamDB() {
    if (document.location.origin.match("steamdb.info")) { //If you are on Steam)
        //W.I.P.
    }
}

addRinLinkToSteamDB();

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

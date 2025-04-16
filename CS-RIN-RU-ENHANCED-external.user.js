// ==UserScript==
// @name            CS.RIN.RU Enhanced (External)
// @name:fr         CS.RIN.RU Amélioré (Externe)
// @name:pt         CS.RIN.RU Melhorado (Externo)
// @name:tr         Genişletilmiş CS.RIN.RU (Ek)
// @namespace       https://github.com/Altansar69/CS.RIN.RU-Enhanced-external
// @version         1.1.10
// @description     Everything that concerns CS.RIN.RU - Steam Underground Community but does not act on the site.
// @description:fr  Tout ce qui concerne CS.RIN.RU - Steam Underground Community mais qui n'agit pas sur le site.
// @description:pt  W.I.P.
// @description:tr  CS.RIN.RU sitesini ilgilendiren her şey - Steam Underground Topluluğu ancak sitede faaliyet göstermemektedir.
// @author          CS.RIN.RU community
// @match           *://store.steampowered.com/app/*
// @match           *://steamdb.info/app/*
// @match           *://www.pcgamingwiki.com/wiki/*
// @match           *://gg.deals/game/*
// @icon            https://i.ibb.co/p1k6cq6/image.png
// @grant           GM_xmlhttpRequest
// @homepageURL     https://github.com/Altansar69/CS.RIN.RU-Enhanced-external
// @supportURL      https://cs.rin.ru/forum/viewtopic.php?f=14&t=75717
// @updateURL       https://raw.githubusercontent.com/Altansar69/CS.RIN.RU-Enhanced-external/master/CS-RIN-RU-ENHANCED-external.user.js
// @downloadURL     https://raw.githubusercontent.com/Altansar69/CS.RIN.RU-Enhanced-external/master/CS-RIN-RU-ENHANCED-external.user.js
// ==/UserScript==

const RIN_IMAGE = "data:image/png;base64,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";
const RIN_LABEL = "View on CS.RIN.RU";

let defaultTag;
//defaultTag = "Cracked (by default)"

console.log("CS.RIN.RU Enhanced (External) script started");

function addRinLinkToSteam() {
    if (!document.location.origin.match("store.steampowered.com")) return;

    const page = "steam"
    const rinButton = addRinButton(page);

    const dlcPage = document.querySelector("div.game_area_bubble.game_area_dlc_bubble");
    const pageUrl = dlcPage?.querySelector("div > p > a")?.href ?? document.location.pathname;

    const appName = document.querySelector("#appHubAppName").textContent;
    const appId = getAppIdFromUrl(pageUrl);
    if (!appId) return;
    const developer = encodeURIComponent(document.querySelector("#developers_list").firstElementChild.textContent);
    updatePage(appId, appName, developer, rinButton, page);
}

addRinLinkToSteam();

function addRinLinkToSteamDB() {
    if (!document.location.origin.match("steamdb.info")) return;

    const page = "steamdb"
    const rinButton = addRinButton(page);

    const appName = document.querySelector("h1").textContent;
    const firstEntry = document.querySelector('.span3');
    const appId = firstEntry.nextElementSibling.textContent;
    const developer = encodeURIComponent(firstEntry.parentElement
        .nextElementSibling.nextElementSibling
        .firstElementChild.nextElementSibling.textContent.replace(/\n/g, ""))
    updatePage(appId, appName, developer, rinButton, page)
}

addRinLinkToSteamDB();

function addRinLinkToPCGW() {
    if (!document.location.origin.match("pcgamingwiki.com")) return;

    const page = "PCGW"
    const rinButton = addRinButton(page);

    const pageUrl = document.querySelector('.infobox-steamdb >  a').getAttribute("href");
    const appName = document.querySelector("h1").textContent;
    const appId = getAppIdFromUrl(pageUrl);
    if (!appId) return;
    const developer = encodeURIComponent(document.querySelector(".template-infobox-info").textContent);
    updatePage(appId, appName, developer, rinButton, page);
}

addRinLinkToPCGW();

function addRinLinkToGGDeals() {
    if (!document.location.origin.match("gg.deals")) return;

    const gameName = document.querySelector("li[itemprop='itemListElement']:last-child").innerText.trim();
    const developerItem = Array.from(document.querySelectorAll("div.game-info-details-section.text-details")).filter((v) => {
        return v.innerText.includes('Developer')
    })[0];
    const developer = developerItem.querySelector("p").innerText;
    const ggUrl = document.querySelector("a.game-link-widget").href;

    const rinButton = addRinButton("ggdeals");
    rinButton.href = "https://cs.rin.ru/forum";

    GM_xmlhttpRequest({
        method: "GET",
        url: ggUrl,
        onerror: function (error) {
            console.log(error);
        },
        onload: function (response) {
            const appId = getAppIdFromUrl(response.finalUrl);
            if (!appId) return;
            updatePage(appId, gameName, developer, rinButton, "ggdeals");
        }
    });
}

addRinLinkToGGDeals();

function addRinButton(page) {
    let rinButton = document.createElement("a");
    const spanElement = document.createElement("span");
    const imgElement = document.createElement("img");
    imgElement.className = "ico16";
    imgElement.setAttribute("src", RIN_IMAGE);
    spanElement.appendChild(imgElement);

    // Add spacing
    if (page === "steam") {
        rinButton.className = "btnv6_blue_hoverfade btn_medium";
        rinButton.style.marginRight = "0.28em"
        spanElement.dataset.tooltipText = RIN_LABEL;
    }

    // Add text for RIN button on SteamDB
    if (page === "steamdb") {
        rinButton.className = "tooltipped tooltipped-n";
        rinButton.ariaLabel = RIN_LABEL
        imgElement.style.height = "16px";
        imgElement.style.width = "16px";
        spanElement.append(" CS.RIN.RU");
    }

    // Make sure the button has the same size as the other buttons
    if (page === "PCGW") {
        rinButton.className = "svg-icon template-infobox-icon";
        rinButton.title = RIN_LABEL
    }

    // Add button without image
    if (page === "ggdeals") {
        imgElement.style.height = "0px"; // No image
        imgElement.style.width = "0px";
        rinButton.className = "game-link-widget";
        rinButton.style.left = "130px" // Offset the button to the left so it does not overlap with the existing one
        spanElement.append("View on CS.RIN.RU");
        spanElement.className = "game-header-store-link badge badge-big";
    }

    rinButton.append(spanElement);

    const siteSelectors = {
        "steam": () => document.querySelector('.apphub_OtherSiteInfo').firstElementChild,
        "steamdb": () => document.querySelectorAll('.app-links')[1].firstElementChild,
        "PCGW": () => document.querySelectorAll('.template-infobox-icons')[0].firstElementChild,
        "ggdeals": () => document.querySelector("a.game-link-widget") // Button will be added to the right of the existing button
    };
    const otherSiteInfo = (siteSelectors[page] || (() => null))();
    // otherSiteInfo.insertBefore(rinButton, otherSiteInfo.firstChild);
    otherSiteInfo.insertAdjacentElement("beforebegin", rinButton);

    return rinButton;
}

function updatePage(appId, appName, developer, rinButton, page) {
    getRinTopic(appId, appName, developer, function (url, tags) {
        // Adds the cs.rin topic "href" attribute to the button
        addRinUrl(rinButton, url);
        addRinTags(tags, page);
    });
}

function getRinTopic(appId, appName, developer, callback) {
    const rinSearchUrl = `https://cs.rin.ru/forum/search.php?keywords=${appId}&fid%5B%5D=10&sr=topics&sf=firstpost`;
    console.log(rinSearchUrl);
    console.log("Trying...");
    GM_xmlhttpRequest({
        method: "GET", url: rinSearchUrl,
        onerror: function (error) {
            console.log(error)
        },
        onload: function (response) {
            const doc = new DOMParser().parseFromString(response.responseText, "text/html");
            const topicSelectors = doc.querySelectorAll(".titles:not(:first-child), .topictitle");
            if (topicSelectors.length > 1) {
                getRinTopicAdvanced(appId, appName, developer, callback);
            } else {
                processResponse(appName, response.responseText, rinSearchUrl, callback, function () {
                    getRinTopic(appId, "", developer, callback); // Retry getRinTopic if search fails
                });
            }
        }
    });
}

function getRinTopicAdvanced(appId, appName, developer, callback) {
    const rinSearchUrl = `https://cs.rin.ru/forum/search.php?keywords=${appId}+${developer}&fid%5B%5D=10&sr=topics&sf=firstpost`;
    console.log(rinSearchUrl);
    GM_xmlhttpRequest({
        method: "GET", url: rinSearchUrl,
        onerror: function (error) {
            console.log(error)
        },
        onload: function (response) {
            processResponse(appName, response.responseText, rinSearchUrl, callback, function () {
                getRinTopicAdvanced(appId, appName, developer, callback); // Retry getRinTopicAdvanced if search fails
            });
        }
    });
}

let retryScheduled = false; // Flag to track if a retry is scheduled
let retryAttempts = 0; // Counter for retry attempts
const maxRetryAttempts = 1; // Maximum number of retry attempts
function processResponse(appName, responseText, url, callback, retryFunction) {
    if (retryScheduled) return; // If a retry is scheduled, don't do anything

    if (retryAttempts >= maxRetryAttempts) {
        console.log("Max retry attempts reached");
        callback(url, []); // Redirect to search page
        return;
    }
    retryAttempts++;

    const doc = new DOMParser().parseFromString(responseText, "text/html");

    // Check if search was successful
    const checkElement = doc.querySelector("#wrapcentre > form > table.tablebg > tbody > tr:nth-child(1) > th:nth-child(1)");
    if (!checkElement) {
        if (retryFunction) {
            retryScheduled = true; // Set the flag to true to block further retries
            setTimeout(() => {
                retryScheduled = false; // Reset the flag when the retry function is called
                retryFunction(); // Call the retryFunction, whichever function called this function
            }, 2000);
        }
        return;
    }

    // Get all topics
    const topics = doc.querySelectorAll(".titles:not(:first-child), .topictitle");
    let topicSelector = null;
    for (let potentialTopic of topics) {
        if (potentialTopic.textContent.includes(appName)) {
            topicSelector = potentialTopic;
            break;
        }
    }
    // Default to first topic
    if (!topicSelector) {
        topicSelector = doc.querySelector(".titles:not(:first-child), .topictitle");
    }

    const rinURL = topicSelector ? topicSelector.getAttribute("href") : "posting.php?mode=post&f=10";
    const redirectUrl = "https://cs.rin.ru/forum/" + rinURL.split("&hilit")[0];
    const tags = topicSelector ? topicSelector.text.match(/(?<!^)\[([^\]]+)]/g)?.slice(0) ?? [] : ["[Not on RIN]"];
    if (tags.length === 0 && defaultTag !== undefined) {
        tags.push(defaultTag); //Insert default tag
    }

    if (callback && typeof callback === "function") {
        callback(redirectUrl, tags);
    }
}

function addRinUrl(rinButton, url) {
    rinButton.setAttribute("href", url);
}

function appendRinTags(tags, titleElem) {
    titleElem.textContent += " " + tags.join(" ");
    return titleElem;
}

function addRinTags(tags, page) {
    const titleLocations = {
        "steam": () => document.getElementById("appHubAppName"),
        "steamdb": () => document.querySelector('[itemprop="name"]'),
        "PCGW": () => document.getElementsByClassName("article-title")[0],
        "ggdeals": () => document.querySelector("div.game-heading h1")
    };

    // const titleElem = (tagFunctions[page] || (() => null))(tags);
    const titleLocation = (titleLocations[page] || (() => null))();
    const titleElem = appendRinTags(tags, titleLocation);

    // Add colours to the tags
    const bracketRegex = /[\[\]]/g;

    let newContent = titleElem.textContent;

    tags.forEach(tag => {
        const color = colorize(tag, titleElem);
        const tagSpan = `<span style='color:${color};'>[</span><span style='color:${color};font-size: 0.9em;'>${tag.replace(bracketRegex, "")}</span><span style='color:${color};'>]</span>`;
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
        parentElem = parentElem.parentElement;
    }
    let bgColour = getComputedStyle(parentElem).getPropertyValue("background-color");
    let matches = bgColour.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    const bgRgb = [parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3])];

    while (Math.abs(rgb[0] + rgb[1] + rgb[2] - (bgRgb[0] + bgRgb[1] + bgRgb[2])) < 300) {
        hash = (hash << 5) - hash;
        color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
        rgb = hexToRgb(color);
    }

    return '#' + color.padStart(6, '0');
}

/**
 * Returns AppId parsed from Url passed as an argument
 * @param {string} url
 * @returns AppId
 */
function getAppIdFromUrl(url) {
    const regex = /\/app\/(\d+)\//;
    const matches = url.match(regex);
    if (matches == null || matches[1] == null) {
        console.log(`Error getting AppId from URL ${url}`);
        return;
    }
    return matches[1];
}

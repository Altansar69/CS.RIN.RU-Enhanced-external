const RIN_BUTTON_ID = "csrinru-enhanced-external-link";
const RIN_LABEL = "View on CS.RIN.RU";
const RIN_ICON = "https://i.ibb.co/p1k6cq6/image.png";

function getSteamAppId(): string | null {
  const dlcLink = document.querySelector<HTMLAnchorElement>(
    "div.game_area_bubble.game_area_dlc_bubble div > p > a"
  );
  const source = dlcLink?.href ?? window.location.pathname;
  return source.match(/\/app\/(\d+)(?:[/?#]|$)/)?.[1] ?? null;
}

function addRinButton(): boolean {
  if (window.location.hostname !== "store.steampowered.com") return true;
  if (document.getElementById(RIN_BUTTON_ID)) return true;

  const appId = getSteamAppId();
  const buttonRow = document.querySelector<HTMLElement>(".apphub_OtherSiteInfo")?.firstElementChild;
  if (!appId || !buttonRow) return false;

  const button = document.createElement("a");
  button.id = RIN_BUTTON_ID;
  button.className = "btnv6_blue_hoverfade btn_medium";
  button.href = `https://cs.rin.ru/app/${appId}`;
  button.target = "_blank";
  button.rel = "noopener noreferrer";
  button.title = RIN_LABEL;
  button.style.marginRight = "0.28em";

  const content = document.createElement("span");
  const icon = document.createElement("img");
  icon.className = "ico16";
  icon.src = RIN_ICON;
  icon.alt = "";
  content.append(icon, " CS.RIN.RU");
  button.append(content);
  buttonRow.insertAdjacentElement("beforebegin", button);
  return true;
}

function installWhenReady(): void {
  if (addRinButton()) return;

  const observer = new MutationObserver(() => {
    if (addRinButton()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(() => observer.disconnect(), 30_000);
}

export default async function main(): Promise<void> {
  installWhenReady();
}

const MILLENNIUM_IS_CLIENT_MODULE=!1,pluginName="cs-rin-ru-enhanced";function InitializePlugins(){var e,n;let t;(e=window.PLUGIN_LIST||(window.PLUGIN_LIST={}))[pluginName]||(e[pluginName]={}),(n=window.MILLENNIUM_PLUGIN_SETTINGS_STORE||(window.MILLENNIUM_PLUGIN_SETTINGS_STORE={}))[pluginName]||(n[pluginName]={}),window.MILLENNIUM_SIDEBAR_NAVIGATION_PANELS||(window.MILLENNIUM_SIDEBAR_NAVIGATION_PANELS={}),function(e){e[e.CallServerMethod=0]="CallServerMethod"}(t||(t={}));let o=window.MILLENNIUM_PLUGIN_SETTINGS_STORE[pluginName],a=`Millennium.Internal.IPC.[${pluginName}]`;const r={DropDown:["string","number","boolean"],NumberTextInput:["number"],StringTextInput:["string"],FloatTextInput:["number"],CheckBox:["boolean"],NumberSlider:["number"],FloatSlider:["number"]};o.ignoreProxyFlag=!1;const i=e=>new Proxy(e,{set(e,n,t){if(!(n in e))throw new TypeError(`Property ${String(n)} does not exist on plugin settings`);const i=r[e[n].type],l=e[n]?.range;if(i.includes("number")&&"number"==typeof t&&(l&&(t=function(e,n,t){return Math.max(n,Math.min(t,e))}(t,l[0],l[1])),t||(t=0)),!i.includes(typeof t))throw new TypeError(`Expected ${i.join(" or ")}, got ${typeof t}`);return e[n].value=t,((e,n)=>{o.ignoreProxyFlag||SteamClient.BrowserView.PostMessageToParent(a,JSON.stringify({name:e,value:n}))})(String(n),t),!0},get:(e,n)=>"__raw_get_internals__"===n?e:n in e?e[n].value:void 0});o.DefinePluginSetting=i,o.settingsStore=i({})}InitializePlugins();const __call_server_method__=(e,n)=>Millennium.callServerMethod(pluginName,e,n);function __wrapped_callable__(e){return e.startsWith("webkit:")?MILLENNIUM_API.callable((e,n)=>MILLENNIUM_API.__INTERNAL_CALL_WEBKIT_METHOD__(pluginName,e,n),e.replace(/^webkit:/,"")):MILLENNIUM_API.callable(__call_server_method__,e)}let PluginEntryPointMain=function(){return function(exports,MILLENNIUM){"use strict";
const LOG="[CS.RIN.RU]";
const fetchRin=__wrapped_callable__("FetchRin");
const RIN_ORIGIN="https://cs.rin.ru";
const FORUM="https://cs.rin.ru/forum/";
const RIN_LABEL="View on CS.RIN.RU";
const RIN_ICON="https://i.ibb.co/p1k6cq6/image.png";
const BUTTON_ID="csrin-button";
const getSettings=__wrapped_callable__("GetSettings");
const STEAMDB_ID="csrin-steamdb-button";
const STEAMDB_ICON="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M7.982%200C3.807%200%20.383%201.49.015%203.393l4.446.842c.36-.107.777-.164%201.198-.167l2.09-1.252c-.024-.313.168-.632.589-.905.597-.387%201.534-.598%202.487-.606a5.662%205.662%200%20011.876.274c1.396.47%201.717%201.387.71%202.038-.637.413-1.659.624-2.677.604l-2.752.981c-.024.196-.165.39-.428.56-.739.48-2.177.588-3.202.243-.453-.152-.751-.37-.879-.606L.316%204.802c.287.448.749.86%201.348%201.22C.62%206.621%200%207.373%200%208.188c0%20.8.598%201.538%201.606%202.131C.597%2010.914%200%2011.655%200%2012.456%200%2014.413%203.579%2016%207.998%2016%2012.417%2016%2016%2014.413%2016%2012.456c0-.8-.598-1.542-1.607-2.136C15.402%209.727%2016%208.989%2016%208.19c0-.82-.628-1.577-1.68-2.178%201.042-.63%201.664-1.42%201.664-2.279C15.984%201.671%2012.401%200%207.982%200zm2.856%201.774c-.644.013-1.273.146-1.681.41-.688.445-.476%201.06.478%201.382.954.32%202.269.22%202.956-.226.688-.445.476-1.058-.478-1.379a3.971%203.971%200%2000-1.275-.187zm.036.213c.92%200%201.663.349%201.663.778%200%20.428-.744.775-1.663.775-.92%200-1.662-.347-1.662-.775%200-.429.743-.778%201.662-.778zM5.659%204.3c-.198.014-.393.02-.578.052l1.138.214a1.345.628%200%2011-1.011%201.162l-1.107-.21c.125.113.305.216.543.296.803.27%201.92.186%202.5-.19.58-.374.398-.893-.406-1.164A3.38%203.38%200%20005.66%204.3zm7.967%202.08v1.16c0%201.377-2.52%202.49-5.628%202.49S2.374%208.917%202.374%207.54V6.394c1.443.663%203.422%201.073%205.608%201.073%202.202%200%204.197-.416%205.644-1.088zm0%204.328v1.099c0%201.376-2.52%202.49-5.628%202.49s-5.624-1.114-5.624-2.49v-1.098c1.444.633%203.43%201.024%205.624%201.024%202.194%200%204.182-.391%205.628-1.025z%22%2F%3E%3C%2Fsvg%3E";
const PCGW_ID="csrin-pcgw-button";
const PCGW_ICON="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAYFBMVEU3WJjN1eWbrMwhSZGSocPR2ecxVJYtUZSUo8TR2Oeer86YqcsqT5NKZ6E0Vpdxh7TY3+yInMJrgrFzibVSbaRXcqdDYp6tutR7kLo8XZuis9GNoMWBlr6Cl76KnsO4w9oHF7ZkAAAA3ElEQVQ4jb2T2xLCIAxEKdhQbqHSahGt/v9fmjp1bL1k9MV93QNsmKwQPwpRIOOChx52e/AaEJ/Byc1D2yhZitvm1B9WBB2KQ10bs1FOkqwtCZZ2KmRWVVXPACELALKpJ/cO2JsWgG5mewZ2qcujYwBPUjF+Bop1x/HIAJRQshmsPPEh++BDbpgnBKBWsWNC5v14dlxISiAtO+Y0CANgb3nAhz8BzD98CfyWoTWGe0LocL60j6VVL4BA7Q+nob2vfZnWfgXcrvG4KE5MQbwKPFL1AlL14ENF+fK+0xWKJhKAnXWlPwAAAABJRU5ErkJggg==";

async function loadSettings(){
  const defaults={defaultTag:"Cracked",showSteamDB:true,showPCGW:true};
  try{const res=JSON.parse(await getSettings());if(res.success&&res.data)return{...defaults,...res.data};}
  catch(err){console.error(LOG,"GetSettings failed",err);}
  return defaults;
}

const external=url=>"steam://openurl_external/"+url;

async function get(url){
  try{
    const raw=await fetchRin({url});
    const res=raw?JSON.parse(raw):null;
    if(!res||!res.success){console.warn(LOG,"fetch failed",url,res&&res.error);return null;}
    return new DOMParser().parseFromString(res.body,"text/html");
  }catch(err){console.error(LOG,err);return null;}
}
// Cache results so revisiting a page does not trigger another request
const CACHE_KEY="csrin-cache-v3",CACHE_TTL=12*3600e3;
function readCache(){try{return JSON.parse(localStorage.getItem(CACHE_KEY))||{}}catch{return{}}}
async function getRinTopicCached(appId,appName){
  const hit=readCache()[appId];
  if(hit&&Date.now()-hit.at<CACHE_TTL)return hit;
  const result=await getRinTopic(appId,appName);
  if(result.found!==false){const cache=readCache();cache[appId]={...result,at:Date.now()};try{localStorage.setItem(CACHE_KEY,JSON.stringify(cache))}catch{}}
  return result;
}
async function getRinTopic(appId,appName){
  const appUrl=`${RIN_ORIGIN}/app/${appId}`;
  const doc=await get(appUrl);
  if(!doc)return{url:appUrl,tags:[],found:false};

  const selectors=["#pageheader a.titles[href*='viewtopic.php']","h2 a[href*='viewtopic.php']",".maintitle",".topic-title","a.topictitle",".nav a[href*='viewtopic.php']"];
  let topicTitle="";
  for(const selector of selectors){
    const topic=[...doc.querySelectorAll(selector)].find(element=>element.textContent.trim().length>0);
    if(topic){topicTitle=topic.textContent.trim();break;}
  }
  if(!topicTitle)return{url:appUrl,tags:[],found:false};

  const titleTagCounts=new Map();
  for(const tag of appName.match(/\[[^\]\r\n]+\]/g)||[]){
    const key=tag.toLowerCase().replace(/\s+/g," ").trim();
    titleTagCounts.set(key,(titleTagCounts.get(key)||0)+1);
  }
  const tags=(topicTitle.match(/\[[^\]\r\n]+\]/g)||[]).filter(tag=>{
    const key=tag.toLowerCase().replace(/\s+/g," ").trim();
    const count=titleTagCounts.get(key)||0;
    if(count===0)return true;
    titleTagCounts.set(key,count-1);
    return false;
  });
  return{url:appUrl,tags,found:true};
}

function colorize(str,bgRgb){
  let hash=0;
  for(const ch of str.toLowerCase())hash=ch.charCodeAt(0)+((hash<<5)-hash)|0;
  const toRgb=h=>{const c=Math.floor(Math.abs((Math.sin(h)*10000)%1*16777216)).toString(16).padStart(6,"0");
    return{c,rgb:[0,2,4].map(i=>parseInt(c.substr(i,2),16))};};
  let{c,rgb}=toRgb(hash);
  const bgSum=bgRgb[0]+bgRgb[1]+bgRgb[2];
  for(let i=0;i<50&&Math.abs(rgb[0]+rgb[1]+rgb[2]-bgSum)<300;i++){hash=(hash<<5)-hash|0;({c,rgb}=toRgb(hash+i));}
  return"#"+c;
}

function backgroundOf(el){
  for(;el;el=el.parentElement){
    const m=getComputedStyle(el).backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if(m)return[+m[1],+m[2],+m[3]];
  }
  return[27,40,56]; // Steam store dark blue
}

function addTags(titleElem,tags){
  if(!titleElem||!tags.length)return;
  const bg=backgroundOf(titleElem);
  for(const tag of tags){
    const color=colorize(tag,bg);
    const wrap=document.createElement("span");
    wrap.className="csrin-tag";
    wrap.style.color=color;
    const inner=document.createElement("span");
    inner.style.fontSize="0.9em";
    inner.textContent=tag.replace(/[\[\]]/g,"");
    wrap.append(" [",inner,"]");
    titleElem.appendChild(wrap);
  }
}

function createButton(id=BUTTON_ID,label=RIN_LABEL,icon=RIN_ICON,href=FORUM){
  const a=document.createElement("a");
  a.id=id;
  a.className="btnv6_blue_hoverfade btn_medium";
  a.style.marginRight="0.28em";
  a.title=label;
  a.href=external(href);
  const span=document.createElement("span");
  span.dataset.tooltipText=label;
  const img=document.createElement("img");
  img.className="ico16";
  img.src=icon;
  img.style.cssText="width:16px;height:16px;vertical-align:middle;background:none";
  span.appendChild(img);
  a.appendChild(span);
  return a;
}

async function run(){
  if(!/store\.steampowered\.com\/app\/\d+/.test(location.href))return;
  if(document.getElementById(BUTTON_ID))return;

  let container;
  try{container=await MILLENNIUM.Millennium.findElement(document,".apphub_OtherSiteInfo",5000);}
  catch{console.warn(LOG,"store header not found");return;}
  container=container?.[0]||container;
  if(!container||document.getElementById(BUTTON_ID))return;

  const settings=await loadSettings();
  const button=createButton();
  container.insertBefore(button,container.firstChild);
  const pageAppId=(location.href.match(/\/app\/(\d+)/)||[])[1];
  if(settings.showSteamDB&&pageAppId&&!document.getElementById(STEAMDB_ID))
    button.insertAdjacentElement("afterend",createButton(STEAMDB_ID,"View on SteamDB",STEAMDB_ICON,`https://steamdb.info/app/${pageAppId}/`));
  if(settings.showPCGW&&pageAppId&&!document.getElementById(PCGW_ID))
    (document.getElementById(STEAMDB_ID)||button).insertAdjacentElement("afterend",createButton(PCGW_ID,"View on PCGamingWiki",PCGW_ICON,`https://www.pcgamingwiki.com/api/appid.php?appid=${pageAppId}`));

  // On a DLC page, search for the base game
  const dlcLink=document.querySelector("div.game_area_bubble.game_area_dlc_bubble div > p > a");
  const appId=((dlcLink?.href||location.href).match(/\/app\/(\d+)/)||[])[1];
  if(!appId)return;
  button.href=external(`${RIN_ORIGIN}/app/${appId}`);

  const titleElem=document.getElementById("appHubAppName")||document.querySelector(".apphub_AppName");
  const appName=titleElem?.textContent.trim()||"";
  const {url,tags,found}=await getRinTopicCached(appId,appName);
  console.log(LOG,appId,url,tags);
  button.href=external(url);
  // Default tag is applied here, not cached, so changing the setting takes effect immediately
  const defaultTag=(settings.defaultTag||"").trim().replace(/^\[|\]$/g,"");
  addTags(titleElem,tags.length===0&&defaultTag&&found?[`[${defaultTag}]`]:tags);
}

exports.default=async function(){try{await run();}catch(err){console.error(LOG,err);}};
Object.defineProperty(exports,"__esModule",{value:!0});return exports}({},window.MILLENNIUM_API)};function ExecutePluginModule(){let e=window.MILLENNIUM_PLUGIN_SETTINGS_STORE[pluginName];e.OnPluginConfigChange=function(n,t,o){n in e.settingsStore&&(e.ignoreProxyFlag=!0,e.settingsStore[n]=o,e.ignoreProxyFlag=!1)},MILLENNIUM_BACKEND_IPC.postMessage(0,{pluginName:pluginName,methodName:"__builtins__.__millennium_plugin_settings_parser__"}).then(async n=>{"string"==typeof n.returnValue&&(e.ignoreProxyFlag=!0,e.settingsStore=e.DefinePluginSetting(Object.fromEntries(JSON.parse(atob(n.returnValue)).map(e=>[e.functionName,e]))),e.ignoreProxyFlag=!1);let t=PluginEntryPointMain();Object.assign(window.PLUGIN_LIST[pluginName],{...t,__millennium_internal_plugin_name_do_not_use_or_change__:pluginName});let o=await t.default();var a;o&&(a=o)&&void 0!==a.title&&void 0!==a.icon&&void 0!==a.content?window.MILLENNIUM_SIDEBAR_NAVIGATION_PANELS[pluginName]=o:console.warn(`Plugin ${pluginName} does not contain proper SidebarNavigation props and therefor can't be mounted by Millennium. Please ensure it has a title, icon, and content.`)})}ExecutePluginModule();



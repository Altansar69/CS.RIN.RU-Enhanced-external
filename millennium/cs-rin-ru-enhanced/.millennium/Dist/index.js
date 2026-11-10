const MILLENNIUM_IS_CLIENT_MODULE=!0,pluginName="cs-rin-ru-enhanced";function InitializePlugins(){var e,t;let n;(e=window.PLUGIN_LIST||(window.PLUGIN_LIST={}))[pluginName]||(e[pluginName]={}),(t=window.MILLENNIUM_PLUGIN_SETTINGS_STORE||(window.MILLENNIUM_PLUGIN_SETTINGS_STORE={}))[pluginName]||(t[pluginName]={}),window.MILLENNIUM_SIDEBAR_NAVIGATION_PANELS||(window.MILLENNIUM_SIDEBAR_NAVIGATION_PANELS={}),function(e){e[e.CallServerMethod=0]="CallServerMethod"}(n||(n={}));let a=window.MILLENNIUM_PLUGIN_SETTINGS_STORE[pluginName],i=`Millennium.Internal.IPC.[${pluginName}]`;const l={DropDown:["string","number","boolean"],NumberTextInput:["number"],StringTextInput:["string"],FloatTextInput:["number"],CheckBox:["boolean"],NumberSlider:["number"],FloatSlider:["number"]};function o(e,t,a){return MILLENNIUM_BACKEND_IPC.postMessage(n.CallServerMethod,{pluginName:e,methodName:"__builtins__.__update_settings_value__",argumentList:{name:t,value:a}})}a.ignoreProxyFlag=!1,async function(){for(;"undefined"==typeof MainWindowBrowserManager;)await new Promise(e=>setTimeout(e,0));MainWindowBrowserManager?.m_browser?.on("message",(e,t)=>{if(e!==i)return;const{name:n,value:l}=JSON.parse(t);a.ignoreProxyFlag=!0,a.settingsStore[n]=l,o(pluginName,n,l),a.ignoreProxyFlag=!1})}();const r=e=>new Proxy(e,{set(e,t,n){if(!(t in e))throw new TypeError(`Property ${String(t)} does not exist on plugin settings`);const r=l[e[t].type],s=e[t]?.range;if(r.includes("number")&&"number"==typeof n&&(s&&(n=function(e,t,n){return Math.max(t,Math.min(n,e))}(n,s[0],s[1])),n||(n=0)),!r.includes(typeof n))throw new TypeError(`Expected ${r.join(" or ")}, got ${typeof n}`);return e[t].value=n,((e,t)=>{a.ignoreProxyFlag||(o(pluginName,e,t),"undefined"!=typeof MainWindowBrowserManager&&MainWindowBrowserManager?.m_browser?.PostMessage(i,JSON.stringify({name:e,value:t})))})(String(t),n),!0},get:(e,t)=>"__raw_get_internals__"===t?e:t in e?e[t].value:void 0});a.DefinePluginSetting=r,a.settingsStore=r({})}InitializePlugins();const __call_server_method__=(e,t)=>Millennium.callServerMethod(pluginName,e,t);function __wrapped_callable__(e){return e.startsWith("webkit:")?MILLENNIUM_API.callable((e,t)=>MILLENNIUM_API.__INTERNAL_CALL_WEBKIT_METHOD__(pluginName,e,t),e.replace(/^webkit:/,"")):MILLENNIUM_API.callable(__call_server_method__,e)}let PluginEntryPointMain=function(){return function(exports,jsx,React,MILLENNIUM){"use strict";
const LOG="[CS.RIN.RU]";
const getSettings=__wrapped_callable__("GetSettings");
const saveSettings=__wrapped_callable__("SaveSettings");
const DEFAULTS={defaultTag:"Cracked",showSteamDB:true,showPCGW:true};

async function loadSettings(){
  try{const res=JSON.parse(await getSettings());if(res.success&&res.data)return{...DEFAULTS,...res.data};}
  catch(err){console.error(LOG,"GetSettings failed",err);}
  return{...DEFAULTS};
}

const inputStyle={boxSizing:"border-box",display:"block",width:"100%",maxWidth:"100%",minWidth:0,padding:"4px 8px"};
const checkboxStyle={width:"20px",height:"20px"};
const panelStyle={boxSizing:"border-box",width:"100%",minWidth:0};

function SettingsPanel(){
  const[settings,setSettings]=React.useState(null);
  React.useEffect(()=>{loadSettings().then(setSettings)},[]);
  if(!settings)return jsx.jsx("div",{children:"Loading..."});

  const update=patch=>{
    const next={...settings,...patch};
    setSettings(next);
    saveSettings({settings_json:JSON.stringify(next)}).catch(err=>console.error(LOG,"SaveSettings failed",err));
  };

  return jsx.jsxs("div",{style:panelStyle,children:[
    jsx.jsx("div",{style:{fontSize:"12px",color:"#8f98a0",paddingBottom:"8px"},children:"Changes apply on next store page load"}),
    jsx.jsx(MILLENNIUM.Field,{label:"Default tag",description:"Shown when the CS.RIN.RU topic has no tag. Leave empty to disable.",bottomSeparator:"standard",
      children:jsx.jsx("input",{type:"text",value:settings.defaultTag,style:inputStyle,onChange:e=>update({defaultTag:e.target.value})})}),
    jsx.jsx(MILLENNIUM.Field,{label:"Show SteamDB button",bottomSeparator:"standard",
      children:jsx.jsx("input",{type:"checkbox",checked:settings.showSteamDB,style:checkboxStyle,onChange:e=>update({showSteamDB:e.target.checked})})}),
    jsx.jsx(MILLENNIUM.Field,{label:"Show PCGamingWiki button",bottomSeparator:"standard",
      children:jsx.jsx("input",{type:"checkbox",checked:settings.showPCGW,style:checkboxStyle,onChange:e=>update({showPCGW:e.target.checked})})}),
  ]});
}

const plugin=MILLENNIUM.definePlugin(()=>({
  title:"CS.RIN.RU Enhanced",
  icon:jsx.jsx(MILLENNIUM.IconsModule.Settings,{}),
  content:jsx.jsx(SettingsPanel,{}),
}));
exports.default=plugin;
Object.defineProperty(exports,"__esModule",{value:!0});return exports}({},SP_JSX_FACTORY,window.SP_REACT,window.MILLENNIUM_API)};function ExecutePluginModule(){let e=window.MILLENNIUM_PLUGIN_SETTINGS_STORE[pluginName];e.OnPluginConfigChange=function(t,n,a){t in e.settingsStore&&(e.ignoreProxyFlag=!0,e.settingsStore[t]=a,e.ignoreProxyFlag=!1)},MILLENNIUM_BACKEND_IPC.postMessage(0,{pluginName:pluginName,methodName:"__builtins__.__millennium_plugin_settings_parser__"}).then(async t=>{"string"==typeof t.returnValue&&(e.ignoreProxyFlag=!0,e.settingsStore=e.DefinePluginSetting(Object.fromEntries(JSON.parse(atob(t.returnValue)).map(e=>[e.functionName,e]))),e.ignoreProxyFlag=!1);let n=PluginEntryPointMain();Object.assign(window.PLUGIN_LIST[pluginName],{...n,__millennium_internal_plugin_name_do_not_use_or_change__:pluginName});let a=await n.default();var i;a&&(i=a)&&void 0!==i.title&&void 0!==i.icon&&void 0!==i.content?(window.MILLENNIUM_SIDEBAR_NAVIGATION_PANELS[pluginName]=a,MILLENNIUM_BACKEND_IPC.postMessage(1,{pluginName:pluginName})):console.warn(`Plugin ${pluginName} does not contain proper SidebarNavigation props and therefor can't be mounted by Millennium. Please ensure it has a title, icon, and content.`)})}ExecutePluginModule();



// @ts-nocheck
// CS.RIN.RU Enhanced settings panel (runs in Steam's SharedJSContext).
import * as MILLENNIUM from "millennium";
import * as React from "react";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";

const jsx = { jsx: _jsx, jsxs: _jsxs, Fragment: _Fragment };
// Calls a backend function with the same object-style arguments the old Millennium
// callable() took; Starlight exposes them as positional ffi calls on `backend`.
const __wrapped_callable__ = (name: string) => {
  const legacy = typeof MILLENNIUM.callable === "function" ? MILLENNIUM.callable(name) : null;
  return (args?: Record<string, unknown>) => {
    const ffi = typeof backend !== "undefined" ? (backend as any)[name] : undefined;
    // Starlight may hand back the Lua JSON already decoded: keep returning text,
    // since every caller does JSON.parse on the result
    const asText = (value: unknown) => (typeof value === "string" ? value : JSON.stringify(value));
    if (typeof ffi === "function") return Promise.resolve(ffi(...(args ? Object.values(args) : []))).then(asText);
    return Promise.resolve(legacy(args || {})).then(asText);
  };
};

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

export default plugin;

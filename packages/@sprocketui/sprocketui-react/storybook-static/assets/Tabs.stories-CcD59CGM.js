import{j as l}from"./jsx-runtime-u17CrQMm.js";import{r as P,m as B,u as le,a as q,b as z,P as $}from"./Primitive-Bxg4l5bh.js";import{r as c}from"./iframe-CQWRw0hy.js";import{u as W}from"./useSlottedContext-BJt1BrDe.js";import{f as je,s as Re,u as Ie,a as Le}from"./useEffectEvent-D0XX5l0S.js";import{u as ke,a as ge}from"./useAriaProps-CwcZGOBR.js";import{g as ae,o as Me,u as Ve}from"./usePress-B8kNgEC6.js";import{d as xe}from"./defu-C3oJZp48.js";import{m as De}from"./mergeRefs-BXtFy2_f.js";import{d as Ee}from"./defu-cjemX7BB.js";import"./preload-helper-PPVm8Dsz.js";function Ne(t){return Me()?t.metaKey:t.ctrlKey}function be(t,e){return t.current?.querySelector(`[data-key="${e}"]`)??null}function Be(t){const{selectionManager:e,keyboardDelegate:s,ref:n,autoFocus:u,shouldFocusWrap:d,disallowEmptySelection:f,disallowSelectAll:y,escapeBehavior:m,selectOnFocus:b,disallowTypeAhead:p,shouldUseVirtualFocus:v,allowsTabNavigation:K,scrollRef:T,direction:g,orientation:I,onNavigate:M,onFocusItem:V}=Ee(t,{autoFocus:!1,shouldFocusWrap:!1,disallowEmptySelection:!1,disallowSelectAll:!1,escapeBehavior:"clearSelection",selectOnFocus:!1,disallowTypeAhead:!1,shouldUseVirtualFocus:!1,allowsTabNavigation:!1,isVirtualized:!1,direction:"ltr",orientation:"vertical"}),x=T??n,j=P.useRef({top:0,left:0}),O=P.useRef(e.focusedKey),C=P.useRef(u),L=P.useRef(""),k=P.useRef(null),A=P.useCallback((a,S,r)=>{a!=null&&(e.setFocusedKey(a,r),M?.(a),S?.shiftKey&&e.selectionMode==="multiple"?e.extendSelection(a):b&&!Ne(S)&&e.replaceSelection(a))},[e,b,M]),_=P.useCallback(a=>{if(V){V(a);return}const S=be(n,a);S&&!v&&je(S)},[n,v,V]),E=P.useCallback(a=>{if(!p&&a.key.length===1&&!a.ctrlKey&&!a.metaKey&&!a.altKey){k.current&&clearTimeout(k.current),L.current+=a.key;const r=s.getKeyForSearch?.(L.current,e.focusedKey)??null;r!=null&&(a.preventDefault(),A(r,a)),k.current=setTimeout(()=>{L.current=""},500);return}const S=g==="rtl";switch(a.key){case"ArrowDown":{if(s.getKeyBelow){let r=e.focusedKey!=null?s.getKeyBelow(e.focusedKey):s.getFirstKey?.()??null;r==null&&d&&(r=s.getFirstKey?.()??null),r!=null&&(a.preventDefault(),A(r,a))}break}case"ArrowUp":{if(s.getKeyAbove){let r=e.focusedKey!=null?s.getKeyAbove(e.focusedKey):s.getLastKey?.()??null;r==null&&d&&(r=s.getLastKey?.()??null),r!=null&&(a.preventDefault(),A(r,a))}break}case"ArrowLeft":{if(s.getKeyLeftOf){let r=e.focusedKey!=null?s.getKeyLeftOf(e.focusedKey):null;r==null&&d&&(r=S?s.getFirstKey?.()??null:s.getLastKey?.()??null),r!=null&&(a.preventDefault(),A(r,a,S?"first":"last"))}break}case"ArrowRight":{if(s.getKeyRightOf){let r=e.focusedKey!=null?s.getKeyRightOf(e.focusedKey):null;r==null&&d&&(r=S?s.getLastKey?.()??null:s.getFirstKey?.()??null),r!=null&&(a.preventDefault(),A(r,a,S?"last":"first"))}break}case"Home":{if(s.getFirstKey){a.preventDefault();const r=s.getFirstKey();e.setFocusedKey(r),r!=null&&(ae(a)&&a.shiftKey&&e.selectionMode==="multiple"?e.extendSelection(r):b&&e.replaceSelection(r))}break}case"End":{if(s.getLastKey){a.preventDefault();const r=s.getLastKey();e.setFocusedKey(r),r!=null&&(ae(a)&&a.shiftKey&&e.selectionMode==="multiple"?e.extendSelection(r):b&&e.replaceSelection(r))}break}case"PageDown":{if(s.getKeyPageBelow&&e.focusedKey!=null){const r=s.getKeyPageBelow(e.focusedKey);r!=null&&(a.preventDefault(),A(r,a))}break}case"PageUp":{if(s.getKeyPageAbove&&e.focusedKey!=null){const r=s.getKeyPageAbove(e.focusedKey);r!=null&&(a.preventDefault(),A(r,a))}break}case"a":{ae(a)&&e.selectionMode==="multiple"&&!y&&(a.preventDefault(),e.selectAll());break}case"Escape":{m==="clearSelection"&&!f&&e.selectedKeys.size>0&&(a.stopPropagation(),a.preventDefault(),e.clearSelection());break}case"Tab":{!K&&n.current&&a.shiftKey&&n.current.focus();break}}},[s,e,n,g,d,b,p,y,f,m,K,A]),o=P.useCallback(a=>{if(!e.isFocused){if(e.setFocused(!0),e.focusedKey==null){const S=a.relatedTarget,r=S!=null&&!!(a.currentTarget.compareDocumentPosition(S)&Node.DOCUMENT_POSITION_FOLLOWING);let U=null;r?U=e.lastSelectedKey??s.getLastKey?.()??null:U=e.firstSelectedKey??s.getFirstKey?.()??null,U!=null&&(e.setFocusedKey(U),b&&!e.isSelected(U)&&e.replaceSelection(U))}else x.current&&(x.current.scrollTop=j.current.top,x.current.scrollLeft=j.current.left);e.focusedKey!=null&&_(e.focusedKey)}},[e,s,b,x,_]),D=P.useCallback(a=>{const S=a.relatedTarget;a.currentTarget.contains(S)||e.setFocused(!1)},[e]),h=P.useCallback(a=>{x.current===a.target&&a.preventDefault()},[x]);P.useEffect(()=>{const a=x.current;if(!a)return()=>{};const S=()=>{j.current={top:a.scrollTop,left:a.scrollLeft}};return a.addEventListener("scroll",S,{passive:!0}),()=>{a.removeEventListener("scroll",S)}},[x]),P.useEffect(()=>{if(!C.current)return;let a=null;if(C.current==="first"?a=s.getFirstKey?.()??null:C.current==="last"&&(a=s.getLastKey?.()??null),e.selectedKeys.size>0){for(const S of e.selectedKeys)if(e.canSelectItem?.(S)!==!1){a=S;break}}e.setFocused(!0),e.setFocusedKey(a),a==null&&!v&&n.current&&n.current.focus(),C.current=!1},[s,e,n,v]),P.useEffect(()=>{if(!e.isFocused||e.focusedKey==null||e.focusedKey===O.current)return;const a=be(n,e.focusedKey);a&&x.current&&Re(x.current,a),O.current=e.focusedKey},[e.isFocused,e.focusedKey,n,x]),P.useEffect(()=>()=>{k.current&&clearTimeout(k.current)},[]);const N=v?void 0:e.focusedKey==null?0:-1;return{collectionProps:B({onKeyDown:E,onFocus:o,onBlur:D,onMouseDown:h,tabIndex:N,"data-orientation":I})}}var Oe="Invariant failed";function Y(t,e){if(!t)throw new Error(Oe)}const H="div",he="Tab",ve="Tabs",Pe="TabList",Ke="TabPanel",Ce="TabPanels",Ae="SelectionIndicator",Fe=new WeakMap;function Z(t,e,s){return t?(typeof e=="string"&&(e=e.replace(/\s+/g,"")),`${Fe.get(t)}-${s}-${e}`):""}function _e(t,e,s){const{value:n,autoFocus:u,elementType:d,onPress:f,onPressStart:y,onPressEnd:m,onPressUp:b,onPressChange:p,preventFocusOnPress:v,isDisabled:K}=xe(t,{isDisabled:!1,elementType:t.elementType||t.as||H}),T=n===e.selectedValue,g=K||e.isValueDisabled(n),I=Z(e,n,"tab"),M=Z(e,n,"tabpanel"),{hoverProps:V,isHovered:x}=Ie({isDisabled:g}),{focusableProps:j}=Le({isDisabled:g},s),{focusProps:O,isFocused:C,isFocusVisible:L}=ke({autoFocus:u}),k=ge({isSelected:T,isDisabled:g}),A=c.useCallback(()=>{g||e.setFocusedKey(n)},[e,n,g]),{pressProps:_,isPressed:E}=Ve({ref:s,isDisabled:g,preventFocusOnPress:v,onPressStart:y,onPressEnd:m,onPressChange:p,onPressUp:b,onPress(h){g||e.setSelectedValue(n),f?.(h)}}),o=[];x&&o.push("hover"),C&&o.push("focus"),L&&o.push("focus-visible"),g&&o.push("disabled"),E&&o.push("pressed"),T&&o.push("selected");const D=B(j,_,V,O,k,{id:I,role:"tab","data-value":String(n),"data-key":String(n),"aria-controls":T?M:void 0,tabIndex:g?void 0:n==e.focusedKey||e.focusedKey==null&&T?0:-1,onFocus:A,"data-hover":x?"true":void 0,"data-focus":C?"true":void 0,"data-focus-visible":L?"true":void 0,"data-disabled":g?"true":void 0,"data-pressed":E?"true":void 0,"data-selected":T?"true":void 0,"data-sprocket-state":o.length>0?o.join(" "):void 0});return{tabId:I,tabProps:D,tabPanelId:M,isSelected:T,isDisabled:g,isPressed:E,isHovered:x,isFocused:C,isFocusVisible:L,elementType:d}}const se=c.createContext(null),ee=c.createContext(null),Ue=c.createContext(null),qe=c.createContext(null),ze=c.createContext(null),$e=c.createContext(null),We=c.createContext(null),we=c.createContext(null);function fe(t,e){[t,e]=W({props:t,ref:e,context:qe});const s=c.useContext(ee);Y(s);const{tabProps:n,elementType:u,isHovered:d,isPressed:f,isFocused:y,isDisabled:m,isSelected:b,isFocusVisible:p}=_e(t,s,e),v=le({defaultId:n.id}),K=q({...t,values:{isHovered:d,isPressed:f,isFocused:y,isFocusVisible:p,isDisabled:m,isSelected:b},defaultClassName:z({component:he}),style:T=>({...t.style instanceof Function?t.style(T):t.style})});return l.jsx($,{ref:e,as:u,...K,...B(n),id:v,slot:t.slot||void 0,children:K.children})}const ne=Object.assign(c.forwardRef((t,e)=>fe(t,e)),{Root:c.forwardRef((t,e)=>fe(t,e))});ne.displayName=he;ne.__docgenInfo={description:`A Tab component for Sprocket UI.
Must be used within a TabList component.`,methods:[],displayName:"Tab"};function He(t,e){const{defaultSelectedValue:s,orientation:n,activationMode:u,isDisabled:d,disabledValues:f,elementType:y,onSelectionChange:m,selectedValue:b}=xe(t,{orientation:"horizontal",activationMode:"automatic",isDisabled:!1,disabledValues:[],elementType:t.as??H}),p=le({}),[v,K]=c.useState(s??null),T=b??v,g=c.useMemo(()=>new Set(f),[f]),I=c.useCallback(o=>{b===void 0&&K(o),m?.(o)},[b,m]),M=c.useCallback(o=>d||g.has(o),[d,g]),V=c.useRef(null),x=c.useRef(!1),[j,O]=c.useState(null),C=c.useCallback(o=>{V.current=o,O(o)},[]),L=c.useMemo(()=>({get focusedKey(){return V.current},setFocusedKey:o=>C(o),get isFocused(){return x.current},setFocused:o=>{x.current=o},selectedKeys:T!=null?new Set([T]):new Set,selectionMode:"single",firstSelectedKey:T??null,lastSelectedKey:T??null,replaceSelection:o=>I(o),toggleSelection:o=>I(o),extendSelection(){},selectAll(){},clearSelection(){},isSelected:o=>o===T,isDisabled:o=>d||g.has(o),canSelectItem:o=>!d&&!g.has(o)}),[T,d,g,I,C]),k=c.useMemo(()=>{const o=()=>{if(!e.current)return[];const h=e.current.querySelectorAll("[data-key]");return Array.from(h).filter(N=>N.getAttribute("aria-disabled")!=="true").map(N=>N.dataset.key)},D=(h,N)=>{const a=o();return a[a.indexOf(String(h))+N]??null};return{getKeyRightOf:h=>D(h,1),getKeyLeftOf:h=>D(h,-1),getKeyBelow:h=>D(h,1),getKeyAbove:h=>D(h,-1),getFirstKey:()=>o()[0]??null,getLastKey:()=>{const h=o();return h[h.length-1]??null}}},[e]),{collectionProps:A}=Be({ref:e,selectionManager:L,keyboardDelegate:k,selectOnFocus:u==="automatic",shouldFocusWrap:!0,disallowTypeAhead:!0,disallowSelectAll:!0,disallowEmptySelection:!0,orientation:n});c.useEffect(()=>{if(j==null||!e.current)return;const o=e.current.querySelector(`[data-key="${CSS.escape(String(j))}"]`);o&&document.activeElement!==o&&o.focus()},[j,e]);const _=c.useMemo(()=>{const o={id:p,selectedValue:T,setSelectedValue:I,focusedKey:j,setFocusedKey:C,orientation:n,activationMode:u,isDisabled:d,isValueDisabled:M};return Fe.set(o,p),o},[p,T,I,j,C,n,u,d,M]),E=ge({label:t["aria-label"],labelledBy:t["aria-labelledby"],describedBy:t["aria-describedby"]});return{state:_,elementType:y,tabListProps:B({role:"tablist","aria-orientation":n},A,E)}}function ye(t,e){[t,e]=W({props:t,ref:e,context:Ue});const s=c.useContext(se),n=c.useRef(null),u=s?{...s,...t}:t,{tabListProps:d,elementType:f,state:y}=He(u,n),m=q({...t,values:{orientation:y.orientation},defaultClassName:z({component:Pe}),style:b=>({...t.style instanceof Function?t.style(b):t.style})});return l.jsx(ee.Provider,{value:y,children:l.jsx(we.Provider,{value:n,children:l.jsx($,{ref:De(e,n),as:f,...m,...B(d),slot:t.slot||void 0,children:m.children})})})}const oe=Object.assign(c.forwardRef((t,e)=>ye(t,e)),{Root:c.forwardRef((t,e)=>ye(t,e))});oe.displayName=Pe;oe.__docgenInfo={description:`A TabList component for Sprocket UI.
Contains Tab components and manages keyboard navigation.`,methods:[],displayName:"TabList"};function Ge(t,e){const{value:s,elementType:n=t.as??H}=t,u=e.selectedValue===s,d=Z(e,s,"tabpanel"),f=Z(e,s,"tab");return{tabPanelProps:{id:d,role:"tabpanel","aria-labelledby":f,tabIndex:0,hidden:!u,"data-selected":u?"true":void 0,"data-sprocket-state":u?"selected":void 0},elementType:n,isSelected:u}}function pe(t,e){[t,e]=W({props:t,ref:e,context:ze});const s=c.useContext(ee);Y(s);const{forceMount:n=!1}=t,{tabPanelProps:u,elementType:d,isSelected:f}=Ge(t,s),{value:y,...m}=t,b=q({...m,values:{isSelected:f},defaultClassName:z({component:Ke}),style:p=>({...t.style instanceof Function?t.style(p):t.style})});return!f&&!n?null:l.jsx($,{ref:e,as:d,...b,...B(u),slot:t.slot||void 0,children:b.children})}const re=Object.assign(c.forwardRef((t,e)=>pe(t,e)),{Root:c.forwardRef((t,e)=>pe(t,e))});re.displayName=Ke;re.__docgenInfo={description:`A TabPanel component for Sprocket UI.
Must be used within a Tabs component.`,methods:[],displayName:"TabPanel"};function me(t,e){[t,e]=W({props:t,ref:e,context:$e});const{elementType:s=t.as??H,slot:n}=t,u=q({...t,values:{},defaultClassName:z({component:Ce}),style:d=>({...t.style instanceof Function?t.style(d):t.style})});return l.jsx($,{ref:e,as:s,...u,slot:n||void 0,children:u.children})}const ce=Object.assign(c.forwardRef((t,e)=>me(t,e)),{Root:c.forwardRef((t,e)=>me(t,e))});ce.displayName=Ce;ce.__docgenInfo={description:`A TabPanels component for Sprocket UI.
Container for TabPanel components.`,methods:[],displayName:"TabPanels"};function Xe(t){const{id:e,selectedValue:s,disabledValues:n,defaultSelectedValue:u,isDisabled:d=!1,orientation:f="horizontal",activationMode:y="automatic",elementType:m=t.as??H,onSelectionChange:b}=t;return{tabsProps:{id:le({defaultId:e}),"data-orientation":f},contextValue:{isDisabled:d,selectedValue:s,orientation:f,disabledValues:n,activationMode:y,defaultSelectedValue:u,onSelectionChange:b},elementType:m}}function Je(t){const{state:e,tabListRef:s}=t,n=e.selectedValue!=null,[u,d]=c.useState(null),f=c.useCallback(()=>{const b=s.current;if(!b||e.selectedValue==null){d(null);return}const p=b.querySelector(`[data-value="${CSS.escape(String(e.selectedValue))}"]`);if(!p){d(null);return}const v=b.getBoundingClientRect(),K=p.getBoundingClientRect();d({x:K.left-v.left,y:K.top-v.top,width:K.width,height:K.height})},[s,e.selectedValue]);c.useLayoutEffect(()=>{f()},[f]),c.useEffect(()=>{const b=s.current;if(!b||typeof ResizeObserver>"u")return;const p=new ResizeObserver(()=>{f()});return p.observe(b),()=>{p.disconnect()}},[s,f]);const y=u?{"--sprocketui-selection-indicator-x":`${u.x}px`,"--sprocketui-selection-indicator-y":`${u.y}px`,"--sprocketui-selection-indicator-width":`${u.width}px`,"--sprocketui-selection-indicator-height":`${u.height}px`}:{};return{isSelected:n,metrics:u,indicatorStyle:y,selectionIndicatorProps:{"data-selected":n?"true":void 0,"data-sprocket-state":n?"selected":void 0}}}function Te(t,e){[t,e]=W({props:t,ref:e,context:We});const s=c.useContext(ee);Y(s);const n=c.useContext(we);Y(n);const{elementType:u=t.as??H,slot:d}=t,{isSelected:f,metrics:y,indicatorStyle:m,selectionIndicatorProps:b}=Je({state:s,tabListRef:n}),p=q({...t,values:{isSelected:f,selectedRect:y},defaultClassName:z({component:Ae}),style:v=>({...t.style instanceof Function?t.style(v):t.style,...m})});return l.jsx($,{ref:e,as:u,...p,...b,"aria-hidden":"true",slot:d||void 0,children:p.children})}const ie=Object.assign(c.forwardRef((t,e)=>Te(t,e)),{Root:c.forwardRef((t,e)=>Te(t,e))});ie.displayName=Ae;ie.__docgenInfo={description:`A SelectionIndicator component for Sprocket UI.
Visual indicator for the currently selected tab.
Must be used within a TabList component.`,methods:[],displayName:"SelectionIndicator"};function Se(t,e){[t,e]=W({props:t,ref:e,context:se});const{slot:s,...n}=t,{tabsProps:u,contextValue:d,elementType:f}=Xe(n),y=q({...t,values:{orientation:d.orientation??"horizontal"},defaultClassName:z({component:ve}),style:m=>({...t.style instanceof Function?t.style(m):t.style})});return l.jsx(se.Provider,{value:d,children:l.jsx($,{ref:e,as:f,...y,...B(u),slot:s||void 0,children:y.children})})}const i=Object.assign(c.forwardRef((t,e)=>Se(t,e)),{Root:c.forwardRef((t,e)=>Se(t,e)),List:oe,Tab:ne,Panel:re,Panels:ce,Indicator:ie});i.displayName=ve;i.__docgenInfo={description:`A Tabs component for Sprocket UI.
Wrapper component that provides context for TabList and TabPanel.`,methods:[],displayName:"Tabs"};const de={fontFamily:"'Oxanium', sans-serif",fontWeight:600,fontSize:"12px",letterSpacing:"0.15em",textTransform:"uppercase"},F={...de,padding:"10px 20px",border:"none",borderBottom:"2px solid transparent",background:"none",cursor:"pointer",color:"rgba(0,0,0,0.4)",transition:"all 0.25s ease",outline:"none"},ue={display:"flex",borderBottom:"1px solid rgba(0,0,0,0.15)"},w={...de,fontSize:"13px",letterSpacing:"0.1em",padding:"20px 16px",color:"rgba(0,0,0,0.6)"},te={width:"440px",border:"1px solid rgba(0,0,0,0.12)",clipPath:"polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))"},Qe=`
  @import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@400;600;700&display=swap');

  @keyframes sprocket-tab-underline {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }
`,R=(t,e)=>l.jsx("span",{style:{color:e?"#000":"rgba(0,0,0,0.4)",textShadow:e?"0 0 10px rgba(0,0,0,0.15)":"none",transition:"all 0.25s ease"},children:t}),it={title:"Components/Tabs",parameters:{layout:"centered"},tags:["autodocs"],decorators:[t=>l.jsxs(l.Fragment,{children:[l.jsx("style",{children:Qe}),l.jsx(t,{})]})]},G={render:()=>l.jsxs(i,{defaultSelectedValue:"tab1",style:te,children:[l.jsxs(i.List,{"aria-label":"System modules",style:ue,children:[l.jsx(i.Tab,{value:"tab1",style:F,children:({isSelected:t})=>R("Module-A",t)}),l.jsx(i.Tab,{value:"tab2",style:F,children:({isSelected:t})=>R("Module-B",t)}),l.jsx(i.Tab,{value:"tab3",style:F,children:({isSelected:t})=>R("Module-C",t)})]}),l.jsxs(i.Panels,{children:[l.jsx(i.Panel,{value:"tab1",style:w,children:"Module-A subsystem active. All processes nominal."}),l.jsx(i.Panel,{value:"tab2",style:w,children:"Module-B diagnostics loaded. Awaiting input."}),l.jsx(i.Panel,{value:"tab3",style:w,children:"Module-C interface standby. Ready for deployment."})]})]})},X={render:()=>l.jsxs(i,{defaultSelectedValue:"tab1",orientation:"vertical",style:{...te,display:"flex"},children:[l.jsxs(i.List,{"aria-label":"Vertical modules",style:{display:"flex",flexDirection:"column",borderRight:"1px solid rgba(0,0,0,0.15)",minWidth:"140px"},children:[l.jsx(i.Tab,{value:"tab1",style:{...F,borderBottom:"none",borderRight:"2px solid transparent",textAlign:"left"},children:({isSelected:t})=>R("Sector-1",t)}),l.jsx(i.Tab,{value:"tab2",style:{...F,borderBottom:"none",borderRight:"2px solid transparent",textAlign:"left"},children:({isSelected:t})=>R("Sector-2",t)}),l.jsx(i.Tab,{value:"tab3",style:{...F,borderBottom:"none",borderRight:"2px solid transparent",textAlign:"left"},children:({isSelected:t})=>R("Sector-3",t)})]}),l.jsxs(i.Panels,{style:{flex:1},children:[l.jsx(i.Panel,{value:"tab1",style:w,children:"Sector-1 perimeter secure."}),l.jsx(i.Panel,{value:"tab2",style:w,children:"Sector-2 scanning in progress."}),l.jsx(i.Panel,{value:"tab3",style:w,children:"Sector-3 awaiting clearance."})]})]})},J={render:()=>l.jsxs(i,{defaultSelectedValue:"tab1",style:te,children:[l.jsxs(i.List,{"aria-label":"Tabs with restricted",style:ue,children:[l.jsx(i.Tab,{value:"tab1",style:F,children:({isSelected:t})=>R("Access-1",t)}),l.jsx(i.Tab,{value:"tab2",isDisabled:!0,style:{...F,opacity:.25,cursor:"not-allowed"},children:()=>l.jsx("span",{style:{color:"rgba(0,0,0,0.2)"},children:"Restricted"})}),l.jsx(i.Tab,{value:"tab3",style:F,children:({isSelected:t})=>R("Access-3",t)})]}),l.jsxs(i.Panels,{children:[l.jsx(i.Panel,{value:"tab1",style:w,children:"Access-1 granted. Proceed."}),l.jsx(i.Panel,{value:"tab2",style:w,children:"Classified — clearance required."}),l.jsx(i.Panel,{value:"tab3",style:w,children:"Access-3 granted. Proceed."})]})]})},Q={render:()=>l.jsxs("div",{children:[l.jsx("p",{style:{...de,fontSize:"10px",color:"rgba(0,0,0,0.35)",marginBottom:"12px",letterSpacing:"0.2em"},children:"Arrow keys to navigate — Enter/Space to confirm"}),l.jsxs(i,{defaultSelectedValue:"tab1",activationMode:"manual",style:te,children:[l.jsxs(i.List,{"aria-label":"Manual activation",style:ue,children:[l.jsx(i.Tab,{value:"tab1",style:F,children:({isSelected:t})=>R("Channel-1",t)}),l.jsx(i.Tab,{value:"tab2",style:F,children:({isSelected:t})=>R("Channel-2",t)}),l.jsx(i.Tab,{value:"tab3",style:F,children:({isSelected:t})=>R("Channel-3",t)})]}),l.jsxs(i.Panels,{children:[l.jsx(i.Panel,{value:"tab1",style:w,children:"Channel-1 — manual confirmation required."}),l.jsx(i.Panel,{value:"tab2",style:w,children:"Channel-2 — manual confirmation required."}),l.jsx(i.Panel,{value:"tab3",style:w,children:"Channel-3 — manual confirmation required."})]})]})]})};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs defaultSelectedValue="tab1" style={containerStyle}>
      <Tabs.List aria-label="System modules" style={listStyle}>
        <Tabs.Tab value="tab1" style={tabStyle}>
          {({
          isSelected
        }: {
          isSelected: boolean;
        }) => selectedSpan('Module-A', isSelected)}
        </Tabs.Tab>
        <Tabs.Tab value="tab2" style={tabStyle}>
          {({
          isSelected
        }: {
          isSelected: boolean;
        }) => selectedSpan('Module-B', isSelected)}
        </Tabs.Tab>
        <Tabs.Tab value="tab3" style={tabStyle}>
          {({
          isSelected
        }: {
          isSelected: boolean;
        }) => selectedSpan('Module-C', isSelected)}
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="tab1" style={panelStyle}>Module-A subsystem active. All processes nominal.</Tabs.Panel>
        <Tabs.Panel value="tab2" style={panelStyle}>Module-B diagnostics loaded. Awaiting input.</Tabs.Panel>
        <Tabs.Panel value="tab3" style={panelStyle}>Module-C interface standby. Ready for deployment.</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
}`,...G.parameters?.docs?.source}}};X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs defaultSelectedValue="tab1" orientation="vertical" style={{
    ...containerStyle,
    display: 'flex'
  }}>
      <Tabs.List aria-label="Vertical modules" style={{
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid rgba(0,0,0,0.15)',
      minWidth: '140px'
    }}>
        <Tabs.Tab value="tab1" style={{
        ...tabStyle,
        borderBottom: 'none',
        borderRight: '2px solid transparent',
        textAlign: 'left'
      }}>
          {({
          isSelected
        }: {
          isSelected: boolean;
        }) => selectedSpan('Sector-1', isSelected)}
        </Tabs.Tab>
        <Tabs.Tab value="tab2" style={{
        ...tabStyle,
        borderBottom: 'none',
        borderRight: '2px solid transparent',
        textAlign: 'left'
      }}>
          {({
          isSelected
        }: {
          isSelected: boolean;
        }) => selectedSpan('Sector-2', isSelected)}
        </Tabs.Tab>
        <Tabs.Tab value="tab3" style={{
        ...tabStyle,
        borderBottom: 'none',
        borderRight: '2px solid transparent',
        textAlign: 'left'
      }}>
          {({
          isSelected
        }: {
          isSelected: boolean;
        }) => selectedSpan('Sector-3', isSelected)}
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels style={{
      flex: 1
    }}>
        <Tabs.Panel value="tab1" style={panelStyle}>Sector-1 perimeter secure.</Tabs.Panel>
        <Tabs.Panel value="tab2" style={panelStyle}>Sector-2 scanning in progress.</Tabs.Panel>
        <Tabs.Panel value="tab3" style={panelStyle}>Sector-3 awaiting clearance.</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
}`,...X.parameters?.docs?.source}}};J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <Tabs defaultSelectedValue="tab1" style={containerStyle}>
      <Tabs.List aria-label="Tabs with restricted" style={listStyle}>
        <Tabs.Tab value="tab1" style={tabStyle}>
          {({
          isSelected
        }: {
          isSelected: boolean;
        }) => selectedSpan('Access-1', isSelected)}
        </Tabs.Tab>
        <Tabs.Tab value="tab2" isDisabled style={{
        ...tabStyle,
        opacity: 0.25,
        cursor: 'not-allowed'
      }}>
          {() => <span style={{
          color: 'rgba(0,0,0,0.2)'
        }}>Restricted</span>}
        </Tabs.Tab>
        <Tabs.Tab value="tab3" style={tabStyle}>
          {({
          isSelected
        }: {
          isSelected: boolean;
        }) => selectedSpan('Access-3', isSelected)}
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panels>
        <Tabs.Panel value="tab1" style={panelStyle}>Access-1 granted. Proceed.</Tabs.Panel>
        <Tabs.Panel value="tab2" style={panelStyle}>Classified — clearance required.</Tabs.Panel>
        <Tabs.Panel value="tab3" style={panelStyle}>Access-3 granted. Proceed.</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
}`,...J.parameters?.docs?.source}}};Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <p style={{
      ...cyberFont,
      fontSize: '10px',
      color: 'rgba(0,0,0,0.35)',
      marginBottom: '12px',
      letterSpacing: '0.2em'
    }}>
        Arrow keys to navigate — Enter/Space to confirm
      </p>
      <Tabs defaultSelectedValue="tab1" activationMode="manual" style={containerStyle}>
        <Tabs.List aria-label="Manual activation" style={listStyle}>
          <Tabs.Tab value="tab1" style={tabStyle}>
            {({
            isSelected
          }: {
            isSelected: boolean;
          }) => selectedSpan('Channel-1', isSelected)}
          </Tabs.Tab>
          <Tabs.Tab value="tab2" style={tabStyle}>
            {({
            isSelected
          }: {
            isSelected: boolean;
          }) => selectedSpan('Channel-2', isSelected)}
          </Tabs.Tab>
          <Tabs.Tab value="tab3" style={tabStyle}>
            {({
            isSelected
          }: {
            isSelected: boolean;
          }) => selectedSpan('Channel-3', isSelected)}
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel value="tab1" style={panelStyle}>Channel-1 — manual confirmation required.</Tabs.Panel>
          <Tabs.Panel value="tab2" style={panelStyle}>Channel-2 — manual confirmation required.</Tabs.Panel>
          <Tabs.Panel value="tab3" style={panelStyle}>Channel-3 — manual confirmation required.</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </div>
}`,...Q.parameters?.docs?.source}}};const dt=["Default","Vertical","DisabledTab","ManualActivation"];export{G as Default,J as DisabledTab,Q as ManualActivation,X as Vertical,dt as __namedExportsOrder,it as default};

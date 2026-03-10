import{j as i}from"./jsx-runtime-u17CrQMm.js";import{r as m}from"./iframe-CQWRw0hy.js";import{H as g,m as v,u as O,a as L,b as H,P as M}from"./Primitive-Bxg4l5bh.js";import{u as U}from"./useSlottedContext-BJt1BrDe.js";import{u as $,a as ee}from"./useEffectEvent-D0XX5l0S.js";import{u as te,a as re}from"./useAriaProps-CwcZGOBR.js";import{f as oe,A as ne,a as se}from"./dom-props-DMPkQHZb.js";import{u as ae}from"./usePress-B8kNgEC6.js";import{d as V}from"./defu-C3oJZp48.js";import"./preload-helper-PPVm8Dsz.js";const ie=m.createContext(null),ce=m.createContext(null),G="Button",z="ToggleButton",R=g.Button;function X(e,t){const{rel:a,href:u,target:l,autoFocus:d,focusDisabled:n,preventFocusOnPress:b,isDisabled:r,isPending:c,type:s,elementType:o,onClick:p,onPress:h,onPressStart:y,onPressEnd:I,onPressUp:B,onPressChange:k}=V(e,{isDisabled:!1,isPending:!1,type:"button",as:R,elementType:e.elementType||e.as||R});let x;o===g.Button?x={type:s,disabled:r}:x={role:"button",href:o===g.A&&!r?u:void 0,target:o===g.A?l:void 0,type:o===g.Input?s:void 0,disabled:o===g.Input?r:void 0,"aria-disabled":!r||o===g.Input?void 0:r,rel:o===g.A?a:void 0};const{hoverProps:W,isHovered:A}=$({...e,isDisabled:r}),{focusProps:q,isFocused:N,isFocusVisible:D}=te({autoFocus:d}),{focusableProps:C}=ee(e,t),{pressProps:J,isPressed:F}=ae({ref:t,isDisabled:r||c,preventFocusOnPress:b,onPressStart:y,onPressEnd:I,onPressChange:k,onPress:h,onPressUp:B,onClick:p}),K=re({isBusy:c||void 0});n&&(C.tabIndex=r?-1:C.tabIndex);const Q=v(C,J,W,q,oe(e,{allowLabelableProps:!0,allowedLabelableProps:new Set([]),allowedLinkProps:new Set(se),extraAllowedProps:new Set(ne)})),f=[];A&&f.push("hover"),N&&f.push("focus"),D&&f.push("focus-visible"),r&&f.push("disabled"),F&&f.push("pressed"),c&&f.push("pending");const Z={"data-hover":A?"true":void 0,"data-focus":N?"true":void 0,"data-focus-visible":D?"true":void 0,"data-disabled":r?"true":void 0,"data-pressed":F?"true":void 0,"data-pending":c?"true":void 0,"data-sprocket-state":f.length>0?f.join(" "):void 0};return{isFocused:N,isPressed:F,isHovered:A,isDisabled:r,isPending:c,isFocusVisible:D,elementType:o,buttonProps:v(Q,x,K,Z)}}function le(e,t){const{isSelected:a,defaultSelected:u,onChange:l,onPress:d,...n}=V(e,{defaultSelected:!1}),b=a!==void 0,[r,c]=m.useState(u),s=b?a:r,o=m.useCallback(k=>{const x=!s;b||c(x),l?.(x),d?.(k)},[s,b,l,d]),p=X({...n,onPress:o},t),h=[];s&&h.push("selected");const y={"data-selected":s?"true":void 0},B=[p.buttonProps["data-sprocket-state"],...h].filter(Boolean).join(" ");return y["data-sprocket-state"]=B||void 0,{...p,isSelected:s,buttonProps:v(p.buttonProps,{"aria-pressed":s,...y})}}function E(e,t){[e,t]=U({props:e,ref:t,context:ie});const{buttonProps:a,isHovered:u,isPressed:l,isFocused:d,isDisabled:n,isPending:b,elementType:r,isFocusVisible:c}=X(e,t),s=O({defaultId:a.id}),o=L({...e,values:{isHovered:u,isPressed:l,isFocused:d,isFocusVisible:c,isDisabled:n,isPending:b},defaultClassName:H({component:G}),style:p=>({...e.style instanceof Function?e.style(p):e.style})});return i.jsx(M,{ref:t,as:r,...o,...v(a),id:s,slot:e.slot||void 0,children:o.children})}const j=Object.assign(m.forwardRef((e,t)=>E(e,t)),{Root:m.forwardRef((e,t)=>E(e,t))});j.displayName=G;j.__docgenInfo={description:`The public Button component for Sprocket UI.

@param {ButtonProps} props - The props for the Button component.
@param {ForwardedRef<HTMLButtonElement>} ref - The forwarded ref for the button element.
@returns {ReactElement | null} The rendered button element or null.`,methods:[],displayName:"Button"};function _(e,t){[e,t]=U({props:e,ref:t,context:ce});const{buttonProps:a,isHovered:u,isPressed:l,isFocused:d,isDisabled:n,isPending:b,isSelected:r,elementType:c,isFocusVisible:s}=le(e,t),o=O({defaultId:a.id}),p=L({...e,values:{isHovered:u,isPressed:l,isFocused:d,isFocusVisible:s,isDisabled:n,isPending:b,isSelected:r},defaultClassName:H({component:z}),style:h=>({...e.style instanceof Function?e.style(h):e.style})});return i.jsx(M,{ref:t,as:c,...p,...v(a),id:o,slot:e.slot||void 0,children:p.children})}const Y=Object.assign(m.forwardRef((e,t)=>_(e,t)),{Root:m.forwardRef((e,t)=>_(e,t))});Y.displayName=z;Y.__docgenInfo={description:`A ToggleButton component for Sprocket UI.
Allows users to toggle a selection on or off.`,methods:[],displayName:"ToggleButton"};function de(e){const{isHovered:t,isPressed:a,isDisabled:u,isPending:l,isFocusVisible:d}=e,n={fontFamily:"'Share Tech Mono', monospace",fontWeight:400,padding:"10px 28px",fontSize:"11px",letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer",background:"rgba(255, 255, 255, 0.06)",color:"#fff",border:"1px solid rgba(255, 255, 255, 0.25)",borderRadius:0,transition:"transform 0.3s ease-out, background 0.3s ease-out",outline:"none",position:"relative",display:"inline-flex",alignItems:"center",justifyContent:"center",overflow:"visible",transform:"translateY(0) scale(1)",willChange:"transform"};return u?{...n,cursor:"not-allowed",opacity:.5,transform:"none"}:l?{...n,cursor:"wait",color:"rgba(255, 255, 255, 0.5)",borderColor:"rgba(255, 255, 255, 0.2)",animation:"sprocket-pulse 2s ease-in-out infinite"}:a?{...n,background:"rgba(255, 255, 255, 0.15)",transform:"scale(0.98)"}:t?{...n,background:"rgba(255, 255, 255, 0.12)"}:d?{...n,borderColor:"rgba(255, 255, 255, 0.8)",boxShadow:"0 0 0 1px rgba(255, 255, 255, 0.4)"}:n}const pe=`
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

  @keyframes sprocket-pulse {
    0%, 100% { border-color: rgba(255, 255, 255, 0.2); }
    50% { border-color: rgba(255, 255, 255, 0.5); box-shadow: 0 0 12px rgba(255, 255, 255, 0.06); }
  }

  .cyber-btn-wrap {
    position: relative;
    display: inline-block;
  }

  /* Corner bracket accents */
  .corner-accent {
    position: absolute;
    width: 10px;
    height: 10px;
    pointer-events: none;
    transition: transform 0.3s ease;
    will-change: transform;
  }
  .corner-accent::before,
  .corner-accent::after {
    content: '';
    position: absolute;
    background: rgba(255, 255, 255, 0.6);
    transition: transform 0.3s ease;
    will-change: transform;
  }

  /* Top Left */
  .corner-tl { top: -1px; left: -1px; }
  .corner-tl::before { top: 0; left: 0; width: 6px; height: 1px; transform-origin: left center; }
  .corner-tl::after { top: 0; left: 0; width: 1px; height: 6px; transform-origin: center top; }

  /* Top Right */
  .corner-tr { top: -1px; right: -1px; }
  .corner-tr::before { top: 0; right: 0; width: 6px; height: 1px; transform-origin: right center; }
  .corner-tr::after { top: 0; right: 0; width: 1px; height: 6px; transform-origin: center top; }

  /* Bottom Left */
  .corner-bl { bottom: -1px; left: -1px; }
  .corner-bl::before { bottom: 0; left: 0; width: 6px; height: 1px; transform-origin: left center; }
  .corner-bl::after { bottom: 0; left: 0; width: 1px; height: 6px; transform-origin: center bottom; }

  /* Bottom Right */
  .corner-br { bottom: -1px; right: -1px; }
  .corner-br::before { bottom: 0; right: 0; width: 6px; height: 1px; transform-origin: right center; }
  .corner-br::after { bottom: 0; right: 0; width: 1px; height: 6px; transform-origin: center bottom; }

  /* Hover: expand corners outward */
  .cyber-btn-wrap:hover .corner-tl { transform: translate(-5px, -5px); }
  .cyber-btn-wrap:hover .corner-tr { transform: translate(5px, -5px); }
  .cyber-btn-wrap:hover .corner-bl { transform: translate(-5px, 5px); }
  .cyber-btn-wrap:hover .corner-br { transform: translate(5px, 5px); }
  .cyber-btn-wrap:hover .corner-accent::before { transform: scaleX(1.25); }
  .cyber-btn-wrap:hover .corner-accent::after { transform: scaleY(1.25); }

  /* Active: expand further */
  .cyber-btn-wrap:active .corner-tl { transform: translate(-6px, -6px); }
  .cyber-btn-wrap:active .corner-tr { transform: translate(6px, -6px); }
  .cyber-btn-wrap:active .corner-bl { transform: translate(-6px, 6px); }
  .cyber-btn-wrap:active .corner-br { transform: translate(6px, 6px); }
  .cyber-btn-wrap:active .corner-accent::before { transform: scaleX(2); }
  .cyber-btn-wrap:active .corner-accent::after { transform: scaleY(2); }

  /* Glow overlay */
  .glow-overlay {
    position: absolute;
    inset: -8px;
    pointer-events: none;
    z-index: -1;
  }
  .glow-overlay::before {
    content: '';
    position: absolute;
    inset: 8px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .glow-overlay::after {
    content: '';
    position: absolute;
    inset: -4px;
    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    filter: blur(16px);
  }
  .cyber-btn-wrap:hover .glow-overlay::before,
  .cyber-btn-wrap:hover .glow-overlay::after {
    opacity: 1;
  }
  .cyber-btn-wrap:active .glow-overlay::after {
    opacity: 1;
    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.15) 40%, transparent 70%);
  }
`,Pe={title:"Components/Button",component:j,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{children:{control:"text"},isDisabled:{control:"boolean"},isPending:{control:"boolean"},onPress:{action:"pressed"}},args:{children:"Initialize",isDisabled:!1,isPending:!1,style:de},decorators:[e=>i.jsxs(i.Fragment,{children:[i.jsx("style",{children:pe}),i.jsxs("div",{className:"cyber-btn-wrap",children:[i.jsx("div",{className:"glow-overlay"}),i.jsx("div",{className:"corner-accent corner-tl"}),i.jsx("div",{className:"corner-accent corner-tr"}),i.jsx("div",{className:"corner-accent corner-bl"}),i.jsx("div",{className:"corner-accent corner-br"}),i.jsx(e,{})]})]})]},w={},P={args:{isDisabled:!0,children:"Offline"}},T={args:{isPending:!0,children:"Syncing..."}},S={args:{elementType:"a",href:"https://example.com",target:"_blank",children:"Navigate"}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:"{}",...w.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    isDisabled: true,
    children: 'Offline'
  }
}`,...P.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    isPending: true,
    children: 'Syncing...'
  }
}`,...T.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    elementType: 'a',
    href: 'https://example.com',
    target: '_blank',
    children: 'Navigate'
  }
}`,...S.parameters?.docs?.source}}};const Te=["Default","Disabled","Pending","AsAnchor"];export{S as AsAnchor,w as Default,P as Disabled,T as Pending,Te as __namedExportsOrder,Pe as default};

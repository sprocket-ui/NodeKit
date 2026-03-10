import{j as e}from"./jsx-runtime-u17CrQMm.js";import{r as p}from"./iframe-CQWRw0hy.js";import"./preload-helper-PPVm8Dsz.js";const l={fontFamily:"'Share Tech Mono', monospace",fontWeight:400,fontSize:"11px",letterSpacing:"0.15em",textTransform:"uppercase",color:"#fff"},m=`
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

  .cyber-checkbox {
    position: relative;
    width: 22px;
    height: 22px;
    min-width: 22px;
    clip-path: polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px));
    border: 1px solid rgba(255,255,255,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-color 0.25s ease, transform 0.25s ease;
    transform: scale(1);
  }

  .cyber-checkbox.checked {
    border-color: #fff;
    transform: scale(1.15);
  }

  /* Center fill */
  .cyber-checkbox .fill {
    width: 6px;
    height: 6px;
    background: #fff;
    transform: scale(0);
    transition: transform 0.2s ease;
  }
  .cyber-checkbox.checked .fill {
    transform: scale(1);
  }
`,x=({checked:o,onChange:r,label:n})=>e.jsxs("label",{style:{...l,display:"flex",alignItems:"center",gap:"12px",cursor:"pointer",userSelect:"none"},children:[e.jsx("input",{type:"checkbox",checked:o,onChange:a=>r(a.target.checked),style:{position:"absolute",opacity:0,width:0,height:0,pointerEvents:"none"}}),e.jsx("div",{className:`cyber-checkbox ${o?"checked":""}`,children:e.jsx("div",{className:"fill"})}),e.jsx("span",{style:{color:o?"#fff":"rgba(255,255,255,0.45)",textShadow:o?"0 0 10px rgba(255,255,255,0.15)":"none",transition:"color 0.25s ease"},children:n})]}),y={title:"Components/Checkbox",parameters:{layout:"centered"},tags:["autodocs"],decorators:[o=>e.jsxs(e.Fragment,{children:[e.jsx("style",{children:m}),e.jsx(o,{})]})]},h=()=>{const[o,r]=p.useState(!1);return e.jsx(x,{checked:o,onChange:r,label:"Activate"})},s={render:()=>e.jsx(h,{})},f=()=>{const[o,r]=p.useState([]),n=["Neural-Link","Optic-HUD","Reflex-Boost"],a=t=>{r(i=>i.includes(t)?i.filter(d=>d!==t):[...i,t])};return e.jsxs("div",{children:[e.jsx("div",{style:{...l,fontSize:"10px",letterSpacing:"0.25em",color:"rgba(255,255,255,0.4)",marginBottom:"12px",borderBottom:"1px solid rgba(255,255,255,0.1)",paddingBottom:"8px"},children:"Augmentation Suite"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"10px",width:"260px"},children:n.map(t=>e.jsx(x,{checked:o.includes(t),onChange:()=>a(t),label:t},t))}),e.jsxs("div",{style:{...l,fontSize:"10px",letterSpacing:"0.2em",color:"rgba(255,255,255,0.3)",marginTop:"14px",borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:"10px"},children:["Online: ",o.length?o.join(" / "):"—"]})]})},c={render:()=>e.jsx(f,{})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <CheckboxDemo />
}`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <CheckboxGroupDemo />
}`,...c.parameters?.docs?.source}}};const j=["Default","CheckboxGroup"];export{c as CheckboxGroup,s as Default,j as __namedExportsOrder,y as default};

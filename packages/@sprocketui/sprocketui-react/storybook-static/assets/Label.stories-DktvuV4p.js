import{j as e}from"./jsx-runtime-u17CrQMm.js";import"./Primitive-Bxg4l5bh.js";import{L as a}from"./Label-C586MHTf.js";import"./iframe-CQWRw0hy.js";import"./preload-helper-PPVm8Dsz.js";import"./dom-props-DMPkQHZb.js";import"./useSlottedContext-BJt1BrDe.js";const o={fontFamily:"'Oxanium', sans-serif",fontWeight:600,fontSize:"11px",letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.6)",textShadow:"0 0 6px rgba(255,255,255,0.1)"},n={fontFamily:"'Oxanium', sans-serif",fontWeight:600,padding:"12px 20px",fontSize:"13px",letterSpacing:"0.1em",color:"#fff",background:"linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:0,outline:"none",transition:"all 0.25s ease",clipPath:"polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))"},i=`
  @import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@400;600;700&display=swap');

  input:focus {
    border-color: rgba(255,255,255,0.7) !important;
    box-shadow: 0 0 15px rgba(255,255,255,0.08), 0 0 40px rgba(255,255,255,0.03) !important;
  }

  input::placeholder {
    font-family: 'Oxanium', sans-serif;
    color: rgba(255,255,255,0.25);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`,g={title:"Components/Label",component:a,parameters:{layout:"centered"},tags:["autodocs"],args:{children:"System Label",style:o},decorators:[s=>e.jsxs(e.Fragment,{children:[e.jsx("style",{children:i}),e.jsx(s,{})]})]},t={},r={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:[e.jsx(a,{htmlFor:"input-demo",style:o,children:"Username"}),e.jsx("input",{id:"input-demo",type:"text",placeholder:"Enter callsign",style:n})]})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  }}>
      <Label htmlFor="input-demo" style={cyberLabel}>
        Username
      </Label>
      <input id="input-demo" type="text" placeholder="Enter callsign" style={cyberInput} />
    </div>
}`,...r.parameters?.docs?.source}}};const f=["Default","WithInput"];export{t as Default,r as WithInput,f as __namedExportsOrder,g as default};

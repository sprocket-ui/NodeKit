import{j as n}from"./jsx-runtime-u17CrQMm.js";import{H as T,m as k,a as D,b as F,P as _}from"./Primitive-Bxg4l5bh.js";import{r as o}from"./iframe-CQWRw0hy.js";import{m as A}from"./mergeRefs-BXtFy2_f.js";import{u as N}from"./useSlottedContext-BJt1BrDe.js";import{d as C}from"./defu-C3oJZp48.js";import{u as U}from"./Label-C586MHTf.js";import{f as M,A as z,a as V}from"./dom-props-DMPkQHZb.js";import"./preload-helper-PPVm8Dsz.js";const $=o.createContext(null);function G(e,t=-1/0,r=1/0){return Math.min(Math.max(e,t),r)}function W(e){if(!Number.isFinite(e)||e<0||e>1)throw new RangeError(`Percentage must be between 0 and 1, got ${e}`);return e}function X(e,t){const{value:r,minValue:s,maxValue:l,formatOptions:d,isIndeterminate:a,label:h}=C(e,{value:0,minValue:0,maxValue:100,formatOptions:new Intl.NumberFormat("en-US",{style:"percent"})});let{labelProps:v,fieldProps:g}=U({elementType:T.Span});const p=e.hungTimeout??5e3,w=G(r,s,l),m=W((r-s)/(l-s)),[P,I]=o.useState(!1);o.useEffect(()=>{if(I(!1),m>=1||a)return;const j=setTimeout(()=>I(!0),p);return()=>clearTimeout(j)},[m,a,p]);let S=h;if(!a&&!S){const O=d.resolvedOptions().style==="percent"?m:w;S=d.format(O)}const u=[];a&&u.push("indeterminate"),P&&u.push("hung");let E={role:"progressbar","aria-valuemin":s,"aria-valuemax":l,"aria-valuenow":a?void 0:w,"aria-valuetext":a?void 0:S,"data-indeterminate":a?"true":void 0,"data-hung":P?"true":void 0,"data-sprocket-state":u.length>0?u.join(" "):void 0};const H=k(g,M(e,{allowLabelableProps:!0,allowedLabelableProps:new Set([]),allowedLinkProps:new Set(V),extraAllowedProps:new Set(z)}));return{labelProps:v,progressBarProps:k(H,E),percentage:m,isIndeterminate:a??!1,isHung:P}}const q="div",R="ProgressBar";function B(e,t){[e,t]=N({props:e,ref:t,context:$});const r=o.useRef(null),{elementType:s=e.as??q,slot:l}=e,{progressBarProps:d,percentage:a,isIndeterminate:h,isHung:v}=X(e),g=D({...e,values:{percentage:a,isIndeterminate:h,isHung:v},defaultClassName:F({component:R}),style:p=>({...e.style instanceof Function?e.style(p):e.style})});return n.jsx(_,{ref:A(t,r),as:s,...g,...k(d),slot:l||void 0,children:g.children})}const i=Object.assign(o.forwardRef((e,t)=>B(e,t)),{Root:o.forwardRef((e,t)=>B(e,t))});i.displayName=R;i.__docgenInfo={description:`A ProgressBar component for Sprocket UI.
Displays a visual indicator of progress toward completion.`,methods:[],displayName:"ProgressBar"};const c={fontFamily:"'Oxanium', sans-serif",fontWeight:600,fontSize:"11px",letterSpacing:"0.15em",textTransform:"uppercase",color:"rgba(0,0,0,0.5)"},b={width:"320px",height:"6px",background:"rgba(0,0,0,0.06)",borderRadius:0,overflow:"hidden",border:"1px solid rgba(0,0,0,0.1)",clipPath:"polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))"},L={height:"100%",background:"linear-gradient(90deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.4) 100%)",transition:"width 200ms ease"},J=`
  @import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@400;600;700&display=swap');

  @keyframes sprocket-indeterminate {
    0% { margin-left: 0; opacity: 0.3; }
    50% { margin-left: 60%; opacity: 1; }
    100% { margin-left: 0; opacity: 0.3; }
  }

  @keyframes sprocket-hung-pulse {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
`,se={title:"Components/ProgressBar",component:i,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{value:{control:{type:"range",min:0,max:100,step:1}},isIndeterminate:{control:"boolean"}},args:{value:45,style:b},decorators:[e=>n.jsxs(n.Fragment,{children:[n.jsx("style",{children:J}),n.jsx(e,{})]})]},f={render:e=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"10px",alignItems:"flex-start"},children:[n.jsx("span",{style:c,children:"System Load"}),n.jsx(i,{...e,label:"Loading…",style:b,children:({percentage:t})=>n.jsx("div",{style:{...L,width:`${t}%`}})}),n.jsxs("span",{style:{...c,fontSize:"10px",color:"rgba(0,0,0,0.35)"},children:[e.value,"% Capacity"]})]})},y={args:{isIndeterminate:!0},render:e=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"10px",alignItems:"flex-start"},children:[n.jsx("span",{style:c,children:"Syncing"}),n.jsx(i,{...e,label:"Loading…",style:b,children:({isIndeterminate:t})=>n.jsx("div",{style:{width:t?"40%":"0%",height:"100%",background:"rgba(0,0,0,0.3)",animation:t?"sprocket-indeterminate 1.5s ease-in-out infinite":"none"}})})]})},x={args:{value:30,hungTimeout:2e3},render:e=>n.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"10px",alignItems:"flex-start"},children:[n.jsx("span",{style:c,children:"Upload Stream"}),n.jsx(i,{...e,label:"Upload",style:b,children:({percentage:t,isHung:r})=>n.jsx("div",{style:{width:`${t}%`,height:"100%",background:r?"linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)":L.background,transition:"width 200ms ease, background 200ms ease",animation:r?"sprocket-hung-pulse 1s ease-in-out infinite":"none"}})}),n.jsx("span",{style:{...c,fontSize:"10px",color:isHung?"rgba(0,0,0,0.7)":"rgba(0,0,0,0.35)"},children:"Hold value 2s to trigger hung state"})]})};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'flex-start'
  }}>
      <span style={cyberFont}>System Load</span>
      <ProgressBar {...args} label="Loading…" style={trackStyle}>
        {({
        percentage
      }: {
        percentage: number;
      }) => <div style={{
        ...fillBase,
        width: \`\${percentage}%\`
      }} />}
      </ProgressBar>
      <span style={{
      ...cyberFont,
      fontSize: '10px',
      color: 'rgba(0,0,0,0.35)'
    }}>{args.value}% Capacity</span>
    </div>
}`,...f.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    isIndeterminate: true
  },
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'flex-start'
  }}>
      <span style={cyberFont}>Syncing</span>
      <ProgressBar {...args} label="Loading…" style={trackStyle}>
        {({
        isIndeterminate
      }: {
        isIndeterminate: boolean;
      }) => <div style={{
        width: isIndeterminate ? '40%' : '0%',
        height: '100%',
        background: 'rgba(0,0,0,0.3)',
        animation: isIndeterminate ? 'sprocket-indeterminate 1.5s ease-in-out infinite' : 'none'
      }} />}
      </ProgressBar>
    </div>
}`,...y.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    value: 30,
    hungTimeout: 2000
  },
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'flex-start'
  }}>
      <span style={cyberFont}>Upload Stream</span>
      <ProgressBar {...args} label="Upload" style={trackStyle}>
        {({
        percentage,
        isHung
      }: {
        percentage: number;
        isHung: boolean;
      }) => <div style={{
        width: \`\${percentage}%\`,
        height: '100%',
        background: isHung ? 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)' : fillBase.background,
        transition: 'width 200ms ease, background 200ms ease',
        animation: isHung ? 'sprocket-hung-pulse 1s ease-in-out infinite' : 'none'
      }} />}
      </ProgressBar>
      <span style={{
      ...cyberFont,
      fontSize: '10px',
      color: isHung ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.35)'
    }}>
        Hold value 2s to trigger hung state
      </span>
    </div>
}`,...x.parameters?.docs?.source}}};const oe=["Default","Indeterminate","HungDetection"];export{f as Default,x as HungDetection,y as Indeterminate,oe as __namedExportsOrder,se as default};

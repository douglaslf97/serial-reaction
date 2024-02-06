(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[231],{8227:function(e,s,t){Promise.resolve().then(t.bind(t,6077))},6077:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return b}});var i=t(7821),a=t(8078),r=t(5249),n=t(7087),l=t(1830),o=t(2646),c=e=>{let{name:s,label:t,...r}=e,n=(0,a.useRef)(null),{fieldName:l,defaultValue:c,registerField:u,error:d}=(0,o.U$)(s);return(0,a.useEffect)(()=>{u({name:l,ref:n,getValue:e=>e.current.value,setValue:(e,s)=>{e.current.value=s},clearValue:e=>{e.current.value=""}})},[l,u]),(0,i.jsxs)("div",{className:"sm:col-span-3",children:[(0,i.jsx)("label",{htmlFor:s,className:"block text-sm font-medium leading-6 text-gray-900",children:t}),(0,i.jsxs)("div",{className:"mt-2",children:[(0,i.jsx)("input",{ref:n,name:s,defaultValue:c,className:"px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 readonly",...r}),(0,i.jsx)("p",{className:"text-red-500 text-xs italic",children:d})]})]})},u=t(5443),d=t(6179),m=t(1139);async function x(e,s,t){let i=new m.ZP.Document(s),a=new Blob([i.toString()],{type:"text/yaml;charset=uft8;"}),r=document.createElement("a");if(void 0!==r.download){let s=URL.createObjectURL(a);r.setAttribute("href",s),r.setAttribute("download",e),r.click()}}var b=()=>{let e=(0,a.useRef)(null),s=(0,d.useRouter)(),[t,o]=(0,a.useState)(""),{addUserSession:m,user_sessions:b}=(0,n.useAppContext)(),p=(0,a.useCallback)(async t=>{try{if(e.current){e.current.setErrors({});let i=u.Ry().shape({name:u.Z_().required("Esse campo \xe9 obrigat\xf3rio"),number_serial_per_block:u.Rx().transform(e=>Number.isNaN(e)?0:e).defined("Esse campo deve conter apenas n\xfameros").min(1,"O m\xednimo para esse campo \xe9 1").required("Esse campo \xe9 obrigat\xf3rio"),max_time:u.Rx().transform(e=>Number.isNaN(e)?0:e).defined("Esse campo \xe9 obrigat\xf3rio").min(1,"O m\xednimo para esse campo \xe9 1").required("Esse campo \xe9 obrigat\xf3rio")});await i.validate(t,{abortEarly:!1}),t.max_time=6e4*Number(t.max_time),m({id:t.id,max_time:t.max_time,name:t.name,number_serial_per_block:Number(t.number_serial_per_block),blocks:[]}),s.push("/session/execution/?session_id=".concat(t.id))}}catch(t){var i;console.log(t);let s={};t instanceof u.p8&&t.inner.forEach(e=>{e&&e.path&&(s[e.path]=e.message)}),null===(i=e.current)||void 0===i||i.setErrors(s)}},[m,s]);(0,a.useEffect)(()=>{o((0,r.Z)())},[]);let f=(0,a.useCallback)(async()=>{await x("sessions.yaml",{sessions:b})},[b]);return(0,i.jsx)("div",{className:"h-screen flex relative isolate overflow-hidden py-16 sm:py-24 lg:py-32",children:(0,i.jsx)("div",{className:"mx-auto my-auto w-7xl px-6 lg:px-8",children:(0,i.jsxs)("div",{className:"bg-white h-2xl p-8 mx-auto my-auto rounded-md",children:[b.some(e=>(e.blocks||[]).length>0)&&(0,i.jsx)("div",{className:"mt-1 mb-10 flex items-center justify-end gap-x-6",children:(0,i.jsx)("button",{onClick:()=>f(),type:"button",className:"rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600",children:"Exportar dados"})}),(0,i.jsxs)(l.l,{ref:e,placeholder:null,onSubmit:e=>p(e),children:[(0,i.jsxs)("div",{className:"border-b border-gray-900/10 pb-12",children:[(0,i.jsx)("h2",{className:"text-base font-semibold leading-7 text-gray-900",children:"Iniciar sess\xe3o"}),(0,i.jsx)("p",{className:"mt-1 text-sm leading-6 text-gray-600",children:"Todas os campos devem ser preenchidos"}),(0,i.jsx)("div",{className:"block mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3",children:(0,i.jsx)(c,{defaultValue:t,label:"Id",name:"id",readOnly:!0})}),(0,i.jsxs)("div",{className:"mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6",children:[(0,i.jsx)(c,{label:"Nome",name:"name"}),(0,i.jsx)(c,{defaultValue:10,label:"Quantidade de sequ\xeancias por bloco",name:"number_serial_per_block",type:"number"}),(0,i.jsx)(c,{defaultValue:10,label:"Tempo m\xe1ximo da sess\xe3o",name:"max_time",type:"number",placeholder:"Em minutos"})]})]}),(0,i.jsx)("div",{className:"mt-6 flex items-center justify-end gap-x-6",children:(0,i.jsx)("button",{type:"submit",className:"rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",children:"Iniciar sess\xe3o"})})]})]})})})}},7087:function(e,s,t){"use strict";t.r(s),t.d(s,{AppProvider:function(){return n},useAppContext:function(){return l}});var i=t(7821),a=t(8078);let r=a.createContext({}),n=e=>{let{children:s}=e,[t,n]=(0,a.useState)([]),l=(0,a.useCallback)(e=>{n([...t,e])},[t]);return(0,i.jsx)(r.Provider,{value:{user_sessions:t||[],getUserSession:e=>t.find(s=>s.id===e),addUserSession:l,removeUserSession:e=>{n(t.filter(s=>s.id!==e.id))},wipeUsersSessions:()=>{n([])}},children:s})},l=()=>(0,a.useContext)(r)}},function(e){e.O(0,[482,115,141,744],function(){return e(e.s=8227)}),_N_E=e.O()}]);
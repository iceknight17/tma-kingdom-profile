import{c as A,j as e,r as u,u as T,a as O,T as U,_ as h,b as I,d as L,R as _}from"./vendor-BpZAPtio.js";(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function i(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(t){if(t.ep)return;t.ep=!0;const a=i(t);fetch(t.href,a)}})();const E=""+new URL("logo-D84F9bvj.jpg",import.meta.url).href,$=A(s=>({currentUser:null,setCurrentUser:l=>s(()=>({currentUser:l}))})),D=()=>Math.floor(Math.random()*360),M=s=>{var t,a;let l=s.split(" "),i=((t=l[0])==null?void 0:t[0])??"",o=((a=l[1])==null?void 0:a[0])??"";return`${i}${o}`};function B(s){return s.toLocaleString("en-US",{maximumFractionDigits:3})}const P=({name:s,className:l})=>{const i=M(s);let o=0;localStorage.getItem("avatar-color")?o=parseInt(localStorage.getItem("avatar-color")):(o=D(),localStorage.setItem("avatar-color",o.toString()));const t=`hsl(${o}, 50% , 50%)`;return e.jsx("div",{className:`user__placeholder cursor-pointer ${l}`,style:{backgroundColor:t},children:i})};function R(){const{currentUser:s,setCurrentUser:l}=$(),[i,o]=u.useState(3e3),[t,a]=u.useState(""),[c,w]=u.useState(""),f=200,x=1e5,d=T(),{initDataUnsafe:p}=h,[g]=O(),y="https://toncenter.com/api/v3/wallet?address=AAA",b="UQBHElFWKjmKuq28lZi4UjydKyazgHp3NjQCCcCtxklHV5jw";u.useEffect(()=>{const r=localStorage.getItem("current_user");r&&l(JSON.parse(r))},[]),u.useEffect(()=>{p&&!s&&v(p.user)},[p,s]),u.useEffect(()=>{d&&s&&!s.wallet_address&&N()},[d]);const j=async r=>{const n=await fetch(y.replace("AAA",r));if(n.ok){const m=await n.json();if(m.ok)return parseFloat(m.result.balance)}return 0},v=async r=>{const n=await fetch("https://innocent-clear-ferret.ngrok-free.app/api/profile/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(console.log("response",n),n.ok){const m=await n.json();localStorage.setItem("current_user",JSON.stringify(m)),l(m)}},N=async()=>{j(d).then(n=>{o(n)});const r=await fetch("https://innocent-clear-ferret.ngrok-free.app/api/profile/setwallet",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...s,wallet_address:d})});console.log("connected wallet",r),r.ok&&l({...s,wallet_address:d})},S=()=>{const r={validUntil:Math.floor(Date.now()/1e3)+60,messages:[{address:b,amount:`${Math.floor(parseFloat(t)*1e9)}`}]};return g.sendTransaction(r)},k=async()=>{if(f<parseInt(t)&&parseInt(t)>x){h.showAlert(`Deposit amount must be less than ${f}TON and greater than ${x}TON!`);return}else(await S()).boc},C=async()=>{if(f<parseInt(c)&&parseInt(c)>x){h.showAlert(`Withdraw amount must be less than ${f}TON and greater than ${x}TON!`);return}else{const r=await fetch("https://innocent-clear-ferret.ngrok-free.app/api/profile/bet",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({currentUser:s,withdrawAmount:c})});if(r.ok){const n=await r.json();console.log(n)}}};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"w-full h-screen flex flex-col p-6 z-10 relative",children:d?s&&e.jsxs("div",{className:"w-full mt-2 flex flex-col flex-1 justify-between",children:[e.jsxs("div",{className:"w-full flex flex-col items-center pt-12",children:[e.jsx(P,{name:s==null?void 0:s.fullname,className:"w-24 h-24 text-5xl"}),e.jsx("p",{className:"cursor-pointer text-xl text-blue-500 mt-2 font-medium",children:"Edit profile image"}),e.jsxs("div",{className:"w-full flex mt-10",children:[e.jsx("div",{className:"flex-1 font-semibold",children:"Username"}),e.jsxs("div",{className:"flex-2 text-left",children:["@",s.username]}),e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",className:"rotate-90 w-4",children:e.jsx("path",{d:"M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"})})]}),e.jsxs("div",{className:"w-full flex mt-8 items-center",children:[e.jsx("div",{className:"flex-1 font-semibold",children:"Wallet"}),e.jsx("div",{className:"flex-2 text-left flex items-center",children:s.wallet_address}),e.jsx("svg",{onClick:()=>{g.disconnect()},xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",className:"w-4",children:e.jsx("path",{d:"M272 112v51.6h-96c-26.5 0-48 21.5-48 48v88.6c0 26.5 21.5 48 48 48h96v51.6c0 42.6 51.7 64.2 81.9 33.9l144-143.9c18.7-18.7 18.7-49.1 0-67.9l-144-144C323.8 48 272 69.3 272 112zm192 144L320 400v-99.7H176v-88.6h144V112l144 144zM96 64h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h84c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H96c-53 0-96-43-96-96V160c0-53 43-96 96-96z"})})]}),e.jsxs("div",{className:"w-full flex mt-8 items-center",children:[e.jsx("div",{className:"flex-1 font-semibold",children:"Ton"}),e.jsxs("div",{className:"flex-2 text-left flex items-center",children:[B(i)," TON"]}),e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",className:"rotate-90 w-4",children:e.jsx("path",{d:"M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"})})]}),e.jsxs("div",{className:"w-full flex mt-8",children:[e.jsx("div",{className:"flex-1 font-semibold",children:"Stars"}),e.jsx("div",{className:"flex-2 text-left",children:s.blue_stars.toLocaleString()}),e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",className:"rotate-90 w-4",children:e.jsx("path",{d:"M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"})})]})]}),e.jsxs("div",{className:"w-full flex flex-col gap-3",children:[e.jsxs("div",{className:"w-full",children:[e.jsx("input",{type:"number",value:t,className:"h-10 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500",onChange:r=>{a(r.target.value)},placeholder:"1:1000"}),e.jsx("button",{type:"button",onClick:k,className:"text-white w-full mt-3 bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-xl px-5 py-3 flex-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700",children:"Deposit"})]}),e.jsx("hr",{className:"border-gray-300"}),e.jsxs("div",{className:"w-full",children:[e.jsx("input",{type:"number",value:c,className:"h-10 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500",onChange:r=>{w(r.target.value)},placeholder:"1100:1"}),e.jsx("button",{type:"button",onClick:C,className:"text-white w-full mt-3 bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-xl px-5 py-3 flex-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700",children:"Withdraw"})]})]})]}):e.jsxs("div",{className:"w-full mt-2 flex flex-col flex-1 justify-between",children:[e.jsx("h3",{className:"font-bold text-gray-900 text-center text-3xl mt-12",children:"Ton Stars"}),e.jsxs("div",{children:[e.jsx("img",{src:E,className:"w-full rounded-lg mb-6",alt:"ton stars main logo"}),e.jsx("p",{className:"text-4xl text-center text-gray-500",children:"Connect your wallet"}),e.jsx("p",{className:"text-xl text-center text-gray-500 mt-2 mb-5",children:"Connect your ton wallet to continue"}),e.jsx(U,{className:"ton-wallet-btn mb-8"})]})]})})})}h.ready();I.createRoot(document.getElementById("root")).render(e.jsx(L,{manifestUrl:"https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json",actionsConfiguration:{twaReturnUrl:"https://t.me/happpydaybot"},children:e.jsx(_.StrictMode,{children:e.jsx(R,{})})}));

import{s as Q,f as v,l as X,a as V,g as C,h as L,m as Y,c as W,d as y,j as b,O as I,k as w,i as S,A as T,I as te,v as ne,n as Z,r as q,D as se,p as ae,K as oe,E as re,o as le,e as N}from"../chunks/scheduler.d70b54e9.js";import{S as x,i as $,b as z,d as D,m as P,c as ie,a as M,t as j,e as R,g as ce}from"../chunks/index.4ee4b432.js";import{w as fe,I as ue,e as O,u as he,o as me}from"../chunks/utils.4783f3e4.js";import{g as B}from"../chunks/navigation.8fa9c937.js";import{e as F}from"../chunks/singletons.45018de4.js";import{M as de}from"../chunks/MagnifyingGlass.bd57d0b4.js";import{w as _e}from"../chunks/wordList.e69146e4.js";import{c as ge}from"../chunks/textToSpeech.aa2b76e6.js";function K(t){let e,n;return{c(){e=v("span"),n=X(t[1]),this.h()},l(s){e=C(s,"SPAN",{class:!0});var r=L(e);n=Y(r,t[1]),r.forEach(y),this.h()},h(){b(e,"class","absolute bottom-1 right-1 text-sm")},m(s,r){S(s,e,r),T(e,n)},p(s,r){r&2&&Z(n,s[1])},d(s){s&&y(e)}}}function pe(t){let e,n,s,r,o,d,g,p,u=t[1]&&K(t);return{c(){e=v("button"),n=X(t[0]),s=V(),u&&u.c(),this.h()},l(h){e=C(h,"BUTTON",{class:!0,style:!0});var a=L(e);n=Y(a,t[0]),s=W(a),u&&u.l(a),a.forEach(y),this.h()},h(){b(e,"class",r=t[4]+" rounded-[5px] border flex items-center justify-center text-[3.5em] font-extrabold transition-colors relative svelte-t4pl1x"),b(e,"style",o="background-color: hsla("+t[7]+", 77%, 75%, 0.5); "+t[5]),e.disabled=d=!t[1],I(e,"cursor-default",!t[1]),I(e,"opacity-40",!t[1]),I(e,"alphabet-btn",t[1]),w(e,"border-color",`hsla(${t[7]}, 86%, 72%, 0.1)`),w(e,"color",`hsla(${t[7]}, 70%, 81%, 1)`),w(e,"width",t[2]),w(e,"height",t[3]),w(e,"text-transform","uppercase"),w(e,"--hue",t[7])},m(h,a){S(h,e,a),T(e,n),T(e,s),u&&u.m(e,null),t[12](e),g||(p=te(e,"click",function(){ne(t[1]?t[8]:void 0)&&(t[1]?t[8]:void 0).apply(this,arguments)}),g=!0)},p(h,[a]){t=h,a&1&&Z(n,t[0]),t[1]?u?u.p(t,a):(u=K(t),u.c(),u.m(e,null)):u&&(u.d(1),u=null),a&16&&r!==(r=t[4]+" rounded-[5px] border flex items-center justify-center text-[3.5em] font-extrabold transition-colors relative svelte-t4pl1x")&&b(e,"class",r),a&160&&o!==(o="background-color: hsla("+t[7]+", 77%, 75%, 0.5); "+t[5])&&b(e,"style",o),a&2&&d!==(d=!t[1])&&(e.disabled=d),a&18&&I(e,"cursor-default",!t[1]),a&18&&I(e,"opacity-40",!t[1]),a&18&&I(e,"alphabet-btn",t[1]);const c=a&160;c&&w(e,"border-color",`hsla(${t[7]}, 86%, 72%, 0.1)`),c&&w(e,"color",`hsla(${t[7]}, 70%, 81%, 1)`),(c||a&164)&&w(e,"width",t[2]),(c||a&168)&&w(e,"height",t[3]),c&&w(e,"text-transform","uppercase"),c&&w(e,"--hue",t[7])},i:q,o:q,d(h){h&&y(e),u&&u.d(),t[12](null),g=!1,p()}}}function ye(t,e,n){let s,{letter:r}=e,{count:o=10}=e,{width:d="12rem"}=e,{height:g="12rem"}=e,{class:p=""}=e,{style:u=""}=e,{hue:h=0}=e,{showTransition:a=!1}=e,{onAfterTransition:c=async()=>{await fe(500)}}=e,k;const l=se();async function i(){return new Promise((f,A)=>{requestAnimationFrame(()=>{try{const m=document.createElement("div"),{left:H,top:ee}=k.getBoundingClientRect();m.id="alphabet-card-transition",m.classList.add("border","flex","items-center","justify-center","text-[3.5em]","font-extrabold","transition-colors","alphabet-btn","fixed","z-50"),m.style.borderColor=`hsla(${s}, 86%, 72%, 0.1)`,m.style.color=`hsla(${s}, 70%, 81%, 1)`,m.style.backgroundColor=`hsla(${s}, 77%, 75%, 0.7)`,m.style.width=d,m.style.height=g,m.style.left="0",m.style.top="0",m.style.transformOrigin="top left",m.style.borderRadius="5px",m.style.transform=`translate(${H}px, ${ee}px) scale(1)`,m.style.opacity="0",m.style.textTransform="uppercase",m.style.setProperty("--hue",s.toString()),f(m)}catch(m){A(m)}})})}async function _(f){if(!a){l("click",f);return}const A=await i();document.body.appendChild(A),requestAnimationFrame(()=>{const m=window.innerWidth/A.offsetWidth,H=window.innerHeight/A.offsetHeight;A.style.opacity="1",A.animate({transform:[`${A.style.transform}`,`translate(0, 0) scale(${m}, ${H})`],borderRadius:["5px","0"]},{duration:500,easing:"ease-in-out",fill:"forwards"}).onfinish=async()=>{await c(r.toLowerCase())}})}function E(f){ae[f?"unshift":"push"](()=>{k=f,n(6,k)})}return t.$$set=f=>{"letter"in f&&n(0,r=f.letter),"count"in f&&n(1,o=f.count),"width"in f&&n(2,d=f.width),"height"in f&&n(3,g=f.height),"class"in f&&n(4,p=f.class),"style"in f&&n(5,u=f.style),"hue"in f&&n(9,h=f.hue),"showTransition"in f&&n(10,a=f.showTransition),"onAfterTransition"in f&&n(11,c=f.onAfterTransition)},t.$$.update=()=>{t.$$.dirty&512&&n(7,s=h%360)},[r,o,d,g,p,u,k,s,_,h,a,c,E]}class be extends x{constructor(e){super(),$(this,e,ye,pe,Q,{letter:0,count:1,width:2,height:3,class:4,style:5,hue:9,showTransition:10,onAfterTransition:11})}}function U(t,e,n){const s=t.slice();return s[8]=e[n],s[10]=n,s}function we(t){let e,n;return e=new de({props:{slot:"start",class:"text-white opacity-50",size:18}}),{c(){z(e.$$.fragment)},l(s){D(e.$$.fragment,s)},m(s,r){P(e,s,r),n=!0},p:q,i(s){n||(M(e.$$.fragment,s),n=!0)},o(s){j(e.$$.fragment,s),n=!1},d(s){R(e,s)}}}function G(t,e){let n,s,r;return s=new be({props:{letter:e[8],hue:32*e[10],onAfterTransition:e[1],showTransition:!0,count:e[4](e[8])}}),{key:t,first:null,c(){n=N(),z(s.$$.fragment),this.h()},l(o){n=N(),D(s.$$.fragment,o),this.h()},h(){this.first=n},m(o,d){S(o,n,d),P(s,o,d),r=!0},p(o,d){e=o},i(o){r||(M(s.$$.fragment,o),r=!0)},o(o){j(s.$$.fragment,o),r=!1},d(o){o&&y(n),R(s,o)}}}function ke(t){let e,n,s,r,o=[],d=new Map,g,p,u,h,a;n=new ue({props:{placeholder:"Search",rootClass:"w-1/3",searchItems:t[0].map(J),label:"Search",$$slots:{start:[we]},$$scope:{ctx:t}}}),n.$on("search",t[2]),n.$on("keyup",t[3]);let c=O(Array.from({length:26},t[6]));const k=l=>l[8];for(let l=0;l<c.length;l+=1){let i=U(t,c,l),_=k(i);d.set(_,o[l]=G(_,i))}return{c(){e=v("div"),z(n.$$.fragment),s=V(),r=v("div");for(let l=0;l<o.length;l+=1)o[l].c();g=V(),p=v("meta"),u=v("meta"),h=v("meta"),this.h()},l(l){e=C(l,"DIV",{class:!0});var i=L(e);D(n.$$.fragment,i),s=W(i),r=C(i,"DIV",{class:!0});var _=L(r);for(let f=0;f<o.length;f+=1)o[f].l(_);_.forEach(y),i.forEach(y),g=W(l);const E=oe("svelte-2q3sxa",document.head);p=C(E,"META",{name:!0,content:!0}),u=C(E,"META",{name:!0,content:!0}),h=C(E,"META",{name:!0,content:!0}),E.forEach(y),this.h()},h(){b(r,"class","h-full flex flex-wrap gap-4 p-4 justify-center overflow-y-auto"),b(e,"class","flex justify-center flex-col items-center mt-3 h-full gap-2"),document.title="Vocabulary",b(p,"name","description"),b(p,"content","Vocabulary App for learning words with AI"),b(u,"name","keywords"),b(u,"content","Vocabulary, AI, Learning, Words"),b(h,"name","author"),b(h,"content","Amit Singh")},m(l,i){S(l,e,i),P(n,e,null),T(e,s),T(e,r);for(let _=0;_<o.length;_+=1)o[_]&&o[_].m(r,null);S(l,g,i),T(document.head,p),T(document.head,u),T(document.head,h),a=!0},p(l,[i]){const _={};i&1&&(_.searchItems=l[0].map(J)),i&2048&&(_.$$scope={dirty:i,ctx:l}),n.$set(_),i&18&&(c=O(Array.from({length:26},l[6])),ce(),o=he(o,i,k,1,l,c,d,r,me,G,null,U),ie())},i(l){if(!a){M(n.$$.fragment,l);for(let i=0;i<c.length;i+=1)M(o[i]);a=!0}},o(l){j(n.$$.fragment,l);for(let i=0;i<o.length;i+=1)j(o[i]);a=!1},d(l){l&&(y(e),y(g)),R(n);for(let i=0;i<o.length;i+=1)o[i].d();y(p),y(u),y(h)}}}const J=t=>t.word;function Ae(t,e,n){let s,r;re(t,_e,a=>n(5,r=a));async function o(a){await B(`${F}/list/${a}`)}function d(a){const c=a.trim().toLowerCase();if(!c)return;const k=c[0];B(`${F}/list/${k}#${c}`)}function g(a){const c=a.detail;d(c)}function p(a){if(a.key==="Enter"){const c=a.target.value;d(c)}}function u(a){let c=0;const k=a[0].toLowerCase();for(const l of s)l.word[0]===k&&c++;return c}le(()=>{ge()});const h=(a,c)=>String.fromCharCode(65+c);return t.$$.update=()=>{t.$$.dirty&32&&n(0,s=r)},[s,o,g,p,u,r,h]}class je extends x{constructor(e){super(),$(this,e,Ae,ke,Q,{})}}export{je as component};

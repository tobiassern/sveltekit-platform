import"./disclose-version.Bg9kRutz.js";import{p as A,t as b,a as z,a7 as R}from"./runtime.Jf46wuGD.js";import{s as h,a as T}from"./render.Bv0yYwOM.js";import{l as c,p,s as q,i as B}from"./props.P1SnnUBI.js";import{a as r,t as m,b as N,c as f,f as v,s as x}from"./template.Cy1XqOF_.js";import{s as j,f as w,g as G,h as H,i as J,j as K,k as L,l as M}from"./input.C_q-rZkj.js";import{d as y}from"./misc.heqD49q_.js";import{i as F}from"./store.4n1elMwH.js";var O=m("<div><!></div>");function Q(n,t){const s=c(t,["children","$$slots","$$events"]),i=c(s,["class","variant"]);A(t,!1);let l=p(t,"class",8,()=>{}),a=p(t,"variant",0,"default");F();var e=O();let o;var d=N(e);h(d,y(t),{},null),b(()=>o=j(e,o,{class:w(X({variant:a()}),l()),...i,role:"alert"},!0,"")),r(n,e),z()}var S=m("<div><!></div>");function U(n,t){const s=c(t,["children","$$slots","$$events"]),i=c(s,["class"]);A(t,!1);let l=p(t,"class",8,()=>{});F();var a=S();let e;var o=N(a);h(o,y(t),{},null),b(()=>e=j(a,e,{class:w("text-sm [&_p]:leading-relaxed",l()),...i},!0,"")),r(n,a),z()}function W(n,t){const s=c(t,["children","$$slots","$$events"]),i=c(s,["class","level"]);A(t,!1);let l=p(t,"class",8,()=>{}),a=p(t,"level",0,"h5");F();var e=f(),o=v(e);G(o,a,!1,(d,u)=>{let _;b(()=>_=H(d,_,{class:w("mb-1 font-medium leading-none tracking-tight",l()),...i},""));var g=f(),P=v(g);h(P,y(t),{},null),r(u,g)}),r(n,e),z()}const X=J({base:"relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"}},defaultVariants:{variant:"default"}});function Y(n,t){const s=c(t,["children","$$slots","$$events"]),i=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];var l=f(),a=v(l);K(a,q({name:"circle-alert"},()=>s,{iconNode:i,children:(e,o)=>{var d=f(),u=v(d);h(u,y(t),{},null),r(e,d)},$$slots:{default:!0}})),r(n,l)}var Z=m("Error",1),tt=m("<li> </li>"),et=m("<ul></ul>"),at=m("<!> <!> <!>",1);function ut(n,t){var s=f(),i=v(s);B(i,()=>t.errors,l=>{var a=f(),e=v(a);Q(e,{variant:"destructive",children:(o,d)=>{var u=at(),_=v(u);Y(_,{class:"h-4 w-4"});var g=x(x(_,!0));W(g,{children:(k,C)=>{var $=Z();r(k,$)},$$slots:{default:!0}});var P=x(x(g,!0));U(P,{children:(k,C)=>{var $=et();L($,73,()=>t.errors,M,(D,E,rt)=>{var V=tt(),I=N(V);b(()=>T(I,R(E))),r(D,V)}),r(k,$)},$$slots:{default:!0}}),r(o,u)},$$slots:{default:!0}}),r(l,a)}),r(n,s)}export{ut as F};
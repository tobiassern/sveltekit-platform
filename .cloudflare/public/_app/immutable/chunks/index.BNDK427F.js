import{F as b,A as m}from"./runtime.BFj74geu.js";function _(e,n,t){if(e==null)return n(void 0),t&&t(void 0),b;const r=e.subscribe(n,t);return r.unsubscribe?()=>r.unsubscribe():r}const f=[];function q(e,n){return{subscribe:x(e,n).subscribe}}function A(e,n){return e!=e?n==n:e!==n||e&&typeof e=="object"||typeof e=="function"}function x(e,n=b){let t=null;const r=new Set;function i(u){if(A(e,u)&&(e=u,t)){const o=!f.length;for(const s of r)s[1](),f.push(s,e);if(o){for(let s=0;s<f.length;s+=2)f[s][0](f[s+1]);f.length=0}}}function l(u){i(u(e))}function a(u,o=b){const s=[u,o];return r.add(s),r.size===1&&(t=n(i,l)||b),u(e),()=>{r.delete(s),r.size===0&&t&&(t(),t=null)}}return{set:i,update:l,subscribe:a}}function j(e,n,t){const r=!Array.isArray(e),i=r?[e]:e;if(!i.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const l=n.length<2;return q(t,(a,u)=>{let o=!1;const s=[];let d=0,p=b;const g=()=>{if(d)return;p();const c=n(r?s[0]:s,a,u);l?a(c):p=typeof c=="function"?c:b},h=i.map((c,y)=>_(c,w=>{s[y]=w,d&=~(1<<y),o&&g()},()=>{d|=1<<y}));return o=!0,g(),function(){m(h),p(),o=!1}})}function B(e){return{subscribe:e.subscribe.bind(e)}}function E(e){let n;return _(e,t=>n=t)(),n}export{q as a,j as d,E as g,B as r,_ as s,x as w};

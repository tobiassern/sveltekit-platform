import{i as j,S as x,b as c,o as O,c as S,d as R,s as m,e as P,f as u,U as l,g,m as b,h as y,j as T,u as k,k as E,l as I}from"./runtime.BFj74geu.js";function h(e,n=!0,s=null,f){if(typeof e=="object"&&e!=null){let t=e;if((j(t)||x in t)&&(t=M(t)),c in t){const i=t[c];if(i.t===t||i.p===t)return i.p}const o=E(t);if(o===O||o===S){const i=new Proxy(t,A);return R(t,c,{value:{s:new Map,v:m(0),a:P(t),i:n,p:i,t},writable:!0,enumerable:!1}),i}}return e}function _(e,n){if(typeof e=="object"&&e!=null&&c in e){const s=n.get(e);if(s!==void 0)return s;if(P(e)){const f=[];n.set(e,f);for(const t of e)f.push(_(t,n));return f}else{const f={},t=Reflect.ownKeys(e),o=I(e);n.set(e,f);for(const i of t)if(i!==c)if(o[i].get)R(f,i,o[i]);else{const a=e[i];f[i]=_(a,n)}return f}}return e}function M(e){return _(e,new Map)}function w(e,n=1){u(e,e.v+n)}const A={defineProperty(e,n,s){if(s.value){const f=e[c],t=f.s.get(n);t!==void 0&&u(t,h(s.value,f.i,f))}return Reflect.defineProperty(e,n,s)},deleteProperty(e,n){const s=e[c],f=s.s.get(n),t=s.a,o=delete e[n];if(t&&o){const i=s.s.get("length"),a=e.length-1;i!==void 0&&i.v!==a&&u(i,a)}return f!==void 0&&u(f,l),o&&w(s.v),o},get(e,n,s){var o;if(n===c)return Reflect.get(e,c);const f=e[c];let t=f.s.get(n);if(t===void 0&&(!(n in e)||(o=g(e,n))!=null&&o.writable)&&(t=(f.i?m:b)(h(e[n],f.i,f)),f.s.set(n,t)),t!==void 0){const i=y(t);return i===l?void 0:i}return Reflect.get(e,n,s)},getOwnPropertyDescriptor(e,n){const s=Reflect.getOwnPropertyDescriptor(e,n);if(s&&"value"in s){const t=e[c].s.get(n);t&&(s.value=y(t))}return s},has(e,n){var o;if(n===c)return!0;const s=e[c],f=Reflect.has(e,n);let t=s.s.get(n);return(t!==void 0||T!==null&&(!f||(o=g(e,n))!=null&&o.writable))&&(t===void 0&&(t=(s.i?m:b)(f?h(e[n],s.i,s):l),s.s.set(n,t)),y(t)===l)?!1:f},set(e,n,s,f){const t=e[c];let o=t.s.get(n);o===void 0&&(k(()=>f[n]),o=t.s.get(n)),o!==void 0&&u(o,h(s,t.i,t));const i=t.a,a=!(n in e);if(i&&n==="length")for(let r=s;r<e.length;r+=1){const d=t.s.get(r+"");d!==void 0&&u(d,l)}if(e[n]=s,a){if(i){const r=t.s.get("length"),d=e.length;r!==void 0&&r.v!==d&&u(r,d)}w(t.v)}return!0},ownKeys(e){const n=e[c];return y(n.v),Reflect.ownKeys(e)}};export{h as p};
import{w as t,x as u,y as _,u as l,e as m}from"./runtime.BFj74geu.js";function p(n){t===null&&u(),t.l!==null?x(t).m.push(n):_(()=>{const e=l(n);if(typeof e=="function")return e})}function y(n){t===null&&u(),p(()=>()=>l(n))}function v(n,e,{bubbles:o=!1,cancelable:s=!1}={}){return new CustomEvent(n,{detail:e,bubbles:o,cancelable:s})}function b(){const n=t;return n===null&&u(),(e,o,s)=>{var r;const c=(r=n.s.$$events)==null?void 0:r[e];if(c){const f=m(c)?c.slice():[c],a=v(e,o,s);for(const i of f)i.call(n.x,a);return!a.defaultPrevented}return!0}}function x(n){var e=n.l;return e.u??(e.u={a:[],b:[],m:[]})}export{y as a,b as c,p as o};

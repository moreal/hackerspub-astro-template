import{r as m}from"./index.Cd_vQiNd.js";var f={exports:{}},s={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var x;function R(){if(x)return s;x=1;var o=Symbol.for("react.transitional.element"),u=Symbol.for("react.fragment");function a(l,t,n){var e=null;if(n!==void 0&&(e=""+n),t.key!==void 0&&(e=""+t.key),"key"in t){n={};for(var r in t)r!=="key"&&(n[r]=t[r])}else n=t;return t=n.ref,{$$typeof:o,type:l,key:e,ref:t!==void 0?t:null,props:n}}return s.Fragment=u,s.jsx=a,s.jsxs=a,s}var c;function d(){return c||(c=1,f.exports=R()),f.exports}var v=d();function h({datetime:o,className:u}){const[a,l]=m.useState("");return m.useEffect(()=>{const t=new Date(o),e=Math.floor((new Date().getTime()-t.getTime())/1e3),r=new Intl.RelativeTimeFormat(void 0,{numeric:"auto"});let i;e<60?i=r.format(-e,"second"):e<3600?i=r.format(-Math.floor(e/60),"minute"):e<86400?i=r.format(-Math.floor(e/3600),"hour"):e<2592e3?i=r.format(-Math.floor(e/86400),"day"):e<31536e3?i=r.format(-Math.floor(e/2592e3),"month"):i=r.format(-Math.floor(e/31536e3),"year"),l(i)},[o]),a?v.jsx("time",{className:u,dateTime:o,title:new Date(o).toLocaleString(),children:a}):v.jsx("time",{className:u,dateTime:o,children:new Date(o).toLocaleDateString()})}export{h as RelativeTime};

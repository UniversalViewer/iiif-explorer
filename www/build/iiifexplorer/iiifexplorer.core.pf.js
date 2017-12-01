/*! document-register-element, 1.7.0
https://github.com/WebReflection/document-register-element
(C) Andrea Giammarchi - @WebReflection - Mit Style License */
(function(e,t){"use strict";function Ht(){var e=wt.splice(0,wt.length);Et=0;while(e.length)e.shift().call(null,e.shift())}function Bt(e,t){for(var n=0,r=e.length;n<r;n++)Jt(e[n],t)}function jt(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],Pt(r,A[It(r)])}function Ft(e){return function(t){ut(t)&&(Jt(t,e),O.length&&Bt(t.querySelectorAll(O),e))}}function It(e){var t=ht.call(e,"is"),n=e.nodeName.toUpperCase(),r=_.call(L,t?N+t.toUpperCase():T+n);return t&&-1<r&&!qt(n,t)?-1:r}function qt(e,t){return-1<O.indexOf(e+'[is="'+t+'"]')}function Rt(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,i=e.target,s=e[y]||2,o=e[w]||3;kt&&(!i||i===t)&&t[h]&&r!=="style"&&(e.prevValue!==e.newValue||e.newValue===""&&(n===s||n===o))&&t[h](r,n===s?null:e.prevValue,n===o?null:e.newValue)}function Ut(e){var t=Ft(e);return function(e){wt.push(t,e.target),Et&&clearTimeout(Et),Et=setTimeout(Ht,1)}}function zt(e){Ct&&(Ct=!1,e.currentTarget.removeEventListener(S,zt)),O.length&&Bt((e.target||n).querySelectorAll(O),e.detail===l?l:a),st&&Vt()}function Wt(e,t){var n=this;vt.call(n,e,t),Lt.call(n,{target:n})}function Xt(e,t){nt(e,t),Mt?Mt.observe(e,yt):(Nt&&(e.setAttribute=Wt,e[o]=Ot(e),e[u](x,Lt)),e[u](E,Rt)),e[m]&&kt&&(e.created=!0,e[m](),e.created=!1)}function Vt(){for(var e,t=0,n=at.length;t<n;t++)e=at[t],M.contains(e)||(n--,at.splice(t--,1),Jt(e,l))}function $t(e){throw new Error("A "+e+" type is already registered")}function Jt(e,t){var n,r=It(e),i;-1<r&&(Dt(e,A[r]),r=0,t===a&&!e[a]?(e[l]=!1,e[a]=!0,i="connected",r=1,st&&_.call(at,e)<0&&at.push(e)):t===l&&!e[l]&&(e[a]=!1,e[l]=!0,i="disconnected",r=1),r&&(n=e[t+f]||e[i+f])&&n.call(e))}function Kt(){}function Qt(e,t,r){var i=r&&r[c]||"",o=t.prototype,u=tt(o),a=t.observedAttributes||j,f={prototype:u};ot(u,m,{value:function(){if(Q)Q=!1;else if(!this[W]){this[W]=!0,new t(this),o[m]&&o[m].call(this);var e=G[Z.get(t)];(!V||e.create.length>1)&&Zt(this)}}}),ot(u,h,{value:function(e){-1<_.call(a,e)&&o[h].apply(this,arguments)}}),o[d]&&ot(u,p,{value:o[d]}),o[v]&&ot(u,g,{value:o[v]}),i&&(f[c]=i),e=e.toUpperCase(),G[e]={constructor:t,create:i?[i,et(e)]:[e]},Z.set(t,e),n[s](e.toLowerCase(),f),en(e),Y[e].r()}function Gt(e){var t=G[e.toUpperCase()];return t&&t.constructor}function Yt(e){return typeof e=="string"?e:e&&e.is||""}function Zt(e){var t=e[h],n=t?e.attributes:j,r=n.length,i;while(r--)i=n[r],t.call(e,i.name||i.nodeName,null,i.value||i.nodeValue)}function en(e){return e=e.toUpperCase(),e in Y||(Y[e]={},Y[e].p=new K(function(t){Y[e].r=t})),Y[e].p}function tn(){X&&delete e.customElements,B(e,"customElements",{configurable:!0,value:new Kt}),B(e,"CustomElementRegistry",{configurable:!0,value:Kt});for(var t=function(t){var r=e[t];if(r){e[t]=function(t){var i,s;return t||(t=this),t[W]||(Q=!0,i=G[Z.get(t.constructor)],s=V&&i.create.length===1,t=s?Reflect.construct(r,j,i.constructor):n.createElement.apply(n,i.create),t[W]=!0,Q=!1,s||Zt(t)),t},e[t].prototype=r.prototype;try{r.prototype.constructor=e[t]}catch(i){z=!0,B(r,W,{value:e[t]})}}},r=i.get(/^HTML[A-Z]*[a-z]/),o=r.length;o--;t(r[o]));n.createElement=function(e,t){var n=Yt(t);return n?gt.call(this,e,et(n)):gt.call(this,e)},St||(Tt=!0,n[s](""))}var n=e.document,r=e.Object,i=function(e){var t=/^[A-Z]+[a-z]/,n=function(e){var t=[],n;for(n in s)e.test(n)&&t.push(n);return t},i=function(e,t){t=t.toLowerCase(),t in s||(s[e]=(s[e]||[]).concat(t),s[t]=s[t.toUpperCase()]=e)},s=(r.create||r)(null),o={},u,a,f,l;for(a in e)for(l in e[a]){f=e[a][l],s[l]=f;for(u=0;u<f.length;u++)s[f[u].toLowerCase()]=s[f[u].toUpperCase()]=l}return o.get=function(r){return typeof r=="string"?s[r]||(t.test(r)?[]:""):n(r)},o.set=function(n,r){return t.test(n)?i(n,r):i(r,n),o},o}({collections:{HTMLAllCollection:["all"],HTMLCollection:["forms"],HTMLFormControlsCollection:["elements"],HTMLOptionsCollection:["options"]},elements:{Element:["element"],HTMLAnchorElement:["a"],HTMLAppletElement:["applet"],HTMLAreaElement:["area"],HTMLAttachmentElement:["attachment"],HTMLAudioElement:["audio"],HTMLBRElement:["br"],HTMLBaseElement:["base"],HTMLBodyElement:["body"],HTMLButtonElement:["button"],HTMLCanvasElement:["canvas"],HTMLContentElement:["content"],HTMLDListElement:["dl"],HTMLDataElement:["data"],HTMLDataListElement:["datalist"],HTMLDetailsElement:["details"],HTMLDialogElement:["dialog"],HTMLDirectoryElement:["dir"],HTMLDivElement:["div"],HTMLDocument:["document"],HTMLElement:["element","abbr","address","article","aside","b","bdi","bdo","cite","code","command","dd","dfn","dt","em","figcaption","figure","footer","header","i","kbd","mark","nav","noscript","rp","rt","ruby","s","samp","section","small","strong","sub","summary","sup","u","var","wbr"],HTMLEmbedElement:["embed"],HTMLFieldSetElement:["fieldset"],HTMLFontElement:["font"],HTMLFormElement:["form"],HTMLFrameElement:["frame"],HTMLFrameSetElement:["frameset"],HTMLHRElement:["hr"],HTMLHeadElement:["head"],HTMLHeadingElement:["h1","h2","h3","h4","h5","h6"],HTMLHtmlElement:["html"],HTMLIFrameElement:["iframe"],HTMLImageElement:["img"],HTMLInputElement:["input"],HTMLKeygenElement:["keygen"],HTMLLIElement:["li"],HTMLLabelElement:["label"],HTMLLegendElement:["legend"],HTMLLinkElement:["link"],HTMLMapElement:["map"],HTMLMarqueeElement:["marquee"],HTMLMediaElement:["media"],HTMLMenuElement:["menu"],HTMLMenuItemElement:["menuitem"],HTMLMetaElement:["meta"],HTMLMeterElement:["meter"],HTMLModElement:["del","ins"],HTMLOListElement:["ol"],HTMLObjectElement:["object"],HTMLOptGroupElement:["optgroup"],HTMLOptionElement:["option"],HTMLOutputElement:["output"],HTMLParagraphElement:["p"],HTMLParamElement:["param"],HTMLPictureElement:["picture"],HTMLPreElement:["pre"],HTMLProgressElement:["progress"],HTMLQuoteElement:["blockquote","q","quote"],HTMLScriptElement:["script"],HTMLSelectElement:["select"],HTMLShadowElement:["shadow"],HTMLSlotElement:["slot"],HTMLSourceElement:["source"],HTMLSpanElement:["span"],HTMLStyleElement:["style"],HTMLTableCaptionElement:["caption"],HTMLTableCellElement:["td","th"],HTMLTableColElement:["col","colgroup"],HTMLTableElement:["table"],HTMLTableRowElement:["tr"],HTMLTableSectionElement:["thead","tbody","tfoot"],HTMLTemplateElement:["template"],HTMLTextAreaElement:["textarea"],HTMLTimeElement:["time"],HTMLTitleElement:["title"],HTMLTrackElement:["track"],HTMLUListElement:["ul"],HTMLUnknownElement:["unknown","vhgroupv","vkeygen"],HTMLVideoElement:["video"]},nodes:{Attr:["node"],Audio:["audio"],CDATASection:["node"],CharacterData:["node"],Comment:["#comment"],Document:["#document"],DocumentFragment:["#document-fragment"],DocumentType:["node"],HTMLDocument:["#document"],Image:["img"],Option:["option"],ProcessingInstruction:["node"],ShadowRoot:["#shadow-root"],Text:["#text"],XMLDocument:["xml"]}});typeof t!="object"&&(t={type:t||"auto"});var s="registerElement",o="__"+s+(e.Math.random()*1e5>>0),u="addEventListener",a="attached",f="Callback",l="detached",c="extends",h="attributeChanged"+f,p=a+f,d="connected"+f,v="disconnected"+f,m="created"+f,g=l+f,y="ADDITION",b="MODIFICATION",w="REMOVAL",E="DOMAttrModified",S="DOMContentLoaded",x="DOMSubtreeModified",T="<",N="=",C=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,k=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],L=[],A=[],O="",M=n.documentElement,_=L.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},D=r.prototype,P=D.hasOwnProperty,H=D.isPrototypeOf,B=r.defineProperty,j=[],F=r.getOwnPropertyDescriptor,I=r.getOwnPropertyNames,q=r.getPrototypeOf,R=r.setPrototypeOf,U=!!r.__proto__,z=!1,W="__dreCEv1",X=e.customElements,V=!/^force/.test(t.type)&&!!(X&&X.define&&X.get&&X.whenDefined),$=r.create||r,J=e.Map||function(){var t=[],n=[],r;return{get:function(e){return n[_.call(t,e)]},set:function(e,i){r=_.call(t,e),r<0?n[t.push(e)-1]=i:n[r]=i}}},K=e.Promise||function(e){function i(e){n=!0;while(t.length)t.shift()(e)}var t=[],n=!1,r={"catch":function(){return r},then:function(e){return t.push(e),n&&setTimeout(i,1),r}};return e(i),r},Q=!1,G=$(null),Y=$(null),Z=new J,et=function(e){return e.toLowerCase()},tt=r.create||function sn(e){return e?(sn.prototype=e,new sn):this},nt=R||(U?function(e,t){return e.__proto__=t,e}:I&&F?function(){function e(e,t){for(var n,r=I(t),i=0,s=r.length;i<s;i++)n=r[i],P.call(e,n)||B(e,n,F(t,n))}return function(t,n){do e(t,n);while((n=q(n))&&!H.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),rt=e.MutationObserver||e.WebKitMutationObserver,it=(e.HTMLElement||e.Element||e.Node).prototype,st=!H.call(it,M),ot=st?function(e,t,n){return e[t]=n.value,e}:B,ut=st?function(e){return e.nodeType===1}:function(e){return H.call(it,e)},at=st&&[],ft=it.attachShadow,lt=it.cloneNode,ct=it.dispatchEvent,ht=it.getAttribute,pt=it.hasAttribute,dt=it.removeAttribute,vt=it.setAttribute,mt=n.createElement,gt=mt,yt=rt&&{attributes:!0,characterData:!0,attributeOldValue:!0},bt=rt||function(e){Nt=!1,M.removeEventListener(E,bt)},wt,Et=0,St=s in n&&!/^force-all/.test(t.type),xt=!0,Tt=!1,Nt=!0,Ct=!0,kt=!0,Lt,At,Ot,Mt,_t,Dt,Pt;St||(R||U?(Dt=function(e,t){H.call(t,e)||Xt(e,t)},Pt=Xt):(Dt=function(e,t){e[o]||(e[o]=r(!0),Xt(e,t))},Pt=Dt),st?(Nt=!1,function(){var e=F(it,u),t=e.value,n=function(e){var t=new CustomEvent(E,{bubbles:!0});t.attrName=e,t.prevValue=ht.call(this,e),t.newValue=null,t[w]=t.attrChange=2,dt.call(this,e),ct.call(this,t)},r=function(e,t){var n=pt.call(this,e),r=n&&ht.call(this,e),i=new CustomEvent(E,{bubbles:!0});vt.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[b]=i.attrChange=1:i[y]=i.attrChange=0,ct.call(this,i)},i=function(e){var t=e.currentTarget,n=t[o],r=e.propertyName,i;n.hasOwnProperty(r)&&(n=n[r],i=new CustomEvent(E,{bubbles:!0}),i.attrName=n.name,i.prevValue=n.value||null,i.newValue=n.value=t[r]||null,i.prevValue==null?i[y]=i.attrChange=0:i[b]=i.attrChange=1,ct.call(t,i))};e.value=function(e,s,u){e===E&&this[h]&&this.setAttribute!==r&&(this[o]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",i)),t.call(this,e,s,u)},B(it,u,e)}()):rt||(M[u](E,bt),M.setAttribute(o,1),M.removeAttribute(o),Nt&&(Lt=function(e){var t=this,n,r,i;if(t===e.target){n=t[o],t[o]=r=Ot(t);for(i in r){if(!(i in n))return At(0,t,i,n[i],r[i],y);if(r[i]!==n[i])return At(1,t,i,n[i],r[i],b)}for(i in n)if(!(i in r))return At(2,t,i,n[i],r[i],w)}},At=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,Rt(o)},Ot=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),n[s]=function(t,r){p=t.toUpperCase(),xt&&(xt=!1,rt?(Mt=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new rt(function(r){for(var i,s,o,u=0,a=r.length;u<a;u++)i=r[u],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,kt&&s[h]&&i.attributeName!=="style"&&(o=ht.call(s,i.attributeName),o!==i.oldValue&&s[h](i.attributeName,i.oldValue,o)))})}(Ft(a),Ft(l)),_t=function(e){return Mt.observe(e,{childList:!0,subtree:!0}),e},_t(n),ft&&(it.attachShadow=function(){return _t(ft.apply(this,arguments))})):(wt=[],n[u]("DOMNodeInserted",Ut(a)),n[u]("DOMNodeRemoved",Ut(l))),n[u](S,zt),n[u]("readystatechange",zt),it.cloneNode=function(e){var t=lt.call(this,!!e),n=It(t);return-1<n&&Pt(t,A[n]),e&&O.length&&jt(t.querySelectorAll(O)),t});if(Tt)return Tt=!1;-2<_.call(L,N+p)+_.call(L,T+p)&&$t(t);if(!C.test(p)||-1<_.call(k,p))throw new Error("The type "+t+" is invalid");var i=function(){return o?n.createElement(f,p):n.createElement(f)},s=r||D,o=P.call(s,c),f=o?r[c].toUpperCase():p,p,d;return o&&-1<_.call(L,T+f)&&$t(f),d=L.push((o?N:T)+p)-1,O=O.concat(O.length?",":"",o?f+'[is="'+t.toLowerCase()+'"]':f),i.prototype=A[d]=P.call(s,"prototype")?s.prototype:tt(it),O.length&&Bt(n.querySelectorAll(O),a),i},n.createElement=gt=function(e,t){var r=Yt(t),i=r?mt.call(n,e,et(r)):mt.call(n,e),s=""+e,o=_.call(L,(r?N:T)+(r||s).toUpperCase()),u=-1<o;return r&&(i.setAttribute("is",r=r.toLowerCase()),u&&(u=qt(s.toUpperCase(),r))),kt=!n.createElement.innerHTMLHelper,u&&Pt(i,A[o]),i}),Kt.prototype={constructor:Kt,define:V?function(e,t,n){if(n)Qt(e,t,n);else{var r=e.toUpperCase();G[r]={constructor:t,create:[r]},Z.set(t,r),X.define(e,t)}}:Qt,get:V?function(e){return X.get(e)||Gt(e)}:Gt,whenDefined:V?function(e){return K.race([X.whenDefined(e),en(e)])}:en};if(!X||/^force/.test(t.type))tn();else if(!t.noBuiltIn)try{(function(t,r,i){r[c]="a",t.prototype=tt(HTMLAnchorElement.prototype),t.prototype.constructor=t,e.customElements.define(i,t,r);if(ht.call(n.createElement("a",{is:i}),"is")!==i||V&&ht.call(new t,"is")!==i)throw r})(function on(){return Reflect.construct(HTMLAnchorElement,[],on)},{},"document-register-element-a")}catch(nn){tn()}if(!t.noBuiltIn)try{mt.call(n,"a","a")}catch(rn){et=function(e){return{is:e.toLowerCase()}}}})(window);
/*! object-assign */
"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(d,f){if(null==d)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(d),b=1;b<arguments.length;b++){var a=arguments[b];if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(e[c]=a[c])}return e},writable:!0,configurable:!0});
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.1.0+f046478d
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.ES6Promise=e()}(this,function(){"use strict";function t(t){var e=typeof t;return null!==t&&("object"===e||"function"===e)}function e(t){return"function"==typeof t}function n(t){I=t}function r(t){J=t}function o(){return function(){return process.nextTick(a)}}function i(){return"undefined"!=typeof H?function(){H(a)}:c()}function s(){var t=0,e=new V(a),n=document.createTextNode("");return e.observe(n,{characterData:!0}),function(){n.data=t=++t%2}}function u(){var t=new MessageChannel;return t.port1.onmessage=a,function(){return t.port2.postMessage(0)}}function c(){var t=setTimeout;return function(){return t(a,1)}}function a(){for(var t=0;t<G;t+=2){var e=$[t],n=$[t+1];e(n),$[t]=void 0,$[t+1]=void 0}G=0}function f(){try{var t=require,e=t("vertx");return H=e.runOnLoop||e.runOnContext,i()}catch(n){return c()}}function l(t,e){var n=arguments,r=this,o=new this.constructor(p);void 0===o[et]&&k(o);var i=r._state;return i?!function(){var t=n[i-1];J(function(){return x(i,o,t,r._result)})}():E(r,o,t,e),o}function h(t){var e=this;if(t&&"object"==typeof t&&t.constructor===e)return t;var n=new e(p);return g(n,t),n}function p(){}function v(){return new TypeError("You cannot resolve a promise with itself")}function d(){return new TypeError("A promises callback cannot return that same promise.")}function _(t){try{return t.then}catch(e){return it.error=e,it}}function y(t,e,n,r){try{t.call(e,n,r)}catch(o){return o}}function m(t,e,n){J(function(t){var r=!1,o=y(n,e,function(n){r||(r=!0,e!==n?g(t,n):S(t,n))},function(e){r||(r=!0,j(t,e))},"Settle: "+(t._label||" unknown promise"));!r&&o&&(r=!0,j(t,o))},t)}function b(t,e){e._state===rt?S(t,e._result):e._state===ot?j(t,e._result):E(e,void 0,function(e){return g(t,e)},function(e){return j(t,e)})}function w(t,n,r){n.constructor===t.constructor&&r===l&&n.constructor.resolve===h?b(t,n):r===it?(j(t,it.error),it.error=null):void 0===r?S(t,n):e(r)?m(t,n,r):S(t,n)}function g(e,n){e===n?j(e,v()):t(n)?w(e,n,_(n)):S(e,n)}function A(t){t._onerror&&t._onerror(t._result),T(t)}function S(t,e){t._state===nt&&(t._result=e,t._state=rt,0!==t._subscribers.length&&J(T,t))}function j(t,e){t._state===nt&&(t._state=ot,t._result=e,J(A,t))}function E(t,e,n,r){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+rt]=n,o[i+ot]=r,0===i&&t._state&&J(T,t)}function T(t){var e=t._subscribers,n=t._state;if(0!==e.length){for(var r=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)r=e[s],o=e[s+n],r?x(n,r,o,i):o(i);t._subscribers.length=0}}function M(){this.error=null}function P(t,e){try{return t(e)}catch(n){return st.error=n,st}}function x(t,n,r,o){var i=e(r),s=void 0,u=void 0,c=void 0,a=void 0;if(i){if(s=P(r,o),s===st?(a=!0,u=s.error,s.error=null):c=!0,n===s)return void j(n,d())}else s=o,c=!0;n._state!==nt||(i&&c?g(n,s):a?j(n,u):t===rt?S(n,s):t===ot&&j(n,s))}function C(t,e){try{e(function(e){g(t,e)},function(e){j(t,e)})}catch(n){j(t,n)}}function O(){return ut++}function k(t){t[et]=ut++,t._state=void 0,t._result=void 0,t._subscribers=[]}function Y(t,e){this._instanceConstructor=t,this.promise=new t(p),this.promise[et]||k(this.promise),B(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?S(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&S(this.promise,this._result))):j(this.promise,q())}function q(){return new Error("Array Methods must be provided an Array")}function F(t){return new Y(this,t).promise}function D(t){var e=this;return new e(B(t)?function(n,r){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(n,r)}:function(t,e){return e(new TypeError("You must pass an array to race."))})}function K(t){var e=this,n=new e(p);return j(n,t),n}function L(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function N(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function U(t){this[et]=O(),this._result=this._state=void 0,this._subscribers=[],p!==t&&("function"!=typeof t&&L(),this instanceof U?C(this,t):N())}function W(){var t=void 0;if("undefined"!=typeof global)t=global;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=t.Promise;if(n){var r=null;try{r=Object.prototype.toString.call(n.resolve())}catch(e){}if("[object Promise]"===r&&!n.cast)return}t.Promise=U}var z=void 0;z=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)};var B=z,G=0,H=void 0,I=void 0,J=function(t,e){$[G]=t,$[G+1]=e,G+=2,2===G&&(I?I(a):tt())},Q="undefined"!=typeof window?window:void 0,R=Q||{},V=R.MutationObserver||R.WebKitMutationObserver,X="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),Z="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,$=new Array(1e3),tt=void 0;tt=X?o():V?s():Z?u():void 0===Q&&"function"==typeof require?f():c();var et=Math.random().toString(36).substring(16),nt=void 0,rt=1,ot=2,it=new M,st=new M,ut=0;return Y.prototype._enumerate=function(t){for(var e=0;this._state===nt&&e<t.length;e++)this._eachEntry(t[e],e)},Y.prototype._eachEntry=function(t,e){var n=this._instanceConstructor,r=n.resolve;if(r===h){var o=_(t);if(o===l&&t._state!==nt)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(n===U){var i=new n(p);w(i,t,o),this._willSettleAt(i,e)}else this._willSettleAt(new n(function(e){return e(t)}),e)}else this._willSettleAt(r(t),e)},Y.prototype._settledAt=function(t,e,n){var r=this.promise;r._state===nt&&(this._remaining--,t===ot?j(r,n):this._result[e]=n),0===this._remaining&&S(r,this._result)},Y.prototype._willSettleAt=function(t,e){var n=this;E(t,void 0,function(t){return n._settledAt(rt,e,t)},function(t){return n._settledAt(ot,e,t)})},U.all=F,U.race=D,U.resolve=h,U.reject=K,U._setScheduler=n,U._setAsap=r,U._asap=J,U.prototype={constructor:U,then:l,"catch":function(t){return this.then(null,t)}},U.polyfill=W,U.Promise=U,U.polyfill(),U});
/*! whatwg-fetch, 2.0.3
https://github.com/github/fetch
Copyright (c) 2014-2016 GitHub, Inc. - MIT License */
(function(e){function l(a){"string"!==typeof a&&(a=String(a));if(/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(a))throw new TypeError("Invalid character in header field name");return a.toLowerCase()}function q(a){"string"!==typeof a&&(a=String(a));return a}function n(a){var b={next:function(){var b=a.shift();return{done:void 0===b,value:b}}};g.iterable&&(b[Symbol.iterator]=function(){return b});return b}function d(a){this.map={};a instanceof d?a.forEach(function(a,c){this.append(c,a)},this):Array.isArray(a)?
a.forEach(function(a){this.append(a[0],a[1])},this):a&&Object.getOwnPropertyNames(a).forEach(function(b){this.append(b,a[b])},this)}function p(a){if(a.bodyUsed)return Promise.reject(new TypeError("Already read"));a.bodyUsed=!0}function r(a){return new Promise(function(b,c){a.onload=function(){b(a.result)};a.onerror=function(){c(a.error)}})}function w(a){var b=new FileReader,c=r(b);b.readAsArrayBuffer(a);return c}function x(a){a=new Uint8Array(a);for(var b=Array(a.length),c=0;c<a.length;c++)b[c]=String.fromCharCode(a[c]);
return b.join("")}function t(a){if(a.slice)return a.slice(0);var b=new Uint8Array(a.byteLength);b.set(new Uint8Array(a));return b.buffer}function u(){this.bodyUsed=!1;this._initBody=function(a){if(this._bodyInit=a)if("string"===typeof a)this._bodyText=a;else if(g.blob&&Blob.prototype.isPrototypeOf(a))this._bodyBlob=a;else if(g.formData&&FormData.prototype.isPrototypeOf(a))this._bodyFormData=a;else if(g.searchParams&&URLSearchParams.prototype.isPrototypeOf(a))this._bodyText=a.toString();else if(g.arrayBuffer&&
g.blob&&y(a))this._bodyArrayBuffer=t(a.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else if(g.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(a)||z(a)))this._bodyArrayBuffer=t(a);else throw Error("unsupported BodyInit type");else this._bodyText="";this.headers.get("content-type")||("string"===typeof a?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):g.searchParams&&URLSearchParams.prototype.isPrototypeOf(a)&&
this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))};g.blob&&(this.blob=function(){var a=p(this);if(a)return a;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?p(this)||Promise.resolve(this._bodyArrayBuffer):
this.blob().then(w)});this.text=function(){var a=p(this);if(a)return a;if(this._bodyBlob){a=this._bodyBlob;var b=new FileReader,c=r(b);b.readAsText(a);return c}if(this._bodyArrayBuffer)return Promise.resolve(x(this._bodyArrayBuffer));if(this._bodyFormData)throw Error("could not read FormData body as text");return Promise.resolve(this._bodyText)};g.formData&&(this.formData=function(){return this.text().then(A)});this.json=function(){return this.text().then(JSON.parse)};return this}function k(a,b){b=
b||{};var c=b.body;if(a instanceof k){if(a.bodyUsed)throw new TypeError("Already read");this.url=a.url;this.credentials=a.credentials;b.headers||(this.headers=new d(a.headers));this.method=a.method;this.mode=a.mode;c||null==a._bodyInit||(c=a._bodyInit,a.bodyUsed=!0)}else this.url=String(a);this.credentials=b.credentials||this.credentials||"omit";if(b.headers||!this.headers)this.headers=new d(b.headers);var v=b.method||this.method||"GET",g=v.toUpperCase();this.method=-1<B.indexOf(g)?g:v;this.mode=
b.mode||this.mode||null;this.referrer=null;if(("GET"===this.method||"HEAD"===this.method)&&c)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(c)}function A(a){var b=new FormData;a.trim().split("&").forEach(function(a){if(a){var c=a.split("=");a=c.shift().replace(/\+/g," ");c=c.join("=").replace(/\+/g," ");b.append(decodeURIComponent(a),decodeURIComponent(c))}});return b}function C(a){var b=new d;a.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(a){var c=
a.split(":");if(a=c.shift().trim())c=c.join(":").trim(),b.append(a,c)});return b}function h(a,b){b||(b={});this.type="default";this.status=void 0===b.status?200:b.status;this.ok=200<=this.status&&300>this.status;this.statusText="statusText"in b?b.statusText:"OK";this.headers=new d(b.headers);this.url=b.url||"";this._initBody(a)}if(!e.fetch){var D="Symbol"in e&&"iterator"in Symbol,m;if(m="FileReader"in e&&"Blob"in e)try{new Blob,m=!0}catch(a){m=!1}var g={searchParams:"URLSearchParams"in e,iterable:D,
blob:m,formData:"FormData"in e,arrayBuffer:"ArrayBuffer"in e};if(g.arrayBuffer){var E="[object Int8Array];[object Uint8Array];[object Uint8ClampedArray];[object Int16Array];[object Uint16Array];[object Int32Array];[object Uint32Array];[object Float32Array];[object Float64Array]".split(";");var y=function(a){return a&&DataView.prototype.isPrototypeOf(a)};var z=ArrayBuffer.isView||function(a){return a&&-1<E.indexOf(Object.prototype.toString.call(a))}}d.prototype.append=function(a,b){a=l(a);b=q(b);var c=
this.map[a];this.map[a]=c?c+","+b:b};d.prototype["delete"]=function(a){delete this.map[l(a)]};d.prototype.get=function(a){a=l(a);return this.has(a)?this.map[a]:null};d.prototype.has=function(a){return this.map.hasOwnProperty(l(a))};d.prototype.set=function(a,b){this.map[l(a)]=q(b)};d.prototype.forEach=function(a,b){for(var c in this.map)this.map.hasOwnProperty(c)&&a.call(b,this.map[c],c,this)};d.prototype.keys=function(){var a=[];this.forEach(function(b,c){a.push(c)});return n(a)};d.prototype.values=
function(){var a=[];this.forEach(function(b){a.push(b)});return n(a)};d.prototype.entries=function(){var a=[];this.forEach(function(b,c){a.push([c,b])});return n(a)};g.iterable&&(d.prototype[Symbol.iterator]=d.prototype.entries);var B="DELETE GET HEAD OPTIONS POST PUT".split(" ");k.prototype.clone=function(){return new k(this,{body:this._bodyInit})};u.call(k.prototype);u.call(h.prototype);h.prototype.clone=function(){return new h(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new d(this.headers),
url:this.url})};h.error=function(){var a=new h(null,{status:0,statusText:""});a.type="error";return a};var F=[301,302,303,307,308];h.redirect=function(a,b){if(-1===F.indexOf(b))throw new RangeError("Invalid status code");return new h(null,{status:b,headers:{location:a}})};e.Headers=d;e.Request=k;e.Response=h;e.fetch=function(a,b){return new Promise(function(c,d){var e=new k(a,b),f=new XMLHttpRequest;f.onload=function(){var a={status:f.status,statusText:f.statusText,headers:C(f.getAllResponseHeaders()||
"")};a.url="responseURL"in f?f.responseURL:a.headers.get("X-Request-URL");c(new h("response"in f?f.response:f.responseText,a))};f.onerror=function(){d(new TypeError("Network request failed"))};f.ontimeout=function(){d(new TypeError("Network request failed"))};f.open(e.method,e.url,!0);"include"===e.credentials?f.withCredentials=!0:"omit"===e.credentials&&(f.withCredentials=!1);"responseType"in f&&g.blob&&(f.responseType="blob");e.headers.forEach(function(a,b){f.setRequestHeader(b,a)});f.send("undefined"===
typeof e._bodyInit?null:e._bodyInit)})};e.fetch.polyfill=!0}})("undefined"!==typeof self?self:this);
/*!
requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
MIT license
*/
(function(a){for(var f=0,c=["ms","moz","webkit","o"],b=0;b<c.length&&!a.requestAnimationFrame;++b)a.requestAnimationFrame=a[c[b]+"RequestAnimationFrame"],a.cancelAnimationFrame=a[c[b]+"CancelAnimationFrame"]||a[c[b]+"CancelRequestAnimationFrame"];a.requestAnimationFrame||(a.requestAnimationFrame=function(b,c){var d=(new Date).getTime(),e=Math.max(0,16-(d-f)),g=a.setTimeout(function(){b(d+e)},e);f=d+e;return g});a.cancelAnimationFrame||(a.cancelAnimationFrame=function(a){clearTimeout(a)})})(window);
/*!
Element.closest and Element.matches
https://github.com/jonathantneal/closest
Creative Commons Zero v1.0 Universal
*/
(function(a){"function"!==typeof a.matches&&(a.matches=a.msMatchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||function(a){a=(this.document||this.ownerDocument).querySelectorAll(a);for(var b=0;a[b]&&a[b]!==this;)++b;return!!a[b]});"function"!==typeof a.closest&&(a.closest=function(a){for(var b=this;b&&1===b.nodeType;){if(b.matches(a))return b;b=b.parentNode}return null})})(window.Element.prototype);
/*! window.performance.now
http://opensource.org/licenses/MIT
Copyright Paul Irish 2015 */
!function(){if("performance"in window==0&&(window.performance={}),Date.now=Date.now||function(){return(new Date).getTime()},"now"in window.performance==0){var n=Date.now();performance.timing&&performance.timing.navigationStart&&(n=performance.timing.navigationStart),window.performance.now=function(){return Date.now()-n}}}();
/*! Built with http://stenciljs.com */
(function(Context,appNamespace,hydratedCssClass,publicPath){"use strict";
var s=document.querySelector("script[data-core='iiifexplorer.core.pf.js'][data-path]");if(s){publicPath=s.getAttribute('data-path');}
this && this.__extends || function() {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(d, b) {
    d.__proto__ = b;
  } || function(d, b) {
    for (var p in b) {
      b.hasOwnProperty(p) && (d[p] = b[p]);
    }
  };
}();

(function(window, document, Context, appNamespace, publicPath) {
  'use strict';
  var isDef = function(v) {
    return void 0 !== v && null !== v;
  };
  var isUndef = function(v) {
    return void 0 === v || null === v;
  };
  var toLowerCase = function(str) {
    return str.toLowerCase();
  };
  var toDashCase = function(str) {
    return str.replace(/([A-Z])/g, function(g) {
      return '-' + toLowerCase(g[0]);
    });
  };
  var noop = function() {};
  /**
     * SSR Attribute Names
     */
  var SSR_VNODE_ID = 'data-ssrv';
  var SSR_CHILD_ID = 'data-ssrc';
  /**
     * Default style mode id
     */
  /**
     * Reusable empty obj/array
     * Don't add values to these!!
     */
  var EMPTY_OBJ = {};
  var EMPTY_ARR = [];
  /**
     * Key Name to Key Code Map
     */
  var KEY_CODE_MAP = {
    'enter': 13,
    'escape': 27,
    'space': 32,
    'tab': 9,
    'left': 37,
    'up': 38,
    'right': 39,
    'down': 40
  };
  /**
     * Namespaces
     */
  /**
     * File names and value
     */
  function initElementListeners(plt, elm) {
    // so the element was just connected, which means it's in the DOM
    // however, the component instance hasn't been created yet
    // but what if an event it should be listening to get emitted right now??
    // let's add our listeners right now to our element, and if it happens
    // to receive events between now and the instance being created let's
    // queue up all of the event data and fire it off on the instance when it's ready
    var cmpMeta = plt.getComponentMeta(elm);
    cmpMeta.listenersMeta && cmpMeta.listenersMeta.forEach(function(listener) {
      listener.eventDisabled || ((elm._listeners = elm._listeners || {})[listener.eventName] = addListener(plt, elm, listener.eventName, createListenerCallback(elm, listener.eventMethodName), listener.eventCapture, listener.eventPassive));
    });
  }
  function createListenerCallback(elm, eventMethodName) {
    // create the function that gets called when the element receives
    // an event which it should be listening for
    return function(ev) {
      elm._instance ? // instance is ready, let's call it's member method for this event
      elm._instance[eventMethodName](ev) : // instance is not ready!!
      // let's queue up this event data and replay it later
      // when the instance is ready
      (elm._queuedEvents = elm._queuedEvents || []).push(eventMethodName, ev);
    };
  }
  function replayQueuedEventsOnInstance(elm, i) {
    // the element has an instance now and
    // we already added the event listeners to the element
    var queuedEvents = elm._queuedEvents;
    if (queuedEvents) {
      // events may have already fired before the instance was even ready
      // now that the instance is ready, let's replay all of the events that
      // we queued up earlier that were originally meant for the instance
      for (i = 0; i < queuedEvents.length; i += 2) {
        // data was added in sets of two
        // first item the eventMethodName
        // second item is the event data
        // take a look at initElementListener()
        elm._instance[queuedEvents[i]](queuedEvents[i + 1]);
      }
      // no longer need this data, be gone with you
      elm._queuedEvents = null;
    }
  }
  function enableEventListener(plt, instance, eventName, shouldEnable, attachTo) {
    if (instance) {
      var elm = instance.__el;
      var cmpMeta = plt.getComponentMeta(elm);
      var listenerMeta = cmpMeta.listenersMeta;
      if (listenerMeta) {
        var deregisterFns = elm._listeners = elm._listeners || {};
        for (var i = 0; i < listenerMeta.length; i++) {
          var listener = listenerMeta[i];
          if (listener.eventName === eventName) {
            var fn = deregisterFns[eventName];
            if (shouldEnable && !fn) {
              var attachToEventName = eventName;
              var element = elm;
              'string' === typeof attachTo ? attachToEventName = attachTo + ':' + eventName : 'object' === typeof attachTo && (element = attachTo);
              deregisterFns[eventName] = addListener(plt, element, attachToEventName, createListenerCallback(elm, listener.eventMethodName), listener.eventCapture, listener.eventPassive);
            } else if (!shouldEnable && fn) {
              deregisterFns[eventName]();
              deregisterFns[eventName] = null;
            }
            return true;
          }
        }
      }
    }
    return false;
  }
  function addListener(plt, elm, eventName, listenerCallback, useCapture, usePassive, splt, eventListener) {
    // depending on the event name, we could actually be attaching
    // this element to something like the document or window
    splt = eventName.split(':');
    if (elm && splt.length > 1) {
      // document:mousemove
      // parent:touchend
      // body:keyup.enter
      elm = plt.domApi.$elementRef(elm, splt[0]);
      eventName = splt[1];
    }
    if (!elm) {
      // something's up, let's not continue and just return a noop()
      return noop;
    }
    eventListener = listenerCallback;
    // test to see if we're looking for an exact keycode
    splt = eventName.split('.');
    if (splt.length > 1) {
      // looks like this listener is also looking for a keycode
      // keyup.enter
      eventName = splt[0];
      eventListener = function(ev) {
        // wrap the user's event listener with our own check to test
        // if this keyboard event has the keycode they're looking for
        ev.keyCode === KEY_CODE_MAP[splt[1]] && listenerCallback(ev);
      };
    }
    // good to go now, add the event listener
    // and the returned value is a function to remove the same event listener
    return plt.domApi.$addEventListener(elm, eventName, eventListener, useCapture, usePassive);
  }
  function detachListeners(elm) {
    if (elm._listeners) {
      Object.keys(elm._listeners).forEach(function(eventName) {
        return elm._listeners[eventName]();
      });
      elm._listeners = null;
    }
  }
  function assignHostContentSlots(domApi, cmpMeta, elm, childNodes) {
    // compiler has already figured out if this component has slots or not
    // if the component doesn't even have slots then we'll skip over all of this code
    if (cmpMeta.slotMeta) {
      // looks like this component has slots
      // so let's loop through each of the childNodes to the host element
      // and pick out the ones that have a slot attribute
      // if it doesn't have a slot attribute, than it's a default slot
      elm.$defaultHolder || // create a comment to represent where the original
      // content was first placed, which is useful later on
      domApi.$insertBefore(elm, elm.$defaultHolder = domApi.$createComment(''), childNodes[0]);
      var slotName = void 0;
      var defaultSlot = void 0;
      var namedSlots = void 0;
      var i = 0;
      for (;i < childNodes.length; i++) {
        var childNode = childNodes[i];
        if (1 === domApi.$nodeType(childNode) && null != (slotName = domApi.$getAttribute(childNode, 'slot'))) {
          // is element node
          // this element has a slot name attribute
          // so this element will end up getting relocated into
          // the component's named slot once it renders
          namedSlots = namedSlots || {};
          namedSlots[slotName] ? namedSlots[slotName].push(childNode) : namedSlots[slotName] = [ childNode ];
        } else {
          // this is a text node
          // or it's an element node that doesn't have a slot attribute
          // let's add this node to our collection for the default slot
          defaultSlot ? defaultSlot.push(childNode) : defaultSlot = [ childNode ];
        }
      }
      // keep a reference to all of the initial nodes
      // found as immediate childNodes to the host element
      elm._hostContentNodes = {
        defaultSlot: defaultSlot,
        namedSlots: namedSlots
      };
    }
  }
  function createDomControllerClient(win, now, rafPending) {
    var readCBs = [];
    var writeCBs = [];
    var raf = function(cb) {
      return win.requestAnimationFrame(cb);
    };
    function rafFlush(timeStamp, startTime, cb, err) {
      try {
        startTime = now();
        // ******** DOM READS ****************
        while (cb = readCBs.shift()) {
          cb(timeStamp);
        }
        // ******** DOM WRITES ****************
        while (cb = writeCBs.shift()) {
          cb(timeStamp);
          if (now() - startTime > 8) {
            break;
          }
        }
      } catch (e) {
        err = e;
      }
      (rafPending = readCBs.length > 0 || writeCBs.length > 0) && raf(rafFlush);
      err && console.error(err);
    }
    return {
      read: function(cb) {
        readCBs.push(cb);
        if (!rafPending) {
          rafPending = true;
          raf(rafFlush);
        }
      },
      write: function(cb) {
        writeCBs.push(cb);
        if (!rafPending) {
          rafPending = true;
          raf(rafFlush);
        }
      },
      raf: raf
    };
  }
  function createDomApi(win, doc, WindowCustomEvent) {
    // using the $ prefix so that closure is
    // cool with property renaming each of these
    var domApi = {
      $documentElement: doc.documentElement,
      $head: doc.head,
      $body: doc.body,
      $nodeType: function(node) {
        return node.nodeType;
      },
      $createElement: function(tagName) {
        return doc.createElement(tagName);
      },
      $createElementNS: function(namespace, tagName) {
        return doc.createElementNS(namespace, tagName);
      },
      $createTextNode: function(text) {
        return doc.createTextNode(text);
      },
      $createComment: function(data) {
        return doc.createComment(data);
      },
      $insertBefore: function(parentNode, childNode, referenceNode) {
        return parentNode.insertBefore(childNode, referenceNode);
      },
      $removeChild: function(parentNode, childNode) {
        return parentNode.removeChild(childNode);
      },
      $appendChild: function(parentNode, childNode) {
        return parentNode.appendChild(childNode);
      },
      $childNodes: function(node) {
        return node.childNodes;
      },
      $parentNode: function(node) {
        return node.parentNode;
      },
      $nextSibling: function(node) {
        return node.nextSibling;
      },
      $tagName: function(elm) {
        return toLowerCase(elm.tagName);
      },
      $getTextContent: function(node) {
        return node.textContent;
      },
      $setTextContent: function(node, text) {
        return node.textContent = text;
      },
      $getAttribute: function(elm, key) {
        return elm.getAttribute(key);
      },
      $setAttribute: function(elm, key, val) {
        return elm.setAttribute(key, val);
      },
      $setAttributeNS: function(elm, namespaceURI, qualifiedName, val) {
        return elm.setAttributeNS(namespaceURI, qualifiedName, val);
      },
      $removeAttribute: function(elm, key) {
        return elm.removeAttribute(key);
      },
      $addEventListener: function(elm, eventName, eventListener, useCapture, usePassive, eventListenerOpts) {
        eventListenerOpts = domApi.$supportsEventOptions ? {
          capture: !!useCapture,
          passive: !!usePassive
        } : !!useCapture;
        // ok, good to go, let's add the actual listener to the dom element
        elm.addEventListener(eventName, eventListener, eventListenerOpts);
        // return a function which is used to remove this very same listener
        return function() {
          return elm && elm.removeEventListener(eventName, eventListener, eventListenerOpts);
        };
      },
      $elementRef: function(elm, referenceName) {
        if ('child' === referenceName) {
          return elm.firstElementChild;
        }
        if ('parent' === referenceName) {
          return domApi.$parentElement(elm);
        }
        if ('body' === referenceName) {
          return domApi.$body;
        }
        if ('document' === referenceName) {
          return doc;
        }
        if ('window' === referenceName) {
          return win;
        }
        return elm;
      }
    };
    WindowCustomEvent = win.CustomEvent;
    if ('function' !== typeof WindowCustomEvent) {
      // CustomEvent polyfill
      WindowCustomEvent = function(event, data, evt) {
        evt = doc.createEvent('CustomEvent');
        evt.initCustomEvent(event, data.bubbles, data.cancelable, data.detail);
        return evt;
      };
      WindowCustomEvent.prototype = win.Event.prototype;
    }
    // test if this browser supports event options or not
    try {
      win.addEventListener('e', null, Object.defineProperty({}, 'passive', {
        get: function() {
          return domApi.$supportsEventOptions = true;
        }
      }));
    } catch (e) {}
    domApi.$dispatchEvent = function(elm, eventName, data) {
      return elm && elm.dispatchEvent(new WindowCustomEvent(eventName, data));
    };
    domApi.$parentElement = function(elm, parentNode) {
      // if the parent node is a document fragment (shadow root)
      // then use the "host" property on it
      // otherwise use the parent node
      parentNode = domApi.$parentNode(elm);
      return parentNode && 11 === domApi.$nodeType(parentNode) ? parentNode.host : parentNode;
    };
    return domApi;
  }
  function updateElement(plt, oldVnode, newVnode, isSvgMode, name) {
    // if the element passed in is a shadow root, which is a document fragment
    // then we want to be adding attrs/props to the shadow root's "host" element
    // if it's not a shadow root, then we add attrs/props to the same element
    var elm = newVnode.elm;
    var oldVnodeAttrs = oldVnode && oldVnode.vattrs || EMPTY_OBJ;
    var newVnodeAttrs = newVnode.vattrs || EMPTY_OBJ;
    // remove attributes no longer present on the vnode by setting them to undefined
    for (name in oldVnodeAttrs) {
      newVnodeAttrs && null != newVnodeAttrs[name] || null == oldVnodeAttrs[name] || setAccessor(plt, elm, name, oldVnodeAttrs[name], void 0, isSvgMode);
    }
    // add new & update changed attributes
    for (name in newVnodeAttrs) {
      name in oldVnodeAttrs && newVnodeAttrs[name] === ('value' === name || 'checked' === name ? elm[name] : oldVnodeAttrs[name]) || setAccessor(plt, elm, name, oldVnodeAttrs[name], newVnodeAttrs[name], isSvgMode);
    }
  }
  function setAccessor(plt, elm, name, oldValue, newValue, isSvg, i, ilen) {
    if ('class' !== name || isSvg) {
      if ('style' === name) {
        // Style
        oldValue = oldValue || EMPTY_OBJ;
        newValue = newValue || EMPTY_OBJ;
        for (i in oldValue) {
          newValue[i] || (elm.style[i] = '');
        }
        for (i in newValue) {
          newValue[i] !== oldValue[i] && (elm.style[i] = newValue[i]);
        }
      } else if ('o' !== name[0] || 'n' !== name[1] || name in elm) {
        if ('list' !== name && 'type' !== name && !isSvg && (name in elm || -1 !== [ 'object', 'function' ].indexOf(typeof newValue) && null !== newValue)) {
          // Properties
          // - list and type are attributes that get applied as values on the element
          // - all svgs get values as attributes not props
          // - check if elm contains name or if the value is array, object, or function
          var cmpMeta = plt.getComponentMeta(elm);
          if (cmpMeta && cmpMeta.membersMeta && name in cmpMeta.membersMeta) {
            // setting a known @Prop on this element
            setProperty(elm, name, newValue);
          } else {
            // property setting a prop on a native property, like "value" or something
            setProperty(elm, name, null == newValue ? '' : newValue);
            null != newValue && false !== newValue || elm.removeAttribute(name);
          }
        } else if (null != newValue) {
          // Element Attributes
          i = name !== (name = name.replace(/^xlink\:?/, ''));
          1 !== BOOLEAN_ATTRS[name] || newValue && 'false' !== newValue ? 'function' !== typeof newValue && (i ? elm.setAttributeNS(XLINK_NS$1, toLowerCase(name), newValue) : elm.setAttribute(name, newValue)) : i ? elm.removeAttributeNS(XLINK_NS$1, toLowerCase(name)) : elm.removeAttribute(name);
        }
      } else {
        // Event Handlers
        // adding an standard event listener, like <button onClick=...> or something
        name = toLowerCase(name).substring(2);
        var listeners = elm._listeners = elm._listeners || {};
        newValue ? oldValue || (// add listener
        listeners[name] = addListener(plt, elm, name, newValue)) : listeners[name] && // remove listener
        listeners[name]();
      }
    } else // Class
    if (oldValue !== newValue) {
      var oldList_1 = null == oldValue || '' === oldValue ? EMPTY_ARR : oldValue.trim().split(/\s+/);
      var newList = null == newValue || '' === newValue ? EMPTY_ARR : newValue.trim().split(/\s+/);
      var classList = null == elm.className || '' === elm.className ? EMPTY_ARR : elm.className.trim().split(/\s+/);
      for (i = 0, ilen = oldList_1.length; i < ilen; i++) {
        -1 === newList.indexOf(oldList_1[i]) && (classList = classList.filter(function(c) {
          return c !== oldList_1[i];
        }));
      }
      for (i = 0, ilen = newList.length; i < ilen; i++) {
        -1 === oldList_1.indexOf(newList[i]) && (classList = classList.concat([ newList[i] ]));
      }
      elm.className = classList.join(' ');
    }
  }
  /**
     * Attempt to set a DOM property to the given value.
     * IE & FF throw for certain property-value combinations.
     */
  function setProperty(elm, name, value) {
    try {
      elm[name] = value;
    } catch (e) {}
  }
  var BOOLEAN_ATTRS = {
    'allowfullscreen': 1,
    'async': 1,
    'autofocus': 1,
    'autoplay': 1,
    'checked': 1,
    'controls': 1,
    'disabled': 1,
    'enabled': 1,
    'formnovalidate': 1,
    'hidden': 1,
    'multiple': 1,
    'noresize': 1,
    'readonly': 1,
    'required': 1,
    'selected': 1,
    'spellcheck': 1
  };
  var XLINK_NS$1 = 'http://www.w3.org/1999/xlink';
  /**
     * Virtual DOM patching algorithm based on Snabbdom by
     * Simon Friis Vindum (@paldepind)
     * Licensed under the MIT License
     * https://github.com/snabbdom/snabbdom/blob/master/LICENSE
     *
     * Modified for Stencil's renderer and slot projection
     */
  var isSvgMode = false;
  function createRendererPatch(plt, domApi) {
    // createRenderer() is only created once per app
    // the patch() function which createRenderer() returned is the function
    // which gets called numerous times by each component
    function createElm(vnode, parentElm, childIndex) {
      var i = 0;
      'function' === typeof vnode.vtag && (vnode = vnode.vtag(Object.assign({}, vnode.vattrs, {
        children: vnode.vchildren
      })));
      if ('slot' === vnode.vtag && !useNativeShadowDom) {
        if (hostContentNodes) {
          scopeId && domApi.$setAttribute(parentElm, scopeId + '-slot', '');
          // special case for manually relocating host content nodes
          // to their new home in either a named slot or the default slot
          var namedSlot = vnode.vattrs && vnode.vattrs.name;
          var slotNodes = void 0;
          // this vnode is a named slot
          slotNodes = isDef(namedSlot) ? hostContentNodes.namedSlots && hostContentNodes.namedSlots[namedSlot] : hostContentNodes.defaultSlot;
          if (isDef(slotNodes)) {
            // the host element has some nodes that need to be moved around
            // we have a slot for the user's vnode to go into
            // while we're moving nodes around, temporarily disable
            // the disconnectCallback from working
            plt.tmpDisconnected = true;
            for (;i < slotNodes.length; i++) {
              // remove the host content node from it's original parent node
              // then relocate the host content node to its new slotted home
              domApi.$appendChild(parentElm, domApi.$removeChild(domApi.$parentNode(slotNodes[i]), slotNodes[i]));
            }
            // done moving nodes around
            // allow the disconnect callback to work again
            plt.tmpDisconnected = false;
          }
        }
        // this was a slot node, we do not create slot elements, our work here is done
        // no need to return any element to be added to the dom
        return null;
      }
      if (isDef(vnode.vtext)) {
        // create text node
        vnode.elm = domApi.$createTextNode(vnode.vtext);
      } else {
        // create element
        var elm = vnode.elm = domApi.$createElement(vnode.vtag);
        // add css classes, attrs, props, listeners, etc.
        updateElement(plt, null, vnode, isSvgMode);
        var children = vnode.vchildren;
        if (children) {
          var childNode = void 0;
          for (;i < children.length; ++i) {
            // create the node
            childNode = createElm(children[i], elm, i);
            // return node could have been null
            childNode && // append our new node
            domApi.$appendChild(elm, childNode);
          }
        }
      }
      return vnode.elm;
    }
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx) {
      var containerElm = parentElm.$defaultHolder && domApi.$parentNode(parentElm.$defaultHolder) || parentElm;
      var childNode;
      for (;startIdx <= endIdx; ++startIdx) {
        var vnodeChild = vnodes[startIdx];
        if (isDef(vnodeChild)) {
          childNode = isDef(vnodeChild.vtext) ? domApi.$createTextNode(vnodeChild.vtext) : createElm(vnodeChild, parentElm, startIdx);
          if (isDef(childNode)) {
            vnodeChild.elm = childNode;
            domApi.$insertBefore(containerElm, childNode, before);
          }
        }
      }
    }
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
      for (;startIdx <= endIdx; ++startIdx) {
        isDef(vnodes[startIdx]) && domApi.$removeChild(parentElm, vnodes[startIdx].elm);
      }
    }
    function updateChildren(parentElm, oldCh, newCh) {
      var oldStartIdx = 0, newStartIdx = 0;
      var oldEndIdx = oldCh.length - 1;
      var oldStartVnode = oldCh[0];
      var oldEndVnode = oldCh[oldEndIdx];
      var newEndIdx = newCh.length - 1;
      var newStartVnode = newCh[0];
      var newEndVnode = newCh[newEndIdx];
      var oldKeyToIdx;
      var idxInOld;
      var elmToMove;
      var node;
      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (null == oldStartVnode) {
          oldStartVnode = oldCh[++oldStartIdx];
        } else if (null == oldEndVnode) {
          oldEndVnode = oldCh[--oldEndIdx];
        } else if (null == newStartVnode) {
          newStartVnode = newCh[++newStartIdx];
        } else if (null == newEndVnode) {
          newEndVnode = newCh[--newEndIdx];
        } else if (isSameVnode(oldStartVnode, newStartVnode)) {
          patchVNode(oldStartVnode, newStartVnode);
          oldStartVnode = oldCh[++oldStartIdx];
          newStartVnode = newCh[++newStartIdx];
        } else if (isSameVnode(oldEndVnode, newEndVnode)) {
          patchVNode(oldEndVnode, newEndVnode);
          oldEndVnode = oldCh[--oldEndIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (isSameVnode(oldStartVnode, newEndVnode)) {
          patchVNode(oldStartVnode, newEndVnode);
          domApi.$insertBefore(parentElm, oldStartVnode.elm, domApi.$nextSibling(oldEndVnode.elm));
          oldStartVnode = oldCh[++oldStartIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (isSameVnode(oldEndVnode, newStartVnode)) {
          patchVNode(oldEndVnode, newStartVnode);
          domApi.$insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
          oldEndVnode = oldCh[--oldEndIdx];
          newStartVnode = newCh[++newStartIdx];
        } else {
          isUndef(oldKeyToIdx) && (oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx));
          idxInOld = oldKeyToIdx[newStartVnode.vkey];
          if (isUndef(idxInOld)) {
            // new element
            node = createElm(newStartVnode, parentElm, newStartIdx);
            newStartVnode = newCh[++newStartIdx];
          } else {
            elmToMove = oldCh[idxInOld];
            if (elmToMove.vtag !== newStartVnode.vtag) {
              node = createElm(newStartVnode, parentElm, idxInOld);
            } else {
              patchVNode(elmToMove, newStartVnode);
              oldCh[idxInOld] = void 0;
              node = elmToMove.elm;
            }
            newStartVnode = newCh[++newStartIdx];
          }
          node && domApi.$insertBefore(parentElm, node, oldStartVnode.elm);
        }
      }
      oldStartIdx > oldEndIdx ? addVnodes(parentElm, null == newCh[newEndIdx + 1] ? null : newCh[newEndIdx + 1].elm, newCh, newStartIdx, newEndIdx) : newStartIdx > newEndIdx && removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
    function isSameVnode(vnode1, vnode2) {
      // compare if two vnode to see if they're "technically" the same
      // need to have the same element tag, and same key to be the same
      return vnode1.vtag === vnode2.vtag && vnode1.vkey === vnode2.vkey;
    }
    function createKeyToOldIdx(children, beginIdx, endIdx) {
      var i, key, ch, map = {};
      for (i = beginIdx; i <= endIdx; ++i) {
        ch = children[i];
        if (null != ch) {
          key = ch.vkey;
          void 0 !== key && (map.k = i);
        }
      }
      return map;
    }
    function patchVNode(oldVNode, newVNode) {
      var elm = newVNode.elm = oldVNode.elm;
      var oldChildren = oldVNode.vchildren;
      var newChildren = newVNode.vchildren;
      if (isUndef(newVNode.vtext)) {
        // element node
        'slot' !== newVNode.vtag && // either this is the first render of an element OR it's an update
        // AND we already know it's possible it could have changed
        // this updates the element's css classes, attrs, props, listeners, etc.
        updateElement(plt, oldVNode, newVNode, isSvgMode);
        if (isDef(oldChildren) && isDef(newChildren)) {
          // looks like there's child vnodes for both the old and new vnodes
          updateChildren(elm, oldChildren, newChildren);
        } else if (isDef(newChildren)) {
          // no old child vnodes, but there are new child vnodes to add
          isDef(oldVNode.vtext) && // the old vnode was text, so be sure to clear it out
          domApi.$setTextContent(elm, '');
          // add the new vnode children
          addVnodes(elm, null, newChildren, 0, newChildren.length - 1);
        } else {
          isDef(oldChildren) && // no new child vnodes, but there are old child vnodes to remove
          removeVnodes(elm, oldChildren, 0, oldChildren.length - 1);
        }
      } else if (elm._hostContentNodes && elm._hostContentNodes.defaultSlot) {
        // this element has slotted content
        var parentElement = elm._hostContentNodes.defaultSlot[0].parentElement;
        domApi.$setTextContent(parentElement, newVNode.vtext);
        elm._hostContentNodes.defaultSlot = [ parentElement.childNodes[0] ];
      } else {
        oldVNode.vtext !== newVNode.vtext && // update the text content for the text only vnode
        // and also only if the text is different than before
        domApi.$setTextContent(elm, newVNode.vtext);
      }
    }
    // internal variables to be reused per patch() call
    var isUpdate, hostContentNodes, useNativeShadowDom, scopeId;
    return function patch(oldVNode, newVNode, isUpdatePatch, hostElementContentNodes, encapsulation, ssrPatchId) {
      // patchVNode() is synchronous
      // so it is safe to set these variables and internally
      // the same patch() call will reference the same data
      isUpdate = isUpdatePatch;
      hostContentNodes = hostElementContentNodes;
      !isUpdate;
      // synchronous patch
      patchVNode(oldVNode, newVNode);
      // return our new vnode
      return newVNode;
    };
  }
  function callNodeRefs(vNode, isDestroy) {
    if (vNode) {
      vNode.vref && vNode.vref(isDestroy ? null : vNode.elm);
      vNode.vchildren && vNode.vchildren.forEach(function(vChild) {
        callNodeRefs(vChild, isDestroy);
      });
    }
  }
  var VNode = /** @class */ function() {
    function VNode() {}
    return VNode;
  }();
  /**
     * Production h() function based on Preact by
     * Jason Miller (@developit)
     * Licensed under the MIT License
     * https://github.com/developit/preact/blob/master/LICENSE
     *
     * Modified for Stencil's compiler and vdom
     */
  var stack = [];
  function h(nodeName, vnodeData, child) {
    var children;
    var lastSimple = false;
    var simple = false;
    for (var i = arguments.length; i-- > 2; ) {
      stack.push(arguments[i]);
    }
    while (stack.length) {
      if ((child = stack.pop()) && void 0 !== child.pop) {
        for (i = child.length; i--; ) {
          stack.push(child[i]);
        }
      } else {
        'boolean' === typeof child && (child = null);
        (simple = 'function' !== typeof nodeName) && (null == child ? child = '' : 'number' === typeof child ? child = String(child) : 'string' !== typeof child && (simple = false));
        simple && lastSimple ? children[children.length - 1].vtext += child : void 0 === children ? children = [ simple ? t(child) : child ] : children.push(simple ? t(child) : child);
        lastSimple = simple;
      }
    }
    var vnode = new VNode();
    vnode.vtag = nodeName;
    vnode.vchildren = children;
    if (vnodeData) {
      vnode.vattrs = vnodeData;
      vnode.vkey = vnodeData.key;
      vnode.vref = vnodeData.ref;
      // normalize class / classname attributes
      vnodeData.className && (vnodeData.class = vnodeData.className);
      if ('object' === typeof vnodeData.class) {
        for (i in vnodeData.class) {
          vnodeData.class[i] && stack.push(i);
        }
        vnodeData.class = stack.join(' ');
        stack.length = 0;
      }
    }
    return vnode;
  }
  function t(textValue) {
    var vnode = new VNode();
    vnode.vtext = textValue;
    return vnode;
  }
  function createVNodesFromSsr(domApi, rootElm) {
    var elm, ssrVNodeId, ssrVNode, i, j, jlen, allSsrElms = rootElm.querySelectorAll('[' + SSR_VNODE_ID + ']'), ilen = allSsrElms.length;
    if (rootElm._hasLoaded = ilen > 0) {
      for (i = 0; i < ilen; i++) {
        elm = allSsrElms[i];
        ssrVNodeId = domApi.$getAttribute(elm, SSR_VNODE_ID);
        ssrVNode = elm._vnode = new VNode();
        ssrVNode.vtag = domApi.$tagName(ssrVNode.elm = elm);
        for (j = 0, jlen = elm.childNodes.length; j < jlen; j++) {
          addChildSsrVNodes(domApi, elm.childNodes[j], ssrVNode, ssrVNodeId, true);
        }
      }
    }
  }
  function addChildSsrVNodes(domApi, node, parentVNode, ssrVNodeId, checkNestedElements) {
    var nodeType = domApi.$nodeType(node);
    var previousComment;
    var childVNodeId, childVNodeSplt, childVNode;
    if (checkNestedElements && 1 === nodeType) {
      childVNodeId = domApi.$getAttribute(node, SSR_CHILD_ID);
      if (childVNodeId) {
        // split the start comment's data with a period
        childVNodeSplt = childVNodeId.split('.');
        // ensure this this element is a child element of the ssr vnode
        if (childVNodeSplt[0] === ssrVNodeId) {
          // cool, this element is a child to the parent vnode
          childVNode = new VNode();
          childVNode.vtag = domApi.$tagName(childVNode.elm = node);
          // this is a new child vnode
          // so ensure its parent vnode has the vchildren array
          parentVNode.vchildren || (parentVNode.vchildren = []);
          // add our child vnode to a specific index of the vnode's children
          parentVNode.vchildren[childVNodeSplt[1]] = childVNode;
          // this is now the new parent vnode for all the next child checks
          parentVNode = childVNode;
          // if there's a trailing period, then it means there aren't any
          // more nested elements, but maybe nested text nodes
          // either way, don't keep walking down the tree after this next call
          checkNestedElements = '' !== childVNodeSplt[2];
        }
      }
      // keep drilling down through the elements
      for (var i = 0; i < node.childNodes.length; i++) {
        addChildSsrVNodes(domApi, node.childNodes[i], parentVNode, ssrVNodeId, checkNestedElements);
      }
    } else if (3 === nodeType && (previousComment = node.previousSibling) && 8 === domApi.$nodeType(previousComment)) {
      // split the start comment's data with a period
      childVNodeSplt = domApi.$getTextContent(previousComment).split('.');
      // ensure this is an ssr text node start comment
      // which should start with an "s" and delimited by periods
      if ('s' === childVNodeSplt[0] && childVNodeSplt[1] === ssrVNodeId) {
        // cool, this is a text node and it's got a start comment
        childVNode = t(domApi.$getTextContent(node));
        childVNode.elm = node;
        // this is a new child vnode
        // so ensure its parent vnode has the vchildren array
        parentVNode.vchildren || (parentVNode.vchildren = []);
        // add our child vnode to a specific index of the vnode's children
        parentVNode.vchildren[childVNodeSplt[2]] = childVNode;
      }
    }
  }
  function createQueueClient(domCtrl, now, resolvePending, rafPending) {
    var raf = domCtrl.raf;
    var highPromise = Promise.resolve();
    var highPriority = [];
    var lowPriority = [];
    function doHighPriority() {
      // holy geez we need to get this stuff done and fast
      // all high priority callbacks should be fired off immediately
      while (highPriority.length > 0) {
        highPriority.shift()();
      }
      resolvePending = false;
    }
    function doWork(start) {
      start = now();
      // always run all of the high priority work if there is any
      doHighPriority();
      while (lowPriority.length > 0 && now() - start < 40) {
        lowPriority.shift()();
      }
      // check to see if we still have work to do
      (rafPending = lowPriority.length > 0) && // everyone just settle down now
      // we already don't have time to do anything in this callback
      // let's throw the next one in a requestAnimationFrame
      // so we can just simmer down for a bit
      raf(flush);
    }
    function flush(start) {
      // always run all of the high priority work if there is any
      doHighPriority();
      // always force a bunch of medium callbacks to run, but still have
      // a throttle on how many can run in a certain time
      start = now();
      while (lowPriority.length > 0 && now() - start < 4) {
        lowPriority.shift()();
      }
      (rafPending = lowPriority.length > 0) && // still more to do yet, but we've run out of time
      // let's let this thing cool off and try again in the next ric
      raf(doWork);
    }
    return {
      add: function(cb, priority) {
        if (3 === priority) {
          // uses Promise.resolve() for next tick
          highPriority.push(cb);
          if (!resolvePending) {
            // not already pending work to do, so let's tee it up
            resolvePending = true;
            highPromise.then(doHighPriority);
          }
        } else {
          // defaults to low priority
          // uses requestAnimationFrame
          lowPriority.push(cb);
          if (!rafPending) {
            // not already pending work to do, so let's tee it up
            rafPending = true;
            raf(doWork);
          }
        }
      }
    };
  }
  function parseComponentLoaders(cmpRegistryData, registry, attr) {
    // tag name will always be lower case
    var cmpMeta = {
      tagNameMeta: cmpRegistryData[0],
      membersMeta: {
        // every component defaults to always have
        // the mode and color properties
        // but only color should observe any attribute changes
        'mode': {
          memberType: 1
        },
        'color': {
          memberType: 1,
          attribName: 'color'
        }
      }
    };
    // map of the modes w/ bundle id and style data
    cmpMeta.bundleIds = cmpRegistryData[1];
    // parse member meta
    // this data only includes props that are attributes that need to be observed
    // it does not include all of the props yet
    parseMembersData(cmpMeta, cmpRegistryData[3], attr);
    // encapsulation
    cmpMeta.encapsulation = cmpRegistryData[4];
    // slot
    cmpMeta.slotMeta = cmpRegistryData[5];
    cmpRegistryData[6] && (// parse listener meta
    cmpMeta.listenersMeta = cmpRegistryData[6].map(parseListenerData));
    // bundle load priority
    cmpMeta.loadPriority = cmpRegistryData[7];
    return registry[cmpMeta.tagNameMeta] = cmpMeta;
  }
  function parseListenerData(listenerData) {
    return {
      eventName: listenerData[0],
      eventMethodName: listenerData[1],
      eventDisabled: !!listenerData[2],
      eventPassive: !!listenerData[3],
      eventCapture: !!listenerData[4]
    };
  }
  function parseMembersData(cmpMeta, memberData, attr) {
    if (memberData) {
      cmpMeta.membersMeta = cmpMeta.membersMeta || {};
      for (var i = 0; i < memberData.length; i++) {
        var d = memberData[i];
        cmpMeta.membersMeta[d[0]] = {
          memberType: d[1],
          attribName: d[2] ? 1 === attr ? toLowerCase(d[0]) : toDashCase(d[0]) : 0,
          propType: d[3],
          ctrlId: d[4]
        };
      }
    }
  }
  function parseComponentMeta(registry, moduleImports, cmpMetaData, attr) {
    // tag name will always be lowser case
    var cmpMeta = registry[cmpMetaData[0]];
    // get the component class which was added to moduleImports
    // using the tag as the key on the export object
    cmpMeta.componentModule = moduleImports[cmpMetaData[0]];
    // component members
    parseMembersData(cmpMeta, cmpMetaData[1], attr);
    // host element meta
    cmpMeta.hostMeta = cmpMetaData[2];
    // component instance events
    cmpMetaData[3] && (cmpMeta.eventsMeta = cmpMetaData[3].map(parseEventData));
    // component instance prop WILL change methods
    cmpMeta.propsWillChangeMeta = cmpMetaData[4];
    // component instance prop DID change methods
    cmpMeta.propsDidChangeMeta = cmpMetaData[5];
  }
  function parseEventData(d) {
    return {
      eventName: d[0],
      eventMethodName: d[1] || d[0],
      eventBubbles: !d[2],
      eventCancelable: !d[3],
      eventComposed: !d[4]
    };
  }
  function parsePropertyValue(propType, propValue) {
    // ensure this value is of the correct prop type
    if (isDef(propValue)) {
      if (3 === propType) {
        // per the HTML spec, any string value means it is a boolean true value
        // but we'll cheat here and say that the string "false" is the boolean false
        return 'false' !== propValue && ('' === propValue || !!propValue);
      }
      if (4 === propType) {
        // force it to be a number
        return parseFloat(propValue);
      }
    }
    // not sure exactly what type we want
    // so no need to change to a different type
    return propValue;
  }
  function attributeChangedCallback(membersMeta, elm, attribName, oldVal, newVal, propName) {
    // only react if the attribute values actually changed
    if (oldVal !== newVal && membersMeta) {
      // normalize the attribute name w/ lower case
      attribName = toLowerCase(attribName);
      // using the known component meta data
      // look up to see if we have a property wired up to this attribute name
      for (propName in membersMeta) {
        if (membersMeta[propName].attribName === attribName) {
          // cool we've got a prop using this attribute name the value will
          // be a string, so let's convert it to the correct type the app wants
          // below code is ugly yes, but great minification ;)
          elm[propName] = parsePropertyValue(membersMeta[propName].propType, newVal);
          break;
        }
      }
    }
  }
  function initEventEmitters(plt, componentEvents, instance) {
    componentEvents && componentEvents.forEach(function(eventMeta) {
      instance[eventMeta.eventMethodName] = {
        emit: function(data) {
          var eventData = {
            bubbles: eventMeta.eventBubbles,
            composed: eventMeta.eventComposed,
            cancelable: eventMeta.eventCancelable,
            detail: data
          };
          plt.emitEvent(instance.__el, eventMeta.eventName, eventData);
        }
      };
    });
  }
  function proxyHostElementPrototype(plt, membersMeta, hostPrototype) {
    // create getters/setters on the host element prototype to represent the public API
    // the setters allows us to know when data has changed so we can re-render
    membersMeta && Object.keys(membersMeta).forEach(function(memberName) {
      // add getters/setters
      var memberType = membersMeta[memberName].memberType;
      1 === memberType || 2 === memberType ? // @Prop() or @Prop({ mutable: true })
      definePropertyGetterSetter(hostPrototype, memberName, function getHostElementProp() {
        // host element getter (cannot be arrow fn)
        // yup, ugly, srynotsry
        // but its creating _values if it doesn't already exist
        return (this._values = this._values || {})[memberName];
      }, function setHostElementProp(newValue) {
        // host element setter (cannot be arrow fn)
        setValue(plt, this, memberName, newValue);
      }) : 6 === memberType && // @Method()
      // add a placeholder noop value on the host element's prototype
      // incase this method gets called before setup
      definePropertyValue(hostPrototype, memberName, noop);
    });
  }
  function proxyComponentInstance(plt, cmpMeta, elm, instance) {
    // at this point we've got a specific node of a host element, and created a component class instance
    // and we've already created getters/setters on both the host element and component class prototypes
    // let's upgrade any data that might have been set on the host element already
    // and let's have the getters/setters kick in and do their jobs
    // let's automatically add a reference to the host element on the instance
    instance.__el = elm;
    // create the _values object if it doesn't already exist
    // this will hold all of the internal getter/setter values
    elm._values = elm._values || {};
    cmpMeta.membersMeta && Object.keys(cmpMeta.membersMeta).forEach(function(memberName) {
      defineMember(plt, cmpMeta, elm, instance, memberName);
    });
  }
  function defineMember(plt, cmpMeta, elm, instance, memberName) {
    var memberMeta = cmpMeta.membersMeta[memberName];
    var memberType = memberMeta.memberType;
    function getComponentProp() {
      // component instance prop/state getter
      // get the property value directly from our internal values
      var elm = this.__el;
      return elm && elm._values && elm._values[memberName];
    }
    function setComponentProp(newValue) {
      // component instance prop/state setter (cannot be arrow fn)
      var elm = this.__el;
      1 !== memberType && setValue(plt, elm, memberName, newValue);
    }
    if (1 === memberType || 5 === memberType || 2 === memberType) {
      if (5 !== memberType) {
        if (memberMeta.attribName && (void 0 === elm._values[memberName] || '' === elm._values[memberName])) {
          // check the prop value from the host element attribute
          var hostAttrValue = elm.getAttribute(memberMeta.attribName);
          null != hostAttrValue && (// looks like we've got an attribute value
          // let's set it to our internal values
          elm._values[memberName] = parsePropertyValue(memberMeta.propType, hostAttrValue));
        }
        if (elm.hasOwnProperty(memberName)) {
          // @Prop or @Prop({mutable:true})
          // property values on the host element should override
          // any default values on the component instance
          void 0 === elm._values[memberName] && (elm._values[memberName] = elm[memberName]);
          plt.isClient && // within the browser, the element's prototype
          // already has its getter/setter set, but on the
          // server the prototype is shared causing issues
          // so instead the server's elm has the getter/setter
          // on the actual element instance, not its prototype
          // for the client, let's delete its "own" property
          delete elm[memberName];
        }
      }
      instance.hasOwnProperty(memberName) && void 0 === elm._values[memberName] && (// @Prop() or @Prop({mutable:true}) or @State()
      // we haven't yet got a value from the above checks so let's
      // read any "own" property instance values already set
      // to our internal value as the source of getter data
      // we're about to define a property and it'll overwrite this "own" property
      elm._values[memberName] = instance[memberName]);
      // add getter/setter to the component instance
      // these will be pointed to the internal data set from the above checks
      definePropertyGetterSetter(instance, memberName, getComponentProp, setComponentProp);
    } else if (6 === memberType) {
      // @Method()
      // add a property "value" on the host element
      // which we'll bind to the instance's method
      definePropertyValue(elm, memberName, instance[memberName].bind(instance));
    } else {}
  }
  function setValue(plt, elm, memberName, newVal) {
    // get the internal values object, which should always come from the host element instance
    // create the _values object if it doesn't already exist
    var internalValues = elm._values = elm._values || {};
    // check our new property value against our internal value
    var oldVal = internalValues[memberName];
    if (newVal !== oldVal) {
      // set our new value!
      // https://youtu.be/dFtLONl4cNc?t=22
      internalValues[memberName] = newVal;
      elm._instance && !plt.activeRender && // looks like this value actually changed, so we've got work to do!
      // but only if we've already created an instance, otherwise just chill out
      // queue that we need to do an update, but don't worry about queuing
      // up millions cuz this function ensures it only runs once
      queueUpdate(plt, elm);
    }
  }
  function definePropertyValue(obj, propertyKey, value) {
    // minification shortcut
    Object.defineProperty(obj, propertyKey, {
      'configurable': true,
      'value': value
    });
  }
  function definePropertyGetterSetter(obj, propertyKey, get, set) {
    // minification shortcut
    Object.defineProperty(obj, propertyKey, {
      'configurable': true,
      'get': get,
      'set': set
    });
  }
  function proxyController(domApi, controllerComponents, ctrlTag) {
    return {
      'create': proxyProp(domApi, controllerComponents, ctrlTag, 'create'),
      'componentOnReady': proxyProp(domApi, controllerComponents, ctrlTag, 'componentOnReady')
    };
  }
  function loadComponent(domApi, controllerComponents, ctrlTag) {
    return new Promise(function(resolve) {
      var ctrlElm = controllerComponents[ctrlTag];
      ctrlElm || (ctrlElm = domApi.$body.querySelector(ctrlTag));
      if (!ctrlElm) {
        ctrlElm = controllerComponents[ctrlTag] = domApi.$createElement(ctrlTag);
        domApi.$appendChild(domApi.$body, ctrlElm);
      }
      ctrlElm.componentOnReady(resolve);
    });
  }
  function proxyProp(domApi, controllerComponents, ctrlTag, proxyMethodName) {
    return function() {
      var args = arguments;
      return loadComponent(domApi, controllerComponents, ctrlTag).then(function(ctrlElm) {
        return ctrlElm[proxyMethodName].apply(ctrlElm, args);
      });
    };
  }
  function initComponentInstance(plt, elm, cmpMeta) {
    try {
      // using the user's component class, let's create a new instance
      cmpMeta = plt.getComponentMeta(elm);
      elm._instance = new cmpMeta.componentModule();
      // ok cool, we've got an host element now, and a actual instance
      // and there were no errors creating the instance
      // let's upgrade the data on the host element
      // and let the getters/setters do their jobs
      proxyComponentInstance(plt, cmpMeta, elm, elm._instance);
      // add each of the event emitters which wire up instance methods
      // to fire off dom events from the host element
      initEventEmitters(plt, cmpMeta.eventsMeta, elm._instance);
      try {
        // replay any event listeners on the instance that
        // were queued up between the time the element was
        // connected and before the instance was ready
        replayQueuedEventsOnInstance(elm);
      } catch (e) {
        plt.onError(e, 2, elm);
      }
    } catch (e) {
      // something done went wrong trying to create a component instance
      // create a dumby instance so other stuff can load
      // but chances are the app isn't fully working cuz this component has issues
      elm._instance = {};
      plt.onError(e, 7, elm, true);
    }
  }
  function initLoad(plt, elm, hydratedCssClass) {
    // all is good, this component has been told it's time to finish loading
    // it's possible that we've already decided to destroy this element
    // check if this element has any actively loading child elements
    if (elm._instance && !elm._hasDestroyed && (!elm.$activeLoading || !elm.$activeLoading.length)) {
      // cool, so at this point this element isn't already being destroyed
      // and it does not have any child elements that are still loading
      // ensure we remove any child references cuz it doesn't matter at this point
      elm.$activeLoading = null;
      // sweet, this particular element is good to go
      // all of this element's children have loaded (if any)
      elm._hasLoaded = true;
      try {
        // fire off the user's elm.componentOnReady() callbacks that were
        // put directly on the element (well before anything was ready)
        if (elm._onReadyCallbacks) {
          elm._onReadyCallbacks.forEach(function(cb) {
            return cb(elm);
          });
          elm._onReadyCallbacks = null;
        }
        // fire off the ref if it exists
        callNodeRefs(elm._vnode);
      } catch (e) {
        plt.onError(e, 4, elm);
      }
      // add the css class that this element has officially hydrated
      elm.classList.add(hydratedCssClass);
      // ( •_•)
      // ( •_•)>⌐■-■
      // (⌐■_■)
      // load events fire from bottom to top
      // the deepest elements load first then bubbles up
      propagateElementLoaded(elm);
    }
  }
  function propagateElementLoaded(elm, index, ancestorsActivelyLoadingChildren) {
    // load events fire from bottom to top
    // the deepest elements load first then bubbles up
    if (elm._ancestorHostElement) {
      // ok so this element already has a known ancestor host element
      // let's make sure we remove this element from its ancestor's
      // known list of child elements which are actively loading
      ancestorsActivelyLoadingChildren = elm._ancestorHostElement.$activeLoading;
      if (ancestorsActivelyLoadingChildren) {
        index = ancestorsActivelyLoadingChildren.indexOf(elm);
        index > -1 && // yup, this element is in the list of child elements to wait on
        // remove it so we can work to get the length down to 0
        ancestorsActivelyLoadingChildren.splice(index, 1);
        // the ancestor's initLoad method will do the actual checks
        // to see if the ancestor is actually loaded or not
        // then let's call the ancestor's initLoad method if there's no length
        // (which actually ends up as this method again but for the ancestor)
        !ancestorsActivelyLoadingChildren.length && elm._ancestorHostElement.$initLoad();
      }
      // fuhgeddaboudit, no need to keep a reference after this element loaded
      elm._ancestorHostElement = null;
    }
  }
  function render(plt, elm, cmpMeta, isUpdateRender) {
    var instance = elm._instance;
    // if this component has a render function, let's fire
    // it off and generate the child vnodes for this host element
    // note that we do not create the host element cuz it already exists
    var hostMeta = cmpMeta.hostMeta;
    if (instance.render || instance.hostData || hostMeta) {
      // tell the platform we're actively rendering
      // if a value is changed within a render() then
      // this tells the platform not to queue the change
      plt.activeRender = true;
      var vnodeChildren = instance.render && instance.render();
      var vnodeHostData = void 0;
      // tell the platform we're done rendering
      // now any changes will again queue
      plt.activeRender = false;
      // looks like we've got child nodes to render into this host element
      // or we need to update the css class/attrs on the host element
      // if we haven't already created a vnode, then we give the renderer the actual element
      // if this is a re-render, then give the renderer the last vnode we already created
      var oldVNode = elm._vnode || new VNode();
      oldVNode.elm = elm;
      // each patch always gets a new vnode
      // the host element itself isn't patched because it already exists
      // kick off the actual render and any DOM updates
      elm._vnode = plt.render(oldVNode, h(null, vnodeHostData, vnodeChildren), isUpdateRender, elm._hostContentNodes, cmpMeta.encapsulation);
      // attach the styles this component needs, if any
      // this fn figures out if the styles should go in a
      // shadow root or if they should be global
      plt.attachStyles(cmpMeta, instance.mode, elm);
    }
    // it's official, this element has rendered
    elm.$rendered = true;
    if (elm.$onRender) {
      // ok, so turns out there are some child host elements
      // waiting on this parent element to load
      // let's fire off all update callbacks waiting
      elm.$onRender.forEach(function(cb) {
        return cb();
      });
      elm.$onRender = null;
    }
  }
  function queueUpdate(plt, elm) {
    // only run patch if it isn't queued already
    if (!elm._isQueuedForUpdate) {
      elm._isQueuedForUpdate = true;
      // run the patch in the next tick
      plt.queue.add(function() {
        // no longer queued
        elm._isQueuedForUpdate = false;
        // vdom diff and patch the host element for differences
        update(plt, elm);
      });
    }
  }
  function update(plt, elm) {
    // everything is async, so somehow we could have already disconnected
    // this node, so be sure to do nothing if we've already disconnected
    if (!elm._hasDestroyed) {
      var isInitialLoad_1 = !elm._instance;
      var userPromise = void 0;
      if (isInitialLoad_1) {
        var ancestorHostElement = elm._ancestorHostElement;
        if (ancestorHostElement && !ancestorHostElement.$rendered) {
          // this is the intial load
          // this element has an ancestor host element
          // but the ancestor host element has NOT rendered yet
          // so let's just cool our jets and wait for the ancestor to render
          (ancestorHostElement.$onRender = ancestorHostElement.$onRender || []).push(function() {
            // this will get fired off when the ancestor host element
            // finally gets around to rendering its lazy self
            update(plt, elm);
          });
          return;
        }
        // haven't created a component instance for this host element yet!
        // create the instance from the user's component class
        // https://www.youtube.com/watch?v=olLxrojmvMg
        initComponentInstance(plt, elm);
        // fire off the user's componentWillLoad method (if one was provided)
        // componentWillLoad only runs ONCE, after instance's element has been
        // assigned as the host element, but BEFORE render() has been called
        try {
          elm._instance.componentWillLoad && (userPromise = elm._instance.componentWillLoad());
        } catch (e) {
          plt.onError(e, 3, elm);
        }
      }
      userPromise && userPromise.then ? // looks like the user return a promise!
      // let's not actually kick off the render
      // until the user has resolved their promise
      userPromise.then(function() {
        return renderUpdate(plt, elm, isInitialLoad_1);
      }) : // user never returned a promise so there's
      // no need to wait on anything, let's do the render now my friend
      renderUpdate(plt, elm, isInitialLoad_1);
    }
  }
  function renderUpdate(plt, elm, isInitialLoad) {
    // if this component has a render function, let's fire
    // it off and generate a vnode for this
    try {
      render(plt, elm, plt.getComponentMeta(elm), !isInitialLoad);
    } catch (e) {
      plt.onError(e, 8, elm, true);
    }
    try {
      isInitialLoad && // so this was the initial load i guess
      elm.$initLoad();
    } catch (e) {
      // derp
      plt.onError(e, 6, elm, true);
    }
  }
  function connectedCallback(plt, cmpMeta, elm) {
    // do not reconnect if we've already created an instance for this element
    if (!elm.$connected) {
      // first time we've connected
      elm.$connected = true;
      // if somehow this node was reused, ensure we've removed this property
      elm._hasDestroyed = null;
      // initialize our event listeners on the host element
      // we do this now so that we can listening to events that may
      // have fired even before the instance is ready
      initElementListeners(plt, elm);
      // register this component as an actively
      // loading child to its parent component
      registerWithParentComponent(plt, elm);
      // add to the queue to load the bundle
      // it's important to have an async tick in here so we can
      // ensure the "mode" attribute has been added to the element
      // place in high priority since it's not much work and we need
      // to know as fast as possible, but still an async tick in between
      plt.queue.add(function() {
        // only collects slot references if this component even has slots
        plt.connectHostElement(cmpMeta, elm);
        // start loading this component mode's bundle
        // if it's already loaded then the callback will be synchronous
        plt.loadBundle(cmpMeta, elm, function() {
          // we've fully loaded the component mode data
          // let's queue it up to be rendered next
          return queueUpdate(plt, elm);
        });
      }, 3);
    }
  }
  function registerWithParentComponent(plt, elm, ancestorHostElement) {
    // find the first ancestor host element (if there is one) and register
    // this element as one of the actively loading child elements for its ancestor
    ancestorHostElement = elm;
    while (ancestorHostElement = plt.domApi.$parentElement(ancestorHostElement)) {
      // climb up the ancestors looking for the first registered component
      if (plt.isDefinedComponent(ancestorHostElement)) {
        // we found this elements the first ancestor host element
        // if the ancestor already loaded then do nothing, it's too late
        if (!ancestorHostElement._hasLoaded) {
          // keep a reference to this element's ancestor host element
          elm._ancestorHostElement = ancestorHostElement;
          // ensure there is an array to contain a reference to each of the child elements
          // and set this element as one of the ancestor's child elements it should wait on
          (ancestorHostElement.$activeLoading = ancestorHostElement.$activeLoading || []).push(elm);
        }
        break;
      }
    }
  }
  function disconnectedCallback(plt, elm) {
    // only disconnect if we're not temporarily disconnected
    // tmpDisconnected will happen when slot nodes are being relocated
    if (!plt.tmpDisconnected && isDisconnected(plt.domApi, elm)) {
      // ok, let's officially destroy this thing
      // set this to true so that any of our pending async stuff
      // doesn't continue since we already decided to destroy this node
      elm._hasDestroyed = true;
      // double check that we've informed the ancestor host elements
      // that they're good to go and loaded (cuz this one is on its way out)
      propagateElementLoaded(elm);
      // since we're disconnecting, call all of the JSX ref's with null
      callNodeRefs(elm._vnode, true);
      // detatch any event listeners that may have been added
      // this will also set _listeners to null if there are any
      detachListeners(elm);
      elm._hostContentNodes && (// overreacting here just to reduce any memory leak issues
      elm._hostContentNodes = elm._hostContentNodes.defaultSlot = elm._hostContentNodes.namedSlots = null);
      // call instance Did Unload and destroy instance stuff
      // if we've created an instance for this
      elm._instance && (elm._instance = elm._instance.__el = null);
      // fuhgeddaboudit
      // set it all to null to ensure we forget references
      // and reset values incase this node gets reused somehow
      // (possible that it got disconnected, but the node was reused)
      elm.$activeLoading = elm.$connected = elm.$defaultHolder = elm._root = elm._values = elm._vnode = elm._ancestorHostElement = elm._hasLoaded = elm._isQueuedForUpdate = elm._observer = null;
    }
  }
  function isDisconnected(domApi, elm) {
    while (elm) {
      if (!domApi.$parentNode(elm)) {
        return 9 !== domApi.$nodeType(elm);
      }
      elm = domApi.$parentNode(elm);
    }
  }
  function initHostConstructor(plt, cmpMeta, HostElementConstructor, hydratedCssClass) {
    // let's wire up our functions to the host element's prototype
    // we can also inject our platform into each one that needs that api
    // note: these cannot be arrow functions cuz "this" is important here hombre
    HostElementConstructor.connectedCallback = function() {
      // coolsville, our host element has just hit the DOM
      connectedCallback(plt, cmpMeta, this);
    };
    HostElementConstructor.attributeChangedCallback = function(attribName, oldVal, newVal) {
      // the browser has just informed us that an attribute
      // on the host element has changed
      attributeChangedCallback(cmpMeta.membersMeta, this, attribName, oldVal, newVal);
    };
    HostElementConstructor.disconnectedCallback = function() {
      // the element has left the builing
      disconnectedCallback(plt, this);
    };
    HostElementConstructor.componentOnReady = function(cb, promise) {
      cb || (promise = new Promise(function(resolve) {
        return cb = resolve;
      }));
      componentOnReady(this, cb);
      return promise;
    };
    HostElementConstructor.$initLoad = function() {
      initLoad(plt, this, hydratedCssClass);
    };
    // add getters/setters to the host element members
    // these would come from the @Prop and @Method decorators that
    // should create the public API to this component
    proxyHostElementPrototype(plt, cmpMeta.membersMeta, HostElementConstructor);
  }
  function componentOnReady(elm, cb) {
    elm._hasDestroyed || (elm._hasLoaded ? cb(elm) : (elm._onReadyCallbacks = elm._onReadyCallbacks || []).push(cb));
  }
  function useShadowDom(supportsNativeShadowDom, cmpMeta) {
    return supportsNativeShadowDom && 1 === cmpMeta.encapsulation;
  }
  function createPlatformClient(Context, App, win, doc, publicPath, hydratedCssClass) {
    var registry = {
      'html': {}
    };
    var moduleImports = {};
    var bundleCallbacks = {};
    var loadedBundles = {};
    var styleTemplates = {};
    var pendingBundleRequests = {};
    var controllerComponents = {};
    var domApi = createDomApi(win, doc);
    var now = function() {
      return win.performance.now();
    };
    // initialize Core global object
    Context.dom = createDomControllerClient(win, now);
    Context.addListener = function(elm, eventName, cb, opts) {
      return addListener(plt, elm, eventName, cb, opts && opts.capture, opts && opts.passive);
    };
    Context.enableListener = function(instance, eventName, enabled, attachTo) {
      return enableEventListener(plt, instance, eventName, enabled, attachTo);
    };
    Context.emit = function(elm, eventName, data) {
      return domApi.$dispatchEvent(elm, Context.eventNameFn ? Context.eventNameFn(eventName) : eventName, data);
    };
    Context.isServer = Context.isPrerender = !(Context.isClient = true);
    Context.window = win;
    Context.location = win.location;
    Context.document = doc;
    // keep a global set of tags we've already defined
    var globalDefined = win.definedComponents = win.definedComponents || {};
    // create the platform api which is used throughout common core code
    var plt = {
      connectHostElement: connectHostElement,
      domApi: domApi,
      defineComponent: defineComponent,
      emitEvent: Context.emit,
      getComponentMeta: function(elm) {
        return registry[domApi.$tagName(elm)];
      },
      getContextItem: function(contextKey) {
        return Context[contextKey];
      },
      isClient: true,
      isDefinedComponent: function(elm) {
        return !!(globalDefined[domApi.$tagName(elm)] || plt.getComponentMeta(elm));
      },
      loadBundle: loadBundle,
      onError: function(err, type, elm) {
        return console.error(err, type, elm && elm.tagName);
      },
      propConnect: function(ctrlTag) {
        return proxyController(domApi, controllerComponents, ctrlTag);
      },
      queue: createQueueClient(Context.dom, now),
      registerComponents: function(components) {
        return (components || []).map(function(data) {
          return parseComponentLoaders(data, registry);
        });
      }
    };
    // create the renderer that will be used
    plt.render = createRendererPatch(plt, domApi);
    // setup the root element which is the mighty <html> tag
    // the <html> has the final say of when the app has loaded
    var rootElm = domApi.$documentElement;
    rootElm.$rendered = true;
    rootElm.$activeLoading = [];
    // this will fire when all components have finished loaded
    rootElm.$initLoad = function() {
      return rootElm._hasLoaded = true;
    };
    // if the HTML was generated from SSR
    // then let's walk the tree and generate vnodes out of the data
    createVNodesFromSsr(domApi, rootElm);
    function connectHostElement(cmpMeta, elm) {
      // set the "mode" property
      elm.mode || (// looks like mode wasn't set as a property directly yet
      // first check if there's an attribute
      // next check the app's global
      elm.mode = domApi.$getAttribute(elm, 'mode') || Context.mode);
      // host element has been connected to the DOM
      domApi.$getAttribute(elm, SSR_VNODE_ID) || useShadowDom(domApi.$supportsShadowDom, cmpMeta) || // only required when we're NOT using native shadow dom (slot)
      // this host element was NOT created with SSR
      // let's pick out the inner content for slot projection
      assignHostContentSlots(domApi, cmpMeta, elm, elm.childNodes);
      domApi.$supportsShadowDom || 1 !== cmpMeta.encapsulation || (// this component should use shadow dom
      // but this browser doesn't support it
      // so let's polyfill a few things for the user
      elm.shadowRoot = elm);
    }
    function defineComponent(cmpMeta, HostElementConstructor) {
      var tagName = cmpMeta.tagNameMeta;
      if (!globalDefined[tagName]) {
        // keep an array of all the defined components, useful for external frameworks
        globalDefined[tagName] = true;
        // initialize the members on the host element prototype
        initHostConstructor(plt, cmpMeta, HostElementConstructor.prototype, hydratedCssClass);
        // add which attributes should be observed
        var observedAttributes = [];
        // at this point the membersMeta only includes attributes which should
        // be observed, it does not include all props yet, so it's safe to
        // loop through all of the props (attrs) and observed them
        for (var propName in cmpMeta.membersMeta) {
          // initialize the actual attribute name used vs. the prop name
          // for example, "myProp" would be "my-prop" as an attribute
          // and these can be configured to be all lower case or dash case (default)
          cmpMeta.membersMeta[propName].attribName && observedAttributes.push(// dynamically generate the attribute name from the prop name
          // also add it to our array of attributes we need to observe
          cmpMeta.membersMeta[propName].attribName);
        }
        // set the array of all the attributes to keep an eye on
        // https://www.youtube.com/watch?v=RBs21CFBALI
        HostElementConstructor.observedAttributes = observedAttributes;
        // define the custom element
        win.customElements.define(tagName, HostElementConstructor);
      }
    }
    App.loadComponents = function loadComponents(bundleId, importFn) {
      // https://youtu.be/Z-FPimCmbX8?t=31
      // jsonp tag team back again from requested bundle
      var args = arguments;
      // import component function
      // inject globals
      importFn(moduleImports, h, Context, publicPath);
      for (var i = 2; i < args.length; i++) {
        // parse the external component data into internal component meta data
        parseComponentMeta(registry, moduleImports, args[i]);
      }
      // fire off all the callbacks waiting on this bundle to load
      var callbacks = bundleCallbacks[bundleId];
      if (callbacks) {
        for (i = 0; i < callbacks.length; i++) {
          callbacks[i]();
        }
        bundleCallbacks[bundleId] = null;
      }
      // remember that we've already loaded this bundle
      loadedBundles[bundleId] = true;
    };
    App.loadStyles = function loadStyles() {
      // jsonp callback from requested bundles
      // either directly add styles to document.head or add the
      // styles to a template tag to be cloned later for shadow roots
      var args = arguments;
      var templateElm;
      for (var i = 0; i < args.length; i += 2) {
        // create the template element which will hold the styles
        // adding it to the dom via <template> so that we can
        // clone this for each potential shadow root that will need these styles
        // otherwise it'll be cloned and added to the entire document
        // but that's for the renderer to figure out later
        styleTemplates[args[i]] = templateElm = domApi.$createElement('template');
        // add the style text to the template element
        templateElm.innerHTML = '<style>' + args[i + 1] + '</style>';
        // give it an unique id
        templateElm.id = 'tmp-' + args[i];
        // add our new element to the head
        domApi.$appendChild(domApi.$head, templateElm);
      }
    };
    function loadBundle(cmpMeta, elm, cb, bundleId) {
      bundleId = cmpMeta.bundleIds[elm.mode] || cmpMeta.bundleIds;
      if (loadedBundles[bundleId]) {
        // sweet, we've already loaded this bundle
        cb();
      } else {
        // never seen this bundle before, let's start the request
        // and add it to the callbacks to fire when it has loaded
        (bundleCallbacks[bundleId] = bundleCallbacks[bundleId] || []).push(cb);
        // figure out which bundle to request and kick it off
        requestBundle(cmpMeta, bundleId);
      }
    }
    function requestBundle(cmpMeta, bundleId, url, tmrId, scriptElm) {
      // create the url we'll be requesting
      url = publicPath + bundleId + '.js';
      function onScriptComplete() {
        clearTimeout(tmrId);
        scriptElm.onerror = scriptElm.onload = null;
        domApi.$removeChild(domApi.$parentNode(scriptElm), scriptElm);
        // remove from our list of active requests
        pendingBundleRequests[url] = false;
      }
      if (!pendingBundleRequests[url]) {
        // we're not already actively requesting this url
        // let's kick off the bundle request and
        // remember that we're now actively requesting this url
        pendingBundleRequests[url] = true;
        // create a sript element to add to the document.head
        scriptElm = domApi.$createElement('script');
        scriptElm.charset = 'utf-8';
        scriptElm.async = true;
        scriptElm.src = url;
        // create a fallback timeout if something goes wrong
        tmrId = setTimeout(onScriptComplete, 12e4);
        // add script completed listener to this script element
        scriptElm.onerror = scriptElm.onload = onScriptComplete;
        // inject a script tag in the head
        // kick off the actual request
        domApi.$appendChild(domApi.$head, scriptElm);
      }
    }
    plt.attachStyles = function(cmpMeta, modeName, elm) {
      var templateElm = styleTemplates[cmpMeta.tagNameMeta + '_' + modeName] || styleTemplates[cmpMeta.tagNameMeta];
      if (templateElm) {
        var styleContainerNode = domApi.$head;
        if (domApi.$supportsShadowDom) {
          if (1 === cmpMeta.encapsulation) {
            styleContainerNode = elm.shadowRoot;
          } else {
            while (elm = domApi.$parentNode(elm)) {
              if (elm.host && elm.host.shadowRoot) {
                styleContainerNode = elm.host.shadowRoot;
                break;
              }
            }
          }
        }
        var appliedStyles = styleContainerNode._appliedStyles = styleContainerNode._appliedStyles || {};
        if (!appliedStyles[templateElm.id]) {
          // we haven't added these styles to this element yet
          var styleElm = templateElm.content.cloneNode(true);
          var insertReferenceNode = styleContainerNode.querySelector('[data-visibility]');
          domApi.$insertBefore(styleContainerNode, styleElm, insertReferenceNode && insertReferenceNode.nextSibling || styleContainerNode.firstChild);
          // remember we don't need to do this again for this element
          appliedStyles[templateElm.id] = true;
        }
      }
    };
    return plt;
  }
  var App = window[appNamespace] = window[appNamespace] || {};
  var plt = createPlatformClient(Context, App, window, document, publicPath, hydratedCssClass);
  plt.registerComponents(App.components).forEach(function(cmpMeta) {
    // es5 way of extending HTMLElement
    function HostElement(self) {
      return HTMLElement.call(this, self);
    }
    HostElement.prototype = Object.create(HTMLElement.prototype, {
      constructor: {
        value: HostElement,
        configurable: true
      }
    });
    plt.defineComponent(cmpMeta, HostElement);
  });
})(window, document, Context, appNamespace, publicPath);
})({},"iiifexplorer","hydrated","/build/iiifexplorer/",document);
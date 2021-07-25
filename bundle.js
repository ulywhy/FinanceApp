/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1,i$2,s$3,e$2;const o$3=globalThis.trustedTypes,l$2=o$3?o$3.createPolicy("lit-html",{createHTML:t=>t}):void 0,n$3=`lit$${(Math.random()+"").slice(9)}$`,h$2="?"+n$3,r$2=`<${h$2}>`,u=document,c=(t="")=>u.createComment(t),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,v=Array.isArray,a$2=t=>{var i;return v(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,$=/'/g,g=/"/g,y=/^(?:script|style|textarea)$/i,b=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),T=b(1),w=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),P=new WeakMap,V=(t,i,s)=>{var e,o;const l=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let n=l._$litPart$;if(void 0===n){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;l._$litPart$=n=new C(i.insertBefore(c(),t),t,void 0,s);}return n.I(t),n},E=u.createTreeWalker(u,129,null,!1),M=(t,i)=>{const s=t.length-1,e=[];let o,h=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let l,c,d=-1,v=0;for(;v<s.length&&(u.lastIndex=v,c=u.exec(s),null!==c);)v=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(o=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=o?o:f,d=-1):void 0===c[1]?d=-2:(d=u.lastIndex-c[2].length,l=c[1],u=void 0===c[3]?p:'"'===c[3]?g:$):u===g||u===$?u=p:u===_||u===m?u=f:(u=p,o=void 0);const a=u===p&&t[i+1].startsWith("/>")?" ":"";h+=u===f?s+r$2:d>=0?(e.push(l),s.slice(0,d)+"$lit$"+s.slice(d)+n$3+a):s+n$3+(-2===d?(e.push(void 0),i):a);}const c=h+(t[s]||"<?>")+(2===i?"</svg>":"");return [void 0!==l$2?l$2.createHTML(c):c,e]};class N{constructor({strings:t,_$litType$:i},s){let e;this.parts=[];let l=0,r=0;const u=t.length-1,d=this.parts,[v,a]=M(t,i);if(this.el=N.createElement(v,s),E.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(e=E.nextNode())&&d.length<u;){if(1===e.nodeType){if(e.hasAttributes()){const t=[];for(const i of e.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(n$3)){const s=a[r++];if(t.push(i),void 0!==s){const t=e.getAttribute(s.toLowerCase()+"$lit$").split(n$3),i=/([.?@])?(.*)/.exec(s);d.push({type:1,index:l,name:i[2],strings:t,ctor:"."===i[1]?I:"?"===i[1]?L:"@"===i[1]?R:H});}else d.push({type:6,index:l});}for(const i of t)e.removeAttribute(i);}if(y.test(e.tagName)){const t=e.textContent.split(n$3),i=t.length-1;if(i>0){e.textContent=o$3?o$3.emptyScript:"";for(let s=0;s<i;s++)e.append(t[s],c()),E.nextNode(),d.push({type:2,index:++l});e.append(t[i],c());}}}else if(8===e.nodeType)if(e.data===h$2)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=e.data.indexOf(n$3,t+1));)d.push({type:7,index:l}),t+=n$3.length-1;}l++;}}static createElement(t,i){const s=u.createElement("template");return s.innerHTML=t,s}}function S$1(t,i,s=t,e){var o,l,n,h;if(i===w)return i;let r=void 0!==e?null===(o=s.Σi)||void 0===o?void 0:o[e]:s.Σo;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(l=null==r?void 0:r.O)||void 0===l||l.call(r,!1),void 0===u?r=void 0:(r=new u(t),r.T(t,s,e)),void 0!==e?(null!==(n=(h=s).Σi)&&void 0!==n?n:h.Σi=[])[e]=r:s.Σo=r),void 0!==r&&(i=S$1(t,r.S(t,i.values),r,e)),i}class k{constructor(t,i){this.l=[],this.N=void 0,this.D=t,this.M=i;}u(t){var i;const{el:{content:s},parts:e}=this.D,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:u).importNode(s,!0);E.currentNode=o;let l=E.nextNode(),n=0,h=0,r=e[0];for(;void 0!==r;){if(n===r.index){let i;2===r.type?i=new C(l,l.nextSibling,this,t):1===r.type?i=new r.ctor(l,r.name,r.strings,this,t):6===r.type&&(i=new z(l,this,t)),this.l.push(i),r=e[++h];}n!==(null==r?void 0:r.index)&&(l=E.nextNode(),n++);}return o}v(t){let i=0;for(const s of this.l)void 0!==s&&(void 0!==s.strings?(s.I(t,s,i),i+=s.strings.length-2):s.I(t[i])),i++;}}class C{constructor(t,i,s,e){this.type=2,this.N=void 0,this.A=t,this.B=i,this.M=s,this.options=e;}setConnected(t){var i;null===(i=this.P)||void 0===i||i.call(this,t);}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(t,i=this){t=S$1(this,t,i),d(t)?t===A||null==t||""===t?(this.H!==A&&this.R(),this.H=A):t!==this.H&&t!==w&&this.m(t):void 0!==t._$litType$?this._(t):void 0!==t.nodeType?this.$(t):a$2(t)?this.g(t):this.m(t);}k(t,i=this.B){return this.A.parentNode.insertBefore(t,i)}$(t){this.H!==t&&(this.R(),this.H=this.k(t));}m(t){const i=this.A.nextSibling;null!==i&&3===i.nodeType&&(null===this.B?null===i.nextSibling:i===this.B.previousSibling)?i.data=t:this.$(u.createTextNode(t)),this.H=t;}_(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this.C(t):(void 0===e.el&&(e.el=N.createElement(e.h,this.options)),e);if((null===(i=this.H)||void 0===i?void 0:i.D)===o)this.H.v(s);else {const t=new k(o,this),i=t.u(this.options);t.v(s),this.$(i),this.H=t;}}C(t){let i=P.get(t.strings);return void 0===i&&P.set(t.strings,i=new N(t)),i}g(t){v(this.H)||(this.H=[],this.R());const i=this.H;let s,e=0;for(const o of t)e===i.length?i.push(s=new C(this.k(c()),this.k(c()),this,this.options)):s=i[e],s.I(o),e++;e<i.length&&(this.R(s&&s.B.nextSibling,e),i.length=e);}R(t=this.A.nextSibling,i){var s;for(null===(s=this.P)||void 0===s||s.call(this,!1,!0,i);t&&t!==this.B;){const i=t.nextSibling;t.remove(),t=i;}}}class H{constructor(t,i,s,e,o){this.type=1,this.H=A,this.N=void 0,this.V=void 0,this.element=t,this.name=i,this.M=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this.H=Array(s.length-1).fill(A),this.strings=s):this.H=A;}get tagName(){return this.element.tagName}I(t,i=this,s,e){const o=this.strings;let l=!1;if(void 0===o)t=S$1(this,t,i,0),l=!d(t)||t!==this.H&&t!==w,l&&(this.H=t);else {const e=t;let n,h;for(t=o[0],n=0;n<o.length-1;n++)h=S$1(this,e[s+n],i,n),h===w&&(h=this.H[n]),l||(l=!d(h)||h!==this.H[n]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[n+1]),this.H[n]=h;}l&&!e&&this.W(t);}W(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class I extends H{constructor(){super(...arguments),this.type=3;}W(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}W(t){t&&t!==A?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name);}}class R extends H{constructor(){super(...arguments),this.type=5;}I(t,i=this){var s;if((t=null!==(s=S$1(this,t,i,0))&&void 0!==s?s:A)===w)return;const e=this.H,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,l=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),l&&this.element.addEventListener(this.name,this,t),this.H=t;}handleEvent(t){var i,s;"function"==typeof this.H?this.H.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this.H.handleEvent(t);}}class z{constructor(t,i,s){this.element=t,this.type=6,this.N=void 0,this.V=void 0,this.M=i,this.options=s;}I(t){S$1(this,t);}}null===(i$2=(t$1=globalThis).litHtmlPlatformSupport)||void 0===i$2||i$2.call(t$1,N,C),(null!==(s$3=(e$2=globalThis).litHtmlVersions)&&void 0!==s$3?s$3:e$2.litHtmlVersions=[]).push("2.0.0-rc.2");

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e$1=Symbol();class n$2{constructor(t,n){if(n!==e$1)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t;}get styleSheet(){return t&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const s$2=t=>new n$2(t+"",e$1),o$2=new Map,r$1=(t,...s)=>{const r=s.reduce(((e,s,o)=>e+(t=>{if(t instanceof n$2)return t.cssText;if("number"==typeof t)return t;throw Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[o+1]),t[0]);let i=o$2.get(r);return void 0===i&&o$2.set(r,i=new n$2(r,e$1)),i},i$1=(e,n)=>{t?e.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((t=>{const n=document.createElement("style");n.textContent=t.cssText,e.appendChild(n);}));},S=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return s$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$1,e,h$1,r;const o$1={toAttribute(t,i){switch(i){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},n$1=(t,i)=>i!==t&&(i==i||t==t),l$1={attribute:!0,type:String,converter:o$1,reflect:!1,hasChanged:n$1};class a$1 extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u();}static addInitializer(t){var i;null!==(i=this.v)&&void 0!==i||(this.v=[]),this.v.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this.Πp(s,i);void 0!==e&&(this.Πm.set(e,s),t.push(e));})),t}static createProperty(t,i=l$1){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const h=this[t];this[i]=e,this.requestUpdate(t,h,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$1}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(S(i));}else void 0!==i&&s.push(S(i));return s}static Πp(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this.Πg=new Promise((t=>this.enableUpdating=t)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(t=this.constructor.v)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this.ΠU)&&void 0!==i?i:this.ΠU=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this.ΠU)||void 0===i||i.splice(this.ΠU.indexOf(t)>>>0,1);}Π_(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this.Πi.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return i$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0);}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)})),this.Πo=new Promise((t=>this.Πl=t));}attributeChangedCallback(t,i,s){this.K(t,s);}Πj(t,i,s=l$1){var e,h;const r=this.constructor.Πp(t,s);if(void 0!==r&&!0===s.reflect){const n=(null!==(h=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==h?h:o$1.toAttribute)(i,s.type);this.Πh=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this.Πh=null;}}K(t,i){var s,e,h;const r=this.constructor,n=r.Πm.get(t);if(void 0!==n&&this.Πh!==n){const t=r.getPropertyOptions(n),l=t.converter,a=null!==(h=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==h?h:o$1.fromAttribute;this.Πh=n,this[n]=a(i,t.type),this.Πh=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||n$1)(this[t],i)?(this.L.has(t)||this.L.set(t,i),!0===s.reflect&&this.Πh!==t&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this.Πg=this.Πq());}async Πq(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo;}catch(t){Promise.reject(t);}const t=this.performUpdate();return null!=t&&await t,!this.isUpdatePending}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((t,i)=>this[i]=t)),this.Πi=void 0);let i=!1;const s=this.L;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this.ΠU)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this.Π$();}catch(t){throw i=!1,this.Π$(),t}i&&this.E(s);}willUpdate(t){}E(t){var i;null===(i=this.ΠU)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}Π$(){this.L=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(t){return !0}update(t){void 0!==this.Πk&&(this.Πk.forEach(((t,i)=>this.Πj(i,this[i],t))),this.Πk=void 0),this.Π$();}updated(t){}firstUpdated(t){}}a$1.finalized=!0,a$1.shadowRootOptions={mode:"open"},null===(e=(s$1=globalThis).reactiveElementPlatformSupport)||void 0===e||e.call(s$1,{ReactiveElement:a$1}),(null!==(h$1=(r=globalThis).reactiveElementVersions)&&void 0!==h$1?h$1:r.reactiveElementVersions=[]).push("1.0.0-rc.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var i,l,o,s,n,a;(null!==(i=(a=globalThis).litElementVersions)&&void 0!==i?i:a.litElementVersions=[]).push("3.0.0-rc.1");class h extends a$1{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0;}createRenderRoot(){var t,e;const r=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=r.firstChild),r}update(t){const r=this.render();super.update(t),this.Φt=V(r,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.Φt)||void 0===t||t.setConnected(!1);}render(){return w}}h.finalized=!0,h._$litElement$=!0,null===(o=(l=globalThis).litElementHydrateSupport)||void 0===o||o.call(l,{LitElement:h}),null===(n=(s=globalThis).litElementPlatformSupport)||void 0===n||n.call(s,{LitElement:h});

class CallbackUtils{
    static log(value){
        console.log(value);
        return value
    }

    static getFirst(list){
        return list.length > 0 ? list[0]: null
    }

    static getJson(res){
        return res.json()
    }
}

const BudgetTypes = {
    Repeat: {
        DAILY:"daily",
        WEEKLY: "weekly",
        MONTHLY: "monthly",
        ONCE:  "once",
        //CUSTOM: "custom"
    },
    Type: {
        INCOME: "income",
        OUTCOME: "outcome"
    }
};

class BudgetEntry {
    _id;
    amount;
    repeat;
    type;
    date;
    monthId;

    constructor(_id='', amount=0, 
        repeat=BudgetTypes.Repeat.ONCE, 
        type=BudgetTypes.Type.OUTCOME,
        date=DateTime.now().toISODate(), monthId = undefined){
        this._id = _id;
        this.setAmount(amount);
        this.setRepeat(repeat);
        this.setType(type);
        this.setDate(date);
        this.monthId = monthId;
    }

    static from(obj){
        return new BudgetEntry(obj._id,
            obj.amount, 
            BudgetTypes.Repeat[obj.repeat],
            BudgetTypes.Type[obj.type],
            obj.date, obj.monthId);
    }

    getAmount(){
        return this.amount.toString();
    }

    setAmount(amount){
        if(amount < 0) return false;
        this.amount = amount;
        return true;
    }

    getReat(){
        return this.repeat;
    }

    setRepeat(repeat){
        this.repeat = repeat;
    }

    getType(){
        return this.type;
    }

    setType(type){
        this.type = type;
    }

    getDate(){
        return DateTime.fromISO(this.date);
    }

    setDate(date){
        if(typeof date === 'DateTime'){
            this.date = date.toISODate(date);
        }else {
            this.date= date;
        }
    }
}

const headers$2 = {
    'content-type': 'application/json',
    'accept': 'application/json',
    'x-apikey': '60eb08ef6661365596af552e'
};
const baseUrl$1 = 'https://finances-08bd.restdb.io/';
const guserUrl$1 = baseUrl$1 + 'rest/gusers';

class GUsersCrud {

    static insertOne(guser){
        let body = new Array(guser);
        return fetch(guserUrl$1, {
            mode: 'cors',
            method: 'POST',
            headers: headers$2,
            body: JSON.stringify(body)
        })
        .then(CallbackUtils.getJson)
        .then(CallbackUtils.getFirst)
        .catch(err => console.err(err))
    }

    static  getOneById(id){
        let queryObj = {
            id:  id
        };
        let query = '?q=' + JSON.stringify(queryObj);

        return fetch(guserUrl$1+query, {
            mode: 'cors',
            method: 'GET',
            headers: headers$2,
        })
        .then(CallbackUtils.getJson)
        .then(CallbackUtils.log)
        .then(CallbackUtils.getFirst)
        .then(CallbackUtils.log)
        .catch(err => console.log(err))
    }
}

class GUser{
    static current;
    
    _id;
    id;
    name;
    email;
    image;


    constructor(_id, id, name, email, image){
        this._id = _id;
        this.id = id;
        this.name = name;
        this.email = email;
        this.image = image;
    }
  
}

class MonthlyBudget{
    _id;
    userId;
    date;
    total;
    budgets;
    
    constructor(_id, userId, date = DateTime.now().toISODate(), total = 0, budgets = new Array()){
        this._id = _id;
        this.userId = userId;
        this.date = DateTime.fromISO(date).set({day: 1}).toISODate();
        this.total = total;
        this.budgets = budgets;
    }

    static from(obj){
        return new MonthlyBudget(obj._id, obj.userId, obj.date, obj.total, obj.budgets)
    }
  
    getDateTime(){
        return DateTime.fromISO(this.date)
    }
}

const headers$1 = {
    'content-type': 'application/json',
    'accept': 'application/json',
    'x-apikey': '60eb08ef6661365596af552e'
};
const baseUrl = 'https://finances-08bd.restdb.io/';
const monthlyUrl = baseUrl + 'rest/monthly';

class MonthlyCrud {

    static async insertOne(month){
        console.log("saving monthly budget");
        let body = new Array(month);
        return await fetch(monthlyUrl, {
            mode: 'cors',
            method: 'POST',
            headers: headers$1,
            body: JSON.stringify(body)
        })
        .then(getJson)
        .then(CallbackUtils.log)
        .then(getFirst)
        .catch(err => console.err(err))
    }

    static async getOneById(id){
        let queryObj = {
            id:  id
        };
        let query = '?q=' + JSON.stringify(queryObj);

        let month = fetch(guserUrl+query, {
            mode: 'cors',
            method: 'GET',
            headers: headers$1,
        })
        .then(res => res.json())
        .then(getFirst)
        .catch(err => console.log(err));
        return month
    }

    static async getOneByDate(date){

        let queryObj = {
            date : {
                $date: DateTime.fromISO(date).set({day:1}).toISODate()
            }
        };

        let query = '?q=' + JSON.stringify(queryObj);
        
        console.log(query);
        return fetch(monthlyUrl + query, {
            mode: 'cors',
            method: 'GET',
            headers: headers$1,
        })
        .then(getJson)
        .then(listToMonths)
        .catch(err => console.log(err))
    }

    static getAllByPeriod(from, to){
        let queryObj = {
            "date" : {
                "$gte":{
                    "$date": from.set({day: 1}).toISODate()
                },
                "$lte":{
                    "$date": to.plus({month: 1}).set({day: 1}).toISODate()
                }
            }
        };
        let query = '?q=' + JSON.stringify(queryObj);
        
        return fetch(monthlyUrl + query, {
            mode: 'cors',
            method: 'GET',
            headers: headers$1,
        })
        .then(getJson)
        .then(log)
        .then(listToMonths)
        .then(log)
        .catch(err => console.log(err))
    }

    static getRecent(count){
        
        let query = '?max=' + count + '&sort=date';
        
        return fetch(monthlyUrl + query, {
            mode: 'cors',
            method: 'GET',
            headers: headers$1,
        })
        .then(getJson)
        .then(listToMonths)
        .then(log)
        .catch(err => console.log(err))
    }

}

function listToMonths(list){
    return list.map(l => MonthlyBudget.from(l))
}

function log(value){
    console.log(value);
    return value
}

function getFirst(list){
    return list.length > 0 ? list[0]: null
}

function getJson(res){
    return res.json()
}

const headers = {
    'content-type': 'application/json',
    'accept': 'application/json',
    'x-apikey': '60eb08ef6661365596af552e'
};

class Crud {

    static async insertBudgetEntry(entry){
        delete entry._id;
        
        
        entry.userId = GUser.current._id;
        let body = new Array(entry);
        
        return fetch('https://finances-08bd.restdb.io/rest/budget', {
            mode: 'cors',
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        })
        .then(CallbackUtils.getJson)
        .then(CallbackUtils.getFirst)
        .then(CallbackUtils.log)
        .catch(CallbackUtils.log)
    }

    static insertChildBudgetEntry(entry){
        return fetch('https://finances-08bd.restdb.io/rest/budget', {
            mode: 'cors',
            method: 'POST',
            headers: headers,
            body: JSON.stringify(entry)
        })
        .then(res => res.json())
        .catch(err => console.err(err))
    }
    static updateBudgetEntry(entry){

        return fetch('https://finances-08bd.restdb.io/rest/budget/'+ entry._id, {
            mode: 'cors',
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(entry)
        })
        .then(res => res.json())
        .catch(err => console.err(err))
    }


    static async deleteBudgetEntry(id){

        return fetch('https://finances-08bd.restdb.io/rest/budget/'+id, {
            mode: 'cors',
            method: 'DELETE',
            headers: headers,
        })
        .then(res => res.json())
        .then(deletes => deletes.result.includes(id))
        .catch(err => console.log(err))
    }
    static  getBudgets(queryParams={}){
        let query = '?' + JSON.stringify(queryParams);
        return fetch('https://finances-08bd.restdb.io/rest/budget'+query, {
            mode: 'cors',
            method: 'GET',
            headers: headers,
        })
        .then(res => res.json())
        .then(list => list.map(b => BudgetEntry.from(b)))
        .catch(err => console.log(err))
    }

    static  getBudgetsByDatePeriod(from, to){
        let queryObj = {
            "date" : {
                "$gte":{
                    "$date": from.set({day: 1, hour: 0, minute: 0, second: 0}).toISO()
                },
                "$lte":{
                    "$date": to.plus({month: 1}).set({day: 1, hour: 0, minute: 0, second: 0}).toISO()
                }
            }
        };
        return Crud.getBudgets(queryObj)
    }


 }

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

class PanelElement extends h {
  static get styles() {
    return r$1`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
      }
    `;
  }

  static get properties() {
    return {
      budgets: {type: Array},
    };
  }

  constructor() {
    super();
    this.budgets = new Array();
  }

  async firstUpdated() {
    super.firstUpdated();
    this.budgets = await Crud.getBudgets();
  }

  updateBudget(event){
    let id = event.target.getAttribute('data-budget-id');
    let budget = this.budgets.find(b => b.id === id);
    this.dispatchEvent(
      new CustomEvent('updateBudget', { 
        detail: budget,
        bubbles: true, 
        composed: true })
    );
  }

  async deleteBudget(event){
    let id = event.target.getAttribute('data-budget-id');
    if(await Crud.deleteBudgetEntry(id)){
      this.budgets.splice(this.budgets.findIndex(b => b.id === id), 1);
      this.requestUpdate();
    }
  }
  
  render() {
    return T`
      <h1>History</h1>
      <table>
        <thead>
            <tr>
              <th>amount</th>
              <th>type</th>
              <th>repeat</th>
              <th>date</th>
          </tr>
        </thead>
        <tbody>
          ${this.budgets.map(budget => T`
            <tr>         
              <td>${budget.amount}</td>
              <td>${budget.type}</td>
              <td>${budget.repeat}</td>
              <td>${budget.date}</td>
              <td>
                <button data-budget-id=${budget.id} @click=${this.updateBudget}>edit</button>
              </td>
              <td>
                <button data-budget-id=${budget.id} @click=${this.deleteBudget}>delete</button>
              </td>
            </tr>  
          `)}
        </tbody>
        <tfoot>
          <tr>
            <td>income:</td>
            <td>
              ${this.budgets.filter(b => b.type === BudgetTypes.Type.INCOME).map(i => i.amount).reduce((t, a) => a + t, 0)}
            </td>
            <td>outcome:</td>
            <td>
              ${this.budgets.filter(b => b.type === BudgetTypes.Type.OUTCOME).map(i => i.amount).reduce((t, a) => a + t, 0)}
            </td>
          </tr>
          <tr>
            <td>balance</td>
            <td>
              ${this.budgets.map(b => b.type === BudgetTypes.Type.OUTCOME ? -b.amount : b.amount).reduce((t, a)=> a + t, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    `;
  }
}

window.customElements.define('panel-element', PanelElement);

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
class EditBudgetBoard extends h {
  static get styles() {
    return r$1`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
      }
      table{
        overflow-y: auto;
      }
    `;
  }

  static get properties() {
    return {
      amount:Number,
      type:Object,
      repeat:Object,
      date:String,
      id:String
    };
  }

  constructor() {
    super();
  }

  reset(){
    this.requestUpdate();
  }
  /* Event Listener*/
  updateAmount(){
    let amount = parseFloat(this.getAmountElement().value);
    this.amount = amount;
  }
  updateRepeat(event){
    this.getRadioElements('repeat')
      .filter(e => e != event.target)
      .forEach(e => e.checked = false);

    this.repeat = event.target.value;
  }
  updateType(event){
    this.getRadioElements('type')
      .filter(e => e != event.target)
      .forEach(e => e.checked = false);

    this.type = event.target.value;
  }
  updateDate(){
    this.date = this.shadowRoot.getElementById('date').value;
  }  

  /* Dispatch events */
  async save(event){
    console.log(this.date);
    this.dispatchEvent(new CustomEvent('saveBudget', {
      detail: new BudgetEntry(0, this.amount, this.repeat, this.type, this.date),
      bubbles: true, 
      composed: true })
    );
  }

  /* view Queries */
  getAmountElement(){
    return this.getElementById("amount")
  }
  getTypeElement(){
    return this.getRadioCheckedElement('type')
  }
  getRepeatElement(){
    return this.getRadioCheckedElement('repeat')
  }

  getElementById(id){
    return this.shadowRoot.getElementById(id)
  }
  getRadioElements(className){
    return Array.from(this.shadowRoot.querySelectorAll('.'+className)) 
  }
  getRadioCheckedElement(name){
      return this.shadowRoot.querySelector('.'+name+':checked')  
  }

  render() {
    return T`
    <h1>budget entry</h1>
    <div>
      <input id="amount" type="number" @change=${this.updateAmount}   value=${this.amount}>
    </div>
    <div>
      ${Object.entries(BudgetTypes.Repeat).map((entry) => T`         
        <label>
            <input type="radio" class="repeat" ?checked=${this.repeat === BudgetTypes.Repeat[entry[0]]} 
              @change=${this.updateRepeat} value=${entry[0]}> ${entry[1]}
        </label>
      `)}
    </div>
    <div>
      ${Object.entries(BudgetTypes.Type).map((entry) => T`         
        <label>
            <input type="radio" class="type" ?checked=${this.type === BudgetTypes.Type[entry[0]]}
              @change=${this.updateType} value=${entry[0]}> ${entry[1]}
        </label>
      `)}
    </div>
    <div>
      <input type="date" id="date" @change=${this.updateDate} .value=${this.date}>
     </div>
    <div>
      <button @click=${this.save} ?enabled=${this.enabled}>${this.id ? 'update' : 'save'}</button>
      <button @click=${this.reset} ?hidden=${this.id == undefined}>clear</button>
    </div>
    `;
  }

}

window.customElements.define('edit-budget-board', EditBudgetBoard);

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
class EditBudgetBoardController extends h {
  static get styles() {
    return r$1`
      :host {
        display: block;
        padding: 0px;
        max-width: 800px;
      }
    `;
  }

  static get properties() {
    return {
      guser:Object,
      budgetEntry: {type: Object}
    };
  }

  constructor() {
    super();
    this.budgetEntry = new BudgetEntry();
  }  

  /* CRUD ACTIONS */
  async save(event){
    this.budgetEntry = event.detail;
    let success = false;
    if(this.budgetEntry._id.lenght > 0){
      success = await Crud.updateBudgetEntry(this.budgetEntry);
    }else {
      success = await Crud.insertBudgetEntry(this.budgetEntry, GUser.current._id);
    }

    if(success){
      this.reset();
      this.dispatchEvent(new CustomEvent('budgetCreated', {
        detail: success,
        bubbles: true, 
        composed: true })
      );
      }
  }

  
  reset(){
    this.budgetEntry = new BudgetEntry();
    this.getBudgetBoard().reset();
  }


  getBudgetBoard(){
    return this.shadowRoot.getElementById('edit-budget-board')
  }
  render() {
    return T`
      <edit-budget-board id="edit-budget-board"
        .amount=${this.budgetEntry.amount}
        .id=${this.budgetEntry._id}
        .date=${this.budgetEntry.date}
        .repeat=${this.budgetEntry.repeat}
        .type=${this.budgetEntry.type}
        @saveBudget=${this.save}></edit-budget-board>    
    `;
  }
}

window.customElements.define('edit-budget', EditBudgetBoardController);

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

class CalendarMonthPanel extends h {
  static get styles() {
    return r$1`
      :host {
        display: block;
        border: solid 1px gray;
        border-radius: 5px;
        padding: 0px;
      }
      .income,
      .outcome,
      .balance{
        border:solid 1px;
        border-radius: 5px;
      }
      .income{
        border-color: green;
      }
      .outcome{
        border-color: red;
      }
      .balance{
        border-color: blue;
      }
    `;
  }

  static get properties() {
    return {
      month: Object,
      incomes: Array,
      outcomes: Array,
      total: Number
    };
  }

  constructor() {
    super();
    this.total = 0;
  }

  getIncomeBudgets(){
    console.log(this.month);
    return Crud.getBudgets({})
  }

  getOutcomeBudgets(){

  }

  render() {
    return T`
      <table>
        <thead>
            <tr>
                <th>${this.month.getDateTime().monthLong}</th>
            </tr>
        </thead>
        <tbody>
          <tr>
          </tr>  
        </tbody>
        <tfoot>
          <tr>
            <td class="income">
              ${this.month.budgets.filter(m => m.type === BudgetTypes.Type.INCOME).map(i => i.amount).reduce((t, a) => a + t, 0)}
            </td>
            <td class="outcome">
            ${this.month.budgets.filter(m => m.type === BudgetTypes.Type.OUTCOME).map(i => i.amount).reduce((t, a) => a + t, 0)}
            </td>
          </tr>
          <tr>
            <td class="balance">
              ${this.month.total}
            </td>
          </tr>
        </tfoot>
      </table>
    `;
  }

}

window.customElements.define('calendar-month-panel', CalendarMonthPanel);

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

class CalendarMonthPanelExtended extends h {
  static get styles() {
    return r$1`
      :host {
        display: block;
        border: solid 1px gray;
        border-radius: 5px;
        padding: 1vw;
        width: 30vw;
      }
      .income,
      .outcome,
      .balance{
        border:solid 1px;
        border-radius: 5px;
      }
      .income{
        border-color: green;
      }
      .outcome{
        border-color: red;
      }
      .balance{
        border-color: blue;
      }
    `;
  }

  static get properties() {
    return {
      month: Object,
      period: Object
    };
  }

  constructor() {
    super();
  }

  render() {
    return T`
      <table>
        <thead>
            <tr>
                <th>${this.month.getDateTime().monthLong}</th>
            </tr>
        </thead>
        <tbody>
          <tr>
          </tr>  
        </tbody>
        <tfoot>
          <tr>
            <td class="income">
              ${this.month.budgets.filter(b => b.type === BudgetTypes.Type.INCOME).map(i => i.amount).reduce((t, a) => a + t, 0)}
            </td>
            <td class="outcome">
              ${this.month.budgets.filter(b => b.type === BudgetTypes.Type.OUTCOME).map(i => i.amount).reduce((t, a) => a + t, 0)}
            </td>
          </tr>
          <tr>
            <td class="balance">
              ${this.month.total}
            </td>
          </tr>
        </tfoot>
      </table>
    `;
  }

}

window.customElements.define('calendar-month-panel-extended', CalendarMonthPanelExtended);

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

class CalendarPanel extends h {
  static get styles() {
    return r$1`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 0px;
      }
      .flex{
        display: flex;
      }
      .flex-row{
        flex-direction: row;
      }
      .flex-wrap{
        flex-wrap: wrap;
      }
      .space-between{
        justify-content: space-between;
      }
      .month{
        flex-grow: 1;
        margin: .2em;
      }
      .main-month{
        width: 100%;
      }
    `;
  }

  static get properties() {
    return {
      months: {type: Array},
      dateNow: Object,
      dateBefore: Object,
      dateAfter: Object,
      period: Object,
      currentPeriod: Object
    };
  }

  constructor() {
    super();
    this.months = new Array();
    this.dateNow = DateTime.now().set({day: 1, hour:0, minute:0, second:0});
    this.dateBefore = this.dateNow.minus({months : 3});
    this.dateAfter = this.dateNow.plus({months : 4});
    this.period = Interval.fromDateTimes(this.dateBefore, this.dateAfter).splitBy({month: 1});
    this.currentPeriod = this.period.find(p => p.contains(this.dateNow));
    this.initMonths();
  }

  async initMonths(){
    this.months = await MonthlyCrud.getRecent(7);
    this.currentMonth = this.months.find(m => this.currentPeriod.contains(m.getDateTime()));
  }

  reload(){
    this.initMonths();
  }

  render() {
    return T`
      <div class="flex flex-row flex-wrap space-between">
      
        ${this.months.filter(m => this.currentPeriod.isAfter(m.getDateTime()))
          .map(m => T `
              <calendar-month-panel class="month" .month=${m}></calendar-month-panel>
          `)}

        <calendar-month-panel-extended class="month main-month" .month=${this.currentMonth ? this.currentMonth : new MonthlyBudget()}></calendar-month-panel-extended>

        ${this.months.filter(m => this.currentPeriod.isBefore(m.getDateTime()))
          .map(m => T `
              <calendar-month-panel class="month" .month=${m}></calendar-month-panel>
          `)}
      </div>
    `;
  }

}

window.customElements.define('calendar-panel', CalendarPanel);

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

class DashboardElement extends h {
  static get styles() {
    return r$1`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 0px;
      }
    `;
  }

  static get properties() {
    return {
      user: Object
    };
  }

  constructor() {
    super();
  }

  async firstUpdated() {
    super.firstUpdated();
    this.budgets = await Crud.getBudgets();
  }

  async setUser(user){
    if(user == null){
      GUser.current = null;
    }else {
      let result = await GUsersCrud.getOneById(user.getId());

      if(result != null){
        GUser.current = result;
      }else {
        GUser.current = await GUsersCrud.insertOne(new GUser(null, user.getId(), user.getName(), user.getEmail(), user.getImageUrl()));
        console.log(GUser.current);
      }
    }
  }

  updateBudgetHandler(event){
    let editBoard = this.shadowRoot.getElementById('edit-board');
    editBoard.budgetEntry = event.detail;
  }
  
  refresh(){
    let editBoard = this.shadowRoot.getElementById('calendar-panel');
    editBoard.reload();
  }

  render() {
    return T`
    <div ?hidden=${this.user === null}>
      <edit-budget id="edit-board" @budgetCreated=${this.refresh}></edit-budget>
      <calendar-panel id="calendar-panel"></calendar-panel>
      <!--panel-element @updateBudget=${this.updateBudgetHandler}></panel-element-->
    </div>
    `;
  }

}

window.customElements.define('dashboard-element', DashboardElement);

export { DashboardElement };

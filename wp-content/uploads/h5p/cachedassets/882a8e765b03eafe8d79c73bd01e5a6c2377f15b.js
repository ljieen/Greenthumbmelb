var H5P = H5P || {};

/**
 * H5P Link Library Module.
 */
H5P.Link = (function ($) {

  /**
   * Link constructor.
   *
   * @param {Object} parameters
   */
  function Link(parameters) {
    // Add default parameters
    parameters = $.extend(true, {
      title: 'New link',
      linkWidget: {
        protocol: '',
        url: ''
      }
    }, parameters);

    var url = '';
    if (parameters.linkWidget.protocol !== 'other') {
       url += parameters.linkWidget.protocol;
    }
    url += parameters.linkWidget.url;

    /**
     * Public. Attach.
     *
     * @param {jQuery} $container
     */
    this.attach = function ($container) {
      var sanitizedUrl = sanitizeUrlProtocol(url);
      $container.addClass('h5p-link').html('<a href="' + sanitizedUrl + '" target="_blank">' + parameters.title + '</a>')
                .keypress(function (event) {
                  if (event.which === 32) {
                    this.click();
                  }
                });
    };

    /**
     * Return url
     *
     * @returns {string}
     */
    this.getUrl = function () {
      return url;
    };

    /**
     * Private. Remove illegal url protocols from uri
     */
    var sanitizeUrlProtocol = function(uri) {
      var allowedProtocols = ['http', 'https', 'ftp', 'irc', 'mailto', 'news', 'nntp', 'rtsp', 'sftp', 'ssh', 'tel', 'telnet', 'webcal'];

      var first = true;
      var before = '';
      while (first || uri != before) {
        first = false;
        before = uri;
        var colonPos = uri.indexOf(':');
        if (colonPos > 0) {
          // We found a possible protocol
          var protocol = uri.substr(0, colonPos);
          // If the colon is preceeded by a hash, slash or question mark it isn't a protocol
          if (protocol.match(/[/?#]/g)) {
            break;
          }
          // Is this a forbidden protocol?
          if (allowedProtocols.indexOf(protocol.toLowerCase()) == -1) {
            // If illegal, remove the protocol...
            uri = uri.substr(colonPos + 1);
          }
        }
      }
      return uri;
    };
  }

  return Link;
})(H5P.jQuery);
;
H5P.AdvancedText = (function ($, EventDispatcher) {

  /**
   * A simple library for displaying text with advanced styling.
   *
   * @class H5P.AdvancedText
   * @param {Object} parameters
   * @param {Object} [parameters.text='New text']
   * @param {number} id
   */
  function AdvancedText(parameters, id) {
    var self = this;
    EventDispatcher.call(this);

    var html = (parameters.text === undefined ? '<em>New text</em>' : parameters.text);

    /**
     * Wipe container and add text html.
     *
     * @alias H5P.AdvancedText#attach
     * @param {H5P.jQuery} $container
     */
    self.attach = function ($container) {
      $container.addClass('h5p-advanced-text').html(html);
    };
  }

  AdvancedText.prototype = Object.create(EventDispatcher.prototype);
  AdvancedText.prototype.constructor = AdvancedText;

  return AdvancedText;

})(H5P.jQuery, H5P.EventDispatcher);
;
var oldTether = window.Tether;
!function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e(require,exports,module):t.Tether=e()}(this,function(t,e,o){"use strict";function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t){var e=getComputedStyle(t),o=e.position;if("fixed"===o)return t;for(var i=t;i=i.parentNode;){var n=void 0;try{n=getComputedStyle(i)}catch(r){}if("undefined"==typeof n||null===n)return i;var s=n.overflow,a=n.overflowX,f=n.overflowY;if(/(auto|scroll)/.test(s+f+a)&&("absolute"!==o||["relative","absolute","fixed"].indexOf(n.position)>=0))return i}return document.body}function r(t){var e=void 0;t===document?(e=document,t=document.documentElement):e=t.ownerDocument;var o=e.documentElement,i={},n=t.getBoundingClientRect();for(var r in n)i[r]=n[r];var s=x(e);return i.top-=s.top,i.left-=s.left,"undefined"==typeof i.width&&(i.width=document.body.scrollWidth-i.left-i.right),"undefined"==typeof i.height&&(i.height=document.body.scrollHeight-i.top-i.bottom),i.top=i.top-o.clientTop,i.left=i.left-o.clientLeft,i.right=e.body.clientWidth-i.width-i.left,i.bottom=e.body.clientHeight-i.height-i.top,i}function s(t){return t.offsetParent||document.documentElement}function a(){var t=document.createElement("div");t.style.width="100%",t.style.height="200px";var e=document.createElement("div");f(e.style,{position:"absolute",top:0,left:0,pointerEvents:"none",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),e.appendChild(t),document.body.appendChild(e);var o=t.offsetWidth;e.style.overflow="scroll";var i=t.offsetWidth;o===i&&(i=e.clientWidth),document.body.removeChild(e);var n=o-i;return{width:n,height:n}}function f(){var t=void 0===arguments[0]?{}:arguments[0],e=[];return Array.prototype.push.apply(e,arguments),e.slice(1).forEach(function(e){if(e)for(var o in e)({}).hasOwnProperty.call(e,o)&&(t[o]=e[o])}),t}function h(t,e){if("undefined"!=typeof t.classList)e.split(" ").forEach(function(e){e.trim()&&t.classList.remove(e)});else{var o=new RegExp("(^| )"+e.split(" ").join("|")+"( |$)","gi"),i=u(t).replace(o," ");p(t,i)}}function l(t,e){if("undefined"!=typeof t.classList)e.split(" ").forEach(function(e){e.trim()&&t.classList.add(e)});else{h(t,e);var o=u(t)+(" "+e);p(t,o)}}function d(t,e){if("undefined"!=typeof t.classList)return t.classList.contains(e);var o=u(t);return new RegExp("(^| )"+e+"( |$)","gi").test(o)}function u(t){return t.className instanceof SVGAnimatedString?t.className.baseVal:t.className}function p(t,e){t.setAttribute("class",e)}function c(t,e,o){o.forEach(function(o){-1===e.indexOf(o)&&d(t,o)&&h(t,o)}),e.forEach(function(e){d(t,e)||l(t,e)})}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function g(t,e){var o=void 0===arguments[2]?1:arguments[2];return t+o>=e&&e>=t-o}function m(){return"undefined"!=typeof performance&&"undefined"!=typeof performance.now?performance.now():+new Date}function v(){for(var t={top:0,left:0},e=arguments.length,o=Array(e),i=0;e>i;i++)o[i]=arguments[i];return o.forEach(function(e){var o=e.top,i=e.left;"string"==typeof o&&(o=parseFloat(o,10)),"string"==typeof i&&(i=parseFloat(i,10)),t.top+=o,t.left+=i}),t}function y(t,e){return"string"==typeof t.left&&-1!==t.left.indexOf("%")&&(t.left=parseFloat(t.left,10)/100*e.width),"string"==typeof t.top&&-1!==t.top.indexOf("%")&&(t.top=parseFloat(t.top,10)/100*e.height),t}function b(t,e){return"scrollParent"===e?e=t.scrollParent:"window"===e&&(e=[pageXOffset,pageYOffset,innerWidth+pageXOffset,innerHeight+pageYOffset]),e===document&&(e=e.documentElement),"undefined"!=typeof e.nodeType&&!function(){var t=r(e),o=t,i=getComputedStyle(e);e=[o.left,o.top,t.width+o.left,t.height+o.top],U.forEach(function(t,o){t=t[0].toUpperCase()+t.substr(1),"Top"===t||"Left"===t?e[o]+=parseFloat(i["border"+t+"Width"]):e[o]-=parseFloat(i["border"+t+"Width"])})}(),e}var w=function(){function t(t,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,o,i){return o&&t(e.prototype,o),i&&t(e,i),e}}(),C=void 0;"undefined"==typeof C&&(C={modules:[]});var O=function(){var t=0;return function(){return++t}}(),E={},x=function(t){var e=t._tetherZeroElement;"undefined"==typeof e&&(e=t.createElement("div"),e.setAttribute("data-tether-id",O()),f(e.style,{top:0,left:0,position:"absolute"}),t.body.appendChild(e),t._tetherZeroElement=e);var o=e.getAttribute("data-tether-id");if("undefined"==typeof E[o]){E[o]={};var i=e.getBoundingClientRect();for(var n in i)E[o][n]=i[n];T(function(){delete E[o]})}return E[o]},A=[],T=function(t){A.push(t)},S=function(){for(var t=void 0;t=A.pop();)t()},W=function(){function t(){i(this,t)}return w(t,[{key:"on",value:function(t,e,o){var i=void 0===arguments[3]?!1:arguments[3];"undefined"==typeof this.bindings&&(this.bindings={}),"undefined"==typeof this.bindings[t]&&(this.bindings[t]=[]),this.bindings[t].push({handler:e,ctx:o,once:i})}},{key:"once",value:function(t,e,o){this.on(t,e,o,!0)}},{key:"off",value:function(t,e){if("undefined"==typeof this.bindings||"undefined"==typeof this.bindings[t])if("undefined"==typeof e)delete this.bindings[t];else for(var o=0;o<this.bindings[t].length;)this.bindings[t][o].handler===e?this.bindings[t].splice(o,1):++o}},{key:"trigger",value:function(t){if("undefined"!=typeof this.bindings&&this.bindings[t])for(var e=0;e<this.bindings[t].length;){var o=this.bindings[t][e],i=o.handler,n=o.ctx,r=o.once,s=n;"undefined"==typeof s&&(s=this);for(var a=arguments.length,f=Array(a>1?a-1:0),h=1;a>h;h++)f[h-1]=arguments[h];i.apply(s,f),r?this.bindings[t].splice(e,1):++e}}}]),t}();C.Utils={getScrollParent:n,getBounds:r,getOffsetParent:s,extend:f,addClass:l,removeClass:h,hasClass:d,updateClasses:c,defer:T,flush:S,uniqueId:O,Evented:W,getScrollBarSize:a};var M=function(){function t(t,e){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(f){n=!0,r=f}finally{try{!i&&a["return"]&&a["return"]()}finally{if(n)throw r}}return o}return function(e,o){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,o);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),w=function(){function t(t,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,o,i){return o&&t(e.prototype,o),i&&t(e,i),e}}();if("undefined"==typeof C)throw new Error("You must include the utils.js file before tether.js");var P=C.Utils,n=P.getScrollParent,r=P.getBounds,s=P.getOffsetParent,f=P.extend,l=P.addClass,h=P.removeClass,c=P.updateClasses,T=P.defer,S=P.flush,a=P.getScrollBarSize,k=function(){for(var t=document.createElement("div"),e=["transform","webkitTransform","OTransform","MozTransform","msTransform"],o=0;o<e.length;++o){var i=e[o];if(void 0!==t.style[i])return i}}(),B=[],_=function(){B.forEach(function(t){t.position(!1)}),S()};!function(){var t=null,e=null,o=null,i=function n(){return"undefined"!=typeof e&&e>16?(e=Math.min(e-16,250),void(o=setTimeout(n,250))):void("undefined"!=typeof t&&m()-t<10||("undefined"!=typeof o&&(clearTimeout(o),o=null),t=m(),_(),e=m()-t))};["resize","scroll","touchmove"].forEach(function(t){window.addEventListener(t,i)})}();var z={center:"center",left:"right",right:"left"},F={middle:"middle",top:"bottom",bottom:"top"},L={top:0,left:0,middle:"50%",center:"50%",bottom:"100%",right:"100%"},Y=function(t,e){var o=t.left,i=t.top;return"auto"===o&&(o=z[e.left]),"auto"===i&&(i=F[e.top]),{left:o,top:i}},H=function(t){var e=t.left,o=t.top;return"undefined"!=typeof L[t.left]&&(e=L[t.left]),"undefined"!=typeof L[t.top]&&(o=L[t.top]),{left:e,top:o}},X=function(t){var e=t.split(" "),o=M(e,2),i=o[0],n=o[1];return{top:i,left:n}},j=X,N=function(){function t(e){var o=this;i(this,t),this.position=this.position.bind(this),B.push(this),this.history=[],this.setOptions(e,!1),C.modules.forEach(function(t){"undefined"!=typeof t.initialize&&t.initialize.call(o)}),this.position()}return w(t,[{key:"getClass",value:function(){var t=void 0===arguments[0]?"":arguments[0],e=this.options.classes;return"undefined"!=typeof e&&e[t]?this.options.classes[t]:this.options.classPrefix?this.options.classPrefix+"-"+t:t}},{key:"setOptions",value:function(t){var e=this,o=void 0===arguments[1]?!0:arguments[1],i={offset:"0 0",targetOffset:"0 0",targetAttachment:"auto auto",classPrefix:"tether"};this.options=f(i,t);var r=this.options,s=r.element,a=r.target,h=r.targetModifier;if(this.element=s,this.target=a,this.targetModifier=h,"viewport"===this.target?(this.target=document.body,this.targetModifier="visible"):"scroll-handle"===this.target&&(this.target=document.body,this.targetModifier="scroll-handle"),["element","target"].forEach(function(t){if("undefined"==typeof e[t])throw new Error("Tether Error: Both element and target must be defined");"undefined"!=typeof e[t].jquery?e[t]=e[t][0]:"string"==typeof e[t]&&(e[t]=document.querySelector(e[t]))}),l(this.element,this.getClass("element")),this.options.addTargetClasses!==!1&&l(this.target,this.getClass("target")),!this.options.attachment)throw new Error("Tether Error: You must provide an attachment");this.targetAttachment=j(this.options.targetAttachment),this.attachment=j(this.options.attachment),this.offset=X(this.options.offset),this.targetOffset=X(this.options.targetOffset),"undefined"!=typeof this.scrollParent&&this.disable(),this.scrollParent="scroll-handle"===this.targetModifier?this.target:n(this.target),this.options.enabled!==!1&&this.enable(o)}},{key:"getTargetBounds",value:function(){if("undefined"==typeof this.targetModifier)return r(this.target);if("visible"===this.targetModifier){if(this.target===document.body)return{top:pageYOffset,left:pageXOffset,height:innerHeight,width:innerWidth};var t=r(this.target),e={height:t.height,width:t.width,top:t.top,left:t.left};return e.height=Math.min(e.height,t.height-(pageYOffset-t.top)),e.height=Math.min(e.height,t.height-(t.top+t.height-(pageYOffset+innerHeight))),e.height=Math.min(innerHeight,e.height),e.height-=2,e.width=Math.min(e.width,t.width-(pageXOffset-t.left)),e.width=Math.min(e.width,t.width-(t.left+t.width-(pageXOffset+innerWidth))),e.width=Math.min(innerWidth,e.width),e.width-=2,e.top<pageYOffset&&(e.top=pageYOffset),e.left<pageXOffset&&(e.left=pageXOffset),e}if("scroll-handle"===this.targetModifier){var t=void 0,o=this.target;o===document.body?(o=document.documentElement,t={left:pageXOffset,top:pageYOffset,height:innerHeight,width:innerWidth}):t=r(o);var i=getComputedStyle(o),n=o.scrollWidth>o.clientWidth||[i.overflow,i.overflowX].indexOf("scroll")>=0||this.target!==document.body,s=0;n&&(s=15);var a=t.height-parseFloat(i.borderTopWidth)-parseFloat(i.borderBottomWidth)-s,e={width:15,height:.975*a*(a/o.scrollHeight),left:t.left+t.width-parseFloat(i.borderLeftWidth)-15},f=0;408>a&&this.target===document.body&&(f=-11e-5*Math.pow(a,2)-.00727*a+22.58),this.target!==document.body&&(e.height=Math.max(e.height,24));var h=this.target.scrollTop/(o.scrollHeight-a);return e.top=h*(a-e.height-f)+t.top+parseFloat(i.borderTopWidth),this.target===document.body&&(e.height=Math.max(e.height,24)),e}}},{key:"clearCache",value:function(){this._cache={}}},{key:"cache",value:function(t,e){return"undefined"==typeof this._cache&&(this._cache={}),"undefined"==typeof this._cache[t]&&(this._cache[t]=e.call(this)),this._cache[t]}},{key:"enable",value:function(){var t=void 0===arguments[0]?!0:arguments[0];this.options.addTargetClasses!==!1&&l(this.target,this.getClass("enabled")),l(this.element,this.getClass("enabled")),this.enabled=!0,this.scrollParent!==document&&this.scrollParent.addEventListener("scroll",this.position),t&&this.position()}},{key:"disable",value:function(){h(this.target,this.getClass("enabled")),h(this.element,this.getClass("enabled")),this.enabled=!1,"undefined"!=typeof this.scrollParent&&this.scrollParent.removeEventListener("scroll",this.position)}},{key:"destroy",value:function(){var t=this;this.disable(),B.forEach(function(e,o){return e===t?void B.splice(o,1):void 0})}},{key:"updateAttachClasses",value:function(t,e){var o=this;t=t||this.attachment,e=e||this.targetAttachment;var i=["left","top","bottom","right","middle","center"];"undefined"!=typeof this._addAttachClasses&&this._addAttachClasses.length&&this._addAttachClasses.splice(0,this._addAttachClasses.length),"undefined"==typeof this._addAttachClasses&&(this._addAttachClasses=[]);var n=this._addAttachClasses;t.top&&n.push(this.getClass("element-attached")+"-"+t.top),t.left&&n.push(this.getClass("element-attached")+"-"+t.left),e.top&&n.push(this.getClass("target-attached")+"-"+e.top),e.left&&n.push(this.getClass("target-attached")+"-"+e.left);var r=[];i.forEach(function(t){r.push(o.getClass("element-attached")+"-"+t),r.push(o.getClass("target-attached")+"-"+t)}),T(function(){"undefined"!=typeof o._addAttachClasses&&(c(o.element,o._addAttachClasses,r),o.options.addTargetClasses!==!1&&c(o.target,o._addAttachClasses,r),delete o._addAttachClasses)})}},{key:"position",value:function(){var t=this,e=void 0===arguments[0]?!0:arguments[0];if(this.enabled){this.clearCache();var o=Y(this.targetAttachment,this.attachment);this.updateAttachClasses(this.attachment,o);var i=this.cache("element-bounds",function(){return r(t.element)}),n=i.width,f=i.height;if(0===n&&0===f&&"undefined"!=typeof this.lastSize){var h=this.lastSize;n=h.width,f=h.height}else this.lastSize={width:n,height:f};var l=this.cache("target-bounds",function(){return t.getTargetBounds()}),d=l,u=y(H(this.attachment),{width:n,height:f}),p=y(H(o),d),c=y(this.offset,{width:n,height:f}),g=y(this.targetOffset,d);u=v(u,c),p=v(p,g);for(var m=l.left+p.left-u.left,b=l.top+p.top-u.top,w=0;w<C.modules.length;++w){var O=C.modules[w],E=O.position.call(this,{left:m,top:b,targetAttachment:o,targetPos:l,elementPos:i,offset:u,targetOffset:p,manualOffset:c,manualTargetOffset:g,scrollbarSize:A,attachment:this.attachment});if(E===!1)return!1;"undefined"!=typeof E&&"object"==typeof E&&(b=E.top,m=E.left)}var x={page:{top:b,left:m},viewport:{top:b-pageYOffset,bottom:pageYOffset-b-f+innerHeight,left:m-pageXOffset,right:pageXOffset-m-n+innerWidth}},A=void 0;return document.body.scrollWidth>window.innerWidth&&(A=this.cache("scrollbar-size",a),x.viewport.bottom-=A.height),document.body.scrollHeight>window.innerHeight&&(A=this.cache("scrollbar-size",a),x.viewport.right-=A.width),(-1===["","static"].indexOf(document.body.style.position)||-1===["","static"].indexOf(document.body.parentElement.style.position))&&(x.page.bottom=document.body.scrollHeight-b-f,x.page.right=document.body.scrollWidth-m-n),"undefined"!=typeof this.options.optimizations&&this.options.optimizations.moveElement!==!1&&"undefined"==typeof this.targetModifier&&!function(){var e=t.cache("target-offsetparent",function(){return s(t.target)}),o=t.cache("target-offsetparent-bounds",function(){return r(e)}),i=getComputedStyle(e),n=o,a={};if(["Top","Left","Bottom","Right"].forEach(function(t){a[t.toLowerCase()]=parseFloat(i["border"+t+"Width"])}),o.right=document.body.scrollWidth-o.left-n.width+a.right,o.bottom=document.body.scrollHeight-o.top-n.height+a.bottom,x.page.top>=o.top+a.top&&x.page.bottom>=o.bottom&&x.page.left>=o.left+a.left&&x.page.right>=o.right){var f=e.scrollTop,h=e.scrollLeft;x.offset={top:x.page.top-o.top+f-a.top,left:x.page.left-o.left+h-a.left}}}(),this.move(x),this.history.unshift(x),this.history.length>3&&this.history.pop(),e&&S(),!0}}},{key:"move",value:function(t){var e=this;if("undefined"!=typeof this.element.parentNode){var o={};for(var i in t){o[i]={};for(var n in t[i]){for(var r=!1,a=0;a<this.history.length;++a){var h=this.history[a];if("undefined"!=typeof h[i]&&!g(h[i][n],t[i][n])){r=!0;break}}r||(o[i][n]=!0)}}var l={top:"",left:"",right:"",bottom:""},d=function(t,o){var i="undefined"!=typeof e.options.optimizations,n=i?e.options.optimizations.gpu:null;if(n!==!1){var r=void 0,s=void 0;t.top?(l.top=0,r=o.top):(l.bottom=0,r=-o.bottom),t.left?(l.left=0,s=o.left):(l.right=0,s=-o.right),l[k]="translateX("+Math.round(s)+"px) translateY("+Math.round(r)+"px)","msTransform"!==k&&(l[k]+=" translateZ(0)")}else t.top?l.top=o.top+"px":l.bottom=o.bottom+"px",t.left?l.left=o.left+"px":l.right=o.right+"px"},u=!1;(o.page.top||o.page.bottom)&&(o.page.left||o.page.right)?(l.position="absolute",d(o.page,t.page)):(o.viewport.top||o.viewport.bottom)&&(o.viewport.left||o.viewport.right)?(l.position="fixed",d(o.viewport,t.viewport)):"undefined"!=typeof o.offset&&o.offset.top&&o.offset.left?!function(){l.position="absolute";var i=e.cache("target-offsetparent",function(){return s(e.target)});s(e.element)!==i&&T(function(){e.element.parentNode.removeChild(e.element),i.appendChild(e.element)}),d(o.offset,t.offset),u=!0}():(l.position="absolute",d({top:!0,left:!0},t.page)),u||"BODY"===this.element.parentNode.tagName||(this.element.parentNode.removeChild(this.element),document.body.appendChild(this.element));var p={},c=!1;for(var n in l){var m=l[n],v=this.element.style[n];""!==v&&""!==m&&["top","left","bottom","right"].indexOf(n)>=0&&(v=parseFloat(v),m=parseFloat(m)),v!==m&&(c=!0,p[n]=m)}c&&T(function(){f(e.element.style,p)})}}}]),t}();N.modules=[],C.position=_;var R=f(N,C),M=function(){function t(t,e){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(f){n=!0,r=f}finally{try{!i&&a["return"]&&a["return"]()}finally{if(n)throw r}}return o}return function(e,o){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,o);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),P=C.Utils,r=P.getBounds,f=P.extend,c=P.updateClasses,T=P.defer,U=["left","top","right","bottom"];C.modules.push({position:function(t){var e=this,o=t.top,i=t.left,n=t.targetAttachment;if(!this.options.constraints)return!0;var s=this.cache("element-bounds",function(){return r(e.element)}),a=s.height,h=s.width;if(0===h&&0===a&&"undefined"!=typeof this.lastSize){var l=this.lastSize;h=l.width,a=l.height}var d=this.cache("target-bounds",function(){return e.getTargetBounds()}),u=d.height,p=d.width,g=[this.getClass("pinned"),this.getClass("out-of-bounds")];this.options.constraints.forEach(function(t){var e=t.outOfBoundsClass,o=t.pinnedClass;e&&g.push(e),o&&g.push(o)}),g.forEach(function(t){["left","top","right","bottom"].forEach(function(e){g.push(t+"-"+e)})});var m=[],v=f({},n),y=f({},this.attachment);return this.options.constraints.forEach(function(t){var r=t.to,s=t.attachment,f=t.pin;"undefined"==typeof s&&(s="");var l=void 0,d=void 0;if(s.indexOf(" ")>=0){var c=s.split(" "),g=M(c,2);d=g[0],l=g[1]}else l=d=s;var w=b(e,r);("target"===d||"both"===d)&&(o<w[1]&&"top"===v.top&&(o+=u,v.top="bottom"),o+a>w[3]&&"bottom"===v.top&&(o-=u,v.top="top")),"together"===d&&(o<w[1]&&"top"===v.top&&("bottom"===y.top?(o+=u,v.top="bottom",o+=a,y.top="top"):"top"===y.top&&(o+=u,v.top="bottom",o-=a,y.top="bottom")),o+a>w[3]&&"bottom"===v.top&&("top"===y.top?(o-=u,v.top="top",o-=a,y.top="bottom"):"bottom"===y.top&&(o-=u,v.top="top",o+=a,y.top="top")),"middle"===v.top&&(o+a>w[3]&&"top"===y.top?(o-=a,y.top="bottom"):o<w[1]&&"bottom"===y.top&&(o+=a,y.top="top"))),("target"===l||"both"===l)&&(i<w[0]&&"left"===v.left&&(i+=p,v.left="right"),i+h>w[2]&&"right"===v.left&&(i-=p,v.left="left")),"together"===l&&(i<w[0]&&"left"===v.left?"right"===y.left?(i+=p,v.left="right",i+=h,y.left="left"):"left"===y.left&&(i+=p,v.left="right",i-=h,y.left="right"):i+h>w[2]&&"right"===v.left?"left"===y.left?(i-=p,v.left="left",i-=h,y.left="right"):"right"===y.left&&(i-=p,v.left="left",i+=h,y.left="left"):"center"===v.left&&(i+h>w[2]&&"left"===y.left?(i-=h,y.left="right"):i<w[0]&&"right"===y.left&&(i+=h,y.left="left"))),("element"===d||"both"===d)&&(o<w[1]&&"bottom"===y.top&&(o+=a,y.top="top"),o+a>w[3]&&"top"===y.top&&(o-=a,y.top="bottom")),("element"===l||"both"===l)&&(i<w[0]&&"right"===y.left&&(i+=h,y.left="left"),i+h>w[2]&&"left"===y.left&&(i-=h,y.left="right")),"string"==typeof f?f=f.split(",").map(function(t){return t.trim()}):f===!0&&(f=["top","left","right","bottom"]),f=f||[];var C=[],O=[];o<w[1]&&(f.indexOf("top")>=0?(o=w[1],C.push("top")):O.push("top")),o+a>w[3]&&(f.indexOf("bottom")>=0?(o=w[3]-a,C.push("bottom")):O.push("bottom")),i<w[0]&&(f.indexOf("left")>=0?(i=w[0],C.push("left")):O.push("left")),i+h>w[2]&&(f.indexOf("right")>=0?(i=w[2]-h,C.push("right")):O.push("right")),C.length&&!function(){var t=void 0;t="undefined"!=typeof e.options.pinnedClass?e.options.pinnedClass:e.getClass("pinned"),m.push(t),C.forEach(function(e){m.push(t+"-"+e)})}(),O.length&&!function(){var t=void 0;t="undefined"!=typeof e.options.outOfBoundsClass?e.options.outOfBoundsClass:e.getClass("out-of-bounds"),m.push(t),O.forEach(function(e){m.push(t+"-"+e)})}(),(C.indexOf("left")>=0||C.indexOf("right")>=0)&&(y.left=v.left=!1),(C.indexOf("top")>=0||C.indexOf("bottom")>=0)&&(y.top=v.top=!1),(v.top!==n.top||v.left!==n.left||y.top!==e.attachment.top||y.left!==e.attachment.left)&&e.updateAttachClasses(y,v)}),T(function(){e.options.addTargetClasses!==!1&&c(e.target,m,g),c(e.element,m,g)}),{top:o,left:i}}});var P=C.Utils,r=P.getBounds,c=P.updateClasses,T=P.defer;C.modules.push({position:function(t){var e=this,o=t.top,i=t.left,n=this.cache("element-bounds",function(){return r(e.element)}),s=n.height,a=n.width,f=this.getTargetBounds(),h=o+s,l=i+a,d=[];o<=f.bottom&&h>=f.top&&["left","right"].forEach(function(t){var e=f[t];(e===i||e===l)&&d.push(t)}),i<=f.right&&l>=f.left&&["top","bottom"].forEach(function(t){var e=f[t];(e===o||e===h)&&d.push(t)});var u=[],p=[],g=["left","top","right","bottom"];return u.push(this.getClass("abutted")),g.forEach(function(t){u.push(e.getClass("abutted")+"-"+t)}),d.length&&p.push(this.getClass("abutted")),d.forEach(function(t){p.push(e.getClass("abutted")+"-"+t)}),T(function(){e.options.addTargetClasses!==!1&&c(e.target,p,u),c(e.element,p,u)}),!0}});var M=function(){function t(t,e){var o=[],i=!0,n=!1,r=void 0;try{for(var s,a=t[Symbol.iterator]();!(i=(s=a.next()).done)&&(o.push(s.value),!e||o.length!==e);i=!0);}catch(f){n=!0,r=f}finally{try{!i&&a["return"]&&a["return"]()}finally{if(n)throw r}}return o}return function(e,o){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,o);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();return C.modules.push({position:function(t){var e=t.top,o=t.left;if(this.options.shift){var i=this.options.shift;"function"==typeof this.options.shift&&(i=this.options.shift.call(this,{top:e,left:o}));var n=void 0,r=void 0;if("string"==typeof i){i=i.split(" "),i[1]=i[1]||i[0];var s=M(i,2);n=s[0],r=s[1],n=parseFloat(n,10),r=parseFloat(r,10)}else n=i.top,r=i.left;return e+=n,o+=r,{top:e,left:o}}}}),R});
H5P.Tether = Tether;
window.Tether = oldTether;
;
var oldDrop = window.Drop;
var oldTether = window.Tether;
Tether = H5P.Tether;
!function(t,e){"function"==typeof define&&define.amd?define(["tether"],e):"object"==typeof exports?module.exports=e(require("tether")):t.Drop=e(t.Tether)}(this,function(t){"use strict";function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function o(t){var e=t.split(" "),n=a(e,2),o=n[0],i=n[1];if(["left","right"].indexOf(o)>=0){var s=[i,o];o=s[0],i=s[1]}return[o,i].join(" ")}function i(t,e){for(var n=void 0,o=[];-1!==(n=t.indexOf(e));)o.push(t.splice(n,1));return o}function s(){var a=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],u=function(){for(var t=arguments.length,e=Array(t),n=0;t>n;n++)e[n]=arguments[n];return new(r.apply(b,[null].concat(e)))};p(u,{createContext:s,drops:[],defaults:{}});var g={classPrefix:"drop",defaults:{position:"bottom left",openOn:"click",beforeClose:null,constrainToScrollParent:!0,constrainToWindow:!0,classes:"",remove:!1,tetherOptions:{}}};p(u,g,a),p(u.defaults,g.defaults,a.defaults),"undefined"==typeof x[u.classPrefix]&&(x[u.classPrefix]=[]),u.updateBodyClasses=function(){for(var t=!1,e=x[u.classPrefix],n=e.length,o=0;n>o;++o)if(e[o].isOpened()){t=!0;break}t?d(document.body,u.classPrefix+"-open"):c(document.body,u.classPrefix+"-open")};var b=function(s){function r(t){if(e(this,r),l(Object.getPrototypeOf(r.prototype),"constructor",this).call(this),this.options=p({},u.defaults,t),this.target=this.options.target,"undefined"==typeof this.target)throw new Error("Drop Error: You must provide a target.");var n="data-"+u.classPrefix,o=this.target.getAttribute(n);o&&(this.options.content=o);for(var i=["position","openOn"],s=0;s<i.length;++s){var a=this.target.getAttribute(n+"-"+i[s]);a&&(this.options[i[s]]=a)}this.options.classes&&this.options.addTargetClasses!==!1&&d(this.target,this.options.classes),u.drops.push(this),x[u.classPrefix].push(this),this._boundEvents=[],this.bindMethods(),this.setupElements(),this.setupEvents(),this.setupTether()}return n(r,s),h(r,[{key:"_on",value:function(t,e,n){this._boundEvents.push({element:t,event:e,handler:n}),t.addEventListener(e,n)}},{key:"bindMethods",value:function(){this.transitionEndHandler=this._transitionEndHandler.bind(this)}},{key:"setupElements",value:function(){var t=this;if(this.drop=document.createElement("div"),d(this.drop,u.classPrefix),this.options.classes&&d(this.drop,this.options.classes),this.content=document.createElement("div"),d(this.content,u.classPrefix+"-content"),"function"==typeof this.options.content){var e=function(){var e=t.options.content.call(t,t);if("string"==typeof e)t.content.innerHTML=e;else{if("object"!=typeof e)throw new Error("Drop Error: Content function should return a string or HTMLElement.");t.content.innerHTML="",t.content.appendChild(e)}};e(),this.on("open",e.bind(this))}else"object"==typeof this.options.content?this.content.appendChild(this.options.content):this.content.innerHTML=this.options.content;this.drop.appendChild(this.content)}},{key:"setupTether",value:function(){var e=this.options.position.split(" ");e[0]=E[e[0]],e=e.join(" ");var n=[];this.options.constrainToScrollParent?n.push({to:"scrollParent",pin:"top, bottom",attachment:"together none"}):n.push({to:"scrollParent"}),this.options.constrainToWindow!==!1?n.push({to:"window",attachment:"together"}):n.push({to:"window"});var i={element:this.drop,target:this.target,attachment:o(e),targetAttachment:o(this.options.position),classPrefix:u.classPrefix,offset:"0 0",targetOffset:"0 0",enabled:!1,constraints:n,addTargetClasses:this.options.addTargetClasses};this.options.tetherOptions!==!1&&(this.tether=new t(p({},i,this.options.tetherOptions)))}},{key:"setupEvents",value:function(){var t=this;if(this.options.openOn){if("always"===this.options.openOn)return void setTimeout(this.open.bind(this));var e=this.options.openOn.split(" ");if(e.indexOf("click")>=0)for(var n=function(e){t.toggle(e),e.preventDefault()},o=function(e){t.isOpened()&&(e.target===t.drop||t.drop.contains(e.target)||e.target===t.target||t.target.contains(e.target)||t.close(e))},i=0;i<y.length;++i){var s=y[i];this._on(this.target,s,n),this._on(document,s,o)}var r=!1,a=null,h=function(e){r=!0,t.open(e)},l=function(e){r=!1,"undefined"!=typeof a&&clearTimeout(a),a=setTimeout(function(){r||t.close(e),a=null},50)};e.indexOf("hover")>=0&&(this._on(this.target,"mouseover",h),this._on(this.drop,"mouseover",h),this._on(this.target,"mouseout",l),this._on(this.drop,"mouseout",l)),e.indexOf("focus")>=0&&(this._on(this.target,"focus",h),this._on(this.drop,"focus",h),this._on(this.target,"blur",l),this._on(this.drop,"blur",l))}}},{key:"isOpened",value:function(){return this.drop?f(this.drop,u.classPrefix+"-open"):void 0}},{key:"toggle",value:function(t){this.isOpened()?this.close(t):this.open(t)}},{key:"open",value:function(t){var e=this;this.isOpened()||(this.drop.parentNode||document.body.appendChild(this.drop),"undefined"!=typeof this.tether&&this.tether.enable(),d(this.drop,u.classPrefix+"-open"),d(this.drop,u.classPrefix+"-open-transitionend"),setTimeout(function(){e.drop&&d(e.drop,u.classPrefix+"-after-open")}),"undefined"!=typeof this.tether&&this.tether.position(),this.trigger("open"),u.updateBodyClasses())}},{key:"_transitionEndHandler",value:function(t){t.target===t.currentTarget&&(f(this.drop,u.classPrefix+"-open")||c(this.drop,u.classPrefix+"-open-transitionend"),this.drop.removeEventListener(m,this.transitionEndHandler))}},{key:"beforeCloseHandler",value:function(t){var e=!0;return this.isClosing||"function"!=typeof this.options.beforeClose||(this.isClosing=!0,e=this.options.beforeClose(t,this)!==!1),this.isClosing=!1,e}},{key:"close",value:function(t){this.isOpened()&&this.beforeCloseHandler(t)&&(c(this.drop,u.classPrefix+"-open"),c(this.drop,u.classPrefix+"-after-open"),this.drop.addEventListener(m,this.transitionEndHandler),this.trigger("close"),"undefined"!=typeof this.tether&&this.tether.disable(),u.updateBodyClasses(),this.options.remove&&this.remove(t))}},{key:"remove",value:function(t){this.close(t),this.drop.parentNode&&this.drop.parentNode.removeChild(this.drop)}},{key:"position",value:function(){this.isOpened()&&"undefined"!=typeof this.tether&&this.tether.position()}},{key:"destroy",value:function(){this.remove(),"undefined"!=typeof this.tether&&this.tether.destroy();for(var t=0;t<this._boundEvents.length;++t){var e=this._boundEvents[t],n=e.element,o=e.event,s=e.handler;n.removeEventListener(o,s)}this._boundEvents=[],this.tether=null,this.drop=null,this.content=null,this.target=null,i(x[u.classPrefix],this),i(u.drops,this)}}]),r}(v);return u}var r=Function.prototype.bind,a=function(){function t(t,e){var n=[],o=!0,i=!1,s=void 0;try{for(var r,a=t[Symbol.iterator]();!(o=(r=a.next()).done)&&(n.push(r.value),!e||n.length!==e);o=!0);}catch(h){i=!0,s=h}finally{try{!o&&a["return"]&&a["return"]()}finally{if(i)throw s}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),h=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),l=function(t,e,n){for(var o=!0;o;){var i=t,s=e,r=n;a=l=h=void 0,o=!1,null===i&&(i=Function.prototype);var a=Object.getOwnPropertyDescriptor(i,s);if(void 0!==a){if("value"in a)return a.value;var h=a.get;return void 0===h?void 0:h.call(r)}var l=Object.getPrototypeOf(i);if(null===l)return void 0;t=l,e=s,n=r,o=!0}},u=t.Utils,p=u.extend,d=u.addClass,c=u.removeClass,f=u.hasClass,v=u.Evented,y=["click"];"ontouchstart"in document.documentElement&&y.push("touchstart");var g={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"},m="";for(var b in g)if({}.hasOwnProperty.call(g,b)){var O=document.createElement("p");"undefined"!=typeof O.style[b]&&(m=g[b])}var E={left:"right",right:"left",top:"bottom",bottom:"top",middle:"middle",center:"center"},x={},P=s();return document.addEventListener("DOMContentLoaded",function(){P.updateBodyClasses()}),P});
H5P.Drop = Drop;
window.Drop = oldDrop;
window.Tether = oldTether;
;
var H5P = H5P || {};
/**
 * Transition contains helper function relevant for transitioning
 */
H5P.Transition = (function ($) {

  /**
   * @class
   * @namespace H5P
   */
  Transition = {};

  /**
   * @private
   */
  Transition.transitionEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'transition':       'transitionend',
    'MozTransition':    'transitionend',
    'OTransition':      'oTransitionEnd',
    'msTransition':     'MSTransitionEnd'
  };

  /**
   * @private
   */
  Transition.cache = [];

  /**
   * Get the vendor property name for an event
   *
   * @function H5P.Transition.getVendorPropertyName
   * @static
   * @private
   * @param  {string} prop Generic property name
   * @return {string}      Vendor specific property name
   */
  Transition.getVendorPropertyName = function (prop) {

    if (Transition.cache[prop] !== undefined) {
      return Transition.cache[prop];
    }

    var div = document.createElement('div');

    // Handle unprefixed versions (FF16+, for example)
    if (prop in div.style) {
      Transition.cache[prop] = prop;
    }
    else {
      var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
      var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

      if (prop in div.style) {
        Transition.cache[prop] = prop;
      }
      else {
        for (var i = 0; i < prefixes.length; ++i) {
          var vendorProp = prefixes[i] + prop_;
          if (vendorProp in div.style) {
            Transition.cache[prop] = vendorProp;
            break;
          }
        }
      }
    }

    return Transition.cache[prop];
  };

  /**
   * Get the name of the transition end event
   *
   * @static
   * @private
   * @return {string}  description
   */
  Transition.getTransitionEndEventName = function () {
    return Transition.transitionEndEventNames[Transition.getVendorPropertyName('transition')] || undefined;
  };

  /**
   * Helper function for listening on transition end events
   *
   * @function H5P.Transition.onTransitionEnd
   * @static
   * @param  {domElement} $element The element which is transitioned
   * @param  {function} callback The callback to be invoked when transition is finished
   * @param  {number} timeout  Timeout in milliseconds. Fallback if transition event is never fired
   */
  Transition.onTransitionEnd = function ($element, callback, timeout) {
    // Fallback on 1 second if transition event is not supported/triggered
    timeout = timeout || 1000;
    Transition.transitionEndEventName = Transition.transitionEndEventName || Transition.getTransitionEndEventName();
    var callbackCalled = false;

    var doCallback = function () {
      if (callbackCalled) {
        return;
      }
      $element.off(Transition.transitionEndEventName, callback);
      callbackCalled = true;
      clearTimeout(timer);
      callback();
    };

    var timer = setTimeout(function () {
      doCallback();
    }, timeout);

    $element.on(Transition.transitionEndEventName, function () {
      doCallback();
    });
  };

  /**
   * Wait for a transition - when finished, invokes next in line
   *
   * @private
   *
   * @param {Object[]}    transitions             Array of transitions
   * @param {H5P.jQuery}  transitions[].$element  Dom element transition is performed on
   * @param {number=}     transitions[].timeout   Timeout fallback if transition end never is triggered
   * @param {bool=}       transitions[].break     If true, sequence breaks after this transition
   * @param {number}      index                   The index for current transition
   */
  var runSequence = function (transitions, index) {
    if (index >= transitions.length) {
      return;
    }

    var transition = transitions[index];
    H5P.Transition.onTransitionEnd(transition.$element, function () {
      if (transition.end) {
        transition.end();
      }
      if (transition.break !== true) {
        runSequence(transitions, index+1);
      }
    }, transition.timeout || undefined);
  };

  /**
   * Run a sequence of transitions
   *
   * @function H5P.Transition.sequence
   * @static
   * @param {Object[]}    transitions             Array of transitions
   * @param {H5P.jQuery}  transitions[].$element  Dom element transition is performed on
   * @param {number=}     transitions[].timeout   Timeout fallback if transition end never is triggered
   * @param {bool=}       transitions[].break     If true, sequence breaks after this transition
   */
  Transition.sequence = function (transitions) {
    runSequence(transitions, 0);
  };

  return Transition;
})(H5P.jQuery);
;
var H5P = H5P || {};

/**
 * Class responsible for creating a help text dialog
 */
H5P.JoubelHelpTextDialog = (function ($) {

  var numInstances = 0;
  /**
   * Display a pop-up containing a message.
   *
   * @param {H5P.jQuery}  $container  The container which message dialog will be appended to
   * @param {string}      message     The message
   * @param {string}      closeButtonTitle The title for the close button
   * @return {H5P.jQuery}
   */
  function JoubelHelpTextDialog(header, message, closeButtonTitle) {
    H5P.EventDispatcher.call(this);

    var self = this;

    numInstances++;
    var headerId = 'joubel-help-text-header-' + numInstances;
    var helpTextId = 'joubel-help-text-body-' + numInstances;

    var $helpTextDialogBox = $('<div>', {
      'class': 'joubel-help-text-dialog-box',
      'role': 'dialog',
      'aria-labelledby': headerId,
      'aria-describedby': helpTextId
    });

    $('<div>', {
      'class': 'joubel-help-text-dialog-background'
    }).appendTo($helpTextDialogBox);

    var $helpTextDialogContainer = $('<div>', {
      'class': 'joubel-help-text-dialog-container'
    }).appendTo($helpTextDialogBox);

    $('<div>', {
      'class': 'joubel-help-text-header',
      'id': headerId,
      'role': 'header',
      'html': header
    }).appendTo($helpTextDialogContainer);

    $('<div>', {
      'class': 'joubel-help-text-body',
      'id': helpTextId,
      'html': message,
      'role': 'document',
      'tabindex': 0
    }).appendTo($helpTextDialogContainer);

    var handleClose = function () {
      $helpTextDialogBox.remove();
      self.trigger('closed');
    };

    var $closeButton = $('<div>', {
      'class': 'joubel-help-text-remove',
      'role': 'button',
      'title': closeButtonTitle,
      'tabindex': 1,
      'click': handleClose,
      'keydown': function (event) {
        // 32 - space, 13 - enter
        if ([32, 13].indexOf(event.which) !== -1) {
          event.preventDefault();
          handleClose();
        }
      }
    }).appendTo($helpTextDialogContainer);

    /**
     * Get the DOM element
     * @return {HTMLElement}
     */
    self.getElement = function () {
      return $helpTextDialogBox;
    };

    self.focus = function () {
      $closeButton.focus();
    };
  }

  JoubelHelpTextDialog.prototype = Object.create(H5P.EventDispatcher.prototype);
  JoubelHelpTextDialog.prototype.constructor = JoubelHelpTextDialog;

  return JoubelHelpTextDialog;
}(H5P.jQuery));
;
var H5P = H5P || {};

/**
 * Class responsible for creating auto-disappearing dialogs
 */
H5P.JoubelMessageDialog = (function ($) {

  /**
   * Display a pop-up containing a message.
   *
   * @param {H5P.jQuery} $container The container which message dialog will be appended to
   * @param {string} message The message
   * @return {H5P.jQuery}
   */
  function JoubelMessageDialog ($container, message) {
    var timeout;

    var removeDialog = function () {
      $warning.remove();
      clearTimeout(timeout);
      $container.off('click.messageDialog');
    };

    // Create warning popup:
    var $warning = $('<div/>', {
      'class': 'joubel-message-dialog',
      text: message
    }).appendTo($container);

    // Remove after 3 seconds or if user clicks anywhere in $container:
    timeout = setTimeout(removeDialog, 3000);
    $container.on('click.messageDialog', removeDialog);

    return $warning;
  }

  return JoubelMessageDialog;
})(H5P.jQuery);
;
var H5P = H5P || {};

/**
 * Class responsible for creating a circular progress bar
 */

H5P.JoubelProgressCircle = (function ($) {

  /**
   * Constructor for the Progress Circle
   *
   * @param {Number} number The amount of progress to display
   * @param {string} progressColor Color for the progress meter
   * @param {string} backgroundColor Color behind the progress meter
   */
  function ProgressCircle(number, progressColor, fillColor, backgroundColor) {
    progressColor = progressColor || '#1a73d9';
    fillColor = fillColor || '#f0f0f0';
    backgroundColor = backgroundColor || '#ffffff';
    var progressColorRGB = this.hexToRgb(progressColor);

    //Verify number
    try {
      number = Number(number);
      if (number === '') {
        throw 'is empty';
      }
      if (isNaN(number)) {
        throw 'is not a number';
      }
    } catch (e) {
      number = 'err';
    }

    //Draw circle
    if (number > 100) {
      number = 100;
    }

    // We can not use rgba, since they will stack on top of each other.
    // Instead we create the equivalent of the rgba color
    // and applies this to the activeborder and background color.
    var progressColorString = 'rgb(' + parseInt(progressColorRGB.r, 10) +
      ',' + parseInt(progressColorRGB.g, 10) +
      ',' + parseInt(progressColorRGB.b, 10) + ')';

    // Circle wrapper
    var $wrapper = $('<div/>', {
      'class': "joubel-progress-circle-wrapper"
    });

    //Active border indicates progress
    var $activeBorder = $('<div/>', {
      'class': "joubel-progress-circle-active-border"
    }).appendTo($wrapper);

    //Background circle
    var $backgroundCircle = $('<div/>', {
      'class': "joubel-progress-circle-circle"
    }).appendTo($activeBorder);

    //Progress text/number
    $('<span/>', {
      'text': number + '%',
      'class': "joubel-progress-circle-percentage"
    }).appendTo($backgroundCircle);

    var deg = number * 3.6;
    if (deg <= 180) {
      $activeBorder.css('background-image',
        'linear-gradient(' + (90 + deg) + 'deg, transparent 50%, ' + fillColor + ' 50%),' +
        'linear-gradient(90deg, ' + fillColor + ' 50%, transparent 50%)')
        .css('border', '2px solid' + backgroundColor)
        .css('background-color', progressColorString);
    } else {
      $activeBorder.css('background-image',
        'linear-gradient(' + (deg - 90) + 'deg, transparent 50%, ' + progressColorString + ' 50%),' +
        'linear-gradient(90deg, ' + fillColor + ' 50%, transparent 50%)')
        .css('border', '2px solid' + backgroundColor)
        .css('background-color', progressColorString);
    }

    this.$activeBorder = $activeBorder;
    this.$backgroundCircle = $backgroundCircle;
    this.$wrapper = $wrapper;

    this.initResizeFunctionality();

    return $wrapper;
  }

  /**
   * Initializes resize functionality for the progress circle
   */
  ProgressCircle.prototype.initResizeFunctionality = function () {
    var self = this;

    $(window).resize(function () {
      // Queue resize
      setTimeout(function () {
        self.resize();
      });
    });

    // First resize
    setTimeout(function () {
      self.resize();
    }, 0);
  };

  /**
   * Resize function makes progress circle grow or shrink relative to parent container
   */
  ProgressCircle.prototype.resize = function () {
    var $parent = this.$wrapper.parent();

    if ($parent !== undefined && $parent) {

      // Measurements
      var fontSize = parseInt($parent.css('font-size'), 10);

      // Static sizes
      var fontSizeMultiplum = 3.75;
      var progressCircleWidthPx = parseInt((fontSize / 4.5), 10) % 2 === 0 ? parseInt((fontSize / 4.5), 10) + 4 : parseInt((fontSize / 4.5), 10) + 5;
      var progressCircleOffset = progressCircleWidthPx / 2;

      var width = fontSize * fontSizeMultiplum;
      var height = fontSize * fontSizeMultiplum;
      this.$activeBorder.css({
        'width': width,
        'height': height
      });

      this.$backgroundCircle.css({
        'width': width - progressCircleWidthPx,
        'height': height - progressCircleWidthPx,
        'top': progressCircleOffset,
        'left': progressCircleOffset
      });
    }
  };

  /**
   * Hex to RGB conversion
   * @param hex
   * @returns {{r: Number, g: Number, b: Number}}
   */
  ProgressCircle.prototype.hexToRgb = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  return ProgressCircle;

}(H5P.jQuery));
;
var H5P = H5P || {};

H5P.SimpleRoundedButton = (function ($) {

  /**
   * Creates a new tip
   */
  function SimpleRoundedButton(text) {

    var $simpleRoundedButton = $('<div>', {
      'class': 'joubel-simple-rounded-button',
      'title': text,
      'role': 'button',
      'tabindex': '0'
    }).keydown(function (e) {
      // 32 - space, 13 - enter
      if ([32, 13].indexOf(e.which) !== -1) {
        $(this).click();
        e.preventDefault();
      }
    });

    $('<span>', {
      'class': 'joubel-simple-rounded-button-text',
      'html': text
    }).appendTo($simpleRoundedButton);

    return $simpleRoundedButton;
  }

  return SimpleRoundedButton;
}(H5P.jQuery));
;
var H5P = H5P || {};

/**
 * Class responsible for creating speech bubbles
 */
H5P.JoubelSpeechBubble = (function ($) {

  var $currentSpeechBubble;
  var $currentContainer;  
  var $tail;
  var $innerTail;
  var removeSpeechBubbleTimeout;
  var currentMaxWidth;

  var DEFAULT_MAX_WIDTH = 400;

  var iDevice = navigator.userAgent.match(/iPod|iPhone|iPad/g) ? true : false;

  /**
   * Creates a new speech bubble
   *
   * @param {H5P.jQuery} $container The speaking object
   * @param {string} text The text to display
   * @param {number} maxWidth The maximum width of the bubble
   * @return {H5P.JoubelSpeechBubble}
   */
  function JoubelSpeechBubble($container, text, maxWidth) {
    maxWidth = maxWidth || DEFAULT_MAX_WIDTH;
    currentMaxWidth = maxWidth;
    $currentContainer = $container;

    this.isCurrent = function ($tip) {
      return $tip.is($currentContainer);
    };

    this.remove = function () {
      remove();
    };

    var fadeOutSpeechBubble = function ($speechBubble) {
      if (!$speechBubble) {
        return;
      }

      // Stop removing bubble
      clearTimeout(removeSpeechBubbleTimeout);

      $speechBubble.removeClass('show');
      setTimeout(function () {
        if ($speechBubble) {
          $speechBubble.remove();
          $speechBubble = undefined;
        }
      }, 500);
    };

    if ($currentSpeechBubble !== undefined) {
      remove();
    }

    var $h5pContainer = getH5PContainer($container);

    // Make sure we fade out old speech bubble
    fadeOutSpeechBubble($currentSpeechBubble);

    // Create bubble
    $tail = $('<div class="joubel-speech-bubble-tail"></div>');
    $innerTail = $('<div class="joubel-speech-bubble-inner-tail"></div>');
    var $innerBubble = $(
      '<div class="joubel-speech-bubble-inner">' +
      '<div class="joubel-speech-bubble-text">' + text + '</div>' +
      '</div>'
    ).prepend($innerTail);

    $currentSpeechBubble = $(
      '<div class="joubel-speech-bubble" aria-live="assertive">'
    ).append([$tail, $innerBubble])
      .appendTo($h5pContainer);

    // Show speech bubble with transition
    setTimeout(function () {
      $currentSpeechBubble.addClass('show');
    }, 0);

    position($currentSpeechBubble, $currentContainer, maxWidth, $tail, $innerTail);

    // Handle click to close
    H5P.$body.on('mousedown.speechBubble', handleOutsideClick);

    // Handle window resizing
    H5P.$window.on('resize', '', handleResize);

    // Handle clicks when inside IV which blocks bubbling.
    $container.parents('.h5p-dialog')
      .on('mousedown.speechBubble', handleOutsideClick);

    if (iDevice) {
      H5P.$body.css('cursor', 'pointer');
    }

    return this;
  }

  // Remove speechbubble if it belongs to a dom element that is about to be hidden
  H5P.externalDispatcher.on('domHidden', function (event) {
    if ($currentSpeechBubble !== undefined && event.data.$dom.find($currentContainer).length !== 0) {
      remove();
    }
  });

  /**
   * Returns the closest h5p container for the given DOM element.
   * 
   * @param {object} $container jquery element
   * @return {object} the h5p container (jquery element)
   */
  function getH5PContainer($container) {
    var $h5pContainer = $container.closest('.h5p-frame');

    // Check closest h5p frame first, then check for container in case there is no frame.
    if (!$h5pContainer.length) {
      $h5pContainer = $container.closest('.h5p-container');
    }

    return $h5pContainer;
  }

  /**
   * Event handler that is called when the window is resized.
   */
  function handleResize() {
    position($currentSpeechBubble, $currentContainer, currentMaxWidth, $tail, $innerTail);
  }

  /**
   * Repositions the speech bubble according to the position of the container.
   * 
   * @param {object} $currentSpeechbubble the speech bubble that should be positioned   
   * @param {object} $container the container to which the speech bubble should point 
   * @param {number} maxWidth the maximum width of the speech bubble
   * @param {object} $tail the tail (the triangle that points to the referenced container)
   * @param {object} $innerTail the inner tail (the triangle that points to the referenced container)
   */
  function position($currentSpeechBubble, $container, maxWidth, $tail, $innerTail) {
    var $h5pContainer = getH5PContainer($container);

    // Calculate offset between the button and the h5p frame
    var offset = getOffsetBetween($h5pContainer, $container);

    var direction = (offset.bottom > offset.top ? 'bottom' : 'top');
    var tipWidth = offset.outerWidth * 0.9; // Var needs to be renamed to make sense
    var bubbleWidth = tipWidth > maxWidth ? maxWidth : tipWidth;

    var bubblePosition = getBubblePosition(bubbleWidth, offset);
    var tailPosition = getTailPosition(bubbleWidth, bubblePosition, offset, $container.width());
    // Need to set font-size, since element is appended to body.
    // Using same font-size as parent. In that way it will grow accordingly
    // when resizing
    var fontSize = 16;//parseFloat($parent.css('font-size'));

    // Set width and position of speech bubble
    $currentSpeechBubble.css(bubbleCSS(
      direction,
      bubbleWidth,
      bubblePosition,
      fontSize
    ));

    var preparedTailCSS = tailCSS(direction, tailPosition);
    $tail.css(preparedTailCSS);
    $innerTail.css(preparedTailCSS);
  }

  /**
   * Static function for removing the speechbubble
   */
  var remove = function () {
    H5P.$body.off('mousedown.speechBubble');
    H5P.$window.off('resize', '', handleResize);
    $currentContainer.parents('.h5p-dialog').off('mousedown.speechBubble');
    if (iDevice) {
      H5P.$body.css('cursor', '');
    }
    if ($currentSpeechBubble !== undefined) {
      // Apply transition, then remove speech bubble
      $currentSpeechBubble.removeClass('show');

      // Make sure we remove any old timeout before reassignment
      clearTimeout(removeSpeechBubbleTimeout);
      removeSpeechBubbleTimeout = setTimeout(function () {
        $currentSpeechBubble.remove();
        $currentSpeechBubble = undefined;
      }, 500);
    }
    // Don't return false here. If the user e.g. clicks a button when the bubble is visible,
    // we want the bubble to disapear AND the button to receive the event
  };

  /**
   * Remove the speech bubble and container reference
   */
  function handleOutsideClick(event) {
    if (event.target === $currentContainer[0]) {
      return; // Button clicks are not outside clicks
    }

    remove();
    // There is no current container when a container isn't clicked
    $currentContainer = undefined;
  }

  /**
   * Calculate position for speech bubble
   *
   * @param {number} bubbleWidth The width of the speech bubble
   * @param {object} offset
   * @return {object} Return position for the speech bubble
   */
  function getBubblePosition(bubbleWidth, offset) {
    var bubblePosition = {};

    var tailOffset = 9;
    var widthOffset = bubbleWidth / 2;

    // Calculate top position
    bubblePosition.top = offset.top + offset.innerHeight;

    // Calculate bottom position
    bubblePosition.bottom = offset.bottom + offset.innerHeight + tailOffset;

    // Calculate left position
    if (offset.left < widthOffset) {
      bubblePosition.left = 3;
    }
    else if ((offset.left + widthOffset) > offset.outerWidth) {
      bubblePosition.left = offset.outerWidth - bubbleWidth - 3;
    }
    else {
      bubblePosition.left = offset.left - widthOffset + (offset.innerWidth / 2);
    }

    return bubblePosition;
  }

  /**
   * Calculate position for speech bubble tail
   *
   * @param {number} bubbleWidth The width of the speech bubble
   * @param {object} bubblePosition Speech bubble position
   * @param {object} offset
   * @param {number} iconWidth The width of the tip icon
   * @return {object} Return position for the tail
   */
  function getTailPosition(bubbleWidth, bubblePosition, offset, iconWidth) {
    var tailPosition = {};
    // Magic numbers. Tuned by hand so that the tail fits visually within
    // the bounds of the speech bubble.
    var leftBoundary = 9;
    var rightBoundary = bubbleWidth - 20;

    tailPosition.left = offset.left - bubblePosition.left + (iconWidth / 2) - 6;
    if (tailPosition.left < leftBoundary) {
      tailPosition.left = leftBoundary;
    }
    if (tailPosition.left > rightBoundary) {
      tailPosition.left = rightBoundary;
    }

    tailPosition.top = -6;
    tailPosition.bottom = -6;

    return tailPosition;
  }

  /**
   * Return bubble CSS for the desired growth direction
   *
   * @param {string} direction The direction the speech bubble will grow
   * @param {number} width The width of the speech bubble
   * @param {object} position Speech bubble position
   * @param {number} fontSize The size of the bubbles font
   * @return {object} Return CSS
   */
  function bubbleCSS(direction, width, position, fontSize) {
    if (direction === 'top') {
      return {
        width: width + 'px',
        bottom: position.bottom + 'px',
        left: position.left + 'px',
        fontSize: fontSize + 'px',
        top: ''
      };
    }
    else {
      return {
        width: width + 'px',
        top: position.top + 'px',
        left: position.left + 'px',
        fontSize: fontSize + 'px',
        bottom: ''
      };
    }
  }

  /**
   * Return tail CSS for the desired growth direction
   *
   * @param {string} direction The direction the speech bubble will grow
   * @param {object} position Tail position
   * @return {object} Return CSS
   */
  function tailCSS(direction, position) {
    if (direction === 'top') {
      return {
        bottom: position.bottom + 'px',
        left: position.left + 'px',
        top: ''
      };
    }
    else {
      return {
        top: position.top + 'px',
        left: position.left + 'px',
        bottom: ''
      };
    }
  }

  /**
   * Calculates the offset between an element inside a container and the
   * container. Only works if all the edges of the inner element are inside the
   * outer element.
   * Width/height of the elements is included as a convenience.
   *
   * @param {H5P.jQuery} $outer
   * @param {H5P.jQuery} $inner
   * @return {object} Position offset
   */
  function getOffsetBetween($outer, $inner) {
    var outer = $outer[0].getBoundingClientRect();
    var inner = $inner[0].getBoundingClientRect();

    return {
      top: inner.top - outer.top,
      right: outer.right - inner.right,
      bottom: outer.bottom - inner.bottom,
      left: inner.left - outer.left,
      innerWidth: inner.width,
      innerHeight: inner.height,
      outerWidth: outer.width,
      outerHeight: outer.height
    };
  }

  return JoubelSpeechBubble;
})(H5P.jQuery);
;
var H5P = H5P || {};

H5P.JoubelThrobber = (function ($) {

  /**
   * Creates a new tip
   */
  function JoubelThrobber() {

    // h5p-throbber css is described in core
    var $throbber = $('<div/>', {
      'class': 'h5p-throbber'
    });

    return $throbber;
  }

  return JoubelThrobber;
}(H5P.jQuery));
;
H5P.JoubelTip = (function ($) {
  var $conv = $('<div/>');

  /**
   * Creates a new tip element.
   *
   * NOTE that this may look like a class but it doesn't behave like one.
   * It returns a jQuery object.
   *
   * @param {string} tipHtml The text to display in the popup
   * @param {Object} [behaviour] Options
   * @param {string} [behaviour.tipLabel] Set to use a custom label for the tip button (you want this for good A11Y)
   * @param {boolean} [behaviour.helpIcon] Set to 'true' to Add help-icon classname to Tip button (changes the icon)
   * @param {boolean} [behaviour.showSpeechBubble] Set to 'false' to disable functionality (you may this in the editor)
   * @param {boolean} [behaviour.tabcontrol] Set to 'true' if you plan on controlling the tabindex in the parent (tabindex="-1")
   * @return {H5P.jQuery|undefined} Tip button jQuery element or 'undefined' if invalid tip
   */
  function JoubelTip(tipHtml, behaviour) {

    // Keep track of the popup that appears when you click the Tip button
    var speechBubble;

    // Parse tip html to determine text
    var tipText = $conv.html(tipHtml).text().trim();
    if (tipText === '') {
      return; // The tip has no textual content, i.e. it's invalid.
    }

    // Set default behaviour
    behaviour = $.extend({
      tipLabel: tipText,
      helpIcon: false,
      showSpeechBubble: true,
      tabcontrol: false
    }, behaviour);

    // Create Tip button
    var $tipButton = $('<div/>', {
      class: 'joubel-tip-container' + (behaviour.showSpeechBubble ? '' : ' be-quiet'),
      'aria-label': behaviour.tipLabel,
      'aria-expanded': false,
      role: 'button',
      tabindex: (behaviour.tabcontrol ? -1 : 0),
      click: function (event) {
        // Toggle show/hide popup
        toggleSpeechBubble();
        event.preventDefault();
      },
      keydown: function (event) {
        if (event.which === 32 || event.which === 13) { // Space & enter key
          // Toggle show/hide popup
          toggleSpeechBubble();
          event.stopPropagation();
          event.preventDefault();
        }
        else { // Any other key
          // Toggle hide popup
          toggleSpeechBubble(false);
        }
      },
      // Add markup to render icon
      html: '<span class="joubel-icon-tip-normal ' + (behaviour.helpIcon ? ' help-icon': '') + '">' +
              '<span class="h5p-icon-shadow"></span>' +
              '<span class="h5p-icon-speech-bubble"></span>' +
              '<span class="h5p-icon-info"></span>' +
            '</span>'
      // IMPORTANT: All of the markup elements must have 'pointer-events: none;'
    });

    const $tipAnnouncer = $('<div>', {
      'class': 'hidden-but-read',
      'aria-live': 'polite',
      appendTo: $tipButton,
    });

    /**
     * Tip button interaction handler.
     * Toggle show or hide the speech bubble popup when interacting with the
     * Tip button.
     *
     * @private
     * @param {boolean} [force] 'true' shows and 'false' hides.
     */
    var toggleSpeechBubble = function (force) {
      if (speechBubble !== undefined && speechBubble.isCurrent($tipButton)) {
        // Hide current popup
        speechBubble.remove();
        speechBubble = undefined;

        $tipButton.attr('aria-expanded', false);
        $tipAnnouncer.html('');
      }
      else if (force !== false && behaviour.showSpeechBubble) {
        // Create and show new popup
        speechBubble = H5P.JoubelSpeechBubble($tipButton, tipHtml);
        $tipButton.attr('aria-expanded', true);
        $tipAnnouncer.html(tipHtml);
      }
    };

    return $tipButton;
  }

  return JoubelTip;
})(H5P.jQuery);
;
var H5P = H5P || {};

H5P.JoubelSlider = (function ($) {

  /**
   * Creates a new Slider
   *
   * @param {object} [params] Additional parameters
   */
  function JoubelSlider(params) {
    H5P.EventDispatcher.call(this);

    this.$slider = $('<div>', $.extend({
      'class': 'h5p-joubel-ui-slider'
    }, params));

    this.$slides = [];
    this.currentIndex = 0;
    this.numSlides = 0;
  }
  JoubelSlider.prototype = Object.create(H5P.EventDispatcher.prototype);
  JoubelSlider.prototype.constructor = JoubelSlider;

  JoubelSlider.prototype.addSlide = function ($content) {
    $content.addClass('h5p-joubel-ui-slide').css({
      'left': (this.numSlides*100) + '%'
    });
    this.$slider.append($content);
    this.$slides.push($content);

    this.numSlides++;

    if(this.numSlides === 1) {
      $content.addClass('current');
    }
  };

  JoubelSlider.prototype.attach = function ($container) {
    $container.append(this.$slider);
  };

  JoubelSlider.prototype.move = function (index) {
    var self = this;

    if(index === 0) {
      self.trigger('first-slide');
    }
    if(index+1 === self.numSlides) {
      self.trigger('last-slide');
    }
    self.trigger('move');

    var $previousSlide = self.$slides[this.currentIndex];
    H5P.Transition.onTransitionEnd(this.$slider, function () {
      $previousSlide.removeClass('current');
      self.trigger('moved');
    });
    this.$slides[index].addClass('current');

    var translateX = 'translateX(' + (-index*100) + '%)';
    this.$slider.css({
      '-webkit-transform': translateX,
      '-moz-transform': translateX,
      '-ms-transform': translateX,
      'transform': translateX
    });

    this.currentIndex = index;
  };

  JoubelSlider.prototype.remove = function () {
    this.$slider.remove();
  };

  JoubelSlider.prototype.next = function () {
    if(this.currentIndex+1 >= this.numSlides) {
      return;
    }

    this.move(this.currentIndex+1);
  };

  JoubelSlider.prototype.previous = function () {
    this.move(this.currentIndex-1);
  };

  JoubelSlider.prototype.first = function () {
    this.move(0);
  };

  JoubelSlider.prototype.last = function () {
    this.move(this.numSlides-1);
  };

  return JoubelSlider;
})(H5P.jQuery);
;
var H5P = H5P || {};

/**
 * @module
 */
H5P.JoubelScoreBar = (function ($) {

  /* Need to use an id for the star SVG since that is the only way to reference
     SVG filters  */
  var idCounter = 0;

  /**
   * Creates a score bar
   * @class H5P.JoubelScoreBar
   * @param {number} maxScore  Maximum score
   * @param {string} [label] Makes it easier for readspeakers to identify the scorebar
   * @param {string} [helpText] Score explanation
   * @param {string} [scoreExplanationButtonLabel] Label for score explanation button
   */
  function JoubelScoreBar(maxScore, label, helpText, scoreExplanationButtonLabel) {
    var self = this;

    self.maxScore = maxScore;
    self.score = 0;
    idCounter++;

    /**
     * @const {string}
     */
    self.STAR_MARKUP = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63.77 53.87" aria-hidden="true" focusable="false">' +
        '<title>star</title>' +
        '<filter id="h5p-joubelui-score-bar-star-inner-shadow-' + idCounter + '" x0="-50%" y0="-50%" width="200%" height="200%">' +
          '<feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"></feGaussianBlur>' +
          '<feOffset dy="2" dx="4"></feOffset>' +
          '<feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"></feComposite>' +
          '<feFlood flood-color="#ffe95c" flood-opacity="1"></feFlood>' +
          '<feComposite in2="shadowDiff" operator="in"></feComposite>' +
          '<feComposite in2="SourceGraphic" operator="over" result="firstfilter"></feComposite>' +
          '<feGaussianBlur in="firstfilter" stdDeviation="3" result="blur2"></feGaussianBlur>' +
          '<feOffset dy="-2" dx="-4"></feOffset>' +
          '<feComposite in2="firstfilter" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"></feComposite>' +
          '<feFlood flood-color="#ffe95c" flood-opacity="1"></feFlood>' +
          '<feComposite in2="shadowDiff" operator="in"></feComposite>' +
          '<feComposite in2="firstfilter" operator="over"></feComposite>' +
        '</filter>' +
        '<path class="h5p-joubelui-score-bar-star-shadow" d="M35.08,43.41V9.16H20.91v0L9.51,10.85,9,10.93C2.8,12.18,0,17,0,21.25a11.22,11.22,0,0,0,3,7.48l8.73,8.53-1.07,6.16Z"/>' +
        '<g>' +
          '<path class="h5p-joubelui-score-bar-star-border" d="M61.36,22.8,49.72,34.11l2.78,16a2.6,2.6,0,0,1,.05.64c0,.85-.37,1.6-1.33,1.6A2.74,2.74,0,0,1,49.94,52L35.58,44.41,21.22,52a2.93,2.93,0,0,1-1.28.37c-.91,0-1.33-.75-1.33-1.6,0-.21.05-.43.05-.64l2.78-16L9.8,22.8A2.57,2.57,0,0,1,9,21.25c0-1,1-1.33,1.81-1.49l16.07-2.35L34.09,2.83c.27-.59.85-1.33,1.55-1.33s1.28.69,1.55,1.33l7.21,14.57,16.07,2.35c.75.11,1.81.53,1.81,1.49A3.07,3.07,0,0,1,61.36,22.8Z"/>' +
          '<path class="h5p-joubelui-score-bar-star-fill" d="M61.36,22.8,49.72,34.11l2.78,16a2.6,2.6,0,0,1,.05.64c0,.85-.37,1.6-1.33,1.6A2.74,2.74,0,0,1,49.94,52L35.58,44.41,21.22,52a2.93,2.93,0,0,1-1.28.37c-.91,0-1.33-.75-1.33-1.6,0-.21.05-.43.05-.64l2.78-16L9.8,22.8A2.57,2.57,0,0,1,9,21.25c0-1,1-1.33,1.81-1.49l16.07-2.35L34.09,2.83c.27-.59.85-1.33,1.55-1.33s1.28.69,1.55,1.33l7.21,14.57,16.07,2.35c.75.11,1.81.53,1.81,1.49A3.07,3.07,0,0,1,61.36,22.8Z"/>' +
          '<path filter="url(#h5p-joubelui-score-bar-star-inner-shadow-' + idCounter + ')" class="h5p-joubelui-score-bar-star-fill-full-score" d="M61.36,22.8,49.72,34.11l2.78,16a2.6,2.6,0,0,1,.05.64c0,.85-.37,1.6-1.33,1.6A2.74,2.74,0,0,1,49.94,52L35.58,44.41,21.22,52a2.93,2.93,0,0,1-1.28.37c-.91,0-1.33-.75-1.33-1.6,0-.21.05-.43.05-.64l2.78-16L9.8,22.8A2.57,2.57,0,0,1,9,21.25c0-1,1-1.33,1.81-1.49l16.07-2.35L34.09,2.83c.27-.59.85-1.33,1.55-1.33s1.28.69,1.55,1.33l7.21,14.57,16.07,2.35c.75.11,1.81.53,1.81,1.49A3.07,3.07,0,0,1,61.36,22.8Z"/>' +
        '</g>' +
      '</svg>';

    /**
     * @function appendTo
     * @memberOf H5P.JoubelScoreBar#
     * @param {H5P.jQuery}  $wrapper  Dom container
     */
    self.appendTo = function ($wrapper) {
      self.$scoreBar.appendTo($wrapper);
    };

    /**
     * Create the text representation of the scorebar .
     *
     * @private
     * @return {string}
     */
    var createLabel = function (score) {
      if (!label) {
        return '';
      }

      return label.replace(':num', score).replace(':total', self.maxScore);
    };

    /**
     * Creates the html for this widget
     *
     * @method createHtml
     * @private
     */
    var createHtml = function () {
      // Container div
      self.$scoreBar = $('<div>', {
        'class': 'h5p-joubelui-score-bar',
      });

      var $visuals = $('<div>', {
        'class': 'h5p-joubelui-score-bar-visuals',
        appendTo: self.$scoreBar
      });

      // The progress bar wrapper
      self.$progressWrapper = $('<div>', {
        'class': 'h5p-joubelui-score-bar-progress-wrapper',
        appendTo: $visuals
      });

      self.$progress = $('<div>', {
        'class': 'h5p-joubelui-score-bar-progress',
        'html': createLabel(self.score),
        appendTo: self.$progressWrapper
      });

      // The star
      $('<div>', {
        'class': 'h5p-joubelui-score-bar-star',
        html: self.STAR_MARKUP
      }).appendTo($visuals);

      // The score container
      var $numerics = $('<div>', {
        'class': 'h5p-joubelui-score-numeric',
        appendTo: self.$scoreBar,
        'aria-hidden': true
      });

      // The current score
      self.$scoreCounter = $('<span>', {
        'class': 'h5p-joubelui-score-number h5p-joubelui-score-number-counter',
        text: 0,
        appendTo: $numerics
      });

      // The separator
      $('<span>', {
        'class': 'h5p-joubelui-score-number-separator',
        text: '/',
        appendTo: $numerics
      });

      // Max score
      self.$maxScore = $('<span>', {
        'class': 'h5p-joubelui-score-number h5p-joubelui-score-max',
        text: self.maxScore,
        appendTo: $numerics
      });

      if (helpText) {
        H5P.JoubelUI.createTip(helpText, {
          tipLabel: scoreExplanationButtonLabel ? scoreExplanationButtonLabel : helpText,
          helpIcon: true
        }).appendTo(self.$scoreBar);
        self.$scoreBar.addClass('h5p-score-bar-has-help');
      }
    };

    /**
     * Set the current score
     * @method setScore
     * @memberOf H5P.JoubelScoreBar#
     * @param  {number} score
     */
    self.setScore = function (score) {
      // Do nothing if score hasn't changed
      if (score === self.score) {
        return;
      }
      self.score = score > self.maxScore ? self.maxScore : score;
      self.updateVisuals();
    };

    /**
     * Increment score
     * @method incrementScore
     * @memberOf H5P.JoubelScoreBar#
     * @param  {number=}        incrementBy Optional parameter, defaults to 1
     */
    self.incrementScore = function (incrementBy) {
      self.setScore(self.score + (incrementBy || 1));
    };

    /**
     * Set the max score
     * @method setMaxScore
     * @memberOf H5P.JoubelScoreBar#
     * @param  {number}    maxScore The max score
     */
    self.setMaxScore = function (maxScore) {
      self.maxScore = maxScore;
    };

    /**
     * Updates the progressbar visuals
     * @memberOf H5P.JoubelScoreBar#
     * @method updateVisuals
     */
    self.updateVisuals = function () {
      self.$progress.html(createLabel(self.score));
      self.$scoreCounter.text(self.score);
      self.$maxScore.text(self.maxScore);

      setTimeout(function () {
        // Start the progressbar animation
        self.$progress.css({
          width: ((self.score / self.maxScore) * 100) + '%'
        });

        H5P.Transition.onTransitionEnd(self.$progress, function () {
          // If fullscore fill the star and start the animation
          self.$scoreBar.toggleClass('h5p-joubelui-score-bar-full-score', self.score === self.maxScore);
          self.$scoreBar.toggleClass('h5p-joubelui-score-bar-animation-active', self.score === self.maxScore);

          // Only allow the star animation to run once
          self.$scoreBar.one("animationend", function() {
            self.$scoreBar.removeClass("h5p-joubelui-score-bar-animation-active");
          });
        }, 600);
      }, 300);
    };

    /**
     * Removes all classes
     * @method reset
     */
    self.reset = function () {
      self.$scoreBar.removeClass('h5p-joubelui-score-bar-full-score');
    };

    createHtml();
  }

  return JoubelScoreBar;
})(H5P.jQuery);
;
var H5P = H5P || {};

H5P.JoubelProgressbar = (function ($) {

  /**
   * Joubel progressbar class
   * @method JoubelProgressbar
   * @constructor
   * @param  {number}          steps Number of steps
   * @param {Object} [options] Additional options
   * @param {boolean} [options.disableAria] Disable readspeaker assistance
   * @param {string} [options.progressText] A progress text for describing
   *  current progress out of total progress for readspeakers.
   *  e.g. "Slide :num of :total"
   */
  function JoubelProgressbar(steps, options) {
    H5P.EventDispatcher.call(this);
    var self = this;
    this.options = $.extend({
      progressText: 'Slide :num of :total'
    }, options);
    this.currentStep = 0;
    this.steps = steps;

    this.$progressbar = $('<div>', {
      'class': 'h5p-joubelui-progressbar',
      on: {
        click: function () {
          self.toggleTooltip();
          return false;
        },
        mouseenter: function () {
          self.showTooltip();
        },
        mouseleave: function () {
          setTimeout(function () {
            self.hideTooltip();
          }, 1500);
        }
      }
    });
    this.$background = $('<div>', {
      'class': 'h5p-joubelui-progressbar-background'
    }).appendTo(this.$progressbar);

    $('body').click(function () {
      self.toggleTooltip(true);
    });
  }

  JoubelProgressbar.prototype = Object.create(H5P.EventDispatcher.prototype);
  JoubelProgressbar.prototype.constructor = JoubelProgressbar;

  /**
   * Display tooltip
   * @method showTooltip
   */
  JoubelProgressbar.prototype.showTooltip = function () {
    var self = this;

    if (this.currentStep === 0 || this.tooltip !== undefined) {
      return;
    }

    var parentWidth = self.$progressbar.offset().left + self.$progressbar.width();

    this.tooltip = new H5P.Drop({
      target: this.$background.get(0),
      content: this.currentStep + '/' + this.steps,
      classes: 'drop-theme-arrows-bounce h5p-joubelui-drop',
      position: 'top right',
      openOn: 'always',
      tetherOptions: {
        attachment: 'bottom center',
        targetAttachment: 'top right'
      }
    });
    this.tooltip.on('open', function () {
      var $drop = $(self.tooltip.drop);
      var left = $drop.position().left;
      var dropWidth = $drop.width();

      // Need to handle drops getting outside of the progressbar:
      if (left < 0) {
        $drop.css({marginLeft: (-left) + 'px'});
      }
      else if (left + dropWidth > parentWidth) {
        $drop.css({marginLeft: (parentWidth - (left + dropWidth)) + 'px'});
      }
    });
  };

  JoubelProgressbar.prototype.updateAria = function () {
    var self = this;
    if (this.options.disableAria) {
      return;
    }

    if (!this.$currentStatus) {
      this.$currentStatus = $('<div>', {
        'class': 'h5p-joubelui-progressbar-slide-status-text',
        'aria-live': 'assertive'
      }).appendTo(this.$progressbar);
    }
    var interpolatedProgressText = self.options.progressText
      .replace(':num', self.currentStep)
      .replace(':total', self.steps);
    this.$currentStatus.html(interpolatedProgressText);
  };

  /**
   * Hides tooltip
   * @method hideTooltip
   */
  JoubelProgressbar.prototype.hideTooltip = function () {
    if (this.tooltip !== undefined) {
      this.tooltip.remove();
      this.tooltip.destroy();
      this.tooltip = undefined;
    }
  };

  /**
   * Toggles tooltip-visibility
   * @method toggleTooltip
   * @param  {boolean} [closeOnly] Don't show, only close if open
   */
  JoubelProgressbar.prototype.toggleTooltip = function (closeOnly) {
    if (this.tooltip === undefined && !closeOnly) {
      this.showTooltip();
    }
    else if (this.tooltip !== undefined) {
      this.hideTooltip();
    }
  };

  /**
   * Appends to a container
   * @method appendTo
   * @param  {H5P.jquery} $container
   */
  JoubelProgressbar.prototype.appendTo = function ($container) {
    this.$progressbar.appendTo($container);
  };

  /**
   * Update progress
   * @method setProgress
   * @param  {number}    step
   */
  JoubelProgressbar.prototype.setProgress = function (step) {
    // Check for valid value:
    if (step > this.steps || step < 0) {
      return;
    }
    this.currentStep = step;
    this.$background.css({
      width: ((this.currentStep/this.steps)*100) + '%'
    });

    this.updateAria();
  };

  /**
   * Increment progress with 1
   * @method next
   */
  JoubelProgressbar.prototype.next = function () {
    this.setProgress(this.currentStep+1);
  };

  /**
   * Reset progressbar
   * @method reset
   */
  JoubelProgressbar.prototype.reset = function () {
    this.setProgress(0);
  };

  /**
   * Check if last step is reached
   * @method isLastStep
   * @return {Boolean}
   */
  JoubelProgressbar.prototype.isLastStep = function () {
    return this.steps === this.currentStep;
  };

  return JoubelProgressbar;
})(H5P.jQuery);
;
var H5P = H5P || {};

/**
 * H5P Joubel UI library.
 *
 * This is a utility library, which does not implement attach. I.e, it has to bee actively used by
 * other libraries
 * @module
 */
H5P.JoubelUI = (function ($) {

  /**
   * The internal object to return
   * @class H5P.JoubelUI
   * @static
   */
  function JoubelUI() {}

  /* Public static functions */

  /**
   * Create a tip icon
   * @method H5P.JoubelUI.createTip
   * @param  {string}  text   The textual tip
   * @param  {Object}  params Parameters
   * @return {H5P.JoubelTip}
   */
  JoubelUI.createTip = function (text, params) {
    return new H5P.JoubelTip(text, params);
  };

  /**
   * Create message dialog
   * @method H5P.JoubelUI.createMessageDialog
   * @param  {H5P.jQuery}               $container The dom container
   * @param  {string}                   message    The message
   * @return {H5P.JoubelMessageDialog}
   */
  JoubelUI.createMessageDialog = function ($container, message) {
    return new H5P.JoubelMessageDialog($container, message);
  };

  /**
   * Create help text dialog
   * @method H5P.JoubelUI.createHelpTextDialog
   * @param  {string}             header  The textual header
   * @param  {string}             message The textual message
   * @param  {string}             closeButtonTitle The title for the close button
   * @return {H5P.JoubelHelpTextDialog}
   */
  JoubelUI.createHelpTextDialog = function (header, message, closeButtonTitle) {
    return new H5P.JoubelHelpTextDialog(header, message, closeButtonTitle);
  };

  /**
   * Create progress circle
   * @method H5P.JoubelUI.createProgressCircle
   * @param  {number}             number          The progress (0 to 100)
   * @param  {string}             progressColor   The progress color in hex value
   * @param  {string}             fillColor       The fill color in hex value
   * @param  {string}             backgroundColor The background color in hex value
   * @return {H5P.JoubelProgressCircle}
   */
  JoubelUI.createProgressCircle = function (number, progressColor, fillColor, backgroundColor) {
    return new H5P.JoubelProgressCircle(number, progressColor, fillColor, backgroundColor);
  };

  /**
   * Create throbber for loading
   * @method H5P.JoubelUI.createThrobber
   * @return {H5P.JoubelThrobber}
   */
  JoubelUI.createThrobber = function () {
    return new H5P.JoubelThrobber();
  };

  /**
   * Create simple rounded button
   * @method H5P.JoubelUI.createSimpleRoundedButton
   * @param  {string}                  text The button label
   * @return {H5P.SimpleRoundedButton}
   */
  JoubelUI.createSimpleRoundedButton = function (text) {
    return new H5P.SimpleRoundedButton(text);
  };

  /**
   * Create Slider
   * @method H5P.JoubelUI.createSlider
   * @param  {Object} [params] Parameters
   * @return {H5P.JoubelSlider}
   */
  JoubelUI.createSlider = function (params) {
    return new H5P.JoubelSlider(params);
  };

  /**
   * Create Score Bar
   * @method H5P.JoubelUI.createScoreBar
   * @param  {number=}       maxScore The maximum score
   * @param {string} [label] Makes it easier for readspeakers to identify the scorebar
   * @return {H5P.JoubelScoreBar}
   */
  JoubelUI.createScoreBar = function (maxScore, label, helpText, scoreExplanationButtonLabel) {
    return new H5P.JoubelScoreBar(maxScore, label, helpText, scoreExplanationButtonLabel);
  };

  /**
   * Create Progressbar
   * @method H5P.JoubelUI.createProgressbar
   * @param  {number=}       numSteps The total numer of steps
   * @param {Object} [options] Additional options
   * @param {boolean} [options.disableAria] Disable readspeaker assistance
   * @param {string} [options.progressText] A progress text for describing
   *  current progress out of total progress for readspeakers.
   *  e.g. "Slide :num of :total"
   * @return {H5P.JoubelProgressbar}
   */
  JoubelUI.createProgressbar = function (numSteps, options) {
    return new H5P.JoubelProgressbar(numSteps, options);
  };

  /**
   * Create standard Joubel button
   *
   * @method H5P.JoubelUI.createButton
   * @param {object} params
   *  May hold any properties allowed by jQuery. If href is set, an A tag
   *  is used, if not a button tag is used.
   * @return {H5P.jQuery} The jquery element created
   */
  JoubelUI.createButton = function(params) {
    var type = 'button';
    if (params.href) {
      type = 'a';
    }
    else {
      params.type = 'button';
    }
    if (params.class) {
      params.class += ' h5p-joubelui-button';
    }
    else {
      params.class = 'h5p-joubelui-button';
    }
    return $('<' + type + '/>', params);
  };

  /**
   * Fix for iframe scoll bug in IOS. When focusing an element that doesn't have
   * focus support by default the iframe will scroll the parent frame so that
   * the focused element is out of view. This varies dependening on the elements
   * of the parent frame.
   */
  if (H5P.isFramed && !H5P.hasiOSiframeScrollFix &&
      /iPad|iPhone|iPod/.test(navigator.userAgent)) {
    H5P.hasiOSiframeScrollFix = true;

    // Keep track of original focus function
    var focus = HTMLElement.prototype.focus;

    // Override the original focus
    HTMLElement.prototype.focus = function () {
      // Only focus the element if it supports it natively
      if ( (this instanceof HTMLAnchorElement ||
            this instanceof HTMLInputElement ||
            this instanceof HTMLSelectElement ||
            this instanceof HTMLTextAreaElement ||
            this instanceof HTMLButtonElement ||
            this instanceof HTMLIFrameElement ||
            this instanceof HTMLAreaElement) && // HTMLAreaElement isn't supported by Safari yet.
          !this.getAttribute('role')) { // Focus breaks if a different role has been set
          // In theory this.isContentEditable should be able to recieve focus,
          // but it didn't work when tested.

        // Trigger the original focus with the proper context
        focus.call(this);
      }
    };
  }

  return JoubelUI;
})(H5P.jQuery);
;
!function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=6)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.jQuery=H5P.jQuery,t.EventDispatcher=H5P.EventDispatcher,t.JoubelUI=H5P.JoubelUI},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.stripHTML=t.addClickAndKeyboardListeners=t.keyCode=t.defaultValue=t.contains=t.isIOS=t.isIPad=t.kebabCase=t.isFunction=t.flattenArray=void 0;var i=n(0),r=(t.flattenArray=function(e){return e.concat.apply([],e)},t.isFunction=function(e){return"function"==typeof e},t.kebabCase=function(e){return e.replace(/[\W]/g,"-")},t.isIPad=null!==navigator.userAgent.match(/iPad/i),t.isIOS=null!==navigator.userAgent.match(/iPad|iPod|iPhone/i),t.contains=function(e,t){return-1!==e.indexOf(t)}),s=(t.defaultValue=function(e,t){return void 0!==e?e:t},t.keyCode={ENTER:13,ESC:27,SPACE:32}),o=(t.addClickAndKeyboardListeners=function(e,t,n){e.click(function(e){t.call(n||this,e)}),e.keydown(function(e){r([s.ENTER,s.SPACE],e.which)&&(e.preventDefault(),t.call(n||this,e))})},(0,i.jQuery)("<div>"));t.stripHTML=function(e){return o.html(e).text().trim()}},function(e,t,n){"use strict";function i(e,t){var n=this;s.call(n),n.children=[];var i=function(e){for(var t=e;t<n.children.length;t++)n.children[t].index=t};if(n.addChild=function(t,s){void 0===s&&(s=n.children.length);var o=new r(s,n);return s===n.children.length?n.children.push(o):(n.children.splice(s,0,o),i(s)),e.call(o,t),o},n.removeChild=function(e){n.children.splice(e,1),i(e)},n.moveChild=function(e,t){var r=n.children.splice(e,1)[0];n.children.splice(t,0,r),i(t<e?t:e)},t)for(var o=0;o<t.length;o++)n.addChild(t[o])}var r=n(15),s=H5P.EventDispatcher;i.prototype=Object.create(s.prototype),i.prototype.constructor=i,e.exports=i},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=n(19),a=n(4),l=n(20),d=(0,o.removeAttribute)("tabindex"),c=((0,a.forEach)(d),(0,o.setAttribute)("tabindex","0")),u=(0,o.setAttribute)("tabindex","-1"),p=(0,o.hasAttribute)("tabindex"),h=function(){function e(t){i(this,e),r(this,(0,l.Eventful)()),this.plugins=t||[],this.elements=[],this.negativeTabIndexAllowed=!1,this.on("nextElement",this.nextElement,this),this.on("previousElement",this.previousElement,this),this.on("firstElement",this.firstElement,this),this.on("lastElement",this.lastElement,this),this.initPlugins()}return s(e,[{key:"addElement",value:function(e){this.elements.push(e),this.firesEvent("addElement",e),1===this.elements.length&&this.setTabbable(e)}},{key:"insertElementAt",value:function(e,t){this.elements.splice(t,0,e),this.firesEvent("addElement",e),1===this.elements.length&&this.setTabbable(e)}},{key:"removeElement",value:function(e){this.elements=(0,a.without)([e],this.elements),p(e)&&(this.setUntabbable(e),this.elements[0]&&this.setTabbable(this.elements[0])),this.firesEvent("removeElement",e)}},{key:"count",value:function(){return this.elements.length}},{key:"firesEvent",value:function(e,t){var n=this.elements.indexOf(t);return this.fire(e,{element:t,index:n,elements:this.elements,oldElement:this.tabbableElement})}},{key:"nextElement",value:function(e){var t=e.index,n=t===this.elements.length-1,i=this.elements[n?0:t+1];this.setTabbable(i),i.focus()}},{key:"firstElement",value:function(){var e=this.elements[0];this.setTabbable(e),e.focus()}},{key:"lastElement",value:function(){var e=this.elements[this.elements.length-1];this.setTabbable(e),e.focus()}},{key:"setTabbableByIndex",value:function(e){var t=this.elements[e];t&&this.setTabbable(t)}},{key:"setTabbable",value:function(e){(0,a.forEach)(this.setUntabbable.bind(this),this.elements),c(e),this.tabbableElement=e}},{key:"setUntabbable",value:function(e){e!==document.activeElement&&(this.negativeTabIndexAllowed?u(e):d(e))}},{key:"previousElement",value:function(e){var t=e.index,n=0===t,i=this.elements[n?this.elements.length-1:t-1];this.setTabbable(i),i.focus()}},{key:"useNegativeTabIndex",value:function(){this.negativeTabIndexAllowed=!0,this.elements.forEach(function(e){e.hasAttribute("tabindex")||u(e)})}},{key:"initPlugins",value:function(){this.plugins.forEach(function(e){void 0!==e.init&&e.init(this)},this)}}]),e}();t.default=h},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=t.curry=function(e){var t=e.length;return function n(){var i=Array.prototype.slice.call(arguments,0);return i.length>=t?e.apply(null,i):function(){var e=Array.prototype.slice.call(arguments,0);return n.apply(null,i.concat(e))}}},r=(t.compose=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.reduce(function(e,t){return function(){return e(t.apply(void 0,arguments))}})},t.forEach=i(function(e,t){t.forEach(e)}),t.map=i(function(e,t){return t.map(e)}),t.filter=i(function(e,t){return t.filter(e)})),s=(t.some=i(function(e,t){return t.some(e)}),t.contains=i(function(e,t){return-1!=t.indexOf(e)}));t.without=i(function(e,t){return r(function(t){return!s(t,e)},t)}),t.inverseBooleanString=function(e){return("true"!==e).toString()}},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=function(){function e(){i(this,e),this.selectability=!0}return r(e,[{key:"init",value:function(e){this.boundHandleKeyDown=this.handleKeyDown.bind(this),this.controls=e,this.controls.on("addElement",this.listenForKeyDown,this),this.controls.on("removeElement",this.removeKeyDownListener,this)}},{key:"listenForKeyDown",value:function(e){e.element.addEventListener("keydown",this.boundHandleKeyDown)}},{key:"removeKeyDownListener",value:function(e){e.element.removeEventListener("keydown",this.boundHandleKeyDown)}},{key:"handleKeyDown",value:function(e){switch(e.which){case 27:this.close(e.target),e.preventDefault(),e.stopPropagation();break;case 35:this.lastElement(e.target),e.preventDefault(),e.stopPropagation();break;case 36:this.firstElement(e.target),e.preventDefault(),e.stopPropagation();break;case 13:case 32:this.select(e.target),e.preventDefault(),e.stopPropagation();break;case 37:case 38:this.hasChromevoxModifiers(e)||(this.previousElement(e.target),e.preventDefault(),e.stopPropagation());break;case 39:case 40:this.hasChromevoxModifiers(e)||(this.nextElement(e.target),e.preventDefault(),e.stopPropagation())}}},{key:"hasChromevoxModifiers",value:function(e){return e.shiftKey||e.ctrlKey}},{key:"previousElement",value:function(e){!1!==this.controls.firesEvent("beforePreviousElement",e)&&(this.controls.firesEvent("previousElement",e),this.controls.firesEvent("afterPreviousElement",e))}},{key:"nextElement",value:function(e){!1!==this.controls.firesEvent("beforeNextElement",e)&&(this.controls.firesEvent("nextElement",e),this.controls.firesEvent("afterNextElement",e))}},{key:"select",value:function(e){this.selectability&&!1!==this.controls.firesEvent("before-select",e)&&(this.controls.firesEvent("select",e),this.controls.firesEvent("after-select",e))}},{key:"firstElement",value:function(e){!1!==this.controls.firesEvent("beforeFirstElement",e)&&(this.controls.firesEvent("firstElement",e),this.controls.firesEvent("afterFirstElement",e))}},{key:"lastElement",value:function(e){!1!==this.controls.firesEvent("beforeLastElement",e)&&(this.controls.firesEvent("lastElement",e),this.controls.firesEvent("afterLastElement",e))}},{key:"disableSelectability",value:function(){this.selectability=!1}},{key:"enableSelectability",value:function(){this.selectability=!0}},{key:"close",value:function(e){!1!==this.controls.firesEvent("before-close",e)&&(this.controls.firesEvent("close",e),this.controls.firesEvent("after-close",e))}}]),e}();t.default=s},function(e,t,n){"use strict";n(7),n(8),n(9),n(10),n(11),n(12),n(13);var i=n(14),r=function(e){return e&&e.__esModule?e:{default:e}}(i);H5P=H5P||{},H5P.CoursePresentation=r.default},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){var n=[],i=!0,r=!1,s=void 0;try{for(var o,a=e[Symbol.iterator]();!(i=(o=a.next()).done)&&(n.push(o.value),!t||n.length!==t);i=!0);}catch(e){r=!0,s=e}finally{try{!i&&a.return&&a.return()}finally{if(r)throw s}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=n(2),a=i(o),l=n(16),d=i(l),c=n(17),u=i(c),p=n(21),h=i(p),f=n(22),v=i(f),m=n(0),y=n(1),g=n(23),b=i(g),S=n(26),w=i(S),x=function(e,t,n){var i=this;this.presentation=e.presentation,this.slides=this.presentation.slides,this.contentId=t,this.elementInstances=[],this.elementsAttached=[],this.slidesWithSolutions=[],this.hasAnswerElements=!1,this.ignoreResize=!1,this.isTask=!1,this.standalone=!0,this.isReportingEnabled=!1,n.cpEditor&&(this.editor=n.cpEditor),n&&(this.previousState=n.previousState,this.standalone=n.standalone,this.isReportingEnabled=n.isReportingEnabled||n.isScoringEnabled),this.currentSlideIndex=this.previousState&&this.previousState.progress?this.previousState.progress:0,this.presentation.keywordListEnabled=void 0===e.presentation.keywordListEnabled||e.presentation.keywordListEnabled,this.l10n=m.jQuery.extend({slide:"Slide",score:"Score",yourScore:"Your score",maxScore:"Max score",total:"Total",totalScore:"Total Score",showSolutions:"Show solutions",summary:"summary",retry:"Retry",exportAnswers:"Export text",close:"Close",hideKeywords:"Hide sidebar navigation menu",showKeywords:"Show sidebar navigation menu",fullscreen:"Fullscreen",exitFullscreen:"Exit fullscreen",prevSlide:"Previous slide",nextSlide:"Next slide",currentSlide:"Current slide",lastSlide:"Last slide",solutionModeTitle:"Exit solution mode",solutionModeText:"Solution Mode",summaryMultipleTaskText:"Multiple tasks",scoreMessage:"You achieved:",shareFacebook:"Share on Facebook",shareTwitter:"Share on Twitter",shareGoogle:"Share on Google+",goToSlide:"Go to slide :num",solutionsButtonTitle:"Show comments",printTitle:"Print",printIngress:"How would you like to print this presentation?",printAllSlides:"Print all slides",printCurrentSlide:"Print current slide",noTitle:"No title",accessibilitySlideNavigationExplanation:"Use left and right arrow to change slide in that direction whenever canvas is selected.",containsNotCompleted:"@slideName contains not completed interaction",containsCompleted:"@slideName contains completed interaction",slideCount:"Slide @index of @total",accessibilityCanvasLabel:"Presentation canvas. Use left and right arrow to move between slides.",containsOnlyCorrect:"@slideName only has correct answers",containsIncorrectAnswers:"@slideName has incorrect answers",shareResult:"Share Result",accessibilityTotalScore:"You got @score of @maxScore points in total",accessibilityEnteredFullscreen:"Entered fullscreen",accessibilityExitedFullscreen:"Exited fullscreen",confirmDialogHeader:"Submit your answers",confirmDialogText:"This will submit your results, do you want to continue?",confirmDialogConfirmText:"Submit and see results"},void 0!==e.l10n?e.l10n:{}),e.override&&(this.activeSurface=!!e.override.activeSurface,this.hideSummarySlide=!!e.override.hideSummarySlide,this.enablePrintButton=!!e.override.enablePrintButton,this.showSummarySlideSolutionButton=void 0===e.override.summarySlideSolutionButton||e.override.summarySlideSolutionButton,this.showSummarySlideRetryButton=void 0===e.override.summarySlideRetryButton||e.override.summarySlideRetryButton,e.override.social&&(this.enableTwitterShare=!!e.override.social.showTwitterShare,this.enableFacebookShare=!!e.override.social.showFacebookShare,this.enableGoogleShare=!!e.override.social.showGoogleShare,this.twitterShareStatement=e.override.social.twitterShare.statement,this.twitterShareHashtags=e.override.social.twitterShare.hashtags,this.twitterShareUrl=e.override.social.twitterShare.url,this.facebookShareUrl=e.override.social.facebookShare.url,this.facebookShareQuote=e.override.social.facebookShare.quote,this.googleShareUrl=e.override.social.googleShareUrl)),this.keywordMenu=new v.default({l10n:this.l10n,currentIndex:void 0!==this.previousState?this.previousState.progress:0}),this.setElementsOverride(e.override),a.default.call(this,b.default,e.presentation.slides),this.on("resize",this.resize,this),this.on("printing",function(e){i.ignoreResize=!e.data.finished,e.data.finished?i.resize():e.data.allSlides&&i.attachAllElements()})};x.prototype=Object.create(a.default.prototype),x.prototype.constructor=x,x.prototype.getCurrentState=function(){var e=this,t=this.previousState?this.previousState:{};t.progress=this.getCurrentSlideIndex(),t.answers||(t.answers=[]),t.answered=this.elementInstances.map(function(t,n){return e.slideHasAnsweredTask(n)});for(var n=0;n<this.elementInstances.length;n++)if(this.elementInstances[n])for(var i=0;i<this.elementInstances[n].length;i++){var r=this.elementInstances[n][i];(r.getCurrentState instanceof Function||"function"==typeof r.getCurrentState)&&(t.answers[n]||(t.answers[n]=[]),t.answers[n][i]=r.getCurrentState())}return t},x.prototype.slideHasAnsweredTask=function(e){return(this.slidesWithSolutions[e]||[]).filter(function(e){return(0,y.isFunction)(e.getAnswerGiven)}).some(function(e){return e.getAnswerGiven()})},x.prototype.attach=function(e){var t=this,n=this;void 0!==this.isRoot&&this.isRoot()&&this.setActivityStarted();var i='<div class="h5p-keymap-explanation hidden-but-read">'+this.l10n.accessibilitySlideNavigationExplanation+'</div><div class="h5p-fullscreen-announcer hidden-but-read" aria-live="polite"></div><div class="h5p-wrapper" tabindex="0" aria-label="'+this.l10n.accessibilityCanvasLabel+'">  <div class="h5p-current-slide-announcer hidden-but-read" aria-live="polite"></div>  <div tabindex="-1"></div>  <div class="h5p-box-wrapper">    <div class="h5p-presentation-wrapper">      <div class="h5p-keywords-wrapper"></div>     <div class="h5p-slides-wrapper" aria-live="polite"></div>    </div>  </div>  <nav class="h5p-cp-navigation">    <ol class="h5p-progressbar list-unstyled"></ol>  </nav>  <div class="h5p-footer"></div></div>';e.attr("role","application").addClass("h5p-course-presentation").html(i),this.$container=e,this.$slideAnnouncer=e.find(".h5p-current-slide-announcer"),this.$fullscreenAnnouncer=e.find(".h5p-fullscreen-announcer"),this.$slideTop=this.$slideAnnouncer.next(),this.$wrapper=e.children(".h5p-wrapper").focus(function(){n.initKeyEvents()}).blur(function(){void 0!==n.keydown&&(H5P.jQuery("body").unbind("keydown",n.keydown),delete n.keydown)}).click(function(e){var t=H5P.jQuery(e.target),i=n.belongsToTagName(e.target,["input","textarea","a","button"],e.currentTarget),r=-1!==e.target.tabIndex,s=t.closest(".h5p-popup-container"),o=0!==s.length;if(!i&&!r&&!n.editor)if(o){var a=t.closest("[tabindex]");1===a.closest(".h5p-popup-container").length?a.focus():s.find(".h5p-close-popup").focus()}else n.$wrapper.focus();n.presentation.keywordListEnabled&&!n.presentation.keywordListAlwaysShow&&n.presentation.keywordListAutoHide&&!t.is("textarea, .h5p-icon-pencil, span")&&n.hideKeywords()}),this.on("exitFullScreen",function(){t.$footer.removeClass("footer-full-screen"),t.$fullScreenButton.attr("title",t.l10n.fullscreen),t.$fullscreenAnnouncer.html(t.l10n.accessibilityExitedFullscreen)}),this.on("enterFullScreen",function(){t.$fullscreenAnnouncer.html(t.l10n.accessibilityEnteredFullscreen)});var r=parseInt(this.$wrapper.css("width"));this.width=0!==r?r:640;var s=parseInt(this.$wrapper.css("height"));this.height=0!==s?s:400,this.ratio=16/9,this.fontSize=16,this.$boxWrapper=this.$wrapper.children(".h5p-box-wrapper");var o=this.$boxWrapper.children(".h5p-presentation-wrapper");this.$slidesWrapper=o.children(".h5p-slides-wrapper"),this.$keywordsWrapper=o.children(".h5p-keywords-wrapper"),this.$progressbar=this.$wrapper.find(".h5p-progressbar"),this.$footer=this.$wrapper.children(".h5p-footer"),this.initKeywords=void 0===this.presentation.keywordListEnabled||!0===this.presentation.keywordListEnabled||void 0!==this.editor,this.activeSurface&&void 0===this.editor&&(this.initKeywords=!1,this.$boxWrapper.css("height","100%")),this.isSolutionMode=!1,this.createSlides(),this.elementsAttached[this.currentSlideIndex]=!0;var a;if(this.showSummarySlide=!1,this.hideSummarySlide?this.showSummarySlide=!this.hideSummarySlide:this.slidesWithSolutions.forEach(function(e){n.showSummarySlide=e.length}),void 0===this.editor&&(this.showSummarySlide||this.hasAnswerElements)){var l={elements:[],keywords:[]};this.slides.push(l),a=H5P.jQuery(b.default.createHTML(l)).appendTo(this.$slidesWrapper),a.addClass("h5p-summary-slide"),this.isCurrentSlide(this.slides.length-1)&&(this.$current=a)}var c=this.getKeywordMenuConfig();c.length>0||this.isEditor()?(this.keywordMenu.init(c),this.keywordMenu.on("select",function(e){return t.keywordClick(e.data.index)}),this.keywordMenu.on("close",function(){return t.hideKeywords()}),this.keywordMenu.on("select",function(){t.$currentKeyword=t.$keywords.children(".h5p-current")}),this.$keywords=(0,m.jQuery)(this.keywordMenu.getElement()).appendTo(this.$keywordsWrapper),this.$currentKeyword=this.$keywords.children(".h5p-current"),this.setKeywordsOpacity(void 0===this.presentation.keywordListOpacity?90:this.presentation.keywordListOpacity),this.presentation.keywordListAlwaysShow&&this.showKeywords()):(this.$keywordsWrapper.remove(),this.initKeywords=!1),void 0===this.editor&&this.activeSurface?(this.$progressbar.add(this.$footer).remove(),H5P.fullscreenSupported&&(this.$fullScreenButton=H5P.jQuery("<div/>",{class:"h5p-toggle-full-screen",title:this.l10n.fullscreen,role:"button",tabindex:0,appendTo:this.$wrapper}),(0,y.addClickAndKeyboardListeners)(this.$fullScreenButton,function(){return n.toggleFullScreen()}))):(this.initTouchEvents(),this.navigationLine=new u.default(this),this.previousState&&this.previousState.progress||this.setSlideNumberAnnouncer(0,!1),this.summarySlideObject=new d.default(this,a)),new h.default(this),this.previousState&&this.previousState.progress&&this.jumpToSlide(this.previousState.progress,!1,null,!1,!0)},x.prototype.belongsToTagName=function(e,t,n){if(!e)return!1;n=n||document.body,"string"==typeof t&&(t=[t]),t=t.map(function(e){return e.toLowerCase()});var i=e.tagName.toLowerCase();return-1!==t.indexOf(i)||n!==e&&this.belongsToTagName(e.parentNode,t,n)},x.prototype.updateKeywordMenuFromSlides=function(){this.keywordMenu.removeAllMenuItemElements();var e=this.getKeywordMenuConfig();return(0,m.jQuery)(this.keywordMenu.init(e))},x.prototype.getKeywordMenuConfig=function(){var e=this;return this.slides.map(function(t,n){return{title:e.createSlideTitle(t),subtitle:e.l10n.slide+" "+(n+1),index:n}}).filter(function(e){return null!==e.title})},x.prototype.createSlideTitle=function(e){var t=this.isEditor()?this.l10n.noTitle:null;return this.hasKeywords(e)?e.keywords[0].main:t},x.prototype.isEditor=function(){return void 0!==this.editor},x.prototype.hasKeywords=function(e){return void 0!==e.keywords&&e.keywords.length>0},x.prototype.createSlides=function(){for(var e=this,t=0;t<e.children.length;t++){var n=t===e.currentSlideIndex;e.children[t].getElement().appendTo(e.$slidesWrapper),n&&e.children[t].setCurrent(),(e.isEditor()||0===t||1===t||n)&&e.children[t].appendElements()}},x.prototype.hasScoreData=function(e){return"undefined"!==(void 0===e?"undefined":s(e))&&"function"==typeof e.getScore&&"function"==typeof e.getMaxScore},x.prototype.getScore=function(){var e=this;return(0,y.flattenArray)(e.slidesWithSolutions).reduce(function(t,n){return t+(e.hasScoreData(n)?n.getScore():0)},0)},x.prototype.getMaxScore=function(){var e=this;return(0,y.flattenArray)(e.slidesWithSolutions).reduce(function(t,n){return t+(e.hasScoreData(n)?n.getMaxScore():0)},0)},x.prototype.setProgressBarFeedback=function(e){var t=this;void 0!==e&&e?e.forEach(function(e){var n=t.progressbarParts[e.slide-1].find(".h5p-progressbar-part-has-task");if(n.hasClass("h5p-answered")){var i=e.score>=e.maxScore;n.addClass(i?"h5p-is-correct":"h5p-is-wrong"),t.navigationLine.updateSlideTitle(e.slide-1)}}):this.progressbarParts.forEach(function(e){e.find(".h5p-progressbar-part-has-task").removeClass("h5p-is-correct").removeClass("h5p-is-wrong")})},x.prototype.toggleKeywords=function(){this[this.$keywordsWrapper.hasClass("h5p-open")?"hideKeywords":"showKeywords"]()},x.prototype.hideKeywords=function(){this.$keywordsWrapper.hasClass("h5p-open")&&(void 0!==this.$keywordsButton&&(this.$keywordsButton.attr("title",this.l10n.showKeywords),this.$keywordsButton.attr("aria-label",this.l10n.showKeywords),this.$keywordsButton.attr("aria-expanded","false"),this.$keywordsButton.focus()),this.$keywordsWrapper.removeClass("h5p-open"))},x.prototype.showKeywords=function(){this.$keywordsWrapper.hasClass("h5p-open")||(void 0!==this.$keywordsButton&&(this.$keywordsButton.attr("title",this.l10n.hideKeywords),this.$keywordsButton.attr("aria-label",this.l10n.hideKeywords),this.$keywordsButton.attr("aria-expanded","true")),this.$keywordsWrapper.addClass("h5p-open"),this.presentation.keywordListAlwaysShow||this.$keywordsWrapper.find('li[tabindex="0"]').focus())},x.prototype.setKeywordsOpacity=function(e){var t=this.$keywordsWrapper.css("background-color").split(/\(|\)|,/g),n=r(t,3),i=n[0],s=n[1],o=n[2];this.$keywordsWrapper.css("background-color","rgba("+i+", "+s+", "+o+", "+e/100+")")},x.prototype.fitCT=function(){void 0===this.editor&&this.$current.find(".h5p-ct").each(function(){for(var e=100,t=H5P.jQuery(this),n=t.parent().height();t.outerHeight()>n&&(e--,t.css({fontSize:e+"%",lineHeight:e+65+"%"}),!(e<0)););})},x.prototype.resize=function(){var e=this.$container.hasClass("h5p-fullscreen")||this.$container.hasClass("h5p-semi-fullscreen");if(!this.ignoreResize){this.$wrapper.css("width","auto");var t=this.$container.width(),n={};if(e){var i=this.$container.height();t/i>this.ratio&&(t=i*this.ratio,n.width=t+"px")}var r=t/this.width;n.height=t/this.ratio+"px",n.fontSize=this.fontSize*r+"px",void 0!==this.editor&&this.editor.setContainerEm(this.fontSize*r*.75),this.$wrapper.css(n),this.swipeThreshold=100*r;var s=this.elementInstances[this.$current.index()];if(void 0!==s)for(var o=this.slides[this.$current.index()].elements,a=0;a<s.length;a++){var l=s[a];void 0!==l.preventResize&&!1!==l.preventResize||void 0===l.$||o[a].displayAsButton||H5P.trigger(l,"resize")}this.fitCT()}},x.prototype.toggleFullScreen=function(){H5P.isFullscreen||this.$container.hasClass("h5p-fullscreen")||this.$container.hasClass("h5p-semi-fullscreen")?void 0!==H5P.exitFullScreen&&void 0!==H5P.fullScreenBrowserPrefix?H5P.exitFullScreen():void 0===H5P.fullScreenBrowserPrefix?H5P.jQuery(".h5p-disable-fullscreen").click():""===H5P.fullScreenBrowserPrefix?window.top.document.exitFullScreen():"ms"===H5P.fullScreenBrowserPrefix?window.top.document.msExitFullscreen():window.top.document[H5P.fullScreenBrowserPrefix+"CancelFullScreen"]():(this.$footer.addClass("footer-full-screen"),this.$fullScreenButton.attr("title",this.l10n.exitFullscreen),H5P.fullScreen(this.$container,this),void 0===H5P.fullScreenBrowserPrefix&&H5P.jQuery(".h5p-disable-fullscreen").hide())},x.prototype.focus=function(){this.$wrapper.focus()},x.prototype.keywordClick=function(e){this.shouldHideKeywordsAfterSelect()&&this.hideKeywords(),this.jumpToSlide(e,!0)},x.prototype.shouldHideKeywordsAfterSelect=function(){return this.presentation.keywordListEnabled&&!this.presentation.keywordListAlwaysShow&&this.presentation.keywordListAutoHide&&void 0===this.editor},x.prototype.setElementsOverride=function(e){this.elementsOverride={params:{}},e&&(this.elementsOverride.params.behaviour={},e.showSolutionButton&&(this.elementsOverride.params.behaviour.enableSolutionsButton="on"===e.showSolutionButton),e.retryButton&&(this.elementsOverride.params.behaviour.enableRetry="on"===e.retryButton))},x.prototype.attachElements=function(e,t){if(void 0===this.elementsAttached[t]){var n=this.slides[t],i=this.elementInstances[t];if(void 0!==n.elements)for(var r=0;r<n.elements.length;r++)this.attachElement(n.elements[r],i[r],e,t);this.trigger("domChanged",{$target:e,library:"CoursePresentation",key:"newSlide"},{bubbles:!0,external:!0}),this.elementsAttached[t]=!0}},x.prototype.attachElement=function(e,t,n,i){var r=void 0!==e.displayAsButton&&e.displayAsButton,s=void 0!==e.buttonSize?"h5p-element-button-"+e.buttonSize:"",o="h5p-element"+(r?" h5p-element-button-wrapper":"")+(s.length?" "+s:""),a=H5P.jQuery("<div>",{class:o}).css({left:e.x+"%",top:e.y+"%",width:e.width+"%",height:e.height+"%"}).appendTo(n),l=void 0===e.backgroundOpacity||0===e.backgroundOpacity;if(a.toggleClass("h5p-transparent",l),r){this.createInteractionButton(e,t).appendTo(a)}else{var d=e.action&&e.action.library,c=d?this.getLibraryTypePmz(e.action.library):"other",u=H5P.jQuery("<div>",{class:"h5p-element-outer "+c+"-outer-element"}).css({background:"rgba(255,255,255,"+(void 0===e.backgroundOpacity?0:e.backgroundOpacity/100)+")"}).appendTo(a),p=H5P.jQuery("<div>",{class:"h5p-element-inner"}).appendTo(u);if(t.on("set-size",function(e){for(var t in e.data)a.get(0).style[t]=e.data[t]}),t.attach(p),void 0!==e.action&&"H5P.InteractiveVideo"===e.action.library.substr(0,20)){var h=function(){t.$container.addClass("h5p-fullscreen"),t.controls.$fullscreen&&t.controls.$fullscreen.remove(),t.hasFullScreen=!0,t.controls.$play.hasClass("h5p-pause")?t.$controls.addClass("h5p-autohide"):t.enableAutoHide()};void 0!==t.controls?h():t.on("controls",h)}0==i&&this.slidesWithSolutions.indexOf(i)<0&&p.attr("tabindex","0"),this.setOverflowTabIndex()}return void 0!==this.editor?this.editor.processElement(e,a,i,t):(e.solution&&this.addElementSolutionButton(e,t,a),this.hasAnswerElements=this.hasAnswerElements||void 0!==t.exportAnswers),a},x.prototype.disableTabIndexes=function(){var e=this.$container.find(".h5p-popup-container");this.$tabbables=this.$container.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(function(){var t=(0,m.jQuery)(this),n=m.jQuery.contains(e.get(0),t.get(0));if(t.data("tabindex"))return!0;if(!n){var i=t.attr("tabindex");return t.data("tabindex",i),t.attr("tabindex","-1"),!0}return!1})},x.prototype.restoreTabIndexes=function(){this.$tabbables&&this.$tabbables.each(function(){var e=(0,m.jQuery)(this),t=e.data("tabindex");e.hasClass("ui-slider-handle")?(e.attr("tabindex",0),e.removeData("tabindex")):void 0!==t?(e.attr("tabindex",t),e.removeData("tabindex")):e.removeAttr("tabindex")})},x.prototype.createInteractionButton=function(e,t){var n=this,i=e.action.params&&e.action.params.cpAutoplay,r=e.action.metadata?e.action.metadata.title:"";""===r&&(r=e.action.params&&e.action.params.contentName||e.action.library.split(" ")[0].split(".")[1]);var s=this.getLibraryTypePmz(e.action.library),o=function(e){return function(){return e.attr("aria-expanded","false")}},a=(0,m.jQuery)("<div>",{role:"button",tabindex:0,"aria-label":r,"aria-popup":!0,"aria-expanded":!1,class:"h5p-element-button h5p-element-button-"+e.buttonSize+" "+s+"-button"}),l=(0,m.jQuery)('<div class="h5p-button-element"></div>');t.attach(l);var d="h5p-advancedtext"===s?{x:e.x,y:e.y}:null;return(0,y.addClickAndKeyboardListeners)(a,function(){a.attr("aria-expanded","true"),n.showInteractionPopup(t,a,l,s,i,o(a),d),n.disableTabIndexes()}),void 0!==e.action&&"H5P.InteractiveVideo"===e.action.library.substr(0,20)&&t.on("controls",function(){t.controls.$fullscreen&&t.controls.$fullscreen.remove()}),a},x.prototype.showInteractionPopup=function(e,t,n,i,r,s){var o=this,a=arguments.length>6&&void 0!==arguments[6]?arguments[6]:null,l=function(){e.trigger("resize")};if(!this.isEditor()){this.on("exitFullScreen",l),this.showPopup(n,t,a,function(){o.pauseMedia(e),n.detach(),o.off("exitFullScreen",l),s()},i),H5P.trigger(e,"resize"),"h5p-image"===i&&this.resizePopupImage(n);n.closest(".h5p-popup-container");setTimeout(function(){var e=n.find(":input").add(n.find("[tabindex]"));e.length?e[0].focus():(n.attr("tabindex",0),n.focus())},200),(0,y.isFunction)(e.setActivityStarted)&&(0,y.isFunction)(e.getScore)&&e.setActivityStarted(),r&&(0,y.isFunction)(e.play)&&e.play()}},x.prototype.getLibraryTypePmz=function(e){return(0,y.kebabCase)(e.split(" ")[0]).toLowerCase()},x.prototype.resizePopupImage=function(e){var t=Number(e.css("fontSize").replace("px","")),n=e.find("img"),i=function(n,i){if(!(i/t<18.5)){var r=n/i;i=18.5*t,e.css({width:i*r,height:i})}};n.height()?i(n.width(),n.height()):n.one("load",function(){i(this.width,this.height)})},x.prototype.addElementSolutionButton=function(e,t,n){var i=this;t.showCPComments=function(){if(0===n.children(".h5p-element-solution").length&&(0,y.stripHTML)(e.solution).length>0){var t=(0,m.jQuery)("<div/>",{role:"button",tabindex:0,title:i.l10n.solutionsButtonTitle,"aria-popup":!0,"aria-expanded":!1,class:"h5p-element-solution"}).append('<span class="joubel-icon-comment-normal"><span class="h5p-icon-shadow"></span><span class="h5p-icon-speech-bubble"></span><span class="h5p-icon-question"></span></span>').appendTo(n),r={x:e.x,y:e.y};e.displayAsButton||(r.x+=e.width-4,r.y+=e.height-12),(0,y.addClickAndKeyboardListeners)(t,function(){return i.showPopup(e.solution,t,r)})}},void 0!==e.alwaysDisplayComments&&e.alwaysDisplayComments&&t.showCPComments()},x.prototype.showPopup=function(e,t){var n,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=this,s=arguments[3],o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"h5p-popup-comment-field",a=this,l=function(e){if(n)return void(n=!1);void 0!==s&&setTimeout(function(){s(),a.restoreTabIndexes()},100),e.preventDefault(),d.addClass("h5p-animate"),d.find(".h5p-popup-container").addClass("h5p-animate"),setTimeout(function(){d.remove()},100),t.focus()},d=(0,m.jQuery)('<div class="h5p-popup-overlay '+o+'"><div class="h5p-popup-container" role="dialog"><div class="h5p-cp-dialog-titlebar"><div class="h5p-dialog-title"></div><div role="button" tabindex="0" class="h5p-close-popup" title="'+this.l10n.close+'"></div></div><div class="h5p-popup-wrapper" role="document"></div></div></div>'),c=d.find(".h5p-popup-wrapper");e instanceof H5P.jQuery?c.append(e):c.html(e);var u=d.find(".h5p-popup-container");return function(e,t,n){if(n){t.css({visibility:"hidden"}),e.prependTo(r.$wrapper);var i=t.height(),s=t.width(),o=e.height(),a=e.width(),l=s*(100/a),d=i*(100/o);if(l>50&&d>50)return void e.detach();l>d&&d<45&&(l=Math.sqrt(l*d),t.css({width:l+"%"}));l>90?l=90:l<22&&(l=22);var c=100-l-5,u=n.x;n.x>c?u=c:n.x<5&&(u=5),d=t.height()*(100/o);var p=100-d-10,h=n.y;n.y>p?h=p:n.y<10&&(h=10),e.detach(),t.css({left:u+"%",top:h+"%"})}}(d,u,i),d.addClass("h5p-animate"),u.css({visibility:""}).addClass("h5p-animate"),d.prependTo(this.$wrapper).focus().removeClass("h5p-animate").click(l).find(".h5p-popup-container").removeClass("h5p-animate").click(function(){n=!0}).keydown(function(e){e.which===y.keyCode.ESC&&l(e)}).end(),(0,y.addClickAndKeyboardListeners)(d.find(".h5p-close-popup"),function(e){return l(e)}),d},x.prototype.checkForSolutions=function(e){return void 0!==e.showSolutions||void 0!==e.showCPComments},x.prototype.initKeyEvents=function(){if(void 0===this.keydown&&!this.activeSurface){var e=this,t=!1;this.keydown=function(n){t||(37!==n.keyCode&&33!==n.keyCode||!e.previousSlide(void 0,!1)?39!==n.keyCode&&34!==n.keyCode||!e.nextSlide(void 0,!1)||(n.preventDefault(),t=!0):(n.preventDefault(),t=!0),t&&setTimeout(function(){t=!1},300))},H5P.jQuery("body").keydown(this.keydown)}},x.prototype.initTouchEvents=function(){var e,t,n,i,r,s,o=this,a=!1,l=!1,d=function(e){return{"-webkit-transform":e,"-moz-transform":e,"-ms-transform":e,transform:e}},c=d("");this.$slidesWrapper.bind("touchstart",function(d){l=!1,n=e=d.originalEvent.touches[0].pageX,t=d.originalEvent.touches[0].pageY;var c=o.$slidesWrapper.width();i=0===o.currentSlideIndex?0:-c,r=o.currentSlideIndex+1>=o.slides.length?0:c,s=null,a=!0}).bind("touchmove",function(c){var u=c.originalEvent.touches;a&&(o.$current.prev().addClass("h5p-touch-move"),o.$current.next().addClass("h5p-touch-move"),a=!1),n=u[0].pageX;var p=e-n;null===s&&(s=Math.abs(t-c.originalEvent.touches[0].pageY)>Math.abs(p)),1!==u.length||s||(c.preventDefault(),l||(p<0?o.$current.prev().css(d("translateX("+(i-p)+"px")):o.$current.next().css(d("translateX("+(r-p)+"px)")),o.$current.css(d("translateX("+-p+"px)"))))}).bind("touchend",function(){if(!s){var t=e-n;if(t>o.swipeThreshold&&o.nextSlide(void 0,!1)||t<-o.swipeThreshold&&o.previousSlide(void 0,!1))return}o.$slidesWrapper.children().css(c).removeClass("h5p-touch-move")})},x.prototype.updateTouchPopup=function(e,t,n,i){if(arguments.length<=0)return void(void 0!==this.touchPopup&&this.touchPopup.remove());var r="";if(void 0!==this.$keywords&&void 0!==this.$keywords.children(":eq("+t+")").find("span").html())r+=this.$keywords.children(":eq("+t+")").find("span").html();else{var s=t+1;r+=this.l10n.slide+" "+s}void 0===this.editor&&t>=this.slides.length-1&&(r=this.l10n.showSolutions),void 0===this.touchPopup?this.touchPopup=H5P.jQuery("<div/>",{class:"h5p-touch-popup"}).insertAfter(e):this.touchPopup.insertAfter(e),i-.15*e.parent().height()<0?i=0:i-=.15*e.parent().height(),this.touchPopup.css({"max-width":e.width()-n,left:n,top:i}),this.touchPopup.html(r)},x.prototype.previousSlide=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this.$current.prev();return!!n.length&&(t?this.processJumpToSlide(n.index(),e,!1):this.jumpToSlide(n.index(),e,null,!1))},x.prototype.nextSlide=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this.$current.next();return!!n.length&&(t?this.processJumpToSlide(n.index(),e,!1):this.jumpToSlide(n.index(),e,null,!1))},x.prototype.isCurrentSlide=function(e){return this.currentSlideIndex===e},x.prototype.getCurrentSlideIndex=function(){return this.currentSlideIndex},x.prototype.attachAllElements=function(){for(var e=this.$slidesWrapper.children(),t=0;t<this.slides.length;t++)this.attachElements(e.eq(t),t);void 0!==this.summarySlideObject&&this.summarySlideObject.updateSummarySlide(this.slides.length-1,!0)},x.prototype.processJumpToSlide=function(e,t,n){var i=this;if(void 0===this.editor&&this.contentId){var r=this.createXAPIEventTemplate("progressed");r.data.statement.object.definition.extensions["http://id.tincanapi.com/extension/ending-point"]=e+1,this.trigger(r)}if(!this.$current.hasClass("h5p-animate")){var s=this.$current.addClass("h5p-animate"),o=i.$slidesWrapper.children(),a=o.filter(":lt("+e+")");this.$current=o.eq(e).addClass("h5p-animate");var l=this.currentSlideIndex;this.currentSlideIndex=e,this.attachElements(this.$current,e);var d=this.$current.next();d.length&&this.attachElements(d,e+1),this.setOverflowTabIndex();var c=this.elementInstances[l];if(void 0!==c)for(var u=0;u<c.length;u++)this.slides[l].elements[u].displayAsButton||i.pauseMedia(c[u]);return setTimeout(function(){s.removeClass("h5p-current"),s.find(".h5p-element-inner").attr("tabindex","-1"),o.css({"-webkit-transform":"","-moz-transform":"","-ms-transform":"",transform:""}).removeClass("h5p-touch-move").removeClass("h5p-previous"),a.addClass("h5p-previous"),i.$current.addClass("h5p-current"),void 0===i.slidesWithSolutions[i.getCurrentSlideIndex()]&&i.$current.find(".h5p-element-inner").attr("tabindex","0"),i.trigger("changedSlide",i.$current.index())},1),setTimeout(function(){if(i.$slidesWrapper.children().removeClass("h5p-animate"),void 0===i.editor){var e=i.elementInstances[i.currentSlideIndex],t=i.slides[i.currentSlideIndex].elements;if(void 0!==e)for(var n=0;n<e.length;n++)t[n]&&t[n].action&&t[n].action.params&&t[n].action.params.cpAutoplay&&!t[n].displayAsButton&&"function"==typeof e[n].play&&e[n].play(),t[n].displayAsButton||"function"!=typeof e[n].setActivityStarted||"function"!=typeof e[n].getScore||e[n].setActivityStarted()}},250),void 0!==this.$keywords&&(this.keywordMenu.setCurrentSlideIndex(e),this.$currentKeyword=this.$keywords.find(".h5p-current"),t||this.keywordMenu.scrollToKeywords(e)),i.presentation.keywordListEnabled&&i.presentation.keywordListAlwaysShow&&i.showKeywords(),i.navigationLine&&(i.navigationLine.updateProgressBar(e,l,this.isSolutionMode),i.navigationLine.updateFooter(e),this.setSlideNumberAnnouncer(e,n)),i.summarySlideObject&&i.summarySlideObject.updateSummarySlide(e,!0),void 0!==this.editor&&void 0!==this.editor.dnb&&(this.editor.dnb.setContainer(this.$current),this.editor.dnb.blurAll()),this.trigger("resize"),this.fitCT(),!0}},x.prototype.jumpToSlide=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,i=this,r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],s=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if(this.standalone&&this.showSummarySlide&&e===this.slides.length-1&&!this.isSolutionMode&&this.isReportingEnabled&&!s){if(this.currentSlideIndex===this.slides.length-1)return!1;var o=(0,w.default)({headerText:this.l10n.confirmDialogHeader,dialogText:this.l10n.confirmDialogText,confirmText:this.l10n.confirmDialogConfirmationText});o.on("canceled",function(){return!1}),o.on("confirmed",function(){i.processJumpToSlide(e,t,r),n&&n()})}else this.processJumpToSlide(e,t,r),n&&n()},x.prototype.setOverflowTabIndex=function(){void 0!==this.$current&&this.$current.find(".h5p-element-inner").each(function(){var e=(0,m.jQuery)(this),t=void 0;this.classList.contains("h5p-table")&&(t=e.find(".h5p-table").outerHeight());var n=e.closest(".h5p-element-outer").innerHeight();void 0!==t&&null!==n&&t>n&&e.attr("tabindex",0)})},x.prototype.setSlideNumberAnnouncer=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n="";if(!this.navigationLine)return n;var i=this.slides[e];i.keywords&&i.keywords.length>0&&!this.navigationLine.isSummarySlide(e)&&(n+=this.l10n.slide+" "+(e+1)+": "),n+=this.navigationLine.createSlideTitle(e),this.$slideAnnouncer.html(n),t&&this.$slideTop.focus()},x.prototype.resetTask=function(){this.summarySlideObject.toggleSolutionMode(!1);for(var e=0;e<this.slidesWithSolutions.length;e++)if(void 0!==this.slidesWithSolutions[e])for(var t=0;t<this.slidesWithSolutions[e].length;t++){var n=this.slidesWithSolutions[e][t];n.resetTask&&n.resetTask()}this.navigationLine.updateProgressBar(0),this.jumpToSlide(0,!1),this.$container.find(".h5p-popup-overlay").remove()},x.prototype.showSolutions=function(){for(var e=!1,t=[],n=!1,i=0;i<this.slidesWithSolutions.length;i++)if(void 0!==this.slidesWithSolutions[i]){this.elementsAttached[i]||this.attachElements(this.$slidesWrapper.children(":eq("+i+")"),i),e||(this.jumpToSlide(i,!1),e=!0);for(var r=0,s=0,o=[],a=0;a<this.slidesWithSolutions[i].length;a++){var l=this.slidesWithSolutions[i][a];void 0!==l.addSolutionButton&&l.addSolutionButton(),l.showSolutions&&l.showSolutions(),l.showCPComments&&l.showCPComments(),void 0!==l.getMaxScore&&(s+=l.getMaxScore(),r+=l.getScore(),n=!0,o.push(l.coursePresentationIndexOnSlide))}t.push({indexes:o,slide:i+1,score:r,maxScore:s})}if(n)return t},x.prototype.getSlideScores=function(e){for(var t=!0===e,n=[],i=!1,r=0;r<this.slidesWithSolutions.length;r++)if(void 0!==this.slidesWithSolutions[r]){this.elementsAttached[r]||this.attachElements(this.$slidesWrapper.children(":eq("+r+")"),r),t||(this.jumpToSlide(r,!1),t=!0);for(var s=0,o=0,a=[],l=0;l<this.slidesWithSolutions[r].length;l++){var d=this.slidesWithSolutions[r][l];void 0!==d.getMaxScore&&(o+=d.getMaxScore(),s+=d.getScore(),i=!0,a.push(d.coursePresentationIndexOnSlide))}n.push({indexes:a,slide:r+1,score:s,maxScore:o})}if(i)return n},x.prototype.getCopyrights=function(){var e,t=new H5P.ContentCopyrights;if(this.presentation&&this.presentation.globalBackgroundSelector&&this.presentation.globalBackgroundSelector.imageGlobalBackground){var n=this.presentation.globalBackgroundSelector.imageGlobalBackground,i=new H5P.MediaCopyright(n.copyright);i.setThumbnail(new H5P.Thumbnail(H5P.getPath(n.path,this.contentId),n.width,n.height)),t.addMedia(i)}for(var r=0;r<this.slides.length;r++){var s=new H5P.ContentCopyrights;if(s.setLabel(this.l10n.slide+" "+(r+1)),this.slides[r]&&this.slides[r].slideBackgroundSelector&&this.slides[r].slideBackgroundSelector.imageSlideBackground){var o=this.slides[r].slideBackgroundSelector.imageSlideBackground,a=new H5P.MediaCopyright(o.copyright);a.setThumbnail(new H5P.Thumbnail(H5P.getPath(o.path,this.contentId),o.width,o.height)),s.addMedia(a)}if(void 0!==this.elementInstances[r])for(var l=0;l<this.elementInstances[r].length;l++){var d=this.elementInstances[r][l];if(this.slides[r].elements[l].action){var c=this.slides[r].elements[l].action.params,u=this.slides[r].elements[l].action.metadata;e=void 0,void 0!==d.getCopyrights&&(e=d.getCopyrights()),void 0===e&&(e=new H5P.ContentCopyrights,H5P.findCopyrights(e,c,this.contentId,{metadata:u,machineName:d.libraryInfo.machineName}));var p=l+1;void 0!==c.contentName?p+=": "+c.contentName:void 0!==d.getTitle?p+=": "+d.getTitle():c.l10n&&c.l10n.name&&(p+=": "+c.l10n.name),e.setLabel(p),s.addContent(e)}}t.addContent(s)}return t},x.prototype.pauseMedia=function(e){try{void 0!==e.pause&&(e.pause instanceof Function||"function"==typeof e.pause)?e.pause():void 0!==e.video&&void 0!==e.video.pause&&(e.video.pause instanceof Function||"function"==typeof e.video.pause)?e.video.pause():void 0!==e.stop&&(e.stop instanceof Function||"function"==typeof e.stop)&&e.stop()}catch(e){H5P.error(e)}},x.prototype.getXAPIData=function(){var e=this.createXAPIEventTemplate("answered"),t=e.getVerifiedStatementValue(["object","definition"]);H5P.jQuery.extend(t,{interactionType:"compound",type:"http://adlnet.gov/expapi/activities/cmi.interaction"});var n=this.getScore(),i=this.getMaxScore();e.setScoredResult(n,i,this,!0,n===i);var r=(0,y.flattenArray)(this.slidesWithSolutions).map(function(e){if(e&&e.getXAPIData)return e.getXAPIData()}).filter(function(e){return!!e});return{statement:e.data.statement,children:r}},x.prototype.getContext=function(){return{type:"slide",value:this.currentSlideIndex+1}},t.default=x},function(e,t,n){"use strict";function i(e,t){var n=this;n.index=e,n.parent=t}e.exports=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),r=n(1),s=function(){function e(e,t){this.$summarySlide=t,this.cp=e}return e.prototype.updateSummarySlide=function(e,t){var n=this,r=void 0===this.cp.editor&&void 0!==this.$summarySlide&&e>=this.cp.slides.length-1,s=!this.cp.showSummarySlide&&this.cp.hasAnswerElements;if(r){n.cp.presentation.keywordListEnabled&&n.cp.presentation.keywordListAlwaysShow&&n.cp.hideKeywords(),this.$summarySlide.children().remove();var o=n.cp.getSlideScores(t),a=n.outputScoreStats(o);if((0,i.jQuery)(a).appendTo(n.$summarySlide),!s){var l=n.totalScores(o);if(!isNaN(l.totalPercentage)){var d=i.JoubelUI.createScoreBar(l.totalMaxScore,"","","");d.setScore(l.totalScore);var c=(0,i.jQuery)(".h5p-summary-total-score",n.$summarySlide);d.appendTo(c),setTimeout(function(){c.append((0,i.jQuery)("<div/>",{"aria-live":"polite",class:"hidden-but-read",html:n.cp.l10n.summary+". "+n.cp.l10n.accessibilityTotalScore.replace("@score",l.totalScore).replace("@maxScore",l.totalMaxScore)}))},100)}if(1==n.cp.enableTwitterShare){var u=(0,i.jQuery)(".h5p-summary-twitter-message",n.$summarySlide);this.addTwitterScoreLinkTo(u,l)}if(1==n.cp.enableFacebookShare){var p=(0,i.jQuery)(".h5p-summary-facebook-message",n.$summarySlide);this.addFacebookScoreLinkTo(p,l)}if(1==n.cp.enableGoogleShare){var h=(0,i.jQuery)(".h5p-summary-google-message",n.$summarySlide);this.addGoogleScoreLinkTo(h)}n.$summarySlide.find(".h5p-td > .h5p-slide-link").each(function(){var e=(0,i.jQuery)(this);e.click(function(t){n.cp.jumpToSlide(parseInt(e.data("slide"),10)-1),t.preventDefault()})})}var f=(0,i.jQuery)(".h5p-summary-footer",n.$summarySlide);this.cp.showSummarySlideSolutionButton&&i.JoubelUI.createButton({class:"h5p-show-solutions",html:n.cp.l10n.showSolutions,on:{click:function(){n.toggleSolutionMode(!0)}},appendTo:f}),this.cp.showSummarySlideRetryButton&&i.JoubelUI.createButton({class:"h5p-cp-retry-button",html:n.cp.l10n.retry,on:{click:function(){n.cp.resetTask()}},appendTo:f}),n.cp.hasAnswerElements&&i.JoubelUI.createButton({class:"h5p-eta-export",html:n.cp.l10n.exportAnswers,on:{click:function(){H5P.ExportableTextArea.Exporter.run(n.cp.slides,n.cp.elementInstances)}},appendTo:f})}},e.prototype.outputScoreStats=function(e){var t=this;if(void 0===e)return this.$summarySlide.addClass("h5p-summary-only-export"),'<div class="h5p-summary-footer"></div>';var n,i=this,r=0,s=0,o="",a=0,l="";for(n=0;n<e.length;n+=1)l=t.getSlideDescription(e[n]),a=Math.round(e[n].score/e[n].maxScore*100),isNaN(a)&&(a=0),o+='<tr><td class="h5p-td h5p-summary-task-title"><a href="#" class="h5p-slide-link"  aria-label=" '+i.cp.l10n.slide+" "+e[n].slide+": "+l.replace(/(<([^>]+)>)/gi,"")+" "+a+'%" data-slide="'+e[n].slide+'">'+i.cp.l10n.slide+" "+e[n].slide+": "+l.replace(/(<([^>]+)>)/gi,"")+'</a></td><td class="h5p-td h5p-summary-score-bar"><p class="hidden-but-read">'+a+"%</p><p>"+e[n].score+"<span>/</span>"+e[n].maxScore+"</p></td></tr>",r+=e[n].score,s+=e[n].maxScore;this.cp.isSolutionMode||i.cp.triggerXAPICompleted(r,s);var d=i.cp.enableTwitterShare||i.cp.enableFacebookShare||i.cp.enableGoogleShare?'<span class="h5p-show-results-text">'+i.cp.l10n.shareResult+"</span>":"",c=1==i.cp.enableTwitterShare?'<span class="h5p-summary-twitter-message" aria-label="'+i.cp.l10n.shareTwitter+'"></span>':"",u=1==i.cp.enableFacebookShare?'<span class="h5p-summary-facebook-message" aria-label="'+i.cp.l10n.shareFacebook+'"></span>':"",p=1==i.cp.enableGoogleShare?'<span class="h5p-summary-google-message" aria-label="'+i.cp.l10n.shareGoogle+'"></span>':"";return'<div class="h5p-summary-table-holder"><div class="h5p-summary-table-pages"><table class="h5p-score-table"><thead><tr><th class="h5p-summary-table-header slide">'+i.cp.l10n.slide+'</th><th class="h5p-summary-table-header score">'+i.cp.l10n.score+"<span>/</span>"+i.cp.l10n.total.toLowerCase()+"</th></tr></thead><tbody>"+o+'</tbody></table></div><div class="h5p-summary-total-table"><div class="h5p-summary-social">'+d+u+c+p+'</div><div class="h5p-summary-total-score"><p>'+i.cp.l10n.totalScore+'</p></div></div></div><div class="h5p-summary-footer"></div>'},e.prototype.getSlideDescription=function(e){var t,n,i=this,r=i.cp.slides[e.slide-1].elements;if(e.indexes.length>1)t=i.cp.l10n.summaryMultipleTaskText;else if(void 0!==r[e.indexes[0]]&&r[0])if(n=r[e.indexes[0]].action,"function"==typeof i.cp.elementInstances[e.slide-1][e.indexes[0]].getTitle)t=i.cp.elementInstances[e.slide-1][e.indexes[0]].getTitle();else if(void 0!==n.library&&n.library){var s=n.library.split(" ")[0].split(".")[1].split(/(?=[A-Z])/),o="";s.forEach(function(e,t){0!==t&&(e=e.toLowerCase()),o+=e,t<=s.length-1&&(o+=" ")}),t=o}return t},e.prototype.addTwitterScoreLinkTo=function(e,t){var n=this,i=n.cp.twitterShareStatement||"",s=n.cp.twitterShareHashtags||"",o=n.cp.twitterShareUrl||"";o=o.replace("@currentpageurl",window.location.href),i=i.replace("@score",t.totalScore).replace("@maxScore",t.totalMaxScore).replace("@percentage",t.totalPercentage+"%").replace("@currentpageurl",window.location.href),s=s.trim().replace(" ",""),i=encodeURIComponent(i),s=encodeURIComponent(s),o=encodeURIComponent(o);var a="https://twitter.com/intent/tweet?";a+=i.length>0?"text="+i+"&":"",a+=o.length>0?"url="+o+"&":"",a+=s.length>0?"hashtags="+s:"";var l=window.innerWidth/2,d=window.innerHeight/2;e.attr("tabindex","0").attr("role","button"),(0,r.addClickAndKeyboardListeners)(e,function(){return window.open(a,n.cp.l10n.shareTwitter,"width=800,height=300,left="+l+",top="+d),!1})},e.prototype.addFacebookScoreLinkTo=function(e,t){var n=this,i=n.cp.facebookShareUrl||"",s=n.cp.facebookShareQuote||"";i=i.replace("@currentpageurl",window.location.href),s=s.replace("@currentpageurl",window.location.href).replace("@percentage",t.totalPercentage+"%").replace("@score",t.totalScore).replace("@maxScore",t.totalMaxScore),i=encodeURIComponent(i),s=encodeURIComponent(s);var o="https://www.facebook.com/sharer/sharer.php?";o+=i.length>0?"u="+i+"&":"",o+=s.length>0?"quote="+s:"";var a=window.innerWidth/2,l=window.innerHeight/2;e.attr("tabindex","0").attr("role","button"),(0,r.addClickAndKeyboardListeners)(e,function(){return window.open(o,n.cp.l10n.shareFacebook,"width=800,height=300,left="+a+",top="+l),!1})},e.prototype.addGoogleScoreLinkTo=function(e){var t=this,n=t.cp.googleShareUrl||"";n=n.replace("@currentpageurl",window.location.href),n=encodeURIComponent(n);var i="https://plus.google.com/share?";i+=n.length>0?"url="+n:"";var s=window.innerWidth/2,o=window.innerHeight/2;e.attr("tabindex","0").attr("role","button"),(0,r.addClickAndKeyboardListeners)(e,function(){return window.open(i,t.cp.l10n.shareGoogle,"width=401,height=437,left="+s+",top="+o),!1})},e.prototype.totalScores=function(e){if(void 0===e)return{totalScore:0,totalMaxScore:0,totalPercentage:0};var t,n=0,i=0;for(t=0;t<e.length;t+=1)n+=e[t].score,i+=e[t].maxScore;var r=Math.round(n/i*100);return isNaN(r)&&(r=0),{totalScore:n,totalMaxScore:i,totalPercentage:r}},e.prototype.toggleSolutionMode=function(e){var t=this;if(this.cp.isSolutionMode=e,e){var n=t.cp.showSolutions();this.cp.setProgressBarFeedback(n),this.cp.$footer.addClass("h5p-footer-solution-mode"),this.setFooterSolutionModeText(this.cp.l10n.solutionModeText)}else this.cp.$footer.removeClass("h5p-footer-solution-mode"),this.setFooterSolutionModeText(),this.cp.setProgressBarFeedback()},e.prototype.setFooterSolutionModeText=function(e){void 0!==e&&e?this.cp.$exitSolutionModeText.html(e):this.cp.$exitSolutionModeText&&this.cp.$exitSolutionModeText.html("")},e}();t.default=s},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var s=n(18),o=i(s),a=n(3),l=i(a),d=n(5),c=i(d),u=n(1),p={NO_INTERACTIONS:"none",NOT_ANSWERED:"not-answered",ANSWERED:"answered",CORRECT:"has-only-correct",INCORRECT:"has-incorrect"},h=function(e){function t(e){var t;this.cp=e,this.answeredLabels=(t={},r(t,p.NOT_ANSWERED,this.cp.l10n.containsNotCompleted),r(t,p.ANSWERED,this.cp.l10n.containsCompleted),r(t,p.CORRECT,this.cp.l10n.containsOnlyCorrect),r(t,p.INCORRECT,this.cp.l10n.containsIncorrectAnswers),r(t,p.NO_INTERACTIONS,"@slideName"),t),this.initProgressbar(this.cp.slidesWithSolutions),this.initFooter(),this.initTaskAnsweredListener(),this.toggleNextAndPreviousButtonDisabled(this.cp.getCurrentSlideIndex())}return t.prototype.initTaskAnsweredListener=function(){var e=this;this.cp.elementInstances.forEach(function(t,n){t.filter(function(e){return(0,u.isFunction)(e.on)}).forEach(function(t){t.on("xAPI",function(t){var i=t.getVerb();if((0,u.contains)(["interacted","answered","attempted"],i)){var r=e.cp.slideHasAnsweredTask(n);e.setTaskAnswered(n,r)}else"completed"===i&&t.setVerb("answered");void 0===t.data.statement.context.extensions&&(t.data.statement.context.extensions={}),t.data.statement.context.extensions["http://id.tincanapi.com/extension/ending-point"]=n+1})})})},t.prototype.initProgressbar=function(t){var n=this,i=this,r=i.cp.previousState&&i.cp.previousState.progress||0;this.progresbarKeyboardControls=new l.default([new c.default]),this.progresbarKeyboardControls.negativeTabIndexAllowed=!0,this.progresbarKeyboardControls.on("select",function(t){i.displaySlide(e(t.element).data("slideNumber"))}),this.progresbarKeyboardControls.on("beforeNextElement",function(e){return e.index!==e.elements.length-1}),this.progresbarKeyboardControls.on("beforePreviousElement",function(e){return 0!==e.index}),void 0!==this.cp.progressbarParts&&this.cp.progressbarParts&&this.cp.progressbarParts.forEach(function(e){i.progresbarKeyboardControls.removeElement(e.children("a").get(0)),e.remove()}),i.cp.progressbarParts=[];for(var s=function(t){t.preventDefault();var n=e(this).data("slideNumber");i.progresbarKeyboardControls.setTabbableByIndex(n),i.displaySlide(n),i.cp.focus()},o=0;o<this.cp.slides.length;o+=1){var a=this.cp.slides[o],d=this.createSlideTitle(o),p=e("<li>",{class:"h5p-progressbar-part"}).appendTo(i.cp.$progressbar),h=e("<a>",{href:"#",html:'<span class="h5p-progressbar-part-title hidden-but-read">'+d+"</span>",tabindex:"-1"}).data("slideNumber",o).click(s).appendTo(p);if(this.progresbarKeyboardControls.addElement(h.get(0)),u.isIOS||function(){var t=e("<div/>",{class:"h5p-progressbar-popup",html:d,"aria-hidden":"true"}).appendTo(p);p.mouseenter(function(){return n.ensurePopupVisible(t)})}(),this.isSummarySlide(o)&&p.addClass("progressbar-part-summary-slide"),0===o&&p.addClass("h5p-progressbar-part-show"),o===r&&p.addClass("h5p-progressbar-part-selected"),i.cp.progressbarParts.push(p),this.updateSlideTitle(o),this.cp.slides.length<=60&&a.elements&&a.elements.length>0){var f=t[o]&&t[o].length>0,v=!!(i.cp.previousState&&i.cp.previousState.answered&&i.cp.previousState.answered[o]);f&&(e("<div>",{class:"h5p-progressbar-part-has-task"}).appendTo(h),this.setTaskAnswered(o,v))}}},t.prototype.ensurePopupVisible=function(e){var t=this.cp.$container.width(),n=e.outerWidth(),i=e.offset().left;i<0?(e.css("left",0),e.css("transform","translateX(0)")):i+n>t&&(e.css("left","auto"),e.css("right",0),e.css("transform","translateX(0)"))},t.prototype.displaySlide=function(e){var t=this;this.cp.jumpToSlide(e,!1,function(){var n=t.cp.getCurrentSlideIndex();t.updateSlideTitle(e,{isCurrent:!0}),t.updateSlideTitle(n,{isCurrent:!1}),t.toggleNextAndPreviousButtonDisabled(e)})},t.prototype.createSlideTitle=function(e){var t=this.cp.slides[e];return t.keywords&&t.keywords.length>0?t.keywords[0].main:this.isSummarySlide(e)?this.cp.l10n.summary:this.cp.l10n.slide+" "+(e+1)},t.prototype.isSummarySlide=function(e){return!(void 0!==this.cp.editor||e!==this.cp.slides.length-1||!this.cp.showSummarySlide)},t.prototype.initFooter=function(){var t=this,n=this,i=this.cp.$footer,r=e("<div/>",{class:"h5p-footer-left-adjusted"}).appendTo(i),s=e("<div/>",{class:"h5p-footer-center-adjusted"}).appendTo(i),a=e("<div/>",{role:"toolbar",class:"h5p-footer-right-adjusted"}).appendTo(i);this.cp.$keywordsButton=e("<div/>",{class:"h5p-footer-button h5p-footer-toggle-keywords","aria-expanded":"false","aria-label":this.cp.l10n.showKeywords,title:this.cp.l10n.showKeywords,role:"button",tabindex:"0",html:'<span class="h5p-icon-menu"></span><span class="current-slide-title"></span>'}).appendTo(r),(0,u.addClickAndKeyboardListeners)(this.cp.$keywordsButton,function(e){n.cp.presentation.keywordListAlwaysShow||(n.cp.toggleKeywords(),e.stopPropagation())}),!this.cp.presentation.keywordListAlwaysShow&&this.cp.initKeywords||this.cp.$keywordsButton.hide(),this.cp.presentation.keywordListEnabled||this.cp.$keywordsWrapper.add(this.$keywordsButton).hide(),this.updateFooterKeyword(0),this.cp.$prevSlideButton=e("<div/>",{class:"h5p-footer-button h5p-footer-previous-slide","aria-label":this.cp.l10n.prevSlide,title:this.cp.l10n.prevSlide,role:"button",tabindex:"-1","aria-disabled":"true"}).appendTo(s),(0,u.addClickAndKeyboardListeners)(this.cp.$prevSlideButton,function(){return t.cp.previousSlide(void 0,!1)});var l=e("<div/>",{class:"h5p-footer-slide-count"}).appendTo(s);this.cp.$footerCurrentSlide=e("<div/>",{html:"1",class:"h5p-footer-slide-count-current",title:this.cp.l10n.currentSlide,"aria-hidden":"true"}).appendTo(l),this.cp.$footerCounter=e("<div/>",{class:"hidden-but-read",html:this.cp.l10n.slideCount.replace("@index","1").replace("@total",this.cp.slides.length.toString())}).appendTo(s),e("<div/>",{html:"/",class:"h5p-footer-slide-count-delimiter","aria-hidden":"true"}).appendTo(l),this.cp.$footerMaxSlide=e("<div/>",{html:this.cp.slides.length,class:"h5p-footer-slide-count-max",title:this.cp.l10n.lastSlide,"aria-hidden":"true"}).appendTo(l),this.cp.$nextSlideButton=e("<div/>",{class:"h5p-footer-button h5p-footer-next-slide","aria-label":this.cp.l10n.nextSlide,title:this.cp.l10n.nextSlide,role:"button",tabindex:"0"}).appendTo(s),(0,u.addClickAndKeyboardListeners)(this.cp.$nextSlideButton,function(){return t.cp.nextSlide(void 0,!1)}),void 0===this.cp.editor&&(this.cp.$exitSolutionModeButton=e("<div/>",{role:"button",class:"h5p-footer-exit-solution-mode","aria-label":this.cp.l10n.solutionModeTitle,title:this.cp.l10n.solutionModeTitle,tabindex:"0"}).appendTo(a),(0,u.addClickAndKeyboardListeners)(this.cp.$exitSolutionModeButton,function(){return n.cp.jumpToSlide(n.cp.slides.length-1)}),this.cp.enablePrintButton&&o.default.supported()&&(this.cp.$printButton=e("<div/>",{class:"h5p-footer-button h5p-footer-print","aria-label":this.cp.l10n.printTitle,title:this.cp.l10n.printTitle,role:"button",tabindex:"0"}).appendTo(a),(0,u.addClickAndKeyboardListeners)(this.cp.$printButton,function(){return n.openPrintDialog()})),H5P.fullscreenSupported&&(this.cp.$fullScreenButton=e("<div/>",{class:"h5p-footer-button h5p-footer-toggle-full-screen","aria-label":this.cp.l10n.fullscreen,title:this.cp.l10n.fullscreen,role:"button",tabindex:"0"}),(0,u.addClickAndKeyboardListeners)(this.cp.$fullScreenButton,function(){return n.cp.toggleFullScreen()}),this.cp.$fullScreenButton.appendTo(a))),this.cp.$exitSolutionModeText=e("<div/>",{html:"",class:"h5p-footer-exit-solution-mode-text"}).appendTo(this.cp.$exitSolutionModeButton)},t.prototype.openPrintDialog=function(){var t=this,n=e(".h5p-wrapper");o.default.showDialog(this.cp.l10n,n,function(e){o.default.print(t.cp,n,e)}).children('[role="dialog"]').focus()},t.prototype.updateProgressBar=function(e,t,n){var i,r=this;for(i=0;i<r.cp.progressbarParts.length;i+=1)e+1>i?r.cp.progressbarParts[i].addClass("h5p-progressbar-part-show"):r.cp.progressbarParts[i].removeClass("h5p-progressbar-part-show");if(r.progresbarKeyboardControls.setTabbableByIndex(e),r.cp.progressbarParts[e].addClass("h5p-progressbar-part-selected").siblings().removeClass("h5p-progressbar-part-selected"),void 0===t)return void r.cp.progressbarParts.forEach(function(e,t){r.setTaskAnswered(t,!1)});n||r.cp.editor},t.prototype.setTaskAnswered=function(e,t){this.cp.progressbarParts[e].find(".h5p-progressbar-part-has-task").toggleClass("h5p-answered",t),this.updateSlideTitle(e,{state:t?p.ANSWERED:p.NOT_ANSWERED})},t.prototype.updateSlideTitle=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.state,i=t.isCurrent;this.setSlideTitle(e,{state:(0,u.defaultValue)(n,this.getAnsweredState(e)),isCurrent:(0,u.defaultValue)(i,this.cp.isCurrentSlide(e))})},t.prototype.setSlideTitle=function(e,t){var n=t.state,i=void 0===n?p.NO_INTERACTIONS:n,r=t.isCurrent,s=void 0!==r&&r,o=this.cp.slides.length,a=this.cp.progressbarParts[e],l=a.find(".h5p-progressbar-part-title"),d=this.cp.l10n.slideCount.replace("@index",e+1).replace("@total",o),c=this.answeredLabels[i].replace("@slideName",this.createSlideTitle(e)),u=s?this.cp.l10n.currentSlide:"";l.html(d+": "+c+". "+u)},t.prototype.getAnsweredState=function(e){var t=this.cp.progressbarParts[e],n=this.slideHasInteraction(e),i=this.cp.slideHasAnsweredTask(e);return n?t.find(".h5p-is-correct").length>0?p.CORRECT:t.find(".h5p-is-wrong").length>0?p.INCORRECT:i?p.ANSWERED:p.NOT_ANSWERED:p.NO_INTERACTIONS},t.prototype.slideHasInteraction=function(e){return this.cp.progressbarParts[e].find(".h5p-progressbar-part-has-task").length>0},t.prototype.updateFooter=function(e){this.cp.$footerCurrentSlide.html(e+1),this.cp.$footerMaxSlide.html(this.cp.slides.length),this.cp.$footerCounter.html(this.cp.l10n.slideCount.replace("@index",(e+1).toString()).replace("@total",this.cp.slides.length.toString())),this.cp.isSolutionMode&&e===this.cp.slides.length-1?this.cp.$footer.addClass("summary-slide"):this.cp.$footer.removeClass("summary-slide"),this.toggleNextAndPreviousButtonDisabled(e),this.updateFooterKeyword(e)},t.prototype.toggleNextAndPreviousButtonDisabled=function(e){var t=this.cp.slides.length-1;this.cp.$prevSlideButton.attr("aria-disabled",(0===e).toString()),this.cp.$nextSlideButton.attr("aria-disabled",(e===t).toString()),this.cp.$prevSlideButton.attr("tabindex",0===e?"-1":"0"),this.cp.$nextSlideButton.attr("tabindex",e===t?"-1":"0")},t.prototype.updateFooterKeyword=function(e){var t=this.cp.slides[e],n="";t&&t.keywords&&t.keywords[0]&&(n=t.keywords[0].main),!this.cp.isEditor()&&this.cp.showSummarySlide&&e>=this.cp.slides.length-1&&(n=this.cp.l10n.summary),this.cp.$keywordsButton.children(".current-slide-title").html((0,u.defaultValue)(n,""))},t}(H5P.jQuery);t.default=h},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),r=function(e){function t(){}var n=0;return t.supported=function(){return"function"==typeof window.print},t.print=function(t,n,i){t.trigger("printing",{finished:!1,allSlides:i});var r=e(".h5p-slide.h5p-current"),s=r.height(),o=r.width(),a=o/670,l=e(".h5p-slide");l.css({height:s/a+"px",width:"670px",fontSize:Math.floor(100/a)+"%"});var d=n.height();n.css("height","auto"),l.toggleClass("doprint",!0===i),r.addClass("doprint"),setTimeout(function(){window.print(),l.css({height:"",width:"",fontSize:""}),n.css("height",d+"px"),t.trigger("printing",{finished:!0})},500)},t.showDialog=function(t,r,s){var o=this,a=n++,l="h5p-cp-print-dialog-"+a+"-title",d="h5p-cp-print-dialog-"+a+"-ingress",c=e('<div class="h5p-popup-dialog h5p-print-dialog">\n                      <div role="dialog" aria-labelledby="'+l+'" aria-describedby="'+d+'" tabindex="-1" class="h5p-inner">\n                        <h2 id="'+l+'">'+t.printTitle+'</h2>\n                        <div class="h5p-scroll-content"></div>\n                        <div class="h5p-close" role="button" tabindex="0" title="'+H5P.t("close")+'">\n                      </div>\n                    </div>').insertAfter(r).click(function(){o.close()}).children(".h5p-inner").click(function(){return!1}).end();(0,i.addClickAndKeyboardListeners)(c.find(".h5p-close"),function(){return o.close()});var u=c.find(".h5p-scroll-content");return u.append(e("<div>",{class:"h5p-cp-print-ingress",id:d,html:t.printIngress})),H5P.JoubelUI.createButton({html:t.printAllSlides,class:"h5p-cp-print-all-slides",click:function(){o.close(),s(!0)}}).appendTo(u),H5P.JoubelUI.createButton({html:t.printCurrentSlide,class:"h5p-cp-print-current-slide",click:function(){o.close(),s(!1)}}).appendTo(u),this.open=function(){setTimeout(function(){c.addClass("h5p-open"),H5P.jQuery(o).trigger("dialog-opened",[c])},1)},this.close=function(){c.removeClass("h5p-open"),setTimeout(function(){c.remove()},200)},this.open(),c},t}(H5P.jQuery);t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createElement=t.toggleClass=t.toggleVisibility=t.show=t.hide=t.removeClass=t.addClass=t.classListContains=t.removeChild=t.querySelectorAll=t.nodeListToArray=t.querySelector=t.appendChild=t.toggleAttribute=t.attributeEquals=t.hasAttribute=t.removeAttribute=t.setAttribute=t.getAttribute=void 0;var i=n(4),r=t.getAttribute=(0,i.curry)(function(e,t){return t.getAttribute(e)}),s=t.setAttribute=(0,i.curry)(function(e,t,n){return n.setAttribute(e,t)}),o=(t.removeAttribute=(0,i.curry)(function(e,t){return t.removeAttribute(e)}),t.hasAttribute=(0,i.curry)(function(e,t){return t.hasAttribute(e)}),t.attributeEquals=(0,i.curry)(function(e,t,n){return n.getAttribute(e)===t}),t.toggleAttribute=(0,i.curry)(function(e,t){var n=r(e,t);s(e,(0,i.inverseBooleanString)(n),t)}),t.appendChild=(0,i.curry)(function(e,t){return e.appendChild(t)}),t.querySelector=(0,i.curry)(function(e,t){return t.querySelector(e)}),t.nodeListToArray=function(e){return Array.prototype.slice.call(e)}),a=(t.querySelectorAll=(0,i.curry)(function(e,t){return o(t.querySelectorAll(e))}),t.removeChild=(0,i.curry)(function(e,t){return e.removeChild(t)}),t.classListContains=(0,i.curry)(function(e,t){return t.classList.contains(e)}),t.addClass=(0,i.curry)(function(e,t){return t.classList.add(e)})),l=t.removeClass=(0,i.curry)(function(e,t){return t.classList.remove(e)}),d=t.hide=a("hidden"),c=t.show=l("hidden");t.toggleVisibility=(0,i.curry)(function(e,t){return(e?c:d)(t)}),t.toggleClass=(0,i.curry)(function(e,t,n){n.classList[t?"add":"remove"](e)}),t.createElement=function(e){var t=e.tag,n=e.id,i=e.classes,r=e.attributes,s=document.createElement(t);return n&&(s.id=n),i&&i.forEach(function(e){s.classList.add(e)}),r&&Object.keys(r).forEach(function(e){s.setAttribute(e,r[e])}),s}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Eventful=function(){return{listeners:{},on:function(e,t,n){var i={listener:t,scope:n};return this.listeners[e]=this.listeners[e]||[],this.listeners[e].push(i),this},fire:function(e,t){return(this.listeners[e]||[]).every(function(e){return!1!==e.listener.call(e.scope||this,t)})},propagate:function(e,t){var n=this;e.forEach(function(e){return t.on(e,function(t){return n.fire(e,t)})})}}}},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),s=function e(t){i(this,e);var n=t.presentation;n=r.jQuery.extend(!0,{globalBackgroundSelector:{fillGlobalBackground:"",imageGlobalBackground:{}},slides:[{slideBackgroundSelector:{fillSlideBackground:"",imageSlideBackground:{}}}]},n);var s=function(e,n,i){var r=t.$slidesWrapper.children().filter(":not(.h5p-summary-slide)");void 0!==i&&(r=r.eq(i)),e&&""!==e?r.addClass("has-background").css("background-image","").css("background-color",e):n&&n.path&&r.addClass("has-background").css("background-color","").css("background-image","url("+H5P.getPath(n.path,t.contentId)+")")};!function(){var e=n.globalBackgroundSelector;s(e.fillGlobalBackground,e.imageGlobalBackground)}(),function(){n.slides.forEach(function(e,t){var n=e.slideBackgroundSelector;n&&s(n.fillSlideBackground,n.imageSlideBackground,t)})}()};t.default=s},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),o=n(3),a=i(o),l=n(5),d=i(l),c=n(1),u=n(0),p=function(e){return parseInt(e.dataset.index)},h=function(){function e(t){var n=this,i=t.l10n,s=t.currentIndex;r(this,e),this.l10n=i,this.state={currentIndex:(0,c.defaultValue)(s,0)},this.eventDispatcher=new u.EventDispatcher,this.controls=new a.default([new d.default]),this.controls.on("select",function(e){n.onMenuItemSelect(p(e.element))}),this.controls.on("close",function(){return n.eventDispatcher.trigger("close")}),this.menuElement=this.createMenuElement(),this.currentSlideMarkerElement=this.createCurrentSlideMarkerElement()}return s(e,[{key:"init",value:function(e){var t=this;return this.menuItemElements=e.map(function(e){return t.createMenuItemElement(e)}),this.menuItemElements.forEach(function(e){return t.menuElement.appendChild(e)}),this.menuItemElements.forEach(function(e){return t.controls.addElement(e)}),this.setCurrentSlideIndex(this.state.currentIndex),this.menuItemElements}},{key:"on",value:function(e,t){this.eventDispatcher.on(e,t)}},{key:"getElement",value:function(){return this.menuElement}},{key:"removeAllMenuItemElements",value:function(){var e=this;this.menuItemElements.forEach(function(t){e.controls.removeElement(t),e.menuElement.removeChild(t)}),this.menuItemElements=[]}},{key:"createMenuElement",value:function(){var e=this.menuElement=document.createElement("ol");return e.setAttribute("role","menu"),e.classList.add("list-unstyled"),e}},{key:"createMenuItemElement",value:function(e){var t=this,n=document.createElement("li");return n.setAttribute("role","menuitem"),n.addEventListener("click",function(e){t.onMenuItemSelect(p(e.currentTarget))}),this.applyConfigToMenuItemElement(n,e),n}},{key:"applyConfigToMenuItemElement",value:function(e,t){e.innerHTML='<div class="h5p-keyword-subtitle">'+t.subtitle+'</div><span class="h5p-keyword-title">'+t.title+"</span>",e.dataset.index=t.index}},{key:"onMenuItemSelect",value:function(e){this.setCurrentSlideIndex(e),this.eventDispatcher.trigger("select",{index:e})}},{key:"setCurrentSlideIndex",value:function(e){var t=this.getElementByIndex(this.menuItemElements,e);t&&(this.state.currentIndex=e,this.updateCurrentlySelected(this.menuItemElements,this.state),this.controls.setTabbable(t))}},{key:"updateCurrentlySelected",value:function(e,t){var n=this;e.forEach(function(e){var i=t.currentIndex===p(e);e.classList.toggle("h5p-current",i),i&&e.appendChild(n.currentSlideMarkerElement)})}},{key:"scrollToKeywords",value:function(e){var t=this.getFirstElementAfter(e);if(t){var n=(0,u.jQuery)(this.menuElement),i=n.scrollTop()+(0,u.jQuery)(t).position().top-8;c.isIPad?n.scrollTop(i):n.stop().animate({scrollTop:i},250)}}},{key:"getFirstElementAfter",value:function(e){return this.menuItemElements.filter(function(t){return p(t)>=e})[0]}},{key:"getElementByIndex",value:function(e,t){return e.filter(function(e){return p(e)===t})[0]}},{key:"createCurrentSlideMarkerElement",value:function(){var e=document.createElement("div");return e.classList.add("hidden-but-read"),e.innerHTML=this.l10n.currentSlide,e}}]),e}();t.default=h},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function r(e){var t=this;l.default.call(t,o.default,e.elements);var n=void 0;t.getElement=function(){return n||(n=H5P.jQuery(r.createHTML(e))),n},t.setCurrent=function(){this.parent.$current=n.addClass("h5p-current")},t.appendElements=function(){for(var i=0;i<t.children.length;i++)t.parent.attachElement(e.elements[i],t.children[i].instance,n,t.index);t.parent.elementsAttached[t.index]=!0,t.parent.trigger("domChanged",{$target:n,library:"CoursePresentation",key:"newSlide"},{bubbles:!0,external:!0})}}Object.defineProperty(t,"__esModule",{value:!0});var s=n(24),o=i(s),a=n(2),l=i(a);r.createHTML=function(e){return'<div role="document" class="h5p-slide"'+(void 0!==e.background?' style="background:'+e.background+'"':"")+"></div>"},t.default=r},function(e,t,n){"use strict";function i(e){var t=this;if(void 0===e.action)t.instance=new s.default(e,{l10n:t.parent.parent.l10n,currentIndex:t.parent.index}),t.parent.parent.isEditor()||t.instance.on("navigate",function(e){var n=e.data;t.parent.parent.jumpToSlide(n)});else{var n;n=t.parent.parent.isEditor()?H5P.jQuery.extend(!0,{},e.action,t.parent.parent.elementsOverride):H5P.jQuery.extend(!0,e.action,t.parent.parent.elementsOverride),n.params.autoplay?(n.params.autoplay=!1,n.params.cpAutoplay=!0):n.params.playback&&n.params.playback.autoplay?(n.params.playback.autoplay=!1,n.params.cpAutoplay=!0):n.params.media&&n.params.media.params&&n.params.media.params.playback&&n.params.media.params.playback.autoplay?(n.params.media.params.playback.autoplay=!1,n.params.cpAutoplay=!0):n.params.media&&n.params.media.params&&n.params.media.params.autoplay?(n.params.media.params.autoplay=!1,n.params.cpAutoplay=!0):n.params.override&&n.params.override.autoplay&&(n.params.override.autoplay=!1,n.params.cpAutoplay=!0);var i=t.parent.parent.elementInstances[t.parent.index]?t.parent.parent.elementInstances[t.parent.index].length:0;t.parent.parent.previousState&&t.parent.parent.previousState.answers&&t.parent.parent.previousState.answers[t.parent.index]&&t.parent.parent.previousState.answers[t.parent.index][i]&&(n.userDatas={state:t.parent.parent.previousState.answers[t.parent.index][i]}),n.params=n.params||{},t.instance=H5P.newRunnable(n,t.parent.parent.contentId,void 0,!0,{parent:t.parent.parent}),void 0!==t.instance.preventResize&&(t.instance.preventResize=!0)}void 0===t.parent.parent.elementInstances[t.parent.index]?t.parent.parent.elementInstances[t.parent.index]=[t.instance]:t.parent.parent.elementInstances[t.parent.index].push(t.instance),(void 0!==t.instance.showCPComments||t.instance.isTask||void 0===t.instance.isTask&&void 0!==t.instance.showSolutions)&&(t.instance.coursePresentationIndexOnSlide=t.parent.parent.elementInstances[t.parent.index].length-1,void 0===t.parent.parent.slidesWithSolutions[t.parent.index]&&(t.parent.parent.slidesWithSolutions[t.parent.index]=[]),t.parent.parent.slidesWithSolutions[t.parent.index].push(t.instance)),void 0!==t.instance.exportAnswers&&t.instance.exportAnswers&&(t.parent.parent.hasAnswerElements=!0),t.parent.parent.isTask||t.parent.parent.hideSummarySlide||(t.instance.isTask||void 0===t.instance.isTask&&void 0!==t.instance.showSolutions)&&(t.parent.parent.isTask=!0)}Object.defineProperty(t,"__esModule",{value:!0});var r=n(25),s=function(e){return e&&e.__esModule?e:{default:e}}(r);t.default=i},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(1),o=n(0),a={SPECIFIED:"specified",NEXT:"next",PREVIOUS:"previous"},l=function(){function e(t,n){var r=this,l=t.title,d=t.goToSlide,c=void 0===d?1:d,u=t.invisible,p=t.goToSlideType,h=void 0===p?a.SPECIFIED:p,f=n.l10n,v=n.currentIndex;i(this,e),this.eventDispatcher=new o.EventDispatcher;var m="h5p-press-to-go",y=0;if(u)l=void 0,y=-1;else{if(!l)switch(h){case a.SPECIFIED:l=f.goToSlide.replace(":num",c.toString());break;case a.NEXT:l=f.goToSlide.replace(":num",f.nextSlide);break;case a.PREVIOUS:l=f.goToSlide.replace(":num",f.prevSlide)}m+=" h5p-visible"}var g=c-1;h===a.NEXT?g=v+1:h===a.PREVIOUS&&(g=v-1),this.$element=(0,o.jQuery)("<a/>",{href:"#",class:m,tabindex:y,title:l}),(0,s.addClickAndKeyboardListeners)(this.$element,function(e){r.eventDispatcher.trigger("navigate",g),e.preventDefault()})}return r(e,[{key:"attach",value:function(e){e.html("").addClass("h5p-go-to-slide").append(this.$element)}},{key:"on",value:function(e,t){this.eventDispatcher.on(e,t)}}]),e}();t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(e,t){var n=new H5P.ConfirmationDialog(e).appendTo(document.body);return n.getElement().classList.add("h5p-cp-confirmation-dialog"),n.show(),n};t.default=i}]);;
H5P.Column = (function (EventDispatcher) {

  /**
   * Column Constructor
   *
   * @class
   * @param {Object} params Describes task behavior
   * @param {number} id Content identifier
   * @param {Object} data User specific data to adapt behavior
   */
  function Column(params, id, data) {
    /** @alias H5P.Column# */
    var self = this;

    // We support events by extending this class
    EventDispatcher.call(self);

    // Add defaults
    params = params || {};
    if (params.useSeparators === undefined) {
      params.useSeparators = true;
    }

    this.contentData = data;

    // Column wrapper element
    var wrapper;

    // H5P content in the column
    var instances = [];
    var instanceContainers = [];

    // Number of tasks among instances
    var numTasks = 0;

    // Number of tasks that has been completed
    var numTasksCompleted = 0;

    // Keep track of result for each task
    var tasksResultEvent = [];

    // Keep track of last content's margin state
    var previousHasMargin;

    /**
     * Calculate score and trigger completed event.
     *
     * @private
     */
    var completed = function () {
      // Sum all scores
      var raw = 0;
      var max = 0;

      for (var i = 0; i < tasksResultEvent.length; i++) {
        var event = tasksResultEvent[i];
        raw += event.getScore();
        max += event.getMaxScore();
      }

      self.triggerXAPIScored(raw, max, 'completed');
    };

    /**
     * Generates an event handler for the given task index.
     *
     * @private
     * @param {number} taskIndex
     * @return {function} xAPI event handler
     */
    var trackScoring = function (taskIndex) {
      return function (event) {
        if (event.getScore() === null) {
          return; // Skip, not relevant
        }

        if (tasksResultEvent[taskIndex] === undefined) {
          // Update number of completed tasks
          numTasksCompleted++;
        }

        // Keep track of latest event with result
        tasksResultEvent[taskIndex] = event;

        // Track progress
        var progressed = self.createXAPIEventTemplate('progressed');
        progressed.data.statement.object.definition.extensions['http://id.tincanapi.com/extension/ending-point'] = taskIndex + 1;
        self.trigger(progressed);

        // Check to see if we're done
        if (numTasksCompleted === numTasks) {
          // Run this after the current event is sent
          setTimeout(function () {
            completed(); // Done
          }, 0);
        }
      };
    };

    /**
     * Creates a new ontent instance from the given content parameters and
     * then attaches it the wrapper. Sets up event listeners.
     *
     * @private
     * @param {Object} content Parameters
     * @param {Object} [contentData] Content Data
     */
    var addRunnable = function (content, contentData) {
      // Create container for content
      var container = document.createElement('div');
      container.classList.add('h5p-column-content');

      // Content overrides
      var library = content.library.split(' ')[0];
      if (library === 'H5P.Video') {
        // Prevent video from growing endlessly since height is unlimited.
        content.params.visuals.fit = false;
      }

      // Create content instance
      var instance = H5P.newRunnable(content, id, undefined, true, contentData);

      // Bubble resize events
      bubbleUp(instance, 'resize', self);

      // Check if instance is a task
      if (Column.isTask(instance)) {
        // Tasks requires completion

        instance.on('xAPI', trackScoring(numTasks));
        numTasks++;
      }

      if (library === 'H5P.Image' || library === 'H5P.TwitterUserFeed') {
        // Resize when images are loaded

        instance.on('loaded', function () {
          self.trigger('resize');
        });
      }

      // Keep track of all instances
      instances.push(instance);
      instanceContainers.push({
        hasAttached: false,
        container: container,
        instanceIndex: instances.length - 1,
      });

      // Add to DOM wrapper
      wrapper.appendChild(container);
    };

    /**
     * Help get data for content at given index
     *
     * @private
     * @param {number} index
     * @returns {Object} Data object with previous state
     */
    var grabContentData = function (index) {
      var contentData = {
        parent: self
      };

      if (data.previousState && data.previousState.instances && data.previousState.instances[index]) {
        contentData.previousState = data.previousState.instances[index];
      }

      return contentData;
    };

    /**
     * Adds separator before the next content.
     *
     * @private
     * @param {string} libraryName Name of the next content type
     * @param {string} useSeparator
     */
    var addSeparator = function (libraryName, useSeparator) {
      // Determine separator spacing
      var thisHasMargin = (hasMargins.indexOf(libraryName) !== -1);

      // Only add if previous content exists
      if (previousHasMargin !== undefined) {

        // Create separator element
        var separator = document.createElement('div');
        //separator.classList.add('h5p-column-ruler');

        // If no margins, check for top margin only
        if (!thisHasMargin && (hasTopMargins.indexOf(libraryName) === -1)) {
          if (!previousHasMargin) {
            // None of them have margin

            // Only add separator if forced
            if (useSeparator === 'enabled') {
              // Add ruler
              separator.classList.add('h5p-column-ruler');

              // Add space both before and after the ruler
              separator.classList.add('h5p-column-space-before-n-after');
            }
            else {
              // Default is to separte using a single space, no ruler
              separator.classList.add('h5p-column-space-before');
            }
          }
          else {
            // We don't have any margin but the previous content does

            // Only add separator if forced
            if (useSeparator === 'enabled') {
              // Add ruler
              separator.classList.add('h5p-column-ruler');

              // Add space after the ruler
              separator.classList.add('h5p-column-space-after');
            }
          }
        }
        else if (!previousHasMargin) {
          // We have margin but not the previous content doesn't

          // Only add separator if forced
          if (useSeparator === 'enabled') {
            // Add ruler
            separator.classList.add('h5p-column-ruler');

            // Add space after the ruler
            separator.classList.add('h5p-column-space-before');
          }
        }
        else {
          // Both already have margin

          if (useSeparator !== 'disabled') {
            // Default is to add ruler unless its disabled
            separator.classList.add('h5p-column-ruler');
          }
        }

        // Insert into DOM
        wrapper.appendChild(separator);
      }

      // Keep track of spacing for next separator
      previousHasMargin = thisHasMargin || (hasBottomMargins.indexOf(libraryName) !== -1);
    };

    /**
     * Creates a wrapper and the column content the first time the column
     * is attached to the DOM.
     *
     * @private
     */
    var createHTML = function () {
      // Create wrapper
      wrapper = document.createElement('div');

      // Go though all contents
      for (var i = 0; i < params.content.length; i++) {
        var content = params.content[i];

        // In case the author has created an element without selecting any
        // library
        if (content.content === undefined) {
          continue;
        }

        if (params.useSeparators) { // (check for global override)

          // Add separator between contents
          addSeparator(content.content.library.split(' ')[0], content.useSeparator);
        }

        // Add content
        addRunnable(content.content, grabContentData(i));
      }
    };

    /**
     * Attach the column to the given container
     *
     * @param {H5P.jQuery} $container
     */
    self.attach = function ($container) {
      if (wrapper === undefined) {
        // Create wrapper and content
        createHTML();
      }

      // Attach instances that have not been attached
      instanceContainers.filter(function (container) { return !container.hasAttached })
        .forEach(function (container) {
          instances[container.instanceIndex]
            .attach(H5P.jQuery(container.container));

          // Remove any fullscreen buttons
          disableFullscreen(instances[container.instanceIndex]);
        });


      // Add to DOM
      $container.addClass('h5p-column').html('').append(wrapper);
    };

    /**
     * Create object containing information about the current state
     * of this content.
     *
     * @return {Object}
     */
    self.getCurrentState = function () {
      // Get previous state object or create new state object
      var state = (data.previousState ? data.previousState : {});
      if (!state.instances) {
        state.instances = [];
      }

      // Grab the current state for each instance
      for (var i = 0; i < instances.length; i++) {
        var instance = instances[i];

        if (instance.getCurrentState instanceof Function ||
            typeof instance.getCurrentState === 'function') {

          state.instances[i] = instance.getCurrentState();
        }
      }

      // Done
      return state;
    };

    /**
     * Get xAPI data.
     * Contract used by report rendering engine.
     *
     * @see contract at {@link https://h5p.org/documentation/developers/contracts#guides-header-6}
     */
    self.getXAPIData = function () {
      var xAPIEvent = self.createXAPIEventTemplate('answered');
      addQuestionToXAPI(xAPIEvent);
      xAPIEvent.setScoredResult(self.getScore(),
        self.getMaxScore(),
        self,
        true,
        self.getScore() === self.getMaxScore()
      );
      return {
        statement: xAPIEvent.data.statement,
        children: getXAPIDataFromChildren(instances)
      };
    };

    /**
     * Get score for all children
     * Contract used for getting the complete score of task.
     *
     * @return {number} Score for questions
     */
    self.getScore = function () {
      return instances.reduce(function (prev, instance) {
        return prev + (instance.getScore ? instance.getScore() : 0);
      }, 0);
    };

    /**
     * Get maximum score possible for all children instances
     * Contract.
     *
     * @return {number} Maximum score for questions
     */
    self.getMaxScore = function () {
      return instances.reduce(function (prev, instance) {
        return prev + (instance.getMaxScore ? instance.getMaxScore() : 0);
      }, 0);
    };

    /**
     * Get answer given
     * Contract.
     *
     * @return {boolean} True, if all answers have been given.
     */
    self.getAnswerGiven = function () {
      return instances.reduce(function (prev, instance) {
        return prev && (instance.getAnswerGiven ? instance.getAnswerGiven() : prev);
      }, true);
    };

    /**
     * Show solutions.
     * Contract.
     */
    self.showSolutions = function () {
      instances.forEach(function (instance) {
        if (instance.toggleReadSpeaker) {
          instance.toggleReadSpeaker(true);
        }
        if (instance.showSolutions) {
          instance.showSolutions();
        }
        if (instance.toggleReadSpeaker) {
          instance.toggleReadSpeaker(false);
        }
      });
    };

    /**
     * Reset task.
     * Contract.
     */
    self.resetTask = function () {
      instances.forEach(function (instance) {
        if (instance.resetTask) {
          instance.resetTask();
        }
      });
    };

    /**
     * Get instances for all children
     * TODO: This is not a good interface, we should provide handling needed
     * handling of the tasks instead of repeating them for each parent...
     *
     * @return {Object[]} array of instances
     */
    self.getInstances = function () {
      return instances;
    };

    /**
     * Get title, e.g. for xAPI when Column is subcontent.
     *
     * @return {string} Title.
     */
    self.getTitle = function () {
      return H5P.createTitle((self.contentData && self.contentData.metadata && self.contentData.metadata.title) ? self.contentData.metadata.title : 'Column');
    };

    /**
     * Add the question itself to the definition part of an xAPIEvent
     */
    var addQuestionToXAPI = function (xAPIEvent) {
      var definition = xAPIEvent.getVerifiedStatementValue(['object', 'definition']);
      H5P.jQuery.extend(definition, getxAPIDefinition());
    };

    /**
     * Generate xAPI object definition used in xAPI statements.
     * @return {Object}
     */
    var getxAPIDefinition = function () {
      var definition = {};

      definition.interactionType = 'compound';
      definition.type = 'http://adlnet.gov/expapi/activities/cmi.interaction';
      definition.description = {
        'en-US': ''
      };

      return definition;
    };

    /**
     * Get xAPI data from sub content types
     *
     * @param {Array} of H5P instances
     * @returns {Array} of xAPI data objects used to build a report
     */
    var getXAPIDataFromChildren = function (children) {
      return children.map(function (child) {
        if (typeof child.getXAPIData == 'function') {
          return child.getXAPIData();
        }
      }).filter(function (data) {
        return !!data;
      });
    };

    // Resize children to fit inside parent
    bubbleDown(self, 'resize', instances);

    if (wrapper === undefined) {
      // Create wrapper and content
      createHTML();
    }

    self.setActivityStarted();
  }

  Column.prototype = Object.create(EventDispatcher.prototype);
  Column.prototype.constructor = Column;

  /**
   * Makes it easy to bubble events from parent to children
   *
   * @private
   * @param {Object} origin Origin of the Event
   * @param {string} eventName Name of the Event
   * @param {Array} targets Targets to trigger event on
   */
  function bubbleDown(origin, eventName, targets) {
    origin.on(eventName, function (event) {
      if (origin.bubblingUpwards) {
        return; // Prevent send event back down.
      }

      for (var i = 0; i < targets.length; i++) {
        targets[i].trigger(eventName, event);
      }
    });
  }

  /**
   * Makes it easy to bubble events from child to parent
   *
   * @private
   * @param {Object} origin Origin of the Event
   * @param {string} eventName Name of the Event
   * @param {Object} target Target to trigger event on
   */
  function bubbleUp(origin, eventName, target) {
    origin.on(eventName, function (event) {
      // Prevent target from sending event back down
      target.bubblingUpwards = true;

      // Trigger event
      target.trigger(eventName, event);

      // Reset
      target.bubblingUpwards = false;
    });
  }

  /**
   * Definition of which content types are tasks
   */
  var isTasks = [
    'H5P.ImageHotspotQuestion',
    'H5P.Blanks',
    'H5P.Essay',
    'H5P.SingleChoiceSet',
    'H5P.MultiChoice',
    'H5P.TrueFalse',
    'H5P.DragQuestion',
    'H5P.Summary',
    'H5P.DragText',
    'H5P.MarkTheWords',
    'H5P.MemoryGame',
    'H5P.QuestionSet',
    'H5P.InteractiveVideo',
    'H5P.CoursePresentation',
    'H5P.DocumentationTool'
  ];

  /**
   * Check if the given content instance is a task (will give a score)
   *
   * @param {Object} instance
   * @return {boolean}
   */
  Column.isTask = function (instance) {
    if (instance.isTask !== undefined) {
      return instance.isTask; // Content will determine self if it's a task
    }

    // Go through the valid task names
    for (var i = 0; i < isTasks.length; i++) {
      // Check against library info. (instanceof is broken in H5P.newRunnable)
      if (instance.libraryInfo.machineName === isTasks[i]) {
        return true;
      }
    }

    return false;
  }

  /**
   * Definition of which content type have margins
   */
  var hasMargins = [
    'H5P.AdvancedText',
    'H5P.AudioRecorder',
    'H5P.Essay',
    'H5P.Link',
    'H5P.Accordion',
    'H5P.Table',
    'H5P.GuessTheAnswer',
    'H5P.Blanks',
    'H5P.MultiChoice',
    'H5P.TrueFalse',
    'H5P.DragQuestion',
    'H5P.Summary',
    'H5P.DragText',
    'H5P.MarkTheWords',
    'H5P.ImageHotspotQuestion',
    'H5P.MemoryGame',
    'H5P.Dialogcards',
    'H5P.QuestionSet',
    'H5P.DocumentationTool'
  ];

  /**
   * Definition of which content type have top margins
   */
  var hasTopMargins = [
    'H5P.SingleChoiceSet'
  ];

  /**
   * Definition of which content type have bottom margins
   */
  var hasBottomMargins = [
    'H5P.CoursePresentation',
    'H5P.Dialogcards',
    'H5P.GuessTheAnswer',
    'H5P.ImageSlider'
  ];

  /**
   * Remove custom fullscreen buttons from sub content.
   * (A bit of a hack, there should have been some sort of override…)
   *
   * @param {Object} instance
   */
  function disableFullscreen(instance) {
    switch (instance.libraryInfo.machineName) {
      case 'H5P.CoursePresentation':
        if (instance.$fullScreenButton) {
          instance.$fullScreenButton.remove();
        }
        break;

      case 'H5P.InteractiveVideo':
        instance.on('controls', function () {
          if (instance.controls.$fullscreen) {
            instance.controls.$fullscreen.remove();
          }
        });
        break;
    }
  }

  return Column;
})(H5P.EventDispatcher);
;
var H5P = H5P || {};

/**
 * Constructor.
 *
 * @param {Object} params Options for this library.
 * @param {Number} id Content identifier
 * @returns {undefined}
 */
(function ($) {
  H5P.Image = function (params, id, extras) {
    H5P.EventDispatcher.call(this);
    this.extras = extras;

    if (params.file === undefined || !(params.file instanceof Object)) {
      this.placeholder = true;
    }
    else {
      this.source = H5P.getPath(params.file.path, id);
      this.width = params.file.width;
      this.height = params.file.height;
    }

    this.alt = params.alt !== undefined ? params.alt : '';

    if (params.title !== undefined) {
      this.title = params.title;
    }
  };

  H5P.Image.prototype = Object.create(H5P.EventDispatcher.prototype);
  H5P.Image.prototype.constructor = H5P.Image;

  /**
   * Wipe out the content of the wrapper and put our HTML in it.
   *
   * @param {jQuery} $wrapper
   * @returns {undefined}
   */
  H5P.Image.prototype.attach = function ($wrapper) {
    var self = this;
    var source = this.source;

    if (self.$img === undefined) {
      if(self.placeholder) {
        self.$img = $('<div>', {
          width: '100%',
          height: '100%',
          class: 'h5p-placeholder',
          title: this.title === undefined ? '' : this.title,
          on: {
            load: function () {
              self.trigger('loaded');
            }
          }
        });
      } else {
        self.$img = $('<img>', {
          width: '100%',
          height: '100%',
          src: source,
          alt: this.alt,
          title: this.title === undefined ? '' : this.title,
          on: {
            load: function () {
              self.trigger('loaded');
            }
          }
        });
      }
    }

    $wrapper.addClass('h5p-image').html(self.$img);
  };

  return H5P.Image;
}(H5P.jQuery));
;
H5P.Question = (function ($, EventDispatcher, JoubelUI) {

  /**
   * Extending this class make it alot easier to create tasks for other
   * content types.
   *
   * @class H5P.Question
   * @extends H5P.EventDispatcher
   * @param {string} type
   */
  function Question(type) {
    var self = this;

    // Inheritance
    EventDispatcher.call(self);

    // Register default section order
    self.order = ['video', 'image', 'introduction', 'content', 'explanation', 'feedback', 'scorebar', 'buttons', 'read'];

    // Keep track of registered sections
    var sections = {};

    // Buttons
    var buttons = {};
    var buttonOrder = [];

    // Wrapper when attached
    var $wrapper;

    // Click element
    var clickElement;

    // ScoreBar
    var scoreBar;

    // Keep track of the feedback's visual status.
    var showFeedback;

    // Keep track of which buttons are scheduled for hiding.
    var buttonsToHide = [];

    // Keep track of which buttons are scheduled for showing.
    var buttonsToShow = [];

    // Keep track of the hiding and showing of buttons.
    var toggleButtonsTimer;
    var toggleButtonsTransitionTimer;
    var buttonTruncationTimer;

    // Keeps track of initialization of question
    var initialized = false;

    /**
     * @type {Object} behaviour Behaviour of Question
     * @property {Boolean} behaviour.disableFeedback Set to true to disable feedback section
     */
    var behaviour = {
      disableFeedback: false,
      disableReadSpeaker: false
    };

    // Keeps track of thumb state
    var imageThumb = true;

    // Keeps track of image transitions
    var imageTransitionTimer;

    // Keep track of whether sections is transitioning.
    var sectionsIsTransitioning = false;

    // Keep track of auto play state
    var disableAutoPlay = false;

    // Feedback transition timer
    var feedbackTransitionTimer;

    // Used when reading messages to the user
    var $read, readText;

    /**
     * Register section with given content.
     *
     * @private
     * @param {string} section ID of the section
     * @param {(string|H5P.jQuery)} [content]
     */
    var register = function (section, content) {
      sections[section] = {};
      var $e = sections[section].$element = $('<div/>', {
        'class': 'h5p-question-' + section,
      });
      if (content) {
        $e[content instanceof $ ? 'append' : 'html'](content);
      }
    };

    /**
     * Update registered section with content.
     *
     * @private
     * @param {string} section ID of the section
     * @param {(string|H5P.jQuery)} content
     */
    var update = function (section, content) {
      if (content instanceof $) {
        sections[section].$element.html('').append(content);
      }
      else {
        sections[section].$element.html(content);
      }
    };

    /**
     * Insert element with given ID into the DOM.
     *
     * @private
     * @param {array|Array|string[]} order
     * List with ordered element IDs
     * @param {string} id
     * ID of the element to be inserted
     * @param {Object} elements
     * Maps ID to the elements
     * @param {H5P.jQuery} $container
     * Parent container of the elements
     */
    var insert = function (order, id, elements, $container) {
      // Try to find an element id should be after
      for (var i = 0; i < order.length; i++) {
        if (order[i] === id) {
          // Found our pos
          while (i > 0 &&
          (elements[order[i - 1]] === undefined ||
          !elements[order[i - 1]].isVisible)) {
            i--;
          }
          if (i === 0) {
            // We are on top.
            elements[id].$element.prependTo($container);
          }
          else {
            // Add after element
            elements[id].$element.insertAfter(elements[order[i - 1]].$element);
          }
          elements[id].isVisible = true;
          break;
        }
      }
    };

    /**
     * Make feedback into a popup and position relative to click.
     *
     * @private
     * @param {string} [closeText] Text for the close button
     */
    var makeFeedbackPopup = function (closeText) {
      var $element = sections.feedback.$element;
      var $parent = sections.content.$element;
      var $click = (clickElement != null ? clickElement.$element : null);

      $element.appendTo($parent).addClass('h5p-question-popup');

      if (sections.scorebar) {
        sections.scorebar.$element.appendTo($element);
      }

      $parent.addClass('h5p-has-question-popup');

      // Draw the tail
      var $tail = $('<div/>', {
        'class': 'h5p-question-feedback-tail'
      }).hide()
        .appendTo($parent);

      // Draw the close button
      var $close = $('<div/>', {
        'class': 'h5p-question-feedback-close',
        'tabindex': 0,
        'title': closeText,
        on: {
          click: function (event) {
            $element.remove();
            $tail.remove();
            event.preventDefault();
          },
          keydown: function (event) {
            switch (event.which) {
              case 13: // Enter
              case 32: // Space
                $element.remove();
                $tail.remove();
                event.preventDefault();
            }
          }
        }
      }).hide().appendTo($element);

      if ($click != null) {
        if ($click.hasClass('correct')) {
          $element.addClass('h5p-question-feedback-correct');
          $close.show();
          sections.buttons.$element.hide();
        }
        else {
          sections.buttons.$element.appendTo(sections.feedback.$element);
        }
      }

      positionFeedbackPopup($element, $click);
    };

    /**
     * Position the feedback popup.
     *
     * @private
     * @param {H5P.jQuery} $element Feedback div
     * @param {H5P.jQuery} $click Visual click div
     */
    var positionFeedbackPopup = function ($element, $click) {
      var $container = $element.parent();
      var $tail = $element.siblings('.h5p-question-feedback-tail');
      var popupWidth = $element.outerWidth();
      var popupHeight = setElementHeight($element);
      var space = 15;
      var disableTail = false;
      var positionY = $container.height() / 2 - popupHeight / 2;
      var positionX = $container.width() / 2 - popupWidth / 2;
      var tailX = 0;
      var tailY = 0;
      var tailRotation = 0;

      if ($click != null) {
        // Edge detection for click, takes space into account
        var clickNearTop = ($click[0].offsetTop < space);
        var clickNearBottom = ($click[0].offsetTop + $click.height() > $container.height() - space);
        var clickNearLeft = ($click[0].offsetLeft < space);
        var clickNearRight = ($click[0].offsetLeft + $click.width() > $container.width() - space);

        // Click is not in a corner or close to edge, calculate position normally
        positionX = $click[0].offsetLeft - popupWidth / 2  + $click.width() / 2;
        positionY = $click[0].offsetTop - popupHeight - space;
        tailX = positionX + popupWidth / 2 - $tail.width() / 2;
        tailY = positionY + popupHeight - ($tail.height() / 2);
        tailRotation = 225;

        // If popup is outside top edge, position under click instead
        if (popupHeight + space > $click[0].offsetTop) {
          positionY = $click[0].offsetTop + $click.height() + space;
          tailY = positionY - $tail.height() / 2 ;
          tailRotation = 45;
        }

        // If popup is outside left edge, position left
        if (positionX < 0) {
          positionX = 0;
        }

        // If popup is outside right edge, position right
        if (positionX + popupWidth > $container.width()) {
          positionX = $container.width() - popupWidth;
        }

        // Special cases such as corner clicks, or close to an edge, they override X and Y positions if met
        if (clickNearTop && (clickNearLeft || clickNearRight)) {
          positionX = $click[0].offsetLeft + (clickNearLeft ? $click.width() : -popupWidth);
          positionY = $click[0].offsetTop + $click.height();
          disableTail = true;
        }
        else if (clickNearBottom && (clickNearLeft || clickNearRight)) {
          positionX = $click[0].offsetLeft + (clickNearLeft ? $click.width() : -popupWidth);
          positionY = $click[0].offsetTop - popupHeight;
          disableTail = true;
        }
        else if (!clickNearTop && !clickNearBottom) {
          if (clickNearLeft || clickNearRight) {
            positionY = $click[0].offsetTop - popupHeight / 2 + $click.width() / 2;
            positionX = $click[0].offsetLeft + (clickNearLeft ? $click.width() + space : -popupWidth + -space);
            // Make sure this does not position the popup off screen
            if (positionX < 0) {
              positionX = 0;
              disableTail = true;
            }
            else {
              tailX = positionX + (clickNearLeft ? - $tail.width() / 2 : popupWidth - $tail.width() / 2);
              tailY = positionY + popupHeight / 2 - $tail.height() / 2;
              tailRotation = (clickNearLeft ? 315 : 135);
            }
          }
        }

        // Contain popup from overflowing bottom edge
        if (positionY + popupHeight > $container.height()) {
          positionY = $container.height() - popupHeight;

          if (popupHeight > $container.height() - ($click[0].offsetTop + $click.height() + space)) {
            disableTail = true;
          }
        }
      }
      else {
        disableTail = true;
      }

      // Contain popup from ovreflowing top edge
      if (positionY < 0) {
        positionY = 0;
      }

      $element.css({top: positionY, left: positionX});
      $tail.css({top: tailY, left: tailX});

      if (!disableTail) {
        $tail.css({
          'left': tailX,
          'top': tailY,
          'transform': 'rotate(' + tailRotation + 'deg)'
        }).show();
      }
      else {
        $tail.hide();
      }
    };

    /**
     * Set element max height, used for animations.
     *
     * @param {H5P.jQuery} $element
     */
    var setElementHeight = function ($element) {
      if (!$element.is(':visible')) {
        // No animation
        $element.css('max-height', 'none');
        return;
      }

      // If this element is shown in the popup, we can't set width to 100%,
      // since it already has a width set in CSS
      var isFeedbackPopup = $element.hasClass('h5p-question-popup');

      // Get natural element height
      var $tmp = $element.clone()
        .css({
          'position': 'absolute',
          'max-height': 'none',
          'width': isFeedbackPopup ? '' : '100%'
        })
        .appendTo($element.parent());

      // Need to take margins into account when calculating available space
      var sideMargins = parseFloat($element.css('margin-left'))
        + parseFloat($element.css('margin-right'));
      var tmpElWidth = $tmp.css('width') ? $tmp.css('width') : '100%';
      $tmp.css('width', 'calc(' + tmpElWidth + ' - ' + sideMargins + 'px)');

      // Apply height to element
      var h = Math.round($tmp.get(0).getBoundingClientRect().height);
      var fontSize = parseFloat($element.css('fontSize'));
      var relativeH = h / fontSize;
      $element.css('max-height', relativeH + 'em');
      $tmp.remove();

      if (h > 0 && sections.buttons && sections.buttons.$element === $element) {
        // Make sure buttons section is visible
        showSection(sections.buttons);

        // Resize buttons after resizing button section
        setTimeout(resizeButtons, 150);
      }
      return h;
    };

    /**
     * Does the actual job of hiding the buttons scheduled for hiding.
     *
     * @private
     * @param {boolean} [relocateFocus] Find a new button to focus
     */
    var hideButtons = function (relocateFocus) {
      for (var i = 0; i < buttonsToHide.length; i++) {
        hideButton(buttonsToHide[i].id);
      }
      buttonsToHide = [];

      if (relocateFocus) {
        self.focusButton();
      }
    };

    /**
     * Does the actual hiding.
     * @private
     * @param {string} buttonId
     */
    var hideButton = function (buttonId) {
      // Using detach() vs hide() makes it harder to cheat.
      buttons[buttonId].$element.detach();
      buttons[buttonId].isVisible = false;
    };

    /**
     * Shows the buttons on the next tick. This is to avoid buttons flickering
     * If they're both added and removed on the same tick.
     *
     * @private
     */
    var toggleButtons = function () {
      // If no buttons section, return
      if (sections.buttons === undefined) {
        return;
      }

      // Clear transition timer, reevaluate if buttons will be detached
      clearTimeout(toggleButtonsTransitionTimer);

      // Show buttons
      for (var i = 0; i < buttonsToShow.length; i++) {
        insert(buttonOrder, buttonsToShow[i].id, buttons, sections.buttons.$element);
        buttons[buttonsToShow[i].id].isVisible = true;
      }
      buttonsToShow = [];

      // Hide buttons
      var numToHide = 0;
      var relocateFocus = false;
      for (var j = 0; j < buttonsToHide.length; j++) {
        var button = buttons[buttonsToHide[j].id];
        if (button.isVisible) {
          numToHide += 1;
        }
        if (button.$element.is(':focus')) {
          // Move focus to the first visible button.
          relocateFocus = true;
        }
      }

      var animationTimer = 150;
      if (sections.feedback && sections.feedback.$element.hasClass('h5p-question-popup')) {
        animationTimer = 0;
      }

      if (numToHide === sections.buttons.$element.children().length) {
        // All buttons are going to be hidden. Hide container using transition.
        hideSection(sections.buttons);
        // Detach buttons
        hideButtons(relocateFocus);
      }
      else {
        hideButtons(relocateFocus);

        // Show button section
        if (!sections.buttons.$element.is(':empty')) {
          showSection(sections.buttons);
          setElementHeight(sections.buttons.$element);

          // Trigger resize after animation
          toggleButtonsTransitionTimer = setTimeout(function () {
            self.trigger('resize');
          }, animationTimer);
        }

        // Resize buttons to fit container
        resizeButtons();
      }

      toggleButtonsTimer = undefined;
    };

    /**
     * Allows for scaling of the question image.
     */
    var scaleImage = function () {
      var $imgSection = sections.image.$element;
      clearTimeout(imageTransitionTimer);

      // Add this here to avoid initial transition of the image making
      // content overflow. Alternatively we need to trigger a resize.
      $imgSection.addClass('animatable');

      if (imageThumb) {

        // Expand image
        $(this).attr('aria-expanded', true);
        $imgSection.addClass('h5p-question-image-fill-width');
        imageThumb = false;

        imageTransitionTimer = setTimeout(function () {
          self.trigger('resize');
        }, 600);
      }
      else {

        // Scale down image
        $(this).attr('aria-expanded', false);
        $imgSection.removeClass('h5p-question-image-fill-width');
        imageThumb = true;

        imageTransitionTimer = setTimeout(function () {
          self.trigger('resize');
        }, 600);
      }
    };

    /**
     * Get scrollable ancestor of element
     *
     * @private
     * @param {H5P.jQuery} $element
     * @param {Number} [currDepth=0] Current recursive calls to ancestor, stop at maxDepth
     * @param {Number} [maxDepth=5] Maximum depth for finding ancestor.
     * @returns {H5P.jQuery} Parent element that is scrollable
     */
    var findScrollableAncestor = function ($element, currDepth, maxDepth) {
      if (!currDepth) {
        currDepth = 0;
      }
      if (!maxDepth) {
        maxDepth = 5;
      }
      // Check validation of element or if we have reached document root
      if (!$element || !($element instanceof $) || document === $element.get(0) || currDepth >= maxDepth) {
        return;
      }

      if ($element.css('overflow-y') === 'auto') {
        return $element;
      }
      else {
        return findScrollableAncestor($element.parent(), currDepth + 1, maxDepth);
      }
    };

    /**
     * Scroll to bottom of Question.
     *
     * @private
     */
    var scrollToBottom = function () {
      if (!$wrapper || ($wrapper.hasClass('h5p-standalone') && !H5P.isFullscreen)) {
        return; // No scroll
      }

      var scrollableAncestor = findScrollableAncestor($wrapper);

      // Scroll to bottom of scrollable ancestor
      if (scrollableAncestor) {
        scrollableAncestor.animate({
          scrollTop: $wrapper.css('height')
        }, "slow");
      }
    };

    /**
     * Resize buttons to fit container width
     *
     * @private
     */
    var resizeButtons = function () {
      if (!buttons || !sections.buttons) {
        return;
      }

      var go = function () {
        // Don't do anything if button elements are not visible yet
        if (!sections.buttons.$element.is(':visible')) {
          return;
        }

        // Width of all buttons
        var buttonsWidth = {
          max: 0,
          min: 0,
          current: 0
        };

        for (var i in buttons) {
          var button = buttons[i];
          if (button.isVisible) {
            setButtonWidth(buttons[i]);
            buttonsWidth.max += button.width.max;
            buttonsWidth.min += button.width.min;
            buttonsWidth.current += button.isTruncated ? button.width.min : button.width.max;
          }
        }

        var makeButtonsFit = function (availableWidth) {
          if (buttonsWidth.max < availableWidth) {
            // It is room for everyone on the right side of the score bar (without truncating)
            if (buttonsWidth.max !== buttonsWidth.current) {
              // Need to make everyone big
              restoreButtonLabels(buttonsWidth.current, availableWidth);
            }
            return true;
          }
          else if (buttonsWidth.min < availableWidth) {
            // Is it room for everyone on the right side of the score bar with truncating?
            if (buttonsWidth.current > availableWidth) {
              removeButtonLabels(buttonsWidth.current, availableWidth);
            }
            else {
              restoreButtonLabels(buttonsWidth.current, availableWidth);
            }
            return true;
          }
          return false;
        };

        toggleFullWidthScorebar(false);

        var buttonSectionWidth = Math.floor(sections.buttons.$element.width()) - 1;

        if (!makeButtonsFit(buttonSectionWidth)) {
          // If we get here we need to wrap:
          toggleFullWidthScorebar(true);
          buttonSectionWidth = Math.floor(sections.buttons.$element.width()) - 1;
          makeButtonsFit(buttonSectionWidth);
        }
      };

      // If visible, resize right away
      if (sections.buttons.$element.is(':visible')) {
        go();
      }
      else { // If not visible, try on the next tick
        // Clear button truncation timer if within a button truncation function
        if (buttonTruncationTimer) {
          clearTimeout(buttonTruncationTimer);
        }
        buttonTruncationTimer = setTimeout(function () {
          buttonTruncationTimer = undefined;
          go();
        }, 0);
      }
    };

    var toggleFullWidthScorebar = function (enabled) {
      if (sections.scorebar &&
          sections.scorebar.$element &&
          sections.scorebar.$element.hasClass('h5p-question-visible')) {
        sections.buttons.$element.addClass('has-scorebar');
        sections.buttons.$element.toggleClass('wrap', enabled);
        sections.scorebar.$element.toggleClass('full-width', enabled);
      }
      else {
        sections.buttons.$element.removeClass('has-scorebar');
      }
    };

    /**
     * Remove button labels until they use less than max width.
     *
     * @private
     * @param {Number} buttonsWidth Total width of all buttons
     * @param {Number} maxButtonsWidth Max width allowed for buttons
     */
    var removeButtonLabels = function (buttonsWidth, maxButtonsWidth) {
      // Reverse traversal
      for (var i = buttonOrder.length - 1; i >= 0; i--) {
        var buttonId = buttonOrder[i];
        var button = buttons[buttonId];
        if (!button.isTruncated && button.isVisible) {
          var $button = button.$element;
          buttonsWidth -= button.width.max - button.width.min;

          // Remove label
          button.$element.attr('aria-label', $button.text()).html('').addClass('truncated');
          button.isTruncated = true;
          if (buttonsWidth <= maxButtonsWidth) {
            // Buttons are small enough.
            return;
          }
        }
      }
    };

    /**
     * Restore button labels until it fills maximum possible width without exceeding the max width.
     *
     * @private
     * @param {Number} buttonsWidth Total width of all buttons
     * @param {Number} maxButtonsWidth Max width allowed for buttons
     */
    var restoreButtonLabels = function (buttonsWidth, maxButtonsWidth) {
      for (var i = 0; i < buttonOrder.length; i++) {
        var buttonId = buttonOrder[i];
        var button = buttons[buttonId];
        if (button.isTruncated && button.isVisible) {
          // Calculate new total width of buttons with a static pixel for consistency cross-browser
          buttonsWidth += button.width.max - button.width.min + 1;

          if (buttonsWidth > maxButtonsWidth) {
            return;
          }
          // Restore label
          button.$element.html(button.text);
          button.$element.removeClass('truncated');
          button.isTruncated = false;
        }
      }
    };

    /**
     * Helper function for finding index of keyValue in array
     *
     * @param {String} keyValue Value to be found
     * @param {String} key In key
     * @param {Array} array In array
     * @returns {number}
     */
    var existsInArray = function (keyValue, key, array) {
      var i;
      for (i = 0; i < array.length; i++) {
        if (array[i][key] === keyValue) {
          return i;
        }
      }
      return -1;
    };

    /**
     * Show a section
     * @param {Object} section
     */
    var showSection = function (section) {
      section.$element.addClass('h5p-question-visible');
      section.isVisible = true;
    };

    /**
     * Hide a section
     * @param {Object} section
     */
    var hideSection = function (section) {
      section.$element.css('max-height', '');
      section.isVisible = false;

      setTimeout(function () {
        // Only hide if section hasn't been set to visible in the meantime
        if (!section.isVisible) {
          section.$element.removeClass('h5p-question-visible');
        }
      }, 150);
    };

    /**
     * Set behaviour for question.
     *
     * @param {Object} options An object containing behaviour that will be extended by Question
     */
    self.setBehaviour = function (options) {
      $.extend(behaviour, options);
    };

    /**
     * A video to display above the task.
     *
     * @param {object} params
     */
    self.setVideo = function (params) {
      sections.video = {
        $element: $('<div/>', {
          'class': 'h5p-question-video'
        })
      };

      if (disableAutoPlay && params.params.playback) {
        params.params.playback.autoplay = false;
      }

      // Never fit to wrapper
      if (!params.params.visuals) {
        params.params.visuals = {};
      }
      params.params.visuals.fit = false;
      sections.video.instance = H5P.newRunnable(params, self.contentId, sections.video.$element, true);
      var fromVideo = false; // Hack to avoid never ending loop
      sections.video.instance.on('resize', function () {
        fromVideo = true;
        self.trigger('resize');
        fromVideo = false;
      });
      self.on('resize', function () {
        if (!fromVideo) {
          sections.video.instance.trigger('resize');
        }
      });

      return self;
    };

    /**
     * Will stop any playback going on in the task.
     */
    self.pause = function () {
      if (sections.video && sections.video.isVisible) {
        sections.video.instance.pause();
      }
    };

    /**
     * Start playback of video
     */
    self.play = function () {
      if (sections.video && sections.video.isVisible) {
        sections.video.instance.play();
      }
    };

    /**
     * Disable auto play, useful in editors.
     */
    self.disableAutoPlay = function () {
      disableAutoPlay = true;
    };

    /**
     * Add task image.
     *
     * @param {string} path Relative
     * @param {Object} [options] Options object
     * @param {string} [options.alt] Text representation
     * @param {string} [options.title] Hover text
     * @param {Boolean} [options.disableImageZooming] Set as true to disable image zooming
     */
    self.setImage = function (path, options) {
      options = options ? options : {};
      sections.image = {};
      // Image container
      sections.image.$element = $('<div/>', {
        'class': 'h5p-question-image h5p-question-image-fill-width'
      });

      // Inner wrap
      var $imgWrap = $('<div/>', {
        'class': 'h5p-question-image-wrap',
        appendTo: sections.image.$element
      });

      // Image element
      var $img = $('<img/>', {
        src: H5P.getPath(path, self.contentId),
        alt: (options.alt === undefined ? '' : options.alt),
        title: (options.title === undefined ? '' : options.title),
        on: {
          load: function () {
            self.trigger('imageLoaded', this);
            self.trigger('resize');
          }
        },
        appendTo: $imgWrap
      });

      // Disable image zooming
      if (options.disableImageZooming) {
        $img.css('maxHeight', 'none');

        // Make sure we are using the correct amount of width at all times
        var determineImgWidth = function () {

          // Remove margins if natural image width is bigger than section width
          var imageSectionWidth = sections.image.$element.get(0).getBoundingClientRect().width;

          // Do not transition, for instant measurements
          $imgWrap.css({
            '-webkit-transition': 'none',
            'transition': 'none'
          });

          // Margin as translateX on both sides of image.
          var diffX = 2 * ($imgWrap.get(0).getBoundingClientRect().left -
            sections.image.$element.get(0).getBoundingClientRect().left);

          if ($img.get(0).naturalWidth >= imageSectionWidth - diffX) {
            sections.image.$element.addClass('h5p-question-image-fill-width');
          }
          else { // Use margin for small res images
            sections.image.$element.removeClass('h5p-question-image-fill-width');
          }

          // Reset transition rules
          $imgWrap.css({
            '-webkit-transition': '',
            'transition': ''
          });
        };

        // Determine image width
        if ($img.is(':visible')) {
          determineImgWidth();
        }
        else {
          $img.on('load', determineImgWidth);
        }

        // Skip adding zoom functionality
        return;
      }

      var sizeDetermined = false;
      var determineSize = function () {
        if (sizeDetermined || !$img.is(':visible')) {
          return; // Try again next time.
        }

        $imgWrap.addClass('h5p-question-image-scalable')
          .attr('aria-expanded', false)
          .attr('role', 'button')
          .attr('tabIndex', '0')
          .on('click', function (event) {
            if (event.which === 1) {
              scaleImage.apply(this); // Left mouse button click
            }
          }).on('keypress', function (event) {
            if (event.which === 32) {
              event.preventDefault(); // Prevent default behaviour; page scroll down
              scaleImage.apply(this); // Space bar pressed
            }
          });
        sections.image.$element.removeClass('h5p-question-image-fill-width');

        sizeDetermined  = true; // Prevent any futher events
      };

      self.on('resize', determineSize);

      return self;
    };

    /**
     * Add the introduction section.
     *
     * @param {(string|H5P.jQuery)} content
     */
    self.setIntroduction = function (content) {
      register('introduction', content);

      return self;
    };

    /**
     * Add the content section.
     *
     * @param {(string|H5P.jQuery)} content
     * @param {Object} [options]
     * @param {string} [options.class]
     */
    self.setContent = function (content, options) {
      register('content', content);

      if (options && options.class) {
        sections.content.$element.addClass(options.class);
      }

      return self;
    };

    /**
     * Force readspeaker to read text. Useful when you have to use
     * setTimeout for animations.
     */
    self.read = function (content) {
      if (!$read) {
        return; // Not ready yet
      }

      if (readText) {
        // Combine texts if called multiple times
        readText += (readText.substr(-1, 1) === '.' ? ' ' : '. ') + content;
      }
      else {
        readText = content;
      }

      // Set text
      $read.html(readText);

      setTimeout(function () {
        // Stop combining when done reading
        readText = null;
        $read.html('');
      }, 100);
    };

    /**
     * Read feedback
     */
    self.readFeedback = function () {
      var invalidFeedback =
        behaviour.disableReadSpeaker ||
        !showFeedback ||
        !sections.feedback ||
        !sections.feedback.$element;

      if (invalidFeedback) {
        return;
      }

      var $feedbackText = $('.h5p-question-feedback-content-text', sections.feedback.$element);
      if ($feedbackText && $feedbackText.html() && $feedbackText.html().length) {
        self.read($feedbackText.html());
      }
    };

    /**
     * Remove feedback
     *
     * @return {H5P.Question}
     */
    self.removeFeedback = function () {

      clearTimeout(feedbackTransitionTimer);

      if (sections.feedback && showFeedback) {

        showFeedback = false;

        // Hide feedback & scorebar
        hideSection(sections.scorebar);
        hideSection(sections.feedback);

        sectionsIsTransitioning = true;

        // Detach after transition
        feedbackTransitionTimer = setTimeout(function () {
          // Avoiding Transition.onTransitionEnd since it will register multiple events, and there's no way to cancel it if the transition changes back to "show" while the animation is happening.
          if (!showFeedback) {
            sections.feedback.$element.children().detach();
            sections.scorebar.$element.children().detach();

            // Trigger resize after animation
            self.trigger('resize');
          }
          sectionsIsTransitioning = false;
          scoreBar.setScore(0);
        }, 150);

        if ($wrapper) {
          $wrapper.find('.h5p-question-feedback-tail').remove();
        }
      }

      return self;
    };

    /**
     * Set feedback message.
     *
     * @param {string} [content]
     * @param {number} score The score
     * @param {number} maxScore The maximum score for this question
     * @param {string} [scoreBarLabel] Makes it easier for readspeakers to identify the scorebar
     * @param {string} [helpText] Help text that describes the score inside a tip icon
     * @param {object} [popupSettings] Extra settings for popup feedback
     * @param {boolean} [popupSettings.showAsPopup] Should the feedback display as popup?
     * @param {string} [popupSettings.closeText] Translation for close button text
     * @param {object} [popupSettings.click] Element representing where user clicked on screen
     */
    self.setFeedback = function (content, score, maxScore, scoreBarLabel, helpText, popupSettings, scoreExplanationButtonLabel) {
      // Feedback is disabled
      if (behaviour.disableFeedback) {
        return self;
      }

      // Need to toggle buttons right away to avoid flickering/blinking
      // Note: This means content types should invoke hide/showButton before setFeedback
      toggleButtons();

      clickElement = (popupSettings != null && popupSettings.click != null ? popupSettings.click : null);
      clearTimeout(feedbackTransitionTimer);

      var $feedback = $('<div>', {
        'class': 'h5p-question-feedback-container'
      });

      var $feedbackContent = $('<div>', {
        'class': 'h5p-question-feedback-content'
      }).appendTo($feedback);

      // Feedback text
      $('<div>', {
        'class': 'h5p-question-feedback-content-text',
        'html': content
      }).appendTo($feedbackContent);

      var $scorebar = $('<div>', {
        'class': 'h5p-question-scorebar-container'
      });
      if (scoreBar === undefined) {
        scoreBar = JoubelUI.createScoreBar(maxScore, scoreBarLabel, helpText, scoreExplanationButtonLabel);
      }
      scoreBar.appendTo($scorebar);

      $feedbackContent.toggleClass('has-content', content !== undefined && content.length > 0);

      // Feedback for readspeakers
      if (!behaviour.disableReadSpeaker && scoreBarLabel) {
        self.read(scoreBarLabel.replace(':num', score).replace(':total', maxScore) + '. ' + (content ? content : ''));
      }

      showFeedback = true;
      if (sections.feedback) {
        // Update section
        update('feedback', $feedback);
        update('scorebar', $scorebar);
      }
      else {
        // Create section
        register('feedback', $feedback);
        register('scorebar', $scorebar);
        if (initialized && $wrapper) {
          insert(self.order, 'feedback', sections, $wrapper);
          insert(self.order, 'scorebar', sections, $wrapper);
        }
      }

      showSection(sections.feedback);
      showSection(sections.scorebar);

      resizeButtons();

      if (popupSettings != null && popupSettings.showAsPopup == true) {
        makeFeedbackPopup(popupSettings.closeText);
        scoreBar.setScore(score);
      }
      else {
        // Show feedback section
        feedbackTransitionTimer = setTimeout(function () {
          setElementHeight(sections.feedback.$element);
          setElementHeight(sections.scorebar.$element);
          sectionsIsTransitioning = true;

          // Scroll to bottom after showing feedback
          scrollToBottom();

          // Trigger resize after animation
          feedbackTransitionTimer = setTimeout(function () {
            sectionsIsTransitioning = false;
            self.trigger('resize');
            scoreBar.setScore(score);
          }, 150);
        }, 0);
      }

      return self;
    };

    /**
     * Set feedback content (no animation).
     *
     * @param {string} content
     * @param {boolean} [extendContent] True will extend content, instead of replacing it
     */
    self.updateFeedbackContent = function (content, extendContent) {
      if (sections.feedback && sections.feedback.$element) {

        if (extendContent) {
          content = $('.h5p-question-feedback-content', sections.feedback.$element).html() + ' ' + content;
        }

        // Update feedback content html
        $('.h5p-question-feedback-content', sections.feedback.$element).html(content).addClass('has-content');

        // Make sure the height is correct
        setElementHeight(sections.feedback.$element);

        // Need to trigger resize when feedback has finished transitioning
        setTimeout(self.trigger.bind(self, 'resize'), 150);
      }

      return self;
    };

    /**
     * Set the content of the explanation / feedback panel
     *
     * @param {Object} data
     * @param {string} data.correct
     * @param {string} data.wrong
     * @param {string} data.text
     * @param {string} title Title for explanation panel
     *
     * @return {H5P.Question}
     */
    self.setExplanation = function (data, title) {
      if (data) {
        var explainer = new H5P.Question.Explainer(title, data);

        if (sections.explanation) {
          // Update section
          update('explanation', explainer.getElement());
        }
        else {
          register('explanation', explainer.getElement());

          if (initialized && $wrapper) {
            insert(self.order, 'explanation', sections, $wrapper);
          }
        }
      }
      else if (sections.explanation) {
        // Hide explanation section
        sections.explanation.$element.children().detach();
      }

      return self;
    };

    /**
     * Checks to see if button is registered.
     *
     * @param {string} id
     * @returns {boolean}
     */
    self.hasButton = function (id) {
      return (buttons[id] !== undefined);
    };

    /**
     * @typedef {Object} ConfirmationDialog
     * @property {boolean} [enable] Must be true to show confirmation dialog
     * @property {Object} [instance] Instance that uses confirmation dialog
     * @property {jQuery} [$parentElement] Append to this element.
     * @property {Object} [l10n] Translatable fields
     * @property {string} [l10n.header] Header text
     * @property {string} [l10n.body] Body text
     * @property {string} [l10n.cancelLabel]
     * @property {string} [l10n.confirmLabel]
     */

    /**
     * Register buttons for the task.
     *
     * @param {string} id
     * @param {string} text label
     * @param {function} clicked
     * @param {boolean} [visible=true]
     * @param {Object} [options] Options for button
     * @param {Object} [extras] Extra options
     * @param {ConfirmationDialog} [extras.confirmationDialog] Confirmation dialog
     * @param {Object} [extras.contentData] Content data
     * @params {string} [extras.textIfSubmitting] Text to display if submitting
     */
    self.addButton = function (id, text, clicked, visible, options, extras) {
      if (buttons[id]) {
        return self; // Already registered
      }

      if (sections.buttons === undefined)  {
        // We have buttons, register wrapper
        register('buttons');
        if (initialized) {
          insert(self.order, 'buttons', sections, $wrapper);
        }
      }

      extras = extras || {};
      extras.confirmationDialog = extras.confirmationDialog || {};
      options = options || {};

      var confirmationDialog =
        self.addConfirmationDialogToButton(extras.confirmationDialog, clicked);

      /**
       * Handle button clicks through both mouse and keyboard
       * @private
       */
      var handleButtonClick = function () {
        if (extras.confirmationDialog.enable && confirmationDialog) {
          // Show popups section if used
          if (!extras.confirmationDialog.$parentElement) {
            sections.popups.$element.removeClass('hidden');
          }
          confirmationDialog.show($e.position().top);
        }
        else {
          clicked();
        }
      };

      const isSubmitting = extras.contentData && extras.contentData.standalone
        && (extras.contentData.isScoringEnabled || extras.contentData.isReportingEnabled);

      if (isSubmitting && extras.textIfSubmitting) {
        text = extras.textIfSubmitting;
      }

      buttons[id] = {
        isTruncated: false,
        text: text,
        isVisible: false
      };
      // The button might be <button> or <a>
      // (dependent on options.href set or not)
      var isAnchorTag = (options.href !== undefined);
      var $e = buttons[id].$element = JoubelUI.createButton($.extend({
        'class': 'h5p-question-' + id,
        html: text,
        title: text,
        on: {
          click: function (event) {
            handleButtonClick();
            if (isAnchorTag) {
              event.preventDefault();
            }
          }
        }
      }, options));
      buttonOrder.push(id);

      // The button might be <button> or <a>. If <a>, the space key is not
      // triggering the click event, must therefore handle this here:
      if (isAnchorTag) {
        $e.on('keypress', function (event) {
          if (event.which === 32) { // Space
            handleButtonClick();
            event.preventDefault();
          }
        });
      }

      if (visible === undefined || visible) {
        // Button should be visible
        $e.appendTo(sections.buttons.$element);
        buttons[id].isVisible = true;
        showSection(sections.buttons);
      }

      return self;
    };

    var setButtonWidth = function (button) {
      var $button = button.$element;
      var $tmp = $button.clone()
        .css({
          'position': 'absolute',
          'white-space': 'nowrap',
          'max-width': 'none'
        }).removeClass('truncated')
        .html(button.text)
        .appendTo($button.parent());

      // Calculate max width (button including text)
      button.width = {
        max: Math.ceil($tmp.outerWidth() + parseFloat($tmp.css('margin-left')) + parseFloat($tmp.css('margin-right')))
      };

      // Calculate min width (truncated, icon only)
      $tmp.html('').addClass('truncated');
      button.width.min = Math.ceil($tmp.outerWidth() + parseFloat($tmp.css('margin-left')) + parseFloat($tmp.css('margin-right')));
      $tmp.remove();
    };

    /**
     * Add confirmation dialog to button
     * @param {ConfirmationDialog} options
     *  A confirmation dialog that will be shown before click handler of button
     *  is triggered
     * @param {function} clicked
     *  Click handler of button
     * @return {H5P.ConfirmationDialog|undefined}
     *  Confirmation dialog if enabled
     */
    self.addConfirmationDialogToButton = function (options, clicked) {
      options = options || {};

      if (!options.enable) {
        return;
      }

      // Confirmation dialog
      var confirmationDialog = new H5P.ConfirmationDialog({
        instance: options.instance,
        headerText: options.l10n.header,
        dialogText: options.l10n.body,
        cancelText: options.l10n.cancelLabel,
        confirmText: options.l10n.confirmLabel
      });

      // Determine parent element
      if (options.$parentElement) {
        confirmationDialog.appendTo(options.$parentElement.get(0));
      }
      else {

        // Create popup section and append to that
        if (sections.popups === undefined) {
          register('popups');
          if (initialized) {
            insert(self.order, 'popups', sections, $wrapper);
          }
          sections.popups.$element.addClass('hidden');
          self.order.push('popups');
        }
        confirmationDialog.appendTo(sections.popups.$element.get(0));
      }

      // Add event listeners
      confirmationDialog.on('confirmed', function () {
        if (!options.$parentElement) {
          sections.popups.$element.addClass('hidden');
        }
        clicked();

        // Trigger to content type
        self.trigger('confirmed');
      });

      confirmationDialog.on('canceled', function () {
        if (!options.$parentElement) {
          sections.popups.$element.addClass('hidden');
        }
        // Trigger to content type
        self.trigger('canceled');
      });

      return confirmationDialog;
    };

    /**
     * Show registered button with given identifier.
     *
     * @param {string} id
     * @param {Number} [priority]
     */
    self.showButton = function (id, priority) {
      var aboutToBeHidden = existsInArray(id, 'id', buttonsToHide) !== -1;
      if (buttons[id] === undefined || (buttons[id].isVisible === true && !aboutToBeHidden)) {
        return self;
      }

      priority = priority || 0;

      // Skip if already being shown
      var indexToShow = existsInArray(id, 'id', buttonsToShow);
      if (indexToShow !== -1) {

        // Update priority
        if (buttonsToShow[indexToShow].priority < priority) {
          buttonsToShow[indexToShow].priority = priority;
        }

        return self;
      }

      // Check if button is going to be hidden on next tick
      var exists = existsInArray(id, 'id', buttonsToHide);
      if (exists !== -1) {

        // Skip hiding if higher priority
        if (buttonsToHide[exists].priority <= priority) {
          buttonsToHide.splice(exists, 1);
          buttonsToShow.push({id: id, priority: priority});
        }

      } // If button is not shown
      else if (!buttons[id].$element.is(':visible')) {

        // Show button on next tick
        buttonsToShow.push({id: id, priority: priority});
      }

      if (!toggleButtonsTimer) {
        toggleButtonsTimer = setTimeout(toggleButtons, 0);
      }

      return self;
    };

    /**
     * Hide registered button with given identifier.
     *
     * @param {string} id
     * @param {number} [priority]
     */
    self.hideButton = function (id, priority) {
      var aboutToBeShown = existsInArray(id, 'id', buttonsToShow) !== -1;
      if (buttons[id] === undefined || (buttons[id].isVisible === false && !aboutToBeShown)) {
        return self;
      }

      priority = priority || 0;

      // Skip if already being hidden
      var indexToHide = existsInArray(id, 'id', buttonsToHide);
      if (indexToHide !== -1) {

        // Update priority
        if (buttonsToHide[indexToHide].priority < priority) {
          buttonsToHide[indexToHide].priority = priority;
        }

        return self;
      }

      // Check if buttons is going to be shown on next tick
      var exists = existsInArray(id, 'id', buttonsToShow);
      if (exists !== -1) {

        // Skip showing if higher priority
        if (buttonsToShow[exists].priority <= priority) {
          buttonsToShow.splice(exists, 1);
          buttonsToHide.push({id: id, priority: priority});
        }
      }
      else if (!buttons[id].$element.is(':visible')) {

        // Make sure it is detached in case the container is hidden.
        hideButton(id);
      }
      else {

        // Hide button on next tick.
        buttonsToHide.push({id: id, priority: priority});
      }

      if (!toggleButtonsTimer) {
        toggleButtonsTimer = setTimeout(toggleButtons, 0);
      }

      return self;
    };

    /**
     * Set focus to the given button. If no button is given the first visible
     * button gets focused. This is useful if you lose focus.
     *
     * @param {string} [id]
     */
    self.focusButton = function (id) {
      if (id === undefined) {
        // Find first button that is visible.
        for (var i = 0; i < buttonOrder.length; i++) {
          var button = buttons[buttonOrder[i]];
          if (button && button.isVisible) {
            // Give that button focus
            button.$element.focus();
            break;
          }
        }
      }
      else if (buttons[id] && buttons[id].$element.is(':visible')) {
        // Set focus to requested button
        buttons[id].$element.focus();
      }

      return self;
    };

    /**
     * Toggle readspeaker functionality
     * @param {boolean} [disable] True to disable, false to enable.
     */
    self.toggleReadSpeaker = function (disable) {
      behaviour.disableReadSpeaker = disable || !behaviour.disableReadSpeaker;
    };

    /**
     * Set new element for section.
     *
     * @param {String} id
     * @param {H5P.jQuery} $element
     */
    self.insertSectionAtElement = function (id, $element) {
      if (sections[id] === undefined) {
        register(id);
      }
      sections[id].parent = $element;

      // Insert section if question is not initialized
      if (!initialized) {
        insert([id], id, sections, $element);
      }

      return self;
    };

    /**
     * Attach content to given container.
     *
     * @param {H5P.jQuery} $container
     */
    self.attach = function ($container) {
      if (self.isRoot()) {
        self.setActivityStarted();
      }

      // The first time we attach we also create our DOM elements.
      if ($wrapper === undefined) {
        if (self.registerDomElements !== undefined &&
           (self.registerDomElements instanceof Function ||
           typeof self.registerDomElements === 'function')) {

          // Give the question type a chance to register before attaching
          self.registerDomElements();
        }

        // Create section for reading messages
        $read = $('<div/>', {
          'aria-live': 'polite',
          'class': 'h5p-hidden-read'
        });
        register('read', $read);
        self.trigger('registerDomElements');
      }

      // Prepare container
      $wrapper = $container;
      $container.html('')
        .addClass('h5p-question h5p-' + type);

      // Add sections in given order
      var $sections = [];
      for (var i = 0; i < self.order.length; i++) {
        var section = self.order[i];
        if (sections[section]) {
          if (sections[section].parent) {
            // Section has a different parent
            sections[section].$element.appendTo(sections[section].parent);
          }
          else {
            $sections.push(sections[section].$element);
          }
          sections[section].isVisible = true;
        }
      }

      // Only append once to DOM for optimal performance
      $container.append($sections);

      // Let others react to dom changes
      self.trigger('domChanged', {
        '$target': $container,
        'library': self.libraryInfo.machineName,
        'contentId': self.contentId,
        'key': 'newLibrary'
      }, {'bubbles': true, 'external': true});

      // ??
      initialized = true;

      return self;
    };

    /**
     * Detach all sections from their parents
     */
    self.detachSections = function () {
      // Deinit Question
      initialized = false;

      // Detach sections
      for (var section in sections) {
        sections[section].$element.detach();
      }

      return self;
    };

    // Listen for resize
    self.on('resize', function () {
      // Allow elements to attach and set their height before resizing
      if (!sectionsIsTransitioning && sections.feedback && showFeedback) {
        // Resize feedback to fit
        setElementHeight(sections.feedback.$element);
      }

      // Re-position feedback popup if in use
      var $element = sections.feedback;
      var $click = clickElement;

      if ($element != null && $element.$element != null && $click != null && $click.$element != null) {
        setTimeout(function () {
          positionFeedbackPopup($element.$element, $click.$element);
        }, 10);
      }

      resizeButtons();
    });
  }

  // Inheritance
  Question.prototype = Object.create(EventDispatcher.prototype);
  Question.prototype.constructor = Question;

  /**
   * Determine the overall feedback to display for the question.
   * Returns empty string if no matching range is found.
   *
   * @param {Object[]} feedbacks
   * @param {number} scoreRatio
   * @return {string}
   */
  Question.determineOverallFeedback = function (feedbacks, scoreRatio) {
    scoreRatio = Math.floor(scoreRatio * 100);

    for (var i = 0; i < feedbacks.length; i++) {
      var feedback = feedbacks[i];
      var hasFeedback = (feedback.feedback !== undefined && feedback.feedback.trim().length !== 0);

      if (feedback.from <= scoreRatio && feedback.to >= scoreRatio && hasFeedback) {
        return feedback.feedback;
      }
    }

    return '';
  };

  return Question;
})(H5P.jQuery, H5P.EventDispatcher, H5P.JoubelUI);
;
H5P.Question.Explainer = (function ($) {
  /**
   * Constructor
   *
   * @class
   * @param {string} title
   * @param {array} explanations
   */
  function Explainer(title, explanations) {
    var self = this;

    /**
     * Create the DOM structure
     */
    var createHTML = function () {
      self.$explanation = $('<div>', {
        'class': 'h5p-question-explanation-container'
      });

      // Add title:
      $('<div>', {
        'class': 'h5p-question-explanation-title',
        role: 'heading',
        html: title,
        appendTo: self.$explanation
      });

      var $explanationList = $('<ul>', {
        'class': 'h5p-question-explanation-list',
        appendTo: self.$explanation
      });

      for (var i = 0; i < explanations.length; i++) {
        var feedback = explanations[i];
        var $explanationItem = $('<li>', {
          'class': 'h5p-question-explanation-item',
          appendTo: $explanationList
        });

        var $content = $('<div>', {
          'class': 'h5p-question-explanation-status'
        });

        if (feedback.correct) {
          $('<span>', {
            'class': 'h5p-question-explanation-correct',
            html: feedback.correct,
            appendTo: $content
          });
        }
        if (feedback.wrong) {
          $('<span>', {
            'class': 'h5p-question-explanation-wrong',
            html: feedback.wrong,
            appendTo: $content
          });
        }
        $content.appendTo($explanationItem);

        if (feedback.text) {
          $('<div>', {
            'class': 'h5p-question-explanation-text',
            html: feedback.text,
            appendTo: $explanationItem
          });
        }
      }
    };

    createHTML();

    /**
     * Return the container HTMLElement
     *
     * @return {HTMLElement}
     */
    self.getElement = function () {
      return self.$explanation;
    };
  }

  return Explainer;

})(H5P.jQuery);
;
(function (Question) {

  /**
   * Makes it easy to add animated score points for your question type.
   *
   * @class H5P.Question.ScorePoints
   */
  Question.ScorePoints = function () {
    var self = this;

    var elements = [];
    var showElementsTimer;

    /**
     * Create the element that displays the score point element for questions.
     *
     * @param {boolean} isCorrect
     * @return {HTMLElement}
     */
    self.getElement = function (isCorrect) {
      var element = document.createElement('div');
      element.classList.add(isCorrect ? 'h5p-question-plus-one' : 'h5p-question-minus-one');
      element.classList.add('h5p-question-hidden-one');
      elements.push(element);

      // Schedule display animation of all added elements
      if (showElementsTimer) {
        clearTimeout(showElementsTimer);
      }
      showElementsTimer = setTimeout(showElements, 0);

      return element;
    };

    /**
     * @private
     */
    var showElements = function () {
      // Determine delay between triggering animations
      var delay = 0;
      var increment = 150;
      var maxTime = 1000;

      if (elements.length && elements.length > Math.ceil(maxTime / increment)) {
        // Animations will run for more than ~1 second, reduce it.
        increment = maxTime / elements.length;
      }

      for (var i = 0; i < elements.length; i++) {
        // Use timer to trigger show
        setTimeout(showElement(elements[i]), delay);

        // Increse delay for next element
        delay += increment;
      }
    };

    /**
     * Trigger transition animation for the given element
     *
     * @private
     * @param {HTMLElement} element
     * @return {function}
     */
    var showElement = function (element) {
      return function () {
        element.classList.remove('h5p-question-hidden-one');
      };
    };
  };

})(H5P.Question);
;
/*!
* @license SoundJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011-2015 gskinner.com, inc.
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/

/**!
 * SoundJS FlashAudioPlugin also includes swfobject (http://code.google.com/p/swfobject/)
 */

var old = this.createjs;

this.createjs=this.createjs||{},function(){var a=createjs.SoundJS=createjs.SoundJS||{};a.version="0.6.2",a.buildDate="Thu, 26 Nov 2015 20:44:31 GMT"}(),this.createjs=this.createjs||{},createjs.extend=function(a,b){"use strict";function c(){this.constructor=a}return c.prototype=b.prototype,a.prototype=new c},this.createjs=this.createjs||{},createjs.promote=function(a,b){"use strict";var c=a.prototype,d=Object.getPrototypeOf&&Object.getPrototypeOf(c)||c.__proto__;if(d){c[(b+="_")+"constructor"]=d.constructor;for(var e in d)c.hasOwnProperty(e)&&"function"==typeof d[e]&&(c[b+e]=d[e])}return a},this.createjs=this.createjs||{},createjs.indexOf=function(a,b){"use strict";for(var c=0,d=a.length;d>c;c++)if(b===a[c])return c;return-1},this.createjs=this.createjs||{},function(){"use strict";createjs.proxy=function(a,b){var c=Array.prototype.slice.call(arguments,2);return function(){return a.apply(b,Array.prototype.slice.call(arguments,0).concat(c))}}}(),this.createjs=this.createjs||{},function(){"use strict";function BrowserDetect(){throw"BrowserDetect cannot be instantiated"}var a=BrowserDetect.agent=window.navigator.userAgent;BrowserDetect.isWindowPhone=a.indexOf("IEMobile")>-1||a.indexOf("Windows Phone")>-1,BrowserDetect.isFirefox=a.indexOf("Firefox")>-1,BrowserDetect.isOpera=null!=window.opera,BrowserDetect.isChrome=a.indexOf("Chrome")>-1,BrowserDetect.isIOS=(a.indexOf("iPod")>-1||a.indexOf("iPhone")>-1||a.indexOf("iPad")>-1)&&!BrowserDetect.isWindowPhone,BrowserDetect.isAndroid=a.indexOf("Android")>-1&&!BrowserDetect.isWindowPhone,BrowserDetect.isBlackberry=a.indexOf("Blackberry")>-1,createjs.BrowserDetect=BrowserDetect}(),this.createjs=this.createjs||{},function(){"use strict";function EventDispatcher(){this._listeners=null,this._captureListeners=null}var a=EventDispatcher.prototype;EventDispatcher.initialize=function(b){b.addEventListener=a.addEventListener,b.on=a.on,b.removeEventListener=b.off=a.removeEventListener,b.removeAllEventListeners=a.removeAllEventListeners,b.hasEventListener=a.hasEventListener,b.dispatchEvent=a.dispatchEvent,b._dispatchEvent=a._dispatchEvent,b.willTrigger=a.willTrigger},a.addEventListener=function(a,b,c){var d;d=c?this._captureListeners=this._captureListeners||{}:this._listeners=this._listeners||{};var e=d[a];return e&&this.removeEventListener(a,b,c),e=d[a],e?e.push(b):d[a]=[b],b},a.on=function(a,b,c,d,e,f){return b.handleEvent&&(c=c||b,b=b.handleEvent),c=c||this,this.addEventListener(a,function(a){b.call(c,a,e),d&&a.remove()},f)},a.removeEventListener=function(a,b,c){var d=c?this._captureListeners:this._listeners;if(d){var e=d[a];if(e)for(var f=0,g=e.length;g>f;f++)if(e[f]==b){1==g?delete d[a]:e.splice(f,1);break}}},a.off=a.removeEventListener,a.removeAllEventListeners=function(a){a?(this._listeners&&delete this._listeners[a],this._captureListeners&&delete this._captureListeners[a]):this._listeners=this._captureListeners=null},a.dispatchEvent=function(a,b,c){if("string"==typeof a){var d=this._listeners;if(!(b||d&&d[a]))return!0;a=new createjs.Event(a,b,c)}else a.target&&a.clone&&(a=a.clone());try{a.target=this}catch(e){}if(a.bubbles&&this.parent){for(var f=this,g=[f];f.parent;)g.push(f=f.parent);var h,i=g.length;for(h=i-1;h>=0&&!a.propagationStopped;h--)g[h]._dispatchEvent(a,1+(0==h));for(h=1;i>h&&!a.propagationStopped;h++)g[h]._dispatchEvent(a,3)}else this._dispatchEvent(a,2);return!a.defaultPrevented},a.hasEventListener=function(a){var b=this._listeners,c=this._captureListeners;return!!(b&&b[a]||c&&c[a])},a.willTrigger=function(a){for(var b=this;b;){if(b.hasEventListener(a))return!0;b=b.parent}return!1},a.toString=function(){return"[EventDispatcher]"},a._dispatchEvent=function(a,b){var c,d=1==b?this._captureListeners:this._listeners;if(a&&d){var e=d[a.type];if(!e||!(c=e.length))return;try{a.currentTarget=this}catch(f){}try{a.eventPhase=b}catch(f){}a.removed=!1,e=e.slice();for(var g=0;c>g&&!a.immediatePropagationStopped;g++){var h=e[g];h.handleEvent?h.handleEvent(a):h(a),a.removed&&(this.off(a.type,h,1==b),a.removed=!1)}}},createjs.EventDispatcher=EventDispatcher}(),this.createjs=this.createjs||{},function(){"use strict";function Event(a,b,c){this.type=a,this.target=null,this.currentTarget=null,this.eventPhase=0,this.bubbles=!!b,this.cancelable=!!c,this.timeStamp=(new Date).getTime(),this.defaultPrevented=!1,this.propagationStopped=!1,this.immediatePropagationStopped=!1,this.removed=!1}var a=Event.prototype;a.preventDefault=function(){this.defaultPrevented=this.cancelable&&!0},a.stopPropagation=function(){this.propagationStopped=!0},a.stopImmediatePropagation=function(){this.immediatePropagationStopped=this.propagationStopped=!0},a.remove=function(){this.removed=!0},a.clone=function(){return new Event(this.type,this.bubbles,this.cancelable)},a.set=function(a){for(var b in a)this[b]=a[b];return this},a.toString=function(){return"[Event (type="+this.type+")]"},createjs.Event=Event}(),this.createjs=this.createjs||{},function(){"use strict";function ErrorEvent(a,b,c){this.Event_constructor("error"),this.title=a,this.message=b,this.data=c}var a=createjs.extend(ErrorEvent,createjs.Event);a.clone=function(){return new createjs.ErrorEvent(this.title,this.message,this.data)},createjs.ErrorEvent=createjs.promote(ErrorEvent,"Event")}(),this.createjs=this.createjs||{},function(){"use strict";function ProgressEvent(a,b){this.Event_constructor("progress"),this.loaded=a,this.total=null==b?1:b,this.progress=0==b?0:this.loaded/this.total}var a=createjs.extend(ProgressEvent,createjs.Event);a.clone=function(){return new createjs.ProgressEvent(this.loaded,this.total)},createjs.ProgressEvent=createjs.promote(ProgressEvent,"Event")}(window),this.createjs=this.createjs||{},function(){"use strict";function LoadItem(){this.src=null,this.type=null,this.id=null,this.maintainOrder=!1,this.callback=null,this.data=null,this.method=createjs.LoadItem.GET,this.values=null,this.headers=null,this.withCredentials=!1,this.mimeType=null,this.crossOrigin=null,this.loadTimeout=b.LOAD_TIMEOUT_DEFAULT}var a=LoadItem.prototype={},b=LoadItem;b.LOAD_TIMEOUT_DEFAULT=8e3,b.create=function(a){if("string"==typeof a){var c=new LoadItem;return c.src=a,c}if(a instanceof b)return a;if(a instanceof Object&&a.src)return null==a.loadTimeout&&(a.loadTimeout=b.LOAD_TIMEOUT_DEFAULT),a;throw new Error("Type not recognized.")},a.set=function(a){for(var b in a)this[b]=a[b];return this},createjs.LoadItem=b}(),function(){var a={};a.ABSOLUTE_PATT=/^(?:\w+:)?\/{2}/i,a.RELATIVE_PATT=/^[.\/]*?\//i,a.EXTENSION_PATT=/\/?[^\/]+\.(\w{1,5})$/i,a.parseURI=function(b){var c={absolute:!1,relative:!1};if(null==b)return c;var d=b.indexOf("?");d>-1&&(b=b.substr(0,d));var e;return a.ABSOLUTE_PATT.test(b)?c.absolute=!0:a.RELATIVE_PATT.test(b)&&(c.relative=!0),(e=b.match(a.EXTENSION_PATT))&&(c.extension=e[1].toLowerCase()),c},a.formatQueryString=function(a,b){if(null==a)throw new Error("You must specify data.");var c=[];for(var d in a)c.push(d+"="+escape(a[d]));return b&&(c=c.concat(b)),c.join("&")},a.buildPath=function(a,b){if(null==b)return a;var c=[],d=a.indexOf("?");if(-1!=d){var e=a.slice(d+1);c=c.concat(e.split("&"))}return-1!=d?a.slice(0,d)+"?"+this.formatQueryString(b,c):a+"?"+this.formatQueryString(b,c)},a.isCrossDomain=function(a){var b=document.createElement("a");b.href=a.src;var c=document.createElement("a");c.href=location.href;var d=""!=b.hostname&&(b.port!=c.port||b.protocol!=c.protocol||b.hostname!=c.hostname);return d},a.isLocal=function(a){var b=document.createElement("a");return b.href=a.src,""==b.hostname&&"file:"==b.protocol},a.isBinary=function(a){switch(a){case createjs.AbstractLoader.IMAGE:case createjs.AbstractLoader.BINARY:return!0;default:return!1}},a.isImageTag=function(a){return a instanceof HTMLImageElement},a.isAudioTag=function(a){return window.HTMLAudioElement?a instanceof HTMLAudioElement:!1},a.isVideoTag=function(a){return window.HTMLVideoElement?a instanceof HTMLVideoElement:!1},a.isText=function(a){switch(a){case createjs.AbstractLoader.TEXT:case createjs.AbstractLoader.JSON:case createjs.AbstractLoader.MANIFEST:case createjs.AbstractLoader.XML:case createjs.AbstractLoader.CSS:case createjs.AbstractLoader.SVG:case createjs.AbstractLoader.JAVASCRIPT:case createjs.AbstractLoader.SPRITESHEET:return!0;default:return!1}},a.getTypeByExtension=function(a){if(null==a)return createjs.AbstractLoader.TEXT;switch(a.toLowerCase()){case"jpeg":case"jpg":case"gif":case"png":case"webp":case"bmp":return createjs.AbstractLoader.IMAGE;case"ogg":case"mp3":case"webm":return createjs.AbstractLoader.SOUND;case"mp4":case"webm":case"ts":return createjs.AbstractLoader.VIDEO;case"json":return createjs.AbstractLoader.JSON;case"xml":return createjs.AbstractLoader.XML;case"css":return createjs.AbstractLoader.CSS;case"js":return createjs.AbstractLoader.JAVASCRIPT;case"svg":return createjs.AbstractLoader.SVG;default:return createjs.AbstractLoader.TEXT}},createjs.RequestUtils=a}(),this.createjs=this.createjs||{},function(){"use strict";function AbstractLoader(a,b,c){this.EventDispatcher_constructor(),this.loaded=!1,this.canceled=!1,this.progress=0,this.type=c,this.resultFormatter=null,this._item=a?createjs.LoadItem.create(a):null,this._preferXHR=b,this._result=null,this._rawResult=null,this._loadedItems=null,this._tagSrcAttribute=null,this._tag=null}var a=createjs.extend(AbstractLoader,createjs.EventDispatcher),b=AbstractLoader;b.POST="POST",b.GET="GET",b.BINARY="binary",b.CSS="css",b.IMAGE="image",b.JAVASCRIPT="javascript",b.JSON="json",b.JSONP="jsonp",b.MANIFEST="manifest",b.SOUND="sound",b.VIDEO="video",b.SPRITESHEET="spritesheet",b.SVG="svg",b.TEXT="text",b.XML="xml",a.getItem=function(){return this._item},a.getResult=function(a){return a?this._rawResult:this._result},a.getTag=function(){return this._tag},a.setTag=function(a){this._tag=a},a.load=function(){this._createRequest(),this._request.on("complete",this,this),this._request.on("progress",this,this),this._request.on("loadStart",this,this),this._request.on("abort",this,this),this._request.on("timeout",this,this),this._request.on("error",this,this);var a=new createjs.Event("initialize");a.loader=this._request,this.dispatchEvent(a),this._request.load()},a.cancel=function(){this.canceled=!0,this.destroy()},a.destroy=function(){this._request&&(this._request.removeAllEventListeners(),this._request.destroy()),this._request=null,this._item=null,this._rawResult=null,this._result=null,this._loadItems=null,this.removeAllEventListeners()},a.getLoadedItems=function(){return this._loadedItems},a._createRequest=function(){this._request=this._preferXHR?new createjs.XHRRequest(this._item):new createjs.TagRequest(this._item,this._tag||this._createTag(),this._tagSrcAttribute)},a._createTag=function(){return null},a._sendLoadStart=function(){this._isCanceled()||this.dispatchEvent("loadstart")},a._sendProgress=function(a){if(!this._isCanceled()){var b=null;"number"==typeof a?(this.progress=a,b=new createjs.ProgressEvent(this.progress)):(b=a,this.progress=a.loaded/a.total,b.progress=this.progress,(isNaN(this.progress)||1/0==this.progress)&&(this.progress=0)),this.hasEventListener("progress")&&this.dispatchEvent(b)}},a._sendComplete=function(){if(!this._isCanceled()){this.loaded=!0;var a=new createjs.Event("complete");a.rawResult=this._rawResult,null!=this._result&&(a.result=this._result),this.dispatchEvent(a)}},a._sendError=function(a){!this._isCanceled()&&this.hasEventListener("error")&&(null==a&&(a=new createjs.ErrorEvent("PRELOAD_ERROR_EMPTY")),this.dispatchEvent(a))},a._isCanceled=function(){return null==window.createjs||this.canceled?!0:!1},a.resultFormatter=null,a.handleEvent=function(a){switch(a.type){case"complete":this._rawResult=a.target._response;var b=this.resultFormatter&&this.resultFormatter(this);b instanceof Function?b.call(this,createjs.proxy(this._resultFormatSuccess,this),createjs.proxy(this._resultFormatFailed,this)):(this._result=b||this._rawResult,this._sendComplete());break;case"progress":this._sendProgress(a);break;case"error":this._sendError(a);break;case"loadstart":this._sendLoadStart();break;case"abort":case"timeout":this._isCanceled()||this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_"+a.type.toUpperCase()+"_ERROR"))}},a._resultFormatSuccess=function(a){this._result=a,this._sendComplete()},a._resultFormatFailed=function(a){this._sendError(a)},a.buildPath=function(a,b){return createjs.RequestUtils.buildPath(a,b)},a.toString=function(){return"[PreloadJS AbstractLoader]"},createjs.AbstractLoader=createjs.promote(AbstractLoader,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function AbstractMediaLoader(a,b,c){this.AbstractLoader_constructor(a,b,c),this.resultFormatter=this._formatResult,this._tagSrcAttribute="src",this.on("initialize",this._updateXHR,this)}var a=createjs.extend(AbstractMediaLoader,createjs.AbstractLoader);a.load=function(){this._tag||(this._tag=this._createTag(this._item.src)),this._tag.preload="auto",this._tag.load(),this.AbstractLoader_load()},a._createTag=function(){},a._createRequest=function(){this._request=this._preferXHR?new createjs.XHRRequest(this._item):new createjs.MediaTagRequest(this._item,this._tag||this._createTag(),this._tagSrcAttribute)},a._updateXHR=function(a){a.loader.setResponseType&&a.loader.setResponseType("blob")},a._formatResult=function(a){if(this._tag.removeEventListener&&this._tag.removeEventListener("canplaythrough",this._loadedHandler),this._tag.onstalled=null,this._preferXHR){var b=window.URL||window.webkitURL,c=a.getResult(!0);a.getTag().src=b.createObjectURL(c)}return a.getTag()},createjs.AbstractMediaLoader=createjs.promote(AbstractMediaLoader,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";var AbstractRequest=function(a){this._item=a},a=createjs.extend(AbstractRequest,createjs.EventDispatcher);a.load=function(){},a.destroy=function(){},a.cancel=function(){},createjs.AbstractRequest=createjs.promote(AbstractRequest,"EventDispatcher")}(),this.createjs=this.createjs||{},function(){"use strict";function TagRequest(a,b,c){this.AbstractRequest_constructor(a),this._tag=b,this._tagSrcAttribute=c,this._loadedHandler=createjs.proxy(this._handleTagComplete,this),this._addedToDOM=!1,this._startTagVisibility=null}var a=createjs.extend(TagRequest,createjs.AbstractRequest);a.load=function(){this._tag.onload=createjs.proxy(this._handleTagComplete,this),this._tag.onreadystatechange=createjs.proxy(this._handleReadyStateChange,this),this._tag.onerror=createjs.proxy(this._handleError,this);var a=new createjs.Event("initialize");a.loader=this._tag,this.dispatchEvent(a),this._hideTag(),this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),this._item.loadTimeout),this._tag[this._tagSrcAttribute]=this._item.src,null==this._tag.parentNode&&(window.document.body.appendChild(this._tag),this._addedToDOM=!0)},a.destroy=function(){this._clean(),this._tag=null,this.AbstractRequest_destroy()},a._handleReadyStateChange=function(){clearTimeout(this._loadTimeout);var a=this._tag;("loaded"==a.readyState||"complete"==a.readyState)&&this._handleTagComplete()},a._handleError=function(){this._clean(),this.dispatchEvent("error")},a._handleTagComplete=function(){this._rawResult=this._tag,this._result=this.resultFormatter&&this.resultFormatter(this)||this._rawResult,this._clean(),this._showTag(),this.dispatchEvent("complete")},a._handleTimeout=function(){this._clean(),this.dispatchEvent(new createjs.Event("timeout"))},a._clean=function(){this._tag.onload=null,this._tag.onreadystatechange=null,this._tag.onerror=null,this._addedToDOM&&null!=this._tag.parentNode&&this._tag.parentNode.removeChild(this._tag),clearTimeout(this._loadTimeout)},a._hideTag=function(){this._startTagVisibility=this._tag.style.visibility,this._tag.style.visibility="hidden"},a._showTag=function(){this._tag.style.visibility=this._startTagVisibility},a._handleStalled=function(){},createjs.TagRequest=createjs.promote(TagRequest,"AbstractRequest")}(),this.createjs=this.createjs||{},function(){"use strict";function MediaTagRequest(a,b,c){this.AbstractRequest_constructor(a),this._tag=b,this._tagSrcAttribute=c,this._loadedHandler=createjs.proxy(this._handleTagComplete,this)}var a=createjs.extend(MediaTagRequest,createjs.TagRequest);a.load=function(){var a=createjs.proxy(this._handleStalled,this);this._stalledCallback=a;var b=createjs.proxy(this._handleProgress,this);this._handleProgress=b,this._tag.addEventListener("stalled",a),this._tag.addEventListener("progress",b),this._tag.addEventListener&&this._tag.addEventListener("canplaythrough",this._loadedHandler,!1),this.TagRequest_load()},a._handleReadyStateChange=function(){clearTimeout(this._loadTimeout);var a=this._tag;("loaded"==a.readyState||"complete"==a.readyState)&&this._handleTagComplete()},a._handleStalled=function(){},a._handleProgress=function(a){if(a&&!(a.loaded>0&&0==a.total)){var b=new createjs.ProgressEvent(a.loaded,a.total);this.dispatchEvent(b)}},a._clean=function(){this._tag.removeEventListener&&this._tag.removeEventListener("canplaythrough",this._loadedHandler),this._tag.removeEventListener("stalled",this._stalledCallback),this._tag.removeEventListener("progress",this._progressCallback),this.TagRequest__clean()},createjs.MediaTagRequest=createjs.promote(MediaTagRequest,"TagRequest")}(),this.createjs=this.createjs||{},function(){"use strict";function XHRRequest(a){this.AbstractRequest_constructor(a),this._request=null,this._loadTimeout=null,this._xhrLevel=1,this._response=null,this._rawResponse=null,this._canceled=!1,this._handleLoadStartProxy=createjs.proxy(this._handleLoadStart,this),this._handleProgressProxy=createjs.proxy(this._handleProgress,this),this._handleAbortProxy=createjs.proxy(this._handleAbort,this),this._handleErrorProxy=createjs.proxy(this._handleError,this),this._handleTimeoutProxy=createjs.proxy(this._handleTimeout,this),this._handleLoadProxy=createjs.proxy(this._handleLoad,this),this._handleReadyStateChangeProxy=createjs.proxy(this._handleReadyStateChange,this),!this._createXHR(a)}var a=createjs.extend(XHRRequest,createjs.AbstractRequest);XHRRequest.ACTIVEX_VERSIONS=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.5.0","Msxml2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],a.getResult=function(a){return a&&this._rawResponse?this._rawResponse:this._response},a.cancel=function(){this.canceled=!0,this._clean(),this._request.abort()},a.load=function(){if(null==this._request)return void this._handleError();null!=this._request.addEventListener?(this._request.addEventListener("loadstart",this._handleLoadStartProxy,!1),this._request.addEventListener("progress",this._handleProgressProxy,!1),this._request.addEventListener("abort",this._handleAbortProxy,!1),this._request.addEventListener("error",this._handleErrorProxy,!1),this._request.addEventListener("timeout",this._handleTimeoutProxy,!1),this._request.addEventListener("load",this._handleLoadProxy,!1),this._request.addEventListener("readystatechange",this._handleReadyStateChangeProxy,!1)):(this._request.onloadstart=this._handleLoadStartProxy,this._request.onprogress=this._handleProgressProxy,this._request.onabort=this._handleAbortProxy,this._request.onerror=this._handleErrorProxy,this._request.ontimeout=this._handleTimeoutProxy,this._request.onload=this._handleLoadProxy,this._request.onreadystatechange=this._handleReadyStateChangeProxy),1==this._xhrLevel&&(this._loadTimeout=setTimeout(createjs.proxy(this._handleTimeout,this),this._item.loadTimeout));try{this._item.values&&this._item.method!=createjs.AbstractLoader.GET?this._item.method==createjs.AbstractLoader.POST&&this._request.send(createjs.RequestUtils.formatQueryString(this._item.values)):this._request.send()}catch(a){this.dispatchEvent(new createjs.ErrorEvent("XHR_SEND",null,a))}},a.setResponseType=function(a){"blob"===a&&(a=window.URL?"blob":"arraybuffer",this._responseType=a),this._request.responseType=a},a.getAllResponseHeaders=function(){return this._request.getAllResponseHeaders instanceof Function?this._request.getAllResponseHeaders():null},a.getResponseHeader=function(a){return this._request.getResponseHeader instanceof Function?this._request.getResponseHeader(a):null},a._handleProgress=function(a){if(a&&!(a.loaded>0&&0==a.total)){var b=new createjs.ProgressEvent(a.loaded,a.total);this.dispatchEvent(b)}},a._handleLoadStart=function(){clearTimeout(this._loadTimeout),this.dispatchEvent("loadstart")},a._handleAbort=function(a){this._clean(),this.dispatchEvent(new createjs.ErrorEvent("XHR_ABORTED",null,a))},a._handleError=function(a){this._clean(),this.dispatchEvent(new createjs.ErrorEvent(a.message))},a._handleReadyStateChange=function(){4==this._request.readyState&&this._handleLoad()},a._handleLoad=function(){if(!this.loaded){this.loaded=!0;var a=this._checkError();if(a)return void this._handleError(a);if(this._response=this._getResponse(),"arraybuffer"===this._responseType)try{this._response=new Blob([this._response])}catch(b){if(window.BlobBuilder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,"TypeError"===b.name&&window.BlobBuilder){var c=new BlobBuilder;c.append(this._response),this._response=c.getBlob()}}this._clean(),this.dispatchEvent(new createjs.Event("complete"))}},a._handleTimeout=function(a){this._clean(),this.dispatchEvent(new createjs.ErrorEvent("PRELOAD_TIMEOUT",null,a))},a._checkError=function(){var a=parseInt(this._request.status);switch(a){case 404:case 0:return new Error(a)}return null},a._getResponse=function(){if(null!=this._response)return this._response;if(null!=this._request.response)return this._request.response;try{if(null!=this._request.responseText)return this._request.responseText}catch(a){}try{if(null!=this._request.responseXML)return this._request.responseXML}catch(a){}return null},a._createXHR=function(a){var b=createjs.RequestUtils.isCrossDomain(a),c={},d=null;if(window.XMLHttpRequest)d=new XMLHttpRequest,b&&void 0===d.withCredentials&&window.XDomainRequest&&(d=new XDomainRequest);else{for(var e=0,f=s.ACTIVEX_VERSIONS.length;f>e;e++){var g=s.ACTIVEX_VERSIONS[e];try{d=new ActiveXObject(g);break}catch(h){}}if(null==d)return!1}null==a.mimeType&&createjs.RequestUtils.isText(a.type)&&(a.mimeType="text/plain; charset=utf-8"),a.mimeType&&d.overrideMimeType&&d.overrideMimeType(a.mimeType),this._xhrLevel="string"==typeof d.responseType?2:1;var i=null;if(i=a.method==createjs.AbstractLoader.GET?createjs.RequestUtils.buildPath(a.src,a.values):a.src,d.open(a.method||createjs.AbstractLoader.GET,i,!0),b&&d instanceof XMLHttpRequest&&1==this._xhrLevel&&(c.Origin=location.origin),a.values&&a.method==createjs.AbstractLoader.POST&&(c["Content-Type"]="application/x-www-form-urlencoded"),b||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest"),a.headers)for(var j in a.headers)c[j]=a.headers[j];for(j in c)d.setRequestHeader(j,c[j]);return d instanceof XMLHttpRequest&&void 0!==a.withCredentials&&(d.withCredentials=a.withCredentials),this._request=d,!0},a._clean=function(){clearTimeout(this._loadTimeout),null!=this._request.removeEventListener?(this._request.removeEventListener("loadstart",this._handleLoadStartProxy),this._request.removeEventListener("progress",this._handleProgressProxy),this._request.removeEventListener("abort",this._handleAbortProxy),this._request.removeEventListener("error",this._handleErrorProxy),this._request.removeEventListener("timeout",this._handleTimeoutProxy),this._request.removeEventListener("load",this._handleLoadProxy),this._request.removeEventListener("readystatechange",this._handleReadyStateChangeProxy)):(this._request.onloadstart=null,this._request.onprogress=null,this._request.onabort=null,this._request.onerror=null,this._request.ontimeout=null,this._request.onload=null,this._request.onreadystatechange=null)},a.toString=function(){return"[PreloadJS XHRRequest]"},createjs.XHRRequest=createjs.promote(XHRRequest,"AbstractRequest")}(),this.createjs=this.createjs||{},function(){"use strict";function SoundLoader(a,b){this.AbstractMediaLoader_constructor(a,b,createjs.AbstractLoader.SOUND),createjs.RequestUtils.isAudioTag(a)?this._tag=a:createjs.RequestUtils.isAudioTag(a.src)?this._tag=a:createjs.RequestUtils.isAudioTag(a.tag)&&(this._tag=createjs.RequestUtils.isAudioTag(a)?a:a.src),null!=this._tag&&(this._preferXHR=!1)}var a=createjs.extend(SoundLoader,createjs.AbstractMediaLoader),b=SoundLoader;b.canLoadItem=function(a){return a.type==createjs.AbstractLoader.SOUND},a._createTag=function(a){var b=document.createElement("audio");return b.autoplay=!1,b.preload="none",b.src=a,b},createjs.SoundLoader=createjs.promote(SoundLoader,"AbstractMediaLoader")}(),this.createjs=this.createjs||{},function(){"use strict";var PlayPropsConfig=function(){this.interrupt=null,this.delay=null,this.offset=null,this.loop=null,this.volume=null,this.pan=null,this.startTime=null,this.duration=null},a=PlayPropsConfig.prototype={},b=PlayPropsConfig;b.create=function(a){if(a instanceof b||a instanceof Object){var c=new createjs.PlayPropsConfig;return c.set(a),c}throw new Error("Type not recognized.")},a.set=function(a){for(var b in a)this[b]=a[b];return this},a.toString=function(){return"[PlayPropsConfig]"},createjs.PlayPropsConfig=b}(),this.createjs=this.createjs||{},function(){"use strict";function Sound(){throw"Sound cannot be instantiated"}function a(a,b){this.init(a,b)}var b=Sound;b.INTERRUPT_ANY="any",b.INTERRUPT_EARLY="early",b.INTERRUPT_LATE="late",b.INTERRUPT_NONE="none",b.PLAY_INITED="playInited",b.PLAY_SUCCEEDED="playSucceeded",b.PLAY_INTERRUPTED="playInterrupted",b.PLAY_FINISHED="playFinished",b.PLAY_FAILED="playFailed",b.SUPPORTED_EXTENSIONS=["mp3","ogg","opus","mpeg","wav","m4a","mp4","aiff","wma","mid"],b.EXTENSION_MAP={m4a:"mp4"},b.FILE_PATTERN=/^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([\/.]*?(?:[^?]+)?\/)?((?:[^\/?]+)\.(\w+))(?:\?(\S+)?)?$/,b.defaultInterruptBehavior=b.INTERRUPT_NONE,b.alternateExtensions=[],b.activePlugin=null,b._masterVolume=1,Object.defineProperty(b,"volume",{get:function(){return this._masterVolume},set:function(a){if(null==Number(a))return!1;if(a=Math.max(0,Math.min(1,a)),b._masterVolume=a,!this.activePlugin||!this.activePlugin.setVolume||!this.activePlugin.setVolume(a))for(var c=this._instances,d=0,e=c.length;e>d;d++)c[d].setMasterVolume(a)}}),b._masterMute=!1,Object.defineProperty(b,"muted",{get:function(){return this._masterMute},set:function(a){if(null==a)return!1;if(this._masterMute=a,!this.activePlugin||!this.activePlugin.setMute||!this.activePlugin.setMute(a))for(var b=this._instances,c=0,d=b.length;d>c;c++)b[c].setMasterMute(a);return!0}}),Object.defineProperty(b,"capabilities",{get:function(){return null==b.activePlugin?null:b.activePlugin._capabilities},set:function(){return!1}}),b._pluginsRegistered=!1,b._lastID=0,b._instances=[],b._idHash={},b._preloadHash={},b._defaultPlayPropsHash={},b.addEventListener=null,b.removeEventListener=null,b.removeAllEventListeners=null,b.dispatchEvent=null,b.hasEventListener=null,b._listeners=null,createjs.EventDispatcher.initialize(b),b.getPreloadHandlers=function(){return{callback:createjs.proxy(b.initLoad,b),types:["sound"],extensions:b.SUPPORTED_EXTENSIONS}},b._handleLoadComplete=function(a){var c=a.target.getItem().src;if(b._preloadHash[c])for(var d=0,e=b._preloadHash[c].length;e>d;d++){var f=b._preloadHash[c][d];if(b._preloadHash[c][d]=!0,b.hasEventListener("fileload")){var a=new createjs.Event("fileload");a.src=f.src,a.id=f.id,a.data=f.data,a.sprite=f.sprite,b.dispatchEvent(a)}}},b._handleLoadError=function(a){var c=a.target.getItem().src;if(b._preloadHash[c])for(var d=0,e=b._preloadHash[c].length;e>d;d++){var f=b._preloadHash[c][d];if(b._preloadHash[c][d]=!1,b.hasEventListener("fileerror")){var a=new createjs.Event("fileerror");a.src=f.src,a.id=f.id,a.data=f.data,a.sprite=f.sprite,b.dispatchEvent(a)}}},b._registerPlugin=function(a){return a.isSupported()?(b.activePlugin=new a,!0):!1},b.registerPlugins=function(a){b._pluginsRegistered=!0;for(var c=0,d=a.length;d>c;c++)if(b._registerPlugin(a[c]))return!0;return!1},b.initializeDefaultPlugins=function(){return null!=b.activePlugin?!0:b._pluginsRegistered?!1:b.registerPlugins([createjs.WebAudioPlugin,createjs.HTMLAudioPlugin])?!0:!1},b.isReady=function(){return null!=b.activePlugin},b.getCapabilities=function(){return null==b.activePlugin?null:b.activePlugin._capabilities},b.getCapability=function(a){return null==b.activePlugin?null:b.activePlugin._capabilities[a]},b.initLoad=function(a){return b._registerSound(a)},b._registerSound=function(c){if(!b.initializeDefaultPlugins())return!1;var d;if(c.src instanceof Object?(d=b._parseSrc(c.src),d.src=c.path+d.src):d=b._parsePath(c.src),null==d)return!1;c.src=d.src,c.type="sound";var e=c.data,f=null;if(null!=e&&(isNaN(e.channels)?isNaN(e)||(f=parseInt(e)):f=parseInt(e.channels),e.audioSprite))for(var g,h=e.audioSprite.length;h--;)g=e.audioSprite[h],b._idHash[g.id]={src:c.src,startTime:parseInt(g.startTime),duration:parseInt(g.duration)},g.defaultPlayProps&&(b._defaultPlayPropsHash[g.id]=createjs.PlayPropsConfig.create(g.defaultPlayProps));null!=c.id&&(b._idHash[c.id]={src:c.src});var i=b.activePlugin.register(c);return a.create(c.src,f),null!=e&&isNaN(e)?c.data.channels=f||a.maxPerChannel():c.data=f||a.maxPerChannel(),i.type&&(c.type=i.type),c.defaultPlayProps&&(b._defaultPlayPropsHash[c.src]=createjs.PlayPropsConfig.create(c.defaultPlayProps)),i},b.registerSound=function(a,c,d,e,f){var g={src:a,id:c,data:d,defaultPlayProps:f};a instanceof Object&&a.src&&(e=c,g=a),g=createjs.LoadItem.create(g),g.path=e,null==e||g.src instanceof Object||(g.src=e+a);var h=b._registerSound(g);if(!h)return!1;if(b._preloadHash[g.src]||(b._preloadHash[g.src]=[]),b._preloadHash[g.src].push(g),1==b._preloadHash[g.src].length)h.on("complete",createjs.proxy(this._handleLoadComplete,this)),h.on("error",createjs.proxy(this._handleLoadError,this)),b.activePlugin.preload(h);else if(1==b._preloadHash[g.src][0])return!0;return g},b.registerSounds=function(a,b){var c=[];a.path&&(b?b+=a.path:b=a.path,a=a.manifest);for(var d=0,e=a.length;e>d;d++)c[d]=createjs.Sound.registerSound(a[d].src,a[d].id,a[d].data,b,a[d].defaultPlayProps);return c},b.removeSound=function(c,d){if(null==b.activePlugin)return!1;c instanceof Object&&c.src&&(c=c.src);var e;if(c instanceof Object?e=b._parseSrc(c):(c=b._getSrcById(c).src,e=b._parsePath(c)),null==e)return!1;c=e.src,null!=d&&(c=d+c);for(var f in b._idHash)b._idHash[f].src==c&&delete b._idHash[f];return a.removeSrc(c),delete b._preloadHash[c],b.activePlugin.removeSound(c),!0},b.removeSounds=function(a,b){var c=[];a.path&&(b?b+=a.path:b=a.path,a=a.manifest);for(var d=0,e=a.length;e>d;d++)c[d]=createjs.Sound.removeSound(a[d].src,b);return c},b.removeAllSounds=function(){b._idHash={},b._preloadHash={},a.removeAll(),b.activePlugin&&b.activePlugin.removeAllSounds()},b.loadComplete=function(a){if(!b.isReady())return!1;var c=b._parsePath(a);return a=c?b._getSrcById(c.src).src:b._getSrcById(a).src,void 0==b._preloadHash[a]?!1:1==b._preloadHash[a][0]},b._parsePath=function(a){"string"!=typeof a&&(a=a.toString());var c=a.match(b.FILE_PATTERN);if(null==c)return!1;for(var d=c[4],e=c[5],f=b.capabilities,g=0;!f[e];)if(e=b.alternateExtensions[g++],g>b.alternateExtensions.length)return null;a=a.replace("."+c[5],"."+e);var h={name:d,src:a,extension:e};return h},b._parseSrc=function(a){var c={name:void 0,src:void 0,extension:void 0},d=b.capabilities;for(var e in a)if(a.hasOwnProperty(e)&&d[e]){c.src=a[e],c.extension=e;break}if(!c.src)return!1;var f=c.src.lastIndexOf("/");return c.name=-1!=f?c.src.slice(f+1):c.src,c},b.play=function(a,c,d,e,f,g,h,i,j){var k;k=createjs.PlayPropsConfig.create(c instanceof Object||c instanceof createjs.PlayPropsConfig?c:{interrupt:c,delay:d,offset:e,loop:f,volume:g,pan:h,startTime:i,duration:j});var l=b.createInstance(a,k.startTime,k.duration),m=b._playInstance(l,k);return m||l._playFailed(),l},b.createInstance=function(c,d,e){if(!b.initializeDefaultPlugins())return new createjs.DefaultSoundInstance(c,d,e);var f=b._defaultPlayPropsHash[c];c=b._getSrcById(c);var g=b._parsePath(c.src),h=null;
return null!=g&&null!=g.src?(a.create(g.src),null==d&&(d=c.startTime),h=b.activePlugin.create(g.src,d,e||c.duration),f=f||b._defaultPlayPropsHash[g.src],f&&h.applyPlayProps(f)):h=new createjs.DefaultSoundInstance(c,d,e),h.uniqueId=b._lastID++,h},b.stop=function(){for(var a=this._instances,b=a.length;b--;)a[b].stop()},b.setVolume=function(a){if(null==Number(a))return!1;if(a=Math.max(0,Math.min(1,a)),b._masterVolume=a,!this.activePlugin||!this.activePlugin.setVolume||!this.activePlugin.setVolume(a))for(var c=this._instances,d=0,e=c.length;e>d;d++)c[d].setMasterVolume(a)},b.getVolume=function(){return this._masterVolume},b.setMute=function(a){if(null==a)return!1;if(this._masterMute=a,!this.activePlugin||!this.activePlugin.setMute||!this.activePlugin.setMute(a))for(var b=this._instances,c=0,d=b.length;d>c;c++)b[c].setMasterMute(a);return!0},b.getMute=function(){return this._masterMute},b.setDefaultPlayProps=function(a,c){a=b._getSrcById(a),b._defaultPlayPropsHash[b._parsePath(a.src).src]=createjs.PlayPropsConfig.create(c)},b.getDefaultPlayProps=function(a){return a=b._getSrcById(a),b._defaultPlayPropsHash[b._parsePath(a.src).src]},b._playInstance=function(a,c){var d=b._defaultPlayPropsHash[a.src]||{};if(null==c.interrupt&&(c.interrupt=d.interrupt||b.defaultInterruptBehavior),null==c.delay&&(c.delay=d.delay||0),null==c.offset&&(c.offset=a.getPosition()),null==c.loop&&(c.loop=a.loop),null==c.volume&&(c.volume=a.volume),null==c.pan&&(c.pan=a.pan),0==c.delay){var e=b._beginPlaying(a,c);if(!e)return!1}else{var f=setTimeout(function(){b._beginPlaying(a,c)},c.delay);a.delayTimeoutId=f}return this._instances.push(a),!0},b._beginPlaying=function(b,c){if(!a.add(b,c.interrupt))return!1;var d=b._beginPlaying(c);if(!d){var e=createjs.indexOf(this._instances,b);return e>-1&&this._instances.splice(e,1),!1}return!0},b._getSrcById=function(a){return b._idHash[a]||{src:a}},b._playFinished=function(b){a.remove(b);var c=createjs.indexOf(this._instances,b);c>-1&&this._instances.splice(c,1)},createjs.Sound=Sound,a.channels={},a.create=function(b,c){var d=a.get(b);return null==d?(a.channels[b]=new a(b,c),!0):!1},a.removeSrc=function(b){var c=a.get(b);return null==c?!1:(c._removeAll(),delete a.channels[b],!0)},a.removeAll=function(){for(var b in a.channels)a.channels[b]._removeAll();a.channels={}},a.add=function(b,c){var d=a.get(b.src);return null==d?!1:d._add(b,c)},a.remove=function(b){var c=a.get(b.src);return null==c?!1:(c._remove(b),!0)},a.maxPerChannel=function(){return c.maxDefault},a.get=function(b){return a.channels[b]};var c=a.prototype;c.constructor=a,c.src=null,c.max=null,c.maxDefault=100,c.length=0,c.init=function(a,b){this.src=a,this.max=b||this.maxDefault,-1==this.max&&(this.max=this.maxDefault),this._instances=[]},c._get=function(a){return this._instances[a]},c._add=function(a,b){return this._getSlot(b,a)?(this._instances.push(a),this.length++,!0):!1},c._remove=function(a){var b=createjs.indexOf(this._instances,a);return-1==b?!1:(this._instances.splice(b,1),this.length--,!0)},c._removeAll=function(){for(var a=this.length-1;a>=0;a--)this._instances[a].stop()},c._getSlot=function(a){var b,c;if(a!=Sound.INTERRUPT_NONE&&(c=this._get(0),null==c))return!0;for(var d=0,e=this.max;e>d;d++){if(b=this._get(d),null==b)return!0;if(b.playState==Sound.PLAY_FINISHED||b.playState==Sound.PLAY_INTERRUPTED||b.playState==Sound.PLAY_FAILED){c=b;break}a!=Sound.INTERRUPT_NONE&&(a==Sound.INTERRUPT_EARLY&&b.getPosition()<c.getPosition()||a==Sound.INTERRUPT_LATE&&b.getPosition()>c.getPosition())&&(c=b)}return null!=c?(c._interrupt(),this._remove(c),!0):!1},c.toString=function(){return"[Sound SoundChannel]"}}(),this.createjs=this.createjs||{},function(){"use strict";var AbstractSoundInstance=function(a,b,c,d){this.EventDispatcher_constructor(),this.src=a,this.uniqueId=-1,this.playState=null,this.delayTimeoutId=null,this._volume=1,Object.defineProperty(this,"volume",{get:this.getVolume,set:this.setVolume}),this._pan=0,Object.defineProperty(this,"pan",{get:this.getPan,set:this.setPan}),this._startTime=Math.max(0,b||0),Object.defineProperty(this,"startTime",{get:this.getStartTime,set:this.setStartTime}),this._duration=Math.max(0,c||0),Object.defineProperty(this,"duration",{get:this.getDuration,set:this.setDuration}),this._playbackResource=null,Object.defineProperty(this,"playbackResource",{get:this.getPlaybackResource,set:this.setPlaybackResource}),d!==!1&&d!==!0&&this.setPlaybackResource(d),this._position=0,Object.defineProperty(this,"position",{get:this.getPosition,set:this.setPosition}),this._loop=0,Object.defineProperty(this,"loop",{get:this.getLoop,set:this.setLoop}),this._muted=!1,Object.defineProperty(this,"muted",{get:this.getMuted,set:this.setMuted}),this._paused=!1,Object.defineProperty(this,"paused",{get:this.getPaused,set:this.setPaused})},a=createjs.extend(AbstractSoundInstance,createjs.EventDispatcher);a.play=function(a,b,c,d,e,f){var g;return g=createjs.PlayPropsConfig.create(a instanceof Object||a instanceof createjs.PlayPropsConfig?a:{interrupt:a,delay:b,offset:c,loop:d,volume:e,pan:f}),this.playState==createjs.Sound.PLAY_SUCCEEDED?(this.applyPlayProps(g),void(this._paused&&this.setPaused(!1))):(this._cleanUp(),createjs.Sound._playInstance(this,g),this)},a.stop=function(){return this._position=0,this._paused=!1,this._handleStop(),this._cleanUp(),this.playState=createjs.Sound.PLAY_FINISHED,this},a.destroy=function(){this._cleanUp(),this.src=null,this.playbackResource=null,this.removeAllEventListeners()},a.applyPlayProps=function(a){return null!=a.offset&&this.setPosition(a.offset),null!=a.loop&&this.setLoop(a.loop),null!=a.volume&&this.setVolume(a.volume),null!=a.pan&&this.setPan(a.pan),null!=a.startTime&&(this.setStartTime(a.startTime),this.setDuration(a.duration)),this},a.toString=function(){return"[AbstractSoundInstance]"},a.getPaused=function(){return this._paused},a.setPaused=function(a){return a!==!0&&a!==!1||this._paused==a||1==a&&this.playState!=createjs.Sound.PLAY_SUCCEEDED?void 0:(this._paused=a,a?this._pause():this._resume(),clearTimeout(this.delayTimeoutId),this)},a.setVolume=function(a){return a==this._volume?this:(this._volume=Math.max(0,Math.min(1,a)),this._muted||this._updateVolume(),this)},a.getVolume=function(){return this._volume},a.setMuted=function(a){return a===!0||a===!1?(this._muted=a,this._updateVolume(),this):void 0},a.getMuted=function(){return this._muted},a.setPan=function(a){return a==this._pan?this:(this._pan=Math.max(-1,Math.min(1,a)),this._updatePan(),this)},a.getPan=function(){return this._pan},a.getPosition=function(){return this._paused||this.playState!=createjs.Sound.PLAY_SUCCEEDED||(this._position=this._calculateCurrentPosition()),this._position},a.setPosition=function(a){return this._position=Math.max(0,a),this.playState==createjs.Sound.PLAY_SUCCEEDED&&this._updatePosition(),this},a.getStartTime=function(){return this._startTime},a.setStartTime=function(a){return a==this._startTime?this:(this._startTime=Math.max(0,a||0),this._updateStartTime(),this)},a.getDuration=function(){return this._duration},a.setDuration=function(a){return a==this._duration?this:(this._duration=Math.max(0,a||0),this._updateDuration(),this)},a.setPlaybackResource=function(a){return this._playbackResource=a,0==this._duration&&this._setDurationFromSource(),this},a.getPlaybackResource=function(){return this._playbackResource},a.getLoop=function(){return this._loop},a.setLoop=function(a){null!=this._playbackResource&&(0!=this._loop&&0==a?this._removeLooping(a):0==this._loop&&0!=a&&this._addLooping(a)),this._loop=a},a._sendEvent=function(a){var b=new createjs.Event(a);this.dispatchEvent(b)},a._cleanUp=function(){clearTimeout(this.delayTimeoutId),this._handleCleanUp(),this._paused=!1,createjs.Sound._playFinished(this)},a._interrupt=function(){this._cleanUp(),this.playState=createjs.Sound.PLAY_INTERRUPTED,this._sendEvent("interrupted")},a._beginPlaying=function(a){return this.setPosition(a.offset),this.setLoop(a.loop),this.setVolume(a.volume),this.setPan(a.pan),null!=a.startTime&&(this.setStartTime(a.startTime),this.setDuration(a.duration)),null!=this._playbackResource&&this._position<this._duration?(this._paused=!1,this._handleSoundReady(),this.playState=createjs.Sound.PLAY_SUCCEEDED,this._sendEvent("succeeded"),!0):(this._playFailed(),!1)},a._playFailed=function(){this._cleanUp(),this.playState=createjs.Sound.PLAY_FAILED,this._sendEvent("failed")},a._handleSoundComplete=function(){return this._position=0,0!=this._loop?(this._loop--,this._handleLoop(),void this._sendEvent("loop")):(this._cleanUp(),this.playState=createjs.Sound.PLAY_FINISHED,void this._sendEvent("complete"))},a._handleSoundReady=function(){},a._updateVolume=function(){},a._updatePan=function(){},a._updateStartTime=function(){},a._updateDuration=function(){},a._setDurationFromSource=function(){},a._calculateCurrentPosition=function(){},a._updatePosition=function(){},a._removeLooping=function(){},a._addLooping=function(){},a._pause=function(){},a._resume=function(){},a._handleStop=function(){},a._handleCleanUp=function(){},a._handleLoop=function(){},createjs.AbstractSoundInstance=createjs.promote(AbstractSoundInstance,"EventDispatcher"),createjs.DefaultSoundInstance=createjs.AbstractSoundInstance}(),this.createjs=this.createjs||{},function(){"use strict";var AbstractPlugin=function(){this._capabilities=null,this._loaders={},this._audioSources={},this._soundInstances={},this._volume=1,this._loaderClass,this._soundInstanceClass},a=AbstractPlugin.prototype;AbstractPlugin._capabilities=null,AbstractPlugin.isSupported=function(){return!0},a.register=function(a){var b=this._loaders[a.src];return b&&!b.canceled?this._loaders[a.src]:(this._audioSources[a.src]=!0,this._soundInstances[a.src]=[],b=new this._loaderClass(a),b.on("complete",this._handlePreloadComplete,this),this._loaders[a.src]=b,b)},a.preload=function(a){a.on("error",this._handlePreloadError,this),a.load()},a.isPreloadStarted=function(a){return null!=this._audioSources[a]},a.isPreloadComplete=function(a){return!(null==this._audioSources[a]||1==this._audioSources[a])},a.removeSound=function(a){if(this._soundInstances[a]){for(var b=this._soundInstances[a].length;b--;){var c=this._soundInstances[a][b];c.destroy()}delete this._soundInstances[a],delete this._audioSources[a],this._loaders[a]&&this._loaders[a].destroy(),delete this._loaders[a]}},a.removeAllSounds=function(){for(var a in this._audioSources)this.removeSound(a)},a.create=function(a,b,c){this.isPreloadStarted(a)||this.preload(this.register(a));var d=new this._soundInstanceClass(a,b,c,this._audioSources[a]);return this._soundInstances[a].push(d),d},a.setVolume=function(a){return this._volume=a,this._updateVolume(),!0},a.getVolume=function(){return this._volume},a.setMute=function(){return this._updateVolume(),!0},a.toString=function(){return"[AbstractPlugin]"},a._handlePreloadComplete=function(a){var b=a.target.getItem().src;this._audioSources[b]=a.result;for(var c=0,d=this._soundInstances[b].length;d>c;c++){var e=this._soundInstances[b][c];e.setPlaybackResource(this._audioSources[b])}},a._handlePreloadError=function(){},a._updateVolume=function(){},createjs.AbstractPlugin=AbstractPlugin}(),this.createjs=this.createjs||{},function(){"use strict";function a(a){this.AbstractLoader_constructor(a,!0,createjs.AbstractLoader.SOUND)}var b=createjs.extend(a,createjs.AbstractLoader);a.context=null,b.toString=function(){return"[WebAudioLoader]"},b._createRequest=function(){this._request=new createjs.XHRRequest(this._item,!1),this._request.setResponseType("arraybuffer")},b._sendComplete=function(){a.context.decodeAudioData(this._rawResult,createjs.proxy(this._handleAudioDecoded,this),createjs.proxy(this._sendError,this))},b._handleAudioDecoded=function(a){this._result=a,this.AbstractLoader__sendComplete()},createjs.WebAudioLoader=createjs.promote(a,"AbstractLoader")}(),this.createjs=this.createjs||{},function(){"use strict";function WebAudioSoundInstance(a,c,d,e){this.AbstractSoundInstance_constructor(a,c,d,e),this.gainNode=b.context.createGain(),this.panNode=b.context.createPanner(),this.panNode.panningModel=b._panningModel,this.panNode.connect(this.gainNode),this._updatePan(),this.sourceNode=null,this._soundCompleteTimeout=null,this._sourceNodeNext=null,this._playbackStartTime=0,this._endedHandler=createjs.proxy(this._handleSoundComplete,this)}var a=createjs.extend(WebAudioSoundInstance,createjs.AbstractSoundInstance),b=WebAudioSoundInstance;b.context=null,b._scratchBuffer=null,b.destinationNode=null,b._panningModel="equalpower",a.destroy=function(){this.AbstractSoundInstance_destroy(),this.panNode.disconnect(0),this.panNode=null,this.gainNode.disconnect(0),this.gainNode=null},a.toString=function(){return"[WebAudioSoundInstance]"},a._updatePan=function(){this.panNode.setPosition(this._pan,0,-.5)},a._removeLooping=function(){this._sourceNodeNext=this._cleanUpAudioNode(this._sourceNodeNext)},a._addLooping=function(){this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this._sourceNodeNext=this._createAndPlayAudioNode(this._playbackStartTime,0))},a._setDurationFromSource=function(){this._duration=1e3*this.playbackResource.duration},a._handleCleanUp=function(){this.sourceNode&&this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this.sourceNode=this._cleanUpAudioNode(this.sourceNode),this._sourceNodeNext=this._cleanUpAudioNode(this._sourceNodeNext)),0!=this.gainNode.numberOfOutputs&&this.gainNode.disconnect(0),clearTimeout(this._soundCompleteTimeout),this._playbackStartTime=0},a._cleanUpAudioNode=function(a){if(a){a.stop(0),a.disconnect(0);try{a.buffer=b._scratchBuffer}catch(c){}a=null}return a},a._handleSoundReady=function(){this.gainNode.connect(b.destinationNode);var a=.001*this._duration,c=.001*this._position;c>a&&(c=a),this.sourceNode=this._createAndPlayAudioNode(b.context.currentTime-a,c),this._playbackStartTime=this.sourceNode.startTime-c,this._soundCompleteTimeout=setTimeout(this._endedHandler,1e3*(a-c)),0!=this._loop&&(this._sourceNodeNext=this._createAndPlayAudioNode(this._playbackStartTime,0))},a._createAndPlayAudioNode=function(a,c){var d=b.context.createBufferSource();d.buffer=this.playbackResource,d.connect(this.panNode);var e=.001*this._duration;return d.startTime=a+e,d.start(d.startTime,c+.001*this._startTime,e-c),d},a._pause=function(){this._position=1e3*(b.context.currentTime-this._playbackStartTime),this.sourceNode=this._cleanUpAudioNode(this.sourceNode),this._sourceNodeNext=this._cleanUpAudioNode(this._sourceNodeNext),0!=this.gainNode.numberOfOutputs&&this.gainNode.disconnect(0),clearTimeout(this._soundCompleteTimeout)},a._resume=function(){this._handleSoundReady()},a._updateVolume=function(){var a=this._muted?0:this._volume;a!=this.gainNode.gain.value&&(this.gainNode.gain.value=a)},a._calculateCurrentPosition=function(){return 1e3*(b.context.currentTime-this._playbackStartTime)},a._updatePosition=function(){this.sourceNode=this._cleanUpAudioNode(this.sourceNode),this._sourceNodeNext=this._cleanUpAudioNode(this._sourceNodeNext),clearTimeout(this._soundCompleteTimeout),this._paused||this._handleSoundReady()},a._handleLoop=function(){this._cleanUpAudioNode(this.sourceNode),this.sourceNode=this._sourceNodeNext,this._playbackStartTime=this.sourceNode.startTime,this._sourceNodeNext=this._createAndPlayAudioNode(this._playbackStartTime,0),this._soundCompleteTimeout=setTimeout(this._endedHandler,this._duration)},a._updateDuration=function(){this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this._pause(),this._resume())},createjs.WebAudioSoundInstance=createjs.promote(WebAudioSoundInstance,"AbstractSoundInstance")}(),this.createjs=this.createjs||{},function(){"use strict";function WebAudioPlugin(){this.AbstractPlugin_constructor(),this._panningModel=b._panningModel,this.context=b.context,this.dynamicsCompressorNode=this.context.createDynamicsCompressor(),this.dynamicsCompressorNode.connect(this.context.destination),this.gainNode=this.context.createGain(),this.gainNode.connect(this.dynamicsCompressorNode),createjs.WebAudioSoundInstance.destinationNode=this.gainNode,this._capabilities=b._capabilities,this._loaderClass=createjs.WebAudioLoader,this._soundInstanceClass=createjs.WebAudioSoundInstance,this._addPropsToClasses()}var a=createjs.extend(WebAudioPlugin,createjs.AbstractPlugin),b=WebAudioPlugin;b._capabilities=null,b._panningModel="equalpower",b.context=null,b._scratchBuffer=null,b._unlocked=!1,b.isSupported=function(){var a=createjs.BrowserDetect.isIOS||createjs.BrowserDetect.isAndroid||createjs.BrowserDetect.isBlackberry;return"file:"!=location.protocol||a||this._isFileXHRSupported()?(b._generateCapabilities(),null==b.context?!1:!0):!1},b.playEmptySound=function(){if(null!=b.context){var a=b.context.createBufferSource();a.buffer=b._scratchBuffer,a.connect(b.context.destination),a.start(0,0,0)}},b._isFileXHRSupported=function(){var a=!0,b=new XMLHttpRequest;try{b.open("GET","WebAudioPluginTest.fail",!1)}catch(c){return a=!1}b.onerror=function(){a=!1},b.onload=function(){a=404==this.status||200==this.status||0==this.status&&""!=this.response};try{b.send()}catch(c){a=!1}return a},b._generateCapabilities=function(){if(null==b._capabilities){var a=document.createElement("audio");if(null==a.canPlayType)return null;if(null==b.context)if(window.AudioContext)b.context=new AudioContext;else{if(!window.webkitAudioContext)return null;b.context=new webkitAudioContext}null==b._scratchBuffer&&(b._scratchBuffer=b.context.createBuffer(1,1,22050)),b._compatibilitySetUp(),"ontouchstart"in window&&"running"!=b.context.state&&(b._unlock(),document.addEventListener("mousedown",b._unlock,!0),document.addEventListener("touchend",b._unlock,!0)),b._capabilities={panning:!0,volume:!0,tracks:-1};for(var c=createjs.Sound.SUPPORTED_EXTENSIONS,d=createjs.Sound.EXTENSION_MAP,e=0,f=c.length;f>e;e++){var g=c[e],h=d[g]||g;b._capabilities[g]="no"!=a.canPlayType("audio/"+g)&&""!=a.canPlayType("audio/"+g)||"no"!=a.canPlayType("audio/"+h)&&""!=a.canPlayType("audio/"+h)}b.context.destination.numberOfChannels<2&&(b._capabilities.panning=!1)}},b._compatibilitySetUp=function(){if(b._panningModel="equalpower",!b.context.createGain){b.context.createGain=b.context.createGainNode;var a=b.context.createBufferSource();a.__proto__.start=a.__proto__.noteGrainOn,a.__proto__.stop=a.__proto__.noteOff,b._panningModel=0}},b._unlock=function(){b._unlocked||(b.playEmptySound(),"running"==b.context.state&&(document.removeEventListener("mousedown",b._unlock,!0),document.removeEventListener("touchend",b._unlock,!0),b._unlocked=!0))},a.toString=function(){return"[WebAudioPlugin]"},a._addPropsToClasses=function(){var a=this._soundInstanceClass;a.context=this.context,a._scratchBuffer=b._scratchBuffer,a.destinationNode=this.gainNode,a._panningModel=this._panningModel,this._loaderClass.context=this.context},a._updateVolume=function(){var a=createjs.Sound._masterMute?0:this._volume;a!=this.gainNode.gain.value&&(this.gainNode.gain.value=a)},createjs.WebAudioPlugin=createjs.promote(WebAudioPlugin,"AbstractPlugin")}(),this.createjs=this.createjs||{},function(){"use strict";function HTMLAudioTagPool(){throw"HTMLAudioTagPool cannot be instantiated"}function a(){this._tags=[]}var b=HTMLAudioTagPool;b._tags={},b._tagPool=new a,b._tagUsed={},b.get=function(a){var c=b._tags[a];return null==c?(c=b._tags[a]=b._tagPool.get(),c.src=a):b._tagUsed[a]?(c=b._tagPool.get(),c.src=a):b._tagUsed[a]=!0,c},b.set=function(a,c){c==b._tags[a]?b._tagUsed[a]=!1:b._tagPool.set(c)},b.remove=function(a){var c=b._tags[a];return null==c?!1:(b._tagPool.set(c),delete b._tags[a],delete b._tagUsed[a],!0)},b.getDuration=function(a){var c=b._tags[a];return null!=c&&c.duration?1e3*c.duration:0},createjs.HTMLAudioTagPool=HTMLAudioTagPool;var c=a.prototype;c.constructor=a,c.get=function(){var a;return a=0==this._tags.length?this._createTag():this._tags.pop(),null==a.parentNode&&document.body.appendChild(a),a},c.set=function(a){var b=createjs.indexOf(this._tags,a);-1==b&&(this._tags.src=null,this._tags.push(a))},c.toString=function(){return"[TagPool]"},c._createTag=function(){var a=document.createElement("audio");return a.autoplay=!1,a.preload="none",a}}(),this.createjs=this.createjs||{},function(){"use strict";function HTMLAudioSoundInstance(a,b,c,d){this.AbstractSoundInstance_constructor(a,b,c,d),this._audioSpriteStopTime=null,this._delayTimeoutId=null,this._endedHandler=createjs.proxy(this._handleSoundComplete,this),this._readyHandler=createjs.proxy(this._handleTagReady,this),this._stalledHandler=createjs.proxy(this._playFailed,this),this._audioSpriteEndHandler=createjs.proxy(this._handleAudioSpriteLoop,this),this._loopHandler=createjs.proxy(this._handleSoundComplete,this),c?this._audioSpriteStopTime=.001*(b+c):this._duration=createjs.HTMLAudioTagPool.getDuration(this.src)}var a=createjs.extend(HTMLAudioSoundInstance,createjs.AbstractSoundInstance);a.setMasterVolume=function(){this._updateVolume()},a.setMasterMute=function(){this._updateVolume()},a.toString=function(){return"[HTMLAudioSoundInstance]"},a._removeLooping=function(){null!=this._playbackResource&&(this._playbackResource.loop=!1,this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1))},a._addLooping=function(){null==this._playbackResource||this._audioSpriteStopTime||(this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1),this._playbackResource.loop=!0)},a._handleCleanUp=function(){var a=this._playbackResource;if(null!=a){a.pause(),a.loop=!1,a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED,this._endedHandler,!1),a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY,this._readyHandler,!1),a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED,this._stalledHandler,!1),a.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1),a.removeEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE,this._audioSpriteEndHandler,!1);try{a.currentTime=this._startTime}catch(b){}createjs.HTMLAudioTagPool.set(this.src,a),this._playbackResource=null}},a._beginPlaying=function(a){return this._playbackResource=createjs.HTMLAudioTagPool.get(this.src),this.AbstractSoundInstance__beginPlaying(a)},a._handleSoundReady=function(){if(4!==this._playbackResource.readyState){var a=this._playbackResource;return a.addEventListener(createjs.HTMLAudioPlugin._AUDIO_READY,this._readyHandler,!1),a.addEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED,this._stalledHandler,!1),a.preload="auto",void a.load()}this._updateVolume(),this._playbackResource.currentTime=.001*(this._startTime+this._position),this._audioSpriteStopTime?this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE,this._audioSpriteEndHandler,!1):(this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED,this._endedHandler,!1),0!=this._loop&&(this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1),this._playbackResource.loop=!0)),this._playbackResource.play()},a._handleTagReady=function(){this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_READY,this._readyHandler,!1),this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_STALLED,this._stalledHandler,!1),this._handleSoundReady()},a._pause=function(){this._playbackResource.pause()},a._resume=function(){this._playbackResource.play()},a._updateVolume=function(){if(null!=this._playbackResource){var a=this._muted||createjs.Sound._masterMute?0:this._volume*createjs.Sound._masterVolume;a!=this._playbackResource.volume&&(this._playbackResource.volume=a)}},a._calculateCurrentPosition=function(){return 1e3*this._playbackResource.currentTime-this._startTime},a._updatePosition=function(){this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1),this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._handleSetPositionSeek,!1);try{this._playbackResource.currentTime=.001*(this._position+this._startTime)}catch(a){this._handleSetPositionSeek(null)}},a._handleSetPositionSeek=function(){null!=this._playbackResource&&(this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._handleSetPositionSeek,!1),this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1))},a._handleAudioSpriteLoop=function(){this._playbackResource.currentTime<=this._audioSpriteStopTime||(this._playbackResource.pause(),0==this._loop?this._handleSoundComplete(null):(this._position=0,this._loop--,this._playbackResource.currentTime=.001*this._startTime,this._paused||this._playbackResource.play(),this._sendEvent("loop")))},a._handleLoop=function(){0==this._loop&&(this._playbackResource.loop=!1,this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_SEEKED,this._loopHandler,!1))},a._updateStartTime=function(){this._audioSpriteStopTime=.001*(this._startTime+this._duration),this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED,this._endedHandler,!1),this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE,this._audioSpriteEndHandler,!1))},a._updateDuration=function(){this._audioSpriteStopTime=.001*(this._startTime+this._duration),this.playState==createjs.Sound.PLAY_SUCCEEDED&&(this._playbackResource.removeEventListener(createjs.HTMLAudioPlugin._AUDIO_ENDED,this._endedHandler,!1),this._playbackResource.addEventListener(createjs.HTMLAudioPlugin._TIME_UPDATE,this._audioSpriteEndHandler,!1))},a._setDurationFromSource=function(){this._duration=createjs.HTMLAudioTagPool.getDuration(this.src),this._playbackResource=null},createjs.HTMLAudioSoundInstance=createjs.promote(HTMLAudioSoundInstance,"AbstractSoundInstance")}(),this.createjs=this.createjs||{},function(){"use strict";function HTMLAudioPlugin(){this.AbstractPlugin_constructor(),this.defaultNumChannels=2,this._capabilities=b._capabilities,this._loaderClass=createjs.SoundLoader,this._soundInstanceClass=createjs.HTMLAudioSoundInstance}var a=createjs.extend(HTMLAudioPlugin,createjs.AbstractPlugin),b=HTMLAudioPlugin;b.MAX_INSTANCES=30,b._AUDIO_READY="canplaythrough",b._AUDIO_ENDED="ended",b._AUDIO_SEEKED="seeked",b._AUDIO_STALLED="stalled",b._TIME_UPDATE="timeupdate",b._capabilities=null,b.isSupported=function(){return b._generateCapabilities(),null!=b._capabilities},b._generateCapabilities=function(){if(null==b._capabilities){var a=document.createElement("audio");if(null==a.canPlayType)return null;b._capabilities={panning:!1,volume:!0,tracks:-1};for(var c=createjs.Sound.SUPPORTED_EXTENSIONS,d=createjs.Sound.EXTENSION_MAP,e=0,f=c.length;f>e;e++){var g=c[e],h=d[g]||g;b._capabilities[g]="no"!=a.canPlayType("audio/"+g)&&""!=a.canPlayType("audio/"+g)||"no"!=a.canPlayType("audio/"+h)&&""!=a.canPlayType("audio/"+h)}}},a.register=function(a){var b=createjs.HTMLAudioTagPool.get(a.src),c=this.AbstractPlugin_register(a);return c.setTag(b),c},a.removeSound=function(a){this.AbstractPlugin_removeSound(a),createjs.HTMLAudioTagPool.remove(a)},a.create=function(a,b,c){var d=this.AbstractPlugin_create(a,b,c);return d.setPlaybackResource(null),d},a.toString=function(){return"[HTMLAudioPlugin]"},a.setVolume=a.getVolume=a.setMute=null,createjs.HTMLAudioPlugin=createjs.promote(HTMLAudioPlugin,"AbstractPlugin")}();

H5P.SoundJS = this.createjs.Sound;

this.createjs = old || this.createjs;
;
var H5P = H5P || {};
H5P.SingleChoiceSet = H5P.SingleChoiceSet || {};

H5P.SingleChoiceSet.StopWatch = (function () {
  /**
   * @class {H5P.SingleChoiceSet.StopWatch}
   * @constructor
   */
  function StopWatch() {
    /**
     * @property {number} duration in ms
     */
    this.duration = 0;
  }

  /**
   * Starts the stop watch
   *
   * @public
   * @return {H5P.SingleChoiceSet.StopWatch}
   */
  StopWatch.prototype.start = function () {
    /**
     * @property {number}
     */
    this.startTime = Date.now();
    return this;
  };

  /**
   * Stops the stopwatch, and returns the duration in seconds.
   *
   * @public
   * @return {number}
   */
  StopWatch.prototype.stop = function () {
    this.duration = this.duration + Date.now() - this.startTime;
    return this.passedTime();
  };

  /**
   * Sets the duration to 0
   *
   * @public
   */
  StopWatch.prototype.reset = function () {
    this.duration = 0;
  };

  /**
   * Returns the passed time in seconds
   *
   * @public
   * @return {number}
   */
  StopWatch.prototype.passedTime = function () {
    return Math.round(this.duration / 10) / 100;
  };

  return StopWatch;
})();
;
H5P.SingleChoiceSet = H5P.SingleChoiceSet || {};

H5P.SingleChoiceSet.SoundEffects = (function () {
  var isDefined = false;

  var SoundEffects = {
    types: [
      'positive-short',
      'negative-short'
    ]
  };

  /**
   * Setup defined sounds
   *
   * @param {string} libraryPath
   * @return {boolean} True if setup was successfull, otherwise false
   */
  SoundEffects.setup = function (libraryPath) {
    if (isDefined || !H5P.SoundJS.initializeDefaultPlugins()) {
      return false;
    }

    H5P.SoundJS.alternateExtensions = ['mp3'];
    for (var i = 0; i < SoundEffects.types.length; i++) {
      var type = SoundEffects.types[i];
      H5P.SoundJS.registerSound(libraryPath + 'sounds/' + type + '.ogg', type);
    }
    isDefined = true;

    return true;
  };

  /**
   * Play a sound
   *
   * @param  {string} type  Name of the sound as defined in [SoundEffects.types]{@link H5P.SoundEffects.SoundEffects#types}
   * @param  {number} delay Delay in milliseconds
   */
  SoundEffects.play = function (type, delay) {
    H5P.SoundJS.play(type, H5P.SoundJS.INTERRUPT_NONE, (delay || 0));
  };

  return SoundEffects;
})();
;
var H5P = H5P || {};
H5P.SingleChoiceSet = H5P.SingleChoiceSet || {};

H5P.SingleChoiceSet.XApiEventBuilder = (function ($, EventDispatcher) {
  /**
   * @typedef {object} LocalizedString
   * @property {string} en-US
   */

  /**
   * @class {H5P.SingleChoiceSet.XApiEventDefinitionBuilder}
   * @constructor
   */
  function XApiEventDefinitionBuilder() {
    EventDispatcher.call(this);
    /**
     * @property {object} attributes
     * @property {string} attributes.name
     * @property {string} attributes.description
     * @property {string} attributes.interactionType
     * @property {string} attributes.correctResponsesPattern
     * @property {object} attributes.optional
     */
    this.attributes = {};
  }

  XApiEventDefinitionBuilder.prototype = Object.create(EventDispatcher.prototype);
  XApiEventDefinitionBuilder.prototype.constructor = XApiEventDefinitionBuilder;


  /**
   * Sets name
   * @param {string} name
   * @return {XApiEventDefinitionBuilder}
   */
  XApiEventDefinitionBuilder.prototype.name = function (name) {
    this.attributes.name = name;
    return this;
  };

  /**
   * Question text and any additional information to generate the report.
   * @param {string} description
   * @return {XApiEventDefinitionBuilder}
   */
  XApiEventDefinitionBuilder.prototype.description = function (description) {
    this.attributes.description = description;
    return this;
  };

  /**
   * Type of the interaction.
   * @param {string} interactionType
   * @see {@link https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#interaction-types|xAPI Spec}
   * @return {XApiEventDefinitionBuilder}
   */
  XApiEventDefinitionBuilder.prototype.interactionType = function (interactionType) {
    this.attributes.interactionType = interactionType;
    return this;
  };

  /**
   * A pattern for determining the correct answers of the interaction
   * @param {string[]} correctResponsesPattern
   * @see {@link https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#response-patterns|xAPI Spec}
   * @return {XApiEventDefinitionBuilder}
   */
  XApiEventDefinitionBuilder.prototype.correctResponsesPattern = function (correctResponsesPattern) {
    this.attributes.correctResponsesPattern = correctResponsesPattern;
    return this;
  };

  /**
   * Sets optional attributes
   * @param {object} optional Can have one of the following configuration objects: choices, scale, source, target, steps
   * @return {XApiEventDefinitionBuilder}
   */
  XApiEventDefinitionBuilder.prototype.optional = function (optional) {
    this.attributes.optional = optional;
    return this;
  };

  /**
   * @return {object}
   */
  XApiEventDefinitionBuilder.prototype.build = function () {
    var definition = {};

    // sets attributes
    setAttribute(definition, 'name', localizeToEnUS(this.attributes.name));
    setAttribute(definition, 'description', localizeToEnUS(this.attributes.description));
    setAttribute(definition, 'interactionType', this.attributes.interactionType);
    setAttribute(definition, 'correctResponsesPattern', this.attributes.correctResponsesPattern);
    setAttribute(definition, 'type', 'http://adlnet.gov/expapi/activities/cmi.interaction');

    // adds the optional object to the definition
    if (this.attributes.optional) {
      $.extend(definition, this.attributes.optional);
    }

    return definition;
  };

  // -----------------------------------------------------

  /**
   *
   * @constructor
   */
  function XApiEventResultBuilder() {
    EventDispatcher.call(this);
    /**
     * @property {object} attributes
     * @property {string} attributes.completion
     * @property {boolean} attributes.success
     * @property {boolean} attributes.response
     * @property {number} attributes.rawScore
     * @property {number} attributes.maxScore
     */
    this.attributes = {};
  }

  XApiEventResultBuilder.prototype = Object.create(EventDispatcher.prototype);
  XApiEventResultBuilder.prototype.constructor = XApiEventResultBuilder;

  /**
   * @param {boolean} completion
   * @return {XApiEventResultBuilder}
   */
  XApiEventResultBuilder.prototype.completion = function (completion) {
    this.attributes.completion = completion;
    return this;
  };

  /**
   * @param {boolean} success
   * @return {XApiEventResultBuilder}
   */
  XApiEventResultBuilder.prototype.success = function (success) {
    this.attributes.success = success;
    return this;
  };

  /**
   * @param {number} duration The duraction in seconds
   * @return {XApiEventResultBuilder}
   */
  XApiEventResultBuilder.prototype.duration = function (duration) {
    this.attributes.duration = duration;
    return this;
  };

  /**
   * Sets response
   * @param {string|string[]} response
   * @return {XApiEventResultBuilder}
   */
  XApiEventResultBuilder.prototype.response = function (response) {
    this.attributes.response = (typeof response === 'string') ? response : response.join('[,]');
    return this;
  };

  /**
   * Sets the score, and max score
   * @param {number} score
   * @param {number} maxScore
   * @return {XApiEventResultBuilder}
   */
  XApiEventResultBuilder.prototype.score = function (score, maxScore) {
    this.attributes.rawScore = score;
    this.attributes.maxScore = maxScore;
    return this;
  };

  /**
   * Builds the result object
   * @return {object}
   */
  XApiEventResultBuilder.prototype.build = function () {
    var result = {};

    setAttribute(result, 'response', this.attributes.response);
    setAttribute(result, 'completion', this.attributes.completion);
    setAttribute(result, 'success', this.attributes.success);

    if (isDefined(this.attributes.duration)) {
      setAttribute(result, 'duration','PT' +  this.attributes.duration + 'S');
    }

    // sets score
    if (isDefined(this.attributes.rawScore)) {
      result.score = {};
      setAttribute(result.score, 'raw', this.attributes.rawScore);

      if (isDefined(this.attributes.maxScore) && this.attributes.maxScore > 0) {
        setAttribute(result.score, 'min', 0);
        setAttribute(result.score, 'max', this.attributes.maxScore);
        setAttribute(result.score, 'min', 0);
        setAttribute(result.score, 'scaled', Math.round(this.attributes.rawScore / this.attributes.maxScore * 10000) / 10000);
      }
    }

    return result;
  };

  // -----------------------------------------------------

  /**
   * @class {H5P.SingleChoiceSet.XApiEventBuilder}
   */
  function XApiEventBuilder() {
    EventDispatcher.call(this);
    /**
     * @property {object} attributes
     * @property {string} attributes.contentId
     * @property {string} attributes.subContentId
     */
    this.attributes = {};
  }

  XApiEventBuilder.prototype = Object.create(EventDispatcher.prototype);
  XApiEventBuilder.prototype.constructor = XApiEventBuilder;


  /**
   * @param {object} verb
   *
   * @public
   * @return {H5P.SingleChoiceSet.XApiEventBuilder}
   */
  XApiEventBuilder.prototype.verb = function (verb) {
    this.attributes.verb = verb;
    return this;
  };

  /**
   * @param {string} name
   * @param {string} mbox
   * @param {string} objectType
   *
   * @public
   * @return {H5P.SingleChoiceSet.XApiEventBuilder}
   */
  XApiEventBuilder.prototype.actor = function (name, mbox, objectType) {
    this.attributes.actor = {
      name: name,
      mbox: mbox,
      objectType: objectType
    };

    return this;
  };

  /**
   * Sets contentId
   * @param {string} contentId
   * @param {string} [subContentId]
   * @return {H5P.SingleChoiceSet.XApiEventBuilder}
   */
  XApiEventBuilder.prototype.contentId = function (contentId, subContentId) {
    this.attributes.contentId = contentId;
    this.attributes.subContentId = subContentId;
    return this;
  };

  /**
   * Sets parent in context
   *
   * @param {string} parentContentId
   * @param {string} [parentSubContentId]
   * @return {H5P.SingleChoiceSet.XApiEventBuilder}
   */
  XApiEventBuilder.prototype.context = function (parentContentId, parentSubContentId) {
    this.attributes.parentContentId = parentContentId;
    this.attributes.parentSubContentId = parentSubContentId;
    return this;
  };

  /**
   * @param {object} result
   *
   * @public
   * @return {H5P.SingleChoiceSet.XApiEventBuilder}
   */
  XApiEventBuilder.prototype.result = function (result) {
    this.attributes.result = result;
    return this;
  };

  /**
   * @param {object} objectDefinition
   *
   * @public
   * @return {H5P.SingleChoiceSet.XApiEventBuilder}
   */
  XApiEventBuilder.prototype.objectDefinition = function (objectDefinition) {
    this.attributes.objectDefinition = objectDefinition;
    return this;
  };

  /**
   * Returns the buildt event
   * @public
   * @return {H5P.XAPIEvent}
   */
  XApiEventBuilder.prototype.build = function () {
    var event = new H5P.XAPIEvent();

    event.setActor();
    event.setVerb(this.attributes.verb);

    // sets context
    if (this.attributes.parentContentId || this.attributes.parentSubContentId) {
      event.data.statement.context = {
        'contextActivities': {
          'parent': [
            {
              'id': getContentXAPIId(this.attributes.parentContentId, this.attributes.parentSubContentId),
              'objectType': "Activity"
            }
          ]
        }
      };
    }

    event.data.statement.object = {
      'id': getContentXAPIId(this.attributes.contentId, this.attributes.subContentId),
      'objectType': 'Activity'
    };

    setAttribute(event.data, 'actor', this.attributes.actor);
    setAttribute(event.data.statement, 'result', this.attributes.result);
    setAttribute(event.data.statement.object, 'definition', this.attributes.objectDefinition);

    // sets h5p specific attributes
    if (event.data.statement.object.definition && (this.attributes.contentId || this.attributes.subContentId)) {
      var extensions = event.data.statement.object.definition.extensions = {};
      setAttribute(extensions, 'http://h5p.org/x-api/h5p-local-content-id', this.attributes.contentId);
      setAttribute(extensions, 'http://h5p.org/x-api/h5p-subContentId', this.attributes.subContentId);
    }

    return event;
  };

  /**
   * Creates a Localized String object for en-US
   *
   * @param str
   * @return {LocalizedString}
   */
  var localizeToEnUS = function (str) {
    if (str != undefined) {
      return {
        'en-US': cleanString(str)
      };
    }
  };

  /**
   * Generates an id for the content
   * @param {string} contentId
   * @param {string} [subContentId]
   *
   * @see {@link https://github.com/h5p/h5p-php-library/blob/master/js/h5p-x-api-event.js#L240-L249}
   * @return {string}
   */
  var getContentXAPIId = function (contentId, subContentId) {
    const cid = 'cid-' + contentId;
    if (contentId && H5PIntegration && H5PIntegration.contents && H5PIntegration.contents[cid]) {
      var id =  H5PIntegration.contents[cid].url;

      if (subContentId) {
        id += '?subContentId=' +  subContentId;
      }

      return id;
    }
  };

  /**
   * Removes html elements from string
   *
   * @param {string} str
   * @return {string}
   */
  var cleanString = function (str) {
    return $('<div>' + str + '</div>').text().trim();
  };

  var isDefined = function (val) {
    return typeof val !== 'undefined';
  };

  function setAttribute(obj, key, value, required) {
    if (isDefined(value)) {
      obj[key] = value;
    }
    else if (required) {
      console.error("xApiEventBuilder: No value for [" + key + "] in", obj);
    }
  }

  /**
   * Creates a new XApiEventBuilder
   *
   * @public
   * @static
   * @return {H5P.SingleChoiceSet.XApiEventBuilder}
   */
  XApiEventBuilder.create = function () {
    return new XApiEventBuilder();
  };

  /**
   * Creates a new XApiEventDefinitionBuilder
   *
   * @public
   * @static
   * @return {XApiEventDefinitionBuilder}
   */
  XApiEventBuilder.createDefinition = function () {
    return new XApiEventDefinitionBuilder();
  };

  /**
   * Creates a new XApiEventDefinitionBuilder
   *
   * @public
   * @static
   * @return {XApiEventResultBuilder}
   */
  XApiEventBuilder.createResult = function () {
    return new XApiEventResultBuilder();
  };

  /**
   * Returns choice to be used with 'cmi.interaction' for Activity of type 'choice'
   *
   * @param {string} id
   * @param {string} description
   *
   * @public
   * @static
   * @see {@link https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#choice|xAPI-Spec}
   * @return {object}
   */
  XApiEventBuilder.createChoice = function (id, description) {
    return {
      id: id,
      description: localizeToEnUS(description)
    };
  };

  /**
   * Takes an array of correct ids, and joins them to a 'correct response pattern'
   *
   * @param {string[]} ids
   *
   * @public
   * @static
   * @see {@link https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Data.md#choice|xAPI-Spec}
   * @return {string}
   */
  XApiEventBuilder.createCorrectResponsePattern = function (ids) {
    return ids.join('[,]');
  };

  /**
   * Interaction types
   *
   * @readonly
   * @enum {String}
   */
  XApiEventBuilder.interactionTypes = {
    CHOICE: 'choice',
    COMPOUND: 'compound',
    FILL_IN: 'fill-in',
    MATCHING: 'matching',
    TRUE_FALSE: 'true-false'
  };

  /**
   * Verbs
   *
   * @readonly
   * @enum {String}
   */
  XApiEventBuilder.verbs = {
    ANSWERED: 'answered'
  };

  return XApiEventBuilder;
})(H5P.jQuery, H5P.EventDispatcher);
;
var H5P = H5P || {};
H5P.SingleChoiceSet = H5P.SingleChoiceSet || {};
/**
 * SingleChoiceResultSlide - Represents the result slide
 */
H5P.SingleChoiceSet.ResultSlide = (function ($, EventDispatcher) {

  /**
   * @constructor
   * @param {number} maxscore Max score
   */
  function ResultSlide(maxscore) {
    EventDispatcher.call(this);

    this.$feedbackContainer = $('<div>', {
      'class': 'h5p-sc-feedback-container',
      'tabindex': '-1'
    });

    this.$buttonContainer = $('<div/>', {
      'class': 'h5p-sc-button-container'
    });

    var $resultContainer = $('<div/>', {
      'class': 'h5p-sc-result-container'
    }).append(this.$feedbackContainer)
      .append(this.$buttonContainer);

    this.$resultSlide = $('<div>', {
      'class': 'h5p-sc-slide h5p-sc-set-results',
      'css': {left: (maxscore * 100) + '%'}
    }).append($resultContainer);
  }

  // inherits from EventDispatchers prototype
  ResultSlide.prototype = Object.create(EventDispatcher.prototype);

  // set the constructor
  ResultSlide.prototype.constructor = ResultSlide;

  /**
   * Focus feedback container.
   */
  ResultSlide.prototype.focusScore = function () {
    this.$feedbackContainer.focus();
  };

  /**
   * Append the resultslide to a container
   *
   * @param  {jQuery} $container The container
   * @return {jQuery}            This dom element
   */
  ResultSlide.prototype.appendTo = function ($container) {
    this.$resultSlide.appendTo($container);
    return this.$resultSlide;
  };

  return ResultSlide;
})(H5P.jQuery, H5P.EventDispatcher);
;
var H5P = H5P || {};
H5P.SingleChoiceSet = H5P.SingleChoiceSet || {};

H5P.SingleChoiceSet.SolutionView = (function ($, EventDispatcher) {
  /**
   * Constructor function.
   */
  function SolutionView(id, choices, l10n) {
    EventDispatcher.call(this);
    var self = this;
    self.id = id;
    this.choices = choices;
    self.l10n = l10n;

    this.$solutionView = $('<div>', {
      'class': 'h5p-sc-solution-view'
    });

    // Add header
    this.$header = $('<div>', {
      'class': 'h5p-sc-solution-view-header'
    }).appendTo(this.$solutionView);

    this.$title = $('<div>', {
      'class': 'h5p-sc-solution-view-title',
      'html': l10n.solutionViewTitle,
      'tabindex': '-1'
    });
    this.$title = this.addAriaPunctuation(this.$title);
    this.$header.append(this.$title);

    // Close solution view button
    $('<button>', {
      'role': 'button',
      'aria-label': l10n.closeButtonLabel + '.',
      'class': 'h5p-joubelui-button h5p-sc-close-solution-view',
      'click': function () {
        self.hide();
      }
    }).appendTo(this.$header);

    self.populate();
  }

  /**
   * Will append the solution view to a container DOM
   * @param  {jQuery} $container The DOM object to append to
   */
  SolutionView.prototype.appendTo = function ($container) {
    this.$solutionView.appendTo($container);
  };

  /**
   * Shows the solution view
   */
  SolutionView.prototype.show = function () {
    var self = this;
    self.$solutionView.addClass('visible');
    self.$title.focus();

    $(document).on('keyup.solutionview', function (event) {
      if (event.keyCode === 27) { // Escape
        self.hide();
        $(document).off('keyup.solutionview');
      }
    });
  };

  /**
   * Hides the solution view
   */
  SolutionView.prototype.hide = function () {
    this.$solutionView.removeClass('visible');
    this.trigger('hide', this);
  };


  /**
   * Populates the solution view
   */
  SolutionView.prototype.populate = function () {
    var self = this;
    self.$choices = $('<dl>', {
      'class': 'h5p-sc-solution-choices',
      'tabindex': -1,
    });

    this.choices.forEach(function (choice, index) {
      if (choice.question && choice.answers && choice.answers.length !== 0) {
        var $question = self.addAriaPunctuation($('<dt>', {
          'class': 'h5p-sc-solution-question',
          html: '<span class="h5p-hidden-read">' + self.l10n.solutionListQuestionNumber.replace(':num', index + 1) + '</span>' + choice.question
        }));

        self.$choices.append($question);

        var $answer = self.addAriaPunctuation($('<dd>', {
          'class': 'h5p-sc-solution-answer',
          html: choice.answers[0]
        }));

        self.$choices.append($answer);
      }
    });
    self.$choices.appendTo(this.$solutionView);
  };

  /**
   * If a jQuery elements text is missing punctuation, add an aria-label to the element
   * containing the text, and adding an extra "period"-symbol at the end.
   *
   * @param {jQuery} $element A jQuery-element
   * @returns {jQuery} The mutated jQuery-element
   */
  SolutionView.prototype.addAriaPunctuation = function ($element) {
    var text = $element.text().trim();

    if (!this.hasPunctuation(text)) {
      $element.attr('aria-label', text + '.');
    }

    return $element;
  };

  /**
   * Checks if a string ends with punctuation
   *
   * @private
   * @param {String} text Input string
   */
  SolutionView.prototype.hasPunctuation = function (text) {
    return /[,.?!]$/.test(text);
  };

  return SolutionView;
})(H5P.jQuery, H5P.EventDispatcher);
;
var H5P = H5P || {};
H5P.SingleChoiceSet = H5P.SingleChoiceSet || {};

H5P.SingleChoiceSet.Alternative = (function ($, EventDispatcher) {

  /**
   * @constructor
   *
   * @param {object} options Options for the alternative
   */
  function Alternative(options) {
    EventDispatcher.call(this);
    var self = this;

    this.options = options;

    var triggerAlternativeSelected = function (event) {
      self.trigger('alternative-selected', {
        correct: self.options.correct,
        $element: self.$alternative,
        answerIndex: self.options.answerIndex
      });

      event.preventDefault();
    };

    this.$alternative = $('<li>', {
      'class': 'h5p-sc-alternative h5p-sc-is-' + (this.options.correct ? 'correct' : 'wrong'),
      'role': 'button',
      'tabindex': -1,
      'on': {
        'keydown': function (event) {
          switch (event.which) {
            case 13: // Enter
            case 32: // Space
              // Answer question
              triggerAlternativeSelected(event);
              break;

            case 35: // End button
              // Go to previous Option
              self.trigger('lastOption', event);
              event.preventDefault();
              break;

            case 36: // Home button
              // Go to previous Option
              self.trigger('firstOption', event);
              event.preventDefault();
              break;

            case 37: // Left Arrow
            case 38: // Up Arrow
              // Go to previous Option
              self.trigger('previousOption', event);
              event.preventDefault();
              break;

            case 39: // Right Arrow
            case 40: // Down Arrow
              // Go to next Option
              self.trigger('nextOption', event);
              event.preventDefault();
              break;
          }
        }
      },
      'focus': function (event) {
        self.trigger('focus', event);
      },
      'click': triggerAlternativeSelected
    });

    this.$alternative.append($('<div>', {
      'class': 'h5p-sc-progressbar'
    }));

    this.$alternative.append($('<div>', {
      'class': 'h5p-sc-label',
      'html': this.options.text
    }));

    this.$alternative.append($('<div>', {
      'class': 'h5p-sc-status'
    }));
  }

  Alternative.prototype = Object.create(EventDispatcher.prototype);
  Alternative.prototype.constructor = Alternative;

  /**
   * Is this alternative the correct one?
   *
   * @return {boolean}  Correct or not?
   */
  Alternative.prototype.isCorrect = function () {
    return this.options.correct;
  };

  /**
   * Move focus to this option.
   */
  Alternative.prototype.focus = function () {
    this.$alternative.focus();
  };

  /**
   * Makes it possible to tab your way to this option.
   */
  Alternative.prototype.tabbable = function () {
    this.$alternative.attr('tabindex', 0);
  };

  /**
   * Make sure it's NOT possible to tab your way to this option.
   */
  Alternative.prototype.notTabbable = function () {
    this.$alternative.attr('tabindex', -1);
  };

  /**
   * Append the alternative to a DOM container
   *
   * @param  {jQuery} $container The Dom element to append to
   * @return {jQuery}            This dom element
   */
  Alternative.prototype.appendTo = function ($container) {
    $container.append(this.$alternative);
    return this.$alternative;
  };

  return Alternative;

})(H5P.jQuery, H5P.EventDispatcher);
;
var H5P = H5P || {};
H5P.SingleChoiceSet = H5P.SingleChoiceSet || {};

H5P.SingleChoiceSet.SingleChoice = (function ($, EventDispatcher, Alternative) {
  /**
   * Constructor function.
   */
  function SingleChoice(options, index, id) {
    EventDispatcher.call(this);
    // Extend defaults with provided options
    this.options = $.extend(true, {}, {
      question: '',
      answers: []
    }, options);
    // Keep provided id.
    this.index = index;
    this.id = id;
    this.answered = false;

    for (var i = 0; i < this.options.answers.length; i++) {
      this.options.answers[i] = {
        text: this.options.answers[i],
        correct: i === 0,
        answerIndex: i
      };
    }
    // Randomize alternatives
    this.options.answers = H5P.shuffleArray(this.options.answers);
  }

  SingleChoice.prototype = Object.create(EventDispatcher.prototype);
  SingleChoice.prototype.constructor = SingleChoice;

  /**
   * appendTo function invoked to append SingleChoice to container
   *
   * @param {jQuery} $container
   * @param {boolean} isCurrent Current slide we are on
   */
  SingleChoice.prototype.appendTo = function ($container, isCurrent) {
    var self = this;
    this.$container = $container;

    // Index of the currently focused option.
    var focusedOption;

    this.$choice = $('<div>', {
      'class': 'h5p-sc-slide h5p-sc' + (isCurrent ? ' h5p-sc-current-slide' : ''),
      css: {'left': (self.index * 100) + '%'}
    });

    var questionId = 'single-choice-' + self.id + '-question-' + self.index;

    this.$choice.append($('<div>', {
      'id': questionId,
      'class': 'h5p-sc-question',
      'html': this.options.question
    }));

    var $alternatives = $('<ul>', {
      'class': 'h5p-sc-alternatives',
      'role': 'application',
      'aria-labelledby': questionId
    });

    /**
     * List of Alternatives
     *
     * @type {Alternative[]}
     */
    this.alternatives = self.options.answers.map(function (opts) {
      return new Alternative(opts);
    });

    /**
     * Handles click on an alternative
     */
    var handleAlternativeSelected = function (event) {
      var $element = event.data.$element;
      var correct = event.data.correct;
      var answerIndex = event.data.answerIndex;

      if ($element.parent().hasClass('h5p-sc-selected')) {
        return;
      }

      self.trigger('alternative-selected', {
        correct: correct,
        index: self.index,
        answerIndex: answerIndex
      });

      H5P.Transition.onTransitionEnd($element.find('.h5p-sc-progressbar'), function () {
        $element.addClass('h5p-sc-drummed');
        self.showResult(correct, answerIndex);
      }, 700);

      $element.addClass('h5p-sc-selected').parent().addClass('h5p-sc-selected');

      // indicate that this question is anwered
      this.setAnswered(true);
    };

    /**
     * Handles focusing one of the options, making the rest non-tabbable.
     * @private
     */
    var handleFocus = function (answer, index) {
      // Keep track of currently focused option
      focusedOption = index;

      // remove tabbable all alternatives
      self.alternatives.forEach(function (alternative) {
        alternative.notTabbable();
      });
      answer.tabbable();
    };

    /**
     * Handles moving the focus from the current option to the previous option.
     * @private
     */
    var handlePreviousOption = function () {
      if (focusedOption === 0) {
        // wrap around to last
        this.focusOnAlternative(self.alternatives.length - 1);
      }
      else {
        this.focusOnAlternative(focusedOption - 1);
      }
    };

    /**
     * Handles moving the focus from the current option to the next option.
     * @private
     */
    var handleNextOption = function () {
      if ((focusedOption === this.alternatives.length - 1)) {
        // wrap around to first
        this.focusOnAlternative(0);
      }
      else {
        this.focusOnAlternative(focusedOption + 1);
      }
    };

    /**
     * Handles moving the focus to the first option
     * @private
     */
    var handleFirstOption = function () {
      this.focusOnAlternative(0);
    };

    /**
     * Handles moving the focus to the last option
     * @private
     */
    var handleLastOption = function () {
      this.focusOnAlternative(self.alternatives.length - 1);
    };

    for (var i = 0; i < this.alternatives.length; i++) {
      var alternative = this.alternatives[i];

      if (i === 0) {
        alternative.tabbable();
      }

      alternative.appendTo($alternatives);
      alternative.on('focus', handleFocus.bind(this, alternative, i), this);
      alternative.on('alternative-selected', handleAlternativeSelected, this);
      alternative.on('previousOption', handlePreviousOption, this);
      alternative.on('nextOption', handleNextOption, this);
      alternative.on('firstOption', handleFirstOption, this);
      alternative.on('lastOption', handleLastOption, this);

    }

    this.$choice.append($alternatives);
    $container.append(this.$choice);
    return this.$choice;
  };

  /**
   * Focus on an alternative by index
   *
   * @param {Number} index The index of the alternative to focus on
   */
  SingleChoice.prototype.focusOnAlternative = function (index) {
    if (!this.answered) {
      this.alternatives[index].focus();
    }
  };

  /**
   * Sets if the question was answered
   *
   * @param {Boolean} answered If this question was answered
   */
  SingleChoice.prototype.setAnswered = function (answered) {
    this.answered = answered;
  };

  /**
   * Reveals the result for a question
   *
   * @param  {boolean} correct True uf answer was correct, otherwise false
   * @param  {number} answerIndex Original index of answer
   */
  SingleChoice.prototype.showResult = function (correct, answerIndex) {
    var self = this;

    var $correctAlternative = self.$choice.find('.h5p-sc-is-correct');

    H5P.Transition.onTransitionEnd($correctAlternative, function () {
      self.trigger('finished', {
        correct: correct,
        index: self.index,
        answerIndex: answerIndex
      });
    }, 600);

    // Reveal corrects and wrong
    self.$choice.find('.h5p-sc-is-wrong').addClass('h5p-sc-reveal-wrong');
    $correctAlternative.addClass('h5p-sc-reveal-correct');
  };

  return SingleChoice;

})(H5P.jQuery, H5P.EventDispatcher, H5P.SingleChoiceSet.Alternative);
;
var H5P = H5P || {};

H5P.SingleChoiceSet = (function ($, UI, Question, SingleChoice, SolutionView, ResultSlide, SoundEffects, XApiEventBuilder, StopWatch) {
  /**
   * @constructor
   * @extends Question
   * @param {object} options Options for single choice set
   * @param {string} contentId H5P instance id
   * @param {Object} contentData H5P instance data
   */
  function SingleChoiceSet(options, contentId, contentData) {
    var self = this;

    // Extend defaults with provided options
    this.contentId = contentId;
    this.contentData = contentData;
    /**
     * The users input on the questions. Uses the same index as this.options.choices
     * @type {number[]}
     */
    this.userResponses = [];
    Question.call(this, 'single-choice-set');
    this.options = $.extend(true, {}, {
      choices: [],
      overallFeedback: [],
      behaviour: {
        autoContinue: true,
        timeoutCorrect: 2000,
        timeoutWrong: 3000,
        soundEffectsEnabled: true,
        enableRetry: true,
        enableSolutionsButton: true,
        passPercentage: 100
      }
    }, options);
    if (contentData && contentData.previousState !== undefined) {
      this.currentIndex = contentData.previousState.progress;
      this.results = contentData.previousState.answers;
      this.userResponses = contentData.previousState.userResponses !== undefined
        ? contentData.previousState.userResponses
        : [];
    }
    this.currentIndex = this.currentIndex || 0;
    this.results = this.results || {
      corrects: 0,
      wrongs: 0
    };

    if (!this.options.behaviour.autoContinue) {
      this.options.behaviour.timeoutCorrect = 0;
      this.options.behaviour.timeoutWrong = 0;
    }

    /**
     * @property {StopWatch[]} Stop watches for tracking duration of slides
     */
    this.stopWatches = [];
    this.startStopWatch(this.currentIndex);

    this.muted = (this.options.behaviour.soundEffectsEnabled === false);

    this.l10n = H5P.jQuery.extend({
      correctText: 'Correct!',
      incorrectText: 'Incorrect! Correct answer was: :text',
      nextButtonLabel: 'Next question',
      showSolutionButtonLabel: 'Show solution',
      retryButtonLabel: 'Retry',
      closeButtonLabel: 'Close',
      solutionViewTitle: 'Solution',
      slideOfTotal: 'Slide :num of :total',
      muteButtonLabel: "Mute feedback sound",
      scoreBarLabel: 'You got :num out of :total points',
      solutionListQuestionNumber: 'Question :num',
      a11yShowSolution: 'Show the solution. The task will be marked with its correct solution.',
      a11yRetry: 'Retry the task. Reset all responses and start the task over again.',
    }, options.l10n !== undefined ? options.l10n : {});

    this.$container = $('<div>', {
      'class': 'h5p-sc-set-wrapper navigatable' + (!this.options.behaviour.autoContinue ? ' next-button-mode' : '')
    });

    this.$slides = [];
    // An array containing the SingleChoice instances
    this.choices = [];

    /**
     * Keeps track of buttons that will be hidden
     * @type {Array}
     */
    self.buttonsToBeHidden = [];

    /**
     * The solution dialog
     * @type {SolutionView}
     */
    this.solutionView = new SolutionView(contentId, this.options.choices, this.l10n);

    this.$choices = $('<div>', {
      'class': 'h5p-sc-set h5p-sc-animate'
    });

    // sometimes an empty object is in the choices
    this.options.choices = this.options.choices.filter(function (choice) {
      return choice !== undefined && !!choice.answers;
    });

    var numQuestions = this.options.choices.length;

    // Create progressbar
    self.progressbar = UI.createProgressbar(numQuestions + 1, {
      progressText: this.l10n.slideOfTotal
    });
    self.progressbar.setProgress(this.currentIndex);

    for (var i = 0; i < this.options.choices.length; i++) {
      var choice = new SingleChoice(this.options.choices[i], i, this.contentId);
      choice.on('finished', this.handleQuestionFinished, this);
      choice.on('alternative-selected', this.handleAlternativeSelected, this);
      choice.appendTo(this.$choices, (i === this.currentIndex));
      this.choices.push(choice);
      this.$slides.push(choice.$choice);
    }

    this.resultSlide = new ResultSlide(this.options.choices.length);
    this.resultSlide.appendTo(this.$choices);
    this.resultSlide.on('retry', this.resetTask, this);
    this.resultSlide.on('view-solution', this.handleViewSolution, this);
    this.$slides.push(this.resultSlide.$resultSlide);
    this.on('resize', this.resize, this);

    // Use the correct starting slide
    this.recklessJump(this.currentIndex);

    if (this.options.choices.length === this.currentIndex) {
      // Make sure results slide is displayed
      this.resultSlide.$resultSlide.addClass('h5p-sc-current-slide');
      this.setScore(this.results.corrects, true);
    }

    if (!this.muted) {
      setTimeout(function () {
        SoundEffects.setup(self.getLibraryFilePath(''));
      }, 1);
    }

    /**
     * Override Question's hideButton function
     * to be able to hide buttons after delay
     *
     * @override
     * @param {string} id
     */
    this.superHideButton = self.hideButton;
    this.hideButton = (function () {
      return function (id) {

        if (!self.scoreTimeout) {
          return self.superHideButton(id);
        }

        self.buttonsToBeHidden.push(id);
        return this;
      };
    })();
  }

  SingleChoiceSet.prototype = Object.create(Question.prototype);
  SingleChoiceSet.prototype.constructor = SingleChoiceSet;

  /**
   * Set if a element is tabbable or not
   *
   * @param {jQuery} $element The element
   * @param {boolean} tabbable If element should be tabbable
   * @returns {jQuery} The element
   */
  SingleChoiceSet.prototype.setTabbable = function ($element, tabbable) {
    if ($element) {
      $element.attr('tabindex', tabbable ? 0 : -1);
    }
  };

  /**
   * Handle alternative selected, i.e play sound if sound effects are enabled
   *
   * @method handleAlternativeSelected
   * @param  {Object} event Event that was fired
   */
  SingleChoiceSet.prototype.handleAlternativeSelected = function (event) {
    var self = this;
    this.lastAnswerIsCorrect = event.data.correct;

    self.toggleNextButton(true);

    // Keep track of num correct/wrong answers
    this.results[this.lastAnswerIsCorrect ? 'corrects' : 'wrongs']++;

    self.triggerXAPI('interacted');

    // correct answer
    var correctAnswer = self.$choices.find('.h5p-sc-is-correct').text();

    // Announce by ARIA if answer is correct or incorrect
    var text = this.lastAnswerIsCorrect ? self.l10n.correctText : (self.l10n.incorrectText.replace(':text', correctAnswer));
    self.read(text);

    if (!this.muted) {
      // Can't play it after the transition end is received, since this is not
      // accepted on iPad. Therefore we are playing it here with a delay instead
      SoundEffects.play(this.lastAnswerIsCorrect ? 'positive-short' : 'negative-short', 700);
    }
  };

  /**
   * Handler invoked when question is done
   *
   * @param  {object} event An object containing a single boolean property: "correct".
   */
  SingleChoiceSet.prototype.handleQuestionFinished = function (event) {
    var self = this;

    var index = event.data.index;

    // saves user response
    var userResponse = self.userResponses[index] = event.data.answerIndex;

    // trigger answered event
    var duration = this.stopStopWatch(index);
    var xapiEvent = self.createXApiAnsweredEvent(self.options.choices[index], userResponse, duration);

    self.trigger(xapiEvent);

    self.continue();
  };

  /**
   * Setup auto continue
   */
  SingleChoiceSet.prototype.continue = function () {
    var self = this;

    if (!self.options.behaviour.autoContinue) {
      // Set focus to next button
      self.$nextButton.focus();
      return;
    }

    var timeout;
    var letsMove = function () {
      // Handle impatient users
      self.$container.off('click.impatient keydown.impatient');
      clearTimeout(timeout);
      self.next();
    };

    timeout = setTimeout(function () {
      letsMove();
    }, self.lastAnswerIsCorrect ? self.options.behaviour.timeoutCorrect : self.options.behaviour.timeoutWrong);

    self.onImpatientUser(letsMove);
  };

  /**
   * Listen to impatience
   * @param  {Function} action Callback
   */
  SingleChoiceSet.prototype.onImpatientUser = function (action) {
    this.$container.off('click.impatient keydown.impatient');

    this.$container.one('click.impatient', action);
    this.$container.one('keydown.impatient', function (event) {
      // If return, space or right arrow
      if ([13,32,39].indexOf(event.which)) {
        action();
      }
    });
  };

  /**
   * Go to next slide
   */
  SingleChoiceSet.prototype.next = function () {
    this.move(this.currentIndex + 1);
  };

  /**
   * Creates an xAPI answered event
   *
   * @param {object} question
   * @param {number} userAnswer
   * @param {number} duration
   *
   * @return {H5P.XAPIEvent}
   */
  SingleChoiceSet.prototype.createXApiAnsweredEvent = function (question, userAnswer, duration) {
    var self = this;
    var types = XApiEventBuilder.interactionTypes;

    // creates the definition object
    var definition = XApiEventBuilder.createDefinition()
      .interactionType(types.CHOICE)
      .description(question.question)
      .correctResponsesPattern(self.getXApiCorrectResponsePattern())
      .optional( self.getXApiChoices(question.answers))
      .build();

    // create the result object
    var result = XApiEventBuilder.createResult()
      .response(userAnswer.toString())
      .duration(duration)
      .score((userAnswer === 0) ? 1 : 0, 1)
      .completion(true)
      .success(userAnswer === 0)
      .build();

    return XApiEventBuilder.create()
      .verb(XApiEventBuilder.verbs.ANSWERED)
      .objectDefinition(definition)
      .context(self.contentId, self.subContentId)
      .contentId(self.contentId, question.subContentId)
      .result(result)
      .build();
  };

  /**
   * Returns the 'correct response pattern' for xApi
   *
   * @return {string[]}
   */
  SingleChoiceSet.prototype.getXApiCorrectResponsePattern = function () {
    return [XApiEventBuilder.createCorrectResponsePattern([(0).toString()])]; // is always '0' for SCS
  };

  /**
   * Returns the choices array for xApi statements
   *
   * @param {String[]} answers
   *
   * @return {{ choices: []}}
   */
  SingleChoiceSet.prototype.getXApiChoices = function (answers) {
    var choices = answers.map(function (answer, index) {
      return XApiEventBuilder.createChoice(index.toString(), answer);
    });

    return {
      choices: choices
    };
  };

  /**
   * Handles buttons that are queued for hiding
   */
  SingleChoiceSet.prototype.handleQueuedButtonChanges = function () {
    var self = this;

    if (self.buttonsToBeHidden.length) {
      self.buttonsToBeHidden.forEach(function (id) {
        self.superHideButton(id);
      });
    }
    self.buttonsToBeHidden = [];
  };

  /**
   * Set score and feedback
   *
   * @params {Number} score Number of correct answers
   */
  SingleChoiceSet.prototype.setScore = function (score, noXAPI) {
    var self = this;

    if (!self.choices.length) {
      return;
    }

    var feedbackText = determineOverallFeedback(self.options.overallFeedback , score / self.options.choices.length)
      .replace(':numcorrect', score)
      .replace(':maxscore', self.options.choices.length.toString());

    self.setFeedback(feedbackText, score, self.options.choices.length, self.l10n.scoreBarLabel);

    if (score === self.options.choices.length) {
      self.hideButton('try-again');
      self.hideButton('show-solution');
    }
    else {
      self.showButton('try-again');
      self.showButton('show-solution');
    }
    self.handleQueuedButtonChanges();
    self.scoreTimeout = undefined;

    if (!noXAPI) {
      self.triggerXAPIScored(score, self.options.choices.length, 'completed', true, (100 * score / self.options.choices.length) >= self.options.behaviour.passPercentage);
    }

    self.trigger('resize');
  };

  /**
   * Handler invoked when view solution is selected
   */
  SingleChoiceSet.prototype.handleViewSolution = function () {
    var self = this;

    var $tryAgainButton = $('.h5p-question-try-again', self.$container);
    var $showSolutionButton = $('.h5p-question-show-solution', self.$container);
    var buttons = [self.$muteButton, $tryAgainButton, $showSolutionButton];

    // remove tabbable for buttons in result view
    buttons.forEach(function (button) {
      self.setTabbable(button, false);
    });

    self.solutionView.on('hide', function () {
      // re-add tabbable for buttons in result view
      buttons.forEach(function (button) {
        self.setTabbable(button, true);
      });
      self.toggleAriaVisibility(true);
      // Focus on first button when closing solution view
      self.focusButton();
    });

    self.solutionView.show();
    self.toggleAriaVisibility(false);
  };

  /**
   * Toggle elements visibility to Assistive Technologies
   *
   * @param {boolean} enable Make elements visible
   */
  SingleChoiceSet.prototype.toggleAriaVisibility = function (enable) {
    var self = this;
    var ariaHidden = enable ? '' : 'true';
    if (self.$muteButton) {
      self.$muteButton.attr('aria-hidden', ariaHidden);
    }
    self.progressbar.$progressbar.attr('aria-hidden', ariaHidden);
    self.$choices.attr('aria-hidden', ariaHidden);
  };

  /**
   * Register DOM elements before they are attached.
   * Called from H5P.Question.
   */
  SingleChoiceSet.prototype.registerDomElements = function () {
    // Register task content area.
    this.setContent(this.createQuestion());

    // Register buttons with question.
    this.addButtons();

    // Insert feedback and buttons section on the result slide
    this.insertSectionAtElement('feedback', this.resultSlide.$feedbackContainer);
    this.insertSectionAtElement('scorebar', this.resultSlide.$feedbackContainer);
    this.insertSectionAtElement('buttons', this.resultSlide.$buttonContainer);

    // Question is finished
    if (this.options.choices.length === this.currentIndex) {
      this.trigger('question-finished');
    }

    this.trigger('resize');
  };

  /**
   * Add Buttons to question.
   */
  SingleChoiceSet.prototype.addButtons = function () {
    var self = this;

    if (this.options.behaviour.enableRetry) {
      this.addButton('try-again', this.l10n.retryButtonLabel, function () {
        self.resetTask();
      }, self.results.corrects !== self.options.choices.length, {
        'aria-label': this.l10n.a11yRetry,
      });
    }

    if (this.options.behaviour.enableSolutionsButton) {
      this.addButton('show-solution', this.l10n.showSolutionButtonLabel, function () {
        self.showSolutions();
      }, self.results.corrects !== self.options.choices.length, {
        'aria-label': this.l10n.a11yShowSolution,
      });
    }
  };

  /**
   * Create main content
   */
  SingleChoiceSet.prototype.createQuestion = function () {
    var self = this;

    self.progressbar.appendTo(self.$container);
    self.$container.append(self.$choices);

    function toggleMute(event) {
      var $button = $(event.target);
      event.preventDefault();
      self.muted = !self.muted;
      $button.attr('aria-pressed', self.muted);
    }

    // Keep this out of H5P.Question, since we are moving the button & feedback
    // region to the last slide
    if (!this.options.behaviour.autoContinue) {

      var handleNextClick = function () {
        if (self.$nextButton.attr('aria-disabled') !== 'true') {
          self.next();
        }
      };

      self.$nextButton = UI.createButton({
        'class': 'h5p-ssc-next-button',
        'aria-label': self.l10n.nextButtonLabel,
        click: handleNextClick,
        keydown: function (event) {
          switch (event.which) {
            case 13: // Enter
            case 32: // Space
              handleNextClick();
              event.preventDefault();
          }
        },
        appendTo: self.$container
      });
      self.toggleNextButton(false);
    }

    if (self.options.behaviour.soundEffectsEnabled) {
      self.$muteButton = $('<div>', {
        'class': 'h5p-sc-sound-control',
        'tabindex': 0,
        'role': 'button',
        'aria-label': self.l10n.muteButtonLabel,
        'aria-pressed': false,
        'on': {
          'keydown': function (event) {
            switch (event.which) {
              case 13: // Enter
              case 32: // Space
                toggleMute(event);
                break;
            }
          }
        },
        'click': toggleMute,
        appendTo: self.$container
      });
    }

    // Append solution view - hidden by default:
    self.solutionView.appendTo(self.$container);

    self.resize();

    // Hide all other slides than the current one:
    self.$container.addClass('initialized');

    return self.$container;
  };

  /**
   * Resize if something outside resizes
   */
  SingleChoiceSet.prototype.resize = function () {
    var self = this;
    var maxHeight = 0;
    self.choices.forEach(function (choice) {
      var choiceHeight = choice.$choice.outerHeight();
      maxHeight = choiceHeight > maxHeight ? choiceHeight : maxHeight;
    });

    // Set minimum height for choices
    self.$choices.css({minHeight: maxHeight + 'px'});
  };

  /**
   * Disable/enable the next button
   * @param  {boolean} enable
   */
  SingleChoiceSet.prototype.toggleNextButton = function (enable) {
    if (this.$nextButton) {
      this.$nextButton.attr('aria-disabled', !enable);
    }
  };

  /**
   * Will jump to the given slide without any though to animations,
   * current slide etc.
   *
   * @public
   */
  SingleChoiceSet.prototype.recklessJump = function (index) {
    var tX = 'translateX(' + (-index * 100) + '%)';
    this.$choices.css({
      '-webkit-transform': tX,
      '-moz-transform': tX,
      '-ms-transform': tX,
      'transform': tX
    });
    this.progressbar.setProgress(index + 1);
  };

  /**
   * Move to slide n
   * @param  {number} index The slide number    to move to
   */
  SingleChoiceSet.prototype.move = function (index) {
    var self = this;
    if (index === this.currentIndex || index > self.$slides.length-1) {
      return;
    }

    var $previousSlide = self.$slides[self.currentIndex];
    var $currentChoice = self.choices[index];
    var $currentSlide = self.$slides[index];
    var isResultSlide = (index >= self.choices.length);

    self.toggleNextButton(false);

    H5P.Transition.onTransitionEnd(self.$choices, function () {
      $previousSlide.removeClass('h5p-sc-current-slide');

      // on slides with answers focus on first alternative
      if (!isResultSlide) {
        $currentChoice.focusOnAlternative(0);
      }
      // on last slide, focus on try again button
      else {
        self.resultSlide.focusScore();
      }
    }, 600);

    // if should show result slide
    if (isResultSlide) {
      self.setScore(self.results.corrects);
    }

    self.$container.toggleClass('navigatable', !isResultSlide);

    // start timing of new slide
    this.startStopWatch(index);

    // move to slide
    $currentSlide.addClass('h5p-sc-current-slide');
    self.recklessJump(index);

    self.currentIndex = index;
  };

  /**
   * Starts a stopwatch for indexed slide
   *
   * @param {number} index
   */
  SingleChoiceSet.prototype.startStopWatch = function (index) {
    this.stopWatches[index] = this.stopWatches[index] || new StopWatch();
    this.stopWatches[index].start();
  };

  /**
   * Stops a stopwatch for indexed slide
   *
   * @param {number} index
   */
  SingleChoiceSet.prototype.stopStopWatch = function (index) {
    if (this.stopWatches[index]) {
      this.stopWatches[index].stop();
    }
  };

  /**
   * Returns the passed time in seconds of a stopwatch on an indexed slide,
   * or 0 if not existing
   *
   * @param {number} index
   * @return {number}
   */
  SingleChoiceSet.prototype.timePassedInStopWatch = function (index) {
    if (this.stopWatches[index] !== undefined) {
      return this.stopWatches[index].passedTime();
    }
    else {
      // if not created, return no passed time,
      return 0;
    }
  };

  /**
   * Returns the time the user has spent on all questions so far
   *
   * @return {number}
   */
  SingleChoiceSet.prototype.getTotalPassedTime = function () {
    return this.stopWatches
      .filter(function (watch) {
        return watch != undefined;
      })
      .reduce(function (sum, watch) {
        return sum + watch.passedTime();
      }, 0);
  };

  /**
   * The following functions implements the CP and IV - Contracts v 1.0 documented here:
   * http://h5p.org/node/1009
   */
  SingleChoiceSet.prototype.getScore = function () {
    return this.results.corrects;
  };

  SingleChoiceSet.prototype.getMaxScore = function () {
    return this.options.choices.length;
  };

  SingleChoiceSet.prototype.getAnswerGiven = function () {
    return (this.results.corrects + this.results.wrongs) > 0;
  };

  SingleChoiceSet.prototype.getTitle = function () {
    return H5P.createTitle((this.contentData && this.contentData.metadata && this.contentData.metadata.title) ? this.contentData.metadata.title : 'Single Choice Set');
  };

  /**
   * Retrieves the xAPI data necessary for generating result reports.
   *
   * @return {object}
   */
  SingleChoiceSet.prototype.getXAPIData = function () {
    var self = this;

    // create array with userAnswer
    var children =  self.options.choices.map(function (question, index) {
      var userResponse = self.userResponses[index] >= 0 ? self.userResponses[index] : '';
      var duration = self.timePassedInStopWatch(index);
      var event = self.createXApiAnsweredEvent(question, userResponse, duration);

      return {
        statement: event.data.statement
      };
    });

    var result = XApiEventBuilder.createResult()
      .score(self.getScore(), self.getMaxScore())
      .duration(self.getTotalPassedTime())
      .build();

    // creates the definition object
    var definition = XApiEventBuilder.createDefinition()
      .interactionType(XApiEventBuilder.interactionTypes.COMPOUND)
      .build();

    var xAPIEvent = XApiEventBuilder.create()
      .verb(XApiEventBuilder.verbs.ANSWERED)
      .contentId(self.contentId, self.subContentId)
      .context(self.getParentAttribute('contentId'), self.getParentAttribute('subContentId'))
      .objectDefinition(definition)
      .result(result)
      .build();

    return {
      statement: xAPIEvent.data.statement,
      children: children
    };
  };

  /**
   * Returns an attribute from this.parent if it exists
   *
   * @param {string} attributeName
   * @return {*|undefined}
   */
  SingleChoiceSet.prototype.getParentAttribute = function (attributeName) {
    var self = this;

    if (self.parent !== undefined) {
      return self.parent[attributeName];
    }
  };

  SingleChoiceSet.prototype.showSolutions = function () {
    this.handleViewSolution();
  };

  /**
   * Reset all answers. This is equal to refreshing the quiz
   */
  SingleChoiceSet.prototype.resetTask = function () {
    var self = this;

    // Close solution view if visible:
    this.solutionView.hide();

    // Reset the user's answers
    var classes = ['h5p-sc-reveal-wrong', 'h5p-sc-reveal-correct', 'h5p-sc-selected', 'h5p-sc-drummed', 'h5p-sc-correct-answer'];
    for (var i = 0; i < classes.length; i++) {
      this.$choices.find('.' + classes[i]).removeClass(classes[i]);
    }
    this.results = {
      corrects: 0,
      wrongs: 0
    };

    this.choices.forEach(function (choice) {
      choice.setAnswered(false);
    });

    this.stopWatches.forEach(function (stopWatch) {
      if (stopWatch) {
        stopWatch.reset();
      }
    });

    this.move(0);

    // Wait for transition, then remove feedback.
    H5P.Transition.onTransitionEnd(this.$choices, function () {
      self.removeFeedback();
    }, 600);
  };

  /**
   * Clever comment.
   *
   * @public
   * @returns {object}
   */
  SingleChoiceSet.prototype.getCurrentState = function () {
    return {
      progress: this.currentIndex,
      answers: this.results,
      userResponses: this.userResponses
    };
  };

  /**
   * Determine the overall feedback to display for the question.
   * Returns empty string if no matching range is found.
   *
   * @param {Object[]} feedbacks
   * @param {number} scoreRatio
   * @return {string}
   */
  var determineOverallFeedback = function (feedbacks, scoreRatio) {
    scoreRatio = Math.floor(scoreRatio * 100);

    for (var i = 0; i < feedbacks.length; i++) {
      var feedback = feedbacks[i];
      var hasFeedback = (feedback.feedback !== undefined && feedback.feedback.trim().length !== 0);

      if (feedback.from <= scoreRatio && feedback.to >= scoreRatio && hasFeedback) {
        return feedback.feedback;
      }
    }

    return '';
  };

  return SingleChoiceSet;
})(H5P.jQuery, H5P.JoubelUI, H5P.Question, H5P.SingleChoiceSet.SingleChoice, H5P.SingleChoiceSet.SolutionView, H5P.SingleChoiceSet.ResultSlide, H5P.SingleChoiceSet.SoundEffects, H5P.SingleChoiceSet.XApiEventBuilder, H5P.SingleChoiceSet.StopWatch);
;
var oldJQuery = jQuery;
var jQuery = H5P.jQuery;

/*! jQuery UI - v1.13.0 - 2021-10-07
* http://jqueryui.com
* Includes: widget.js, position.js, data.js, disable-selection.js, effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js, focusable.js, form-reset-mixin.js, jquery-patch.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/accordion.js, widgets/autocomplete.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/datepicker.js, widgets/dialog.js, widgets/draggable.js, widgets/droppable.js, widgets/menu.js, widgets/mouse.js, widgets/progressbar.js, widgets/resizable.js, widgets/selectable.js, widgets/selectmenu.js, widgets/slider.js, widgets/sortable.js, widgets/spinner.js, widgets/tabs.js, widgets/tooltip.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */

( function( factory ) {
	"use strict";

	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {
	"use strict";

	$.ui = $.ui || {};

	var version = $.ui.version = "1.13.0";


	/*!
 * jQuery UI Widget 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Widget
//>>group: Core
//>>description: Provides a factory for creating stateful widgets with a common API.
//>>docs: http://api.jqueryui.com/jQuery.widget/
//>>demos: http://jqueryui.com/widget/


	var widgetUuid = 0;
	var widgetHasOwnProperty = Array.prototype.hasOwnProperty;
	var widgetSlice = Array.prototype.slice;

	$.cleanData = ( function( orig ) {
		return function( elems ) {
			var events, elem, i;
			for ( i = 0; ( elem = elems[ i ] ) != null; i++ ) {

				// Only trigger remove when necessary to save time
				events = $._data( elem, "events" );
				if ( events && events.remove ) {
					$( elem ).triggerHandler( "remove" );
				}
			}
			orig( elems );
		};
	} )( $.cleanData );

	$.widget = function( name, base, prototype ) {
		var existingConstructor, constructor, basePrototype;

		// ProxiedPrototype allows the provided prototype to remain unmodified
		// so that it can be used as a mixin for multiple widgets (#8876)
		var proxiedPrototype = {};

		var namespace = name.split( "." )[ 0 ];
		name = name.split( "." )[ 1 ];
		var fullName = namespace + "-" + name;

		if ( !prototype ) {
			prototype = base;
			base = $.Widget;
		}

		if ( Array.isArray( prototype ) ) {
			prototype = $.extend.apply( null, [ {} ].concat( prototype ) );
		}

		// Create selector for plugin
		$.expr.pseudos[ fullName.toLowerCase() ] = function( elem ) {
			return !!$.data( elem, fullName );
		};

		$[ namespace ] = $[ namespace ] || {};
		existingConstructor = $[ namespace ][ name ];
		constructor = $[ namespace ][ name ] = function( options, element ) {

			// Allow instantiation without "new" keyword
			if ( !this._createWidget ) {
				return new constructor( options, element );
			}

			// Allow instantiation without initializing for simple inheritance
			// must use "new" keyword (the code above always passes args)
			if ( arguments.length ) {
				this._createWidget( options, element );
			}
		};

		// Extend with the existing constructor to carry over any static properties
		$.extend( constructor, existingConstructor, {
			version: prototype.version,

			// Copy the object used to create the prototype in case we need to
			// redefine the widget later
			_proto: $.extend( {}, prototype ),

			// Track widgets that inherit from this widget in case this widget is
			// redefined after a widget inherits from it
			_childConstructors: []
		} );

		basePrototype = new base();

		// We need to make the options hash a property directly on the new instance
		// otherwise we'll modify the options hash on the prototype that we're
		// inheriting from
		basePrototype.options = $.widget.extend( {}, basePrototype.options );
		$.each( prototype, function( prop, value ) {
			if ( typeof value !== "function" ) {
				proxiedPrototype[ prop ] = value;
				return;
			}
			proxiedPrototype[ prop ] = ( function() {
				function _super() {
					return base.prototype[ prop ].apply( this, arguments );
				}

				function _superApply( args ) {
					return base.prototype[ prop ].apply( this, args );
				}

				return function() {
					var __super = this._super;
					var __superApply = this._superApply;
					var returnValue;

					this._super = _super;
					this._superApply = _superApply;

					returnValue = value.apply( this, arguments );

					this._super = __super;
					this._superApply = __superApply;

					return returnValue;
				};
			} )();
		} );
		constructor.prototype = $.widget.extend( basePrototype, {

			// TODO: remove support for widgetEventPrefix
			// always use the name + a colon as the prefix, e.g., draggable:start
			// don't prefix for widgets that aren't DOM-based
			widgetEventPrefix: existingConstructor ? ( basePrototype.widgetEventPrefix || name ) : name
		}, proxiedPrototype, {
			constructor: constructor,
			namespace: namespace,
			widgetName: name,
			widgetFullName: fullName
		} );

		// If this widget is being redefined then we need to find all widgets that
		// are inheriting from it and redefine all of them so that they inherit from
		// the new version of this widget. We're essentially trying to replace one
		// level in the prototype chain.
		if ( existingConstructor ) {
			$.each( existingConstructor._childConstructors, function( i, child ) {
				var childPrototype = child.prototype;

				// Redefine the child widget using the same prototype that was
				// originally used, but inherit from the new version of the base
				$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor,
					child._proto );
			} );

			// Remove the list of existing child constructors from the old constructor
			// so the old child constructors can be garbage collected
			delete existingConstructor._childConstructors;
		} else {
			base._childConstructors.push( constructor );
		}

		$.widget.bridge( name, constructor );

		return constructor;
	};

	$.widget.extend = function( target ) {
		var input = widgetSlice.call( arguments, 1 );
		var inputIndex = 0;
		var inputLength = input.length;
		var key;
		var value;

		for ( ; inputIndex < inputLength; inputIndex++ ) {
			for ( key in input[ inputIndex ] ) {
				value = input[ inputIndex ][ key ];
				if ( widgetHasOwnProperty.call( input[ inputIndex ], key ) && value !== undefined ) {

					// Clone objects
					if ( $.isPlainObject( value ) ) {
						target[ key ] = $.isPlainObject( target[ key ] ) ?
							$.widget.extend( {}, target[ key ], value ) :

							// Don't extend strings, arrays, etc. with objects
							$.widget.extend( {}, value );

						// Copy everything else by reference
					} else {
						target[ key ] = value;
					}
				}
			}
		}
		return target;
	};

	$.widget.bridge = function( name, object ) {
		var fullName = object.prototype.widgetFullName || name;
		$.fn[ name ] = function( options ) {
			var isMethodCall = typeof options === "string";
			var args = widgetSlice.call( arguments, 1 );
			var returnValue = this;

			if ( isMethodCall ) {

				// If this is an empty collection, we need to have the instance method
				// return undefined instead of the jQuery instance
				if ( !this.length && options === "instance" ) {
					returnValue = undefined;
				} else {
					this.each( function() {
						var methodValue;
						var instance = $.data( this, fullName );

						if ( options === "instance" ) {
							returnValue = instance;
							return false;
						}

						if ( !instance ) {
							return $.error( "cannot call methods on " + name +
								" prior to initialization; " +
								"attempted to call method '" + options + "'" );
						}

						if ( typeof instance[ options ] !== "function" ||
							options.charAt( 0 ) === "_" ) {
							return $.error( "no such method '" + options + "' for " + name +
								" widget instance" );
						}

						methodValue = instance[ options ].apply( instance, args );

						if ( methodValue !== instance && methodValue !== undefined ) {
							returnValue = methodValue && methodValue.jquery ?
								returnValue.pushStack( methodValue.get() ) :
								methodValue;
							return false;
						}
					} );
				}
			} else {

				// Allow multiple hashes to be passed on init
				if ( args.length ) {
					options = $.widget.extend.apply( null, [ options ].concat( args ) );
				}

				this.each( function() {
					var instance = $.data( this, fullName );
					if ( instance ) {
						instance.option( options || {} );
						if ( instance._init ) {
							instance._init();
						}
					} else {
						$.data( this, fullName, new object( options, this ) );
					}
				} );
			}

			return returnValue;
		};
	};

	$.Widget = function( /* options, element */ ) {};
	$.Widget._childConstructors = [];

	$.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",

		options: {
			classes: {},
			disabled: false,

			// Callbacks
			create: null
		},

		_createWidget: function( options, element ) {
			element = $( element || this.defaultElement || this )[ 0 ];
			this.element = $( element );
			this.uuid = widgetUuid++;
			this.eventNamespace = "." + this.widgetName + this.uuid;

			this.bindings = $();
			this.hoverable = $();
			this.focusable = $();
			this.classesElementLookup = {};

			if ( element !== this ) {
				$.data( element, this.widgetFullName, this );
				this._on( true, this.element, {
					remove: function( event ) {
						if ( event.target === element ) {
							this.destroy();
						}
					}
				} );
				this.document = $( element.style ?

					// Element within the document
					element.ownerDocument :

					// Element is window or document
					element.document || element );
				this.window = $( this.document[ 0 ].defaultView || this.document[ 0 ].parentWindow );
			}

			this.options = $.widget.extend( {},
				this.options,
				this._getCreateOptions(),
				options );

			this._create();

			if ( this.options.disabled ) {
				this._setOptionDisabled( this.options.disabled );
			}

			this._trigger( "create", null, this._getCreateEventData() );
			this._init();
		},

		_getCreateOptions: function() {
			return {};
		},

		_getCreateEventData: $.noop,

		_create: $.noop,

		_init: $.noop,

		destroy: function() {
			var that = this;

			this._destroy();
			$.each( this.classesElementLookup, function( key, value ) {
				that._removeClass( value, key );
			} );

			// We can probably remove the unbind calls in 2.0
			// all event bindings should go through this._on()
			this.element
			.off( this.eventNamespace )
			.removeData( this.widgetFullName );
			this.widget()
			.off( this.eventNamespace )
			.removeAttr( "aria-disabled" );

			// Clean up events and states
			this.bindings.off( this.eventNamespace );
		},

		_destroy: $.noop,

		widget: function() {
			return this.element;
		},

		option: function( key, value ) {
			var options = key;
			var parts;
			var curOption;
			var i;

			if ( arguments.length === 0 ) {

				// Don't return a reference to the internal hash
				return $.widget.extend( {}, this.options );
			}

			if ( typeof key === "string" ) {

				// Handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
				options = {};
				parts = key.split( "." );
				key = parts.shift();
				if ( parts.length ) {
					curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
					for ( i = 0; i < parts.length - 1; i++ ) {
						curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
						curOption = curOption[ parts[ i ] ];
					}
					key = parts.pop();
					if ( arguments.length === 1 ) {
						return curOption[ key ] === undefined ? null : curOption[ key ];
					}
					curOption[ key ] = value;
				} else {
					if ( arguments.length === 1 ) {
						return this.options[ key ] === undefined ? null : this.options[ key ];
					}
					options[ key ] = value;
				}
			}

			this._setOptions( options );

			return this;
		},

		_setOptions: function( options ) {
			var key;

			for ( key in options ) {
				this._setOption( key, options[ key ] );
			}

			return this;
		},

		_setOption: function( key, value ) {
			if ( key === "classes" ) {
				this._setOptionClasses( value );
			}

			this.options[ key ] = value;

			if ( key === "disabled" ) {
				this._setOptionDisabled( value );
			}

			return this;
		},

		_setOptionClasses: function( value ) {
			var classKey, elements, currentElements;

			for ( classKey in value ) {
				currentElements = this.classesElementLookup[ classKey ];
				if ( value[ classKey ] === this.options.classes[ classKey ] ||
					!currentElements ||
					!currentElements.length ) {
					continue;
				}

				// We are doing this to create a new jQuery object because the _removeClass() call
				// on the next line is going to destroy the reference to the current elements being
				// tracked. We need to save a copy of this collection so that we can add the new classes
				// below.
				elements = $( currentElements.get() );
				this._removeClass( currentElements, classKey );

				// We don't use _addClass() here, because that uses this.options.classes
				// for generating the string of classes. We want to use the value passed in from
				// _setOption(), this is the new value of the classes option which was passed to
				// _setOption(). We pass this value directly to _classes().
				elements.addClass( this._classes( {
					element: elements,
					keys: classKey,
					classes: value,
					add: true
				} ) );
			}
		},

		_setOptionDisabled: function( value ) {
			this._toggleClass( this.widget(), this.widgetFullName + "-disabled", null, !!value );

			// If the widget is becoming disabled, then nothing is interactive
			if ( value ) {
				this._removeClass( this.hoverable, null, "ui-state-hover" );
				this._removeClass( this.focusable, null, "ui-state-focus" );
			}
		},

		enable: function() {
			return this._setOptions( { disabled: false } );
		},

		disable: function() {
			return this._setOptions( { disabled: true } );
		},

		_classes: function( options ) {
			var full = [];
			var that = this;

			options = $.extend( {
				element: this.element,
				classes: this.options.classes || {}
			}, options );

			function bindRemoveEvent() {
				options.element.each( function( _, element ) {
					var isTracked = $.map( that.classesElementLookup, function( elements ) {
						return elements;
					} )
					.some( function( elements ) {
						return elements.is( element );
					} );

					if ( !isTracked ) {
						that._on( $( element ), {
							remove: "_untrackClassesElement"
						} );
					}
				} );
			}

			function processClassString( classes, checkOption ) {
				var current, i;
				for ( i = 0; i < classes.length; i++ ) {
					current = that.classesElementLookup[ classes[ i ] ] || $();
					if ( options.add ) {
						bindRemoveEvent();
						current = $( $.uniqueSort( current.get().concat( options.element.get() ) ) );
					} else {
						current = $( current.not( options.element ).get() );
					}
					that.classesElementLookup[ classes[ i ] ] = current;
					full.push( classes[ i ] );
					if ( checkOption && options.classes[ classes[ i ] ] ) {
						full.push( options.classes[ classes[ i ] ] );
					}
				}
			}

			if ( options.keys ) {
				processClassString( options.keys.match( /\S+/g ) || [], true );
			}
			if ( options.extra ) {
				processClassString( options.extra.match( /\S+/g ) || [] );
			}

			return full.join( " " );
		},

		_untrackClassesElement: function( event ) {
			var that = this;
			$.each( that.classesElementLookup, function( key, value ) {
				if ( $.inArray( event.target, value ) !== -1 ) {
					that.classesElementLookup[ key ] = $( value.not( event.target ).get() );
				}
			} );

			this._off( $( event.target ) );
		},

		_removeClass: function( element, keys, extra ) {
			return this._toggleClass( element, keys, extra, false );
		},

		_addClass: function( element, keys, extra ) {
			return this._toggleClass( element, keys, extra, true );
		},

		_toggleClass: function( element, keys, extra, add ) {
			add = ( typeof add === "boolean" ) ? add : extra;
			var shift = ( typeof element === "string" || element === null ),
				options = {
					extra: shift ? keys : extra,
					keys: shift ? element : keys,
					element: shift ? this.element : element,
					add: add
				};
			options.element.toggleClass( this._classes( options ), add );
			return this;
		},

		_on: function( suppressDisabledCheck, element, handlers ) {
			var delegateElement;
			var instance = this;

			// No suppressDisabledCheck flag, shuffle arguments
			if ( typeof suppressDisabledCheck !== "boolean" ) {
				handlers = element;
				element = suppressDisabledCheck;
				suppressDisabledCheck = false;
			}

			// No element argument, shuffle and use this.element
			if ( !handlers ) {
				handlers = element;
				element = this.element;
				delegateElement = this.widget();
			} else {
				element = delegateElement = $( element );
				this.bindings = this.bindings.add( element );
			}

			$.each( handlers, function( event, handler ) {
				function handlerProxy() {

					// Allow widgets to customize the disabled handling
					// - disabled as an array instead of boolean
					// - disabled class as method for disabling individual parts
					if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
							$( this ).hasClass( "ui-state-disabled" ) ) ) {
						return;
					}
					return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
				}

				// Copy the guid so direct unbinding works
				if ( typeof handler !== "string" ) {
					handlerProxy.guid = handler.guid =
						handler.guid || handlerProxy.guid || $.guid++;
				}

				var match = event.match( /^([\w:-]*)\s*(.*)$/ );
				var eventName = match[ 1 ] + instance.eventNamespace;
				var selector = match[ 2 ];

				if ( selector ) {
					delegateElement.on( eventName, selector, handlerProxy );
				} else {
					element.on( eventName, handlerProxy );
				}
			} );
		},

		_off: function( element, eventName ) {
			eventName = ( eventName || "" ).split( " " ).join( this.eventNamespace + " " ) +
				this.eventNamespace;
			element.off( eventName );

			// Clear the stack to avoid memory leaks (#10056)
			this.bindings = $( this.bindings.not( element ).get() );
			this.focusable = $( this.focusable.not( element ).get() );
			this.hoverable = $( this.hoverable.not( element ).get() );
		},

		_delay: function( handler, delay ) {
			function handlerProxy() {
				return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
			}
			var instance = this;
			return setTimeout( handlerProxy, delay || 0 );
		},

		_hoverable: function( element ) {
			this.hoverable = this.hoverable.add( element );
			this._on( element, {
				mouseenter: function( event ) {
					this._addClass( $( event.currentTarget ), null, "ui-state-hover" );
				},
				mouseleave: function( event ) {
					this._removeClass( $( event.currentTarget ), null, "ui-state-hover" );
				}
			} );
		},

		_focusable: function( element ) {
			this.focusable = this.focusable.add( element );
			this._on( element, {
				focusin: function( event ) {
					this._addClass( $( event.currentTarget ), null, "ui-state-focus" );
				},
				focusout: function( event ) {
					this._removeClass( $( event.currentTarget ), null, "ui-state-focus" );
				}
			} );
		},

		_trigger: function( type, event, data ) {
			var prop, orig;
			var callback = this.options[ type ];

			data = data || {};
			event = $.Event( event );
			event.type = ( type === this.widgetEventPrefix ?
				type :
				this.widgetEventPrefix + type ).toLowerCase();

			// The original event may come from any element
			// so we need to reset the target on the new event
			event.target = this.element[ 0 ];

			// Copy original event properties over to the new event
			orig = event.originalEvent;
			if ( orig ) {
				for ( prop in orig ) {
					if ( !( prop in event ) ) {
						event[ prop ] = orig[ prop ];
					}
				}
			}

			this.element.trigger( event, data );
			return !( typeof callback === "function" &&
				callback.apply( this.element[ 0 ], [ event ].concat( data ) ) === false ||
				event.isDefaultPrevented() );
		}
	};

	$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
		$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
			if ( typeof options === "string" ) {
				options = { effect: options };
			}

			var hasOptions;
			var effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;

			options = options || {};
			if ( typeof options === "number" ) {
				options = { duration: options };
			} else if ( options === true ) {
				options = {};
			}

			hasOptions = !$.isEmptyObject( options );
			options.complete = callback;

			if ( options.delay ) {
				element.delay( options.delay );
			}

			if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
				element[ method ]( options );
			} else if ( effectName !== method && element[ effectName ] ) {
				element[ effectName ]( options.duration, options.easing, callback );
			} else {
				element.queue( function( next ) {
					$( this )[ method ]();
					if ( callback ) {
						callback.call( element[ 0 ] );
					}
					next();
				} );
			}
		};
	} );

	var widget = $.widget;


	/*!
 * jQuery UI Position 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */

//>>label: Position
//>>group: Core
//>>description: Positions elements relative to other elements.
//>>docs: http://api.jqueryui.com/position/
//>>demos: http://jqueryui.com/position/


	( function() {
		var cachedScrollbarWidth,
			max = Math.max,
			abs = Math.abs,
			rhorizontal = /left|center|right/,
			rvertical = /top|center|bottom/,
			roffset = /[\+\-]\d+(\.[\d]+)?%?/,
			rposition = /^\w+/,
			rpercent = /%$/,
			_position = $.fn.position;

		function getOffsets( offsets, width, height ) {
			return [
				parseFloat( offsets[ 0 ] ) * ( rpercent.test( offsets[ 0 ] ) ? width / 100 : 1 ),
				parseFloat( offsets[ 1 ] ) * ( rpercent.test( offsets[ 1 ] ) ? height / 100 : 1 )
			];
		}

		function parseCss( element, property ) {
			return parseInt( $.css( element, property ), 10 ) || 0;
		}

		function isWindow( obj ) {
			return obj != null && obj === obj.window;
		}

		function getDimensions( elem ) {
			var raw = elem[ 0 ];
			if ( raw.nodeType === 9 ) {
				return {
					width: elem.width(),
					height: elem.height(),
					offset: { top: 0, left: 0 }
				};
			}
			if ( isWindow( raw ) ) {
				return {
					width: elem.width(),
					height: elem.height(),
					offset: { top: elem.scrollTop(), left: elem.scrollLeft() }
				};
			}
			if ( raw.preventDefault ) {
				return {
					width: 0,
					height: 0,
					offset: { top: raw.pageY, left: raw.pageX }
				};
			}
			return {
				width: elem.outerWidth(),
				height: elem.outerHeight(),
				offset: elem.offset()
			};
		}

		$.position = {
			scrollbarWidth: function() {
				if ( cachedScrollbarWidth !== undefined ) {
					return cachedScrollbarWidth;
				}
				var w1, w2,
					div = $( "<div style=" +
						"'display:block;position:absolute;width:200px;height:200px;overflow:hidden;'>" +
						"<div style='height:300px;width:auto;'></div></div>" ),
					innerDiv = div.children()[ 0 ];

				$( "body" ).append( div );
				w1 = innerDiv.offsetWidth;
				div.css( "overflow", "scroll" );

				w2 = innerDiv.offsetWidth;

				if ( w1 === w2 ) {
					w2 = div[ 0 ].clientWidth;
				}

				div.remove();

				return ( cachedScrollbarWidth = w1 - w2 );
			},
			getScrollInfo: function( within ) {
				var overflowX = within.isWindow || within.isDocument ? "" :
						within.element.css( "overflow-x" ),
					overflowY = within.isWindow || within.isDocument ? "" :
						within.element.css( "overflow-y" ),
					hasOverflowX = overflowX === "scroll" ||
						( overflowX === "auto" && within.width < within.element[ 0 ].scrollWidth ),
					hasOverflowY = overflowY === "scroll" ||
						( overflowY === "auto" && within.height < within.element[ 0 ].scrollHeight );
				return {
					width: hasOverflowY ? $.position.scrollbarWidth() : 0,
					height: hasOverflowX ? $.position.scrollbarWidth() : 0
				};
			},
			getWithinInfo: function( element ) {
				var withinElement = $( element || window ),
					isElemWindow = isWindow( withinElement[ 0 ] ),
					isDocument = !!withinElement[ 0 ] && withinElement[ 0 ].nodeType === 9,
					hasOffset = !isElemWindow && !isDocument;
				return {
					element: withinElement,
					isWindow: isElemWindow,
					isDocument: isDocument,
					offset: hasOffset ? $( element ).offset() : { left: 0, top: 0 },
					scrollLeft: withinElement.scrollLeft(),
					scrollTop: withinElement.scrollTop(),
					width: withinElement.outerWidth(),
					height: withinElement.outerHeight()
				};
			}
		};

		$.fn.position = function( options ) {
			if ( !options || !options.of ) {
				return _position.apply( this, arguments );
			}

			// Make a copy, we don't want to modify arguments
			options = $.extend( {}, options );

			var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions,

				// Make sure string options are treated as CSS selectors
				target = typeof options.of === "string" ?
					$( document ).find( options.of ) :
					$( options.of ),

				within = $.position.getWithinInfo( options.within ),
				scrollInfo = $.position.getScrollInfo( within ),
				collision = ( options.collision || "flip" ).split( " " ),
				offsets = {};

			dimensions = getDimensions( target );
			if ( target[ 0 ].preventDefault ) {

				// Force left top to allow flipping
				options.at = "left top";
			}
			targetWidth = dimensions.width;
			targetHeight = dimensions.height;
			targetOffset = dimensions.offset;

			// Clone to reuse original targetOffset later
			basePosition = $.extend( {}, targetOffset );

			// Force my and at to have valid horizontal and vertical positions
			// if a value is missing or invalid, it will be converted to center
			$.each( [ "my", "at" ], function() {
				var pos = ( options[ this ] || "" ).split( " " ),
					horizontalOffset,
					verticalOffset;

				if ( pos.length === 1 ) {
					pos = rhorizontal.test( pos[ 0 ] ) ?
						pos.concat( [ "center" ] ) :
						rvertical.test( pos[ 0 ] ) ?
							[ "center" ].concat( pos ) :
							[ "center", "center" ];
				}
				pos[ 0 ] = rhorizontal.test( pos[ 0 ] ) ? pos[ 0 ] : "center";
				pos[ 1 ] = rvertical.test( pos[ 1 ] ) ? pos[ 1 ] : "center";

				// Calculate offsets
				horizontalOffset = roffset.exec( pos[ 0 ] );
				verticalOffset = roffset.exec( pos[ 1 ] );
				offsets[ this ] = [
					horizontalOffset ? horizontalOffset[ 0 ] : 0,
					verticalOffset ? verticalOffset[ 0 ] : 0
				];

				// Reduce to just the positions without the offsets
				options[ this ] = [
					rposition.exec( pos[ 0 ] )[ 0 ],
					rposition.exec( pos[ 1 ] )[ 0 ]
				];
			} );

			// Normalize collision option
			if ( collision.length === 1 ) {
				collision[ 1 ] = collision[ 0 ];
			}

			if ( options.at[ 0 ] === "right" ) {
				basePosition.left += targetWidth;
			} else if ( options.at[ 0 ] === "center" ) {
				basePosition.left += targetWidth / 2;
			}

			if ( options.at[ 1 ] === "bottom" ) {
				basePosition.top += targetHeight;
			} else if ( options.at[ 1 ] === "center" ) {
				basePosition.top += targetHeight / 2;
			}

			atOffset = getOffsets( offsets.at, targetWidth, targetHeight );
			basePosition.left += atOffset[ 0 ];
			basePosition.top += atOffset[ 1 ];

			return this.each( function() {
				var collisionPosition, using,
					elem = $( this ),
					elemWidth = elem.outerWidth(),
					elemHeight = elem.outerHeight(),
					marginLeft = parseCss( this, "marginLeft" ),
					marginTop = parseCss( this, "marginTop" ),
					collisionWidth = elemWidth + marginLeft + parseCss( this, "marginRight" ) +
						scrollInfo.width,
					collisionHeight = elemHeight + marginTop + parseCss( this, "marginBottom" ) +
						scrollInfo.height,
					position = $.extend( {}, basePosition ),
					myOffset = getOffsets( offsets.my, elem.outerWidth(), elem.outerHeight() );

				if ( options.my[ 0 ] === "right" ) {
					position.left -= elemWidth;
				} else if ( options.my[ 0 ] === "center" ) {
					position.left -= elemWidth / 2;
				}

				if ( options.my[ 1 ] === "bottom" ) {
					position.top -= elemHeight;
				} else if ( options.my[ 1 ] === "center" ) {
					position.top -= elemHeight / 2;
				}

				position.left += myOffset[ 0 ];
				position.top += myOffset[ 1 ];

				collisionPosition = {
					marginLeft: marginLeft,
					marginTop: marginTop
				};

				$.each( [ "left", "top" ], function( i, dir ) {
					if ( $.ui.position[ collision[ i ] ] ) {
						$.ui.position[ collision[ i ] ][ dir ]( position, {
							targetWidth: targetWidth,
							targetHeight: targetHeight,
							elemWidth: elemWidth,
							elemHeight: elemHeight,
							collisionPosition: collisionPosition,
							collisionWidth: collisionWidth,
							collisionHeight: collisionHeight,
							offset: [ atOffset[ 0 ] + myOffset[ 0 ], atOffset [ 1 ] + myOffset[ 1 ] ],
							my: options.my,
							at: options.at,
							within: within,
							elem: elem
						} );
					}
				} );

				if ( options.using ) {

					// Adds feedback as second argument to using callback, if present
					using = function( props ) {
						var left = targetOffset.left - position.left,
							right = left + targetWidth - elemWidth,
							top = targetOffset.top - position.top,
							bottom = top + targetHeight - elemHeight,
							feedback = {
								target: {
									element: target,
									left: targetOffset.left,
									top: targetOffset.top,
									width: targetWidth,
									height: targetHeight
								},
								element: {
									element: elem,
									left: position.left,
									top: position.top,
									width: elemWidth,
									height: elemHeight
								},
								horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
								vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
							};
						if ( targetWidth < elemWidth && abs( left + right ) < targetWidth ) {
							feedback.horizontal = "center";
						}
						if ( targetHeight < elemHeight && abs( top + bottom ) < targetHeight ) {
							feedback.vertical = "middle";
						}
						if ( max( abs( left ), abs( right ) ) > max( abs( top ), abs( bottom ) ) ) {
							feedback.important = "horizontal";
						} else {
							feedback.important = "vertical";
						}
						options.using.call( this, props, feedback );
					};
				}

				elem.offset( $.extend( position, { using: using } ) );
			} );
		};

		$.ui.position = {
			fit: {
				left: function( position, data ) {
					var within = data.within,
						withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
						outerWidth = within.width,
						collisionPosLeft = position.left - data.collisionPosition.marginLeft,
						overLeft = withinOffset - collisionPosLeft,
						overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
						newOverRight;

					// Element is wider than within
					if ( data.collisionWidth > outerWidth ) {

						// Element is initially over the left side of within
						if ( overLeft > 0 && overRight <= 0 ) {
							newOverRight = position.left + overLeft + data.collisionWidth - outerWidth -
								withinOffset;
							position.left += overLeft - newOverRight;

							// Element is initially over right side of within
						} else if ( overRight > 0 && overLeft <= 0 ) {
							position.left = withinOffset;

							// Element is initially over both left and right sides of within
						} else {
							if ( overLeft > overRight ) {
								position.left = withinOffset + outerWidth - data.collisionWidth;
							} else {
								position.left = withinOffset;
							}
						}

						// Too far left -> align with left edge
					} else if ( overLeft > 0 ) {
						position.left += overLeft;

						// Too far right -> align with right edge
					} else if ( overRight > 0 ) {
						position.left -= overRight;

						// Adjust based on position and margin
					} else {
						position.left = max( position.left - collisionPosLeft, position.left );
					}
				},
				top: function( position, data ) {
					var within = data.within,
						withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
						outerHeight = data.within.height,
						collisionPosTop = position.top - data.collisionPosition.marginTop,
						overTop = withinOffset - collisionPosTop,
						overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
						newOverBottom;

					// Element is taller than within
					if ( data.collisionHeight > outerHeight ) {

						// Element is initially over the top of within
						if ( overTop > 0 && overBottom <= 0 ) {
							newOverBottom = position.top + overTop + data.collisionHeight - outerHeight -
								withinOffset;
							position.top += overTop - newOverBottom;

							// Element is initially over bottom of within
						} else if ( overBottom > 0 && overTop <= 0 ) {
							position.top = withinOffset;

							// Element is initially over both top and bottom of within
						} else {
							if ( overTop > overBottom ) {
								position.top = withinOffset + outerHeight - data.collisionHeight;
							} else {
								position.top = withinOffset;
							}
						}

						// Too far up -> align with top
					} else if ( overTop > 0 ) {
						position.top += overTop;

						// Too far down -> align with bottom edge
					} else if ( overBottom > 0 ) {
						position.top -= overBottom;

						// Adjust based on position and margin
					} else {
						position.top = max( position.top - collisionPosTop, position.top );
					}
				}
			},
			flip: {
				left: function( position, data ) {
					var within = data.within,
						withinOffset = within.offset.left + within.scrollLeft,
						outerWidth = within.width,
						offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
						collisionPosLeft = position.left - data.collisionPosition.marginLeft,
						overLeft = collisionPosLeft - offsetLeft,
						overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
						myOffset = data.my[ 0 ] === "left" ?
							-data.elemWidth :
							data.my[ 0 ] === "right" ?
								data.elemWidth :
								0,
						atOffset = data.at[ 0 ] === "left" ?
							data.targetWidth :
							data.at[ 0 ] === "right" ?
								-data.targetWidth :
								0,
						offset = -2 * data.offset[ 0 ],
						newOverRight,
						newOverLeft;

					if ( overLeft < 0 ) {
						newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth -
							outerWidth - withinOffset;
						if ( newOverRight < 0 || newOverRight < abs( overLeft ) ) {
							position.left += myOffset + atOffset + offset;
						}
					} else if ( overRight > 0 ) {
						newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset +
							atOffset + offset - offsetLeft;
						if ( newOverLeft > 0 || abs( newOverLeft ) < overRight ) {
							position.left += myOffset + atOffset + offset;
						}
					}
				},
				top: function( position, data ) {
					var within = data.within,
						withinOffset = within.offset.top + within.scrollTop,
						outerHeight = within.height,
						offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
						collisionPosTop = position.top - data.collisionPosition.marginTop,
						overTop = collisionPosTop - offsetTop,
						overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
						top = data.my[ 1 ] === "top",
						myOffset = top ?
							-data.elemHeight :
							data.my[ 1 ] === "bottom" ?
								data.elemHeight :
								0,
						atOffset = data.at[ 1 ] === "top" ?
							data.targetHeight :
							data.at[ 1 ] === "bottom" ?
								-data.targetHeight :
								0,
						offset = -2 * data.offset[ 1 ],
						newOverTop,
						newOverBottom;
					if ( overTop < 0 ) {
						newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight -
							outerHeight - withinOffset;
						if ( newOverBottom < 0 || newOverBottom < abs( overTop ) ) {
							position.top += myOffset + atOffset + offset;
						}
					} else if ( overBottom > 0 ) {
						newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset +
							offset - offsetTop;
						if ( newOverTop > 0 || abs( newOverTop ) < overBottom ) {
							position.top += myOffset + atOffset + offset;
						}
					}
				}
			},
			flipfit: {
				left: function() {
					$.ui.position.flip.left.apply( this, arguments );
					$.ui.position.fit.left.apply( this, arguments );
				},
				top: function() {
					$.ui.position.flip.top.apply( this, arguments );
					$.ui.position.fit.top.apply( this, arguments );
				}
			}
		};

	} )();

	var position = $.ui.position;


	/*!
 * jQuery UI :data 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: :data Selector
//>>group: Core
//>>description: Selects elements which have data stored under the specified key.
//>>docs: http://api.jqueryui.com/data-selector/


	var data = $.extend( $.expr.pseudos, {
		data: $.expr.createPseudo ?
			$.expr.createPseudo( function( dataName ) {
				return function( elem ) {
					return !!$.data( elem, dataName );
				};
			} ) :

			// Support: jQuery <1.8
			function( elem, i, match ) {
				return !!$.data( elem, match[ 3 ] );
			}
	} );

	/*!
 * jQuery UI Disable Selection 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: disableSelection
//>>group: Core
//>>description: Disable selection of text content within the set of matched elements.
//>>docs: http://api.jqueryui.com/disableSelection/

// This file is deprecated

	var disableSelection = $.fn.extend( {
		disableSelection: ( function() {
			var eventType = "onselectstart" in document.createElement( "div" ) ?
				"selectstart" :
				"mousedown";

			return function() {
				return this.on( eventType + ".ui-disableSelection", function( event ) {
					event.preventDefault();
				} );
			};
		} )(),

		enableSelection: function() {
			return this.off( ".ui-disableSelection" );
		}
	} );



// Create a local jQuery because jQuery Color relies on it and the
// global may not exist with AMD and a custom build (#10199).
// This module is a noop if used as a regular AMD module.
// eslint-disable-next-line no-unused-vars
	var jQuery = $;


	/*!
 * jQuery Color Animations v2.2.0
 * https://github.com/jquery/jquery-color
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Sun May 10 09:02:36 2020 +0200
 */



	var stepHooks = "backgroundColor borderBottomColor borderLeftColor borderRightColor " +
			"borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",

		class2type = {},
		toString = class2type.toString,

		// plusequals test for += 100 -= 100
		rplusequals = /^([\-+])=\s*(\d+\.?\d*)/,

		// a set of RE's that can match strings and generate color tuples.
		stringParsers = [ {
			re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			parse: function( execResult ) {
				return [
					execResult[ 1 ],
					execResult[ 2 ],
					execResult[ 3 ],
					execResult[ 4 ]
				];
			}
		}, {
			re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			parse: function( execResult ) {
				return [
					execResult[ 1 ] * 2.55,
					execResult[ 2 ] * 2.55,
					execResult[ 3 ] * 2.55,
					execResult[ 4 ]
				];
			}
		}, {

			// this regex ignores A-F because it's compared against an already lowercased string
			re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?/,
			parse: function( execResult ) {
				return [
					parseInt( execResult[ 1 ], 16 ),
					parseInt( execResult[ 2 ], 16 ),
					parseInt( execResult[ 3 ], 16 ),
					execResult[ 4 ] ?
						( parseInt( execResult[ 4 ], 16 ) / 255 ).toFixed( 2 ) :
						1
				];
			}
		}, {

			// this regex ignores A-F because it's compared against an already lowercased string
			re: /#([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])?/,
			parse: function( execResult ) {
				return [
					parseInt( execResult[ 1 ] + execResult[ 1 ], 16 ),
					parseInt( execResult[ 2 ] + execResult[ 2 ], 16 ),
					parseInt( execResult[ 3 ] + execResult[ 3 ], 16 ),
					execResult[ 4 ] ?
						( parseInt( execResult[ 4 ] + execResult[ 4 ], 16 ) / 255 )
						.toFixed( 2 ) :
						1
				];
			}
		}, {
			re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
			space: "hsla",
			parse: function( execResult ) {
				return [
					execResult[ 1 ],
					execResult[ 2 ] / 100,
					execResult[ 3 ] / 100,
					execResult[ 4 ]
				];
			}
		} ],

		// jQuery.Color( )
		color = jQuery.Color = function( color, green, blue, alpha ) {
			return new jQuery.Color.fn.parse( color, green, blue, alpha );
		},
		spaces = {
			rgba: {
				props: {
					red: {
						idx: 0,
						type: "byte"
					},
					green: {
						idx: 1,
						type: "byte"
					},
					blue: {
						idx: 2,
						type: "byte"
					}
				}
			},

			hsla: {
				props: {
					hue: {
						idx: 0,
						type: "degrees"
					},
					saturation: {
						idx: 1,
						type: "percent"
					},
					lightness: {
						idx: 2,
						type: "percent"
					}
				}
			}
		},
		propTypes = {
			"byte": {
				floor: true,
				max: 255
			},
			"percent": {
				max: 1
			},
			"degrees": {
				mod: 360,
				floor: true
			}
		},
		support = color.support = {},

		// element for support tests
		supportElem = jQuery( "<p>" )[ 0 ],

		// colors = jQuery.Color.names
		colors,

		// local aliases of functions called often
		each = jQuery.each;

// determine rgba support immediately
	supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";
	support.rgba = supportElem.style.backgroundColor.indexOf( "rgba" ) > -1;

// define cache name and alpha properties
// for rgba and hsla spaces
	each( spaces, function( spaceName, space ) {
		space.cache = "_" + spaceName;
		space.props.alpha = {
			idx: 3,
			type: "percent",
			def: 1
		};
	} );

// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
		function( _i, name ) {
			class2type[ "[object " + name + "]" ] = name.toLowerCase();
		} );

	function getType( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		return typeof obj === "object" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	}

	function clamp( value, prop, allowEmpty ) {
		var type = propTypes[ prop.type ] || {};

		if ( value == null ) {
			return ( allowEmpty || !prop.def ) ? null : prop.def;
		}

		// ~~ is an short way of doing floor for positive numbers
		value = type.floor ? ~~value : parseFloat( value );

		// IE will pass in empty strings as value for alpha,
		// which will hit this case
		if ( isNaN( value ) ) {
			return prop.def;
		}

		if ( type.mod ) {

			// we add mod before modding to make sure that negatives values
			// get converted properly: -10 -> 350
			return ( value + type.mod ) % type.mod;
		}

		// for now all property types without mod have min and max
		return Math.min( type.max, Math.max( 0, value ) );
	}

	function stringParse( string ) {
		var inst = color(),
			rgba = inst._rgba = [];

		string = string.toLowerCase();

		each( stringParsers, function( _i, parser ) {
			var parsed,
				match = parser.re.exec( string ),
				values = match && parser.parse( match ),
				spaceName = parser.space || "rgba";

			if ( values ) {
				parsed = inst[ spaceName ]( values );

				// if this was an rgba parse the assignment might happen twice
				// oh well....
				inst[ spaces[ spaceName ].cache ] = parsed[ spaces[ spaceName ].cache ];
				rgba = inst._rgba = parsed._rgba;

				// exit each( stringParsers ) here because we matched
				return false;
			}
		} );

		// Found a stringParser that handled it
		if ( rgba.length ) {

			// if this came from a parsed string, force "transparent" when alpha is 0
			// chrome, (and maybe others) return "transparent" as rgba(0,0,0,0)
			if ( rgba.join() === "0,0,0,0" ) {
				jQuery.extend( rgba, colors.transparent );
			}
			return inst;
		}

		// named colors
		return colors[ string ];
	}

	color.fn = jQuery.extend( color.prototype, {
		parse: function( red, green, blue, alpha ) {
			if ( red === undefined ) {
				this._rgba = [ null, null, null, null ];
				return this;
			}
			if ( red.jquery || red.nodeType ) {
				red = jQuery( red ).css( green );
				green = undefined;
			}

			var inst = this,
				type = getType( red ),
				rgba = this._rgba = [];

			// more than 1 argument specified - assume ( red, green, blue, alpha )
			if ( green !== undefined ) {
				red = [ red, green, blue, alpha ];
				type = "array";
			}

			if ( type === "string" ) {
				return this.parse( stringParse( red ) || colors._default );
			}

			if ( type === "array" ) {
				each( spaces.rgba.props, function( _key, prop ) {
					rgba[ prop.idx ] = clamp( red[ prop.idx ], prop );
				} );
				return this;
			}

			if ( type === "object" ) {
				if ( red instanceof color ) {
					each( spaces, function( _spaceName, space ) {
						if ( red[ space.cache ] ) {
							inst[ space.cache ] = red[ space.cache ].slice();
						}
					} );
				} else {
					each( spaces, function( _spaceName, space ) {
						var cache = space.cache;
						each( space.props, function( key, prop ) {

							// if the cache doesn't exist, and we know how to convert
							if ( !inst[ cache ] && space.to ) {

								// if the value was null, we don't need to copy it
								// if the key was alpha, we don't need to copy it either
								if ( key === "alpha" || red[ key ] == null ) {
									return;
								}
								inst[ cache ] = space.to( inst._rgba );
							}

							// this is the only case where we allow nulls for ALL properties.
							// call clamp with alwaysAllowEmpty
							inst[ cache ][ prop.idx ] = clamp( red[ key ], prop, true );
						} );

						// everything defined but alpha?
						if ( inst[ cache ] && jQuery.inArray( null, inst[ cache ].slice( 0, 3 ) ) < 0 ) {

							// use the default of 1
							if ( inst[ cache ][ 3 ] == null ) {
								inst[ cache ][ 3 ] = 1;
							}

							if ( space.from ) {
								inst._rgba = space.from( inst[ cache ] );
							}
						}
					} );
				}
				return this;
			}
		},
		is: function( compare ) {
			var is = color( compare ),
				same = true,
				inst = this;

			each( spaces, function( _, space ) {
				var localCache,
					isCache = is[ space.cache ];
				if ( isCache ) {
					localCache = inst[ space.cache ] || space.to && space.to( inst._rgba ) || [];
					each( space.props, function( _, prop ) {
						if ( isCache[ prop.idx ] != null ) {
							same = ( isCache[ prop.idx ] === localCache[ prop.idx ] );
							return same;
						}
					} );
				}
				return same;
			} );
			return same;
		},
		_space: function() {
			var used = [],
				inst = this;
			each( spaces, function( spaceName, space ) {
				if ( inst[ space.cache ] ) {
					used.push( spaceName );
				}
			} );
			return used.pop();
		},
		transition: function( other, distance ) {
			var end = color( other ),
				spaceName = end._space(),
				space = spaces[ spaceName ],
				startColor = this.alpha() === 0 ? color( "transparent" ) : this,
				start = startColor[ space.cache ] || space.to( startColor._rgba ),
				result = start.slice();

			end = end[ space.cache ];
			each( space.props, function( _key, prop ) {
				var index = prop.idx,
					startValue = start[ index ],
					endValue = end[ index ],
					type = propTypes[ prop.type ] || {};

				// if null, don't override start value
				if ( endValue === null ) {
					return;
				}

				// if null - use end
				if ( startValue === null ) {
					result[ index ] = endValue;
				} else {
					if ( type.mod ) {
						if ( endValue - startValue > type.mod / 2 ) {
							startValue += type.mod;
						} else if ( startValue - endValue > type.mod / 2 ) {
							startValue -= type.mod;
						}
					}
					result[ index ] = clamp( ( endValue - startValue ) * distance + startValue, prop );
				}
			} );
			return this[ spaceName ]( result );
		},
		blend: function( opaque ) {

			// if we are already opaque - return ourself
			if ( this._rgba[ 3 ] === 1 ) {
				return this;
			}

			var rgb = this._rgba.slice(),
				a = rgb.pop(),
				blend = color( opaque )._rgba;

			return color( jQuery.map( rgb, function( v, i ) {
				return ( 1 - a ) * blend[ i ] + a * v;
			} ) );
		},
		toRgbaString: function() {
			var prefix = "rgba(",
				rgba = jQuery.map( this._rgba, function( v, i ) {
					if ( v != null ) {
						return v;
					}
					return i > 2 ? 1 : 0;
				} );

			if ( rgba[ 3 ] === 1 ) {
				rgba.pop();
				prefix = "rgb(";
			}

			return prefix + rgba.join() + ")";
		},
		toHslaString: function() {
			var prefix = "hsla(",
				hsla = jQuery.map( this.hsla(), function( v, i ) {
					if ( v == null ) {
						v = i > 2 ? 1 : 0;
					}

					// catch 1 and 2
					if ( i && i < 3 ) {
						v = Math.round( v * 100 ) + "%";
					}
					return v;
				} );

			if ( hsla[ 3 ] === 1 ) {
				hsla.pop();
				prefix = "hsl(";
			}
			return prefix + hsla.join() + ")";
		},
		toHexString: function( includeAlpha ) {
			var rgba = this._rgba.slice(),
				alpha = rgba.pop();

			if ( includeAlpha ) {
				rgba.push( ~~( alpha * 255 ) );
			}

			return "#" + jQuery.map( rgba, function( v ) {

				// default to 0 when nulls exist
				v = ( v || 0 ).toString( 16 );
				return v.length === 1 ? "0" + v : v;
			} ).join( "" );
		},
		toString: function() {
			return this._rgba[ 3 ] === 0 ? "transparent" : this.toRgbaString();
		}
	} );
	color.fn.parse.prototype = color.fn;

// hsla conversions adapted from:
// https://code.google.com/p/maashaack/source/browse/packages/graphics/trunk/src/graphics/colors/HUE2RGB.as?r=5021

	function hue2rgb( p, q, h ) {
		h = ( h + 1 ) % 1;
		if ( h * 6 < 1 ) {
			return p + ( q - p ) * h * 6;
		}
		if ( h * 2 < 1 ) {
			return q;
		}
		if ( h * 3 < 2 ) {
			return p + ( q - p ) * ( ( 2 / 3 ) - h ) * 6;
		}
		return p;
	}

	spaces.hsla.to = function( rgba ) {
		if ( rgba[ 0 ] == null || rgba[ 1 ] == null || rgba[ 2 ] == null ) {
			return [ null, null, null, rgba[ 3 ] ];
		}
		var r = rgba[ 0 ] / 255,
			g = rgba[ 1 ] / 255,
			b = rgba[ 2 ] / 255,
			a = rgba[ 3 ],
			max = Math.max( r, g, b ),
			min = Math.min( r, g, b ),
			diff = max - min,
			add = max + min,
			l = add * 0.5,
			h, s;

		if ( min === max ) {
			h = 0;
		} else if ( r === max ) {
			h = ( 60 * ( g - b ) / diff ) + 360;
		} else if ( g === max ) {
			h = ( 60 * ( b - r ) / diff ) + 120;
		} else {
			h = ( 60 * ( r - g ) / diff ) + 240;
		}

		// chroma (diff) == 0 means greyscale which, by definition, saturation = 0%
		// otherwise, saturation is based on the ratio of chroma (diff) to lightness (add)
		if ( diff === 0 ) {
			s = 0;
		} else if ( l <= 0.5 ) {
			s = diff / add;
		} else {
			s = diff / ( 2 - add );
		}
		return [ Math.round( h ) % 360, s, l, a == null ? 1 : a ];
	};

	spaces.hsla.from = function( hsla ) {
		if ( hsla[ 0 ] == null || hsla[ 1 ] == null || hsla[ 2 ] == null ) {
			return [ null, null, null, hsla[ 3 ] ];
		}
		var h = hsla[ 0 ] / 360,
			s = hsla[ 1 ],
			l = hsla[ 2 ],
			a = hsla[ 3 ],
			q = l <= 0.5 ? l * ( 1 + s ) : l + s - l * s,
			p = 2 * l - q;

		return [
			Math.round( hue2rgb( p, q, h + ( 1 / 3 ) ) * 255 ),
			Math.round( hue2rgb( p, q, h ) * 255 ),
			Math.round( hue2rgb( p, q, h - ( 1 / 3 ) ) * 255 ),
			a
		];
	};


	each( spaces, function( spaceName, space ) {
		var props = space.props,
			cache = space.cache,
			to = space.to,
			from = space.from;

		// makes rgba() and hsla()
		color.fn[ spaceName ] = function( value ) {

			// generate a cache for this space if it doesn't exist
			if ( to && !this[ cache ] ) {
				this[ cache ] = to( this._rgba );
			}
			if ( value === undefined ) {
				return this[ cache ].slice();
			}

			var ret,
				type = getType( value ),
				arr = ( type === "array" || type === "object" ) ? value : arguments,
				local = this[ cache ].slice();

			each( props, function( key, prop ) {
				var val = arr[ type === "object" ? key : prop.idx ];
				if ( val == null ) {
					val = local[ prop.idx ];
				}
				local[ prop.idx ] = clamp( val, prop );
			} );

			if ( from ) {
				ret = color( from( local ) );
				ret[ cache ] = local;
				return ret;
			} else {
				return color( local );
			}
		};

		// makes red() green() blue() alpha() hue() saturation() lightness()
		each( props, function( key, prop ) {

			// alpha is included in more than one space
			if ( color.fn[ key ] ) {
				return;
			}
			color.fn[ key ] = function( value ) {
				var local, cur, match, fn,
					vtype = getType( value );

				if ( key === "alpha" ) {
					fn = this._hsla ? "hsla" : "rgba";
				} else {
					fn = spaceName;
				}
				local = this[ fn ]();
				cur = local[ prop.idx ];

				if ( vtype === "undefined" ) {
					return cur;
				}

				if ( vtype === "function" ) {
					value = value.call( this, cur );
					vtype = getType( value );
				}
				if ( value == null && prop.empty ) {
					return this;
				}
				if ( vtype === "string" ) {
					match = rplusequals.exec( value );
					if ( match ) {
						value = cur + parseFloat( match[ 2 ] ) * ( match[ 1 ] === "+" ? 1 : -1 );
					}
				}
				local[ prop.idx ] = value;
				return this[ fn ]( local );
			};
		} );
	} );

// add cssHook and .fx.step function for each named hook.
// accept a space separated string of properties
	color.hook = function( hook ) {
		var hooks = hook.split( " " );
		each( hooks, function( _i, hook ) {
			jQuery.cssHooks[ hook ] = {
				set: function( elem, value ) {
					var parsed, curElem,
						backgroundColor = "";

					if ( value !== "transparent" && ( getType( value ) !== "string" || ( parsed = stringParse( value ) ) ) ) {
						value = color( parsed || value );
						if ( !support.rgba && value._rgba[ 3 ] !== 1 ) {
							curElem = hook === "backgroundColor" ? elem.parentNode : elem;
							while (
								( backgroundColor === "" || backgroundColor === "transparent" ) &&
								curElem && curElem.style
								) {
								try {
									backgroundColor = jQuery.css( curElem, "backgroundColor" );
									curElem = curElem.parentNode;
								} catch ( e ) {
								}
							}

							value = value.blend( backgroundColor && backgroundColor !== "transparent" ?
								backgroundColor :
								"_default" );
						}

						value = value.toRgbaString();
					}
					try {
						elem.style[ hook ] = value;
					} catch ( e ) {

						// wrapped to prevent IE from throwing errors on "invalid" values like 'auto' or 'inherit'
					}
				}
			};
			jQuery.fx.step[ hook ] = function( fx ) {
				if ( !fx.colorInit ) {
					fx.start = color( fx.elem, hook );
					fx.end = color( fx.end );
					fx.colorInit = true;
				}
				jQuery.cssHooks[ hook ].set( fx.elem, fx.start.transition( fx.end, fx.pos ) );
			};
		} );

	};

	color.hook( stepHooks );

	jQuery.cssHooks.borderColor = {
		expand: function( value ) {
			var expanded = {};

			each( [ "Top", "Right", "Bottom", "Left" ], function( _i, part ) {
				expanded[ "border" + part + "Color" ] = value;
			} );
			return expanded;
		}
	};

// Basic color names only.
// Usage of any of the other color names requires adding yourself or including
// jquery.color.svg-names.js.
	colors = jQuery.Color.names = {

		// 4.1. Basic color keywords
		aqua: "#00ffff",
		black: "#000000",
		blue: "#0000ff",
		fuchsia: "#ff00ff",
		gray: "#808080",
		green: "#008000",
		lime: "#00ff00",
		maroon: "#800000",
		navy: "#000080",
		olive: "#808000",
		purple: "#800080",
		red: "#ff0000",
		silver: "#c0c0c0",
		teal: "#008080",
		white: "#ffffff",
		yellow: "#ffff00",

		// 4.2.3. "transparent" color keyword
		transparent: [ null, null, null, 0 ],

		_default: "#ffffff"
	};


	/*!
 * jQuery UI Effects 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Effects Core
//>>group: Effects
	/* eslint-disable max-len */
//>>description: Extends the internal jQuery effects. Includes morphing and easing. Required by all other effects.
	/* eslint-enable max-len */
//>>docs: http://api.jqueryui.com/category/effects-core/
//>>demos: http://jqueryui.com/effect/


	var dataSpace = "ui-effects-",
		dataSpaceStyle = "ui-effects-style",
		dataSpaceAnimated = "ui-effects-animated";

	$.effects = {
		effect: {}
	};

	/******************************************************************************/
	/****************************** CLASS ANIMATIONS ******************************/
	/******************************************************************************/
	( function() {

		var classAnimationActions = [ "add", "remove", "toggle" ],
			shorthandStyles = {
				border: 1,
				borderBottom: 1,
				borderColor: 1,
				borderLeft: 1,
				borderRight: 1,
				borderTop: 1,
				borderWidth: 1,
				margin: 1,
				padding: 1
			};

		$.each(
			[ "borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle" ],
			function( _, prop ) {
				$.fx.step[ prop ] = function( fx ) {
					if ( fx.end !== "none" && !fx.setAttr || fx.pos === 1 && !fx.setAttr ) {
						jQuery.style( fx.elem, prop, fx.end );
						fx.setAttr = true;
					}
				};
			}
		);

		function camelCase( string ) {
			return string.replace( /-([\da-z])/gi, function( all, letter ) {
				return letter.toUpperCase();
			} );
		}

		function getElementStyles( elem ) {
			var key, len,
				style = elem.ownerDocument.defaultView ?
					elem.ownerDocument.defaultView.getComputedStyle( elem, null ) :
					elem.currentStyle,
				styles = {};

			if ( style && style.length && style[ 0 ] && style[ style[ 0 ] ] ) {
				len = style.length;
				while ( len-- ) {
					key = style[ len ];
					if ( typeof style[ key ] === "string" ) {
						styles[ camelCase( key ) ] = style[ key ];
					}
				}

				// Support: Opera, IE <9
			} else {
				for ( key in style ) {
					if ( typeof style[ key ] === "string" ) {
						styles[ key ] = style[ key ];
					}
				}
			}

			return styles;
		}

		function styleDifference( oldStyle, newStyle ) {
			var diff = {},
				name, value;

			for ( name in newStyle ) {
				value = newStyle[ name ];
				if ( oldStyle[ name ] !== value ) {
					if ( !shorthandStyles[ name ] ) {
						if ( $.fx.step[ name ] || !isNaN( parseFloat( value ) ) ) {
							diff[ name ] = value;
						}
					}
				}
			}

			return diff;
		}

// Support: jQuery <1.8
		if ( !$.fn.addBack ) {
			$.fn.addBack = function( selector ) {
				return this.add( selector == null ?
					this.prevObject : this.prevObject.filter( selector )
				);
			};
		}

		$.effects.animateClass = function( value, duration, easing, callback ) {
			var o = $.speed( duration, easing, callback );

			return this.queue( function() {
				var animated = $( this ),
					baseClass = animated.attr( "class" ) || "",
					applyClassChange,
					allAnimations = o.children ? animated.find( "*" ).addBack() : animated;

				// Map the animated objects to store the original styles.
				allAnimations = allAnimations.map( function() {
					var el = $( this );
					return {
						el: el,
						start: getElementStyles( this )
					};
				} );

				// Apply class change
				applyClassChange = function() {
					$.each( classAnimationActions, function( i, action ) {
						if ( value[ action ] ) {
							animated[ action + "Class" ]( value[ action ] );
						}
					} );
				};
				applyClassChange();

				// Map all animated objects again - calculate new styles and diff
				allAnimations = allAnimations.map( function() {
					this.end = getElementStyles( this.el[ 0 ] );
					this.diff = styleDifference( this.start, this.end );
					return this;
				} );

				// Apply original class
				animated.attr( "class", baseClass );

				// Map all animated objects again - this time collecting a promise
				allAnimations = allAnimations.map( function() {
					var styleInfo = this,
						dfd = $.Deferred(),
						opts = $.extend( {}, o, {
							queue: false,
							complete: function() {
								dfd.resolve( styleInfo );
							}
						} );

					this.el.animate( this.diff, opts );
					return dfd.promise();
				} );

				// Once all animations have completed:
				$.when.apply( $, allAnimations.get() ).done( function() {

					// Set the final class
					applyClassChange();

					// For each animated element,
					// clear all css properties that were animated
					$.each( arguments, function() {
						var el = this.el;
						$.each( this.diff, function( key ) {
							el.css( key, "" );
						} );
					} );

					// This is guarnteed to be there if you use jQuery.speed()
					// it also handles dequeuing the next anim...
					o.complete.call( animated[ 0 ] );
				} );
			} );
		};

		$.fn.extend( {
			addClass: ( function( orig ) {
				return function( classNames, speed, easing, callback ) {
					return speed ?
						$.effects.animateClass.call( this,
							{ add: classNames }, speed, easing, callback ) :
						orig.apply( this, arguments );
				};
			} )( $.fn.addClass ),

			removeClass: ( function( orig ) {
				return function( classNames, speed, easing, callback ) {
					return arguments.length > 1 ?
						$.effects.animateClass.call( this,
							{ remove: classNames }, speed, easing, callback ) :
						orig.apply( this, arguments );
				};
			} )( $.fn.removeClass ),

			toggleClass: ( function( orig ) {
				return function( classNames, force, speed, easing, callback ) {
					if ( typeof force === "boolean" || force === undefined ) {
						if ( !speed ) {

							// Without speed parameter
							return orig.apply( this, arguments );
						} else {
							return $.effects.animateClass.call( this,
								( force ? { add: classNames } : { remove: classNames } ),
								speed, easing, callback );
						}
					} else {

						// Without force parameter
						return $.effects.animateClass.call( this,
							{ toggle: classNames }, force, speed, easing );
					}
				};
			} )( $.fn.toggleClass ),

			switchClass: function( remove, add, speed, easing, callback ) {
				return $.effects.animateClass.call( this, {
					add: add,
					remove: remove
				}, speed, easing, callback );
			}
		} );

	} )();

	/******************************************************************************/
	/*********************************** EFFECTS **********************************/
	/******************************************************************************/

	( function() {

		if ( $.expr && $.expr.pseudos && $.expr.pseudos.animated ) {
			$.expr.pseudos.animated = ( function( orig ) {
				return function( elem ) {
					return !!$( elem ).data( dataSpaceAnimated ) || orig( elem );
				};
			} )( $.expr.pseudos.animated );
		}

		if ( $.uiBackCompat !== false ) {
			$.extend( $.effects, {

				// Saves a set of properties in a data storage
				save: function( element, set ) {
					var i = 0, length = set.length;
					for ( ; i < length; i++ ) {
						if ( set[ i ] !== null ) {
							element.data( dataSpace + set[ i ], element[ 0 ].style[ set[ i ] ] );
						}
					}
				},

				// Restores a set of previously saved properties from a data storage
				restore: function( element, set ) {
					var val, i = 0, length = set.length;
					for ( ; i < length; i++ ) {
						if ( set[ i ] !== null ) {
							val = element.data( dataSpace + set[ i ] );
							element.css( set[ i ], val );
						}
					}
				},

				setMode: function( el, mode ) {
					if ( mode === "toggle" ) {
						mode = el.is( ":hidden" ) ? "show" : "hide";
					}
					return mode;
				},

				// Wraps the element around a wrapper that copies position properties
				createWrapper: function( element ) {

					// If the element is already wrapped, return it
					if ( element.parent().is( ".ui-effects-wrapper" ) ) {
						return element.parent();
					}

					// Wrap the element
					var props = {
							width: element.outerWidth( true ),
							height: element.outerHeight( true ),
							"float": element.css( "float" )
						},
						wrapper = $( "<div></div>" )
						.addClass( "ui-effects-wrapper" )
						.css( {
							fontSize: "100%",
							background: "transparent",
							border: "none",
							margin: 0,
							padding: 0
						} ),

						// Store the size in case width/height are defined in % - Fixes #5245
						size = {
							width: element.width(),
							height: element.height()
						},
						active = document.activeElement;

					// Support: Firefox
					// Firefox incorrectly exposes anonymous content
					// https://bugzilla.mozilla.org/show_bug.cgi?id=561664
					try {
						// eslint-disable-next-line no-unused-expressions
						active.id;
					} catch ( e ) {
						active = document.body;
					}

					element.wrap( wrapper );

					// Fixes #7595 - Elements lose focus when wrapped.
					if ( element[ 0 ] === active || $.contains( element[ 0 ], active ) ) {
						$( active ).trigger( "focus" );
					}

					// Hotfix for jQuery 1.4 since some change in wrap() seems to actually
					// lose the reference to the wrapped element
					wrapper = element.parent();

					// Transfer positioning properties to the wrapper
					if ( element.css( "position" ) === "static" ) {
						wrapper.css( { position: "relative" } );
						element.css( { position: "relative" } );
					} else {
						$.extend( props, {
							position: element.css( "position" ),
							zIndex: element.css( "z-index" )
						} );
						$.each( [ "top", "left", "bottom", "right" ], function( i, pos ) {
							props[ pos ] = element.css( pos );
							if ( isNaN( parseInt( props[ pos ], 10 ) ) ) {
								props[ pos ] = "auto";
							}
						} );
						element.css( {
							position: "relative",
							top: 0,
							left: 0,
							right: "auto",
							bottom: "auto"
						} );
					}
					element.css( size );

					return wrapper.css( props ).show();
				},

				removeWrapper: function( element ) {
					var active = document.activeElement;

					if ( element.parent().is( ".ui-effects-wrapper" ) ) {
						element.parent().replaceWith( element );

						// Fixes #7595 - Elements lose focus when wrapped.
						if ( element[ 0 ] === active || $.contains( element[ 0 ], active ) ) {
							$( active ).trigger( "focus" );
						}
					}

					return element;
				}
			} );
		}

		$.extend( $.effects, {
			version: "1.13.0",

			define: function( name, mode, effect ) {
				if ( !effect ) {
					effect = mode;
					mode = "effect";
				}

				$.effects.effect[ name ] = effect;
				$.effects.effect[ name ].mode = mode;

				return effect;
			},

			scaledDimensions: function( element, percent, direction ) {
				if ( percent === 0 ) {
					return {
						height: 0,
						width: 0,
						outerHeight: 0,
						outerWidth: 0
					};
				}

				var x = direction !== "horizontal" ? ( ( percent || 100 ) / 100 ) : 1,
					y = direction !== "vertical" ? ( ( percent || 100 ) / 100 ) : 1;

				return {
					height: element.height() * y,
					width: element.width() * x,
					outerHeight: element.outerHeight() * y,
					outerWidth: element.outerWidth() * x
				};

			},

			clipToBox: function( animation ) {
				return {
					width: animation.clip.right - animation.clip.left,
					height: animation.clip.bottom - animation.clip.top,
					left: animation.clip.left,
					top: animation.clip.top
				};
			},

			// Injects recently queued functions to be first in line (after "inprogress")
			unshift: function( element, queueLength, count ) {
				var queue = element.queue();

				if ( queueLength > 1 ) {
					queue.splice.apply( queue,
						[ 1, 0 ].concat( queue.splice( queueLength, count ) ) );
				}
				element.dequeue();
			},

			saveStyle: function( element ) {
				element.data( dataSpaceStyle, element[ 0 ].style.cssText );
			},

			restoreStyle: function( element ) {
				element[ 0 ].style.cssText = element.data( dataSpaceStyle ) || "";
				element.removeData( dataSpaceStyle );
			},

			mode: function( element, mode ) {
				var hidden = element.is( ":hidden" );

				if ( mode === "toggle" ) {
					mode = hidden ? "show" : "hide";
				}
				if ( hidden ? mode === "hide" : mode === "show" ) {
					mode = "none";
				}
				return mode;
			},

			// Translates a [top,left] array into a baseline value
			getBaseline: function( origin, original ) {
				var y, x;

				switch ( origin[ 0 ] ) {
					case "top":
						y = 0;
						break;
					case "middle":
						y = 0.5;
						break;
					case "bottom":
						y = 1;
						break;
					default:
						y = origin[ 0 ] / original.height;
				}

				switch ( origin[ 1 ] ) {
					case "left":
						x = 0;
						break;
					case "center":
						x = 0.5;
						break;
					case "right":
						x = 1;
						break;
					default:
						x = origin[ 1 ] / original.width;
				}

				return {
					x: x,
					y: y
				};
			},

			// Creates a placeholder element so that the original element can be made absolute
			createPlaceholder: function( element ) {
				var placeholder,
					cssPosition = element.css( "position" ),
					position = element.position();

				// Lock in margins first to account for form elements, which
				// will change margin if you explicitly set height
				// see: http://jsfiddle.net/JZSMt/3/ https://bugs.webkit.org/show_bug.cgi?id=107380
				// Support: Safari
				element.css( {
					marginTop: element.css( "marginTop" ),
					marginBottom: element.css( "marginBottom" ),
					marginLeft: element.css( "marginLeft" ),
					marginRight: element.css( "marginRight" )
				} )
				.outerWidth( element.outerWidth() )
				.outerHeight( element.outerHeight() );

				if ( /^(static|relative)/.test( cssPosition ) ) {
					cssPosition = "absolute";

					placeholder = $( "<" + element[ 0 ].nodeName + ">" ).insertAfter( element ).css( {

						// Convert inline to inline block to account for inline elements
						// that turn to inline block based on content (like img)
						display: /^(inline|ruby)/.test( element.css( "display" ) ) ?
							"inline-block" :
							"block",
						visibility: "hidden",

						// Margins need to be set to account for margin collapse
						marginTop: element.css( "marginTop" ),
						marginBottom: element.css( "marginBottom" ),
						marginLeft: element.css( "marginLeft" ),
						marginRight: element.css( "marginRight" ),
						"float": element.css( "float" )
					} )
					.outerWidth( element.outerWidth() )
					.outerHeight( element.outerHeight() )
					.addClass( "ui-effects-placeholder" );

					element.data( dataSpace + "placeholder", placeholder );
				}

				element.css( {
					position: cssPosition,
					left: position.left,
					top: position.top
				} );

				return placeholder;
			},

			removePlaceholder: function( element ) {
				var dataKey = dataSpace + "placeholder",
					placeholder = element.data( dataKey );

				if ( placeholder ) {
					placeholder.remove();
					element.removeData( dataKey );
				}
			},

			// Removes a placeholder if it exists and restores
			// properties that were modified during placeholder creation
			cleanUp: function( element ) {
				$.effects.restoreStyle( element );
				$.effects.removePlaceholder( element );
			},

			setTransition: function( element, list, factor, value ) {
				value = value || {};
				$.each( list, function( i, x ) {
					var unit = element.cssUnit( x );
					if ( unit[ 0 ] > 0 ) {
						value[ x ] = unit[ 0 ] * factor + unit[ 1 ];
					}
				} );
				return value;
			}
		} );

// Return an effect options object for the given parameters:
		function _normalizeArguments( effect, options, speed, callback ) {

			// Allow passing all options as the first parameter
			if ( $.isPlainObject( effect ) ) {
				options = effect;
				effect = effect.effect;
			}

			// Convert to an object
			effect = { effect: effect };

			// Catch (effect, null, ...)
			if ( options == null ) {
				options = {};
			}

			// Catch (effect, callback)
			if ( typeof options === "function" ) {
				callback = options;
				speed = null;
				options = {};
			}

			// Catch (effect, speed, ?)
			if ( typeof options === "number" || $.fx.speeds[ options ] ) {
				callback = speed;
				speed = options;
				options = {};
			}

			// Catch (effect, options, callback)
			if ( typeof speed === "function" ) {
				callback = speed;
				speed = null;
			}

			// Add options to effect
			if ( options ) {
				$.extend( effect, options );
			}

			speed = speed || options.duration;
			effect.duration = $.fx.off ? 0 :
				typeof speed === "number" ? speed :
					speed in $.fx.speeds ? $.fx.speeds[ speed ] :
						$.fx.speeds._default;

			effect.complete = callback || options.complete;

			return effect;
		}

		function standardAnimationOption( option ) {

			// Valid standard speeds (nothing, number, named speed)
			if ( !option || typeof option === "number" || $.fx.speeds[ option ] ) {
				return true;
			}

			// Invalid strings - treat as "normal" speed
			if ( typeof option === "string" && !$.effects.effect[ option ] ) {
				return true;
			}

			// Complete callback
			if ( typeof option === "function" ) {
				return true;
			}

			// Options hash (but not naming an effect)
			if ( typeof option === "object" && !option.effect ) {
				return true;
			}

			// Didn't match any standard API
			return false;
		}

		$.fn.extend( {
			effect: function( /* effect, options, speed, callback */ ) {
				var args = _normalizeArguments.apply( this, arguments ),
					effectMethod = $.effects.effect[ args.effect ],
					defaultMode = effectMethod.mode,
					queue = args.queue,
					queueName = queue || "fx",
					complete = args.complete,
					mode = args.mode,
					modes = [],
					prefilter = function( next ) {
						var el = $( this ),
							normalizedMode = $.effects.mode( el, mode ) || defaultMode;

						// Sentinel for duck-punching the :animated pseudo-selector
						el.data( dataSpaceAnimated, true );

						// Save effect mode for later use,
						// we can't just call $.effects.mode again later,
						// as the .show() below destroys the initial state
						modes.push( normalizedMode );

						// See $.uiBackCompat inside of run() for removal of defaultMode in 1.14
						if ( defaultMode && ( normalizedMode === "show" ||
							( normalizedMode === defaultMode && normalizedMode === "hide" ) ) ) {
							el.show();
						}

						if ( !defaultMode || normalizedMode !== "none" ) {
							$.effects.saveStyle( el );
						}

						if ( typeof next === "function" ) {
							next();
						}
					};

				if ( $.fx.off || !effectMethod ) {

					// Delegate to the original method (e.g., .show()) if possible
					if ( mode ) {
						return this[ mode ]( args.duration, complete );
					} else {
						return this.each( function() {
							if ( complete ) {
								complete.call( this );
							}
						} );
					}
				}

				function run( next ) {
					var elem = $( this );

					function cleanup() {
						elem.removeData( dataSpaceAnimated );

						$.effects.cleanUp( elem );

						if ( args.mode === "hide" ) {
							elem.hide();
						}

						done();
					}

					function done() {
						if ( typeof complete === "function" ) {
							complete.call( elem[ 0 ] );
						}

						if ( typeof next === "function" ) {
							next();
						}
					}

					// Override mode option on a per element basis,
					// as toggle can be either show or hide depending on element state
					args.mode = modes.shift();

					if ( $.uiBackCompat !== false && !defaultMode ) {
						if ( elem.is( ":hidden" ) ? mode === "hide" : mode === "show" ) {

							// Call the core method to track "olddisplay" properly
							elem[ mode ]();
							done();
						} else {
							effectMethod.call( elem[ 0 ], args, done );
						}
					} else {
						if ( args.mode === "none" ) {

							// Call the core method to track "olddisplay" properly
							elem[ mode ]();
							done();
						} else {
							effectMethod.call( elem[ 0 ], args, cleanup );
						}
					}
				}

				// Run prefilter on all elements first to ensure that
				// any showing or hiding happens before placeholder creation,
				// which ensures that any layout changes are correctly captured.
				return queue === false ?
					this.each( prefilter ).each( run ) :
					this.queue( queueName, prefilter ).queue( queueName, run );
			},

			show: ( function( orig ) {
				return function( option ) {
					if ( standardAnimationOption( option ) ) {
						return orig.apply( this, arguments );
					} else {
						var args = _normalizeArguments.apply( this, arguments );
						args.mode = "show";
						return this.effect.call( this, args );
					}
				};
			} )( $.fn.show ),

			hide: ( function( orig ) {
				return function( option ) {
					if ( standardAnimationOption( option ) ) {
						return orig.apply( this, arguments );
					} else {
						var args = _normalizeArguments.apply( this, arguments );
						args.mode = "hide";
						return this.effect.call( this, args );
					}
				};
			} )( $.fn.hide ),

			toggle: ( function( orig ) {
				return function( option ) {
					if ( standardAnimationOption( option ) || typeof option === "boolean" ) {
						return orig.apply( this, arguments );
					} else {
						var args = _normalizeArguments.apply( this, arguments );
						args.mode = "toggle";
						return this.effect.call( this, args );
					}
				};
			} )( $.fn.toggle ),

			cssUnit: function( key ) {
				var style = this.css( key ),
					val = [];

				$.each( [ "em", "px", "%", "pt" ], function( i, unit ) {
					if ( style.indexOf( unit ) > 0 ) {
						val = [ parseFloat( style ), unit ];
					}
				} );
				return val;
			},

			cssClip: function( clipObj ) {
				if ( clipObj ) {
					return this.css( "clip", "rect(" + clipObj.top + "px " + clipObj.right + "px " +
						clipObj.bottom + "px " + clipObj.left + "px)" );
				}
				return parseClip( this.css( "clip" ), this );
			},

			transfer: function( options, done ) {
				var element = $( this ),
					target = $( options.to ),
					targetFixed = target.css( "position" ) === "fixed",
					body = $( "body" ),
					fixTop = targetFixed ? body.scrollTop() : 0,
					fixLeft = targetFixed ? body.scrollLeft() : 0,
					endPosition = target.offset(),
					animation = {
						top: endPosition.top - fixTop,
						left: endPosition.left - fixLeft,
						height: target.innerHeight(),
						width: target.innerWidth()
					},
					startPosition = element.offset(),
					transfer = $( "<div class='ui-effects-transfer'></div>" );

				transfer
				.appendTo( "body" )
				.addClass( options.className )
				.css( {
					top: startPosition.top - fixTop,
					left: startPosition.left - fixLeft,
					height: element.innerHeight(),
					width: element.innerWidth(),
					position: targetFixed ? "fixed" : "absolute"
				} )
				.animate( animation, options.duration, options.easing, function() {
					transfer.remove();
					if ( typeof done === "function" ) {
						done();
					}
				} );
			}
		} );

		function parseClip( str, element ) {
			var outerWidth = element.outerWidth(),
				outerHeight = element.outerHeight(),
				clipRegex = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,
				values = clipRegex.exec( str ) || [ "", 0, outerWidth, outerHeight, 0 ];

			return {
				top: parseFloat( values[ 1 ] ) || 0,
				right: values[ 2 ] === "auto" ? outerWidth : parseFloat( values[ 2 ] ),
				bottom: values[ 3 ] === "auto" ? outerHeight : parseFloat( values[ 3 ] ),
				left: parseFloat( values[ 4 ] ) || 0
			};
		}

		$.fx.step.clip = function( fx ) {
			if ( !fx.clipInit ) {
				fx.start = $( fx.elem ).cssClip();
				if ( typeof fx.end === "string" ) {
					fx.end = parseClip( fx.end, fx.elem );
				}
				fx.clipInit = true;
			}

			$( fx.elem ).cssClip( {
				top: fx.pos * ( fx.end.top - fx.start.top ) + fx.start.top,
				right: fx.pos * ( fx.end.right - fx.start.right ) + fx.start.right,
				bottom: fx.pos * ( fx.end.bottom - fx.start.bottom ) + fx.start.bottom,
				left: fx.pos * ( fx.end.left - fx.start.left ) + fx.start.left
			} );
		};

	} )();

	/******************************************************************************/
	/*********************************** EASING ***********************************/
	/******************************************************************************/

	( function() {

// Based on easing equations from Robert Penner (http://www.robertpenner.com/easing)

		var baseEasings = {};

		$.each( [ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function( i, name ) {
			baseEasings[ name ] = function( p ) {
				return Math.pow( p, i + 2 );
			};
		} );

		$.extend( baseEasings, {
			Sine: function( p ) {
				return 1 - Math.cos( p * Math.PI / 2 );
			},
			Circ: function( p ) {
				return 1 - Math.sqrt( 1 - p * p );
			},
			Elastic: function( p ) {
				return p === 0 || p === 1 ? p :
					-Math.pow( 2, 8 * ( p - 1 ) ) * Math.sin( ( ( p - 1 ) * 80 - 7.5 ) * Math.PI / 15 );
			},
			Back: function( p ) {
				return p * p * ( 3 * p - 2 );
			},
			Bounce: function( p ) {
				var pow2,
					bounce = 4;

				while ( p < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
				return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - p, 2 );
			}
		} );

		$.each( baseEasings, function( name, easeIn ) {
			$.easing[ "easeIn" + name ] = easeIn;
			$.easing[ "easeOut" + name ] = function( p ) {
				return 1 - easeIn( 1 - p );
			};
			$.easing[ "easeInOut" + name ] = function( p ) {
				return p < 0.5 ?
					easeIn( p * 2 ) / 2 :
					1 - easeIn( p * -2 + 2 ) / 2;
			};
		} );

	} )();

	var effect = $.effects;


	/*!
 * jQuery UI Effects Blind 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Blind Effect
//>>group: Effects
//>>description: Blinds the element.
//>>docs: http://api.jqueryui.com/blind-effect/
//>>demos: http://jqueryui.com/effect/


	var effectsEffectBlind = $.effects.define( "blind", "hide", function( options, done ) {
		var map = {
				up: [ "bottom", "top" ],
				vertical: [ "bottom", "top" ],
				down: [ "top", "bottom" ],
				left: [ "right", "left" ],
				horizontal: [ "right", "left" ],
				right: [ "left", "right" ]
			},
			element = $( this ),
			direction = options.direction || "up",
			start = element.cssClip(),
			animate = { clip: $.extend( {}, start ) },
			placeholder = $.effects.createPlaceholder( element );

		animate.clip[ map[ direction ][ 0 ] ] = animate.clip[ map[ direction ][ 1 ] ];

		if ( options.mode === "show" ) {
			element.cssClip( animate.clip );
			if ( placeholder ) {
				placeholder.css( $.effects.clipToBox( animate ) );
			}

			animate.clip = start;
		}

		if ( placeholder ) {
			placeholder.animate( $.effects.clipToBox( animate ), options.duration, options.easing );
		}

		element.animate( animate, {
			queue: false,
			duration: options.duration,
			easing: options.easing,
			complete: done
		} );
	} );


	/*!
 * jQuery UI Effects Bounce 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Bounce Effect
//>>group: Effects
//>>description: Bounces an element horizontally or vertically n times.
//>>docs: http://api.jqueryui.com/bounce-effect/
//>>demos: http://jqueryui.com/effect/


	var effectsEffectBounce = $.effects.define( "bounce", function( options, done ) {
		var upAnim, downAnim, refValue,
			element = $( this ),

			// Defaults:
			mode = options.mode,
			hide = mode === "hide",
			show = mode === "show",
			direction = options.direction || "up",
			distance = options.distance,
			times = options.times || 5,

			// Number of internal animations
			anims = times * 2 + ( show || hide ? 1 : 0 ),
			speed = options.duration / anims,
			easing = options.easing,

			// Utility:
			ref = ( direction === "up" || direction === "down" ) ? "top" : "left",
			motion = ( direction === "up" || direction === "left" ),
			i = 0,

			queuelen = element.queue().length;

		$.effects.createPlaceholder( element );

		refValue = element.css( ref );

		// Default distance for the BIGGEST bounce is the outer Distance / 3
		if ( !distance ) {
			distance = element[ ref === "top" ? "outerHeight" : "outerWidth" ]() / 3;
		}

		if ( show ) {
			downAnim = { opacity: 1 };
			downAnim[ ref ] = refValue;

			// If we are showing, force opacity 0 and set the initial position
			// then do the "first" animation
			element
			.css( "opacity", 0 )
			.css( ref, motion ? -distance * 2 : distance * 2 )
			.animate( downAnim, speed, easing );
		}

		// Start at the smallest distance if we are hiding
		if ( hide ) {
			distance = distance / Math.pow( 2, times - 1 );
		}

		downAnim = {};
		downAnim[ ref ] = refValue;

		// Bounces up/down/left/right then back to 0 -- times * 2 animations happen here
		for ( ; i < times; i++ ) {
			upAnim = {};
			upAnim[ ref ] = ( motion ? "-=" : "+=" ) + distance;

			element
			.animate( upAnim, speed, easing )
			.animate( downAnim, speed, easing );

			distance = hide ? distance * 2 : distance / 2;
		}

		// Last Bounce when Hiding
		if ( hide ) {
			upAnim = { opacity: 0 };
			upAnim[ ref ] = ( motion ? "-=" : "+=" ) + distance;

			element.animate( upAnim, speed, easing );
		}

		element.queue( done );

		$.effects.unshift( element, queuelen, anims + 1 );
	} );


	/*!
 * jQuery UI Effects Clip 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Clip Effect
//>>group: Effects
//>>description: Clips the element on and off like an old TV.
//>>docs: http://api.jqueryui.com/clip-effect/
//>>demos: http://jqueryui.com/effect/


	var effectsEffectClip = $.effects.define( "clip", "hide", function( options, done ) {
		var start,
			animate = {},
			element = $( this ),
			direction = options.direction || "vertical",
			both = direction === "both",
			horizontal = both || direction === "horizontal",
			vertical = both || direction === "vertical";

		start = element.cssClip();
		animate.clip = {
			top: vertical ? ( start.bottom - start.top ) / 2 : start.top,
			right: horizontal ? ( start.right - start.left ) / 2 : start.right,
			bottom: vertical ? ( start.bottom - start.top ) / 2 : start.bottom,
			left: horizontal ? ( start.right - start.left ) / 2 : start.left
		};

		$.effects.createPlaceholder( element );

		if ( options.mode === "show" ) {
			element.cssClip( animate.clip );
			animate.clip = start;
		}

		element.animate( animate, {
			queue: false,
			duration: options.duration,
			easing: options.easing,
			complete: done
		} );

	} );


	/*!
 * jQuery UI Effects Drop 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Drop Effect
//>>group: Effects
//>>description: Moves an element in one direction and hides it at the same time.
//>>docs: http://api.jqueryui.com/drop-effect/
//>>demos: http://jqueryui.com/effect/


	var effectsEffectDrop = $.effects.define( "drop", "hide", function( options, done ) {

		var distance,
			element = $( this ),
			mode = options.mode,
			show = mode === "show",
			direction = options.direction || "left",
			ref = ( direction === "up" || direction === "down" ) ? "top" : "left",
			motion = ( direction === "up" || direction === "left" ) ? "-=" : "+=",
			oppositeMotion = ( motion === "+=" ) ? "-=" : "+=",
			animation = {
				opacity: 0
			};

		$.effects.createPlaceholder( element );

		distance = options.distance ||
			element[ ref === "top" ? "outerHeight" : "outerWidth" ]( true ) / 2;

		animation[ ref ] = motion + distance;

		if ( show ) {
			element.css( animation );

			animation[ ref ] = oppositeMotion + distance;
			animation.opacity = 1;
		}

		// Animate
		element.animate( animation, {
			queue: false,
			duration: options.duration,
			easing: options.easing,
			complete: done
		} );
	} );


	/*!
 * jQuery UI Effects Explode 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Explode Effect
//>>group: Effects
	/* eslint-disable max-len */
//>>description: Explodes an element in all directions into n pieces. Implodes an element to its original wholeness.
	/* eslint-enable max-len */
//>>docs: http://api.jqueryui.com/explode-effect/
//>>demos: http://jqueryui.com/effect/


	var effectsEffectExplode = $.effects.define( "explode", "hide", function( options, done ) {

		var i, j, left, top, mx, my,
			rows = options.pieces ? Math.round( Math.sqrt( options.pieces ) ) : 3,
			cells = rows,
			element = $( this ),
			mode = options.mode,
			show = mode === "show",

			// Show and then visibility:hidden the element before calculating offset
			offset = element.show().css( "visibility", "hidden" ).offset(),

			// Width and height of a piece
			width = Math.ceil( element.outerWidth() / cells ),
			height = Math.ceil( element.outerHeight() / rows ),
			pieces = [];

		// Children animate complete:
		function childComplete() {
			pieces.push( this );
			if ( pieces.length === rows * cells ) {
				animComplete();
			}
		}

		// Clone the element for each row and cell.
		for ( i = 0; i < rows; i++ ) { // ===>
			top = offset.top + i * height;
			my = i - ( rows - 1 ) / 2;

			for ( j = 0; j < cells; j++ ) { // |||
				left = offset.left + j * width;
				mx = j - ( cells - 1 ) / 2;

				// Create a clone of the now hidden main element that will be absolute positioned
				// within a wrapper div off the -left and -top equal to size of our pieces
				element
				.clone()
				.appendTo( "body" )
				.wrap( "<div></div>" )
				.css( {
					position: "absolute",
					visibility: "visible",
					left: -j * width,
					top: -i * height
				} )

				// Select the wrapper - make it overflow: hidden and absolute positioned based on
				// where the original was located +left and +top equal to the size of pieces
				.parent()
				.addClass( "ui-effects-explode" )
				.css( {
					position: "absolute",
					overflow: "hidden",
					width: width,
					height: height,
					left: left + ( show ? mx * width : 0 ),
					top: top + ( show ? my * height : 0 ),
					opacity: show ? 0 : 1
				} )
				.animate( {
					left: left + ( show ? 0 : mx * width ),
					top: top + ( show ? 0 : my * height ),
					opacity: show ? 1 : 0
				}, options.duration || 500, options.easing, childComplete );
			}
		}

		function animComplete() {
			element.css( {
				visibility: "visible"
			} );
			$( pieces ).remove();
			done();
		}
	} );


	/*!
 * jQuery UI Effects Fade 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Fade Effect
//>>group: Effects
//>>description: Fades the element.
//>>docs: http://api.jqueryui.com/fade-effect/
//>>demos: http://jqueryui.com/effect/


	var effectsEffectFade = $.effects.define( "fade", "toggle", function( options, done ) {
		var show = options.mode === "show";

		$( this )
		.css( "opacity", show ? 0 : 1 )
		.animate( {
			opacity: show ? 1 : 0
		}, {
			queue: false,
			duration: options.duration,
			easing: options.easing,
			complete: done
		} );
	} );


	/*!
 * jQuery UI Effects Fold 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Fold Effect
//>>group: Effects
//>>description: Folds an element first horizontally and then vertically.
//>>docs: http://api.jqueryui.com/fold-effect/
//>>demos: http://jqueryui.com/effect/


	var effectsEffectFold = $.effects.define( "fold", "hide", function( options, done ) {

		// Create element
		var element = $( this ),
			mode = options.mode,
			show = mode === "show",
			hide = mode === "hide",
			size = options.size || 15,
			percent = /([0-9]+)%/.exec( size ),
			horizFirst = !!options.horizFirst,
			ref = horizFirst ? [ "right", "bottom" ] : [ "bottom", "right" ],
			duration = options.duration / 2,

			placeholder = $.effects.createPlaceholder( element ),

			start = element.cssClip(),
			animation1 = { clip: $.extend( {}, start ) },
			animation2 = { clip: $.extend( {}, start ) },

			distance = [ start[ ref[ 0 ] ], start[ ref[ 1 ] ] ],

			queuelen = element.queue().length;

		if ( percent ) {
			size = parseInt( percent[ 1 ], 10 ) / 100 * distance[ hide ? 0 : 1 ];
		}
		animation1.clip[ ref[ 0 ] ] = size;
		animation2.clip[ ref[ 0 ] ] = size;
		animation2.clip[ ref[ 1 ] ] = 0;

		if ( show ) {
			element.cssClip( animation2.clip );
			if ( placeholder ) {
				placeholder.css( $.effects.clipToBox( animation2 ) );
			}

			animation2.clip = start;
		}

		// Animate
		element
		.queue( function( next ) {
			if ( placeholder ) {
				placeholder
				.animate( $.effects.clipToBox( animation1 ), duration, options.easing )
				.animate( $.effects.clipToBox( animation2 ), duration, options.easing );
			}

			next();
		} )
		.animate( animation1, duration, options.easing )
		.animate( animation2, duration, options.easing )
		.queue( done );

		$.effects.unshift( element, queuelen, 4 );
	} );


	/*!
 * jQuery UI Effects Highlight 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Highlight Effect
//>>group: Effects
//>>description: Highlights the background of an element in a defined color for a custom duration.
//>>docs: http://api.jqueryui.com/highlight-effect/
//>>demos: http://jqueryui.com/effect/


	var effectsEffectHighlight = $.effects.define( "highlight", "show", function( options, done ) {
		var element = $( this ),
			animation = {
				backgroundColor: element.css( "backgroundColor" )
			};

		if ( options.mode === "hide" ) {
			animation.opacity = 0;
		}

		$.effects.saveStyle( element );

		element
		.css( {
			backgroundImage: "none",
			backgroundColor: options.color || "#ffff99"
		} )
		.animate( animation, {
			queue: false,
			duration: options.duration,
			easing: options.easing,
			complete: done
		} );
	} );


	/*!
 * jQuery UI Effects Size 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Size Effect
//>>group: Effects
//>>description: Resize an element to a specified width and height.
//>>docs: http://api.jqueryui.com/size-effect/
//>>demos: http://jqueryui.com/effect/


	var effectsEffectSize = $.effects.define( "size", function( options, done ) {

		// Create element
		var baseline, factor, temp,
			element = $( this ),

			// Copy for children
			cProps = [ "fontSize" ],
			vProps = [ "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom" ],
			hProps = [ "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight" ],

			// Set options
			mode = options.mode,
			restore = mode !== "effect",
			scale = options.scale || "both",
			origin = options.origin || [ "middle", "center" ],
			position = element.css( "position" ),
			pos = element.position(),
			original = $.effects.scaledDimensions( element ),
			from = options.from || original,
			to = options.to || $.effects.scaledDimensions( element, 0 );

		$.effects.createPlaceholder( element );

		if ( mode === "show" ) {
			temp = from;
			from = to;
			to = temp;
		}

		// Set scaling factor
		factor = {
			from: {
				y: from.height / original.height,
				x: from.width / original.width
			},
			to: {
				y: to.height / original.height,
				x: to.width / original.width
			}
		};

		// Scale the css box
		if ( scale === "box" || scale === "both" ) {

			// Vertical props scaling
			if ( factor.from.y !== factor.to.y ) {
				from = $.effects.setTransition( element, vProps, factor.from.y, from );
				to = $.effects.setTransition( element, vProps, factor.to.y, to );
			}

			// Horizontal props scaling
			if ( factor.from.x !== factor.to.x ) {
				from = $.effects.setTransition( element, hProps, factor.from.x, from );
				to = $.effects.setTransition( element, hProps, factor.to.x, to );
			}
		}

		// Scale the content
		if ( scale === "content" || scale === "both" ) {

			// Vertical props scaling
			if ( factor.from.y !== factor.to.y ) {
				from = $.effects.setTransition( element, cProps, factor.from.y, from );
				to = $.effects.setTransition( element, cProps, factor.to.y, to );
			}
		}

		// Adjust the position properties based on the provided origin points
		if ( origin ) {
			baseline = $.effects.getBaseline( origin, original );
			from.top = ( original.outerHeight - from.outerHeight ) * baseline.y + pos.top;
			from.left = ( original.outerWidth - from.outerWidth ) * baseline.x + pos.left;
			to.top = ( original.outerHeight - to.outerHeight ) * baseline.y + pos.top;
			to.left = ( original.outerWidth - to.outerWidth ) * baseline.x + pos.left;
		}
		delete from.outerHeight;
		delete from.outerWidth;
		element.css( from );

		// Animate the children if desired
		if ( scale === "content" || scale === "both" ) {

			vProps = vProps.concat( [ "marginTop", "marginBottom" ] ).concat( cProps );
			hProps = hProps.concat( [ "marginLeft", "marginRight" ] );

			// Only animate children with width attributes specified
			// TODO: is this right? should we include anything with css width specified as well
			element.find( "*[width]" ).each( function() {
				var child = $( this ),
					childOriginal = $.effects.scaledDimensions( child ),
					childFrom = {
						height: childOriginal.height * factor.from.y,
						width: childOriginal.width * factor.from.x,
						outerHeight: childOriginal.outerHeight * factor.from.y,
						outerWidth: childOriginal.outerWidth * factor.from.x
					},
					childTo = {
						height: childOriginal.height * factor.to.y,
						width: childOriginal.width * factor.to.x,
						outerHeight: childOriginal.height * factor.to.y,
						outerWidth: childOriginal.width * factor.to.x
					};

				// Vertical props scaling
				if ( factor.from.y !== factor.to.y ) {
					childFrom = $.effects.setTransition( child, vProps, factor.from.y, childFrom );
					childTo = $.effects.setTransition( child, vProps, factor.to.y, childTo );
				}

				// Horizontal props scaling
				if ( factor.from.x !== factor.to.x ) {
					childFrom = $.effects.setTransition( child, hProps, factor.from.x, childFrom );
					childTo = $.effects.setTransition( child, hProps, factor.to.x, childTo );
				}

				if ( restore ) {
					$.effects.saveStyle( child );
				}

				// Animate children
				child.css( childFrom );
				child.animate( childTo, options.duration, options.easing, function() {

					// Restore children
					if ( restore ) {
						$.effects.restoreStyle( child );
					}
				} );
			} );
		}

		// Animate
		element.animate( to, {
			queue: false,
			duration: options.duration,
			easing: options.easing,
			complete: function() {

				var offset = element.offset();

				if ( to.opacity === 0 ) {
					element.css( "opacity", from.opacity );
				}

				if ( !restore ) {
					element
					.css( "position", position === "static" ? "relative" : position )
					.offset( offset );

					// Need to save style here so that automatic style restoration
					// doesn't restore to the original styles from before the animation.
					$.effects.saveStyle( element );
				}

				done();
			}
		} );

	} );


	/*!
 * jQuery UI Effects Scale 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Scale Effect
//>>group: Effects
//>>description: Grows or shrinks an element and its content.
//>>docs: http://api.jqueryui.com/scale-effect/
//>>demos: http://jqueryui.com/effect/


	var effectsEffectScale = $.effects.define( "scale", function( options, done ) {

		// Create element
		var el = $( this ),
			mode = options.mode,
			percent = parseInt( options.percent, 10 ) ||
				( parseInt( options.percent, 10 ) === 0 ? 0 : ( mode !== "effect" ? 0 : 100 ) ),

			newOptions = $.extend( true, {
				from: $.effects.scaledDimensions( el ),
				to: $.effects.scaledDimensions( el, percent, options.direction || "both" ),
				origin: options.origin || [ "middle", "center" ]
			}, options );

		// Fade option to support puff
		if ( options.fade ) {
			newOptions.from.opacity = 1;
			newOptions.to.opacity = 0;
		}

		$.effects.effect.size.call( this, newOptions, done );
	} );


	/*!
 * jQuery UI Effects Puff 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Puff Effect
//>>group: Effects
//>>description: Creates a puff effect by scaling the element up and hiding it at the same time.
//>>docs: http://api.jqueryui.com/puff-effect/
//>>demos: http://jqueryui.com/effect/


	var effectsEffectPuff = $.effects.define( "puff", "hide", function( options, done ) {
		var newOptions = $.extend( true, {}, options, {
			fade: true,
			percent: parseInt( options.percent, 10 ) || 150
		} );

		$.effects.effect.scale.call( this, newOptions, done );
	} );


	/*!
 * jQuery UI Effects Pulsate 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Pulsate Effect
//>>group: Effects
//>>description: Pulsates an element n times by changing the opacity to zero and back.
//>>docs: http://api.jqueryui.com/pulsate-effect/
//>>demos: http://jqueryui.com/effect/


	var effectsEffectPulsate = $.effects.define( "pulsate", "show", function( options, done ) {
		var element = $( this ),
			mode = options.mode,
			show = mode === "show",
			hide = mode === "hide",
			showhide = show || hide,

			// Showing or hiding leaves off the "last" animation
			anims = ( ( options.times || 5 ) * 2 ) + ( showhide ? 1 : 0 ),
			duration = options.duration / anims,
			animateTo = 0,
			i = 1,
			queuelen = element.queue().length;

		if ( show || !element.is( ":visible" ) ) {
			element.css( "opacity", 0 ).show();
			animateTo = 1;
		}

		// Anims - 1 opacity "toggles"
		for ( ; i < anims; i++ ) {
			element.animate( { opacity: animateTo }, duration, options.easing );
			animateTo = 1 - animateTo;
		}

		element.animate( { opacity: animateTo }, duration, options.easing );

		element.queue( done );

		$.effects.unshift( element, queuelen, anims + 1 );
	} );


	/*!
 * jQuery UI Effects Shake 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Shake Effect
//>>group: Effects
//>>description: Shakes an element horizontally or vertically n times.
//>>docs: http://api.jqueryui.com/shake-effect/
//>>demos: http://jqueryui.com/effect/


	var effectsEffectShake = $.effects.define( "shake", function( options, done ) {

		var i = 1,
			element = $( this ),
			direction = options.direction || "left",
			distance = options.distance || 20,
			times = options.times || 3,
			anims = times * 2 + 1,
			speed = Math.round( options.duration / anims ),
			ref = ( direction === "up" || direction === "down" ) ? "top" : "left",
			positiveMotion = ( direction === "up" || direction === "left" ),
			animation = {},
			animation1 = {},
			animation2 = {},

			queuelen = element.queue().length;

		$.effects.createPlaceholder( element );

		// Animation
		animation[ ref ] = ( positiveMotion ? "-=" : "+=" ) + distance;
		animation1[ ref ] = ( positiveMotion ? "+=" : "-=" ) + distance * 2;
		animation2[ ref ] = ( positiveMotion ? "-=" : "+=" ) + distance * 2;

		// Animate
		element.animate( animation, speed, options.easing );

		// Shakes
		for ( ; i < times; i++ ) {
			element
			.animate( animation1, speed, options.easing )
			.animate( animation2, speed, options.easing );
		}

		element
		.animate( animation1, speed, options.easing )
		.animate( animation, speed / 2, options.easing )
		.queue( done );

		$.effects.unshift( element, queuelen, anims + 1 );
	} );


	/*!
 * jQuery UI Effects Slide 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Slide Effect
//>>group: Effects
//>>description: Slides an element in and out of the viewport.
//>>docs: http://api.jqueryui.com/slide-effect/
//>>demos: http://jqueryui.com/effect/


	var effectsEffectSlide = $.effects.define( "slide", "show", function( options, done ) {
		var startClip, startRef,
			element = $( this ),
			map = {
				up: [ "bottom", "top" ],
				down: [ "top", "bottom" ],
				left: [ "right", "left" ],
				right: [ "left", "right" ]
			},
			mode = options.mode,
			direction = options.direction || "left",
			ref = ( direction === "up" || direction === "down" ) ? "top" : "left",
			positiveMotion = ( direction === "up" || direction === "left" ),
			distance = options.distance ||
				element[ ref === "top" ? "outerHeight" : "outerWidth" ]( true ),
			animation = {};

		$.effects.createPlaceholder( element );

		startClip = element.cssClip();
		startRef = element.position()[ ref ];

		// Define hide animation
		animation[ ref ] = ( positiveMotion ? -1 : 1 ) * distance + startRef;
		animation.clip = element.cssClip();
		animation.clip[ map[ direction ][ 1 ] ] = animation.clip[ map[ direction ][ 0 ] ];

		// Reverse the animation if we're showing
		if ( mode === "show" ) {
			element.cssClip( animation.clip );
			element.css( ref, animation[ ref ] );
			animation.clip = startClip;
			animation[ ref ] = startRef;
		}

		// Actually animate
		element.animate( animation, {
			queue: false,
			duration: options.duration,
			easing: options.easing,
			complete: done
		} );
	} );


	/*!
 * jQuery UI Effects Transfer 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Transfer Effect
//>>group: Effects
//>>description: Displays a transfer effect from one element to another.
//>>docs: http://api.jqueryui.com/transfer-effect/
//>>demos: http://jqueryui.com/effect/


	var effect;
	if ( $.uiBackCompat !== false ) {
		effect = $.effects.define( "transfer", function( options, done ) {
			$( this ).transfer( options, done );
		} );
	}
	var effectsEffectTransfer = effect;


	/*!
 * jQuery UI Focusable 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: :focusable Selector
//>>group: Core
//>>description: Selects elements which can be focused.
//>>docs: http://api.jqueryui.com/focusable-selector/


// Selectors
	$.ui.focusable = function( element, hasTabindex ) {
		var map, mapName, img, focusableIfVisible, fieldset,
			nodeName = element.nodeName.toLowerCase();

		if ( "area" === nodeName ) {
			map = element.parentNode;
			mapName = map.name;
			if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
				return false;
			}
			img = $( "img[usemap='#" + mapName + "']" );
			return img.length > 0 && img.is( ":visible" );
		}

		if ( /^(input|select|textarea|button|object)$/.test( nodeName ) ) {
			focusableIfVisible = !element.disabled;

			if ( focusableIfVisible ) {

				// Form controls within a disabled fieldset are disabled.
				// However, controls within the fieldset's legend do not get disabled.
				// Since controls generally aren't placed inside legends, we skip
				// this portion of the check.
				fieldset = $( element ).closest( "fieldset" )[ 0 ];
				if ( fieldset ) {
					focusableIfVisible = !fieldset.disabled;
				}
			}
		} else if ( "a" === nodeName ) {
			focusableIfVisible = element.href || hasTabindex;
		} else {
			focusableIfVisible = hasTabindex;
		}

		return focusableIfVisible && $( element ).is( ":visible" ) && visible( $( element ) );
	};

// Support: IE 8 only
// IE 8 doesn't resolve inherit to visible/hidden for computed values
	function visible( element ) {
		var visibility = element.css( "visibility" );
		while ( visibility === "inherit" ) {
			element = element.parent();
			visibility = element.css( "visibility" );
		}
		return visibility === "visible";
	}

	$.extend( $.expr.pseudos, {
		focusable: function( element ) {
			return $.ui.focusable( element, $.attr( element, "tabindex" ) != null );
		}
	} );

	var focusable = $.ui.focusable;



// Support: IE8 Only
// IE8 does not support the form attribute and when it is supplied. It overwrites the form prop
// with a string, so we need to find the proper form.
	var form = $.fn._form = function() {
		return typeof this[ 0 ].form === "string" ? this.closest( "form" ) : $( this[ 0 ].form );
	};


	/*!
 * jQuery UI Form Reset Mixin 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Form Reset Mixin
//>>group: Core
//>>description: Refresh input widgets when their form is reset
//>>docs: http://api.jqueryui.com/form-reset-mixin/


	var formResetMixin = $.ui.formResetMixin = {
		_formResetHandler: function() {
			var form = $( this );

			// Wait for the form reset to actually happen before refreshing
			setTimeout( function() {
				var instances = form.data( "ui-form-reset-instances" );
				$.each( instances, function() {
					this.refresh();
				} );
			} );
		},

		_bindFormResetHandler: function() {
			this.form = this.element._form();
			if ( !this.form.length ) {
				return;
			}

			var instances = this.form.data( "ui-form-reset-instances" ) || [];
			if ( !instances.length ) {

				// We don't use _on() here because we use a single event handler per form
				this.form.on( "reset.ui-form-reset", this._formResetHandler );
			}
			instances.push( this );
			this.form.data( "ui-form-reset-instances", instances );
		},

		_unbindFormResetHandler: function() {
			if ( !this.form.length ) {
				return;
			}

			var instances = this.form.data( "ui-form-reset-instances" );
			instances.splice( $.inArray( this, instances ), 1 );
			if ( instances.length ) {
				this.form.data( "ui-form-reset-instances", instances );
			} else {
				this.form
				.removeData( "ui-form-reset-instances" )
				.off( "reset.ui-form-reset" );
			}
		}
	};


	/*!
 * jQuery UI Support for jQuery core 1.8.x and newer 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 */

//>>label: jQuery 1.8+ Support
//>>group: Core
//>>description: Support version 1.8.x and newer of jQuery core


// Support: jQuery 1.9.x or older
// $.expr[ ":" ] is deprecated.
	if ( !$.expr.pseudos ) {
		$.expr.pseudos = $.expr[ ":" ];
	}

// Support: jQuery 1.11.x or older
// $.unique has been renamed to $.uniqueSort
	if ( !$.uniqueSort ) {
		$.uniqueSort = $.unique;
	}

// Support: jQuery 2.2.x or older.
// This method has been defined in jQuery 3.0.0.
// Code from https://github.com/jquery/jquery/blob/e539bac79e666bba95bba86d690b4e609dca2286/src/selector/escapeSelector.js
	if ( !$.escapeSelector ) {

		// CSS string/identifier serialization
		// https://drafts.csswg.org/cssom/#common-serializing-idioms
		var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;

		var fcssescape = function( ch, asCodePoint ) {
			if ( asCodePoint ) {

				// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
				if ( ch === "\0" ) {
					return "\uFFFD";
				}

				// Control characters and (dependent upon position) numbers get escaped as code points
				return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
			}

			// Other potentially-special ASCII characters get backslash-escaped
			return "\\" + ch;
		};

		$.escapeSelector = function( sel ) {
			return ( sel + "" ).replace( rcssescape, fcssescape );
		};
	}

// Support: jQuery 3.4.x or older
// These methods have been defined in jQuery 3.5.0.
	if ( !$.fn.even || !$.fn.odd ) {
		$.fn.extend( {
			even: function() {
				return this.filter( function( i ) {
					return i % 2 === 0;
				} );
			},
			odd: function() {
				return this.filter( function( i ) {
					return i % 2 === 1;
				} );
			}
		} );
	}

	;
	/*!
 * jQuery UI Keycode 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Keycode
//>>group: Core
//>>description: Provide keycodes as keynames
//>>docs: http://api.jqueryui.com/jQuery.ui.keyCode/


	var keycode = $.ui.keyCode = {
		BACKSPACE: 8,
		COMMA: 188,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		LEFT: 37,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SPACE: 32,
		TAB: 9,
		UP: 38
	};


	/*!
 * jQuery UI Labels 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: labels
//>>group: Core
//>>description: Find all the labels associated with a given input
//>>docs: http://api.jqueryui.com/labels/


	var labels = $.fn.labels = function() {
		var ancestor, selector, id, labels, ancestors;

		if ( !this.length ) {
			return this.pushStack( [] );
		}

		// Check control.labels first
		if ( this[ 0 ].labels && this[ 0 ].labels.length ) {
			return this.pushStack( this[ 0 ].labels );
		}

		// Support: IE <= 11, FF <= 37, Android <= 2.3 only
		// Above browsers do not support control.labels. Everything below is to support them
		// as well as document fragments. control.labels does not work on document fragments
		labels = this.eq( 0 ).parents( "label" );

		// Look for the label based on the id
		id = this.attr( "id" );
		if ( id ) {

			// We don't search against the document in case the element
			// is disconnected from the DOM
			ancestor = this.eq( 0 ).parents().last();

			// Get a full set of top level ancestors
			ancestors = ancestor.add( ancestor.length ? ancestor.siblings() : this.siblings() );

			// Create a selector for the label based on the id
			selector = "label[for='" + $.escapeSelector( id ) + "']";

			labels = labels.add( ancestors.find( selector ).addBack( selector ) );

		}

		// Return whatever we have found for labels
		return this.pushStack( labels );
	};


	/*!
 * jQuery UI Scroll Parent 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: scrollParent
//>>group: Core
//>>description: Get the closest ancestor element that is scrollable.
//>>docs: http://api.jqueryui.com/scrollParent/


	var scrollParent = $.fn.scrollParent = function( includeHidden ) {
		var position = this.css( "position" ),
			excludeStaticParent = position === "absolute",
			overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
			scrollParent = this.parents().filter( function() {
				var parent = $( this );
				if ( excludeStaticParent && parent.css( "position" ) === "static" ) {
					return false;
				}
				return overflowRegex.test( parent.css( "overflow" ) + parent.css( "overflow-y" ) +
					parent.css( "overflow-x" ) );
			} ).eq( 0 );

		return position === "fixed" || !scrollParent.length ?
			$( this[ 0 ].ownerDocument || document ) :
			scrollParent;
	};


	/*!
 * jQuery UI Tabbable 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: :tabbable Selector
//>>group: Core
//>>description: Selects elements which can be tabbed to.
//>>docs: http://api.jqueryui.com/tabbable-selector/


	var tabbable = $.extend( $.expr.pseudos, {
		tabbable: function( element ) {
			var tabIndex = $.attr( element, "tabindex" ),
				hasTabindex = tabIndex != null;
			return ( !hasTabindex || tabIndex >= 0 ) && $.ui.focusable( element, hasTabindex );
		}
	} );


	/*!
 * jQuery UI Unique ID 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: uniqueId
//>>group: Core
//>>description: Functions to generate and remove uniqueId's
//>>docs: http://api.jqueryui.com/uniqueId/


	var uniqueId = $.fn.extend( {
		uniqueId: ( function() {
			var uuid = 0;

			return function() {
				return this.each( function() {
					if ( !this.id ) {
						this.id = "ui-id-" + ( ++uuid );
					}
				} );
			};
		} )(),

		removeUniqueId: function() {
			return this.each( function() {
				if ( /^ui-id-\d+$/.test( this.id ) ) {
					$( this ).removeAttr( "id" );
				}
			} );
		}
	} );


	/*!
 * jQuery UI Accordion 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Accordion
//>>group: Widgets
	/* eslint-disable max-len */
//>>description: Displays collapsible content panels for presenting information in a limited amount of space.
	/* eslint-enable max-len */
//>>docs: http://api.jqueryui.com/accordion/
//>>demos: http://jqueryui.com/accordion/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/accordion.css
//>>css.theme: ../../themes/base/theme.css


	var widgetsAccordion = $.widget( "ui.accordion", {
		version: "1.13.0",
		options: {
			active: 0,
			animate: {},
			classes: {
				"ui-accordion-header": "ui-corner-top",
				"ui-accordion-header-collapsed": "ui-corner-all",
				"ui-accordion-content": "ui-corner-bottom"
			},
			collapsible: false,
			event: "click",
			header: function( elem ) {
				return elem.find( "> li > :first-child" ).add( elem.find( "> :not(li)" ).even() );
			},
			heightStyle: "auto",
			icons: {
				activeHeader: "ui-icon-triangle-1-s",
				header: "ui-icon-triangle-1-e"
			},

			// Callbacks
			activate: null,
			beforeActivate: null
		},

		hideProps: {
			borderTopWidth: "hide",
			borderBottomWidth: "hide",
			paddingTop: "hide",
			paddingBottom: "hide",
			height: "hide"
		},

		showProps: {
			borderTopWidth: "show",
			borderBottomWidth: "show",
			paddingTop: "show",
			paddingBottom: "show",
			height: "show"
		},

		_create: function() {
			var options = this.options;

			this.prevShow = this.prevHide = $();
			this._addClass( "ui-accordion", "ui-widget ui-helper-reset" );
			this.element.attr( "role", "tablist" );

			// Don't allow collapsible: false and active: false / null
			if ( !options.collapsible && ( options.active === false || options.active == null ) ) {
				options.active = 0;
			}

			this._processPanels();

			// handle negative values
			if ( options.active < 0 ) {
				options.active += this.headers.length;
			}
			this._refresh();
		},

		_getCreateEventData: function() {
			return {
				header: this.active,
				panel: !this.active.length ? $() : this.active.next()
			};
		},

		_createIcons: function() {
			var icon, children,
				icons = this.options.icons;

			if ( icons ) {
				icon = $( "<span>" );
				this._addClass( icon, "ui-accordion-header-icon", "ui-icon " + icons.header );
				icon.prependTo( this.headers );
				children = this.active.children( ".ui-accordion-header-icon" );
				this._removeClass( children, icons.header )
				._addClass( children, null, icons.activeHeader )
				._addClass( this.headers, "ui-accordion-icons" );
			}
		},

		_destroyIcons: function() {
			this._removeClass( this.headers, "ui-accordion-icons" );
			this.headers.children( ".ui-accordion-header-icon" ).remove();
		},

		_destroy: function() {
			var contents;

			// Clean up main element
			this.element.removeAttr( "role" );

			// Clean up headers
			this.headers
			.removeAttr( "role aria-expanded aria-selected aria-controls tabIndex" )
			.removeUniqueId();

			this._destroyIcons();

			// Clean up content panels
			contents = this.headers.next()
			.css( "display", "" )
			.removeAttr( "role aria-hidden aria-labelledby" )
			.removeUniqueId();

			if ( this.options.heightStyle !== "content" ) {
				contents.css( "height", "" );
			}
		},

		_setOption: function( key, value ) {
			if ( key === "active" ) {

				// _activate() will handle invalid values and update this.options
				this._activate( value );
				return;
			}

			if ( key === "event" ) {
				if ( this.options.event ) {
					this._off( this.headers, this.options.event );
				}
				this._setupEvents( value );
			}

			this._super( key, value );

			// Setting collapsible: false while collapsed; open first panel
			if ( key === "collapsible" && !value && this.options.active === false ) {
				this._activate( 0 );
			}

			if ( key === "icons" ) {
				this._destroyIcons();
				if ( value ) {
					this._createIcons();
				}
			}
		},

		_setOptionDisabled: function( value ) {
			this._super( value );

			this.element.attr( "aria-disabled", value );

			// Support: IE8 Only
			// #5332 / #6059 - opacity doesn't cascade to positioned elements in IE
			// so we need to add the disabled class to the headers and panels
			this._toggleClass( null, "ui-state-disabled", !!value );
			this._toggleClass( this.headers.add( this.headers.next() ), null, "ui-state-disabled",
				!!value );
		},

		_keydown: function( event ) {
			if ( event.altKey || event.ctrlKey ) {
				return;
			}

			var keyCode = $.ui.keyCode,
				length = this.headers.length,
				currentIndex = this.headers.index( event.target ),
				toFocus = false;

			switch ( event.keyCode ) {
				case keyCode.RIGHT:
				case keyCode.DOWN:
					toFocus = this.headers[ ( currentIndex + 1 ) % length ];
					break;
				case keyCode.LEFT:
				case keyCode.UP:
					toFocus = this.headers[ ( currentIndex - 1 + length ) % length ];
					break;
				case keyCode.SPACE:
				case keyCode.ENTER:
					this._eventHandler( event );
					break;
				case keyCode.HOME:
					toFocus = this.headers[ 0 ];
					break;
				case keyCode.END:
					toFocus = this.headers[ length - 1 ];
					break;
			}

			if ( toFocus ) {
				$( event.target ).attr( "tabIndex", -1 );
				$( toFocus ).attr( "tabIndex", 0 );
				$( toFocus ).trigger( "focus" );
				event.preventDefault();
			}
		},

		_panelKeyDown: function( event ) {
			if ( event.keyCode === $.ui.keyCode.UP && event.ctrlKey ) {
				$( event.currentTarget ).prev().trigger( "focus" );
			}
		},

		refresh: function() {
			var options = this.options;
			this._processPanels();

			// Was collapsed or no panel
			if ( ( options.active === false && options.collapsible === true ) ||
				!this.headers.length ) {
				options.active = false;
				this.active = $();

				// active false only when collapsible is true
			} else if ( options.active === false ) {
				this._activate( 0 );

				// was active, but active panel is gone
			} else if ( this.active.length && !$.contains( this.element[ 0 ], this.active[ 0 ] ) ) {

				// all remaining panel are disabled
				if ( this.headers.length === this.headers.find( ".ui-state-disabled" ).length ) {
					options.active = false;
					this.active = $();

					// activate previous panel
				} else {
					this._activate( Math.max( 0, options.active - 1 ) );
				}

				// was active, active panel still exists
			} else {

				// make sure active index is correct
				options.active = this.headers.index( this.active );
			}

			this._destroyIcons();

			this._refresh();
		},

		_processPanels: function() {
			var prevHeaders = this.headers,
				prevPanels = this.panels;

			if ( typeof this.options.header === "function" ) {
				this.headers = this.options.header( this.element );
			} else {
				this.headers = this.element.find( this.options.header );
			}
			this._addClass( this.headers, "ui-accordion-header ui-accordion-header-collapsed",
				"ui-state-default" );

			this.panels = this.headers.next().filter( ":not(.ui-accordion-content-active)" ).hide();
			this._addClass( this.panels, "ui-accordion-content", "ui-helper-reset ui-widget-content" );

			// Avoid memory leaks (#10056)
			if ( prevPanels ) {
				this._off( prevHeaders.not( this.headers ) );
				this._off( prevPanels.not( this.panels ) );
			}
		},

		_refresh: function() {
			var maxHeight,
				options = this.options,
				heightStyle = options.heightStyle,
				parent = this.element.parent();

			this.active = this._findActive( options.active );
			this._addClass( this.active, "ui-accordion-header-active", "ui-state-active" )
			._removeClass( this.active, "ui-accordion-header-collapsed" );
			this._addClass( this.active.next(), "ui-accordion-content-active" );
			this.active.next().show();

			this.headers
			.attr( "role", "tab" )
			.each( function() {
				var header = $( this ),
					headerId = header.uniqueId().attr( "id" ),
					panel = header.next(),
					panelId = panel.uniqueId().attr( "id" );
				header.attr( "aria-controls", panelId );
				panel.attr( "aria-labelledby", headerId );
			} )
			.next()
			.attr( "role", "tabpanel" );

			this.headers
			.not( this.active )
			.attr( {
				"aria-selected": "false",
				"aria-expanded": "false",
				tabIndex: -1
			} )
			.next()
			.attr( {
				"aria-hidden": "true"
			} )
			.hide();

			// Make sure at least one header is in the tab order
			if ( !this.active.length ) {
				this.headers.eq( 0 ).attr( "tabIndex", 0 );
			} else {
				this.active.attr( {
					"aria-selected": "true",
					"aria-expanded": "true",
					tabIndex: 0
				} )
				.next()
				.attr( {
					"aria-hidden": "false"
				} );
			}

			this._createIcons();

			this._setupEvents( options.event );

			if ( heightStyle === "fill" ) {
				maxHeight = parent.height();
				this.element.siblings( ":visible" ).each( function() {
					var elem = $( this ),
						position = elem.css( "position" );

					if ( position === "absolute" || position === "fixed" ) {
						return;
					}
					maxHeight -= elem.outerHeight( true );
				} );

				this.headers.each( function() {
					maxHeight -= $( this ).outerHeight( true );
				} );

				this.headers.next()
				.each( function() {
					$( this ).height( Math.max( 0, maxHeight -
						$( this ).innerHeight() + $( this ).height() ) );
				} )
				.css( "overflow", "auto" );
			} else if ( heightStyle === "auto" ) {
				maxHeight = 0;
				this.headers.next()
				.each( function() {
					var isVisible = $( this ).is( ":visible" );
					if ( !isVisible ) {
						$( this ).show();
					}
					maxHeight = Math.max( maxHeight, $( this ).css( "height", "" ).height() );
					if ( !isVisible ) {
						$( this ).hide();
					}
				} )
				.height( maxHeight );
			}
		},

		_activate: function( index ) {
			var active = this._findActive( index )[ 0 ];

			// Trying to activate the already active panel
			if ( active === this.active[ 0 ] ) {
				return;
			}

			// Trying to collapse, simulate a click on the currently active header
			active = active || this.active[ 0 ];

			this._eventHandler( {
				target: active,
				currentTarget: active,
				preventDefault: $.noop
			} );
		},

		_findActive: function( selector ) {
			return typeof selector === "number" ? this.headers.eq( selector ) : $();
		},

		_setupEvents: function( event ) {
			var events = {
				keydown: "_keydown"
			};
			if ( event ) {
				$.each( event.split( " " ), function( index, eventName ) {
					events[ eventName ] = "_eventHandler";
				} );
			}

			this._off( this.headers.add( this.headers.next() ) );
			this._on( this.headers, events );
			this._on( this.headers.next(), { keydown: "_panelKeyDown" } );
			this._hoverable( this.headers );
			this._focusable( this.headers );
		},

		_eventHandler: function( event ) {
			var activeChildren, clickedChildren,
				options = this.options,
				active = this.active,
				clicked = $( event.currentTarget ),
				clickedIsActive = clicked[ 0 ] === active[ 0 ],
				collapsing = clickedIsActive && options.collapsible,
				toShow = collapsing ? $() : clicked.next(),
				toHide = active.next(),
				eventData = {
					oldHeader: active,
					oldPanel: toHide,
					newHeader: collapsing ? $() : clicked,
					newPanel: toShow
				};

			event.preventDefault();

			if (

				// click on active header, but not collapsible
				( clickedIsActive && !options.collapsible ) ||

				// allow canceling activation
				( this._trigger( "beforeActivate", event, eventData ) === false ) ) {
				return;
			}

			options.active = collapsing ? false : this.headers.index( clicked );

			// When the call to ._toggle() comes after the class changes
			// it causes a very odd bug in IE 8 (see #6720)
			this.active = clickedIsActive ? $() : clicked;
			this._toggle( eventData );

			// Switch classes
			// corner classes on the previously active header stay after the animation
			this._removeClass( active, "ui-accordion-header-active", "ui-state-active" );
			if ( options.icons ) {
				activeChildren = active.children( ".ui-accordion-header-icon" );
				this._removeClass( activeChildren, null, options.icons.activeHeader )
				._addClass( activeChildren, null, options.icons.header );
			}

			if ( !clickedIsActive ) {
				this._removeClass( clicked, "ui-accordion-header-collapsed" )
				._addClass( clicked, "ui-accordion-header-active", "ui-state-active" );
				if ( options.icons ) {
					clickedChildren = clicked.children( ".ui-accordion-header-icon" );
					this._removeClass( clickedChildren, null, options.icons.header )
					._addClass( clickedChildren, null, options.icons.activeHeader );
				}

				this._addClass( clicked.next(), "ui-accordion-content-active" );
			}
		},

		_toggle: function( data ) {
			var toShow = data.newPanel,
				toHide = this.prevShow.length ? this.prevShow : data.oldPanel;

			// Handle activating a panel during the animation for another activation
			this.prevShow.add( this.prevHide ).stop( true, true );
			this.prevShow = toShow;
			this.prevHide = toHide;

			if ( this.options.animate ) {
				this._animate( toShow, toHide, data );
			} else {
				toHide.hide();
				toShow.show();
				this._toggleComplete( data );
			}

			toHide.attr( {
				"aria-hidden": "true"
			} );
			toHide.prev().attr( {
				"aria-selected": "false",
				"aria-expanded": "false"
			} );

			// if we're switching panels, remove the old header from the tab order
			// if we're opening from collapsed state, remove the previous header from the tab order
			// if we're collapsing, then keep the collapsing header in the tab order
			if ( toShow.length && toHide.length ) {
				toHide.prev().attr( {
					"tabIndex": -1,
					"aria-expanded": "false"
				} );
			} else if ( toShow.length ) {
				this.headers.filter( function() {
					return parseInt( $( this ).attr( "tabIndex" ), 10 ) === 0;
				} )
				.attr( "tabIndex", -1 );
			}

			toShow
			.attr( "aria-hidden", "false" )
			.prev()
			.attr( {
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			} );
		},

		_animate: function( toShow, toHide, data ) {
			var total, easing, duration,
				that = this,
				adjust = 0,
				boxSizing = toShow.css( "box-sizing" ),
				down = toShow.length &&
					( !toHide.length || ( toShow.index() < toHide.index() ) ),
				animate = this.options.animate || {},
				options = down && animate.down || animate,
				complete = function() {
					that._toggleComplete( data );
				};

			if ( typeof options === "number" ) {
				duration = options;
			}
			if ( typeof options === "string" ) {
				easing = options;
			}

			// fall back from options to animation in case of partial down settings
			easing = easing || options.easing || animate.easing;
			duration = duration || options.duration || animate.duration;

			if ( !toHide.length ) {
				return toShow.animate( this.showProps, duration, easing, complete );
			}
			if ( !toShow.length ) {
				return toHide.animate( this.hideProps, duration, easing, complete );
			}

			total = toShow.show().outerHeight();
			toHide.animate( this.hideProps, {
				duration: duration,
				easing: easing,
				step: function( now, fx ) {
					fx.now = Math.round( now );
				}
			} );
			toShow
			.hide()
			.animate( this.showProps, {
				duration: duration,
				easing: easing,
				complete: complete,
				step: function( now, fx ) {
					fx.now = Math.round( now );
					if ( fx.prop !== "height" ) {
						if ( boxSizing === "content-box" ) {
							adjust += fx.now;
						}
					} else if ( that.options.heightStyle !== "content" ) {
						fx.now = Math.round( total - toHide.outerHeight() - adjust );
						adjust = 0;
					}
				}
			} );
		},

		_toggleComplete: function( data ) {
			var toHide = data.oldPanel,
				prev = toHide.prev();

			this._removeClass( toHide, "ui-accordion-content-active" );
			this._removeClass( prev, "ui-accordion-header-active" )
			._addClass( prev, "ui-accordion-header-collapsed" );

			// Work around for rendering bug in IE (#5421)
			if ( toHide.length ) {
				toHide.parent()[ 0 ].className = toHide.parent()[ 0 ].className;
			}
			this._trigger( "activate", null, data );
		}
	} );



	var safeActiveElement = $.ui.safeActiveElement = function( document ) {
		var activeElement;

		// Support: IE 9 only
		// IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
		try {
			activeElement = document.activeElement;
		} catch ( error ) {
			activeElement = document.body;
		}

		// Support: IE 9 - 11 only
		// IE may return null instead of an element
		// Interestingly, this only seems to occur when NOT in an iframe
		if ( !activeElement ) {
			activeElement = document.body;
		}

		// Support: IE 11 only
		// IE11 returns a seemingly empty object in some cases when accessing
		// document.activeElement from an <iframe>
		if ( !activeElement.nodeName ) {
			activeElement = document.body;
		}

		return activeElement;
	};


	/*!
 * jQuery UI Menu 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Menu
//>>group: Widgets
//>>description: Creates nestable menus.
//>>docs: http://api.jqueryui.com/menu/
//>>demos: http://jqueryui.com/menu/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/menu.css
//>>css.theme: ../../themes/base/theme.css


	var widgetsMenu = $.widget( "ui.menu", {
		version: "1.13.0",
		defaultElement: "<ul>",
		delay: 300,
		options: {
			icons: {
				submenu: "ui-icon-caret-1-e"
			},
			items: "> *",
			menus: "ul",
			position: {
				my: "left top",
				at: "right top"
			},
			role: "menu",

			// Callbacks
			blur: null,
			focus: null,
			select: null
		},

		_create: function() {
			this.activeMenu = this.element;

			// Flag used to prevent firing of the click handler
			// as the event bubbles up through nested menus
			this.mouseHandled = false;
			this.lastMousePosition = { x: null, y: null };
			this.element
			.uniqueId()
			.attr( {
				role: this.options.role,
				tabIndex: 0
			} );

			this._addClass( "ui-menu", "ui-widget ui-widget-content" );
			this._on( {

				// Prevent focus from sticking to links inside menu after clicking
				// them (focus should always stay on UL during navigation).
				"mousedown .ui-menu-item": function( event ) {
					event.preventDefault();

					this._activateItem( event );
				},
				"click .ui-menu-item": function( event ) {
					var target = $( event.target );
					var active = $( $.ui.safeActiveElement( this.document[ 0 ] ) );
					if ( !this.mouseHandled && target.not( ".ui-state-disabled" ).length ) {
						this.select( event );

						// Only set the mouseHandled flag if the event will bubble, see #9469.
						if ( !event.isPropagationStopped() ) {
							this.mouseHandled = true;
						}

						// Open submenu on click
						if ( target.has( ".ui-menu" ).length ) {
							this.expand( event );
						} else if ( !this.element.is( ":focus" ) &&
							active.closest( ".ui-menu" ).length ) {

							// Redirect focus to the menu
							this.element.trigger( "focus", [ true ] );

							// If the active item is on the top level, let it stay active.
							// Otherwise, blur the active item since it is no longer visible.
							if ( this.active && this.active.parents( ".ui-menu" ).length === 1 ) {
								clearTimeout( this.timer );
							}
						}
					}
				},
				"mouseenter .ui-menu-item": "_activateItem",
				"mousemove .ui-menu-item": "_activateItem",
				mouseleave: "collapseAll",
				"mouseleave .ui-menu": "collapseAll",
				focus: function( event, keepActiveItem ) {

					// If there's already an active item, keep it active
					// If not, activate the first item
					var item = this.active || this._menuItems().first();

					if ( !keepActiveItem ) {
						this.focus( event, item );
					}
				},
				blur: function( event ) {
					this._delay( function() {
						var notContained = !$.contains(
							this.element[ 0 ],
							$.ui.safeActiveElement( this.document[ 0 ] )
						);
						if ( notContained ) {
							this.collapseAll( event );
						}
					} );
				},
				keydown: "_keydown"
			} );

			this.refresh();

			// Clicks outside of a menu collapse any open menus
			this._on( this.document, {
				click: function( event ) {
					if ( this._closeOnDocumentClick( event ) ) {
						this.collapseAll( event, true );
					}

					// Reset the mouseHandled flag
					this.mouseHandled = false;
				}
			} );
		},

		_activateItem: function( event ) {

			// Ignore mouse events while typeahead is active, see #10458.
			// Prevents focusing the wrong item when typeahead causes a scroll while the mouse
			// is over an item in the menu
			if ( this.previousFilter ) {
				return;
			}

			// If the mouse didn't actually move, but the page was scrolled, ignore the event (#9356)
			if ( event.clientX === this.lastMousePosition.x &&
				event.clientY === this.lastMousePosition.y ) {
				return;
			}

			this.lastMousePosition = {
				x: event.clientX,
				y: event.clientY
			};

			var actualTarget = $( event.target ).closest( ".ui-menu-item" ),
				target = $( event.currentTarget );

			// Ignore bubbled events on parent items, see #11641
			if ( actualTarget[ 0 ] !== target[ 0 ] ) {
				return;
			}

			// If the item is already active, there's nothing to do
			if ( target.is( ".ui-state-active" ) ) {
				return;
			}

			// Remove ui-state-active class from siblings of the newly focused menu item
			// to avoid a jump caused by adjacent elements both having a class with a border
			this._removeClass( target.siblings().children( ".ui-state-active" ),
				null, "ui-state-active" );
			this.focus( event, target );
		},

		_destroy: function() {
			var items = this.element.find( ".ui-menu-item" )
				.removeAttr( "role aria-disabled" ),
				submenus = items.children( ".ui-menu-item-wrapper" )
				.removeUniqueId()
				.removeAttr( "tabIndex role aria-haspopup" );

			// Destroy (sub)menus
			this.element
			.removeAttr( "aria-activedescendant" )
			.find( ".ui-menu" ).addBack()
			.removeAttr( "role aria-labelledby aria-expanded aria-hidden aria-disabled " +
				"tabIndex" )
			.removeUniqueId()
			.show();

			submenus.children().each( function() {
				var elem = $( this );
				if ( elem.data( "ui-menu-submenu-caret" ) ) {
					elem.remove();
				}
			} );
		},

		_keydown: function( event ) {
			var match, prev, character, skip,
				preventDefault = true;

			switch ( event.keyCode ) {
				case $.ui.keyCode.PAGE_UP:
					this.previousPage( event );
					break;
				case $.ui.keyCode.PAGE_DOWN:
					this.nextPage( event );
					break;
				case $.ui.keyCode.HOME:
					this._move( "first", "first", event );
					break;
				case $.ui.keyCode.END:
					this._move( "last", "last", event );
					break;
				case $.ui.keyCode.UP:
					this.previous( event );
					break;
				case $.ui.keyCode.DOWN:
					this.next( event );
					break;
				case $.ui.keyCode.LEFT:
					this.collapse( event );
					break;
				case $.ui.keyCode.RIGHT:
					if ( this.active && !this.active.is( ".ui-state-disabled" ) ) {
						this.expand( event );
					}
					break;
				case $.ui.keyCode.ENTER:
				case $.ui.keyCode.SPACE:
					this._activate( event );
					break;
				case $.ui.keyCode.ESCAPE:
					this.collapse( event );
					break;
				default:
					preventDefault = false;
					prev = this.previousFilter || "";
					skip = false;

					// Support number pad values
					character = event.keyCode >= 96 && event.keyCode <= 105 ?
						( event.keyCode - 96 ).toString() : String.fromCharCode( event.keyCode );

					clearTimeout( this.filterTimer );

					if ( character === prev ) {
						skip = true;
					} else {
						character = prev + character;
					}

					match = this._filterMenuItems( character );
					match = skip && match.index( this.active.next() ) !== -1 ?
						this.active.nextAll( ".ui-menu-item" ) :
						match;

					// If no matches on the current filter, reset to the last character pressed
					// to move down the menu to the first item that starts with that character
					if ( !match.length ) {
						character = String.fromCharCode( event.keyCode );
						match = this._filterMenuItems( character );
					}

					if ( match.length ) {
						this.focus( event, match );
						this.previousFilter = character;
						this.filterTimer = this._delay( function() {
							delete this.previousFilter;
						}, 1000 );
					} else {
						delete this.previousFilter;
					}
			}

			if ( preventDefault ) {
				event.preventDefault();
			}
		},

		_activate: function( event ) {
			if ( this.active && !this.active.is( ".ui-state-disabled" ) ) {
				if ( this.active.children( "[aria-haspopup='true']" ).length ) {
					this.expand( event );
				} else {
					this.select( event );
				}
			}
		},

		refresh: function() {
			var menus, items, newSubmenus, newItems, newWrappers,
				that = this,
				icon = this.options.icons.submenu,
				submenus = this.element.find( this.options.menus );

			this._toggleClass( "ui-menu-icons", null, !!this.element.find( ".ui-icon" ).length );

			// Initialize nested menus
			newSubmenus = submenus.filter( ":not(.ui-menu)" )
			.hide()
			.attr( {
				role: this.options.role,
				"aria-hidden": "true",
				"aria-expanded": "false"
			} )
			.each( function() {
				var menu = $( this ),
					item = menu.prev(),
					submenuCaret = $( "<span>" ).data( "ui-menu-submenu-caret", true );

				that._addClass( submenuCaret, "ui-menu-icon", "ui-icon " + icon );
				item
				.attr( "aria-haspopup", "true" )
				.prepend( submenuCaret );
				menu.attr( "aria-labelledby", item.attr( "id" ) );
			} );

			this._addClass( newSubmenus, "ui-menu", "ui-widget ui-widget-content ui-front" );

			menus = submenus.add( this.element );
			items = menus.find( this.options.items );

			// Initialize menu-items containing spaces and/or dashes only as dividers
			items.not( ".ui-menu-item" ).each( function() {
				var item = $( this );
				if ( that._isDivider( item ) ) {
					that._addClass( item, "ui-menu-divider", "ui-widget-content" );
				}
			} );

			// Don't refresh list items that are already adapted
			newItems = items.not( ".ui-menu-item, .ui-menu-divider" );
			newWrappers = newItems.children()
			.not( ".ui-menu" )
			.uniqueId()
			.attr( {
				tabIndex: -1,
				role: this._itemRole()
			} );
			this._addClass( newItems, "ui-menu-item" )
			._addClass( newWrappers, "ui-menu-item-wrapper" );

			// Add aria-disabled attribute to any disabled menu item
			items.filter( ".ui-state-disabled" ).attr( "aria-disabled", "true" );

			// If the active item has been removed, blur the menu
			if ( this.active && !$.contains( this.element[ 0 ], this.active[ 0 ] ) ) {
				this.blur();
			}
		},

		_itemRole: function() {
			return {
				menu: "menuitem",
				listbox: "option"
			}[ this.options.role ];
		},

		_setOption: function( key, value ) {
			if ( key === "icons" ) {
				var icons = this.element.find( ".ui-menu-icon" );
				this._removeClass( icons, null, this.options.icons.submenu )
				._addClass( icons, null, value.submenu );
			}
			this._super( key, value );
		},

		_setOptionDisabled: function( value ) {
			this._super( value );

			this.element.attr( "aria-disabled", String( value ) );
			this._toggleClass( null, "ui-state-disabled", !!value );
		},

		focus: function( event, item ) {
			var nested, focused, activeParent;
			this.blur( event, event && event.type === "focus" );

			this._scrollIntoView( item );

			this.active = item.first();

			focused = this.active.children( ".ui-menu-item-wrapper" );
			this._addClass( focused, null, "ui-state-active" );

			// Only update aria-activedescendant if there's a role
			// otherwise we assume focus is managed elsewhere
			if ( this.options.role ) {
				this.element.attr( "aria-activedescendant", focused.attr( "id" ) );
			}

			// Highlight active parent menu item, if any
			activeParent = this.active
			.parent()
			.closest( ".ui-menu-item" )
			.children( ".ui-menu-item-wrapper" );
			this._addClass( activeParent, null, "ui-state-active" );

			if ( event && event.type === "keydown" ) {
				this._close();
			} else {
				this.timer = this._delay( function() {
					this._close();
				}, this.delay );
			}

			nested = item.children( ".ui-menu" );
			if ( nested.length && event && ( /^mouse/.test( event.type ) ) ) {
				this._startOpening( nested );
			}
			this.activeMenu = item.parent();

			this._trigger( "focus", event, { item: item } );
		},

		_scrollIntoView: function( item ) {
			var borderTop, paddingTop, offset, scroll, elementHeight, itemHeight;
			if ( this._hasScroll() ) {
				borderTop = parseFloat( $.css( this.activeMenu[ 0 ], "borderTopWidth" ) ) || 0;
				paddingTop = parseFloat( $.css( this.activeMenu[ 0 ], "paddingTop" ) ) || 0;
				offset = item.offset().top - this.activeMenu.offset().top - borderTop - paddingTop;
				scroll = this.activeMenu.scrollTop();
				elementHeight = this.activeMenu.height();
				itemHeight = item.outerHeight();

				if ( offset < 0 ) {
					this.activeMenu.scrollTop( scroll + offset );
				} else if ( offset + itemHeight > elementHeight ) {
					this.activeMenu.scrollTop( scroll + offset - elementHeight + itemHeight );
				}
			}
		},

		blur: function( event, fromFocus ) {
			if ( !fromFocus ) {
				clearTimeout( this.timer );
			}

			if ( !this.active ) {
				return;
			}

			this._removeClass( this.active.children( ".ui-menu-item-wrapper" ),
				null, "ui-state-active" );

			this._trigger( "blur", event, { item: this.active } );
			this.active = null;
		},

		_startOpening: function( submenu ) {
			clearTimeout( this.timer );

			// Don't open if already open fixes a Firefox bug that caused a .5 pixel
			// shift in the submenu position when mousing over the caret icon
			if ( submenu.attr( "aria-hidden" ) !== "true" ) {
				return;
			}

			this.timer = this._delay( function() {
				this._close();
				this._open( submenu );
			}, this.delay );
		},

		_open: function( submenu ) {
			var position = $.extend( {
				of: this.active
			}, this.options.position );

			clearTimeout( this.timer );
			this.element.find( ".ui-menu" ).not( submenu.parents( ".ui-menu" ) )
			.hide()
			.attr( "aria-hidden", "true" );

			submenu
			.show()
			.removeAttr( "aria-hidden" )
			.attr( "aria-expanded", "true" )
			.position( position );
		},

		collapseAll: function( event, all ) {
			clearTimeout( this.timer );
			this.timer = this._delay( function() {

				// If we were passed an event, look for the submenu that contains the event
				var currentMenu = all ? this.element :
					$( event && event.target ).closest( this.element.find( ".ui-menu" ) );

				// If we found no valid submenu ancestor, use the main menu to close all
				// sub menus anyway
				if ( !currentMenu.length ) {
					currentMenu = this.element;
				}

				this._close( currentMenu );

				this.blur( event );

				// Work around active item staying active after menu is blurred
				this._removeClass( currentMenu.find( ".ui-state-active" ), null, "ui-state-active" );

				this.activeMenu = currentMenu;
			}, all ? 0 : this.delay );
		},

		// With no arguments, closes the currently active menu - if nothing is active
		// it closes all menus.  If passed an argument, it will search for menus BELOW
		_close: function( startMenu ) {
			if ( !startMenu ) {
				startMenu = this.active ? this.active.parent() : this.element;
			}

			startMenu.find( ".ui-menu" )
			.hide()
			.attr( "aria-hidden", "true" )
			.attr( "aria-expanded", "false" );
		},

		_closeOnDocumentClick: function( event ) {
			return !$( event.target ).closest( ".ui-menu" ).length;
		},

		_isDivider: function( item ) {

			// Match hyphen, em dash, en dash
			return !/[^\-\u2014\u2013\s]/.test( item.text() );
		},

		collapse: function( event ) {
			var newItem = this.active &&
				this.active.parent().closest( ".ui-menu-item", this.element );
			if ( newItem && newItem.length ) {
				this._close();
				this.focus( event, newItem );
			}
		},

		expand: function( event ) {
			var newItem = this.active && this._menuItems( this.active.children( ".ui-menu" ) ).first();

			if ( newItem && newItem.length ) {
				this._open( newItem.parent() );

				// Delay so Firefox will not hide activedescendant change in expanding submenu from AT
				this._delay( function() {
					this.focus( event, newItem );
				} );
			}
		},

		next: function( event ) {
			this._move( "next", "first", event );
		},

		previous: function( event ) {
			this._move( "prev", "last", event );
		},

		isFirstItem: function() {
			return this.active && !this.active.prevAll( ".ui-menu-item" ).length;
		},

		isLastItem: function() {
			return this.active && !this.active.nextAll( ".ui-menu-item" ).length;
		},

		_menuItems: function( menu ) {
			return ( menu || this.element )
			.find( this.options.items )
			.filter( ".ui-menu-item" );
		},

		_move: function( direction, filter, event ) {
			var next;
			if ( this.active ) {
				if ( direction === "first" || direction === "last" ) {
					next = this.active
						[ direction === "first" ? "prevAll" : "nextAll" ]( ".ui-menu-item" )
					.last();
				} else {
					next = this.active
						[ direction + "All" ]( ".ui-menu-item" )
					.first();
				}
			}
			if ( !next || !next.length || !this.active ) {
				next = this._menuItems( this.activeMenu )[ filter ]();
			}

			this.focus( event, next );
		},

		nextPage: function( event ) {
			var item, base, height;

			if ( !this.active ) {
				this.next( event );
				return;
			}
			if ( this.isLastItem() ) {
				return;
			}
			if ( this._hasScroll() ) {
				base = this.active.offset().top;
				height = this.element.innerHeight();

				// jQuery 3.2 doesn't include scrollbars in innerHeight, add it back.
				if ( $.fn.jquery.indexOf( "3.2." ) === 0 ) {
					height += this.element[ 0 ].offsetHeight - this.element.outerHeight();
				}

				this.active.nextAll( ".ui-menu-item" ).each( function() {
					item = $( this );
					return item.offset().top - base - height < 0;
				} );

				this.focus( event, item );
			} else {
				this.focus( event, this._menuItems( this.activeMenu )
					[ !this.active ? "first" : "last" ]() );
			}
		},

		previousPage: function( event ) {
			var item, base, height;
			if ( !this.active ) {
				this.next( event );
				return;
			}
			if ( this.isFirstItem() ) {
				return;
			}
			if ( this._hasScroll() ) {
				base = this.active.offset().top;
				height = this.element.innerHeight();

				// jQuery 3.2 doesn't include scrollbars in innerHeight, add it back.
				if ( $.fn.jquery.indexOf( "3.2." ) === 0 ) {
					height += this.element[ 0 ].offsetHeight - this.element.outerHeight();
				}

				this.active.prevAll( ".ui-menu-item" ).each( function() {
					item = $( this );
					return item.offset().top - base + height > 0;
				} );

				this.focus( event, item );
			} else {
				this.focus( event, this._menuItems( this.activeMenu ).first() );
			}
		},

		_hasScroll: function() {
			return this.element.outerHeight() < this.element.prop( "scrollHeight" );
		},

		select: function( event ) {

			// TODO: It should never be possible to not have an active item at this
			// point, but the tests don't trigger mouseenter before click.
			this.active = this.active || $( event.target ).closest( ".ui-menu-item" );
			var ui = { item: this.active };
			if ( !this.active.has( ".ui-menu" ).length ) {
				this.collapseAll( event, true );
			}
			this._trigger( "select", event, ui );
		},

		_filterMenuItems: function( character ) {
			var escapedCharacter = character.replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" ),
				regex = new RegExp( "^" + escapedCharacter, "i" );

			return this.activeMenu
			.find( this.options.items )

			// Only match on items, not dividers or other content (#10571)
			.filter( ".ui-menu-item" )
			.filter( function() {
				return regex.test(
					String.prototype.trim.call(
						$( this ).children( ".ui-menu-item-wrapper" ).text() ) );
			} );
		}
	} );


	/*!
 * jQuery UI Autocomplete 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Autocomplete
//>>group: Widgets
//>>description: Lists suggested words as the user is typing.
//>>docs: http://api.jqueryui.com/autocomplete/
//>>demos: http://jqueryui.com/autocomplete/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/autocomplete.css
//>>css.theme: ../../themes/base/theme.css


	$.widget( "ui.autocomplete", {
		version: "1.13.0",
		defaultElement: "<input>",
		options: {
			appendTo: null,
			autoFocus: false,
			delay: 300,
			minLength: 1,
			position: {
				my: "left top",
				at: "left bottom",
				collision: "none"
			},
			source: null,

			// Callbacks
			change: null,
			close: null,
			focus: null,
			open: null,
			response: null,
			search: null,
			select: null
		},

		requestIndex: 0,
		pending: 0,

		_create: function() {

			// Some browsers only repeat keydown events, not keypress events,
			// so we use the suppressKeyPress flag to determine if we've already
			// handled the keydown event. #7269
			// Unfortunately the code for & in keypress is the same as the up arrow,
			// so we use the suppressKeyPressRepeat flag to avoid handling keypress
			// events when we know the keydown event was used to modify the
			// search term. #7799
			var suppressKeyPress, suppressKeyPressRepeat, suppressInput,
				nodeName = this.element[ 0 ].nodeName.toLowerCase(),
				isTextarea = nodeName === "textarea",
				isInput = nodeName === "input";

			// Textareas are always multi-line
			// Inputs are always single-line, even if inside a contentEditable element
			// IE also treats inputs as contentEditable
			// All other element types are determined by whether or not they're contentEditable
			this.isMultiLine = isTextarea || !isInput && this._isContentEditable( this.element );

			this.valueMethod = this.element[ isTextarea || isInput ? "val" : "text" ];
			this.isNewMenu = true;

			this._addClass( "ui-autocomplete-input" );
			this.element.attr( "autocomplete", "off" );

			this._on( this.element, {
				keydown: function( event ) {
					if ( this.element.prop( "readOnly" ) ) {
						suppressKeyPress = true;
						suppressInput = true;
						suppressKeyPressRepeat = true;
						return;
					}

					suppressKeyPress = false;
					suppressInput = false;
					suppressKeyPressRepeat = false;
					var keyCode = $.ui.keyCode;
					switch ( event.keyCode ) {
						case keyCode.PAGE_UP:
							suppressKeyPress = true;
							this._move( "previousPage", event );
							break;
						case keyCode.PAGE_DOWN:
							suppressKeyPress = true;
							this._move( "nextPage", event );
							break;
						case keyCode.UP:
							suppressKeyPress = true;
							this._keyEvent( "previous", event );
							break;
						case keyCode.DOWN:
							suppressKeyPress = true;
							this._keyEvent( "next", event );
							break;
						case keyCode.ENTER:

							// when menu is open and has focus
							if ( this.menu.active ) {

								// #6055 - Opera still allows the keypress to occur
								// which causes forms to submit
								suppressKeyPress = true;
								event.preventDefault();
								this.menu.select( event );
							}
							break;
						case keyCode.TAB:
							if ( this.menu.active ) {
								this.menu.select( event );
							}
							break;
						case keyCode.ESCAPE:
							if ( this.menu.element.is( ":visible" ) ) {
								if ( !this.isMultiLine ) {
									this._value( this.term );
								}
								this.close( event );

								// Different browsers have different default behavior for escape
								// Single press can mean undo or clear
								// Double press in IE means clear the whole form
								event.preventDefault();
							}
							break;
						default:
							suppressKeyPressRepeat = true;

							// search timeout should be triggered before the input value is changed
							this._searchTimeout( event );
							break;
					}
				},
				keypress: function( event ) {
					if ( suppressKeyPress ) {
						suppressKeyPress = false;
						if ( !this.isMultiLine || this.menu.element.is( ":visible" ) ) {
							event.preventDefault();
						}
						return;
					}
					if ( suppressKeyPressRepeat ) {
						return;
					}

					// Replicate some key handlers to allow them to repeat in Firefox and Opera
					var keyCode = $.ui.keyCode;
					switch ( event.keyCode ) {
						case keyCode.PAGE_UP:
							this._move( "previousPage", event );
							break;
						case keyCode.PAGE_DOWN:
							this._move( "nextPage", event );
							break;
						case keyCode.UP:
							this._keyEvent( "previous", event );
							break;
						case keyCode.DOWN:
							this._keyEvent( "next", event );
							break;
					}
				},
				input: function( event ) {
					if ( suppressInput ) {
						suppressInput = false;
						event.preventDefault();
						return;
					}
					this._searchTimeout( event );
				},
				focus: function() {
					this.selectedItem = null;
					this.previous = this._value();
				},
				blur: function( event ) {
					clearTimeout( this.searching );
					this.close( event );
					this._change( event );
				}
			} );

			this._initSource();
			this.menu = $( "<ul>" )
			.appendTo( this._appendTo() )
			.menu( {

				// disable ARIA support, the live region takes care of that
				role: null
			} )
			.hide()

			// Support: IE 11 only, Edge <= 14
			// For other browsers, we preventDefault() on the mousedown event
			// to keep the dropdown from taking focus from the input. This doesn't
			// work for IE/Edge, causing problems with selection and scrolling (#9638)
			// Happily, IE and Edge support an "unselectable" attribute that
			// prevents an element from receiving focus, exactly what we want here.
			.attr( {
				"unselectable": "on"
			} )
			.menu( "instance" );

			this._addClass( this.menu.element, "ui-autocomplete", "ui-front" );
			this._on( this.menu.element, {
				mousedown: function( event ) {

					// Prevent moving focus out of the text field
					event.preventDefault();
				},
				menufocus: function( event, ui ) {
					var label, item;

					// support: Firefox
					// Prevent accidental activation of menu items in Firefox (#7024 #9118)
					if ( this.isNewMenu ) {
						this.isNewMenu = false;
						if ( event.originalEvent && /^mouse/.test( event.originalEvent.type ) ) {
							this.menu.blur();

							this.document.one( "mousemove", function() {
								$( event.target ).trigger( event.originalEvent );
							} );

							return;
						}
					}

					item = ui.item.data( "ui-autocomplete-item" );
					if ( false !== this._trigger( "focus", event, { item: item } ) ) {

						// use value to match what will end up in the input, if it was a key event
						if ( event.originalEvent && /^key/.test( event.originalEvent.type ) ) {
							this._value( item.value );
						}
					}

					// Announce the value in the liveRegion
					label = ui.item.attr( "aria-label" ) || item.value;
					if ( label && String.prototype.trim.call( label ).length ) {
						this.liveRegion.children().hide();
						$( "<div>" ).text( label ).appendTo( this.liveRegion );
					}
				},
				menuselect: function( event, ui ) {
					var item = ui.item.data( "ui-autocomplete-item" ),
						previous = this.previous;

					// Only trigger when focus was lost (click on menu)
					if ( this.element[ 0 ] !== $.ui.safeActiveElement( this.document[ 0 ] ) ) {
						this.element.trigger( "focus" );
						this.previous = previous;

						// #6109 - IE triggers two focus events and the second
						// is asynchronous, so we need to reset the previous
						// term synchronously and asynchronously :-(
						this._delay( function() {
							this.previous = previous;
							this.selectedItem = item;
						} );
					}

					if ( false !== this._trigger( "select", event, { item: item } ) ) {
						this._value( item.value );
					}

					// reset the term after the select event
					// this allows custom select handling to work properly
					this.term = this._value();

					this.close( event );
					this.selectedItem = item;
				}
			} );

			this.liveRegion = $( "<div>", {
				role: "status",
				"aria-live": "assertive",
				"aria-relevant": "additions"
			} )
			.appendTo( this.document[ 0 ].body );

			this._addClass( this.liveRegion, null, "ui-helper-hidden-accessible" );

			// Turning off autocomplete prevents the browser from remembering the
			// value when navigating through history, so we re-enable autocomplete
			// if the page is unloaded before the widget is destroyed. #7790
			this._on( this.window, {
				beforeunload: function() {
					this.element.removeAttr( "autocomplete" );
				}
			} );
		},

		_destroy: function() {
			clearTimeout( this.searching );
			this.element.removeAttr( "autocomplete" );
			this.menu.element.remove();
			this.liveRegion.remove();
		},

		_setOption: function( key, value ) {
			this._super( key, value );
			if ( key === "source" ) {
				this._initSource();
			}
			if ( key === "appendTo" ) {
				this.menu.element.appendTo( this._appendTo() );
			}
			if ( key === "disabled" && value && this.xhr ) {
				this.xhr.abort();
			}
		},

		_isEventTargetInWidget: function( event ) {
			var menuElement = this.menu.element[ 0 ];

			return event.target === this.element[ 0 ] ||
				event.target === menuElement ||
				$.contains( menuElement, event.target );
		},

		_closeOnClickOutside: function( event ) {
			if ( !this._isEventTargetInWidget( event ) ) {
				this.close();
			}
		},

		_appendTo: function() {
			var element = this.options.appendTo;

			if ( element ) {
				element = element.jquery || element.nodeType ?
					$( element ) :
					this.document.find( element ).eq( 0 );
			}

			if ( !element || !element[ 0 ] ) {
				element = this.element.closest( ".ui-front, dialog" );
			}

			if ( !element.length ) {
				element = this.document[ 0 ].body;
			}

			return element;
		},

		_initSource: function() {
			var array, url,
				that = this;
			if ( Array.isArray( this.options.source ) ) {
				array = this.options.source;
				this.source = function( request, response ) {
					response( $.ui.autocomplete.filter( array, request.term ) );
				};
			} else if ( typeof this.options.source === "string" ) {
				url = this.options.source;
				this.source = function( request, response ) {
					if ( that.xhr ) {
						that.xhr.abort();
					}
					that.xhr = $.ajax( {
						url: url,
						data: request,
						dataType: "json",
						success: function( data ) {
							response( data );
						},
						error: function() {
							response( [] );
						}
					} );
				};
			} else {
				this.source = this.options.source;
			}
		},

		_searchTimeout: function( event ) {
			clearTimeout( this.searching );
			this.searching = this._delay( function() {

				// Search if the value has changed, or if the user retypes the same value (see #7434)
				var equalValues = this.term === this._value(),
					menuVisible = this.menu.element.is( ":visible" ),
					modifierKey = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;

				if ( !equalValues || ( equalValues && !menuVisible && !modifierKey ) ) {
					this.selectedItem = null;
					this.search( null, event );
				}
			}, this.options.delay );
		},

		search: function( value, event ) {
			value = value != null ? value : this._value();

			// Always save the actual value, not the one passed as an argument
			this.term = this._value();

			if ( value.length < this.options.minLength ) {
				return this.close( event );
			}

			if ( this._trigger( "search", event ) === false ) {
				return;
			}

			return this._search( value );
		},

		_search: function( value ) {
			this.pending++;
			this._addClass( "ui-autocomplete-loading" );
			this.cancelSearch = false;

			this.source( { term: value }, this._response() );
		},

		_response: function() {
			var index = ++this.requestIndex;

			return function( content ) {
				if ( index === this.requestIndex ) {
					this.__response( content );
				}

				this.pending--;
				if ( !this.pending ) {
					this._removeClass( "ui-autocomplete-loading" );
				}
			}.bind( this );
		},

		__response: function( content ) {
			if ( content ) {
				content = this._normalize( content );
			}
			this._trigger( "response", null, { content: content } );
			if ( !this.options.disabled && content && content.length && !this.cancelSearch ) {
				this._suggest( content );
				this._trigger( "open" );
			} else {

				// use ._close() instead of .close() so we don't cancel future searches
				this._close();
			}
		},

		close: function( event ) {
			this.cancelSearch = true;
			this._close( event );
		},

		_close: function( event ) {

			// Remove the handler that closes the menu on outside clicks
			this._off( this.document, "mousedown" );

			if ( this.menu.element.is( ":visible" ) ) {
				this.menu.element.hide();
				this.menu.blur();
				this.isNewMenu = true;
				this._trigger( "close", event );
			}
		},

		_change: function( event ) {
			if ( this.previous !== this._value() ) {
				this._trigger( "change", event, { item: this.selectedItem } );
			}
		},

		_normalize: function( items ) {

			// assume all items have the right format when the first item is complete
			if ( items.length && items[ 0 ].label && items[ 0 ].value ) {
				return items;
			}
			return $.map( items, function( item ) {
				if ( typeof item === "string" ) {
					return {
						label: item,
						value: item
					};
				}
				return $.extend( {}, item, {
					label: item.label || item.value,
					value: item.value || item.label
				} );
			} );
		},

		_suggest: function( items ) {
			var ul = this.menu.element.empty();
			this._renderMenu( ul, items );
			this.isNewMenu = true;
			this.menu.refresh();

			// Size and position menu
			ul.show();
			this._resizeMenu();
			ul.position( $.extend( {
				of: this.element
			}, this.options.position ) );

			if ( this.options.autoFocus ) {
				this.menu.next();
			}

			// Listen for interactions outside of the widget (#6642)
			this._on( this.document, {
				mousedown: "_closeOnClickOutside"
			} );
		},

		_resizeMenu: function() {
			var ul = this.menu.element;
			ul.outerWidth( Math.max(

				// Firefox wraps long text (possibly a rounding bug)
				// so we add 1px to avoid the wrapping (#7513)
				ul.width( "" ).outerWidth() + 1,
				this.element.outerWidth()
			) );
		},

		_renderMenu: function( ul, items ) {
			var that = this;
			$.each( items, function( index, item ) {
				that._renderItemData( ul, item );
			} );
		},

		_renderItemData: function( ul, item ) {
			return this._renderItem( ul, item ).data( "ui-autocomplete-item", item );
		},

		_renderItem: function( ul, item ) {
			return $( "<li>" )
			.append( $( "<div>" ).text( item.label ) )
			.appendTo( ul );
		},

		_move: function( direction, event ) {
			if ( !this.menu.element.is( ":visible" ) ) {
				this.search( null, event );
				return;
			}
			if ( this.menu.isFirstItem() && /^previous/.test( direction ) ||
				this.menu.isLastItem() && /^next/.test( direction ) ) {

				if ( !this.isMultiLine ) {
					this._value( this.term );
				}

				this.menu.blur();
				return;
			}
			this.menu[ direction ]( event );
		},

		widget: function() {
			return this.menu.element;
		},

		_value: function() {
			return this.valueMethod.apply( this.element, arguments );
		},

		_keyEvent: function( keyEvent, event ) {
			if ( !this.isMultiLine || this.menu.element.is( ":visible" ) ) {
				this._move( keyEvent, event );

				// Prevents moving cursor to beginning/end of the text field in some browsers
				event.preventDefault();
			}
		},

		// Support: Chrome <=50
		// We should be able to just use this.element.prop( "isContentEditable" )
		// but hidden elements always report false in Chrome.
		// https://code.google.com/p/chromium/issues/detail?id=313082
		_isContentEditable: function( element ) {
			if ( !element.length ) {
				return false;
			}

			var editable = element.prop( "contentEditable" );

			if ( editable === "inherit" ) {
				return this._isContentEditable( element.parent() );
			}

			return editable === "true";
		}
	} );

	$.extend( $.ui.autocomplete, {
		escapeRegex: function( value ) {
			return value.replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" );
		},
		filter: function( array, term ) {
			var matcher = new RegExp( $.ui.autocomplete.escapeRegex( term ), "i" );
			return $.grep( array, function( value ) {
				return matcher.test( value.label || value.value || value );
			} );
		}
	} );

// Live region extension, adding a `messages` option
// NOTE: This is an experimental API. We are still investigating
// a full solution for string manipulation and internationalization.
	$.widget( "ui.autocomplete", $.ui.autocomplete, {
		options: {
			messages: {
				noResults: "No search results.",
				results: function( amount ) {
					return amount + ( amount > 1 ? " results are" : " result is" ) +
						" available, use up and down arrow keys to navigate.";
				}
			}
		},

		__response: function( content ) {
			var message;
			this._superApply( arguments );
			if ( this.options.disabled || this.cancelSearch ) {
				return;
			}
			if ( content && content.length ) {
				message = this.options.messages.results( content.length );
			} else {
				message = this.options.messages.noResults;
			}
			this.liveRegion.children().hide();
			$( "<div>" ).text( message ).appendTo( this.liveRegion );
		}
	} );

	var widgetsAutocomplete = $.ui.autocomplete;


	/*!
 * jQuery UI Controlgroup 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Controlgroup
//>>group: Widgets
//>>description: Visually groups form control widgets
//>>docs: http://api.jqueryui.com/controlgroup/
//>>demos: http://jqueryui.com/controlgroup/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/controlgroup.css
//>>css.theme: ../../themes/base/theme.css


	var controlgroupCornerRegex = /ui-corner-([a-z]){2,6}/g;

	var widgetsControlgroup = $.widget( "ui.controlgroup", {
		version: "1.13.0",
		defaultElement: "<div>",
		options: {
			direction: "horizontal",
			disabled: null,
			onlyVisible: true,
			items: {
				"button": "input[type=button], input[type=submit], input[type=reset], button, a",
				"controlgroupLabel": ".ui-controlgroup-label",
				"checkboxradio": "input[type='checkbox'], input[type='radio']",
				"selectmenu": "select",
				"spinner": ".ui-spinner-input"
			}
		},

		_create: function() {
			this._enhance();
		},

		// To support the enhanced option in jQuery Mobile, we isolate DOM manipulation
		_enhance: function() {
			this.element.attr( "role", "toolbar" );
			this.refresh();
		},

		_destroy: function() {
			this._callChildMethod( "destroy" );
			this.childWidgets.removeData( "ui-controlgroup-data" );
			this.element.removeAttr( "role" );
			if ( this.options.items.controlgroupLabel ) {
				this.element
				.find( this.options.items.controlgroupLabel )
				.find( ".ui-controlgroup-label-contents" )
				.contents().unwrap();
			}
		},

		_initWidgets: function() {
			var that = this,
				childWidgets = [];

			// First we iterate over each of the items options
			$.each( this.options.items, function( widget, selector ) {
				var labels;
				var options = {};

				// Make sure the widget has a selector set
				if ( !selector ) {
					return;
				}

				if ( widget === "controlgroupLabel" ) {
					labels = that.element.find( selector );
					labels.each( function() {
						var element = $( this );

						if ( element.children( ".ui-controlgroup-label-contents" ).length ) {
							return;
						}
						element.contents()
						.wrapAll( "<span class='ui-controlgroup-label-contents'></span>" );
					} );
					that._addClass( labels, null, "ui-widget ui-widget-content ui-state-default" );
					childWidgets = childWidgets.concat( labels.get() );
					return;
				}

				// Make sure the widget actually exists
				if ( !$.fn[ widget ] ) {
					return;
				}

				// We assume everything is in the middle to start because we can't determine
				// first / last elements until all enhancments are done.
				if ( that[ "_" + widget + "Options" ] ) {
					options = that[ "_" + widget + "Options" ]( "middle" );
				} else {
					options = { classes: {} };
				}

				// Find instances of this widget inside controlgroup and init them
				that.element
				.find( selector )
				.each( function() {
					var element = $( this );
					var instance = element[ widget ]( "instance" );

					// We need to clone the default options for this type of widget to avoid
					// polluting the variable options which has a wider scope than a single widget.
					var instanceOptions = $.widget.extend( {}, options );

					// If the button is the child of a spinner ignore it
					// TODO: Find a more generic solution
					if ( widget === "button" && element.parent( ".ui-spinner" ).length ) {
						return;
					}

					// Create the widget if it doesn't exist
					if ( !instance ) {
						instance = element[ widget ]()[ widget ]( "instance" );
					}
					if ( instance ) {
						instanceOptions.classes =
							that._resolveClassesValues( instanceOptions.classes, instance );
					}
					element[ widget ]( instanceOptions );

					// Store an instance of the controlgroup to be able to reference
					// from the outermost element for changing options and refresh
					var widgetElement = element[ widget ]( "widget" );
					$.data( widgetElement[ 0 ], "ui-controlgroup-data",
						instance ? instance : element[ widget ]( "instance" ) );

					childWidgets.push( widgetElement[ 0 ] );
				} );
			} );

			this.childWidgets = $( $.uniqueSort( childWidgets ) );
			this._addClass( this.childWidgets, "ui-controlgroup-item" );
		},

		_callChildMethod: function( method ) {
			this.childWidgets.each( function() {
				var element = $( this ),
					data = element.data( "ui-controlgroup-data" );
				if ( data && data[ method ] ) {
					data[ method ]();
				}
			} );
		},

		_updateCornerClass: function( element, position ) {
			var remove = "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all";
			var add = this._buildSimpleOptions( position, "label" ).classes.label;

			this._removeClass( element, null, remove );
			this._addClass( element, null, add );
		},

		_buildSimpleOptions: function( position, key ) {
			var direction = this.options.direction === "vertical";
			var result = {
				classes: {}
			};
			result.classes[ key ] = {
				"middle": "",
				"first": "ui-corner-" + ( direction ? "top" : "left" ),
				"last": "ui-corner-" + ( direction ? "bottom" : "right" ),
				"only": "ui-corner-all"
			}[ position ];

			return result;
		},

		_spinnerOptions: function( position ) {
			var options = this._buildSimpleOptions( position, "ui-spinner" );

			options.classes[ "ui-spinner-up" ] = "";
			options.classes[ "ui-spinner-down" ] = "";

			return options;
		},

		_buttonOptions: function( position ) {
			return this._buildSimpleOptions( position, "ui-button" );
		},

		_checkboxradioOptions: function( position ) {
			return this._buildSimpleOptions( position, "ui-checkboxradio-label" );
		},

		_selectmenuOptions: function( position ) {
			var direction = this.options.direction === "vertical";
			return {
				width: direction ? "auto" : false,
				classes: {
					middle: {
						"ui-selectmenu-button-open": "",
						"ui-selectmenu-button-closed": ""
					},
					first: {
						"ui-selectmenu-button-open": "ui-corner-" + ( direction ? "top" : "tl" ),
						"ui-selectmenu-button-closed": "ui-corner-" + ( direction ? "top" : "left" )
					},
					last: {
						"ui-selectmenu-button-open": direction ? "" : "ui-corner-tr",
						"ui-selectmenu-button-closed": "ui-corner-" + ( direction ? "bottom" : "right" )
					},
					only: {
						"ui-selectmenu-button-open": "ui-corner-top",
						"ui-selectmenu-button-closed": "ui-corner-all"
					}

				}[ position ]
			};
		},

		_resolveClassesValues: function( classes, instance ) {
			var result = {};
			$.each( classes, function( key ) {
				var current = instance.options.classes[ key ] || "";
				current = String.prototype.trim.call( current.replace( controlgroupCornerRegex, "" ) );
				result[ key ] = ( current + " " + classes[ key ] ).replace( /\s+/g, " " );
			} );
			return result;
		},

		_setOption: function( key, value ) {
			if ( key === "direction" ) {
				this._removeClass( "ui-controlgroup-" + this.options.direction );
			}

			this._super( key, value );
			if ( key === "disabled" ) {
				this._callChildMethod( value ? "disable" : "enable" );
				return;
			}

			this.refresh();
		},

		refresh: function() {
			var children,
				that = this;

			this._addClass( "ui-controlgroup ui-controlgroup-" + this.options.direction );

			if ( this.options.direction === "horizontal" ) {
				this._addClass( null, "ui-helper-clearfix" );
			}
			this._initWidgets();

			children = this.childWidgets;

			// We filter here because we need to track all childWidgets not just the visible ones
			if ( this.options.onlyVisible ) {
				children = children.filter( ":visible" );
			}

			if ( children.length ) {

				// We do this last because we need to make sure all enhancment is done
				// before determining first and last
				$.each( [ "first", "last" ], function( index, value ) {
					var instance = children[ value ]().data( "ui-controlgroup-data" );

					if ( instance && that[ "_" + instance.widgetName + "Options" ] ) {
						var options = that[ "_" + instance.widgetName + "Options" ](
							children.length === 1 ? "only" : value
						);
						options.classes = that._resolveClassesValues( options.classes, instance );
						instance.element[ instance.widgetName ]( options );
					} else {
						that._updateCornerClass( children[ value ](), value );
					}
				} );

				// Finally call the refresh method on each of the child widgets.
				this._callChildMethod( "refresh" );
			}
		}
	} );

	/*!
 * jQuery UI Checkboxradio 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Checkboxradio
//>>group: Widgets
//>>description: Enhances a form with multiple themeable checkboxes or radio buttons.
//>>docs: http://api.jqueryui.com/checkboxradio/
//>>demos: http://jqueryui.com/checkboxradio/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/button.css
//>>css.structure: ../../themes/base/checkboxradio.css
//>>css.theme: ../../themes/base/theme.css


	$.widget( "ui.checkboxradio", [ $.ui.formResetMixin, {
		version: "1.13.0",
		options: {
			disabled: null,
			label: null,
			icon: true,
			classes: {
				"ui-checkboxradio-label": "ui-corner-all",
				"ui-checkboxradio-icon": "ui-corner-all"
			}
		},

		_getCreateOptions: function() {
			var disabled, labels;
			var that = this;
			var options = this._super() || {};

			// We read the type here, because it makes more sense to throw a element type error first,
			// rather then the error for lack of a label. Often if its the wrong type, it
			// won't have a label (e.g. calling on a div, btn, etc)
			this._readType();

			labels = this.element.labels();

			// If there are multiple labels, use the last one
			this.label = $( labels[ labels.length - 1 ] );
			if ( !this.label.length ) {
				$.error( "No label found for checkboxradio widget" );
			}

			this.originalLabel = "";

			// We need to get the label text but this may also need to make sure it does not contain the
			// input itself.
			this.label.contents().not( this.element[ 0 ] ).each( function() {

				// The label contents could be text, html, or a mix. We concat each element to get a
				// string representation of the label, without the input as part of it.
				that.originalLabel += this.nodeType === 3 ? $( this ).text() : this.outerHTML;
			} );

			// Set the label option if we found label text
			if ( this.originalLabel ) {
				options.label = this.originalLabel;
			}

			disabled = this.element[ 0 ].disabled;
			if ( disabled != null ) {
				options.disabled = disabled;
			}
			return options;
		},

		_create: function() {
			var checked = this.element[ 0 ].checked;

			this._bindFormResetHandler();

			if ( this.options.disabled == null ) {
				this.options.disabled = this.element[ 0 ].disabled;
			}

			this._setOption( "disabled", this.options.disabled );
			this._addClass( "ui-checkboxradio", "ui-helper-hidden-accessible" );
			this._addClass( this.label, "ui-checkboxradio-label", "ui-button ui-widget" );

			if ( this.type === "radio" ) {
				this._addClass( this.label, "ui-checkboxradio-radio-label" );
			}

			if ( this.options.label && this.options.label !== this.originalLabel ) {
				this._updateLabel();
			} else if ( this.originalLabel ) {
				this.options.label = this.originalLabel;
			}

			this._enhance();

			if ( checked ) {
				this._addClass( this.label, "ui-checkboxradio-checked", "ui-state-active" );
			}

			this._on( {
				change: "_toggleClasses",
				focus: function() {
					this._addClass( this.label, null, "ui-state-focus ui-visual-focus" );
				},
				blur: function() {
					this._removeClass( this.label, null, "ui-state-focus ui-visual-focus" );
				}
			} );
		},

		_readType: function() {
			var nodeName = this.element[ 0 ].nodeName.toLowerCase();
			this.type = this.element[ 0 ].type;
			if ( nodeName !== "input" || !/radio|checkbox/.test( this.type ) ) {
				$.error( "Can't create checkboxradio on element.nodeName=" + nodeName +
					" and element.type=" + this.type );
			}
		},

		// Support jQuery Mobile enhanced option
		_enhance: function() {
			this._updateIcon( this.element[ 0 ].checked );
		},

		widget: function() {
			return this.label;
		},

		_getRadioGroup: function() {
			var group;
			var name = this.element[ 0 ].name;
			var nameSelector = "input[name='" + $.escapeSelector( name ) + "']";

			if ( !name ) {
				return $( [] );
			}

			if ( this.form.length ) {
				group = $( this.form[ 0 ].elements ).filter( nameSelector );
			} else {

				// Not inside a form, check all inputs that also are not inside a form
				group = $( nameSelector ).filter( function() {
					return $( this )._form().length === 0;
				} );
			}

			return group.not( this.element );
		},

		_toggleClasses: function() {
			var checked = this.element[ 0 ].checked;
			this._toggleClass( this.label, "ui-checkboxradio-checked", "ui-state-active", checked );

			if ( this.options.icon && this.type === "checkbox" ) {
				this._toggleClass( this.icon, null, "ui-icon-check ui-state-checked", checked )
				._toggleClass( this.icon, null, "ui-icon-blank", !checked );
			}

			if ( this.type === "radio" ) {
				this._getRadioGroup()
				.each( function() {
					var instance = $( this ).checkboxradio( "instance" );

					if ( instance ) {
						instance._removeClass( instance.label,
							"ui-checkboxradio-checked", "ui-state-active" );
					}
				} );
			}
		},

		_destroy: function() {
			this._unbindFormResetHandler();

			if ( this.icon ) {
				this.icon.remove();
				this.iconSpace.remove();
			}
		},

		_setOption: function( key, value ) {

			// We don't allow the value to be set to nothing
			if ( key === "label" && !value ) {
				return;
			}

			this._super( key, value );

			if ( key === "disabled" ) {
				this._toggleClass( this.label, null, "ui-state-disabled", value );
				this.element[ 0 ].disabled = value;

				// Don't refresh when setting disabled
				return;
			}
			this.refresh();
		},

		_updateIcon: function( checked ) {
			var toAdd = "ui-icon ui-icon-background ";

			if ( this.options.icon ) {
				if ( !this.icon ) {
					this.icon = $( "<span>" );
					this.iconSpace = $( "<span> </span>" );
					this._addClass( this.iconSpace, "ui-checkboxradio-icon-space" );
				}

				if ( this.type === "checkbox" ) {
					toAdd += checked ? "ui-icon-check ui-state-checked" : "ui-icon-blank";
					this._removeClass( this.icon, null, checked ? "ui-icon-blank" : "ui-icon-check" );
				} else {
					toAdd += "ui-icon-blank";
				}
				this._addClass( this.icon, "ui-checkboxradio-icon", toAdd );
				if ( !checked ) {
					this._removeClass( this.icon, null, "ui-icon-check ui-state-checked" );
				}
				this.icon.prependTo( this.label ).after( this.iconSpace );
			} else if ( this.icon !== undefined ) {
				this.icon.remove();
				this.iconSpace.remove();
				delete this.icon;
			}
		},

		_updateLabel: function() {

			// Remove the contents of the label ( minus the icon, icon space, and input )
			var contents = this.label.contents().not( this.element[ 0 ] );
			if ( this.icon ) {
				contents = contents.not( this.icon[ 0 ] );
			}
			if ( this.iconSpace ) {
				contents = contents.not( this.iconSpace[ 0 ] );
			}
			contents.remove();

			this.label.append( this.options.label );
		},

		refresh: function() {
			var checked = this.element[ 0 ].checked,
				isDisabled = this.element[ 0 ].disabled;

			this._updateIcon( checked );
			this._toggleClass( this.label, "ui-checkboxradio-checked", "ui-state-active", checked );
			if ( this.options.label !== null ) {
				this._updateLabel();
			}

			if ( isDisabled !== this.options.disabled ) {
				this._setOptions( { "disabled": isDisabled } );
			}
		}

	} ] );

	var widgetsCheckboxradio = $.ui.checkboxradio;


	/*!
 * jQuery UI Button 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Button
//>>group: Widgets
//>>description: Enhances a form with themeable buttons.
//>>docs: http://api.jqueryui.com/button/
//>>demos: http://jqueryui.com/button/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/button.css
//>>css.theme: ../../themes/base/theme.css


	$.widget( "ui.button", {
		version: "1.13.0",
		defaultElement: "<button>",
		options: {
			classes: {
				"ui-button": "ui-corner-all"
			},
			disabled: null,
			icon: null,
			iconPosition: "beginning",
			label: null,
			showLabel: true
		},

		_getCreateOptions: function() {
			var disabled,

				// This is to support cases like in jQuery Mobile where the base widget does have
				// an implementation of _getCreateOptions
				options = this._super() || {};

			this.isInput = this.element.is( "input" );

			disabled = this.element[ 0 ].disabled;
			if ( disabled != null ) {
				options.disabled = disabled;
			}

			this.originalLabel = this.isInput ? this.element.val() : this.element.html();
			if ( this.originalLabel ) {
				options.label = this.originalLabel;
			}

			return options;
		},

		_create: function() {
			if ( !this.option.showLabel & !this.options.icon ) {
				this.options.showLabel = true;
			}

			// We have to check the option again here even though we did in _getCreateOptions,
			// because null may have been passed on init which would override what was set in
			// _getCreateOptions
			if ( this.options.disabled == null ) {
				this.options.disabled = this.element[ 0 ].disabled || false;
			}

			this.hasTitle = !!this.element.attr( "title" );

			// Check to see if the label needs to be set or if its already correct
			if ( this.options.label && this.options.label !== this.originalLabel ) {
				if ( this.isInput ) {
					this.element.val( this.options.label );
				} else {
					this.element.html( this.options.label );
				}
			}
			this._addClass( "ui-button", "ui-widget" );
			this._setOption( "disabled", this.options.disabled );
			this._enhance();

			if ( this.element.is( "a" ) ) {
				this._on( {
					"keyup": function( event ) {
						if ( event.keyCode === $.ui.keyCode.SPACE ) {
							event.preventDefault();

							// Support: PhantomJS <= 1.9, IE 8 Only
							// If a native click is available use it so we actually cause navigation
							// otherwise just trigger a click event
							if ( this.element[ 0 ].click ) {
								this.element[ 0 ].click();
							} else {
								this.element.trigger( "click" );
							}
						}
					}
				} );
			}
		},

		_enhance: function() {
			if ( !this.element.is( "button" ) ) {
				this.element.attr( "role", "button" );
			}

			if ( this.options.icon ) {
				this._updateIcon( "icon", this.options.icon );
				this._updateTooltip();
			}
		},

		_updateTooltip: function() {
			this.title = this.element.attr( "title" );

			if ( !this.options.showLabel && !this.title ) {
				this.element.attr( "title", this.options.label );
			}
		},

		_updateIcon: function( option, value ) {
			var icon = option !== "iconPosition",
				position = icon ? this.options.iconPosition : value,
				displayBlock = position === "top" || position === "bottom";

			// Create icon
			if ( !this.icon ) {
				this.icon = $( "<span>" );

				this._addClass( this.icon, "ui-button-icon", "ui-icon" );

				if ( !this.options.showLabel ) {
					this._addClass( "ui-button-icon-only" );
				}
			} else if ( icon ) {

				// If we are updating the icon remove the old icon class
				this._removeClass( this.icon, null, this.options.icon );
			}

			// If we are updating the icon add the new icon class
			if ( icon ) {
				this._addClass( this.icon, null, value );
			}

			this._attachIcon( position );

			// If the icon is on top or bottom we need to add the ui-widget-icon-block class and remove
			// the iconSpace if there is one.
			if ( displayBlock ) {
				this._addClass( this.icon, null, "ui-widget-icon-block" );
				if ( this.iconSpace ) {
					this.iconSpace.remove();
				}
			} else {

				// Position is beginning or end so remove the ui-widget-icon-block class and add the
				// space if it does not exist
				if ( !this.iconSpace ) {
					this.iconSpace = $( "<span> </span>" );
					this._addClass( this.iconSpace, "ui-button-icon-space" );
				}
				this._removeClass( this.icon, null, "ui-wiget-icon-block" );
				this._attachIconSpace( position );
			}
		},

		_destroy: function() {
			this.element.removeAttr( "role" );

			if ( this.icon ) {
				this.icon.remove();
			}
			if ( this.iconSpace ) {
				this.iconSpace.remove();
			}
			if ( !this.hasTitle ) {
				this.element.removeAttr( "title" );
			}
		},

		_attachIconSpace: function( iconPosition ) {
			this.icon[ /^(?:end|bottom)/.test( iconPosition ) ? "before" : "after" ]( this.iconSpace );
		},

		_attachIcon: function( iconPosition ) {
			this.element[ /^(?:end|bottom)/.test( iconPosition ) ? "append" : "prepend" ]( this.icon );
		},

		_setOptions: function( options ) {
			var newShowLabel = options.showLabel === undefined ?
					this.options.showLabel :
					options.showLabel,
				newIcon = options.icon === undefined ? this.options.icon : options.icon;

			if ( !newShowLabel && !newIcon ) {
				options.showLabel = true;
			}
			this._super( options );
		},

		_setOption: function( key, value ) {
			if ( key === "icon" ) {
				if ( value ) {
					this._updateIcon( key, value );
				} else if ( this.icon ) {
					this.icon.remove();
					if ( this.iconSpace ) {
						this.iconSpace.remove();
					}
				}
			}

			if ( key === "iconPosition" ) {
				this._updateIcon( key, value );
			}

			// Make sure we can't end up with a button that has neither text nor icon
			if ( key === "showLabel" ) {
				this._toggleClass( "ui-button-icon-only", null, !value );
				this._updateTooltip();
			}

			if ( key === "label" ) {
				if ( this.isInput ) {
					this.element.val( value );
				} else {

					// If there is an icon, append it, else nothing then append the value
					// this avoids removal of the icon when setting label text
					this.element.html( value );
					if ( this.icon ) {
						this._attachIcon( this.options.iconPosition );
						this._attachIconSpace( this.options.iconPosition );
					}
				}
			}

			this._super( key, value );

			if ( key === "disabled" ) {
				this._toggleClass( null, "ui-state-disabled", value );
				this.element[ 0 ].disabled = value;
				if ( value ) {
					this.element.trigger( "blur" );
				}
			}
		},

		refresh: function() {

			// Make sure to only check disabled if its an element that supports this otherwise
			// check for the disabled class to determine state
			var isDisabled = this.element.is( "input, button" ) ?
				this.element[ 0 ].disabled : this.element.hasClass( "ui-button-disabled" );

			if ( isDisabled !== this.options.disabled ) {
				this._setOptions( { disabled: isDisabled } );
			}

			this._updateTooltip();
		}
	} );

// DEPRECATED
	if ( $.uiBackCompat !== false ) {

		// Text and Icons options
		$.widget( "ui.button", $.ui.button, {
			options: {
				text: true,
				icons: {
					primary: null,
					secondary: null
				}
			},

			_create: function() {
				if ( this.options.showLabel && !this.options.text ) {
					this.options.showLabel = this.options.text;
				}
				if ( !this.options.showLabel && this.options.text ) {
					this.options.text = this.options.showLabel;
				}
				if ( !this.options.icon && ( this.options.icons.primary ||
					this.options.icons.secondary ) ) {
					if ( this.options.icons.primary ) {
						this.options.icon = this.options.icons.primary;
					} else {
						this.options.icon = this.options.icons.secondary;
						this.options.iconPosition = "end";
					}
				} else if ( this.options.icon ) {
					this.options.icons.primary = this.options.icon;
				}
				this._super();
			},

			_setOption: function( key, value ) {
				if ( key === "text" ) {
					this._super( "showLabel", value );
					return;
				}
				if ( key === "showLabel" ) {
					this.options.text = value;
				}
				if ( key === "icon" ) {
					this.options.icons.primary = value;
				}
				if ( key === "icons" ) {
					if ( value.primary ) {
						this._super( "icon", value.primary );
						this._super( "iconPosition", "beginning" );
					} else if ( value.secondary ) {
						this._super( "icon", value.secondary );
						this._super( "iconPosition", "end" );
					}
				}
				this._superApply( arguments );
			}
		} );

		$.fn.button = ( function( orig ) {
			return function( options ) {
				var isMethodCall = typeof options === "string";
				var args = Array.prototype.slice.call( arguments, 1 );
				var returnValue = this;

				if ( isMethodCall ) {

					// If this is an empty collection, we need to have the instance method
					// return undefined instead of the jQuery instance
					if ( !this.length && options === "instance" ) {
						returnValue = undefined;
					} else {
						this.each( function() {
							var methodValue;
							var type = $( this ).attr( "type" );
							var name = type !== "checkbox" && type !== "radio" ?
								"button" :
								"checkboxradio";
							var instance = $.data( this, "ui-" + name );

							if ( options === "instance" ) {
								returnValue = instance;
								return false;
							}

							if ( !instance ) {
								return $.error( "cannot call methods on button" +
									" prior to initialization; " +
									"attempted to call method '" + options + "'" );
							}

							if ( typeof instance[ options ] !== "function" ||
								options.charAt( 0 ) === "_" ) {
								return $.error( "no such method '" + options + "' for button" +
									" widget instance" );
							}

							methodValue = instance[ options ].apply( instance, args );

							if ( methodValue !== instance && methodValue !== undefined ) {
								returnValue = methodValue && methodValue.jquery ?
									returnValue.pushStack( methodValue.get() ) :
									methodValue;
								return false;
							}
						} );
					}
				} else {

					// Allow multiple hashes to be passed on init
					if ( args.length ) {
						options = $.widget.extend.apply( null, [ options ].concat( args ) );
					}

					this.each( function() {
						var type = $( this ).attr( "type" );
						var name = type !== "checkbox" && type !== "radio" ? "button" : "checkboxradio";
						var instance = $.data( this, "ui-" + name );

						if ( instance ) {
							instance.option( options || {} );
							if ( instance._init ) {
								instance._init();
							}
						} else {
							if ( name === "button" ) {
								orig.call( $( this ), options );
								return;
							}

							$( this ).checkboxradio( $.extend( { icon: false }, options ) );
						}
					} );
				}

				return returnValue;
			};
		} )( $.fn.button );

		$.fn.buttonset = function() {
			if ( !$.ui.controlgroup ) {
				$.error( "Controlgroup widget missing" );
			}
			if ( arguments[ 0 ] === "option" && arguments[ 1 ] === "items" && arguments[ 2 ] ) {
				return this.controlgroup.apply( this,
					[ arguments[ 0 ], "items.button", arguments[ 2 ] ] );
			}
			if ( arguments[ 0 ] === "option" && arguments[ 1 ] === "items" ) {
				return this.controlgroup.apply( this, [ arguments[ 0 ], "items.button" ] );
			}
			if ( typeof arguments[ 0 ] === "object" && arguments[ 0 ].items ) {
				arguments[ 0 ].items = {
					button: arguments[ 0 ].items
				};
			}
			return this.controlgroup.apply( this, arguments );
		};
	}

	var widgetsButton = $.ui.button;


	/* eslint-disable max-len, camelcase */
	/*!
 * jQuery UI Datepicker 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Datepicker
//>>group: Widgets
//>>description: Displays a calendar from an input or inline for selecting dates.
//>>docs: http://api.jqueryui.com/datepicker/
//>>demos: http://jqueryui.com/datepicker/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/datepicker.css
//>>css.theme: ../../themes/base/theme.css


	$.extend( $.ui, { datepicker: { version: "1.13.0" } } );

	var datepicker_instActive;

	function datepicker_getZindex( elem ) {
		var position, value;
		while ( elem.length && elem[ 0 ] !== document ) {

			// Ignore z-index if position is set to a value where z-index is ignored by the browser
			// This makes behavior of this function consistent across browsers
			// WebKit always returns auto if the element is positioned
			position = elem.css( "position" );
			if ( position === "absolute" || position === "relative" || position === "fixed" ) {

				// IE returns 0 when zIndex is not specified
				// other browsers return a string
				// we ignore the case of nested elements with an explicit value of 0
				// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
				value = parseInt( elem.css( "zIndex" ), 10 );
				if ( !isNaN( value ) && value !== 0 ) {
					return value;
				}
			}
			elem = elem.parent();
		}

		return 0;
	}

	/* Date picker manager.
   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
   Settings for (groups of) date pickers are maintained in an instance object,
   allowing multiple different settings on the same page. */

	function Datepicker() {
		this._curInst = null; // The current instance in use
		this._keyEvent = false; // If the last event was a key event
		this._disabledInputs = []; // List of date picker inputs that have been disabled
		this._datepickerShowing = false; // True if the popup picker is showing , false if not
		this._inDialog = false; // True if showing within a "dialog", false if not
		this._mainDivId = "ui-datepicker-div"; // The ID of the main datepicker division
		this._inlineClass = "ui-datepicker-inline"; // The name of the inline marker class
		this._appendClass = "ui-datepicker-append"; // The name of the append marker class
		this._triggerClass = "ui-datepicker-trigger"; // The name of the trigger marker class
		this._dialogClass = "ui-datepicker-dialog"; // The name of the dialog marker class
		this._disableClass = "ui-datepicker-disabled"; // The name of the disabled covering marker class
		this._unselectableClass = "ui-datepicker-unselectable"; // The name of the unselectable cell marker class
		this._currentClass = "ui-datepicker-current-day"; // The name of the current day marker class
		this._dayOverClass = "ui-datepicker-days-cell-over"; // The name of the day hover marker class
		this.regional = []; // Available regional settings, indexed by language code
		this.regional[ "" ] = { // Default regional settings
			closeText: "Done", // Display text for close link
			prevText: "Prev", // Display text for previous month link
			nextText: "Next", // Display text for next month link
			currentText: "Today", // Display text for current month link
			monthNames: [ "January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December" ], // Names of months for drop-down and formatting
			monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ], // For formatting
			dayNames: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ], // For formatting
			dayNamesShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ], // For formatting
			dayNamesMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ], // Column headings for days starting at Sunday
			weekHeader: "Wk", // Column header for week of the year
			dateFormat: "mm/dd/yy", // See format options on parseDate
			firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
			isRTL: false, // True if right-to-left language, false if left-to-right
			showMonthAfterYear: false, // True if the year select precedes month, false for month then year
			yearSuffix: "", // Additional text to append to the year in the month headers,
			selectMonthLabel: "Select month", // Invisible label for month selector
			selectYearLabel: "Select year" // Invisible label for year selector
		};
		this._defaults = { // Global defaults for all the date picker instances
			showOn: "focus", // "focus" for popup on focus,
			// "button" for trigger button, or "both" for either
			showAnim: "fadeIn", // Name of jQuery animation for popup
			showOptions: {}, // Options for enhanced animations
			defaultDate: null, // Used when field is blank: actual date,
			// +/-number for offset from today, null for today
			appendText: "", // Display text following the input box, e.g. showing the format
			buttonText: "...", // Text for trigger button
			buttonImage: "", // URL for trigger button image
			buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
			hideIfNoPrevNext: false, // True to hide next/previous month links
			// if not applicable, false to just disable them
			navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
			gotoCurrent: false, // True if today link goes back to current selection instead
			changeMonth: false, // True if month can be selected directly, false if only prev/next
			changeYear: false, // True if year can be selected directly, false if only prev/next
			yearRange: "c-10:c+10", // Range of years to display in drop-down,
			// either relative to today's year (-nn:+nn), relative to currently displayed year
			// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
			showOtherMonths: false, // True to show dates in other months, false to leave blank
			selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
			showWeek: false, // True to show week of the year, false to not show it
			calculateWeek: this.iso8601Week, // How to calculate the week of the year,
			// takes a Date and returns the number of the week for it
			shortYearCutoff: "+10", // Short year values < this are in the current century,
			// > this are in the previous century,
			// string value starting with "+" for current year + value
			minDate: null, // The earliest selectable date, or null for no limit
			maxDate: null, // The latest selectable date, or null for no limit
			duration: "fast", // Duration of display/closure
			beforeShowDay: null, // Function that takes a date and returns an array with
			// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or "",
			// [2] = cell title (optional), e.g. $.datepicker.noWeekends
			beforeShow: null, // Function that takes an input field and
			// returns a set of custom settings for the date picker
			onSelect: null, // Define a callback function when a date is selected
			onChangeMonthYear: null, // Define a callback function when the month or year is changed
			onClose: null, // Define a callback function when the datepicker is closed
			onUpdateDatepicker: null, // Define a callback function when the datepicker is updated
			numberOfMonths: 1, // Number of months to show at a time
			showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
			stepMonths: 1, // Number of months to step back/forward
			stepBigMonths: 12, // Number of months to step back/forward for the big links
			altField: "", // Selector for an alternate field to store selected dates into
			altFormat: "", // The date format to use for the alternate field
			constrainInput: true, // The input is constrained by the current date format
			showButtonPanel: false, // True to show button panel, false to not show it
			autoSize: false, // True to size the input for the date format, false to leave as is
			disabled: false // The initial disabled state
		};
		$.extend( this._defaults, this.regional[ "" ] );
		this.regional.en = $.extend( true, {}, this.regional[ "" ] );
		this.regional[ "en-US" ] = $.extend( true, {}, this.regional.en );
		this.dpDiv = datepicker_bindHover( $( "<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>" ) );
	}

	$.extend( Datepicker.prototype, {

		/* Class name added to elements to indicate already configured with a date picker. */
		markerClassName: "hasDatepicker",

		//Keep track of the maximum number of rows displayed (see #7043)
		maxRows: 4,

		// TODO rename to "widget" when switching to widget factory
		_widgetDatepicker: function() {
			return this.dpDiv;
		},

		/* Override the default settings for all instances of the date picker.
	 * @param  settings  object - the new settings to use as defaults (anonymous object)
	 * @return the manager object
	 */
		setDefaults: function( settings ) {
			datepicker_extendRemove( this._defaults, settings || {} );
			return this;
		},

		/* Attach the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 * @param  settings  object - the new settings to use for this date picker instance (anonymous)
	 */
		_attachDatepicker: function( target, settings ) {
			var nodeName, inline, inst;
			nodeName = target.nodeName.toLowerCase();
			inline = ( nodeName === "div" || nodeName === "span" );
			if ( !target.id ) {
				this.uuid += 1;
				target.id = "dp" + this.uuid;
			}
			inst = this._newInst( $( target ), inline );
			inst.settings = $.extend( {}, settings || {} );
			if ( nodeName === "input" ) {
				this._connectDatepicker( target, inst );
			} else if ( inline ) {
				this._inlineDatepicker( target, inst );
			}
		},

		/* Create a new instance object. */
		_newInst: function( target, inline ) {
			var id = target[ 0 ].id.replace( /([^A-Za-z0-9_\-])/g, "\\\\$1" ); // escape jQuery meta chars
			return { id: id, input: target, // associated target
				selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
				drawMonth: 0, drawYear: 0, // month being drawn
				inline: inline, // is datepicker inline or not
				dpDiv: ( !inline ? this.dpDiv : // presentation div
					datepicker_bindHover( $( "<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>" ) ) ) };
		},

		/* Attach the date picker to an input field. */
		_connectDatepicker: function( target, inst ) {
			var input = $( target );
			inst.append = $( [] );
			inst.trigger = $( [] );
			if ( input.hasClass( this.markerClassName ) ) {
				return;
			}
			this._attachments( input, inst );
			input.addClass( this.markerClassName ).on( "keydown", this._doKeyDown ).
			on( "keypress", this._doKeyPress ).on( "keyup", this._doKeyUp );
			this._autoSize( inst );
			$.data( target, "datepicker", inst );

			//If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
			if ( inst.settings.disabled ) {
				this._disableDatepicker( target );
			}
		},

		/* Make attachments based on settings. */
		_attachments: function( input, inst ) {
			var showOn, buttonText, buttonImage,
				appendText = this._get( inst, "appendText" ),
				isRTL = this._get( inst, "isRTL" );

			if ( inst.append ) {
				inst.append.remove();
			}
			if ( appendText ) {
				inst.append = $( "<span>" )
				.addClass( this._appendClass )
				.text( appendText );
				input[ isRTL ? "before" : "after" ]( inst.append );
			}

			input.off( "focus", this._showDatepicker );

			if ( inst.trigger ) {
				inst.trigger.remove();
			}

			showOn = this._get( inst, "showOn" );
			if ( showOn === "focus" || showOn === "both" ) { // pop-up date picker when in the marked field
				input.on( "focus", this._showDatepicker );
			}
			if ( showOn === "button" || showOn === "both" ) { // pop-up date picker when button clicked
				buttonText = this._get( inst, "buttonText" );
				buttonImage = this._get( inst, "buttonImage" );

				if ( this._get( inst, "buttonImageOnly" ) ) {
					inst.trigger = $( "<img>" )
					.addClass( this._triggerClass )
					.attr( {
						src: buttonImage,
						alt: buttonText,
						title: buttonText
					} );
				} else {
					inst.trigger = $( "<button type='button'>" )
					.addClass( this._triggerClass );
					if ( buttonImage ) {
						inst.trigger.html(
							$( "<img>" )
							.attr( {
								src: buttonImage,
								alt: buttonText,
								title: buttonText
							} )
						);
					} else {
						inst.trigger.text( buttonText );
					}
				}

				input[ isRTL ? "before" : "after" ]( inst.trigger );
				inst.trigger.on( "click", function() {
					if ( $.datepicker._datepickerShowing && $.datepicker._lastInput === input[ 0 ] ) {
						$.datepicker._hideDatepicker();
					} else if ( $.datepicker._datepickerShowing && $.datepicker._lastInput !== input[ 0 ] ) {
						$.datepicker._hideDatepicker();
						$.datepicker._showDatepicker( input[ 0 ] );
					} else {
						$.datepicker._showDatepicker( input[ 0 ] );
					}
					return false;
				} );
			}
		},

		/* Apply the maximum length for the date format. */
		_autoSize: function( inst ) {
			if ( this._get( inst, "autoSize" ) && !inst.inline ) {
				var findMax, max, maxI, i,
					date = new Date( 2009, 12 - 1, 20 ), // Ensure double digits
					dateFormat = this._get( inst, "dateFormat" );

				if ( dateFormat.match( /[DM]/ ) ) {
					findMax = function( names ) {
						max = 0;
						maxI = 0;
						for ( i = 0; i < names.length; i++ ) {
							if ( names[ i ].length > max ) {
								max = names[ i ].length;
								maxI = i;
							}
						}
						return maxI;
					};
					date.setMonth( findMax( this._get( inst, ( dateFormat.match( /MM/ ) ?
						"monthNames" : "monthNamesShort" ) ) ) );
					date.setDate( findMax( this._get( inst, ( dateFormat.match( /DD/ ) ?
						"dayNames" : "dayNamesShort" ) ) ) + 20 - date.getDay() );
				}
				inst.input.attr( "size", this._formatDate( inst, date ).length );
			}
		},

		/* Attach an inline date picker to a div. */
		_inlineDatepicker: function( target, inst ) {
			var divSpan = $( target );
			if ( divSpan.hasClass( this.markerClassName ) ) {
				return;
			}
			divSpan.addClass( this.markerClassName ).append( inst.dpDiv );
			$.data( target, "datepicker", inst );
			this._setDate( inst, this._getDefaultDate( inst ), true );
			this._updateDatepicker( inst );
			this._updateAlternate( inst );

			//If disabled option is true, disable the datepicker before showing it (see ticket #5665)
			if ( inst.settings.disabled ) {
				this._disableDatepicker( target );
			}

			// Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
			// http://bugs.jqueryui.com/ticket/7552 - A Datepicker created on a detached div has zero height
			inst.dpDiv.css( "display", "block" );
		},

		/* Pop-up the date picker in a "dialog" box.
	 * @param  input element - ignored
	 * @param  date	string or Date - the initial date to display
	 * @param  onSelect  function - the function to call when a date is selected
	 * @param  settings  object - update the dialog date picker instance's settings (anonymous object)
	 * @param  pos int[2] - coordinates for the dialog's position within the screen or
	 *					event - with x/y coordinates or
	 *					leave empty for default (screen centre)
	 * @return the manager object
	 */
		_dialogDatepicker: function( input, date, onSelect, settings, pos ) {
			var id, browserWidth, browserHeight, scrollX, scrollY,
				inst = this._dialogInst; // internal instance

			if ( !inst ) {
				this.uuid += 1;
				id = "dp" + this.uuid;
				this._dialogInput = $( "<input type='text' id='" + id +
					"' style='position: absolute; top: -100px; width: 0px;'/>" );
				this._dialogInput.on( "keydown", this._doKeyDown );
				$( "body" ).append( this._dialogInput );
				inst = this._dialogInst = this._newInst( this._dialogInput, false );
				inst.settings = {};
				$.data( this._dialogInput[ 0 ], "datepicker", inst );
			}
			datepicker_extendRemove( inst.settings, settings || {} );
			date = ( date && date.constructor === Date ? this._formatDate( inst, date ) : date );
			this._dialogInput.val( date );

			this._pos = ( pos ? ( pos.length ? pos : [ pos.pageX, pos.pageY ] ) : null );
			if ( !this._pos ) {
				browserWidth = document.documentElement.clientWidth;
				browserHeight = document.documentElement.clientHeight;
				scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
				scrollY = document.documentElement.scrollTop || document.body.scrollTop;
				this._pos = // should use actual width/height below
					[ ( browserWidth / 2 ) - 100 + scrollX, ( browserHeight / 2 ) - 150 + scrollY ];
			}

			// Move input on screen for focus, but hidden behind dialog
			this._dialogInput.css( "left", ( this._pos[ 0 ] + 20 ) + "px" ).css( "top", this._pos[ 1 ] + "px" );
			inst.settings.onSelect = onSelect;
			this._inDialog = true;
			this.dpDiv.addClass( this._dialogClass );
			this._showDatepicker( this._dialogInput[ 0 ] );
			if ( $.blockUI ) {
				$.blockUI( this.dpDiv );
			}
			$.data( this._dialogInput[ 0 ], "datepicker", inst );
			return this;
		},

		/* Detach a datepicker from its control.
	 * @param  target	element - the target input field or division or span
	 */
		_destroyDatepicker: function( target ) {
			var nodeName,
				$target = $( target ),
				inst = $.data( target, "datepicker" );

			if ( !$target.hasClass( this.markerClassName ) ) {
				return;
			}

			nodeName = target.nodeName.toLowerCase();
			$.removeData( target, "datepicker" );
			if ( nodeName === "input" ) {
				inst.append.remove();
				inst.trigger.remove();
				$target.removeClass( this.markerClassName ).
				off( "focus", this._showDatepicker ).
				off( "keydown", this._doKeyDown ).
				off( "keypress", this._doKeyPress ).
				off( "keyup", this._doKeyUp );
			} else if ( nodeName === "div" || nodeName === "span" ) {
				$target.removeClass( this.markerClassName ).empty();
			}

			if ( datepicker_instActive === inst ) {
				datepicker_instActive = null;
				this._curInst = null;
			}
		},

		/* Enable the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 */
		_enableDatepicker: function( target ) {
			var nodeName, inline,
				$target = $( target ),
				inst = $.data( target, "datepicker" );

			if ( !$target.hasClass( this.markerClassName ) ) {
				return;
			}

			nodeName = target.nodeName.toLowerCase();
			if ( nodeName === "input" ) {
				target.disabled = false;
				inst.trigger.filter( "button" ).
				each( function() {
					this.disabled = false;
				} ).end().
				filter( "img" ).css( { opacity: "1.0", cursor: "" } );
			} else if ( nodeName === "div" || nodeName === "span" ) {
				inline = $target.children( "." + this._inlineClass );
				inline.children().removeClass( "ui-state-disabled" );
				inline.find( "select.ui-datepicker-month, select.ui-datepicker-year" ).
				prop( "disabled", false );
			}
			this._disabledInputs = $.map( this._disabledInputs,

				// Delete entry
				function( value ) {
					return ( value === target ? null : value );
				} );
		},

		/* Disable the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 */
		_disableDatepicker: function( target ) {
			var nodeName, inline,
				$target = $( target ),
				inst = $.data( target, "datepicker" );

			if ( !$target.hasClass( this.markerClassName ) ) {
				return;
			}

			nodeName = target.nodeName.toLowerCase();
			if ( nodeName === "input" ) {
				target.disabled = true;
				inst.trigger.filter( "button" ).
				each( function() {
					this.disabled = true;
				} ).end().
				filter( "img" ).css( { opacity: "0.5", cursor: "default" } );
			} else if ( nodeName === "div" || nodeName === "span" ) {
				inline = $target.children( "." + this._inlineClass );
				inline.children().addClass( "ui-state-disabled" );
				inline.find( "select.ui-datepicker-month, select.ui-datepicker-year" ).
				prop( "disabled", true );
			}
			this._disabledInputs = $.map( this._disabledInputs,

				// Delete entry
				function( value ) {
					return ( value === target ? null : value );
				} );
			this._disabledInputs[ this._disabledInputs.length ] = target;
		},

		/* Is the first field in a jQuery collection disabled as a datepicker?
	 * @param  target	element - the target input field or division or span
	 * @return boolean - true if disabled, false if enabled
	 */
		_isDisabledDatepicker: function( target ) {
			if ( !target ) {
				return false;
			}
			for ( var i = 0; i < this._disabledInputs.length; i++ ) {
				if ( this._disabledInputs[ i ] === target ) {
					return true;
				}
			}
			return false;
		},

		/* Retrieve the instance data for the target control.
	 * @param  target  element - the target input field or division or span
	 * @return  object - the associated instance data
	 * @throws  error if a jQuery problem getting data
	 */
		_getInst: function( target ) {
			try {
				return $.data( target, "datepicker" );
			} catch ( err ) {
				throw "Missing instance data for this datepicker";
			}
		},

		/* Update or retrieve the settings for a date picker attached to an input field or division.
	 * @param  target  element - the target input field or division or span
	 * @param  name	object - the new settings to update or
	 *				string - the name of the setting to change or retrieve,
	 *				when retrieving also "all" for all instance settings or
	 *				"defaults" for all global defaults
	 * @param  value   any - the new value for the setting
	 *				(omit if above is an object or to retrieve a value)
	 */
		_optionDatepicker: function( target, name, value ) {
			var settings, date, minDate, maxDate,
				inst = this._getInst( target );

			if ( arguments.length === 2 && typeof name === "string" ) {
				return ( name === "defaults" ? $.extend( {}, $.datepicker._defaults ) :
					( inst ? ( name === "all" ? $.extend( {}, inst.settings ) :
						this._get( inst, name ) ) : null ) );
			}

			settings = name || {};
			if ( typeof name === "string" ) {
				settings = {};
				settings[ name ] = value;
			}

			if ( inst ) {
				if ( this._curInst === inst ) {
					this._hideDatepicker();
				}

				date = this._getDateDatepicker( target, true );
				minDate = this._getMinMaxDate( inst, "min" );
				maxDate = this._getMinMaxDate( inst, "max" );
				datepicker_extendRemove( inst.settings, settings );

				// reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
				if ( minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined ) {
					inst.settings.minDate = this._formatDate( inst, minDate );
				}
				if ( maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined ) {
					inst.settings.maxDate = this._formatDate( inst, maxDate );
				}
				if ( "disabled" in settings ) {
					if ( settings.disabled ) {
						this._disableDatepicker( target );
					} else {
						this._enableDatepicker( target );
					}
				}
				this._attachments( $( target ), inst );
				this._autoSize( inst );
				this._setDate( inst, date );
				this._updateAlternate( inst );
				this._updateDatepicker( inst );
			}
		},

		// Change method deprecated
		_changeDatepicker: function( target, name, value ) {
			this._optionDatepicker( target, name, value );
		},

		/* Redraw the date picker attached to an input field or division.
	 * @param  target  element - the target input field or division or span
	 */
		_refreshDatepicker: function( target ) {
			var inst = this._getInst( target );
			if ( inst ) {
				this._updateDatepicker( inst );
			}
		},

		/* Set the dates for a jQuery selection.
	 * @param  target element - the target input field or division or span
	 * @param  date	Date - the new date
	 */
		_setDateDatepicker: function( target, date ) {
			var inst = this._getInst( target );
			if ( inst ) {
				this._setDate( inst, date );
				this._updateDatepicker( inst );
				this._updateAlternate( inst );
			}
		},

		/* Get the date(s) for the first entry in a jQuery selection.
	 * @param  target element - the target input field or division or span
	 * @param  noDefault boolean - true if no default date is to be used
	 * @return Date - the current date
	 */
		_getDateDatepicker: function( target, noDefault ) {
			var inst = this._getInst( target );
			if ( inst && !inst.inline ) {
				this._setDateFromField( inst, noDefault );
			}
			return ( inst ? this._getDate( inst ) : null );
		},

		/* Handle keystrokes. */
		_doKeyDown: function( event ) {
			var onSelect, dateStr, sel,
				inst = $.datepicker._getInst( event.target ),
				handled = true,
				isRTL = inst.dpDiv.is( ".ui-datepicker-rtl" );

			inst._keyEvent = true;
			if ( $.datepicker._datepickerShowing ) {
				switch ( event.keyCode ) {
					case 9: $.datepicker._hideDatepicker();
						handled = false;
						break; // hide on tab out
					case 13: sel = $( "td." + $.datepicker._dayOverClass + ":not(." +
						$.datepicker._currentClass + ")", inst.dpDiv );
						if ( sel[ 0 ] ) {
							$.datepicker._selectDay( event.target, inst.selectedMonth, inst.selectedYear, sel[ 0 ] );
						}

						onSelect = $.datepicker._get( inst, "onSelect" );
						if ( onSelect ) {
							dateStr = $.datepicker._formatDate( inst );

							// Trigger custom callback
							onSelect.apply( ( inst.input ? inst.input[ 0 ] : null ), [ dateStr, inst ] );
						} else {
							$.datepicker._hideDatepicker();
						}

						return false; // don't submit the form
					case 27: $.datepicker._hideDatepicker();
						break; // hide on escape
					case 33: $.datepicker._adjustDate( event.target, ( event.ctrlKey ?
						-$.datepicker._get( inst, "stepBigMonths" ) :
						-$.datepicker._get( inst, "stepMonths" ) ), "M" );
						break; // previous month/year on page up/+ ctrl
					case 34: $.datepicker._adjustDate( event.target, ( event.ctrlKey ?
						+$.datepicker._get( inst, "stepBigMonths" ) :
						+$.datepicker._get( inst, "stepMonths" ) ), "M" );
						break; // next month/year on page down/+ ctrl
					case 35: if ( event.ctrlKey || event.metaKey ) {
						$.datepicker._clearDate( event.target );
					}
						handled = event.ctrlKey || event.metaKey;
						break; // clear on ctrl or command +end
					case 36: if ( event.ctrlKey || event.metaKey ) {
						$.datepicker._gotoToday( event.target );
					}
						handled = event.ctrlKey || event.metaKey;
						break; // current on ctrl or command +home
					case 37: if ( event.ctrlKey || event.metaKey ) {
						$.datepicker._adjustDate( event.target, ( isRTL ? +1 : -1 ), "D" );
					}
						handled = event.ctrlKey || event.metaKey;

						// -1 day on ctrl or command +left
						if ( event.originalEvent.altKey ) {
							$.datepicker._adjustDate( event.target, ( event.ctrlKey ?
								-$.datepicker._get( inst, "stepBigMonths" ) :
								-$.datepicker._get( inst, "stepMonths" ) ), "M" );
						}

						// next month/year on alt +left on Mac
						break;
					case 38: if ( event.ctrlKey || event.metaKey ) {
						$.datepicker._adjustDate( event.target, -7, "D" );
					}
						handled = event.ctrlKey || event.metaKey;
						break; // -1 week on ctrl or command +up
					case 39: if ( event.ctrlKey || event.metaKey ) {
						$.datepicker._adjustDate( event.target, ( isRTL ? -1 : +1 ), "D" );
					}
						handled = event.ctrlKey || event.metaKey;

						// +1 day on ctrl or command +right
						if ( event.originalEvent.altKey ) {
							$.datepicker._adjustDate( event.target, ( event.ctrlKey ?
								+$.datepicker._get( inst, "stepBigMonths" ) :
								+$.datepicker._get( inst, "stepMonths" ) ), "M" );
						}

						// next month/year on alt +right
						break;
					case 40: if ( event.ctrlKey || event.metaKey ) {
						$.datepicker._adjustDate( event.target, +7, "D" );
					}
						handled = event.ctrlKey || event.metaKey;
						break; // +1 week on ctrl or command +down
					default: handled = false;
				}
			} else if ( event.keyCode === 36 && event.ctrlKey ) { // display the date picker on ctrl+home
				$.datepicker._showDatepicker( this );
			} else {
				handled = false;
			}

			if ( handled ) {
				event.preventDefault();
				event.stopPropagation();
			}
		},

		/* Filter entered characters - based on date format. */
		_doKeyPress: function( event ) {
			var chars, chr,
				inst = $.datepicker._getInst( event.target );

			if ( $.datepicker._get( inst, "constrainInput" ) ) {
				chars = $.datepicker._possibleChars( $.datepicker._get( inst, "dateFormat" ) );
				chr = String.fromCharCode( event.charCode == null ? event.keyCode : event.charCode );
				return event.ctrlKey || event.metaKey || ( chr < " " || !chars || chars.indexOf( chr ) > -1 );
			}
		},

		/* Synchronise manual entry and field/alternate field. */
		_doKeyUp: function( event ) {
			var date,
				inst = $.datepicker._getInst( event.target );

			if ( inst.input.val() !== inst.lastVal ) {
				try {
					date = $.datepicker.parseDate( $.datepicker._get( inst, "dateFormat" ),
						( inst.input ? inst.input.val() : null ),
						$.datepicker._getFormatConfig( inst ) );

					if ( date ) { // only if valid
						$.datepicker._setDateFromField( inst );
						$.datepicker._updateAlternate( inst );
						$.datepicker._updateDatepicker( inst );
					}
				} catch ( err ) {
				}
			}
			return true;
		},

		/* Pop-up the date picker for a given input field.
	 * If false returned from beforeShow event handler do not show.
	 * @param  input  element - the input field attached to the date picker or
	 *					event - if triggered by focus
	 */
		_showDatepicker: function( input ) {
			input = input.target || input;
			if ( input.nodeName.toLowerCase() !== "input" ) { // find from button/image trigger
				input = $( "input", input.parentNode )[ 0 ];
			}

			if ( $.datepicker._isDisabledDatepicker( input ) || $.datepicker._lastInput === input ) { // already here
				return;
			}

			var inst, beforeShow, beforeShowSettings, isFixed,
				offset, showAnim, duration;

			inst = $.datepicker._getInst( input );
			if ( $.datepicker._curInst && $.datepicker._curInst !== inst ) {
				$.datepicker._curInst.dpDiv.stop( true, true );
				if ( inst && $.datepicker._datepickerShowing ) {
					$.datepicker._hideDatepicker( $.datepicker._curInst.input[ 0 ] );
				}
			}

			beforeShow = $.datepicker._get( inst, "beforeShow" );
			beforeShowSettings = beforeShow ? beforeShow.apply( input, [ input, inst ] ) : {};
			if ( beforeShowSettings === false ) {
				return;
			}
			datepicker_extendRemove( inst.settings, beforeShowSettings );

			inst.lastVal = null;
			$.datepicker._lastInput = input;
			$.datepicker._setDateFromField( inst );

			if ( $.datepicker._inDialog ) { // hide cursor
				input.value = "";
			}
			if ( !$.datepicker._pos ) { // position below input
				$.datepicker._pos = $.datepicker._findPos( input );
				$.datepicker._pos[ 1 ] += input.offsetHeight; // add the height
			}

			isFixed = false;
			$( input ).parents().each( function() {
				isFixed |= $( this ).css( "position" ) === "fixed";
				return !isFixed;
			} );

			offset = { left: $.datepicker._pos[ 0 ], top: $.datepicker._pos[ 1 ] };
			$.datepicker._pos = null;

			//to avoid flashes on Firefox
			inst.dpDiv.empty();

			// determine sizing offscreen
			inst.dpDiv.css( { position: "absolute", display: "block", top: "-1000px" } );
			$.datepicker._updateDatepicker( inst );

			// fix width for dynamic number of date pickers
			// and adjust position before showing
			offset = $.datepicker._checkOffset( inst, offset, isFixed );
			inst.dpDiv.css( { position: ( $.datepicker._inDialog && $.blockUI ?
					"static" : ( isFixed ? "fixed" : "absolute" ) ), display: "none",
				left: offset.left + "px", top: offset.top + "px" } );

			if ( !inst.inline ) {
				showAnim = $.datepicker._get( inst, "showAnim" );
				duration = $.datepicker._get( inst, "duration" );
				inst.dpDiv.css( "z-index", datepicker_getZindex( $( input ) ) + 1 );
				$.datepicker._datepickerShowing = true;

				if ( $.effects && $.effects.effect[ showAnim ] ) {
					inst.dpDiv.show( showAnim, $.datepicker._get( inst, "showOptions" ), duration );
				} else {
					inst.dpDiv[ showAnim || "show" ]( showAnim ? duration : null );
				}

				if ( $.datepicker._shouldFocusInput( inst ) ) {
					inst.input.trigger( "focus" );
				}

				$.datepicker._curInst = inst;
			}
		},

		/* Generate the date picker content. */
		_updateDatepicker: function( inst ) {
			this.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
			datepicker_instActive = inst; // for delegate hover events
			inst.dpDiv.empty().append( this._generateHTML( inst ) );
			this._attachHandlers( inst );

			var origyearshtml,
				numMonths = this._getNumberOfMonths( inst ),
				cols = numMonths[ 1 ],
				width = 17,
				activeCell = inst.dpDiv.find( "." + this._dayOverClass + " a" ),
				onUpdateDatepicker = $.datepicker._get( inst, "onUpdateDatepicker" );

			if ( activeCell.length > 0 ) {
				datepicker_handleMouseover.apply( activeCell.get( 0 ) );
			}

			inst.dpDiv.removeClass( "ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4" ).width( "" );
			if ( cols > 1 ) {
				inst.dpDiv.addClass( "ui-datepicker-multi-" + cols ).css( "width", ( width * cols ) + "em" );
			}
			inst.dpDiv[ ( numMonths[ 0 ] !== 1 || numMonths[ 1 ] !== 1 ? "add" : "remove" ) +
			"Class" ]( "ui-datepicker-multi" );
			inst.dpDiv[ ( this._get( inst, "isRTL" ) ? "add" : "remove" ) +
			"Class" ]( "ui-datepicker-rtl" );

			if ( inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput( inst ) ) {
				inst.input.trigger( "focus" );
			}

			// Deffered render of the years select (to avoid flashes on Firefox)
			if ( inst.yearshtml ) {
				origyearshtml = inst.yearshtml;
				setTimeout( function() {

					//assure that inst.yearshtml didn't change.
					if ( origyearshtml === inst.yearshtml && inst.yearshtml ) {
						inst.dpDiv.find( "select.ui-datepicker-year" ).first().replaceWith( inst.yearshtml );
					}
					origyearshtml = inst.yearshtml = null;
				}, 0 );
			}

			if ( onUpdateDatepicker ) {
				onUpdateDatepicker.apply( ( inst.input ? inst.input[ 0 ] : null ), [ inst ] );
			}
		},

		// #6694 - don't focus the input if it's already focused
		// this breaks the change event in IE
		// Support: IE and jQuery <1.9
		_shouldFocusInput: function( inst ) {
			return inst.input && inst.input.is( ":visible" ) && !inst.input.is( ":disabled" ) && !inst.input.is( ":focus" );
		},

		/* Check positioning to remain on screen. */
		_checkOffset: function( inst, offset, isFixed ) {
			var dpWidth = inst.dpDiv.outerWidth(),
				dpHeight = inst.dpDiv.outerHeight(),
				inputWidth = inst.input ? inst.input.outerWidth() : 0,
				inputHeight = inst.input ? inst.input.outerHeight() : 0,
				viewWidth = document.documentElement.clientWidth + ( isFixed ? 0 : $( document ).scrollLeft() ),
				viewHeight = document.documentElement.clientHeight + ( isFixed ? 0 : $( document ).scrollTop() );

			offset.left -= ( this._get( inst, "isRTL" ) ? ( dpWidth - inputWidth ) : 0 );
			offset.left -= ( isFixed && offset.left === inst.input.offset().left ) ? $( document ).scrollLeft() : 0;
			offset.top -= ( isFixed && offset.top === ( inst.input.offset().top + inputHeight ) ) ? $( document ).scrollTop() : 0;

			// Now check if datepicker is showing outside window viewport - move to a better place if so.
			offset.left -= Math.min( offset.left, ( offset.left + dpWidth > viewWidth && viewWidth > dpWidth ) ?
				Math.abs( offset.left + dpWidth - viewWidth ) : 0 );
			offset.top -= Math.min( offset.top, ( offset.top + dpHeight > viewHeight && viewHeight > dpHeight ) ?
				Math.abs( dpHeight + inputHeight ) : 0 );

			return offset;
		},

		/* Find an object's position on the screen. */
		_findPos: function( obj ) {
			var position,
				inst = this._getInst( obj ),
				isRTL = this._get( inst, "isRTL" );

			while ( obj && ( obj.type === "hidden" || obj.nodeType !== 1 || $.expr.pseudos.hidden( obj ) ) ) {
				obj = obj[ isRTL ? "previousSibling" : "nextSibling" ];
			}

			position = $( obj ).offset();
			return [ position.left, position.top ];
		},

		/* Hide the date picker from view.
	 * @param  input  element - the input field attached to the date picker
	 */
		_hideDatepicker: function( input ) {
			var showAnim, duration, postProcess, onClose,
				inst = this._curInst;

			if ( !inst || ( input && inst !== $.data( input, "datepicker" ) ) ) {
				return;
			}

			if ( this._datepickerShowing ) {
				showAnim = this._get( inst, "showAnim" );
				duration = this._get( inst, "duration" );
				postProcess = function() {
					$.datepicker._tidyDialog( inst );
				};

				// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
				if ( $.effects && ( $.effects.effect[ showAnim ] || $.effects[ showAnim ] ) ) {
					inst.dpDiv.hide( showAnim, $.datepicker._get( inst, "showOptions" ), duration, postProcess );
				} else {
					inst.dpDiv[ ( showAnim === "slideDown" ? "slideUp" :
						( showAnim === "fadeIn" ? "fadeOut" : "hide" ) ) ]( ( showAnim ? duration : null ), postProcess );
				}

				if ( !showAnim ) {
					postProcess();
				}
				this._datepickerShowing = false;

				onClose = this._get( inst, "onClose" );
				if ( onClose ) {
					onClose.apply( ( inst.input ? inst.input[ 0 ] : null ), [ ( inst.input ? inst.input.val() : "" ), inst ] );
				}

				this._lastInput = null;
				if ( this._inDialog ) {
					this._dialogInput.css( { position: "absolute", left: "0", top: "-100px" } );
					if ( $.blockUI ) {
						$.unblockUI();
						$( "body" ).append( this.dpDiv );
					}
				}
				this._inDialog = false;
			}
		},

		/* Tidy up after a dialog display. */
		_tidyDialog: function( inst ) {
			inst.dpDiv.removeClass( this._dialogClass ).off( ".ui-datepicker-calendar" );
		},

		/* Close date picker if clicked elsewhere. */
		_checkExternalClick: function( event ) {
			if ( !$.datepicker._curInst ) {
				return;
			}

			var $target = $( event.target ),
				inst = $.datepicker._getInst( $target[ 0 ] );

			if ( ( ( $target[ 0 ].id !== $.datepicker._mainDivId &&
					$target.parents( "#" + $.datepicker._mainDivId ).length === 0 &&
					!$target.hasClass( $.datepicker.markerClassName ) &&
					!$target.closest( "." + $.datepicker._triggerClass ).length &&
					$.datepicker._datepickerShowing && !( $.datepicker._inDialog && $.blockUI ) ) ) ||
				( $target.hasClass( $.datepicker.markerClassName ) && $.datepicker._curInst !== inst ) ) {
				$.datepicker._hideDatepicker();
			}
		},

		/* Adjust one of the date sub-fields. */
		_adjustDate: function( id, offset, period ) {
			var target = $( id ),
				inst = this._getInst( target[ 0 ] );

			if ( this._isDisabledDatepicker( target[ 0 ] ) ) {
				return;
			}
			this._adjustInstDate( inst, offset, period );
			this._updateDatepicker( inst );
		},

		/* Action for current link. */
		_gotoToday: function( id ) {
			var date,
				target = $( id ),
				inst = this._getInst( target[ 0 ] );

			if ( this._get( inst, "gotoCurrent" ) && inst.currentDay ) {
				inst.selectedDay = inst.currentDay;
				inst.drawMonth = inst.selectedMonth = inst.currentMonth;
				inst.drawYear = inst.selectedYear = inst.currentYear;
			} else {
				date = new Date();
				inst.selectedDay = date.getDate();
				inst.drawMonth = inst.selectedMonth = date.getMonth();
				inst.drawYear = inst.selectedYear = date.getFullYear();
			}
			this._notifyChange( inst );
			this._adjustDate( target );
		},

		/* Action for selecting a new month/year. */
		_selectMonthYear: function( id, select, period ) {
			var target = $( id ),
				inst = this._getInst( target[ 0 ] );

			inst[ "selected" + ( period === "M" ? "Month" : "Year" ) ] =
				inst[ "draw" + ( period === "M" ? "Month" : "Year" ) ] =
					parseInt( select.options[ select.selectedIndex ].value, 10 );

			this._notifyChange( inst );
			this._adjustDate( target );
		},

		/* Action for selecting a day. */
		_selectDay: function( id, month, year, td ) {
			var inst,
				target = $( id );

			if ( $( td ).hasClass( this._unselectableClass ) || this._isDisabledDatepicker( target[ 0 ] ) ) {
				return;
			}

			inst = this._getInst( target[ 0 ] );
			inst.selectedDay = inst.currentDay = parseInt( $( "a", td ).attr( "data-date" ) );
			inst.selectedMonth = inst.currentMonth = month;
			inst.selectedYear = inst.currentYear = year;
			this._selectDate( id, this._formatDate( inst,
				inst.currentDay, inst.currentMonth, inst.currentYear ) );
		},

		/* Erase the input field and hide the date picker. */
		_clearDate: function( id ) {
			var target = $( id );
			this._selectDate( target, "" );
		},

		/* Update the input field with the selected date. */
		_selectDate: function( id, dateStr ) {
			var onSelect,
				target = $( id ),
				inst = this._getInst( target[ 0 ] );

			dateStr = ( dateStr != null ? dateStr : this._formatDate( inst ) );
			if ( inst.input ) {
				inst.input.val( dateStr );
			}
			this._updateAlternate( inst );

			onSelect = this._get( inst, "onSelect" );
			if ( onSelect ) {
				onSelect.apply( ( inst.input ? inst.input[ 0 ] : null ), [ dateStr, inst ] );  // trigger custom callback
			} else if ( inst.input ) {
				inst.input.trigger( "change" ); // fire the change event
			}

			if ( inst.inline ) {
				this._updateDatepicker( inst );
			} else {
				this._hideDatepicker();
				this._lastInput = inst.input[ 0 ];
				if ( typeof( inst.input[ 0 ] ) !== "object" ) {
					inst.input.trigger( "focus" ); // restore focus
				}
				this._lastInput = null;
			}
		},

		/* Update any alternate field to synchronise with the main field. */
		_updateAlternate: function( inst ) {
			var altFormat, date, dateStr,
				altField = this._get( inst, "altField" );

			if ( altField ) { // update alternate field too
				altFormat = this._get( inst, "altFormat" ) || this._get( inst, "dateFormat" );
				date = this._getDate( inst );
				dateStr = this.formatDate( altFormat, date, this._getFormatConfig( inst ) );
				$( document ).find( altField ).val( dateStr );
			}
		},

		/* Set as beforeShowDay function to prevent selection of weekends.
	 * @param  date  Date - the date to customise
	 * @return [boolean, string] - is this date selectable?, what is its CSS class?
	 */
		noWeekends: function( date ) {
			var day = date.getDay();
			return [ ( day > 0 && day < 6 ), "" ];
		},

		/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
	 * @param  date  Date - the date to get the week for
	 * @return  number - the number of the week within the year that contains this date
	 */
		iso8601Week: function( date ) {
			var time,
				checkDate = new Date( date.getTime() );

			// Find Thursday of this week starting on Monday
			checkDate.setDate( checkDate.getDate() + 4 - ( checkDate.getDay() || 7 ) );

			time = checkDate.getTime();
			checkDate.setMonth( 0 ); // Compare with Jan 1
			checkDate.setDate( 1 );
			return Math.floor( Math.round( ( time - checkDate ) / 86400000 ) / 7 ) + 1;
		},

		/* Parse a string value into a date object.
	 * See formatDate below for the possible formats.
	 *
	 * @param  format string - the expected format of the date
	 * @param  value string - the date in the above format
	 * @param  settings Object - attributes include:
	 *					shortYearCutoff  number - the cutoff year for determining the century (optional)
	 *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
	 *					dayNames		string[7] - names of the days from Sunday (optional)
	 *					monthNamesShort string[12] - abbreviated names of the months (optional)
	 *					monthNames		string[12] - names of the months (optional)
	 * @return  Date - the extracted date value or null if value is blank
	 */
		parseDate: function( format, value, settings ) {
			if ( format == null || value == null ) {
				throw "Invalid arguments";
			}

			value = ( typeof value === "object" ? value.toString() : value + "" );
			if ( value === "" ) {
				return null;
			}

			var iFormat, dim, extra,
				iValue = 0,
				shortYearCutoffTemp = ( settings ? settings.shortYearCutoff : null ) || this._defaults.shortYearCutoff,
				shortYearCutoff = ( typeof shortYearCutoffTemp !== "string" ? shortYearCutoffTemp :
					new Date().getFullYear() % 100 + parseInt( shortYearCutoffTemp, 10 ) ),
				dayNamesShort = ( settings ? settings.dayNamesShort : null ) || this._defaults.dayNamesShort,
				dayNames = ( settings ? settings.dayNames : null ) || this._defaults.dayNames,
				monthNamesShort = ( settings ? settings.monthNamesShort : null ) || this._defaults.monthNamesShort,
				monthNames = ( settings ? settings.monthNames : null ) || this._defaults.monthNames,
				year = -1,
				month = -1,
				day = -1,
				doy = -1,
				literal = false,
				date,

				// Check whether a format character is doubled
				lookAhead = function( match ) {
					var matches = ( iFormat + 1 < format.length && format.charAt( iFormat + 1 ) === match );
					if ( matches ) {
						iFormat++;
					}
					return matches;
				},

				// Extract a number from the string value
				getNumber = function( match ) {
					var isDoubled = lookAhead( match ),
						size = ( match === "@" ? 14 : ( match === "!" ? 20 :
							( match === "y" && isDoubled ? 4 : ( match === "o" ? 3 : 2 ) ) ) ),
						minSize = ( match === "y" ? size : 1 ),
						digits = new RegExp( "^\\d{" + minSize + "," + size + "}" ),
						num = value.substring( iValue ).match( digits );
					if ( !num ) {
						throw "Missing number at position " + iValue;
					}
					iValue += num[ 0 ].length;
					return parseInt( num[ 0 ], 10 );
				},

				// Extract a name from the string value and convert to an index
				getName = function( match, shortNames, longNames ) {
					var index = -1,
						names = $.map( lookAhead( match ) ? longNames : shortNames, function( v, k ) {
							return [ [ k, v ] ];
						} ).sort( function( a, b ) {
							return -( a[ 1 ].length - b[ 1 ].length );
						} );

					$.each( names, function( i, pair ) {
						var name = pair[ 1 ];
						if ( value.substr( iValue, name.length ).toLowerCase() === name.toLowerCase() ) {
							index = pair[ 0 ];
							iValue += name.length;
							return false;
						}
					} );
					if ( index !== -1 ) {
						return index + 1;
					} else {
						throw "Unknown name at position " + iValue;
					}
				},

				// Confirm that a literal character matches the string value
				checkLiteral = function() {
					if ( value.charAt( iValue ) !== format.charAt( iFormat ) ) {
						throw "Unexpected literal at position " + iValue;
					}
					iValue++;
				};

			for ( iFormat = 0; iFormat < format.length; iFormat++ ) {
				if ( literal ) {
					if ( format.charAt( iFormat ) === "'" && !lookAhead( "'" ) ) {
						literal = false;
					} else {
						checkLiteral();
					}
				} else {
					switch ( format.charAt( iFormat ) ) {
						case "d":
							day = getNumber( "d" );
							break;
						case "D":
							getName( "D", dayNamesShort, dayNames );
							break;
						case "o":
							doy = getNumber( "o" );
							break;
						case "m":
							month = getNumber( "m" );
							break;
						case "M":
							month = getName( "M", monthNamesShort, monthNames );
							break;
						case "y":
							year = getNumber( "y" );
							break;
						case "@":
							date = new Date( getNumber( "@" ) );
							year = date.getFullYear();
							month = date.getMonth() + 1;
							day = date.getDate();
							break;
						case "!":
							date = new Date( ( getNumber( "!" ) - this._ticksTo1970 ) / 10000 );
							year = date.getFullYear();
							month = date.getMonth() + 1;
							day = date.getDate();
							break;
						case "'":
							if ( lookAhead( "'" ) ) {
								checkLiteral();
							} else {
								literal = true;
							}
							break;
						default:
							checkLiteral();
					}
				}
			}

			if ( iValue < value.length ) {
				extra = value.substr( iValue );
				if ( !/^\s+/.test( extra ) ) {
					throw "Extra/unparsed characters found in date: " + extra;
				}
			}

			if ( year === -1 ) {
				year = new Date().getFullYear();
			} else if ( year < 100 ) {
				year += new Date().getFullYear() - new Date().getFullYear() % 100 +
					( year <= shortYearCutoff ? 0 : -100 );
			}

			if ( doy > -1 ) {
				month = 1;
				day = doy;
				do {
					dim = this._getDaysInMonth( year, month - 1 );
					if ( day <= dim ) {
						break;
					}
					month++;
					day -= dim;
				} while ( true );
			}

			date = this._daylightSavingAdjust( new Date( year, month - 1, day ) );
			if ( date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day ) {
				throw "Invalid date"; // E.g. 31/02/00
			}
			return date;
		},

		/* Standard date formats. */
		ATOM: "yy-mm-dd", // RFC 3339 (ISO 8601)
		COOKIE: "D, dd M yy",
		ISO_8601: "yy-mm-dd",
		RFC_822: "D, d M y",
		RFC_850: "DD, dd-M-y",
		RFC_1036: "D, d M y",
		RFC_1123: "D, d M yy",
		RFC_2822: "D, d M yy",
		RSS: "D, d M y", // RFC 822
		TICKS: "!",
		TIMESTAMP: "@",
		W3C: "yy-mm-dd", // ISO 8601

		_ticksTo1970: ( ( ( 1970 - 1 ) * 365 + Math.floor( 1970 / 4 ) - Math.floor( 1970 / 100 ) +
			Math.floor( 1970 / 400 ) ) * 24 * 60 * 60 * 10000000 ),

		/* Format a date object into a string value.
	 * The format can be combinations of the following:
	 * d  - day of month (no leading zero)
	 * dd - day of month (two digit)
	 * o  - day of year (no leading zeros)
	 * oo - day of year (three digit)
	 * D  - day name short
	 * DD - day name long
	 * m  - month of year (no leading zero)
	 * mm - month of year (two digit)
	 * M  - month name short
	 * MM - month name long
	 * y  - year (two digit)
	 * yy - year (four digit)
	 * @ - Unix timestamp (ms since 01/01/1970)
	 * ! - Windows ticks (100ns since 01/01/0001)
	 * "..." - literal text
	 * '' - single quote
	 *
	 * @param  format string - the desired format of the date
	 * @param  date Date - the date value to format
	 * @param  settings Object - attributes include:
	 *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
	 *					dayNames		string[7] - names of the days from Sunday (optional)
	 *					monthNamesShort string[12] - abbreviated names of the months (optional)
	 *					monthNames		string[12] - names of the months (optional)
	 * @return  string - the date in the above format
	 */
		formatDate: function( format, date, settings ) {
			if ( !date ) {
				return "";
			}

			var iFormat,
				dayNamesShort = ( settings ? settings.dayNamesShort : null ) || this._defaults.dayNamesShort,
				dayNames = ( settings ? settings.dayNames : null ) || this._defaults.dayNames,
				monthNamesShort = ( settings ? settings.monthNamesShort : null ) || this._defaults.monthNamesShort,
				monthNames = ( settings ? settings.monthNames : null ) || this._defaults.monthNames,

				// Check whether a format character is doubled
				lookAhead = function( match ) {
					var matches = ( iFormat + 1 < format.length && format.charAt( iFormat + 1 ) === match );
					if ( matches ) {
						iFormat++;
					}
					return matches;
				},

				// Format a number, with leading zero if necessary
				formatNumber = function( match, value, len ) {
					var num = "" + value;
					if ( lookAhead( match ) ) {
						while ( num.length < len ) {
							num = "0" + num;
						}
					}
					return num;
				},

				// Format a name, short or long as requested
				formatName = function( match, value, shortNames, longNames ) {
					return ( lookAhead( match ) ? longNames[ value ] : shortNames[ value ] );
				},
				output = "",
				literal = false;

			if ( date ) {
				for ( iFormat = 0; iFormat < format.length; iFormat++ ) {
					if ( literal ) {
						if ( format.charAt( iFormat ) === "'" && !lookAhead( "'" ) ) {
							literal = false;
						} else {
							output += format.charAt( iFormat );
						}
					} else {
						switch ( format.charAt( iFormat ) ) {
							case "d":
								output += formatNumber( "d", date.getDate(), 2 );
								break;
							case "D":
								output += formatName( "D", date.getDay(), dayNamesShort, dayNames );
								break;
							case "o":
								output += formatNumber( "o",
									Math.round( ( new Date( date.getFullYear(), date.getMonth(), date.getDate() ).getTime() - new Date( date.getFullYear(), 0, 0 ).getTime() ) / 86400000 ), 3 );
								break;
							case "m":
								output += formatNumber( "m", date.getMonth() + 1, 2 );
								break;
							case "M":
								output += formatName( "M", date.getMonth(), monthNamesShort, monthNames );
								break;
							case "y":
								output += ( lookAhead( "y" ) ? date.getFullYear() :
									( date.getFullYear() % 100 < 10 ? "0" : "" ) + date.getFullYear() % 100 );
								break;
							case "@":
								output += date.getTime();
								break;
							case "!":
								output += date.getTime() * 10000 + this._ticksTo1970;
								break;
							case "'":
								if ( lookAhead( "'" ) ) {
									output += "'";
								} else {
									literal = true;
								}
								break;
							default:
								output += format.charAt( iFormat );
						}
					}
				}
			}
			return output;
		},

		/* Extract all possible characters from the date format. */
		_possibleChars: function( format ) {
			var iFormat,
				chars = "",
				literal = false,

				// Check whether a format character is doubled
				lookAhead = function( match ) {
					var matches = ( iFormat + 1 < format.length && format.charAt( iFormat + 1 ) === match );
					if ( matches ) {
						iFormat++;
					}
					return matches;
				};

			for ( iFormat = 0; iFormat < format.length; iFormat++ ) {
				if ( literal ) {
					if ( format.charAt( iFormat ) === "'" && !lookAhead( "'" ) ) {
						literal = false;
					} else {
						chars += format.charAt( iFormat );
					}
				} else {
					switch ( format.charAt( iFormat ) ) {
						case "d": case "m": case "y": case "@":
							chars += "0123456789";
							break;
						case "D": case "M":
							return null; // Accept anything
						case "'":
							if ( lookAhead( "'" ) ) {
								chars += "'";
							} else {
								literal = true;
							}
							break;
						default:
							chars += format.charAt( iFormat );
					}
				}
			}
			return chars;
		},

		/* Get a setting value, defaulting if necessary. */
		_get: function( inst, name ) {
			return inst.settings[ name ] !== undefined ?
				inst.settings[ name ] : this._defaults[ name ];
		},

		/* Parse existing date and initialise date picker. */
		_setDateFromField: function( inst, noDefault ) {
			if ( inst.input.val() === inst.lastVal ) {
				return;
			}

			var dateFormat = this._get( inst, "dateFormat" ),
				dates = inst.lastVal = inst.input ? inst.input.val() : null,
				defaultDate = this._getDefaultDate( inst ),
				date = defaultDate,
				settings = this._getFormatConfig( inst );

			try {
				date = this.parseDate( dateFormat, dates, settings ) || defaultDate;
			} catch ( event ) {
				dates = ( noDefault ? "" : dates );
			}
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			inst.currentDay = ( dates ? date.getDate() : 0 );
			inst.currentMonth = ( dates ? date.getMonth() : 0 );
			inst.currentYear = ( dates ? date.getFullYear() : 0 );
			this._adjustInstDate( inst );
		},

		/* Retrieve the default date shown on opening. */
		_getDefaultDate: function( inst ) {
			return this._restrictMinMax( inst,
				this._determineDate( inst, this._get( inst, "defaultDate" ), new Date() ) );
		},

		/* A date may be specified as an exact value or a relative one. */
		_determineDate: function( inst, date, defaultDate ) {
			var offsetNumeric = function( offset ) {
					var date = new Date();
					date.setDate( date.getDate() + offset );
					return date;
				},
				offsetString = function( offset ) {
					try {
						return $.datepicker.parseDate( $.datepicker._get( inst, "dateFormat" ),
							offset, $.datepicker._getFormatConfig( inst ) );
					} catch ( e ) {

						// Ignore
					}

					var date = ( offset.toLowerCase().match( /^c/ ) ?
							$.datepicker._getDate( inst ) : null ) || new Date(),
						year = date.getFullYear(),
						month = date.getMonth(),
						day = date.getDate(),
						pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
						matches = pattern.exec( offset );

					while ( matches ) {
						switch ( matches[ 2 ] || "d" ) {
							case "d" : case "D" :
								day += parseInt( matches[ 1 ], 10 ); break;
							case "w" : case "W" :
								day += parseInt( matches[ 1 ], 10 ) * 7; break;
							case "m" : case "M" :
								month += parseInt( matches[ 1 ], 10 );
								day = Math.min( day, $.datepicker._getDaysInMonth( year, month ) );
								break;
							case "y": case "Y" :
								year += parseInt( matches[ 1 ], 10 );
								day = Math.min( day, $.datepicker._getDaysInMonth( year, month ) );
								break;
						}
						matches = pattern.exec( offset );
					}
					return new Date( year, month, day );
				},
				newDate = ( date == null || date === "" ? defaultDate : ( typeof date === "string" ? offsetString( date ) :
					( typeof date === "number" ? ( isNaN( date ) ? defaultDate : offsetNumeric( date ) ) : new Date( date.getTime() ) ) ) );

			newDate = ( newDate && newDate.toString() === "Invalid Date" ? defaultDate : newDate );
			if ( newDate ) {
				newDate.setHours( 0 );
				newDate.setMinutes( 0 );
				newDate.setSeconds( 0 );
				newDate.setMilliseconds( 0 );
			}
			return this._daylightSavingAdjust( newDate );
		},

		/* Handle switch to/from daylight saving.
	 * Hours may be non-zero on daylight saving cut-over:
	 * > 12 when midnight changeover, but then cannot generate
	 * midnight datetime, so jump to 1AM, otherwise reset.
	 * @param  date  (Date) the date to check
	 * @return  (Date) the corrected date
	 */
		_daylightSavingAdjust: function( date ) {
			if ( !date ) {
				return null;
			}
			date.setHours( date.getHours() > 12 ? date.getHours() + 2 : 0 );
			return date;
		},

		/* Set the date(s) directly. */
		_setDate: function( inst, date, noChange ) {
			var clear = !date,
				origMonth = inst.selectedMonth,
				origYear = inst.selectedYear,
				newDate = this._restrictMinMax( inst, this._determineDate( inst, date, new Date() ) );

			inst.selectedDay = inst.currentDay = newDate.getDate();
			inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
			inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
			if ( ( origMonth !== inst.selectedMonth || origYear !== inst.selectedYear ) && !noChange ) {
				this._notifyChange( inst );
			}
			this._adjustInstDate( inst );
			if ( inst.input ) {
				inst.input.val( clear ? "" : this._formatDate( inst ) );
			}
		},

		/* Retrieve the date(s) directly. */
		_getDate: function( inst ) {
			var startDate = ( !inst.currentYear || ( inst.input && inst.input.val() === "" ) ? null :
				this._daylightSavingAdjust( new Date(
					inst.currentYear, inst.currentMonth, inst.currentDay ) ) );
			return startDate;
		},

		/* Attach the onxxx handlers.  These are declared statically so
	 * they work with static code transformers like Caja.
	 */
		_attachHandlers: function( inst ) {
			var stepMonths = this._get( inst, "stepMonths" ),
				id = "#" + inst.id.replace( /\\\\/g, "\\" );
			inst.dpDiv.find( "[data-handler]" ).map( function() {
				var handler = {
					prev: function() {
						$.datepicker._adjustDate( id, -stepMonths, "M" );
					},
					next: function() {
						$.datepicker._adjustDate( id, +stepMonths, "M" );
					},
					hide: function() {
						$.datepicker._hideDatepicker();
					},
					today: function() {
						$.datepicker._gotoToday( id );
					},
					selectDay: function() {
						$.datepicker._selectDay( id, +this.getAttribute( "data-month" ), +this.getAttribute( "data-year" ), this );
						return false;
					},
					selectMonth: function() {
						$.datepicker._selectMonthYear( id, this, "M" );
						return false;
					},
					selectYear: function() {
						$.datepicker._selectMonthYear( id, this, "Y" );
						return false;
					}
				};
				$( this ).on( this.getAttribute( "data-event" ), handler[ this.getAttribute( "data-handler" ) ] );
			} );
		},

		/* Generate the HTML for the current state of the date picker. */
		_generateHTML: function( inst ) {
			var maxDraw, prevText, prev, nextText, next, currentText, gotoDate,
				controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin,
				monthNames, monthNamesShort, beforeShowDay, showOtherMonths,
				selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate,
				cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows,
				printDate, dRow, tbody, daySettings, otherMonth, unselectable,
				tempDate = new Date(),
				today = this._daylightSavingAdjust(
					new Date( tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() ) ), // clear time
				isRTL = this._get( inst, "isRTL" ),
				showButtonPanel = this._get( inst, "showButtonPanel" ),
				hideIfNoPrevNext = this._get( inst, "hideIfNoPrevNext" ),
				navigationAsDateFormat = this._get( inst, "navigationAsDateFormat" ),
				numMonths = this._getNumberOfMonths( inst ),
				showCurrentAtPos = this._get( inst, "showCurrentAtPos" ),
				stepMonths = this._get( inst, "stepMonths" ),
				isMultiMonth = ( numMonths[ 0 ] !== 1 || numMonths[ 1 ] !== 1 ),
				currentDate = this._daylightSavingAdjust( ( !inst.currentDay ? new Date( 9999, 9, 9 ) :
					new Date( inst.currentYear, inst.currentMonth, inst.currentDay ) ) ),
				minDate = this._getMinMaxDate( inst, "min" ),
				maxDate = this._getMinMaxDate( inst, "max" ),
				drawMonth = inst.drawMonth - showCurrentAtPos,
				drawYear = inst.drawYear;

			if ( drawMonth < 0 ) {
				drawMonth += 12;
				drawYear--;
			}
			if ( maxDate ) {
				maxDraw = this._daylightSavingAdjust( new Date( maxDate.getFullYear(),
					maxDate.getMonth() - ( numMonths[ 0 ] * numMonths[ 1 ] ) + 1, maxDate.getDate() ) );
				maxDraw = ( minDate && maxDraw < minDate ? minDate : maxDraw );
				while ( this._daylightSavingAdjust( new Date( drawYear, drawMonth, 1 ) ) > maxDraw ) {
					drawMonth--;
					if ( drawMonth < 0 ) {
						drawMonth = 11;
						drawYear--;
					}
				}
			}
			inst.drawMonth = drawMonth;
			inst.drawYear = drawYear;

			prevText = this._get( inst, "prevText" );
			prevText = ( !navigationAsDateFormat ? prevText : this.formatDate( prevText,
				this._daylightSavingAdjust( new Date( drawYear, drawMonth - stepMonths, 1 ) ),
				this._getFormatConfig( inst ) ) );

			if ( this._canAdjustMonth( inst, -1, drawYear, drawMonth ) ) {
				prev = $( "<a>" )
				.attr( {
					"class": "ui-datepicker-prev ui-corner-all",
					"data-handler": "prev",
					"data-event": "click",
					title: prevText
				} )
				.append(
					$( "<span>" )
					.addClass( "ui-icon ui-icon-circle-triangle-" +
						( isRTL ? "e" : "w" ) )
					.text( prevText )
				)[ 0 ].outerHTML;
			} else if ( hideIfNoPrevNext ) {
				prev = "";
			} else {
				prev = $( "<a>" )
				.attr( {
					"class": "ui-datepicker-prev ui-corner-all ui-state-disabled",
					title: prevText
				} )
				.append(
					$( "<span>" )
					.addClass( "ui-icon ui-icon-circle-triangle-" +
						( isRTL ? "e" : "w" ) )
					.text( prevText )
				)[ 0 ].outerHTML;
			}

			nextText = this._get( inst, "nextText" );
			nextText = ( !navigationAsDateFormat ? nextText : this.formatDate( nextText,
				this._daylightSavingAdjust( new Date( drawYear, drawMonth + stepMonths, 1 ) ),
				this._getFormatConfig( inst ) ) );

			if ( this._canAdjustMonth( inst, +1, drawYear, drawMonth ) ) {
				next = $( "<a>" )
				.attr( {
					"class": "ui-datepicker-next ui-corner-all",
					"data-handler": "next",
					"data-event": "click",
					title: nextText
				} )
				.append(
					$( "<span>" )
					.addClass( "ui-icon ui-icon-circle-triangle-" +
						( isRTL ? "w" : "e" ) )
					.text( nextText )
				)[ 0 ].outerHTML;
			} else if ( hideIfNoPrevNext ) {
				next = "";
			} else {
				next = $( "<a>" )
				.attr( {
					"class": "ui-datepicker-next ui-corner-all ui-state-disabled",
					title: nextText
				} )
				.append(
					$( "<span>" )
					.attr( "class", "ui-icon ui-icon-circle-triangle-" +
						( isRTL ? "w" : "e" ) )
					.text( nextText )
				)[ 0 ].outerHTML;
			}

			currentText = this._get( inst, "currentText" );
			gotoDate = ( this._get( inst, "gotoCurrent" ) && inst.currentDay ? currentDate : today );
			currentText = ( !navigationAsDateFormat ? currentText :
				this.formatDate( currentText, gotoDate, this._getFormatConfig( inst ) ) );

			controls = "";
			if ( !inst.inline ) {
				controls = $( "<button>" )
				.attr( {
					type: "button",
					"class": "ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all",
					"data-handler": "hide",
					"data-event": "click"
				} )
				.text( this._get( inst, "closeText" ) )[ 0 ].outerHTML;
			}

			buttonPanel = "";
			if ( showButtonPanel ) {
				buttonPanel = $( "<div class='ui-datepicker-buttonpane ui-widget-content'>" )
				.append( isRTL ? controls : "" )
				.append( this._isInRange( inst, gotoDate ) ?
					$( "<button>" )
					.attr( {
						type: "button",
						"class": "ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all",
						"data-handler": "today",
						"data-event": "click"
					} )
					.text( currentText ) :
					"" )
				.append( isRTL ? "" : controls )[ 0 ].outerHTML;
			}

			firstDay = parseInt( this._get( inst, "firstDay" ), 10 );
			firstDay = ( isNaN( firstDay ) ? 0 : firstDay );

			showWeek = this._get( inst, "showWeek" );
			dayNames = this._get( inst, "dayNames" );
			dayNamesMin = this._get( inst, "dayNamesMin" );
			monthNames = this._get( inst, "monthNames" );
			monthNamesShort = this._get( inst, "monthNamesShort" );
			beforeShowDay = this._get( inst, "beforeShowDay" );
			showOtherMonths = this._get( inst, "showOtherMonths" );
			selectOtherMonths = this._get( inst, "selectOtherMonths" );
			defaultDate = this._getDefaultDate( inst );
			html = "";

			for ( row = 0; row < numMonths[ 0 ]; row++ ) {
				group = "";
				this.maxRows = 4;
				for ( col = 0; col < numMonths[ 1 ]; col++ ) {
					selectedDate = this._daylightSavingAdjust( new Date( drawYear, drawMonth, inst.selectedDay ) );
					cornerClass = " ui-corner-all";
					calender = "";
					if ( isMultiMonth ) {
						calender += "<div class='ui-datepicker-group";
						if ( numMonths[ 1 ] > 1 ) {
							switch ( col ) {
								case 0: calender += " ui-datepicker-group-first";
									cornerClass = " ui-corner-" + ( isRTL ? "right" : "left" ); break;
								case numMonths[ 1 ] - 1: calender += " ui-datepicker-group-last";
									cornerClass = " ui-corner-" + ( isRTL ? "left" : "right" ); break;
								default: calender += " ui-datepicker-group-middle"; cornerClass = ""; break;
							}
						}
						calender += "'>";
					}
					calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" +
						( /all|left/.test( cornerClass ) && row === 0 ? ( isRTL ? next : prev ) : "" ) +
						( /all|right/.test( cornerClass ) && row === 0 ? ( isRTL ? prev : next ) : "" ) +
						this._generateMonthYearHeader( inst, drawMonth, drawYear, minDate, maxDate,
							row > 0 || col > 0, monthNames, monthNamesShort ) + // draw month headers
						"</div><table class='ui-datepicker-calendar'><thead>" +
						"<tr>";
					thead = ( showWeek ? "<th class='ui-datepicker-week-col'>" + this._get( inst, "weekHeader" ) + "</th>" : "" );
					for ( dow = 0; dow < 7; dow++ ) { // days of the week
						day = ( dow + firstDay ) % 7;
						thead += "<th scope='col'" + ( ( dow + firstDay + 6 ) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "" ) + ">" +
							"<span title='" + dayNames[ day ] + "'>" + dayNamesMin[ day ] + "</span></th>";
					}
					calender += thead + "</tr></thead><tbody>";
					daysInMonth = this._getDaysInMonth( drawYear, drawMonth );
					if ( drawYear === inst.selectedYear && drawMonth === inst.selectedMonth ) {
						inst.selectedDay = Math.min( inst.selectedDay, daysInMonth );
					}
					leadDays = ( this._getFirstDayOfMonth( drawYear, drawMonth ) - firstDay + 7 ) % 7;
					curRows = Math.ceil( ( leadDays + daysInMonth ) / 7 ); // calculate the number of rows to generate
					numRows = ( isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows ); //If multiple months, use the higher number of rows (see #7043)
					this.maxRows = numRows;
					printDate = this._daylightSavingAdjust( new Date( drawYear, drawMonth, 1 - leadDays ) );
					for ( dRow = 0; dRow < numRows; dRow++ ) { // create date picker rows
						calender += "<tr>";
						tbody = ( !showWeek ? "" : "<td class='ui-datepicker-week-col'>" +
							this._get( inst, "calculateWeek" )( printDate ) + "</td>" );
						for ( dow = 0; dow < 7; dow++ ) { // create date picker days
							daySettings = ( beforeShowDay ?
								beforeShowDay.apply( ( inst.input ? inst.input[ 0 ] : null ), [ printDate ] ) : [ true, "" ] );
							otherMonth = ( printDate.getMonth() !== drawMonth );
							unselectable = ( otherMonth && !selectOtherMonths ) || !daySettings[ 0 ] ||
								( minDate && printDate < minDate ) || ( maxDate && printDate > maxDate );
							tbody += "<td class='" +
								( ( dow + firstDay + 6 ) % 7 >= 5 ? " ui-datepicker-week-end" : "" ) + // highlight weekends
								( otherMonth ? " ui-datepicker-other-month" : "" ) + // highlight days from other months
								( ( printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent ) || // user pressed key
								( defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime() ) ?

									// or defaultDate is current printedDate and defaultDate is selectedDate
									" " + this._dayOverClass : "" ) + // highlight selected day
								( unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "" ) +  // highlight unselectable days
								( otherMonth && !showOtherMonths ? "" : " " + daySettings[ 1 ] + // highlight custom dates
									( printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "" ) + // highlight selected day
									( printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "" ) ) + "'" + // highlight today (if different)
								( ( !otherMonth || showOtherMonths ) && daySettings[ 2 ] ? " title='" + daySettings[ 2 ].replace( /'/g, "&#39;" ) + "'" : "" ) + // cell title
								( unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'" ) + ">" + // actions
								( otherMonth && !showOtherMonths ? "&#xa0;" : // display for other months
									( unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" +
										( printDate.getTime() === today.getTime() ? " ui-state-highlight" : "" ) +
										( printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "" ) + // highlight selected day
										( otherMonth ? " ui-priority-secondary" : "" ) + // distinguish dates from other months
										"' href='#' aria-current='" + ( printDate.getTime() === currentDate.getTime() ? "true" : "false" ) + // mark date as selected for screen reader
										"' data-date='" + printDate.getDate() + // store date as data
										"'>" + printDate.getDate() + "</a>" ) ) + "</td>"; // display selectable date
							printDate.setDate( printDate.getDate() + 1 );
							printDate = this._daylightSavingAdjust( printDate );
						}
						calender += tbody + "</tr>";
					}
					drawMonth++;
					if ( drawMonth > 11 ) {
						drawMonth = 0;
						drawYear++;
					}
					calender += "</tbody></table>" + ( isMultiMonth ? "</div>" +
						( ( numMonths[ 0 ] > 0 && col === numMonths[ 1 ] - 1 ) ? "<div class='ui-datepicker-row-break'></div>" : "" ) : "" );
					group += calender;
				}
				html += group;
			}
			html += buttonPanel;
			inst._keyEvent = false;
			return html;
		},

		/* Generate the month and year header. */
		_generateMonthYearHeader: function( inst, drawMonth, drawYear, minDate, maxDate,
																				secondary, monthNames, monthNamesShort ) {

			var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear,
				changeMonth = this._get( inst, "changeMonth" ),
				changeYear = this._get( inst, "changeYear" ),
				showMonthAfterYear = this._get( inst, "showMonthAfterYear" ),
				selectMonthLabel = this._get( inst, "selectMonthLabel" ),
				selectYearLabel = this._get( inst, "selectYearLabel" ),
				html = "<div class='ui-datepicker-title'>",
				monthHtml = "";

			// Month selection
			if ( secondary || !changeMonth ) {
				monthHtml += "<span class='ui-datepicker-month'>" + monthNames[ drawMonth ] + "</span>";
			} else {
				inMinYear = ( minDate && minDate.getFullYear() === drawYear );
				inMaxYear = ( maxDate && maxDate.getFullYear() === drawYear );
				monthHtml += "<select class='ui-datepicker-month' aria-label='" + selectMonthLabel + "' data-handler='selectMonth' data-event='change'>";
				for ( month = 0; month < 12; month++ ) {
					if ( ( !inMinYear || month >= minDate.getMonth() ) && ( !inMaxYear || month <= maxDate.getMonth() ) ) {
						monthHtml += "<option value='" + month + "'" +
							( month === drawMonth ? " selected='selected'" : "" ) +
							">" + monthNamesShort[ month ] + "</option>";
					}
				}
				monthHtml += "</select>";
			}

			if ( !showMonthAfterYear ) {
				html += monthHtml + ( secondary || !( changeMonth && changeYear ) ? "&#xa0;" : "" );
			}

			// Year selection
			if ( !inst.yearshtml ) {
				inst.yearshtml = "";
				if ( secondary || !changeYear ) {
					html += "<span class='ui-datepicker-year'>" + drawYear + "</span>";
				} else {

					// determine range of years to display
					years = this._get( inst, "yearRange" ).split( ":" );
					thisYear = new Date().getFullYear();
					determineYear = function( value ) {
						var year = ( value.match( /c[+\-].*/ ) ? drawYear + parseInt( value.substring( 1 ), 10 ) :
							( value.match( /[+\-].*/ ) ? thisYear + parseInt( value, 10 ) :
								parseInt( value, 10 ) ) );
						return ( isNaN( year ) ? thisYear : year );
					};
					year = determineYear( years[ 0 ] );
					endYear = Math.max( year, determineYear( years[ 1 ] || "" ) );
					year = ( minDate ? Math.max( year, minDate.getFullYear() ) : year );
					endYear = ( maxDate ? Math.min( endYear, maxDate.getFullYear() ) : endYear );
					inst.yearshtml += "<select class='ui-datepicker-year' aria-label='" + selectYearLabel + "' data-handler='selectYear' data-event='change'>";
					for ( ; year <= endYear; year++ ) {
						inst.yearshtml += "<option value='" + year + "'" +
							( year === drawYear ? " selected='selected'" : "" ) +
							">" + year + "</option>";
					}
					inst.yearshtml += "</select>";

					html += inst.yearshtml;
					inst.yearshtml = null;
				}
			}

			html += this._get( inst, "yearSuffix" );
			if ( showMonthAfterYear ) {
				html += ( secondary || !( changeMonth && changeYear ) ? "&#xa0;" : "" ) + monthHtml;
			}
			html += "</div>"; // Close datepicker_header
			return html;
		},

		/* Adjust one of the date sub-fields. */
		_adjustInstDate: function( inst, offset, period ) {
			var year = inst.selectedYear + ( period === "Y" ? offset : 0 ),
				month = inst.selectedMonth + ( period === "M" ? offset : 0 ),
				day = Math.min( inst.selectedDay, this._getDaysInMonth( year, month ) ) + ( period === "D" ? offset : 0 ),
				date = this._restrictMinMax( inst, this._daylightSavingAdjust( new Date( year, month, day ) ) );

			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
			if ( period === "M" || period === "Y" ) {
				this._notifyChange( inst );
			}
		},

		/* Ensure a date is within any min/max bounds. */
		_restrictMinMax: function( inst, date ) {
			var minDate = this._getMinMaxDate( inst, "min" ),
				maxDate = this._getMinMaxDate( inst, "max" ),
				newDate = ( minDate && date < minDate ? minDate : date );
			return ( maxDate && newDate > maxDate ? maxDate : newDate );
		},

		/* Notify change of month/year. */
		_notifyChange: function( inst ) {
			var onChange = this._get( inst, "onChangeMonthYear" );
			if ( onChange ) {
				onChange.apply( ( inst.input ? inst.input[ 0 ] : null ),
					[ inst.selectedYear, inst.selectedMonth + 1, inst ] );
			}
		},

		/* Determine the number of months to show. */
		_getNumberOfMonths: function( inst ) {
			var numMonths = this._get( inst, "numberOfMonths" );
			return ( numMonths == null ? [ 1, 1 ] : ( typeof numMonths === "number" ? [ 1, numMonths ] : numMonths ) );
		},

		/* Determine the current maximum date - ensure no time components are set. */
		_getMinMaxDate: function( inst, minMax ) {
			return this._determineDate( inst, this._get( inst, minMax + "Date" ), null );
		},

		/* Find the number of days in a given month. */
		_getDaysInMonth: function( year, month ) {
			return 32 - this._daylightSavingAdjust( new Date( year, month, 32 ) ).getDate();
		},

		/* Find the day of the week of the first of a month. */
		_getFirstDayOfMonth: function( year, month ) {
			return new Date( year, month, 1 ).getDay();
		},

		/* Determines if we should allow a "next/prev" month display change. */
		_canAdjustMonth: function( inst, offset, curYear, curMonth ) {
			var numMonths = this._getNumberOfMonths( inst ),
				date = this._daylightSavingAdjust( new Date( curYear,
					curMonth + ( offset < 0 ? offset : numMonths[ 0 ] * numMonths[ 1 ] ), 1 ) );

			if ( offset < 0 ) {
				date.setDate( this._getDaysInMonth( date.getFullYear(), date.getMonth() ) );
			}
			return this._isInRange( inst, date );
		},

		/* Is the given date in the accepted range? */
		_isInRange: function( inst, date ) {
			var yearSplit, currentYear,
				minDate = this._getMinMaxDate( inst, "min" ),
				maxDate = this._getMinMaxDate( inst, "max" ),
				minYear = null,
				maxYear = null,
				years = this._get( inst, "yearRange" );
			if ( years ) {
				yearSplit = years.split( ":" );
				currentYear = new Date().getFullYear();
				minYear = parseInt( yearSplit[ 0 ], 10 );
				maxYear = parseInt( yearSplit[ 1 ], 10 );
				if ( yearSplit[ 0 ].match( /[+\-].*/ ) ) {
					minYear += currentYear;
				}
				if ( yearSplit[ 1 ].match( /[+\-].*/ ) ) {
					maxYear += currentYear;
				}
			}

			return ( ( !minDate || date.getTime() >= minDate.getTime() ) &&
				( !maxDate || date.getTime() <= maxDate.getTime() ) &&
				( !minYear || date.getFullYear() >= minYear ) &&
				( !maxYear || date.getFullYear() <= maxYear ) );
		},

		/* Provide the configuration settings for formatting/parsing. */
		_getFormatConfig: function( inst ) {
			var shortYearCutoff = this._get( inst, "shortYearCutoff" );
			shortYearCutoff = ( typeof shortYearCutoff !== "string" ? shortYearCutoff :
				new Date().getFullYear() % 100 + parseInt( shortYearCutoff, 10 ) );
			return { shortYearCutoff: shortYearCutoff,
				dayNamesShort: this._get( inst, "dayNamesShort" ), dayNames: this._get( inst, "dayNames" ),
				monthNamesShort: this._get( inst, "monthNamesShort" ), monthNames: this._get( inst, "monthNames" ) };
		},

		/* Format the given date for display. */
		_formatDate: function( inst, day, month, year ) {
			if ( !day ) {
				inst.currentDay = inst.selectedDay;
				inst.currentMonth = inst.selectedMonth;
				inst.currentYear = inst.selectedYear;
			}
			var date = ( day ? ( typeof day === "object" ? day :
					this._daylightSavingAdjust( new Date( year, month, day ) ) ) :
				this._daylightSavingAdjust( new Date( inst.currentYear, inst.currentMonth, inst.currentDay ) ) );
			return this.formatDate( this._get( inst, "dateFormat" ), date, this._getFormatConfig( inst ) );
		}
	} );

	/*
 * Bind hover events for datepicker elements.
 * Done via delegate so the binding only occurs once in the lifetime of the parent div.
 * Global datepicker_instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
 */
	function datepicker_bindHover( dpDiv ) {
		var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
		return dpDiv.on( "mouseout", selector, function() {
			$( this ).removeClass( "ui-state-hover" );
			if ( this.className.indexOf( "ui-datepicker-prev" ) !== -1 ) {
				$( this ).removeClass( "ui-datepicker-prev-hover" );
			}
			if ( this.className.indexOf( "ui-datepicker-next" ) !== -1 ) {
				$( this ).removeClass( "ui-datepicker-next-hover" );
			}
		} )
		.on( "mouseover", selector, datepicker_handleMouseover );
	}

	function datepicker_handleMouseover() {
		if ( !$.datepicker._isDisabledDatepicker( datepicker_instActive.inline ? datepicker_instActive.dpDiv.parent()[ 0 ] : datepicker_instActive.input[ 0 ] ) ) {
			$( this ).parents( ".ui-datepicker-calendar" ).find( "a" ).removeClass( "ui-state-hover" );
			$( this ).addClass( "ui-state-hover" );
			if ( this.className.indexOf( "ui-datepicker-prev" ) !== -1 ) {
				$( this ).addClass( "ui-datepicker-prev-hover" );
			}
			if ( this.className.indexOf( "ui-datepicker-next" ) !== -1 ) {
				$( this ).addClass( "ui-datepicker-next-hover" );
			}
		}
	}

	/* jQuery extend now ignores nulls! */
	function datepicker_extendRemove( target, props ) {
		$.extend( target, props );
		for ( var name in props ) {
			if ( props[ name ] == null ) {
				target[ name ] = props[ name ];
			}
		}
		return target;
	}

	/* Invoke the datepicker functionality.
   @param  options  string - a command, optionally followed by additional parameters or
					Object - settings for attaching new datepicker functionality
   @return  jQuery object */
	$.fn.datepicker = function( options ) {

		/* Verify an empty collection wasn't passed - Fixes #6976 */
		if ( !this.length ) {
			return this;
		}

		/* Initialise the date picker. */
		if ( !$.datepicker.initialized ) {
			$( document ).on( "mousedown", $.datepicker._checkExternalClick );
			$.datepicker.initialized = true;
		}

		/* Append datepicker main container to body if not exist. */
		if ( $( "#" + $.datepicker._mainDivId ).length === 0 ) {
			$( "body" ).append( $.datepicker.dpDiv );
		}

		var otherArgs = Array.prototype.slice.call( arguments, 1 );
		if ( typeof options === "string" && ( options === "isDisabled" || options === "getDate" || options === "widget" ) ) {
			return $.datepicker[ "_" + options + "Datepicker" ].
			apply( $.datepicker, [ this[ 0 ] ].concat( otherArgs ) );
		}
		if ( options === "option" && arguments.length === 2 && typeof arguments[ 1 ] === "string" ) {
			return $.datepicker[ "_" + options + "Datepicker" ].
			apply( $.datepicker, [ this[ 0 ] ].concat( otherArgs ) );
		}
		return this.each( function() {
			if ( typeof options === "string" ) {
				$.datepicker[ "_" + options + "Datepicker" ]
				.apply( $.datepicker, [ this ].concat( otherArgs ) );
			} else {
				$.datepicker._attachDatepicker( this, options );
			}
		} );
	};

	$.datepicker = new Datepicker(); // singleton instance
	$.datepicker.initialized = false;
	$.datepicker.uuid = new Date().getTime();
	$.datepicker.version = "1.13.0";

	var widgetsDatepicker = $.datepicker;



// This file is deprecated
	var ie = $.ui.ie = !!/msie [\w.]+/.exec( navigator.userAgent.toLowerCase() );

	/*!
 * jQuery UI Mouse 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Mouse
//>>group: Widgets
//>>description: Abstracts mouse-based interactions to assist in creating certain widgets.
//>>docs: http://api.jqueryui.com/mouse/


	var mouseHandled = false;
	$( document ).on( "mouseup", function() {
		mouseHandled = false;
	} );

	var widgetsMouse = $.widget( "ui.mouse", {
		version: "1.13.0",
		options: {
			cancel: "input, textarea, button, select, option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function() {
			var that = this;

			this.element
			.on( "mousedown." + this.widgetName, function( event ) {
				return that._mouseDown( event );
			} )
			.on( "click." + this.widgetName, function( event ) {
				if ( true === $.data( event.target, that.widgetName + ".preventClickEvent" ) ) {
					$.removeData( event.target, that.widgetName + ".preventClickEvent" );
					event.stopImmediatePropagation();
					return false;
				}
			} );

			this.started = false;
		},

		// TODO: make sure destroying one instance of mouse doesn't mess with
		// other instances of mouse
		_mouseDestroy: function() {
			this.element.off( "." + this.widgetName );
			if ( this._mouseMoveDelegate ) {
				this.document
				.off( "mousemove." + this.widgetName, this._mouseMoveDelegate )
				.off( "mouseup." + this.widgetName, this._mouseUpDelegate );
			}
		},

		_mouseDown: function( event ) {

			// don't let more than one widget handle mouseStart
			if ( mouseHandled ) {
				return;
			}

			this._mouseMoved = false;

			// We may have missed mouseup (out of window)
			if ( this._mouseStarted ) {
				this._mouseUp( event );
			}

			this._mouseDownEvent = event;

			var that = this,
				btnIsLeft = ( event.which === 1 ),

				// event.target.nodeName works around a bug in IE 8 with
				// disabled inputs (#7620)
				elIsCancel = ( typeof this.options.cancel === "string" && event.target.nodeName ?
					$( event.target ).closest( this.options.cancel ).length : false );
			if ( !btnIsLeft || elIsCancel || !this._mouseCapture( event ) ) {
				return true;
			}

			this.mouseDelayMet = !this.options.delay;
			if ( !this.mouseDelayMet ) {
				this._mouseDelayTimer = setTimeout( function() {
					that.mouseDelayMet = true;
				}, this.options.delay );
			}

			if ( this._mouseDistanceMet( event ) && this._mouseDelayMet( event ) ) {
				this._mouseStarted = ( this._mouseStart( event ) !== false );
				if ( !this._mouseStarted ) {
					event.preventDefault();
					return true;
				}
			}

			// Click event may never have fired (Gecko & Opera)
			if ( true === $.data( event.target, this.widgetName + ".preventClickEvent" ) ) {
				$.removeData( event.target, this.widgetName + ".preventClickEvent" );
			}

			// These delegates are required to keep context
			this._mouseMoveDelegate = function( event ) {
				return that._mouseMove( event );
			};
			this._mouseUpDelegate = function( event ) {
				return that._mouseUp( event );
			};

			this.document
			.on( "mousemove." + this.widgetName, this._mouseMoveDelegate )
			.on( "mouseup." + this.widgetName, this._mouseUpDelegate );

			if (this.widgetName === 'slider') {
				// Prevent tragging of slider handle(anchor) in Firefox
				event.preventDefault();
			}

			mouseHandled = true;
			return true;
		},

		_mouseMove: function( event ) {

			// Only check for mouseups outside the document if you've moved inside the document
			// at least once. This prevents the firing of mouseup in the case of IE<9, which will
			// fire a mousemove event if content is placed under the cursor. See #7778
			// Support: IE <9
			if ( this._mouseMoved ) {

				// IE mouseup check - mouseup happened when mouse was out of window
				if ( $.ui.ie && ( !document.documentMode || document.documentMode < 9 ) &&
					!event.button ) {
					return this._mouseUp( event );

					// Iframe mouseup check - mouseup occurred in another document
				} else if ( !event.which ) {

					// Support: Safari <=8 - 9
					// Safari sets which to 0 if you press any of the following keys
					// during a drag (#14461)
					if ( event.originalEvent.altKey || event.originalEvent.ctrlKey ||
						event.originalEvent.metaKey || event.originalEvent.shiftKey ) {
						this.ignoreMissingWhich = true;
					} else if ( !this.ignoreMissingWhich ) {
						return this._mouseUp( event );
					}
				}
			}

			if ( event.which || event.button ) {
				this._mouseMoved = true;
			}

			if ( this._mouseStarted ) {
				this._mouseDrag( event );
				return event.preventDefault();
			}

			if ( this._mouseDistanceMet( event ) && this._mouseDelayMet( event ) ) {
				this._mouseStarted =
					( this._mouseStart( this._mouseDownEvent, event ) !== false );
				if ( this._mouseStarted ) {
					this._mouseDrag( event );
				} else {
					this._mouseUp( event );
				}
			}

			return !this._mouseStarted;
		},

		_mouseUp: function( event ) {
			this.document
			.off( "mousemove." + this.widgetName, this._mouseMoveDelegate )
			.off( "mouseup." + this.widgetName, this._mouseUpDelegate );

			if ( this._mouseStarted ) {
				this._mouseStarted = false;

				if ( event.target === this._mouseDownEvent.target ) {
					$.data( event.target, this.widgetName + ".preventClickEvent", true );
				}

				this._mouseStop( event );
			}

			if ( this._mouseDelayTimer ) {
				clearTimeout( this._mouseDelayTimer );
				delete this._mouseDelayTimer;
			}

			this.ignoreMissingWhich = false;
			mouseHandled = false;
			event.preventDefault();
		},

		_mouseDistanceMet: function( event ) {
			return ( Math.max(
					Math.abs( this._mouseDownEvent.pageX - event.pageX ),
					Math.abs( this._mouseDownEvent.pageY - event.pageY )
				) >= this.options.distance
			);
		},

		_mouseDelayMet: function( /* event */ ) {
			return this.mouseDelayMet;
		},

		// These are placeholder methods, to be overriden by extending plugin
		_mouseStart: function( /* event */ ) {},
		_mouseDrag: function( /* event */ ) {},
		_mouseStop: function( /* event */ ) {},
		_mouseCapture: function( /* event */ ) {
			return true;
		}
	} );



// $.ui.plugin is deprecated. Use $.widget() extensions instead.
	var plugin = $.ui.plugin = {
		add: function( module, option, set ) {
			var i,
				proto = $.ui[ module ].prototype;
			for ( i in set ) {
				proto.plugins[ i ] = proto.plugins[ i ] || [];
				proto.plugins[ i ].push( [ option, set[ i ] ] );
			}
		},
		call: function( instance, name, args, allowDisconnected ) {
			var i,
				set = instance.plugins[ name ];

			if ( !set ) {
				return;
			}

			if ( !allowDisconnected && ( !instance.element[ 0 ].parentNode ||
				instance.element[ 0 ].parentNode.nodeType === 11 ) ) {
				return;
			}

			for ( i = 0; i < set.length; i++ ) {
				if ( instance.options[ set[ i ][ 0 ] ] ) {
					set[ i ][ 1 ].apply( instance.element, args );
				}
			}
		}
	};



	var safeBlur = $.ui.safeBlur = function( element ) {

		// Support: IE9 - 10 only
		// If the <body> is blurred, IE will switch windows, see #9420
		if ( element && element.nodeName.toLowerCase() !== "body" ) {
			$( element ).trigger( "blur" );
		}
	};


	/*!
 * jQuery UI Draggable 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Draggable
//>>group: Interactions
//>>description: Enables dragging functionality for any element.
//>>docs: http://api.jqueryui.com/draggable/
//>>demos: http://jqueryui.com/draggable/
//>>css.structure: ../../themes/base/draggable.css


	$.widget( "ui.draggable", $.ui.mouse, {
		version: "1.13.0",
		widgetEventPrefix: "drag",
		options: {
			addClasses: true,
			appendTo: "parent",
			axis: false,
			connectToSortable: false,
			containment: false,
			cursor: "auto",
			cursorAt: false,
			grid: false,
			handle: false,
			helper: "original",
			iframeFix: false,
			opacity: false,
			refreshPositions: false,
			revert: false,
			revertDuration: 500,
			scope: "default",
			scroll: true,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			snap: false,
			snapMode: "both",
			snapTolerance: 20,
			stack: false,
			zIndex: false,

			// Callbacks
			drag: null,
			start: null,
			stop: null
		},
		_create: function() {

			if ( this.options.helper === "original" ) {
				this._setPositionRelative();
			}
			if ( this.options.addClasses ) {
				this._addClass( "ui-draggable" );
			}
			this._setHandleClassName();

			this._mouseInit();
		},

		_setOption: function( key, value ) {
			this._super( key, value );
			if ( key === "handle" ) {
				this._removeHandleClassName();
				this._setHandleClassName();
			}
		},

		_destroy: function() {
			if ( ( this.helper || this.element ).is( ".ui-draggable-dragging" ) ) {
				this.destroyOnClear = true;
				return;
			}
			this._removeHandleClassName();
			this._mouseDestroy();
		},

		_mouseCapture: function( event ) {
			var o = this.options;

			// Among others, prevent a drag on a resizable-handle
			if ( this.helper || o.disabled ||
				$( event.target ).closest( ".ui-resizable-handle" ).length > 0 ) {
				return false;
			}

			//Quit if we're not on a valid handle
			this.handle = this._getHandle( event );
			if ( !this.handle ) {
				return false;
			}

			this._blurActiveElement( event );

			this._blockFrames( o.iframeFix === true ? "iframe" : o.iframeFix );

			return true;

		},

		_blockFrames: function( selector ) {
			this.iframeBlocks = this.document.find( selector ).map( function() {
				var iframe = $( this );

				return $( "<div>" )
				.css( "position", "absolute" )
				.appendTo( iframe.parent() )
				.outerWidth( iframe.outerWidth() )
				.outerHeight( iframe.outerHeight() )
				.offset( iframe.offset() )[ 0 ];
			} );
		},

		_unblockFrames: function() {
			if ( this.iframeBlocks ) {
				this.iframeBlocks.remove();
				delete this.iframeBlocks;
			}
		},

		_blurActiveElement: function( event ) {
			var activeElement = $.ui.safeActiveElement( this.document[ 0 ] ),
				target = $( event.target );

			// Don't blur if the event occurred on an element that is within
			// the currently focused element
			// See #10527, #12472
			if ( target.closest( activeElement ).length ) {
				return;
			}

			// Blur any element that currently has focus, see #4261
			$.ui.safeBlur( activeElement );
		},

		_mouseStart: function( event ) {

			var o = this.options;

			//Create and append the visible helper
			this.helper = this._createHelper( event );

			this._addClass( this.helper, "ui-draggable-dragging" );

			//Cache the helper size
			this._cacheHelperProportions();

			//If ddmanager is used for droppables, set the global draggable
			if ( $.ui.ddmanager ) {
				$.ui.ddmanager.current = this;
			}

			/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

			//Cache the margins of the original element
			this._cacheMargins();

			//Store the helper's css position
			this.cssPosition = this.helper.css( "position" );
			this.scrollParent = this.helper.scrollParent( true );
			this.offsetParent = this.helper.offsetParent();
			this.hasFixedAncestor = this.helper.parents().filter( function() {
				return $( this ).css( "position" ) === "fixed";
			} ).length > 0;

			//The element's absolute position on the page minus margins
			this.positionAbs = this.element.offset();
			this._refreshOffsets( event );

			//Generate the original position
			this.originalPosition = this.position = this._generatePosition( event, false );
			this.originalPageX = event.pageX;
			this.originalPageY = event.pageY;

			//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
			if ( o.cursorAt ) {
				this._adjustOffsetFromHelper( o.cursorAt );
			}

			//Set a containment if given in the options
			this._setContainment();

			//Trigger event + callbacks
			if ( this._trigger( "start", event ) === false ) {
				this._clear();
				return false;
			}

			//Recache the helper size
			this._cacheHelperProportions();

			//Prepare the droppable offsets
			if ( $.ui.ddmanager && !o.dropBehaviour ) {
				$.ui.ddmanager.prepareOffsets( this, event );
			}

			// Execute the drag once - this causes the helper not to be visible before getting its
			// correct position
			this._mouseDrag( event, true );

			// If the ddmanager is used for droppables, inform the manager that dragging has started
			// (see #5003)
			if ( $.ui.ddmanager ) {
				$.ui.ddmanager.dragStart( this, event );
			}

			return true;
		},

		_refreshOffsets: function( event ) {
			this.offset = {
				top: this.positionAbs.top - this.margins.top,
				left: this.positionAbs.left - this.margins.left,
				scroll: false,
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			};

			this.offset.click = {
				left: event.pageX - this.offset.left,
				top: event.pageY - this.offset.top
			};
		},

		_mouseDrag: function( event, noPropagation ) {

			// reset any necessary cached properties (see #5009)
			if ( this.hasFixedAncestor ) {
				this.offset.parent = this._getParentOffset();
			}

			//Compute the helpers position
			this.position = this._generatePosition( event, true );
			this.positionAbs = this._convertPositionTo( "absolute" );

			//Call plugins and callbacks and use the resulting position if something is returned
			if ( !noPropagation ) {
				var ui = this._uiHash();
				if ( this._trigger( "drag", event, ui ) === false ) {
					this._mouseUp( new $.Event( "mouseup", event ) );
					return false;
				}
				this.position = ui.position;
			}

			this.helper[ 0 ].style.left = this.position.left + "px";
			this.helper[ 0 ].style.top = this.position.top + "px";

			if ( $.ui.ddmanager ) {
				$.ui.ddmanager.drag( this, event );
			}

			return false;
		},

		_mouseStop: function( event ) {

			//If we are using droppables, inform the manager about the drop
			var that = this,
				dropped = false;
			if ( $.ui.ddmanager && !this.options.dropBehaviour ) {
				dropped = $.ui.ddmanager.drop( this, event );
			}

			//if a drop comes from outside (a sortable)
			if ( this.dropped ) {
				dropped = this.dropped;
				this.dropped = false;
			}

			if ( ( this.options.revert === "invalid" && !dropped ) ||
				( this.options.revert === "valid" && dropped ) ||
				this.options.revert === true || ( typeof this.options.revert === "function" &&
					this.options.revert.call( this.element, dropped ) )
			) {
				$( this.helper ).animate(
					this.originalPosition,
					parseInt( this.options.revertDuration, 10 ),
					function() {
						if ( that._trigger( "stop", event ) !== false ) {
							that._clear();
						}
					}
				);
			} else {
				if ( this._trigger( "stop", event ) !== false ) {
					this._clear();
				}
			}

			return false;
		},

		_mouseUp: function( event ) {
			this._unblockFrames();

			// If the ddmanager is used for droppables, inform the manager that dragging has stopped
			// (see #5003)
			if ( $.ui.ddmanager ) {
				$.ui.ddmanager.dragStop( this, event );
			}

			// Only need to focus if the event occurred on the draggable itself, see #10527
			if ( this.handleElement.is( event.target ) ) {

				// The interaction is over; whether or not the click resulted in a drag,
				// focus the element
				this.element.trigger( "focus" );
			}

			return $.ui.mouse.prototype._mouseUp.call( this, event );
		},

		cancel: function() {

			if ( this.helper.is( ".ui-draggable-dragging" ) ) {
				this._mouseUp( new $.Event( "mouseup", { target: this.element[ 0 ] } ) );
			} else {
				this._clear();
			}

			return this;

		},

		_getHandle: function( event ) {
			return this.options.handle ?
				!!$( event.target ).closest( this.element.find( this.options.handle ) ).length :
				true;
		},

		_setHandleClassName: function() {
			this.handleElement = this.options.handle ?
				this.element.find( this.options.handle ) : this.element;
			this._addClass( this.handleElement, "ui-draggable-handle" );
		},

		_removeHandleClassName: function() {
			this._removeClass( this.handleElement, "ui-draggable-handle" );
		},

		_createHelper: function( event ) {

			var o = this.options,
				helperIsFunction = typeof o.helper === "function",
				helper = helperIsFunction ?
					$( o.helper.apply( this.element[ 0 ], [ event ] ) ) :
					( o.helper === "clone" ?
						this.element.clone().removeAttr( "id" ) :
						this.element );

			if ( !helper.parents( "body" ).length ) {
				helper.appendTo( ( o.appendTo === "parent" ?
					this.element[ 0 ].parentNode :
					o.appendTo ) );
			}

			// Http://bugs.jqueryui.com/ticket/9446
			// a helper function can return the original element
			// which wouldn't have been set to relative in _create
			if ( helperIsFunction && helper[ 0 ] === this.element[ 0 ] ) {
				this._setPositionRelative();
			}

			if ( helper[ 0 ] !== this.element[ 0 ] &&
				!( /(fixed|absolute)/ ).test( helper.css( "position" ) ) ) {
				helper.css( "position", "absolute" );
			}

			return helper;

		},

		_setPositionRelative: function() {
			if ( !( /^(?:r|a|f)/ ).test( this.element.css( "position" ) ) ) {
				this.element[ 0 ].style.position = "relative";
			}
		},

		_adjustOffsetFromHelper: function( obj ) {
			if ( typeof obj === "string" ) {
				obj = obj.split( " " );
			}
			if ( Array.isArray( obj ) ) {
				obj = { left: +obj[ 0 ], top: +obj[ 1 ] || 0 };
			}
			if ( "left" in obj ) {
				this.offset.click.left = obj.left + this.margins.left;
			}
			if ( "right" in obj ) {
				this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
			}
			if ( "top" in obj ) {
				this.offset.click.top = obj.top + this.margins.top;
			}
			if ( "bottom" in obj ) {
				this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
			}
		},

		_isRootNode: function( element ) {
			return ( /(html|body)/i ).test( element.tagName ) || element === this.document[ 0 ];
		},

		_getParentOffset: function() {

			//Get the offsetParent and cache its position
			var po = this.offsetParent.offset(),
				document = this.document[ 0 ];

			// This is a special case where we need to modify a offset calculated on start, since the
			// following happened:
			// 1. The position of the helper is absolute, so it's position is calculated based on the
			// next positioned parent
			// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't
			// the document, which means that the scroll is included in the initial calculation of the
			// offset of the parent, and never recalculated upon drag
			if ( this.cssPosition === "absolute" && this.scrollParent[ 0 ] !== document &&
				$.contains( this.scrollParent[ 0 ], this.offsetParent[ 0 ] ) ) {
				po.left += this.scrollParent.scrollLeft();
				po.top += this.scrollParent.scrollTop();
			}

			if ( this._isRootNode( this.offsetParent[ 0 ] ) ) {
				po = { top: 0, left: 0 };
			}

			return {
				top: po.top + ( parseInt( this.offsetParent.css( "borderTopWidth" ), 10 ) || 0 ),
				left: po.left + ( parseInt( this.offsetParent.css( "borderLeftWidth" ), 10 ) || 0 )
			};

		},

		_getRelativeOffset: function() {
			if ( this.cssPosition !== "relative" ) {
				return { top: 0, left: 0 };
			}

			var p = this.element.position(),
				scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] );

			return {
				top: p.top - ( parseInt( this.helper.css( "top" ), 10 ) || 0 ) +
					( !scrollIsRootNode ? this.scrollParent.scrollTop() : 0 ),
				left: p.left - ( parseInt( this.helper.css( "left" ), 10 ) || 0 ) +
					( !scrollIsRootNode ? this.scrollParent.scrollLeft() : 0 )
			};

		},

		_cacheMargins: function() {
			this.margins = {
				left: ( parseInt( this.element.css( "marginLeft" ), 10 ) || 0 ),
				top: ( parseInt( this.element.css( "marginTop" ), 10 ) || 0 ),
				right: ( parseInt( this.element.css( "marginRight" ), 10 ) || 0 ),
				bottom: ( parseInt( this.element.css( "marginBottom" ), 10 ) || 0 )
			};
		},

		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			};
		},

		_setContainment: function() {

			var isUserScrollable, c, ce,
				o = this.options,
				document = this.document[ 0 ];

			this.relativeContainer = null;

			if ( !o.containment ) {
				this.containment = null;
				return;
			}

			if ( o.containment === "window" ) {
				this.containment = [
					$( window ).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
					$( window ).scrollTop() - this.offset.relative.top - this.offset.parent.top,
					$( window ).scrollLeft() + $( window ).width() -
					this.helperProportions.width - this.margins.left,
					$( window ).scrollTop() +
					( $( window ).height() || document.body.parentNode.scrollHeight ) -
					this.helperProportions.height - this.margins.top
				];
				return;
			}

			if ( o.containment === "document" ) {
				this.containment = [
					0,
					0,
					$( document ).width() - this.helperProportions.width - this.margins.left,
					( $( document ).height() || document.body.parentNode.scrollHeight ) -
					this.helperProportions.height - this.margins.top
				];
				return;
			}

			if ( o.containment.constructor === Array ) {
				this.containment = o.containment;
				return;
			}

			if ( o.containment === "parent" ) {
				o.containment = this.helper[ 0 ].parentNode;
			}

			c = $( o.containment );
			ce = c[ 0 ];

			if ( !ce ) {
				return;
			}

			isUserScrollable = /(scroll|auto)/.test( c.css( "overflow" ) );

			this.containment = [
				( parseInt( c.css( "borderLeftWidth" ), 10 ) || 0 ) +
				( parseInt( c.css( "paddingLeft" ), 10 ) || 0 ),
				( parseInt( c.css( "borderTopWidth" ), 10 ) || 0 ) +
				( parseInt( c.css( "paddingTop" ), 10 ) || 0 ),
				( isUserScrollable ? Math.max( ce.scrollWidth, ce.offsetWidth ) : ce.offsetWidth ) -
				( parseInt( c.css( "borderRightWidth" ), 10 ) || 0 ) -
				( parseInt( c.css( "paddingRight" ), 10 ) || 0 ) -
				this.helperProportions.width -
				this.margins.left -
				this.margins.right,
				( isUserScrollable ? Math.max( ce.scrollHeight, ce.offsetHeight ) : ce.offsetHeight ) -
				( parseInt( c.css( "borderBottomWidth" ), 10 ) || 0 ) -
				( parseInt( c.css( "paddingBottom" ), 10 ) || 0 ) -
				this.helperProportions.height -
				this.margins.top -
				this.margins.bottom
			];
			this.relativeContainer = c;
		},

		_convertPositionTo: function( d, pos ) {

			if ( !pos ) {
				pos = this.position;
			}

			var mod = d === "absolute" ? 1 : -1,
				scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] );

			return {
				top: (

					// The absolute mouse position
					pos.top	+

					// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.relative.top * mod +

					// The offsetParent's offset without borders (offset + border)
					this.offset.parent.top * mod -
					( ( this.cssPosition === "fixed" ?
						-this.offset.scroll.top :
						( scrollIsRootNode ? 0 : this.offset.scroll.top ) ) * mod )
				),
				left: (

					// The absolute mouse position
					pos.left +

					// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.relative.left * mod +

					// The offsetParent's offset without borders (offset + border)
					this.offset.parent.left * mod	-
					( ( this.cssPosition === "fixed" ?
						-this.offset.scroll.left :
						( scrollIsRootNode ? 0 : this.offset.scroll.left ) ) * mod )
				)
			};

		},

		_generatePosition: function( event, constrainPosition ) {

			var containment, co, top, left,
				o = this.options,
				scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] ),
				pageX = event.pageX,
				pageY = event.pageY;

			// Cache the scroll
			if ( !scrollIsRootNode || !this.offset.scroll ) {
				this.offset.scroll = {
					top: this.scrollParent.scrollTop(),
					left: this.scrollParent.scrollLeft()
				};
			}

			/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

			// If we are not dragging yet, we won't check for options
			if ( constrainPosition ) {
				if ( this.containment ) {
					if ( this.relativeContainer ) {
						co = this.relativeContainer.offset();
						containment = [
							this.containment[ 0 ] + co.left,
							this.containment[ 1 ] + co.top,
							this.containment[ 2 ] + co.left,
							this.containment[ 3 ] + co.top
						];
					} else {
						containment = this.containment;
					}

					if ( event.pageX - this.offset.click.left < containment[ 0 ] ) {
						pageX = containment[ 0 ] + this.offset.click.left;
					}
					if ( event.pageY - this.offset.click.top < containment[ 1 ] ) {
						pageY = containment[ 1 ] + this.offset.click.top;
					}
					if ( event.pageX - this.offset.click.left > containment[ 2 ] ) {
						pageX = containment[ 2 ] + this.offset.click.left;
					}
					if ( event.pageY - this.offset.click.top > containment[ 3 ] ) {
						pageY = containment[ 3 ] + this.offset.click.top;
					}
				}

				if ( o.grid ) {

					//Check for grid elements set to 0 to prevent divide by 0 error causing invalid
					// argument errors in IE (see ticket #6950)
					top = o.grid[ 1 ] ? this.originalPageY + Math.round( ( pageY -
						this.originalPageY ) / o.grid[ 1 ] ) * o.grid[ 1 ] : this.originalPageY;
					pageY = containment ? ( ( top - this.offset.click.top >= containment[ 1 ] ||
						top - this.offset.click.top > containment[ 3 ] ) ?
						top :
						( ( top - this.offset.click.top >= containment[ 1 ] ) ?
							top - o.grid[ 1 ] : top + o.grid[ 1 ] ) ) : top;

					left = o.grid[ 0 ] ? this.originalPageX +
						Math.round( ( pageX - this.originalPageX ) / o.grid[ 0 ] ) * o.grid[ 0 ] :
						this.originalPageX;
					pageX = containment ? ( ( left - this.offset.click.left >= containment[ 0 ] ||
						left - this.offset.click.left > containment[ 2 ] ) ?
						left :
						( ( left - this.offset.click.left >= containment[ 0 ] ) ?
							left - o.grid[ 0 ] : left + o.grid[ 0 ] ) ) : left;
				}

				if ( o.axis === "y" ) {
					pageX = this.originalPageX;
				}

				if ( o.axis === "x" ) {
					pageY = this.originalPageY;
				}
			}

			return {
				top: (

					// The absolute mouse position
					pageY -

					// Click offset (relative to the element)
					this.offset.click.top -

					// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.relative.top -

					// The offsetParent's offset without borders (offset + border)
					this.offset.parent.top +
					( this.cssPosition === "fixed" ?
						-this.offset.scroll.top :
						( scrollIsRootNode ? 0 : this.offset.scroll.top ) )
				),
				left: (

					// The absolute mouse position
					pageX -

					// Click offset (relative to the element)
					this.offset.click.left -

					// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.relative.left -

					// The offsetParent's offset without borders (offset + border)
					this.offset.parent.left +
					( this.cssPosition === "fixed" ?
						-this.offset.scroll.left :
						( scrollIsRootNode ? 0 : this.offset.scroll.left ) )
				)
			};

		},

		_clear: function() {
			this._removeClass( this.helper, "ui-draggable-dragging" );
			if ( this.helper[ 0 ] !== this.element[ 0 ] && !this.cancelHelperRemoval ) {
				this.helper.remove();
			}
			this.helper = null;
			this.cancelHelperRemoval = false;
			if ( this.destroyOnClear ) {
				this.destroy();
			}
		},

		// From now on bulk stuff - mainly helpers

		_trigger: function( type, event, ui ) {
			ui = ui || this._uiHash();
			$.ui.plugin.call( this, type, [ event, ui, this ], true );

			// Absolute position and offset (see #6884 ) have to be recalculated after plugins
			if ( /^(drag|start|stop)/.test( type ) ) {
				this.positionAbs = this._convertPositionTo( "absolute" );
				ui.offset = this.positionAbs;
			}
			return $.Widget.prototype._trigger.call( this, type, event, ui );
		},

		plugins: {},

		_uiHash: function() {
			return {
				helper: this.helper,
				position: this.position,
				originalPosition: this.originalPosition,
				offset: this.positionAbs
			};
		}

	} );

	$.ui.plugin.add( "draggable", "connectToSortable", {
		start: function( event, ui, draggable ) {
			var uiSortable = $.extend( {}, ui, {
				item: draggable.element
			} );

			draggable.sortables = [];
			$( draggable.options.connectToSortable ).each( function() {
				var sortable = $( this ).sortable( "instance" );

				if ( sortable && !sortable.options.disabled ) {
					draggable.sortables.push( sortable );

					// RefreshPositions is called at drag start to refresh the containerCache
					// which is used in drag. This ensures it's initialized and synchronized
					// with any changes that might have happened on the page since initialization.
					sortable.refreshPositions();
					sortable._trigger( "activate", event, uiSortable );
				}
			} );
		},
		stop: function( event, ui, draggable ) {
			var uiSortable = $.extend( {}, ui, {
				item: draggable.element
			} );

			draggable.cancelHelperRemoval = false;

			$.each( draggable.sortables, function() {
				var sortable = this;

				if ( sortable.isOver ) {
					sortable.isOver = 0;

					// Allow this sortable to handle removing the helper
					draggable.cancelHelperRemoval = true;
					sortable.cancelHelperRemoval = false;

					// Use _storedCSS To restore properties in the sortable,
					// as this also handles revert (#9675) since the draggable
					// may have modified them in unexpected ways (#8809)
					sortable._storedCSS = {
						position: sortable.placeholder.css( "position" ),
						top: sortable.placeholder.css( "top" ),
						left: sortable.placeholder.css( "left" )
					};

					sortable._mouseStop( event );

					// Once drag has ended, the sortable should return to using
					// its original helper, not the shared helper from draggable
					sortable.options.helper = sortable.options._helper;
				} else {

					// Prevent this Sortable from removing the helper.
					// However, don't set the draggable to remove the helper
					// either as another connected Sortable may yet handle the removal.
					sortable.cancelHelperRemoval = true;

					sortable._trigger( "deactivate", event, uiSortable );
				}
			} );
		},
		drag: function( event, ui, draggable ) {
			$.each( draggable.sortables, function() {
				var innermostIntersecting = false,
					sortable = this;

				// Copy over variables that sortable's _intersectsWith uses
				sortable.positionAbs = draggable.positionAbs;
				sortable.helperProportions = draggable.helperProportions;
				sortable.offset.click = draggable.offset.click;

				if ( sortable._intersectsWith( sortable.containerCache ) ) {
					innermostIntersecting = true;

					$.each( draggable.sortables, function() {

						// Copy over variables that sortable's _intersectsWith uses
						this.positionAbs = draggable.positionAbs;
						this.helperProportions = draggable.helperProportions;
						this.offset.click = draggable.offset.click;

						if ( this !== sortable &&
							this._intersectsWith( this.containerCache ) &&
							$.contains( sortable.element[ 0 ], this.element[ 0 ] ) ) {
							innermostIntersecting = false;
						}

						return innermostIntersecting;
					} );
				}

				if ( innermostIntersecting ) {

					// If it intersects, we use a little isOver variable and set it once,
					// so that the move-in stuff gets fired only once.
					if ( !sortable.isOver ) {
						sortable.isOver = 1;

						// Store draggable's parent in case we need to reappend to it later.
						draggable._parent = ui.helper.parent();

						sortable.currentItem = ui.helper
						.appendTo( sortable.element )
						.data( "ui-sortable-item", true );

						// Store helper option to later restore it
						sortable.options._helper = sortable.options.helper;

						sortable.options.helper = function() {
							return ui.helper[ 0 ];
						};

						// Fire the start events of the sortable with our passed browser event,
						// and our own helper (so it doesn't create a new one)
						event.target = sortable.currentItem[ 0 ];
						sortable._mouseCapture( event, true );
						sortable._mouseStart( event, true, true );

						// Because the browser event is way off the new appended portlet,
						// modify necessary variables to reflect the changes
						sortable.offset.click.top = draggable.offset.click.top;
						sortable.offset.click.left = draggable.offset.click.left;
						sortable.offset.parent.left -= draggable.offset.parent.left -
							sortable.offset.parent.left;
						sortable.offset.parent.top -= draggable.offset.parent.top -
							sortable.offset.parent.top;

						draggable._trigger( "toSortable", event );

						// Inform draggable that the helper is in a valid drop zone,
						// used solely in the revert option to handle "valid/invalid".
						draggable.dropped = sortable.element;

						// Need to refreshPositions of all sortables in the case that
						// adding to one sortable changes the location of the other sortables (#9675)
						$.each( draggable.sortables, function() {
							this.refreshPositions();
						} );

						// Hack so receive/update callbacks work (mostly)
						draggable.currentItem = draggable.element;
						sortable.fromOutside = draggable;
					}

					if ( sortable.currentItem ) {
						sortable._mouseDrag( event );

						// Copy the sortable's position because the draggable's can potentially reflect
						// a relative position, while sortable is always absolute, which the dragged
						// element has now become. (#8809)
						ui.position = sortable.position;
					}
				} else {

					// If it doesn't intersect with the sortable, and it intersected before,
					// we fake the drag stop of the sortable, but make sure it doesn't remove
					// the helper by using cancelHelperRemoval.
					if ( sortable.isOver ) {

						sortable.isOver = 0;
						sortable.cancelHelperRemoval = true;

						// Calling sortable's mouseStop would trigger a revert,
						// so revert must be temporarily false until after mouseStop is called.
						sortable.options._revert = sortable.options.revert;
						sortable.options.revert = false;

						sortable._trigger( "out", event, sortable._uiHash( sortable ) );
						sortable._mouseStop( event, true );

						// Restore sortable behaviors that were modfied
						// when the draggable entered the sortable area (#9481)
						sortable.options.revert = sortable.options._revert;
						sortable.options.helper = sortable.options._helper;

						if ( sortable.placeholder ) {
							sortable.placeholder.remove();
						}

						// Restore and recalculate the draggable's offset considering the sortable
						// may have modified them in unexpected ways. (#8809, #10669)
						ui.helper.appendTo( draggable._parent );
						draggable._refreshOffsets( event );
						ui.position = draggable._generatePosition( event, true );

						draggable._trigger( "fromSortable", event );

						// Inform draggable that the helper is no longer in a valid drop zone
						draggable.dropped = false;

						// Need to refreshPositions of all sortables just in case removing
						// from one sortable changes the location of other sortables (#9675)
						$.each( draggable.sortables, function() {
							this.refreshPositions();
						} );
					}
				}
			} );
		}
	} );

	$.ui.plugin.add( "draggable", "cursor", {
		start: function( event, ui, instance ) {
			var t = $( "body" ),
				o = instance.options;

			if ( t.css( "cursor" ) ) {
				o._cursor = t.css( "cursor" );
			}
			t.css( "cursor", o.cursor );
		},
		stop: function( event, ui, instance ) {
			var o = instance.options;
			if ( o._cursor ) {
				$( "body" ).css( "cursor", o._cursor );
			}
		}
	} );

	$.ui.plugin.add( "draggable", "opacity", {
		start: function( event, ui, instance ) {
			var t = $( ui.helper ),
				o = instance.options;
			if ( t.css( "opacity" ) ) {
				o._opacity = t.css( "opacity" );
			}
			t.css( "opacity", o.opacity );
		},
		stop: function( event, ui, instance ) {
			var o = instance.options;
			if ( o._opacity ) {
				$( ui.helper ).css( "opacity", o._opacity );
			}
		}
	} );

	$.ui.plugin.add( "draggable", "scroll", {
		start: function( event, ui, i ) {
			if ( !i.scrollParentNotHidden ) {
				i.scrollParentNotHidden = i.helper.scrollParent( false );
			}

			if ( i.scrollParentNotHidden[ 0 ] !== i.document[ 0 ] &&
				i.scrollParentNotHidden[ 0 ].tagName !== "HTML" ) {
				i.overflowOffset = i.scrollParentNotHidden.offset();
			}
		},
		drag: function( event, ui, i  ) {

			var o = i.options,
				scrolled = false,
				scrollParent = i.scrollParentNotHidden[ 0 ],
				document = i.document[ 0 ];

			if ( scrollParent !== document && scrollParent.tagName !== "HTML" ) {
				if ( !o.axis || o.axis !== "x" ) {
					if ( ( i.overflowOffset.top + scrollParent.offsetHeight ) - event.pageY <
						o.scrollSensitivity ) {
						scrollParent.scrollTop = scrolled = scrollParent.scrollTop + o.scrollSpeed;
					} else if ( event.pageY - i.overflowOffset.top < o.scrollSensitivity ) {
						scrollParent.scrollTop = scrolled = scrollParent.scrollTop - o.scrollSpeed;
					}
				}

				if ( !o.axis || o.axis !== "y" ) {
					if ( ( i.overflowOffset.left + scrollParent.offsetWidth ) - event.pageX <
						o.scrollSensitivity ) {
						scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft + o.scrollSpeed;
					} else if ( event.pageX - i.overflowOffset.left < o.scrollSensitivity ) {
						scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft - o.scrollSpeed;
					}
				}

			} else {

				if ( !o.axis || o.axis !== "x" ) {
					if ( event.pageY - $( document ).scrollTop() < o.scrollSensitivity ) {
						scrolled = $( document ).scrollTop( $( document ).scrollTop() - o.scrollSpeed );
					} else if ( $( window ).height() - ( event.pageY - $( document ).scrollTop() ) <
						o.scrollSensitivity ) {
						scrolled = $( document ).scrollTop( $( document ).scrollTop() + o.scrollSpeed );
					}
				}

				if ( !o.axis || o.axis !== "y" ) {
					if ( event.pageX - $( document ).scrollLeft() < o.scrollSensitivity ) {
						scrolled = $( document ).scrollLeft(
							$( document ).scrollLeft() - o.scrollSpeed
						);
					} else if ( $( window ).width() - ( event.pageX - $( document ).scrollLeft() ) <
						o.scrollSensitivity ) {
						scrolled = $( document ).scrollLeft(
							$( document ).scrollLeft() + o.scrollSpeed
						);
					}
				}

			}

			if ( scrolled !== false && $.ui.ddmanager && !o.dropBehaviour ) {
				$.ui.ddmanager.prepareOffsets( i, event );
			}

		}
	} );

	$.ui.plugin.add( "draggable", "snap", {
		start: function( event, ui, i ) {

			var o = i.options;

			i.snapElements = [];

			$( o.snap.constructor !== String ? ( o.snap.items || ":data(ui-draggable)" ) : o.snap )
			.each( function() {
				var $t = $( this ),
					$o = $t.offset();
				if ( this !== i.element[ 0 ] ) {
					i.snapElements.push( {
						item: this,
						width: $t.outerWidth(), height: $t.outerHeight(),
						top: $o.top, left: $o.left
					} );
				}
			} );

		},
		drag: function( event, ui, inst ) {

			var ts, bs, ls, rs, l, r, t, b, i, first,
				o = inst.options,
				d = o.snapTolerance,
				x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width,
				y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;

			for ( i = inst.snapElements.length - 1; i >= 0; i-- ) {

				l = inst.snapElements[ i ].left - inst.margins.left;
				r = l + inst.snapElements[ i ].width;
				t = inst.snapElements[ i ].top - inst.margins.top;
				b = t + inst.snapElements[ i ].height;

				if ( x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d ||
					!$.contains( inst.snapElements[ i ].item.ownerDocument,
						inst.snapElements[ i ].item ) ) {
					if ( inst.snapElements[ i ].snapping ) {
						if ( inst.options.snap.release ) {
							inst.options.snap.release.call(
								inst.element,
								event,
								$.extend( inst._uiHash(), { snapItem: inst.snapElements[ i ].item } )
							);
						}
					}
					inst.snapElements[ i ].snapping = false;
					continue;
				}

				if ( o.snapMode !== "inner" ) {
					ts = Math.abs( t - y2 ) <= d;
					bs = Math.abs( b - y1 ) <= d;
					ls = Math.abs( l - x2 ) <= d;
					rs = Math.abs( r - x1 ) <= d;
					if ( ts ) {
						ui.position.top = inst._convertPositionTo( "relative", {
							top: t - inst.helperProportions.height,
							left: 0
						} ).top;
					}
					if ( bs ) {
						ui.position.top = inst._convertPositionTo( "relative", {
							top: b,
							left: 0
						} ).top;
					}
					if ( ls ) {
						ui.position.left = inst._convertPositionTo( "relative", {
							top: 0,
							left: l - inst.helperProportions.width
						} ).left;
					}
					if ( rs ) {
						ui.position.left = inst._convertPositionTo( "relative", {
							top: 0,
							left: r
						} ).left;
					}
				}

				first = ( ts || bs || ls || rs );

				if ( o.snapMode !== "outer" ) {
					ts = Math.abs( t - y1 ) <= d;
					bs = Math.abs( b - y2 ) <= d;
					ls = Math.abs( l - x1 ) <= d;
					rs = Math.abs( r - x2 ) <= d;
					if ( ts ) {
						ui.position.top = inst._convertPositionTo( "relative", {
							top: t,
							left: 0
						} ).top;
					}
					if ( bs ) {
						ui.position.top = inst._convertPositionTo( "relative", {
							top: b - inst.helperProportions.height,
							left: 0
						} ).top;
					}
					if ( ls ) {
						ui.position.left = inst._convertPositionTo( "relative", {
							top: 0,
							left: l
						} ).left;
					}
					if ( rs ) {
						ui.position.left = inst._convertPositionTo( "relative", {
							top: 0,
							left: r - inst.helperProportions.width
						} ).left;
					}
				}

				if ( !inst.snapElements[ i ].snapping && ( ts || bs || ls || rs || first ) ) {
					if ( inst.options.snap.snap ) {
						inst.options.snap.snap.call(
							inst.element,
							event,
							$.extend( inst._uiHash(), {
								snapItem: inst.snapElements[ i ].item
							} ) );
					}
				}
				inst.snapElements[ i ].snapping = ( ts || bs || ls || rs || first );

			}

		}
	} );

	$.ui.plugin.add( "draggable", "stack", {
		start: function( event, ui, instance ) {
			var min,
				o = instance.options,
				group = $.makeArray( $( o.stack ) ).sort( function( a, b ) {
					return ( parseInt( $( a ).css( "zIndex" ), 10 ) || 0 ) -
						( parseInt( $( b ).css( "zIndex" ), 10 ) || 0 );
				} );

			if ( !group.length ) {
				return;
			}

			min = parseInt( $( group[ 0 ] ).css( "zIndex" ), 10 ) || 0;
			$( group ).each( function( i ) {
				$( this ).css( "zIndex", min + i );
			} );
			this.css( "zIndex", ( min + group.length ) );
		}
	} );

	$.ui.plugin.add( "draggable", "zIndex", {
		start: function( event, ui, instance ) {
			var t = $( ui.helper ),
				o = instance.options;

			if ( t.css( "zIndex" ) ) {
				o._zIndex = t.css( "zIndex" );
			}
			t.css( "zIndex", o.zIndex );
		},
		stop: function( event, ui, instance ) {
			var o = instance.options;

			if ( o._zIndex ) {
				$( ui.helper ).css( "zIndex", o._zIndex );
			}
		}
	} );

	var widgetsDraggable = $.ui.draggable;


	/*!
 * jQuery UI Resizable 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Resizable
//>>group: Interactions
//>>description: Enables resize functionality for any element.
//>>docs: http://api.jqueryui.com/resizable/
//>>demos: http://jqueryui.com/resizable/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/resizable.css
//>>css.theme: ../../themes/base/theme.css


	$.widget( "ui.resizable", $.ui.mouse, {
		version: "1.13.0",
		widgetEventPrefix: "resize",
		options: {
			alsoResize: false,
			animate: false,
			animateDuration: "slow",
			animateEasing: "swing",
			aspectRatio: false,
			autoHide: false,
			classes: {
				"ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
			},
			containment: false,
			ghost: false,
			grid: false,
			handles: "e,s,se",
			helper: false,
			maxHeight: null,
			maxWidth: null,
			minHeight: 10,
			minWidth: 10,

			// See #7960
			zIndex: 90,

			// Callbacks
			resize: null,
			start: null,
			stop: null
		},

		_num: function( value ) {
			return parseFloat( value ) || 0;
		},

		_isNumber: function( value ) {
			return !isNaN( parseFloat( value ) );
		},

		_hasScroll: function( el, a ) {

			if ( $( el ).css( "overflow" ) === "hidden" ) {
				return false;
			}

			var scroll = ( a && a === "left" ) ? "scrollLeft" : "scrollTop",
				has = false;

			if ( el[ scroll ] > 0 ) {
				return true;
			}

			// TODO: determine which cases actually cause this to happen
			// if the element doesn't have the scroll set, see if it's possible to
			// set the scroll
			try {
				el[ scroll ] = 1;
				has = ( el[ scroll ] > 0 );
				el[ scroll ] = 0;
			} catch ( e ) {

				// `el` might be a string, then setting `scroll` will throw
				// an error in strict mode; ignore it.
			}
			return has;
		},

		_create: function() {

			var margins,
				o = this.options,
				that = this;
			this._addClass( "ui-resizable" );

			$.extend( this, {
				_aspectRatio: !!( o.aspectRatio ),
				aspectRatio: o.aspectRatio,
				originalElement: this.element,
				_proportionallyResizeElements: [],
				_helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : null
			} );

			// Wrap the element if it cannot hold child nodes
			if ( this.element[ 0 ].nodeName.match( /^(canvas|textarea|input|select|button|img)$/i ) ) {

				this.element.wrap(
					$( "<div class='ui-wrapper'></div>" ).css( {
						overflow: "hidden",
						position: this.element.css( "position" ),
						width: this.element.outerWidth(),
						height: this.element.outerHeight(),
						top: this.element.css( "top" ),
						left: this.element.css( "left" )
					} )
				);

				this.element = this.element.parent().data(
					"ui-resizable", this.element.resizable( "instance" )
				);

				this.elementIsWrapper = true;

				margins = {
					marginTop: this.originalElement.css( "marginTop" ),
					marginRight: this.originalElement.css( "marginRight" ),
					marginBottom: this.originalElement.css( "marginBottom" ),
					marginLeft: this.originalElement.css( "marginLeft" )
				};

				this.element.css( margins );
				this.originalElement.css( "margin", 0 );

				// support: Safari
				// Prevent Safari textarea resize
				this.originalResizeStyle = this.originalElement.css( "resize" );
				this.originalElement.css( "resize", "none" );

				this._proportionallyResizeElements.push( this.originalElement.css( {
					position: "static",
					zoom: 1,
					display: "block"
				} ) );

				// Support: IE9
				// avoid IE jump (hard set the margin)
				this.originalElement.css( margins );

				this._proportionallyResize();
			}

			this._setupHandles();

			if ( o.autoHide ) {
				$( this.element )
				.on( "mouseenter", function() {
					if ( o.disabled ) {
						return;
					}
					that._removeClass( "ui-resizable-autohide" );
					that._handles.show();
				} )
				.on( "mouseleave", function() {
					if ( o.disabled ) {
						return;
					}
					if ( !that.resizing ) {
						that._addClass( "ui-resizable-autohide" );
						that._handles.hide();
					}
				} );
			}

			this._mouseInit();
		},

		_destroy: function() {

			this._mouseDestroy();
			this._addedHandles.remove();

			var wrapper,
				_destroy = function( exp ) {
					$( exp )
					.removeData( "resizable" )
					.removeData( "ui-resizable" )
					.off( ".resizable" );
				};

			// TODO: Unwrap at same DOM position
			if ( this.elementIsWrapper ) {
				_destroy( this.element );
				wrapper = this.element;
				this.originalElement.css( {
					position: wrapper.css( "position" ),
					width: wrapper.outerWidth(),
					height: wrapper.outerHeight(),
					top: wrapper.css( "top" ),
					left: wrapper.css( "left" )
				} ).insertAfter( wrapper );
				wrapper.remove();
			}

			this.originalElement.css( "resize", this.originalResizeStyle );
			_destroy( this.originalElement );

			return this;
		},

		_setOption: function( key, value ) {
			this._super( key, value );

			switch ( key ) {
				case "handles":
					this._removeHandles();
					this._setupHandles();
					break;
				case "aspectRatio":
					this._aspectRatio = !!value;
					break;
				default:
					break;
			}
		},

		_setupHandles: function() {
			var o = this.options, handle, i, n, hname, axis, that = this;
			this.handles = o.handles ||
				( !$( ".ui-resizable-handle", this.element ).length ?
					"e,s,se" : {
						n: ".ui-resizable-n",
						e: ".ui-resizable-e",
						s: ".ui-resizable-s",
						w: ".ui-resizable-w",
						se: ".ui-resizable-se",
						sw: ".ui-resizable-sw",
						ne: ".ui-resizable-ne",
						nw: ".ui-resizable-nw"
					} );

			this._handles = $();
			this._addedHandles = $();
			if ( this.handles.constructor === String ) {

				if ( this.handles === "all" ) {
					this.handles = "n,e,s,w,se,sw,ne,nw";
				}

				n = this.handles.split( "," );
				this.handles = {};

				for ( i = 0; i < n.length; i++ ) {

					handle = String.prototype.trim.call( n[ i ] );
					hname = "ui-resizable-" + handle;
					axis = $( "<div>" );
					this._addClass( axis, "ui-resizable-handle " + hname );

					axis.css( { zIndex: o.zIndex } );

					this.handles[ handle ] = ".ui-resizable-" + handle;
					if ( !this.element.children( this.handles[ handle ] ).length ) {
						this.element.append( axis );
						this._addedHandles = this._addedHandles.add( axis );
					}
				}

			}

			this._renderAxis = function( target ) {

				var i, axis, padPos, padWrapper;

				target = target || this.element;

				for ( i in this.handles ) {

					if ( this.handles[ i ].constructor === String ) {
						this.handles[ i ] = this.element.children( this.handles[ i ] ).first().show();
					} else if ( this.handles[ i ].jquery || this.handles[ i ].nodeType ) {
						this.handles[ i ] = $( this.handles[ i ] );
						this._on( this.handles[ i ], { "mousedown": that._mouseDown } );
					}

					if ( this.elementIsWrapper &&
						this.originalElement[ 0 ]
						.nodeName
						.match( /^(textarea|input|select|button)$/i ) ) {
						axis = $( this.handles[ i ], this.element );

						padWrapper = /sw|ne|nw|se|n|s/.test( i ) ?
							axis.outerHeight() :
							axis.outerWidth();

						padPos = [ "padding",
							/ne|nw|n/.test( i ) ? "Top" :
								/se|sw|s/.test( i ) ? "Bottom" :
									/^e$/.test( i ) ? "Right" : "Left" ].join( "" );

						target.css( padPos, padWrapper );

						this._proportionallyResize();
					}

					this._handles = this._handles.add( this.handles[ i ] );
				}
			};

			// TODO: make renderAxis a prototype function
			this._renderAxis( this.element );

			this._handles = this._handles.add( this.element.find( ".ui-resizable-handle" ) );
			this._handles.disableSelection();

			this._handles.on( "mouseover", function() {
				if ( !that.resizing ) {
					if ( this.className ) {
						axis = this.className.match( /ui-resizable-(se|sw|ne|nw|n|e|s|w)/i );
					}
					that.axis = axis && axis[ 1 ] ? axis[ 1 ] : "se";
				}
			} );

			if ( o.autoHide ) {
				this._handles.hide();
				this._addClass( "ui-resizable-autohide" );
			}
		},

		_removeHandles: function() {
			this._addedHandles.remove();
		},

		_mouseCapture: function( event ) {
			var i, handle,
				capture = false;

			for ( i in this.handles ) {
				handle = $( this.handles[ i ] )[ 0 ];
				if ( handle === event.target || $.contains( handle, event.target ) ) {
					capture = true;
				}
			}

			return !this.options.disabled && capture;
		},

		_mouseStart: function( event ) {

			var curleft, curtop, cursor,
				o = this.options,
				el = this.element;

			this.resizing = true;

			this._renderProxy();

			curleft = this._num( this.helper.css( "left" ) );
			curtop = this._num( this.helper.css( "top" ) );

			if ( o.containment ) {
				curleft += $( o.containment ).scrollLeft() || 0;
				curtop += $( o.containment ).scrollTop() || 0;
			}

			this.offset = this.helper.offset();
			this.position = { left: curleft, top: curtop };

			this.size = this._helper ? {
				width: this.helper.width(),
				height: this.helper.height()
			} : {
				width: el.width(),
				height: el.height()
			};

			this.originalSize = this._helper ? {
				width: el.outerWidth(),
				height: el.outerHeight()
			} : {
				width: el.width(),
				height: el.height()
			};

			this.sizeDiff = {
				width: el.outerWidth() - el.width(),
				height: el.outerHeight() - el.height()
			};

			this.originalPosition = { left: curleft, top: curtop };
			this.originalMousePosition = { left: event.pageX, top: event.pageY };

			this.aspectRatio = ( typeof o.aspectRatio === "number" ) ?
				o.aspectRatio :
				( ( this.originalSize.width / this.originalSize.height ) || 1 );

			cursor = $( ".ui-resizable-" + this.axis ).css( "cursor" );
			$( "body" ).css( "cursor", cursor === "auto" ? this.axis + "-resize" : cursor );

			this._addClass( "ui-resizable-resizing" );
			this._propagate( "start", event );
			return true;
		},

		_mouseDrag: function( event ) {

			var data, props,
				smp = this.originalMousePosition,
				a = this.axis,
				dx = ( event.pageX - smp.left ) || 0,
				dy = ( event.pageY - smp.top ) || 0,
				trigger = this._change[ a ];

			this._updatePrevProperties();

			if ( !trigger ) {
				return false;
			}

			data = trigger.apply( this, [ event, dx, dy ] );

			this._updateVirtualBoundaries( event.shiftKey );
			if ( this._aspectRatio || event.shiftKey ) {
				data = this._updateRatio( data, event );
			}

			data = this._respectSize( data, event );

			this._updateCache( data );

			this._propagate( "resize", event );

			props = this._applyChanges();

			if ( !this._helper && this._proportionallyResizeElements.length ) {
				this._proportionallyResize();
			}

			if ( !$.isEmptyObject( props ) ) {
				this._updatePrevProperties();
				this._trigger( "resize", event, this.ui() );
				this._applyChanges();
			}

			return false;
		},

		_mouseStop: function( event ) {

			this.resizing = false;
			var pr, ista, soffseth, soffsetw, s, left, top,
				o = this.options, that = this;

			if ( this._helper ) {

				pr = this._proportionallyResizeElements;
				ista = pr.length && ( /textarea/i ).test( pr[ 0 ].nodeName );
				soffseth = ista && this._hasScroll( pr[ 0 ], "left" ) ? 0 : that.sizeDiff.height;
				soffsetw = ista ? 0 : that.sizeDiff.width;

				s = {
					width: ( that.helper.width()  - soffsetw ),
					height: ( that.helper.height() - soffseth )
				};
				left = ( parseFloat( that.element.css( "left" ) ) +
					( that.position.left - that.originalPosition.left ) ) || null;
				top = ( parseFloat( that.element.css( "top" ) ) +
					( that.position.top - that.originalPosition.top ) ) || null;

				if ( !o.animate ) {
					this.element.css( $.extend( s, { top: top, left: left } ) );
				}

				that.helper.height( that.size.height );
				that.helper.width( that.size.width );

				if ( this._helper && !o.animate ) {
					this._proportionallyResize();
				}
			}

			$( "body" ).css( "cursor", "auto" );

			this._removeClass( "ui-resizable-resizing" );

			this._propagate( "stop", event );

			if ( this._helper ) {
				this.helper.remove();
			}

			return false;

		},

		_updatePrevProperties: function() {
			this.prevPosition = {
				top: this.position.top,
				left: this.position.left
			};
			this.prevSize = {
				width: this.size.width,
				height: this.size.height
			};
		},

		_applyChanges: function() {
			var props = {};

			if ( this.position.top !== this.prevPosition.top ) {
				props.top = this.position.top + "px";
			}
			if ( this.position.left !== this.prevPosition.left ) {
				props.left = this.position.left + "px";
			}
			if ( this.size.width !== this.prevSize.width ) {
				props.width = this.size.width + "px";
			}
			if ( this.size.height !== this.prevSize.height ) {
				props.height = this.size.height + "px";
			}

			this.helper.css( props );

			return props;
		},

		_updateVirtualBoundaries: function( forceAspectRatio ) {
			var pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b,
				o = this.options;

			b = {
				minWidth: this._isNumber( o.minWidth ) ? o.minWidth : 0,
				maxWidth: this._isNumber( o.maxWidth ) ? o.maxWidth : Infinity,
				minHeight: this._isNumber( o.minHeight ) ? o.minHeight : 0,
				maxHeight: this._isNumber( o.maxHeight ) ? o.maxHeight : Infinity
			};

			if ( this._aspectRatio || forceAspectRatio ) {
				pMinWidth = b.minHeight * this.aspectRatio;
				pMinHeight = b.minWidth / this.aspectRatio;
				pMaxWidth = b.maxHeight * this.aspectRatio;
				pMaxHeight = b.maxWidth / this.aspectRatio;

				if ( pMinWidth > b.minWidth ) {
					b.minWidth = pMinWidth;
				}
				if ( pMinHeight > b.minHeight ) {
					b.minHeight = pMinHeight;
				}
				if ( pMaxWidth < b.maxWidth ) {
					b.maxWidth = pMaxWidth;
				}
				if ( pMaxHeight < b.maxHeight ) {
					b.maxHeight = pMaxHeight;
				}
			}
			this._vBoundaries = b;
		},

		_updateCache: function( data ) {
			this.offset = this.helper.offset();
			if ( this._isNumber( data.left ) ) {
				this.position.left = data.left;
			}
			if ( this._isNumber( data.top ) ) {
				this.position.top = data.top;
			}
			if ( this._isNumber( data.height ) ) {
				this.size.height = data.height;
			}
			if ( this._isNumber( data.width ) ) {
				this.size.width = data.width;
			}
		},

		_updateRatio: function( data ) {

			var cpos = this.position,
				csize = this.size,
				a = this.axis;

			if ( this._isNumber( data.height ) ) {
				data.width = ( data.height * this.aspectRatio );
			} else if ( this._isNumber( data.width ) ) {
				data.height = ( data.width / this.aspectRatio );
			}

			if ( a === "sw" ) {
				data.left = cpos.left + ( csize.width - data.width );
				data.top = null;
			}
			if ( a === "nw" ) {
				data.top = cpos.top + ( csize.height - data.height );
				data.left = cpos.left + ( csize.width - data.width );
			}

			return data;
		},

		_respectSize: function( data ) {

			var o = this._vBoundaries,
				a = this.axis,
				ismaxw = this._isNumber( data.width ) && o.maxWidth && ( o.maxWidth < data.width ),
				ismaxh = this._isNumber( data.height ) && o.maxHeight && ( o.maxHeight < data.height ),
				isminw = this._isNumber( data.width ) && o.minWidth && ( o.minWidth > data.width ),
				isminh = this._isNumber( data.height ) && o.minHeight && ( o.minHeight > data.height ),
				dw = this.originalPosition.left + this.originalSize.width,
				dh = this.originalPosition.top + this.originalSize.height,
				cw = /sw|nw|w/.test( a ), ch = /nw|ne|n/.test( a );
			if ( isminw ) {
				data.width = o.minWidth;
			}
			if ( isminh ) {
				data.height = o.minHeight;
			}
			if ( ismaxw ) {
				data.width = o.maxWidth;
			}
			if ( ismaxh ) {
				data.height = o.maxHeight;
			}

			if ( isminw && cw ) {
				data.left = dw - o.minWidth;
			}
			if ( ismaxw && cw ) {
				data.left = dw - o.maxWidth;
			}
			if ( isminh && ch ) {
				data.top = dh - o.minHeight;
			}
			if ( ismaxh && ch ) {
				data.top = dh - o.maxHeight;
			}

			// Fixing jump error on top/left - bug #2330
			if ( !data.width && !data.height && !data.left && data.top ) {
				data.top = null;
			} else if ( !data.width && !data.height && !data.top && data.left ) {
				data.left = null;
			}

			return data;
		},

		_getPaddingPlusBorderDimensions: function( element ) {
			var i = 0,
				widths = [],
				borders = [
					element.css( "borderTopWidth" ),
					element.css( "borderRightWidth" ),
					element.css( "borderBottomWidth" ),
					element.css( "borderLeftWidth" )
				],
				paddings = [
					element.css( "paddingTop" ),
					element.css( "paddingRight" ),
					element.css( "paddingBottom" ),
					element.css( "paddingLeft" )
				];

			for ( ; i < 4; i++ ) {
				widths[ i ] = ( parseFloat( borders[ i ] ) || 0 );
				widths[ i ] += ( parseFloat( paddings[ i ] ) || 0 );
			}

			return {
				height: widths[ 0 ] + widths[ 2 ],
				width: widths[ 1 ] + widths[ 3 ]
			};
		},

		_proportionallyResize: function() {

			if ( !this._proportionallyResizeElements.length ) {
				return;
			}

			var prel,
				i = 0,
				element = this.helper || this.element;

			for ( ; i < this._proportionallyResizeElements.length; i++ ) {

				prel = this._proportionallyResizeElements[ i ];

				// TODO: Seems like a bug to cache this.outerDimensions
				// considering that we are in a loop.
				if ( !this.outerDimensions ) {
					this.outerDimensions = this._getPaddingPlusBorderDimensions( prel );
				}

				prel.css( {
					height: ( element.height() - this.outerDimensions.height ) || 0,
					width: ( element.width() - this.outerDimensions.width ) || 0
				} );

			}

		},

		_renderProxy: function() {

			var el = this.element, o = this.options;
			this.elementOffset = el.offset();

			if ( this._helper ) {

				this.helper = this.helper || $( "<div></div>" ).css( { overflow: "hidden" } );

				this._addClass( this.helper, this._helper );
				this.helper.css( {
					width: this.element.outerWidth(),
					height: this.element.outerHeight(),
					position: "absolute",
					left: this.elementOffset.left + "px",
					top: this.elementOffset.top + "px",
					zIndex: ++o.zIndex //TODO: Don't modify option
				} );

				this.helper
				.appendTo( "body" )
				.disableSelection();

			} else {
				this.helper = this.element;
			}

		},

		_change: {
			e: function( event, dx ) {
				return { width: this.originalSize.width + dx };
			},
			w: function( event, dx ) {
				var cs = this.originalSize, sp = this.originalPosition;
				return { left: sp.left + dx, width: cs.width - dx };
			},
			n: function( event, dx, dy ) {
				var cs = this.originalSize, sp = this.originalPosition;
				return { top: sp.top + dy, height: cs.height - dy };
			},
			s: function( event, dx, dy ) {
				return { height: this.originalSize.height + dy };
			},
			se: function( event, dx, dy ) {
				return $.extend( this._change.s.apply( this, arguments ),
					this._change.e.apply( this, [ event, dx, dy ] ) );
			},
			sw: function( event, dx, dy ) {
				return $.extend( this._change.s.apply( this, arguments ),
					this._change.w.apply( this, [ event, dx, dy ] ) );
			},
			ne: function( event, dx, dy ) {
				return $.extend( this._change.n.apply( this, arguments ),
					this._change.e.apply( this, [ event, dx, dy ] ) );
			},
			nw: function( event, dx, dy ) {
				return $.extend( this._change.n.apply( this, arguments ),
					this._change.w.apply( this, [ event, dx, dy ] ) );
			}
		},

		_propagate: function( n, event ) {
			$.ui.plugin.call( this, n, [ event, this.ui() ] );
			if ( n !== "resize" ) {
				this._trigger( n, event, this.ui() );
			}
		},

		plugins: {},

		ui: function() {
			return {
				originalElement: this.originalElement,
				element: this.element,
				helper: this.helper,
				position: this.position,
				size: this.size,
				originalSize: this.originalSize,
				originalPosition: this.originalPosition
			};
		}

	} );

	/*
 * Resizable Extensions
 */

	$.ui.plugin.add( "resizable", "animate", {

		stop: function( event ) {
			var that = $( this ).resizable( "instance" ),
				o = that.options,
				pr = that._proportionallyResizeElements,
				ista = pr.length && ( /textarea/i ).test( pr[ 0 ].nodeName ),
				soffseth = ista && that._hasScroll( pr[ 0 ], "left" ) ? 0 : that.sizeDiff.height,
				soffsetw = ista ? 0 : that.sizeDiff.width,
				style = {
					width: ( that.size.width - soffsetw ),
					height: ( that.size.height - soffseth )
				},
				left = ( parseFloat( that.element.css( "left" ) ) +
					( that.position.left - that.originalPosition.left ) ) || null,
				top = ( parseFloat( that.element.css( "top" ) ) +
					( that.position.top - that.originalPosition.top ) ) || null;

			that.element.animate(
				$.extend( style, top && left ? { top: top, left: left } : {} ), {
					duration: o.animateDuration,
					easing: o.animateEasing,
					step: function() {

						var data = {
							width: parseFloat( that.element.css( "width" ) ),
							height: parseFloat( that.element.css( "height" ) ),
							top: parseFloat( that.element.css( "top" ) ),
							left: parseFloat( that.element.css( "left" ) )
						};

						if ( pr && pr.length ) {
							$( pr[ 0 ] ).css( { width: data.width, height: data.height } );
						}

						// Propagating resize, and updating values for each animation step
						that._updateCache( data );
						that._propagate( "resize", event );

					}
				}
			);
		}

	} );

	$.ui.plugin.add( "resizable", "containment", {

		start: function() {
			var element, p, co, ch, cw, width, height,
				that = $( this ).resizable( "instance" ),
				o = that.options,
				el = that.element,
				oc = o.containment,
				ce = ( oc instanceof $ ) ?
					oc.get( 0 ) :
					( /parent/.test( oc ) ) ? el.parent().get( 0 ) : oc;

			if ( !ce ) {
				return;
			}

			that.containerElement = $( ce );

			if ( /document/.test( oc ) || oc === document ) {
				that.containerOffset = {
					left: 0,
					top: 0
				};
				that.containerPosition = {
					left: 0,
					top: 0
				};

				that.parentData = {
					element: $( document ),
					left: 0,
					top: 0,
					width: $( document ).width(),
					height: $( document ).height() || document.body.parentNode.scrollHeight
				};
			} else {
				element = $( ce );
				p = [];
				$( [ "Top", "Right", "Left", "Bottom" ] ).each( function( i, name ) {
					p[ i ] = that._num( element.css( "padding" + name ) );
				} );

				that.containerOffset = element.offset();
				that.containerPosition = element.position();
				that.containerSize = {
					height: ( element.innerHeight() - p[ 3 ] ),
					width: ( element.innerWidth() - p[ 1 ] )
				};

				co = that.containerOffset;
				ch = that.containerSize.height;
				cw = that.containerSize.width;
				width = ( that._hasScroll( ce, "left" ) ? ce.scrollWidth : cw );
				height = ( that._hasScroll( ce ) ? ce.scrollHeight : ch );

				that.parentData = {
					element: ce,
					left: co.left,
					top: co.top,
					width: width,
					height: height
				};
			}
		},

		resize: function( event ) {
			var woset, hoset, isParent, isOffsetRelative,
				that = $( this ).resizable( "instance" ),
				o = that.options,
				co = that.containerOffset,
				cp = that.position,
				pRatio = that._aspectRatio || event.shiftKey,
				cop = {
					top: 0,
					left: 0
				},
				ce = that.containerElement,
				continueResize = true;

			if ( ce[ 0 ] !== document && ( /static/ ).test( ce.css( "position" ) ) ) {
				cop = co;
			}

			if ( cp.left < ( that._helper ? co.left : 0 ) ) {
				that.size.width = that.size.width +
					( that._helper ?
						( that.position.left - co.left ) :
						( that.position.left - cop.left ) );

				if ( pRatio ) {
					that.size.height = that.size.width / that.aspectRatio;
					continueResize = false;
				}
				that.position.left = o.helper ? co.left : 0;
			}

			if ( cp.top < ( that._helper ? co.top : 0 ) ) {
				that.size.height = that.size.height +
					( that._helper ?
						( that.position.top - co.top ) :
						that.position.top );

				if ( pRatio ) {
					that.size.width = that.size.height * that.aspectRatio;
					continueResize = false;
				}
				that.position.top = that._helper ? co.top : 0;
			}

			isParent = that.containerElement.get( 0 ) === that.element.parent().get( 0 );
			isOffsetRelative = /relative|absolute/.test( that.containerElement.css( "position" ) );

			if ( isParent && isOffsetRelative ) {
				that.offset.left = that.parentData.left + that.position.left;
				that.offset.top = that.parentData.top + that.position.top;
			} else {
				that.offset.left = that.element.offset().left;
				that.offset.top = that.element.offset().top;
			}

			woset = Math.abs( that.sizeDiff.width +
				( that._helper ?
					that.offset.left - cop.left :
					( that.offset.left - co.left ) ) );

			hoset = Math.abs( that.sizeDiff.height +
				( that._helper ?
					that.offset.top - cop.top :
					( that.offset.top - co.top ) ) );

			if ( woset + that.size.width >= that.parentData.width ) {
				that.size.width = that.parentData.width - woset;
				if ( pRatio ) {
					that.size.height = that.size.width / that.aspectRatio;
					continueResize = false;
				}
			}

			if ( hoset + that.size.height >= that.parentData.height ) {
				that.size.height = that.parentData.height - hoset;
				if ( pRatio ) {
					that.size.width = that.size.height * that.aspectRatio;
					continueResize = false;
				}
			}

			if ( !continueResize ) {
				that.position.left = that.prevPosition.left;
				that.position.top = that.prevPosition.top;
				that.size.width = that.prevSize.width;
				that.size.height = that.prevSize.height;
			}
		},

		stop: function() {
			var that = $( this ).resizable( "instance" ),
				o = that.options,
				co = that.containerOffset,
				cop = that.containerPosition,
				ce = that.containerElement,
				helper = $( that.helper ),
				ho = helper.offset(),
				w = helper.outerWidth() - that.sizeDiff.width,
				h = helper.outerHeight() - that.sizeDiff.height;

			if ( that._helper && !o.animate && ( /relative/ ).test( ce.css( "position" ) ) ) {
				$( this ).css( {
					left: ho.left - cop.left - co.left,
					width: w,
					height: h
				} );
			}

			if ( that._helper && !o.animate && ( /static/ ).test( ce.css( "position" ) ) ) {
				$( this ).css( {
					left: ho.left - cop.left - co.left,
					width: w,
					height: h
				} );
			}
		}
	} );

	$.ui.plugin.add( "resizable", "alsoResize", {

		start: function() {
			var that = $( this ).resizable( "instance" ),
				o = that.options;

			$( o.alsoResize ).each( function() {
				var el = $( this );
				el.data( "ui-resizable-alsoresize", {
					width: parseFloat( el.width() ), height: parseFloat( el.height() ),
					left: parseFloat( el.css( "left" ) ), top: parseFloat( el.css( "top" ) )
				} );
			} );
		},

		resize: function( event, ui ) {
			var that = $( this ).resizable( "instance" ),
				o = that.options,
				os = that.originalSize,
				op = that.originalPosition,
				delta = {
					height: ( that.size.height - os.height ) || 0,
					width: ( that.size.width - os.width ) || 0,
					top: ( that.position.top - op.top ) || 0,
					left: ( that.position.left - op.left ) || 0
				};

			$( o.alsoResize ).each( function() {
				var el = $( this ), start = $( this ).data( "ui-resizable-alsoresize" ), style = {},
					css = el.parents( ui.originalElement[ 0 ] ).length ?
						[ "width", "height" ] :
						[ "width", "height", "top", "left" ];

				$.each( css, function( i, prop ) {
					var sum = ( start[ prop ] || 0 ) + ( delta[ prop ] || 0 );
					if ( sum && sum >= 0 ) {
						style[ prop ] = sum || null;
					}
				} );

				el.css( style );
			} );
		},

		stop: function() {
			$( this ).removeData( "ui-resizable-alsoresize" );
		}
	} );

	$.ui.plugin.add( "resizable", "ghost", {

		start: function() {

			var that = $( this ).resizable( "instance" ), cs = that.size;

			that.ghost = that.originalElement.clone();
			that.ghost.css( {
				opacity: 0.25,
				display: "block",
				position: "relative",
				height: cs.height,
				width: cs.width,
				margin: 0,
				left: 0,
				top: 0
			} );

			that._addClass( that.ghost, "ui-resizable-ghost" );

			// DEPRECATED
			// TODO: remove after 1.12
			if ( $.uiBackCompat !== false && typeof that.options.ghost === "string" ) {

				// Ghost option
				that.ghost.addClass( this.options.ghost );
			}

			that.ghost.appendTo( that.helper );

		},

		resize: function() {
			var that = $( this ).resizable( "instance" );
			if ( that.ghost ) {
				that.ghost.css( {
					position: "relative",
					height: that.size.height,
					width: that.size.width
				} );
			}
		},

		stop: function() {
			var that = $( this ).resizable( "instance" );
			if ( that.ghost && that.helper ) {
				that.helper.get( 0 ).removeChild( that.ghost.get( 0 ) );
			}
		}

	} );

	$.ui.plugin.add( "resizable", "grid", {

		resize: function() {
			var outerDimensions,
				that = $( this ).resizable( "instance" ),
				o = that.options,
				cs = that.size,
				os = that.originalSize,
				op = that.originalPosition,
				a = that.axis,
				grid = typeof o.grid === "number" ? [ o.grid, o.grid ] : o.grid,
				gridX = ( grid[ 0 ] || 1 ),
				gridY = ( grid[ 1 ] || 1 ),
				ox = Math.round( ( cs.width - os.width ) / gridX ) * gridX,
				oy = Math.round( ( cs.height - os.height ) / gridY ) * gridY,
				newWidth = os.width + ox,
				newHeight = os.height + oy,
				isMaxWidth = o.maxWidth && ( o.maxWidth < newWidth ),
				isMaxHeight = o.maxHeight && ( o.maxHeight < newHeight ),
				isMinWidth = o.minWidth && ( o.minWidth > newWidth ),
				isMinHeight = o.minHeight && ( o.minHeight > newHeight );

			o.grid = grid;

			if ( isMinWidth ) {
				newWidth += gridX;
			}
			if ( isMinHeight ) {
				newHeight += gridY;
			}
			if ( isMaxWidth ) {
				newWidth -= gridX;
			}
			if ( isMaxHeight ) {
				newHeight -= gridY;
			}

			if ( /^(se|s|e)$/.test( a ) ) {
				that.size.width = newWidth;
				that.size.height = newHeight;
			} else if ( /^(ne)$/.test( a ) ) {
				that.size.width = newWidth;
				that.size.height = newHeight;
				that.position.top = op.top - oy;
			} else if ( /^(sw)$/.test( a ) ) {
				that.size.width = newWidth;
				that.size.height = newHeight;
				that.position.left = op.left - ox;
			} else {
				if ( newHeight - gridY <= 0 || newWidth - gridX <= 0 ) {
					outerDimensions = that._getPaddingPlusBorderDimensions( this );
				}

				if ( newHeight - gridY > 0 ) {
					that.size.height = newHeight;
					that.position.top = op.top - oy;
				} else {
					newHeight = gridY - outerDimensions.height;
					that.size.height = newHeight;
					that.position.top = op.top + os.height - newHeight;
				}
				if ( newWidth - gridX > 0 ) {
					that.size.width = newWidth;
					that.position.left = op.left - ox;
				} else {
					newWidth = gridX - outerDimensions.width;
					that.size.width = newWidth;
					that.position.left = op.left + os.width - newWidth;
				}
			}
		}

	} );

	var widgetsResizable = $.ui.resizable;


	/*!
 * jQuery UI Dialog 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Dialog
//>>group: Widgets
//>>description: Displays customizable dialog windows.
//>>docs: http://api.jqueryui.com/dialog/
//>>demos: http://jqueryui.com/dialog/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/dialog.css
//>>css.theme: ../../themes/base/theme.css


	$.widget( "ui.dialog", {
		version: "1.13.0",
		options: {
			appendTo: "body",
			autoOpen: true,
			buttons: [],
			classes: {
				"ui-dialog": "ui-corner-all",
				"ui-dialog-titlebar": "ui-corner-all"
			},
			closeOnEscape: true,
			closeText: "Close",
			draggable: true,
			hide: null,
			height: "auto",
			maxHeight: null,
			maxWidth: null,
			minHeight: 150,
			minWidth: 150,
			modal: false,
			position: {
				my: "center",
				at: "center",
				of: window,
				collision: "fit",

				// Ensure the titlebar is always visible
				using: function( pos ) {
					var topOffset = $( this ).css( pos ).offset().top;
					if ( topOffset < 0 ) {
						$( this ).css( "top", pos.top - topOffset );
					}
				}
			},
			resizable: true,
			show: null,
			title: null,
			width: 300,

			// Callbacks
			beforeClose: null,
			close: null,
			drag: null,
			dragStart: null,
			dragStop: null,
			focus: null,
			open: null,
			resize: null,
			resizeStart: null,
			resizeStop: null
		},

		sizeRelatedOptions: {
			buttons: true,
			height: true,
			maxHeight: true,
			maxWidth: true,
			minHeight: true,
			minWidth: true,
			width: true
		},

		resizableRelatedOptions: {
			maxHeight: true,
			maxWidth: true,
			minHeight: true,
			minWidth: true
		},

		_create: function() {
			this.originalCss = {
				display: this.element[ 0 ].style.display,
				width: this.element[ 0 ].style.width,
				minHeight: this.element[ 0 ].style.minHeight,
				maxHeight: this.element[ 0 ].style.maxHeight,
				height: this.element[ 0 ].style.height
			};
			this.originalPosition = {
				parent: this.element.parent(),
				index: this.element.parent().children().index( this.element )
			};
			this.originalTitle = this.element.attr( "title" );
			if ( this.options.title == null && this.originalTitle != null ) {
				this.options.title = this.originalTitle;
			}

			// Dialogs can't be disabled
			if ( this.options.disabled ) {
				this.options.disabled = false;
			}

			this._createWrapper();

			this.element
			.show()
			.removeAttr( "title" )
			.appendTo( this.uiDialog );

			this._addClass( "ui-dialog-content", "ui-widget-content" );

			this._createTitlebar();
			this._createButtonPane();

			if ( this.options.draggable && $.fn.draggable ) {
				this._makeDraggable();
			}
			if ( this.options.resizable && $.fn.resizable ) {
				this._makeResizable();
			}

			this._isOpen = false;

			this._trackFocus();
		},

		_init: function() {
			if ( this.options.autoOpen ) {
				this.open();
			}
		},

		_appendTo: function() {
			var element = this.options.appendTo;
			if ( element && ( element.jquery || element.nodeType ) ) {
				return $( element );
			}
			return this.document.find( element || "body" ).eq( 0 );
		},

		_destroy: function() {
			var next,
				originalPosition = this.originalPosition;

			this._untrackInstance();
			this._destroyOverlay();

			this.element
			.removeUniqueId()
			.css( this.originalCss )

			// Without detaching first, the following becomes really slow
			.detach();

			this.uiDialog.remove();

			if ( this.originalTitle ) {
				this.element.attr( "title", this.originalTitle );
			}

			next = originalPosition.parent.children().eq( originalPosition.index );

			// Don't try to place the dialog next to itself (#8613)
			if ( next.length && next[ 0 ] !== this.element[ 0 ] ) {
				next.before( this.element );
			} else {
				originalPosition.parent.append( this.element );
			}
		},

		widget: function() {
			return this.uiDialog;
		},

		disable: $.noop,
		enable: $.noop,

		close: function( event ) {
			var that = this;

			if ( !this._isOpen || this._trigger( "beforeClose", event ) === false ) {
				return;
			}

			this._isOpen = false;
			this._focusedElement = null;
			this._destroyOverlay();
			this._untrackInstance();

			if ( !this.opener.filter( ":focusable" ).trigger( "focus" ).length ) {

				// Hiding a focused element doesn't trigger blur in WebKit
				// so in case we have nothing to focus on, explicitly blur the active element
				// https://bugs.webkit.org/show_bug.cgi?id=47182
				$.ui.safeBlur( $.ui.safeActiveElement( this.document[ 0 ] ) );
			}

			this._hide( this.uiDialog, this.options.hide, function() {
				that._trigger( "close", event );
			} );
		},

		isOpen: function() {
			return this._isOpen;
		},

		moveToTop: function() {
			this._moveToTop();
		},

		_moveToTop: function( event, silent ) {
			var moved = false,
				zIndices = this.uiDialog.siblings( ".ui-front:visible" ).map( function() {
					return +$( this ).css( "z-index" );
				} ).get(),
				zIndexMax = Math.max.apply( null, zIndices );

			if ( zIndexMax >= +this.uiDialog.css( "z-index" ) ) {
				this.uiDialog.css( "z-index", zIndexMax + 1 );
				moved = true;
			}

			if ( moved && !silent ) {
				this._trigger( "focus", event );
			}
			return moved;
		},

		open: function() {
			var that = this;
			if ( this._isOpen ) {
				if ( this._moveToTop() ) {
					this._focusTabbable();
				}
				return;
			}

			this._isOpen = true;
			this.opener = $( $.ui.safeActiveElement( this.document[ 0 ] ) );

			this._size();
			this._position();
			this._createOverlay();
			this._moveToTop( null, true );

			// Ensure the overlay is moved to the top with the dialog, but only when
			// opening. The overlay shouldn't move after the dialog is open so that
			// modeless dialogs opened after the modal dialog stack properly.
			if ( this.overlay ) {
				this.overlay.css( "z-index", this.uiDialog.css( "z-index" ) - 1 );
			}

			this._show( this.uiDialog, this.options.show, function() {
				that._focusTabbable();
				that._trigger( "focus" );
			} );

			// Track the dialog immediately upon opening in case a focus event
			// somehow occurs outside of the dialog before an element inside the
			// dialog is focused (#10152)
			this._makeFocusTarget();

			this._trigger( "open" );
		},

		_focusTabbable: function() {

			// Set focus to the first match:
			// 1. An element that was focused previously
			// 2. First element inside the dialog matching [autofocus]
			// 3. Tabbable element inside the content element
			// 4. Tabbable element inside the buttonpane
			// 5. The close button
			// 6. The dialog itself
			var hasFocus = this._focusedElement;
			if ( !hasFocus ) {
				hasFocus = this.element.find( "[autofocus]" );
			}
			if ( !hasFocus.length ) {
				hasFocus = this.element.find( ":tabbable" );
			}
			if ( !hasFocus.length ) {
				hasFocus = this.uiDialogButtonPane.find( ":tabbable" );
			}
			if ( !hasFocus.length ) {
				hasFocus = this.uiDialogTitlebarClose.filter( ":tabbable" );
			}
			if ( !hasFocus.length ) {
				hasFocus = this.uiDialog;
			}
			hasFocus.eq( 0 ).trigger( "focus" );
		},

		_restoreTabbableFocus: function() {
			var activeElement = $.ui.safeActiveElement( this.document[ 0 ] ),
				isActive = this.uiDialog[ 0 ] === activeElement ||
					$.contains( this.uiDialog[ 0 ], activeElement );
			if ( !isActive ) {
				this._focusTabbable();
			}
		},

		_keepFocus: function( event ) {
			event.preventDefault();
			this._restoreTabbableFocus();

			// support: IE
			// IE <= 8 doesn't prevent moving focus even with event.preventDefault()
			// so we check again later
			this._delay( this._restoreTabbableFocus );
		},

		_createWrapper: function() {
			this.uiDialog = $( "<div>" )
			.hide()
			.attr( {

				// Setting tabIndex makes the div focusable
				tabIndex: -1,
				role: "dialog"
			} )
			.appendTo( this._appendTo() );

			this._addClass( this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front" );
			this._on( this.uiDialog, {
				keydown: function( event ) {
					if ( this.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
						event.keyCode === $.ui.keyCode.ESCAPE ) {
						event.preventDefault();
						this.close( event );
						return;
					}

					// Prevent tabbing out of dialogs
					if ( event.keyCode !== $.ui.keyCode.TAB || event.isDefaultPrevented() ) {
						return;
					}
					var tabbables = this.uiDialog.find( ":tabbable" ),
						first = tabbables.first(),
						last = tabbables.last();

					if ( ( event.target === last[ 0 ] || event.target === this.uiDialog[ 0 ] ) &&
						!event.shiftKey ) {
						this._delay( function() {
							first.trigger( "focus" );
						} );
						event.preventDefault();
					} else if ( ( event.target === first[ 0 ] ||
						event.target === this.uiDialog[ 0 ] ) && event.shiftKey ) {
						this._delay( function() {
							last.trigger( "focus" );
						} );
						event.preventDefault();
					}
				},
				mousedown: function( event ) {
					if ( this._moveToTop( event ) ) {
						this._focusTabbable();
					}
				}
			} );

			// We assume that any existing aria-describedby attribute means
			// that the dialog content is marked up properly
			// otherwise we brute force the content as the description
			if ( !this.element.find( "[aria-describedby]" ).length ) {
				this.uiDialog.attr( {
					"aria-describedby": this.element.uniqueId().attr( "id" )
				} );
			}
		},

		_createTitlebar: function() {
			var uiDialogTitle;

			this.uiDialogTitlebar = $( "<div>" );
			this._addClass( this.uiDialogTitlebar,
				"ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix" );
			this._on( this.uiDialogTitlebar, {
				mousedown: function( event ) {

					// Don't prevent click on close button (#8838)
					// Focusing a dialog that is partially scrolled out of view
					// causes the browser to scroll it into view, preventing the click event
					if ( !$( event.target ).closest( ".ui-dialog-titlebar-close" ) ) {

						// Dialog isn't getting focus when dragging (#8063)
						this.uiDialog.trigger( "focus" );
					}
				}
			} );

			// Support: IE
			// Use type="button" to prevent enter keypresses in textboxes from closing the
			// dialog in IE (#9312)
			this.uiDialogTitlebarClose = $( "<button type='button'></button>" )
			.button( {
				label: $( "<a>" ).text( this.options.closeText ).html(),
				icon: "ui-icon-closethick",
				showLabel: false
			} )
			.appendTo( this.uiDialogTitlebar );

			this._addClass( this.uiDialogTitlebarClose, "ui-dialog-titlebar-close" );
			this._on( this.uiDialogTitlebarClose, {
				click: function( event ) {
					event.preventDefault();
					this.close( event );
				}
			} );

			uiDialogTitle = $( "<span>" ).uniqueId().prependTo( this.uiDialogTitlebar );
			this._addClass( uiDialogTitle, "ui-dialog-title" );
			this._title( uiDialogTitle );

			this.uiDialogTitlebar.prependTo( this.uiDialog );

			this.uiDialog.attr( {
				"aria-labelledby": uiDialogTitle.attr( "id" )
			} );
		},

		_title: function( title ) {
			if ( this.options.title ) {
				title.text( this.options.title );
			} else {
				title.html( "&#160;" );
			}
		},

		_createButtonPane: function() {
			this.uiDialogButtonPane = $( "<div>" );
			this._addClass( this.uiDialogButtonPane, "ui-dialog-buttonpane",
				"ui-widget-content ui-helper-clearfix" );

			this.uiButtonSet = $( "<div>" )
			.appendTo( this.uiDialogButtonPane );
			this._addClass( this.uiButtonSet, "ui-dialog-buttonset" );

			this._createButtons();
		},

		_createButtons: function() {
			var that = this,
				buttons = this.options.buttons;

			// If we already have a button pane, remove it
			this.uiDialogButtonPane.remove();
			this.uiButtonSet.empty();

			if ( $.isEmptyObject( buttons ) || ( Array.isArray( buttons ) && !buttons.length ) ) {
				this._removeClass( this.uiDialog, "ui-dialog-buttons" );
				return;
			}

			$.each( buttons, function( name, props ) {
				var click, buttonOptions;
				props = typeof props === "function" ?
					{ click: props, text: name } :
					props;

				// Default to a non-submitting button
				props = $.extend( { type: "button" }, props );

				// Change the context for the click callback to be the main element
				click = props.click;
				buttonOptions = {
					icon: props.icon,
					iconPosition: props.iconPosition,
					showLabel: props.showLabel,

					// Deprecated options
					icons: props.icons,
					text: props.text
				};

				delete props.click;
				delete props.icon;
				delete props.iconPosition;
				delete props.showLabel;

				// Deprecated options
				delete props.icons;
				if ( typeof props.text === "boolean" ) {
					delete props.text;
				}

				$( "<button></button>", props )
				.button( buttonOptions )
				.appendTo( that.uiButtonSet )
				.on( "click", function() {
					click.apply( that.element[ 0 ], arguments );
				} );
			} );
			this._addClass( this.uiDialog, "ui-dialog-buttons" );
			this.uiDialogButtonPane.appendTo( this.uiDialog );
		},

		_makeDraggable: function() {
			var that = this,
				options = this.options;

			function filteredUi( ui ) {
				return {
					position: ui.position,
					offset: ui.offset
				};
			}

			this.uiDialog.draggable( {
				cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
				handle: ".ui-dialog-titlebar",
				containment: "document",
				start: function( event, ui ) {
					that._addClass( $( this ), "ui-dialog-dragging" );
					that._blockFrames();
					that._trigger( "dragStart", event, filteredUi( ui ) );
				},
				drag: function( event, ui ) {
					that._trigger( "drag", event, filteredUi( ui ) );
				},
				stop: function( event, ui ) {
					var left = ui.offset.left - that.document.scrollLeft(),
						top = ui.offset.top - that.document.scrollTop();

					options.position = {
						my: "left top",
						at: "left" + ( left >= 0 ? "+" : "" ) + left + " " +
							"top" + ( top >= 0 ? "+" : "" ) + top,
						of: that.window
					};
					that._removeClass( $( this ), "ui-dialog-dragging" );
					that._unblockFrames();
					that._trigger( "dragStop", event, filteredUi( ui ) );
				}
			} );
		},

		_makeResizable: function() {
			var that = this,
				options = this.options,
				handles = options.resizable,

				// .ui-resizable has position: relative defined in the stylesheet
				// but dialogs have to use absolute or fixed positioning
				position = this.uiDialog.css( "position" ),
				resizeHandles = typeof handles === "string" ?
					handles :
					"n,e,s,w,se,sw,ne,nw";

			function filteredUi( ui ) {
				return {
					originalPosition: ui.originalPosition,
					originalSize: ui.originalSize,
					position: ui.position,
					size: ui.size
				};
			}

			this.uiDialog.resizable( {
				cancel: ".ui-dialog-content",
				containment: "document",
				alsoResize: this.element,
				maxWidth: options.maxWidth,
				maxHeight: options.maxHeight,
				minWidth: options.minWidth,
				minHeight: this._minHeight(),
				handles: resizeHandles,
				start: function( event, ui ) {
					that._addClass( $( this ), "ui-dialog-resizing" );
					that._blockFrames();
					that._trigger( "resizeStart", event, filteredUi( ui ) );
				},
				resize: function( event, ui ) {
					that._trigger( "resize", event, filteredUi( ui ) );
				},
				stop: function( event, ui ) {
					var offset = that.uiDialog.offset(),
						left = offset.left - that.document.scrollLeft(),
						top = offset.top - that.document.scrollTop();

					options.height = that.uiDialog.height();
					options.width = that.uiDialog.width();
					options.position = {
						my: "left top",
						at: "left" + ( left >= 0 ? "+" : "" ) + left + " " +
							"top" + ( top >= 0 ? "+" : "" ) + top,
						of: that.window
					};
					that._removeClass( $( this ), "ui-dialog-resizing" );
					that._unblockFrames();
					that._trigger( "resizeStop", event, filteredUi( ui ) );
				}
			} )
			.css( "position", position );
		},

		_trackFocus: function() {
			this._on( this.widget(), {
				focusin: function( event ) {
					this._makeFocusTarget();
					this._focusedElement = $( event.target );
				}
			} );
		},

		_makeFocusTarget: function() {
			this._untrackInstance();
			this._trackingInstances().unshift( this );
		},

		_untrackInstance: function() {
			var instances = this._trackingInstances(),
				exists = $.inArray( this, instances );
			if ( exists !== -1 ) {
				instances.splice( exists, 1 );
			}
		},

		_trackingInstances: function() {
			var instances = this.document.data( "ui-dialog-instances" );
			if ( !instances ) {
				instances = [];
				this.document.data( "ui-dialog-instances", instances );
			}
			return instances;
		},

		_minHeight: function() {
			var options = this.options;

			return options.height === "auto" ?
				options.minHeight :
				Math.min( options.minHeight, options.height );
		},

		_position: function() {

			// Need to show the dialog to get the actual offset in the position plugin
			var isVisible = this.uiDialog.is( ":visible" );
			if ( !isVisible ) {
				this.uiDialog.show();
			}
			this.uiDialog.position( this.options.position );
			if ( !isVisible ) {
				this.uiDialog.hide();
			}
		},

		_setOptions: function( options ) {
			var that = this,
				resize = false,
				resizableOptions = {};

			$.each( options, function( key, value ) {
				that._setOption( key, value );

				if ( key in that.sizeRelatedOptions ) {
					resize = true;
				}
				if ( key in that.resizableRelatedOptions ) {
					resizableOptions[ key ] = value;
				}
			} );

			if ( resize ) {
				this._size();
				this._position();
			}
			if ( this.uiDialog.is( ":data(ui-resizable)" ) ) {
				this.uiDialog.resizable( "option", resizableOptions );
			}
		},

		_setOption: function( key, value ) {
			var isDraggable, isResizable,
				uiDialog = this.uiDialog;

			if ( key === "disabled" ) {
				return;
			}

			this._super( key, value );

			if ( key === "appendTo" ) {
				this.uiDialog.appendTo( this._appendTo() );
			}

			if ( key === "buttons" ) {
				this._createButtons();
			}

			if ( key === "closeText" ) {
				this.uiDialogTitlebarClose.button( {

					// Ensure that we always pass a string
					label: $( "<a>" ).text( "" + this.options.closeText ).html()
				} );
			}

			if ( key === "draggable" ) {
				isDraggable = uiDialog.is( ":data(ui-draggable)" );
				if ( isDraggable && !value ) {
					uiDialog.draggable( "destroy" );
				}

				if ( !isDraggable && value ) {
					this._makeDraggable();
				}
			}

			if ( key === "position" ) {
				this._position();
			}

			if ( key === "resizable" ) {

				// currently resizable, becoming non-resizable
				isResizable = uiDialog.is( ":data(ui-resizable)" );
				if ( isResizable && !value ) {
					uiDialog.resizable( "destroy" );
				}

				// Currently resizable, changing handles
				if ( isResizable && typeof value === "string" ) {
					uiDialog.resizable( "option", "handles", value );
				}

				// Currently non-resizable, becoming resizable
				if ( !isResizable && value !== false ) {
					this._makeResizable();
				}
			}

			if ( key === "title" ) {
				this._title( this.uiDialogTitlebar.find( ".ui-dialog-title" ) );
			}
		},

		_size: function() {

			// If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
			// divs will both have width and height set, so we need to reset them
			var nonContentHeight, minContentHeight, maxContentHeight,
				options = this.options;

			// Reset content sizing
			this.element.show().css( {
				width: "auto",
				minHeight: 0,
				maxHeight: "none",
				height: 0
			} );

			if ( options.minWidth > options.width ) {
				options.width = options.minWidth;
			}

			// Reset wrapper sizing
			// determine the height of all the non-content elements
			nonContentHeight = this.uiDialog.css( {
				height: "auto",
				width: options.width
			} )
			.outerHeight();
			minContentHeight = Math.max( 0, options.minHeight - nonContentHeight );
			maxContentHeight = typeof options.maxHeight === "number" ?
				Math.max( 0, options.maxHeight - nonContentHeight ) :
				"none";

			if ( options.height === "auto" ) {
				this.element.css( {
					minHeight: minContentHeight,
					maxHeight: maxContentHeight,
					height: "auto"
				} );
			} else {
				this.element.height( Math.max( 0, options.height - nonContentHeight ) );
			}

			if ( this.uiDialog.is( ":data(ui-resizable)" ) ) {
				this.uiDialog.resizable( "option", "minHeight", this._minHeight() );
			}
		},

		_blockFrames: function() {
			this.iframeBlocks = this.document.find( "iframe" ).map( function() {
				var iframe = $( this );

				return $( "<div>" )
				.css( {
					position: "absolute",
					width: iframe.outerWidth(),
					height: iframe.outerHeight()
				} )
				.appendTo( iframe.parent() )
				.offset( iframe.offset() )[ 0 ];
			} );
		},

		_unblockFrames: function() {
			if ( this.iframeBlocks ) {
				this.iframeBlocks.remove();
				delete this.iframeBlocks;
			}
		},

		_allowInteraction: function( event ) {
			if ( $( event.target ).closest( ".ui-dialog" ).length ) {
				return true;
			}

			// TODO: Remove hack when datepicker implements
			// the .ui-front logic (#8989)
			return !!$( event.target ).closest( ".ui-datepicker" ).length;
		},

		_createOverlay: function() {
			if ( !this.options.modal ) {
				return;
			}

			var jqMinor = $.fn.jquery.substring( 0, 4 );

			// We use a delay in case the overlay is created from an
			// event that we're going to be cancelling (#2804)
			var isOpening = true;
			this._delay( function() {
				isOpening = false;
			} );

			if ( !this.document.data( "ui-dialog-overlays" ) ) {

				// Prevent use of anchors and inputs
				// This doesn't use `_on()` because it is a shared event handler
				// across all open modal dialogs.
				this.document.on( "focusin.ui-dialog", function( event ) {
					if ( isOpening ) {
						return;
					}

					var instance = this._trackingInstances()[ 0 ];
					if ( !instance._allowInteraction( event ) ) {
						event.preventDefault();
						instance._focusTabbable();

						// Support: jQuery >=3.4 <3.6 only
						// Focus re-triggering in jQuery 3.4/3.5 makes the original element
						// have its focus event propagated last, breaking the re-targeting.
						// Trigger focus in a delay in addition if needed to avoid the issue
						// See https://github.com/jquery/jquery/issues/4382
						if ( jqMinor === "3.4." || jqMinor === "3.5." ) {
							instance._delay( instance._restoreTabbableFocus );
						}
					}
				}.bind( this ) );
			}

			this.overlay = $( "<div>" )
			.appendTo( this._appendTo() );

			this._addClass( this.overlay, null, "ui-widget-overlay ui-front" );
			this._on( this.overlay, {
				mousedown: "_keepFocus"
			} );
			this.document.data( "ui-dialog-overlays",
				( this.document.data( "ui-dialog-overlays" ) || 0 ) + 1 );
		},

		_destroyOverlay: function() {
			if ( !this.options.modal ) {
				return;
			}

			if ( this.overlay ) {
				var overlays = this.document.data( "ui-dialog-overlays" ) - 1;

				if ( !overlays ) {
					this.document.off( "focusin.ui-dialog" );
					this.document.removeData( "ui-dialog-overlays" );
				} else {
					this.document.data( "ui-dialog-overlays", overlays );
				}

				this.overlay.remove();
				this.overlay = null;
			}
		}
	} );

// DEPRECATED
// TODO: switch return back to widget declaration at top of file when this is removed
	if ( $.uiBackCompat !== false ) {

		// Backcompat for dialogClass option
		$.widget( "ui.dialog", $.ui.dialog, {
			options: {
				dialogClass: ""
			},
			_createWrapper: function() {
				this._super();
				this.uiDialog.addClass( this.options.dialogClass );
			},
			_setOption: function( key, value ) {
				if ( key === "dialogClass" ) {
					this.uiDialog
					.removeClass( this.options.dialogClass )
					.addClass( value );
				}
				this._superApply( arguments );
			}
		} );
	}

	var widgetsDialog = $.ui.dialog;


	/*!
 * jQuery UI Droppable 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Droppable
//>>group: Interactions
//>>description: Enables drop targets for draggable elements.
//>>docs: http://api.jqueryui.com/droppable/
//>>demos: http://jqueryui.com/droppable/


	$.widget( "ui.droppable", {
		version: "1.13.0",
		widgetEventPrefix: "drop",
		options: {
			accept: "*",
			addClasses: true,
			greedy: false,
			scope: "default",
			tolerance: "intersect",

			// Callbacks
			activate: null,
			deactivate: null,
			drop: null,
			out: null,
			over: null
		},
		_create: function() {

			var proportions,
				o = this.options,
				accept = o.accept;

			this.isover = false;
			this.isout = true;

			this.accept = typeof accept === "function" ? accept : function( d ) {
				return d.is( accept );
			};

			this.proportions = function( /* valueToWrite */ ) {
				if ( arguments.length ) {

					// Store the droppable's proportions
					proportions = arguments[ 0 ];
				} else {

					// Retrieve or derive the droppable's proportions
					return proportions ?
						proportions :
						proportions = {
							width: this.element[ 0 ].offsetWidth,
							height: this.element[ 0 ].offsetHeight
						};
				}
			};

			this._addToManager( o.scope );

			if ( o.addClasses ) {
				this._addClass( "ui-droppable" );
			}

		},

		_addToManager: function( scope ) {

			// Add the reference and positions to the manager
			$.ui.ddmanager.droppables[ scope ] = $.ui.ddmanager.droppables[ scope ] || [];
			$.ui.ddmanager.droppables[ scope ].push( this );
		},

		_splice: function( drop ) {
			var i = 0;
			for ( ; i < drop.length; i++ ) {
				if ( drop[ i ] === this ) {
					drop.splice( i, 1 );
				}
			}
		},

		_destroy: function() {
			var drop = $.ui.ddmanager.droppables[ this.options.scope ];

			this._splice( drop );
		},

		_setOption: function( key, value ) {

			if ( key === "accept" ) {
				this.accept = typeof value === "function" ? value : function( d ) {
					return d.is( value );
				};
			} else if ( key === "scope" ) {
				var drop = $.ui.ddmanager.droppables[ this.options.scope ];

				this._splice( drop );
				this._addToManager( value );
			}

			this._super( key, value );
		},

		_activate: function( event ) {
			var draggable = $.ui.ddmanager.current;

			this._addActiveClass();
			if ( draggable ) {
				this._trigger( "activate", event, this.ui( draggable ) );
			}
		},

		_deactivate: function( event ) {
			var draggable = $.ui.ddmanager.current;

			this._removeActiveClass();
			if ( draggable ) {
				this._trigger( "deactivate", event, this.ui( draggable ) );
			}
		},

		_over: function( event ) {

			var draggable = $.ui.ddmanager.current;

			// Bail if draggable and droppable are same element
			if ( !draggable || ( draggable.currentItem ||
				draggable.element )[ 0 ] === this.element[ 0 ] ) {
				return;
			}

			if ( this.accept.call( this.element[ 0 ], ( draggable.currentItem ||
				draggable.element ) ) ) {
				this._addHoverClass();
				this._trigger( "over", event, this.ui( draggable ) );
			}

		},

		_out: function( event ) {

			var draggable = $.ui.ddmanager.current;

			// Bail if draggable and droppable are same element
			if ( !draggable || ( draggable.currentItem ||
				draggable.element )[ 0 ] === this.element[ 0 ] ) {
				return;
			}

			if ( this.accept.call( this.element[ 0 ], ( draggable.currentItem ||
				draggable.element ) ) ) {
				this._removeHoverClass();
				this._trigger( "out", event, this.ui( draggable ) );
			}

		},

		_drop: function( event, custom ) {

			var draggable = custom || $.ui.ddmanager.current,
				childrenIntersection = false;

			// Bail if draggable and droppable are same element
			if ( !draggable || ( draggable.currentItem ||
				draggable.element )[ 0 ] === this.element[ 0 ] ) {
				return false;
			}

			this.element
			.find( ":data(ui-droppable)" )
			.not( ".ui-draggable-dragging" )
			.each( function() {
				var inst = $( this ).droppable( "instance" );
				if (
					inst.options.greedy &&
					!inst.options.disabled &&
					inst.options.scope === draggable.options.scope &&
					inst.accept.call(
						inst.element[ 0 ], ( draggable.currentItem || draggable.element )
					) &&
					$.ui.intersect(
						draggable,
						$.extend( inst, { offset: inst.element.offset() } ),
						inst.options.tolerance, event
					)
				) {
					childrenIntersection = true;
					return false;
				}
			} );
			if ( childrenIntersection ) {
				return false;
			}

			if ( this.accept.call( this.element[ 0 ],
				( draggable.currentItem || draggable.element ) ) ) {
				this._removeActiveClass();
				this._removeHoverClass();

				this._trigger( "drop", event, this.ui( draggable ) );
				return this.element;
			}

			return false;

		},

		ui: function( c ) {
			return {
				draggable: ( c.currentItem || c.element ),
				helper: c.helper,
				position: c.position,
				offset: c.positionAbs
			};
		},

		// Extension points just to make backcompat sane and avoid duplicating logic
		// TODO: Remove in 1.14 along with call to it below
		_addHoverClass: function() {
			this._addClass( "ui-droppable-hover" );
		},

		_removeHoverClass: function() {
			this._removeClass( "ui-droppable-hover" );
		},

		_addActiveClass: function() {
			this._addClass( "ui-droppable-active" );
		},

		_removeActiveClass: function() {
			this._removeClass( "ui-droppable-active" );
		}
	} );

	$.ui.intersect = ( function() {
		function isOverAxis( x, reference, size ) {
			return ( x >= reference ) && ( x < ( reference + size ) );
		}

		return function( draggable, droppable, toleranceMode, event ) {

			if ( !droppable.offset ) {
				return false;
			}

			var x1 = ( draggable.positionAbs ||
					draggable.position.absolute ).left + draggable.margins.left,
				y1 = ( draggable.positionAbs ||
					draggable.position.absolute ).top + draggable.margins.top,
				x2 = x1 + draggable.helperProportions.width,
				y2 = y1 + draggable.helperProportions.height,
				l = droppable.offset.left,
				t = droppable.offset.top,
				r = l + droppable.proportions().width,
				b = t + droppable.proportions().height;

			switch ( toleranceMode ) {
				case "fit":
					return ( l <= x1 && x2 <= r && t <= y1 && y2 <= b );
				case "intersect":
					return ( l < x1 + ( draggable.helperProportions.width / 2 ) && // Right Half
						x2 - ( draggable.helperProportions.width / 2 ) < r && // Left Half
						t < y1 + ( draggable.helperProportions.height / 2 ) && // Bottom Half
						y2 - ( draggable.helperProportions.height / 2 ) < b ); // Top Half
				case "pointer":
					return isOverAxis( event.pageY, t, droppable.proportions().height ) &&
						isOverAxis( event.pageX, l, droppable.proportions().width );
				case "touch":
					return (
						( y1 >= t && y1 <= b ) || // Top edge touching
						( y2 >= t && y2 <= b ) || // Bottom edge touching
						( y1 < t && y2 > b ) // Surrounded vertically
					) && (
						( x1 >= l && x1 <= r ) || // Left edge touching
						( x2 >= l && x2 <= r ) || // Right edge touching
						( x1 < l && x2 > r ) // Surrounded horizontally
					);
				default:
					return false;
			}
		};
	} )();

	/*
	This manager tracks offsets of draggables and droppables
*/
	$.ui.ddmanager = {
		current: null,
		droppables: { "default": [] },
		prepareOffsets: function( t, event ) {

			var i, j,
				m = $.ui.ddmanager.droppables[ t.options.scope ] || [],
				type = event ? event.type : null, // workaround for #2317
				list = ( t.currentItem || t.element ).find( ":data(ui-droppable)" ).addBack();

			droppablesLoop: for ( i = 0; i < m.length; i++ ) {

				// No disabled and non-accepted
				if ( m[ i ].options.disabled || ( t && !m[ i ].accept.call( m[ i ].element[ 0 ],
					( t.currentItem || t.element ) ) ) ) {
					continue;
				}

				// Filter out elements in the current dragged item
				for ( j = 0; j < list.length; j++ ) {
					if ( list[ j ] === m[ i ].element[ 0 ] ) {
						m[ i ].proportions().height = 0;
						continue droppablesLoop;
					}
				}

				m[ i ].visible = m[ i ].element.css( "display" ) !== "none";
				if ( !m[ i ].visible ) {
					continue;
				}

				// Activate the droppable if used directly from draggables
				if ( type === "mousedown" ) {
					m[ i ]._activate.call( m[ i ], event );
				}

				m[ i ].offset = m[ i ].element.offset();
				m[ i ].proportions( {
					width: m[ i ].element[ 0 ].offsetWidth,
					height: m[ i ].element[ 0 ].offsetHeight
				} );

			}

		},
		drop: function( draggable, event ) {

			var dropped = false;

			// Create a copy of the droppables in case the list changes during the drop (#9116)
			$.each( ( $.ui.ddmanager.droppables[ draggable.options.scope ] || [] ).slice(), function() {

				if ( !this.options ) {
					return;
				}
				if ( !this.options.disabled && this.visible &&
					$.ui.intersect( draggable, this, this.options.tolerance, event ) ) {
					dropped = this._drop.call( this, event ) || dropped;
				}

				if ( !this.options.disabled && this.visible && this.accept.call( this.element[ 0 ],
					( draggable.currentItem || draggable.element ) ) ) {
					this.isout = true;
					this.isover = false;
					this._deactivate.call( this, event );
				}

			} );
			return dropped;

		},
		dragStart: function( draggable, event ) {

			// Listen for scrolling so that if the dragging causes scrolling the position of the
			// droppables can be recalculated (see #5003)
			draggable.element.parentsUntil( "body" ).on( "scroll.droppable", function() {
				if ( !draggable.options.refreshPositions ) {
					$.ui.ddmanager.prepareOffsets( draggable, event );
				}
			} );
		},
		drag: function( draggable, event ) {

			// If you have a highly dynamic page, you might try this option. It renders positions
			// every time you move the mouse.
			if ( draggable.options.refreshPositions ) {
				$.ui.ddmanager.prepareOffsets( draggable, event );
			}

			// Run through all droppables and check their positions based on specific tolerance options
			$.each( $.ui.ddmanager.droppables[ draggable.options.scope ] || [], function() {

				if ( this.options.disabled || this.greedyChild || !this.visible ) {
					return;
				}

				var parentInstance, scope, parent,
					intersects = $.ui.intersect( draggable, this, this.options.tolerance, event ),
					c = !intersects && this.isover ?
						"isout" :
						( intersects && !this.isover ? "isover" : null );
				if ( !c ) {
					return;
				}

				if ( this.options.greedy ) {

					// find droppable parents with same scope
					scope = this.options.scope;
					parent = this.element.parents( ":data(ui-droppable)" ).filter( function() {
						return $( this ).droppable( "instance" ).options.scope === scope;
					} );

					if ( parent.length ) {
						parentInstance = $( parent[ 0 ] ).droppable( "instance" );
						parentInstance.greedyChild = ( c === "isover" );
					}
				}

				// We just moved into a greedy child
				if ( parentInstance && c === "isover" ) {
					parentInstance.isover = false;
					parentInstance.isout = true;
					parentInstance._out.call( parentInstance, event );
				}

				this[ c ] = true;
				this[ c === "isout" ? "isover" : "isout" ] = false;
				this[ c === "isover" ? "_over" : "_out" ].call( this, event );

				// We just moved out of a greedy child
				if ( parentInstance && c === "isout" ) {
					parentInstance.isout = false;
					parentInstance.isover = true;
					parentInstance._over.call( parentInstance, event );
				}
			} );

		},
		dragStop: function( draggable, event ) {
			draggable.element.parentsUntil( "body" ).off( "scroll.droppable" );

			// Call prepareOffsets one final time since IE does not fire return scroll events when
			// overflow was caused by drag (see #5003)
			if ( !draggable.options.refreshPositions ) {
				$.ui.ddmanager.prepareOffsets( draggable, event );
			}
		}
	};

// DEPRECATED
// TODO: switch return back to widget declaration at top of file when this is removed
	if ( $.uiBackCompat !== false ) {

		// Backcompat for activeClass and hoverClass options
		$.widget( "ui.droppable", $.ui.droppable, {
			options: {
				hoverClass: false,
				activeClass: false
			},
			_addActiveClass: function() {
				this._super();
				if ( this.options.activeClass ) {
					this.element.addClass( this.options.activeClass );
				}
			},
			_removeActiveClass: function() {
				this._super();
				if ( this.options.activeClass ) {
					this.element.removeClass( this.options.activeClass );
				}
			},
			_addHoverClass: function() {
				this._super();
				if ( this.options.hoverClass ) {
					this.element.addClass( this.options.hoverClass );
				}
			},
			_removeHoverClass: function() {
				this._super();
				if ( this.options.hoverClass ) {
					this.element.removeClass( this.options.hoverClass );
				}
			}
		} );
	}

	var widgetsDroppable = $.ui.droppable;


	/*!
 * jQuery UI Progressbar 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Progressbar
//>>group: Widgets
	/* eslint-disable max-len */
//>>description: Displays a status indicator for loading state, standard percentage, and other progress indicators.
	/* eslint-enable max-len */
//>>docs: http://api.jqueryui.com/progressbar/
//>>demos: http://jqueryui.com/progressbar/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/progressbar.css
//>>css.theme: ../../themes/base/theme.css


	var widgetsProgressbar = $.widget( "ui.progressbar", {
		version: "1.13.0",
		options: {
			classes: {
				"ui-progressbar": "ui-corner-all",
				"ui-progressbar-value": "ui-corner-left",
				"ui-progressbar-complete": "ui-corner-right"
			},
			max: 100,
			value: 0,

			change: null,
			complete: null
		},

		min: 0,

		_create: function() {

			// Constrain initial value
			this.oldValue = this.options.value = this._constrainedValue();

			this.element.attr( {

				// Only set static values; aria-valuenow and aria-valuemax are
				// set inside _refreshValue()
				role: "progressbar",
				"aria-valuemin": this.min
			} );
			this._addClass( "ui-progressbar", "ui-widget ui-widget-content" );

			this.valueDiv = $( "<div>" ).appendTo( this.element );
			this._addClass( this.valueDiv, "ui-progressbar-value", "ui-widget-header" );
			this._refreshValue();
		},

		_destroy: function() {
			this.element.removeAttr( "role aria-valuemin aria-valuemax aria-valuenow" );

			this.valueDiv.remove();
		},

		value: function( newValue ) {
			if ( newValue === undefined ) {
				return this.options.value;
			}

			this.options.value = this._constrainedValue( newValue );
			this._refreshValue();
		},

		_constrainedValue: function( newValue ) {
			if ( newValue === undefined ) {
				newValue = this.options.value;
			}

			this.indeterminate = newValue === false;

			// Sanitize value
			if ( typeof newValue !== "number" ) {
				newValue = 0;
			}

			return this.indeterminate ? false :
				Math.min( this.options.max, Math.max( this.min, newValue ) );
		},

		_setOptions: function( options ) {

			// Ensure "value" option is set after other values (like max)
			var value = options.value;
			delete options.value;

			this._super( options );

			this.options.value = this._constrainedValue( value );
			this._refreshValue();
		},

		_setOption: function( key, value ) {
			if ( key === "max" ) {

				// Don't allow a max less than min
				value = Math.max( this.min, value );
			}
			this._super( key, value );
		},

		_setOptionDisabled: function( value ) {
			this._super( value );

			this.element.attr( "aria-disabled", value );
			this._toggleClass( null, "ui-state-disabled", !!value );
		},

		_percentage: function() {
			return this.indeterminate ?
				100 :
				100 * ( this.options.value - this.min ) / ( this.options.max - this.min );
		},

		_refreshValue: function() {
			var value = this.options.value,
				percentage = this._percentage();

			this.valueDiv
			.toggle( this.indeterminate || value > this.min )
			.width( percentage.toFixed( 0 ) + "%" );

			this
			._toggleClass( this.valueDiv, "ui-progressbar-complete", null,
				value === this.options.max )
			._toggleClass( "ui-progressbar-indeterminate", null, this.indeterminate );

			if ( this.indeterminate ) {
				this.element.removeAttr( "aria-valuenow" );
				if ( !this.overlayDiv ) {
					this.overlayDiv = $( "<div>" ).appendTo( this.valueDiv );
					this._addClass( this.overlayDiv, "ui-progressbar-overlay" );
				}
			} else {
				this.element.attr( {
					"aria-valuemax": this.options.max,
					"aria-valuenow": value
				} );
				if ( this.overlayDiv ) {
					this.overlayDiv.remove();
					this.overlayDiv = null;
				}
			}

			if ( this.oldValue !== value ) {
				this.oldValue = value;
				this._trigger( "change" );
			}
			if ( value === this.options.max ) {
				this._trigger( "complete" );
			}
		}
	} );


	/*!
 * jQuery UI Selectable 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Selectable
//>>group: Interactions
//>>description: Allows groups of elements to be selected with the mouse.
//>>docs: http://api.jqueryui.com/selectable/
//>>demos: http://jqueryui.com/selectable/
//>>css.structure: ../../themes/base/selectable.css


	var widgetsSelectable = $.widget( "ui.selectable", $.ui.mouse, {
		version: "1.13.0",
		options: {
			appendTo: "body",
			autoRefresh: true,
			distance: 0,
			filter: "*",
			tolerance: "touch",

			// Callbacks
			selected: null,
			selecting: null,
			start: null,
			stop: null,
			unselected: null,
			unselecting: null
		},
		_create: function() {
			var that = this;

			this._addClass( "ui-selectable" );

			this.dragged = false;

			// Cache selectee children based on filter
			this.refresh = function() {
				that.elementPos = $( that.element[ 0 ] ).offset();
				that.selectees = $( that.options.filter, that.element[ 0 ] );
				that._addClass( that.selectees, "ui-selectee" );
				that.selectees.each( function() {
					var $this = $( this ),
						selecteeOffset = $this.offset(),
						pos = {
							left: selecteeOffset.left - that.elementPos.left,
							top: selecteeOffset.top - that.elementPos.top
						};
					$.data( this, "selectable-item", {
						element: this,
						$element: $this,
						left: pos.left,
						top: pos.top,
						right: pos.left + $this.outerWidth(),
						bottom: pos.top + $this.outerHeight(),
						startselected: false,
						selected: $this.hasClass( "ui-selected" ),
						selecting: $this.hasClass( "ui-selecting" ),
						unselecting: $this.hasClass( "ui-unselecting" )
					} );
				} );
			};
			this.refresh();

			this._mouseInit();

			this.helper = $( "<div>" );
			this._addClass( this.helper, "ui-selectable-helper" );
		},

		_destroy: function() {
			this.selectees.removeData( "selectable-item" );
			this._mouseDestroy();
		},

		_mouseStart: function( event ) {
			var that = this,
				options = this.options;

			this.opos = [ event.pageX, event.pageY ];
			this.elementPos = $( this.element[ 0 ] ).offset();

			if ( this.options.disabled ) {
				return;
			}

			this.selectees = $( options.filter, this.element[ 0 ] );

			this._trigger( "start", event );

			$( options.appendTo ).append( this.helper );

			// position helper (lasso)
			this.helper.css( {
				"left": event.pageX,
				"top": event.pageY,
				"width": 0,
				"height": 0
			} );

			if ( options.autoRefresh ) {
				this.refresh();
			}

			this.selectees.filter( ".ui-selected" ).each( function() {
				var selectee = $.data( this, "selectable-item" );
				selectee.startselected = true;
				if ( !event.metaKey && !event.ctrlKey ) {
					that._removeClass( selectee.$element, "ui-selected" );
					selectee.selected = false;
					that._addClass( selectee.$element, "ui-unselecting" );
					selectee.unselecting = true;

					// selectable UNSELECTING callback
					that._trigger( "unselecting", event, {
						unselecting: selectee.element
					} );
				}
			} );

			$( event.target ).parents().addBack().each( function() {
				var doSelect,
					selectee = $.data( this, "selectable-item" );
				if ( selectee ) {
					doSelect = ( !event.metaKey && !event.ctrlKey ) ||
						!selectee.$element.hasClass( "ui-selected" );
					that._removeClass( selectee.$element, doSelect ? "ui-unselecting" : "ui-selected" )
					._addClass( selectee.$element, doSelect ? "ui-selecting" : "ui-unselecting" );
					selectee.unselecting = !doSelect;
					selectee.selecting = doSelect;
					selectee.selected = doSelect;

					// selectable (UN)SELECTING callback
					if ( doSelect ) {
						that._trigger( "selecting", event, {
							selecting: selectee.element
						} );
					} else {
						that._trigger( "unselecting", event, {
							unselecting: selectee.element
						} );
					}
					return false;
				}
			} );

		},

		_mouseDrag: function( event ) {

			this.dragged = true;

			if ( this.options.disabled ) {
				return;
			}

			var tmp,
				that = this,
				options = this.options,
				x1 = this.opos[ 0 ],
				y1 = this.opos[ 1 ],
				x2 = event.pageX,
				y2 = event.pageY;

			if ( x1 > x2 ) {
				tmp = x2; x2 = x1; x1 = tmp;
			}
			if ( y1 > y2 ) {
				tmp = y2; y2 = y1; y1 = tmp;
			}
			this.helper.css( { left: x1, top: y1, width: x2 - x1, height: y2 - y1 } );

			this.selectees.each( function() {
				var selectee = $.data( this, "selectable-item" ),
					hit = false,
					offset = {};

				//prevent helper from being selected if appendTo: selectable
				if ( !selectee || selectee.element === that.element[ 0 ] ) {
					return;
				}

				offset.left   = selectee.left   + that.elementPos.left;
				offset.right  = selectee.right  + that.elementPos.left;
				offset.top    = selectee.top    + that.elementPos.top;
				offset.bottom = selectee.bottom + that.elementPos.top;

				if ( options.tolerance === "touch" ) {
					hit = ( !( offset.left > x2 || offset.right < x1 || offset.top > y2 ||
						offset.bottom < y1 ) );
				} else if ( options.tolerance === "fit" ) {
					hit = ( offset.left > x1 && offset.right < x2 && offset.top > y1 &&
						offset.bottom < y2 );
				}

				if ( hit ) {

					// SELECT
					if ( selectee.selected ) {
						that._removeClass( selectee.$element, "ui-selected" );
						selectee.selected = false;
					}
					if ( selectee.unselecting ) {
						that._removeClass( selectee.$element, "ui-unselecting" );
						selectee.unselecting = false;
					}
					if ( !selectee.selecting ) {
						that._addClass( selectee.$element, "ui-selecting" );
						selectee.selecting = true;

						// selectable SELECTING callback
						that._trigger( "selecting", event, {
							selecting: selectee.element
						} );
					}
				} else {

					// UNSELECT
					if ( selectee.selecting ) {
						if ( ( event.metaKey || event.ctrlKey ) && selectee.startselected ) {
							that._removeClass( selectee.$element, "ui-selecting" );
							selectee.selecting = false;
							that._addClass( selectee.$element, "ui-selected" );
							selectee.selected = true;
						} else {
							that._removeClass( selectee.$element, "ui-selecting" );
							selectee.selecting = false;
							if ( selectee.startselected ) {
								that._addClass( selectee.$element, "ui-unselecting" );
								selectee.unselecting = true;
							}

							// selectable UNSELECTING callback
							that._trigger( "unselecting", event, {
								unselecting: selectee.element
							} );
						}
					}
					if ( selectee.selected ) {
						if ( !event.metaKey && !event.ctrlKey && !selectee.startselected ) {
							that._removeClass( selectee.$element, "ui-selected" );
							selectee.selected = false;

							that._addClass( selectee.$element, "ui-unselecting" );
							selectee.unselecting = true;

							// selectable UNSELECTING callback
							that._trigger( "unselecting", event, {
								unselecting: selectee.element
							} );
						}
					}
				}
			} );

			return false;
		},

		_mouseStop: function( event ) {
			var that = this;

			this.dragged = false;

			$( ".ui-unselecting", this.element[ 0 ] ).each( function() {
				var selectee = $.data( this, "selectable-item" );
				that._removeClass( selectee.$element, "ui-unselecting" );
				selectee.unselecting = false;
				selectee.startselected = false;
				that._trigger( "unselected", event, {
					unselected: selectee.element
				} );
			} );
			$( ".ui-selecting", this.element[ 0 ] ).each( function() {
				var selectee = $.data( this, "selectable-item" );
				that._removeClass( selectee.$element, "ui-selecting" )
				._addClass( selectee.$element, "ui-selected" );
				selectee.selecting = false;
				selectee.selected = true;
				selectee.startselected = true;
				that._trigger( "selected", event, {
					selected: selectee.element
				} );
			} );
			this._trigger( "stop", event );

			this.helper.remove();

			return false;
		}

	} );


	/*!
 * jQuery UI Selectmenu 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Selectmenu
//>>group: Widgets
	/* eslint-disable max-len */
//>>description: Duplicates and extends the functionality of a native HTML select element, allowing it to be customizable in behavior and appearance far beyond the limitations of a native select.
	/* eslint-enable max-len */
//>>docs: http://api.jqueryui.com/selectmenu/
//>>demos: http://jqueryui.com/selectmenu/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/selectmenu.css, ../../themes/base/button.css
//>>css.theme: ../../themes/base/theme.css


	var widgetsSelectmenu = $.widget( "ui.selectmenu", [ $.ui.formResetMixin, {
		version: "1.13.0",
		defaultElement: "<select>",
		options: {
			appendTo: null,
			classes: {
				"ui-selectmenu-button-open": "ui-corner-top",
				"ui-selectmenu-button-closed": "ui-corner-all"
			},
			disabled: null,
			icons: {
				button: "ui-icon-triangle-1-s"
			},
			position: {
				my: "left top",
				at: "left bottom",
				collision: "none"
			},
			width: false,

			// Callbacks
			change: null,
			close: null,
			focus: null,
			open: null,
			select: null
		},

		_create: function() {
			var selectmenuId = this.element.uniqueId().attr( "id" );
			this.ids = {
				element: selectmenuId,
				button: selectmenuId + "-button",
				menu: selectmenuId + "-menu"
			};

			this._drawButton();
			this._drawMenu();
			this._bindFormResetHandler();

			this._rendered = false;
			this.menuItems = $();
		},

		_drawButton: function() {
			var icon,
				that = this,
				item = this._parseOption(
					this.element.find( "option:selected" ),
					this.element[ 0 ].selectedIndex
				);

			// Associate existing label with the new button
			this.labels = this.element.labels().attr( "for", this.ids.button );
			this._on( this.labels, {
				click: function( event ) {
					this.button.trigger( "focus" );
					event.preventDefault();
				}
			} );

			// Hide original select element
			this.element.hide();

			// Create button
			this.button = $( "<span>", {
				tabindex: this.options.disabled ? -1 : 0,
				id: this.ids.button,
				role: "combobox",
				"aria-expanded": "false",
				"aria-autocomplete": "list",
				"aria-owns": this.ids.menu,
				"aria-haspopup": "true",
				title: this.element.attr( "title" )
			} )
			.insertAfter( this.element );

			this._addClass( this.button, "ui-selectmenu-button ui-selectmenu-button-closed",
				"ui-button ui-widget" );

			icon = $( "<span>" ).appendTo( this.button );
			this._addClass( icon, "ui-selectmenu-icon", "ui-icon " + this.options.icons.button );
			this.buttonItem = this._renderButtonItem( item )
			.appendTo( this.button );

			if ( this.options.width !== false ) {
				this._resizeButton();
			}

			this._on( this.button, this._buttonEvents );
			this.button.one( "focusin", function() {

				// Delay rendering the menu items until the button receives focus.
				// The menu may have already been rendered via a programmatic open.
				if ( !that._rendered ) {
					that._refreshMenu();
				}
			} );
		},

		_drawMenu: function() {
			var that = this;

			// Create menu
			this.menu = $( "<ul>", {
				"aria-hidden": "true",
				"aria-labelledby": this.ids.button,
				id: this.ids.menu
			} );

			// Wrap menu
			this.menuWrap = $( "<div>" ).append( this.menu );
			this._addClass( this.menuWrap, "ui-selectmenu-menu", "ui-front" );
			this.menuWrap.appendTo( this._appendTo() );

			// Initialize menu widget
			this.menuInstance = this.menu
			.menu( {
				classes: {
					"ui-menu": "ui-corner-bottom"
				},
				role: "listbox",
				select: function( event, ui ) {
					event.preventDefault();

					// Support: IE8
					// If the item was selected via a click, the text selection
					// will be destroyed in IE
					that._setSelection();

					that._select( ui.item.data( "ui-selectmenu-item" ), event );
				},
				focus: function( event, ui ) {
					var item = ui.item.data( "ui-selectmenu-item" );

					// Prevent inital focus from firing and check if its a newly focused item
					if ( that.focusIndex != null && item.index !== that.focusIndex ) {
						that._trigger( "focus", event, { item: item } );
						if ( !that.isOpen ) {
							that._select( item, event );
						}
					}
					that.focusIndex = item.index;

					that.button.attr( "aria-activedescendant",
						that.menuItems.eq( item.index ).attr( "id" ) );
				}
			} )
			.menu( "instance" );

			// Don't close the menu on mouseleave
			this.menuInstance._off( this.menu, "mouseleave" );

			// Cancel the menu's collapseAll on document click
			this.menuInstance._closeOnDocumentClick = function() {
				return false;
			};

			// Selects often contain empty items, but never contain dividers
			this.menuInstance._isDivider = function() {
				return false;
			};
		},

		refresh: function() {
			this._refreshMenu();
			this.buttonItem.replaceWith(
				this.buttonItem = this._renderButtonItem(

					// Fall back to an empty object in case there are no options
					this._getSelectedItem().data( "ui-selectmenu-item" ) || {}
				)
			);
			if ( this.options.width === null ) {
				this._resizeButton();
			}
		},

		_refreshMenu: function() {
			var item,
				options = this.element.find( "option" );

			this.menu.empty();

			this._parseOptions( options );
			this._renderMenu( this.menu, this.items );

			this.menuInstance.refresh();
			this.menuItems = this.menu.find( "li" )
			.not( ".ui-selectmenu-optgroup" )
			.find( ".ui-menu-item-wrapper" );

			this._rendered = true;

			if ( !options.length ) {
				return;
			}

			item = this._getSelectedItem();

			// Update the menu to have the correct item focused
			this.menuInstance.focus( null, item );
			this._setAria( item.data( "ui-selectmenu-item" ) );

			// Set disabled state
			this._setOption( "disabled", this.element.prop( "disabled" ) );
		},

		open: function( event ) {
			if ( this.options.disabled ) {
				return;
			}

			// If this is the first time the menu is being opened, render the items
			if ( !this._rendered ) {
				this._refreshMenu();
			} else {

				// Menu clears focus on close, reset focus to selected item
				this._removeClass( this.menu.find( ".ui-state-active" ), null, "ui-state-active" );
				this.menuInstance.focus( null, this._getSelectedItem() );
			}

			// If there are no options, don't open the menu
			if ( !this.menuItems.length ) {
				return;
			}

			this.isOpen = true;
			this._toggleAttr();
			this._resizeMenu();
			this._position();

			this._on( this.document, this._documentClick );

			this._trigger( "open", event );
		},

		_position: function() {
			this.menuWrap.position( $.extend( { of: this.button }, this.options.position ) );
		},

		close: function( event ) {
			if ( !this.isOpen ) {
				return;
			}

			this.isOpen = false;
			this._toggleAttr();

			this.range = null;
			this._off( this.document );

			this._trigger( "close", event );
		},

		widget: function() {
			return this.button;
		},

		menuWidget: function() {
			return this.menu;
		},

		_renderButtonItem: function( item ) {
			var buttonItem = $( "<span>" );

			this._setText( buttonItem, item.label );
			this._addClass( buttonItem, "ui-selectmenu-text" );

			return buttonItem;
		},

		_renderMenu: function( ul, items ) {
			var that = this,
				currentOptgroup = "";

			$.each( items, function( index, item ) {
				var li;

				if ( item.optgroup !== currentOptgroup ) {
					li = $( "<li>", {
						text: item.optgroup
					} );
					that._addClass( li, "ui-selectmenu-optgroup", "ui-menu-divider" +
						( item.element.parent( "optgroup" ).prop( "disabled" ) ?
							" ui-state-disabled" :
							"" ) );

					li.appendTo( ul );

					currentOptgroup = item.optgroup;
				}

				that._renderItemData( ul, item );
			} );
		},

		_renderItemData: function( ul, item ) {
			return this._renderItem( ul, item ).data( "ui-selectmenu-item", item );
		},

		_renderItem: function( ul, item ) {
			var li = $( "<li>" ),
				wrapper = $( "<div>", {
					title: item.element.attr( "title" )
				} );

			if ( item.disabled ) {
				this._addClass( li, null, "ui-state-disabled" );
			}
			this._setText( wrapper, item.label );

			return li.append( wrapper ).appendTo( ul );
		},

		_setText: function( element, value ) {
			if ( value ) {
				element.text( value );
			} else {
				element.html( "&#160;" );
			}
		},

		_move: function( direction, event ) {
			var item, next,
				filter = ".ui-menu-item";

			if ( this.isOpen ) {
				item = this.menuItems.eq( this.focusIndex ).parent( "li" );
			} else {
				item = this.menuItems.eq( this.element[ 0 ].selectedIndex ).parent( "li" );
				filter += ":not(.ui-state-disabled)";
			}

			if ( direction === "first" || direction === "last" ) {
				next = item[ direction === "first" ? "prevAll" : "nextAll" ]( filter ).eq( -1 );
			} else {
				next = item[ direction + "All" ]( filter ).eq( 0 );
			}

			if ( next.length ) {
				this.menuInstance.focus( event, next );
			}
		},

		_getSelectedItem: function() {
			return this.menuItems.eq( this.element[ 0 ].selectedIndex ).parent( "li" );
		},

		_toggle: function( event ) {
			this[ this.isOpen ? "close" : "open" ]( event );
		},

		_setSelection: function() {
			var selection;

			if ( !this.range ) {
				return;
			}

			if ( window.getSelection ) {
				selection = window.getSelection();
				selection.removeAllRanges();
				selection.addRange( this.range );

				// Support: IE8
			} else {
				this.range.select();
			}

			// Support: IE
			// Setting the text selection kills the button focus in IE, but
			// restoring the focus doesn't kill the selection.
			this.button.focus();
		},

		_documentClick: {
			mousedown: function( event ) {
				if ( !this.isOpen ) {
					return;
				}

				if ( !$( event.target ).closest( ".ui-selectmenu-menu, #" +
					$.escapeSelector( this.ids.button ) ).length ) {
					this.close( event );
				}
			}
		},

		_buttonEvents: {

			// Prevent text selection from being reset when interacting with the selectmenu (#10144)
			mousedown: function() {
				var selection;

				if ( window.getSelection ) {
					selection = window.getSelection();
					if ( selection.rangeCount ) {
						this.range = selection.getRangeAt( 0 );
					}

					// Support: IE8
				} else {
					this.range = document.selection.createRange();
				}
			},

			click: function( event ) {
				this._setSelection();
				this._toggle( event );
			},

			keydown: function( event ) {
				var preventDefault = true;
				switch ( event.keyCode ) {
					case $.ui.keyCode.TAB:
					case $.ui.keyCode.ESCAPE:
						this.close( event );
						preventDefault = false;
						break;
					case $.ui.keyCode.ENTER:
						if ( this.isOpen ) {
							this._selectFocusedItem( event );
						}
						break;
					case $.ui.keyCode.UP:
						if ( event.altKey ) {
							this._toggle( event );
						} else {
							this._move( "prev", event );
						}
						break;
					case $.ui.keyCode.DOWN:
						if ( event.altKey ) {
							this._toggle( event );
						} else {
							this._move( "next", event );
						}
						break;
					case $.ui.keyCode.SPACE:
						if ( this.isOpen ) {
							this._selectFocusedItem( event );
						} else {
							this._toggle( event );
						}
						break;
					case $.ui.keyCode.LEFT:
						this._move( "prev", event );
						break;
					case $.ui.keyCode.RIGHT:
						this._move( "next", event );
						break;
					case $.ui.keyCode.HOME:
					case $.ui.keyCode.PAGE_UP:
						this._move( "first", event );
						break;
					case $.ui.keyCode.END:
					case $.ui.keyCode.PAGE_DOWN:
						this._move( "last", event );
						break;
					default:
						this.menu.trigger( event );
						preventDefault = false;
				}

				if ( preventDefault ) {
					event.preventDefault();
				}
			}
		},

		_selectFocusedItem: function( event ) {
			var item = this.menuItems.eq( this.focusIndex ).parent( "li" );
			if ( !item.hasClass( "ui-state-disabled" ) ) {
				this._select( item.data( "ui-selectmenu-item" ), event );
			}
		},

		_select: function( item, event ) {
			var oldIndex = this.element[ 0 ].selectedIndex;

			// Change native select element
			this.element[ 0 ].selectedIndex = item.index;
			this.buttonItem.replaceWith( this.buttonItem = this._renderButtonItem( item ) );
			this._setAria( item );
			this._trigger( "select", event, { item: item } );

			if ( item.index !== oldIndex ) {
				this._trigger( "change", event, { item: item } );
			}

			this.close( event );
		},

		_setAria: function( item ) {
			var id = this.menuItems.eq( item.index ).attr( "id" );

			this.button.attr( {
				"aria-labelledby": id,
				"aria-activedescendant": id
			} );
			this.menu.attr( "aria-activedescendant", id );
		},

		_setOption: function( key, value ) {
			if ( key === "icons" ) {
				var icon = this.button.find( "span.ui-icon" );
				this._removeClass( icon, null, this.options.icons.button )
				._addClass( icon, null, value.button );
			}

			this._super( key, value );

			if ( key === "appendTo" ) {
				this.menuWrap.appendTo( this._appendTo() );
			}

			if ( key === "width" ) {
				this._resizeButton();
			}
		},

		_setOptionDisabled: function( value ) {
			this._super( value );

			this.menuInstance.option( "disabled", value );
			this.button.attr( "aria-disabled", value );
			this._toggleClass( this.button, null, "ui-state-disabled", value );

			this.element.prop( "disabled", value );
			if ( value ) {
				this.button.attr( "tabindex", -1 );
				this.close();
			} else {
				this.button.attr( "tabindex", 0 );
			}
		},

		_appendTo: function() {
			var element = this.options.appendTo;

			if ( element ) {
				element = element.jquery || element.nodeType ?
					$( element ) :
					this.document.find( element ).eq( 0 );
			}

			if ( !element || !element[ 0 ] ) {
				element = this.element.closest( ".ui-front, dialog" );
			}

			if ( !element.length ) {
				element = this.document[ 0 ].body;
			}

			return element;
		},

		_toggleAttr: function() {
			this.button.attr( "aria-expanded", this.isOpen );

			// We can't use two _toggleClass() calls here, because we need to make sure
			// we always remove classes first and add them second, otherwise if both classes have the
			// same theme class, it will be removed after we add it.
			this._removeClass( this.button, "ui-selectmenu-button-" +
				( this.isOpen ? "closed" : "open" ) )
			._addClass( this.button, "ui-selectmenu-button-" +
				( this.isOpen ? "open" : "closed" ) )
			._toggleClass( this.menuWrap, "ui-selectmenu-open", null, this.isOpen );

			this.menu.attr( "aria-hidden", !this.isOpen );
		},

		_resizeButton: function() {
			var width = this.options.width;

			// For `width: false`, just remove inline style and stop
			if ( width === false ) {
				this.button.css( "width", "" );
				return;
			}

			// For `width: null`, match the width of the original element
			if ( width === null ) {
				width = this.element.show().outerWidth();
				this.element.hide();
			}

			this.button.outerWidth( width );
		},

		_resizeMenu: function() {
			this.menu.outerWidth( Math.max(
				this.button.outerWidth(),

				// Support: IE10
				// IE10 wraps long text (possibly a rounding bug)
				// so we add 1px to avoid the wrapping
				this.menu.width( "" ).outerWidth() + 1
			) );
		},

		_getCreateOptions: function() {
			var options = this._super();

			options.disabled = this.element.prop( "disabled" );

			return options;
		},

		_parseOptions: function( options ) {
			var that = this,
				data = [];
			options.each( function( index, item ) {
				if ( item.hidden ) {
					return;
				}

				data.push( that._parseOption( $( item ), index ) );
			} );
			this.items = data;
		},

		_parseOption: function( option, index ) {
			var optgroup = option.parent( "optgroup" );

			return {
				element: option,
				index: index,
				value: option.val(),
				label: option.text(),
				optgroup: optgroup.attr( "label" ) || "",
				disabled: optgroup.prop( "disabled" ) || option.prop( "disabled" )
			};
		},

		_destroy: function() {
			this._unbindFormResetHandler();
			this.menuWrap.remove();
			this.button.remove();
			this.element.show();
			this.element.removeUniqueId();
			this.labels.attr( "for", this.ids.element );
		}
	} ] );


	/*!
 * jQuery UI Slider 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Slider
//>>group: Widgets
//>>description: Displays a flexible slider with ranges and accessibility via keyboard.
//>>docs: http://api.jqueryui.com/slider/
//>>demos: http://jqueryui.com/slider/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/slider.css
//>>css.theme: ../../themes/base/theme.css


	var widgetsSlider = $.widget( "ui.slider", $.ui.mouse, {
		version: "1.13.0",
		widgetEventPrefix: "slide",

		options: {
			animate: false,
			classes: {
				"ui-slider": "ui-corner-all",
				"ui-slider-handle": "ui-corner-all",

				// Note: ui-widget-header isn't the most fittingly semantic framework class for this
				// element, but worked best visually with a variety of themes
				"ui-slider-range": "ui-corner-all ui-widget-header"
			},
			distance: 0,
			max: 100,
			min: 0,
			orientation: "horizontal",
			range: false,
			step: 1,
			value: 0,
			values: null,

			// Callbacks
			change: null,
			slide: null,
			start: null,
			stop: null
		},

		// Number of pages in a slider
		// (how many times can you page up/down to go through the whole range)
		numPages: 5,

		_create: function() {
			this._keySliding = false;
			this._mouseSliding = false;
			this._animateOff = true;
			this._handleIndex = null;
			this._detectOrientation();
			this._mouseInit();
			this._calculateNewMax();

			this._addClass( "ui-slider ui-slider-" + this.orientation,
				"ui-widget ui-widget-content" );

			this._refresh();

			this._animateOff = false;
		},

		_refresh: function() {
			this._createRange();
			this._createHandles();
			this._setupEvents();
			this._refreshValue();
		},

		_createHandles: function() {
			var i, handleCount,
				options = this.options,
				existingHandles = this.element.find( ".ui-slider-handle" ),
				handle = "<span tabindex='0'></span>",
				handles = [];

			handleCount = ( options.values && options.values.length ) || 1;

			if ( existingHandles.length > handleCount ) {
				existingHandles.slice( handleCount ).remove();
				existingHandles = existingHandles.slice( 0, handleCount );
			}

			for ( i = existingHandles.length; i < handleCount; i++ ) {
				handles.push( handle );
			}

			this.handles = existingHandles.add( $( handles.join( "" ) ).appendTo( this.element ) );

			this._addClass( this.handles, "ui-slider-handle", "ui-state-default" );

			this.handle = this.handles.eq( 0 );

			this.handles.each( function( i ) {
				$( this )
				.data( "ui-slider-handle-index", i )
				.attr( "tabIndex", 0 );
			} );
		},

		_createRange: function() {
			var options = this.options;

			if ( options.range ) {
				if ( options.range === true ) {
					if ( !options.values ) {
						options.values = [ this._valueMin(), this._valueMin() ];
					} else if ( options.values.length && options.values.length !== 2 ) {
						options.values = [ options.values[ 0 ], options.values[ 0 ] ];
					} else if ( Array.isArray( options.values ) ) {
						options.values = options.values.slice( 0 );
					}
				}

				if ( !this.range || !this.range.length ) {
					this.range = $( "<div>" )
					.appendTo( this.element );

					this._addClass( this.range, "ui-slider-range" );
				} else {
					this._removeClass( this.range, "ui-slider-range-min ui-slider-range-max" );

					// Handle range switching from true to min/max
					this.range.css( {
						"left": "",
						"bottom": ""
					} );
				}
				if ( options.range === "min" || options.range === "max" ) {
					this._addClass( this.range, "ui-slider-range-" + options.range );
				}
			} else {
				if ( this.range ) {
					this.range.remove();
				}
				this.range = null;
			}
		},

		_setupEvents: function() {
			this._off( this.handles );
			this._on( this.handles, this._handleEvents );
			this._hoverable( this.handles );
			this._focusable( this.handles );
		},

		_destroy: function() {
			this.handles.remove();
			if ( this.range ) {
				this.range.remove();
			}

			this._mouseDestroy();
		},

		_mouseCapture: function( event ) {
			var position, normValue, distance, closestHandle, index, allowed, offset, mouseOverHandle,
				that = this,
				o = this.options;

			if ( o.disabled ) {
				return false;
			}

			this.elementSize = {
				width: this.element.outerWidth(),
				height: this.element.outerHeight()
			};
			this.elementOffset = this.element.offset();

			position = { x: event.pageX, y: event.pageY };
			normValue = this._normValueFromMouse( position );
			distance = this._valueMax() - this._valueMin() + 1;
			this.handles.each( function( i ) {
				var thisDistance = Math.abs( normValue - that.values( i ) );
				if ( ( distance > thisDistance ) ||
					( distance === thisDistance &&
						( i === that._lastChangedValue || that.values( i ) === o.min ) ) ) {
					distance = thisDistance;
					closestHandle = $( this );
					index = i;
				}
			} );

			allowed = this._start( event, index );
			if ( allowed === false ) {
				return false;
			}
			this._mouseSliding = true;

			this._handleIndex = index;

			this._addClass( closestHandle, null, "ui-state-active" );
			closestHandle.trigger( "focus" );

			offset = closestHandle.offset();
			mouseOverHandle = !$( event.target ).parents().addBack().is( ".ui-slider-handle" );
			this._clickOffset = mouseOverHandle ? { left: 0, top: 0 } : {
				left: event.pageX - offset.left - ( closestHandle.width() / 2 ),
				top: event.pageY - offset.top -
					( closestHandle.height() / 2 ) -
					( parseInt( closestHandle.css( "borderTopWidth" ), 10 ) || 0 ) -
					( parseInt( closestHandle.css( "borderBottomWidth" ), 10 ) || 0 ) +
					( parseInt( closestHandle.css( "marginTop" ), 10 ) || 0 )
			};

			if ( !this.handles.hasClass( "ui-state-hover" ) ) {
				this._slide( event, index, normValue );
			}
			this._animateOff = true;
			return true;
		},

		_mouseStart: function() {
			return true;
		},

		_mouseDrag: function( event ) {
			var position = { x: event.pageX, y: event.pageY },
				normValue = this._normValueFromMouse( position );

			this._slide( event, this._handleIndex, normValue );

			return false;
		},

		_mouseStop: function( event ) {
			this._removeClass( this.handles, null, "ui-state-active" );
			this._mouseSliding = false;

			this._stop( event, this._handleIndex );
			this._change( event, this._handleIndex );

			this._handleIndex = null;
			this._clickOffset = null;
			this._animateOff = false;

			return false;
		},

		_detectOrientation: function() {
			this.orientation = ( this.options.orientation === "vertical" ) ? "vertical" : "horizontal";
		},

		_normValueFromMouse: function( position ) {
			var pixelTotal,
				pixelMouse,
				percentMouse,
				valueTotal,
				valueMouse;

			if ( this.orientation === "horizontal" ) {
				pixelTotal = this.elementSize.width;
				pixelMouse = position.x - this.elementOffset.left -
					( this._clickOffset ? this._clickOffset.left : 0 );
			} else {
				pixelTotal = this.elementSize.height;
				pixelMouse = position.y - this.elementOffset.top -
					( this._clickOffset ? this._clickOffset.top : 0 );
			}

			percentMouse = ( pixelMouse / pixelTotal );
			if ( percentMouse > 1 ) {
				percentMouse = 1;
			}
			if ( percentMouse < 0 ) {
				percentMouse = 0;
			}
			if ( this.orientation === "vertical" ) {
				percentMouse = 1 - percentMouse;
			}

			valueTotal = this._valueMax() - this._valueMin();
			valueMouse = this._valueMin() + percentMouse * valueTotal;

			return this._trimAlignValue( valueMouse );
		},

		_uiHash: function( index, value, values ) {
			var uiHash = {
				handle: this.handles[ index ],
				handleIndex: index,
				value: value !== undefined ? value : this.value()
			};

			if ( this._hasMultipleValues() ) {
				uiHash.value = value !== undefined ? value : this.values( index );
				uiHash.values = values || this.values();
			}

			return uiHash;
		},

		_hasMultipleValues: function() {
			return this.options.values && this.options.values.length;
		},

		_start: function( event, index ) {
			return this._trigger( "start", event, this._uiHash( index ) );
		},

		_slide: function( event, index, newVal ) {
			var allowed, otherVal,
				currentValue = this.value(),
				newValues = this.values();

			if ( this._hasMultipleValues() ) {
				otherVal = this.values( index ? 0 : 1 );
				currentValue = this.values( index );

				if ( this.options.values.length === 2 && this.options.range === true ) {
					newVal =  index === 0 ? Math.min( otherVal, newVal ) : Math.max( otherVal, newVal );
				}

				newValues[ index ] = newVal;
			}

			if ( newVal === currentValue ) {
				return;
			}

			allowed = this._trigger( "slide", event, this._uiHash( index, newVal, newValues ) );

			// A slide can be canceled by returning false from the slide callback
			if ( allowed === false ) {
				return;
			}

			if ( this._hasMultipleValues() ) {
				this.values( index, newVal );
			} else {
				this.value( newVal );
			}
		},

		_stop: function( event, index ) {
			this._trigger( "stop", event, this._uiHash( index ) );
		},

		_change: function( event, index ) {
			if ( !this._keySliding && !this._mouseSliding ) {

				//store the last changed value index for reference when handles overlap
				this._lastChangedValue = index;
				this._trigger( "change", event, this._uiHash( index ) );
			}
		},

		value: function( newValue ) {
			if ( arguments.length ) {
				this.options.value = this._trimAlignValue( newValue );
				this._refreshValue();
				this._change( null, 0 );
				return;
			}

			return this._value();
		},

		values: function( index, newValue ) {
			var vals,
				newValues,
				i;

			if ( arguments.length > 1 ) {
				this.options.values[ index ] = this._trimAlignValue( newValue );
				this._refreshValue();
				this._change( null, index );
				return;
			}

			if ( arguments.length ) {
				if ( Array.isArray( arguments[ 0 ] ) ) {
					vals = this.options.values;
					newValues = arguments[ 0 ];
					for ( i = 0; i < vals.length; i += 1 ) {
						vals[ i ] = this._trimAlignValue( newValues[ i ] );
						this._change( null, i );
					}
					this._refreshValue();
				} else {
					if ( this._hasMultipleValues() ) {
						return this._values( index );
					} else {
						return this.value();
					}
				}
			} else {
				return this._values();
			}
		},

		_setOption: function( key, value ) {
			var i,
				valsLength = 0;

			if ( key === "range" && this.options.range === true ) {
				if ( value === "min" ) {
					this.options.value = this._values( 0 );
					this.options.values = null;
				} else if ( value === "max" ) {
					this.options.value = this._values( this.options.values.length - 1 );
					this.options.values = null;
				}
			}

			if ( Array.isArray( this.options.values ) ) {
				valsLength = this.options.values.length;
			}

			this._super( key, value );

			switch ( key ) {
				case "orientation":
					this._detectOrientation();
					this._removeClass( "ui-slider-horizontal ui-slider-vertical" )
					._addClass( "ui-slider-" + this.orientation );
					this._refreshValue();
					if ( this.options.range ) {
						this._refreshRange( value );
					}

					// Reset positioning from previous orientation
					this.handles.css( value === "horizontal" ? "bottom" : "left", "" );
					break;
				case "value":
					this._animateOff = true;
					this._refreshValue();
					this._change( null, 0 );
					this._animateOff = false;
					break;
				case "values":
					this._animateOff = true;
					this._refreshValue();

					// Start from the last handle to prevent unreachable handles (#9046)
					for ( i = valsLength - 1; i >= 0; i-- ) {
						this._change( null, i );
					}
					this._animateOff = false;
					break;
				case "step":
				case "min":
				case "max":
					this._animateOff = true;
					this._calculateNewMax();
					this._refreshValue();
					this._animateOff = false;
					break;
				case "range":
					this._animateOff = true;
					this._refresh();
					this._animateOff = false;
					break;
			}
		},

		_setOptionDisabled: function( value ) {
			this._super( value );

			this._toggleClass( null, "ui-state-disabled", !!value );
		},

		//internal value getter
		// _value() returns value trimmed by min and max, aligned by step
		_value: function() {
			var val = this.options.value;
			val = this._trimAlignValue( val );

			return val;
		},

		//internal values getter
		// _values() returns array of values trimmed by min and max, aligned by step
		// _values( index ) returns single value trimmed by min and max, aligned by step
		_values: function( index ) {
			var val,
				vals,
				i;

			if ( arguments.length ) {
				val = this.options.values[ index ];
				val = this._trimAlignValue( val );

				return val;
			} else if ( this._hasMultipleValues() ) {

				// .slice() creates a copy of the array
				// this copy gets trimmed by min and max and then returned
				vals = this.options.values.slice();
				for ( i = 0; i < vals.length; i += 1 ) {
					vals[ i ] = this._trimAlignValue( vals[ i ] );
				}

				return vals;
			} else {
				return [];
			}
		},

		// Returns the step-aligned value that val is closest to, between (inclusive) min and max
		_trimAlignValue: function( val ) {
			if ( val <= this._valueMin() ) {
				return this._valueMin();
			}
			if ( val >= this._valueMax() ) {
				return this._valueMax();
			}
			var step = ( this.options.step > 0 ) ? this.options.step : 1,
				valModStep = ( val - this._valueMin() ) % step,
				alignValue = val - valModStep;

			if ( Math.abs( valModStep ) * 2 >= step ) {
				alignValue += ( valModStep > 0 ) ? step : ( -step );
			}

			// Since JavaScript has problems with large floats, round
			// the final value to 5 digits after the decimal point (see #4124)
			return parseFloat( alignValue.toFixed( 5 ) );
		},

		_calculateNewMax: function() {
			var max = this.options.max,
				min = this._valueMin(),
				step = this.options.step,
				aboveMin = Math.round( ( max - min ) / step ) * step;
			max = aboveMin + min;
			if ( max > this.options.max ) {

				//If max is not divisible by step, rounding off may increase its value
				max -= step;
			}
			this.max = parseFloat( max.toFixed( this._precision() ) );
		},

		_precision: function() {
			var precision = this._precisionOf( this.options.step );
			if ( this.options.min !== null ) {
				precision = Math.max( precision, this._precisionOf( this.options.min ) );
			}
			return precision;
		},

		_precisionOf: function( num ) {
			var str = num.toString(),
				decimal = str.indexOf( "." );
			return decimal === -1 ? 0 : str.length - decimal - 1;
		},

		_valueMin: function() {
			return this.options.min;
		},

		_valueMax: function() {
			return this.max;
		},

		_refreshRange: function( orientation ) {
			if ( orientation === "vertical" ) {
				this.range.css( { "width": "", "left": "" } );
			}
			if ( orientation === "horizontal" ) {
				this.range.css( { "height": "", "bottom": "" } );
			}
		},

		_refreshValue: function() {
			var lastValPercent, valPercent, value, valueMin, valueMax,
				oRange = this.options.range,
				o = this.options,
				that = this,
				animate = ( !this._animateOff ) ? o.animate : false,
				_set = {};

			if ( this._hasMultipleValues() ) {
				this.handles.each( function( i ) {
					valPercent = ( that.values( i ) - that._valueMin() ) / ( that._valueMax() -
						that._valueMin() ) * 100;
					_set[ that.orientation === "horizontal" ? "left" : "bottom" ] = valPercent + "%";
					$( this ).stop( 1, 1 )[ animate ? "animate" : "css" ]( _set, o.animate );
					if ( that.options.range === true ) {
						if ( that.orientation === "horizontal" ) {
							if ( i === 0 ) {
								that.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( {
									left: valPercent + "%"
								}, o.animate );
							}
							if ( i === 1 ) {
								that.range[ animate ? "animate" : "css" ]( {
									width: ( valPercent - lastValPercent ) + "%"
								}, {
									queue: false,
									duration: o.animate
								} );
							}
						} else {
							if ( i === 0 ) {
								that.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( {
									bottom: ( valPercent ) + "%"
								}, o.animate );
							}
							if ( i === 1 ) {
								that.range[ animate ? "animate" : "css" ]( {
									height: ( valPercent - lastValPercent ) + "%"
								}, {
									queue: false,
									duration: o.animate
								} );
							}
						}
					}
					lastValPercent = valPercent;
				} );
			} else {
				value = this.value();
				valueMin = this._valueMin();
				valueMax = this._valueMax();
				valPercent = ( valueMax !== valueMin ) ?
					( value - valueMin ) / ( valueMax - valueMin ) * 100 :
					0;
				_set[ this.orientation === "horizontal" ? "left" : "bottom" ] = valPercent + "%";
				this.handle.stop( 1, 1 )[ animate ? "animate" : "css" ]( _set, o.animate );

				if ( oRange === "min" && this.orientation === "horizontal" ) {
					this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( {
						width: valPercent + "%"
					}, o.animate );
				}
				if ( oRange === "max" && this.orientation === "horizontal" ) {
					this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( {
						width: ( 100 - valPercent ) + "%"
					}, o.animate );
				}
				if ( oRange === "min" && this.orientation === "vertical" ) {
					this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( {
						height: valPercent + "%"
					}, o.animate );
				}
				if ( oRange === "max" && this.orientation === "vertical" ) {
					this.range.stop( 1, 1 )[ animate ? "animate" : "css" ]( {
						height: ( 100 - valPercent ) + "%"
					}, o.animate );
				}
			}
		},

		_handleEvents: {
			keydown: function( event ) {
				var allowed, curVal, newVal, step,
					index = $( event.target ).data( "ui-slider-handle-index" );

				switch ( event.keyCode ) {
					case $.ui.keyCode.HOME:
					case $.ui.keyCode.END:
					case $.ui.keyCode.PAGE_UP:
					case $.ui.keyCode.PAGE_DOWN:
					case $.ui.keyCode.UP:
					case $.ui.keyCode.RIGHT:
					case $.ui.keyCode.DOWN:
					case $.ui.keyCode.LEFT:
						event.preventDefault();
						if ( !this._keySliding ) {
							this._keySliding = true;
							this._addClass( $( event.target ), null, "ui-state-active" );
							allowed = this._start( event, index );
							if ( allowed === false ) {
								return;
							}
						}
						break;
				}

				step = this.options.step;
				if ( this._hasMultipleValues() ) {
					curVal = newVal = this.values( index );
				} else {
					curVal = newVal = this.value();
				}

				switch ( event.keyCode ) {
					case $.ui.keyCode.HOME:
						newVal = this._valueMin();
						break;
					case $.ui.keyCode.END:
						newVal = this._valueMax();
						break;
					case $.ui.keyCode.PAGE_UP:
						newVal = this._trimAlignValue(
							curVal + ( ( this._valueMax() - this._valueMin() ) / this.numPages )
						);
						break;
					case $.ui.keyCode.PAGE_DOWN:
						newVal = this._trimAlignValue(
							curVal - ( ( this._valueMax() - this._valueMin() ) / this.numPages ) );
						break;
					case $.ui.keyCode.UP:
					case $.ui.keyCode.RIGHT:
						if ( curVal === this._valueMax() ) {
							return;
						}
						newVal = this._trimAlignValue( curVal + step );
						break;
					case $.ui.keyCode.DOWN:
					case $.ui.keyCode.LEFT:
						if ( curVal === this._valueMin() ) {
							return;
						}
						newVal = this._trimAlignValue( curVal - step );
						break;
				}

				this._slide( event, index, newVal );
			},
			keyup: function( event ) {
				var index = $( event.target ).data( "ui-slider-handle-index" );

				if ( this._keySliding ) {
					this._keySliding = false;
					this._stop( event, index );
					this._change( event, index );
					this._removeClass( $( event.target ), null, "ui-state-active" );
				}
			}
		}
	} );


	/*!
 * jQuery UI Sortable 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Sortable
//>>group: Interactions
//>>description: Enables items in a list to be sorted using the mouse.
//>>docs: http://api.jqueryui.com/sortable/
//>>demos: http://jqueryui.com/sortable/
//>>css.structure: ../../themes/base/sortable.css


	var widgetsSortable = $.widget( "ui.sortable", $.ui.mouse, {
		version: "1.13.0",
		widgetEventPrefix: "sort",
		ready: false,
		options: {
			appendTo: "parent",
			axis: false,
			connectWith: false,
			containment: false,
			cursor: "auto",
			cursorAt: false,
			dropOnEmpty: true,
			forcePlaceholderSize: false,
			forceHelperSize: false,
			grid: false,
			handle: false,
			helper: "original",
			items: "> *",
			opacity: false,
			placeholder: false,
			revert: false,
			scroll: true,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			scope: "default",
			tolerance: "intersect",
			zIndex: 1000,

			// Callbacks
			activate: null,
			beforeStop: null,
			change: null,
			deactivate: null,
			out: null,
			over: null,
			receive: null,
			remove: null,
			sort: null,
			start: null,
			stop: null,
			update: null
		},

		_isOverAxis: function( x, reference, size ) {
			return ( x >= reference ) && ( x < ( reference + size ) );
		},

		_isFloating: function( item ) {
			return ( /left|right/ ).test( item.css( "float" ) ) ||
				( /inline|table-cell/ ).test( item.css( "display" ) );
		},

		_create: function() {
			this.containerCache = {};
			this._addClass( "ui-sortable" );

			//Get the items
			this.refresh();

			//Let's determine the parent's offset
			this.offset = this.element.offset();

			//Initialize mouse events for interaction
			this._mouseInit();

			this._setHandleClassName();

			//We're ready to go
			this.ready = true;

		},

		_setOption: function( key, value ) {
			this._super( key, value );

			if ( key === "handle" ) {
				this._setHandleClassName();
			}
		},

		_setHandleClassName: function() {
			var that = this;
			this._removeClass( this.element.find( ".ui-sortable-handle" ), "ui-sortable-handle" );
			$.each( this.items, function() {
				that._addClass(
					this.instance.options.handle ?
						this.item.find( this.instance.options.handle ) :
						this.item,
					"ui-sortable-handle"
				);
			} );
		},

		_destroy: function() {
			this._mouseDestroy();

			for ( var i = this.items.length - 1; i >= 0; i-- ) {
				this.items[ i ].item.removeData( this.widgetName + "-item" );
			}

			return this;
		},

		_mouseCapture: function( event, overrideHandle ) {
			var currentItem = null,
				validHandle = false,
				that = this;

			if ( this.reverting ) {
				return false;
			}

			if ( this.options.disabled || this.options.type === "static" ) {
				return false;
			}

			//We have to refresh the items data once first
			this._refreshItems( event );

			//Find out if the clicked node (or one of its parents) is a actual item in this.items
			$( event.target ).parents().each( function() {
				if ( $.data( this, that.widgetName + "-item" ) === that ) {
					currentItem = $( this );
					return false;
				}
			} );
			if ( $.data( event.target, that.widgetName + "-item" ) === that ) {
				currentItem = $( event.target );
			}

			if ( !currentItem ) {
				return false;
			}
			if ( this.options.handle && !overrideHandle ) {
				$( this.options.handle, currentItem ).find( "*" ).addBack().each( function() {
					if ( this === event.target ) {
						validHandle = true;
					}
				} );
				if ( !validHandle ) {
					return false;
				}
			}

			this.currentItem = currentItem;
			this._removeCurrentsFromItems();
			return true;

		},

		_mouseStart: function( event, overrideHandle, noActivation ) {

			var i, body,
				o = this.options;

			this.currentContainer = this;

			//We only need to call refreshPositions, because the refreshItems call has been moved to
			// mouseCapture
			this.refreshPositions();

			//Prepare the dragged items parent
			this.appendTo = $( o.appendTo !== "parent" ?
				o.appendTo :
				this.currentItem.parent() );

			//Create and append the visible helper
			this.helper = this._createHelper( event );

			//Cache the helper size
			this._cacheHelperProportions();

			/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

			//Cache the margins of the original element
			this._cacheMargins();

			//The element's absolute position on the page minus margins
			this.offset = this.currentItem.offset();
			this.offset = {
				top: this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			};

			$.extend( this.offset, {
				click: { //Where the click happened, relative to the element
					left: event.pageX - this.offset.left,
					top: event.pageY - this.offset.top
				},

				// This is a relative to absolute position minus the actual position calculation -
				// only used for relative positioned helper
				relative: this._getRelativeOffset()
			} );

			// After we get the helper offset, but before we get the parent offset we can
			// change the helper's position to absolute
			// TODO: Still need to figure out a way to make relative sorting possible
			this.helper.css( "position", "absolute" );
			this.cssPosition = this.helper.css( "position" );

			//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
			if ( o.cursorAt ) {
				this._adjustOffsetFromHelper( o.cursorAt );
			}

			//Cache the former DOM position
			this.domPosition = {
				prev: this.currentItem.prev()[ 0 ],
				parent: this.currentItem.parent()[ 0 ]
			};

			// If the helper is not the original, hide the original so it's not playing any role during
			// the drag, won't cause anything bad this way
			if ( this.helper[ 0 ] !== this.currentItem[ 0 ] ) {
				this.currentItem.hide();
			}

			//Create the placeholder
			this._createPlaceholder();

			//Get the next scrolling parent
			this.scrollParent = this.placeholder.scrollParent();

			$.extend( this.offset, {
				parent: this._getParentOffset()
			} );

			//Set a containment if given in the options
			if ( o.containment ) {
				this._setContainment();
			}

			if ( o.cursor && o.cursor !== "auto" ) { // cursor option
				body = this.document.find( "body" );

				// Support: IE
				this.storedCursor = body.css( "cursor" );
				body.css( "cursor", o.cursor );

				this.storedStylesheet =
					$( "<style>*{ cursor: " + o.cursor + " !important; }</style>" ).appendTo( body );
			}

			// We need to make sure to grab the zIndex before setting the
			// opacity, because setting the opacity to anything lower than 1
			// causes the zIndex to change from "auto" to 0.
			if ( o.zIndex ) { // zIndex option
				if ( this.helper.css( "zIndex" ) ) {
					this._storedZIndex = this.helper.css( "zIndex" );
				}
				this.helper.css( "zIndex", o.zIndex );
			}

			if ( o.opacity ) { // opacity option
				if ( this.helper.css( "opacity" ) ) {
					this._storedOpacity = this.helper.css( "opacity" );
				}
				this.helper.css( "opacity", o.opacity );
			}

			//Prepare scrolling
			if ( this.scrollParent[ 0 ] !== this.document[ 0 ] &&
				this.scrollParent[ 0 ].tagName !== "HTML" ) {
				this.overflowOffset = this.scrollParent.offset();
			}

			//Call callbacks
			this._trigger( "start", event, this._uiHash() );

			//Recache the helper size
			if ( !this._preserveHelperProportions ) {
				this._cacheHelperProportions();
			}

			//Post "activate" events to possible containers
			if ( !noActivation ) {
				for ( i = this.containers.length - 1; i >= 0; i-- ) {
					this.containers[ i ]._trigger( "activate", event, this._uiHash( this ) );
				}
			}

			//Prepare possible droppables
			if ( $.ui.ddmanager ) {
				$.ui.ddmanager.current = this;
			}

			if ( $.ui.ddmanager && !o.dropBehaviour ) {
				$.ui.ddmanager.prepareOffsets( this, event );
			}

			this.dragging = true;

			this._addClass( this.helper, "ui-sortable-helper" );

			//Move the helper, if needed
			if ( !this.helper.parent().is( this.appendTo ) ) {
				this.helper.detach().appendTo( this.appendTo );

				//Update position
				this.offset.parent = this._getParentOffset();
			}

			//Generate the original position
			this.position = this.originalPosition = this._generatePosition( event );
			this.originalPageX = event.pageX;
			this.originalPageY = event.pageY;
			this.lastPositionAbs = this.positionAbs = this._convertPositionTo( "absolute" );

			this._mouseDrag( event );

			return true;

		},

		_scroll: function( event ) {
			var o = this.options,
				scrolled = false;

			if ( this.scrollParent[ 0 ] !== this.document[ 0 ] &&
				this.scrollParent[ 0 ].tagName !== "HTML" ) {

				if ( ( this.overflowOffset.top + this.scrollParent[ 0 ].offsetHeight ) -
					event.pageY < o.scrollSensitivity ) {
					this.scrollParent[ 0 ].scrollTop =
						scrolled = this.scrollParent[ 0 ].scrollTop + o.scrollSpeed;
				} else if ( event.pageY - this.overflowOffset.top < o.scrollSensitivity ) {
					this.scrollParent[ 0 ].scrollTop =
						scrolled = this.scrollParent[ 0 ].scrollTop - o.scrollSpeed;
				}

				if ( ( this.overflowOffset.left + this.scrollParent[ 0 ].offsetWidth ) -
					event.pageX < o.scrollSensitivity ) {
					this.scrollParent[ 0 ].scrollLeft = scrolled =
						this.scrollParent[ 0 ].scrollLeft + o.scrollSpeed;
				} else if ( event.pageX - this.overflowOffset.left < o.scrollSensitivity ) {
					this.scrollParent[ 0 ].scrollLeft = scrolled =
						this.scrollParent[ 0 ].scrollLeft - o.scrollSpeed;
				}

			} else {

				if ( event.pageY - this.document.scrollTop() < o.scrollSensitivity ) {
					scrolled = this.document.scrollTop( this.document.scrollTop() - o.scrollSpeed );
				} else if ( this.window.height() - ( event.pageY - this.document.scrollTop() ) <
					o.scrollSensitivity ) {
					scrolled = this.document.scrollTop( this.document.scrollTop() + o.scrollSpeed );
				}

				if ( event.pageX - this.document.scrollLeft() < o.scrollSensitivity ) {
					scrolled = this.document.scrollLeft(
						this.document.scrollLeft() - o.scrollSpeed
					);
				} else if ( this.window.width() - ( event.pageX - this.document.scrollLeft() ) <
					o.scrollSensitivity ) {
					scrolled = this.document.scrollLeft(
						this.document.scrollLeft() + o.scrollSpeed
					);
				}

			}

			return scrolled;
		},

		_mouseDrag: function( event ) {
			var i, item, itemElement, intersection,
				o = this.options;

			//Compute the helpers position
			this.position = this._generatePosition( event );
			this.positionAbs = this._convertPositionTo( "absolute" );

			//Set the helper position
			if ( !this.options.axis || this.options.axis !== "y" ) {
				this.helper[ 0 ].style.left = this.position.left + "px";
			}
			if ( !this.options.axis || this.options.axis !== "x" ) {
				this.helper[ 0 ].style.top = this.position.top + "px";
			}

			//Post events to containers
			this._contactContainers( event );

			if ( this.innermostContainer !== null ) {

				//Do scrolling
				if ( o.scroll ) {
					if ( this._scroll( event ) !== false ) {

						//Update item positions used in position checks
						this._refreshItemPositions( true );

						if ( $.ui.ddmanager && !o.dropBehaviour ) {
							$.ui.ddmanager.prepareOffsets( this, event );
						}
					}
				}

				this.dragDirection = {
					vertical: this._getDragVerticalDirection(),
					horizontal: this._getDragHorizontalDirection()
				};

				//Rearrange
				for ( i = this.items.length - 1; i >= 0; i-- ) {

					//Cache variables and intersection, continue if no intersection
					item = this.items[ i ];
					itemElement = item.item[ 0 ];
					intersection = this._intersectsWithPointer( item );
					if ( !intersection ) {
						continue;
					}

					// Only put the placeholder inside the current Container, skip all
					// items from other containers. This works because when moving
					// an item from one container to another the
					// currentContainer is switched before the placeholder is moved.
					//
					// Without this, moving items in "sub-sortables" can cause
					// the placeholder to jitter between the outer and inner container.
					if ( item.instance !== this.currentContainer ) {
						continue;
					}

					// Cannot intersect with itself
					// no useless actions that have been done before
					// no action if the item moved is the parent of the item checked
					if ( itemElement !== this.currentItem[ 0 ] &&
						this.placeholder[ intersection === 1 ?
							"next" : "prev" ]()[ 0 ] !== itemElement &&
						!$.contains( this.placeholder[ 0 ], itemElement ) &&
						( this.options.type === "semi-dynamic" ?
								!$.contains( this.element[ 0 ], itemElement ) :
								true
						)
					) {

						this.direction = intersection === 1 ? "down" : "up";

						if ( this.options.tolerance === "pointer" ||
							this._intersectsWithSides( item ) ) {
							this._rearrange( event, item );
						} else {
							break;
						}

						this._trigger( "change", event, this._uiHash() );
						break;
					}
				}
			}

			//Interconnect with droppables
			if ( $.ui.ddmanager ) {
				$.ui.ddmanager.drag( this, event );
			}

			//Call callbacks
			this._trigger( "sort", event, this._uiHash() );

			this.lastPositionAbs = this.positionAbs;
			return false;

		},

		_mouseStop: function( event, noPropagation ) {

			if ( !event ) {
				return;
			}

			//If we are using droppables, inform the manager about the drop
			if ( $.ui.ddmanager && !this.options.dropBehaviour ) {
				$.ui.ddmanager.drop( this, event );
			}

			if ( this.options.revert ) {
				var that = this,
					cur = this.placeholder.offset(),
					axis = this.options.axis,
					animation = {};

				if ( !axis || axis === "x" ) {
					animation.left = cur.left - this.offset.parent.left - this.margins.left +
						( this.offsetParent[ 0 ] === this.document[ 0 ].body ?
								0 :
								this.offsetParent[ 0 ].scrollLeft
						);
				}
				if ( !axis || axis === "y" ) {
					animation.top = cur.top - this.offset.parent.top - this.margins.top +
						( this.offsetParent[ 0 ] === this.document[ 0 ].body ?
								0 :
								this.offsetParent[ 0 ].scrollTop
						);
				}
				this.reverting = true;
				$( this.helper ).animate(
					animation,
					parseInt( this.options.revert, 10 ) || 500,
					function() {
						that._clear( event );
					}
				);
			} else {
				this._clear( event, noPropagation );
			}

			return false;

		},

		cancel: function() {

			if ( this.dragging ) {

				this._mouseUp( new $.Event( "mouseup", { target: null } ) );

				if ( this.options.helper === "original" ) {
					this.currentItem.css( this._storedCSS );
					this._removeClass( this.currentItem, "ui-sortable-helper" );
				} else {
					this.currentItem.show();
				}

				//Post deactivating events to containers
				for ( var i = this.containers.length - 1; i >= 0; i-- ) {
					this.containers[ i ]._trigger( "deactivate", null, this._uiHash( this ) );
					if ( this.containers[ i ].containerCache.over ) {
						this.containers[ i ]._trigger( "out", null, this._uiHash( this ) );
						this.containers[ i ].containerCache.over = 0;
					}
				}

			}

			if ( this.placeholder ) {

				//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately,
				// it unbinds ALL events from the original node!
				if ( this.placeholder[ 0 ].parentNode ) {
					this.placeholder[ 0 ].parentNode.removeChild( this.placeholder[ 0 ] );
				}
				if ( this.options.helper !== "original" && this.helper &&
					this.helper[ 0 ].parentNode ) {
					this.helper.remove();
				}

				$.extend( this, {
					helper: null,
					dragging: false,
					reverting: false,
					_noFinalSort: null
				} );

				if ( this.domPosition.prev ) {
					$( this.domPosition.prev ).after( this.currentItem );
				} else {
					$( this.domPosition.parent ).prepend( this.currentItem );
				}
			}

			return this;

		},

		serialize: function( o ) {

			var items = this._getItemsAsjQuery( o && o.connected ),
				str = [];
			o = o || {};

			$( items ).each( function() {
				var res = ( $( o.item || this ).attr( o.attribute || "id" ) || "" )
				.match( o.expression || ( /(.+)[\-=_](.+)/ ) );
				if ( res ) {
					str.push(
						( o.key || res[ 1 ] + "[]" ) +
						"=" + ( o.key && o.expression ? res[ 1 ] : res[ 2 ] ) );
				}
			} );

			if ( !str.length && o.key ) {
				str.push( o.key + "=" );
			}

			return str.join( "&" );

		},

		toArray: function( o ) {

			var items = this._getItemsAsjQuery( o && o.connected ),
				ret = [];

			o = o || {};

			items.each( function() {
				ret.push( $( o.item || this ).attr( o.attribute || "id" ) || "" );
			} );
			return ret;

		},

		/* Be careful with the following core functions */
		_intersectsWith: function( item ) {

			var x1 = this.positionAbs.left,
				x2 = x1 + this.helperProportions.width,
				y1 = this.positionAbs.top,
				y2 = y1 + this.helperProportions.height,
				l = item.left,
				r = l + item.width,
				t = item.top,
				b = t + item.height,
				dyClick = this.offset.click.top,
				dxClick = this.offset.click.left,
				isOverElementHeight = ( this.options.axis === "x" ) || ( ( y1 + dyClick ) > t &&
					( y1 + dyClick ) < b ),
				isOverElementWidth = ( this.options.axis === "y" ) || ( ( x1 + dxClick ) > l &&
					( x1 + dxClick ) < r ),
				isOverElement = isOverElementHeight && isOverElementWidth;

			if ( this.options.tolerance === "pointer" ||
				this.options.forcePointerForContainers ||
				( this.options.tolerance !== "pointer" &&
					this.helperProportions[ this.floating ? "width" : "height" ] >
					item[ this.floating ? "width" : "height" ] )
			) {
				return isOverElement;
			} else {

				return ( l < x1 + ( this.helperProportions.width / 2 ) && // Right Half
					x2 - ( this.helperProportions.width / 2 ) < r && // Left Half
					t < y1 + ( this.helperProportions.height / 2 ) && // Bottom Half
					y2 - ( this.helperProportions.height / 2 ) < b ); // Top Half

			}
		},

		_intersectsWithPointer: function( item ) {
			var verticalDirection, horizontalDirection,
				isOverElementHeight = ( this.options.axis === "x" ) ||
					this._isOverAxis(
						this.positionAbs.top + this.offset.click.top, item.top, item.height ),
				isOverElementWidth = ( this.options.axis === "y" ) ||
					this._isOverAxis(
						this.positionAbs.left + this.offset.click.left, item.left, item.width ),
				isOverElement = isOverElementHeight && isOverElementWidth;

			if ( !isOverElement ) {
				return false;
			}

			verticalDirection = this.dragDirection.vertical;
			horizontalDirection = this.dragDirection.horizontal;

			return this.floating ?
				( ( horizontalDirection === "right" || verticalDirection === "down" ) ? 2 : 1 ) :
				( verticalDirection && ( verticalDirection === "down" ? 2 : 1 ) );

		},

		_intersectsWithSides: function( item ) {

			var isOverBottomHalf = this._isOverAxis( this.positionAbs.top +
					this.offset.click.top, item.top + ( item.height / 2 ), item.height ),
				isOverRightHalf = this._isOverAxis( this.positionAbs.left +
					this.offset.click.left, item.left + ( item.width / 2 ), item.width ),
				verticalDirection = this.dragDirection.vertical,
				horizontalDirection = this.dragDirection.horizontal;

			if ( this.floating && horizontalDirection ) {
				return ( ( horizontalDirection === "right" && isOverRightHalf ) ||
					( horizontalDirection === "left" && !isOverRightHalf ) );
			} else {
				return verticalDirection && ( ( verticalDirection === "down" && isOverBottomHalf ) ||
					( verticalDirection === "up" && !isOverBottomHalf ) );
			}

		},

		_getDragVerticalDirection: function() {
			var delta = this.positionAbs.top - this.lastPositionAbs.top;
			return delta !== 0 && ( delta > 0 ? "down" : "up" );
		},

		_getDragHorizontalDirection: function() {
			var delta = this.positionAbs.left - this.lastPositionAbs.left;
			return delta !== 0 && ( delta > 0 ? "right" : "left" );
		},

		refresh: function( event ) {
			this._refreshItems( event );
			this._setHandleClassName();
			this.refreshPositions();
			return this;
		},

		_connectWith: function() {
			var options = this.options;
			return options.connectWith.constructor === String ?
				[ options.connectWith ] :
				options.connectWith;
		},

		_getItemsAsjQuery: function( connected ) {

			var i, j, cur, inst,
				items = [],
				queries = [],
				connectWith = this._connectWith();

			if ( connectWith && connected ) {
				for ( i = connectWith.length - 1; i >= 0; i-- ) {
					cur = $( connectWith[ i ], this.document[ 0 ] );
					for ( j = cur.length - 1; j >= 0; j-- ) {
						inst = $.data( cur[ j ], this.widgetFullName );
						if ( inst && inst !== this && !inst.options.disabled ) {
							queries.push( [ typeof inst.options.items === "function" ?
								inst.options.items.call( inst.element ) :
								$( inst.options.items, inst.element )
								.not( ".ui-sortable-helper" )
								.not( ".ui-sortable-placeholder" ), inst ] );
						}
					}
				}
			}

			queries.push( [ typeof this.options.items === "function" ?
				this.options.items
				.call( this.element, null, { options: this.options, item: this.currentItem } ) :
				$( this.options.items, this.element )
				.not( ".ui-sortable-helper" )
				.not( ".ui-sortable-placeholder" ), this ] );

			function addItems() {
				items.push( this );
			}
			for ( i = queries.length - 1; i >= 0; i-- ) {
				queries[ i ][ 0 ].each( addItems );
			}

			return $( items );

		},

		_removeCurrentsFromItems: function() {

			var list = this.currentItem.find( ":data(" + this.widgetName + "-item)" );

			this.items = $.grep( this.items, function( item ) {
				for ( var j = 0; j < list.length; j++ ) {
					if ( list[ j ] === item.item[ 0 ] ) {
						return false;
					}
				}
				return true;
			} );

		},

		_refreshItems: function( event ) {

			this.items = [];
			this.containers = [ this ];

			var i, j, cur, inst, targetData, _queries, item, queriesLength,
				items = this.items,
				queries = [ [ typeof this.options.items === "function" ?
					this.options.items.call( this.element[ 0 ], event, { item: this.currentItem } ) :
					$( this.options.items, this.element ), this ] ],
				connectWith = this._connectWith();

			//Shouldn't be run the first time through due to massive slow-down
			if ( connectWith && this.ready ) {
				for ( i = connectWith.length - 1; i >= 0; i-- ) {
					cur = $( connectWith[ i ], this.document[ 0 ] );
					for ( j = cur.length - 1; j >= 0; j-- ) {
						inst = $.data( cur[ j ], this.widgetFullName );
						if ( inst && inst !== this && !inst.options.disabled ) {
							queries.push( [ typeof inst.options.items === "function" ?
								inst.options.items
								.call( inst.element[ 0 ], event, { item: this.currentItem } ) :
								$( inst.options.items, inst.element ), inst ] );
							this.containers.push( inst );
						}
					}
				}
			}

			for ( i = queries.length - 1; i >= 0; i-- ) {
				targetData = queries[ i ][ 1 ];
				_queries = queries[ i ][ 0 ];

				for ( j = 0, queriesLength = _queries.length; j < queriesLength; j++ ) {
					item = $( _queries[ j ] );

					// Data for target checking (mouse manager)
					item.data( this.widgetName + "-item", targetData );

					items.push( {
						item: item,
						instance: targetData,
						width: 0, height: 0,
						left: 0, top: 0
					} );
				}
			}

		},

		_refreshItemPositions: function( fast ) {
			var i, item, t, p;

			for ( i = this.items.length - 1; i >= 0; i-- ) {
				item = this.items[ i ];

				//We ignore calculating positions of all connected containers when we're not over them
				if ( this.currentContainer && item.instance !== this.currentContainer &&
					item.item[ 0 ] !== this.currentItem[ 0 ] ) {
					continue;
				}

				t = this.options.toleranceElement ?
					$( this.options.toleranceElement, item.item ) :
					item.item;

				if ( !fast ) {
					item.width = t.outerWidth();
					item.height = t.outerHeight();
				}

				p = t.offset();
				item.left = p.left;
				item.top = p.top;
			}
		},

		refreshPositions: function( fast ) {

			// Determine whether items are being displayed horizontally
			this.floating = this.items.length ?
				this.options.axis === "x" || this._isFloating( this.items[ 0 ].item ) :
				false;

			if ( this.innermostContainer !== null ) {
				this._refreshItemPositions( fast );
			}

			var i, p;

			if ( this.options.custom && this.options.custom.refreshContainers ) {
				this.options.custom.refreshContainers.call( this );
			} else {
				for ( i = this.containers.length - 1; i >= 0; i-- ) {
					p = this.containers[ i ].element.offset();
					this.containers[ i ].containerCache.left = p.left;
					this.containers[ i ].containerCache.top = p.top;
					this.containers[ i ].containerCache.width =
						this.containers[ i ].element.outerWidth();
					this.containers[ i ].containerCache.height =
						this.containers[ i ].element.outerHeight();
				}
			}

			return this;
		},

		_createPlaceholder: function( that ) {
			that = that || this;
			var className, nodeName,
				o = that.options;

			if ( !o.placeholder || o.placeholder.constructor === String ) {
				className = o.placeholder;
				nodeName = that.currentItem[ 0 ].nodeName.toLowerCase();
				o.placeholder = {
					element: function() {

						var element = $( "<" + nodeName + ">", that.document[ 0 ] );

						that._addClass( element, "ui-sortable-placeholder",
							className || that.currentItem[ 0 ].className )
						._removeClass( element, "ui-sortable-helper" );

						if ( nodeName === "tbody" ) {
							that._createTrPlaceholder(
								that.currentItem.find( "tr" ).eq( 0 ),
								$( "<tr>", that.document[ 0 ] ).appendTo( element )
							);
						} else if ( nodeName === "tr" ) {
							that._createTrPlaceholder( that.currentItem, element );
						} else if ( nodeName === "img" ) {
							element.attr( "src", that.currentItem.attr( "src" ) );
						}

						if ( !className ) {
							element.css( "visibility", "hidden" );
						}

						return element;
					},
					update: function( container, p ) {

						// 1. If a className is set as 'placeholder option, we don't force sizes -
						// the class is responsible for that
						// 2. The option 'forcePlaceholderSize can be enabled to force it even if a
						// class name is specified
						if ( className && !o.forcePlaceholderSize ) {
							return;
						}

						// If the element doesn't have a actual height or width by itself (without
						// styles coming from a stylesheet), it receives the inline height and width
						// from the dragged item. Or, if it's a tbody or tr, it's going to have a height
						// anyway since we're populating them with <td>s above, but they're unlikely to
						// be the correct height on their own if the row heights are dynamic, so we'll
						// always assign the height of the dragged item given forcePlaceholderSize
						// is true.
						if ( !p.height() || ( o.forcePlaceholderSize &&
							( nodeName === "tbody" || nodeName === "tr" ) ) ) {
							p.height(
								that.currentItem.innerHeight() -
								parseInt( that.currentItem.css( "paddingTop" ) || 0, 10 ) -
								parseInt( that.currentItem.css( "paddingBottom" ) || 0, 10 ) );
						}
						if ( !p.width() ) {
							p.width(
								that.currentItem.innerWidth() -
								parseInt( that.currentItem.css( "paddingLeft" ) || 0, 10 ) -
								parseInt( that.currentItem.css( "paddingRight" ) || 0, 10 ) );
						}
					}
				};
			}

			//Create the placeholder
			that.placeholder = $( o.placeholder.element.call( that.element, that.currentItem ) );

			//Append it after the actual current item
			that.currentItem.after( that.placeholder );

			//Update the size of the placeholder (TODO: Logic to fuzzy, see line 316/317)
			o.placeholder.update( that, that.placeholder );

		},

		_createTrPlaceholder: function( sourceTr, targetTr ) {
			var that = this;

			sourceTr.children().each( function() {
				$( "<td>&#160;</td>", that.document[ 0 ] )
				.attr( "colspan", $( this ).attr( "colspan" ) || 1 )
				.appendTo( targetTr );
			} );
		},

		_contactContainers: function( event ) {
			var i, j, dist, itemWithLeastDistance, posProperty, sizeProperty, cur, nearBottom,
				floating, axis,
				innermostContainer = null,
				innermostIndex = null;

			// Get innermost container that intersects with item
			for ( i = this.containers.length - 1; i >= 0; i-- ) {

				// Never consider a container that's located within the item itself
				if ( $.contains( this.currentItem[ 0 ], this.containers[ i ].element[ 0 ] ) ) {
					continue;
				}

				if ( this._intersectsWith( this.containers[ i ].containerCache ) ) {

					// If we've already found a container and it's more "inner" than this, then continue
					if ( innermostContainer &&
						$.contains(
							this.containers[ i ].element[ 0 ],
							innermostContainer.element[ 0 ] ) ) {
						continue;
					}

					innermostContainer = this.containers[ i ];
					innermostIndex = i;

				} else {

					// container doesn't intersect. trigger "out" event if necessary
					if ( this.containers[ i ].containerCache.over ) {
						this.containers[ i ]._trigger( "out", event, this._uiHash( this ) );
						this.containers[ i ].containerCache.over = 0;
					}
				}

			}

			this.innermostContainer = innermostContainer;

			// If no intersecting containers found, return
			if ( !innermostContainer ) {
				return;
			}

			// Move the item into the container if it's not there already
			if ( this.containers.length === 1 ) {
				if ( !this.containers[ innermostIndex ].containerCache.over ) {
					this.containers[ innermostIndex ]._trigger( "over", event, this._uiHash( this ) );
					this.containers[ innermostIndex ].containerCache.over = 1;
				}
			} else {

				// When entering a new container, we will find the item with the least distance and
				// append our item near it
				dist = 10000;
				itemWithLeastDistance = null;
				floating = innermostContainer.floating || this._isFloating( this.currentItem );
				posProperty = floating ? "left" : "top";
				sizeProperty = floating ? "width" : "height";
				axis = floating ? "pageX" : "pageY";

				for ( j = this.items.length - 1; j >= 0; j-- ) {
					if ( !$.contains(
						this.containers[ innermostIndex ].element[ 0 ], this.items[ j ].item[ 0 ] )
					) {
						continue;
					}
					if ( this.items[ j ].item[ 0 ] === this.currentItem[ 0 ] ) {
						continue;
					}

					cur = this.items[ j ].item.offset()[ posProperty ];
					nearBottom = false;
					if ( event[ axis ] - cur > this.items[ j ][ sizeProperty ] / 2 ) {
						nearBottom = true;
					}

					if ( Math.abs( event[ axis ] - cur ) < dist ) {
						dist = Math.abs( event[ axis ] - cur );
						itemWithLeastDistance = this.items[ j ];
						this.direction = nearBottom ? "up" : "down";
					}
				}

				//Check if dropOnEmpty is enabled
				if ( !itemWithLeastDistance && !this.options.dropOnEmpty ) {
					return;
				}

				if ( this.currentContainer === this.containers[ innermostIndex ] ) {
					if ( !this.currentContainer.containerCache.over ) {
						this.containers[ innermostIndex ]._trigger( "over", event, this._uiHash() );
						this.currentContainer.containerCache.over = 1;
					}
					return;
				}

				if ( itemWithLeastDistance ) {
					this._rearrange( event, itemWithLeastDistance, null, true );
				} else {
					this._rearrange( event, null, this.containers[ innermostIndex ].element, true );
				}
				this._trigger( "change", event, this._uiHash() );
				this.containers[ innermostIndex ]._trigger( "change", event, this._uiHash( this ) );
				this.currentContainer = this.containers[ innermostIndex ];

				//Update the placeholder
				this.options.placeholder.update( this.currentContainer, this.placeholder );

				//Update scrollParent
				this.scrollParent = this.placeholder.scrollParent();

				//Update overflowOffset
				if ( this.scrollParent[ 0 ] !== this.document[ 0 ] &&
					this.scrollParent[ 0 ].tagName !== "HTML" ) {
					this.overflowOffset = this.scrollParent.offset();
				}

				this.containers[ innermostIndex ]._trigger( "over", event, this._uiHash( this ) );
				this.containers[ innermostIndex ].containerCache.over = 1;
			}

		},

		_createHelper: function( event ) {

			var o = this.options,
				helper = typeof o.helper === "function" ?
					$( o.helper.apply( this.element[ 0 ], [ event, this.currentItem ] ) ) :
					( o.helper === "clone" ? this.currentItem.clone() : this.currentItem );

			//Add the helper to the DOM if that didn't happen already
			if ( !helper.parents( "body" ).length ) {
				this.appendTo[ 0 ].appendChild( helper[ 0 ] );
			}

			if ( helper[ 0 ] === this.currentItem[ 0 ] ) {
				this._storedCSS = {
					width: this.currentItem[ 0 ].style.width,
					height: this.currentItem[ 0 ].style.height,
					position: this.currentItem.css( "position" ),
					top: this.currentItem.css( "top" ),
					left: this.currentItem.css( "left" )
				};
			}

			if ( !helper[ 0 ].style.width || o.forceHelperSize ) {
				helper.width( this.currentItem.width() );
			}
			if ( !helper[ 0 ].style.height || o.forceHelperSize ) {
				helper.height( this.currentItem.height() );
			}

			return helper;

		},

		_adjustOffsetFromHelper: function( obj ) {
			if ( typeof obj === "string" ) {
				obj = obj.split( " " );
			}
			if ( Array.isArray( obj ) ) {
				obj = { left: +obj[ 0 ], top: +obj[ 1 ] || 0 };
			}
			if ( "left" in obj ) {
				this.offset.click.left = obj.left + this.margins.left;
			}
			if ( "right" in obj ) {
				this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
			}
			if ( "top" in obj ) {
				this.offset.click.top = obj.top + this.margins.top;
			}
			if ( "bottom" in obj ) {
				this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
			}
		},

		_getParentOffset: function() {

			//Get the offsetParent and cache its position
			this.offsetParent = this.helper.offsetParent();
			var po = this.offsetParent.offset();

			// This is a special case where we need to modify a offset calculated on start, since the
			// following happened:
			// 1. The position of the helper is absolute, so it's position is calculated based on the
			// next positioned parent
			// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't
			// the document, which means that the scroll is included in the initial calculation of the
			// offset of the parent, and never recalculated upon drag
			if ( this.cssPosition === "absolute" && this.scrollParent[ 0 ] !== this.document[ 0 ] &&
				$.contains( this.scrollParent[ 0 ], this.offsetParent[ 0 ] ) ) {
				po.left += this.scrollParent.scrollLeft();
				po.top += this.scrollParent.scrollTop();
			}

			// This needs to be actually done for all browsers, since pageX/pageY includes this
			// information with an ugly IE fix
			if ( this.offsetParent[ 0 ] === this.document[ 0 ].body ||
				( this.offsetParent[ 0 ].tagName &&
					this.offsetParent[ 0 ].tagName.toLowerCase() === "html" && $.ui.ie ) ) {
				po = { top: 0, left: 0 };
			}

			return {
				top: po.top + ( parseInt( this.offsetParent.css( "borderTopWidth" ), 10 ) || 0 ),
				left: po.left + ( parseInt( this.offsetParent.css( "borderLeftWidth" ), 10 ) || 0 )
			};

		},

		_getRelativeOffset: function() {

			if ( this.cssPosition === "relative" ) {
				var p = this.currentItem.position();
				return {
					top: p.top - ( parseInt( this.helper.css( "top" ), 10 ) || 0 ) +
						this.scrollParent.scrollTop(),
					left: p.left - ( parseInt( this.helper.css( "left" ), 10 ) || 0 ) +
						this.scrollParent.scrollLeft()
				};
			} else {
				return { top: 0, left: 0 };
			}

		},

		_cacheMargins: function() {
			this.margins = {
				left: ( parseInt( this.currentItem.css( "marginLeft" ), 10 ) || 0 ),
				top: ( parseInt( this.currentItem.css( "marginTop" ), 10 ) || 0 )
			};
		},

		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			};
		},

		_setContainment: function() {

			var ce, co, over,
				o = this.options;
			if ( o.containment === "parent" ) {
				o.containment = this.helper[ 0 ].parentNode;
			}
			if ( o.containment === "document" || o.containment === "window" ) {
				this.containment = [
					0 - this.offset.relative.left - this.offset.parent.left,
					0 - this.offset.relative.top - this.offset.parent.top,
					o.containment === "document" ?
						this.document.width() :
						this.window.width() - this.helperProportions.width - this.margins.left,
					( o.containment === "document" ?
							( this.document.height() || document.body.parentNode.scrollHeight ) :
							this.window.height() || this.document[ 0 ].body.parentNode.scrollHeight
					) - this.helperProportions.height - this.margins.top
				];
			}

			if ( !( /^(document|window|parent)$/ ).test( o.containment ) ) {
				ce = $( o.containment )[ 0 ];
				co = $( o.containment ).offset();
				over = ( $( ce ).css( "overflow" ) !== "hidden" );

				this.containment = [
					co.left + ( parseInt( $( ce ).css( "borderLeftWidth" ), 10 ) || 0 ) +
					( parseInt( $( ce ).css( "paddingLeft" ), 10 ) || 0 ) - this.margins.left,
					co.top + ( parseInt( $( ce ).css( "borderTopWidth" ), 10 ) || 0 ) +
					( parseInt( $( ce ).css( "paddingTop" ), 10 ) || 0 ) - this.margins.top,
					co.left + ( over ? Math.max( ce.scrollWidth, ce.offsetWidth ) : ce.offsetWidth ) -
					( parseInt( $( ce ).css( "borderLeftWidth" ), 10 ) || 0 ) -
					( parseInt( $( ce ).css( "paddingRight" ), 10 ) || 0 ) -
					this.helperProportions.width - this.margins.left,
					co.top + ( over ? Math.max( ce.scrollHeight, ce.offsetHeight ) : ce.offsetHeight ) -
					( parseInt( $( ce ).css( "borderTopWidth" ), 10 ) || 0 ) -
					( parseInt( $( ce ).css( "paddingBottom" ), 10 ) || 0 ) -
					this.helperProportions.height - this.margins.top
				];
			}

		},

		_convertPositionTo: function( d, pos ) {

			if ( !pos ) {
				pos = this.position;
			}
			var mod = d === "absolute" ? 1 : -1,
				scroll = this.cssPosition === "absolute" &&
				!( this.scrollParent[ 0 ] !== this.document[ 0 ] &&
					$.contains( this.scrollParent[ 0 ], this.offsetParent[ 0 ] ) ) ?
					this.offsetParent :
					this.scrollParent,
				scrollIsRootNode = ( /(html|body)/i ).test( scroll[ 0 ].tagName );

			return {
				top: (

					// The absolute mouse position
					pos.top	+

					// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.relative.top * mod +

					// The offsetParent's offset without borders (offset + border)
					this.offset.parent.top * mod -
					( ( this.cssPosition === "fixed" ?
						-this.scrollParent.scrollTop() :
						( scrollIsRootNode ? 0 : scroll.scrollTop() ) ) * mod )
				),
				left: (

					// The absolute mouse position
					pos.left +

					// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.relative.left * mod +

					// The offsetParent's offset without borders (offset + border)
					this.offset.parent.left * mod	-
					( ( this.cssPosition === "fixed" ?
						-this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 :
							scroll.scrollLeft() ) * mod )
				)
			};

		},

		_generatePosition: function( event ) {

			var top, left,
				o = this.options,
				pageX = event.pageX,
				pageY = event.pageY,
				scroll = this.cssPosition === "absolute" &&
				!( this.scrollParent[ 0 ] !== this.document[ 0 ] &&
					$.contains( this.scrollParent[ 0 ], this.offsetParent[ 0 ] ) ) ?
					this.offsetParent :
					this.scrollParent,
				scrollIsRootNode = ( /(html|body)/i ).test( scroll[ 0 ].tagName );

			// This is another very weird special case that only happens for relative elements:
			// 1. If the css position is relative
			// 2. and the scroll parent is the document or similar to the offset parent
			// we have to refresh the relative offset during the scroll so there are no jumps
			if ( this.cssPosition === "relative" && !( this.scrollParent[ 0 ] !== this.document[ 0 ] &&
				this.scrollParent[ 0 ] !== this.offsetParent[ 0 ] ) ) {
				this.offset.relative = this._getRelativeOffset();
			}

			/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

			if ( this.originalPosition ) { //If we are not dragging yet, we won't check for options

				if ( this.containment ) {
					if ( event.pageX - this.offset.click.left < this.containment[ 0 ] ) {
						pageX = this.containment[ 0 ] + this.offset.click.left;
					}
					if ( event.pageY - this.offset.click.top < this.containment[ 1 ] ) {
						pageY = this.containment[ 1 ] + this.offset.click.top;
					}
					if ( event.pageX - this.offset.click.left > this.containment[ 2 ] ) {
						pageX = this.containment[ 2 ] + this.offset.click.left;
					}
					if ( event.pageY - this.offset.click.top > this.containment[ 3 ] ) {
						pageY = this.containment[ 3 ] + this.offset.click.top;
					}
				}

				if ( o.grid ) {
					top = this.originalPageY + Math.round( ( pageY - this.originalPageY ) /
						o.grid[ 1 ] ) * o.grid[ 1 ];
					pageY = this.containment ?
						( ( top - this.offset.click.top >= this.containment[ 1 ] &&
							top - this.offset.click.top <= this.containment[ 3 ] ) ?
							top :
							( ( top - this.offset.click.top >= this.containment[ 1 ] ) ?
								top - o.grid[ 1 ] : top + o.grid[ 1 ] ) ) :
						top;

					left = this.originalPageX + Math.round( ( pageX - this.originalPageX ) /
						o.grid[ 0 ] ) * o.grid[ 0 ];
					pageX = this.containment ?
						( ( left - this.offset.click.left >= this.containment[ 0 ] &&
							left - this.offset.click.left <= this.containment[ 2 ] ) ?
							left :
							( ( left - this.offset.click.left >= this.containment[ 0 ] ) ?
								left - o.grid[ 0 ] : left + o.grid[ 0 ] ) ) :
						left;
				}

			}

			return {
				top: (

					// The absolute mouse position
					pageY -

					// Click offset (relative to the element)
					this.offset.click.top -

					// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.relative.top -

					// The offsetParent's offset without borders (offset + border)
					this.offset.parent.top +
					( ( this.cssPosition === "fixed" ?
						-this.scrollParent.scrollTop() :
						( scrollIsRootNode ? 0 : scroll.scrollTop() ) ) )
				),
				left: (

					// The absolute mouse position
					pageX -

					// Click offset (relative to the element)
					this.offset.click.left -

					// Only for relative positioned nodes: Relative offset from element to offset parent
					this.offset.relative.left -

					// The offsetParent's offset without borders (offset + border)
					this.offset.parent.left +
					( ( this.cssPosition === "fixed" ?
						-this.scrollParent.scrollLeft() :
						scrollIsRootNode ? 0 : scroll.scrollLeft() ) )
				)
			};

		},

		_rearrange: function( event, i, a, hardRefresh ) {

			if ( a ) {
				a[ 0 ].appendChild( this.placeholder[ 0 ] );
			} else {
				i.item[ 0 ].parentNode.insertBefore( this.placeholder[ 0 ],
					( this.direction === "down" ? i.item[ 0 ] : i.item[ 0 ].nextSibling ) );
			}

			//Various things done here to improve the performance:
			// 1. we create a setTimeout, that calls refreshPositions
			// 2. on the instance, we have a counter variable, that get's higher after every append
			// 3. on the local scope, we copy the counter variable, and check in the timeout,
			// if it's still the same
			// 4. this lets only the last addition to the timeout stack through
			this.counter = this.counter ? ++this.counter : 1;
			var counter = this.counter;

			this._delay( function() {
				if ( counter === this.counter ) {

					//Precompute after each DOM insertion, NOT on mousemove
					this.refreshPositions( !hardRefresh );
				}
			} );

		},

		_clear: function( event, noPropagation ) {

			this.reverting = false;

			// We delay all events that have to be triggered to after the point where the placeholder
			// has been removed and everything else normalized again
			var i,
				delayedTriggers = [];

			// We first have to update the dom position of the actual currentItem
			// Note: don't do it if the current item is already removed (by a user), or it gets
			// reappended (see #4088)
			if ( !this._noFinalSort && this.currentItem.parent().length ) {
				this.placeholder.before( this.currentItem );
			}
			this._noFinalSort = null;

			if ( this.helper[ 0 ] === this.currentItem[ 0 ] ) {
				for ( i in this._storedCSS ) {
					if ( this._storedCSS[ i ] === "auto" || this._storedCSS[ i ] === "static" ) {
						this._storedCSS[ i ] = "";
					}
				}
				this.currentItem.css( this._storedCSS );
				this._removeClass( this.currentItem, "ui-sortable-helper" );
			} else {
				this.currentItem.show();
			}

			if ( this.fromOutside && !noPropagation ) {
				delayedTriggers.push( function( event ) {
					this._trigger( "receive", event, this._uiHash( this.fromOutside ) );
				} );
			}
			if ( ( this.fromOutside ||
				this.domPosition.prev !==
				this.currentItem.prev().not( ".ui-sortable-helper" )[ 0 ] ||
				this.domPosition.parent !== this.currentItem.parent()[ 0 ] ) && !noPropagation ) {

				// Trigger update callback if the DOM position has changed
				delayedTriggers.push( function( event ) {
					this._trigger( "update", event, this._uiHash() );
				} );
			}

			// Check if the items Container has Changed and trigger appropriate
			// events.
			if ( this !== this.currentContainer ) {
				if ( !noPropagation ) {
					delayedTriggers.push( function( event ) {
						this._trigger( "remove", event, this._uiHash() );
					} );
					delayedTriggers.push( ( function( c ) {
						return function( event ) {
							c._trigger( "receive", event, this._uiHash( this ) );
						};
					} ).call( this, this.currentContainer ) );
					delayedTriggers.push( ( function( c ) {
						return function( event ) {
							c._trigger( "update", event, this._uiHash( this ) );
						};
					} ).call( this, this.currentContainer ) );
				}
			}

			//Post events to containers
			function delayEvent( type, instance, container ) {
				return function( event ) {
					container._trigger( type, event, instance._uiHash( instance ) );
				};
			}
			for ( i = this.containers.length - 1; i >= 0; i-- ) {
				if ( !noPropagation ) {
					delayedTriggers.push( delayEvent( "deactivate", this, this.containers[ i ] ) );
				}
				if ( this.containers[ i ].containerCache.over ) {
					delayedTriggers.push( delayEvent( "out", this, this.containers[ i ] ) );
					this.containers[ i ].containerCache.over = 0;
				}
			}

			//Do what was originally in plugins
			if ( this.storedCursor ) {
				this.document.find( "body" ).css( "cursor", this.storedCursor );
				this.storedStylesheet.remove();
			}
			if ( this._storedOpacity ) {
				this.helper.css( "opacity", this._storedOpacity );
			}
			if ( this._storedZIndex ) {
				this.helper.css( "zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex );
			}

			this.dragging = false;

			if ( !noPropagation ) {
				this._trigger( "beforeStop", event, this._uiHash() );
			}

			//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately,
			// it unbinds ALL events from the original node!
			this.placeholder[ 0 ].parentNode.removeChild( this.placeholder[ 0 ] );

			if ( !this.cancelHelperRemoval ) {
				if ( this.helper[ 0 ] !== this.currentItem[ 0 ] ) {
					this.helper.remove();
				}
				this.helper = null;
			}

			if ( !noPropagation ) {
				for ( i = 0; i < delayedTriggers.length; i++ ) {

					// Trigger all delayed events
					delayedTriggers[ i ].call( this, event );
				}
				this._trigger( "stop", event, this._uiHash() );
			}

			this.fromOutside = false;
			return !this.cancelHelperRemoval;

		},

		_trigger: function() {
			if ( $.Widget.prototype._trigger.apply( this, arguments ) === false ) {
				this.cancel();
			}
		},

		_uiHash: function( _inst ) {
			var inst = _inst || this;
			return {
				helper: inst.helper,
				placeholder: inst.placeholder || $( [] ),
				position: inst.position,
				originalPosition: inst.originalPosition,
				offset: inst.positionAbs,
				item: inst.currentItem,
				sender: _inst ? _inst.element : null
			};
		}

	} );


	/*!
 * jQuery UI Spinner 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Spinner
//>>group: Widgets
//>>description: Displays buttons to easily input numbers via the keyboard or mouse.
//>>docs: http://api.jqueryui.com/spinner/
//>>demos: http://jqueryui.com/spinner/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/spinner.css
//>>css.theme: ../../themes/base/theme.css


	function spinnerModifier( fn ) {
		return function() {
			var previous = this.element.val();
			fn.apply( this, arguments );
			this._refresh();
			if ( previous !== this.element.val() ) {
				this._trigger( "change" );
			}
		};
	}

	$.widget( "ui.spinner", {
		version: "1.13.0",
		defaultElement: "<input>",
		widgetEventPrefix: "spin",
		options: {
			classes: {
				"ui-spinner": "ui-corner-all",
				"ui-spinner-down": "ui-corner-br",
				"ui-spinner-up": "ui-corner-tr"
			},
			culture: null,
			icons: {
				down: "ui-icon-triangle-1-s",
				up: "ui-icon-triangle-1-n"
			},
			incremental: true,
			max: null,
			min: null,
			numberFormat: null,
			page: 10,
			step: 1,

			change: null,
			spin: null,
			start: null,
			stop: null
		},

		_create: function() {

			// handle string values that need to be parsed
			this._setOption( "max", this.options.max );
			this._setOption( "min", this.options.min );
			this._setOption( "step", this.options.step );

			// Only format if there is a value, prevents the field from being marked
			// as invalid in Firefox, see #9573.
			if ( this.value() !== "" ) {

				// Format the value, but don't constrain.
				this._value( this.element.val(), true );
			}

			this._draw();
			this._on( this._events );
			this._refresh();

			// Turning off autocomplete prevents the browser from remembering the
			// value when navigating through history, so we re-enable autocomplete
			// if the page is unloaded before the widget is destroyed. #7790
			this._on( this.window, {
				beforeunload: function() {
					this.element.removeAttr( "autocomplete" );
				}
			} );
		},

		_getCreateOptions: function() {
			var options = this._super();
			var element = this.element;

			$.each( [ "min", "max", "step" ], function( i, option ) {
				var value = element.attr( option );
				if ( value != null && value.length ) {
					options[ option ] = value;
				}
			} );

			return options;
		},

		_events: {
			keydown: function( event ) {
				if ( this._start( event ) && this._keydown( event ) ) {
					event.preventDefault();
				}
			},
			keyup: "_stop",
			focus: function() {
				this.previous = this.element.val();
			},
			blur: function( event ) {
				if ( this.cancelBlur ) {
					delete this.cancelBlur;
					return;
				}

				this._stop();
				this._refresh();
				if ( this.previous !== this.element.val() ) {
					this._trigger( "change", event );
				}
			},
			mousewheel: function( event, delta ) {
				var activeElement = $.ui.safeActiveElement( this.document[ 0 ] );
				var isActive = this.element[ 0 ] === activeElement;

				if ( !isActive || !delta ) {
					return;
				}

				if ( !this.spinning && !this._start( event ) ) {
					return false;
				}

				this._spin( ( delta > 0 ? 1 : -1 ) * this.options.step, event );
				clearTimeout( this.mousewheelTimer );
				this.mousewheelTimer = this._delay( function() {
					if ( this.spinning ) {
						this._stop( event );
					}
				}, 100 );
				event.preventDefault();
			},
			"mousedown .ui-spinner-button": function( event ) {
				var previous;

				// We never want the buttons to have focus; whenever the user is
				// interacting with the spinner, the focus should be on the input.
				// If the input is focused then this.previous is properly set from
				// when the input first received focus. If the input is not focused
				// then we need to set this.previous based on the value before spinning.
				previous = this.element[ 0 ] === $.ui.safeActiveElement( this.document[ 0 ] ) ?
					this.previous : this.element.val();
				function checkFocus() {
					var isActive = this.element[ 0 ] === $.ui.safeActiveElement( this.document[ 0 ] );
					if ( !isActive ) {
						this.element.trigger( "focus" );
						this.previous = previous;

						// support: IE
						// IE sets focus asynchronously, so we need to check if focus
						// moved off of the input because the user clicked on the button.
						this._delay( function() {
							this.previous = previous;
						} );
					}
				}

				// Ensure focus is on (or stays on) the text field
				event.preventDefault();
				checkFocus.call( this );

				// Support: IE
				// IE doesn't prevent moving focus even with event.preventDefault()
				// so we set a flag to know when we should ignore the blur event
				// and check (again) if focus moved off of the input.
				this.cancelBlur = true;
				this._delay( function() {
					delete this.cancelBlur;
					checkFocus.call( this );
				} );

				if ( this._start( event ) === false ) {
					return;
				}

				this._repeat( null, $( event.currentTarget )
				.hasClass( "ui-spinner-up" ) ? 1 : -1, event );
			},
			"mouseup .ui-spinner-button": "_stop",
			"mouseenter .ui-spinner-button": function( event ) {

				// button will add ui-state-active if mouse was down while mouseleave and kept down
				if ( !$( event.currentTarget ).hasClass( "ui-state-active" ) ) {
					return;
				}

				if ( this._start( event ) === false ) {
					return false;
				}
				this._repeat( null, $( event.currentTarget )
				.hasClass( "ui-spinner-up" ) ? 1 : -1, event );
			},

			// TODO: do we really want to consider this a stop?
			// shouldn't we just stop the repeater and wait until mouseup before
			// we trigger the stop event?
			"mouseleave .ui-spinner-button": "_stop"
		},

		// Support mobile enhanced option and make backcompat more sane
		_enhance: function() {
			this.uiSpinner = this.element
			.attr( "autocomplete", "off" )
			.wrap( "<span>" )
			.parent()

			// Add buttons
			.append(
				"<a></a><a></a>"
			);
		},

		_draw: function() {
			this._enhance();

			this._addClass( this.uiSpinner, "ui-spinner", "ui-widget ui-widget-content" );
			this._addClass( "ui-spinner-input" );

			this.element.attr( "role", "spinbutton" );

			// Button bindings
			this.buttons = this.uiSpinner.children( "a" )
			.attr( "tabIndex", -1 )
			.attr( "aria-hidden", true )
			.button( {
				classes: {
					"ui-button": ""
				}
			} );

			// TODO: Right now button does not support classes this is already updated in button PR
			this._removeClass( this.buttons, "ui-corner-all" );

			this._addClass( this.buttons.first(), "ui-spinner-button ui-spinner-up" );
			this._addClass( this.buttons.last(), "ui-spinner-button ui-spinner-down" );
			this.buttons.first().button( {
				"icon": this.options.icons.up,
				"showLabel": false
			} );
			this.buttons.last().button( {
				"icon": this.options.icons.down,
				"showLabel": false
			} );

			// IE 6 doesn't understand height: 50% for the buttons
			// unless the wrapper has an explicit height
			if ( this.buttons.height() > Math.ceil( this.uiSpinner.height() * 0.5 ) &&
				this.uiSpinner.height() > 0 ) {
				this.uiSpinner.height( this.uiSpinner.height() );
			}
		},

		_keydown: function( event ) {
			var options = this.options,
				keyCode = $.ui.keyCode;

			switch ( event.keyCode ) {
				case keyCode.UP:
					this._repeat( null, 1, event );
					return true;
				case keyCode.DOWN:
					this._repeat( null, -1, event );
					return true;
				case keyCode.PAGE_UP:
					this._repeat( null, options.page, event );
					return true;
				case keyCode.PAGE_DOWN:
					this._repeat( null, -options.page, event );
					return true;
			}

			return false;
		},

		_start: function( event ) {
			if ( !this.spinning && this._trigger( "start", event ) === false ) {
				return false;
			}

			if ( !this.counter ) {
				this.counter = 1;
			}
			this.spinning = true;
			return true;
		},

		_repeat: function( i, steps, event ) {
			i = i || 500;

			clearTimeout( this.timer );
			this.timer = this._delay( function() {
				this._repeat( 40, steps, event );
			}, i );

			this._spin( steps * this.options.step, event );
		},

		_spin: function( step, event ) {
			var value = this.value() || 0;

			if ( !this.counter ) {
				this.counter = 1;
			}

			value = this._adjustValue( value + step * this._increment( this.counter ) );

			if ( !this.spinning || this._trigger( "spin", event, { value: value } ) !== false ) {
				this._value( value );
				this.counter++;
			}
		},

		_increment: function( i ) {
			var incremental = this.options.incremental;

			if ( incremental ) {
				return typeof incremental === "function" ?
					incremental( i ) :
					Math.floor( i * i * i / 50000 - i * i / 500 + 17 * i / 200 + 1 );
			}

			return 1;
		},

		_precision: function() {
			var precision = this._precisionOf( this.options.step );
			if ( this.options.min !== null ) {
				precision = Math.max( precision, this._precisionOf( this.options.min ) );
			}
			return precision;
		},

		_precisionOf: function( num ) {
			var str = num.toString(),
				decimal = str.indexOf( "." );
			return decimal === -1 ? 0 : str.length - decimal - 1;
		},

		_adjustValue: function( value ) {
			var base, aboveMin,
				options = this.options;

			// Make sure we're at a valid step
			// - find out where we are relative to the base (min or 0)
			base = options.min !== null ? options.min : 0;
			aboveMin = value - base;

			// - round to the nearest step
			aboveMin = Math.round( aboveMin / options.step ) * options.step;

			// - rounding is based on 0, so adjust back to our base
			value = base + aboveMin;

			// Fix precision from bad JS floating point math
			value = parseFloat( value.toFixed( this._precision() ) );

			// Clamp the value
			if ( options.max !== null && value > options.max ) {
				return options.max;
			}
			if ( options.min !== null && value < options.min ) {
				return options.min;
			}

			return value;
		},

		_stop: function( event ) {
			if ( !this.spinning ) {
				return;
			}

			clearTimeout( this.timer );
			clearTimeout( this.mousewheelTimer );
			this.counter = 0;
			this.spinning = false;
			this._trigger( "stop", event );
		},

		_setOption: function( key, value ) {
			var prevValue, first, last;

			if ( key === "culture" || key === "numberFormat" ) {
				prevValue = this._parse( this.element.val() );
				this.options[ key ] = value;
				this.element.val( this._format( prevValue ) );
				return;
			}

			if ( key === "max" || key === "min" || key === "step" ) {
				if ( typeof value === "string" ) {
					value = this._parse( value );
				}
			}
			if ( key === "icons" ) {
				first = this.buttons.first().find( ".ui-icon" );
				this._removeClass( first, null, this.options.icons.up );
				this._addClass( first, null, value.up );
				last = this.buttons.last().find( ".ui-icon" );
				this._removeClass( last, null, this.options.icons.down );
				this._addClass( last, null, value.down );
			}

			this._super( key, value );
		},

		_setOptionDisabled: function( value ) {
			this._super( value );

			this._toggleClass( this.uiSpinner, null, "ui-state-disabled", !!value );
			this.element.prop( "disabled", !!value );
			this.buttons.button( value ? "disable" : "enable" );
		},

		_setOptions: spinnerModifier( function( options ) {
			this._super( options );
		} ),

		_parse: function( val ) {
			if ( typeof val === "string" && val !== "" ) {
				val = window.Globalize && this.options.numberFormat ?
					Globalize.parseFloat( val, 10, this.options.culture ) : +val;
			}
			return val === "" || isNaN( val ) ? null : val;
		},

		_format: function( value ) {
			if ( value === "" ) {
				return "";
			}
			return window.Globalize && this.options.numberFormat ?
				Globalize.format( value, this.options.numberFormat, this.options.culture ) :
				value;
		},

		_refresh: function() {
			this.element.attr( {
				"aria-valuemin": this.options.min,
				"aria-valuemax": this.options.max,

				// TODO: what should we do with values that can't be parsed?
				"aria-valuenow": this._parse( this.element.val() )
			} );
		},

		isValid: function() {
			var value = this.value();

			// Null is invalid
			if ( value === null ) {
				return false;
			}

			// If value gets adjusted, it's invalid
			return value === this._adjustValue( value );
		},

		// Update the value without triggering change
		_value: function( value, allowAny ) {
			var parsed;
			if ( value !== "" ) {
				parsed = this._parse( value );
				if ( parsed !== null ) {
					if ( !allowAny ) {
						parsed = this._adjustValue( parsed );
					}
					value = this._format( parsed );
				}
			}
			this.element.val( value );
			this._refresh();
		},

		_destroy: function() {
			this.element
			.prop( "disabled", false )
			.removeAttr( "autocomplete role aria-valuemin aria-valuemax aria-valuenow" );

			this.uiSpinner.replaceWith( this.element );
		},

		stepUp: spinnerModifier( function( steps ) {
			this._stepUp( steps );
		} ),
		_stepUp: function( steps ) {
			if ( this._start() ) {
				this._spin( ( steps || 1 ) * this.options.step );
				this._stop();
			}
		},

		stepDown: spinnerModifier( function( steps ) {
			this._stepDown( steps );
		} ),
		_stepDown: function( steps ) {
			if ( this._start() ) {
				this._spin( ( steps || 1 ) * -this.options.step );
				this._stop();
			}
		},

		pageUp: spinnerModifier( function( pages ) {
			this._stepUp( ( pages || 1 ) * this.options.page );
		} ),

		pageDown: spinnerModifier( function( pages ) {
			this._stepDown( ( pages || 1 ) * this.options.page );
		} ),

		value: function( newVal ) {
			if ( !arguments.length ) {
				return this._parse( this.element.val() );
			}
			spinnerModifier( this._value ).call( this, newVal );
		},

		widget: function() {
			return this.uiSpinner;
		}
	} );

// DEPRECATED
// TODO: switch return back to widget declaration at top of file when this is removed
	if ( $.uiBackCompat !== false ) {

		// Backcompat for spinner html extension points
		$.widget( "ui.spinner", $.ui.spinner, {
			_enhance: function() {
				this.uiSpinner = this.element
				.attr( "autocomplete", "off" )
				.wrap( this._uiSpinnerHtml() )
				.parent()

				// Add buttons
				.append( this._buttonHtml() );
			},
			_uiSpinnerHtml: function() {
				return "<span>";
			},

			_buttonHtml: function() {
				return "<a></a><a></a>";
			}
		} );
	}

	var widgetsSpinner = $.ui.spinner;


	/*!
 * jQuery UI Tabs 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Tabs
//>>group: Widgets
//>>description: Transforms a set of container elements into a tab structure.
//>>docs: http://api.jqueryui.com/tabs/
//>>demos: http://jqueryui.com/tabs/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/tabs.css
//>>css.theme: ../../themes/base/theme.css


	$.widget( "ui.tabs", {
		version: "1.13.0",
		delay: 300,
		options: {
			active: null,
			classes: {
				"ui-tabs": "ui-corner-all",
				"ui-tabs-nav": "ui-corner-all",
				"ui-tabs-panel": "ui-corner-bottom",
				"ui-tabs-tab": "ui-corner-top"
			},
			collapsible: false,
			event: "click",
			heightStyle: "content",
			hide: null,
			show: null,

			// Callbacks
			activate: null,
			beforeActivate: null,
			beforeLoad: null,
			load: null
		},

		_isLocal: ( function() {
			var rhash = /#.*$/;

			return function( anchor ) {
				var anchorUrl, locationUrl;

				anchorUrl = anchor.href.replace( rhash, "" );
				locationUrl = location.href.replace( rhash, "" );

				// Decoding may throw an error if the URL isn't UTF-8 (#9518)
				try {
					anchorUrl = decodeURIComponent( anchorUrl );
				} catch ( error ) {}
				try {
					locationUrl = decodeURIComponent( locationUrl );
				} catch ( error ) {}

				return anchor.hash.length > 1 && anchorUrl === locationUrl;
			};
		} )(),

		_create: function() {
			var that = this,
				options = this.options;

			this.running = false;

			this._addClass( "ui-tabs", "ui-widget ui-widget-content" );
			this._toggleClass( "ui-tabs-collapsible", null, options.collapsible );

			this._processTabs();
			options.active = this._initialActive();

			// Take disabling tabs via class attribute from HTML
			// into account and update option properly.
			if ( Array.isArray( options.disabled ) ) {
				options.disabled = $.uniqueSort( options.disabled.concat(
					$.map( this.tabs.filter( ".ui-state-disabled" ), function( li ) {
						return that.tabs.index( li );
					} )
				) ).sort();
			}

			// Check for length avoids error when initializing empty list
			if ( this.options.active !== false && this.anchors.length ) {
				this.active = this._findActive( options.active );
			} else {
				this.active = $();
			}

			this._refresh();

			if ( this.active.length ) {
				this.load( options.active );
			}
		},

		_initialActive: function() {
			var active = this.options.active,
				collapsible = this.options.collapsible,
				locationHash = location.hash.substring( 1 );

			if ( active === null ) {

				// check the fragment identifier in the URL
				if ( locationHash ) {
					this.tabs.each( function( i, tab ) {
						if ( $( tab ).attr( "aria-controls" ) === locationHash ) {
							active = i;
							return false;
						}
					} );
				}

				// Check for a tab marked active via a class
				if ( active === null ) {
					active = this.tabs.index( this.tabs.filter( ".ui-tabs-active" ) );
				}

				// No active tab, set to false
				if ( active === null || active === -1 ) {
					active = this.tabs.length ? 0 : false;
				}
			}

			// Handle numbers: negative, out of range
			if ( active !== false ) {
				active = this.tabs.index( this.tabs.eq( active ) );
				if ( active === -1 ) {
					active = collapsible ? false : 0;
				}
			}

			// Don't allow collapsible: false and active: false
			if ( !collapsible && active === false && this.anchors.length ) {
				active = 0;
			}

			return active;
		},

		_getCreateEventData: function() {
			return {
				tab: this.active,
				panel: !this.active.length ? $() : this._getPanelForTab( this.active )
			};
		},

		_tabKeydown: function( event ) {
			var focusedTab = $( $.ui.safeActiveElement( this.document[ 0 ] ) ).closest( "li" ),
				selectedIndex = this.tabs.index( focusedTab ),
				goingForward = true;

			if ( this._handlePageNav( event ) ) {
				return;
			}

			switch ( event.keyCode ) {
				case $.ui.keyCode.RIGHT:
				case $.ui.keyCode.DOWN:
					selectedIndex++;
					break;
				case $.ui.keyCode.UP:
				case $.ui.keyCode.LEFT:
					goingForward = false;
					selectedIndex--;
					break;
				case $.ui.keyCode.END:
					selectedIndex = this.anchors.length - 1;
					break;
				case $.ui.keyCode.HOME:
					selectedIndex = 0;
					break;
				case $.ui.keyCode.SPACE:

					// Activate only, no collapsing
					event.preventDefault();
					clearTimeout( this.activating );
					this._activate( selectedIndex );
					return;
				case $.ui.keyCode.ENTER:

					// Toggle (cancel delayed activation, allow collapsing)
					event.preventDefault();
					clearTimeout( this.activating );

					// Determine if we should collapse or activate
					this._activate( selectedIndex === this.options.active ? false : selectedIndex );
					return;
				default:
					return;
			}

			// Focus the appropriate tab, based on which key was pressed
			event.preventDefault();
			clearTimeout( this.activating );
			selectedIndex = this._focusNextTab( selectedIndex, goingForward );

			// Navigating with control/command key will prevent automatic activation
			if ( !event.ctrlKey && !event.metaKey ) {

				// Update aria-selected immediately so that AT think the tab is already selected.
				// Otherwise AT may confuse the user by stating that they need to activate the tab,
				// but the tab will already be activated by the time the announcement finishes.
				focusedTab.attr( "aria-selected", "false" );
				this.tabs.eq( selectedIndex ).attr( "aria-selected", "true" );

				this.activating = this._delay( function() {
					this.option( "active", selectedIndex );
				}, this.delay );
			}
		},

		_panelKeydown: function( event ) {
			if ( this._handlePageNav( event ) ) {
				return;
			}

			// Ctrl+up moves focus to the current tab
			if ( event.ctrlKey && event.keyCode === $.ui.keyCode.UP ) {
				event.preventDefault();
				this.active.trigger( "focus" );
			}
		},

		// Alt+page up/down moves focus to the previous/next tab (and activates)
		_handlePageNav: function( event ) {
			if ( event.altKey && event.keyCode === $.ui.keyCode.PAGE_UP ) {
				this._activate( this._focusNextTab( this.options.active - 1, false ) );
				return true;
			}
			if ( event.altKey && event.keyCode === $.ui.keyCode.PAGE_DOWN ) {
				this._activate( this._focusNextTab( this.options.active + 1, true ) );
				return true;
			}
		},

		_findNextTab: function( index, goingForward ) {
			var lastTabIndex = this.tabs.length - 1;

			function constrain() {
				if ( index > lastTabIndex ) {
					index = 0;
				}
				if ( index < 0 ) {
					index = lastTabIndex;
				}
				return index;
			}

			while ( $.inArray( constrain(), this.options.disabled ) !== -1 ) {
				index = goingForward ? index + 1 : index - 1;
			}

			return index;
		},

		_focusNextTab: function( index, goingForward ) {
			index = this._findNextTab( index, goingForward );
			this.tabs.eq( index ).trigger( "focus" );
			return index;
		},

		_setOption: function( key, value ) {
			if ( key === "active" ) {

				// _activate() will handle invalid values and update this.options
				this._activate( value );
				return;
			}

			this._super( key, value );

			if ( key === "collapsible" ) {
				this._toggleClass( "ui-tabs-collapsible", null, value );

				// Setting collapsible: false while collapsed; open first panel
				if ( !value && this.options.active === false ) {
					this._activate( 0 );
				}
			}

			if ( key === "event" ) {
				this._setupEvents( value );
			}

			if ( key === "heightStyle" ) {
				this._setupHeightStyle( value );
			}
		},

		_sanitizeSelector: function( hash ) {
			return hash ? hash.replace( /[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&" ) : "";
		},

		refresh: function() {
			var options = this.options,
				lis = this.tablist.children( ":has(a[href])" );

			// Get disabled tabs from class attribute from HTML
			// this will get converted to a boolean if needed in _refresh()
			options.disabled = $.map( lis.filter( ".ui-state-disabled" ), function( tab ) {
				return lis.index( tab );
			} );

			this._processTabs();

			// Was collapsed or no tabs
			if ( options.active === false || !this.anchors.length ) {
				options.active = false;
				this.active = $();

				// was active, but active tab is gone
			} else if ( this.active.length && !$.contains( this.tablist[ 0 ], this.active[ 0 ] ) ) {

				// all remaining tabs are disabled
				if ( this.tabs.length === options.disabled.length ) {
					options.active = false;
					this.active = $();

					// activate previous tab
				} else {
					this._activate( this._findNextTab( Math.max( 0, options.active - 1 ), false ) );
				}

				// was active, active tab still exists
			} else {

				// make sure active index is correct
				options.active = this.tabs.index( this.active );
			}

			this._refresh();
		},

		_refresh: function() {
			this._setOptionDisabled( this.options.disabled );
			this._setupEvents( this.options.event );
			this._setupHeightStyle( this.options.heightStyle );

			this.tabs.not( this.active ).attr( {
				"aria-selected": "false",
				"aria-expanded": "false",
				tabIndex: -1
			} );
			this.panels.not( this._getPanelForTab( this.active ) )
			.hide()
			.attr( {
				"aria-hidden": "true"
			} );

			// Make sure one tab is in the tab order
			if ( !this.active.length ) {
				this.tabs.eq( 0 ).attr( "tabIndex", 0 );
			} else {
				this.active
				.attr( {
					"aria-selected": "true",
					"aria-expanded": "true",
					tabIndex: 0
				} );
				this._addClass( this.active, "ui-tabs-active", "ui-state-active" );
				this._getPanelForTab( this.active )
				.show()
				.attr( {
					"aria-hidden": "false"
				} );
			}
		},

		_processTabs: function() {
			var that = this,
				prevTabs = this.tabs,
				prevAnchors = this.anchors,
				prevPanels = this.panels;

			this.tablist = this._getList().attr( "role", "tablist" );
			this._addClass( this.tablist, "ui-tabs-nav",
				"ui-helper-reset ui-helper-clearfix ui-widget-header" );

			// Prevent users from focusing disabled tabs via click
			this.tablist
			.on( "mousedown" + this.eventNamespace, "> li", function( event ) {
				if ( $( this ).is( ".ui-state-disabled" ) ) {
					event.preventDefault();
				}
			} )

			// Support: IE <9
			// Preventing the default action in mousedown doesn't prevent IE
			// from focusing the element, so if the anchor gets focused, blur.
			// We don't have to worry about focusing the previously focused
			// element since clicking on a non-focusable element should focus
			// the body anyway.
			.on( "focus" + this.eventNamespace, ".ui-tabs-anchor", function() {
				if ( $( this ).closest( "li" ).is( ".ui-state-disabled" ) ) {
					this.blur();
				}
			} );

			this.tabs = this.tablist.find( "> li:has(a[href])" )
			.attr( {
				role: "tab",
				tabIndex: -1
			} );
			this._addClass( this.tabs, "ui-tabs-tab", "ui-state-default" );

			this.anchors = this.tabs.map( function() {
				return $( "a", this )[ 0 ];
			} )
			.attr( {
				tabIndex: -1
			} );
			this._addClass( this.anchors, "ui-tabs-anchor" );

			this.panels = $();

			this.anchors.each( function( i, anchor ) {
				var selector, panel, panelId,
					anchorId = $( anchor ).uniqueId().attr( "id" ),
					tab = $( anchor ).closest( "li" ),
					originalAriaControls = tab.attr( "aria-controls" );

				// Inline tab
				if ( that._isLocal( anchor ) ) {
					selector = anchor.hash;
					panelId = selector.substring( 1 );
					panel = that.element.find( that._sanitizeSelector( selector ) );

					// remote tab
				} else {

					// If the tab doesn't already have aria-controls,
					// generate an id by using a throw-away element
					panelId = tab.attr( "aria-controls" ) || $( {} ).uniqueId()[ 0 ].id;
					selector = "#" + panelId;
					panel = that.element.find( selector );
					if ( !panel.length ) {
						panel = that._createPanel( panelId );
						panel.insertAfter( that.panels[ i - 1 ] || that.tablist );
					}
					panel.attr( "aria-live", "polite" );
				}

				if ( panel.length ) {
					that.panels = that.panels.add( panel );
				}
				if ( originalAriaControls ) {
					tab.data( "ui-tabs-aria-controls", originalAriaControls );
				}
				tab.attr( {
					"aria-controls": panelId,
					"aria-labelledby": anchorId
				} );
				panel.attr( "aria-labelledby", anchorId );
			} );

			this.panels.attr( "role", "tabpanel" );
			this._addClass( this.panels, "ui-tabs-panel", "ui-widget-content" );

			// Avoid memory leaks (#10056)
			if ( prevTabs ) {
				this._off( prevTabs.not( this.tabs ) );
				this._off( prevAnchors.not( this.anchors ) );
				this._off( prevPanels.not( this.panels ) );
			}
		},

		// Allow overriding how to find the list for rare usage scenarios (#7715)
		_getList: function() {
			return this.tablist || this.element.find( "ol, ul" ).eq( 0 );
		},

		_createPanel: function( id ) {
			return $( "<div>" )
			.attr( "id", id )
			.data( "ui-tabs-destroy", true );
		},

		_setOptionDisabled: function( disabled ) {
			var currentItem, li, i;

			if ( Array.isArray( disabled ) ) {
				if ( !disabled.length ) {
					disabled = false;
				} else if ( disabled.length === this.anchors.length ) {
					disabled = true;
				}
			}

			// Disable tabs
			for ( i = 0; ( li = this.tabs[ i ] ); i++ ) {
				currentItem = $( li );
				if ( disabled === true || $.inArray( i, disabled ) !== -1 ) {
					currentItem.attr( "aria-disabled", "true" );
					this._addClass( currentItem, null, "ui-state-disabled" );
				} else {
					currentItem.removeAttr( "aria-disabled" );
					this._removeClass( currentItem, null, "ui-state-disabled" );
				}
			}

			this.options.disabled = disabled;

			this._toggleClass( this.widget(), this.widgetFullName + "-disabled", null,
				disabled === true );
		},

		_setupEvents: function( event ) {
			var events = {};
			if ( event ) {
				$.each( event.split( " " ), function( index, eventName ) {
					events[ eventName ] = "_eventHandler";
				} );
			}

			this._off( this.anchors.add( this.tabs ).add( this.panels ) );

			// Always prevent the default action, even when disabled
			this._on( true, this.anchors, {
				click: function( event ) {
					event.preventDefault();
				}
			} );
			this._on( this.anchors, events );
			this._on( this.tabs, { keydown: "_tabKeydown" } );
			this._on( this.panels, { keydown: "_panelKeydown" } );

			this._focusable( this.tabs );
			this._hoverable( this.tabs );
		},

		_setupHeightStyle: function( heightStyle ) {
			var maxHeight,
				parent = this.element.parent();

			if ( heightStyle === "fill" ) {
				maxHeight = parent.height();
				maxHeight -= this.element.outerHeight() - this.element.height();

				this.element.siblings( ":visible" ).each( function() {
					var elem = $( this ),
						position = elem.css( "position" );

					if ( position === "absolute" || position === "fixed" ) {
						return;
					}
					maxHeight -= elem.outerHeight( true );
				} );

				this.element.children().not( this.panels ).each( function() {
					maxHeight -= $( this ).outerHeight( true );
				} );

				this.panels.each( function() {
					$( this ).height( Math.max( 0, maxHeight -
						$( this ).innerHeight() + $( this ).height() ) );
				} )
				.css( "overflow", "auto" );
			} else if ( heightStyle === "auto" ) {
				maxHeight = 0;
				this.panels.each( function() {
					maxHeight = Math.max( maxHeight, $( this ).height( "" ).height() );
				} ).height( maxHeight );
			}
		},

		_eventHandler: function( event ) {
			var options = this.options,
				active = this.active,
				anchor = $( event.currentTarget ),
				tab = anchor.closest( "li" ),
				clickedIsActive = tab[ 0 ] === active[ 0 ],
				collapsing = clickedIsActive && options.collapsible,
				toShow = collapsing ? $() : this._getPanelForTab( tab ),
				toHide = !active.length ? $() : this._getPanelForTab( active ),
				eventData = {
					oldTab: active,
					oldPanel: toHide,
					newTab: collapsing ? $() : tab,
					newPanel: toShow
				};

			event.preventDefault();

			if ( tab.hasClass( "ui-state-disabled" ) ||

				// tab is already loading
				tab.hasClass( "ui-tabs-loading" ) ||

				// can't switch durning an animation
				this.running ||

				// click on active header, but not collapsible
				( clickedIsActive && !options.collapsible ) ||

				// allow canceling activation
				( this._trigger( "beforeActivate", event, eventData ) === false ) ) {
				return;
			}

			options.active = collapsing ? false : this.tabs.index( tab );

			this.active = clickedIsActive ? $() : tab;
			if ( this.xhr ) {
				this.xhr.abort();
			}

			if ( !toHide.length && !toShow.length ) {
				$.error( "jQuery UI Tabs: Mismatching fragment identifier." );
			}

			if ( toShow.length ) {
				this.load( this.tabs.index( tab ), event );
			}
			this._toggle( event, eventData );
		},

		// Handles show/hide for selecting tabs
		_toggle: function( event, eventData ) {
			var that = this,
				toShow = eventData.newPanel,
				toHide = eventData.oldPanel;

			this.running = true;

			function complete() {
				that.running = false;
				that._trigger( "activate", event, eventData );
			}

			function show() {
				that._addClass( eventData.newTab.closest( "li" ), "ui-tabs-active", "ui-state-active" );

				if ( toShow.length && that.options.show ) {
					that._show( toShow, that.options.show, complete );
				} else {
					toShow.show();
					complete();
				}
			}

			// Start out by hiding, then showing, then completing
			if ( toHide.length && this.options.hide ) {
				this._hide( toHide, this.options.hide, function() {
					that._removeClass( eventData.oldTab.closest( "li" ),
						"ui-tabs-active", "ui-state-active" );
					show();
				} );
			} else {
				this._removeClass( eventData.oldTab.closest( "li" ),
					"ui-tabs-active", "ui-state-active" );
				toHide.hide();
				show();
			}

			toHide.attr( "aria-hidden", "true" );
			eventData.oldTab.attr( {
				"aria-selected": "false",
				"aria-expanded": "false"
			} );

			// If we're switching tabs, remove the old tab from the tab order.
			// If we're opening from collapsed state, remove the previous tab from the tab order.
			// If we're collapsing, then keep the collapsing tab in the tab order.
			if ( toShow.length && toHide.length ) {
				eventData.oldTab.attr( "tabIndex", -1 );
			} else if ( toShow.length ) {
				this.tabs.filter( function() {
					return $( this ).attr( "tabIndex" ) === 0;
				} )
				.attr( "tabIndex", -1 );
			}

			toShow.attr( "aria-hidden", "false" );
			eventData.newTab.attr( {
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			} );
		},

		_activate: function( index ) {
			var anchor,
				active = this._findActive( index );

			// Trying to activate the already active panel
			if ( active[ 0 ] === this.active[ 0 ] ) {
				return;
			}

			// Trying to collapse, simulate a click on the current active header
			if ( !active.length ) {
				active = this.active;
			}

			anchor = active.find( ".ui-tabs-anchor" )[ 0 ];
			this._eventHandler( {
				target: anchor,
				currentTarget: anchor,
				preventDefault: $.noop
			} );
		},

		_findActive: function( index ) {
			return index === false ? $() : this.tabs.eq( index );
		},

		_getIndex: function( index ) {

			// meta-function to give users option to provide a href string instead of a numerical index.
			if ( typeof index === "string" ) {
				index = this.anchors.index( this.anchors.filter( "[href$='" +
					$.escapeSelector( index ) + "']" ) );
			}

			return index;
		},

		_destroy: function() {
			if ( this.xhr ) {
				this.xhr.abort();
			}

			this.tablist
			.removeAttr( "role" )
			.off( this.eventNamespace );

			this.anchors
			.removeAttr( "role tabIndex" )
			.removeUniqueId();

			this.tabs.add( this.panels ).each( function() {
				if ( $.data( this, "ui-tabs-destroy" ) ) {
					$( this ).remove();
				} else {
					$( this ).removeAttr( "role tabIndex " +
						"aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded" );
				}
			} );

			this.tabs.each( function() {
				var li = $( this ),
					prev = li.data( "ui-tabs-aria-controls" );
				if ( prev ) {
					li
					.attr( "aria-controls", prev )
					.removeData( "ui-tabs-aria-controls" );
				} else {
					li.removeAttr( "aria-controls" );
				}
			} );

			this.panels.show();

			if ( this.options.heightStyle !== "content" ) {
				this.panels.css( "height", "" );
			}
		},

		enable: function( index ) {
			var disabled = this.options.disabled;
			if ( disabled === false ) {
				return;
			}

			if ( index === undefined ) {
				disabled = false;
			} else {
				index = this._getIndex( index );
				if ( Array.isArray( disabled ) ) {
					disabled = $.map( disabled, function( num ) {
						return num !== index ? num : null;
					} );
				} else {
					disabled = $.map( this.tabs, function( li, num ) {
						return num !== index ? num : null;
					} );
				}
			}
			this._setOptionDisabled( disabled );
		},

		disable: function( index ) {
			var disabled = this.options.disabled;
			if ( disabled === true ) {
				return;
			}

			if ( index === undefined ) {
				disabled = true;
			} else {
				index = this._getIndex( index );
				if ( $.inArray( index, disabled ) !== -1 ) {
					return;
				}
				if ( Array.isArray( disabled ) ) {
					disabled = $.merge( [ index ], disabled ).sort();
				} else {
					disabled = [ index ];
				}
			}
			this._setOptionDisabled( disabled );
		},

		load: function( index, event ) {
			index = this._getIndex( index );
			var that = this,
				tab = this.tabs.eq( index ),
				anchor = tab.find( ".ui-tabs-anchor" ),
				panel = this._getPanelForTab( tab ),
				eventData = {
					tab: tab,
					panel: panel
				},
				complete = function( jqXHR, status ) {
					if ( status === "abort" ) {
						that.panels.stop( false, true );
					}

					that._removeClass( tab, "ui-tabs-loading" );
					panel.removeAttr( "aria-busy" );

					if ( jqXHR === that.xhr ) {
						delete that.xhr;
					}
				};

			// Not remote
			if ( this._isLocal( anchor[ 0 ] ) ) {
				return;
			}

			this.xhr = $.ajax( this._ajaxSettings( anchor, event, eventData ) );

			// Support: jQuery <1.8
			// jQuery <1.8 returns false if the request is canceled in beforeSend,
			// but as of 1.8, $.ajax() always returns a jqXHR object.
			if ( this.xhr && this.xhr.statusText !== "canceled" ) {
				this._addClass( tab, "ui-tabs-loading" );
				panel.attr( "aria-busy", "true" );

				this.xhr
				.done( function( response, status, jqXHR ) {

					// support: jQuery <1.8
					// http://bugs.jquery.com/ticket/11778
					setTimeout( function() {
						panel.html( response );
						that._trigger( "load", event, eventData );

						complete( jqXHR, status );
					}, 1 );
				} )
				.fail( function( jqXHR, status ) {

					// support: jQuery <1.8
					// http://bugs.jquery.com/ticket/11778
					setTimeout( function() {
						complete( jqXHR, status );
					}, 1 );
				} );
			}
		},

		_ajaxSettings: function( anchor, event, eventData ) {
			var that = this;
			return {

				// Support: IE <11 only
				// Strip any hash that exists to prevent errors with the Ajax request
				url: anchor.attr( "href" ).replace( /#.*$/, "" ),
				beforeSend: function( jqXHR, settings ) {
					return that._trigger( "beforeLoad", event,
						$.extend( { jqXHR: jqXHR, ajaxSettings: settings }, eventData ) );
				}
			};
		},

		_getPanelForTab: function( tab ) {
			var id = $( tab ).attr( "aria-controls" );
			return this.element.find( this._sanitizeSelector( "#" + id ) );
		}
	} );

// DEPRECATED
// TODO: Switch return back to widget declaration at top of file when this is removed
	if ( $.uiBackCompat !== false ) {

		// Backcompat for ui-tab class (now ui-tabs-tab)
		$.widget( "ui.tabs", $.ui.tabs, {
			_processTabs: function() {
				this._superApply( arguments );
				this._addClass( this.tabs, "ui-tab" );
			}
		} );
	}

	var widgetsTabs = $.ui.tabs;


	/*!
 * jQuery UI Tooltip 1.13.0
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Tooltip
//>>group: Widgets
//>>description: Shows additional information for any element on hover or focus.
//>>docs: http://api.jqueryui.com/tooltip/
//>>demos: http://jqueryui.com/tooltip/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/tooltip.css
//>>css.theme: ../../themes/base/theme.css


	$.widget( "ui.tooltip", {
		version: "1.13.0",
		options: {
			classes: {
				"ui-tooltip": "ui-corner-all ui-widget-shadow"
			},
			content: function() {
				var title = $( this ).attr( "title" );

				// Escape title, since we're going from an attribute to raw HTML
				return $( "<a>" ).text( title ).html();
			},
			hide: true,

			// Disabled elements have inconsistent behavior across browsers (#8661)
			items: "[title]:not([disabled])",
			position: {
				my: "left top+15",
				at: "left bottom",
				collision: "flipfit flip"
			},
			show: true,
			track: false,

			// Callbacks
			close: null,
			open: null
		},

		_addDescribedBy: function( elem, id ) {
			var describedby = ( elem.attr( "aria-describedby" ) || "" ).split( /\s+/ );
			describedby.push( id );
			elem
			.data( "ui-tooltip-id", id )
			.attr( "aria-describedby", String.prototype.trim.call( describedby.join( " " ) ) );
		},

		_removeDescribedBy: function( elem ) {
			var id = elem.data( "ui-tooltip-id" ),
				describedby = ( elem.attr( "aria-describedby" ) || "" ).split( /\s+/ ),
				index = $.inArray( id, describedby );

			if ( index !== -1 ) {
				describedby.splice( index, 1 );
			}

			elem.removeData( "ui-tooltip-id" );
			describedby = String.prototype.trim.call( describedby.join( " " ) );
			if ( describedby ) {
				elem.attr( "aria-describedby", describedby );
			} else {
				elem.removeAttr( "aria-describedby" );
			}
		},

		_create: function() {
			this._on( {
				mouseover: "open",
				focusin: "open"
			} );

			// IDs of generated tooltips, needed for destroy
			this.tooltips = {};

			// IDs of parent tooltips where we removed the title attribute
			this.parents = {};

			// Append the aria-live region so tooltips announce correctly
			this.liveRegion = $( "<div>" )
			.attr( {
				role: "log",
				"aria-live": "assertive",
				"aria-relevant": "additions"
			} )
			.appendTo( this.document[ 0 ].body );
			this._addClass( this.liveRegion, null, "ui-helper-hidden-accessible" );

			this.disabledTitles = $( [] );
		},

		_setOption: function( key, value ) {
			var that = this;

			this._super( key, value );

			if ( key === "content" ) {
				$.each( this.tooltips, function( id, tooltipData ) {
					that._updateContent( tooltipData.element );
				} );
			}
		},

		_setOptionDisabled: function( value ) {
			this[ value ? "_disable" : "_enable" ]();
		},

		_disable: function() {
			var that = this;

			// Close open tooltips
			$.each( this.tooltips, function( id, tooltipData ) {
				var event = $.Event( "blur" );
				event.target = event.currentTarget = tooltipData.element[ 0 ];
				that.close( event, true );
			} );

			// Remove title attributes to prevent native tooltips
			this.disabledTitles = this.disabledTitles.add(
				this.element.find( this.options.items ).addBack()
				.filter( function() {
					var element = $( this );
					if ( element.is( "[title]" ) ) {
						return element
						.data( "ui-tooltip-title", element.attr( "title" ) )
						.removeAttr( "title" );
					}
				} )
			);
		},

		_enable: function() {

			// restore title attributes
			this.disabledTitles.each( function() {
				var element = $( this );
				if ( element.data( "ui-tooltip-title" ) ) {
					element.attr( "title", element.data( "ui-tooltip-title" ) );
				}
			} );
			this.disabledTitles = $( [] );
		},

		open: function( event ) {
			var that = this,
				target = $( event ? event.target : this.element )

				// we need closest here due to mouseover bubbling,
				// but always pointing at the same event target
				.closest( this.options.items );

			// No element to show a tooltip for or the tooltip is already open
			if ( !target.length || target.data( "ui-tooltip-id" ) ) {
				return;
			}

			if ( target.attr( "title" ) ) {
				target.data( "ui-tooltip-title", target.attr( "title" ) );
			}

			target.data( "ui-tooltip-open", true );

			// Kill parent tooltips, custom or native, for hover
			if ( event && event.type === "mouseover" ) {
				target.parents().each( function() {
					var parent = $( this ),
						blurEvent;
					if ( parent.data( "ui-tooltip-open" ) ) {
						blurEvent = $.Event( "blur" );
						blurEvent.target = blurEvent.currentTarget = this;
						that.close( blurEvent, true );
					}
					if ( parent.attr( "title" ) ) {
						parent.uniqueId();
						that.parents[ this.id ] = {
							element: this,
							title: parent.attr( "title" )
						};
						parent.attr( "title", "" );
					}
				} );
			}

			this._registerCloseHandlers( event, target );
			this._updateContent( target, event );
		},

		_updateContent: function( target, event ) {
			var content,
				contentOption = this.options.content,
				that = this,
				eventType = event ? event.type : null;

			if ( typeof contentOption === "string" || contentOption.nodeType ||
				contentOption.jquery ) {
				return this._open( event, target, contentOption );
			}

			content = contentOption.call( target[ 0 ], function( response ) {

				// IE may instantly serve a cached response for ajax requests
				// delay this call to _open so the other call to _open runs first
				that._delay( function() {

					// Ignore async response if tooltip was closed already
					if ( !target.data( "ui-tooltip-open" ) ) {
						return;
					}

					// JQuery creates a special event for focusin when it doesn't
					// exist natively. To improve performance, the native event
					// object is reused and the type is changed. Therefore, we can't
					// rely on the type being correct after the event finished
					// bubbling, so we set it back to the previous value. (#8740)
					if ( event ) {
						event.type = eventType;
					}
					this._open( event, target, response );
				} );
			} );
			if ( content ) {
				this._open( event, target, content );
			}
		},

		_open: function( event, target, content ) {
			var tooltipData, tooltip, delayedShow, a11yContent,
				positionOption = $.extend( {}, this.options.position );

			if ( !content ) {
				return;
			}

			// Content can be updated multiple times. If the tooltip already
			// exists, then just update the content and bail.
			tooltipData = this._find( target );
			if ( tooltipData ) {
				tooltipData.tooltip.find( ".ui-tooltip-content" ).html( content );
				return;
			}

			// If we have a title, clear it to prevent the native tooltip
			// we have to check first to avoid defining a title if none exists
			// (we don't want to cause an element to start matching [title])
			//
			// We use removeAttr only for key events, to allow IE to export the correct
			// accessible attributes. For mouse events, set to empty string to avoid
			// native tooltip showing up (happens only when removing inside mouseover).
			if ( target.is( "[title]" ) ) {
				if ( event && event.type === "mouseover" ) {
					target.attr( "title", "" );
				} else {
					target.removeAttr( "title" );
				}
			}

			tooltipData = this._tooltip( target );
			tooltip = tooltipData.tooltip;
			this._addDescribedBy( target, tooltip.attr( "id" ) );
			tooltip.find( ".ui-tooltip-content" ).html( content );

			// Support: Voiceover on OS X, JAWS on IE <= 9
			// JAWS announces deletions even when aria-relevant="additions"
			// Voiceover will sometimes re-read the entire log region's contents from the beginning
			this.liveRegion.children().hide();
			a11yContent = $( "<div>" ).html( tooltip.find( ".ui-tooltip-content" ).html() );
			a11yContent.removeAttr( "name" ).find( "[name]" ).removeAttr( "name" );
			a11yContent.removeAttr( "id" ).find( "[id]" ).removeAttr( "id" );
			a11yContent.appendTo( this.liveRegion );

			function position( event ) {
				positionOption.of = event;
				if ( tooltip.is( ":hidden" ) ) {
					return;
				}
				tooltip.position( positionOption );
			}
			if ( this.options.track && event && /^mouse/.test( event.type ) ) {
				this._on( this.document, {
					mousemove: position
				} );

				// trigger once to override element-relative positioning
				position( event );
			} else {
				tooltip.position( $.extend( {
					of: target
				}, this.options.position ) );
			}

			tooltip.hide();

			this._show( tooltip, this.options.show );

			// Handle tracking tooltips that are shown with a delay (#8644). As soon
			// as the tooltip is visible, position the tooltip using the most recent
			// event.
			// Adds the check to add the timers only when both delay and track options are set (#14682)
			if ( this.options.track && this.options.show && this.options.show.delay ) {
				delayedShow = this.delayedShow = setInterval( function() {
					if ( tooltip.is( ":visible" ) ) {
						position( positionOption.of );
						clearInterval( delayedShow );
					}
				}, 13 );
			}

			this._trigger( "open", event, { tooltip: tooltip } );
		},

		_registerCloseHandlers: function( event, target ) {
			var events = {
				keyup: function( event ) {
					if ( event.keyCode === $.ui.keyCode.ESCAPE ) {
						var fakeEvent = $.Event( event );
						fakeEvent.currentTarget = target[ 0 ];
						this.close( fakeEvent, true );
					}
				}
			};

			// Only bind remove handler for delegated targets. Non-delegated
			// tooltips will handle this in destroy.
			if ( target[ 0 ] !== this.element[ 0 ] ) {
				events.remove = function() {
					this._removeTooltip( this._find( target ).tooltip );
				};
			}

			if ( !event || event.type === "mouseover" ) {
				events.mouseleave = "close";
			}
			if ( !event || event.type === "focusin" ) {
				events.focusout = "close";
			}
			this._on( true, target, events );
		},

		close: function( event ) {
			var tooltip,
				that = this,
				target = $( event ? event.currentTarget : this.element ),
				tooltipData = this._find( target );

			// The tooltip may already be closed
			if ( !tooltipData ) {

				// We set ui-tooltip-open immediately upon open (in open()), but only set the
				// additional data once there's actually content to show (in _open()). So even if the
				// tooltip doesn't have full data, we always remove ui-tooltip-open in case we're in
				// the period between open() and _open().
				target.removeData( "ui-tooltip-open" );
				return;
			}

			tooltip = tooltipData.tooltip;

			// Disabling closes the tooltip, so we need to track when we're closing
			// to avoid an infinite loop in case the tooltip becomes disabled on close
			if ( tooltipData.closing ) {
				return;
			}

			// Clear the interval for delayed tracking tooltips
			clearInterval( this.delayedShow );

			// Only set title if we had one before (see comment in _open())
			// If the title attribute has changed since open(), don't restore
			if ( target.data( "ui-tooltip-title" ) && !target.attr( "title" ) ) {
				target.attr( "title", target.data( "ui-tooltip-title" ) );
			}

			this._removeDescribedBy( target );

			tooltipData.hiding = true;
			tooltip.stop( true );
			this._hide( tooltip, this.options.hide, function() {
				that._removeTooltip( $( this ) );
			} );

			target.removeData( "ui-tooltip-open" );
			this._off( target, "mouseleave focusout keyup" );

			// Remove 'remove' binding only on delegated targets
			if ( target[ 0 ] !== this.element[ 0 ] ) {
				this._off( target, "remove" );
			}
			this._off( this.document, "mousemove" );

			if ( event && event.type === "mouseleave" ) {
				$.each( this.parents, function( id, parent ) {
					$( parent.element ).attr( "title", parent.title );
					delete that.parents[ id ];
				} );
			}

			tooltipData.closing = true;
			this._trigger( "close", event, { tooltip: tooltip } );
			if ( !tooltipData.hiding ) {
				tooltipData.closing = false;
			}
		},

		_tooltip: function( element ) {
			var tooltip = $( "<div>" ).attr( "role", "tooltip" ),
				content = $( "<div>" ).appendTo( tooltip ),
				id = tooltip.uniqueId().attr( "id" );

			this._addClass( content, "ui-tooltip-content" );
			this._addClass( tooltip, "ui-tooltip", "ui-widget ui-widget-content" );

			tooltip.appendTo( this._appendTo( element ) );

			return this.tooltips[ id ] = {
				element: element,
				tooltip: tooltip
			};
		},

		_find: function( target ) {
			var id = target.data( "ui-tooltip-id" );
			return id ? this.tooltips[ id ] : null;
		},

		_removeTooltip: function( tooltip ) {

			// Clear the interval for delayed tracking tooltips
			clearInterval( this.delayedShow );

			tooltip.remove();
			delete this.tooltips[ tooltip.attr( "id" ) ];
		},

		_appendTo: function( target ) {
			var element = target.closest( ".ui-front, dialog" );

			if ( !element.length ) {
				element = this.document[ 0 ].body;
			}

			return element;
		},

		_destroy: function() {
			var that = this;

			// Close open tooltips
			$.each( this.tooltips, function( id, tooltipData ) {

				// Delegate to close method to handle common cleanup
				var event = $.Event( "blur" ),
					element = tooltipData.element;
				event.target = event.currentTarget = element[ 0 ];
				that.close( event, true );

				// Remove immediately; destroying an open tooltip doesn't use the
				// hide animation
				$( "#" + id ).remove();

				// Restore the title
				if ( element.data( "ui-tooltip-title" ) ) {

					// If the title attribute has changed since open(), don't restore
					if ( !element.attr( "title" ) ) {
						element.attr( "title", element.data( "ui-tooltip-title" ) );
					}
					element.removeData( "ui-tooltip-title" );
				}
			} );
			this.liveRegion.remove();
		}
	});

// DEPRECATED
// TODO: Switch return back to widget declaration at top of file when this is removed
	if ( $.uiBackCompat !== false ) {

		// Backcompat for tooltipClass option
		$.widget( "ui.tooltip", $.ui.tooltip, {
			options: {
				tooltipClass: null
			},
			_tooltip: function() {
				var tooltipData = this._superApply( arguments );
				if ( this.options.tooltipClass ) {
					tooltipData.tooltip.addClass( this.options.tooltipClass );
				}
				return tooltipData;
			}
		} );
	}

	var widgetsTooltip = $.ui.tooltip;
});

/*!
 * jQuery UI Touch Punch 0.2.2
 *
 * Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function ($) {

	// Detect touch support
	$.support.touch = ('ontouchend' in document || navigator.maxTouchPoints > 0);

	// Ignore browsers without touch support
	if (!$.support.touch) {
		return;
	}

	var mouseProto = $.ui.mouse.prototype,
		_mouseInit = mouseProto._mouseInit,
		touchHandled;

	/**
	 * Simulate a mouse event based on a corresponding touch event
	 * @param {Object} event A touch event
	 * @param {String} simulatedType The corresponding mouse event
	 */
	function simulateMouseEvent (event, simulatedType) {

		// Ignore multi-touch events
		if (event.originalEvent.touches.length > 1) {
			return;
		}

		event.preventDefault();

		var touch = event.originalEvent.changedTouches[0],
			simulatedEvent = document.createEvent('MouseEvents');

		// Initialize the simulated mouse event using the touch event's coordinates
		simulatedEvent.initMouseEvent(
			simulatedType,    // type
			true,             // bubbles
			true,             // cancelable
			window,           // view
			1,                // detail
			touch.screenX,    // screenX
			touch.screenY,    // screenY
			touch.clientX,    // clientX
			touch.clientY,    // clientY
			false,            // ctrlKey
			false,            // altKey
			false,            // shiftKey
			false,            // metaKey
			0,                // button
			null              // relatedTarget
		);

		// Dispatch the simulated event to the target element
		event.target.dispatchEvent(simulatedEvent);
	}

	/**
	 * Handle the jQuery UI widget's touchstart events
	 * @param {Object} event The widget element's touchstart event
	 */
	mouseProto._touchStart = function (event) {
		var self = this;

		// Ignore the event if another widget is already being handled
		if (touchHandled || !self._mouseCapture(event.originalEvent.changedTouches[0])) {
			return;
		}

		// Set the flag to prevent other widgets from inheriting the touch event
		touchHandled = true;

		// Track movement to determine if interaction was a click
		self._touchMoved = false;

		// Simulate the mouseover event
		simulateMouseEvent(event, 'mouseover');

		// Simulate the mousemove event
		simulateMouseEvent(event, 'mousemove');

		// Simulate the mousedown event
		simulateMouseEvent(event, 'mousedown');
	};

	/**
	 * Handle the jQuery UI widget's touchmove events
	 * @param {Object} event The document's touchmove event
	 */
	mouseProto._touchMove = function (event) {

		// Ignore event if not handled
		if (!touchHandled) {
			return;
		}

		// Interaction was not a click
		this._touchMoved = true;

		// Simulate the mousemove event
		simulateMouseEvent(event, 'mousemove');
	};

	/**
	 * Handle the jQuery UI widget's touchend events
	 * @param {Object} event The document's touchend event
	 */
	mouseProto._touchEnd = function (event) {

		// Ignore event if not handled
		if (!touchHandled) {
			return;
		}

		// Simulate the mouseup event
		simulateMouseEvent(event, 'mouseup');

		// Simulate the mouseout event
		simulateMouseEvent(event, 'mouseout');

		// If the touch interaction did not move, it should trigger a click
		if (!this._touchMoved) {

			// Simulate the click event
			simulateMouseEvent(event, 'click');
		}

		// Unset the flag to allow other widgets to inherit the touch event
		touchHandled = false;
	};

	/**
	 * A duck punch of the $.ui.mouse _mouseInit method to support touch events.
	 * This method extends the widget with bound touch event handlers that
	 * translate touch events to mouse events and pass them to the widget's
	 * original mouse event handling methods.
	 */
	mouseProto._mouseInit = function () {

		var self = this;

		// Delegate the touch handlers to the widget's element
		self.element
		.bind('touchstart', $.proxy(self, '_touchStart'))
		.bind('touchmove', $.proxy(self, '_touchMove'))
		.bind('touchend', $.proxy(self, '_touchEnd'));

		// Call the original $.ui.mouse init method
		_mouseInit.call(self);
	};

})(jQuery);

(function (jQuery) {
	// This is a hack to make ckeditor work inside modal dialogs. Since ckeditor dialogs are placed on body and not in the ui.dialog's DOM. See http://bugs.jqueryui.com/ticket/9087
	jQuery.widget("ui.dialog", jQuery.ui.dialog, {
		_allowInteraction: function (event) {
			return true;
		}
	});

	jQuery.ui.dialog.prototype._focusTabbable = function () {};
})(jQuery);

jQuery = oldJQuery;
;
!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=11)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=t.curry=function(e){var t=e.length;return function n(){var r=Array.prototype.slice.call(arguments,0);return r.length>=t?e.apply(null,r):function(){var e=Array.prototype.slice.call(arguments,0);return n.apply(null,r.concat(e))}}},o=(t.compose=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.reduce(function(e,t){return function(){return e(t.apply(void 0,arguments))}})},t.forEach=r(function(e,t){t.forEach(e)}),t.map=r(function(e,t){return t.map(e)}),t.filter=r(function(e,t){return t.filter(e)})),a=(t.some=r(function(e,t){return t.some(e)}),t.contains=r(function(e,t){return-1!=t.indexOf(e)}));t.without=r(function(e,t){return o(function(t){return!a(t,e)},t)}),t.inverseBooleanString=function(e){return("true"!==e).toString()}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createElement=t.toggleClass=t.toggleVisibility=t.show=t.hide=t.removeClass=t.addClass=t.classListContains=t.removeChild=t.querySelectorAll=t.nodeListToArray=t.querySelector=t.appendChild=t.toggleAttribute=t.attributeEquals=t.hasAttribute=t.removeAttribute=t.setAttribute=t.getAttribute=void 0;var r=n(0),o=t.getAttribute=(0,r.curry)(function(e,t){return t.getAttribute(e)}),a=t.setAttribute=(0,r.curry)(function(e,t,n){return n.setAttribute(e,t)}),i=(t.removeAttribute=(0,r.curry)(function(e,t){return t.removeAttribute(e)}),t.hasAttribute=(0,r.curry)(function(e,t){return t.hasAttribute(e)}),t.attributeEquals=(0,r.curry)(function(e,t,n){return n.getAttribute(e)===t}),t.toggleAttribute=(0,r.curry)(function(e,t){var n=o(e,t);a(e,(0,r.inverseBooleanString)(n),t)}),t.appendChild=(0,r.curry)(function(e,t){return e.appendChild(t)}),t.querySelector=(0,r.curry)(function(e,t){return t.querySelector(e)}),t.nodeListToArray=function(e){return Array.prototype.slice.call(e)}),s=(t.querySelectorAll=(0,r.curry)(function(e,t){return i(t.querySelectorAll(e))}),t.removeChild=(0,r.curry)(function(e,t){return e.removeChild(t)}),t.classListContains=(0,r.curry)(function(e,t){return t.classList.contains(e)}),t.addClass=(0,r.curry)(function(e,t){return t.classList.add(e)})),l=t.removeClass=(0,r.curry)(function(e,t){return t.classList.remove(e)}),c=t.hide=s("hidden"),u=t.show=l("hidden");t.toggleVisibility=(0,r.curry)(function(e,t){return(e?u:c)(t)}),t.toggleClass=(0,r.curry)(function(e,t,n){n.classList[t?"add":"remove"](e)}),t.createElement=function(e){var t=e.tag,n=e.id,r=e.classes,o=e.attributes,a=document.createElement(t);return n&&(a.id=n),r&&r.forEach(function(e){a.classList.add(e)}),o&&Object.keys(o).forEach(function(e){a.setAttribute(e,o[e])}),a}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){var t=e.length;return function n(){var r=Array.prototype.slice.call(arguments,0);return r.length>=t?e.apply(null,r):function(){var e=Array.prototype.slice.call(arguments,0);return n.apply(null,r.concat(e))}}},o=function(e,t){return t.substr(0,1)===e},a=function(e,t){return t.substr(-1)===e},i=r(function(e,t){return o(e,t)&&(t=t.slice(1)),a(e,t)&&(t=t.slice(0,-1)),t}),s=function(e){for(var t=e.length;t>0;){var n=Math.floor(Math.random()*t);t--;var r=e[t];e[t]=e[n],e[n]=r}return e},l=function(e){var t=document.createElement("span");return t.innerHTML=e,t};t.default={curry:r,cleanCharacter:i,startsWith:o,endsWith:a,shuffle:s,createElementWithTextPart:l}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(14),a=n(15),i=r(a),s=n(2),l=r(s),c=n(12),u=r(c),d=n(13),p=r(d),h=n(7),g=r(h),f=n(5),b=r(f),m=n(6),v=r(m),y=n(9),D=r(y),E=n(10),w=r(E);H5P.DragText=function(e,t,n){function r(n,r,o){var a=this;this.$=e(this),this.contentId=r,this.contentData=o,t.call(this,"drag-text"),this.params=e.extend(!0,{taskDescription:"Set in adjectives in the following sentence",textField:"This is a *nice*, *flexible* content type, which allows you to highlight all the *wonderful* words in this *exciting* sentence.\nThis is another line of *fantastic* text.",overallFeedback:[],checkAnswer:"Check",submitAnswer:"Submit",tryAgain:"Retry",behaviour:{enableRetry:!0,enableSolutionsButton:!0,enableCheckButton:!0,instantFeedback:!1},showSolution:"Show solution",dropZoneIndex:"Drop Zone @index.",empty:"Empty.",contains:"Drop Zone @index contains draggable @draggable.",ariaDraggableIndex:"@index of @count.",tipLabel:"Show tip",correctText:"Correct!",incorrectText:"Incorrect!",resetDropTitle:"Reset drop",resetDropDescription:"Are you sure you want to reset this drop zone?",grabbed:"Draggable is grabbed.",cancelledDragging:"Cancelled dragging.",correctAnswer:"Correct answer:",scoreBarLabel:"You got :num out of :total points",a11yCheck:"Check the answers. The responses will be marked as correct, incorrect, or unanswered.",a11yShowSolution:"Show the solution. The task will be marked with its correct solution.",a11yRetry:"Retry the task. Reset all responses and start the task over again."},n),this.contentData=o,void 0!==this.contentData&&void 0!==this.contentData.previousState&&void 0!==this.contentData.previousState.length&&(this.previousState=this.contentData.previousState),this.answered=!1,this.textFieldHtml=this.params.textField.replace(/(\r\n|\n|\r)/gm,"<br/>"),this.introductionId="h5p-drag-text-"+r+"-introduction",this.selectedElement=void 0,this.ariaDragControls=new b.default,this.ariaDropControls=new v.default,this.dragControls=new g.default([new D.default,new w.default,this.ariaDragControls]),this.dragControls.useNegativeTabIndex(),this.dropControls=new g.default([new D.default,new w.default,this.ariaDropControls]),this.dropControls.useNegativeTabIndex(),this.dragControls.on("before-select",function(e){return!a.isElementDisabled(e.element)}),this.dragControls.on("select",this.keyboardDraggableSelected,this),this.dropControls.on("select",this.keyboardDroppableSelected,this),this.on("start",this.addAllDroppablesToControls,this),this.on("revert",this.removeControlsFromEmptyDropZones,this),this.on("stop",function(e){e.data.target||a.removeControlsFromDropZonesIfAllEmpty()},this),this.on("drop",this.removeControlsFromEmptyDropZones,this),this.on("start",function(e){var t=e.data.element,n=a.getDraggableByElement(t);a.toggleDropEffect(),t.setAttribute("aria-grabbed","true"),a.setDraggableAriaLabel(n)}),this.on("stop",function(e){var t=e.data.element,n=a.getDraggableByElement(t);a.toggleDropEffect(),t.setAttribute("aria-grabbed","false"),a.setDraggableAriaLabel(n)}),this.on("drop",this.ariaDropControls.setAllToNone,this.ariaDropControls),this.on("drop",function(e){this.dragControls.removeElement(e.data.element)},this),this.on("revert",function(e){this.dragControls.insertElementAt(e.data.element,0)},this),this.on("drop",this.updateDroppableElement,this),this.on("revert",this.updateDroppableElement,this),this.initDragText(),this.stopWatch=new i.default,this.stopWatch.start(),this.on("resize",this.resize,this),this.on("revert",this.toggleDraggablesContainer,this),this.on("drop",this.toggleDraggablesContainer,this),this.on("stop",function(e){e.data.target||a.read(a.params.cancelledDragging)}),this.params.behaviour.instantFeedback&&this.on("revert",function(){return a.instantFeedbackEvaluation()})}return r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.prototype.updateDroppableElement=function(e){var t=e.data.target,n=e.data.element,r=this.getDroppableByElement(t);t&&this.setDroppableLabel(t,n.textContent,r.getIndex())},r.prototype.removeControlsFromDropZonesIfAllEmpty=function(){this.anyDropZoneHasDraggable()||this.removeAllDroppablesFromControls()},r.prototype.removeControlsFromEmptyDropZones=function(){var e=this;this.droppables.filter(function(e){return!e.hasDraggable()}).map(function(e){return e.getElement()}).forEach(function(t){e.dropControls.removeElement(t)})},r.prototype.addAllDroppablesToControls=function(){var e=this;this.dropControls.count()>0&&this.removeAllDroppablesFromControls(),this.droppables.map(function(e){return e.getElement()}).forEach(function(t){return e.dropControls.addElement(t)})},r.prototype.removeAllDroppablesFromControls=function(){var e=this;this.droppables.map(function(e){return e.getElement()}).forEach(function(t){return e.dropControls.removeElement(t)})},r.prototype.anyDropZoneHasDraggable=function(){return this.droppables.some(function(e){return e.hasDraggable()})},r.prototype.setDroppableLabel=function(e,t,n){var r=(this.params.dropZoneIndex.replace("@index",n.toString()),e.classList.contains("h5p-drag-correct-feedback")),o=e.classList.contains("h5p-drag-wrong-feedback"),a=r||o,i=e.childNodes.length>0;if(e){var s=void 0;if(a){var l=this.getDroppableByElement(e),c="";c=r?l.correctFeedback?l.correctFeedback:this.params.correctText:l.incorrectFeedback?l.incorrectFeedback:this.params.incorrectText,s=this.params.contains.replace("@index",n.toString()).replace("@draggable",t)+" "+c+".",l&&l.containedDraggable&&l.containedDraggable.updateAriaDescription(r?this.params.correctText:this.params.incorrectText)}else s=i?""+this.params.contains.replace("@index",n.toString()).replace("@draggable",t):""+this.params.empty.replace("@index",n.toString());e.setAttribute("aria-label",s)}},r.prototype.registerDomElements=function(){this.$introduction=e('<p id="'+this.introductionId+'">'+this.params.taskDescription+"</p>"),this.setIntroduction(this.$introduction),this.$introduction.parent().attr("tabindex","-1"),this.setContent(this.$inner),this.addButtons()},r.prototype.initDragText=function(){return this.$inner=e("<div/>",{"aria-describedby":this.introductionId,class:"h5p-drag-inner"}),this.addTaskTo(this.$inner),this.setH5PUserState(),this.$inner},r.prototype.resize=function(){this.changeLayoutToFitWidth()},r.prototype.changeLayoutToFitWidth=function(){var e=this;e.addDropzoneWidth(),e.$inner.width()/parseFloat(e.$inner.css("font-size"),10)>43&&e.widestDraggable<=e.$inner.width()/3?(e.$draggables.addClass("h5p-drag-wide-screen"),e.$wordContainer.detach().appendTo(e.$taskContainer),e.draggables.forEach(function(e){e.getDraggableElement().addClass("h5p-drag-draggable-wide-screen")}),e.$wordContainer.css({"margin-right":e.$draggables.width()})):(e.$wordContainer.css({"margin-right":0}),e.$draggables.removeClass("h5p-drag-wide-screen"),e.$draggables.detach().appendTo(e.$taskContainer),e.draggables.forEach(function(e){e.getDraggableElement().removeClass("h5p-drag-draggable-wide-screen")}))},r.prototype.addButtons=function(){var e=this;e.params.behaviour.enableCheckButton&&e.addButton("check-answer",e.params.checkAnswer,function(){e.answered=!0,e.removeAllElementsFromDragControl(),e.showEvaluation()?(e.hideButton("show-solution"),e.hideButton("try-again"),e.hideButton("check-answer")):(e.params.behaviour.enableRetry&&e.showButton("try-again"),e.params.behaviour.enableSolutionsButton&&e.showButton("show-solution"),e.hideButton("check-answer"),e.disableDraggables()),e.$introduction.parent().focus()},!e.params.behaviour.instantFeedback,{"aria-label":e.params.a11yCheck},{contentData:e.contentData,textIfSubmitting:e.params.submitAnswer}),e.addButton("show-solution",e.params.showSolution,function(){e.droppables.forEach(function(e){e.showSolution()}),e.draggables.forEach(function(t){return e.setDraggableAriaLabel(t)}),e.disableDraggables(),e.removeAllDroppablesFromControls(),e.hideButton("show-solution")},e.initShowShowSolutionButton||!1,{"aria-label":e.params.a11yShowSolution}),e.addButton("try-again",e.params.tryAgain,function(){e.answered&&e.resetDraggables(),e.answered=!1,e.hideEvaluation(),e.hideExplanation(),e.hideButton("try-again"),e.hideButton("show-solution"),e.params.behaviour.instantFeedback?e.enableAllDropzonesAndDraggables():(e.showButton("check-answer"),e.enableDraggables()),e.hideAllSolutions(),e.stopWatch.reset(),e.read(e.params.taskDescription)},e.initShowTryAgainButton||!1,{"aria-label":e.params.a11yRetry})},r.prototype.removeAllElementsFromDragControl=function(){var e=this;this.dragControls.elements.forEach(function(t){return e.dragControls.removeElement(t)})},r.prototype.keyboardDraggableSelected=function(e){var t=this.selectedElement,n=void 0!==this.selectedElement,r=this.selectedElement===e.element;n&&(this.selectedElement=void 0,this.trigger("stop",{element:t})),n&&r||this.isElementDisabled(e.element)||(this.selectedElement=e.element,this.trigger("start",{element:e.element}),this.focusOnFirstEmptyDropZone())},r.prototype.focusOnFirstEmptyDropZone=function(){var e=this.droppables.filter(function(e){return!e.hasDraggable()})[0],t=e.getElement();this.dropControls.setTabbable(t),t.focus()},r.prototype.isElementDisabled=function(e){return"true"===e.getAttribute("aria-disabled")},r.prototype.keyboardDroppableSelected=function(e){var t=this,n=e.element,r=t.getDroppableByElement(n),o=t.getDraggableByElement(this.selectedElement),a=this.params.behaviour.instantFeedback&&r&&r.isCorrect(),i=!this.params.behaviour.instantFeedback&&r.hasFeedback();if(o&&r&&!a){var s=t.selectedElement;t.drop(o,r),t.selectedElement=void 0,this.trigger("stop",{element:s,target:r.getElement()})}else if(r&&r.hasDraggable()&&!i&&!a){var l=n.querySelector("[aria-grabbed]");this.createConfirmResetDialog(function(){t.revert(t.getDraggableByElement(l))}).show()}},r.prototype.toggleDraggablesContainer=function(){var e=0===this.$draggables.children().length;this.$draggables.toggleClass("hide",e)},r.prototype.createConfirmResetDialog=function(e,t){var r=this,o=new n({headerText:r.params.resetDropTitle,dialogText:r.params.resetDropDescription});return o.appendTo(document.body),o.on("confirmed",e,t||this),o},r.prototype.showDropzoneFeedback=function(){var e=this;this.droppables.forEach(function(t){t.addFeedback();var n=t.containedDraggable;t&&n&&(e.setDroppableLabel(t.getElement(),n.getElement().textContent,t.getIndex()),e.setDraggableAriaLabel(n))})},r.prototype.showExplanation=function(){var e=this,t=[];this.droppables.forEach(function(e){var n=e.containedDraggable;e&&n&&(e.isCorrect()&&e.correctFeedback&&t.push({correct:n.text,text:e.correctFeedback}),!e.isCorrect()&&e.incorrectFeedback&&t.push({correct:e.text,wrong:n.text,text:e.incorrectFeedback}))}),0!==t.length&&this.setExplanation(t,e.params.feedbackHeader)},r.prototype.showEvaluation=function(e){this.hideEvaluation(),this.showDropzoneFeedback(),this.showExplanation();var t=this.calculateScore(),n=this.droppables.length;if(!e){var r=this.createXAPIEventTemplate("answered");this.addQuestionToXAPI(r),this.addResponseToXAPI(r),this.trigger(r)}var o=H5P.Question.determineOverallFeedback(this.params.overallFeedback,t/n).replace(/@score/g,t.toString()).replace(/@total/g,n.toString());return t===n&&(this.hideButton("check-answer"),this.hideButton("show-solution"),this.hideButton("try-again"),this.disableDraggables()),this.trigger("resize"),this.setFeedback(o,t,n,this.params.scoreBarLabel),t===n},r.prototype.calculateScore=function(){return this.droppables.reduce(function(e,t){return e+(t.isCorrect()?1:0)},0)},r.prototype.hideEvaluation=function(){this.removeFeedback(),this.trigger("resize")},r.prototype.hideExplanation=function(){this.setExplanation(),this.trigger("resize")},r.prototype.hideAllSolutions=function(){this.droppables.forEach(function(e){e.hideSolution()}),this.trigger("resize")},r.prototype.addTaskTo=function(t){var n=this;n.widest=0,n.widestDraggable=0,n.droppables=[],n.draggables=[],n.$taskContainer=e("<div/>",{class:"h5p-drag-task"}),n.$draggables=e("<div/>",{class:"h5p-drag-draggables-container"}),n.$wordContainer=e("<div/>",{class:"h5p-drag-droppable-words"}),(0,o.parseText)(n.textFieldHtml).forEach(function(e){if(n.isAnswerPart(e)){var t=(0,o.lex)(e);n.createDraggable(t.text),n.createDroppable(t.text,t.tip,t.correctFeedback,t.incorrectFeedback)}else{var r=l.default.createElementWithTextPart(e);n.$wordContainer.append(r)}}),n.shuffleAndAddDraggables(n.$draggables),n.$draggables.appendTo(n.$taskContainer),n.$wordContainer.appendTo(n.$taskContainer),n.$taskContainer.appendTo(t),n.addDropzoneWidth()},r.prototype.isAnswerPart=function(e){return l.default.startsWith("*",e)&&l.default.endsWith("*",e)},r.prototype.addDropzoneWidth=function(){var e=this,t=0,n=0,r=parseInt(this.$inner.css("font-size"),10),o=3*r,a=r;this.draggables.forEach(function(e){var r=e.getDraggableElement(),o=r.clone().css({position:"absolute","white-space":"nowrap",width:"auto",padding:0,margin:0}).html(e.getAnswerText()).appendTo(r.parent()),i=o.outerWidth();n=i>n?i:n,o.text().length>=20&&(o.html(e.getShortFormat()),i=o.width()),i+a>t&&(t=i+a),o.remove()}),t<o&&(t=o),this.widestDraggable=n,this.widest=t,this.droppables.forEach(function(t){t.getDropzone().width(e.widest)})},r.prototype.createDraggable=function(t){var n=this,r=e("<div/>",{html:"<span>"+t+"</span>",role:"button","aria-grabbed":"false",tabindex:"-1"}).draggable({revert:function(e){return e||n.revert(o),!1},drag:n.propagateDragEvent("drag",n),start:n.propagateDragEvent("start",n),stop:function(e){n.trigger("stop",{element:o.getElement(),target:e.target})},containment:n.$taskContainer}).append(e("<span>",{class:"h5p-hidden-read"})),o=new u.default(t,r,n.draggables.length);return o.on("addedToZone",function(){n.triggerXAPI("interacted")}),n.draggables.push(o),o},r.prototype.createDroppable=function(t,n,r,o){var a=this,i=this.draggables.length,s=e("<div/>",{class:"h5p-drag-dropzone-container"}),l=e("<div/>",{"aria-dropeffect":"none","aria-label":this.params.dropZoneIndex.replace("@index",i.toString())+" "+this.params.empty.replace("@index",i.toString()),tabindex:"-1"}).appendTo(s).droppable({tolerance:"pointer",drop:function(e,t){var n=a.getDraggableByElement(t.draggable[0]),r=a.getDroppableByElement(e.target);n&&r&&a.drop(n,r)}}),c=new p.default(t,n,r,o,l,s,i,a.params);return c.appendDroppableTo(a.$wordContainer),a.droppables.push(c),c},r.prototype.propagateDragEvent=l.default.curry(function(e,t,n){t.trigger(e,{element:n.target})}),r.prototype.revert=function(e){var t=e.removeFromZone(),n=t?t.getElement():void 0;e.revertDraggableTo(this.$draggables),this.setDraggableAriaLabel(e),this.trigger("revert",{element:e.getElement(),target:n}),this.trigger("resize")},r.prototype.drop=function(e,t){var n=this;n.answered=!0,e.removeFromZone();var r=t.appendInsideDroppableTo(this.$draggables);r&&n.trigger("revert",{element:r.getElement(),target:t.getElement()}),t.setDraggable(e),e.appendDraggableTo(t.getDropzone()),n.params.behaviour.instantFeedback&&(t.addFeedback(),n.instantFeedbackEvaluation(),n.params.behaviour.enableRetry&&!t.isCorrect()||t.disableDropzoneAndContainedDraggable()),this.trigger("drop",{element:e.getElement(),target:t.getElement()}),this.trigger("resize"),t.getElement().focus()},r.prototype.shuffleAndAddDraggables=function(e){var t=this;return l.default.shuffle(this.draggables).map(function(e,t){return e.setIndex(t)}).map(function(n){return t.addDraggableToContainer(e,n)}).map(function(e){return t.setDraggableAriaLabel(e)}).map(function(e){return t.addDraggableToControls(t.dragControls,e)})},r.prototype.setDraggableAriaLabel=function(e){return e.updateAriaLabel(this.params.ariaDraggableIndex.replace("@index",(e.getIndex()+1).toString()).replace("@count",this.draggables.length.toString())),e},r.prototype.isGrabbed=function(e){return"true"===e.getAttribute("aria-grabbed")},r.prototype.addDraggableToContainer=function(e,t){return t.appendDraggableTo(e),t},r.prototype.addDraggableToControls=function(e,t){return e.addElement(t.getElement()),t},r.prototype.instantFeedbackEvaluation=function(){var e=this;e.isAllAnswersFilled()?(e.params.behaviour.enableSolutionsButton&&e.showButton("show-solution"),e.params.behaviour.enableRetry&&e.showButton("try-again"),e.showEvaluation()):(e.hideButton("try-again"),e.hideButton("show-solution"),e.hideEvaluation())},r.prototype.isAllAnswersFilled=function(){return this.draggables.every(function(e){return e.isInsideDropZone()})},r.prototype.enableAllDropzonesAndDraggables=function(){this.enableDraggables(),this.droppables.forEach(function(e){e.enableDropzone()})},r.prototype.disableDraggables=function(){this.draggables.forEach(function(e){e.disableDraggable()})},r.prototype.enableDraggables=function(){this.draggables.forEach(function(e){e.enableDraggable()})},r.prototype.getAnswerGiven=function(){return this.answered},r.prototype.getScore=function(){return this.calculateScore()},r.prototype.getMaxScore=function(){return this.droppables.length},r.prototype.getTitle=function(){return H5P.createTitle(this.contentData&&this.contentData.metadata&&this.contentData.metadata.title?this.contentData.metadata.title:"Drag the Words")},r.prototype.toggleDropEffect=function(){var e=void 0!==this.selectedElement;this.ariaDropControls[e?"setAllToMove":"setAllToNone"]()},r.prototype.getDraggableByElement=function(e){return this.draggables.filter(function(t){return t.$draggable.get(0)===e},this)[0]},r.prototype.getDroppableByElement=function(e){return this.droppables.filter(function(t){return t.$dropzone.get(0)===e},this)[0]},r.prototype.showSolutions=function(){this.showEvaluation(!0),this.droppables.forEach(function(e){e.addFeedback(),e.showSolution()}),this.removeAllDroppablesFromControls(),this.disableDraggables(),this.hideButton("try-again"),this.hideButton("show-solution"),this.hideButton("check-answer"),this.trigger("resize")},r.prototype.resetTask=function(){var e=this;e.answered=!1,e.resetDraggables(),e.hideEvaluation(),e.hideExplanation(),e.enableAllDropzonesAndDraggables(),e.hideButton("try-again"),e.hideButton("show-solution"),e.params.behaviour.instantFeedback||e.showButton("check-answer"),e.hideAllSolutions(),this.trigger("resize")},r.prototype.resetDraggables=function(){l.default.shuffle(this.draggables).forEach(this.revert,this)},r.prototype.getCurrentState=function(){var e=this;if(void 0!==this.draggables)return this.draggables.filter(function(e){return null!==e.getInsideDropzone()}).map(function(t){return{draggable:t.getInitialIndex(),droppable:e.droppables.indexOf(t.getInsideDropzone())}})},r.prototype.setH5PUserState=function(){var e=this,t=this;void 0!==this.previousState&&(this.previousState.forEach(function(n){if(!t.isValidIndex(n.draggable)||!t.isValidIndex(n.droppable))throw new Error("Stored user state is invalid");var r=e.getDraggableByInitialIndex(n.draggable),o=t.droppables[n.droppable];t.drop(r,o),t.params.behaviour.instantFeedback&&(null!==o&&o.addFeedback(),o.isCorrect()&&o.disableDropzoneAndContainedDraggable())}),t.params.behaviour.instantFeedback&&t.isAllAnswersFilled()&&!t.showEvaluation()&&(t.params.behaviour.enableSolutionsButton&&(t.initShowShowSolutionButton=!0),t.params.behaviour.enableRetry&&(t.initShowTryAgainButton=!0)))},r.prototype.isValidIndex=function(e){return!isNaN(e)&&e<this.draggables.length&&e>=0},r.prototype.getDraggableByInitialIndex=function(e){return this.draggables.filter(function(t){return t.hasInitialIndex(e)})[0]},r.prototype.getXAPIData=function(){var e=this.createXAPIEventTemplate("answered");return this.addQuestionToXAPI(e),this.addResponseToXAPI(e),{statement:e.data.statement}},r.prototype.addQuestionToXAPI=function(t){var n=t.getVerifiedStatementValue(["object","definition"]);e.extend(n,this.getxAPIDefinition())},r.prototype.getxAPIDefinition=function(){var e={};e.interactionType="fill-in",e.type="http://adlnet.gov/expapi/activities/cmi.interaction";var t=this.textFieldHtml,n=this.params.taskDescription+"<br/>";return e.description={"en-US":n+this.replaceSolutionsWithBlanks(t)},e.correctResponsesPattern=[this.getSolutionsFromQuestion(t)],e},r.prototype.addResponseToXAPI=function(e){var t,n=this,r=n.getScore(),o=n.droppables.length;e.setScoredResult(r,o,n);var a={min:0,raw:r,max:o,scaled:Math.round(r/o*1e4)/1e4};n.stopWatch&&(t="PT"+n.stopWatch.stop()+"S"),e.data.statement.result={response:n.getXAPIResponse(),score:a,duration:t,completion:!0}},r.prototype.getXAPIResponse=function(){return this.droppables.map(function(e){return e.hasDraggable()?e.containedDraggable.text:""}).join("[,]")},r.prototype.replaceSolutionsWithBlanks=function(e){var t=this;return(0,o.parseText)(e).map(function(e){return t.isAnswerPart(e)?"__________":e}).join("")},r.prototype.getSolutionsFromQuestion=function(e){return(0,o.parseText)(e).filter(this.isAnswerPart).map(function(e){return(0,o.lex)(e)}).map(function(e){return e.text}).join("[,]")},r.prototype.parseText=function(e){return(0,o.parseText)(e)},r}(H5P.jQuery,H5P.Question,H5P.ConfirmationDialog),H5P.DragText.parseText=function(e){var t=function(e){return l.default.startsWith("*",e)&&l.default.endsWith("*",e)};return(0,o.parseText)(e).map(function(e){return t(e)?{type:"answer",correct:(0,o.lex)(e).text}:{type:"text",content:e}})},t.default=H5P.DragText},function(e,t){},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(1),i=n(0),s=(0,a.setAttribute)("aria-grabbed"),l=(0,a.attributeEquals)("aria-grabbed","true"),c=(0,i.filter)((0,a.hasAttribute)("aria-grabbed")),u=(0,i.compose)((0,i.forEach)((0,a.setAttribute)("aria-grabbed","false")),c),d=(0,i.compose)((0,i.some)(l),c),p=function(){function e(){r(this,e)}return o(e,[{key:"init",value:function(e){this.controls=e,this.controls.on("select",this.select,this)}},{key:"addElement",value:function(e){s("false",e),this.controls.addElement(e)}},{key:"setAllGrabbedToFalse",value:function(){u(this.controls.elements)}},{key:"hasAnyGrabbed",value:function(){return d(this.controls.elements)}},{key:"select",value:function(e){var t=e.element,n=l(t);this.setAllGrabbedToFalse(),n||s("true",t)}}]),e}();t.default=p},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=n(1),i=n(0),s=(0,a.setAttribute)("aria-dropeffect","none"),l=(0,a.setAttribute)("aria-dropeffect","move"),c=(0,i.filter)((0,a.hasAttribute)("aria-dropeffect")),u=(0,i.compose)((0,i.forEach)(l),c),d=(0,i.compose)((0,i.forEach)(s),c),p=function(){function e(){r(this,e)}return o(e,[{key:"init",value:function(e){this.controls=e}},{key:"setAllToMove",value:function(){u(this.controls.elements)}},{key:"setAllToNone",value:function(){d(this.controls.elements)}}]),e}();t.default=p,p.DropEffect={COPY:"copy",MOVE:"move",EXECUTE:"execute",POPUP:"popup",NONE:"none"}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(1),s=n(0),l=n(8),c=(0,i.removeAttribute)("tabindex"),u=((0,s.forEach)(c),(0,i.setAttribute)("tabindex","0")),d=(0,i.setAttribute)("tabindex","-1"),p=(0,i.hasAttribute)("tabindex"),h=function(){function e(t){r(this,e),o(this,(0,l.Eventful)()),this.plugins=t||[],this.elements=[],this.negativeTabIndexAllowed=!1,this.on("nextElement",this.nextElement,this),this.on("previousElement",this.previousElement,this),this.on("firstElement",this.firstElement,this),this.on("lastElement",this.lastElement,this),this.initPlugins()}return a(e,[{key:"addElement",value:function(e){this.elements.push(e),this.firesEvent("addElement",e),1===this.elements.length&&this.setTabbable(e)}},{key:"insertElementAt",value:function(e,t){this.elements.splice(t,0,e),this.firesEvent("addElement",e),1===this.elements.length&&this.setTabbable(e)}},{key:"removeElement",value:function(e){this.elements=(0,s.without)([e],this.elements),p(e)&&(this.setUntabbable(e),this.elements[0]&&this.setTabbable(this.elements[0])),this.firesEvent("removeElement",e)}},{key:"count",value:function(){return this.elements.length}},{key:"firesEvent",value:function(e,t){var n=this.elements.indexOf(t);return this.fire(e,{element:t,index:n,elements:this.elements,oldElement:this.tabbableElement})}},{key:"nextElement",value:function(e){var t=e.index,n=t===this.elements.length-1,r=this.elements[n?0:t+1];this.setTabbable(r),r.focus()}},{key:"firstElement",value:function(){var e=this.elements[0];this.setTabbable(e),e.focus()}},{key:"lastElement",value:function(){var e=this.elements[this.elements.length-1];this.setTabbable(e),e.focus()}},{key:"setTabbableByIndex",value:function(e){var t=this.elements[e];t&&this.setTabbable(t)}},{key:"setTabbable",value:function(e){(0,s.forEach)(this.setUntabbable.bind(this),this.elements),u(e),this.tabbableElement=e}},{key:"setUntabbable",value:function(e){e!==document.activeElement&&(this.negativeTabIndexAllowed?d(e):c(e))}},{key:"previousElement",value:function(e){var t=e.index,n=0===t,r=this.elements[n?this.elements.length-1:t-1];this.setTabbable(r),r.focus()}},{key:"useNegativeTabIndex",value:function(){this.negativeTabIndexAllowed=!0,this.elements.forEach(function(e){e.hasAttribute("tabindex")||d(e)})}},{key:"initPlugins",value:function(){this.plugins.forEach(function(e){void 0!==e.init&&e.init(this)},this)}}]),e}();t.default=h},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Eventful=function(){return{listeners:{},on:function(e,t,n){var r={listener:t,scope:n};return this.listeners[e]=this.listeners[e]||[],this.listeners[e].push(r),this},fire:function(e,t){return(this.listeners[e]||[]).every(function(e){return!1!==e.listener.call(e.scope||this,t)})},propagate:function(e,t){var n=this;e.forEach(function(e){return t.on(e,function(t){return n.fire(e,t)})})}}}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(){function e(){r(this,e),this.selectability=!0}return o(e,[{key:"init",value:function(e){this.boundHandleKeyDown=this.handleKeyDown.bind(this),this.controls=e,this.controls.on("addElement",this.listenForKeyDown,this),this.controls.on("removeElement",this.removeKeyDownListener,this)}},{key:"listenForKeyDown",value:function(e){e.element.addEventListener("keydown",this.boundHandleKeyDown)}},{key:"removeKeyDownListener",value:function(e){e.element.removeEventListener("keydown",this.boundHandleKeyDown)}},{key:"handleKeyDown",value:function(e){switch(e.which){case 27:this.close(e.target),e.preventDefault(),e.stopPropagation();break;case 35:this.lastElement(e.target),e.preventDefault(),e.stopPropagation();break;case 36:this.firstElement(e.target),e.preventDefault(),e.stopPropagation();break;case 13:case 32:this.select(e.target),e.preventDefault(),e.stopPropagation();break;case 37:case 38:this.hasChromevoxModifiers(e)||(this.previousElement(e.target),e.preventDefault(),e.stopPropagation());break;case 39:case 40:this.hasChromevoxModifiers(e)||(this.nextElement(e.target),e.preventDefault(),e.stopPropagation())}}},{key:"hasChromevoxModifiers",value:function(e){return e.shiftKey||e.ctrlKey}},{key:"previousElement",value:function(e){!1!==this.controls.firesEvent("beforePreviousElement",e)&&(this.controls.firesEvent("previousElement",e),this.controls.firesEvent("afterPreviousElement",e))}},{key:"nextElement",value:function(e){!1!==this.controls.firesEvent("beforeNextElement",e)&&(this.controls.firesEvent("nextElement",e),this.controls.firesEvent("afterNextElement",e))}},{key:"select",value:function(e){this.selectability&&!1!==this.controls.firesEvent("before-select",e)&&(this.controls.firesEvent("select",e),this.controls.firesEvent("after-select",e))}},{key:"firstElement",value:function(e){!1!==this.controls.firesEvent("beforeFirstElement",e)&&(this.controls.firesEvent("firstElement",e),this.controls.firesEvent("afterFirstElement",e))}},{key:"lastElement",value:function(e){!1!==this.controls.firesEvent("beforeLastElement",e)&&(this.controls.firesEvent("lastElement",e),this.controls.firesEvent("afterLastElement",e))}},{key:"disableSelectability",value:function(){this.selectability=!1}},{key:"enableSelectability",value:function(){this.selectability=!0}},{key:"close",value:function(e){!1!==this.controls.firesEvent("before-close",e)&&(this.controls.firesEvent("close",e),this.controls.firesEvent("after-close",e))}}]),e}();t.default=a},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(){function e(){r(this,e),this.selectability=!0,this.handleClickBound=this.handleClick.bind(this),this.handleDragBound=this.handleDrag.bind(this)}return o(e,[{key:"init",value:function(e){this.controls=e,this.controls.on("addElement",this.listenForKeyDown,this),this.controls.on("removeElement",this.unlistenForKeyDown,this)}},{key:"listenForKeyDown",value:function(e){var t=e.element;t.addEventListener("click",this.handleClickBound),t.addEventListener("drag",this.handleClickBound)}},{key:"unlistenForKeyDown",value:function(e){var t=e.element;t.removeEventListener("click",this.handleClickBound),t.removeEventListener("drag",this.handleDragBound)}},{key:"handleClick",value:function(e){this.controls.firesEvent("select",e.currentTarget)}},{key:"handleDrag",value:function(e){this.controls.firesEvent("drag",e.currentTarget)}},{key:"disableSelectability",value:function(){this.selectability=!1}},{key:"enableSelectability",value:function(){this.selectability=!0}}]),e}();t.default=a},function(e,t,n){"use strict";n(4),H5P=H5P||{},H5P.DragText=n(3).default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),H5P.TextDraggable=function(e){function t(t,n,r){H5P.EventDispatcher.call(this);var o=this;o.text=t,o.insideDropzone=null,o.$draggable=e(n),o.$ariaLabel=o.$draggable.find(".h5p-hidden-read"),o.index=r,o.initialIndex=r,o.shortFormat=o.text,o.shortFormat.length>20&&!o.shortFormat.match(/\\\(.+\\\)|\\\[.+\\\]|\$\$.+\$\$/)&&(o.shortFormat=o.shortFormat.slice(0,17)+"..."),o.$draggable.on("touchstart",function(e){e.stopPropagation()})}return t.prototype=Object.create(H5P.EventDispatcher.prototype),t.prototype.constructor=t,t.prototype.getIndex=function(){return this.index},t.prototype.setIndex=function(e){return this.index=e,this},t.prototype.getInitialIndex=function(){return this.initialIndex},t.prototype.hasInitialIndex=function(e){return this.initialIndex===e},t.prototype.appendDraggableTo=function(e){this.$draggable.detach().css({left:0,top:0}).appendTo(e)},t.prototype.revertDraggableTo=function(e){var t=this.$draggable.offset().left-e.offset().left,n=this.$draggable.offset().top-e.offset().top;this.$draggable.detach().prependTo(e).css({left:t,top:n}).animate({left:0,top:0})},t.prototype.toggleDroppedFeedback=function(e){e?this.$draggable.addClass("h5p-drag-dropped"):this.$draggable.removeClass("h5p-drag-dropped")},t.prototype.disableDraggable=function(){this.$draggable.draggable({disabled:!0})},t.prototype.enableDraggable=function(){this.$draggable.draggable({disabled:!1})},t.prototype.getDraggableElement=function(){return this.$draggable},t.prototype.updateAriaLabel=function(e){this.$ariaLabel.html(e)},t.prototype.updateAriaDescription=function(e){this.$draggable.attr("aria-description",e)},t.prototype.getElement=function(){return this.$draggable.get(0)},t.prototype.removeFromZone=function(){var e=this.insideDropzone;return null!==this.insideDropzone&&(this.insideDropzone.removeFeedback(),this.insideDropzone.removeDraggable()),this.toggleDroppedFeedback(!1),this.removeShortFormat(),this.updateAriaDescription(""),this.insideDropzone=null,e},t.prototype.addToZone=function(e){null!==this.insideDropzone&&this.insideDropzone.removeDraggable(),this.toggleDroppedFeedback(!0),this.insideDropzone=e,this.setShortFormat(),this.trigger("addedToZone")},t.prototype.getAnswerText=function(){return this.text},t.prototype.setShortFormat=function(){this.$draggable.html(this.shortFormat)},t.prototype.getShortFormat=function(){return this.shortFormat},t.prototype.removeShortFormat=function(){this.$draggable.html(this.text)},t.prototype.getInsideDropzone=function(){return this.insideDropzone},t.prototype.isInsideDropZone=function(){return!!this.insideDropzone},t}(H5P.jQuery),t.default=H5P.TextDraggable},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),H5P.TextDroppable=function(e){function t(t,r,o,a,i,s,l,c){var u=this;u.text=t,u.tip=r,u.correctFeedback=o,u.incorrectFeedback=a,u.index=l,u.params=c,u.containedDraggable=null,u.$dropzone=e(i),u.$dropzoneContainer=e(s),u.tip&&(u.$tip=H5P.JoubelUI.createTip(u.tip,{tipLabel:u.params.tipLabel,tabcontrol:!0}),u.$dropzoneContainer.append(u.$tip),u.$dropzone.focus(function(){return u.$tip.attr("tabindex","0")}),u.$dropzone.blur(function(){return u.removeTipTabIndexIfNoFocus()}),u.$tip.blur(function(){return u.removeTipTabIndexIfNoFocus()})),u.$incorrectText=e("<div/>",{html:u.params.incorrectText+" "+u.params.correctAnswer,class:"correct-answer"}),u.$correctText=e("<div/>",{html:u.params.correctText,class:"correct-answer"}),u.$showSolution=e("<div/>",{class:n}).appendTo(u.$dropzoneContainer).hide()}var n="h5p-drag-show-solution-container",r="h5p-drag-correct-feedback",o="h5p-drag-wrong-feedback";return t.prototype.removeTipTabIndexIfNoFocus=function(){var e=this;setTimeout(function(){e.$dropzone.is(":focus")||e.$tip.is(":focus")||e.$tip.attr("tabindex","-1")},0)},t.prototype.showSolution=function(){var e=null!==this.containedDraggable&&this.containedDraggable.getAnswerText()===this.text;e||this.$showSolution.html(this.text),this.$showSolution.prepend(e?this.$correctText:this.$incorrectText),this.$showSolution.toggleClass("incorrect",!e),this.$showSolution.show()},t.prototype.hideSolution=function(){this.$showSolution.html(""),this.$showSolution.hide()},t.prototype.getElement=function(){return this.$dropzone.get(0)},t.prototype.appendDroppableTo=function(e){this.$dropzoneContainer.appendTo(e)},t.prototype.appendInsideDroppableTo=function(e){if(null!==this.containedDraggable)return this.containedDraggable.revertDraggableTo(e),this.containedDraggable},t.prototype.setDraggable=function(e){var t=this;t.containedDraggable!==e&&(null!==t.containedDraggable&&t.containedDraggable.removeFromZone(),t.containedDraggable=e,e.addToZone(t))},t.prototype.hasDraggable=function(){return!!this.containedDraggable},t.prototype.removeDraggable=function(){null!==this.containedDraggable&&(this.containedDraggable=null)},t.prototype.isCorrect=function(){return null!==this.containedDraggable&&this.containedDraggable.getAnswerText()===this.text},t.prototype.addFeedback=function(){this.isCorrect()?(this.$dropzone.removeClass(o).addClass(r),this.containedDraggable.getDraggableElement().removeClass("h5p-drag-draggable-wrong").addClass("h5p-drag-draggable-correct")):null===this.containedDraggable?this.$dropzone.removeClass(o).removeClass(r):(this.$dropzone.removeClass(r).addClass(o),null!==this.containedDraggable&&this.containedDraggable.getDraggableElement().addClass("h5p-drag-draggable-wrong").removeClass("h5p-drag-draggable-correct"))},t.prototype.removeFeedback=function(){this.$dropzone.removeClass(o).removeClass(r),null!==this.containedDraggable&&this.containedDraggable.getDraggableElement().removeClass("h5p-drag-draggable-wrong").removeClass("h5p-drag-draggable-correct")},t.prototype.hasFeedback=function(){return this.$dropzone.hasClass(o)||this.$dropzone.hasClass(r)},t.prototype.setShortFormat=function(){null!==this.containedDraggable&&this.containedDraggable.setShortFormat()},t.prototype.disableDropzoneAndContainedDraggable=function(){null!==this.containedDraggable&&this.containedDraggable.disableDraggable(),this.$dropzone.droppable({disabled:!0})},t.prototype.enableDropzone=function(){this.$dropzone.droppable({disabled:!1})},t.prototype.removeShortFormat=function(){null!==this.containedDraggable&&this.containedDraggable.removeShortFormat()},t.prototype.getDropzone=function(){return this.$dropzone},t.prototype.getIndex=function(){return this.index},t}(H5P.jQuery),t.default=H5P.TextDroppable},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.lex=t.parseText=void 0;var r=n(2),o=function(e){return e&&e.__esModule?e:{default:e}}(r),a=function(e){return e.split(/(\*.*?\*)/).filter(function(e){return e.length>0})},i=function(e){var t=e.match(/(:([^\\*]+))/g),n=e.match(/(\\\+([^\\*:]+))/g),r=e.match(/(\\\-([^\\*:]+))/g),a=o.default.cleanCharacter("*",e);return t&&(a=a.replace(t,""),t=t[0].replace(":",""),t=t.replace(/\s+$/,"")),n&&(a=a.replace(n,""),n=n[0].replace("\\+",""),n=n.replace(/\s+$/,"")),r&&(a=a.replace(r,""),r=r[0].replace("\\-",""),r=r.replace(/\s+$/,"")),a=a.replace(/\s+$/,""),{tip:t,correctFeedback:n,incorrectFeedback:r,text:a}};t.parseText=a,t.lex=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=r||{};r.DragText=r.DragText||{},r.DragText.StopWatch=function(){function e(){this.duration=0}return e.prototype.start=function(){return this.startTime=Date.now(),this},e.prototype.stop=function(){return this.duration=this.duration+Date.now()-this.startTime,this.passedTime()},e.prototype.reset=function(){this.duration=0,this.startTime=Date.now()},e.prototype.passedTime=function(){return Math.round(this.duration/10)/100},e}(),t.default=r.DragText.StopWatch}]);;
!function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=t.curry=function(e){var t=e.length;return function n(){var i=Array.prototype.slice.call(arguments,0);return i.length>=t?e.apply(null,i):function(){var e=Array.prototype.slice.call(arguments,0);return n.apply(null,i.concat(e))}}},o=(t.compose=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.reduce(function(e,t){return function(){return e(t.apply(void 0,arguments))}})},t.forEach=i(function(e,t){t.forEach(e)}),t.map=i(function(e,t){return t.map(e)}),t.filter=i(function(e,t){return t.filter(e)})),r=(t.some=i(function(e,t){return t.some(e)}),t.contains=i(function(e,t){return-1!=t.indexOf(e)}));t.without=i(function(e,t){return o(function(t){return!r(t,e)},t)}),t.inverseBooleanString=function(e){return("true"!==e).toString()}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createElement=t.toggleClass=t.toggleVisibility=t.show=t.hide=t.removeClass=t.addClass=t.classListContains=t.removeChild=t.querySelectorAll=t.nodeListToArray=t.querySelector=t.appendChild=t.toggleAttribute=t.attributeEquals=t.hasAttribute=t.removeAttribute=t.setAttribute=t.getAttribute=void 0;var i=n(0),o=t.getAttribute=(0,i.curry)(function(e,t){return t.getAttribute(e)}),r=t.setAttribute=(0,i.curry)(function(e,t,n){return n.setAttribute(e,t)}),a=(t.removeAttribute=(0,i.curry)(function(e,t){return t.removeAttribute(e)}),t.hasAttribute=(0,i.curry)(function(e,t){return t.hasAttribute(e)}),t.attributeEquals=(0,i.curry)(function(e,t,n){return n.getAttribute(e)===t}),t.toggleAttribute=(0,i.curry)(function(e,t){var n=o(e,t);r(e,(0,i.inverseBooleanString)(n),t)}),t.appendChild=(0,i.curry)(function(e,t){return e.appendChild(t)}),t.querySelector=(0,i.curry)(function(e,t){return t.querySelector(e)}),t.nodeListToArray=function(e){return Array.prototype.slice.call(e)}),s=(t.querySelectorAll=(0,i.curry)(function(e,t){return a(t.querySelectorAll(e))}),t.removeChild=(0,i.curry)(function(e,t){return e.removeChild(t)}),t.classListContains=(0,i.curry)(function(e,t){return t.classList.contains(e)}),t.addClass=(0,i.curry)(function(e,t){return t.classList.add(e)})),l=t.removeClass=(0,i.curry)(function(e,t){return t.classList.remove(e)}),u=t.hide=s("hidden"),c=t.show=l("hidden");t.toggleVisibility=(0,i.curry)(function(e,t){return(e?c:u)(t)}),t.toggleClass=(0,i.curry)(function(e,t,n){n.classList[t?"add":"remove"](e)}),t.createElement=function(e){var t=e.tag,n=e.id,i=e.classes,o=e.attributes,r=document.createElement(t);return n&&(r.id=n),i&&i.forEach(function(e){r.classList.add(e)}),o&&Object.keys(o).forEach(function(e){r.setAttribute(e,o[e])}),r}},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=function(){function e(){i(this,e)}return o(e,null,[{key:"setElementOpacity",value:function(t,n){e.setOpacity(t,"borderColor",n),e.setOpacity(t,"boxShadow",n),e.setOpacity(t,"background",n)}},{key:"setOpacity",value:function(t,n,i){function o(e,t){switch(e){case"borderColor":return{borderTopColor:t,borderRightColor:t,borderBottomColor:t,borderLeftColor:t};default:var n={};return n[e]=t,n}}if("background"===n)return e.setOpacity(t,"backgroundColor",i),void e.setOpacity(t,"backgroundImage",i);i=void 0===i?1:i/100;var r=t.css(n),a=o(n,"");t.css(a);for(var s in a)break;var l=t.css(s);""!==l&&"none"!==l||(l=r),l=e.setAlphas(l,"rgba(",i),l=e.setAlphas(l,"rgb(",i),t.css(o(n,l))}},{key:"setAlphas",value:function(e,t,n){if(e){for(var i=e.indexOf(t);-1!==i;){var o=e.indexOf(")",i),r=e.substring(i+t.length,o).split(",");r[3]=void 0!==r[3]?parseFloat(r[3])*n:n,e=e.substring(0,i)+"rgba("+r.join(",")+e.substring(o,e.length),i=e.indexOf(t,o)}return e}}},{key:"elementToDraggable",value:function(e,t){for(var n=0;n<e.length;n++)if(e[n]){var i=e[n].findElement(t);if(i)return i.draggable=e[n],i}}},{key:"elementToDropZone",value:function(e,t){for(var n=0;n<e.length;n++)if(e[n].$dropZone.is(t))return e[n]}},{key:"positionToPercentage",value:function(e,t){return{top:100*parseInt(t.css("top"))/e.innerHeight()+"%",left:100*parseInt(t.css("left"))/e.innerWidth()+"%"}}},{key:"addHover",value:function(t,n){t.hover(function(){t.addClass("h5p-draggable-hover"),t.parent().hasClass("h5p-dragging")||e.setElementOpacity(t,n)},function(){t.parent().hasClass("h5p-dragging")||setTimeout(function(){t.removeClass("h5p-draggable-hover"),e.setElementOpacity(t,n)},1)}),e.setElementOpacity(t,n)}},{key:"strip",value:function(e){var t=document.createElement("div");return t.innerHTML=e,t.textContent||t.innerText||""}}]),e}();t.default=r},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n){var i,o,r=this;k++,this.id=this.contentId=t,this.contentData=n,H5P.Question.call(r,"dragquestion"),this.options=y.extend(!0,{},{scoreShow:"Check",tryAgain:"Retry",grabbablePrefix:"Grabbable {num} of {total}.",grabbableSuffix:"Placed in dropzone {num}.",dropzonePrefix:"Dropzone {num} of {total}.",noDropzone:"No dropzone",tipLabel:"Show tip.",tipAvailable:"Tip available",correctAnswer:"Correct answer",wrongAnswer:"Wrong answer",feedbackHeader:"Feedback",scoreBarLabel:"You got :num out of :total points",scoreExplanationButtonLabel:"Show score explanation",question:{settings:{questionTitle:this.contentData&&this.contentData.metadata&&this.contentData.metadata.title?this.contentData.metadata.title:"Drag and drop",size:{width:620,height:310}},task:{elements:[],dropZones:[]}},overallFeedback:[],behaviour:{enableRetry:!0,enableCheckButton:!0,preventResize:!1,singlePoint:!1,showSolutionsRequiresInput:!0,applyPenalties:!0,enableScoreExplanation:!0,dropZoneHighlighting:"dragging",autoAlignSpacing:2,showScorePoints:!0,showTitle:!1},a11yCheck:"Check the answers. The responses will be marked as correct, incorrect, or unanswered.",a11yRetry:"Retry the task. Reset all responses and start the task over again.",submit:"Submit"},e),this.options.behaviour.singlePoint&&(this.options.behaviour.enableScoreExplanation=!1),this.draggables=[],this.dropZones=[],this.answered=n&&void 0!==n.previousState&&void 0!==n.previousState.answers&&n.previousState.answers.length,this.blankIsCorrect=!0,this.backgroundOpacity=void 0===this.options.behaviour.backgroundOpacity||""===this.options.behaviour.backgroundOpacity.trim()?void 0:this.options.behaviour.backgroundOpacity,r.$noDropZone=y('<div class="h5p-dq-no-dz" role="button" style="display:none;"><span class="h5p-hidden-read">'+r.options.noDropzone+"</span></div>");var a=w(r.draggables,r.dropZones,r.$noDropZone[0]),s=function(e){for(var t=0;t<a.drop.elements.length;t++)a.drop.elements[t].setAttribute("aria-dropeffect",e)},l=[],u=this.options.question.task;for(this.correctDZs=[],i=0;i<u.dropZones.length;i++){l.push(!0);var c=u.dropZones[i].correctElements;for(o=0;o<c.length;o++){var d=c[o];void 0===this.correctDZs[d]&&(this.correctDZs[d]=[]),this.correctDZs[d].push(i)}}this.weight=1;var h={prefix:r.options.grabbablePrefix.replace("{total}",u.elements.length),suffix:r.options.grabbableSuffix,correctAnswer:r.options.correctAnswer,wrongAnswer:r.options.wrongAnswer};for(i=0;i<u.elements.length;i++){var p=u.elements[i];if(void 0!==p.dropZones&&p.dropZones.length){void 0!==this.backgroundOpacity&&(p.backgroundOpacity=this.backgroundOpacity);var g=null;n&&void 0!==n.previousState&&void 0!==n.previousState.answers&&void 0!==n.previousState.answers[i]&&(g=n.previousState.answers[i]);var v=new m.default(p,i,g,h),x="dragging"===r.options.behaviour.dropZoneHighlighting;for(v.on("elementadd",function(e){a.drag.addElement(e.data)}),v.on("elementremove",function(e){a.drag.removeElement(e.data),"true"===e.data.getAttribute("aria-grabbed")&&(a.drag.firesEvent("select",e.data),e.data.removeAttribute("aria-grabbed"))}),v.on("focus",function(e){a.drag.setTabbable(e.data),e.data.focus()}),v.on("dragstart",function(e){x&&r.$container.addClass("h5p-dq-highlight-dz"),s(e.data)}),v.on("dragend",function(){x&&r.$container.removeClass("h5p-dq-highlight-dz"),s("none")}),v.on("interacted",function(){r.answered=!0,r.triggerXAPI("interacted")}),v.on("leavingDropZone",function(e){r.dropZones[e.data.dropZone].removeAlignable(e.data.$)}),this.draggables[i]=v,o=0;o<p.dropZones.length;o++)l[p.dropZones[o]]=!1}}this.numDropZonesWithoutElements=0;var E={prefix:r.options.dropzonePrefix.replace("{total}",u.dropZones.length),tipLabel:r.options.tipLabel,tipAvailable:r.options.tipAvailable};for(i=0;i<u.dropZones.length;i++){var A=u.dropZones[i];!0===l[i]&&(this.numDropZonesWithoutElements+=1),this.blankIsCorrect&&A.correctElements.length&&(this.blankIsCorrect=!1),A.autoAlign={enabled:A.autoAlign,spacing:r.options.behaviour.autoAlignSpacing,size:r.options.question.settings.size},this.dropZones[i]=new b.default(A,i,E),this.dropZones[i].on("elementaligned",function(e){for(var t=e.data,n=0;n<r.draggables.length;n++){var i=r.draggables[n];if(i&&i.elements&&i.elements.length)for(var o=0;o<i.elements.length;o++){var a=i.elements[o];if(a&&a.$[0]===t[0])return void(a.position=f.default.positionToPercentage(r.$container,a.$))}}})}this.on("resize",r.resize,r),this.on("domChanged",function(e){r.contentId===e.data.contentId&&r.trigger("resize")}),this.on("enterFullScreen",function(){r.$container&&(r.$container.parents(".h5p-content").css("height","100%"),r.trigger("resize"))}),this.on("exitFullScreen",function(){r.$container&&(r.$container.parents(".h5p-content").css("height","auto"),r.trigger("resize"))})}var r=n(4),a=i(r),s=n(6),l=i(s),u=n(7),c=i(u),d=n(8),h=i(d),p=n(2),f=i(p),g=n(9),b=i(g),v=n(10),m=i(v),y=H5P.jQuery,k=0;o.prototype=Object.create(H5P.Question.prototype),o.prototype.constructor=o,o.prototype.registerDomElements=function(){var e=this;e.options.behaviour.showTitle&&(e.$introduction=y('<p class="h5p-dragquestion-introduction" id="dq-intro-'+k+'">'+e.options.question.settings.questionTitle+"</p>"),e.setIntroduction(e.$introduction));var t="";if(void 0!==this.options.question.settings.background&&(t+="h5p-dragquestion-has-no-background"),"always"===e.options.behaviour.dropZoneHighlighting&&(t&&(t+=" "),t+="h5p-dq-highlight-dz-always"),e.setContent(e.createQuestionContent(),{class:t}),!1!==H5P.canHasFullScreen&&this.options.behaviour.enableFullScreen){var n=function(){H5P.isFullscreen?H5P.exitFullScreen(e.$container):H5P.fullScreen(e.$container.parent().parent(),e)},i=y("<div/>",{class:"h5p-my-fullscreen-button-enter",title:this.options.localize.fullscreen,role:"button",tabindex:0,on:{click:n,keypress:function(e){13!==e.which&&32!==e.which||(n(),e.preventDefault())}},prependTo:this.$container.parent()});this.on("enterFullScreen",function(){i.attr("class","h5p-my-fullscreen-button-exit"),i.attr("title",this.options.localize.exitFullscreen)}),this.on("exitFullScreen",function(){i.attr("class","h5p-my-fullscreen-button-enter"),i.attr("title",this.options.localize.fullscreen)})}e.registerButtons(),setTimeout(function(){e.trigger("resize")},200)},o.prototype.getXAPIData=function(){var e=this.createXAPIEventTemplate("answered");return this.addQuestionToXAPI(e),this.addResponseToXAPI(e),{statement:e.data.statement}},o.prototype.addQuestionToXAPI=function(e){var t=e.getVerifiedStatementValue(["object","definition"]);y.extend(t,this.getXAPIDefinition())},o.prototype.getXAPIDefinition=function(){var e={};e.description={"en-US":y("<div>"+this.options.question.settings.questionTitle+"</div>").text()},e.type="http://adlnet.gov/expapi/activities/cmi.interaction",e.interactionType="matching",e.source=[];for(var t=0;t<this.options.question.task.elements.length;t++){var n=this.options.question.task.elements[t];if(n.dropZones&&n.dropZones.length){var i=n.type.params.alt?n.type.params.alt:n.type.params.text;e.source.push({id:""+t,description:{"en-US":y("<div>"+i+"</div>").text()}})}}e.correctResponsesPattern=[""],e.target=[];var o=!0;for(t=0;t<this.options.question.task.dropZones.length;t++)if(e.target.push({id:""+t,description:{"en-US":y("<div>"+this.options.question.task.dropZones[t].label+"</div>").text()}}),this.options.question.task.dropZones[t].correctElements)for(var r=0;r<this.options.question.task.dropZones[t].correctElements.length;r++){var a=this.options.question.task,s=a.elements[a.dropZones[t].correctElements[r]];!s||s.dropZones.indexOf(t.toString())<0||(o||(e.correctResponsesPattern[0]+="[,]"),e.correctResponsesPattern[0]+=t+"[.]"+a.dropZones[t].correctElements[r],o=!1)}return e},o.prototype.addResponseToXAPI=function(e){var t=this.getMaxScore(),n=this.getScore(),i=n==t;e.setScoredResult(n,t,this,!0,i),e.data.statement.result.response=this.getUserXAPIResponse()},o.prototype.getUserXAPIResponse=function(){var e=this.getUserAnswers();return e?e.filter(function(e){return e.elements.length}).map(function(e){return e.elements.filter(function(e){return void 0!==e.dropZone}).map(function(t){return t.dropZone+"[.]"+e.index}).join("[,]")}).filter(function(e){return void 0!==e&&""!==e}).join("[,]"):""},o.prototype.getUserAnswers=function(){return this.draggables.map(function(e,t){return{index:t,draggable:e}}).filter(function(e){return void 0!==e.draggable&&e.draggable.elements}).map(function(e){return{index:e.index,elements:e.draggable.elements}})},o.prototype.createQuestionContent=function(){var e;this.$container=y('<div class="h5p-inner" role="application" aria-labelledby="dq-intro-'+k+'"></div>'),void 0!==this.options.question.settings.background&&this.$container.css("backgroundImage",'url("'+H5P.getPath(this.options.question.settings.background.path,this.id)+'")');var t=this.options.question.task;for(e=0;e<t.elements.length;e++){var n=t.elements[e];if(void 0!==n.dropZones&&0!==n.dropZones.length)this.draggables[e].appendTo(this.$container,this.id);else{var i=this.addElement(n,"static",e);H5P.newRunnable(n.type,this.id,i);!function(e,t){setTimeout(function(){f.default.setOpacity(e,"background",t.backgroundOpacity)},0)}(i,n)}}for(this.$noDropZone.appendTo(this.$container),e=0;e<this.dropZones.length;e++)this.dropZones[e].appendTo(this.$container,this.draggables);return this.$container},o.prototype.registerButtons=function(){this.options.behaviour.enableCheckButton&&this.addSolutionButton(),this.addRetryButton()},o.prototype.addSolutionButton=function(){var e=this;this.addButton("check-answer",this.options.scoreShow,function(){e.answered=!0,e.showAllSolutions(),e.showScore(),e.addExplanation();var t=e.createXAPIEventTemplate("answered");e.addQuestionToXAPI(t),e.addResponseToXAPI(t),e.trigger(t),(e.$introduction?e.$introduction:e.$container.children().first()).focus()},!0,{"aria-label":this.options.a11yCheck},{contentData:this.contentData,textIfSubmitting:this.options.submit})},o.prototype.addExplanation=function(){var e=this,t=this.options.question.task,n=[];t.dropZones.forEach(function(t,i){var o={correct:t.tipsAndFeedback.feedbackOnCorrect,incorrect:t.tipsAndFeedback.feedbackOnIncorrect};if(void 0!==o.correct||void 0!==o.incorrect){var r=t.correctElements,a={};e.draggables.forEach(function(e){e.elements.forEach(function(t){t.dropZone==i&&(a[e.id]={instance:e,correct:-1!==r.indexOf(""+e.id)})})}),Object.keys(a).forEach(function(e){var r=a[e],s=f.default.strip(r.instance.type.params.alt||r.instance.type.params.text)||"?",l=f.default.strip(t.label);r.correct&&o.correct?(n.push({correct:l+" + "+s,text:o.correct}),r.instance.setFeedback(o.correct,i)):!r.correct&&o.incorrect&&(n.push({correct:l+" + ",wrong:s,text:o.incorrect}),r.instance.setFeedback(o.incorrect,i))})}}),0!==n.length&&this.setExplanation(n,this.options.feedbackHeader)},o.prototype.addRetryButton=function(){var e=this;this.addButton("try-again",this.options.tryAgain,function(){e.resetTask(),e.showButton("check-answer"),e.hideButton("try-again")},!1,{"aria-label":this.options.a11yRetry})},o.prototype.addElement=function(e,t,n){return y('<div class="h5p-'+t+'" style="left:'+e.x+"%;top:"+e.y+"%;width:"+e.width+"em;height:"+e.height+'em"></div>').appendTo(this.$container).data("id",n)},o.prototype.resize=function(e){var t=this;if(void 0!==this.$container&&this.$container.is(":visible")){t.dropZones.forEach(function(e){e.updateBackgroundOpacity()});var n=e&&e.data&&e.data.decreaseSize;n||(this.$container.css("height","99999px"),t.$container.parents(".h5p-standalone.h5p-dragquestion").css("width",""));var i=this.options.question.settings.size,o=i.width/i.height,r=this.$container.parent(),a=r.width()-parseFloat(r.css("margin-left"))-parseFloat(r.css("margin-right")),s=t.$container.parents(".h5p-standalone.h5p-dragquestion.h5p-semi-fullscreen");if(s.length){s.css("width",""),n||(t.$container.css("width","10px"),s.css("width",""),setTimeout(function(){t.trigger("resize",{decreaseSize:!0})},200));var l=y(window.frameElement);if(l){a=l.parent().width(),s.css("width",a+"px")}}var u=a/o;a<=0&&(a=i.width,u=i.height),this.$container.css({width:a+"px",height:u+"px",fontSize:a/i.width*16+"px"})}},o.prototype.disableDraggables=function(){this.draggables.forEach(function(e){e.disable()})},o.prototype.enableDraggables=function(){this.draggables.forEach(function(e){e.enable()})},o.prototype.showAllSolutions=function(e){this.points=0,this.rawPoints=0,this.blankIsCorrect&&(this.points=1,this.rawPoints=1);var t;!e&&this.options.behaviour.showScorePoints&&!this.options.behaviour.singlePoint&&this.options.behaviour.applyPenalties&&(t=new H5P.Question.ScorePoints);for(var n=0;n<this.draggables.length;n++){var i=this.draggables[n];void 0!==i&&(e||i.disable(),this.points+=i.results(e,this.correctDZs[n],t),this.rawPoints+=i.rawPoints)}this.points<0&&(this.points=0),!this.answered&&this.blankIsCorrect&&(this.points=this.weight),this.options.behaviour.singlePoint&&(this.points=this.points===this.calculateMaxScore()?1:0),e||this.hideButton("check-answer"),this.options.behaviour.enableRetry&&!e&&this.showButton("try-again"),!this.hasButton("check-answer")||!1!==this.options.behaviour.enableRetry&&this.points!==this.getMaxScore()||this.hideButton("try-again")},o.prototype.showSolutions=function(){this.showAllSolutions(),this.showScore(),this.hideButton("check-answer"),this.hideButton("try-again"),this.disableDraggables()},o.prototype.resetTask=function(){this.points=0,this.rawPoints=0,this.answered=!1,this.dropZones.forEach(function(e){e.reset()}),this.enableDraggables(),this.draggables.forEach(function(e){e.resetPosition()}),this.showButton("check-answer"),this.hideButton("try-again"),this.removeFeedback(),this.setExplanation()},o.prototype.calculateMaxScore=function(){var e=0;if(this.blankIsCorrect)return 1;for(var t=this.options.question.task.elements,n=0;n<t.length;n++){var i=this.correctDZs[n];void 0!==i&&i.length&&(t[n].multiple?e+=i.length:e++)}return e},o.prototype.getMaxScore=function(){return this.options.behaviour.singlePoint?this.weight:this.calculateMaxScore()},o.prototype.getScore=function(){this.showAllSolutions(!0);var e=this.options.behaviour.applyPenalties||this.options.behaviour.singlePoint?this.points:this.rawPoints;return delete this.points,delete this.rawPoints,e},o.prototype.getAnswerGiven=function(){return!this.options.behaviour.showSolutionsRequiresInput||this.answered||this.blankIsCorrect},o.prototype.showScore=function(){var e=this.calculateMaxScore();this.options.behaviour.singlePoint&&(e=1);var t=this.options.behaviour.applyPenalties||this.options.behaviour.singlePoint?this.points:this.rawPoints,n=H5P.Question.determineOverallFeedback(this.options.overallFeedback,t/e).replace("@score",t).replace("@total",e),i=!(!this.options.behaviour.enableScoreExplanation||!this.options.behaviour.applyPenalties)&&this.options.scoreExplanation;this.setFeedback(n,t,e,this.options.scoreBarLabel,i,void 0,this.options.scoreExplanationButtonLabel)},o.prototype.getCurrentState=function(){for(var e={answers:[]},t=0;t<this.draggables.length;t++){var n=this.draggables[t];if(void 0!==n){for(var i=[],o=0;o<n.elements.length;o++){var r=n.elements[o];void 0!==r&&void 0!==r.dropZone&&i.push({x:Number(r.position.left.replace("%","")),y:Number(r.position.top.replace("%","")),dz:r.dropZone})}i.length&&(e.answers[t]=i)}}return e},o.prototype.getTitle=function(){return H5P.createTitle(this.contentData&&this.contentData.metadata&&this.contentData.metadata.title?this.contentData.metadata.title:"Drag and drop")};var w=function(e,t,n){var i={drag:new a.default([new h.default,new l.default]),drop:new a.default([new h.default,new c.default])};i.drag.useNegativeTabIndex(),i.drop.useNegativeTabIndex();var o,r=function(){o.draggable.trigger("dragend"),o.element.$.removeClass("h5p-draggable-hover"),f.default.setElementOpacity(o.element.$,o.draggable.backgroundOpacity),-1!==i.drop.elements.indexOf(n)&&(i.drop.removeElement(n),n.style.display="none");for(var e=0;e<t.length;e++){var r=t[e];r.dehighlight(),-1!==i.drop.elements.indexOf(r.$dropZone[0])&&i.drop.removeElement(r.$dropZone[0])}if(o.element.$.is(":visible"))o.element.$.focus();else{var a=o.draggable.elements[o.draggable.elements.length-1].$;i.drag.setTabbable(a[0]),a.focus()}o=void 0};return i.drag.on("select",function(a){var s=f.default.elementToDraggable(e,a.element);if(o)return void r();o=s,o.element.$.addClass("h5p-draggable-hover"),f.default.setElementOpacity(o.element.$,o.draggable.backgroundOpacity),o.draggable.trigger("dragstart",o.draggable.mustCopyElement(o.element)?"copy":"move"),i.drop.addElement(n),n.style.display="block",n.style.left=o.draggable.x+"%",n.style.top=o.draggable.y+"%",n.style.width=o.draggable.width+"em",n.style.height=o.draggable.height+"em";for(var l,u=0;u<t.length;u++){var c=t[u];c.accepts(o.draggable,e)&&(c.highlight(),i.drop.addElement(c.$dropZone[0]),l&&o.element.dropZone!==c.id||(l=c.$dropZone))}l&&(i.drop.setTabbable(l[0]),l.focus())}),i.drop.on("select",function(e){if(o){if(e.element===n)return void 0!==o.element.dropZone&&o.element.reset(),void(void 0!==o&&(o.element.$.css({left:o.draggable.x+"%",top:o.draggable.y+"%",width:o.draggable.width+"em",height:o.draggable.height+"em"}),o.draggable.updatePlacement(o.element),o.element.$[0].setAttribute("aria-grabbed","false"),r()));var i=f.default.elementToDropZone(t,e.element);o.draggable.mustCopyElement(o.element)&&o.element.clone(),o.draggable.addToDropZone(o.index,o.element,i.id),o.element.$.css({left:i.x+"%",top:i.y+"%"}),-1===i.getIndexOf(o.element.$)&&i.alignables.push(o.element.$),i.autoAlign(),o.element.$[0].setAttribute("aria-grabbed","false"),r()}}),i};H5P.DragQuestion=o},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=n(1),s=n(0),l=n(5),u=(0,a.removeAttribute)("tabindex"),c=((0,s.forEach)(u),(0,a.setAttribute)("tabindex","0")),d=(0,a.setAttribute)("tabindex","-1"),h=(0,a.hasAttribute)("tabindex"),p=function(){function e(t){i(this,e),o(this,(0,l.Eventful)()),this.plugins=t||[],this.elements=[],this.negativeTabIndexAllowed=!1,this.on("nextElement",this.nextElement,this),this.on("previousElement",this.previousElement,this),this.initPlugins()}return r(e,[{key:"addElement",value:function(e){this.elements.push(e),this.firesEvent("addElement",e),1===this.elements.length&&this.setTabbable(e)}},{key:"removeElement",value:function(e){this.elements=(0,s.without)([e],this.elements),h(e)&&(this.setUntabbable(e),this.elements[0]&&this.setTabbable(this.elements[0])),this.firesEvent("removeElement",e)}},{key:"firesEvent",value:function(e,t){var n=this.elements.indexOf(t);return this.fire(e,{element:t,index:n,elements:this.elements,oldElement:this.tabbableElement})}},{key:"nextElement",value:function(e){var t=e.index,n=t===this.elements.length-1,i=this.elements[n?0:t+1];this.setTabbable(i),i.focus()}},{key:"setTabbable",value:function(e){(0,s.forEach)(this.setUntabbable.bind(this),this.elements),c(e),this.tabbableElement=e}},{key:"setUntabbable",value:function(e){this.negativeTabIndexAllowed?d(e):u(e)}},{key:"previousElement",value:function(e){var t=e.index,n=0===t,i=this.elements[n?this.elements.length-1:t-1];this.setTabbable(i),i.focus()}},{key:"useNegativeTabIndex",value:function(){this.negativeTabIndexAllowed=!0,this.elements.forEach(function(e){e.hasAttribute("tabindex")||d(e)})}},{key:"initPlugins",value:function(){this.plugins.forEach(function(e){void 0!==e.init&&e.init(this)},this)}}]),e}();t.default=p},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Eventful=function(){return{listeners:{},on:function(e,t,n){var i={listener:t,scope:n};return this.listeners[e]=this.listeners[e]||[],this.listeners[e].push(i),this},fire:function(e,t){return(this.listeners[e]||[]).every(function(e){return!1!==e.listener.call(e.scope||this,t)})},propagate:function(e,t){var n=this;e.forEach(function(e){return t.on(e,function(t){return n.fire(e,t)})})}}}},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(1),a=n(0),s=(0,r.setAttribute)("aria-grabbed"),l=(0,r.attributeEquals)("aria-grabbed","true"),u=(0,a.filter)((0,r.hasAttribute)("aria-grabbed")),c=(0,a.compose)((0,a.forEach)((0,r.setAttribute)("aria-grabbed","false")),u),d=(0,a.compose)((0,a.some)(l),u),h=function(){function e(){i(this,e)}return o(e,[{key:"init",value:function(e){this.controls=e,this.controls.on("select",this.select,this)}},{key:"addElement",value:function(e){s("false",e),this.controls.addElement(e)}},{key:"setAllGrabbedToFalse",value:function(){c(this.controls.elements)}},{key:"hasAnyGrabbed",value:function(){return d(this.controls.elements)}},{key:"select",value:function(e){var t=e.element,n=l(t);this.setAllGrabbedToFalse(),n||s("true",t)}}]),e}();t.default=h},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(1),a=n(0),s=(0,r.setAttribute)("aria-dropeffect","none"),l=(0,r.setAttribute)("aria-dropeffect","move"),u=(0,a.filter)((0,r.hasAttribute)("aria-dropeffect")),c=(0,a.compose)((0,a.forEach)(l),u),d=(0,a.compose)((0,a.forEach)(s),u),h=function(){function e(){i(this,e)}return o(e,[{key:"init",value:function(e){this.controls=e}},{key:"setAllToMove",value:function(){c(this.controls.elements)}},{key:"setAllToNone",value:function(){d(this.controls.elements)}}]),e}();t.default=h,h.DropEffect={COPY:"copy",MOVE:"move",EXECUTE:"execute",POPUP:"popup",NONE:"none"}},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=function(){function e(){i(this,e),this.selectability=!0}return o(e,[{key:"init",value:function(e){this.boundHandleKeyDown=this.handleKeyDown.bind(this),this.controls=e,this.controls.on("addElement",this.listenForKeyDown,this),this.controls.on("removeElement",this.removeKeyDownListener,this)}},{key:"listenForKeyDown",value:function(e){e.element.addEventListener("keydown",this.boundHandleKeyDown)}},{key:"removeKeyDownListener",value:function(e){e.element.removeEventListener("keydown",this.boundHandleKeyDown)}},{key:"handleKeyDown",value:function(e){switch(e.which){case 13:case 32:this.select(e.target),e.preventDefault();break;case 37:case 38:this.hasChromevoxModifiers(e)||(this.previousElement(e.target),e.preventDefault());break;case 39:case 40:this.hasChromevoxModifiers(e)||(this.nextElement(e.target),e.preventDefault())}}},{key:"hasChromevoxModifiers",value:function(e){return e.shiftKey||e.ctrlKey}},{key:"previousElement",value:function(e){this.controls.firesEvent("previousElement",e)}},{key:"nextElement",value:function(e){this.controls.firesEvent("nextElement",e)}},{key:"select",value:function(e){this.selectability&&!1!==this.controls.firesEvent("before-select",e)&&(this.controls.firesEvent("select",e),this.controls.firesEvent("after-select",e))}},{key:"disableSelectability",value:function(){this.selectability=!1}},{key:"enableSelectability",value:function(){this.selectability=!0}}]),e}();t.default=r},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(2),a=function(e){return e&&e.__esModule?e:{default:e}}(r),s=H5P.jQuery,l=function(){function e(t,n,o){i(this,e);var r=this;H5P.EventDispatcher.call(r),r.id=n,r.showLabel=t.showLabel,r.label=t.label,r.x=t.x,r.y=t.y,r.width=t.width,r.height=t.height,r.backgroundOpacity=t.backgroundOpacity,r.tip=t.tipsAndFeedback.tip||"",r.single=t.single,r.autoAlignable=t.autoAlign,r.alignables=[],r.l10n=o}return o(e,[{key:"appendTo",value:function(e,t){var n=this,i='<div class="h5p-inner"></div>',o="";n.showLabel&&(i='<div class="h5p-label">'+n.label+'<span class="h5p-hidden-read"></span></div>'+i,o=" h5p-has-label"),i='<span class="h5p-hidden-read">'+n.l10n.prefix.replace("{num}",n.id+1)+"</span>"+i,n.$dropZone=s("<div/>",{class:"h5p-dropzone"+o,tabindex:"-1",title:n.showLabel?s("<div/>",{html:n.label}).text():null,role:"button","aria-disabled":!0,css:{left:n.x+"%",top:n.y+"%",width:n.width+"em",height:n.height+"em"},html:i}).appendTo(e).children(".h5p-inner").droppable({activeClass:"h5p-active",tolerance:"intersect",accept:function(e){var i=a.default.elementToDraggable(t,e);return!!i&&n.accepts(i.draggable,t)},drop:function(e,t){var i=s(this);a.default.setOpacity(i.removeClass("h5p-over"),"background",n.backgroundOpacity),t.draggable.data("addToZone",n.id),-1===n.getIndexOf(t.draggable)&&n.alignables.push(t.draggable),n.autoAlignable.enabled&&n.autoAlign()},over:function(){a.default.setOpacity(s(this).addClass("h5p-over"),"background",n.backgroundOpacity)},out:function(){a.default.setOpacity(s(this).removeClass("h5p-over"),"background",n.backgroundOpacity)}}).end().focus(function(){r instanceof H5P.jQuery&&r.attr("tabindex","0")}).blur(function(){r instanceof H5P.jQuery&&r.attr("tabindex","-1")});var r=H5P.JoubelUI.createTip(n.tip,{tipLabel:n.l10n.tipLabel,tabcontrol:!0});r instanceof H5P.jQuery&&s("<span/>",{class:"h5p-dq-tipwrap","aria-label":n.l10n.tipAvailable,append:r,appendTo:n.$dropZone}),t.forEach(function(e){var t=e.element.$;e.isInDropZone(n.id)&&-1===n.getIndexOf(t)&&n.alignables.push(t)}),n.autoAlignable.enabled&&n.autoAlign(),setTimeout(function(){n.updateBackgroundOpacity()},0)}},{key:"updateBackgroundOpacity",value:function(){a.default.setOpacity(this.$dropZone.children(".h5p-label"),"background",this.backgroundOpacity),a.default.setOpacity(this.$dropZone.children(".h5p-inner"),"background",this.backgroundOpacity)}},{key:"accepts",value:function(e,t){var n=this;if(!e.hasDropZone(n.id))return!1;if(n.single)for(var i=0;i<t.length;i++)if(t[i]&&t[i].isInDropZone(n.id))return!1;return!0}},{key:"getIndexOf",value:function(e){for(var t=this,n=0;n<t.alignables.length;n++)if(t.alignables[n][0]===e[0])return n;return-1}},{key:"removeAlignable",value:function(e){var t=this,n=t.getIndexOf(e);-1!==n&&(t.alignables.splice(n,1),void 0===t.autoAlignTimer&&t.autoAlignable.enabled&&(t.autoAlignTimer=setTimeout(function(){delete t.autoAlignTimer,t.autoAlign()},1)))}},{key:"autoAlign",value:function(){for(var e,t,n=this,i=n.$dropZone.parent()[0].getBoundingClientRect(),o={x:n.autoAlignable.spacing/n.autoAlignable.size.width*100,y:n.autoAlignable.spacing/n.autoAlignable.size.height*100},r={x:n.x+o.x,y:n.y+o.y},a=n.$dropZone[0].getBoundingClientRect(),s={x:a.width-2*o.x,y:a.height-2*o.y},l={x:s.x,y:s.y},u=0,c=function(){e.css({left:r.x+"%",top:r.y+"%"}),n.trigger("elementaligned",e);var o=t.width+n.autoAlignable.spacing;l.x-=o,r.x+=o/i.width*100;var a=t.height+n.autoAlignable.spacing;a>u&&(u=a)},d=0;d<n.alignables.length;d++)if(e=n.alignables[d],t=e[0].getBoundingClientRect(),l.x>=t.width)c();else{if(l.x=s.x,r.x=n.x+o.x,u&&(l.y-=u,r.y+=u/i.height*100,u=0),l.y<=0)return;c()}}},{key:"highlight",value:function(){this.$dropZone.attr("aria-disabled","false").children(".h5p-inner").addClass("h5p-active")}},{key:"dehighlight",value:function(){this.$dropZone.attr("aria-disabled","true").children(".h5p-inner").removeClass("h5p-active")}},{key:"reset",value:function(){this.alignables=[]}}]),e}();t.default=l},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(2),l=function(e){return e&&e.__esModule?e:{default:e}}(s),u=H5P.jQuery,c=function(e){function t(e,n,r,a){i(this,t);var s=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this)),l=s;if(l.$=u(l),l.id=n,l.elements=[],l.x=e.x,l.y=e.y,l.width=e.width,l.height=e.height,l.backgroundOpacity=e.backgroundOpacity,l.dropZones=e.dropZones,l.type=e.type,l.multiple=e.multiple,l.l10n=a,r){l.multiple&&l.elements.push({});for(var c=0;c<r.length;c++)l.elements.push({dropZone:r[c].dz,position:{left:r[c].x+"%",top:r[c].y+"%"}})}return s}return r(t,e),a(t,[{key:"appendTo",value:function(e,t){var n=this;if(n.elements.length)for(var i=0;i<n.elements.length;i++)n.attachElement(i,e,t);else n.attachElement(null,e,t)}},{key:"attachElement",value:function(e,t,n){var i,o=this;null===e?(i={},o.elements.push(i),e=o.elements.length-1):i=o.elements[e],u.extend(i,{clone:function(){o.attachElement(null,t,n)},reset:function(){void 0!==i.dropZone&&(o.trigger("leavingDropZone",i),delete i.dropZone),o.multiple&&(i.$.remove(),delete o.elements[e],o.trigger("elementremove",i.$[0])),delete i.position}}),i.$=u("<div/>",{class:"h5p-draggable",tabindex:"-1",role:"button",css:{left:o.x+"%",top:o.y+"%",width:o.width+"em",height:o.height+"em"},appendTo:t,title:o.type.params.title}).on("click",function(){o.trigger("focus",this)}).on("touchstart",function(e){e.stopPropagation()}).draggable({revert:function(e){t.removeClass("h5p-dragging");var n=u(this);return n.data("uiDraggable").originalPosition={top:o.y+"%",left:o.x+"%"},o.updatePlacement(i),n[0].setAttribute("aria-grabbed","false"),o.trigger("dragend"),!e},start:function(){var e=u(this),n=o.mustCopyElement(i);n&&i.clone(),e.removeClass("h5p-wrong").detach().appendTo(t),t.addClass("h5p-dragging"),l.default.setElementOpacity(e,o.backgroundOpacity),this.setAttribute("aria-grabbed","true"),o.trigger("focus",this),o.trigger("dragstart",{element:this,effect:n?"copy":"move"})},stop:function(){var n=u(this);i.position=l.default.positionToPercentage(t,n),n.css(i.position);var r=n.data("addToZone");void 0!==r?(n.removeData("addToZone"),o.addToDropZone(e,i,r)):i.reset()}}).css("position",""),o.element=i,i.position&&(i.$.css(i.position),o.updatePlacement(i)),l.default.addHover(i.$,o.backgroundOpacity),H5P.newRunnable(o.type,n,i.$),u('<span class="h5p-hidden-read">'+o.l10n.prefix.replace("{num}",o.id+1)+"</span>").prependTo(i.$),u('<span class="h5p-hidden-read"></span>').appendTo(i.$),setTimeout(function(){l.default.setElementOpacity(i.$,o.backgroundOpacity)},0),o.trigger("elementadd",i.$[0])}},{key:"setFeedback",value:function(e,t){this.elements.forEach(function(n){n.dropZone===t&&(void 0===n.$feedback&&(n.$feedback=u("<span>",{class:"h5p-hidden-read",appendTo:n.$})),n.$feedback.html(e))})}},{key:"mustCopyElement",value:function(e){return this.multiple&&void 0===e.dropZone}},{key:"hasDropZone",value:function(e){for(var t=this,n=0;n<t.dropZones.length;n++)if(parseInt(t.dropZones[n])===e)return!0;return!1}},{key:"addToDropZone",value:function(e,t,n){var i=this;if(i.multiple)for(var o=0;o<i.elements.length;o++)if(o!==e&&void 0!==i.elements[o]&&i.elements[o].dropZone===n)return void 0!==i.elements[e].dropZone&&i.elements[e].dropZone!==n&&i.trigger("leavingDropZone",t),t.$.remove(),delete i.elements[e],void i.trigger("elementremove",this.element.$[0]);void 0!==t.dropZone&&t.dropZone!==n&&i.trigger("leavingDropZone",t),t.dropZone=n,i.updatePlacement(t),i.trigger("interacted")}},{key:"updatePlacement",value:function(e){e.$suffix&&e.$suffix.remove(),void 0!==e.dropZone?(e.$.addClass("h5p-dropped"),l.default.setElementOpacity(e.$,self.backgroundOpacity),e.$suffix=u('<span class="h5p-hidden-read">'+this.l10n.suffix.replace("{num}",e.dropZone+1)+". </span>").appendTo(e.$)):(e.$.removeClass("h5p-dropped").removeClass("h5p-wrong").removeClass("h5p-correct").css({border:"",background:""}),l.default.setElementOpacity(e.$,this.backgroundOpacity))}},{key:"resetPosition",value:function(){var e=this;this.elements.forEach(function(t){if(t.$feedback&&(t.$feedback.remove(),delete t.$feedback),void 0!==t.dropZone){var n=t.$;n.animate({left:e.x+"%",top:e.y+"%"},function(){e.multiple&&(void 0!==n.dropZone&&e.trigger("leavingDropZone",n),n.remove(),e.elements.indexOf(t)>=0&&delete e.elements[e.elements.indexOf(t)],e.trigger("elementremove",n[0]))}),e.updatePlacement(t)}}),void 0!==e.element.dropZone&&(e.trigger("leavingDropZone",e.element),delete e.element.dropZone),e.updatePlacement(e.element)}},{key:"findElement",value:function(e){for(var t=this,n=0;n<t.elements.length;n++)if(void 0!==t.elements[n]&&t.elements[n].$.is(e))return{element:t.elements[n],index:n}}},{key:"isInDropZone",value:function(e){for(var t=this,n=0;n<t.elements.length;n++)if(void 0!==t.elements[n]&&t.elements[n].dropZone===e)return!0;return!1}},{key:"disable",value:function(){for(var e=this,t=0;t<e.elements.length;t++){var n=e.elements[t];n&&(n.$.draggable("disable"),e.trigger("elementremove",n.$[0]))}}},{key:"enable",value:function(){for(var e=this,t=0;t<e.elements.length;t++){var n=e.elements[t];n&&(n.$.draggable("enable"),e.trigger("elementadd",n.$[0]))}}},{key:"results",value:function(e,t,n){var i,o,r,a,s=this,l=0;if(s.rawPoints=0,void 0===t){for(i=0;i<s.elements.length;i++)void 0!==(r=s.elements[i])&&void 0!==r.dropZone&&(!0!==e&&s.markElement(r,"wrong",n),l--);return l}for(i=0;i<s.elements.length;i++)if(void 0!==(r=s.elements[i])&&void 0!==r.dropZone){for(a=!1,o=0;o<t.length;o++)if(r.dropZone===t[o]){!0!==e&&s.markElement(r,"correct",n),a=!0,s.rawPoints++,l++;break}a||(!0!==e&&s.markElement(r,"wrong",n),l--)}return l}},{key:"markElement",value:function(e,t,n){var i=u("<span/>",{class:"h5p-hidden-read",html:this.l10n[t+"Answer"]+". "});n&&(i=i.add(n.getElement("correct"===t))),e.$suffix=e.$suffix.add(i),e.$.addClass("h5p-"+t).append(i),l.default.setElementOpacity(e.$,this.backgroundOpacity)}}]),t}(H5P.EventDispatcher);t.default=c}]);;
/**
 * jquery-circle-progress - jQuery Plugin to draw animated circular progress bars:
 * {@link http://kottenator.github.io/jquery-circle-progress/}
 *
 * @author Rostyslav Bryzgunov <kottenator@gmail.com>
 * @version 1.2.2
 * @licence MIT
 * @preserve
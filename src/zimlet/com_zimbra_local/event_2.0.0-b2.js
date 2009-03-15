/*
 * ***** BEGIN LICENSE BLOCK *****
 * 
 * Zimbra Collaboration Suite Zimlets
 * Copyright (C) 2008 Zimbra, Inc.
 * 
 * The contents of this file are subject to the Yahoo! Public License
 * Version 1.0 ("License"); you may not use this file except in
 * compliance with the License.  You may obtain a copy of the License at
 * http://www.zimbra.com/license.
 * 
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * 
 * ***** END LICENSE BLOCK *****
 */
/* Copyright (c) 2006 Yahoo! Inc. All rights reserved. */YAHOO.util.CustomEvent=function(_1,_2){this.type=_1;this.scope=_2||window;this.subscribers=[];if(YAHOO.util["Event"]){YAHOO.util.Event.regCE(this);}};YAHOO.util.CustomEvent.prototype={subscribe:function(fn,_4,_5){this.subscribers.push(new YAHOO.util.Subscriber(fn,_4,_5));},unsubscribe:function(fn,_6){var _7=false;for(var i=0;i<this.subscribers.length;++i){var s=this.subscribers[i];if(s&&s.contains(fn,_6)){this._delete(i);_7=true;}}return _7;},fire:function(){for(var i=0;i<this.subscribers.length;++i){var s=this.subscribers[i];if(s){var _10=(s.override)?s.obj:this.scope;s.fn.call(_10,this.type,arguments,s.obj);}}},unsubscribeAll:function(){for(var i=0;i<this.subscribers.length;++i){this._delete(i);}},_delete:function(_11){var s=this.subscribers[_11];if(s){delete s.fn;delete s.obj;}delete this.subscribers[_11];}};YAHOO.util.Subscriber=function(fn,obj,_13){this.fn=fn;this.obj=obj||null;this.override=(_13);};YAHOO.util.Subscriber.prototype.contains=function(fn,obj){return (this.fn==fn&&this.obj==obj);};if(!YAHOO.util.Event){YAHOO.util.Event=function(){var _14=false;var _15=[];var _16=[];var _17=[];var _18=[];var _19=[];var _20=[];var _21=0;var _22=[];return {POLL_RETRYS:200,POLL_INTERVAL:50,EL:0,TYPE:1,FN:2,WFN:3,SCOPE:3,ADJ_SCOPE:4,isSafari:(/Safari|Konqueror|KHTML/gi).test(navigator.userAgent),isIE:(!this.isSafari&&!navigator.userAgent.match(/opera/gi)&&navigator.userAgent.match(/msie/gi)),addDelayedListener:function(el,_24,fn,_25,_26){_16[_16.length]=[el,_24,fn,_25,_26];if(_14){_21=this.POLL_RETRYS;this.startTimeout(0);}},startTimeout:function(_27){var i=(_27||_27===0)?_27:this.POLL_INTERVAL;this.timeout=setTimeout("YAHOO.util.Event._tryPreloadAttach()",i);},onAvailable:function(_28,_29,_30,_31){_22.push({id:_28,fn:_29,obj:_30,override:_31});_21=this.POLL_RETRYS;this.startTimeout(0);},addListener:function(el,_32,fn,_33,_34){if(this._isValidCollection(el)){var ok=true;for(var i=0;i<el.length;++i){ok=(this.on(el[i],_32,fn,_33,_34)&&ok);}return ok;}else{if(typeof el=="string"){var oEl=this.getEl(el);if(_14&&oEl){el=oEl;}else{this.addDelayedListener(el,_32,fn,_33,_34);return true;}}}if(!el){return false;}if("unload"==_32&&_33!==this){_17[_17.length]=[el,_32,fn,_33,_34];return true;}var _37=(_34)?_33:el;var _38=function(e){return fn.call(_37,YAHOO.util.Event.getEvent(e),_33);};var li=[el,_32,fn,_38,_37];var _41=_15.length;_15[_41]=li;if(this.useLegacyEvent(el,_32)){var _42=this.getLegacyIndex(el,_32);if(_42==-1){_42=_19.length;_19[_42]=[el,_32,el["on"+_32]];_20[_42]=[];el["on"+_32]=function(e){YAHOO.util.Event.fireLegacyEvent(YAHOO.util.Event.getEvent(e),_42);};}_20[_42].push(_41);}else{if(el.addEventListener){el.addEventListener(_32,_38,false);}else{if(el.attachEvent){el.attachEvent("on"+_32,_38);}}}return true;},fireLegacyEvent:function(e,_43){var ok=true;var le=_20[_43];for(i=0;i<le.length;++i){var _45=le[i];if(_45){var li=_15[_45];if(li&&li[this.WFN]){var _46=li[this.ADJ_SCOPE];var ret=li[this.WFN].call(_46,e);ok=(ok&&ret);}else{delete le[i];}}}return ok;},getLegacyIndex:function(el,_48){for(var i=0;i<_19.length;++i){var le=_19[i];if(le&&le[0]==el&&le[1]==_48){return i;}}return -1;},useLegacyEvent:function(el,_49){return ((!el.addEventListener&&!el.attachEvent)||(_49=="click"&&this.isSafari));},removeListener:function(el,_50,fn){if(typeof el=="string"){el=this.getEl(el);}else{if(this._isValidCollection(el)){var ok=true;for(var i=0;i<el.length;++i){ok=(this.removeListener(el[i],_50,fn)&&ok);}return ok;}}var _51=null;var _52=this._getCacheIndex(el,_50,fn);if(_52>=0){_51=_15[_52];}if(!el||!_51){return false;}if(el.removeEventListener){el.removeEventListener(_50,_51[this.WFN],false);}else{if(el.detachEvent){el.detachEvent("on"+_50,_51[this.WFN]);}}delete _15[_52][this.WFN];delete _15[_52][this.FN];delete _15[_52];return true;},getTarget:function(ev,_54){var t=ev.target||ev.srcElement;if(_54&&t&&"#text"==t.nodeName){return t.parentNode;}else{return t;}},getPageX:function(ev){var x=ev.pageX;if(!x&&0!==x){x=ev.clientX||0;if(this.isIE){x+=this._getScrollLeft();}}return x;},getPageY:function(ev){var y=ev.pageY;if(!y&&0!==y){y=ev.clientY||0;if(this.isIE){y+=this._getScrollTop();}}return y;},getXY:function(ev){return [this.getPageX(ev),this.getPageY(ev)];},getRelatedTarget:function(ev){var t=ev.relatedTarget;if(!t){if(ev.type=="mouseout"){t=ev.toElement;}else{if(ev.type=="mouseover"){t=ev.fromElement;}}}return t;},getTime:function(ev){if(!ev.time){var t=new Date().getTime();try{ev.time=t;}catch(e){return t;}}return ev.time;},stopEvent:function(ev){this.stopPropagation(ev);this.preventDefault(ev);},stopPropagation:function(ev){if(ev.stopPropagation){ev.stopPropagation();}else{ev.cancelBubble=true;}},preventDefault:function(ev){if(ev.preventDefault){ev.preventDefault();}else{ev.returnValue=false;}},getEvent:function(e){var ev=e||window.event;if(!ev){var c=this.getEvent.caller;while(c){ev=c.arguments[0];if(ev&&Event==ev.constructor){break;}c=c.caller;}}return ev;},getCharCode:function(ev){return ev.charCode||(ev.type=="keypress")?ev.keyCode:0;},_getCacheIndex:function(el,_59,fn){for(var i=0;i<_15.length;++i){var li=_15[i];if(li&&li[this.FN]==fn&&li[this.EL]==el&&li[this.TYPE]==_59){return i;}}return -1;},_isValidCollection:function(o){return (o&&o.length&&typeof o!="string"&&!o.tagName&&!o.alert&&typeof o[0]!="undefined");},elCache:{},getEl:function(id){return document.getElementById(id);},clearCache:function(){for(i in this.elCache){delete this.elCache[i];}},regCE:function(ce){_18.push(ce);},_load:function(e){_14=true;},_tryPreloadAttach:function(){if(this.locked){return false;}this.locked=true;var _63=!_14;if(!_63){_63=(_21>0);}var _64=[];for(var i=0;i<_16.length;++i){var d=_16[i];if(d){var el=this.getEl(d[this.EL]);if(el){this.on(el,d[this.TYPE],d[this.FN],d[this.SCOPE],d[this.ADJ_SCOPE]);delete _16[i];}else{_64.push(d);}}}_16=_64;notAvail=[];for(i=0;i<_22.length;++i){var _66=_22[i];if(_66){el=this.getEl(_66.id);if(el){var _67=(_66.override)?_66.obj:el;_66.fn.call(_67,_66.obj);delete _22[i];}else{notAvail.push(_66);}}}_21=(_64.length===0&&notAvail.length===0)?0:_21-1;if(_63){this.startTimeout();}this.locked=false;},_unload:function(e,me){for(var i=0;i<_17.length;++i){var l=_17[i];if(l){var _70=(l[this.ADJ_SCOPE])?l[this.SCOPE]:window;l[this.FN].call(_70,this.getEvent(e),l[this.SCOPE]);}}if(_15&&_15.length>0){for(i=0;i<_15.length;++i){l=_15[i];if(l){this.removeListener(l[this.EL],l[this.TYPE],l[this.FN]);}}this.clearCache();}for(i=0;i<_18.length;++i){_18[i].unsubscribeAll();delete _18[i];}for(i=0;i<_19.length;++i){delete _19[i][0];delete _19[i];}},_getScrollLeft:function(){return this._getScroll()[1];},_getScrollTop:function(){return this._getScroll()[0];},_getScroll:function(){var dd=document.documentElement;db=document.body;if(dd&&dd.scrollTop){return [dd.scrollTop,dd.scrollLeft];}else{if(db){return [db.scrollTop,db.scrollLeft];}else{return [0,0];}}}};}();YAHOO.util.Event.on=YAHOO.util.Event.addListener;if(document&&document.body){YAHOO.util.Event._load();}else{YAHOO.util.Event.on(window,"load",YAHOO.util.Event._load,YAHOO.util.Event,true);}YAHOO.util.Event.on(window,"unload",YAHOO.util.Event._unload,YAHOO.util.Event,true);YAHOO.util.Event._tryPreloadAttach();}
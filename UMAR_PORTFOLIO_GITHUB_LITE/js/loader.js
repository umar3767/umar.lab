/* Shows only when actual document loading exceeds 1s; never delays completion. */
(function(){
  "use strict";
  var root=document.documentElement;
  var finished=false,visible=false,interacted=false;
  var delayTimer,limitTimer;
  function element(){return document.getElementById("umLoader");}
  function syncAria(){
    var node=element();
    if(node){
      node.setAttribute("aria-hidden",visible?"false":"true");
      node.setAttribute("aria-label",root.lang==="ru"?"Загрузка портфолио":"Loading portfolio");
    }
  }
  function finish(){
    if(finished)return;
    finished=true;
    clearTimeout(delayTimer);
    clearTimeout(limitTimer);
    var wasVisible=visible;
    visible=false;
    root.classList.remove("um-loading-slow");
    if(wasVisible)root.classList.add("um-loading-out");
    syncAria();
    if(!wasVisible){var n=element();if(n)n.remove();return;}
    setTimeout(function(){
      root.classList.remove("um-loading-out");
      var n=element();if(n)n.remove();
    },500);
  }
  function userAction(){
    interacted=true;
    if(visible)finish();
  }
  try{
    var preferred=localStorage.getItem("umar-lang");
    if(preferred==="en"||preferred==="ru")root.lang=preferred;
  }catch(e){}
  if(document.readyState==="complete"){finish();return;}
  delayTimer=setTimeout(function(){
    if(finished||interacted||document.readyState==="complete"||window.scrollY>8)return;
    visible=true;
    root.classList.add("um-loading-slow");
    syncAria();
  },1000);
  // A stalled external resource must never hold the screen indefinitely.
  limitTimer=setTimeout(finish,10000);
  window.addEventListener("load",finish,{once:true});
  window.addEventListener("pageshow",function(event){if(event.persisted)finish();});
  document.addEventListener("DOMContentLoaded",syncAria,{once:true});
  document.addEventListener("pointerdown",userAction,{passive:true});
  document.addEventListener("keydown",userAction);
  window.addEventListener("scroll",userAction,{passive:true});
})();

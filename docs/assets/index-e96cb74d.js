(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const n={init(){this.cacheElements(),this.getAttributeArray(),this.showLoadingScreen()},cacheElements(){this.$goose=document.querySelector("#goose"),this.$helena=document.querySelector("#helena"),this.$enterScreen=document.querySelector(".enter__content"),this.$loadingScreen=document.querySelector(".enter__loading"),this.$enterScreenBg=document.querySelector("#enter-screen-bg"),this.$splash=document.querySelector(".splash"),this.$launchVirtualPet=document.querySelector(".launch-virtual-pet"),this.$virtualPetUI=document.querySelector(".virtual-pet-app"),this.$launchDancingLector=document.querySelector(".launch-dancing-lector"),this.$dancingLectorUI=document.querySelector(".dancing-lector-app"),this.$transcript=document.querySelector(".transcription__content"),this.$recordBtn=document.querySelector(".start-record"),this.$reticle=document.querySelector("[ar-hit-test]"),this.$sambaBtn=document.querySelector(".samba"),this.$hipHopBtn=document.querySelector(".hiphop"),this.$bellyBtn=document.querySelector(".belly"),this.$swingBtn=document.querySelector(".swing"),this.$ExitApp=document.querySelectorAll(".exit-app"),this.addEventListeners()},showLoadingScreen(){setTimeout(()=>{this.$loadingScreen.classList.add("is-hidden"),this.$enterScreen.classList.remove("is-hidden"),this.$enterARBtn=document.querySelector(".a-enter-ar"),this.$enterARBtn.classList.add("is-visible")},4e3)},enableSpeechRecognition(e){if(!window.webkitSpeechRecognition)alert("Sorry, your browser does not support the webkitSpeechRecognition API");else{const i=new webkitSpeechRecognition;i.interimResults=!0;const o=this.$transcript,c=this.$recordBtn;c.addEventListener("click",function(){i.start(),c.disabled=!0}),i.onspeechend=function(){i.stop(),c.disabled=!1};let t=[];const r=["twerk","break dance","idle","silly"];i.addEventListener("result",function(s){let a="";for(let l=s.resultIndex;l<s.results.length;l++)s.results[l].isFinal,a+=s.results[l][0].transcript;o.innerHTML=a,t=[],t.push(a),console.log(t),r.forEach(l=>{t.includes(l)&&n.addAnimation(e,l)})})}},addEventListeners(){const e=document.querySelector(".exit-button"),i=document.querySelector("a-scene"),o=document.querySelector("[ar-hit-test]");document.getElementById("eagle"),e.addEventListener("click",function(){window.location.reload()}),i.addEventListener("enter-vr",()=>{this.$enterScreenBg.setAttribute("visible","false"),this.$enterScreen.classList.add("is-hidden"),this.$splash.classList.remove("is-hidden"),this.$launchVirtualPet.addEventListener("click",this.generateVirtualPetApp),this.$launchDancingLector.addEventListener("click",this.generateDancingLectorApp),this.$ExitApp.forEach(c=>n.closeApp(c)),o.setAttribute("ar-hit-test","doHitTest:true"),o.setAttribute("visible","true")}),i.addEventListener("exit-vr",()=>{this.$splash.classList.add("is-hidden"),o.setAttribute("ar-hit-test","doHitTest:false"),o.setAttribute("visible","false")})},generateDancingLectorApp(){document.querySelector(".splash").classList.add("is-hidden"),document.querySelector(".dancing-lector-app").classList.remove("is-hidden"),document.querySelector("#goose").classList.add("is-hidden");const e=document.getElementById("helena");n.generatePositionObject(e),n.enableSpeechRecognition(e)},generateVirtualPetApp(){document.querySelector(".splash").classList.add("is-hidden"),document.querySelector(".virtual-pet-app").classList.remove("is-hidden"),document.querySelector("#helena").classList.add("is-hidden");const e=document.getElementById("goose");n.generatePositionObject(e),n.$sambaBtn.addEventListener("click",()=>n.addAnimation(e,"samba")),n.$hipHopBtn.addEventListener("click",()=>n.addAnimation(e,"hiphop")),n.$bellyBtn.addEventListener("click",()=>n.addAnimation(e,"belly")),n.$swingBtn.addEventListener("click",()=>n.addAnimation(e,"swing"))},addAnimation(e,i){e.setAttribute("animation-mixer",`clip:${i}; loop:infinite; crossFadeDuration: 2;`)},generatePositionObject(e){const i=this.$reticle;i.addEventListener("select",function(){this.components["ar-hit-test"].hasFoundAPose&&(e.id=="helena"?(document.querySelector(".app__title-lector").innerHTML="Let's go Helena!",document.querySelector(".app__title-lector").classList.add("neon")):(document.querySelector(".app__title-pet").innerHTML="Goose Party!",document.querySelector(".app__title-pet").classList.add("neon")),e.setAttribute("position",i.getAttribute("position")),e.setAttribute("visible",!0))})},closeApp(e){e.addEventListener("click",i=>{window.location.reload()})},getAttributeArray(){this.attributesArray=["twerk","idle","silly","flair"]}};n.init();

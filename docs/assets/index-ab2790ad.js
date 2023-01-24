(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const i={init(){this.cacheElements(),this.showLoadingScreen(),this.generateUI()},cacheElements(){this.$goose=document.querySelector("#goose"),this.$helena=document.querySelector("#helena"),this.$enterScreen=document.querySelector(".enter__content"),this.$loadingScreen=document.querySelector(".enter__loading"),this.$enterScreenBg=document.querySelector("#enter-screen-bg"),this.$splash=document.querySelector(".splash"),this.$petTitle=document.querySelector(".app__title-pet"),this.$lectorTitle=document.querySelector(".app__title-lector"),this.$launchVirtualPet=document.querySelector(".launch-virtual-pet"),this.$virtualPetUI=document.querySelector(".virtual-pet-app"),this.$launchDancingLector=document.querySelector(".launch-dancing-lector"),this.$dancingLectorUI=document.querySelector(".dancing-lector-app"),this.$transcript=document.querySelector(".transcription__content"),this.$recordBtn=document.querySelector(".start-record"),this.$reticle=document.querySelector("[ar-hit-test]"),this.$sambaBtn=document.querySelector(".samba"),this.$hipHopBtn=document.querySelector(".hiphop"),this.$bellyBtn=document.querySelector(".belly"),this.$swingBtn=document.querySelector(".swing"),this.$ExitApp=document.querySelectorAll(".exit-app"),this.$exitBtn=document.querySelector(".exit-button"),this.$scene=document.querySelector("a-scene")},showLoadingScreen(){setTimeout(()=>{this.$loadingScreen.classList.add("is-hidden"),this.$enterScreen.classList.remove("is-hidden"),document.querySelector(".a-enter-ar").classList.add("is-visible")},6e3)},generateUI(){this.$exitBtn.addEventListener("click",function(){window.location.reload()}),this.$scene.addEventListener("enter-vr",()=>{this.$enterScreenBg.setAttribute("visible","false"),this.$enterScreen.classList.add("is-hidden"),this.$splash.classList.remove("is-hidden"),this.$launchVirtualPet.addEventListener("click",this.generateVirtualPetApp),this.$launchDancingLector.addEventListener("click",this.generateDancingLectorApp),this.$ExitApp.forEach(e=>i.closeApp(e)),this.$reticle.setAttribute("ar-hit-test","doHitTest:true"),this.$reticle.setAttribute("visible","true")}),this.$scene.addEventListener("exit-vr",()=>{this.$splash.classList.add("is-hidden"),this.$reticle.setAttribute("ar-hit-test","doHitTest:false"),this.$reticle.setAttribute("visible","false")})},generateDancingLectorApp(){document.querySelector(".splash").classList.add("is-hidden"),document.querySelector(".dancing-lector-app").classList.remove("is-hidden");const e=document.getElementById("helena");i.generatePositionObject(e),i.enableSpeechRecognition(e)},generateVirtualPetApp(){document.querySelector(".splash").classList.add("is-hidden"),document.querySelector(".virtual-pet-app").classList.remove("is-hidden"),document.querySelector("#helena").classList.add("is-hidden");const e=document.getElementById("goose");i.generatePositionObject(e),i.$sambaBtn.addEventListener("click",()=>i.addAnimation(e,"samba")),i.$hipHopBtn.addEventListener("click",()=>i.addAnimation(e,"hiphop")),i.$bellyBtn.addEventListener("click",()=>i.addAnimation(e,"belly")),i.$swingBtn.addEventListener("click",()=>i.addAnimation(e,"swing"))},enableSpeechRecognition(e){if(!window.webkitSpeechRecognition)alert("Sorry, your browser does not support the webkitSpeechRecognition API");else{const n=new webkitSpeechRecognition;n.interimResults=!0;const a=this.$transcript,c=this.$recordBtn;c.addEventListener("click",function(){n.start(),c.disabled=!0}),n.onspeechend=function(){n.stop(),c.disabled=!1};let t=[];const r=["twerk","break","still","silly"];n.addEventListener("result",function(s){let l="";for(let o=s.resultIndex;o<s.results.length;o++)s.results[o].isFinal,l+=s.results[o][0].transcript;a.innerHTML=l,t=[],t.push(l),console.log(t),r.forEach(o=>{t.some(d=>d.includes(o))&&i.addAnimation(e,o)})})}},addAnimation(e,n){switch(n){case"break":e.setAttribute("animation-mixer","clip:flair; loop:infinite; crossFadeDuration: 2;");break;case"silly":e.setAttribute("animation-mixer","clip:sillydance1; loop:infinite; crossFadeDuration: 2;");break;case"still":e.setAttribute("animation-mixer","clip:idle; loop:infinite; crossFadeDuration: 2;");break;default:e.setAttribute("animation-mixer",`clip:${n}; loop:infinite; crossFadeDuration: 2;`);break}},generatePositionObject(e){i.$reticle.addEventListener("select",function(){this.components["ar-hit-test"].hasFoundAPose&&(e.id=="helena"?(i.$lectorTitle.innerHTML="Let's go<br>Helena!",i.$lectorTitle.classList.add("neon")):(i.$petTitle.innerHTML="Goose Party!",i.$petTitle.classList.add("neon")),e.setAttribute("position",i.$reticle.getAttribute("position")),e.setAttribute("visible",!0))})},closeApp(e){e.addEventListener("click",n=>{window.location.reload()})}};i.init();
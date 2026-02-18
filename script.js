const navbar=document.querySelector(".navbar");
window.addEventListener("scroll",()=>{
if(navbar)navbar.classList.toggle("navbar-scrolled",window.scrollY>50);
});

const hamburger=document.querySelector(".hamburger");
const navLinks=document.querySelector(".nav-links");

if(hamburger&&navLinks){
hamburger.addEventListener("click",()=>{
navLinks.classList.toggle("active");
});
}

/* AUTO SCROLL + DRAG */
function autoScroll(container,speed=0.6){

let isHover=false;
let isDown=false;
let startX;
let scrollLeft;

container.innerHTML+=container.innerHTML;

container.addEventListener("mouseenter",()=>isHover=true);
container.addEventListener("mouseleave",()=>isHover=false);

container.addEventListener("mousedown",(e)=>{
isDown=true;
startX=e.pageX-container.offsetLeft;
scrollLeft=container.scrollLeft;
});

container.addEventListener("mouseleave",()=>isDown=false);
container.addEventListener("mouseup",()=>isDown=false);

container.addEventListener("mousemove",(e)=>{
if(!isDown)return;
e.preventDefault();
const x=e.pageX-container.offsetLeft;
const walk=(x-startX)*2;
container.scrollLeft=scrollLeft-walk;
});

function scroll(){
if(!isHover){
container.scrollLeft+=speed;
if(container.scrollLeft>=container.scrollWidth/2){
container.scrollLeft=0;
}
}
requestAnimationFrame(scroll);
}
scroll();
}

const galeriTrack=document.querySelector(".galeri-track");
const prestasiTrack=document.querySelector(".prestasi-track");

if(galeriTrack)autoScroll(galeriTrack);
if(prestasiTrack)autoScroll(prestasiTrack);

const backTop=document.querySelector(".back-to-top");
if(backTop){
window.addEventListener("scroll",()=>{
backTop.classList.toggle("show",window.scrollY>400);
});
backTop.addEventListener("click",()=>{
window.scrollTo({top:0,behavior:"smooth"});
});
}

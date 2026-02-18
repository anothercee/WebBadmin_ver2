/* HAMBURGER */
const hamburger=document.querySelector(".hamburger");
const navLinks=document.querySelector(".nav-links");

if(hamburger){
  hamburger.addEventListener("click",()=>{
    navLinks.classList.toggle("active");
  });
}

/* SMOOTH SCROLL */
document.querySelectorAll("a[href^='#']").forEach(anchor=>{
  anchor.addEventListener("click",function(e){
    const target=document.querySelector(this.getAttribute("href"));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth"});
      navLinks.classList.remove("active");
    }
  });
});

/* ACTIVE NAV */
const sections=document.querySelectorAll("section");
const navItems=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{
  let current="";
  sections.forEach(section=>{
    const top=section.offsetTop-150;
    const height=section.clientHeight;
    if(window.scrollY>=top && window.scrollY<top+height){
      current=section.id;
    }
  });

  navItems.forEach(link=>{
    link.classList.toggle(
      "active",
      link.getAttribute("href")==="#"+current
    );
  });
});

/* INFINITE SLIDER */
function setupSlider(selector){
  const track=document.querySelector(selector);
  if(!track) return;

  track.innerHTML+=track.innerHTML;

  let position=0;
  let speed=0.5;
  let paused=false;

  function animate(){
    if(!paused){
      position+=speed;
      if(position>=track.scrollWidth/2){
        position=0;
      }
      track.style.transform=`translateX(-${position}px)`;
    }
    requestAnimationFrame(animate);
  }
  animate();

  const wrapper=track.parentElement;
  wrapper.addEventListener("mouseenter",()=>paused=true);
  wrapper.addEventListener("mouseleave",()=>paused=false);

  let isDown=false,startX,startPos;

  wrapper.addEventListener("mousedown",(e)=>{
    isDown=true;
    startX=e.pageX;
    startPos=position;
  });

  wrapper.addEventListener("mouseup",()=>isDown=false);
  wrapper.addEventListener("mouseleave",()=>isDown=false);

  wrapper.addEventListener("mousemove",(e)=>{
    if(!isDown) return;
    position=startPos-(e.pageX-startX);
  });

  wrapper.addEventListener("touchstart",(e)=>{
    startX=e.touches[0].pageX;
    startPos=position;
  });

  wrapper.addEventListener("touchmove",(e)=>{
    position=startPos-(e.touches[0].pageX-startX);
  });
}

setupSlider(".galeri-track");
setupSlider(".prestasi-track");

/* BACK TO TOP */
const backTop=document.querySelector(".back-to-top");
window.addEventListener("scroll",()=>{
  backTop.classList.toggle("show",window.scrollY>400);
});
backTop.addEventListener("click",()=>{
  window.scrollTo({top:0,behavior:"smooth"});
});

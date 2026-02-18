/* HAMBURGER */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if(hamburger && navLinks){
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

/* INFINITE SLIDER */
function setupInfiniteSlider(trackSelector){

  const track=document.querySelector(trackSelector);
  if(!track) return;

  track.innerHTML+=track.innerHTML;

  let position=0;
  let speed=0.5;
  let isPaused=false;

  function animate(){
    if(!isPaused){
        position+=speed;
        if(position>=track.scrollWidth/2){
            position=0;
        }
        track.style.transform=`translateX(-${position}px)`;
    }
    requestAnimationFrame(animate);
  }

  animate();

  const slider=track.parentElement;

  slider.addEventListener("mouseenter",()=>isPaused=true);
  slider.addEventListener("mouseleave",()=>isPaused=false);

  let isDown=false,startX,startPos;

  slider.addEventListener("mousedown",(e)=>{
    isDown=true;
    startX=e.pageX;
    startPos=position;
  });

  slider.addEventListener("mouseup",()=>isDown=false);
  slider.addEventListener("mouseleave",()=>isDown=false);

  slider.addEventListener("mousemove",(e)=>{
    if(!isDown) return;
    position=startPos-(e.pageX-startX);
  });

  slider.addEventListener("touchstart",(e)=>{
    startX=e.touches[0].pageX;
    startPos=position;
  });

  slider.addEventListener("touchmove",(e)=>{
    position=startPos-(e.touches[0].pageX-startX);
  });

}

setupInfiniteSlider(".galeri-track");
setupInfiniteSlider(".prestasi-track");

/* BACK TO TOP */
const backTop=document.querySelector(".back-to-top");
window.addEventListener("scroll",()=>{
    backTop.classList.toggle("show",window.scrollY>400);
});
backTop.addEventListener("click",()=>{
    window.scrollTo({top:0,behavior:"smooth"});
});

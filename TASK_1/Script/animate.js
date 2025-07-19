import { gsap } from "https://esm.sh/gsap";
import { SplitText } from "https://esm.sh/gsap/SplitText";
import { Flip } from "https://esm.sh/gsap/Flip";


gsap.registerPlugin(SplitText, Flip);

document.addEventListener("DOMContentLoaded",()=>{
    const themeToggle = document.querySelector(".icon-wrapper");
    const hero = document.querySelector(".hero");
    const menuBtn = document.querySelector(".menu");
    const menuOverlay = document.querySelector(".menu-overlay");
    const menuClosebtn = document.querySelector(".close a");


    const changeTheme = ()=>{
        let isdarkTheme = document.body.classList.toggle("dark");
        themeToggle.querySelector("i").className = isdarkTheme ? "fa-solid fa-sun" : "fa-solid fa-moon";
        menuBtn.style.backgroundColor = isdarkTheme ? "#d11919ff":"#fff";
        themeToggle.style.backgroundColor = isdarkTheme ? "#d11919ff":"#000";
        
        if(document.body.classList.contains("dark")){
            hero.style.backgroundColor = '#0e0d0d';
            menuOverlay.style.backgroundColor = '#0e0d0d';
            hero.style.color = "#fff";
            menuOverlay.style.color = '#fff';
            menuClosebtn.style.color = '#fff'; 
        }
        else{
            hero.style.color = '#000';
            menuOverlay.style.color = '#000';
            hero.style.backgroundColor = "#fff";
            menuOverlay.style.backgroundColor = '#fff';
            menuClosebtn.style.color = "#000";
        }
    };


    function updateCounter() {
    const loader = document.querySelector(".loder p");
    let currentValue = 0;

    function animateLoader() {
        if (currentValue < 100) {
            let increment = Math.floor(Math.random() * 10) + 3;
            currentValue = Math.min(currentValue + increment, 100);
            loader.textContent = currentValue;

            if (currentValue < 100) {
                setTimeout(animateLoader, Math.floor(Math.random() * 120) + 30);
            } else {
                loader.textContent = 100; 
            }
        }
    }

    if (loader) {
        loader.textContent = 0;
        animateLoader();
    }
    };

    function SplitTextLines() {
    const textElements = document.querySelectorAll("h1, h2, h4, a");
    textElements.forEach((elem) => {
        const split = new SplitText(elem, {
            type: "words",
            linesClass: "line"
        });

        split.lines.forEach(line => {
            const textContent = line.textContent;
            line.innerHTML = `<span>${textContent}</span>`;
        });
    });
    };

   function mainFrameAnimations(){
   gsap.set(".welcome h4 div",{y:100});
   gsap.set(hero, { clipPath: "inset(80% 0 0 0)" });
   gsap.set(".hero h1",{y:100,opacity:0,scaleY:0.5});
   gsap.set(".hero a,h2",{y:30});
   gsap.set(".hero p",{y:100});
   gsap.set(".img-wrapper img",{opacity:0});
  


   const overlayTimeline = gsap.timeline();
   overlayTimeline.to(".loder",{opacity:0,y:-20,delay:2.5,duration:0.5},"<");

   overlayTimeline.to(".welcome h4 div", {
    y: 0,
    ease: "power3.inOut",
    duration: 1.5,
    stagger: 0.2,
    onComplete:() =>{
        gsap.to(".welcome h4 div",{opacity:0,delay:0.6,duration:1,stagger:0.1});
    }
   },"<");

   overlayTimeline.to([".overlay"],{
      scale:0,
      delay:1.2,
      duration:1,
      ease:"Power3.inOut",
      onstart:()=>{
        gsap.to(".overlay .fg",{height:0,ease:"power3.inOut",duration:0.8})
      }
   },">")
   .to(hero,{clipPath: "inset(0% 0 0 0)",ease:"Power3.inOut",duration:0.5},"<")
   .to(".hero h1",{y:0,opacity:1,scaleY:1,ease:"power3.inOut",duration:1,stagger:0.1},"<")
   .to(".hero a,h2",{y:0,ease:"power3.inOut",duration:0.8,stagger:0.1},"<")
   .to(".hero p",{y:0,ease:"power3.inOut",stagger:0.1,duration:0.8},"<")
   .to(".img-mask",{scaleX:0,ease:"powe3.inOut",stagger:0.1,duration:0.8,
    onstart:()=>{gsap.to(".img-wrapper img",{opacity:1,duration:0.001})},
   });

    };

   function NavigationAnimations(){
    const menuBtn = document.querySelector(".menu");
    const closeBtn = document.querySelector(".close");
    const workFlowTl = gsap.timeline({paused:true,reversed:true});

    gsap.set(".link-wrapper h2",{x:"-100%"});
    workFlowTl.to(".menu-overlay",{x:0,ease:"power3.Out",duration:0.4},"<")
    .to(".link-wrapper h2",{x:0,ease:"power3.inOut",duration:0.4,stagger:0.15},"<")
    .to(".social-media",{opacity:1,ease:"power3.inOut",duration:0.4,stagger:0.15});

    menuBtn.addEventListener("click",()=>{
        workFlowTl.play();
    })

    closeBtn.addEventListener("click",()=>{
       workFlowTl.reverse();
    })
    };
   

   function animateMarqee() {
    const linkWrappers = document.querySelectorAll(".link-wrapper");

    linkWrappers.forEach(wrapper => {
        const h2 = wrapper.querySelector("h2");
        const p = wrapper.querySelector("p");

        const tl = gsap.timeline({ paused: true });

        tl.to(p, {
            x: -50,
            ease: "power3.inOut",
            duration: 0.3
        });

        h2.addEventListener("mouseenter", () => tl.play());
        h2.addEventListener("mouseleave", () => tl.reverse());
    });
  };

  function createImageTrail() {
    const h1 = document.querySelector(".hero-content h1");
    const trailContainer = document.querySelector(".image-trail-container");

    let imageSources = [
        "assets/Images/2.jpg",
        "assets/Images/3.jpg",
        "assets/Images/4.jpg",
        "assets/Images/5.jpg",
        "assets/Images/1-min.jpeg",
    ];

    let trailImages = [];

    h1.addEventListener("mousemove", (e) => {
        const bounds = h1.getBoundingClientRect();
        const clamp = gsap.utils.clamp(-15, 15); 
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        const img = document.createElement("img");
        img.src = imageSources[Math.floor(Math.random() * imageSources.length)];
        img.classList.add("trail-image");

      
        gsap.set(img, {
            position: "absolute",
            top: y + (Math.random() * 20 - 10),
            left: x + (Math.random() * 20 - 10),
            width: "21vh",
            height: "27vh",
            borderRadius: "8px",
            opacity: 0,
            scale: 0.5,
            pointerEvents: "none",
            zIndex: 2,
        });

        trailContainer.appendChild(img);
        trailImages.push(img);

        const state = Flip.getState(img);

        gsap.set(img, {
            opacity: 1,
            scale: 1,
            rotation: Math.random() * 20 - 10,
            x: clamp(Math.random() * 40 - 20),
            y: clamp(Math.random() * 40 - 20),
        });

        Flip.from(state, {
            duration: 0.6,
            ease: "power2.out"
        });

        if (trailImages.length > 5) {
            const old = trailImages.shift();
            gsap.to(old, {
                opacity: 0.8,
                scale: 0,
                duration: 0.4,
                onComplete: () => old.remove()
            });
        }

        h1.addEventListener("mouseleave", () => {
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 0.3 } });

            trailImages.forEach((img, index) => {
                tl.to(img, {
                    opacity: 0.8,
                    scale: 0,
                    rotate:Math.random()*20 - 10,
                    onComplete: () => img.remove()
                }, index * 0.1);
            });
          trailImages = [];
        });
    });
    
}

  function checkDeviceWidth() {
  const deviceWidth = window.innerWidth;
  if (deviceWidth > 800) {
    createImageTrail();
  }
  }

   checkDeviceWidth();

   window.addEventListener("resize", checkDeviceWidth);


   SplitTextLines();
   mainFrameAnimations();
   updateCounter();
   NavigationAnimations();
   animateMarqee();
   themeToggle.addEventListener("click",changeTheme);

});

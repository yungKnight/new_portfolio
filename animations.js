document.addEventListener("DOMContentLoaded", () => {
    gsap.set(".introductory-metaphor span", { opacity: 1 });
    gsap.set("#brag-question", { opacity: 1, scale: 1.1 });

    const typedText = document.getElementById("typed-text");
    const originalText = typedText.textContent;
    typedText.textContent = "";
    
    gsap.set("#typed-text", { opacity: 0, scale: 0.25 });
    gsap.set("#about-me", { opacity: 0 });
    gsap.set(".grid-container", {opacity: 0});

    disableScroll();

    const timeline = gsap.timeline({ yoyo: true, ease: "power2.inOut" });

    timeline
        .to(".introductory-metaphor span:first-child", { opacity: 0, duration: 0.5 }, "+=0.8") 
        .to(".introductory-metaphor span:last-child", { opacity: 0, duration: 0.5 }, "-=0.3") 
        .to("#brag-question", { opacity: 0, scale: 0.5, duration: 0.75}, "+=0.2")    
        .to("#typed-text", { opacity: 1, scale: 1.3, duration: 0.5, onStart: startTypingAnimation }, "-=0.5")
        .to("#welcome", { y: -40, duration: 0.25 }, "-=0.25")
        .to(".grid-container", {opacity:1, duration:0.50}, "-=0.50")
        .to("#about-me", { opacity: 1, duration: 0.25, onComplete: enableScroll }, "-=0.25");

    function startTypingAnimation() {
        typedText.textContent = originalText;
        typedText.style.animation = "none";
        void typedText.offsetWidth;
        typedText.style.animation = "typing 0.75s steps(9, end) forwards, blink .5s step-end infinite alternate";
    }

    function disableScroll() {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        window.addEventListener("wheel", preventScroll, { passive: false });
        window.addEventListener("touchmove", preventScroll, { passive: false });
        window.addEventListener("keydown", preventKeyScroll);
    }

    function enableScroll() {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll);
        window.removeEventListener("keydown", preventKeyScroll);
    }

    function preventScroll(event) {
        event.preventDefault();
    }

    function preventKeyScroll(event) {
        const keys = [32, 37, 38, 39, 40];
        if (keys.includes(event.keyCode)) {
            event.preventDefault();
        }
    }

    gsap.registerPlugin(ScrollTrigger, Flip, ScrambleTextPlugin);

    let state = Flip.getState(".grid-container");

    ScrollTrigger.create({
        trigger: "#welcome",
        start: "top 25%",
        end: "bottom 25%",
        scrub: true,
        onUpdate: (self) => {
          if (self.progress > 0.65) {
            document.querySelector(".grid-container").style.left = "40%";
          }else if (self.progress > 0.35) {
            document.querySelector(".grid-container").style.left = "45%";
          }else {
            document.querySelector(".grid-container").style.left = "50%";
          }
    
          Flip.from(state, {
            duration: 0.5,
            ease: "ease3.out",
            absolute: true,
          });
    
          state = Flip.getState(".grid-container");
        }
    });

    ScrollTrigger.create({
        trigger: "#others",
        start: "top 25%",
        end: "bottom 50%",
        scrub: true,
        onUpdate: (self) => {
          if (self.progress > 0.65) {
            document.querySelector(".grid-container").style.left = "60%";
          }else if (self.progress > 0.35) {
            document.querySelector(".grid-container").style.left = "50%";
          }else {
            document.querySelector(".grid-container").style.left = "40%";
          }
    
          Flip.from(state, {
            duration: 0.5,
            ease: "ease3.in",
            absolute: true,
          });
    
          state = Flip.getState(".grid-container");
        }
    });

    ScrollTrigger.create({
        trigger: "#the-journey",
        start: "top 45%",
        end: "bottom 5%",
        scrub: true,
        onUpdate: (self) => {
          if (self.progress > 0.4) {
            document.querySelector(".grid-container").style.opacity = "0";
          } else if (self.progress > 0.25) {
            document.querySelector(".grid-container").style.opacity = "0.5";
          } else {
            document.querySelector(".grid-container").style.opacity = "1"; 
          }
    
          Flip.from(state, {
            duration: 0.5,
            ease: "ease3.in",
            absolute: true,
          });
    
          state = Flip.getState(".grid-container"); 
        },
        onLeave: () => {
          const nav = document.querySelector(".grid-container");
          nav.style.opacity = "1";
          nav.style.left = "50%";
        },
        onLeaveBack: () => {
          const nav = document.querySelector(".grid-container");
          nav.style.opacity = "1";
          nav.style.left = "50%";
        }
    });

    ScrollTrigger.create({
        trigger: "#others",
        start: "top 55%",
        end: "bottom 25%",
        scrub: true,
        onEnter: () => {
            const paragraph = document.querySelector("#others p");
            const parentWidth = paragraph.parentElement.offsetWidth;
            const computedStyle = window.getComputedStyle(paragraph);
            
            const currentWidth = paragraph.offsetWidth;
            const currentHeight = paragraph.offsetHeight;
            
            gsap.set("#others p", {
              width: currentWidth + "px",
              minWidth: currentWidth + "px",
              maxWidth: currentWidth + "px",
              height: currentHeight + "px",
              minHeight: currentHeight + "px",
              whiteSpace: "normal",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              overflow: "hidden",
              boxSizing: "border-box"
            });
            
            gsap.to("#others p", {
              duration: 1,
              scrambleText: {
                text: "Think of me as an explorer that loves to learn new things, understand how they work and build quality stuff",
                chars: "lowerCase",
                revealDelay: 0.05,
                speed: 0.7,
                delimiter: " ",
                tweenLength: false
              }
            });
        },
        onLeave: () => {
            gsap.set("#others p", {
                width: "auto",
                minWidth: "auto", 
                maxWidth: "none",
                height: "auto",
                minHeight: "auto",
                overflow: "visible",
            });

            document.querySelector("#others p").textContent = "Think of me as an explorer that loves to learn new things, understand how they work and build quality stuff";
        },
    });

    let stackAnimationTriggered = false;
    
    ScrollTrigger.create({
        trigger: "#stack",
        start: "top 85%",
        end: "top 80%",
        once: true,
        onEnter: () => {
            if (!stackAnimationTriggered) {
                stackAnimationTriggered = true;
                
                const stackParagraph = document.querySelector("#stack > div:first-child > p");
                const originalStackText = "Fullstack web developer, Web Scraper, Economist";
                
                stackParagraph.textContent = "";

                let i = 0;
                const typeWriter = () => {
                    if (i < originalStackText.length) {
                        stackParagraph.textContent += originalStackText.charAt(i);
                        i++;
                        setTimeout(typeWriter, 10);
                    } 
                };               
                setTimeout(typeWriter, 50);
            }
        }
    });

    const containers = document.getElementsByClassName("project-logo");
    const style = document.createElement('style');

    Array.from(containers).forEach(container => {
        container.addEventListener("mousemove", (e) => {
            const bounds = container.getBoundingClientRect();
        
            const centerX = bounds.left + bounds.width / 2;
            const centerY = bounds.top + bounds.height / 2;
    
            const offsetX = e.clientX - centerX;
            const offsetY = e.clientY - centerY;
    
            const rotateY = gsap.utils.clamp(-20, 20, offsetX / 8);
            const rotateX = gsap.utils.clamp(-20, 20, -offsetY / 8);
    
            const translateZ = Math.abs(offsetX) + Math.abs(offsetY) > 50 ? 10 : 0;
    
            gsap.to(container, {
                rotateY,
                rotateX,
                z: translateZ,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        container.addEventListener("mouseleave", () => {
            gsap.to(container, {
                rotateY: 0,
                rotateX: 0,
                z: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });
        container.addEventListener("mouseenter", () => {
            gsap.to(container, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        container.addEventListener("mouseleave", () => {
            gsap.to(container, {
                scale: 1,
                duration: 0.8,
                ease: "power3.out"
            });
        });
    });
    style.textContent = `
        .project-logo {
            transform-style: preserve-3d;
            perspective: 10000px;
        }
        
        .project-logo img {
            transform-style: preserve-3d;
            transition: transform 0.1s ease-out;
        }
    `;
    document.head.appendChild(style);
});

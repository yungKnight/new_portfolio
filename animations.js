document.addEventListener("DOMContentLoaded", () => {
    console.log(window.innerWidth);

    gsap.set(".introductory-metaphor span", { opacity: 1 });
    gsap.set("#brag-question", { opacity: 1, scale: 1.1 });

    const typedText = document.getElementById("typed-text");
    const originalText = typedText.textContent;
    typedText.textContent = "";
    
    gsap.set("#typed-text", { opacity: 0, scale: 0.25 });
    gsap.set("#about-me", { opacity: 0 });

    disableScroll();

    const timeline = gsap.timeline({ yoyo: true, ease: "power2.inOut" });

    timeline
        .to(".introductory-metaphor span:first-child", { opacity: 0, duration: 1 }, "+=0.8") 
        .to(".introductory-metaphor span:last-child", { opacity: 0, duration: 0.5 }, "-=0.3") 
        .to("#brag-question", { opacity: 0, scale: 0.5, duration: 0.75}, "+=0.2")    
        .to("#typed-text", { opacity: 1, scale: 1.3, duration: 0.5, onStart: startTypingAnimation }, "-=0.5")
        .to("#welcome", { y: -40, duration: 0.25 }, "-=0.25")
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
});

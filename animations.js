document.addEventListener("DOMContentLoaded", () => {
    gsap.set(".introductory-metaphor span", { opacity: 1 }); // Start with spans hidden

    const timeline = gsap.timeline({ yoyo: true, ease: "power2.inOut" });

    timeline
        .to(".introductory-metaphor span:first-child", { opacity: 0, duration: 1.5 }, "+=0.5") // Starts fading back
        .to(".introductory-metaphor span:last-child", { opacity: 0, duration: 0.75 }, "+=0.5"); // Then it fades away
});

// import gsap from 'gsap';


document.addEventListener("DOMContentLoaded", () => {

  const t1 = gsap.timeline({ repeat: -1, defaults: { duration: 1 } });

  gsap.utils.toArray(".text-anim h1").forEach((text, index) => {

    t1.to(text, { top: 0 }, '>') // Stagger effect
      .to(text, { top: "-100%" }, ">");
  });
});

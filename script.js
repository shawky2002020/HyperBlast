//import gsap from "gsap";

//SMOOTH SCROLL
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  direction: "vertical", // vertical, horizontal
  gestureDirection: "vertical", // vertical, horizontal, both
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});
//get scroll value
// lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
//   console.log({ scroll, limit, velocity, direction, progress })
// });
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

const navBar = document.querySelector("nav");
const nonText = document.querySelector('#non-anim')
const sub1 = document.querySelectorAll(".sub1");
const sub2 = document.querySelectorAll(".sub2");
const questions = document.querySelectorAll(".q");
const cards = document.querySelectorAll(".card");
const stars = document.querySelector('.stars')
const footer = document.querySelector("footer");


document.addEventListener("DOMContentLoaded", () => {
  //TEXT SLIDE
  const textTwine = gsap.timeline({
    repeat: -1,
    delay: 4,
    defaults: { duration: 1 },
  });
  gsap.utils.toArray(".text-anim h1").forEach((text, index) => {
    textTwine
      .to(text, { top: 0 }, ">") // Stagger effect
      .to(text, { top: "-100%",delay:1 }, ">");
  });


  //TEXT NON SLIDE
  gsap.from(nonText, {duration: 2, text:'',delay:2})

  //NAV-BAR
  gsap.from(navBar.children.item(0), {
    duration: 1,
    opacity: 0,
    y: -400,
    ease: "back",
  });
  gsap.from(navBar.children.item(1), {
    duration: 1,
    opacity: 0,
    x: 400,
    delay: .5,
  });

  //CARDS-1
  const cd = document.querySelectorAll(".card-wrapper");
  gsap.fromTo(
    ".sec-2 .card",
    {
      opacity: 0,
      scale: 0.1,
    },
    {
      opacity: 1,
      scale: 1,
      stagger: {
        amount: 1,
      },
      scrollTrigger: {
        trigger: ".card-wrapper > .card",
        // start: "-100 80%",
        // end: "800 bottom",
        toggleActions: "play reverse play reverse",
        // markers:true
      },
    }
  );

  //CARDS-2
  gsap.fromTo(
    ".help-card",
    {
      opacity: 0,
      scale: 0.1,
    },
    {
      opacity: 1,
      scale: 1,
      stagger: {
        amount: 1,
      },
      scrollTrigger: {
        trigger: ".help-card",
        start: "-150 80%",
        end: "2000% ",
        toggleActions: "play reverse play reverse",
        // markers:true
      },
    }
  );

  //CARDS-3
  gsap.fromTo(
    ".sec-5 .card",
    {
      opacity: 0,
      scale: 0.1,
    },
    {
      opacity: 1,
      scale: 1,
      stagger: {
        amount: 1,
      },
      scrollTrigger: {
        trigger: ".sec-5 .card",
        start: "-150 80%",
        end: "2000% ",
        toggleActions: "play reverse play reverse",
        // markers:true
      },
    }
  );

  // SUB1 Animation
  sub1.forEach((sub, i) => {
    if (i!==sub1.length-1) { // Exclude footer
    gsap.from(sub, {
      duration: 1,
      scale: i==0? 0.5 : 1,
      x: i % 2 ? 800 : i==0? 0 : -800,
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sub,
        // start: "top 80%",
        // end: "120% -30%",
        toggleActions: "play reverse play reverse",
      },
    });
  }
  });

  //SUB2 Animation
  sub2.forEach((sub, i) => {
    if (i!== sub2.length-1) { //exclude footer
    gsap.from(sub, {
      delay: i==0? 5 : .5, // Example of valid delay
      duration: 1,
      x: i % 2 ? -200 : 200,
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sub,
        // start: "top 80%",
        // end: "120% -30%",
        toggleActions: "play reverse play reverse",
      },
    });
  }
  });

  //DOTS
  // gsap.from('.sec-4', {duration: 1,opacity:0,scrollTrigger:{
  //   toggleActions: "play reverse play reverse",
  //   trigger:'.sec-4'
  // }})
  
  //STARS
  gsap.from(stars.children, { opacity:0,stagger:{
    amount:1.5
  },
  scale:0,
  scrollTrigger:{
    trigger:stars,
    toggleActions: "play reverse play reverse",

  }
  })

  //FAQ
  questions.forEach((q) => {
    const answer = q.querySelector(".answer");

    q.addEventListener("click", () => {
      if (q.classList.contains("active")) {
        gsap.to(answer, { height: 0, duration: 0.4, ease: "power2.out" });
      } else {
        gsap.set(answer, { height: "auto" }); // Set to auto to get full height
        let fullHeight = answer.offsetHeight; // Get the computed height

        gsap.set(answer, { height: 0 }); // Reset height to animate from 0
        gsap.to(answer, {
          height: fullHeight,
          duration: 0.4,
          ease: "power2.out",
        });
      }

      q.classList.toggle("active");
    });
  });

  //FOOTER
  gsap.from(footer.children, {
    duration: 1,
    opacity: 0,
    stagger:{
      amount:1
    },
    X: 100,
    scrollTrigger: {
      // markers: true,
      start: "99% 100%",
      end: "99%",
      toggleActions: "play reverse play reverse",

    },
  });
});

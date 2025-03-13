import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registra i plugin di GSAP
gsap.registerPlugin(ScrollTrigger);

// Animazione di fade-in
export const fadeIn = (element) => {
  gsap.from(element, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out'
  });
};

// Animazione di fade-in con stagger per elementi multipli
export const staggerFadeIn = (elements, staggerTime = 0.1) => {
  gsap.from(elements, {
    opacity: 0,
    y: 30,
    stagger: staggerTime,
    duration: 0.8,
    ease: 'power2.out'
  });
};

// Animazione basata su scroll
export const scrollAnimation = (element, trigger) => {
  gsap.from(element, {
    scrollTrigger: {
      trigger: trigger || element,
      start: 'top bottom-=100',
      toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 100,
    duration: 1,
    ease: 'power3.out'
  });
};

// Animazione per titoli
export const titleAnimation = (element) => {
  gsap.from(element, {
    opacity: 0,
    y: -50,
    duration: 1.2,
    ease: 'elastic.out(1, 0.3)'
  });
};

// Timeline per animazioni sequenziali
export const createHeroAnimation = (container, elements) => {
  const tl = gsap.timeline();
  
  tl.from(container, {
    opacity: 0,
    duration: 0.5
  })
    .from(elements.title, {
      opacity: 0,
      y: -50,
      duration: 0.8
    }, '-=0.2')
    .from(elements.subtitle, {
      opacity: 0,
      y: 30,
      duration: 0.8
    }, '-=0.4')
    .from(elements.cta, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6
    }, '-=0.2');
    
  return tl;
};

// Animazione per menu
export const menuAnimation = (menuItems) => {
  return gsap.from(menuItems, {
    opacity: 0,
    y: -20,
    stagger: 0.1,
    duration: 0.5,
    ease: 'power2.out'
  });
};
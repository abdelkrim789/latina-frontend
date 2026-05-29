/* ============================================================
   LATINA ANIMATIONS — GSAP ScrollTrigger system
   Exposes window.LatinaAnimations.init() — called by App
   after the box-opening sequence completes.
   ============================================================ */

window.LatinaAnimations = (() => {
  let initialized = false;

  /* ── Counter animation ── */
  const animateCounters = () => {
    document.querySelectorAll(".hero-stat .num[data-count]").forEach(el => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const prefix = el.dataset.prefix || "";
      if (isNaN(target)) return;

      gsap.to(
        { val: 0 },
        {
          val: target,
          duration: 2,
          ease: "power2.out",
          delay: parseFloat(el.dataset.delay || 0),
          onUpdate: function () {
            const v = this.targets()[0].val;
            el.textContent = prefix + (Number.isInteger(target) ? Math.round(v) : v.toFixed(1)) + suffix;
          },
          onComplete: () => { el.textContent = prefix + target + suffix; }
        }
      );
    });
  };

  /* ── Reveal-on-scroll (replaces the IntersectionObserver in App) ── */
  const initReveal = () => {
    ScrollTrigger.batch(".reveal", {
      start: "top 84%",
      once: true,
      onEnter: els => {
        gsap.to(els, { opacity: 1, y: 0, stagger: 0.08, duration: 0.9, ease: "power3.out" });
        els.forEach(el => el.classList.add("in"));
      }
    });

    ScrollTrigger.batch(".reveal-stagger > *", {
      start: "top 84%",
      once: true,
      onEnter: els => {
        gsap.to(els, { opacity: 1, y: 0, stagger: 0.12, duration: 0.85, ease: "power3.out" });
        els.forEach(el => el.classList.add("in"));
      }
    });
  };

  /* ── Hero parallax (stage floats slightly on scroll) ── */
  const initHeroParallax = () => {
    const stage = document.querySelector(".hero-stage");
    const lotus = document.querySelector(".hero-lotus");
    const heroLeft = document.querySelector(".hero-left");
    if (!stage) return;

    gsap.to(stage, {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.2
      }
    });

    if (lotus) {
      gsap.to(lotus, {
        rotation: 8,
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 2
        }
      });
    }

    if (heroLeft) {
      gsap.to(heroLeft, {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.8
        }
      });
    }
  };

  /* ── Hero entrance (runs once on init) ── */
  const heroEntrance = () => {
    const tl = gsap.timeline({ delay: 0.1 });

    tl.fromTo(".hero-eyebrow",
      { opacity: 0, y: 16, filter: "blur(4px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" }
    )
    .fromTo(".hero-title",
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(".hero-sub",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(".hero-ctas",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(".hero-stat-grid .hero-stat",
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    )
    .fromTo(".floating-product",
      { opacity: 0, y: 30, scale: 0.94 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.9, ease: "back.out(1.2)" },
      "-=0.5"
    );

    animateCounters();
  };

  /* ── Manifesto pillars stagger ── */
  const initManifesto = () => {
    gsap.fromTo(".pillar",
      { opacity: 0, y: 48 },
      {
        opacity: 1, y: 0,
        stagger: 0.16,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".manifesto-pillars",
          start: "top 78%",
          once: true
        }
      }
    );

    gsap.fromTo(".manifesto-title",
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".manifesto-title", start: "top 80%", once: true }
      }
    );
  };

  /* ── Product cards entrance ── */
  const initCollectionCards = () => {
    ScrollTrigger.batch(".product-card", {
      start: "top 88%",
      once: true,
      onEnter: els => {
        gsap.fromTo(els,
          { opacity: 0, y: 32, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.65, ease: "power3.out" }
        );
      }
    });
  };

  /* ── Nav entrance ── */
  const navEntrance = () => {
    gsap.fromTo(".nav",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  };

  /* ── Floating product orbit (subtle idle animation) ── */
  const initFloatingProducts = () => {
    const fps = document.querySelectorAll(".floating-product");
    fps.forEach((fp, i) => {
      gsap.to(fp, {
        y: "+=10",
        duration: 2.5 + i * 0.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: i * 0.6
      });
    });
  };

  /* ── Section number counters (hero stats with data attributes) ── */
  const initStatCounters = () => {
    const stats = document.querySelectorAll(".hero-stat .num");
    stats.forEach((el, i) => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const raw = el.textContent.trim();
          const numMatch = raw.match(/[\d.,]+/);
          if (!numMatch) return;
          const num = parseFloat(numMatch[0].replace(",", "."));
          const suffix = raw.replace(/[\d.,]+/, "").trim();

          gsap.to(
            { val: 0 },
            {
              val: num,
              duration: 1.8,
              ease: "power2.out",
              delay: i * 0.1,
              onUpdate: function () {
                const v = this.targets()[0].val;
                el.textContent = (Number.isInteger(num) ? Math.round(v) : v.toFixed(1)).toLocaleString("fr-DZ") + (suffix ? " " + suffix : "");
              },
              onComplete: () => { el.textContent = raw; }
            }
          );
        }
      });
    });
  };

  /* ── Public init — called by App once boxDone is true ── */
  const init = () => {
    if (initialized) return;
    if (!window.gsap || !window.ScrollTrigger) {
      console.warn("LatinaAnimations: GSAP or ScrollTrigger not found");
      return;
    }

    initialized = true;
    gsap.registerPlugin(ScrollTrigger);

    // Set default opacity for reveal targets before animating
    gsap.set(".reveal, .reveal-stagger > *", { opacity: 0, y: 24 });

    navEntrance();
    heroEntrance();
    initHeroParallax();
    initReveal();
    initManifesto();
    initCollectionCards();
    initFloatingProducts();
    initStatCounters();

    // Refresh on route changes / dynamic content
    ScrollTrigger.refresh();
  };

  /* Re-run after lang/segment changes cause React re-render */
  const refresh = () => {
    if (!initialized) return;
    ScrollTrigger.refresh();
    initCollectionCards();
  };

  return { init, refresh };
})();

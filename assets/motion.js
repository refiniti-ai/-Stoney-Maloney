/**
 * Stoney Maloney – full motion stack (Savor-inspired):
 * Lenis + GSAP + ScrollTrigger, scroll-linked header theme, progress bar,
 * parallax, sticky story crossfade, immersive banner, line reveals, magnetic CTAs.
 * Vanilla JS only. Desktop ≥769px: Lenis + full FX. prefers-reduced-motion: skip heavy motion.
 */
(function () {
  'use strict';

  var lenisRef = null;

  function initRevealMasks(gsap, ScrollTrigger) {
    var masks = gsap.utils.toArray('.reveal-mask');
    masks.forEach(function (wrap) {
      var inner = wrap.querySelector('.reveal-mask__inner');
      if (!inner) return;
      gsap.set(inner, { yPercent: 108 });
      gsap.to(inner, {
        yPercent: 0,
        duration: 1.05,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: wrap,
          start: 'top 90%',
          once: true,
        },
      });
    });
  }

  function initStoryCrossfade(gsap, ScrollTrigger) {
    var section = document.querySelector('[data-story-section]');
    if (!section) return;

    var layers = gsap.utils.toArray(section.querySelectorAll('[data-story-layer]'));
    if (!layers.length) return;

    if (layers.length === 1) {
      gsap.set(layers[0], { opacity: 1 });
      return;
    }

    layers.forEach(function (layer, i) {
      gsap.set(layer, { opacity: i === 0 ? 1 : 0 });
    });

    var n = layers.length;

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.55,
      onUpdate: function (self) {
        var p = self.progress;
        var pos = p * (n - 1);
        var floor = Math.min(Math.floor(pos), n - 2);
        var frac = pos - floor;
        layers.forEach(function (layer, i) {
          var op = 0;
          if (i === floor) op = 1 - frac;
          else if (i === floor + 1) op = frac;
          gsap.set(layer, { opacity: op });
        });
      },
    });
  }

  function initParallaxInHero(gsap, ScrollTrigger, hero) {
    if (!hero) return;
    gsap.utils.toArray(hero.querySelectorAll('[data-parallax-speed]')).forEach(function (el) {
      var speed = parseFloat(el.getAttribute('data-parallax-speed'));
      if (isNaN(speed)) speed = 0;
      gsap.to(el, {
        y: speed * 90,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.45,
        },
      });
    });
  }

  function initGlobalParallax(gsap, ScrollTrigger) {
    gsap.utils.toArray('[data-parallax-speed]').forEach(function (el) {
      if (el.closest('.hero--stoney')) return;
      var speed = parseFloat(el.getAttribute('data-parallax-speed'));
      if (isNaN(speed)) return;
      var trigger = el.closest('section') || el.parentElement;
      if (!trigger) return;
      gsap.to(el, {
        y: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      });
    });
  }

  function initImmersiveBanner(gsap, ScrollTrigger) {
    var root = document.querySelector('[data-immersive-banner]');
    if (!root) return;
    var img = root.querySelector('.immersive-banner__bg img');
    if (img) {
      gsap.fromTo(
        img,
        { scale: 1.14 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      );
    }
  }

  function initMagneticButtons(gsap) {
    var btns = gsap.utils.toArray('.hero__btn, .btn-magnetic');
    btns.forEach(function (btn) {
      var setX = gsap.quickSetter(btn, 'x', 'px');
      var setY = gsap.quickSetter(btn, 'y', 'px');

      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = (e.clientX - rect.left - rect.width / 2) * 0.07;
        var y = (e.clientY - rect.top - rect.height / 2) * 0.07;
        setX(x);
        setY(y);
      });

      btn.addEventListener('mouseleave', function () {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'expo.out' });
      });
    });
  }

  function bindUniversalScroll(gsap) {
    var header = document.querySelector('.header--nav-aware');
    var bar = document.querySelector('.scroll-progress__fill');
    var sections = document.querySelectorAll('#MainContent [data-nav-theme]');

    function tick() {
      if (!header) return;
      if (!sections.length) {
        header.setAttribute('data-nav-theme', 'dark');
      } else {
        var probe = 44;
        var theme = 'dark';
        for (var i = 0; i < sections.length; i++) {
          var r = sections[i].getBoundingClientRect();
          if (r.top <= probe && r.bottom >= probe) {
            theme = sections[i].getAttribute('data-nav-theme') || 'dark';
            break;
          }
        }
        header.setAttribute('data-nav-theme', theme);
      }

      if (bar) {
        var scrollTop = lenisRef ? lenisRef.scroll : window.scrollY || document.documentElement.scrollTop;
        var limit = lenisRef
          ? lenisRef.limit
          : Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        var p = limit > 0 ? scrollTop / limit : 0;
        gsap.set(bar, {
          scaleY: Math.min(1, Math.max(0, p)),
          transformOrigin: 'top center',
        });
      }
    }

    if (lenisRef) {
      lenisRef.on('scroll', tick);
    } else {
      window.addEventListener('scroll', tick, { passive: true });
    }
    window.addEventListener('resize', tick);
    tick();
  }

  function initMotion() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    var prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      document.querySelectorAll('.reveal-mask').forEach(function (w) {
        w.style.overflow = 'visible';
      });
      document.querySelectorAll('.reveal-mask__inner').forEach(function (el) {
        el.style.transform = 'none';
      });
      return;
    }

    var mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', function () {
      var lenis = null;
      var lenisRaf = null;
      var ctx = null;

      ctx = gsap.context(function () {
        if (typeof Lenis !== 'undefined') {
          lenis = new Lenis({
            duration: 1.15,
            lerp: 0.09,
            easing: function (t) {
              return Math.min(1, 1.001 - Math.pow(2, -10 * t));
            },
          });

          lenisRef = lenis;

          lenis.on('scroll', ScrollTrigger.update);

          lenisRaf = function (time) {
            lenis.raf(time * 1000);
          };
          gsap.ticker.add(lenisRaf);
          gsap.ticker.lagSmoothing(0);
          document.body.classList.add('has-smooth-scroll');
        }

        bindUniversalScroll(gsap);

        var revealEls = gsap.utils.toArray(
          '#MainContent h1, #MainContent h2:not(.reveal-mask), #MainContent .card'
        );

        if (revealEls.length) {
          gsap.set(revealEls, { opacity: 0, y: 44 });

          ScrollTrigger.batch(revealEls, {
            interval: 0.08,
            batchMax: 18,
            start: 'top 88%',
            onEnter: function (batch) {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.08,
                ease: 'expo.out',
                overwrite: true,
              });
            },
            once: true,
          });
        }

        initRevealMasks(gsap, ScrollTrigger);
        initStoryCrossfade(gsap, ScrollTrigger);
        initImmersiveBanner(gsap, ScrollTrigger);
        initGlobalParallax(gsap, ScrollTrigger);

        var hero = document.querySelector('.hero--stoney');
        initParallaxInHero(gsap, ScrollTrigger, hero);

        var zoomInner = document.querySelector('.hero__zoom-inner');

        if (hero && zoomInner) {
          gsap.set(zoomInner, { scale: 1, borderRadius: '40px' });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: '+=120%',
                scrub: true,
                pin: true,
                anticipatePin: 1,
              },
            })
            .to(zoomInner, {
              scale: 1.1,
              borderRadius: '0px',
              ease: 'none',
            });
        }

        initMagneticButtons(gsap);

        window.addEventListener(
          'load',
          function () {
            ScrollTrigger.refresh();
          },
          { once: true }
        );
      }, document.body);

      return function () {
        lenisRef = null;
        document.body.classList.remove('has-smooth-scroll');
        if (ctx) ctx.revert();
        if (lenis && lenisRaf) {
          gsap.ticker.remove(lenisRaf);
          if (typeof lenis.destroy === 'function') lenis.destroy();
        }
      };
    });

    mm.add('(max-width: 768px)', function () {
      lenisRef = null;
      var ctx = gsap.context(function () {
        bindUniversalScroll(gsap);

        var revealEls = gsap.utils.toArray(
          '#MainContent h1, #MainContent h2:not(.reveal-mask), #MainContent .card'
        );
        if (revealEls.length) {
          gsap.set(revealEls, { opacity: 0, y: 36 });
          ScrollTrigger.batch(revealEls, {
            interval: 0.08,
            batchMax: 18,
            start: 'top 90%',
            onEnter: function (batch) {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.75,
                stagger: 0.06,
                ease: 'expo.out',
                overwrite: true,
              });
            },
            once: true,
          });
        }

        var masks = gsap.utils.toArray('.reveal-mask .reveal-mask__inner');
        masks.forEach(function (inner) {
          gsap.set(inner, { yPercent: 108 });
          gsap.to(inner, {
            yPercent: 0,
            duration: 0.85,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: inner.closest('.reveal-mask'),
              start: 'top 92%',
              once: true,
            },
          });
        });
      }, document.body);
      return function () {
        if (ctx) ctx.revert();
      };
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMotion);
  } else {
    initMotion();
  }
})();

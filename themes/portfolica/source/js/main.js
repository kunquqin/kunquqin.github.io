/**
 * Portfolica — Lenis + GSAP ScrollTrigger（含 scrollerProxy 以修复滚动动画）
 */

(function () {
    'use strict';

    var prefersReduced =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.addEventListener('DOMContentLoaded', function () {
        initNav();

        var motionOk =
            !prefersReduced &&
            typeof gsap !== 'undefined' &&
            typeof ScrollTrigger !== 'undefined' &&
            typeof Lenis !== 'undefined';

        var lenis = null;
        if (motionOk) {
            lenis = initLenisGsap();
            window.lenisInstance = lenis;
            document.documentElement.classList.add('has-motion');
        }

        initSmoothScroll(lenis);
        initFaq();
        initContactForm();
        initPortfolioEnhancements();

        if (motionOk) {
            initScrollAnimations();
            initMarqueePause();
            requestAnimationFrame(function () {
                ScrollTrigger.refresh();
            });
            window.addEventListener('load', function () {
                ScrollTrigger.refresh();
            });
            var resizeTimer;
            window.addEventListener('resize', function () {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                    ScrollTrigger.refresh();
                }, 200);
            });
        } else {
            initRevealFallback();
        }
    });

    function getNavOffset() {
        var nav = document.querySelector('.site-header');
        return nav ? nav.offsetHeight + 12 : 84;
    }

    function initLenisGsap() {
        gsap.registerPlugin(ScrollTrigger);

        var lenis = new Lenis({
            duration: 1.12,
            easing: function (t) {
                return 1 - Math.pow(1 - t, 3);
            },
            smoothWheel: true,
            smoothTouch: false,
            touchMultiplier: 1.1
        });

        document.documentElement.classList.add('lenis');

        ScrollTrigger.scrollerProxy(document.documentElement, {
            scrollTop: function (value) {
                if (arguments.length) {
                    lenis.scrollTo(value, { immediate: true });
                }
                var s = lenis.scroll;
                return typeof s === 'number' && !isNaN(s) ? s : window.pageYOffset || 0;
            },
            getBoundingClientRect: function () {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            }
        });

        ScrollTrigger.defaults({
            scroller: document.documentElement
        });

        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add(function (time) {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        return lenis;
    }

    function initSmoothScroll(lenis) {
        document.body.addEventListener('click', function (e) {
            var a = e.target.closest && e.target.closest('a[href*="#"]');
            if (!a) return;

            var href = a.getAttribute('href');
            if (!href || href === '#') return;

            var hashIdx = href.indexOf('#');
            if (hashIdx === -1) return;

            var path = hashIdx === 0 ? '' : href.slice(0, hashIdx);
            var id = href.slice(hashIdx + 1);
            if (!id || !/^[A-Za-z0-9_-]+$/.test(id)) return;

            var cur = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
            var linkPath = path
                ? path.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/'
                : cur;

            if (path && linkPath !== cur) return;

            var el = document.getElementById(id);
            if (!el) return;

            e.preventDefault();

            if (lenis) {
                lenis.scrollTo(el, {
                    offset: -getNavOffset(),
                    duration: 1.05
                });
            } else {
                var top = el.getBoundingClientRect().top + window.pageYOffset - getNavOffset();
                window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
            }
        });
    }

    function initScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.reveal').forEach(function (el) {
            gsap.fromTo(
                el,
                { opacity: 0, y: 36 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 91%',
                        toggleActions: 'play none none none',
                        once: true
                    },
                    onComplete: function () {
                        el.classList.add('revealed');
                    }
                }
            );
        });

        gsap.utils.toArray('.project-card').forEach(function (card, i) {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    scroller: document.documentElement,
                    start: 'top 93%',
                    toggleActions: 'play none none none'
                },
                y: 40,
                opacity: 0,
                duration: 0.55,
                delay: i * 0.04,
                ease: 'power2.out'
            });
        });

        gsap.utils.toArray('.stat-card').forEach(function (card, i) {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: '.stats',
                    scroller: document.documentElement,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 40,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.07,
                ease: 'power2.out'
            });
        });

        gsap.utils.toArray('.process-step').forEach(function (step, i) {
            gsap.from(step, {
                scrollTrigger: {
                    trigger: step,
                    scroller: document.documentElement,
                    start: 'top 93%',
                    toggleActions: 'play none none none'
                },
                x: i % 2 === 0 ? -20 : 20,
                opacity: 0,
                duration: 0.55,
                ease: 'power2.out'
            });
        });
    }

    function initMarqueePause() {
        var root = document.querySelector('[data-hero-marquee]');
        if (!root) return;
        var track = root.querySelector('.hero-marquee-track');
        if (!track) return;
        root.addEventListener('mouseenter', function () {
            track.classList.add('is-paused');
        });
        root.addEventListener('mouseleave', function () {
            track.classList.remove('is-paused');
        });
    }

    function initRevealFallback() {
        if (prefersReduced) {
            document.querySelectorAll('.reveal').forEach(function (el) {
                el.classList.add('revealed');
            });
            return;
        }
        var nodes = document.querySelectorAll('.reveal');
        if (!nodes.length || !('IntersectionObserver' in window)) {
            nodes.forEach(function (el) {
                el.classList.add('revealed');
            });
            return;
        }
        var io = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        io.unobserve(entry.target);
                    }
                });
            },
            { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.05 }
        );
        nodes.forEach(function (el) {
            io.observe(el);
        });
    }

    function initNav() {
        var toggle = document.getElementById('nav-toggle');
        var menu = document.getElementById('nav-menu');
        if (!toggle || !menu) return;

        function setOpen(open) {
            document.body.classList.toggle('nav-open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        }

        toggle.addEventListener('click', function () {
            setOpen(!document.body.classList.contains('nav-open'));
        });

        menu.querySelectorAll('a[href]').forEach(function (link) {
            link.addEventListener('click', function () {
                setOpen(false);
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') setOpen(false);
        });
    }

    function initFaq() {
        document.querySelectorAll('.faq-item').forEach(function (item) {
            var btn = item.querySelector('.faq-question');
            var icon = item.querySelector('.faq-toggle');
            if (!btn || !icon) return;

            btn.addEventListener('click', function () {
                var wasActive = item.classList.contains('active');
                document.querySelectorAll('.faq-item').forEach(function (other) {
                    other.classList.remove('active');
                    var b = other.querySelector('.faq-question');
                    var ic = other.querySelector('.faq-toggle');
                    if (b) b.setAttribute('aria-expanded', 'false');
                    if (ic) ic.textContent = '+';
                });
                if (!wasActive) {
                    item.classList.add('active');
                    btn.setAttribute('aria-expanded', 'true');
                    icon.textContent = '−';
                }
            });
        });
    }

    function initContactForm() {
        var form = document.getElementById('contact-form');
        if (!form) return;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var data = new FormData(form);
            var name = (data.get('name') || '').toString().trim();
            var email = (data.get('email') || '').toString().trim();
            var message = (data.get('message') || '').toString().trim();
            if (!name || !email || !message) {
                window.alert('Please fill in all fields.');
                return;
            }
            window.alert('Thank you! Your message has been recorded (demo — connect a backend or form service).');
            form.reset();
        });
    }

    function initPortfolioEnhancements() {
        var progress = document.querySelector('.site-progress i');
        var ticking = false;
        function updateProgress() {
            var max = document.documentElement.scrollHeight - window.innerHeight;
            var value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
            if (progress) progress.style.transform = 'scaleX(' + value + ')';
            ticking = false;
        }
        window.addEventListener('scroll', function () {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updateProgress);
            }
        }, { passive: true });
        updateProgress();

        var revealNodes = document.querySelectorAll('.portfolio-section, .results-band, .case-intro, .case-stats, .case-gallery figure, .mimo-case > section');
        if (!prefersReduced && 'IntersectionObserver' in window) {
            var editorialObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('editorial-visible');
                        editorialObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.06, rootMargin: '0px 0px -5% 0px' });
            revealNodes.forEach(function (node) {
                node.classList.add('editorial-reveal');
                editorialObserver.observe(node);
            });
        }

        document.querySelectorAll('.featured-card').forEach(function (card) {
            card.addEventListener('pointermove', function (event) {
                var rect = card.getBoundingClientRect();
                card.style.setProperty('--mx', (event.clientX - rect.left) + 'px');
                card.style.setProperty('--my', (event.clientY - rect.top) + 'px');
            });
        });
        document.querySelectorAll('.role-workstreams article').forEach(function (card) {
            card.addEventListener('pointermove', function (event) {
                var rect = card.getBoundingClientRect();
                card.style.setProperty('--mx', (event.clientX - rect.left) + 'px');
                card.style.setProperty('--my', (event.clientY - rect.top) + 'px');
            });
        });
        document.querySelectorAll('.ai-system-card').forEach(function (card) {
            card.addEventListener('pointermove', function (event) {
                var rect = card.getBoundingClientRect();
                card.style.setProperty('--mx', (event.clientX - rect.left) + 'px');
                card.style.setProperty('--my', (event.clientY - rect.top) + 'px');
            });
        });

        var heroVisual = document.querySelector('.hero-visual');
        if (heroVisual && !prefersReduced && window.matchMedia('(min-width: 900px)').matches) {
            heroVisual.addEventListener('pointermove', function (event) {
                var rect = heroVisual.getBoundingClientRect();
                var x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
                var y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
                heroVisual.style.transform = 'perspective(1000px) rotateY(' + x + 'deg) rotateX(' + (-y) + 'deg)';
            });
            heroVisual.addEventListener('pointerleave', function () {
                heroVisual.style.transform = '';
            });
        }

        var roleSwitcher = document.querySelector('.role-switcher:not(.hmi-role-switcher)');
        if (roleSwitcher && !roleSwitcher.querySelector('[href="/hmi/"]')) {
            var hmiLink = document.createElement('a');
            hmiLink.href = '/hmi/';
            hmiLink.textContent = '智能座舱';
            roleSwitcher.appendChild(hmiLink);
        }
    }
})();

// Scroll Reveal
const observer = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }),
    { threshold: 0.08 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Parallax — only after hero animations finish (1.3s)
let parallaxReady = false;
setTimeout(() => { parallaxReady = true; }, 1300);

window.addEventListener('scroll', () => {
    if (!parallaxReady) return;
    const y = window.scrollY;
    const h1 = document.querySelector('.hero h1');
    const p  = document.querySelector('.hero p');
    if (h1) h1.style.transform = `translateY(${y * 0.22}px)`;
    if (p)  p.style.transform  = `translateY(${y * 0.13}px)`;
}, { passive: true });

// Floating emojis
const emojis = ['💖', '🌸', '🎀', '✨', '🩺', '🎂', '🎊', '💉'];
function spawnEmoji() {
    const el = document.createElement('span');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    Object.assign(el.style, {
        position:      'fixed',
        left:          Math.random() * 100 + 'vw',
        top:           '100vh',
        fontSize:      (Math.random() * 10 + 10) + 'px',
        opacity:       (Math.random() * .5 + .3).toString(),
        zIndex:        '9999',
        pointerEvents: 'none',
        transition:    'transform 5s linear, opacity 5s linear',
        willChange:    'transform, opacity'
    });
    document.body.appendChild(el);
    requestAnimationFrame(() => {
        el.style.transform = `translateY(-115vh) rotate(${Math.random() * 360}deg)`;
        el.style.opacity   = '0';
    });
    setTimeout(() => el.remove(), 5100);
}
setInterval(spawnEmoji, 950);

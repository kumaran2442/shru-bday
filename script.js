// ── Starfield ──
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}
function initStars() {
    stars = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.3,
        alpha: Math.random(),
        speed: Math.random() * 0.008 + 0.003
    }));
}
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0) s.speed *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,133,162,${s.alpha})`;
        ctx.fill();
    });
    requestAnimationFrame(drawStars);
}
resizeCanvas(); initStars(); drawStars();
window.addEventListener('resize', () => { resizeCanvas(); initStars(); });

// ── Typewriter ──
const lines = [
    "Celebrating the strongest bond that survives time, distance, and every fight in between. 💖",
];
let li = 0, ci = 0;
const tw = document.getElementById('typewriter');
function type() {
    if (ci < lines[li].length) {
        tw.textContent += lines[li][ci++];
        setTimeout(type, 38);
    }
}
setTimeout(type, 1200);

// ── Scroll Reveal ──
const revealObs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); }),
    { threshold: 0.08 }
);
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── Staggered Grid Items ──
const gridObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const items = e.target.querySelectorAll('.stagger');
            items.forEach((item, i) => {
                setTimeout(() => item.classList.add('in-view'), i * 120);
            });
            gridObs.unobserve(e.target);
        }
    });
}, { threshold: 0.05 });
document.querySelectorAll('.grid').forEach(g => gridObs.observe(g));

// ── Parallax Hero (after animation) ──
let parallaxReady = false;
setTimeout(() => { parallaxReady = true; }, 1300);
window.addEventListener('scroll', () => {
    if (!parallaxReady) return;
    const y = window.scrollY;
    const h1 = document.querySelector('.hero h1');
    const chip = document.querySelector('.name-chip');
    if (h1) h1.style.transform = `translateY(${y * 0.2}px)`;
    if (chip) chip.style.transform = `translateY(${y * 0.12}px)`;
}, { passive: true });

// ── Floating Emojis ──
const emojis = ['💖', '🌸', '🎀', '✨', '🩺', '🎂', '🎊', '💉', '⭐'];
function spawnEmoji() {
    const el = document.createElement('span');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    Object.assign(el.style, {
        position: 'fixed',
        left: Math.random() * 100 + 'vw',
        top: '100vh',
        fontSize: (Math.random() * 10 + 10) + 'px',
        opacity: (Math.random() * .5 + .3).toString(),
        zIndex: '9999',
        pointerEvents: 'none',
        transition: 'transform 5s linear, opacity 5s linear',
        willChange: 'transform, opacity'
    });
    document.body.appendChild(el);
    requestAnimationFrame(() => {
        el.style.transform = `translateY(-115vh) rotate(${Math.random() * 360}deg)`;
        el.style.opacity = '0';
    });
    setTimeout(() => el.remove(), 5100);
}
setInterval(spawnEmoji, 950);

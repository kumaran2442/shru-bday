// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero h1');
    const heroSub = document.querySelector('.hero p');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${20 + scrolled * 0.3}px)`;
    }
    if (heroSub) {
        heroSub.style.transform = `translateY(${20 + scrolled * 0.2}px)`;
    }
});

// Video hover play (optional polish)
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('mouseenter', () => {
        // Only auto-play on hover if you want, but might be annoying
        // video.play();
    });
    video.addEventListener('mouseleave', () => {
        // video.pause();
    });
});

console.log("Friendship Initiative Protocol: Initialized.");

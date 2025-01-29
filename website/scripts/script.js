const starsContainer = document.querySelector('.stars');
const numberOfStars = 80;

for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    starsContainer.appendChild(star);
}

document.addEventListener('DOMContentLoaded', () => {
    const titleText = document.getElementById('title-text');
    titleText.style.display = 'block';

    const rocket = document.querySelector('.rocket');
    const rocketImg = rocket.querySelector('img');
    const screenWidth = window.innerWidth;
    const rocketWidth = rocketImg.clientWidth;
    const travelDistance = screenWidth + rocketWidth;
    const animationDuration = travelDistance / 1000;

    rocket.style.animationDuration = `${animationDuration}s`;
    titleText.style.animationDuration = `${animationDuration}s`;

    rocket.addEventListener('animationend', () => {
        rocket.style.display = 'none';
    });

    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            section.classList.add('fly-in-left');
        } else {
            section.classList.add('fly-in-right');
        }
        observer.observe(section);
    });
});
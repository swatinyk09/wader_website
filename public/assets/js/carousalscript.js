// nav responsive
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-menu');
    const navlinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navlinks.classList.toggle('active');
    });
});

document.querySelectorAll('.navlinks a').forEach(link => {
    link.addEventListener('click', () => {
        navlinks.classList.remove('active');
    });
});

// scroll to top
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) { // Show button after scrolling down 200px
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll to the top
        });
    });
});

// Carousel functionality
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const captions = document.querySelectorAll('.caption')
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    if (index >= slides.length) slideIndex = 0;
    if (index < 0) slideIndex = slides.length - 1;

    slides.forEach((slide, i) => {
        slide.style.display = i === slideIndex ? 'block' : 'none';
    });
    captions.forEach((caption, i) => {
        caption.style.display = i === slideIndex ? 'block' : 'none';
    });
    dots.forEach((dot, i) => {
        dot.style.backgroundColor = i === slideIndex ? '#4BC8CC' : '#e4e4e4';
    });
}

function moveSlide(step) {
    showSlide(slideIndex += step);
}
function currentSlide(index) {
    showSlide(slideIndex = index);
}

function autoSlide() {
    moveSlide(1);
    setTimeout(autoSlide, 3000); // Change slide every 3 seconds
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(slideIndex);
    autoSlide();
});
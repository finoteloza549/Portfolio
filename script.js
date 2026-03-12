// --- Toggle Icon Navbar ---
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// --- Sticky Navbar & Highlight Active Link ---
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // Sticky Navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar when click navbar link (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// --- Dark / Light Mode Toggle ---
const themeToggle = document.getElementById('theme-toggle');
const htmlTag = document.documentElement;

// Check for saved theme in localStorage
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark';
htmlTag.setAttribute('data-theme', currentTheme);

if (currentTheme === 'light') {
    themeToggle.classList.replace('bx-moon', 'bx-sun');
} else {
    themeToggle.classList.replace('bx-sun', 'bx-moon');
}

themeToggle.addEventListener('click', () => {
    let currentMode = htmlTag.getAttribute('data-theme');
    
    if (currentMode === 'dark') {
        htmlTag.setAttribute('data-theme', 'light');
        themeToggle.classList.replace('bx-moon', 'bx-sun');
        localStorage.setItem('theme', 'light');
    } else {
        htmlTag.setAttribute('data-theme', 'dark');
        themeToggle.classList.replace('bx-sun', 'bx-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// --- Scroll Fade-in Animation Observer ---
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px" // Trigger slightly before the element enters the viewport
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('show');
        
             
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

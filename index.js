// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const body = document.querySelector('body');
const mobileMenu = document.querySelector('.mobile-menu');
const navList = document.querySelector('nav ul');
const cards = document.querySelectorAll('.card');
const heroContent = document.querySelector('.hero-content');

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  
  // Update the icon
  if (body.classList.contains('dark-theme')) {
    themeToggle.textContent = '☀️'; 
  } else {
    themeToggle.textContent = '🌙';
  }
  
  // Save preference to local storage
  const isDarkMode = body.classList.contains('dark-theme');
  localStorage.setItem('darkMode', isDarkMode);
});

// Check for saved theme preference
const savedDarkMode = localStorage.getItem('darkMode') === 'true';
if (savedDarkMode) {
  body.classList.add('dark-theme');
  themeToggle.textContent = '☀️';
}

// Mobile menu toggle
mobileMenu.addEventListener('click', () => {
  navList.classList.toggle('nav-active');
});

// 3D parallax effect for hero content
document.addEventListener('mousemove', (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  
  heroContent.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// Reset transform when mouse leaves
document.addEventListener('mouseleave', () => {
  heroContent.style.transform = 'rotateY(0deg) rotateX(0deg)';
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    
    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    navList.classList.remove('nav-active');
  });
});

// Reveal animations on scroll
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0) translateZ(0)';
    }
  });
}, observerOptions);

// Observe all cards for scroll animations
cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(50px) translateZ(0)';
  card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(card);
});

// Enhance 3D effect with tilt for cards
cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const angleX = (y - centerY) / 20;
    const angleY = (centerX - x) / 20;
    
    card.style.transform = `translateZ(30px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
  });
});
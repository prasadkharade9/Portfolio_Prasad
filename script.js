// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Active navigation link based on scroll position
    function setActiveLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Scroll reveal animation
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });

        // Animate skill bars when in viewport
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            const windowHeight = window.innerHeight;
            const cardTop = card.getBoundingClientRect().top;
            const cardPoint = 150;
            
            if (cardTop < windowHeight - cardPoint) {
                const progressBar = card.querySelector('.skill-progress');
                if (progressBar && !progressBar.style.width) {
                    const percent = progressBar.getAttribute('data-percent');
                    progressBar.style.width = percent;
                }
            }
        });
    }

    // Initialize skill progress bars
    function initSkillBars() {
        const progressBars = document.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
            bar.style.width = '0';
        });
    }

    // Add reveal classes to elements
    function addRevealClasses() {
        // Add reveal classes to skill cards
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach((card, index) => {
            if (index % 2 === 0) {
                card.classList.add('reveal', 'fade-left');
            } else {
                card.classList.add('reveal', 'fade-right');
            }
        });

        // Add reveal classes to project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.classList.add('reveal', 'fade-bottom');
        });

        // Add reveal classes to about section
        document.querySelector('.about-content').classList.add('reveal', 'fade-bottom');

        // Add reveal classes to contact section
        document.querySelector('.contact-container').classList.add('reveal', 'fade-bottom');
    }

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                formStatus.textContent = 'Please fill in all fields';
                formStatus.className = 'form-status error';
                return;
            }
            
            // Simulate form submission
            formStatus.textContent = 'Sending...';
            formStatus.className = 'form-status';
            formStatus.style.display = 'block';
            
            // Simulate API call with timeout
            setTimeout(() => {
                formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                formStatus.className = 'form-status success';
                contactForm.reset();
            }, 1500);
        });
    }

    // Initialize
    initSkillBars();
    addRevealClasses();
    
    // Event listeners
    window.addEventListener('scroll', setActiveLink);
    window.addEventListener('scroll', revealOnScroll);
    
    // Initial calls
    setActiveLink();
    revealOnScroll();
});
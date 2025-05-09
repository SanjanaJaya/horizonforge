// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navbarMenu = document.querySelector('.navbar ul');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.navbar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navbarMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll down button in hero section
    const scrollDownBtn = document.querySelector('.hero-scroll');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            const nextSection = document.querySelector('.featured-game');
            if (nextSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = nextSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Video trailer play button
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            // Replace with your video popup functionality
            // This is a placeholder implementation
            const gameTrailer = document.querySelector('.game-trailer');
            const videoIframe = document.createElement('iframe');
            
            videoIframe.setAttribute('width', '100%');
            videoIframe.setAttribute('height', '100%');
            videoIframe.setAttribute('frameborder', '0');
            videoIframe.setAttribute('allowfullscreen', 'true');
            videoIframe.setAttribute('src', 'https://www.youtube.com/embed/PLACEHOLDER?autoplay=1');
            
            // Clear existing content and append iframe
            gameTrailer.innerHTML = '';
            gameTrailer.appendChild(videoIframe);
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (validateEmail(email)) {
                // Show success message
                const successMessage = document.createElement('p');
                successMessage.textContent = 'Thank you for subscribing!';
                successMessage.style.color = '#fff';
                successMessage.style.marginTop = '15px';
                
                // Clear form and append message
                this.innerHTML = '';
                this.appendChild(successMessage);
                
                // Here you would also send the email to your backend/API
                console.log('Subscription email:', email);
            } else {
                // Show error if invalid email
                alert('Please enter a valid email address.');
            }
        });
    }

    // Validate email format
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-header, .featured-game-info, .featured-game-media, .game-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };

    // Add animated class for CSS animations
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check on page load

    // Game card hover effects for touch devices
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.querySelector('.game-card-inner').style.transform = 'rotateY(180deg)';
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.querySelector('.game-card-inner').style.transform = 'rotateY(0deg)';
            }, 2000); // Reset after 2 seconds
        });
    });

    // Detect when new content is loaded via AJAX (for SPA-like behavior)
    function initDynamicContent() {
        // This function would be called after loading new content via AJAX
        // Re-initialize event listeners for newly loaded content
        console.log('Dynamic content initialized');
    }

    // Example of how to handle a notification button
    const notifyButtons = document.querySelectorAll('.btn-small');
    notifyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Change button text and disable
            this.textContent = 'Notification Set';
            this.disabled = true;
            this.style.backgroundColor = '#457b9d';
            
            // You would also send this data to your backend
            const gameName = this.closest('.game-card-back').querySelector('h4').textContent;
            console.log('Notification set for:', gameName);
        });
    });

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroCharacters = document.querySelectorAll('.character');
        
        heroCharacters.forEach((character, index) => {
            const speed = (index + 1) * 0.1;
            character.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});
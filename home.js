// ============================================
// LUXURY PORTFOLIO WEBSITE - INTERACTIVE JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initParticles();
    initTypingEffect();
    initSmoothScroll();
    initScrollReveal();
    initPortfolioSlider();
    initLightbox();
    initContactForm();
    initNavActive();
    initMobileMenu();
    initParallax();
    initCursor();
    initCVModal();
});

// ============================================
// Particles Background
// ============================================
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 80;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, i) => {
            particle.update();
            particle.draw();
            
            // Connect nearby particles
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============================================
// Typing Effect
// ============================================
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const texts = [
        'Full-Stack Developer',
        'UI/UX Designer',
        'Problem Solver',
        'Creative Thinker',
        'Code Artist'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
            e.preventDefault();
                const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.glass-header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                        top: targetPosition,
                behavior: 'smooth'
            });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.querySelector('.main-nav');
                    if (mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        document.querySelector('.mobile-menu-toggle').classList.remove('active');
                    }
                }
            }
        });
    });
}

// ============================================
// Scroll Reveal Animation
// ============================================
function initScrollReveal() {
    const reveals = document.querySelectorAll('.section-header, .about-content, .portfolio-card, .contact-content, .info-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    reveals.forEach(element => {
        element.classList.add('reveal');
        revealObserver.observe(element);
    });
}

// ============================================
// Portfolio Slider
// ============================================
function initPortfolioSlider() {
    const sliders = document.querySelectorAll('.project-slider');
    
    sliders.forEach(slider => {
        const wrapper = slider.querySelector('.slider-wrapper');
        const slides = slider.querySelectorAll('.slide');
        const dots = slider.querySelectorAll('.dot');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        function showSlide(index) {
            if (index < 0) {
                currentSlide = totalSlides - 1;
            } else if (index >= totalSlides) {
                currentSlide = 0;
            } else {
                currentSlide = index;
            }
            
            wrapper.style.transform = `translateX(-${currentSlide * 33.333}%)`;
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
            
            // Update slides
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentSlide);
            });
        }
        
        // Button events
        if (prevBtn) {
            prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        }
        
        // Dot events
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => showSlide(i));
        });
        
        // Auto-play
        let autoPlayInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
        
        // Pause on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        });
        
        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                showSlide(currentSlide + 1);
            }
            if (touchEndX > touchStartX + 50) {
                showSlide(currentSlide - 1);
            }
        }
    });
}

// ============================================
// Lightbox
// ============================================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    const projectImages = [];
    let currentImageIndex = 0;
    
    // Collect all project images
    document.querySelectorAll('.portfolio-card img').forEach(img => {
        projectImages.push({
            src: img.src,
            alt: img.alt
        });
    });

    function openLightbox(index) {
        if (projectImages.length === 0) return;
        
        currentImageIndex = index;
        lightboxImg.src = projectImages[currentImageIndex].src;
        lightboxImg.alt = projectImages[currentImageIndex].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function showNext() {
        currentImageIndex = (currentImageIndex + 1) % projectImages.length;
        lightboxImg.src = projectImages[currentImageIndex].src;
        lightboxImg.alt = projectImages[currentImageIndex].alt;
    }
    
    function showPrev() {
        currentImageIndex = (currentImageIndex - 1 + projectImages.length) % projectImages.length;
        lightboxImg.src = projectImages[currentImageIndex].src;
        lightboxImg.alt = projectImages[currentImageIndex].alt;
    }
    
    // Open lightbox on image click
    document.querySelectorAll('.portfolio-card img').forEach((img, index) => {
        img.addEventListener('click', () => {
            const allImages = Array.from(document.querySelectorAll('.portfolio-card img'));
            const globalIndex = allImages.indexOf(img);
            openLightbox(globalIndex);
        });
    });

    // Close lightbox
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navigation
    if (nextBtn) nextBtn.addEventListener('click', showNext);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNext();
        } else if (e.key === 'ArrowLeft') {
            showPrev();
        }
    });
}

// ============================================
// Contact Form
// ============================================
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span><i class="bx bx-loader-alt bx-spin"></i>';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            submitBtn.innerHTML = '<span>Message Sent!</span><i class="bx bx-check"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
            
            // Reset form
            form.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
    });
}

// ============================================
// Navigation Active State
// ============================================
function initNavActive() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
    
    // Header scroll effect
    const header = document.querySelector('.glass-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.05)';
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.main-nav');
    
    if (!toggle || !nav) return;
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
            toggle.classList.remove('active');
            nav.classList.remove('active');
        }
    });
}

// ============================================
// Parallax Effect
// ============================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-image, .about-image-wrapper, .portfolio-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index % 3) * 0.05;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ============================================
// Custom Cursor (Optional - for desktop)
// ============================================
function initCursor() {
    if (window.innerWidth < 768) return; // Skip on mobile
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-card, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// ============================================
// Add CSS for custom cursor
// ============================================
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(246, 211, 101, 0.8);
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
        transition: transform 0.2s;
    }
    
    .cursor-follower {
        width: 30px;
        height: 30px;
        border: 2px solid rgba(246, 211, 101, 0.3);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: transform 0.3s;
    }
    
    @media (max-width: 768px) {
        .custom-cursor,
        .cursor-follower {
            display: none;
        }
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(8px, 8px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .main-nav {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            background: rgba(0, 0, 0, 0.95);
            backdrop-filter: blur(20px);
            padding: 2rem;
            transition: left 0.3s;
        }
        
        .main-nav.active {
            left: 0;
        }
        
        .main-nav ul {
            flex-direction: column;
            gap: 1rem;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// CV Modal
// ============================================
function initCVModal() {
    const cvModal = document.getElementById('cv-modal');
    const openCVBtn = document.getElementById('open-cv-btn');
    const closeCVBtn = document.getElementById('close-cv-btn');
    const cvOverlay = cvModal.querySelector('.cv-modal-overlay');
    const cvIframe = cvModal.querySelector('.cv-iframe');
    const cvLoading = cvModal.querySelector('.cv-loading');
    
    if (!cvModal || !openCVBtn) return;
    
    function openCVModal() {
        cvModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Hide loading after iframe loads
        if (cvIframe) {
            cvIframe.addEventListener('load', () => {
                setTimeout(() => {
                    if (cvLoading) {
                        cvLoading.classList.add('hidden');
                    }
                }, 500);
            });
        }
    }
    
    function closeCVModal() {
        cvModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset loading state
        if (cvLoading) {
            cvLoading.classList.remove('hidden');
        }
    }
    
    // Open modal
    openCVBtn.addEventListener('click', openCVModal);
    
    // Close modal
    if (closeCVBtn) {
        closeCVBtn.addEventListener('click', closeCVModal);
    }
    
    if (cvOverlay) {
        cvOverlay.addEventListener('click', closeCVModal);
    }
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cvModal.classList.contains('active')) {
            closeCVModal();
        }
    });
    
    // Prevent iframe click from closing modal
    const cvContainer = cvModal.querySelector('.cv-modal-container');
    if (cvContainer) {
        cvContainer.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// ============================================
// Performance Optimization
// ============================================
// Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(() => {
    // Scroll-dependent functions are already optimized
}, 16));


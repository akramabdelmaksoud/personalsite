document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Function to open the lightbox
    function openLightbox(imageSrc, altText) {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `
            <img src="${imageSrc}" alt="${altText}">
            <span class="close-btn">&times;</span>
        `;
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden'; // Prevent scrolling while lightbox is open

        const closeBtn = lightbox.querySelector('.close-btn');
        closeBtn.addEventListener('click', closeLightbox);
    }

    function closeLightbox() {
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) {
            lightbox.remove();
            document.body.style.overflow = 'auto'; // Restore scrolling when lightbox is closed
        }
    }

    // Dynamically add event listeners for each image in the slider
    const sliders = document.querySelectorAll('.slider .slide img');

    sliders.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    });

    // JavaScript for minimizing header on scroll
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    let isHeaderMinimized = false;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && !isHeaderMinimized) {
            // Scrolling down and header is not minimized
            header.classList.add('minimized');
            isHeaderMinimized = true; // Set flag to true
        } else if (currentScrollY < lastScrollY && isHeaderMinimized) {
            // Scrolling up and header is minimized
            header.classList.remove('minimized');
            isHeaderMinimized = false; // Set flag to false
        }

        lastScrollY = currentScrollY;
    });

    // Form submission handling
    const jobForm = document.getElementById('job-form');
    if (jobForm) {
        jobForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    alert('Thank you! Your submission has been received. We will get back to you soon.');
                    window.location.href = 'index.html'; // Redirect to success page or homepage
                } else {
                    alert('Something went wrong. Please try again.'); // Handle other HTTP errors
                }
            }).catch(error => {
                alert('Something went wrong. Please try again.'); // Handle network errors
            });
        });
    }
});


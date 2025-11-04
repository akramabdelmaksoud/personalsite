document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
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

    // Automated Slider
    let counter = 1;
    const autoSlide = () => {
        document.getElementById(`slide1-${counter}`).checked = true;
        counter++;
        if (counter > 3) {
            counter = 1;
        }
    }
    setInterval(autoSlide, 1000); // Change slides every 5 seconds
});

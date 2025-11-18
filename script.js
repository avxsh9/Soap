document.addEventListener('DOMContentLoaded', function() {
    // --- Data for Soaps ---
    const soaps = [
        {
            name: "Lemon Zest",
            tagline: "Organic Natural Soap — 100% Handmade",
            description: "Lemon Soap is rich in Vitamin C and antioxidants that refresh and brighten your skin. The tangy aroma of lemon uplifts your mood and leaves your skin feeling fresh, clean, and energized all day.",
            ingredients: [
                "Purified Water", "Lemon Extract", "Glycerin", "Coconut Oil",
                "Castor Oil", "Natural Essential Oils", "Soap Base"
            ],
            image: "Untitled_design__13_-removebg-preview.png"
        },
        {
            name: "Pink Rose",
            tagline: "Luxurious Floral Soap — Handcrafted Elegance",
            description: "Experience the gentle embrace of Pink Rose Soap, crafted with natural rose extracts to soothe and hydrate your skin. Its delicate fragrance promotes relaxation and leaves your skin feeling soft, supple, and beautifully radiant.",
            ingredients: [
                "Purified Water", "Rose Extract", "Glycerin", "Coconut Oil",
                "Castor Oil", "Natural Essential Oils", "Soap Base"
            ],
            image: "Untitled_design__13_-removebg-preview.png"
        },
        {
            name: "Neem Purify",
            tagline: "Detoxifying Herbal Soap — Nature's Cleanser",
            description: "Neem Purify Soap offers powerful antibacterial and antifungal properties, making it ideal for deep cleansing and purifying the skin. Infused with natural neem oil, it helps combat acne and skin impurities, leaving your skin clear and healthy.",
            ingredients: [
                "Purified Water", "Neem Extract", "Glycerin", "Coconut Oil",
                "Castor Oil", "Natural Essential Oils", "Soap Base"
            ],
            image: "Untitled_design__13_-removebg-preview.png"
        },
        {
            name: "Aloe Vera Calm",
            tagline: "Soothing Hydration Soap — Gentle & Restorative",
            description: "Aloe Vera Calm Soap is a gentle, moisturizing bar rich in vitamins and antioxidants, perfect for soothing irritated and sensitive skin. It calms inflammation, provides deep hydration, and leaves your skin feeling refreshed and balanced.",
            ingredients: [
                "Purified Water", "Aloe Vera Extract", "Glycerin", "Coconut Oil",
                "Castor Oil", "Natural Essential Oils", "Soap Base"
            ],
            image: "Untitled_design__13_-removebg-preview.png"
        }
    ];

    let currentSoapIndex = 0;

    // --- DOM Elements ---
    const header = document.querySelector('.header');
    const yearEl = document.getElementById('year');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuBtn = document.querySelector('.menu-btn');
    const heroProductImage = document.querySelector('.hero-section .current-product-image');

    const productNameEl = document.querySelector('.current-product-name');
    const productTaglineEl = document.querySelector('.current-product-tagline');
    const productDescriptionEl = document.querySelector('.current-product-description');
    const productIngredientsEl = document.querySelector('.current-product-ingredients');
    const carouselProductImage = document.querySelector('.product-carousel .current-product-image'); // This is not used, the hero image is updated.
    const carouselContent = document.querySelector('.carousel-content');
    const labelGrid = document.querySelector('.label-grid');

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carouselDotsContainer = document.querySelector('.carousel-dots');
    const frCards = document.querySelectorAll('.fr-card');

    // --- Initial Setup ---
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    updateHeroProductImage(); // Set initial hero image

    // --- Functions ---

    // Update hero section product image
    function updateHeroProductImage() {
        if (heroProductImage) {
            heroProductImage.src = soaps[currentSoapIndex].image;
            heroProductImage.alt = `Tamasi ${soaps[currentSoapIndex].name} soap bar`;
        }
    }

    // Render soap details in the product showcase
    function renderSoapDetails(index) {
        const soap = soaps[index];

        // Animate out current content
        labelGrid.classList.remove('active');

        setTimeout(() => {
            productNameEl.textContent = soap.name;
            productTaglineEl.textContent = soap.tagline;
            productDescriptionEl.textContent = soap.description;

            // Update ingredients list
            productIngredientsEl.innerHTML = '';
            soap.ingredients.forEach(ingredient => {
                const li = document.createElement('li');
                li.textContent = ingredient;
                productIngredientsEl.appendChild(li);
            });

            // Update the image in the hero section as well
            updateHeroProductImage();

            // Animate in new content
            labelGrid.classList.add('active');
        }, 300); // Match CSS transition duration
    }

    // Update carousel dots
    function updateCarouselDots() {
        carouselDotsContainer.innerHTML = '';
        soaps.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === currentSoapIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => showSlide(index));
            carouselDotsContainer.appendChild(dot);
        });
    }

    // Show a specific slide
    function showSlide(index) {
        if (index < 0) {
            currentSoapIndex = soaps.length - 1;
        } else if (index >= soaps.length) {
            currentSoapIndex = 0;
        } else {
            currentSoapIndex = index;
        }
        renderSoapDetails(currentSoapIndex);
        updateCarouselDots();
        updateActiveFragranceCard();
    }

    // Navigate to next slide
    function nextSlide() {
        showSlide(currentSoapIndex + 1);
    }

    // Navigate to previous slide
    function prevSlide() {
        showSlide(currentSoapIndex - 1);
    }

    // Update active state for fragrance cards
    function updateActiveFragranceCard() {
        frCards.forEach((card, index) => {
            if (index === currentSoapIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    // --- Event Listeners ---

    // Sticky header with shadow
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            // Optional: Close mobile menu if open
        });
    });

    // Carousel navigation
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Fragrance card click to jump to slide
    frCards.forEach(card => {
        card.addEventListener('click', function() {
            const index = parseInt(this.dataset.fragranceIndex);
            showSlide(index);
            document.querySelector('#product-showcase').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu toggle (basic functionality)
    menuBtn.addEventListener('click', () => {
        const nav = document.querySelector('.nav');
        nav.classList.toggle('active'); // You'd need CSS for .nav.active to display it
    });

    // --- Scroll Reveal Animation ---
    const revealSections = document.querySelectorAll('.reveal-section');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the section must be visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    revealSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Initialize Carousel ---
    showSlide(0); // Display the first soap on load
    labelGrid.classList.add('active'); // Ensure initial content is visible
});

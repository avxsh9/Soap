// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Header (Simple interaction) ---
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        // Add a subtle shadow to the header when scrolled past a certain point
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // --- Smooth Scroll for CTA ---
    const cta = document.querySelector('.hero-cta');
    cta.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = cta.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });

    // --- Mock Cart Interaction (Optional) ---
    const cartIcon = document.querySelector('.cart-icon svg');
    cartIcon.addEventListener('click', () => {
        alert('Your cart is empty! Time to add some Numinous goodness. (This is a mock interaction)');
    });
});
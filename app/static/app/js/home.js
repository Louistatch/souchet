document.addEventListener('DOMContentLoaded', function() {
    // Animation de défilement fluide pour les ancres internes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animation des cartes de produits
    const productCards = document.querySelectorAll('.product-card');
    if (productCards.length > 0) {
        productCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('appear');
            }, 100 * index);
        });
    }

    // Effet de parallaxe pour l'en-tête
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const header = document.querySelector('.header-banner');
        if (header) {
            header.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });

    // Préchargement des images de produits pour une navigation plus fluide
    const productImages = document.querySelectorAll('img.product-image');
    if (productImages.length > 0) {
        productImages.forEach(img => {
            const newImg = new Image();
            newImg.src = img.src;
        });
    }
    
    // Carrousel automatique pour la section de présentation
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }
});

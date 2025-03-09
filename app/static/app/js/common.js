document.addEventListener('DOMContentLoaded', function() {
    // Animations globales pour toutes les pages
    
    // Animation du menu de navigation lors du défilement
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        }
    });
    
    // Animation des boutons et liens
    const buttons = document.querySelectorAll('.btn, .nav-link');
    if (buttons.length > 0) {
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.classList.add('btn-hover');
            });
            
            button.addEventListener('mouseleave', function() {
                this.classList.remove('btn-hover');
            });
            
            button.addEventListener('click', function() {
                this.classList.add('btn-clicked');
                setTimeout(() => {
                    this.classList.remove('btn-clicked');
                }, 300);
            });
        });
    }
    
    // Animation du dropdown menu
    const dropdownToggle = document.querySelectorAll('.dropdown-toggle');
    if (dropdownToggle.length > 0) {
        dropdownToggle.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const dropdown = this.nextElementSibling;
                if (dropdown) {
                    dropdown.classList.add('dropdown-animated');
                }
            });
        });
    }
    
    // Animation du pied de page lors du défilement
    const footer = document.querySelector('footer');
    if (footer) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.classList.add('footer-visible');
                }
            });
        }, { threshold: 0.1 });
        
        footerObserver.observe(footer);
    }
    
    // Animation de chargement de page
    const pageContent = document.querySelector('main');
    if (pageContent) {
        pageContent.classList.add('content-loaded');
    }
    
    // Retour en haut de page fluide
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Préchargement des images pour améliorer l'expérience utilisateur
    function preloadImages() {
        const images = document.querySelectorAll('img[data-src]');
        if (images.length > 0) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(image => {
                imageObserver.observe(image);
            });
        }
    }
    
    preloadImages();
});

document.addEventListener('DOMContentLoaded', function() {
    // Zoom sur l'image du produit
    const productImage = document.querySelector('.product-image-main');
    if (productImage) {
        productImage.addEventListener('mousemove', function(e) {
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;
            
            productImage.style.transformOrigin = `${x}px ${y}px`;
            productImage.style.transform = "scale(1.5)";
        });
        
        productImage.addEventListener('mouseleave', function() {
            productImage.style.transformOrigin = 'center center';
            productImage.style.transform = "scale(1)";
        });
    }
    
    // Animation de description du produit
    const productDescription = document.querySelector('.product-description');
    if (productDescription) {
        // Animer la description au chargement
        productDescription.classList.add('animated');
    }
    
    // Gestion des onglets pour les informations produit
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                
                // Désactiver tous les onglets et contenus
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Activer l'onglet et le contenu sélectionnés
                this.classList.add('active');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }
    
    // Animation du bouton d'ajout au panier
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    }
    
    // Recommandations de produits avec chargement progressif
    const recommendedProducts = document.querySelectorAll('.recommended-product');
    if (recommendedProducts.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        });
        
        recommendedProducts.forEach(product => {
            observer.observe(product);
        });
    }
});

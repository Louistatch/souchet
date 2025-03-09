document.addEventListener('DOMContentLoaded', function() {
    // Animation des produits lors du chargement de la page
    const products = document.querySelectorAll('.product-item');
    if (products.length > 0) {
        products.forEach((product, index) => {
            setTimeout(() => {
                product.classList.add('fade-in');
            }, 100 * index);
        });
    }
    
    // Filtrage des produits par prix
    const priceRange = document.querySelector('.price-range');
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            const maxPrice = this.value;
            document.querySelector('.price-value').textContent = maxPrice + ' FCFA';
            
            products.forEach(product => {
                const price = parseInt(product.getAttribute('data-price'));
                if (price <= maxPrice) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    }
    
    // Tri des produits
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            const productsList = document.querySelector('.products-list');
            const productsArray = Array.from(products);
            
            if (sortBy === 'price-asc') {
                productsArray.sort((a, b) => {
                    return parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price'));
                });
            } else if (sortBy === 'price-desc') {
                productsArray.sort((a, b) => {
                    return parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price'));
                });
            } else if (sortBy === 'name-asc') {
                productsArray.sort((a, b) => {
                    return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
                });
            } else if (sortBy === 'name-desc') {
                productsArray.sort((a, b) => {
                    return b.getAttribute('data-name').localeCompare(a.getAttribute('data-name'));
                });
            }
            
            // Réorganiser les produits dans le DOM
            productsArray.forEach(product => {
                productsList.appendChild(product);
            });
        });
    }
    
    // Chargement progressif des images pour améliorer les performances
    const productImages = document.querySelectorAll('.lazy-load');
    if (productImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-load');
                    observer.unobserve(img);
                }
            });
        });
        
        productImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Animation du titre de catégorie
    const categoryTitle = document.querySelector('.category-title');
    if (categoryTitle) {
        categoryTitle.classList.add('animated');
    }
});

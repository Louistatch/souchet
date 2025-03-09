document.addEventListener('DOMContentLoaded', function() {
    // Animation du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.classList.add('form-appear');
        
        // Animation des champs de formulaire lors de la saisie
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('input-active');
            });
            
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('input-active');
                }
            });
        });
    }
    
    // Validation du formulaire en temps réel
    const formFields = document.querySelectorAll('.form-field');
    if (formFields.length > 0) {
        formFields.forEach(field => {
            const input = field.querySelector('input, textarea');
            const errorMessage = field.querySelector('.error-message');
            
            if (input && errorMessage) {
                input.addEventListener('input', function() {
                    validateField(input, errorMessage);
                });
                
                input.addEventListener('blur', function() {
                    validateField(input, errorMessage);
                });
            }
        });
    }
    
    function validateField(input, errorMessage) {
        // Validation de l'email
        if (input.type === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value) && input.value !== '') {
                errorMessage.textContent = 'Veuillez entrer une adresse email valide';
                errorMessage.style.display = 'block';
                input.classList.add('invalid');
            } else {
                errorMessage.style.display = 'none';
                input.classList.remove('invalid');
            }
        }
        
        // Validation du téléphone
        if (input.type === 'tel') {
            const phonePattern = /^\d{8,}$/;
            if (!phonePattern.test(input.value) && input.value !== '') {
                errorMessage.textContent = 'Veuillez entrer un numéro de téléphone valide';
                errorMessage.style.display = 'block';
                input.classList.add('invalid');
            } else {
                errorMessage.style.display = 'none';
                input.classList.remove('invalid');
            }
        }
        
        // Validation des champs requis
        if (input.required && input.value === '') {
            errorMessage.textContent = 'Ce champ est requis';
            errorMessage.style.display = 'block';
            input.classList.add('invalid');
        }
    }
    
    // Animation de la carte de localisation
    const mapElement = document.querySelector('.contact-map');
    if (mapElement) {
        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('map-loaded');
                    mapObserver.unobserve(entry.target);
                }
            });
        });
        
        mapObserver.observe(mapElement);
    }
    
    // Animation des informations de contact
    const contactInfo = document.querySelectorAll('.contact-info-item');
    if (contactInfo.length > 0) {
        contactInfo.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('info-appear');
            }, 200 * index);
        });
    }
});

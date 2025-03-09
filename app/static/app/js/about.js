document.addEventListener('DOMContentLoaded', function() {
    // Animation des sections au défilement
    const sections = document.querySelectorAll('.about-section');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (sections.length > 0) {
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    // Animation du compteur de chiffres clés
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    let count = 0;
                    const duration = 2000; // 2 secondes
                    const increment = target / (duration / 16); // 60fps
                    
                    const updateCount = () => {
                        count += increment;
                        if (count < target) {
                            counter.innerText = Math.ceil(count);
                            setTimeout(updateCount, 16);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    
                    updateCount();
                    counterObserver.unobserve(counter);
                }
            });
        });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Effet de parallaxe pour l'image d'en-tête
    window.addEventListener('scroll', function() {
        const parallaxImage = document.querySelector('.parallax-bg');
        if (parallaxImage) {
            const scrollPosition = window.scrollY;
            parallaxImage.style.transform = `translateY(${scrollPosition * 0.4}px)`;
        }
    });
    
    // Animation de la chronologie
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }
    
    // Animation des membres de l'équipe
    const teamMembers = document.querySelectorAll('.team-member');
    if (teamMembers.length > 0) {
        teamMembers.forEach((member, index) => {
            setTimeout(() => {
                member.classList.add('show');
            }, 200 * index);
        });
    }
});

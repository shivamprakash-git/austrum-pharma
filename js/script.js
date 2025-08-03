// Enhanced Logo Lightbox Functionality
document.addEventListener('DOMContentLoaded', function() {
    const logoImage = document.querySelector('.logo-image');
    
    if (logoImage) {
        logoImage.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create lightbox element with enhanced styling
            const lightbox = document.createElement('div');
            lightbox.className = 'logo-lightbox enhanced-lightbox';
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, rgba(27, 67, 50, 0.95), rgba(45, 90, 61, 0.95));
                backdrop-filter: blur(10px);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                cursor: pointer;
                opacity: 0;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            `;
            
            // Create container for logo and effects
            const logoContainer = document.createElement('div');
            logoContainer.style.cssText = `
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                transform: scale(0.5) rotateY(180deg);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            `;
            
            // Create enlarged image with glow effect
            const enlargedImage = document.createElement('img');
            enlargedImage.src = this.src;
            enlargedImage.style.cssText = `
                max-width: 400px;
                max-height: 400px;
                width: auto;
                height: auto;
                object-fit: contain;
                border-radius: 20px;
                box-shadow: 
                    0 0 50px rgba(82, 183, 136, 0.6),
                    0 0 100px rgba(82, 183, 136, 0.4),
                    0 0 150px rgba(82, 183, 136, 0.2),
                    0 20px 40px rgba(0, 0, 0, 0.3);
                border: 3px solid rgba(255, 255, 255, 0.2);
                animation: logoGlow 3s ease-in-out infinite alternate;
            `;
            
            // Create company name text
            const companyText = document.createElement('div');
            companyText.innerHTML = `
                <h2 style="
                    color: white;
                    font-family: 'Montserrat', sans-serif;
                    font-size: 2.5rem;
                    font-weight: 700;
                    text-align: center;
                    margin: 30px 0 10px 0;
                    text-shadow: 0 0 20px rgba(82, 183, 136, 0.8);
                    letter-spacing: 3px;
                    animation: textGlow 2s ease-in-out infinite alternate;
                ">AUSTRUM PHARMACEUTICALS</h2>
                <p style="
                    color: rgba(255, 255, 255, 0.9);
                    font-family: 'Open Sans', sans-serif;
                    font-size: 1.2rem;
                    text-align: center;
                    margin: 0;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    animation: fadeInUp 1s ease-out 0.5s both;
                ">Your Health Our Priority</p>
            `;
            
            // Create close instruction
            const closeInstruction = document.createElement('div');
            closeInstruction.style.cssText = `
                position: absolute;
                bottom: 50px;
                left: 50%;
                transform: translateX(-50%);
                color: rgba(255, 255, 255, 0.7);
                font-size: 1rem;
                text-align: center;
                animation: pulse 2s ease-in-out infinite;
            `;
            closeInstruction.textContent = 'Click anywhere to close';
            
            // Assemble the lightbox
            logoContainer.appendChild(enlargedImage);
            logoContainer.appendChild(companyText);
            lightbox.appendChild(logoContainer);
            lightbox.appendChild(closeInstruction);
            document.body.appendChild(lightbox);
            
            // Animate entrance
            setTimeout(() => {
                lightbox.style.opacity = '1';
                logoContainer.style.transform = 'scale(1) rotateY(0deg)';
            }, 10);
            
            // Close lightbox with smooth exit animation
            lightbox.addEventListener('click', function() {
                lightbox.style.opacity = '0';
                logoContainer.style.transform = 'scale(0.5) rotateY(-180deg)';
                setTimeout(() => {
                    if (document.body.contains(lightbox)) {
                        document.body.removeChild(lightbox);
                    }
                }, 400);
            });
        });
    }
});

// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('nav ul');
const body = document.body;
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        navMenu.classList.add('active');
        body.classList.add('menu-open');
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
    } else {
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
    }
}

function closeMenu() {
    if (isMenuOpen) {
        isMenuOpen = false;
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
    }
}

if (mobileToggle && navMenu) {
    // Set initial aria-expanded attribute
    mobileToggle.setAttribute('aria-expanded', 'false');
    
    mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMenu();
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all sections and cards for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.about, .services, .contact, .service-card, .section-title, .hero-content');
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

// Header scroll effect
const header = document.querySelector('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.style.background = 'rgba(27, 67, 50, 0.95)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.background = 'var(--gradient-primary)';
        header.style.backdropFilter = 'blur(10px)';
    }
    
    lastScrollY = currentScrollY;
});

// Back to top button functionality
const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form submission handling with client-side integration
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    try {
        // For client-side only implementation, we'll just show a success message
        // In a real implementation, you would use a service like Formspree or Netlify Forms
        console.log('Form data:', formData);
        
        // Show success message
        showNotification('Thank you for your message! We will contact you soon.');
        // Reset form
        contactForm.reset();
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error sending message. Please try again later.');
    }
});

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1000;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Product Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Product data
    const productData = {
        cardiology: {
            name: 'CardioCare Range',
            category: 'Cardiology',
            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'Our comprehensive CardioCare range offers advanced pharmaceutical solutions for cardiovascular health management, designed to address various heart conditions with precision and efficacy.',
            features: [
                'Advanced ACE inhibitors for hypertension control',
                'Beta-blockers for arrhythmia management',
                'Calcium channel blockers for angina relief',
                'Diuretics for heart failure treatment',
                'Antiplatelet agents for stroke prevention',
                'Statins for cholesterol management'
            ],
            indications: [
                'Hypertension (High Blood Pressure)',
                'Heart Failure',
                'Arrhythmia and Irregular Heartbeat',
                'Angina Pectoris',
                'Post-Myocardial Infarction Care',
                'Hyperlipidemia'
            ],
            dosageForms: ['Tablets 10mg, 20mg, 40mg', 'Capsules 5mg, 10mg', 'Injectable 1mg/ml', 'Extended Release 50mg']
        },
        diabetology: {
            name: 'DiaBalance Range',
            category: 'Diabetology',
            image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'DiaBalance range provides innovative formulations for comprehensive diabetes management, helping patients maintain optimal glucose levels and prevent diabetic complications.',
            features: [
                'Long-acting insulin analogues',
                'Rapid-acting insulin for meal coverage',
                'Metformin extended-release formulations',
                'DPP-4 inhibitors for glucose control',
                'SGLT-2 inhibitors for weight management',
                'Combination therapies for better compliance'
            ],
            indications: [
                'Type 1 Diabetes Mellitus',
                'Type 2 Diabetes Mellitus',
                'Gestational Diabetes',
                'Pre-diabetes Management',
                'Diabetic Nephropathy',
                'Diabetic Neuropathy'
            ],
            dosageForms: ['Tablets 500mg, 850mg, 1000mg', 'Injectable Pens', 'Vials 10ml', 'Combination Tablets']
        },
        neurology: {
            name: 'NeuroSafe Range',
            category: 'Neurology',
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'NeuroSafe range offers effective treatments for neurological disorders, providing relief from various neurological conditions and supporting brain health.',
            features: [
                'Anti-epileptic drugs with minimal side effects',
                'Neuropathic pain management solutions',
                'Migraine prevention and treatment',
                'Parkinson\'s disease medications',
                'Alzheimer\'s disease management',
                'Multiple sclerosis treatments'
            ],
            indications: [
                'Epilepsy and Seizure Disorders',
                'Neuropathic Pain',
                'Migraine and Headaches',
                'Parkinson\'s Disease',
                'Alzheimer\'s Disease',
                'Multiple Sclerosis'
            ],
            dosageForms: ['Tablets 25mg, 50mg, 100mg', 'Capsules 75mg, 150mg', 'Oral Solution 5mg/ml', 'Extended Release 200mg']
        },
        antibiotics: {
            name: 'AntiBac Range',
            category: 'Antibiotics',
            image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'AntiBac range provides broad-spectrum antibiotics for effective infection management, ensuring rapid recovery and preventing antibiotic resistance.',
            features: [
                'Broad-spectrum coverage',
                'Rapid bactericidal action',
                'Minimal resistance development',
                'Excellent tissue penetration',
                'Oral and parenteral formulations',
                'Pediatric-friendly formulations'
            ],
            indications: [
                'Respiratory Tract Infections',
                'Urinary Tract Infections',
                'Skin and Soft Tissue Infections',
                'Gastrointestinal Infections',
                'Post-operative Prophylaxis',
                'Sepsis and Bacteremia'
            ],
            dosageForms: ['Tablets 250mg, 500mg', 'Capsules 125mg, 250mg', 'Injectable 1g, 2g', 'Oral Suspension 125mg/5ml']
        },
        gastroenterology: {
            name: 'GastroHeal Range',
            category: 'Gastroenterology',
            image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'GastroHeal range offers comprehensive solutions for digestive health, addressing various gastrointestinal disorders with advanced therapeutic approaches.',
            features: [
                'Proton pump inhibitors for acid control',
                'H2 receptor antagonists',
                'Antispasmodic agents',
                'Probiotics for gut health',
                'Anti-inflammatory compounds',
                'Hepatoprotective agents'
            ],
            indications: [
                'Gastroesophageal Reflux Disease (GERD)',
                'Peptic Ulcer Disease',
                'Inflammatory Bowel Disease',
                'Irritable Bowel Syndrome',
                'Hepatitis and Liver Disorders',
                'Functional Dyspepsia'
            ],
            dosageForms: ['Tablets 20mg, 40mg', 'Capsules 15mg, 30mg', 'Oral Suspension 10mg/ml', 'Enteric Coated Tablets']
        },
        respiratory: {
            name: 'RespiroCare Range',
            category: 'Respiratory',
            image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'RespiroCare range provides advanced treatments for respiratory conditions, helping patients breathe easier and manage chronic respiratory diseases effectively.',
            features: [
                'Long-acting bronchodilators',
                'Inhaled corticosteroids',
                'Combination inhalers',
                'Mucolytic agents',
                'Anti-tussive formulations',
                'Oxygen therapy support'
            ],
            indications: [
                'Asthma',
                'Chronic Obstructive Pulmonary Disease (COPD)',
                'Bronchitis',
                'Pneumonia',
                'Allergic Rhinitis',
                'Respiratory Tract Infections'
            ],
            dosageForms: ['Inhalers 100mcg, 200mcg', 'Nebulizer Solutions', 'Tablets 10mg, 20mg', 'Syrups 5mg/5ml']
        }
    };

    // Get modal elements
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalCategory = document.getElementById('modalCategory');
    const modalProductName = document.getElementById('modalProductName');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalIndications = document.getElementById('modalIndications');
    const modalDosage = document.getElementById('modalDosage');
    const closeBtn = document.querySelector('.close');

    // Add click event listeners to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productType = this.getAttribute('data-product');
            const product = productData[productType];
            
            if (product) {
                // Populate modal with product data
                modalTitle.textContent = product.name + ' - Details';
                modalImage.src = product.image;
                modalImage.alt = product.name;
                modalCategory.textContent = product.category;
                modalProductName.textContent = product.name;
                modalDescription.textContent = product.description;
                
                // Populate features
                modalFeatures.innerHTML = '';
                product.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    modalFeatures.appendChild(li);
                });
                
                // Populate indications
                modalIndications.innerHTML = '';
                product.indications.forEach(indication => {
                    const li = document.createElement('li');
                    li.textContent = indication;
                    modalIndications.appendChild(li);
                });
                
                // Populate dosage forms
                modalDosage.innerHTML = '';
                product.dosageForms.forEach(form => {
                    const span = document.createElement('span');
                    span.className = 'dosage-item';
                    span.textContent = form;
                    modalDosage.appendChild(span);
                });
                
                // Show modal with animation
                modal.classList.add('show');
                setTimeout(() => {
                    modal.style.opacity = '1';
                }, 10);
                
                // Prevent body scroll
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal function
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Close modal when clicking the close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Handle contact button in modal
    const modalContactBtn = document.querySelector('.modal-contact-btn');
    if (modalContactBtn) {
        modalContactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal();
            // Smooth scroll to contact section
            setTimeout(() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 400);
        });
    }
});

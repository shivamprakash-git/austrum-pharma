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
                padding: 4vh 4vw;
                overflow: auto;
            `;
            
            // Create container for logo and effects
            const logoContainer = document.createElement('div');
            logoContainer.style.cssText = `
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                max-width: 92vw;
                max-height: 92vh;
                gap: 8px;
                padding: 16px;
                box-sizing: border-box;
                transform: scale(0.5) rotateY(180deg);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            `;
            
            // Create enlarged image with glow effect
            const enlargedImage = document.createElement('img');
            enlargedImage.src = this.src;
            enlargedImage.style.cssText = `
                max-width: min(70vw, 220px);
                max-height: min(40vh, 200px);
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
            
            // Create company name text with responsive design
            const companyText = document.createElement('div');
            
            // Check if mobile device
            const isMobile = window.innerWidth <= 768;
            const isSmallMobile = window.innerWidth <= 480;
            
            companyText.innerHTML = `
                <h2 style="
                    color: white;
                    font-family: 'Montserrat', sans-serif;
                    font-size: clamp(1.2rem, 4.5vmin, 2rem);
                    font-weight: 700;
                    text-align: center;
                    margin: 16px 0 6px 0;
                    padding: 0 5vw;
                    text-shadow: 0 0 16px rgba(82, 183, 136, 0.7);
                    letter-spacing: 1.5px;
                    animation: textGlow 2s ease-in-out infinite alternate;
                    word-wrap: break-word;
                    overflow-wrap: anywhere;
                    hyphens: auto;
                    line-height: 1.15;
                ">AUSTRUM PHARMACEUTICALS</h2>
                <p style="
                    color: rgba(255, 255, 255, 0.9);
                    font-family: 'Open Sans', sans-serif;
                    font-size: clamp(0.8rem, 2.2vmin, 0.95rem);
                    text-align: center;
                    margin: 0;
                    padding: 0 6vw;
                    letter-spacing: 1.2px;
                    text-transform: uppercase;
                    animation: fadeInUp 1s ease-out 0.5s both;
                ">Your Health Our Priority</p>
            `;
            
            // Assemble the lightbox
            logoContainer.appendChild(enlargedImage);
            logoContainer.appendChild(companyText);
            lightbox.appendChild(logoContainer);
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
let scrollPosition = 0;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        // Store current scroll position
        scrollPosition = window.pageYOffset;
        navMenu.classList.add('active');
        body.classList.add('menu-open');
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
        // Clear any residual focus on links to avoid sticky highlight on touch
        document.querySelectorAll('nav a').forEach(a => a.blur());
        // Inject a top-centered faded close button into the mobile menu
        if (!navMenu.querySelector('.mobile-close')) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'mobile-close';
            closeBtn.setAttribute('aria-label', 'Close menu');
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            closeBtn.addEventListener('click', (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
                closeMenu();
            });
            navMenu.appendChild(closeBtn);
        }
        // Prevent scrolling
        body.style.top = `-${scrollPosition}px`;
    } else {
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        // Restore scroll position
        body.style.top = '';
        window.scrollTo(0, scrollPosition);
    }
}

function closeMenu(skipRestore = false) {
    if (isMenuOpen) {
        isMenuOpen = false;
        navMenu.classList.remove('active');
        body.classList.remove('menu-open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        // Remove the injected close button if present
        const injected = navMenu.querySelector('.mobile-close');
        if (injected) injected.remove();
        // Restore scroll position unless we're navigating to a section
        body.style.top = '';
        if (!skipRestore) {
            window.scrollTo(0, scrollPosition);
        }
    }
}

if (mobileToggle && navMenu) {
    // Set initial aria-expanded attribute
    mobileToggle.setAttribute('aria-expanded', 'false');
    
    mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        toggleMenu();
        return false;
    });

    // Close mobile menu when clicking a link (don't restore scroll, we'll handle smooth scroll)
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu(true);
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
// Helper to compute total fixed top offset (header + top banner if fixed)
function getTopOffset() {
    const headerEl = document.querySelector('header');
    const bannerEl = document.querySelector('.top-banner');
    const headerHeight = headerEl ? headerEl.offsetHeight : 0;
    const bannerIsFixed = bannerEl ? getComputedStyle(bannerEl).position === 'fixed' : false;
    const bannerHeight = bannerEl && bannerIsFixed ? bannerEl.offsetHeight : 0;
    return headerHeight + bannerHeight;
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        // Compute dynamic top offset (header + fixed top banner) to align section exactly at the top
        const offset = getTopOffset();
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset - offset;

        // If menu was open, give it a tick to close before scrolling
        const delay = isMenuOpen ? 120 : 0;
        setTimeout(() => {
            window.scrollTo({ top: Math.max(targetTop, 0), behavior: 'smooth' });
        }, delay);
    });
});

// Keep a CSS var up-to-date for header height so CSS can use scroll-margin-top fallbacks
function updateHeaderHeightVar() {
    const total = getTopOffset();
    document.documentElement.style.setProperty('--header-height', `${total}px`);
}

document.addEventListener('DOMContentLoaded', updateHeaderHeightVar);
window.addEventListener('resize', updateHeaderHeightVar);

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

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.style.background = 'rgba(27, 67, 50, 0.95)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.background = 'var(--gradient-primary)';
        header.style.backdropFilter = 'blur(10px)';
    }
    
    // no-op
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

// Show enhanced notification with tick icon
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    // Create tick icon
    const icon = document.createElement('div');
    icon.className = 'notification-icon';
    icon.innerHTML = '✓';
    
    // Create message container
    const messageContainer = document.createElement('div');
    messageContainer.className = 'notification-message';
    messageContainer.textContent = message;
    
    // Assemble notification
    notification.appendChild(icon);
    notification.appendChild(messageContainer);
    
    document.body.appendChild(notification);
    
    // Remove notification after animation completes (4s total: 3.5s display + 0.4s fade out)
    setTimeout(() => {
        if (notification.parentNode) {
            document.body.removeChild(notification);
        }
    }, 3900);
}
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('productGalleryModal');
    let modalImg = document.getElementById('galleryImage');
    const productName = document.getElementById('galleryProductName');
    const productDetails = document.getElementById('galleryProductDetails');
    const closeBtn = document.querySelector('.close-gallery');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const productCards = document.querySelectorAll('.product-card');
    const imageContainer = document.querySelector('.image-container');
    const products = [];
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    // For smooth panning
    let lastTouchX = null;
    let lastTouchY = null;
    let lastTouchTime = 0;
    let velocityX = 0;
    let velocityY = 0;
    let momentumAnimationId = null;
    // Track zoom and pan state
    let isZoomed = false;
    let initialDistance = 0;
    let currentScale = 1;
    let startX = 0;
    let startY = 0;
    let translateX = 0;
    let translateY = 0;
    const swipeThreshold = 50; // Minimum distance to trigger a swipe
    
    // Product details data
    const productDetailsData = {
        'ALCITRUM P': {
            description: 'Analgesic and anti-inflammatory medication',
            composition: 'Aceclofenac 100mg + Paracetamol 325mg',
            benefits: 'Potent analgesic and anti-inflammatory with rapid absorption. Preferred over conventional NSAIDs',
            dosage: 'As directed by the physician',
            packaging: 'Strip of 10 tablets'
        },
        'ALCITRUM SP': {
            description: 'Advanced analgesic with enzyme',
            composition: 'Aceclofenac 100mg + Paracetamol 325mg + Serratiopeptidase 15mg',
            benefits: 'Superior GI tolerability with anti-inflammatory, mucolytic, fibrinolytic, and anti-biofilm actions',
            dosage: 'As directed by the physician',
            packaging: 'Strip of 10 tablets'
        },
        'ALKATRUM': {
            description: 'Urinary alkalizer',
            composition: 'Disodium Hydrogen Citrate BP 1.25gm',
            benefits: 'Relief from urinary burning, infections, and calculi',
            dosage: 'As directed by the physician',
            packaging: 'Bottle of 60 tablets'
        },
        'AUSRON N': {
            description: 'Hormone therapy',
            composition: 'Norethisterone 5mg',
            benefits: 'Regulates menstruation, reduces bleeding, effective for endometriosis and PMS',
            dosage: 'As directed by the physician',
            packaging: 'Strip of 10 tablets'
        },
        'AUSTROGAB NT': {
            description: 'Neuropathic pain management',
            composition: 'Pregabalin 75mg + Nortriptyline Hydrochloride 10mg',
            benefits: 'First-line treatment for neuropathy with synergistic action and fewer side effects',
            dosage: 'As directed by the physician',
            packaging: 'Strip of 10 tablets'
        },
        'CEFUTRUM 500': {
            description: 'Broad-spectrum cephalosporin antibiotic',
            composition: 'Cefuroxime Axetil 500mg',
            benefits: 'Second-gen cephalosporin active against staphylococcal, streptococcal, gonorrhoeae, and resistant strains',
            dosage: 'As prescribed by the physician',
            packaging: 'Strip of 6 tablets, 10 tablets'
        },
        'CIPTRUM 500': {
            description: 'Calcium supplement',
            composition: 'Calcium Carbonate 500mg + Vitamin D3 1000 IU',
            benefits: 'Strengthens bones and nerves. Recommended daily calcium dose',
            dosage: 'As directed by the physician',
            packaging: 'Strip of 15 tablets'
        },
        'CIPTRUM 60K': {
            description: 'Vitamin D3 supplement',
            composition: 'Cholecalciferol (Vitamin D3) 60,000 IU',
            benefits: 'Enhances calcium absorption, bone strength, and immune function',
            dosage: 'Once weekly or as directed by the physician',
            packaging: 'Strip of 4 tablets'
        },
        'CIPTRUM XT': {
            description: 'Bone health supplement',
            composition: 'Calcium Carbonate 1250mg + Vitamin D3 2000 IU + L-Methylfolate + Pyridoxal-5-Phosphate + Methylcobalamin',
            benefits: 'Supports bone health, calcium absorption, nerve function, and red blood cell formation',
            dosage: 'As directed by the physician',
            packaging: 'Strip of 10 tablets'
        },
        'DOXITRUM PLUS': {
            description: 'Pregnancy support supplement',
            composition: 'Doxylamine Succinate 10mg + Pyridoxine HCI + Folic Acid 2.5mg',
            benefits: 'Manages morning sickness during pregnancy. Supports hormonal balance and neural tube development',
            dosage: 'As directed by the physician',
            packaging: 'Strip of 10 tablets'
        },
        'ENZOTRUM': {
            description: 'Enzyme supplement',
            composition: 'Trypsin + Bromelain + Rutoside',
            benefits: 'Reduces inflammation, swelling, enhances tissue repair, improves drug absorption, and stabilizes capillaries',
            dosage: 'As directed by the physician',
            packaging: 'Strip of 10 tablets'
        },
        'FERROTRUM XT TABLET': {
            description: 'Iron supplement',
            composition: 'Ferrous Ascorbate 100mg + Folic Acid 1.5mg',
            benefits: 'Boosts iron levels, fights fatigue, supports fetal development',
            dosage: '1 tablet daily or as directed',
            packaging: 'Strip of 10 tablets, 15 tablets, 30 tablets'
        },
        'FERROTRUM XT SYRUP': {
            description: 'Iron supplement syrup',
            composition: 'Ferrous Ascorbate + Folic Acid',
            benefits: 'Treats anemia, supports pregnancy and lactation recovery',
            dosage: 'As directed by the physician',
            packaging: '200ml bottle'
        },
        'LINOTRUM 600': {
            description: 'Antibiotic',
            composition: 'Linezolid 600mg',
            benefits: 'Effective against Gram-positive bacteria. Used for MDR-TB, bone/joint infections, respiratory and skin infections',
            dosage: 'As prescribed by the physician',
            packaging: 'Strip of 10 tablets'
        },
        'MOXITRUM CV 625': {
            description: 'Antibiotic combination',
            composition: 'Amoxicillin 500mg + Clavulanate 125mg',
            benefits: 'Broad-spectrum antibacterial effective against beta-lactamase producing bacteria',
            dosage: '1 tablet twice daily or as prescribed',
            packaging: 'Strip of 6 tablets, 10 tablets'
        },
        'PATRUM DSR': {
            description: 'Acid controller',
            composition: 'Pantoprazole + Domperidone',
            benefits: 'Prolonged acid inhibition. Effective for GERD, nausea, vomiting, and gastric emptying',
            dosage: '1 capsule daily before breakfast or as directed',
            packaging: 'Strip of 10 capsules'
        },
        'PREGTRUM SR 200': {
            description: 'Progesterone supplement',
            composition: 'Natural Micronized Progesterone 200mg',
            benefits: 'Supports gestation, regulates menstrual cycle, lowers miscarriage risk',
            dosage: 'As prescribed by the gynecologist',
            packaging: 'Strip of 10 capsules'
        }
    };

    // Update image transform with current scale and position
    function updateImageTransform() {
        // Use transform3d for hardware acceleration
        modalImg.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${currentScale})`;
        // Force hardware acceleration
        modalImg.style.willChange = 'transform';
    }

    // Reset image transform to default
    function resetImageTransform() {
        currentScale = 1;
        translateX = 0;
        translateY = 0;
        updateImageTransform();
        isZoomed = false;
    }

    // Track last tap time for double-tap detection
    let lastTapTime = 0;
    const DOUBLE_TAP_DELAY = 300; // ms

    // Handle touch events for zooming and panning
    function handleTouch(e) {
        // Only prevent default for multi-touch or when zoomed
        if (e.touches.length > 1 || isZoomed) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Handle multi-touch (pinch zoom)
        if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(
                touch2.pageX - touch1.pageX,
                touch2.pageY - touch1.pageY
            );

            if (e.type === 'touchstart') {
                initialDistance = distance;
                // Store initial touch positions
                lastTouchX = touch1.clientX;
                lastTouchY = touch1.clientY;
            } else if (e.type === 'touchmove') {
                if (initialDistance > 0) {
                    const scale = Math.min(Math.max(distance / initialDistance, 1), 3);
                    currentScale = scale;
                    isZoomed = scale > 1.1;
                    updateImageTransform();
                }
            } else if (e.type === 'touchend' || e.type === 'touchcancel') {
                if (currentScale < 1.1) {
                    resetImageTransform();
                }
                initialDistance = 0;
                lastTouchX = null;
                lastTouchY = null;
            }
            return false;
        }
        
        // Handle single touch (panning when zoomed)
        if (isZoomed && e.touches.length === 1) {
            const touch = e.touches[0];
            const now = Date.now();
            
            if (e.type === 'touchstart') {
                // Reset velocity tracking
                lastTouchX = touch.clientX;
                lastTouchY = touch.clientY;
                lastTouchTime = now;
                velocityX = 0;
                velocityY = 0;
                
                // Store initial touch position
                startX = touch.clientX - translateX;
                startY = touch.clientY - translateY;
                
                // Cancel any ongoing momentum animation
                cancelAnimationFrame(momentumAnimationId);
                
                return false;
            } 
            
            if (e.type === 'touchmove') {
                const currentTime = now;
                const timeDiff = currentTime - lastTouchTime;
                
                if (timeDiff > 0) {
                    // Calculate velocity (pixels per millisecond)
                    const currentX = touch.clientX;
                    const currentY = touch.clientY;
                    
                    // Apply low-pass filter to smooth velocity
                    const newVelocityX = (currentX - lastTouchX) / timeDiff;
                    const newVelocityY = (currentY - lastTouchY) / timeDiff;
                    
                    velocityX = 0.5 * velocityX + 0.5 * newVelocityX;
                    velocityY = 0.5 * velocityY + 0.5 * newVelocityY;
                    
                    lastTouchX = currentX;
                    lastTouchY = currentY;
                    lastTouchTime = currentTime;
                    
                    // Update position
                    translateX = (currentX - startX);
                    translateY = (currentY - startY);
                    
                    // Apply boundaries with elastic effect
                    applyBoundaries();
                    
                    updateImageTransform();
                }
                return false;
            }
            
            if (e.type === 'touchend' || e.type === 'touchcancel') {
                // Apply momentum if there was significant movement
                const momentumThreshold = 0.3; // Minimum velocity for momentum (pixels/ms)
                const absVelocityX = Math.abs(velocityX);
                const absVelocityY = Math.abs(velocityY);
                
                if (absVelocityX > momentumThreshold || absVelocityY > momentumThreshold) {
                    applyMomentum(velocityX, velocityY);
                }
                
                return false;
            }
        }
        
        return true;
    }
    
    // Apply boundaries with elastic effect
    function applyBoundaries() {
        const maxX = (currentScale - 1) * modalImg.width / 2;
        const maxY = (currentScale - 1) * modalImg.height / 2;
        
        // Apply boundaries with elastic effect
        if (Math.abs(translateX) > maxX) {
            const overscroll = Math.abs(translateX) - maxX;
            const resistance = 0.5; // Resistance factor (0-1), lower = more resistance
            translateX = translateX > 0 ? 
                maxX + Math.pow(overscroll, resistance) : 
                -maxX - Math.pow(overscroll, resistance);
        }
        
        if (Math.abs(translateY) > maxY) {
            const overscroll = Math.abs(translateY) - maxY;
            const resistance = 0.5;
            translateY = translateY > 0 ? 
                maxY + Math.pow(overscroll, resistance) : 
                -maxY - Math.pow(overscroll, resistance);
        }
    }
    
    // Apply momentum to continue movement after release
    function applyMomentum(velX, velY) {
        const deceleration = 0.95; // Deceleration rate (0-1)
        const minVelocity = 0.01; // Minimum velocity to continue animation
        
        let currentVelX = velX;
        let currentVelY = velY;
        
        const animateMomentum = () => {
            // Apply deceleration
            currentVelX *= deceleration;
            currentVelY *= deceleration;
            
            // Update position
            translateX += currentVelX * 16; // 16ms for 60fps
            translateY += currentVelY * 16;
            
            // Apply boundaries
            applyBoundaries();
            
            updateImageTransform();
            
            // Continue animation if velocity is significant
            if (Math.abs(currentVelX) > minVelocity || Math.abs(currentVelY) > minVelocity) {
                momentumAnimationId = requestAnimationFrame(animateMomentum);
            }
        };
        
        momentumAnimationId = requestAnimationFrame(animateMomentum);
    }

    // Add touch event listeners to the image
    function addTouchListeners() {
        // Add touch event listeners for zoom and pan
        modalImg.addEventListener('touchstart', handleTouch, { passive: false });
        modalImg.addEventListener('touchmove', handleTouch, { passive: false });
        modalImg.addEventListener('touchend', handleTouch, { passive: false });
        modalImg.addEventListener('touchcancel', handleTouch, { passive: false });
        
        // Disable default gesture handling
        modalImg.addEventListener('gesturestart', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });
        
        // Handle double tap for zoom in/out
        modalImg.addEventListener('touchend', function(e) {
            // Only handle single tap for double tap detection
            if (e.touches && e.touches.length > 0) return;
            
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTapTime;
            
            if (tapLength < DOUBLE_TAP_DELAY && tapLength > 0) {
                // Double tap detected
                e.preventDefault();
                e.stopPropagation();
                
                if (isZoomed) {
                    // If zoomed in, zoom out
                    resetImageTransform();
                } else {
                    // If not zoomed, zoom in to the point of touch
                    const touch = e.changedTouches[0];
                    const rect = modalImg.getBoundingClientRect();
                    const offsetX = touch.clientX - rect.left;
                    const offsetY = touch.clientY - rect.top;
                    
                    currentScale = 2;
                    isZoomed = true;
                    
                    // Center the zoom on the touch point
                    translateX = (rect.width / 2 - offsetX) * (currentScale - 1);
                    translateY = (rect.height / 2 - offsetY) * (currentScale - 1);
                    
                    updateImageTransform();
                }
                // Reset the timer to prevent accidental triple-tap
                lastTapTime = 0;
            } else {
                // Single tap - just update the timer
                lastTapTime = currentTime;
            }
        });

        // Enhanced double-click to toggle zoom in/out
        // Track last click time for better double-click detection
        let lastClickTime = 0;
        const DOUBLE_CLICK_DELAY = 300; // ms

        modalImg.addEventListener('click', function(e) {
            const currentTime = new Date().getTime();
            
            // Check if this click is part of a double-click
            if (currentTime - lastClickTime < DOUBLE_CLICK_DELAY) {
                e.preventDefault();
                e.stopPropagation();
                
                if (isZoomed) {
                    resetImageTransform();
                } else {
                    currentScale = 2;
                    isZoomed = true;
                    updateImageTransform();
                }
                // Reset the timer to prevent accidental triple-click
                lastClickTime = 0;
            } else {
                // Single click - just update the timer
                lastClickTime = currentTime;
            }
        });
        
        // Add click handler to modal overlay to close when clicking outside image
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Swipe gesture navigation intentionally disabled to keep focus on zoom/pan interactions.
    }

    // Remove touch event listeners
    function removeTouchListeners() {
        // Create a clone of the event listeners to remove them safely
        const clone = modalImg.cloneNode(true);
        modalImg.parentNode.replaceChild(clone, modalImg);
        modalImg = clone; // Update the reference
        
        // Reset zoom and pan state
        resetImageTransform();
        
        // Re-add the image source to ensure it's properly displayed
        if (products[currentIndex]) {
            modalImg.src = products[currentIndex].src;
        }
    }

    productCards.forEach(card => {
        const productTitle = card.querySelector('h3').textContent.trim();
        products.push({
            src: card.querySelector('img').src,
            name: productTitle,
            details: productDetailsData[productTitle] || {
                description: 'Comprehensive pharmaceutical formulation',
                composition: 'High-quality active ingredients',
                benefits: 'Effective and reliable treatment',
                dosage: 'As directed by the physician',
                packaging: 'Standard packaging'
            }
        });
    });

    let currentProductIndex;
    let isAnimating = false;
    const animationDuration = 300; // ms

    function openModal(index) {
        currentProductIndex = index;
        modalImg.src = products[currentProductIndex].src;
        productName.textContent = products[currentProductIndex].name;
        updateProductDetails(products[currentProductIndex]);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        preloadAdjacentImages(index);
        isZoomed = false;
        addTouchListeners(); // Add touch listeners when modal opens
        
        // Detect zoom level changes on mobile
        if (modalImg) {
            let initialScale = 1;
            modalImg.addEventListener('touchstart', function(e) {
                if (e.touches.length === 2) {
                    // Get initial distance between two fingers
                    initialScale = modalImg.getBoundingClientRect().width / modalImg.offsetWidth;
                }
            }, { passive: true });
            
            modalImg.addEventListener('touchmove', function(e) {
                if (e.touches.length === 2) {
                    // Calculate current scale
                    const touch1 = e.touches[0];
                    const touch2 = e.touches[1];
                    const currentDistance = Math.hypot(
                        touch2.pageX - touch1.pageX,
                        touch2.pageY - touch1.pageY
                    );
                    const initialDistance = Math.hypot(
                        touch2.pageX - touch1.pageX,
                        touch2.pageY - touch1.pageY
                    );
                    const scale = (currentDistance / initialDistance) * initialScale;
                    
                    // Update zoom state
                    isZoomed = scale > 1.1;
                }
            }, { passive: true });
            
            // Reset zoom state on touch end
            modalImg.addEventListener('touchend', function() {
                setTimeout(() => {
                    const currentScale = modalImg.getBoundingClientRect().width / modalImg.offsetWidth;
                    isZoomed = currentScale > 1.1;
                }, 100);
            }, { passive: true });
        }
    }

    function closeModal() {
        // Reset zoom state before closing
        resetImageTransform();
        
        // Close the modal
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
        
        // Remove and reattach event listeners for the next open
        removeTouchListeners();
        
        // Re-initialize the modal image
        if (products[currentProductIndex]) {
            modalImg.src = products[currentProductIndex].src;
            modalImg.style.transform = '';
        }
    }

    function preloadAdjacentImages(index) {
        // Preload next image
        if (index < products.length - 1) {
            const nextImg = new Image();
            nextImg.src = products[index + 1].src;
        }
        // Preload previous image
        if (index > 0) {
            const prevImg = new Image();
            prevImg.src = products[index - 1].src;
        }
    }

    function updateProductDetails(product) {
        if (!product || !product.details) return;
        
        const details = product.details;
        const detailItems = [
            { label: 'Description', value: details.description || 'N/A' },
            { label: 'Composition', value: details.composition || 'N/A' },
            { label: 'Key Benefits', value: details.benefits || 'N/A' },
            { label: 'Dosage', value: details.dosage || 'As directed by the physician' },
            { label: 'Packaging', value: details.packaging || 'Standard packaging' }
        ];
        
        let detailsHTML = detailItems.map((item, index) => `
            <div class="detail-item" style="--index: ${index};">
                <strong>${item.label}:</strong>
                <p>${item.value}</p>
            </div>
        `).join('');
        
        if (productDetails) {
            productDetails.innerHTML = detailsHTML;
        }
    }

    function showProduct(newIndex) {
        if (isAnimating) return;
        
        // Prevent going beyond the first or last image
        if (newIndex >= products.length) {
            return; // Stop at the last image
        } else if (newIndex < 0) {
            newIndex = 0; // Stop at the first image
        }
        
        // Don't do anything if we're already on this image or trying to go beyond boundaries
        if (newIndex === currentProductIndex || newIndex < 0 || newIndex >= products.length) return;
        
        isAnimating = true;
        const ANIM_MS = 420; // keep in sync with CSS

        // Fallback if container not found
        const container = imageContainer || modalImg.parentElement || modal;

        // Exit overlay: clone current image
        const exitImg = modalImg.cloneNode(true);
        exitImg.classList.add('img-slide', 'slide-exit');
        // Ensure transforms are cleared on the base image while animating clone
        modalImg.style.transform = '';

        // Enter overlay: next image
        const enterImg = document.createElement('img');
        enterImg.src = products[newIndex].src;
        enterImg.alt = products[newIndex].name || 'Product Image';
        enterImg.classList.add('img-slide', 'slide-enter');

        // Append overlays
        container.appendChild(exitImg);
        container.appendChild(enterImg);

        // Trigger animation
        // Force reflow
        void enterImg.offsetWidth;
        exitImg.classList.add('slide-exit-active');
        enterImg.classList.add('slide-enter-active');

        // Complete after transition
        setTimeout(() => {
            // Update state
            currentProductIndex = newIndex;
            modalImg.src = products[currentProductIndex].src;
            productName.textContent = products[currentProductIndex].name;
            updateProductDetails(products[currentProductIndex]);

            // Update nav button states
            const prevButton = document.querySelector('.prev');
            const nextButton = document.querySelector('.next');
            if (prevButton) {
                prevButton.style.opacity = currentProductIndex === 0 ? '0.5' : '1';
                prevButton.style.pointerEvents = currentProductIndex === 0 ? 'none' : 'auto';
            }
            if (nextButton) {
                nextButton.style.opacity = currentProductIndex === products.length - 1 ? '0.5' : '1';
                nextButton.style.pointerEvents = currentProductIndex === products.length - 1 ? 'none' : 'auto';
            }

            // Clean up overlays
            if (exitImg.parentNode) exitImg.parentNode.removeChild(exitImg);
            if (enterImg.parentNode) enterImg.parentNode.removeChild(enterImg);

            // Preload neighbors
            preloadAdjacentImages(currentProductIndex);
            isAnimating = false;
        }, ANIM_MS);
    }

    // Add click event to all product cards
    productCards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on a link inside the card
            if (e.target.tagName === 'A') return;
            openModal(index);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Navigation buttons
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showProduct(currentProductIndex - 1);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showProduct(currentProductIndex + 1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            e.preventDefault();
            
            switch(e.key) {
                case 'ArrowLeft':
                    showProduct(currentProductIndex - 1);
                    break;
                case 'ArrowRight':
                    showProduct(currentProductIndex + 1);
                    break;
                case 'Escape':
                    closeModal();
                    break;
            }
        }
    });
    
    // Handle window resize to ensure proper image sizing
    window.addEventListener('resize', () => {
        if (modal.style.display === 'block') {
            // Force a reflow to ensure the image is properly sized
            modalImg.style.display = 'none';
            void modalImg.offsetHeight; // Trigger reflow
            modalImg.style.display = '';
        }
    });
    
    // Swipe gesture navigation is disabled; users can navigate via buttons or keyboard.
});

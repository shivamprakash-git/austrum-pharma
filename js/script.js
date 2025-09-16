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
    const modalImg = document.getElementById('galleryImage');
    const productName = document.getElementById('galleryProductName');
    const closeBtn = document.querySelector('.close-gallery');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const productCards = document.querySelectorAll('.product-card');
    const products = [];
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    // Track zoom and pan state
    let isZoomed = false;
    let initialDistance = 0;
    let currentScale = 1;
    let startX = 0;
    let startY = 0;
    let translateX = 0;
    let translateY = 0;
    const ZOOM_THRESHOLD = 1.1; // 10% zoom threshold

    // Update image transform with current scale and position
    function updateImageTransform() {
        modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
    }

    // Reset image transform to default
    function resetImageTransform() {
        currentScale = 1;
        translateX = 0;
        translateY = 0;
        updateImageTransform();
        isZoomed = false;
    }

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
            }
            return false;
        }
        
        // Handle single touch (panning when zoomed)
        if (isZoomed && e.touches.length === 1) {
            const touch = e.touches[0];
            
            if (e.type === 'touchstart') {
                startX = touch.clientX - translateX;
                startY = touch.clientY - translateY;
            } else if (e.type === 'touchmove') {
                // Calculate new position with boundaries
                const maxX = (currentScale - 1) * modalImg.width / 2;
                const maxY = (currentScale - 1) * modalImg.height / 2;
                
                translateX = touch.clientX - startX;
                translateY = touch.clientY - startY;
                
                // Apply boundaries
                translateX = Math.min(Math.max(translateX, -maxX), maxX);
                translateY = Math.min(Math.max(translateY, -maxY), maxY);
                
                updateImageTransform();
            }
            return false;
        }
        
        return true;
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
        let lastTap = 0;
        modalImg.addEventListener('touchend', function(e) {
            // Only handle single tap for double tap detection
            if (e.touches && e.touches.length > 0) return;
            
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            
            if (tapLength < 300 && tapLength > 0) {
                // Double tap detected
                e.preventDefault();
                e.stopPropagation();
                
                if (isZoomed) {
                    // If zoomed in, zoom out
                    resetImageTransform();
                } else {
                    // If not zoomed, zoom in
                    currentScale = 2;
                    isZoomed = true;
                    updateImageTransform();
                }
            }
            lastTap = currentTime;
        });
        
        // Add click handler to modal overlay to close when clicking outside image
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Remove touch event listeners
    function removeTouchListeners() {
        modalImg.removeEventListener('touchstart', handleTouch);
        modalImg.removeEventListener('touchmove', handleTouch);
        modalImg.removeEventListener('touchend', handleTouch);
        modalImg.removeEventListener('touchcancel', handleTouch);
        modalImg.removeEventListener('gesturestart', function() {});
        
        // Reset zoom and pan state
        resetImageTransform();
    }

    productCards.forEach(card => {
        products.push({
            src: card.querySelector('img').src,
            name: card.querySelector('h3').textContent
        });
    });

    let currentProductIndex;
    let isAnimating = false;
    const animationDuration = 300; // ms

    function openModal(index) {
        currentProductIndex = index;
        modalImg.src = products[currentProductIndex].src;
        productName.textContent = products[currentProductIndex].name;
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
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Re-enable scrolling
        isZoomed = false;
        removeTouchListeners(); // Clean up touch listeners
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
        
        // Determine direction of slide (1 for right, -1 for left)
        const direction = newIndex > currentProductIndex ? 1 : -1;
        
        // Create a clone of the current image for the slide effect
        const currentImg = modalImg;
        const nextImg = document.createElement('img');
        nextImg.src = products[newIndex].src;
        nextImg.style.position = 'absolute';
        nextImg.style.top = '0';
        nextImg.style.left = direction > 0 ? '100%' : '-100%';
        nextImg.style.width = '100%';
        nextImg.style.height = 'auto';
        nextImg.style.maxHeight = '80vh';
        nextImg.style.objectFit = 'contain';
        nextImg.style.transition = 'transform 0.3s ease';
        nextImg.style.willChange = 'transform';
        
        // Add the new image to the container
        modal.appendChild(nextImg);
        
        // Position the current image for the slide
        currentImg.style.transform = `translateX(${direction * -100}%)`;
        
        // Slide in the new image
        requestAnimationFrame(() => {
            nextImg.style.transform = 'translateX(0)';
            currentImg.style.transform = `translateX(${direction * 100}%)`;
        });
        
        // After animation completes
        setTimeout(() => {
            // Update the current index
            currentProductIndex = newIndex;
            
            // Update the main image source and position
            currentImg.src = products[currentProductIndex].src;
            currentImg.style.transform = 'translateX(0)';
            productName.textContent = products[currentProductIndex].name;
            
            // Update navigation button states
            const prevButton = document.querySelector('.prev');
            const nextButton = document.querySelector('.next');
            
            // Disable previous button on first image
            if (prevButton) {
                prevButton.style.opacity = currentProductIndex === 0 ? '0.5' : '1';
                prevButton.style.pointerEvents = currentProductIndex === 0 ? 'none' : 'auto';
            }
            
            // Disable next button on last image
            if (nextButton) {
                nextButton.style.opacity = currentProductIndex === products.length - 1 ? '0.5' : '1';
                nextButton.style.pointerEvents = currentProductIndex === products.length - 1 ? 'none' : 'auto';
            }
            
            // Remove the temporary image
            modal.removeChild(nextImg);
            
            // Preload adjacent images for smoother transitions
            preloadAdjacentImages(currentProductIndex);
            
            isAnimating = false;
        }, 300); // Match this with CSS transition duration
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
    
    // Touch event handling for swiping
    const swipeThreshold = 50; // Minimum distance to trigger a swipe
    
    // Add touch events to the image for swiping
    const galleryContent = document.querySelector('.gallery-content');
    
    // Handle touch events for mobile swipe - only on the image
    modalImg.addEventListener('touchstart', (e) => {
        if (!isZoomed) { // Only handle swipe if not zoomed
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        } else {
            e.preventDefault();
        }
    }, { passive: false });

    modalImg.addEventListener('touchend', (e) => {
        if (!isZoomed) { // Only handle swipe if not zoomed
            touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;
            
            // Only handle horizontal swipes (not vertical scrolls)
            const deltaX = Math.abs(touchEndX - touchStartX);
            const deltaY = Math.abs(touchEndY - touchStartY);
            
            if (deltaX > deltaY) { // Horizontal swipe
                e.preventDefault();
                handleSwipe();
            }
        } else {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Prevent default touch behavior when zoomed
    modalImg.addEventListener('touchmove', (e) => {
        if (isZoomed) {
            e.preventDefault();
        }
    }, { passive: false });
    
    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        
        // Check if the swipe distance is significant enough
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe right - go to previous image
                showProduct(currentProductIndex - 1);
            } else {
                // Swipe left - go to next image
                showProduct(currentProductIndex + 1);
            }
        }
    }
});

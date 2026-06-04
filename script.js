
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }


    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    });


    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('nav');

    window.addEventListener('scroll', function() {
        if (navbar) {
    
            if (window.scrollY > 100) {
                navbar.classList.add('shadow-lg');
            } else {
                navbar.classList.remove('shadow-lg');
            }

      
            if (window.scrollY > lastScrollY && window.scrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollY = window.scrollY;
        }
    });

    // ============================================
    // �️ SECURITY VALIDATION FUNCTIONS (ACTIVE)
    // ============================================
    function setStatus(message, colorClass) {
        const statusText = document.getElementById('form-status');
        if (statusText) {
            statusText.textContent = message;
            statusText.className = `text-center mt-4 text-sm ${colorClass}`;
        }
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isRecaptchaVerified() {
        return window.grecaptcha && grecaptcha.getResponse().trim().length > 0;
    }


    // ============================================
    // 📬 FORM SUBMISSION HANDLER (Active)
    // 🛡️ ACTIVE SECURITY CHECKS:
    //    ✅ Honeypot Detection
    //    ✅ Field Validation
    //    ✅ Email Format Validation
    //    ✅ reCAPTCHA Check (if enabled)
    // ============================================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            setStatus('', '');

            // 🍯 SECURITY: HONEYPOT CHECK (ACTIVE)
            const website = document.getElementById('website').value.trim();
            if (website) {
                setStatus('🚨 Bot detected. Submission blocked.', 'text-red-400');
                console.warn('Honeypot field filled - bot attempt blocked');
                return;
            }

            // ✅ SECURITY: FIELD VALIDATION (ACTIVE)
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                setStatus('⚠️ Name, email, and message are required.', 'text-red-400');
                return;
            }

            // 📧 SECURITY: EMAIL FORMAT VALIDATION (ACTIVE)
            if (!validateEmail(email)) {
                setStatus('⚠️ Please enter a valid email address.', 'text-red-400');
                return;
            }

            // 🔐 SECURITY: RECAPTCHA CHECK (if enabled)
            if (document.querySelector('.g-recaptcha:not([style*="display: none"])')) {
                if (!window.grecaptcha || !isRecaptchaVerified()) {
                    setStatus('⚠️ Please complete the reCAPTCHA challenge before sending.', 'text-red-400');
                    return;
                }
            }

            // ============================================
            // ✅ SAFE DEFAULT: All validations passed
            // Log to console + clear form
            // Ready for future backend integration
            // ============================================
            console.log('✅ Form passed all security checks:', {
                name: name,
                email: email,
                message: message,
                timestamp: new Date().toISOString()
            });
            
            // Clear form inputs
            contactForm.reset();
            
            // Reset reCAPTCHA if present
            if (window.grecaptcha) {
                grecaptcha.reset();
            }
            
            // Show confirmation
            setStatus('Thank you for reaching out! 📧 Please send your message directly to: raidenvillapando623@gmail.com for the fastest response.', 'text-green-400');
        });
    }

//-------------------------------------------------

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });


    const style = document.createElement('style');
    style.textContent = `
        .animate-fade-in {
            animation: fadeIn 1s ease-in-out;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});


document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {

        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
        });
    });
});

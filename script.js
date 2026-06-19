document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       STIKY HEADER ON SCROLL
       ========================================== */
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================
       MOBILE NAV DRAWER ACTIONS
       ========================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const drawerClose = document.getElementById('drawer-close');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    const openDrawer = () => {
        mobileDrawer.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeDrawer = () => {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
    };

    mobileToggle.addEventListener('click', openDrawer);
    drawerClose.addEventListener('click', closeDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeDrawer();
        });
    });

    /* ==========================================
       HERO SECTION TYPING ANIMATION
       ========================================== */
    const typingElement = document.getElementById('typing-text');
    const roles = ["IT Manager", "Systems Engineer", "Cloud Administrator", "ERP Specialist"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeEffect = () => {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster deletion
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // normal typing
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1500; // pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    };

    typeEffect();

    /* ==========================================
       SCROLL SPY (ACTIVE NAV INDICATOR)
       ========================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const drawerLinksArray = Array.from(drawerLinks);

    const scrollSpy = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // Offset for sticky header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Update main navbar links
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Update mobile drawer links
        drawerLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Initial call

    /* ==========================================
       PROJECTS FILTERING SYSTEM
       ========================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active status from other buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // match transitions
                }
            });
        });
    });

    /* ==========================================
       CONTACT FORM SUBMISSION (WEB3FORMS)
       ========================================== */
    // TODO: Paste your Web3Forms access key inside the quotes below!
    // Get your free key at: https://web3forms.com/
    const WEB3FORMS_ACCESS_KEY = "16018d5c-a12a-47bd-8be5-3c39a4756e57";

    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const submitBtn = document.getElementById('submit-btn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Check if user has updated the placeholder key
        if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE" || !WEB3FORMS_ACCESS_KEY) {
            alert("Please paste your Web3Forms Access Key at the top of the form handler in script.js!");
            return;
        }

        // Animate button loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <i class="fa-solid fa-circle-notch fa-spin"></i>
        `;

        const formData = new FormData(contactForm);
        formData.append("access_key", WEB3FORMS_ACCESS_KEY);
        formData.append("subject", "New Contact Form Submission - CV Portfolio");
        formData.append("from_name", "CV Website Visitor");

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Fade out form
                contactForm.classList.add('hidden');
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    formSuccess.classList.add('show');
                }, 300);
            } else {
                alert("Something went wrong: " + data.message);
                submitBtn.disabled = false;
                submitBtn.innerHTML = `
                    <span>Send Message</span>
                    <i class="fa-regular fa-paper-plane"></i>
                `;
            }
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            alert("Network error: Please try again later.");
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <span>Send Message</span>
                <i class="fa-regular fa-paper-plane"></i>
            `;
        });
    });
});

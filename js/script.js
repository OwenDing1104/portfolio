// Set the current year in the footer
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.innerHTML = new Date().getFullYear();
    }
    
    // Initialize page animations
    initPageAnimations();
});

// Sidebar Toggle Functionality with Keyboard Shortcut
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const toggleIcon = sidebarToggle.querySelector('i');

    // Initialize AOS if used
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
        });
    }

    // Initial Icon Setup based on sidebar state
    if (!sidebar.classList.contains('collapsed')) {
        toggleIcon.classList.remove('fa-arrow-right');
        toggleIcon.classList.add('fa-arrow-left');
        sidebarToggle.setAttribute('aria-expanded', 'true');
    }

    sidebarToggle.addEventListener('click', function() {
        toggleSidebar();
    });

    // Keyboard Shortcut: Ctrl + B to toggle sidebar
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && (e.key === 'b' || e.key === 'B')) {
            e.preventDefault();
            toggleSidebar();
        }
    });

    function toggleSidebar() {
        sidebar.classList.toggle('collapsed');

        if (sidebar.classList.contains('collapsed')) {
            toggleIcon.classList.remove('fa-arrow-left');
            toggleIcon.classList.add('fa-arrow-right');
            sidebarToggle.setAttribute('aria-expanded', 'false');
        } else {
            toggleIcon.classList.remove('fa-arrow-right');
            toggleIcon.classList.add('fa-arrow-left');
            sidebarToggle.setAttribute('aria-expanded', 'true');
        }
    }
});

// Page-specific animations
function initPageAnimations() {
    // Get current page
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'index.html';
    
    // Add entrance animation to all pages
    document.body.classList.add('fade-in');
    
    // Home page animations
    if (pageName === 'index.html' || pageName === '') {
        animateHomeElements();
    }
    
    // Projects page animations
    else if (pageName === 'projects.html') {
        animateProjectElements();
    }
    
    // Resume page animations
    else if (pageName === 'resume.html') {
        animateResumeElements();
    }
    
    // Contact page animations
    else if (pageName === 'contact.html') {
        animateContactElements();
    }
}

// Home page specific animations
function animateHomeElements() {
    const introText = document.querySelector('.intro-text');
    const introImage = document.querySelector('.intro-image');
    const photoItems = document.querySelectorAll('.photo');
    
    if (introText) {
        introText.classList.add('slide-in-left');
    }
    
    if (introImage) {
        introImage.classList.add('slide-in-right');
    }
    
    // Staggered animation for photo gallery
    photoItems.forEach((photo, index) => {
        setTimeout(() => {
            photo.classList.add('fade-in-up');
        }, 100 * index);
    });
}

// Projects page specific animations
function animateProjectElements() {
    const projectItems = document.querySelectorAll('.project');
    
    // Staggered animation for projects
    projectItems.forEach((project, index) => {
        setTimeout(() => {
            project.classList.add('slide-in-right');
        }, 150 * index);
    });
}

// Resume page specific animations
function animateResumeElements() {
    const resumeSections = document.querySelectorAll('.resume section');
    
    // Staggered animation for resume sections
    resumeSections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('fade-in-up');
        }, 200 * index);
    });
}

// Contact page specific animations
function animateContactElements() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.classList.add('scale-in');
    }
    
    // Animate form fields one by one
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        setTimeout(() => {
            group.classList.add('slide-in-left');
        }, 100 * index);
    });
}

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(form);

            fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    form.reset(); // Reset form fields
                    successMessage.style.display = 'block'; // Show success message
                    successMessage.classList.add('bounce-in');
                    setTimeout(() => {
                        successMessage.classList.remove('bounce-in');
                        successMessage.classList.add('fade-out');
                        setTimeout(() => {
                            successMessage.style.display = 'none';
                            successMessage.classList.remove('fade-out');
                        }, 500);
                    }, 3000);
                } else {
                    return response.json().then(data => {
                        if (data.errors) {
                            alert(data.errors.map(error => error.message).join(", "));
                        } else {
                            alert('Oops! Something went wrong.');
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Oops! Something went wrong.');
            });
        });
    }
});

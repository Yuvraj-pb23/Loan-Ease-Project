// ============================
// BACKGROUND SLIDESHOW FUNCTIONALITY
// ============================

const images = [
    "../IMAGES/background1.jpg",
    "../IMAGES/background2.jpg"
];

let index = 0;
let current = document.getElementById('bg1');
let next = document.getElementById('bg2');

current.style.backgroundImage = `url('${images[0]}')`;

// Delay the zoom-in to let DOM render first
setTimeout(() => {
    current.style.opacity = "1";
    current.style.transform = "scale(1.1)";
}, 100); // Delay in milliseconds

setInterval(() => {
    index = (index + 1) % images.length;

    next.style.backgroundImage = `url('${images[index]}')`;
    next.style.opacity = "1";
    next.style.transform = "scale(1.1)";

    current.style.opacity = "0";
    current.style.transform = "scale(1)";

    [current, next] = [next, current];
}, 11000);

// ============================
// HERO SECTION TEXT SLIDESHOW
// ============================

let currentSlide = 0;
const slides = document.querySelectorAll('.bg-slide');
const evaluateText = document.querySelector('.Evaluate');
const partnerText = document.querySelector('.Partner');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? '1' : '0';
    });

    // Show relevant text
    if (index === 0) {
        evaluateText.style.display = 'block';
        partnerText.style.display = 'none';
        evaluateText.classList.add('animate-text');
        partnerText.classList.remove('animate-text');
    } else if (index === 1) {
        evaluateText.style.display = 'none';
        partnerText.style.display = 'block';
        partnerText.classList.add('animate-text');
        evaluateText.classList.remove('animate-text');
    }
}

// Initial call
showSlide(currentSlide);

// Auto slide every 11 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 11000);

// ============================
// WORD-BY-WORD TEXT ANIMATION
// ============================

document.addEventListener("DOMContentLoaded", function () {
    const head2 = document.querySelector(".head2-sub1 h3");

    if (head2) {
        // Split text into words and wrap each in a span
        const text = head2.textContent;
        const words = text.split(' ');
        head2.innerHTML = words.map(word => `<span class="word-animate">${word}</span>`).join(' ');

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const wordSpans = head2.querySelectorAll('.word-animate');
                    
                    // Animate each word with relaxed timing
                    wordSpans.forEach((span, index) => {
                        setTimeout(() => {
                            span.classList.add('animate-in');
                        }, index * 180); // 180ms delay for more relaxed flow
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.4
        });

        observer.observe(head2);
    }
});

// ============================
// DROPDOWN NAVIGATION SYSTEM
// ============================

document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-links > li');
    let activeDropdown = null;
    let closeTimeout = null;
    let isMouseOverNavArea = false;

    // Function to position dropdown using fixed positioning
    function positionDropdown(navItem, dropdown) {
        const rect = navItem.getBoundingClientRect();
        dropdown.style.left = rect.left + 'px';
        dropdown.style.top = (rect.bottom + 5) + 'px'; // 5px gap below nav item
    }

    // Function to get extended bounds for hover detection
    function getExtendedBounds(navItem, dropdown) {
        const navRect = navItem.getBoundingClientRect();
        const dropdownRect = dropdown.getBoundingClientRect();

        return {
            left: Math.min(navRect.left - 25, dropdownRect.left - 25),
            right: Math.max(navRect.right + 25, dropdownRect.right + 25),
            top: navRect.top - 15,
            bottom: Math.max(navRect.bottom + 40, dropdownRect.bottom + 15)
        };
    }

    // Function to check if mouse is within extended bounds
    function isMouseInExtendedArea(mouseX, mouseY, bounds) {
        return mouseX >= bounds.left &&
            mouseX <= bounds.right &&
            mouseY >= bounds.top &&
            mouseY <= bounds.bottom;
    }

    // Global mouse move handler for precise hover detection
    document.addEventListener('mousemove', function (e) {
        if (!activeDropdown) return;

        const navItem = activeDropdown.parentElement;
        const bounds = getExtendedBounds(navItem, activeDropdown);
        const isInArea = isMouseInExtendedArea(e.clientX, e.clientY, bounds);

        if (isInArea) {
            // Mouse is in extended hover area - keep dropdown open
            clearTimeout(closeTimeout);
            closeTimeout = null;
            isMouseOverNavArea = true;
        } else {
            // Mouse is outside extended area - start close timer
            isMouseOverNavArea = false;
            if (!closeTimeout) {
                closeTimeout = setTimeout(() => {
                    if (activeDropdown && !isMouseOverNavArea) {
                        activeDropdown.classList.remove('show');
                        activeDropdown = null;
                    }
                    closeTimeout = null;
                }, 100); // Short delay
            }
        }
    });

    // Handle window resize/scroll to reposition dropdowns
    function handlePositionUpdate() {
        if (activeDropdown) {
            const navItem = activeDropdown.parentElement;
            positionDropdown(navItem, activeDropdown);
        }
    }

    window.addEventListener('resize', handlePositionUpdate);
    window.addEventListener('scroll', handlePositionUpdate);

    navItems.forEach(navItem => {
        const dropdown = navItem.querySelector('.dropdown');
        if (!dropdown) return;

        // Function to show dropdown
        function showDropdown() {
            clearTimeout(closeTimeout);
            closeTimeout = null;
            isMouseOverNavArea = true;

            // Hide any other active dropdown
            if (activeDropdown && activeDropdown !== dropdown) {
                activeDropdown.classList.remove('show');
            }

            // Position and show this dropdown
            positionDropdown(navItem, dropdown);
            activeDropdown = dropdown;
            dropdown.classList.add('show');
        }

        // Mouse enter on nav item
        navItem.addEventListener('mouseenter', showDropdown);

        // Handle clicks and hover on dropdown items with manual animation triggers
        const dropdownItems = dropdown.querySelectorAll('li a');
        dropdownItems.forEach(item => {
            const listItem = item.parentElement;

            // Mouse enter - trigger hover animation manually
            listItem.addEventListener('mouseenter', function () {
                // Keep dropdown open
                clearTimeout(closeTimeout);
                closeTimeout = null;
                isMouseOverNavArea = true;

                // Manually trigger hover animation
                listItem.classList.add('hover-active');
            });

            // Mouse leave - remove hover animation
            listItem.addEventListener('mouseleave', function () {
                // Remove hover animation
                listItem.classList.remove('hover-active');
            });

            // Also add hover events directly on the link
            item.addEventListener('mouseenter', function () {
                clearTimeout(closeTimeout);
                closeTimeout = null;
                isMouseOverNavArea = true;
                listItem.classList.add('hover-active');
            });

            item.addEventListener('mouseleave', function () {
                listItem.classList.remove('hover-active');
            });

            item.addEventListener('click', function (e) {
                // Don't prevent default - allow navigation
                console.log('Navigating to:', this.textContent);

                // Close dropdown after click
                dropdown.classList.remove('show');
                activeDropdown = null;
            });
        });
    });

    // Close dropdown when clicking outside navigation area
    document.addEventListener('click', function (e) {
        const isNavClick = e.target.closest('.nav-links');
        if (!isNavClick && activeDropdown) {
            activeDropdown.classList.remove('show');
            activeDropdown = null;
        }
    });
});

// ============================
// IMAGE SCROLL ANIMATIONS
// ============================

document.addEventListener("DOMContentLoaded", function () {
    const image5Img = document.querySelector(".image5 img");

    if (image5Img) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    image5Img.classList.add("animate-up");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: "0px 0px -100px 0px"
        });

        observer.observe(image5Img);
    }
});

// ============================
// NUMBER COUNTING ANIMATION
// ============================

document.addEventListener("DOMContentLoaded", function () {
    const rightTextSection = document.querySelector(".Sub-Container3 .righttext");

    if (rightTextSection) {
        // Define the target numbers and their formats
        const numberElements = [
            { element: rightTextSection.querySelector("li:nth-child(1) h6"), target: 25, suffix: "+" },
            { element: rightTextSection.querySelector("li:nth-child(2) h6"), target: 50, suffix: "k" },
            { element: rightTextSection.querySelector("li:nth-child(3) h6"), target: 10, suffix: "k" }
        ];

        // Function to animate counting
        function animateCount(element, target, suffix = "", duration = 1200) {
            const start = 1;
            const increment = target / (duration / 12); // Faster frame rate
            let current = start;

            const timer = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }

                // Update the element text
                element.textContent = Math.floor(current) + suffix;
            }, 12); // Faster refresh rate
        }

        // Intersection Observer for triggering the animation
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start counting animations with staggered delays
                    numberElements.forEach((item, index) => {
                        if (item.element) {
                            setTimeout(() => {
                                animateCount(item.element, item.target, item.suffix, 1200);
                            }, index * 150); // Shorter delay between each number
                        }
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.4,
            rootMargin: "0px 0px -50px 0px"
        });

        observer.observe(rightTextSection);
    }
});

// ============================
// PORTFOLIO HOVER EFFECT
// ============================

document.addEventListener("DOMContentLoaded", function () {
    const portfolioBoxes = document.querySelectorAll(".Sub-Container5 .trans .box");
    const imageBoxes = document.querySelectorAll(".Sub-Container5 .image .box");

    // Show first image by default
    if (imageBoxes.length > 0) {
        imageBoxes[0].classList.add("show");
    }

    portfolioBoxes.forEach((box, index) => {
        // Mouse enter - show corresponding image
        box.addEventListener("mouseenter", function () {
            // Hide all images first
            imageBoxes.forEach(img => img.classList.remove("show"));
            
            // Show the corresponding image
            if (imageBoxes[index]) {
                imageBoxes[index].classList.add("show");
            }
        });

        // Mouse leave - show default (first) image
        box.addEventListener("mouseleave", function () {
            imageBoxes.forEach(img => img.classList.remove("show"));
            if (imageBoxes.length > 0) {
                imageBoxes[0].classList.add("show");
            }
        });
    });
});

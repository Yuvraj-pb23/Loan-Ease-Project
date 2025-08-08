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
// DROPDOWN NAVIGATION SYSTEM - SIMPLIFIED
// ============================

document.addEventListener('DOMContentLoaded', function () {
    // Simple dropdown functionality - let CSS handle the showing/hiding
    // This just ensures links work properly
    const dropdownLinks = document.querySelectorAll('.dropdown li a');
    
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default for placeholder links (#)
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                console.log('Placeholder link clicked:', this.textContent);
            }
            // For real links, let them navigate normally
        });
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

    // Show second image by default (index 1)
    if (imageBoxes.length > 1) {
        imageBoxes[1].classList.add("show");
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

        // Mouse leave - show default (second) image
        box.addEventListener("mouseleave", function () {
            imageBoxes.forEach(img => img.classList.remove("show"));
            if (imageBoxes.length > 1) {
                imageBoxes[1].classList.add("show");
            }
        });
    });
});

// ============================
// SUB-CONTAINER7 TESTIMONIAL NAVIGATION
// ============================

document.addEventListener("DOMContentLoaded", function () {
    const testimonialContents = document.querySelectorAll('.Sub-Container7 .c1');
    const navigationButtons = document.querySelectorAll('.Sub-Container7 .button ul li');
    let currentActiveIndex = 0;
    
    // Function to update button opacity based on active content
    function updateButtonOpacity(activeId) {
        navigationButtons.forEach((button, index) => {
            const link = button.querySelector('a');
            const buttonTarget = link.getAttribute('href').substring(1); // Remove # from href
            
            if (buttonTarget === activeId) {
                button.style.opacity = '1';
            } else {
                button.style.opacity = '0.5';
            }
        });
    }
    
    // Function to show specific testimonial content with smooth transition
    function showTestimonial(targetId) {
        const targetIndex = Array.from(testimonialContents).findIndex(content => content.id === targetId);
        
        if (targetIndex === -1 || targetIndex === currentActiveIndex) return;
        
        const currentContent = testimonialContents[currentActiveIndex];
        const targetContent = testimonialContents[targetIndex];
        
        // Start slide out animation for current content
        currentContent.classList.add('slide-out');
        currentContent.classList.remove('active');
        
        // Prepare target content for slide in
        targetContent.style.display = 'block';
        targetContent.classList.remove('slide-out');
        
        // Small delay to ensure DOM update, then slide in
        setTimeout(() => {
            targetContent.classList.add('active');
        }, 50);
        
        // Hide the old content after transition
        setTimeout(() => {
            currentContent.style.display = 'none';
            currentContent.classList.remove('slide-out');
        }, 600); // Match CSS transition duration
        
        currentActiveIndex = targetIndex;
        updateButtonOpacity(targetId);
    }
    
    // Initialize - show first testimonial and set first button active
    if (testimonialContents.length > 0) {
        testimonialContents.forEach((content, index) => {
            if (index === 0) {
                content.style.display = 'block';
                content.classList.add('active');
                currentActiveIndex = 0;
            } else {
                content.style.display = 'none';
                content.classList.remove('active');
            }
        });
        updateButtonOpacity('11');
    }
    
    // Add click event listeners to navigation buttons
    navigationButtons.forEach(button => {
        const link = button.querySelector('a');
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Remove # from href
            showTestimonial(targetId);
        });
    });
    
    // Optional: Auto-rotate testimonials every 5 seconds
    let currentTestimonialIndex = 0;
    const testimonialIds = ['11', '22', '33', '44'];
    
    setInterval(() => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialIds.length;
        showTestimonial(testimonialIds[currentTestimonialIndex]);
    }, 5000);
});

// ============================
// LOAN CALCULATOR FUNCTIONALITY
// ============================

document.addEventListener('DOMContentLoaded', function() {
    const loanAmountSlider = document.getElementById('loanAmount');
    const loanTermSlider = document.getElementById('loanTerm');
    const loanAmountValue = document.getElementById('loanAmountValue');
    const loanTermValue = document.getElementById('loanTermValue');
    const monthlyPayment = document.getElementById('monthlyPayment');
    const totalPayback = document.getElementById('totalPayback');

    // Interest rate (you can make this adjustable too)
    const annualInterestRate = 0.25; // 12% annual interest rate

    function updateSliderBackground(slider, value, min, max) {
        const percentage = ((value - min) / (max - min)) * 100;
        slider.style.background = `linear-gradient(to right, #000 0%, #000 ${percentage}%, #e0e0e0 ${percentage}%, #e0e0e0 100%)`;
    }

    function calculatePayments() {
        const principal = parseFloat(loanAmountSlider.value);
        const termInMonths = parseInt(loanTermSlider.value);
        const monthlyInterestRate = annualInterestRate / 12;

        // Calculate monthly payment using loan formula
        let monthlyPaymentAmount;
        if (monthlyInterestRate > 0) {
            monthlyPaymentAmount = principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, termInMonths)) / 
                                 (Math.pow(1 + monthlyInterestRate, termInMonths) - 1);
        } else {
            monthlyPaymentAmount = principal / termInMonths; // No interest case
        }

        const totalPaybackAmount = monthlyPaymentAmount * termInMonths;

        // Update display values
        monthlyPayment.textContent = `₹${Math.round(monthlyPaymentAmount).toLocaleString()}`;
        totalPayback.textContent = `₹${Math.round(totalPaybackAmount).toLocaleString()}`;
    }

    function updateLoanAmount() {
        const value = loanAmountSlider.value;
        loanAmountValue.textContent = `₹${parseInt(value).toLocaleString()}`;
        updateSliderBackground(loanAmountSlider, value, loanAmountSlider.min, loanAmountSlider.max);
        calculatePayments();
    }

    function updateLoanTerm() {
        const value = loanTermSlider.value;
        loanTermValue.textContent = value;
        updateSliderBackground(loanTermSlider, value, loanTermSlider.min, loanTermSlider.max);
        calculatePayments();
    }

    // Event listeners
    loanAmountSlider.addEventListener('input', updateLoanAmount);
    loanTermSlider.addEventListener('input', updateLoanTerm);

    // Initialize sliders
    updateLoanAmount();
    updateLoanTerm();
});



//SEARCH OVERLAY
  const searchIcon = document.getElementById("searchIcon");    // Get the search icon element
  const closeSearch = document.getElementById("closeSearch");    // Get the close (×) button element
  const searchOverlay = document.getElementById("searchOverlay");    // Get the search overlay element

  searchIcon.onclick = function () {    // When search icon is clicked
    searchOverlay.style.display = "block";    // Make it visible first
    setTimeout(() => {
      searchOverlay.classList.add("show");    // Add show class for animation
    }, 10); // Small delay to ensure display change is processed
    document.body.style.overflow = "hidden";
  };

  closeSearch.onclick = function () {    // When close button is clicked
    searchOverlay.classList.remove("show");    // Remove show class for animation
    setTimeout(() => {
      searchOverlay.style.display = "none";    // Hide after animation completes
    }, 600); // Match the CSS transition duration (reduced from 400ms)
    document.body.style.overflow = "";
  };

//   searchOverlay.onclick = function (e) {    // When clicking anywhere on the overlay
//     if (!e.target.closest(".panel")) {    // If the click is NOT inside the .panel (search box)
//       searchOverlay.style.display = "none";    // Hide the overlay
//       document.body.style.overflow = "";

//     }
//   };
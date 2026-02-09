document.addEventListener('DOMContentLoaded', () => {
    
    // 1. --- STICKY NAVIGATION ---
    const nav = document.getElementById('navbar');
    const header = document.querySelector('.branding-header');
    
    window.onscroll = () => {
        if (window.pageYOffset > header.offsetHeight) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    };

    // 2. --- ENHANCED AUTOMATIC SLIDESHOW ---
    let slideIndex = 1;
    let autoplayTimer;
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    
    const SLIDE_INTERVAL = 4000;

    function showSlides(n) {
        const slidesList = document.querySelectorAll(".slide");
        const dotsList = document.querySelectorAll(".dot");

        if (n > slidesList.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = slidesList.length; }

        slidesList.forEach(slide => slide.classList.remove("active"));
        dotsList.forEach(dot => dot.classList.remove("active"));

        if (slidesList.length > 0) {
            slidesList[slideIndex - 1].classList.add("active");
            dotsList[slideIndex - 1].classList.add("active");
            
            const counterSpan = document.getElementById('current-slide');
            if (counterSpan) {
                counterSpan.textContent = slideIndex;
            }
        }
    }

    function autoPlaySlides() {
        slideIndex++;
        showSlides(slideIndex);
        autoplayTimer = setTimeout(autoPlaySlides, SLIDE_INTERVAL);
    }

    window.changeSlide = function(n) {
        clearTimeout(autoplayTimer);
        slideIndex += n;
        showSlides(slideIndex);
        autoplayTimer = setTimeout(autoPlaySlides, SLIDE_INTERVAL);
    };

    window.currentSlide = function(n) {
        clearTimeout(autoplayTimer);
        slideIndex = n;
        showSlides(slideIndex);
        autoplayTimer = setTimeout(autoPlaySlides, SLIDE_INTERVAL);
    };

    // Initialize slideshow
    if (slides.length > 0) {
        document.getElementById('total-slides').textContent = slides.length;
        showSlides(slideIndex);
        autoplayTimer = setTimeout(autoPlaySlides, SLIDE_INTERVAL);
    }

    // Pause on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', () => {
            clearTimeout(autoplayTimer);
        });

        slideshowContainer.addEventListener('mouseleave', () => {
            autoplayTimer = setTimeout(autoPlaySlides, SLIDE_INTERVAL);
        });
    }

    // 3. --- DYNAMIC QUOTES ---
    const computerQuotes = [
        { text: "Everyone should learn how to program a computer, because it teaches you how to think.", author: "STEVE JOBS" },
        { text: "Education is the most powerful weapon which you can use to change the world.", author: "NELSON MANDELA" },
        { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. KING" }
    ];

    let quoteIndex = 0;
    const textDiv = document.getElementById('dynamic-quote');
    const authorDiv = document.getElementById('dynamic-author');

    function fadeQuote() {
        if (!textDiv || !authorDiv) return;

        textDiv.style.opacity = 0;
        authorDiv.style.opacity = 0;

        setTimeout(() => {
            quoteIndex = (quoteIndex + 1) % computerQuotes.length;
            textDiv.textContent = computerQuotes[quoteIndex].text;
            authorDiv.textContent = "— " + computerQuotes[quoteIndex].author;

            textDiv.style.opacity = 1;
            authorDiv.style.opacity = 1;
        }, 800); 
    }

    if (textDiv) setInterval(fadeQuote, 6000);

    // 4. --- SMOOTH SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith("#") && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const navHeight = nav.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 5. --- KEYBOARD NAVIGATION ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') window.changeSlide(-1);
        if (e.key === 'ArrowRight') window.changeSlide(1);
    });
});

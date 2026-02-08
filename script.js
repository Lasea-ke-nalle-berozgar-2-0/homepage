document.addEventListener('DOMContentLoaded', () => {
    
    // Sticky Nav
    const nav = document.getElementById('navbar');
    const header = document.querySelector('.branding-header');
    
    window.onscroll = () => {
        if (window.pageYOffset > header.offsetHeight) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    };

    // Slider Logic
    const hero = document.getElementById('hero');
    const heroTitle = document.getElementById('hero-title');
    
    const sliderData = [
        { img: 'lady-anusuya-education-academy-jhalawar-city-jhalawar-schools-dtovd186o5.jpg', title: "Shaping Future Leaders" },
        { img: 'WhatsApp Image 2026-02-08 at 11.44.57 AM.jpeg', title: "Excellence in Education" }
    ];

    let index = 0;
    setInterval(() => {
        index = (index + 1) % sliderData.length;
        hero.style.backgroundImage = `linear-gradient(rgba(0,33,71,0.4), rgba(0,33,71,0.4)), url('${sliderData[index].img}')`;
        heroTitle.textContent = sliderData[index].title;
    }, 5000);
    const computerQuotes = [
    { text: "Everyone should learn how to program a computer, because it teaches you how to think.", author: "STEVE JOBS" },
    { text: "Coding is today’s language of creativity.", author: "MARIA KLAWE" },
    { text: "The best way to predict the future is to invent it.", author: "ALAN KAY" },
    { text: "Computer science is no more about computers than astronomy is about telescopes.", author: "EDSGER DIJKSTRA" }
];

let quoteIndex = 0;
const textDiv = document.getElementById('dynamic-quote');
const authorDiv = document.getElementById('dynamic-author');

function fadeQuote() {
    // Start Fade Out
    textDiv.style.opacity = 0;
    authorDiv.style.opacity = 0;

    setTimeout(() => {
        quoteIndex = (quoteIndex + 1) % computerQuotes.length;
        
        // Change Content
        textDiv.textContent = computerQuotes[quoteIndex].text;
        authorDiv.textContent = "— " + computerQuotes[quoteIndex].author;

        // Start Fade In
        textDiv.style.opacity = 1;
        authorDiv.style.opacity = 1;
    }, 800); // Matches the CSS transition time
}
// --- Smooth Scrolling for Navigation Links ---
document.querySelectorAll('a[href^="C:\Users\tushar\Documents\VS CODE\HTML\New lasea\Contact-us-main\Contact us\index.html"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default jump behavior

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Adjust for fixed navbar height if necessary
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth' // This creates the 'aesthetic' sliding feel
            });
        }
    });
});

// Set Interval for 6 seconds
setInterval(fadeQuote, 6000);
});

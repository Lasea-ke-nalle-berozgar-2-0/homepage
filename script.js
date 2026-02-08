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
        { img: 'WhatsApp Image 2026-02-08 at 11.44.56 AM.jpeg', title: "Shaping Future Leaders" },
        { img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1500', title: "Excellence in Education" }
    ];

    let index = 0;
    setInterval(() => {
        index = (index + 1) % sliderData.length;
        hero.style.backgroundImage = `linear-gradient(rgba(0,33,71,0.4), rgba(0,33,71,0.4)), url('${sliderData[index].img}')`;
        heroTitle.textContent = sliderData[index].title;
    }, 5000);
});

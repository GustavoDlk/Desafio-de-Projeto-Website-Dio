// Autor: Gustavo Deluka

document.addEventListener('DOMContentLoaded', function () {
    console.log('Site carregado com sucesso! 🚀');

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .hero-content, section').forEach(el => {
        el.classList.add('fade-in-on-scroll');
        observer.observe(el);
    });

    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        typing();
    }

    setTimeout(() => {
        const mainTitle = document.querySelector('.hero-section h1');
        if (mainTitle) {
            const originalText = mainTitle.textContent;
            typeWriter(mainTitle, originalText, 80);
        }
    }, 1000);

    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(5, 3, 36, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '';
            navbar.style.backdropFilter = '';
        }
    });

    function animateProgress() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }

    const logoHero = document.querySelector('.logo-hero');
    if (logoHero) {
        logoHero.addEventListener('load', function () {
            this.classList.remove('logo-loading');
        });

        if (logoHero.complete) {
            logoHero.classList.remove('logo-loading');
        } else {
            logoHero.classList.add('logo-loading');
        }
    }

    let konamiCode = [];
    const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

    document.addEventListener('keydown', function (e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konami.length) {
            konamiCode.shift();
        }

        if (konamiCode.join(',') === konami.join(',')) {
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
                alert('🎉 Easter egg encontrado! Você é um verdadeiro desenvolvedor! 🎉');
            }, 2000);
        }
    });

    const icons = document.querySelectorAll('.bi');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.2) rotate(5deg)';
        });

        icon.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });
    });

    const logoImages = document.querySelectorAll('img[src*="LogoDio.png"]');
    logoImages.forEach(img => {
        img.addEventListener('error', function () {
            console.warn('Logo não carregou, usando fallback');
            this.src = 'https://via.placeholder.com/120x80/0d6efd/ffffff?text=DIO';
            this.alt = 'Logo DIO (Fallback)';
        });
    });

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    console.log('Todas as funcionalidades carregadas! ✨');

    // Funcionalidade do botão "Voltar ao Topo"
    const backToTopBtn = document.getElementById('backToTop');

    // Mostrar/esconder botão baseado na posição do scroll
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Funcionalidade de voltar ao topo
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

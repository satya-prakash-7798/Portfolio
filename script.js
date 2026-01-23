document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'light') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });

    // Custom Cursor
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Animate outline with a slight delay looks smoother
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Fade-in Animations (Simple Scroll Reveal)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Optional: Stop observing once shown
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.project-card, .section-title, .about-text');
    hiddenElements.forEach((el) => {
        el.classList.add('hidden'); // Need to add CSS for this
        observer.observe(el);
    });

    // Typing Effect Loop
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const startTyping = () => {
            typingText.classList.remove('is-typing');
            void typingText.offsetWidth; // Trigger reflow
            typingText.classList.add('is-typing');
        };

        // Initial start
        setTimeout(startTyping, 500); // Small delay on load

        // Loop every 10 seconds
        setInterval(startTyping, 10000);
    }

    // Fix for Resume Link navigation if needed
    const resumeLink = document.querySelector('a[href="resume.html"]');
    if (resumeLink) {
        resumeLink.addEventListener('click', (e) => {
            // Allow default behavior, but we can log or enforce if specific issues arise
            // e.preventDefault();
            // window.location.href = 'resume.html';
        });
    }

    // Particle Background Effect
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        // Antigravity Spacing and Colors
        const spacing = 40;
        const particleBaseSize = 1.5;
        // Colors from our CSS variable theme
        const colors = ['rgba(0, 240, 255, 0.5)', 'rgba(112, 0, 255, 0.5)', 'rgba(255, 0, 85, 0.5)', 'rgba(255, 255, 255, 0.3)'];

        // Mouse tracking for interaction
        const mouse = { x: null, y: null, radius: 150 };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        // On resize init
        window.addEventListener('resize', init);

        function init() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            createParticles();
        }

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.size = (Math.random() * particleBaseSize) + 0.5;
                this.density = (Math.random() * 30) + 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.distance = 0;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                // Repel effect (Antigravity 'push' feel)
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;

                // Max distance to interact
                let maxDistance = mouse.radius;

                // Force simulation: stronger when closer
                let force = (maxDistance - distance) / maxDistance;

                // Only interact if close enough
                // The "Direction" needs to be away from mouse
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                if (distance < maxDistance) {
                    // Move away from mouse
                    this.x -= directionX * 2;
                    this.y -= directionY * 2;
                } else {
                    // Return to original position
                    if (this.x !== this.baseX) {
                        let dxBase = this.x - this.baseX;
                        this.x -= dxBase / 20; // smooth return speed
                    }
                    if (this.y !== this.baseY) {
                        let dyBase = this.y - this.baseY;
                        this.y -= dyBase / 20;
                    }
                }

                this.draw();
            }
        }

        function createParticles() {
            particles = [];

            // Grid layout for "dot dot" feel, rather than random chaos
            // This matches the structured yet floating look of Antigravity
            for (let y = 0; y < height; y += spacing) {
                for (let x = 0; x < width; x += spacing) {
                    // Add some random offsets so it's not a perfect boring grid
                    let xPos = x + ((Math.random() - 0.5) * 20);
                    let yPos = y + ((Math.random() - 0.5) * 20);
                    particles.push(new Particle(xPos, yPos));
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Subtle global drift? Or simple connection interactions?
            // Let's stick to the mouse repulsion for the clear "effect on mouse move" behavior

            particles.forEach(particle => {
                particle.update();
            });

            requestAnimationFrame(animate);
        }

        // Boot
        init();
        animate();
    }
});

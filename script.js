document.addEventListener("DOMContentLoaded", () => {
    initializeThemeToggle();

    // Theme toggle functionality
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = 'Light Mode';
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        const isDark = body.classList.contains('dark-mode');
        themeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Success stories
    const stories = [
        {
            title: "Tech Startup Success",
            content: "She built her own tech startup focusing on AI solutions.",
            author: "Sarah Johnson"
        },
        {
            title: "Breaking Barriers",
            content: "She became a software engineer against all odds.",
            author: "Maria Rodriguez"
        },
        {
            title: "Giving Back",
            content: "She mentors young girls in coding and has helped over 100 students.",
            author: "Emily Chen"
        }
    ];

    const storyList = document.querySelector(".story-list");
    stories.forEach(story => {
        const div = document.createElement("div");
        div.classList.add("story");
        div.innerHTML = `
            <h3>${story.title}</h3>
            <p>${story.content}</p>
            <p><em>- ${story.author}</em></p>
        `;
        storyList.appendChild(div);
    });

    // Contact form handling
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(contactForm);

        // Show loading state
        const submitButton = contactForm.querySelector('button');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            formMessage.textContent = "Thank you for reaching out! We'll get back to you soon.";
            formMessage.style.color = '#4CAF50';
            contactForm.reset();
        } catch (error) {
            formMessage.textContent = "There was an error sending your message. Please try again.";
            formMessage.style.color = '#f44336';
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send';
        }
    });

    initializeThemeToggle();
    initializeNavigation();
    animateStats();
    loadEvents();

    // Add smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const nav = document.querySelector('nav ul');
        const navToggle = document.querySelector('.nav-toggle');

        if (!nav.contains(e.target) && !navToggle.contains(e.target) && nav.classList.contains('show')) {
            nav.classList.remove('show');
        }
    });

    initializeJoinForm();
});

function initializeThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");
    if (!themeToggle) return;

    const body = document.body;

    // Check saved theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '🌙';
    } else {
        themeToggle.innerHTML = '☀️';
    }

    // Theme toggle click handler with animation
    themeToggle.addEventListener("click", () => {
        themeToggle.style.transform = 'scale(0.8)';
        setTimeout(() => {
            body.classList.toggle("dark-mode");
            const isDark = body.classList.contains('dark-mode');
            themeToggle.innerHTML = isDark ? '🌙' : '☀️';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeToggle.style.transform = 'scale(1)';
        }, 100);
    });
}

function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');

    if (navToggle && nav) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            nav.classList.toggle('show');
            navToggle.innerHTML = nav.classList.contains('show') ? '✕' : '☰';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !navToggle.contains(e.target) && nav.classList.contains('show')) {
                nav.classList.remove('show');
                navToggle.innerHTML = '☰';
            }
        });

        // Close menu when clicking a link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('show');
                navToggle.innerHTML = '☰';
            });
        });
    }
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50; // Adjust for animation speed

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };

        updateCounter();
    });
}

function loadEvents() {
    const events = [
        {
            title: "Women in Tech Workshop",
            date: "2024-04-15",
            time: "14:00",
            location: "Virtual",
            description: "Learn from industry leaders about career opportunities in tech."
        },
        {
            title: "Coding Bootcamp",
            date: "2024-04-20",
            time: "10:00",
            location: "Tech Hub",
            description: "Intensive coding workshop for beginners."
        },
        {
            title: "Networking Mixer",
            date: "2024-04-25",
            time: "18:00",
            location: "Innovation Center",
            description: "Connect with other women in technology."
        }
    ];

    const eventsContainer = document.getElementById('events-container');

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');

        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        eventCard.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p>${event.description}</p>
            <button class="register-btn">Register Now</button>
        `;

        eventsContainer.appendChild(eventCard);
    });
}

// Add this new function for join form handling
function initializeJoinForm() {
    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        // Add input animation effects
        const inputs = joinForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });

        joinForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const submitButton = joinForm.querySelector('.join-button');
            submitButton.classList.add('loading');
            submitButton.disabled = true;

            try {
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Show success message with better styling
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div class="success-content">
                        <h3>Welcome to our community! 🎉</h3>
                        <p>Check your email for confirmation details.</p>
                    </div>
                `;
                document.body.appendChild(successMessage);

                setTimeout(() => {
                    successMessage.remove();
                    window.location.href = 'index.html';
                }, 2000);

                joinForm.reset();
            } catch (error) {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'There was an error. Please try again.';
                joinForm.appendChild(errorMessage);

                setTimeout(() => {
                    errorMessage.remove();
                }, 3000);
            } finally {
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
            }
        });
    }
}
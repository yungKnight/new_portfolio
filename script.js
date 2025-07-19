document.addEventListener('DOMContentLoaded', () => {
    const sectionMap = {
        'about': 'welcome',
        'projects': 'projects',
        'contact': 'contact-me'
    };

    // Handle smooth scrolling
    document.querySelectorAll('.grid-item a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const key = link.textContent.trim().toLowerCase();
            const sectionId = sectionMap[key];
            const section = document.getElementById(sectionId);
            section?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Highlight active nav item
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.id;

                document.querySelectorAll('.grid-item').forEach(item => 
                    item.classList.remove('active')
                );

                document.querySelectorAll('.grid-item a').forEach(link => {
                    const key = link.textContent.trim().toLowerCase();
                    if (sectionMap[key] === activeId) {
                        link.parentElement.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3, // triggers when 30% visible
        rootMargin: '0px 0px -10% 0px'
    });

    document.querySelectorAll('section').forEach(section => observer.observe(section));

    // Click-to-copy functionality
    function copyToClipboard(text, message = `Copied: ${text}`) {
        navigator.clipboard.writeText(text).then(() => alert(message));
    }

    const email = document.getElementById('visible-email');
    const phone = document.getElementById('phone-number');

    email?.addEventListener('click', () => copyToClipboard(email.textContent.trim(), 'Email copied!'));
    phone?.addEventListener('click', () => copyToClipboard(phone.textContent.trim(), 'Phone number copied!'));
});

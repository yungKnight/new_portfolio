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
        threshold: 0.3,
        rootMargin: '0px 0px -10% 0px'
    });

    document.querySelectorAll('section').forEach(section => observer.observe(section));

    // Click-to-copy functionality
    const copyToClipboard = (text, message = `Copied: ${text}`) =>{
        navigator.clipboard.writeText(text).then(() => alert(message));
    }

    const email = document.getElementById('visible-email');
    const phone = document.getElementById('phone-number');

    email.setAttribute('title', 'click to copy');
    email.style.cursor = 'pointer';
    email.addEventListener(
        'click', () => copyToClipboard(email.textContent.trim(), 'Email copied!')
    );

    phone.setAttribute('title', 'click to copy');
    phone.style.cursor = 'pointer';
    phone.addEventListener(
        'click', () => copyToClipboard(phone.textContent.trim(), 'Phone number copied!')
    );

    //customizations for the contact and project section(s) links
    const contactLinks = document.querySelectorAll('p a');
    const projectLinks = document.querySelectorAll('span a');
    let allLinks;
    allLinks = [...contactLinks, ...projectLinks]

    allLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        link.style.textDecoration = "none";
    })
});
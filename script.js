// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Remove loader when page is loaded
    setTimeout(function() {
        document.querySelector('.loader').classList.add('hidden');
        document.querySelector('.content').style.display = 'block';
    }, 1500);
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        if (body.hasAttribute('data-theme')) {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
    
    // Play click sound on button hover
    const buttons = document.querySelectorAll('.link-button');
    const clickSound = document.getElementById('click-sound');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            clickSound.currentTime = 0;
            clickSound.play().catch(e => console.log('Audio play failed:', e));
        });
        
        // Add animation delay for each button
        button.style.animationDelay = `${Math.random() * 0.5}s`;
    });
    
    // Animate tasbih text
    const tasbih = document.querySelector('.tasbih');
    tasbih.style.opacity = '0';
    
    setTimeout(() => {
        tasbih.style.transition = 'opacity 1s ease';
        tasbih.style.opacity = '1';
    }, 1000);
    
    // Prevent right-click and keyboard shortcuts
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showToast('حقوق النشر محفوظة. لا يُسمح بنسخ المحتوى.');
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'F12' || 
            (event.ctrlKey && event.shiftKey && event.key === 'I') || 
            (event.ctrlKey && event.shiftKey && event.key === 'J') || 
            (event.ctrlKey && event.key === 'U')) {
            event.preventDefault();
            showToast('تم تعطيل هذه الاختصارات لأسباب أمنية.');
        }
    });
    
    // Show toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.link-button, header, footer');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.animation = 'fadeIn 0.5s ease forwards';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});

// Register service worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

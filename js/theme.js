document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle elements
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for user preference in localStorage with Safari fallback
    let savedTheme;
    
    try {
        // Try to get from localStorage
        savedTheme = localStorage.getItem('theme');
    } catch (e) {
        // If localStorage fails (e.g., Safari private mode)
        console.log('localStorage not available, using fallback');
        savedTheme = null;
    }
    
    // Function to apply a theme with Safari fallback
    function applyTheme(theme) {
        // Apply theme to HTML element
        htmlElement.setAttribute('data-theme', theme);
        
        // Try to store the theme preference
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {
            console.log('Could not save theme preference');
            // For Safari in private mode, we can still use the theme during the session
        }
        
        // Also set a class on body as a fallback for Safari
        document.body.className = 'theme-' + theme;
    }
    
    // Apply saved theme or check system preference
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Check if user prefers dark mode using multiple methods for compatibility
        let prefersDarkMode = false;
        
        // Try standard media query
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            prefersDarkMode = true;
        }
        // Additional check for Safari
        else if (window.matchMedia && window.matchMedia('(-apple-system-dark-mode)').matches) {
            prefersDarkMode = true;
        }
        
        applyTheme(prefersDarkMode ? 'dark' : 'light');
    }
    
    // Make sure theme toggle is visible
    if (themeToggle) {
        themeToggle.style.display = 'flex';
    }
    
    // Toggle theme on button click with error handling
    themeToggle.addEventListener('click', () => {
        let currentTheme = htmlElement.getAttribute('data-theme') || 
                          (document.body.className.includes('theme-dark') ? 'dark' : 'light');
                          
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
    
    // Listen for system theme changes with Safari fallback
    try {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Use addEventListener if available (newer browsers)
        if (darkModeMediaQuery.addEventListener) {
            darkModeMediaQuery.addEventListener('change', e => {
                // Only change theme automatically if user hasn't set a preference
                let userHasPreference = false;
                try {
                    userHasPreference = localStorage.getItem('theme') !== null;
                } catch (err) {
                    userHasPreference = false;
                }
                
                if (!userHasPreference) {
                    applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        } 
        // Fall back to deprecated addListener for older browsers
        else if (darkModeMediaQuery.addListener) {
            darkModeMediaQuery.addListener(e => {
                // Similar logic for older browsers
                let userHasPreference = false;
                try {
                    userHasPreference = localStorage.getItem('theme') !== null;
                } catch (err) {
                    userHasPreference = false;
                }
                
                if (!userHasPreference) {
                    applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    } catch (e) {
        console.log('Could not add media query listener');
    }
});

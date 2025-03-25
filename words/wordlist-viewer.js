/**
 * Word List Viewer
 * Loads and displays the wordlist from CSV, with filtering and sorting
 */
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const table = document.getElementById('wordlist-table');
    const tbody = document.getElementById('wordlist-body');
    const levelFilter = document.getElementById('level-filter');
    const searchInput = document.getElementById('search-input');
    const wordCountDisplay = document.getElementById('word-count');
    const levelStats = document.querySelectorAll('.level-stat span');
    
    // Pagination elements
    const paginationContainer = document.getElementById('pagination');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const currentPageDisplay = document.getElementById('current-page');
    const totalPagesDisplay = document.getElementById('total-pages');
    const pageSizeSelect = document.getElementById('page-size');
    
    // State variables
    let words = [];
    let filteredWords = [];
    let sortField = 'word';
    let sortDirection = 'asc';
    let currentPage = 1;
    let pageSize = parseInt(pageSizeSelect.value);
    
    // Initialize the viewer
    initWordlistViewer();
    
    /**
     * Initialize the wordlist viewer
     */
    function initWordlistViewer() {
        // Add event listeners
        levelFilter.addEventListener('change', resetAndDisplayWords);
        searchInput.addEventListener('input', resetAndDisplayWords);
        pageSizeSelect.addEventListener('change', function() {
            pageSize = parseInt(this.value);
            resetAndDisplayWords();
        });
        
        // Pagination button listeners
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayWords();
                updatePaginationControls();
            }
        });
        
        nextPageBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(filteredWords.length / pageSize);
            if (currentPage < totalPages) {
                currentPage++;
                displayWords();
                updatePaginationControls();
            }
        });
        
        // Set up sorting
        document.querySelectorAll('th.sortable').forEach(th => {
            th.addEventListener('click', () => {
                const field = th.getAttribute('data-sort');
                
                // Toggle sort direction if clicking the same column
                if (field === sortField) {
                    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
                } else {
                    sortField = field;
                    sortDirection = 'asc';
                }
                
                // Update UI
                document.querySelectorAll('th').forEach(header => {
                    header.classList.remove('sort-asc', 'sort-desc');
                });
                th.classList.add(sortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
                
                // Re-display words with new sorting
                resetAndDisplayWords();
            });
        });
        
        // Load words from the wordlist module
        loadWords();
    }
    
    /**
     * Reset to first page and redisplay
     */
    function resetAndDisplayWords() {
        currentPage = 1;
        filterAndDisplayWords();
    }
    
    /**
     * Load words from the wordlist module
     */
    function loadWords() {
        // Use a polling approach since the words might not be loaded immediately
        const checkWordlist = setInterval(() => {
            try {
                // Get all words from all levels
                const elementary = window.getWordsByLevel('elementary') || [];
                const middle = window.getWordsByLevel('middle') || [];
                const high = window.getWordsByLevel('high') || [];
                const staff = window.getWordsByLevel('staff') || [];
                
                // If we have words, process them
                if (elementary.length > 0 || middle.length > 0 || high.length > 0 || staff.length > 0) {
                    clearInterval(checkWordlist);
                    
                    // Combine all levels and add length property
                    words = [...elementary, ...middle, ...high, ...staff].map(word => ({
                        ...word,
                        length: word.word.length
                    }));
                    
                    // Update stats and display words
                    updateStats();
                    filterAndDisplayWords();
                }
            } catch (e) {
                console.error('Error checking wordlist:', e);
            }
        }, 300);
        
        // Set a timeout to stop checking after a certain period
        setTimeout(() => {
            clearInterval(checkWordlist);
            if (words.length === 0) {
                handleError('Timed out waiting for wordlist to load.');
            }
        }, 10000);
    }
    
    /**
     * Filter and display words based on current filters
     */
    function filterAndDisplayWords() {
        const level = levelFilter.value;
        const searchText = searchInput.value.toLowerCase().trim();
        
        // Filter by level and search text
        filteredWords = words.filter(word => {
            const levelMatch = level === 'all' || word.level === level;
            const searchMatch = !searchText || word.word.toLowerCase().includes(searchText);
            return levelMatch && searchMatch;
        });
        
        // Sort the filtered words
        sortWords();
        
        // Update the displayed count
        wordCountDisplay.textContent = `Showing ${filteredWords.length} of ${words.length} words`;
        
        // Update pagination controls
        updatePaginationControls();
        
        // Display the words
        displayWords();
    }
    
    /**
     * Sort the filtered words based on current sort settings
     */
    function sortWords() {
        filteredWords.sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];
            
            // Handle string vs number comparison
            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }
            
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }
    
    /**
     * Update pagination controls based on current state
     */
    function updatePaginationControls() {
        const totalPages = Math.max(1, Math.ceil(filteredWords.length / pageSize));
        currentPage = Math.min(currentPage, totalPages);
        
        // Update page displays
        currentPageDisplay.textContent = currentPage;
        totalPagesDisplay.textContent = totalPages;
        
        // Enable/disable buttons
        prevPageBtn.disabled = currentPage <= 1;
        nextPageBtn.disabled = currentPage >= totalPages;
        
        // Show/hide pagination based on if it's needed
        paginationContainer.style.display = totalPages > 1 ? 'flex' : 'none';
    }
    
    /**
     * Display the filtered and sorted words in the table
     */
    function displayWords() {
        // Clear existing rows
        tbody.innerHTML = '';
        
        if (filteredWords.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.setAttribute('colspan', '3');
            td.textContent = 'No matching words found.';
            td.classList.add('loading');
            tr.appendChild(td);
            tbody.appendChild(tr);
            return;
        }
        
        // Calculate pagination slice
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize, filteredWords.length);
        const pageWords = filteredWords.slice(startIndex, endIndex);
        
        // Add rows for each word
        pageWords.forEach(word => {
            const tr = document.createElement('tr');
            
            const wordCell = document.createElement('td');
            wordCell.textContent = word.word;
            tr.appendChild(wordCell);
            
            const levelCell = document.createElement('td');
            levelCell.textContent = capitalizeFirstLetter(word.level);
            levelCell.classList.add(`level-${word.level}`);
            tr.appendChild(levelCell);
            
            const lengthCell = document.createElement('td');
            lengthCell.textContent = word.length;
            tr.appendChild(lengthCell);
            
            tbody.appendChild(tr);
        });
    }
    
    /**
     * Update the stats display with word counts per level
     */
    function updateStats() {
        const counts = {
            elementary: words.filter(w => w.level === 'elementary').length,
            middle: words.filter(w => w.level === 'middle').length,
            high: words.filter(w => w.level === 'high').length,
            staff: words.filter(w => w.level === 'staff').length
        };
        
        // Update the level stat counters
        levelStats.forEach(stat => {
            const level = stat.parentElement.getAttribute('data-level');
            stat.textContent = counts[level] || 0;
        });
    }
    
    /**
     * Handle errors loading or displaying the wordlist
     */
    function handleError(message) {
        tbody.innerHTML = '';
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.setAttribute('colspan', '3');
        td.innerHTML = `<div class="error-message">
            <i class="ri-error-warning-line"></i> Error: ${message}
            <p>Please try refreshing the page. If the problem persists, the wordlist CSV may not be available.</p>
        </div>`;
        td.classList.add('loading');
        tr.appendChild(td);
        tbody.appendChild(tr);
        
        wordCountDisplay.textContent = 'Error loading words';
    }
    
    /**
     * Helper function to capitalize the first letter of a string
     */
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});

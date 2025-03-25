/**
 * Wordlist loader and manager
 * Loads words from CSV file and provides functions to access them by level
 */

(function() {
    // Internal wordlist will be populated after CSV is loaded
    let wordlist = [];
    
    // Flag to track if the CSV has been loaded
    let isLoaded = false;
    
    // Flag to track if there was an error loading
    let hasError = false;
    
    // Error message to display if loading fails
    let errorMessage = '';
    
    // Queue of callbacks to execute once the wordlist is loaded
    const callbacks = [];
    
    // Load the CSV file when the script is first executed
    loadWordListFromCSV();
    
    /**
     * Loads the wordlist from the CSV file, first trying local path then remote URL
     */
    function loadWordListFromCSV() {
        // First try loading from local path
        console.log('Attempting to load wordlist from local path: data/wordlist.csv');
        
        fetch('words/wordlist.csv')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load local wordlist: ${response.status} ${response.statusText}`);
                }
                console.log('Successfully loaded wordlist from local path');
                return response.text();
            })
            .then(csvText => {
                handleSuccessfulLoad(csvText);
            })
            .catch(error => {
                console.warn('Local wordlist load failed, trying remote URL:', error);
                
                // Try loading from the website URL as fallback
                loadWordListFromRemoteURL();
            });
    }
    
    /**
     * Attempts to load the wordlist from the remote URL as a fallback
     */
    function loadWordListFromRemoteURL() {
        console.log('Attempting to load wordlist from remote URL: https://passphrase.school/data/wordlist.csv');
        
        fetch('https://passphrase.school/data/wordlist.csv')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load remote wordlist: ${response.status} ${response.statusText}`);
                }
                console.log('Successfully loaded wordlist from remote URL');
                return response.text();
            })
            .then(csvText => {
                handleSuccessfulLoad(csvText);
            })
            .catch(error => {
                console.error('Both local and remote wordlist loads failed:', error);
                handleLoadError(error);
            });
    }
    
    /**
     * Handles successful CSV load
     */
    function handleSuccessfulLoad(csvText) {
        try {
            parseCSV(csvText);
            isLoaded = true;
            
            // Execute any callbacks that were waiting for the data
            callbacks.forEach(callback => {
                try {
                    callback(null, true);
                } catch(e) {
                    console.error('Error in callback:', e);
                }
            });
        } catch (error) {
            console.error('Error parsing CSV:', error);
            handleLoadError(error);
        }
    }
    
    /**
     * Handles errors from loading the wordlist
     */
    function handleLoadError(error) {
        hasError = true;
        errorMessage = error.message;
        
        // Execute callbacks with error
        callbacks.forEach(callback => {
            try {
                callback(error, false);
            } catch(e) {
                console.error('Error in error callback:', e);
            }
        });
        
        // Display error on page if possible
        const generator = document.getElementById('generator');
        if (generator) {
            generator.innerHTML = `
                <div class="error-message" style="color: var(--danger-color); text-align: center; padding: 2rem;">
                    <h3>Error Loading Word List</h3>
                    <p>${errorMessage}</p>
                    <p>Attempted to load from both local path and https://passphrase.school/data/wordlist.csv</p>
                </div>
            `;
        }
    }
    
    /**
     * Parses CSV text into word objects
     */
    function parseCSV(csvText) {
        const lines = csvText.split('\n');
        
        // Skip the header row if it exists
        const startIndex = lines[0].toLowerCase().includes('word') ? 1 : 0;
        
        for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            const columns = line.split(',');
            if (columns.length >= 2) {
                const word = columns[0].trim();
                const level = columns[1].trim().toLowerCase();
                
                // Only add if word and level are valid
                if (word && level) {
                    wordlist.push({
                        word: word,
                        level: level
                    });
                }
            }
        }
        
        // Verify that we loaded at least some words
        if (wordlist.length === 0) {
            throw new Error("CSV file was loaded but no valid words were found");
        }
        
        // Verify that we have words for each level
        const levels = ["elementary", "middle", "high", "staff"];
        for (const level of levels) {
            if (!wordlist.some(word => word.level === level)) {
                console.warn(`Warning: No words found for level "${level}"`);
            }
        }
    }
    
    /**
     * Gets all words for a specific educational level
     */
    function getWordsByLevel(level) {
        return ensureDataIsReady((error) => {
            if (error) return [];
            
            // Filter words only from the specified level
            return wordlist.filter(word => word.level === level);
        });
    }
    
    /**
     * Gets words for a specific educational level and all levels below it
     * (e.g., "middle" would include both middle and elementary school words)
     */
    function getWordsByLevelCumulative(level) {
        return ensureDataIsReady((error) => {
            if (error) return [];
            
            const levelHierarchy = {
                "elementary": 0,
                "middle": 1,
                "high": 2,
                "staff": 3
            };
            
            const targetLevel = levelHierarchy[level] || 0;
            
            // Get all words up to and including the target level
            return wordlist.filter(word => {
                const wordLevel = levelHierarchy[word.level] || 0;
                return wordLevel <= targetLevel;
            });
        });
    }
    
    /**
     * Helper function to ensure the wordlist data is ready
     * If the data is not yet loaded, it returns an empty array
     * and adds the callback to be executed when data is ready
     */
    function ensureDataIsReady(callback) {
        if (isLoaded) {
            return callback(hasError ? new Error(errorMessage) : null);
        } else if (hasError) {
            return callback(new Error(errorMessage));
        } else {
            // Queue the callback to run when data is available
            callbacks.push(callback);
            return [];
        }
    }
    
    /**
     * Checks if a combination of words could be inappropriate
     */
    function isBadCombination(word1, word2) {
        // Convert to lowercase for case-insensitive comparison
        word1 = word1.toLowerCase();
        word2 = word2.toLowerCase();
        
        // Simple check for common inappropriate pairings
        // This list can be expanded as needed
        const badPairs = [
            ['hot', 'dog'],
            ['blue', 'ball'],
            ['big', 'bang'],
            ['happy', 'ending']
            // Add more combinations as needed
        ];
        
        for (const pair of badPairs) {
            if ((word1 === pair[0] && word2 === pair[1]) || 
                (word1 === pair[1] && word2 === pair[0])) {
                return true;
            }
        }
        
        return false;
    }
    
    // Expose the functions to the window object
    window.getWordsByLevel = getWordsByLevel;
    window.getWordsByLevelCumulative = getWordsByLevelCumulative;
    window.isBadCombination = isBadCombination;
})();
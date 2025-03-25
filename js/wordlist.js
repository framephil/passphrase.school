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
    
    // Log loading status for debugging
    console.log('Initializing wordlist.js - attempting to load wordlist.csv');
    
    // Load the CSV file when the script is first executed
    loadWordListFromCSV();
    
    /**
     * Loads the wordlist from the CSV file
     */
    function loadWordListFromCSV() {
        // Try different relative paths since the issue might be with the path
        const possiblePaths = ['data/wordlist.csv', '/data/wordlist.csv', './data/wordlist.csv', '../data/wordlist.csv'];
        
        // Log the current location for debugging
        console.log('Current script location: ' + window.location.href);
        
        // Try the first path
        tryLoadCSV(possiblePaths, 0);
    }
    
    /**
     * Try loading CSV from multiple possible paths
     */
    function tryLoadCSV(paths, index) {
        if (index >= paths.length) {
            // We've tried all paths and failed
            const error = new Error("Failed to load wordlist.csv from any of the attempted paths");
            handleLoadError(error);
            return;
        }
        
        const path = paths[index];
        console.log(`Attempting to load from: ${path}`);
        
        fetch(path)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load wordlist from ${path}: ${response.status} ${response.statusText}`);
                }
                console.log(`Successfully fetched CSV from ${path}`);
                return response.text();
            })
            .then(csvText => {
                console.log(`CSV data received, length: ${csvText.length} characters`);
                parseCSV(csvText);
                isLoaded = true;
                
                // Execute any callbacks that were waiting for the data
                console.log(`Executing ${callbacks.length} waiting callbacks`);
                callbacks.forEach(callback => {
                    try {
                        callback(null);
                    } catch(e) {
                        console.error('Error in callback:', e);
                    }
                });
                // Clear the callbacks array
                callbacks.length = 0;
            })
            .catch(error => {
                console.warn(`Failed to load from ${path}: ${error.message}`);
                // Try the next path
                tryLoadCSV(paths, index + 1);
            });
    }
    
    /**
     * Handle a critical loading error after all paths have been tried
     */
    function handleLoadError(error) {
        console.error('Error loading wordlist:', error);
        hasError = true;
        errorMessage = error.message;
        
        // Execute callbacks with error
        callbacks.forEach(callback => {
            try {
                callback(error);
            } catch(e) {
                console.error('Error in error callback:', e);
            }
        });
        // Clear the callbacks array
        callbacks.length = 0;
        
        // Display error on page if possible
        const generator = document.getElementById('generator');
        if (generator) {
            generator.innerHTML = `
                <div class="error-message" style="color: var(--danger-color); text-align: center; padding: 2rem;">
                    <h3>Error Loading Word List</h3>
                    <p>${errorMessage}</p>
                    <p>Please check that the CSV file exists at data/wordlist.csv</p>
                    <p>Technical details: This error occurred after trying multiple possible paths.</p>
                </div>
            `;
        }
    }
    
    /**
     * Parses CSV text into word objects
     */
    function parseCSV(csvText) {
        const lines = csvText.split('\n');
        console.log(`Parsing CSV with ${lines.length} lines`);
        
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
        
        console.log(`Successfully loaded ${wordlist.length} words`);
        
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
        
        // Log sample of words for debugging
        console.log("Sample words:", wordlist.slice(0, 5));
    }
    
    /**
     * Gets all words for a specific educational level
     */
    function getWordsByLevel(level) {
        return ensureDataIsReady((error) => {
            if (error) {
                console.error(`Error getting words for level ${level}:`, error);
                return [];
            }
            
            // Filter words only from the specified level
            const result = wordlist.filter(word => word.level === level);
            console.log(`Retrieved ${result.length} words for level "${level}"`);
            return result;
        });
    }
    
    /**
     * Gets words for a specific educational level and all levels below it
     * (e.g., "middle" would include both middle and elementary school words)
     */
    function getWordsByLevelCumulative(level) {
        return ensureDataIsReady((error) => {
            if (error) {
                console.error(`Error getting cumulative words for level ${level}:`, error);
                return [];
            }
            
            const levelHierarchy = {
                "elementary": 0,
                "middle": 1,
                "high": 2,
                "staff": 3
            };
            
            const targetLevel = levelHierarchy[level] || 0;
            
            // Get all words up to and including the target level
            const result = wordlist.filter(word => {
                const wordLevel = levelHierarchy[word.level] || 0;
                return wordLevel <= targetLevel;
            });
            
            console.log(`Retrieved ${result.length} cumulative words for level "${level}" and below`);
            return result;
        });
    }
    
    /**
     * Helper function to ensure the wordlist data is ready
     * If the data is not yet loaded, it adds the callback to be executed when data is ready
     * and returns an empty array in the meantime
     */
    function ensureDataIsReady(callback) {
        if (isLoaded) {
            // Data is already loaded, execute callback immediately
            return callback(hasError ? new Error(errorMessage) : null);
        } else {
            // Data is not loaded yet, queue the callback and return empty array
            callbacks.push(callback);
            console.log(`Data not ready yet. Added callback to queue. Total callbacks waiting: ${callbacks.length}`);
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
    
    // Export for debugging
    window.debugWordlist = {
        getStatus: function() {
            return {
                isLoaded,
                hasError,
                errorMessage,
                wordCount: wordlist.length,
                callbackCount: callbacks.length
            };
        }
    };
})();
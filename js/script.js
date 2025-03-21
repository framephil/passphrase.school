document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const levelButtons = document.querySelectorAll('.level-btn');
    const levelDisclaimers = document.querySelectorAll('.level-disclaimer');
    const generatorContainer = document.getElementById('generator');
    const wordCountInput = document.getElementById('wordCount');
    const separatorSelect = document.getElementById('separator');
    const generateBtn = document.getElementById('generateBtn');
    const passphraseResult = document.getElementById('passphraseResult');
    const toggleOptionsBtn = document.getElementById('toggleOptions');
    const optionsPanel = document.getElementById('optionsPanel');
    const optionsToggle = document.getElementById('optionsToggle');
    const capitalizationSelect = document.getElementById('capitalization');
    const numberPlacementSelect = document.getElementById('numberPlacement');
    const disableAnimationsCheckbox = document.getElementById('disableAnimations');
    
    // Store the selected complexity level
    let selectedLevel = 'middle'; // default to middle school
    
    // Load saved options from localStorage if available
    loadSavedOptions();
    
    // Level selection buttons
    levelButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update selected level
            selectedLevel = this.getAttribute('data-level');
            
            // Highlight the selected button and unhighlight others
            levelButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show the corresponding disclaimer and hide others
            levelDisclaimers.forEach(disclaimer => {
                if (disclaimer.getAttribute('data-level') === selectedLevel) {
                    disclaimer.classList.add('visible');
                } else {
                    disclaimer.classList.remove('visible');
                }
            });
            
            // Show the generator UI with animation
            generatorContainer.classList.remove('hidden');
            setTimeout(() => {
                generatorContainer.classList.add('slide-in');
            }, 50);
            
            // Update word count based on level
            if (wordCountInput) {
                updateWordCountByLevel(selectedLevel);
            }
            
            // Generate a passphrase immediately upon level selection
            generatePassphrase();
        });
    });
    
    // Update word count input based on educational level
    function updateWordCountByLevel(level) {
        if (wordCountInput) {
            switch(level) {
                case 'elementary':
                    wordCountInput.value = 2;
                    break;
                case 'middle':
                    wordCountInput.value = 3;
                    break;
                case 'high':
                    wordCountInput.value = 3;
                    break;
                case 'staff':
                    wordCountInput.value = 4;
                    break;
                default:
                    wordCountInput.value = 3;
            }
        }
    }
    
    // Generate passphrase when the button is clicked
    generateBtn.addEventListener('click', generatePassphrase);
    
    // Toggle advanced options panel and save the state
    optionsToggle.addEventListener('click', function() {
        optionsPanel.classList.toggle('visible');
        toggleOptionsBtn.textContent = optionsPanel.classList.contains('visible') ? '-' : '+';
        
        // Save the panel state to localStorage
        try {
            localStorage.setItem('optionsPanelOpen', optionsPanel.classList.contains('visible'));
        } catch (e) {
            console.log('Could not save panel state');
        }
    });
    
    // Save options when they change
    if (separatorSelect) {
        separatorSelect.addEventListener('change', saveOptions);
    }
    if (capitalizationSelect) {
        capitalizationSelect.addEventListener('change', saveOptions);
    }
    if (numberPlacementSelect) {
        numberPlacementSelect.addEventListener('change', saveOptions);
    }
    if (disableAnimationsCheckbox) {
        disableAnimationsCheckbox.addEventListener('change', saveOptions);
    }
    
    // Function to save all options to localStorage
    function saveOptions() {
        try {
            if (separatorSelect) localStorage.setItem('separator', separatorSelect.value);
            if (capitalizationSelect) localStorage.setItem('capitalization', capitalizationSelect.value);
            if (numberPlacementSelect) localStorage.setItem('numberPlacement', numberPlacementSelect.value);
            if (disableAnimationsCheckbox) localStorage.setItem('disableAnimations', disableAnimationsCheckbox.checked);
        } catch (e) {
            console.log('Could not save options to localStorage');
        }
    }
    
    // Function to load saved options from localStorage
    function loadSavedOptions() {
        try {
            // Load options panel state
            const panelOpen = localStorage.getItem('optionsPanelOpen') === 'true';
            if (panelOpen) {
                optionsPanel.classList.add('visible');
                toggleOptionsBtn.textContent = '-';
            }
            
            // Load separator option
            if (separatorSelect && localStorage.getItem('separator')) {
                separatorSelect.value = localStorage.getItem('separator');
            }
            
            // Load capitalization option
            if (capitalizationSelect && localStorage.getItem('capitalization')) {
                capitalizationSelect.value = localStorage.getItem('capitalization');
            }
            
            // Load number placement option
            if (numberPlacementSelect && localStorage.getItem('numberPlacement')) {
                numberPlacementSelect.value = localStorage.getItem('numberPlacement');
            }
            
            // Load animations setting
            if (disableAnimationsCheckbox && localStorage.getItem('disableAnimations')) {
                disableAnimationsCheckbox.checked = localStorage.getItem('disableAnimations') === 'true';
            }
        } catch (e) {
            console.log('Could not load saved options');
        }
    }
    
    // Copy passphrase to clipboard on click
    passphraseResult.addEventListener('click', function() {
        if (this.textContent) {
            // Create a temporary textarea to copy from
            const textarea = document.createElement('textarea');
            textarea.value = this.textContent;
            document.body.appendChild(textarea);
            
            // Select and copy
            textarea.select();
            document.execCommand('copy');
            
            // Remove the textarea
            document.body.removeChild(textarea);
            
            // Visual feedback - store original content
            const originalText = this.textContent;
            this.classList.add('copied-animation');
            this.textContent = 'Copied to clipboard!';
            
            // Restore original text after delay
            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('copied-animation');
            }, 1500);
        }
    });

    // Generate passphrase function
    function generatePassphrase() {
        // Get all selected options
        const separatorOption = separatorSelect.value;
        const capitalization = capitalizationSelect.value;
        const numberPlacement = numberPlacementSelect ? numberPlacementSelect.value : 'end';
        const disableAnimations = disableAnimationsCheckbox ? disableAnimationsCheckbox.checked : false;
        
        // Get appropriate word count based on level
        let wordCount;
        let highlightColor;
        let digitCount = 1; // Default digit count
        let minWordLength = 0; // No minimum by default
        
        switch(selectedLevel) {
            case 'elementary':
                wordCount = 2;
                highlightColor = 'var(--elementary-color)';
                // For elementary, prefer shorter words
                minWordLength = 0; // No minimum - will use short words from elementary level
                break;
            case 'middle':
                wordCount = 2; // Changed to 2 words for middle school
                minWordLength = 5; // But ensure they're longer words (5+ chars)
                highlightColor = 'var(--middle-color)';
                break;
            case 'high':
                wordCount = 3;
                highlightColor = 'var(--high-color)';
                digitCount = 2; // High school gets 2 digits
                break;
            case 'staff':
                wordCount = 4; // Ensure staff always gets 4 words
                highlightColor = 'var(--staff-color)';
                digitCount = 2; // Staff gets 2 digits
                break;
            default:
                wordCount = 3;
                highlightColor = 'var(--primary-color)';
        }
        
        // Update the word count in the input if it exists
        if (wordCountInput) {
            wordCountInput.value = wordCount;
        }
        
        // Get words from the wordlist based on the selected level
        let words = window.getWordsByLevelCumulative(selectedLevel);
        
        // Filter words by length if needed (for middle school)
        if (minWordLength > 0) {
            words = words.filter(wordObj => wordObj.word.length >= minWordLength);
        }
        
        // For elementary, explicitly prefer shorter words
        if (selectedLevel === 'elementary') {
            words = words.filter(wordObj => wordObj.level === 'elementary' && wordObj.word.length <= 5);
        }
        
        // Generate random words - with safeguards against unwanted combinations
        let passphrase = [];
        let usedWords = new Set();
        
        // Keep generating words until we have enough unique words
        while (passphrase.length < wordCount) {
            const randomIndex = Math.floor(Math.random() * words.length);
            const selectedWord = words[randomIndex].word;
            
            // Skip if word is already used
            if (usedWords.has(selectedWord)) continue;
            
            // Skip inappropriate combinations
            if (passphrase.length > 0) {
                const lastWord = passphrase[passphrase.length - 1];
                if (window.isBadCombination(lastWord, selectedWord)) continue;
            }
            
            passphrase.push(selectedWord);
            usedWords.add(selectedWord);
        }
        
        // Apply capitalization based on the selected option
        switch (capitalization) {
            case 'first':
                passphrase[0] = capitalizeWord(passphrase[0]);
                // Make sure all other words are lowercase
                for (let i = 1; i < passphrase.length; i++) {
                    passphrase[i] = passphrase[i].toLowerCase();
                }
                break;
            case 'none':
                passphrase = passphrase.map(word => word.toLowerCase());
                break;
            case 'all':
                passphrase = passphrase.map(word => capitalizeWord(word));
                break;
            case 'random':
                // First make all words lowercase
                passphrase = passphrase.map(word => word.toLowerCase());
                // Then capitalize a random word
                const randomIndex = Math.floor(Math.random() * passphrase.length);
                passphrase[randomIndex] = capitalizeWord(passphrase[randomIndex]);
                break;
        }
        
        // Apply separator(s)
        let result;
        
        // If random separator option is selected, apply different separators
        if (separatorOption === 'random') {
            const separators = [' ', '-', '.', '_']; // Available separators
            result = '';
            for (let i = 0; i < passphrase.length; i++) {
                result += passphrase[i];
                if (i < passphrase.length - 1) {
                    // Select a random separator for each word
                    const randSep = separators[Math.floor(Math.random() * separators.length)];
                    result += randSep;
                }
            }
        } else {
            // Use the selected separator consistently
            result = passphrase.join(separatorOption);
        }
        
        // Generate the number(s) to add
        let numberStr = '';
        if (digitCount === 1) {
            numberStr = generateSingleDigitNumber();
        } else {
            numberStr = generateSafeNumberCombination();
        }
        
        // Add numbers based on placement option
        if (numberPlacement === 'random' && passphrase.length > 0) {
            // Insert numbers at a random position
            const insertPosition = Math.floor(Math.random() * (passphrase.length + 1));
            
            // Split the result into parts
            if (separatorOption === 'random') {
                // For random separators, we need to rebuild using the passphrase array
                let newResult = '';
                const separators = [' ', '-', '.', '_'];
                
                for (let i = 0; i < passphrase.length; i++) {
                    // Insert numbers if we're at the right position
                    if (i === insertPosition) {
                        newResult += numberStr;
                        // Add a separator if not at the beginning
                        if (i > 0) {
                            newResult = newResult.slice(0, -1); // Remove the last separator
                        }
                        if (i < passphrase.length) {
                            newResult += separators[Math.floor(Math.random() * separators.length)];
                        }
                    }
                    
                    newResult += passphrase[i];
                    // Add a separator if not at the end
                    if (i < passphrase.length - 1) {
                        newResult += separators[Math.floor(Math.random() * separators.length)];
                    }
                }
                
                // If insertion point is at the end, add numbers
                if (insertPosition === passphrase.length) {
                    newResult += numberStr;
                }
                
                result = newResult;
            } else {
                // For consistent separators, we can use the existing result string
                const parts = result.split(separatorOption);
                parts.splice(insertPosition, 0, numberStr);
                result = parts.join(separatorOption);
            }
        } else {
            // Default: add numbers at the end
            result += numberStr;
        }
        
        // Ensure the passphrase meets the minimum length requirement
        while (result.length < 8) {
            result += generateSingleDigitNumber();
        }
        
        // Display the passphrase with or without animation
        if (disableAnimations) {
            passphraseResult.textContent = result;
            adjustPassphraseSize();
        } else {
            animatePassphrase(result, highlightColor, wordCount, capitalization, separatorOption);
        }
    }
    
    // Function to capitalize the first letter of a word
    function capitalizeWord(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    
    // Generate a single safe number (allowing all digits including 6 and 9)
    function generateSingleDigitNumber() {
        // Generate a single-digit number (0-9)
        const num = Math.floor(Math.random() * 10);
        return num.toString();
    }

    // Generate a safe two-digit number combination
    function generateSafeNumberCombination() {
        const unsafeCombinations = ['69', '96', '13', '666', '420', '123', '911', '666', '88']; // Unsafe combinations
        
        let numberCombo;
        do {
            // Generate two random digits (0-9) without restrictions
            const firstDigit = Math.floor(Math.random() * 10);
            const secondDigit = Math.floor(Math.random() * 10);
            
            numberCombo = firstDigit.toString() + secondDigit.toString();
            // Check if the combination is in our unsafe list
        } while (unsafeCombinations.includes(numberCombo));
        
        return numberCombo;
    }

    // Function to adjust font size based on content
    function adjustPassphraseSize() {
        // Reset classes first
        passphraseResult.classList.remove('smaller-text', 'smallest-text');
        
        // Check if the text is overflowing
        const isOverflowing = passphraseResult.scrollWidth > passphraseResult.clientWidth ||
                             passphraseResult.scrollHeight > passphraseResult.clientHeight;
        
        if (isOverflowing) {
            // Try adding the smaller-text class first
            passphraseResult.classList.add('smaller-text');
            
            // Check if it's still overflowing
            setTimeout(() => {
                const stillOverflowing = passphraseResult.scrollWidth > passphraseResult.clientWidth ||
                                      passphraseResult.scrollHeight > passphraseResult.clientHeight;
                
                if (stillOverflowing) {
                    // Try even smaller text
                    passphraseResult.classList.remove('smaller-text');
                    passphraseResult.classList.add('smallest-text');
                }
            }, 50);
        }
    }

    // Function to animate the passphrase
    function animatePassphrase(finalPassphrase, highlightColor, wordCount, capitalization, separator) {
        const animationDuration = 1000; // 1 second
        const intervalDuration = 100; // 0.1 second
        const iterations = animationDuration / intervalDuration;
        let currentIteration = 0;

        // Add translucent effect during animation
        passphraseResult.classList.add('generating-animation');

        const interval = setInterval(() => {
            if (currentIteration >= iterations) {
                clearInterval(interval);
                // Update the textContent instead of value
                passphraseResult.textContent = finalPassphrase;
                passphraseResult.style.setProperty('--highlight-color', highlightColor);
                
                // Remove translucent effect when animation completes
                passphraseResult.classList.remove('generating-animation');
                
                passphraseResult.classList.add('grow-shrink-animation');
                
                // Check and adjust font size if needed
                adjustPassphraseSize();
                
                setTimeout(() => {
                    passphraseResult.classList.remove('grow-shrink-animation');
                }, 500);
            } else {
                // Update the textContent instead of value
                passphraseResult.textContent = generateRandomPassphraseForAnimation(wordCount, capitalization, separator);
                currentIteration++;
            }
        }, intervalDuration);
    }

    // Function to generate a random passphrase for animation
    function generateRandomPassphraseForAnimation(wordCount, capitalization, separator) {
        let randomWords = [];
        const words = window.getWordsByLevelCumulative(selectedLevel);
        let digitCount = (selectedLevel === 'high' || selectedLevel === 'staff') ? 2 : 1;
        let minWordLength = (selectedLevel === 'middle') ? 5 : 0;
        
        // Filter words by length if needed (for middle school)
        let filteredWords = words;
        if (minWordLength > 0) {
            filteredWords = words.filter(wordObj => wordObj.word.length >= minWordLength);
        }
        
        // For elementary, explicitly prefer shorter words
        if (selectedLevel === 'elementary') {
            filteredWords = words.filter(wordObj => wordObj.level === 'elementary' && wordObj.word.length <= 5);
        }

        for (let i = 0; i < wordCount; i++) {
            const randomIndex = Math.floor(Math.random() * filteredWords.length);
            randomWords.push(filteredWords[randomIndex].word);
        }

        // Apply capitalization based on the selected option
        switch (capitalization) {
            case 'first':
                randomWords[0] = capitalizeWord(randomWords[0]);
                // Make sure all other words are lowercase
                for (let i = 1; i < randomWords.length; i++) {
                    randomWords[i] = randomWords[i].toLowerCase();
                }
                break;
            case 'none':
                randomWords = randomWords.map(word => word.toLowerCase());
                break;
            case 'all':
                randomWords = randomWords.map(word => capitalizeWord(word));
                break;
            case 'random':
                // First make all words lowercase
                randomWords = randomWords.map(word => word.toLowerCase());
                // Then capitalize a random word
                const randomIndex = Math.floor(Math.random() * randomWords.length);
                randomWords[randomIndex] = capitalizeWord(randomWords[randomIndex]);
                break;
        }

        // Update to handle random separators
        let result;
        if (separator === 'random') {
            const separators = [' ', '-', '.', '_'];
            result = '';
            for (let i = 0; i < randomWords.length; i++) {
                result += randomWords[i];
                if (i < randomWords.length - 1) {
                    const randSep = separators[Math.floor(Math.random() * separators.length)];
                    result += randSep;
                }
            }
        } else {
            result = randomWords.join(separator);
        }
        
        // Update to handle random number placement
        const numberPlacement = numberPlacementSelect ? numberPlacementSelect.value : 'end';
        let digits = '';
        
        if (digitCount === 1) {
            digits = generateSingleDigitNumber();
        } else {
            digits = generateSafeNumberCombination();
        }
        
        if (numberPlacement === 'random' && randomWords.length > 0) {
            const insertPosition = Math.floor(Math.random() * (randomWords.length + 1));
            
            if (separator === 'random') {
                // Similar logic as in the main function for random separators
                // ...simplified for animation...
                const randomPosition = Math.floor(Math.random() * (result.length + 1));
                result = result.slice(0, randomPosition) + digits + result.slice(randomPosition);
            } else {
                const parts = result.split(separator);
                parts.splice(insertPosition, 0, digits);
                result = parts.join(separator);
            }
        } else {
            result += digits;
        }
        
        // Ensure minimum length
        while (result.length < 8) {
            result += generateSingleDigitNumber();
        }
        
        return result;
    }

    // Also adjust size after window resize
    window.addEventListener('resize', adjustPassphraseSize);
});
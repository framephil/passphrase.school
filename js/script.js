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
    
    // Store the selected complexity level
    let selectedLevel = 'middle'; // default to middle school
    
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
    
    // Toggle advanced options
    optionsToggle.addEventListener('click', function() {
        optionsPanel.classList.toggle('visible');
        toggleOptionsBtn.textContent = optionsPanel.classList.contains('visible') ? '-' : '+';
    });
    
    // Copy passphrase to clipboard on click
    passphraseResult.addEventListener('click', function() {
        if (this.value) {
            // Store original value
            const originalValue = this.value;
            
            // Select the text for copying
            this.select();
            document.execCommand('copy');
            
            // Visual feedback - change text and add animation
            this.classList.add('copied-animation');
            this.value = 'Copied to clipboard!';
            
            // Restore original text after delay
            setTimeout(() => {
                this.value = originalValue;
                this.classList.remove('copied-animation');
            }, 1500);
        }
    });

    // Generate passphrase function
    function generatePassphrase() {
        const separator = separatorSelect.value;
        const capitalization = capitalizationSelect.value;
        
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
                wordCount = 4;
                highlightColor = 'var(--staff-color)';
                digitCount = 2; // Staff gets 2 digits
                break;
            default:
                wordCount = 3;
                highlightColor = 'var(--primary-color)';
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
                break;
            case 'none':
                passphrase = passphrase.map(word => word.toLowerCase());
                break;
            case 'all':
                passphrase = passphrase.map(word => capitalizeWord(word));
                break;
            case 'random':
                const randomIndex = Math.floor(Math.random() * passphrase.length);
                passphrase[randomIndex] = capitalizeWord(passphrase[randomIndex]);
                break;
        }
        
        // Join with the selected separator
        let result = passphrase.join(separator);
        
        // Add random digits based on level
        if (digitCount === 1) {
            // For elementary and middle: just add one safe digit
            result += generateSingleDigitNumber();
        } else {
            // For high school and staff: add two digits that don't form unwanted combinations
            result += generateSafeNumberCombination();
        }
        
        // Ensure the passphrase meets the minimum length requirement
        while (result.length < 8) {
            result += generateSingleDigitNumber();
        }
        
        // Enforce maximum length of 30 characters
        if (result.length > 30) {
            // Try to shorten by removing words from the end
            while (passphrase.length > 2 && result.length > 30) {
                passphrase.pop();
                result = passphrase.join(separator);
                
                // Re-add the digits
                if (digitCount === 1) {
                    result += generateSingleDigitNumber();
                } else {
                    result += generateSafeNumberCombination();
                }
            }
            
            // If still too long, truncate to 30 characters
            if (result.length > 30) {
                result = result.substring(0, 30);
            }
        }
        
        // Display the passphrase with animation
        animatePassphrase(result, highlightColor, wordCount, capitalization, separator);
    }
    
    // Function to capitalize the first letter of a word
    function capitalizeWord(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    
    // Generate a single safe number (avoiding potentially problematic numbers)
    function generateSingleDigitNumber() {
        let num;
        do {
            // Generate a single-digit number
            num = Math.floor(Math.random() * 10);
        } while (num === 6 || num === 9);  // Directly check for unsafe digits
        
        return num.toString(); // Ensure the number is a single character string
    }

    // Generate a safe two-digit number combination
    function generateSafeNumberCombination() {
        const unsafeCombinations = ['69', '96', '13', '666', '420', '123', '911', '666', '88']; // Unsafe combinations
        
        let numberCombo;
        do {
            // Generate two separate digits
            let firstDigit, secondDigit;
            do {
                firstDigit = Math.floor(Math.random() * 10);
            } while (firstDigit === 6 || firstDigit === 9);
            
            do {
                secondDigit = Math.floor(Math.random() * 10);
            } while (secondDigit === 6 || secondDigit === 9);
            
            numberCombo = firstDigit.toString() + secondDigit.toString();
            // Check if the combination is in our unsafe list
        } while (unsafeCombinations.includes(numberCombo));
        
        return numberCombo;
    }

    // Function to animate the passphrase
    function animatePassphrase(finalPassphrase, highlightColor, wordCount, capitalization, separator) {
        const animationDuration = 1000; // 1 second
        const intervalDuration = 100; // 0.1 second
        const iterations = animationDuration / intervalDuration;
        let currentIteration = 0;

        const interval = setInterval(() => {
            if (currentIteration >= iterations) {
                clearInterval(interval);
                passphraseResult.value = finalPassphrase;
                passphraseResult.style.setProperty('--highlight-color', highlightColor);
                passphraseResult.classList.add('grow-shrink-animation');
                setTimeout(() => {
                    passphraseResult.classList.remove('grow-shrink-animation');
                }, 500);
            } else {
                passphraseResult.value = generateRandomPassphraseForAnimation(wordCount, capitalization, separator);
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
                break;
            case 'none':
                randomWords = randomWords.map(word => word.toLowerCase());
                break;
            case 'all':
                randomWords = randomWords.map(word => capitalizeWord(word));
                break;
            case 'random':
                const randomIndex = Math.floor(Math.random() * randomWords.length);
                randomWords[randomIndex] = capitalizeWord(randomWords[randomIndex]);
                break;
        }

        let result = randomWords.join(separator);
        
        // Add digits based on level
        if (digitCount === 1) {
            // For elementary and middle: just add one safe digit
            result += generateSingleDigitNumber();
        } else {
            // For high school and staff: add two digits that don't form unwanted combinations
            result += generateSafeNumberCombination();
        }

        // Ensure the passphrase meets the minimum length requirement
        while (result.length < 8) {
            result += generateSingleDigitNumber();
        }
        
        // Apply 30-character limit
        if (result.length > 30) {
            result = result.substring(0, 30);
        }

        return result;
    }
});
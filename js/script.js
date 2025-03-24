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
    const printBtn = document.getElementById('printBtn'); // Add reference to print button
    
    // Store the selected complexity level and generation timestamp
    let selectedLevel = 'middle'; // default to middle school
    let generationTimestamp = ''; // Track when the passphrase was generated
    
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
            
            // Generate a passphrase immediately upon level selection
            generatePassphrase();
            
            // Scroll the passphrase into view after animations complete
            setTimeout(scrollToPassphraseResult, 600);
        });
    });
    
    // Function to scroll the passphrase result into view
    function scrollToPassphraseResult() {
        // Scroll directly to the generator container instead of the disclaimer
        generatorContainer.scrollIntoView({
            behavior: 'smooth',
            block: 'center' // Center the generator container in the viewport
        });
    }
    
    // Generate passphrase when the button is clicked
    generateBtn.addEventListener('click', function() {
        generatePassphrase();
        // Remove scrolling behavior for the generate button
        // No scrolling needed when generating a new passphrase
    });
    
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

    // Print button functionality
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            printPassphrase();
        });
    }
    
    // Function to print just the passphrase
    function printPassphrase() {
        if (!passphraseResult.textContent || passphraseResult.textContent === 'Copied to clipboard!') {
            return; // Don't print if there's no passphrase or if it shows the copied message
        }
        
        const passphrase = passphraseResult.textContent;
        // Use the stored generation timestamp instead of the current time
        const timestamp = generationTimestamp || 'Unknown time'; 
        
        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Your Passphrase</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 20px;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    .passphrase-container {
                        margin-top: 20px;
                    }
                    .passphrase-label {
                        font-weight: bold;
                        font-size: 12pt;
                        margin-bottom: 8px;
                    }
                    .passphrase {
                        font-size: 14pt;
                        font-weight: bold;
                        padding: 10px;
                        border: 1px solid #ccc;
                        border-radius: 5px;
                        background-color: #f9f9f9;
                        word-break: break-all;
                        max-width: 100%;
                        margin-bottom: 8px;
                    }
                    .timestamp {
                        font-size: 10pt;
                        color: #666;
                        font-style: italic;
                    }
                    @media print {
                        .passphrase {
                            border: none;
                            background: none;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="passphrase-container">
                    <div class="passphrase-label">Your passphrase is:</div>
                    <div class="passphrase">${passphrase}</div>
                    <div class="timestamp">Generated on: ${timestamp}</div>
                </div>
                <script>
                    // Automatically print and close after loading
                    window.onload = function() {
                        window.print();
                        // Close the window after printing (timeout gives time for print dialog)
                        setTimeout(function() {
                            window.close();
                        }, 500);
                    };
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    }

    // Generate passphrase function
    function generatePassphrase() {
        // Update the generation timestamp
        const currentDate = new Date();
        generationTimestamp = currentDate.toLocaleDateString() + ' ' + currentDate.toLocaleTimeString();
        
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
                minWordLength = 4; // But ensure they're longer words (5+ chars)
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
        
        // Also get words ONLY from the current level to ensure we use at least one
        let currentLevelWords = window.getWordsByLevel(selectedLevel);
        
        // Filter words by length if needed (for middle school)
        if (minWordLength > 0) {
            words = words.filter(wordObj => wordObj.word.length >= minWordLength);
            currentLevelWords = currentLevelWords.filter(wordObj => wordObj.word.length >= minWordLength);
        }
        
        // For elementary, explicitly prefer shorter words
        if (selectedLevel === 'elementary') {
            words = words.filter(wordObj => wordObj.level === 'elementary' && wordObj.word.length <= 5);
            currentLevelWords = currentLevelWords.filter(wordObj => wordObj.word.length <= 5);
        }
        
        // Make sure we have words from the current level
        if (currentLevelWords.length === 0) {
            currentLevelWords = words.filter(wordObj => wordObj.level === selectedLevel);
        }
        
        // Generate random words - with safeguards against unwanted combinations
        let passphrase = [];
        let usedWords = new Set();
        
        // First, select one word from the current grade level
        if (currentLevelWords.length > 0) {
            let attempts = 0;
            let selectedWord = '';
            
            // Try to find a suitable word from the current level
            while (attempts < 10 && selectedWord === '') {
                const randomIndex = getSecureRandomInt(0, currentLevelWords.length - 1);
                const candidateWord = currentLevelWords[randomIndex].word;
                
                // Skip if word is already used (shouldn't happen on first word)
                if (usedWords.has(candidateWord)) {
                    attempts++;
                    continue;
                }
                
                selectedWord = candidateWord;
            }
            
            if (selectedWord !== '') {
                passphrase.push(selectedWord);
                usedWords.add(selectedWord);
            }
        }
        
        // Now fill the rest with words from the cumulative list
        while (passphrase.length < wordCount) {
            const randomIndex = getSecureRandomInt(0, words.length - 1);
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
                const randomIndex = getSecureRandomInt(0, passphrase.length - 1);
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
                    const randSep = separators[getSecureRandomInt(0, separators.length - 1)];
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
            const insertPosition = getSecureRandomInt(0, passphrase.length);
            
            // Ensure we're using the correct digit count (for debugging)
            console.log('Selected digit count:', digitCount);
            console.log('Generated number string:', numberStr);
            
            // Split the result into parts
            if (separatorOption === 'random') {
                // For random separators, we need to rebuild using the passphrase array
                let newResult = '';
                const separators = [' ', '-', '.', '_'];
                
                // Create a copy of the passphrase array and insert the number at the right position
                const modifiedPassphrase = [...passphrase];
                modifiedPassphrase.splice(insertPosition, 0, numberStr);
                
                // Now build the result with random separators
                for (let i = 0; i < modifiedPassphrase.length; i++) {
                    newResult += modifiedPassphrase[i];
                    
                    // Add random separator if not at the end
                    if (i < modifiedPassphrase.length - 1) {
                        const randSep = separators[getSecureRandomInt(0, separators.length - 1)];
                        newResult += randSep;
                    }
                }
                
                result = newResult;
            } else {
                // For consistent separators, we can use the existing result string
                const parts = result.split(separatorOption);
                parts.splice(insertPosition, 0, numberStr);
                result = parts.join(separatorOption);
            }
        } else {
            // Default: add numbers at the end with separator in front
            if (separatorOption === 'random') {
                const separators = [' ', '-', '.', '_'];
                const randSep = separators[getSecureRandomInt(0, separators.length - 1)];
                result += randSep + numberStr;
            } else {
                result += separatorOption + numberStr;
            }
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
    
    // Generate a single safe number using cryptographically secure random generation
    function generateSingleDigitNumber() {
        // Use Crypto API for secure random number generation
        if (window.crypto && window.crypto.getRandomValues) {
            const array = new Uint8Array(1);
            window.crypto.getRandomValues(array);
            // Modulo 10 to get a digit between 0-9
            return (array[0] % 10).toString();
        } else {
            // Fallback to Math.random() if Crypto API is not available
            console.warn("Crypto API not available, using Math.random() instead");
            return Math.floor(Math.random() * 10).toString();
        }
    }

    // Generate a safe two-digit number combination using cryptographically secure random generation
    function generateSafeNumberCombination() {
        const unsafeCombinations = ['69', '96', '13', '666', '420', '123', '911', '666', '88']; // Unsafe combinations
        
        let numberCombo;
        do {
            // Generate two random digits using crypto API
            if (window.crypto && window.crypto.getRandomValues) {
                const array = new Uint8Array(2);
                window.crypto.getRandomValues(array);
                const firstDigit = array[0] % 10;
                const secondDigit = array[1] % 10;
                numberCombo = firstDigit.toString() + secondDigit.toString();
            } else {
                // Fallback to Math.random()
                console.warn("Crypto API not available, using Math.random() instead");
                const firstDigit = Math.floor(Math.random() * 10);
                const secondDigit = Math.floor(Math.random() * 10);
                numberCombo = firstDigit.toString() + secondDigit.toString();
            }
            // Check if the combination is in our unsafe list
        } while (unsafeCombinations.includes(numberCombo));
        
        return numberCombo;
    }

    // Helper function for secure random integer in range [min, max]
    function getSecureRandomInt(min, max) {
        if (window.crypto && window.crypto.getRandomValues) {
            // Create byte array large enough to hold our value
            const range = max - min + 1;
            const bytesNeeded = Math.ceil(Math.log2(range) / 8);
            const maxValue = Math.pow(256, bytesNeeded);
            const array = new Uint8Array(bytesNeeded);
            
            let value;
            do {
                window.crypto.getRandomValues(array);
                value = 0;
                for (let i = 0; i < bytesNeeded; i++) {
                    value = (value << 8) + array[i];
                }
                // We discard values outside our range to avoid modulo bias
            } while (value >= maxValue - (maxValue % range));
            
            return min + (value % range);
        } else {
            // Fallback to Math.random()
            console.warn("Crypto API not available, using Math.random() instead");
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
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

        // Wrap text content in a span for better control
        passphraseResult.innerHTML = '<span></span>';
        const textSpan = passphraseResult.querySelector('span');
        
        // Add frosted glass effect during animation
        passphraseResult.classList.add('generating-animation');

        const interval = setInterval(() => {
            if (currentIteration >= iterations) {
                clearInterval(interval);
                
                // For the final reveal, keep the data-text attribute with the final text
                // but don't remove the generating-animation class yet
                passphraseResult.setAttribute('data-text', finalPassphrase);
                
                // Update the span text (which remains hidden until animation completes)
                textSpan.textContent = finalPassphrase;
                
                // Set the highlight color
                passphraseResult.style.setProperty('--highlight-color', highlightColor);
                
                // Use a slight delay before showing the final passphrase
                setTimeout(() => {
                    // Now remove the generating class to reveal the text
                    passphraseResult.classList.remove('generating-animation');
                    
                    // Replace with final text directly (no more spans needed)
                    passphraseResult.innerHTML = finalPassphrase;
                    
                    // Add reveal animation
                    passphraseResult.classList.add('reveal-animation');
                    
                    // Add grow-shrink animation after reveal
                    setTimeout(() => {
                        passphraseResult.classList.remove('reveal-animation');
                        passphraseResult.classList.add('grow-shrink-animation');
                        
                        // Check and adjust font size if needed
                        adjustPassphraseSize();
                        
                        setTimeout(() => {
                            passphraseResult.classList.remove('grow-shrink-animation');
                        }, 500);
                    }, 400);
                }, 200); // 200ms delay to observe final blurred state
                
            } else {
                // Generate the random text for animation
                const randomText = generateRandomPassphraseForAnimation(wordCount, capitalization, separator);
                
                // Update the text content in the span
                textSpan.textContent = randomText;
                
                // Also set the data-text attribute for the ::after pseudo-element
                passphraseResult.setAttribute('data-text', randomText);
                
                currentIteration++;
            }
        }, intervalDuration);
    }

    // Function to generate a random passphrase for animation
    function generateRandomPassphraseForAnimation(wordCount, capitalization, separator) {
        let randomWords = [];
        const words = window.getWordsByLevelCumulative(selectedLevel);
        const currentLevelWords = window.getWordsByLevel(selectedLevel);
        let digitCount = (selectedLevel === 'high' || selectedLevel === 'staff') ? 2 : 1;
        let minWordLength = (selectedLevel === 'middle') ? 5 : 0;
        
        // Filter words by length if needed
        let filteredWords = words;
        let filteredCurrentLevelWords = currentLevelWords;
        
        if (minWordLength > 0) {
            filteredWords = words.filter(wordObj => wordObj.word.length >= minWordLength);
            filteredCurrentLevelWords = currentLevelWords.filter(wordObj => wordObj.word.length >= minWordLength);
        }
        
        // For elementary, explicitly prefer shorter words
        if (selectedLevel === 'elementary') {
            filteredWords = words.filter(wordObj => wordObj.level === 'elementary' && wordObj.word.length <= 5);
            filteredCurrentLevelWords = currentLevelWords.filter(wordObj => wordObj.level === 'elementary' && wordObj.word.length <= 5);
        }

        // First, add one word from the current level
        if (filteredCurrentLevelWords.length > 0) {
            const randomIndex = getSecureRandomInt(0, filteredCurrentLevelWords.length - 1);
            randomWords.push(filteredCurrentLevelWords[randomIndex].word);
        }

        // Fill the remaining words from the cumulative list
        while (randomWords.length < wordCount) {
            const randomIndex = getSecureRandomInt(0, filteredWords.length - 1);
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
                const randomIndex = getSecureRandomInt(0, randomWords.length - 1);
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
                    const randSep = separators[getSecureRandomInt(0, separators.length - 1)];
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
            const insertPosition = getSecureRandomInt(0, randomWords.length);
            
            if (separator === 'random') {
                // Use a similar approach as the main function for consistency
                const modifiedWords = [...randomWords]; 
                modifiedWords.splice(insertPosition, 0, digits);
                
                // Build result with random separators
                const separators = [' ', '-', '.', '_'];
                result = '';
                
                for (let i = 0; i < modifiedWords.length; i++) {
                    result += modifiedWords[i];
                    if (i < modifiedWords.length - 1) {
                        const randSep = separators[getSecureRandomInt(0, separators.length - 1)];
                        result += randSep;
                    }
                }
            } else {
                const parts = result.split(separator);
                parts.splice(insertPosition, 0, digits);
                result = parts.join(separator);
            }
        } else {
            // Default: add numbers at the end with separator in front
            if (separator === 'random') {
                const separators = [' ', '-', '.', '_'];
                const randSep = separators[getSecureRandomInt(0, separators.length - 1)];
                result += randSep + digits;
            } else {
                result += separator + digits;
            }
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
/**
 * API Endpoint for Passphrase Generation
 * 
 * Usage: 
 * /api/generate?level=elementary&separator=-&capitalization=first
 * 
 * Parameters:
 * - level: elementary, middle, high, staff (default: middle)
 * - separator: space, dash, period, underscore (default: space)
 * - capitalization: first, none, all, random (default: first)
 */

// Import the wordlist
const wordlistPath = '../js/wordlist.js';

// Define the API function that processes requests
function handleRequest(req, res) {
    // Enable CORS for all origins
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    // Parse query parameters
    const url = new URL(req.url, `http://${req.headers.host}`);
    const params = url.searchParams;
    
    // Extract parameters with defaults
    const level = params.get('level') || 'middle';
    const separatorInput = params.get('separator') || 'space';
    const capitalization = params.get('capitalization') || 'first';
    
    // Map separator input to actual separator character
    const separatorMap = {
        'space': ' ',
        'dash': '-',
        'hyphen': '-',
        'period': '.',
        'dot': '.',
        'underscore': '_'
    };
    
    const separator = separatorMap[separatorInput.toLowerCase()] || ' ';
    
    try {
        // Generate passphrase
        const result = generatePassphrase(level, separator, capitalization);
        
        // Return JSON response
        res.statusCode = 200;
        res.end(JSON.stringify({
            success: true,
            passphrase: result.passphrase,
            level: level,
            wordCount: result.wordCount,
            separator: separator,
            capitalization: capitalization
        }));
    } catch (error) {
        // Handle errors
        res.statusCode = 400;
        res.end(JSON.stringify({
            success: false, 
            error: error.message || 'Unknown error'
        }));
    }
}

// Function to generate a passphrase
function generatePassphrase(level, separator, capitalization) {
    // Define parameters based on level
    let wordCount;
    let digitCount = 1;
    let minWordLength = 0;
    
    switch(level) {
        case 'elementary':
            wordCount = 2;
            minWordLength = 0;
            break;
        case 'middle':
            wordCount = 2;
            minWordLength = 5;
            break;
        case 'high':
            wordCount = 3;
            digitCount = 2;
            break;
        case 'staff':
            wordCount = 4;
            digitCount = 2;
            break;
        default:
            throw new Error('Invalid level specified');
    }
    
    // Get appropriate words for the level
    const words = getWordsByLevel(level, minWordLength);
    
    // Generate unique random words
    const passphrase = [];
    const usedWords = new Set();
    
    while (passphrase.length < wordCount) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const selectedWord = words[randomIndex].word;
        
        // Skip if word is already used
        if (usedWords.has(selectedWord)) continue;
        
        // Skip inappropriate combinations
        if (passphrase.length > 0) {
            const lastWord = passphrase[passphrase.length - 1];
            if (isBadCombination(lastWord, selectedWord)) continue;
        }
        
        passphrase.push(selectedWord);
        usedWords.add(selectedWord);
    }
    
    // Apply capitalization
    let processedPassphrase = applyCapitalization(passphrase, capitalization);
    
    // Join words with separator
    let result = processedPassphrase.join(separator);
    
    // Add digits
    if (digitCount === 1) {
        result += generateSingleDigit();
    } else {
        result += generateSafeNumberCombination();
    }
    
    // Ensure minimum length
    while (result.length < 8) {
        result += generateSingleDigit();
    }
    
    return {
        passphrase: result,
        wordCount: wordCount
    };
}

// Helper functions (simplified versions of the ones in script.js)
function getWordsByLevel(level, minWordLength) {
    // This would normally use the wordList from wordlist.js
    // For API demo, we'll use a simplified version
    const wordList = require(wordlistPath);
    
    // Get appropriate words based on level
    let words;
    switch (level) {
        case "staff":
            words = wordList.filter(wordObj => 
                ["elementary", "middle", "high", "staff"].includes(wordObj.level));
            break;
        case "high":
            words = wordList.filter(wordObj => 
                ["elementary", "middle", "high"].includes(wordObj.level));
            break;
        case "middle":
            words = wordList.filter(wordObj => 
                ["elementary", "middle"].includes(wordObj.level));
            break;
        case "elementary":
        default:
            words = wordList.filter(wordObj => wordObj.level === "elementary");
    }
    
    // Apply minimum word length filter if needed
    if (minWordLength > 0) {
        words = words.filter(wordObj => wordObj.word.length >= minWordLength);
    }
    
    // For elementary, prefer shorter words
    if (level === 'elementary') {
        words = words.filter(wordObj => 
            wordObj.level === 'elementary' && wordObj.word.length <= 5);
    }
    
    return words;
}

function isBadCombination(word1, word2) {
    // This would normally use the function from wordlist.js
    const unwantedCombinations = [['blue', 'ball']];
    
    const word1Lower = word1.toLowerCase();
    const word2Lower = word2.toLowerCase();
    
    for (let pair of unwantedCombinations) {
        if ((word1Lower === pair[0] && word2Lower === pair[1]) || 
            (word1Lower === pair[1] && word2Lower === pair[0])) {
            return true;
        }
    }
    
    return false;
}

function applyCapitalization(words, capitalization) {
    const result = [...words]; // Create a copy to avoid modifying the original
    
    switch (capitalization) {
        case 'first':
            result[0] = capitalizeWord(result[0]);
            for (let i = 1; i < result.length; i++) {
                result[i] = result[i].toLowerCase();
            }
            break;
        case 'none':
            return result.map(word => word.toLowerCase());
        case 'all':
            return result.map(word => capitalizeWord(word));
        case 'random':
            const processedWords = result.map(word => word.toLowerCase());
            const randomIndex = Math.floor(Math.random() * processedWords.length);
            processedWords[randomIndex] = capitalizeWord(processedWords[randomIndex]);
            return processedWords;
        default:
            return result.map(word => word.toLowerCase());
    }
    
    return result;
}

function capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function generateSingleDigit() {
    return Math.floor(Math.random() * 10).toString();
}

function generateSafeNumberCombination() {
    const unsafeCombinations = ['69', '96', '13', '666', '420', '123', '911', '666', '88'];
    
    let numberCombo;
    do {
        const firstDigit = Math.floor(Math.random() * 10);
        const secondDigit = Math.floor(Math.random() * 10);
        numberCombo = firstDigit.toString() + secondDigit.toString();
    } while (unsafeCombinations.includes(numberCombo));
    
    return numberCombo;
}

// Export the handler for serverless functions
module.exports = handleRequest;

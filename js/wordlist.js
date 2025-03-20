/**
 * Word list for passphrase generation
 * All words are child-appropriate and categorized by grade level:
 * 
 * elementary: Simple words for elementary school students (shorter, simpler words)
 * middle: Moderate words for middle school students
 * high: More complex words for high school students
 * staff: Professional vocabulary for staff members
 */

wordList = [
    // Animals - Elementary (short words)
    {word: "cat", level: "elementary"},
    {word: "dog", level: "elementary"},
    {word: "fish", level: "elementary"},
    {word: "bird", level: "elementary"},
    {word: "pig", level: "elementary"},
    {word: "frog", level: "elementary"},
    {word: "hen", level: "elementary"},
    {word: "cow", level: "elementary"},
    {word: "bug", level: "elementary"},
    {word: "ant", level: "elementary"},
    {word: "bee", level: "elementary"},
    {word: "bat", level: "elementary"},
    {word: "fox", level: "elementary"},
    {word: "owl", level: "elementary"},
    
    // Animals - Middle School
    {word: "rabbit", level: "middle"},
    {word: "tiger", level: "middle"},
    {word: "lion", level: "middle"},
    {word: "monkey", level: "middle"},
    {word: "zebra", level: "middle"},
    {word: "elephant", level: "middle"},
    {word: "giraffe", level: "middle"},
    {word: "dolphin", level: "middle"},
    {word: "penguin", level: "middle"},
    {word: "turtle", level: "middle"},
    {word: "panda", level: "middle"},
    {word: "koala", level: "middle"},
    {word: "bear", level: "middle"},
    {word: "wolf", level: "middle"},
    {word: "shark", level: "middle"},
    {word: "eagle", level: "middle"},
    {word: "lizard", level: "middle"},
    {word: "octopus", level: "middle"},
    
    // Animals - High School
    {word: "mammal", level: "high"},
    {word: "reptile", level: "high"},
    {word: "amphibian", level: "high"},
    {word: "primate", level: "high"},
    {word: "canine", level: "high"},
    {word: "feline", level: "high"},
    {word: "equine", level: "high"},
    {word: "marsupial", level: "high"},
    {word: "crustacean", level: "high"},
    
    // Animals - Staff
    {word: "vertebrate", level: "staff"},
    {word: "invertebrate", level: "staff"},
    {word: "carnivore", level: "staff"},
    {word: "herbivore", level: "staff"},
    {word: "omnivore", level: "staff"},
    {word: "arthropod", level: "staff"},
    {word: "mollusk", level: "staff"},
    
    // Colors - Elementary (short words)
    {word: "red", level: "elementary"},
    {word: "blue", level: "elementary"},
    {word: "green", level: "elementary"},
    {word: "pink", level: "elementary"},
    {word: "black", level: "elementary"},
    {word: "white", level: "elementary"},
    {word: "gray", level: "elementary"},
    
    // Colors - Middle School
    {word: "yellow", level: "middle"},
    {word: "purple", level: "middle"},
    {word: "orange", level: "middle"},
    {word: "brown", level: "middle"},
    {word: "gold", level: "middle"},
    {word: "silver", level: "middle"},
    {word: "rainbow", level: "middle"},
    {word: "violet", level: "middle"},
    {word: "teal", level: "middle"},
    {word: "navy", level: "middle"},
    {word: "lime", level: "middle"},
    
    // Colors - High School
    {word: "ruby", level: "high"},
    {word: "amber", level: "high"},
    {word: "coral", level: "high"},
    {word: "indigo", level: "high"},
    {word: "turquoise", level: "high"},
    {word: "sapphire", level: "high"},
    {word: "emerald", level: "high"},
    {word: "crimson", level: "high"},
    
    // Colors - Staff
    {word: "magenta", level: "staff"},
    {word: "chartreuse", level: "staff"},
    {word: "periwinkle", level: "staff"},
    {word: "cerulean", level: "staff"},
    {word: "vermilion", level: "staff"},
    
    // Food - Elementary (short words)
    {word: "food", level: "elementary"},
    {word: "cake", level: "elementary"},
    {word: "pie", level: "elementary"},
    {word: "egg", level: "elementary"},
    {word: "jam", level: "elementary"},
    {word: "bread", level: "elementary"},
    {word: "rice", level: "elementary"},
    {word: "meat", level: "elementary"},
    {word: "soup", level: "elementary"},
    {word: "fish", level: "elementary"},
    
    // Food - Middle School
    {word: "apple", level: "middle"},
    {word: "banana", level: "middle"},
    {word: "orange", level: "middle"},
    {word: "grape", level: "middle"},
    {word: "pizza", level: "middle"},
    {word: "cookie", level: "middle"},
    {word: "candy", level: "middle"},
    {word: "popcorn", level: "middle"},
    {word: "cheese", level: "middle"},
    {word: "sandwich", level: "middle"},
    {word: "taco", level: "middle"},
    {word: "pasta", level: "middle"},
    {word: "salad", level: "middle"},
    {word: "carrot", level: "middle"},
    {word: "potato", level: "middle"},
    {word: "muffin", level: "middle"},
    {word: "donut", level: "middle"},
    {word: "berry", level: "middle"},
    {word: "melon", level: "middle"},
    
    // Food - High School
    {word: "cuisine", level: "high"},
    {word: "nutrition", level: "high"},
    {word: "appetizer", level: "high"},
    {word: "dessert", level: "high"},
    {word: "protein", level: "high"},
    {word: "vitamin", level: "high"},
    {word: "mineral", level: "high"},
    {word: "organic", level: "high"},
    {word: "vegetarian", level: "high"},
    
    // Food - Staff
    {word: "culinary", level: "staff"},
    {word: "gourmet", level: "staff"},
    {word: "nutrient", level: "staff"},
    {word: "metabolism", level: "staff"},
    {word: "gastronomy", level: "staff"},
    
    // School - Elementary (short words)
    {word: "book", level: "elementary"},
    {word: "pen", level: "elementary"},
    {word: "desk", level: "elementary"},
    {word: "math", level: "elementary"},
    {word: "read", level: "elementary"},
    {word: "test", level: "elementary"},
    {word: "gym", level: "elementary"},
    {word: "bell", level: "elementary"},
    {word: "art", level: "elementary"},
    {word: "hall", level: "elementary"},
    {word: "bus", level: "elementary"},
    {word: "room", level: "elementary"},
    {word: "map", level: "elementary"},
    {word: "ball", level: "elementary"},
    
    // School - Middle School
    {word: "pencil", level: "middle"},
    {word: "paper", level: "middle"},
    {word: "chair", level: "middle"},
    {word: "teacher", level: "middle"},
    {word: "student", level: "middle"},
    {word: "class", level: "middle"},
    {word: "science", level: "middle"},
    {word: "music", level: "middle"},
    {word: "library", level: "middle"},
    {word: "lunch", level: "middle"},
    {word: "recess", level: "middle"},
    {word: "backpack", level: "middle"},
    {word: "homework", level: "middle"},
    {word: "project", level: "middle"},
    {word: "exam", level: "middle"},
    
    // School - High School
    {word: "curriculum", level: "high"},
    {word: "semester", level: "high"},
    {word: "graduation", level: "high"},
    {word: "biology", level: "high"},
    {word: "chemistry", level: "high"},
    {word: "physics", level: "high"},
    {word: "algebra", level: "high"},
    {word: "geometry", level: "high"},
    {word: "calculus", level: "high"},
    {word: "literature", level: "high"},
    {word: "psychology", level: "high"},
    
    // School - Staff
    {word: "assessment", level: "staff"},
    {word: "evaluation", level: "staff"},
    {word: "criterion", level: "staff"},
    {word: "differentiation", level: "staff"},
    {word: "methodology", level: "staff"},
    
    // Technology - Elementary (short words)
    {word: "tech", level: "elementary"},
    {word: "web", level: "elementary"},
    {word: "site", level: "elementary"},
    {word: "game", level: "elementary"},
    {word: "app", level: "elementary"},
    {word: "chat", level: "elementary"},
    {word: "key", level: "elementary"},
    {word: "type", level: "elementary"},
    {word: "mouse", level: "elementary"},
    {word: "click", level: "elementary"},
    {word: "link", level: "elementary"},
    
    // Technology - Middle School
    {word: "computer", level: "middle"},
    {word: "phone", level: "middle"},
    {word: "tablet", level: "middle"},
    {word: "robot", level: "middle"},
    {word: "code", level: "middle"},
    {word: "screen", level: "middle"},
    {word: "video", level: "middle"},
    {word: "photo", level: "middle"},
    {word: "camera", level: "middle"},
    {word: "watch", level: "middle"},
    {word: "speaker", level: "middle"},
    {word: "wireless", level: "middle"},
    {word: "digital", level: "middle"},
    {word: "keyboard", level: "middle"},
    {word: "internet", level: "middle"},
    
    // Technology - High School
    {word: "network", level: "high"},
    {word: "security", level: "high"},
    {word: "software", level: "high"},
    {word: "hardware", level: "high"},
    {word: "programming", level: "high"},
    {word: "interface", level: "high"},
    {word: "protocol", level: "high"},
    {word: "processor", level: "high"},
    {word: "bandwidth", level: "high"},
    {word: "peripheral", level: "high"},
    
    // Technology - Staff
    {word: "algorithm", level: "staff"},
    {word: "database", level: "staff"},
    {word: "encryption", level: "staff"},
    {word: "infrastructure", level: "staff"},
    {word: "virtualization", level: "staff"},
    
    // Positive Words - Elementary (short words)
    {word: "good", level: "elementary"},
    {word: "best", level: "elementary"},
    {word: "fun", level: "elementary"},
    {word: "kind", level: "elementary"},
    {word: "nice", level: "elementary"},
    {word: "glad", level: "elementary"},
    {word: "joy", level: "elementary"},
    {word: "like", level: "elementary"},
    {word: "hope", level: "elementary"},
    {word: "care", level: "elementary"},
    {word: "help", level: "elementary"},
    {word: "safe", level: "elementary"},
    {word: "play", level: "elementary"},
    
    // Positive Words - Middle School
    {word: "happy", level: "middle"},
    {word: "smile", level: "middle"},
    {word: "brave", level: "middle"},
    {word: "smart", level: "middle"},
    {word: "bright", level: "middle"},
    {word: "super", level: "middle"},
    {word: "amazing", level: "middle"},
    {word: "awesome", level: "middle"},
    {word: "cool", level: "middle"},
    {word: "great", level: "middle"},
    {word: "epic", level: "middle"},
    {word: "clever", level: "middle"},
    {word: "hero", level: "middle"},
    {word: "friend", level: "middle"},
    {word: "excellent", level: "middle"},
    
    // Positive Words - High School
    {word: "outstanding", level: "high"},
    {word: "exceptional", level: "high"},
    {word: "brilliant", level: "high"},
    {word: "fantastic", level: "high"},
    {word: "magnificent", level: "high"},
    {word: "impressive", level: "high"},
    {word: "phenomenal", level: "high"},
    {word: "remarkable", level: "high"},
    {word: "wonderful", level: "high"},
    
    // Positive Words - Staff
    {word: "exemplary", level: "staff"},
    {word: "proficient", level: "staff"},
    {word: "distinguished", level: "staff"},
    {word: "commendable", level: "staff"},
    {word: "exceptional", level: "staff"}
];

// Make the wordList available to other scripts
window.wordList = wordList;

// Define unwanted word combinations
const unwantedCombinations = [
    ['blue', 'ball'],
    // Add more unwanted combinations as needed
];

// Function to check for unwanted word combinations
window.isBadCombination = function(word1, word2) {
    // First check if both words actually exist in our wordlist
    const word1Lower = word1.toLowerCase();
    const word2Lower = word2.toLowerCase();
    
    // Create a set of all actual words for fast lookup
    const wordSet = new Set(wordList.map(item => item.word.toLowerCase()));
    
    // If either word isn't in our word list, it can't form a bad combination
    if (!wordSet.has(word1Lower) || !wordSet.has(word2Lower)) {
        return false;
    }
    
    // Check if this combination exists in the unwanted pairs list
    for (let pair of unwantedCombinations) {
        if ((word1Lower === pair[0] && word2Lower === pair[1]) || 
            (word1Lower === pair[1] && word2Lower === pair[0])) {
            return true;
        }
    }
    
    return false;
};

// Get words by a specific level
window.getWordsByLevel = function(level) {
    return wordList.filter(wordObj => wordObj.level === level);
};

// Get words from current level and all lower levels
window.getWordsByLevelCumulative = function(level) {
    switch (level) {
        case "staff":
            return wordList.filter(wordObj => 
                wordObj.level === "elementary" || 
                wordObj.level === "middle" || 
                wordObj.level === "high" || 
                wordObj.level === "staff"
            );
        case "high":
            return wordList.filter(wordObj => 
                wordObj.level === "elementary" || 
                wordObj.level === "middle" || 
                wordObj.level === "high"
            );
        case "middle":
            return wordList.filter(wordObj => 
                wordObj.level === "elementary" || 
                wordObj.level === "middle"
            );
        case "elementary":
        default:
            return wordList.filter(wordObj => wordObj.level === "elementary");
    }
};
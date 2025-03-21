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
    
    // Elementary School Sight Words (longer than 2 characters)
    {word: "hat", level: "elementary"},
    {word: "the", level: "elementary"},
    {word: "and", level: "elementary"},
    {word: "for", level: "elementary"},
    {word: "you", level: "elementary"},
    {word: "say", level: "elementary"},
    {word: "she", level: "elementary"},
    {word: "her", level: "elementary"},
    {word: "was", level: "elementary"},
    {word: "all", level: "elementary"},
    {word: "are", level: "elementary"},
    {word: "they", level: "elementary"},
    {word: "what", level: "elementary"},
    {word: "were", level: "elementary"},
    {word: "when", level: "elementary"},
    {word: "your", level: "elementary"},
    {word: "can", level: "elementary"},
    {word: "said", level: "elementary"},
    {word: "there", level: "elementary"},
    {word: "use", level: "elementary"},
    {word: "each", level: "elementary"},
    {word: "which", level: "elementary"},
    {word: "this", level: "elementary"},
    {word: "that", level: "elementary"},
    {word: "look", level: "elementary"},
    {word: "more", level: "elementary"},
    {word: "made", level: "elementary"},
    {word: "may", level: "elementary"},
    {word: "part", level: "elementary"},
    {word: "into", level: "elementary"},
    {word: "over", level: "elementary"},
    {word: "know", level: "elementary"},
    {word: "than", level: "elementary"},
    {word: "find", level: "elementary"},
    {word: "first", level: "elementary"},
    {word: "down", level: "elementary"},
    {word: "been", level: "elementary"},
    {word: "call", level: "elementary"},
    {word: "who", level: "elementary"},
    {word: "now", level: "elementary"},
    {word: "long", level: "elementary"},
    {word: "time", level: "elementary"},
    {word: "much", level: "elementary"},
    {word: "tell", level: "elementary"},
    {word: "very", level: "elementary"},
    {word: "new", level: "elementary"},
    {word: "any", level: "elementary"},
    {word: "from", level: "elementary"},
    {word: "have", level: "elementary"},
    {word: "some", level: "elementary"},
    {word: "him", level: "elementary"},
    {word: "make", level: "elementary"},
    {word: "has", level: "elementary"},
    {word: "see", level: "elementary"},
    {word: "his", level: "elementary"},
    {word: "how", level: "elementary"},
    {word: "our", level: "elementary"},
    {word: "out", level: "elementary"},
    {word: "just", level: "elementary"},
    {word: "get", level: "elementary"},
    {word: "man", level: "elementary"},
    {word: "old", level: "elementary"},
    {word: "not", level: "elementary"},
    {word: "day", level: "elementary"},
    
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
    
    // Food - Middle School
    {word: "apple", level: "middle"},
    {word: "banana", level: "middle"},
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
    
    // Food - High School
    {word: "cuisine", level: "high"},
    {word: "nutrition", level: "high"},
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
    {word: "appetizer", level: "staff"},
    
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
    {word: "room", level: "elementary"},
    {word: "map", level: "elementary"},
    {word: "ball", level: "elementary"},
    
    // School - Middle School
    {word: "pencil", level: "middle"},
    {word: "paper", level: "middle"},
    {word: "chair", level: "middle"},
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
    {word: "semester", level: "high"},
    {word: "graduation", level: "high"},
    {word: "biology", level: "high"},
    {word: "chemistry", level: "high"},
    {word: "physics", level: "high"},
    {word: "algebra", level: "high"},
    {word: "geometry", level: "high"},
    {word: "calculus", level: "high"},
    {word: "psychology", level: "high"},
    
    // School - Staff
    {word: "assessment", level: "staff"},
    {word: "evaluation", level: "staff"},
    {word: "criterion", level: "staff"},
    {word: "differentiation", level: "staff"},
    {word: "methodology", level: "staff"},
    {word: "literature", level: "staff"},
    
    // Technology - Elementary (short words)
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
    
    // Technology - Staff
    {word: "algorithm", level: "staff"},
    {word: "database", level: "staff"},
    {word: "encryption", level: "staff"},
    {word: "infrastructure", level: "staff"},
    {word: "virtualization", level: "staff"},
    {word: "peripheral", level: "staff"},
    
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
    
    // Nature - Elementary (short words)
    {word: "sun", level: "elementary"},
    {word: "moon", level: "elementary"},
    {word: "star", level: "elementary"},
    {word: "tree", level: "elementary"},
    {word: "leaf", level: "elementary"},
    {word: "rock", level: "elementary"},
    {word: "rain", level: "elementary"},
    {word: "snow", level: "elementary"},
    {word: "hill", level: "elementary"},

    // Nature - Middle School
    {word: "forest", level: "middle"},
    {word: "ocean", level: "middle"},
    {word: "planet", level: "middle"},
    {word: "mountain", level: "middle"},
    {word: "garden", level: "middle"},
    {word: "weather", level: "middle"},
    {word: "climate", level: "middle"},
    {word: "valley", level: "middle"},
    {word: "canyon", level: "middle"},

    // Transportation - Elementary (short words)
    {word: "car", level: "elementary"},
    {word: "bike", level: "elementary"},
    {word: "boat", level: "elementary"},
    {word: "ship", level: "elementary"},
    {word: "train", level: "elementary"},
    {word: "plane", level: "elementary"},
    {word: "van", level: "elementary"},
    {word: "bus", level: "elementary"},

    // Sports - Middle School
    {word: "soccer", level: "middle"},
    {word: "baseball", level: "middle"},
    {word: "football", level: "middle"},
    {word: "tennis", level: "middle"},
    {word: "hockey", level: "middle"},
    {word: "basketball", level: "middle"},
    {word: "swimming", level: "middle"},
    {word: "running", level: "middle"},
    {word: "jumping", level: "middle"},
    {word: "skating", level: "middle"},

    // Business - Staff
    {word: "analytics", level: "staff"},
    {word: "component", level: "staff"},
    {word: "framework", level: "staff"},
    {word: "structure", level: "staff"},
    {word: "workflow", level: "staff"},
    {word: "resource", level: "staff"},
    {word: "integrate", level: "staff"},

    // Education - Staff
    {word: "pedagogy", level: "staff"},
    {word: "cognition", level: "staff"},
    {word: "curriculum", level: "staff"},
    {word: "milestone", level: "staff"},
    {word: "objective", level: "staff"},
    {word: "benchmark", level: "staff"},
    {word: "coherent", level: "staff"},
    {word: "synthesis", level: "staff"},

    // Science - High School
    {word: "molecule", level: "high"},
    {word: "electron", level: "high"},
    {word: "element", level: "high"},
    {word: "compound", level: "high"},
    {word: "ecosystem", level: "high"},
    {word: "theorem", level: "high"},
    {word: "equation", level: "high"},
    {word: "velocity", level: "high"},
    {word: "genetics", level: "high"},

    // Literature - High School
    {word: "narrative", level: "high"},
    {word: "metaphor", level: "high"},
    {word: "symbolism", level: "high"},
    {word: "character", level: "high"},
    {word: "chapter", level: "high"},
    {word: "poetry", level: "high"},
    {word: "fiction", level: "high"},
    {word: "essay", level: "high"},

    // Additional Elementary words
    {word: "sky", level: "elementary"},
    {word: "sand", level: "elementary"},
    {word: "wind", level: "elementary"},
    {word: "farm", level: "elementary"},
    {word: "jump", level: "elementary"},
    {word: "swim", level: "elementary"},
    {word: "walk", level: "elementary"},
    {word: "talk", level: "elementary"},
    {word: "flag", level: "elementary"},
    {word: "step", level: "elementary"},
    {word: "gift", level: "elementary"},
    {word: "shop", level: "elementary"},
    {word: "love", level: "elementary"},
    {word: "kite", level: "elementary"},
    {word: "hand", level: "elementary"},
    
    // Additional Middle School words
    {word: "planet", level: "middle"},
    {word: "century", level: "middle"},
    {word: "galaxy", level: "middle"},
    {word: "statue", level: "middle"},
    {word: "history", level: "middle"},
    {word: "gravity", level: "middle"},
    {word: "museum", level: "middle"},
    {word: "castle", level: "middle"},
    {word: "theater", level: "middle"},
    {word: "kingdom", level: "middle"},
    {word: "wisdom", level: "middle"},
    {word: "courage", level: "middle"},
    {word: "victory", level: "middle"},
    {word: "puzzle", level: "middle"},
    {word: "trophy", level: "middle"},
    {word: "concert", level: "middle"},
    {word: "comedy", level: "middle"},
    {word: "mystery", level: "middle"},
    
    // Additional High School words
    {word: "analysis", level: "high"},
    {word: "synthesis", level: "high"},
    {word: "hypothesis", level: "high"},
    {word: "democracy", level: "high"},
    {word: "republic", level: "high"},
    {word: "economic", level: "high"},
    {word: "function", level: "high"},
    {word: "variable", level: "high"},
    {word: "periodic", level: "high"},
    {word: "symphony", level: "high"},
    {word: "influence", level: "high"},
    {word: "innovation", level: "high"},
    {word: "strategy", level: "high"},
    {word: "prosperity", level: "high"},
    {word: "perspective", level: "high"},
    {word: "integrity", level: "high"},
    
    // Additional Staff words
    {word: "compliance", level: "staff"},
    {word: "initiative", level: "staff"},
    {word: "foundation", level: "staff"},
    {word: "strategic", level: "staff"},
    {word: "scaffolding", level: "staff"},
    {word: "innovation", level: "staff"},
    {word: "leadership", level: "staff"},
    {word: "engagement", level: "staff"},
    {word: "professional", level: "staff"},
    {word: "development", level: "staff"},
    {word: "collaborative", level: "staff"},
    {word: "achievement", level: "staff"},
    {word: "acquisition", level: "staff"},
    {word: "remediation", level: "staff"},
    {word: "optimization", level: "staff"},
    
    // Science - Elementary
    {word: "atom", level: "elementary"},
    {word: "cell", level: "elementary"},
    {word: "plant", level: "elementary"},
    {word: "grow", level: "elementary"},
    {word: "stem", level: "elementary"},
    {word: "root", level: "elementary"},
    {word: "soil", level: "elementary"},
    {word: "air", level: "elementary"},
    {word: "heat", level: "elementary"},
    {word: "cold", level: "elementary"},
    {word: "mix", level: "elementary"},
    {word: "melt", level: "elementary"},
    {word: "float", level: "elementary"},
    {word: "sink", level: "elementary"},
    
    // Music & Arts - Middle School
    {word: "melody", level: "middle"},
    {word: "rhythm", level: "middle"},
    {word: "harmony", level: "middle"},
    {word: "chorus", level: "middle"},
    {word: "canvas", level: "middle"},
    {word: "painting", level: "middle"},
    {word: "drawing", level: "middle"},
    {word: "sculpture", level: "middle"},
    {word: "ceramic", level: "middle"},
    {word: "theater", level: "middle"},
    {word: "actor", level: "middle"},
    {word: "studio", level: "middle"},
    {word: "orchestra", level: "middle"},
    {word: "composer", level: "middle"},
    
    // Geography - High School 
    {word: "latitude", level: "high"},
    {word: "longitude", level: "high"},
    {word: "continent", level: "high"},
    {word: "peninsula", level: "high"},
    {word: "isthmus", level: "high"},
    {word: "plateau", level: "high"},
    {word: "climate", level: "high"},
    {word: "terrain", level: "high"},
    {word: "cultural", level: "high"},
    {word: "boundary", level: "high"},
    {word: "region", level: "high"},
    {word: "capital", level: "high"},
    {word: "nation", level: "high"},
    {word: "resource", level: "high"},
    
    // Administration - Staff
    {word: "policy", level: "staff"},
    {word: "guideline", level: "staff"},
    {word: "procedure", level: "staff"},
    {word: "implement", level: "staff"},
    {word: "initiative", level: "staff"},
    {word: "oversight", level: "staff"},
    {word: "credential", level: "staff"},
    {word: "faculty", level: "staff"},
    {word: "committee", level: "staff"},
    {word: "council", level: "staff"},
    {word: "provision", level: "staff"},
    {word: "accredit", level: "staff"},
    {word: "tenure", level: "staff"}
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
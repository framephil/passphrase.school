# Passphrase.school

A secure, age-appropriate passphrase generator specifically designed for K-12 educational environments.

## About

Passphrase.school generates memorable yet secure passphrases tailored to different educational levels - from elementary school through staff. Unlike traditional password generators, this tool:

- Creates age-appropriate passphrases based on selected grade level
- Uses a curated dictionary of school-appropriate words
- Produces passphrases that are easier to remember than complex passwords
- Automatically filters out potentially inappropriate word combinations
- Follows education-specific security best practices

## Project Structure

```
passphrase.school/
├── index.html                      # Main HTML page for the application
├── css/
│   └── style.css                  # Main styles for the application
├── js/
│   ├── script.js                  # Main JavaScript logic for generating passphrases
│   ├── wordlist.js                # Wordlist loader and manager for CSV data
│   └── theme.js                   # Theme management (dark/light mode)
├── words/                         # Word list browser section
│   ├── index.html                 # Word list browser page
│   ├── style.css                  # Word list specific styles
│   ├── wordlist-viewer.js         # JavaScript for the word list browser
│   └── wordlist.csv               # CSV file containing all words and their levels
├── favicon/                       # Favicon assets with dark mode support
├── .gitignore                     # Specifies files to be ignored by Git
└── README.md                      # Documentation for the project
```

## Features

- **Grade-Level Targeting**: Four distinct complexity levels:
  - **Elementary School**: 2 short, simple words + 1 number
  - **Middle School**: 2 longer words (4+ characters) + 1 number
  - **High School**: 3 words + 2 numbers
  - **Staff**: 4 words + 2 numbers

- **Customization Options**:
  - Word separators (space, hyphen, period, underscore, or random mix)
  - Capitalization styles (first word, all words, random word, or none)
  - Number placement (end of phrase or random position)
  - Animation toggle for accessibility

- **Word List Browser**:
  - Searchable database of all words used in the generator
  - Filter by educational level
  - Sort by word, level, or length
  - Pagination for easier navigation
  - CSV export

- **Security Considerations**:
  - Cryptographically secure random number generation
  - Filters out inappropriate word combinations
  - Avoids problematic number sequences
  - Ensures no duplicate words in passphrases
  - Maintains minimum security standards (8+ characters)

- **User Experience**:
  - One-click copy to clipboard
  - Visual animations during generation
  - Print functionality under advanced options
  - Mobile-responsive design
  - Dark mode support with system preference detection
  - Persistent user preferences via localStorage

## How It Works

1. Select your educational level (elementary, middle, high, or staff)
2. A passphrase is automatically generated with appropriate complexity
3. Use advanced options to customize separators, capitalization, or number placement
4. Click on the passphrase to copy it to your clipboard
5. Generate new passphrases as needed or print the current one

## Why Use Passphrases?

Passphrases offer several advantages over traditional passwords:

- **More Secure**: A four-word passphrase contains more entropy (randomness) than a complex 8-character password
- **More Memorable**: Words create mental images that are easier to remember than random characters
- **Easier to Type**: Especially important for younger students or on mobile devices
- **Educational Value**: Reinforces vocabulary and typing skills while teaching security concepts

## How to Use

Visit [passphrase.school](https://passphrase.school) to use this tool online, or download the repository and open index.html to run it locally.

## Development

This project was built using GitHub Copilot, demonstrating how AI-assisted development can help create specialized tools for educational environments. The wordlist is stored in a CSV format for easy maintenance and updates.

## Contributing

Feel free to fork the repository and submit pull requests for any improvements or features you would like to add. Some ideas for contributions:

- Word list improvements
- Enhanced accessibility features

## License

This project is open-source and available under the MIT License.

## Credits

Created by Phillip Winfrey with assistance from GitHub Copilot.


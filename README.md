# sewing_tools

A simple offline clientside webapp to manage sewing measurements and patterns.

## Key Features

This application embodies a privacy-first, minimal-dependency philosophy:

- **Fully offline**: Everything runs locally in your browser. No data is sent to any server.
- **No data collection**: Your measurements and projects remain yours alone.
- **No external dependencies**: Built with pure HTML, CSS, and JavaScript. No frameworks or libraries required.
- **No setup needed**: Open the app in your browser and start using it immediately.

---

## Installation

### Using the Launcher (Recommended)

1. **Get the launcher file**
   - Download `launcher.html` from the [GitHub repository](https://github.com/mbarneche/sewing_tools)
   - If someone shared the app with you, they should have provided this file
   - Save it to a convenient location on your computer

2. **First-time setup**
   - Open `launcher.html` in your web browser (double-click the file or right-click and select "Open with" > your preferred browser)
   - **Important**: You need an internet connection for the first launch only
   - The launcher will automatically download and install the app files
   - This may take a moment depending on your connection speed
   - Once complete, the app will open automatically

3. **Using the app after installation**
   - Simply open `launcher.html` in your browser whenever you want to use the app
   - No internet connection required after the initial download
   - The app works completely offline

4. **Automatic updates**
   - The launcher checks for updates every 7 days when you open it
   - If an update is available, you'll be prompted to download it
   - Updates require a brief internet connection
   - You can choose to update now or continue with your current version
   - All your data remains safe during updates

---

## Sharing

### How to Share the App with Others

Because this app works offline and respects privacy, you can easily share it:

1. **Share the launcher file**
   - Simply give the `launcher.html` file to anyone you want to share the app with
   - They can use it on their own computer following the Installation instructions above
   - Each person gets their own independent copy with their own data

2. **What recipients need**
   - A modern web browser (Chrome, Firefox, Safari, or Edge)
   - Internet connection for the initial download only
   - No special software, accounts, or technical knowledge required

3. **Privacy considerations**
   - Each installation is completely independent
   - No data is shared between users
   - No central server tracks who uses the app
   - Recipients' measurements and projects remain private on their own computer

4. **Sharing tips**
   - Include a link to this README for detailed instructions
   - Mention that internet is only needed once for the initial setup
   - Remind users that the app works completely offline after installation

---

## How to Use

### Getting Started

1. **Open the app**
   - Start the app as described in the Installation section above

2. **Main interface**
   
   [Screenshot placeholder: Main app interface - add screenshot here]

### Basic Workflow

#### Step 1: Input Measurements

- Access the measurements section
- Enter body measurements in the provided form
- Choose between metric (cm) and imperial (inches) units
- The app includes reference standard measurements you can use as a starting point

[Screenshot placeholder: Measurements input form - add screenshot here]

#### Step 2: Convert and Calculate

- Use the converter tool to transform measurements between different units
- Use the scaler to adjust patterns to your size
- All calculations happen instantly in your browser

[Screenshot placeholder: Converter and scaler interface - add screenshot here]

#### Step 3: Save and Export

- Save your projects locally using the built-in saver
- Your data is stored on your computer, not on any server
- You can download and import your projects as needed

[Screenshot placeholder: Save/export interface - add screenshot here]

#### Step 4: Use Your Patterns

- Apply your customized measurements to sewing patterns
- Print or view patterns digitally
- All modifications remain private and local to your device

[Screenshot placeholder: Pattern view - add screenshot here]

### Language Support

The app supports English and French languages. Select your preferred language from the interface.

---

## Technical Details

### Project Structure

```
sewing_tools/
├── app/
│   ├── index.html                 # Main entry point
│   ├── css/                       # Stylesheets
│   │   ├── styles.css            # Main styles
│   │   └── dragdrop.css          # Drag-and-drop functionality styles
│   ├── js/                        # JavaScript files
│   │   ├── app.js                # Main application logic
│   │   ├── dragdrop.js           # Drag-and-drop implementation
│   │   └── i18n.js               # Internationalization
│   ├── data/                      # Reference data
│   │   ├── standard-female-measurements.json
│   │   └── standard-male-measurements.json
│   ├── locales/                   # Language files
│   │   ├── en.json               # English translations
│   │   └── fr.json               # French translations
│   └── modules/                   # Feature modules
│       ├── converter/            # Unit conversion
│       ├── form/                 # Measurement input forms
│       ├── pattern/              # Pattern management
│       ├── saver/                # Save/export functionality
│       ├── scaler/               # Pattern scaling
│       └── solver/               # Calculation engine
├── LICENSE                        # License file
└── README.md                      # This file
```

### Technology Stack

- **HTML5**: Structure and layout
- **CSS3**: Styling and responsive design
- **Vanilla JavaScript (ES6+)**: All interactivity and logic
- **No frameworks, no build tools, no package managers**: Run as-is

### How the App Works

1. **Clientside Processing**: All operations happen in your browser
2. **Local Storage**: Data is optionally stored in your browser's local storage
3. **JSON Data Files**: Reference measurements and translations are loaded as static JSON files
4. **Modular Architecture**: Features are organized into self-contained modules for maintainability

### For Developers: Extending the App

If you want to modify or extend the app:

#### Adding a New Language

1. Create a new file in `app/locales/` (e.g., `es.json` for Spanish)
2. Follow the structure of existing language files (e.g., `en.json`)
3. Update the language selector in the UI to include the new language
4. The app uses the `i18n.js` module to manage translations

#### Adding a New Feature Module

1. Create a new folder in `app/modules/` with your feature name
2. Create three files:
   - `module-name.js` - Core logic
   - `module-name.css` - Styling
   - `module-name.html` (if needed) - HTML template
3. Follow the module pattern used in existing modules
4. Import and initialize your module in `app.js`

#### Modifying the Core Logic

- Edit `app/js/app.js` for main application behavior
- Edit specific module files for feature-specific logic
- Clear your browser cache if changes don't appear (or use a private/incognito window)

#### Creating Standard Measurements

- Edit the JSON files in `app/data/` to add or update standard measurements
- Follow the existing structure for consistency
- The app automatically loads these on startup

### Browser Compatibility

- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- No special browser extensions needed

### No External Resources

- This app does not require internet connectivity after initial load
- All files are included in the repository
- No third-party CDNs or APIs are used

---

## Contributing

If you have improvements or bug fixes, feel free to contribute:

1. Fork the repository
2. Make your changes
3. Submit a pull request with a clear description of what you've improved

---

## License

See the LICENSE file for details.

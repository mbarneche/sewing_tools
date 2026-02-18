// =====================================================
// Internationalization (i18n) Manager
// =====================================================

const safeStorage = (() => {
  try {
    const storage = window.localStorage;
    const testKey = '__storage_test__';
    storage.setItem(testKey, '1');
    storage.removeItem(testKey);
    return storage;
  } catch (error) {
    return null;
  }
})();

window.safeStorage = safeStorage;

// Embedded translation data for local file access
const EMBEDDED_TRANSLATIONS = {
  fr: {
    "header": {
      "title": "Outil de Mesure pour la Couture",
      "subtitle": "Entrez, manipulez et conservez vos mesures pour la couture",
      "author": "Par Maxence Barnèche"
    },
    "unitSwitch": {
      "label": "Unité de mesure globale:",
      "cm": "cm",
      "in": "pouces (in)",
      "ft": "pieds (ft)"
    },
    "layoutControls": {
      "hideCalculators": "Masquer calculateurs",
      "hideMeasurements": "Masquer mesures",
      "showAll": "Tout afficher"
    },
    "legal": {
      "dataNotice": "Aucune donnée n'est collectée puisque cette application tourne localement sur votre navigateur.",
      "license": "Licence MIT: partagez et réutilisez comme bon vous semble tant que vous conservez cette licence ;)"
    },
    "saver": {
      "bodyMeasurements": "Mesures Corporelles",
      "profileSex": "Profil:",
      "male": "Homme",
      "female": "Femme",
      "bodyType": "Profil Type de Corps:",
      "selectProfile": "-- Sélectionner un profil --",
      "petit": "Petite",
      "average": "Moyenne",
      "tall": "Grande",
      "plussize": "Grande Taille",
      "bust": "Buste",
      "arms": "Bras",
      "legs": "Jambe",
      "head": "Tête",
      "waist": "Taille",
      "tourTete": "Tour de tête:",
      "hauteurTete": "Hauteur de tête:",
      "tourEncolure": "Tour d'encolure:",
      "tourPoitrine": "Tour de poitrine:",
      "irrelevantPlaceholder": "Sans objet",
      "hauteurPoitrine": "Hauteur de poitrine:",
      "demiEcartPoitrine": "1/2 ecart de poitrine:",
      "carrureDos": "Carrure dos:",
      "carrureDevant": "Carrure devant:",
      "longueurEpaule": "Longueur d'épaule:",
      "longueurTailleDevant7eme": "Longueur taille devant depuis la 7eme cervicale:",
      "hauteurCorps": "Hauteur du corps:",
      "tourCeinture": "Tour de ceinture:",
      "tourBassin": "Tour de bassin:",
      "tourBassinPetitesHanches": "Tour de bassin (petites hanches):",
      "tourBassinGrandesHanches": "Tour de bassin (grandes hanches):",
      "longueurTailleDos": "Longueur taille dos:",
      "longueurTailleDevant": "Longueur taille devant:",
      "hauteurTailleBassin": "Hauteur taille - bassin:",
      "tourEmmanchure": "Tour d'emmanchure:",
      "hauteurDessousBras": "Hauteur dessous de bras:",
      "longueurBras": "Longueur de bras:",
      "grosseurBras": "Grosseur de bras:",
      "hauteurCoude": "Hauteur coude:",
      "tourPoignet": "Tour de poignet:",
      "hauteurTailleTerre": "Hauteur taille a terre:",
      "hauteurTailleCoteTerre": "Hauteur taille cote a terre:",
      "hauteurMontant": "Hauteur de montant:",
      "enfourchure": "Enfourchure:",
      "hauteurTailleGenou": "Hauteur taille au genou:",
      "longueurEntrejambe": "Longueur d'entrejambe:",
      "tourCuisse": "Tour de cuisse:",
      "tourMollet": "Tour de mollet:",
      "tourJarret": "Tour de jarret:",
      "neckCircumference": "Tour d'encolure:",
      "shoulderCircumference": "Tour d'épaule:",
      "shoulderLength": "Longueur de l'épaule:",
      "chestCircumference": "Tour de poitrine/torse:",
      "chestHeight": "Hauteur de poitrine:",
      "backLength": "Longueur du dos:",
      "waistCircumference": "Tour de taille:",
      "waistHeight": "Hauteur de taille:",
      "hipCircumference": "Tour de hanches:",
      "armCircumference": "Tour de bras:",
      "sleeveLength": "Longueur de manche:",
      "wristCircumference": "Tour de poignet:",
      "thighCircumference": "Tour de cuisse:",
      "inseam": "Entrejambe:",
      "kneeCircumference": "Tour du genou:",
      "calfCircumference": "Tour de mollet:",
      "save": "Sauvegarder",
      "savePlaceholder": "Nom pour cette sauvegarde",
      "customMeasurement": "Ajouter une Mesure Personnalisée",
      "category": "Catégorie:",
      "measurementName": "Nom de la mesure:",
      "value": "Valeur:",
      "add": "Ajouter",
      "savedMeasurements": "Mesures Sauvegardées",
      "exportAll": "Exporter tout",
      "importFromFile": "Importer à partir d'un fichier",
      "noMeasurements": "Aucune mesure sauvegardée",
      "load": "(Cliquez pour charger)",
      "export": "Exporter",
      "print": "Imprimer",
      "delete": "Supprimer",
      "remove": "Retirer",
      "confirmDelete": "Êtes-vous sûr de vouloir supprimer",
      "deletionSuccessful": "Mesure supprimée avec succès",
      "measuresBackup": "_mesures.json",
      "allMeasuresBackup": "couture_mesures_sauvegarde",
      "measurementsOf": "Mesures de",
      "savedAt": "Sauvegardé le:",
      "generatedBy": "Générée par Calculatrice de Ratios de Couture",
      "enterName": "Veuillez entrer un nom pour cette sauvegarde",
      "enterAtLeast": "Veuillez entrer au moins une mesure",
      "alreadyExists": "Une mesure avec ce nom existe déjà dans cette catégorie",
      "measurementSaved": "Mesures sauvegardées avec succès!",
      "measurementImported": "Mesure importée avec succès!",
      "measurementsImported": "mesure(s) importée(s) avec succès!",
      "measurementExists": "Une mesure nommée",
      "alreadyExistsReplace": "existe déjà. Voulez-vous la remplacer?",
      "nothingToImport": "Aucune nouvelle mesure à importer (toutes existent déjà)",
      "errorReading": "Erreur lors de la lecture du fichier. Assurez-vous que c'est un fichier JSON valide."
    },
    "converter": {
      "title": "Convertisseur d'Unités",
      "linearMeasurements": "Mesures Linéaires",
      "value": "Valeur:",
      "areaMeasurements": "Mesures de Surface",
      "cm": "cm",
      "m": "m",
      "inches": "pouces (in)",
      "feet": "pieds (ft)",
      "cm2": "cm²",
      "m2": "m²",
      "yards2": "yards²",
      "pouce": "pouces (in)",
      "pied": "pieds (ft)"
    },
    "scaler": {
      "title": "Ajustement d'Echelle",
      "note": "Remplissez deux champs pour calculer le troisieme automatiquement.",
      "originalMeasurement": "Mesure d'origine",
      "newMeasurement": "Nouvelle mesure",
      "scalingRatio": "Ratio d'impression/extension",
      "reset": "Reinitialiser"
    },
    "solver": {
      "title": "Solveur d'Équations",
      "addEquation": "Cliquer pour ajouter une équation",
      "remove": "Retirer"
    }
  },
  en: {
    "header": {
      "title": "Sewing Measurement Tool",
      "subtitle": "Enter, manipulate and save your sewing measurements",
      "author": "By Maxence Barnèche"
    },
    "unitSwitch": {
      "label": "Global measurement unit:",
      "cm": "cm",
      "in": "inches (in)",
      "ft": "feet (ft)"
    },
    "layoutControls": {
      "hideCalculators": "Hide calculators",
      "hideMeasurements": "Hide measurements",
      "showAll": "Show all"
    },
    "legal": {
      "dataNotice": "No data is collected because this app runs locally in your browser.",
      "license": "MIT License: share and reuse as you like as long as you keep this license ;)"
    },
    "saver": {
      "bodyMeasurements": "Body Measurements",
      "profileSex": "Profile:",
      "male": "Male",
      "female": "Female",
      "bodyType": "Body Type Profile:",
      "selectProfile": "-- Select a profile --",
      "petit": "Small",
      "average": "Average",
      "tall": "Tall",
      "plussize": "Plus Size",
      "bust": "Bust",
      "arms": "Arms",
      "legs": "Legs",
      "head": "Head",
      "waist": "Waist",
      "tourTete": "Head circumference:",
      "hauteurTete": "Head height:",
      "tourEncolure": "Neck circumference:",
      "tourPoitrine": "Chest circumference:",
      "irrelevantPlaceholder": "Irrelevant",
      "hauteurPoitrine": "Bust height:",
      "demiEcartPoitrine": "Half bust spacing:",
      "carrureDos": "Back width:",
      "carrureDevant": "Front width:",
      "longueurEpaule": "Shoulder length:",
      "longueurTailleDevant7eme": "Front waist length from C7:",
      "hauteurCorps": "Body height:",
      "tourCeinture": "Waist circumference:",
      "tourBassin": "Hip circumference:",
      "tourBassinPetitesHanches": "Upper hip circumference:",
      "tourBassinGrandesHanches": "Full hip circumference:",
      "longueurTailleDos": "Back waist length:",
      "longueurTailleDevant": "Front waist length:",
      "hauteurTailleBassin": "Waist-to-hip height:",
      "tourEmmanchure": "Armhole circumference:",
      "hauteurDessousBras": "Underarm height:",
      "longueurBras": "Arm length:",
      "grosseurBras": "Arm circumference:",
      "hauteurCoude": "Elbow height:",
      "tourPoignet": "Wrist circumference:",
      "hauteurTailleTerre": "Waist-to-floor height:",
      "hauteurTailleCoteTerre": "Waist side-to-floor height:",
      "hauteurMontant": "Rise height:",
      "enfourchure": "Crotch depth:",
      "hauteurTailleGenou": "Waist-to-knee height:",
      "longueurEntrejambe": "Inseam length:",
      "tourCuisse": "Thigh circumference:",
      "tourMollet": "Calf circumference:",
      "tourJarret": "Ankle circumference:",
      "neckCircumference": "Neck circumference:",
      "shoulderCircumference": "Shoulder circumference:",
      "shoulderLength": "Shoulder length:",
      "chestCircumference": "Chest/torso circumference:",
      "chestHeight": "Chest height:",
      "backLength": "Back length:",
      "waistCircumference": "Waist circumference:",
      "waistHeight": "Waist height:",
      "hipCircumference": "Hip circumference:",
      "armCircumference": "Arm circumference:",
      "sleeveLength": "Sleeve length:",
      "wristCircumference": "Wrist circumference:",
      "thighCircumference": "Thigh circumference:",
      "inseam": "Inseam:",
      "kneeCircumference": "Knee circumference:",
      "calfCircumference": "Calf circumference:",
      "save": "Save",
      "savePlaceholder": "Name for this backup",
      "customMeasurement": "Add Custom Measurement",
      "category": "Category:",
      "measurementName": "Measurement name:",
      "value": "Value:",
      "add": "Add",
      "savedMeasurements": "Saved Measurements",
      "exportAll": "Export all",
      "importFromFile": "Import from file",
      "noMeasurements": "No saved measurements",
      "load": "(Click to load)",
      "export": "Export",
      "print": "Print",
      "delete": "Delete",
      "remove": "Remove",
      "confirmDelete": "Are you sure you want to delete",
      "deletionSuccessful": "Measurement deleted successfully",
      "measuresBackup": "_measures.json",
      "allMeasuresBackup": "sewing_measures_backup",
      "measurementsOf": "Measurements of",
      "savedAt": "Saved at:",
      "generatedBy": "Generated by Sewing Measurements Tool",
      "enterName": "Please enter a name for this backup",
      "enterAtLeast": "Please enter at least one measurement",
      "alreadyExists": "A measurement with this name already exists in this category",
      "measurementSaved": "Measurements saved successfully!",
      "measurementImported": "Measurement imported successfully!",
      "measurementsImported": "measurement(s) imported successfully!",
      "measurementExists": "A measurement named",
      "alreadyExistsReplace": "already exists. Do you want to replace it?",
      "nothingToImport": "No new measurements to import (all already exist)",
      "errorReading": "Error reading file. Make sure it's a valid JSON file."
    },
    "converter": {
      "title": "Unit Converter",
      "linearMeasurements": "Linear Measurements",
      "value": "Value:",
      "areaMeasurements": "Area Measurements",
      "cm": "cm",
      "m": "m",
      "inches": "inches (in)",
      "feet": "feet (ft)",
      "cm2": "cm²",
      "m2": "m²",
      "yards2": "yards²",
      "pouce": "pouce (in)",
      "pied": "pied (ft)"
    },
    "scaler": {
      "title": "Scale Adjustment",
      "note": "Fill two fields to calculate the third automatically.",
      "originalMeasurement": "Original measurement",
      "newMeasurement": "New measurement",
      "scalingRatio": "Scaling ratio/extension",
      "reset": "Reset"
    },
    "solver": {
      "title": "Equation Solver",
      "addEquation": "Click to add an equation",
      "remove": "Remove"
    }
  }
};

class I18n {
  constructor() {
    this.currentLanguage = safeStorage?.getItem('language') || 'fr';
    this.translations = { ...EMBEDDED_TRANSLATIONS };
    this.loadedLanguages = new Set(Object.keys(EMBEDDED_TRANSLATIONS));
  }

  async loadLanguage(lang) {
    if (this.loadedLanguages.has(lang)) return;
    
    try {
      const response = await fetch(`locales/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to fetch language: ${lang}`);
      this.translations[lang] = await response.json();
      this.loadedLanguages.add(lang);
    } catch (error) {
      console.warn(`Could not fetch language file (${lang}), using embedded translations`, error);
      // Fallback to embedded translations is already loaded in constructor
    }
  }

  async setLanguage(lang) {
    await this.loadLanguage(lang);
    this.currentLanguage = lang;
    if (safeStorage) safeStorage.setItem('language', lang);
    this.updateUI();
    const sex = document.getElementById('profileSex')?.value || 'male';
    if (typeof updateIrrelevantPlaceholders === 'function') {
      updateIrrelevantPlaceholders(sex);
    }
    // Refresh saver and converter/scaler content
    if (typeof loadSaverContent === 'function') loadSaverContent();
    if (typeof loadConverterAndScalerContent === 'function') loadConverterAndScalerContent();
  }

  t(key) {
    // key format: "header.title"
    const keys = key.split('.');
    let value = this.translations[this.currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key; // Return key if translation not found
  }

  updateUI() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = this.t(key);
    });

    // Update labels
    document.querySelectorAll('[data-i18n-label]').forEach(el => {
      const key = el.getAttribute('data-i18n-label');
      el.textContent = this.t(key);
    });

    // Update language buttons active state
    document.querySelectorAll('[data-language-btn]').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-language-btn') === this.currentLanguage) {
        btn.classList.add('active');
      }
    });
  }

  getAvailableLanguages() {
    return ['en', 'fr'];
  }
}

// Create global instance
const i18n = new I18n();

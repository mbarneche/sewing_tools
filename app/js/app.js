// =====================================================
// Core App Functionality
// =====================================================

// Shared state
let customMeasurements = {
  'Tete': {},
  'Buste': {},
  'Bras': {},
  'Taille': {},
  'Jambe': {},
  'Autre': {}
};

const inputs = [
  'tourTete',
  'hauteurTete',
  'tourEncolure',
  'tourPoitrine',
  'hauteurPoitrine',
  'demiEcartPoitrine',
  'carrureDos',
  'carrureDevant',
  'longueurEpaule',
  'longueurTailleDevant7eme',
  'hauteurCorps',
  'tourCeinture',
  'tourBassin',
  'tourBassinPetitesHanches',
  'tourBassinGrandesHanches',
  'longueurTailleDos',
  'longueurTailleDevant',
  'hauteurTailleBassin',
  'tourEmmanchure',
  'hauteurDessousBras',
  'longueurBras',
  'grosseurBras',
  'hauteurCoude',
  'tourPoignet',
  'hauteurTailleTerre',
  'hauteurTailleCoteTerre',
  'hauteurMontant',
  'enfourchure',
  'hauteurTailleGenou',
  'longueurEntrejambe',
  'tourCuisse',
  'tourMollet',
  'tourJarret',
  'customMeasureValue'
];

let currentUnits = {};
inputs.forEach(inputId => {
  currentUnits[inputId] = 'cm';
});
let globalUnit = 'cm';

// Conversion factors
const cmToInch = 1 / 2.54;
const inchToCm = 2.54;
const inchToFt = 1 / 12;
const ftToInch = 12;
const cmToFt = 1 / 30.48;
const ftToCm = 30.48;

// =====================================================
// Core Initialization
// =====================================================

function initializeApp() {
  loadCustomMeasurements();
  updateGlobalUnitButtons();
  setLayoutState('both');
  
  // Initialize unit buttons for each input
  inputs.forEach(inputId => {
    updateUnitButtons(inputId, currentUnits[inputId]);
  });

  // Load form and saver content
  loadFormContent();
  loadSaverContent();
  loadConverterAndScalerContent();
  
  // Initialize saver displays
  displaySavedMeasurements();
  displayCustomMeasurements();
}

// =====================================================
// Layout Management
// =====================================================

function setLayoutState(state) {
  const mainLayout = document.querySelector('.main-layout');
  if (!mainLayout) return;

  mainLayout.classList.remove('show-left-only', 'show-right-only');
  if (state === 'left-only') {
    mainLayout.classList.add('show-left-only');
  } else if (state === 'right-only') {
    mainLayout.classList.add('show-right-only');
  }
  updateLayoutButtons(state);
}

function updateLayoutButtons(state) {
  const leftBtn = document.getElementById('showLeftOnlyBtn');
  const rightBtn = document.getElementById('showRightOnlyBtn');
  const bothBtn = document.getElementById('showBothBtn');

  [leftBtn, rightBtn, bothBtn].forEach(btn => {
    if (btn) {
      btn.classList.remove('active');
    }
  });

  if (state === 'left-only' && leftBtn) {
    leftBtn.classList.add('active');
  } else if (state === 'right-only' && rightBtn) {
    rightBtn.classList.add('active');
  } else if (bothBtn) {
    bothBtn.classList.add('active');
  }
}

function toggleLayoutSection(section) {
  const mainLayout = document.querySelector('.main-layout');
  if (!mainLayout) return;

  const isLeftOnly = mainLayout.classList.contains('show-left-only');
  const isRightOnly = mainLayout.classList.contains('show-right-only');

  if (section === 'right') {
    setLayoutState(isLeftOnly ? 'both' : 'left-only');
    return;
  }

  if (section === 'left') {
    setLayoutState(isRightOnly ? 'both' : 'right-only');
  }
}

// =====================================================
// Unit Conversion
// =====================================================

function convertUnit(inputId, targetUnit) {
  const input = document.getElementById(inputId);
  if (!input || !input.value) return;

  const currentValue = parseFloat(input.value);
  const currentUnit = currentUnits[inputId];
  let newValue;

  if (currentUnit === targetUnit) return;

  let valueInCm;
  if (currentUnit === 'cm') {
    valueInCm = currentValue;
  } else if (currentUnit === 'in') {
    valueInCm = currentValue * inchToCm;
  } else if (currentUnit === 'ft') {
    valueInCm = currentValue * ftToCm;
  }

  if (targetUnit === 'cm') {
    newValue = valueInCm;
  } else if (targetUnit === 'in') {
    newValue = valueInCm * cmToInch;
  } else if (targetUnit === 'ft') {
    newValue = valueInCm * cmToFt;
  }

  input.value = newValue.toFixed(2);
  currentUnits[inputId] = targetUnit;

  updateUnitButtons(inputId, targetUnit);
  globalUnit = targetUnit;
  updateGlobalUnitButtons();
}

function updateUnitButtons(inputId, unit) {
  const parent = document.getElementById(inputId)?.closest('.form-group-with-unit');
  if (!parent) return;

  const buttons = parent.querySelectorAll('.unit-switch');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.toLowerCase().includes(unit.toLowerCase().substring(0, 2)) || 
        (unit === 'in' && btn.textContent === 'in') ||
        (unit === 'cm' && btn.textContent === 'cm') ||
        (unit === 'ft' && btn.textContent === 'ft')) {
      btn.classList.add('active');
    }
  });
}

function setGlobalUnit(unit) {
  inputs.forEach(inputId => {
    const input = document.getElementById(inputId);
    if (input && input.value) {
      convertUnit(inputId, unit);
    } else if (input) {
      currentUnits[inputId] = unit;
      updateUnitButtons(inputId, unit);
    }
  });
  globalUnit = unit;
  updateGlobalUnitButtons();
}

function updateGlobalUnitButtons() {
  const buttons = document.querySelectorAll('.global-unit-switch .unit-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.toLowerCase() === globalUnit.toLowerCase() ||
        (globalUnit === 'in' && btn.textContent.includes('pouces')) ||
        (globalUnit === 'ft' && btn.textContent.includes('pieds')) ||
        (globalUnit === 'cm' && btn.textContent === 'cm')) {
      btn.classList.add('active');
    }
  });
}

// =====================================================
// Category Toggle
// =====================================================

function toggleCategory(categoryId) {
  const content = document.getElementById(`content-${categoryId}`);
  const toggle = document.getElementById(`toggle-${categoryId}`);
  
  if (!content || !toggle) return;

  if (content.classList.contains('expanded')) {
    content.classList.remove('expanded');
    toggle.classList.remove('expanded');
  } else {
    content.classList.add('expanded');
    toggle.classList.add('expanded');
  }
}

// =====================================================
// Custom Measurements Storage
// =====================================================

function saveCustomMeasurements() {
  if (window.safeStorage) {
    window.safeStorage.setItem('customMeasurements', JSON.stringify(customMeasurements));
  }
}

function loadCustomMeasurements() {
  if (!window.safeStorage) return;

  const saved = window.safeStorage.getItem('customMeasurements');
  if (saved) {
    customMeasurements = JSON.parse(saved);
  }
}

// =====================================================
// Utility Functions
// =====================================================

function formatNumber(value) {
  if (Number.isNaN(value)) return '-';
  return parseFloat(value.toFixed(4)).toString();
}

function parseScaleValue(rawValue) {
  const parsedValue = parseFloat(rawValue);
  return Number.isFinite(parsedValue) ? parsedValue : null;
}

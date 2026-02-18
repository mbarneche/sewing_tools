// =====================================================
// Form Feature - Functionality
// =====================================================

// Load HTML content for the measurement form
function loadFormContent() {
  const container = document.getElementById('formContainer');
  if (!container) return;

  const t = (key) => i18n.t(`saver.${key}`);

  const formHTML = `
    <div class="measurement-form">
      <fieldset>
        <legend>${i18n.t('saver.bodyMeasurements')}</legend>
        
        <div class="form-group">
          <label for="profileSex">${i18n.t('saver.profileSex')}</label>
          <select id="profileSex" name="profileSex">
            <option value="male">${i18n.t('saver.male')}</option>
            <option value="female">${i18n.t('saver.female')}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="bodyType">${i18n.t('saver.bodyType')}</label>
          <select id="bodyType" name="bodyType">
            <option value="">${i18n.t('saver.selectProfile')}</option>
          </select>
        </div>

        <!-- Tete Category -->
        <div class="collapsible-category">
          <div class="collapsible-header" onclick="toggleCategory('tete')">
            <span class="collapsible-header-title">${i18n.t('saver.head')}</span>
            <span class="collapsible-toggle" id="toggle-tete">▼</span>
          </div>
          <div class="collapsible-content" id="content-tete">
            ${createMeasurementField('tourTete', 'tourTete', 'ex. 57')}
            ${createMeasurementField('hauteurTete', 'hauteurTete', 'ex. 25')}
          </div>
        </div>

        <!-- Buste Category -->
        <div class="collapsible-category">
          <div class="collapsible-header" onclick="toggleCategory('buste')">
            <span class="collapsible-header-title">${i18n.t('saver.bust')}</span>
            <span class="collapsible-toggle" id="toggle-buste">▼</span>
          </div>
          <div class="collapsible-content" id="content-buste">
            ${createMeasurementField('tourEncolure', 'tourEncolure', 'ex. 39')}
            ${createMeasurementField('tourPoitrine', 'tourPoitrine', 'ex. 100')}
            ${createMeasurementField('hauteurPoitrine', 'hauteurPoitrine', 'ex. 22.5')}
            ${createMeasurementField('demiEcartPoitrine', 'demiEcartPoitrine', 'ex. 9.5')}
            ${createMeasurementField('tourEmmanchure', 'tourEmmanchure', 'ex. 40.5')}
            ${createMeasurementField('hauteurDessousBras', 'hauteurDessousBras', 'ex. 21.75')}
            ${createMeasurementField('carrureDos', 'carrureDos', 'ex. 40')}
            ${createMeasurementField('carrureDevant', 'carrureDevant', 'ex. 35')}
            ${createMeasurementField('longueurEpaule', 'longueurEpaule', 'ex. 14.6')}
            ${createMeasurementField('longueurTailleDevant7eme', 'longueurTailleDevant7eme', 'ex. 58.1')}
            ${createMeasurementField('hauteurCorps', 'hauteurCorps', 'ex. 155')}
          </div>
        </div>

        <!-- Taille Category -->
        <div class="collapsible-category">
          <div class="collapsible-header" onclick="toggleCategory('taille')">
            <span class="collapsible-header-title">${i18n.t('saver.waist')}</span>
            <span class="collapsible-toggle" id="toggle-taille">▼</span>
          </div>
          <div class="collapsible-content" id="content-taille">
            ${createMeasurementField('tourCeinture', 'tourCeinture', 'ex. 88')}
            ${createMeasurementField('tourBassin', 'tourBassin', 'ex. 102')}
            ${createMeasurementField('tourBassinPetitesHanches', 'tourBassinPetitesHanches', 'ex. 89')}
            ${createMeasurementField('tourBassinGrandesHanches', 'tourBassinGrandesHanches', 'ex. 98')}
            ${createMeasurementField('longueurTailleDos', 'longueurTailleDos', 'ex. 45')}
            ${createMeasurementField('longueurTailleDevant', 'longueurTailleDevant', 'ex. 40.8')}
            ${createMeasurementField('hauteurTailleBassin', 'hauteurTailleBassin', 'ex. 20')}
          </div>
        </div>

        <!-- Bras Category -->
        <div class="collapsible-category">
          <div class="collapsible-header" onclick="toggleCategory('bras')">
            <span class="collapsible-header-title">${i18n.t('saver.arms')}</span>
            <span class="collapsible-toggle" id="toggle-bras">▼</span>
          </div>
          <div class="collapsible-content" id="content-bras">
            ${createMeasurementField('longueurBras', 'longueurBras', 'ex. 64')}
            ${createMeasurementField('grosseurBras', 'grosseurBras', 'ex. 27')}
            ${createMeasurementField('hauteurCoude', 'hauteurCoude', 'ex. 35')}
            ${createMeasurementField('tourPoignet', 'tourPoignet', 'ex. 18')}
          </div>
        </div>

        <!-- Jambe Category -->
        <div class="collapsible-category">
          <div class="collapsible-header" onclick="toggleCategory('jambe')">
            <span class="collapsible-header-title">${i18n.t('saver.legs')}</span>
            <span class="collapsible-toggle" id="toggle-jambe">▼</span>
          </div>
          <div class="collapsible-content" id="content-jambe">
            ${createMeasurementField('hauteurTailleTerre', 'hauteurTailleTerre', 'ex. 111.5')}
            ${createMeasurementField('hauteurTailleCoteTerre', 'hauteurTailleCoteTerre', 'ex. 106.5')}
            ${createMeasurementField('hauteurMontant', 'hauteurMontant', 'ex. 27.7')}
            ${createMeasurementField('enfourchure', 'enfourchure', 'ex. 72.7')}
            ${createMeasurementField('hauteurTailleGenou', 'hauteurTailleGenou', 'ex. 62')}
            ${createMeasurementField('longueurEntrejambe', 'longueurEntrejambe', 'ex. 83.8')}
            ${createMeasurementField('tourCuisse', 'tourCuisse', 'ex. 58.1')}
            ${createMeasurementField('tourMollet', 'tourMollet', 'ex. 37.8')}
            ${createMeasurementField('tourJarret', 'tourJarret', 'ex. 34.7')}
          </div>
        </div>
      </fieldset>
    </div>

    <div class="measurement-form">
      <fieldset>
        <legend>${i18n.t('saver.customMeasurement')}</legend>
        
        <div class="form-group">
          <label for="customCategory">${i18n.t('saver.category')}</label>
          <select id="customCategory" style="padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95em; width: 100%; margin-bottom: 10px;">
            <option value="Tete">${i18n.t('saver.head')}</option>
            <option value="Buste">${i18n.t('saver.bust')}</option>
            <option value="Bras">${i18n.t('saver.arms')}</option>
            <option value="Taille">${i18n.t('saver.waist')}</option>
            <option value="Jambe">${i18n.t('saver.legs')}</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        
        <div class="form-group">
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <input type="text" id="customMeasureName" placeholder="${i18n.t('saver.measurementName')}" style="flex: 1; min-width: 150px; padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95em;">
            <div style="flex: 1; min-width: 160px; display: flex; gap: 6px; align-items: flex-end;">
              <input type="number" id="customMeasureValue" placeholder="${i18n.t('saver.value')}" step="0.5" style="flex: 1; min-width: 100px; padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95em;">
              <div class="input-unit-controls">
                <button type="button" class="unit-switch active" onclick="convertUnit('customMeasureValue', 'cm')">cm</button>
                <button type="button" class="unit-switch" onclick="convertUnit('customMeasureValue', 'in')">in</button>
                <button type="button" class="unit-switch" onclick="convertUnit('customMeasureValue', 'ft')">ft</button>
              </div>
            </div>
            <button type="button" style="background-color: #667eea; color: white; padding: 12px 24px; border: none; border-radius: 6px; font-size: 0.95em; font-weight: 500; cursor: pointer;" onclick="addCustomMeasurement()">${i18n.t('saver.add')}</button>
          </div>
        </div>
      </fieldset>
    </div>
  `;

  container.innerHTML = formHTML;
  setupProfileSelectors();
}

function createMeasurementField(id, labelKey, placeholder) {
  return `
    <div class="form-group-with-unit">
      <div class="form-group-input">
        <label for="${id}">${i18n.t(`saver.${labelKey}`)}</label>
        <input type="number" id="${id}" name="${id}" placeholder="${placeholder}" step="0.5">
      </div>
      <div class="input-unit-controls">
        <button type="button" class="unit-switch active" onclick="convertUnit('${id}', 'cm')">cm</button>
        <button type="button" class="unit-switch" onclick="convertUnit('${id}', 'in')">in</button>
        <button type="button" class="unit-switch" onclick="convertUnit('${id}', 'ft')">ft</button>
      </div>
    </div>
  `;
}

// =====================================================
// Standard Profiles (Male/Female)
// =====================================================

const standardDataCache = {
  male: null,
  female: null
};

function normalizeMeasureLabel(label) {
  return label
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function getStandardLabelToFieldMap(sex) {
  const baseMap = {
    "tour de poitrine": 'tourPoitrine',
    "tour de ceinture": 'tourCeinture',
    "tour de bassin": 'tourBassin',
    "longueur taille dos": 'longueurTailleDos',
    "longueur taille devant": 'longueurTailleDevant',
    "longueur taille devant depuis la 7eme cervicale": 'longueurTailleDevant7eme',
    "tour d'encolure": 'tourEncolure',
    "tour de tete": 'tourTete',
    "hauteur de tete": 'hauteurTete',
    "carrure dos": 'carrureDos',
    "carrure devant": 'carrureDevant',
    "longueur d'epaule": 'longueurEpaule',
    "longueur de bras": 'longueurBras',
    "tour de poignet": 'tourPoignet',
    "hauteur du corps": 'hauteurCorps',
    "hauteur taille a terre": 'hauteurTailleTerre',
    "hauteur taille - bassin": 'hauteurTailleBassin',
    "hauteur de montant": 'hauteurMontant',
    "enfourchure": 'enfourchure',
    "hauteur taille au genou": 'hauteurTailleGenou',
    "longueur d'entrejambe": 'longueurEntrejambe',
    "tour de cuisse": 'tourCuisse',
    "tour de mollet": 'tourMollet',
    "tour de jarret": 'tourJarret'
  };

  if (sex !== 'female') {
    return baseMap;
  }

  return {
    ...baseMap,
    "hauteur de poitrine": 'hauteurPoitrine',
    "1/2 ecart de poitrine": 'demiEcartPoitrine',
    "tour de bassin (petites hanches)": 'tourBassinPetitesHanches',
    "tour de bassin (grandes hanches)": 'tourBassinGrandesHanches',
    "tour d'emmanchure": 'tourEmmanchure',
    "hauteur dessous de bras": 'hauteurDessousBras',
    "grosseur de bras": 'grosseurBras',
    "hauteur coude": 'hauteurCoude',
    "hauteur taille cote a terre": 'hauteurTailleCoteTerre'
  };
}

const allMeasurementFieldIds = [
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
  'tourJarret'
];

function updateIrrelevantPlaceholders(sex) {
  const labelMap = getStandardLabelToFieldMap(sex);
  const availableFields = new Set(Object.values(labelMap));
  const irrelevantLabel = i18n?.t ? i18n.t('saver.irrelevantPlaceholder') : 'Irrelevant';

  allMeasurementFieldIds.forEach(fieldId => {
    const input = document.getElementById(fieldId);
    if (!input) return;

    if (!input.getAttribute('data-default-placeholder')) {
      input.setAttribute('data-default-placeholder', input.placeholder || '');
    }

    if (!availableFields.has(fieldId)) {
      input.placeholder = irrelevantLabel;
      input.dataset.displayLabel = irrelevantLabel;
      return;
    }

    input.placeholder = input.getAttribute('data-default-placeholder') || '';
    delete input.dataset.displayLabel;
  });
}

async function loadStandardMeasurements(sex) {
  if (standardDataCache[sex]) return standardDataCache[sex];

  const fileName = sex === 'female'
    ? 'data/standard-female-measurements.json'
    : 'data/standard-male-measurements.json';
  const response = await fetch(fileName);
  if (!response.ok) {
    throw new Error('Failed to load standard measurements');
  }

  const data = await response.json();
  const labelMap = getStandardLabelToFieldMap(sex);
  const bySize = {};

  data.sizes.forEach(size => {
    bySize[String(size)] = {};
  });

  data.measures.forEach(measure => {
    const normalized = normalizeMeasureLabel(measure.label);
    const fieldId = labelMap[normalized];
    if (!fieldId) return;

    Object.entries(measure.values).forEach(([sizeKey, value]) => {
      if (!bySize[sizeKey]) bySize[sizeKey] = {};
      bySize[sizeKey][fieldId] = value;
    });
  });

  standardDataCache[sex] = {
    bySize,
    placeholderValue: data.placeholderValue
  };
  return standardDataCache[sex];
}

function setupProfileSelectors() {
  const sexSelect = document.getElementById('profileSex');
  if (!sexSelect) return;

  sexSelect.value = 'male';
  setupStandardProfileSelect('male');
  updateIrrelevantPlaceholders('male');

  sexSelect.addEventListener('change', function() {
    setupStandardProfileSelect(this.value);
    updateIrrelevantPlaceholders(this.value);
  });
}

async function setupStandardProfileSelect(sex) {
  const select = document.getElementById('bodyType');
  if (!select) return;

  select.innerHTML = `<option value="">${i18n.t('saver.selectProfile')}</option>`;

  try {
    const standard = await loadStandardMeasurements(sex);
    const labelPrefix = sex === 'female' ? i18n.t('saver.female') : i18n.t('saver.male');
    Object.keys(standard.bySize)
      .map(size => parseInt(size, 10))
      .filter(size => !Number.isNaN(size))
      .sort((a, b) => a - b)
      .forEach(size => {
        const label = `${labelPrefix} ${size}`;
        const option = document.createElement('option');
        option.value = `${sex}:${size}`;
        option.textContent = label;
        select.appendChild(option);
      });
  } catch (error) {
    console.error(error);
  }

  select.onchange = function() {
    applyStandardProfile(this.value);
  };
}

function applyStandardProfile(profileValue) {
  if (!profileValue) return;
  const [sex, sizeKey] = profileValue.split(':');
  const standard = standardDataCache[sex];
  if (!sex || !sizeKey || !standard || !standard.bySize[sizeKey]) return;

  Object.entries(standard.bySize[sizeKey]).forEach(([fieldId, value]) => {
    if (value === standard.placeholderValue) return;
    const input = document.getElementById(fieldId);
    if (!input) return;
    input.value = value;
    if (typeof currentUnits === 'object') {
      currentUnits[fieldId] = 'cm';
    }
    if (typeof updateUnitButtons === 'function') {
      updateUnitButtons(fieldId, 'cm');
    }
  });
}

// =====================================================
// Custom Measurements Functions
// =====================================================

function addCustomMeasurement() {
  const category = document.getElementById('customCategory').value;
  const name = document.getElementById('customMeasureName').value.trim();
  const value = document.getElementById('customMeasureValue').value.trim();

  if (!name || !value) {
    alert(i18n.t('saver.enterAtLeast'));
    return;
  }

  if (customMeasurements[category] && customMeasurements[category][name]) {
    alert(i18n.t('saver.alreadyExists'));
    return;
  }

  if (!customMeasurements[category]) {
    customMeasurements[category] = {};
  }

  customMeasurements[category][name] = parseFloat(value);
  document.getElementById('customMeasureName').value = '';
  document.getElementById('customMeasureValue').value = '';
  saveCustomMeasurements();
  displayCustomMeasurements();
}

function removeCustomMeasurement(category, name) {
  if (customMeasurements[category]) {
    delete customMeasurements[category][name];
    saveCustomMeasurements();
    displayCustomMeasurements();
  }
}

function displayCustomMeasurements() {
  const categoryMap = {
    'Tete': 'tete',
    'Buste': 'buste',
    'Bras': 'bras',
    'Taille': 'taille',
    'Jambe': 'jambe',
    'Autre': 'autre'
  };

  Object.values(categoryMap).forEach(categoryId => {
    const contentDiv = document.getElementById(`content-${categoryId}`);
    if (contentDiv) {
      const customGroups = Array.from(contentDiv.querySelectorAll('[data-custom="true"]'));
      customGroups.forEach(group => group.remove());
    }
  });

  Object.entries(customMeasurements).forEach(([category, measurements]) => {
    const items = Object.entries(measurements);
    if (items.length > 0) {
      const categoryId = categoryMap[category];
      const contentDiv = document.getElementById(`content-${categoryId}`);
      
      if (contentDiv) {
        items.forEach(([name, value]) => {
          const formGroup = document.createElement('div');
          formGroup.className = 'form-group';
          formGroup.setAttribute('data-custom', 'true');
          
          const wrapper = document.createElement('div');
          wrapper.style.display = 'flex';
          wrapper.style.justifyContent = 'space-between';
          wrapper.style.alignItems = 'center';
          wrapper.style.gap = '10px';
          
          const label = document.createElement('label');
          label.style.marginBottom = '0';
          label.textContent = name + ':';
          
          const valueDiv = document.createElement('div');
          valueDiv.style.display = 'flex';
          valueDiv.style.alignItems = 'center';
          valueDiv.style.gap = '10px';
          
          const valueSpan = document.createElement('span');
          valueSpan.style.color = '#667eea';
          valueSpan.style.fontWeight = '600';
          valueSpan.textContent = value + ' cm';
          
          const deleteBtn = document.createElement('button');
          deleteBtn.type = 'button';
          deleteBtn.className = 'btn-delete-small';
          deleteBtn.textContent = i18n.t('saver.remove');
          deleteBtn.setAttribute('data-category', category);
          deleteBtn.setAttribute('data-name', name);
          deleteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const cat = this.getAttribute('data-category');
            const nm = this.getAttribute('data-name');
            if (customMeasurements[cat] && customMeasurements[cat][nm]) {
              delete customMeasurements[cat][nm];
              saveCustomMeasurements();
              displayCustomMeasurements();
            }
          });
          
          valueDiv.appendChild(valueSpan);
          valueDiv.appendChild(deleteBtn);
          wrapper.appendChild(label);
          wrapper.appendChild(valueDiv);
          formGroup.appendChild(wrapper);
          contentDiv.appendChild(formGroup);
        });
      }
    }
  });
  
  // Refresh drag and drop for newly added custom measurement fields
  if (typeof refreshDragAndDrop === 'function') {
    refreshDragAndDrop();
  }
}

// =====================================================
// Helper function to collect measurement values
// =====================================================

function collectMeasurementValues() {
  return {
    tourTete: document.getElementById('tourTete').value,
    hauteurTete: document.getElementById('hauteurTete').value,
    tourEncolure: document.getElementById('tourEncolure').value,
    tourPoitrine: document.getElementById('tourPoitrine').value,
    hauteurPoitrine: document.getElementById('hauteurPoitrine').value,
    demiEcartPoitrine: document.getElementById('demiEcartPoitrine').value,
    carrureDos: document.getElementById('carrureDos').value,
    carrureDevant: document.getElementById('carrureDevant').value,
    longueurEpaule: document.getElementById('longueurEpaule').value,
    longueurTailleDevant7eme: document.getElementById('longueurTailleDevant7eme').value,
    hauteurCorps: document.getElementById('hauteurCorps').value,
    tourCeinture: document.getElementById('tourCeinture').value,
    tourBassin: document.getElementById('tourBassin').value,
    tourBassinPetitesHanches: document.getElementById('tourBassinPetitesHanches').value,
    tourBassinGrandesHanches: document.getElementById('tourBassinGrandesHanches').value,
    longueurTailleDos: document.getElementById('longueurTailleDos').value,
    longueurTailleDevant: document.getElementById('longueurTailleDevant').value,
    hauteurTailleBassin: document.getElementById('hauteurTailleBassin').value,
    tourEmmanchure: document.getElementById('tourEmmanchure').value,
    hauteurDessousBras: document.getElementById('hauteurDessousBras').value,
    longueurBras: document.getElementById('longueurBras').value,
    grosseurBras: document.getElementById('grosseurBras').value,
    hauteurCoude: document.getElementById('hauteurCoude').value,
    tourPoignet: document.getElementById('tourPoignet').value,
    hauteurTailleTerre: document.getElementById('hauteurTailleTerre').value,
    hauteurTailleCoteTerre: document.getElementById('hauteurTailleCoteTerre').value,
    hauteurMontant: document.getElementById('hauteurMontant').value,
    enfourchure: document.getElementById('enfourchure').value,
    hauteurTailleGenou: document.getElementById('hauteurTailleGenou').value,
    longueurEntrejambe: document.getElementById('longueurEntrejambe').value,
    tourCuisse: document.getElementById('tourCuisse').value,
    tourMollet: document.getElementById('tourMollet').value,
    tourJarret: document.getElementById('tourJarret').value
  };
}

function loadMeasurementValues(measurements) {
  document.getElementById('tourTete').value = measurements.tourTete || '';
  document.getElementById('hauteurTete').value = measurements.hauteurTete || '';
  document.getElementById('tourEncolure').value = measurements.tourEncolure || '';
  document.getElementById('tourPoitrine').value = measurements.tourPoitrine || '';
  document.getElementById('hauteurPoitrine').value = measurements.hauteurPoitrine || '';
  document.getElementById('demiEcartPoitrine').value = measurements.demiEcartPoitrine || '';
  document.getElementById('carrureDos').value = measurements.carrureDos || '';
  document.getElementById('carrureDevant').value = measurements.carrureDevant || '';
  document.getElementById('longueurEpaule').value = measurements.longueurEpaule || '';
  document.getElementById('longueurTailleDevant7eme').value = measurements.longueurTailleDevant7eme || '';
  document.getElementById('hauteurCorps').value = measurements.hauteurCorps || '';
  document.getElementById('tourCeinture').value = measurements.tourCeinture || '';
  document.getElementById('tourBassin').value = measurements.tourBassin || '';
  document.getElementById('tourBassinPetitesHanches').value = measurements.tourBassinPetitesHanches || '';
  document.getElementById('tourBassinGrandesHanches').value = measurements.tourBassinGrandesHanches || '';
  document.getElementById('longueurTailleDos').value = measurements.longueurTailleDos || '';
  document.getElementById('longueurTailleDevant').value = measurements.longueurTailleDevant || '';
  document.getElementById('hauteurTailleBassin').value = measurements.hauteurTailleBassin || '';
  document.getElementById('tourEmmanchure').value = measurements.tourEmmanchure || '';
  document.getElementById('hauteurDessousBras').value = measurements.hauteurDessousBras || '';
  document.getElementById('longueurBras').value = measurements.longueurBras || '';
  document.getElementById('grosseurBras').value = measurements.grosseurBras || '';
  document.getElementById('hauteurCoude').value = measurements.hauteurCoude || '';
  document.getElementById('tourPoignet').value = measurements.tourPoignet || '';
  document.getElementById('hauteurTailleTerre').value = measurements.hauteurTailleTerre || '';
  document.getElementById('hauteurTailleCoteTerre').value = measurements.hauteurTailleCoteTerre || '';
  document.getElementById('hauteurMontant').value = measurements.hauteurMontant || '';
  document.getElementById('enfourchure').value = measurements.enfourchure || '';
  document.getElementById('hauteurTailleGenou').value = measurements.hauteurTailleGenou || '';
  document.getElementById('longueurEntrejambe').value = measurements.longueurEntrejambe || '';
  document.getElementById('tourCuisse').value = measurements.tourCuisse || '';
  document.getElementById('tourMollet').value = measurements.tourMollet || '';
  document.getElementById('tourJarret').value = measurements.tourJarret || '';
}

// =====================================================
// Converter Feature - Functionality
// =====================================================

// Load HTML content for the converter
function loadConverterAndScalerContent() {
  const container = document.getElementById('converterAndScalerContainer');
  if (!container) return;

  const converterHTML = `
    <div class="converter-panel">
      <h3>${i18n.t('converter.title')}</h3>
      
      <!-- Linear Measurements -->
      <div class="converter-group">
        <div class="converter-group-title">${i18n.t('converter.linearMeasurements')}</div>
        <div class="converter-inputs">
          <div class="converter-input-field" style="flex: 2;">
            <label for="linearInput">${i18n.t('converter.value')}</label>
            <input type="number" id="linearInput" placeholder="Enter a value" step="0.01" oninput="convertLinear()">
          </div>
          <select id="linearFromUnit" class="converter-select" onchange="convertLinear()" style="height: 42px; margin-bottom: 0;">
            <option value="cm">${i18n.t('converter.cm')}</option>
            <option value="m">${i18n.t('converter.m')}</option>
            <option value="in">${i18n.t('converter.inches')}</option>
            <option value="ft">${i18n.t('converter.feet')}</option>
          </select>
        </div>
        <div class="converter-results" id="linearResults" style="display: none;">
          <div class="converter-result-row">
            <span class="converter-result-label">${i18n.t('converter.cm')} :</span>
            <span class="converter-result-value" id="linearCm">-</span>
          </div>
          <div class="converter-result-row">
            <span class="converter-result-label">${i18n.t('converter.m')} :</span>
            <span class="converter-result-value" id="linearM">-</span>
          </div>
          <div class="converter-result-row">
            <span class="converter-result-label">${i18n.t('converter.inches')} :</span>
            <span class="converter-result-value" id="linearIn">-</span>
          </div>
          <div class="converter-result-row">
            <span class="converter-result-label">${i18n.t('converter.feet')} :</span>
            <span class="converter-result-value" id="linearFt">-</span>
          </div>
        </div>
      </div>

      <!-- Area Measurements -->
      <div class="converter-group">
        <div class="converter-group-title">${i18n.t('converter.areaMeasurements')}</div>
        <div class="converter-inputs">
          <div class="converter-input-field" style="flex: 2;">
            <label for="areaInput">${i18n.t('converter.value')}</label>
            <input type="number" id="areaInput" placeholder="Enter a value" step="0.01" oninput="convertArea()">
          </div>
          <select id="areaFromUnit" class="converter-select" onchange="convertArea()" style="height: 42px; margin-bottom: 0;">
            <option value="cm2">${i18n.t('converter.cm2')}</option>
            <option value="m2">${i18n.t('converter.m2')}</option>
            <option value="yards">${i18n.t('converter.yards2')}</option>
          </select>
        </div>
        <div class="converter-results" id="areaResults" style="display: none;">
          <div class="converter-result-row">
            <span class="converter-result-label">${i18n.t('converter.cm2')} :</span>
            <span class="converter-result-value" id="areaCm2">-</span>
          </div>
          <div class="converter-result-row">
            <span class="converter-result-label">${i18n.t('converter.m2')} :</span>
            <span class="converter-result-value" id="areaM2">-</span>
          </div>
          <div class="converter-result-row">
            <span class="converter-result-label">${i18n.t('converter.yards2')} :</span>
            <span class="converter-result-value" id="areaYards">-</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add converter HTML and load scaler after it
  container.innerHTML = converterHTML;
  loadScalerContent();
  loadSolverContent();
}

// =====================================================
// Linear Conversion
// =====================================================

function convertLinear() {
  const input = document.getElementById('linearInput');
  const unit = document.getElementById('linearFromUnit').value;
  const results = document.getElementById('linearResults');

  if (!input.value) {
    results.style.display = 'none';
    return;
  }

  const value = parseFloat(input.value);
  if (Number.isNaN(value)) {
    results.style.display = 'none';
    return;
  }

  let valueInCm = value;
  if (unit === 'm') {
    valueInCm = value * 100;
  } else if (unit === 'in') {
    valueInCm = value * inchToCm;
  } else if (unit === 'ft') {
    valueInCm = value * ftToCm;
  }

  const valueInM = valueInCm / 100;
  const valueInIn = valueInCm * cmToInch;
  const valueInFt = valueInCm * cmToFt;

  document.getElementById('linearCm').textContent = formatNumber(valueInCm);
  document.getElementById('linearM').textContent = formatNumber(valueInM);
  document.getElementById('linearIn').textContent = formatNumber(valueInIn);
  document.getElementById('linearFt').textContent = formatNumber(valueInFt);
  results.style.display = 'block';
}

// =====================================================
// Area Conversion
// =====================================================

function convertArea() {
  const input = document.getElementById('areaInput');
  const unit = document.getElementById('areaFromUnit').value;
  const results = document.getElementById('areaResults');

  if (!input.value) {
    results.style.display = 'none';
    return;
  }

  const value = parseFloat(input.value);
  if (Number.isNaN(value)) {
    results.style.display = 'none';
    return;
  }

  let valueInM2 = value;
  if (unit === 'cm2') {
    valueInM2 = value / 10000;
  } else if (unit === 'yards') {
    valueInM2 = value * 0.83612736;
  }

  const valueInCm2 = valueInM2 * 10000;
  const valueInYards = valueInM2 / 0.83612736;

  document.getElementById('areaCm2').textContent = formatNumber(valueInCm2);
  document.getElementById('areaM2').textContent = formatNumber(valueInM2);
  document.getElementById('areaYards').textContent = formatNumber(valueInYards);
  results.style.display = 'block';
}

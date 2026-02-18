// =====================================================
// Scaler Feature - Functionality
// =====================================================

// Load HTML content for the scaler (called from converter.js)
function loadScalerContent() {
  const container = document.getElementById('converterAndScalerContainer');
  if (!container) return;

  const scalerHTML = `
    <div class="converter-panel ratio-panel" id="ratioPanel">
      <h3>${i18n.t('scaler.title')}</h3>
      <div class="ratio-panel-note">${i18n.t('scaler.note')}</div>
      <div class="ratio-inputs">
        <div class="ratio-input-field">
          <label for="scaleOriginInput">${i18n.t('scaler.originalMeasurement')}</label>
          <input type="number" id="scaleOriginInput" placeholder="ex. 52" step="0.01" oninput="updateScaleFields('origin')">
        </div>
        <div class="ratio-input-field">
          <label for="scaleNewInput">${i18n.t('scaler.newMeasurement')}</label>
          <input type="number" id="scaleNewInput" placeholder="ex. 60" step="0.01" oninput="updateScaleFields('new')">
        </div>
        <div class="ratio-input-field">
          <label for="scaleRatioInput">${i18n.t('scaler.scalingRatio')}</label>
          <input type="number" id="scaleRatioInput" placeholder="ex. 1.15" step="0.0001" oninput="updateScaleFields('ratio')">
        </div>
      </div>
      <div class="ratio-actions">
        <button type="button" class="btn-reset-ratio" onclick="clearScaleFields()">${i18n.t('scaler.reset')}</button>
      </div>
    </div>
  `;

  container.innerHTML += scalerHTML;
}

// =====================================================
// Scale Field Update Logic
// =====================================================

function updateScaleFields(source) {
  const originInput = document.getElementById('scaleOriginInput');
  const newInput = document.getElementById('scaleNewInput');
  const ratioInput = document.getElementById('scaleRatioInput');

  if (!originInput || !newInput || !ratioInput) return;

  const originValue = parseScaleValue(originInput.value);
  const newValue = parseScaleValue(newInput.value);
  const ratioValue = parseScaleValue(ratioInput.value);

  if (source === 'ratio') {
    if (originValue !== null && ratioValue !== null) {
      newInput.value = formatNumber(originValue * ratioValue);
    } else if (newValue !== null && ratioValue !== null && ratioValue !== 0) {
      originInput.value = formatNumber(newValue / ratioValue);
    }
    return;
  }

  if (source === 'origin') {
    if (originValue !== null && newValue !== null && originValue !== 0) {
      ratioInput.value = formatNumber(newValue / originValue);
    } else if (originValue !== null && ratioValue !== null) {
      newInput.value = formatNumber(originValue * ratioValue);
    }
    return;
  }

  if (source === 'new') {
    if (originValue !== null && newValue !== null && originValue !== 0) {
      ratioInput.value = formatNumber(newValue / originValue);
    } else if (newValue !== null && ratioValue !== null && ratioValue !== 0) {
      originInput.value = formatNumber(newValue / ratioValue);
    }
  }
}

function clearScaleFields() {
  const originInput = document.getElementById('scaleOriginInput');
  const newInput = document.getElementById('scaleNewInput');
  const ratioInput = document.getElementById('scaleRatioInput');

  if (originInput) originInput.value = '';
  if (newInput) newInput.value = '';
  if (ratioInput) ratioInput.value = '';
}

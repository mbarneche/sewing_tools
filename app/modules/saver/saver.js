// =====================================================
// Saver Feature - Functionality
// =====================================================

// Load HTML content for the saver
function loadSaverContent() {
  const container = document.getElementById('saverContainer');
  if (!container) return;

  const saverHTML = `
    <div class="button-group">
      <div style="flex: 1; display: flex; gap: 10px;">
        <input type="text" id="saveName" placeholder="${i18n.t('saver.savePlaceholder')}" style="flex: 1; padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-size: 0.95em;">
        <button class="btn-save" onclick="saveMeasurements()">${i18n.t('saver.save')}</button>
      </div>
    </div>

    <div class="saved-measurements-section">
      <h3>${i18n.t('saver.savedMeasurements')}</h3>
      <div class="export-import-buttons">
        <button class="btn-export" onclick="exportAllMeasurements()">${i18n.t('saver.exportAll')}</button>
        <button class="btn-import" onclick="document.getElementById('fileInput').click()">${i18n.t('saver.importFromFile')}</button>
        <input type="file" id="fileInput" accept=".json" onchange="importMeasurements(event)">
      </div>
      <div id="savedList" class="saved-list">
        <div class="empty-message">${i18n.t('saver.noMeasurements')}</div>
      </div>
    </div>
  `;

  container.innerHTML = saverHTML;
}
// =====================================================
// Save and Load Functions
// =====================================================

function saveMeasurements() {
  const saveName = document.getElementById('saveName').value.trim();
  if (!saveName) {
    alert(i18n.t('saver.enterName'));
    return;
  }

  const measurements = collectMeasurementValues();

  if (!Object.values(measurements).some(val => val)) {
    alert(i18n.t('saver.enterAtLeast'));
    return;
  }

  const savedData = JSON.parse((window.safeStorage && window.safeStorage.getItem('sewingMeasurements')) || '{}');
  const timestamp = new Date().toLocaleString(i18n.currentLanguage);

  savedData[saveName] = {
    measurements,
    customMeasurements: { ...customMeasurements },
    savedAt: timestamp
  };

  if (window.safeStorage) window.safeStorage.setItem('sewingMeasurements', JSON.stringify(savedData));
  document.getElementById('saveName').value = '';
  displaySavedMeasurements();
  alert(i18n.t('saver.measurementSaved'));
}

function displaySavedMeasurements() {
  const savedData = JSON.parse((window.safeStorage && window.safeStorage.getItem('sewingMeasurements')) || '{}');
  const savedList = document.getElementById('savedList');

  if (!savedList) return;

  if (Object.keys(savedData).length === 0) {
    savedList.innerHTML = `<div class="empty-message">${i18n.t('saver.noMeasurements')}</div>`;
    return;
  }

  savedList.innerHTML = '';
  Object.entries(savedData).forEach(([name, data]) => {
    const item = document.createElement('div');
    item.className = 'saved-item';
    
    const infoDiv = document.createElement('div');
    infoDiv.className = 'saved-item-info';
    infoDiv.style.cursor = 'pointer';
    infoDiv.addEventListener('click', function() { loadMeasurements(name); });
    
    const nameDiv = document.createElement('div');
    nameDiv.className = 'saved-item-name';
    nameDiv.textContent = name;
    
    const dateDiv = document.createElement('div');
    dateDiv.className = 'saved-item-date';
    dateDiv.textContent = data.savedAt;
    
    infoDiv.appendChild(nameDiv);
    infoDiv.appendChild(dateDiv);
    
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'saved-item-actions';
    
    const exportBtn = document.createElement('button');
    exportBtn.className = 'btn-export';
    exportBtn.textContent = i18n.t('saver.export');
    exportBtn.addEventListener('click', function() { exportMeasurement(name); });
    
    const printBtn = document.createElement('button');
    printBtn.className = 'btn-print';
    printBtn.textContent = i18n.t('saver.print');
    printBtn.addEventListener('click', function() { printMeasurement(name); });
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = i18n.t('saver.delete');
    deleteBtn.addEventListener('click', function() { deleteMeasurements(name); });
    
    actionsDiv.appendChild(exportBtn);
    actionsDiv.appendChild(printBtn);
    actionsDiv.appendChild(deleteBtn);
    
    item.appendChild(infoDiv);
    item.appendChild(actionsDiv);
    savedList.appendChild(item);
  });
}

function loadMeasurements(name) {
  const savedData = JSON.parse((window.safeStorage && window.safeStorage.getItem('sewingMeasurements')) || '{}');
  if (savedData[name]) {
    const measurements = savedData[name].measurements;
    loadMeasurementValues(measurements);
    
    customMeasurements = savedData[name].customMeasurements;
    
    displayCustomMeasurements();
    
    // Refresh drag and drop after loading measurements
    if (typeof refreshDragAndDrop === 'function') {
      refreshDragAndDrop();
    }
  }
}

function deleteMeasurements(name) {
  if (confirm(`${i18n.t('saver.confirmDelete')} "${name}"?`)) {
    const savedData = JSON.parse((window.safeStorage && window.safeStorage.getItem('sewingMeasurements')) || '{}');
    delete savedData[name];
    if (window.safeStorage) window.safeStorage.setItem('sewingMeasurements', JSON.stringify(savedData));
    displaySavedMeasurements();
  }
}

// =====================================================
// Export and Import Functions
// =====================================================

function exportMeasurement(name) {
  const savedData = JSON.parse((window.safeStorage && window.safeStorage.getItem('sewingMeasurements')) || '{}');
  if (savedData[name]) {
    const dataToExport = {
      name: name,
      data: savedData[name]
    };
    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}${i18n.t('saver.measuresBackup')}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

function exportAllMeasurements() {
  const savedData = JSON.parse((window.safeStorage && window.safeStorage.getItem('sewingMeasurements')) || '{}');
  if (Object.keys(savedData).length === 0) {
    alert(i18n.t('saver.noMeasurements'));
    return;
  }
  const jsonString = JSON.stringify(savedData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${i18n.t('saver.allMeasuresBackup')}_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function importMeasurements(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedData = JSON.parse(e.target.result);
      const savedData = JSON.parse((window.safeStorage && window.safeStorage.getItem('sewingMeasurements')) || '{}');

      if (importedData.name && importedData.data) {
        const name = importedData.name;
        if (savedData[name]) {
          if (confirm(`${i18n.t('saver.measurementExists')} "${name}" ${i18n.t('saver.alreadyExistsReplace')}`)) {
            savedData[name] = importedData.data;
            if (window.safeStorage) window.safeStorage.setItem('sewingMeasurements', JSON.stringify(savedData));
            displaySavedMeasurements();
            alert(i18n.t('saver.measurementImported'));
          }
        } else {
          savedData[name] = importedData.data;
          if (window.safeStorage) window.safeStorage.setItem('sewingMeasurements', JSON.stringify(savedData));
          displaySavedMeasurements();
          alert(i18n.t('saver.measurementImported'));
        }
      } else {
        let importedCount = 0;
        Object.entries(importedData).forEach(([name, data]) => {
          if (!savedData[name]) {
            savedData[name] = data;
            importedCount++;
          }
        });

        if (importedCount > 0) {
          if (window.safeStorage) window.safeStorage.setItem('sewingMeasurements', JSON.stringify(savedData));
          displaySavedMeasurements();
          alert(`${importedCount} ${i18n.t('saver.measurementsImported')}`);
        } else {
          alert(i18n.t('saver.nothingToImport'));
        }
      }
    } catch (error) {
      alert(i18n.t('saver.errorReading'));
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

function printMeasurement(name) {
  const savedData = JSON.parse((window.safeStorage && window.safeStorage.getItem('sewingMeasurements')) || '{}');
  if (savedData[name]) {
    const m = savedData[name].measurements;
    const customMeasures = savedData[name].customMeasurements

    const measurementLabels = {
      tourTete: i18n.t('saver.tourTete'),
      hauteurTete: i18n.t('saver.hauteurTete'),
      tourEncolure: i18n.t('saver.tourEncolure'),
      tourPoitrine: i18n.t('saver.tourPoitrine'),
      hauteurPoitrine: i18n.t('saver.hauteurPoitrine'),
      demiEcartPoitrine: i18n.t('saver.demiEcartPoitrine'),
      carrureDos: i18n.t('saver.carrureDos'),
      carrureDevant: i18n.t('saver.carrureDevant'),
      longueurEpaule: i18n.t('saver.longueurEpaule'),
      longueurTailleDevant7eme: i18n.t('saver.longueurTailleDevant7eme'),
      hauteurCorps: i18n.t('saver.hauteurCorps'),
      tourCeinture: i18n.t('saver.tourCeinture'),
      tourBassin: i18n.t('saver.tourBassin'),
      tourBassinPetitesHanches: i18n.t('saver.tourBassinPetitesHanches'),
      tourBassinGrandesHanches: i18n.t('saver.tourBassinGrandesHanches'),
      longueurTailleDos: i18n.t('saver.longueurTailleDos'),
      longueurTailleDevant: i18n.t('saver.longueurTailleDevant'),
      hauteurTailleBassin: i18n.t('saver.hauteurTailleBassin'),
      tourEmmanchure: i18n.t('saver.tourEmmanchure'),
      hauteurDessousBras: i18n.t('saver.hauteurDessousBras'),
      longueurBras: i18n.t('saver.longueurBras'),
      grosseurBras: i18n.t('saver.grosseurBras'),
      hauteurCoude: i18n.t('saver.hauteurCoude'),
      tourPoignet: i18n.t('saver.tourPoignet'),
      hauteurTailleTerre: i18n.t('saver.hauteurTailleTerre'),
      hauteurTailleCoteTerre: i18n.t('saver.hauteurTailleCoteTerre'),
      hauteurMontant: i18n.t('saver.hauteurMontant'),
      enfourchure: i18n.t('saver.enfourchure'),
      hauteurTailleGenou: i18n.t('saver.hauteurTailleGenou'),
      longueurEntrejambe: i18n.t('saver.longueurEntrejambe'),
      tourCuisse: i18n.t('saver.tourCuisse'),
      tourMollet: i18n.t('saver.tourMollet'),
      tourJarret: i18n.t('saver.tourJarret')
    };

    let printContent = `
      <html>
        <head>
          <title>${name} - Measurements</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 20px; }
            h1 { color: #667eea; text-align: center; }
            .date { text-align: center; color: #999; margin-bottom: 30px; }
            .measurements { margin: 30px 0; }
            .measurement-item { 
              display: flex; 
              justify-content: space-between; 
              padding: 12px; 
              border-bottom: 1px solid #eee;
              font-size: 16px;
            }
            .measurement-item label { font-weight: bold; color: #333; }
            .measurement-item value { color: #667eea; font-weight: bold; }
            .category-title { margin-top: 20px; color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px; font-weight: bold; }
            .footer { text-align: center; color: #999; margin-top: 40px; font-size: 12px; }
            @media print {
              body { margin: 0; padding: 10mm; }
            }
          </style>
        </head>
        <body>
          <h1>${i18n.t('saver.measurementsOf')}</h1>
          <div class="date">${name}</div>
          <div class="date">${i18n.t('saver.savedAt')} ${savedData[name].savedAt}</div>
          <div class="measurements">
    `;

    Object.entries(measurementLabels).forEach(([key, label]) => {
      if (m[key]) {
        printContent += `
          <div class="measurement-item">
            <label>${label}:</label>
            <value>${m[key]} cm</value>
          </div>
        `;
      }
    });

    Object.entries(customMeasures).forEach(([category, items]) => {
      const measurementEntries = Object.entries(items);
      if (measurementEntries.length > 0) {
        printContent += `<div class="category-title">${category}</div>`;
        measurementEntries.forEach(([customName, customValue]) => {
          printContent += `
            <div class="measurement-item">
              <label>${customName}:</label>
              <value>${customValue} cm</value>
            </div>
          `;
        });
      }
    });

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.writeln(printContent);
    printWindow.document.close();
    printWindow.print();
  }
}

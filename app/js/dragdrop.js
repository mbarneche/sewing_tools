// =====================================================
// Drag and Drop Functionality for Field Values
// =====================================================

// State management for drag and drop
const dragDropState = {
  draggedElement: null,
  draggedValue: null,
  draggedLabel: null,
  ghostElement: null,
  originalBackground: null
};

// =====================================================
// Initialize Drag and Drop
// =====================================================

function initializeDragAndDrop() {
  // Wait a bit to ensure all fields are loaded
  setTimeout(() => {
    enableDragAndDropOnAllFields();
  }, 100);
}

function enableDragAndDropOnAllFields() {
  // Get all input fields (number type for measurements and conversions)
  const allInputs = document.querySelectorAll('input[type="number"]');
  
  allInputs.forEach(input => {
    makeFieldDraggable(input);
    makeFieldDroppable(input);
  });
}

// =====================================================
// Make Field Draggable
// =====================================================

function makeFieldDraggable(input) {
  // Set draggable attribute
  input.setAttribute('draggable', 'true');
  input.style.cursor = 'grab';
  
  // Drag start event
  input.addEventListener('dragstart', (e) => {
    if (!input.value || input.value === '') {
      e.preventDefault();
      return;
    }
    
    input.style.cursor = 'grabbing';
    dragDropState.draggedElement = input;
    dragDropState.draggedValue = input.value;
    dragDropState.originalBackground = input.style.backgroundColor;
    
    // Get label for this input
    const label = getLabelForInput(input);
    dragDropState.draggedLabel = label;
    
    // Set drag data
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', input.value);
    
    // Add visual feedback to source
    input.classList.add('drag-source');
    
    // Highlight all potential drop targets
    highlightDropTargets(input);
    
    // Create ghost element
    createGhostElement(input, label);
  });
  
  // Drag end event
  input.addEventListener('dragend', (e) => {
    input.style.cursor = 'grab';
    input.classList.remove('drag-source');
    
    // Remove highlight from all drop targets
    removeDropTargetHighlights();
    
    // Remove ghost element
    if (dragDropState.ghostElement) {
      dragDropState.ghostElement.remove();
      dragDropState.ghostElement = null;
    }
    
    // Clear state
    dragDropState.draggedElement = null;
    dragDropState.draggedValue = null;
    dragDropState.draggedLabel = null;
  });
}

// =====================================================
// Make Field Droppable
// =====================================================

function makeFieldDroppable(input) {
  // Drag over event (required to allow drop)
  input.addEventListener('dragover', (e) => {
    if (dragDropState.draggedElement && dragDropState.draggedElement !== input) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      
      // Add hover effect
      input.classList.add('drop-target-hover');
      
      // Show preview
      showDropPreview(input);
    }
  });
  
  // Drag enter event
  input.addEventListener('dragenter', (e) => {
    if (dragDropState.draggedElement && dragDropState.draggedElement !== input) {
      e.preventDefault();
      input.classList.add('drop-target-hover');
    }
  });
  
  // Drag leave event
  input.addEventListener('dragleave', (e) => {
    input.classList.remove('drop-target-hover');
    hideDropPreview(input);
  });
  
  // Drop event
  input.addEventListener('drop', (e) => {
    e.preventDefault();
    input.classList.remove('drop-target-hover');
    hideDropPreview(input);
    
    if (dragDropState.draggedElement && dragDropState.draggedElement !== input) {
      // Transfer the value
      const oldValue = input.value;
      input.value = dragDropState.draggedValue;
      
      // Trigger input event to update any dependent calculations
      input.dispatchEvent(new Event('input', { bubbles: true }));
      
      // Visual feedback - flash animation
      flashElement(input);
      
      // If this is a converter or scaler field, trigger its update function
      triggerFieldUpdate(input);
    }
  });
}

// =====================================================
// Visual Feedback Functions
// =====================================================

function getLabelForInput(input) {
  // Try to find associated label
  const id = input.id;
  if (id) {
    const label = document.querySelector(`label[for="${id}"]`);
    if (label) {
      return label.textContent.trim();
    }
  }
  
  // Try to find label in parent
  const parent = input.closest('.form-group, .form-group-with-unit, .converter-input-field, .ratio-input-field');
  if (parent) {
    const label = parent.querySelector('label');
    if (label) {
      return label.textContent.trim();
    }
  }
  
  return input.placeholder || 'Value';
}

function createGhostElement(input, label) {
  const ghost = document.createElement('div');
  ghost.className = 'drag-ghost';
  ghost.innerHTML = `
    <div class="drag-ghost-label">${label}</div>
    <div class="drag-ghost-value">${input.value}</div>
  `;
  document.body.appendChild(ghost);
  dragDropState.ghostElement = ghost;
  
  // Position the ghost element near the cursor
  document.addEventListener('dragover', positionGhostElement);
}

function positionGhostElement(e) {
  if (dragDropState.ghostElement) {
    dragDropState.ghostElement.style.left = (e.clientX + 15) + 'px';
    dragDropState.ghostElement.style.top = (e.clientY + 15) + 'px';
  }
}

function highlightDropTargets(sourceInput) {
  const allInputs = document.querySelectorAll('input[type="number"]');
  allInputs.forEach(input => {
    if (input !== sourceInput && !input.disabled && !input.readOnly) {
      input.classList.add('drop-target-available');
    }
  });
}

function removeDropTargetHighlights() {
  const allInputs = document.querySelectorAll('input[type="number"]');
  allInputs.forEach(input => {
    input.classList.remove('drop-target-available', 'drop-target-hover');
  });
  document.removeEventListener('dragover', positionGhostElement);
}

function showDropPreview(input) {
  // Remove any existing preview
  hideDropPreview(input);
  
  // Create preview element
  const preview = document.createElement('div');
  preview.className = 'drop-preview';
  preview.textContent = `→ ${dragDropState.draggedValue}`;
  
  // Position it relative to the input
  const parent = input.closest('.form-group, .form-group-with-unit, .converter-input-field, .ratio-input-field');
  if (parent) {
    preview.id = `preview-${input.id || Math.random()}`;
    parent.style.position = 'relative';
    parent.appendChild(preview);
  }
}

function hideDropPreview(input) {
  const parent = input.closest('.form-group, .form-group-with-unit, .converter-input-field, .ratio-input-field');
  if (parent) {
    const preview = parent.querySelector('.drop-preview');
    if (preview) {
      preview.remove();
    }
  }
}

function flashElement(element) {
  element.classList.add('drop-success');
  setTimeout(() => {
    element.classList.remove('drop-success');
  }, 600);
}

// =====================================================
// Trigger Updates for Specific Fields
// =====================================================

function triggerFieldUpdate(input) {
  const id = input.id;
  
  // Converter fields
  if (id === 'linearInput') {
    if (typeof convertLinear === 'function') convertLinear();
  } else if (id === 'areaInput') {
    if (typeof convertArea === 'function') convertArea();
  }
  // Scaler fields
  else if (id === 'scaleOriginInput') {
    if (typeof updateScaleFields === 'function') updateScaleFields('origin');
  } else if (id === 'scaleNewInput') {
    if (typeof updateScaleFields === 'function') updateScaleFields('new');
  } else if (id === 'scaleRatioInput') {
    if (typeof updateScaleFields === 'function') updateScaleFields('ratio');
  }
}

// =====================================================
// Re-initialize on Dynamic Content
// =====================================================

// Function to call when new fields are added dynamically
function refreshDragAndDrop() {
  enableDragAndDropOnAllFields();
}

// Export for use in other modules
window.refreshDragAndDrop = refreshDragAndDrop;

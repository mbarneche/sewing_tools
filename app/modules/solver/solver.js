// =====================================================
// Solver Feature - Functionality
// =====================================================

// State management for equations
let solverEquations = [];
let equationIdCounter = 0;

// Load HTML content for the solver (called from converter.js)
function loadSolverContent() {
  const container = document.getElementById('converterAndScalerContainer');
  if (!container) return;

  const solverHTML = `
    <div class="converter-panel solver-panel" id="solverPanel">
      <h3>${i18n.t('solver.title')}</h3>
      <div id="solverEquationsContainer" class="solver-equations-container">
        <!-- Equations will be added here dynamically -->
      </div>
      <div id="addEquationPrompt" class="add-equation-prompt" onclick="addSolverEquation()">
        ${i18n.t('solver.addEquation')}
      </div>
    </div>
  `;

  container.innerHTML += solverHTML;
}

// =====================================================
// Add New Equation
// =====================================================

function addSolverEquation() {
  const equationId = ++equationIdCounter;
  const equation = {
    id: equationId,
    field1: null,
    field2: null,
    result: null,
    operator: '+'
  };
  
  solverEquations.push(equation);
  renderSolverEquations();
  
  // Hide the prompt after 4 equations
  if (solverEquations.length >= 4) {
    const prompt = document.getElementById('addEquationPrompt');
    if (prompt) {
      prompt.style.display = 'none';
    }
  }
  
  // Refresh drag and drop for new fields
  if (typeof refreshDragAndDrop === 'function') {
    setTimeout(() => refreshDragAndDrop(), 50);
  }
}

// =====================================================
// Remove Equation
// =====================================================

function removeSolverEquation(equationId) {
  solverEquations = solverEquations.filter(eq => eq.id !== equationId);
  renderSolverEquations();
  
  // Show the prompt again if less than 4 equations
  if (solverEquations.length < 4) {
    const prompt = document.getElementById('addEquationPrompt');
    if (prompt) {
      prompt.style.display = 'block';
    }
  }
}

// =====================================================
// Render All Equations
// =====================================================

function renderSolverEquations() {
  const container = document.getElementById('solverEquationsContainer');
  if (!container) return;
  
  container.innerHTML = '';
  
  solverEquations.forEach(equation => {
    const equationDiv = document.createElement('div');
    equationDiv.className = 'solver-equation';
    equationDiv.innerHTML = `
      <div class="solver-equation-fields">
        <input type="number" 
               class="solver-input" 
               id="solver-field1-${equation.id}" 
               placeholder="0" 
               step="0.01"
               oninput="updateSolverEquation(${equation.id}, 'field1', this.value)">
        
        <button class="solver-operator" 
                onclick="cycleSolverOperator(${equation.id})">
          ${getOperatorSymbol(equation.operator)}
        </button>
        
        <input type="number" 
               class="solver-input" 
               id="solver-field2-${equation.id}" 
               placeholder="0" 
               step="0.01"
               oninput="updateSolverEquation(${equation.id}, 'field2', this.value)">
        
        <button class="solver-equals" 
                onclick="calculateSolverEquation(${equation.id})">
          =
        </button>
        
        <input type="number" 
               class="solver-input solver-result" 
               id="solver-result-${equation.id}" 
               placeholder="?" 
               step="0.01"
               readonly>
        
        <button class="solver-remove" 
                onclick="removeSolverEquation(${equation.id})"
                title="${i18n.t('solver.remove')}">
          ×
        </button>
      </div>
    `;
    
    container.appendChild(equationDiv);
    
    // Set current values if they exist
    if (equation.field1 !== null) {
      document.getElementById(`solver-field1-${equation.id}`).value = equation.field1;
    }
    if (equation.field2 !== null) {
      document.getElementById(`solver-field2-${equation.id}`).value = equation.field2;
    }
    if (equation.result !== null) {
      document.getElementById(`solver-result-${equation.id}`).value = formatNumber(equation.result);
    }
  });
}

// =====================================================
// Operator Management
// =====================================================

function getOperatorSymbol(operator) {
  const symbols = {
    '+': '+',
    '-': '-',
    'x': '×',
    '/': '÷'
  };
  return symbols[operator] || '+';
}

function cycleSolverOperator(equationId) {
  const equation = solverEquations.find(eq => eq.id === equationId);
  if (!equation) return;
  
  const operators = ['+', '-', 'x', '/'];
  const currentIndex = operators.indexOf(equation.operator);
  const nextIndex = (currentIndex + 1) % operators.length;
  equation.operator = operators[nextIndex];
  
  // Update the button display
  const button = document.querySelector(`.solver-equation button.solver-operator[onclick*="${equationId}"]`);
  if (button) {
    button.textContent = getOperatorSymbol(equation.operator);
  }
  
  // Recalculate if both fields have values
  if (equation.field1 !== null && equation.field2 !== null) {
    calculateSolverEquation(equationId);
  }
}

// =====================================================
// Calculate Equation
// =====================================================

function updateSolverEquation(equationId, field, value) {
  const equation = solverEquations.find(eq => eq.id === equationId);
  if (!equation) return;
  
  const numValue = value === '' ? null : parseFloat(value);
  equation[field] = numValue;
}

function calculateSolverEquation(equationId) {
  const equation = solverEquations.find(eq => eq.id === equationId);
  if (!equation) return;
  
  const field1 = equation.field1;
  const field2 = equation.field2;
  
  if (field1 === null || field2 === null) {
    return;
  }
  
  let result;
  switch (equation.operator) {
    case '+':
      result = field1 + field2;
      break;
    case '-':
      result = field1 - field2;
      break;
    case 'x':
      result = field1 * field2;
      break;
    case '/':
      if (field2 === 0) {
        alert('Cannot divide by zero!');
        return;
      }
      result = field1 / field2;
      break;
    default:
      result = 0;
  }
  
  equation.result = result;
  
  // Update the result field
  const resultInput = document.getElementById(`solver-result-${equationId}`);
  if (resultInput) {
    resultInput.value = formatNumber(result);
    
    // Flash animation
    resultInput.classList.add('solver-result-flash');
    setTimeout(() => {
      resultInput.classList.remove('solver-result-flash');
    }, 600);
  }
}

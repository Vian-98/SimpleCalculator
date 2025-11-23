let currentValue = '0';
let expression = '';
let waitingForSecondOperand = false;
let memoryValue = 0;
let historyArray = [];

const displayOutput = document.getElementById('display-output');
const displayHistory = document.getElementById('display-history');
const historyList = document.getElementById('history-list');
const memoryDisplay = document.getElementById('memory-value');

function updateDisplay() {
    displayOutput.textContent = currentValue;
    displayHistory.textContent = expression !== '' ? expression : '0';
}

function roundResult(num) {
    return parseFloat(num.toPrecision(12));
}

function addHistory(calculation, result) {
    const time = new Date().toLocaleTimeString();
    historyArray.unshift({
        time: time,
        calc: calculation,
        result: result
    });
    if (historyArray.length > 5) {
        historyArray.pop();
    }
    renderHistory();
}

function renderHistory() {
    if (historyArray.length === 0) {
        historyList.innerHTML = '<li class="text-center italic text-gray-400">Belum ada history</li>';
        return;
    }
    
    historyList.innerHTML = historyArray.map(item =>
        `<li>[${item.time}] ${item.calc} = <strong>${item.result}</strong></li>`
    ).join('');
}

function inputNumber(number) {
    if (currentValue.length >= 15) return;
    if (waitingForSecondOperand === true) {
        currentValue = number;
        if (expression.includes('=')) {
            expression = number;
        } else {
            expression += number;
        }
        waitingForSecondOperand = false;
    } else {
        currentValue = currentValue === '0' ? number : currentValue + number;
        if (expression === '' || expression === '0') {
            expression = number;
        } else {
            expression += number;
        }
    }
    updateDisplay();
}

function inputDecimal(dot) {
    if (waitingForSecondOperand === true) {
        currentValue = "0.";
        if (expression.includes('=')) {
            expression = currentValue;
        } else {
            expression += currentValue;
        }
        waitingForSecondOperand = false;
        updateDisplay();
        return;
    }
    if (!currentValue.includes(dot)) {
        currentValue += dot;
        expression += dot;
        updateDisplay();
    }
}

function handleOperator(nextOperator) {
    if (expression.includes('=')) {
        expression = currentValue + nextOperator;
        waitingForSecondOperand = true;
        updateDisplay();
        return;
    }
    
    if (expression === '' || expression === '0') {
        expression = currentValue + nextOperator;
        waitingForSecondOperand = true;
        currentValue = '0';
        updateDisplay();
        return;
    }
    
    const lastChar = expression.slice(-1);
    if (/[+\-×÷*/]/.test(lastChar)) {
        expression = expression.slice(0, -1) + nextOperator;
    } else {
        expression += nextOperator;
    }
    waitingForSecondOperand = true;
    currentValue = '0';
    updateDisplay();
}

function calculate(prev, next, op) {
    switch (op) {
        case '+':
            return prev + next;
        case '-':
            return prev - next;
        case '×':
            return prev * next;
        case '÷':
            if (next === 0) {
                return "Error: Bagi Nol";
            }
            return prev / next;
        default:
            return next;
    }
}

function evaluateExpression(expr) {
    let safe = expr.replace(/×/g, '*').replace(/÷/g, '/');
    if (!/^[0-9+\-*/().\s]+$/.test(safe)) {
        return 'Error: Invalid Expression';
    }
    try {
        const res = Function(`return (${safe})`)();
        if (res === Infinity || res === -Infinity) return 'Error: Bagi Nol';
        if (Number.isNaN(res)) return 'Error';
        return res;
    } catch (e) {
        return 'Error';
    }
}

function equals() {
    if (expression === '' || expression.includes('=')) return;

    let expr = expression;
    if (/[+\-×÷*/]$/.test(expr)) {
        expr = expr.slice(0, -1);
    }

    const result = evaluateExpression(expr);

    const calcString = `${expr}`;
    if (typeof result === 'string') {
        currentValue = result;
        expression = '';
    } else {
        currentValue = roundResult(result).toString();
        addHistory(calcString.replace(/\*/g, '×').replace(/\//g, '÷'), currentValue);
        expression = currentValue;
    }

    waitingForSecondOperand = true;
    updateDisplay();
}

function clearCalculator(type) {
    if (type === 'C') {
        expression = '';
        currentValue = '0';
        waitingForSecondOperand = false;
    } else if (type === 'CE') {
        currentValue = '0';
        const match = expression.match(/\d+(?:\.\d+)?$/);
        if (match) {
            expression = expression.slice(0, -match[0].length);
        }
        if (expression === '') {
            currentValue = '0';
        }
    }
    updateDisplay();
}

function handleMemory(action) {
    const currentNum = parseFloat(currentValue);
    
    if (isNaN(currentNum)) return;

    switch (action) {
        case 'MC':
            memoryValue = 0;
            break;
        case 'MR':
            if (memoryValue !== 0) {
                currentValue = memoryValue.toString();
                if (expression === '' || waitingForSecondOperand) {
                    expression = currentValue;
                    waitingForSecondOperand = false;
                }
            }
            break;
        case 'M+':
            memoryValue = roundResult(memoryValue + currentNum);
            waitingForSecondOperand = true;
            break;
        case 'M-':
            memoryValue = roundResult(memoryValue - currentNum);
            waitingForSecondOperand = true;
            break;
    }
    
    memoryDisplay.textContent = `M: ${memoryValue}`;
    if (memoryValue !== 0) {
        memoryDisplay.classList.add('text-blue-600');
        memoryDisplay.classList.remove('text-gray-500');
    } else {
        memoryDisplay.classList.add('text-gray-500');
        memoryDisplay.classList.remove('text-blue-600');
    }
    updateDisplay();
}

document.getElementById('keypad').addEventListener('click', (event) => {
    const target = event.target;
    if (!target.matches('button')) return;

    const { type, value } = target.dataset;

    if (type === 'number') inputNumber(value);
    else if (type === 'decimal') inputDecimal(value);
    else if (type === 'operator') handleOperator(value);
    else if (type === 'equals') equals();
    else if (type === 'clear') clearCalculator(value);

    target.blur();
});

document.querySelectorAll('button[data-fn]').forEach(button => {
    button.addEventListener('click', (event) => {
        handleMemory(event.target.dataset.fn);
        event.target.blur();
    });
});

document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (/[0-9]/.test(key)) {
        inputNumber(key);
    } else if (key === '.') {
        inputDecimal(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        const operatorValue = key === '*' ? '×' : (key === '/' ? '÷' : key);
        handleOperator(operatorValue);
        event.preventDefault();
    } else if (key === 'Enter' || key === '=') {
        equals();
        event.preventDefault();
    } else if (key === 'c' || key === 'C' || key === 'Escape') {
        clearCalculator('C');
    } else if (key === 'Backspace') {
        if (waitingForSecondOperand && expression !== '' && !expression.match(/[+\-×÷]$/)) {
            expression = '';
            currentValue = '0';
            waitingForSecondOperand = false;
        } else {
            if (expression.length > 0) {
                const lastChar = expression.slice(-1);
                expression = expression.slice(0, -1);
                
                if (expression === '') {
                    currentValue = '0';
                } else if (/[+\-×÷]$/.test(expression)) {
                    currentValue = '0';
                    waitingForSecondOperand = true;
                } else {
                    const match = expression.match(/(\d+\.?\d*)$/);
                    currentValue = match ? match[1] : '0';
                }
            }
        }
        updateDisplay();
        event.preventDefault();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    renderHistory();
    memoryDisplay.textContent = `M: ${memoryValue}`;
});
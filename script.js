const calculator = document.querySelector('.calculator');
const display = document.querySelector('.calculator_display');
const keys = document.querySelector('.calculator_keys');
const previousKeyType = calculator.dataset.previousKeyType;

const calculate = (firstValue, operator, secondValue) => {
    let result = '';
    
    if (operator === 'add') {
        result = parseFloat(firstValue) + parseFloat(secondValue); 
    } else if (operator === 'subtract') {
        result = parseFloat(firstValue) - parseFloat(secondValue);
    } else if (operator === 'multiply') {
        result = parseFloat(firstValue) * parseFloat(secondValue);
    } else if (operator === 'divide') {
        result = parseFloat(firstValue) / parseFloat(secondValue);
    }
    // gets the fractional part of the number
    const fractionalPart = result.toString().split('.')[1];
    // verifies if the fractional part exceed the limit of 10 characters
    if (result.toString().includes('.') && fractionalPart.length > 10) {
        // if it does, then it returns only the ten numbers of the fractional part
        return parseFloat(result).toFixed(10);
    } else {
        return result;
    }

}

keys.onclick = (e) => {
    const key = e.target;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;
    const previousKey = calculator.dataset.previousKey;
    const action = key.dataset.action;

    if (key.matches('button')) {
        // store the type of the previous operator
        if (action) {
            calculator.dataset.previousKey = action;
        }
        
        // removes is-depressed class from all operators
        for (child of keys.children) {
            child.classList.remove('is-depressed');
        }

        // calculate the values before letting the user click on another operator
        // if (firstValue && operator) {
        //     calculate(firstValue, operator, secondValue);
        // }

        if (!action) {
            // numeric key
            calculator.dataset.previousKeyType = 'number';

            // display the pressed number key
            if (displayedNum == 0 || previousKeyType === 'operator') {
                // replace the zero for the pressed number key
                if (previousKey === 'decimal') {
                    display.textContent = displayedNum + keyContent;
                } else {
                    display.textContent = keyContent;
                }
            } else {
                display.textContent = displayedNum + keyContent;
            }

        } else {
            // operator key
            calculator.dataset.previousKeyType = 'operator';

            if (
                action === 'add' ||
                action === 'subtract' ||
                action === 'multiply' ||
                action === 'divide'
            ) {
                // adds is-depressed class to the pressed operator key
                key.classList.add('is-depressed');

                calculator.dataset.firstValue = displayedNum;
                calculator.dataset.operator = action;
                
            }
            if (action === 'decimal') {
                // only adds a dot if there is none
                if (!displayedNum.includes('.')) {
                    display.textContent += '.';
                }
            }
            if (action === 'clear') {
                // clears every number inserted on the calculator and screen
                calculator.removeAttribute('data-first-value');
                calculator.removeAttribute('data-operator');
                
                display.textContent = '0';
            }
            if (action === 'calculate') {
                const firstValue = calculator.dataset.firstValue;
                const operator = calculator.dataset.operator;
                const secondValue = displayedNum;

                // display the result on the screen
                display.textContent = calculate(firstValue, operator, secondValue);
            }
        }
    }
}
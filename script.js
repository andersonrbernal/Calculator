const calculator = document.querySelector('.calculator');
const display = document.querySelector('.calculator_display');
const keys = document.querySelector('.calculator_keys');

let firstValue = null;
let operator = null;
let secondValue = null;

const calculate = (firstValue, operator, secondValue) => {
    let result = null;
    parseInt(firstValue);
    parseInt(secondValue);

    // replace the content from operator for javascript operators accordingly
    if (operator === 'add') {
        result = parseInt(firstValue) + parseInt(secondValue);
    } else if (operator === 'subtract') {
        result = firstValue - secondValue;
    } else if (operator === 'multiply') {
        result = firstValue * secondValue;
    } else if (operator === 'divide') {
        result = firstValue / secondValue;
    }
    
    return result;
}

keys.onclick = (e) => {
    const key = e.target;
    const keyContent = key.textContent;
    const action = key.dataset.action;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;
    
    if (key.matches ('button')) {
        // remove is-depressed class from all operator keys
        for (childKey of keys.children) {
            if (childKey.className === 'key--operator is-depressed') {
                childKey.classList.remove('is-depressed');
            }
        }
        if (!action) {
            // number key
            if (!previousKeyType) {
                // if previousKeyType wasn't added to the calculator div
                if (displayedNum === '0') {
                    display.textContent = keyContent;
                } else {
                    display.textContent += keyContent;
                }
            } else {
                // if previousKeyType was added to the calculator div
                display.textContent = keyContent; // replaces the displayed number with the pressed number
            }
        } else {
            // stores the displayed value in firstValue
            if (!previousKeyType) {
                firstValue = displayedNum;
            }
            // doesn't allow calculate to be added in operator
            if (action != 'calculate') {
                operator = action;
            }

            if (
                action === 'add' ||
                action === 'subtract' ||
                action === 'multiply' ||
                action === 'divide'
            ) {
                // adds a costum atribute to the calculator div that stores the previous operator type
                calculator.dataset.previousKeyType = action;

                // adds a class to the pressed operator key 
                key.classList.add('is-depressed'); // changes the background color to lightgray
                
                display.textContent = displayedNum;
            }
            if (action === 'decimal') {
                // doesn't allow the user to add more than one dot to display
                if (displayedNum.includes('.')) {
                    display.textContent = displayedNum;
                } else {
                    display.textContent += '.';
                }
            }
            if (action === 'clear') {
                // clean content from display
                display.textContent = '0';

                // clean the stored data
                firstValue = null;
                operator = null;
                secondValue = null;

                // removes previousKeyType from calculator div
                calculator.removeAttribute('data-previous-key-type');
            }
            if (action === 'calculate') {
                // if there is no number or operator, the result won't be displayed
                if (firstValue != null || operator != null || secondValue != null) {
                    secondValue = displayedNum;
                    display.textContent = calculate(firstValue, operator, secondValue);
                }
                console.log(firstValue, operator, secondValue);
            }    
        }
    }
}
const calculator = document.querySelector('.calculator');
const display = document.querySelector('.calculator_display');
const keys = document.querySelector('.calculator_keys');

keys.onclick = (e) => {
    const key = e.target;
    const keyContent = e.target.textContent;
    const action = key.dataset.action;
    const displaydNum = display.textContent;

    if (key.matches('button')) {
        if (!action) {
            // numeric key
            if (displaydNum == 0) {
                // doesn't allow the user to add more zeros at the start
                display.textContent = keyContent;
            } else {
                // insert new numeric values in display
                display.textContent += keyContent;
            }
        } else {
            // operator key
            if (
                action == 'add' ||
                action == 'subtract' ||
                action == 'multiply' ||
                action == 'divide' 
            ) {
                key.classList.add('is-depressed');
                if (displaydNum == 0) {
                    // doesn't allow the user to inset a operator without a number
                    display.textContent = display.textContent;
                } else {
                    // insert the operator if there is already an existing number in display
                    display.textContent += keyContent;
                }
            }
            if (action == 'decimal') {
                display.textContent += '.';
            } else if (action == 'clear') {
                display.textContent = '0';
            } else if (action == 'calculate') {
                // remove the "is-depressed" class from all operators keys
                for (child of keys.children) {
                    if (child.className == 'key--operator is-depressed') {
                        child.classList.remove('is-depressed');
                    }
                }

                display.textContent = eval(display.textContent); 
            }
        }
    }

}
// Variables
let num1;
let operator;
let num2;
let ans;

// The screen of the calculator
let screen = document.getElementById('screen');

// Works with the prompt button
function beginPrompts() {
    //sets value of first number
    num1 = window.prompt("Please enter your first number.");
    //repeats until first number is a number
    while (!parseInt(num1)) {
        num1 = window.prompt("Please enter a valid number");
    }
    //gets value of operator
    operator = window.prompt("Please enter your operator (*,/,+,-,^).");
    //repeats until operator is a operator
    while (!((operator == "*") || (operator == "/") || (operator == "+") || (operator == "-") || (operator == "^"))) {
        operator = window.prompt("Please enter a valid operator (*,/,+,-,^)");
    }
    //gets value of second number
    num2 = window.prompt("Please enter your second number.");
    //repeats until value of second number is a number
    while (!parseInt(num2)) {
        num2 = window.prompt("Please enter a valid number");
    }
    //calculates value of the answer
    doMath();
}

// Function to do math
function doMath() {
    num1 = parseFloat(num1); //Used to be a string; is now a float
    num2 = parseFloat(num2); //Used to be a string; is now a float
    //Does math based on different operator cases
    switch (operator) {
        case "*"://Multiplication
            ans = num1 * num2;
            break;
        case "/"://Division
            ans = (num1 / num2);
            break;
        case "+"://Addition
            ans = num1 + num2;
            break;
        case "-"://Subtraction
            ans = num1 - num2;
            break;
        case "^"://Exponent
            ans = num1 ** num2;
            break;
    }
    //If answer to long, put it in exponential form
    if (((ans + '').length > 5)) {
        ans = parseFloat(ans);
        setCalculatorScreen(ans.toExponential(4));
    } else {
        //If answer not too long, cut after two decimal points
        ans = parseFloat(ans);
        setCalculatorScreen(ans.toFixed(2));
    }
    num1 = null;
    num2 = null;
    operator = null;
}

//Sets the text of the calculator's screen
function setCalculatorScreen(value) {
    screen.style.opacity = 1;
    screen.innerHTML = value;
}

//Function to add to current number (ie: 3 to 32 after 2 was clicked)
function numClick(num) {
    if (!(num1)&&!(num1==0)) { //If the first number doesn't exist, set it
        num1 = num;
        setCalculatorScreen(num1);
    } else if (!operator && !num2 && ((num1 + '').length < 6)) { //If the first number does exist and isn't too long, add a number to it
        num1 = (num1 + "" + num);
        setCalculatorScreen(num1);
    } else if ((num1 || (num1==0)) && operator && !num2 && !(num2==0)) { //If the second number doesn't exist, set it
        num2 = num;
        setCalculatorScreen(num2);
    } else if ((num1 || (num==0)) && operator && ((num2 + '').length < 6)) { //if the second number does exist and isn't too long, add to it
        num2 = (num2 + "" + num);
        setCalculatorScreen(num2);
    }
}

function decimal() { //Adds a decimal point to the current number
    if (!(num1)) { //If the first number doesn't exist, set to '0.1'
        numClick('0.');
    } else if (!operator && !(num2)) { //If the first number does exist and is still in focus
        if (!((num1 + '').includes('.'))) //If the number doesn't already have a decimal point
            numClick('.');
    } else if ((num1) && operator && !(num2)) { //If the first number exists, the focus is on the second, and the second doesn't exist
        numClick('0.');
    } else if ((num1) && operator && (num2)) { //If the second number exists
        if (!((num2 + '').includes('.'))) //If a decimal point doesn't already exists in the number
            numClick('.');
    }
}

function opClick(op) { //Sets operator
    if ((num1 || (num1==0)) && !num2) { //If the first number has been selected and the second hasn't
        operator = op;
        setCalculatorScreen(operator);
    }
}

function enter() { //If the enter button is clicked
    if ((num1 || (num1==0)) && operator && (num2 || (num2==0))) { //If there is a first number, an operator, and a second number
        doMath();
    }
}
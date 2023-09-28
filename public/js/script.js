const MAX_DECIMAL_PLACES = 10;
const sqrtSym = "√";
const powSym = "^";
const openBr = "(";
const closeBr = ")";
const piSym = "π";
const percentSym = "%";
const slashSym = "/";
const multSym = "*";
let displayError = false;
let errorMsg = "";
let displayVal = "0";

// Function to format the output to display to the user
function formatOutput(string) {
    console.log(string);
    if (string.includes(sqrtSym)) {
        for (let i = 0; i < string.length; i++) {
            if (string[i] === sqrtSym) {
                let endIndex = getIndexOfClosingBracket(string, i+2);
                console.log(`endIndex: ${endIndex}`);
                if (endIndex !== -1) {
                    string = string.substring(0, i+1) + "<span class='sqrt'>" + string.substring(i+2, endIndex) + "</span>" + string.substring(endIndex+1);
                } else {
                    string = string.substring(0, i + 1) + "<span class='sqrt'>" + string.substring(i + 1) + "</span>";
                }
            }
        }
    }

    while (string.includes(powSym)) {
        let startIndex = string.indexOf(powSym);
        let endIndex = getIndexOfClosingBracket(string, startIndex+1);
        if (endIndex !== -1) {
            string = string.substring(0, startIndex) + "<sup>" + string.substring(startIndex + 2, endIndex) + "</sup>" + string.substring(endIndex + 1);
        } else {
            string = string.substring(0, startIndex) + "<sup>" + string.substring(startIndex + 1) + "</sup>";
        }
    }

    return string;
}

// Function to calculate the factorial of a given number
function factorial(n) {
    if (n % 1 !== 0) {
        n = n + 1;
        return Math.sqrt(2 * Math.PI / n) * Math.pow((1 / Math.E) * (n + 1 / (12 * n - 1 / (10 * n))), n);
    } else {
        if (n < 0) {
            throw "Error: Factorial of negative number";
        }
        let answer = 1;
        if (n == 0 || n == 1) {
            return answer;
        } else if (n > 1) {
            for (let i = n; i >= 1; i--) {
                answer = answer * i;
            }
            return answer;
        }
    }
}

// Function to pre-process the string
function preprocess(equation) {
    // Replace multiply and divide symbols with * and /
    equation = equation.replace(/×/g, multSym);
    equation = equation.replace(/÷/g, slashSym);

    // Check if there are equal number of open and close brackets
    if ((equation.match(/\(/g) || []).length !== (equation.match(/\)/g) || []).length){
        return "Error: Mismatched brackets";
    }

    for (let i = 0; i < equation.length; i++) {
        // Add * between numbers and ( in equation
        if (!isNaN(equation[i]) && equation[i + 1] === openBr) {
            equation = `${equation.slice(0, i + 1)}${multSym}${equation.slice(i + 1)}`;
        }

        if (equation[i] === closeBr && !isNaN(equation[i + 1])) {
            equation = `${equation.slice(0, i + 1)}${multSym}${equation.slice(i + 1)}`;
        }

        // Add * between numbers and sqrt in equation
        if (!isNaN(equation[i]) && equation[i + 1] === sqrtSym) {
            equation = `${equation.slice(0, i + 1)}${multSym}${sqrtSym}${equation.slice(i + 1)}`;
        }

        // Add * between numbers and PI in equation
        if (!isNaN(equation[i]) && equation[i + 1] === piSym) {
            equation = `${equation.slice(0, i + 1)}${multSym}${equation.slice(i + 1)}`;
        }

        if (equation[i] === piSym && !isNaN(equation[i + 1])) {
            equation = `${equation.slice(0, i + 1)}${multSym}${equation.slice(i + 1)}`;
        }
    }

    // Replace '++' with '+'
    equation = equation.replace(/\++/g, "+");

    // Replace '--' with '+'
    equation = equation.replace(/--/g, "+");

    // Replace '**' with power
    while (equation.includes(multSym+multSym)) {
        for (let i = 0; i < equation.length - 1; i++) {
            if (equation[i] === multSym && equation[i + 1] === multSym) {
                let tmpNum = "";
                let j;
                for (j = i + 2; j < equation.length; j++) {
                    if (!isNaN(equation[j])) {
                        tmpNum += equation[j] + "";
                    } else {
                        break;
                    }
                }
                equation = equation.substring(0, i) + powSym + openBr + tmpNum + closeBr + equation.substring(j);
                break;
            }
        }
    }

    return equation;
}

// Function to get the corresponding closing bracket in a string given the opening bracket
function getIndexOfClosingBracket(equation, index) {
    let numInnerBrackets = 0;
    let j;
    let found = false;
    for (j = index + 1; j < equation.length; j++) {
        if (equation[j] === '(') {
            numInnerBrackets++;
        }
        if (equation[j] === ')') {
            if (numInnerBrackets === 0) {
                found = true;
                break;
            }
            numInnerBrackets--;
        }
    }
    return found ? j : -1;
}

// Function to round answer to MAX_DECIMAL_PLACES
function roundAnswer(answer) {
    if (answer % 1 !== 0) {
        // check the number of decimal places
        let decimalPlaces = answer.toString().split(".")[1].length;
        // if decimal places are more than MAX_DECIMAL_PLACES, round to MAX_DECIMAL_PLACES decimal places
        if (decimalPlaces > MAX_DECIMAL_PLACES) {
            answer = answer.toFixed(MAX_DECIMAL_PLACES);
            // answer = Math.round(answer * Math.pow(10, MAX_DECIMAL_PLACES)) / Math.pow(10, MAX_DECIMAL_PLACES);
        }

    }
    return answer;
}

// Function to show and format error messages
function showError(msg) {
    displayError = true;
    document.getElementById("display").innerHTML = msg;
    document.getElementById("display").style.color = "red";
    document.getElementById("display").style.fontSize = "24px";
}

// themeToggle function to switch betweeen light and dark mode
function toggleTheme() {
    let card = document.getElementsByClassName("card");
    // check if card container class text-bg-dark
    for(const element of card){
        if (element.classList.contains("text-bg-dark")) {
            // remove class text-bg-dark
            element.classList.remove("text-bg-dark");
            // add class text-bg-light
            element.classList.add("text-bg-light");
        } else {
            // remove class text-bg-light
            element.classList.remove("text-bg-light");
            // add class text-bg-dark
            element.classList.add("text-bg-dark");
        }
    }

    let historyDisplay = document.getElementById("historyDisplay");
    if(historyDisplay.classList.contains("dark")){
        historyDisplay.classList.remove("dark");

        // store theme selection in localStorage
        localStorage.setItem("theme", "light");
    } else {
        historyDisplay.classList.add("dark");

        // store theme selection in localStorage
        localStorage.setItem("theme", "dark");
    }

    // if header has class lightHeader, replace with darkHeader
    let header = document.getElementById("header");
    if (header.classList.contains("lightHeader")) {
        header.classList.remove("lightHeader");
        header.classList.add("darkHeader");

        // set body background to dark
        document.body.style.backgroundColor = "black";

        // set themeLabel text color to white
        document.getElementById("themeLabel").style.color = "white";

    } else {
        header.classList.remove("darkHeader");
        header.classList.add("lightHeader");

        // set body backgroud to light
        document.body.style.backgroundColor = "white";

        // set themeLabel text color to black
        document.getElementById("themeLabel").style.color = "black";
    }

    // get all buttons
    let btns = document.getElementsByClassName("btn");
    // loop through the buttons
    for (const element of btns) {
        // check if button contains btn-outline-secondary class
        if (element.classList.contains("btn-outline-secondary")) {
            // remove class btn-outline-secondary
            element.classList.remove("btn-outline-secondary");
            // add class btn-secondary
            element.classList.add("btn-secondary");
        } else if (element.classList.contains("btn-secondary")) {
            // remove class btn-secondary
            element.classList.remove("btn-secondary");
            // add class btn-outline-secondary
            element.classList.add("btn-outline-secondary");
        } else if (element.classList.contains("btn-outline-warning")) {
            // remove class btn-outline-warning
            element.classList.remove("btn-outline-warning");
            // add class btn-warning
            element.classList.add("btn-warning");
        } else if (element.classList.contains("btn-warning")) {
            // remove class btn-warning
            element.classList.remove("btn-warning");
            // add class btn-outline-warning
            element.classList.add("btn-outline-warning");
        } else if (element.classList.contains("btn-outline-dark")) {
            // remove class btn-outline-dark
            element.classList.remove("btn-outline-dark");
            // add class btn-dark
            element.classList.add("btn-outline-light");
        } else if (element.classList.contains("btn-outline-light")) {
            // remove class btn-dark
            element.classList.remove("btn-outline-light");
            // add class btn-outline-dark
            element.classList.add("btn-outline-dark");
        }
    }

    let listItems = document.getElementsByClassName("list-group-item");
    for(const element of listItems){
        if(element.classList.contains("list-group-item-dark")){
            element.classList.remove("list-group-item-dark");
        } else {
            element.classList.add("list-group-item-dark");
        }
    }
}

// Function to evaluate a string equation using bodmas
function calculateEquation(equation) {
    // show the equation above answer
    document.getElementById("previousQuestion").innerHTML = document.getElementById("display").innerHTML + " = ";

    // Pre-Process string and check for errors
    equation = preprocess(equation);
    if (equation.includes("Error")) {
        return equation;
    }

    let answer = 0;
    let numbers = [];
    let operators = [];
    let currNum = "";

    // Loop through the equation string and separate the numbers and operators
    for (let i = 0; i < equation.length; i++) {
        let char = equation[i];
        if (!isNaN(char) || char === '.') {
            currNum += char;
        } else {
            if (char === "!") {
                // push factoral of currNum
                try {
                    let fact = factorial(parseFloat(currNum)) + "";
                    numbers.push(parseFloat(fact));
                    currNum = "";
                    continue;
                } catch (error) {
                    return error;
                }
            } else if (char === percentSym) {
                let percent = parseFloat(currNum) / 100;
                numbers.push(percent);
                currNum = "";
                continue;
            } else if (currNum != "") {
                numbers.push(parseFloat(currNum));
            }

            if (char === piSym) {
                numbers.push(Math.PI);
                continue;
            }

            currNum = "";
            if (char === '(') {
                let closeingBracketIndex = getIndexOfClosingBracket(equation, i);
                let bracketAnswer = calculateEquation(equation.substring(i + 1, closeingBracketIndex)) + "";

                if (bracketAnswer.includes("Error")) {
                    return bracketAnswer;
                }

                numbers.push(parseFloat(bracketAnswer));

                i = closeingBracketIndex;
            } else if (char === ')') {
                continue;
            } else if (char === sqrtSym) {
                let closeingBracketIndex = getIndexOfClosingBracket(equation, i + 1);
                let bracketAnswer = calculateEquation(equation.substring(i + 2, closeingBracketIndex)) + "";

                if (bracketAnswer.includes("Error")) {
                    return bracketAnswer;
                }

                numbers.push(Math.sqrt(parseFloat(bracketAnswer)));

                i = closeingBracketIndex;
            } else if (char === powSym) {
                let closeingBracketIndex = getIndexOfClosingBracket(equation, i + 1);
                let bracketAnswer = calculateEquation(equation.substring(i + 2, closeingBracketIndex)) + "";

                if (bracketAnswer.includes("Error")) {
                    return bracketAnswer;
                }

                numbers[numbers.length - 1] = Math.pow(numbers[numbers.length - 1], parseFloat(bracketAnswer));

                i = closeingBracketIndex;
            } else {
                operators.push(char);
            }
        }
    }

    // Push the final number if it exists
    if (currNum != "") {
        numbers.push(parseFloat(currNum));
    }

    // Multiply and Divide
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === multSym || operators[i] === slashSym) {
            let currentResult = 0;
            if (operators[i] === multSym) {
                currentResult = numbers[i] * numbers[i + 1];
            } else if (operators[i] === slashSym) {
                currentResult = numbers[i] / numbers[i + 1];
                if (numbers[i + 1] == "0") {
                    return "Error: Division by zero";
                }
            }
            numbers.splice(i, 2, currentResult);
            operators.splice(i, 1);
            i--;
        }
    }

    // Add and Subtract
    answer = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            answer += numbers[i + 1];
        } else if (operators[i] === '-') {
            answer -= numbers[i + 1];
        }
    }

    // Round to 5 decimal places if necessary
    answer = roundAnswer(answer);

    return answer;
}

// Function to store equation in LocalStorage
function storeHistory(question, answer) {
    let history = localStorage.getItem("history");
    if (history == null) {
        history = [];
    } else {
        history = JSON.parse(history);
    }
    let tmpItem = `{
        "question": "${question}",
        "answer": ${answer}
    }`;
    history.push(JSON.parse(tmpItem));
    localStorage.setItem("history", JSON.stringify(history));
    loadHistory();
}

// Function to retrieve history and display items from LocalStorage
function loadHistory() {
    let history = localStorage.getItem("history");
    if (history == null) {
        history = [];
    } else {
        history = JSON.parse(history);
    }
    
    document.getElementById("historyDisplay").innerHTML = "";
    for (let i = history.length - 1; i >= 0; i--) {
        let li = document.createElement("li");
        li.setAttribute("question", history[i].question);
        li.setAttribute("answer", history[i].answer);
        
        // li.innerText = history[i].question + " = " + history[i].answer;

        let q = document.createElement("p");
        q.classList.add("left-text");
        q.innerText = history[i].question;

        let e = document.createElement("p");
        e.classList.add("equal");
        e.innerText = " = ";

        let a = document.createElement("a");
        a.classList.add("right-text");
        a.innerHTML = history[i].answer;

        li.appendChild(q);
        li.appendChild(e);
        li.appendChild(a);

        document.getElementById("historyDisplay").appendChild(li);

        li.addEventListener("click", function () {
            displayVal = calculateEquation(history[i].question) + "";
            if (displayVal.includes("Error")) {
                showError(displayVal);
                return;
            }

            document.getElementById("display").innerHTML = formatOutput(displayVal + "");
            document.getElementById("previousQuestion").innerHTML = formatOutput(history[i].question + "");

            // if display has more than 8 character, reduce font size
            if (displayVal.length <= 12) {
                document.getElementById("display").style.fontSize = "64px";
            } else if (displayVal.length <= 16) {
                document.getElementById("display").style.fontSize = "48px";
            } else if (displayVal.length <= 20) {
                document.getElementById("display").style.fontSize = "36px";
            } else if (displayVal.length <= 24) {
                document.getElementById("display").style.fontSize = "24px";
            }

            window.location = "#";
        });
    }

    if(history.length == 0) {
        document.getElementById("historyDisplay").innerHTML = "<p>No history</p>";
    }
}

// Function to clear history from LocalStorage
function clearHistory(){
    localStorage.removeItem("history");
    document.getElementById("historyDisplay").innerHTML = "<p>No history</p>";;
}

// Event listener for keydown
document.addEventListener("keydown", (event) => {
    // Clear error
    if (displayError) {
        displayError = false;
        document.getElementById("display").innerHTML = "0";
        document.getElementById("display").style.color = "black";
        displayVal = "0";
    }
    // check if the key is "Enter"
    if (event.key === "Enter") {
        // evaluate the expression
        let tmpQ = displayVal;
        displayVal = calculateEquation(displayVal) + "";
        if (displayVal.includes("Error")) {
            showError(displayVal);
            return;
        }
        storeHistory(tmpQ, displayVal);
    } else if (event.key === "Backspace") {
        // check if there is only one caracter
        if (displayVal.length == 1) {
            // set display to "0"
            displayVal = "0";
        } else {
            displayVal = displayVal.substring(0, displayVal.length - 1);
        }
    } else if (event.key === "=") {
        // evaluate the expression
        let tmpQ = displayVal;
        displayVal = calculateEquation(displayVal) + "";
        if (displayVal.includes("Error")) {
            showError(displayVal);
            return;
        }
        storeHistory(tmpQ, displayVal);
    } else if (event.key == "+") {
        displayVal += "+";
    } else if (event.key == "-") {
        displayVal += "-";
    } else if (event.key == "Escape") {
        displayVal = "0";
        document.getElementById("previousQuestion").innerHTML = "";
    } else if (event.key == openBr || event.key == closeBr) {
        if (displayVal == "0") {
            displayVal = "";
        }
        displayVal += event.key;
    } else if (event.key == "Shift" || event.key == "Control" || event.key == "Alt") {
        // console.log(event.key)
    } else if (event.key == powSym) {
        // add the character to the display
        displayVal += `${powSym}(`;
    } else {
        // check if key is a digit
        if (event.key >= "0" && event.key <= "9") {
            if (displayVal == "0") {
                displayVal = "";
            }
            displayVal += event.key;
        }
        //check if key is *
        if (event.key === multSym) {
            displayVal += "×";
        }
        // check is key is /
        if (event.key === slashSym) {
            displayVal += "÷";
        }
        // check is key is %
        if (event.key === percentSym) {
            displayVal += percentSym;
        }
        // check is key is !
        if (event.key === "!") {
            displayVal += "!";
        }
    }

    document.getElementById("display").innerHTML = formatOutput(displayVal + "");

    // if display has more than 8 character, reduce font size
    if (displayVal.length <= 12) {
        document.getElementById("display").style.fontSize = "64px";
    } else if (displayVal.length <= 16) {
        document.getElementById("display").style.fontSize = "48px";
    } else if (displayVal.length <= 20) {
        document.getElementById("display").style.fontSize = "36px";
    } else if (displayVal.length <= 24) {
        document.getElementById("display").style.fontSize = "24px";
    }
});

// Main DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    console.log("[INFO] DOMContentLoaded");
    localStorage.clear();

    // get stored theme from LocalStorage
    let theme = localStorage.getItem("theme");
    if(theme == "dark"){
        toggleTheme();
        document.getElementById("themeCheckbox").checked = true;
    }
    

    // Load history from LocalStorage
    // loadHistory();

    // get all button tags and add event listener
    let btns = document.getElementsByTagName("button");
    for (const element of btns) {
        if(element.innerHTML == "Clear History"){
            return;
        }
        element.addEventListener("click", function () {
            // Clear Error
            if (displayError) {
                displayError = false;
                document.getElementById("display").innerHTML = "0";
                document.getElementById("display").style.color = "black";
                displayVal = "0";
            }
            // get the data-value attribute of the button
            let value = this.getAttribute("data-value");

            switch (value) {
                case "clear":
                    // clear the display
                    displayVal = "0";
                    document.getElementById("previousQuestion").innerHTML = "";
                    break;
                case "backspace":
                    // check if there is only one caracter
                    if (document.getElementById("display").innerHTML.length == 1) {
                        // set display to "0"
                        displayVal = "0";
                    } else {
                        displayVal = displayVal.substring(0, displayVal.length - 1);
                    }
                    // remove the last character

                    break;
                case "=":
                    // evaluate the expression
                    let tmpQ = displayVal;
                    displayVal = calculateEquation(displayVal) + "";
                    if (displayVal.includes("Error")) {
                        showError(displayVal);
                        return;
                    }
                    storeHistory(tmpQ, displayVal);
                    break;
                case "sqrt":
                    // check if display text is 0 and clear it
                    if (displayVal == "0") {
                        displayVal = "";
                    }
                    // add the character to the display
                    displayVal += `${sqrtSym}(`;
                    break;
                case powSym:
                    // add the character to the display
                    displayVal += `${powSym}(`;
                    break;
                default:
                    // check if display text is 0 and clear it
                    if (displayVal == "0" && ((value >= "0" && value <= "9") || value === piSym || value === openBr || value === closeBr)) {
                        displayVal = "";
                    }
                    // add the character to the display
                    displayVal += value;
                    break;
            }

            document.getElementById("display").innerHTML = formatOutput(displayVal + "");

            // if display has more than 8 character, reduce font size
            if (displayVal.length <= 12) {
                document.getElementById("display").style.fontSize = "64px";
            } else if (displayVal.length <= 16) {
                document.getElementById("display").style.fontSize = "48px";
            } else if (displayVal.length <= 20) {
                document.getElementById("display").style.fontSize = "36px";
            } else if (displayVal.length <= 24) {
                document.getElementById("display").style.fontSize = "24px";
            }
        });
    }
});

export default calculateEquation
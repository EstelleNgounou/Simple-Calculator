const resultDisplay = document.getElementById("resultat");
let currentInput = "";
let previousInput = "";
let operator = null;

document.querySelectorAll("button").forEach(button =>{
    button.addEventListener("click", () => {
        const value = button.textContent;

        if(!isNaN(value)||value === "."){
            currentInput+=value;
            resultDisplay.textContent = currentInput;
        }
        else if(value == "C"){
            currentInput = "";
            previousInput = "";
            operator = null;
            resultDisplay.textContent = "0";
        }
        else if(value == "="){
            if(previousInput&&currentInput&&operator){
                const result = equal(Number(previousInput), Number(currentInput), operator);
                resultDisplay.textContent = result;
                currentInput = result.toString();
                previousInput = "";
                operator = null;
            }
        }
        else{
             // Operator
             if (currentInput) {
                if (previousInput) {
                    // Perform calculation before chaining operators
                    previousInput = equal(Number(previousInput), Number(currentInput), operator);
                } else {
                    previousInput = currentInput;
                }
                operator = value;
                currentInput = "";
            }
        }
    });
});

function equal(num1, num2, operator){
    switch(operator){
        case "+": return num1+num2;
        case "-": return num1-num2;
        case "x": return num1*num2;
        case "÷": return num2 !== 0 ? num1 / num2 : "Error";
        default: return "0";
    }
}
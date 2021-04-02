"use strict";
const maxDigitsAfterPoint = 10;
//const maxDigitsBeforePoint = 10;
let pointPosition = 0;
let onlyMinus = 0;

function getHistory(){
    return document.getElementById("history").innerText;
}

function printHistory(value){
    document.getElementById("history").innerText = value;
}

function getOutput(){
    return document.getElementById("output").innerText;
}

function printOutput(value){
    document.getElementById("output").innerText = value;
}

function getFormattedNumber(num) {
    let n = Number(num);
    return n.toLocaleString("en", { maximumFractionDigits: maxDigitsAfterPoint });
}

function reverseNumberFormat(num){
    if (num === "-")
        onlyMinus = 1;
    return Number(num.replace(/,/g,''));
}


let operator = document.getElementsByClassName("operator");
for(let i = 0; i < operator.length; i++){
    operator[i].addEventListener('click',function (){
        if (this.id === "clear") {
            printHistory("");
            printOutput("");
            pointPosition = 0;
        } else if (this.id === "backspace"){
            let output = getOutput();
            if (output === "-"){
                printOutput("");
                onlyMinus = 0;
                return;
            } else if (output && output[0]=== '-' && output.length === 2) {
                printOutput("-");
                onlyMinus = 1;
                return;
            }
            output = reverseNumberFormat(getOutput()).toString();
            if (output){ //if output has value
                if (pointPosition === 1) {
                    printOutput(getFormattedNumber(output));
                }
                else if (pointPosition === 2){
                    output = output.substr(0, output.length - 1);
                    printOutput(getFormattedNumber(output) + ".");
                } else {
                    output = output.substr(0, output.length - 1);
                    if (output) {
                        printOutput(getFormattedNumber(output));
                    } else {
                        printOutput("");
                    }
                }
                if (pointPosition){
                    pointPosition -= 1;
                }
            }
        } else {
                let output = getOutput();
                let history = getHistory();
                pointPosition = 0;
                if (output === "" && history !== "") {
                    if (history[history.length - 1]) {
                        history = history.substr(0, history.length - 1);
                    }
                } else if (output === "" && this.id === "-") {
                    printOutput("-");
                    onlyMinus = 1;
                    printHistory(history);
                }
                if (output !== "" || history !== ""){
                    output = output === ""? output : reverseNumberFormat(output);
                    history = history + output;
                    if (this.id === "="){
                        let result = eval(history);
                        printOutput(getFormattedNumber(result));
                        printHistory("");
                    } else {
                        history = history + this.id;
                        printHistory(history);
                        printOutput("")

                    }
                }
            }
    })
}

let number = document.getElementsByClassName("number");
for(let i = 0; i < number.length; i++){
    number[i].addEventListener('click',function (){
        let output = reverseNumberFormat(getOutput());
        let sign = getOutput()[0] === '-'? -1 : 1;
        if (this.id === '.') {
            if (!pointPosition && getOutput() === "-"){
                printOutput( "-0.");
            } else if (!pointPosition) {
                printOutput(getFormattedNumber(output) + ".");
            } else {
                return;
            }
            pointPosition += 1;
        } else if (pointPosition === maxDigitsAfterPoint) {
            printOutput(getFormattedNumber(output));
        } else if (pointPosition) {
            output = output + this.id * sign * Math.pow(10, -pointPosition);
            pointPosition += 1;
            printOutput(getFormattedNumber(output));
        } else if (onlyMinus) {
            output = -1 * this.id;
            onlyMinus = 0;
            printOutput(getFormattedNumber(output));
        } else {
            if (getOutput() === "-0") {
                output = -this.id;
            } else {
                output = output + this.id;
            }
            printOutput(getFormattedNumber(output));
        }
    })
}
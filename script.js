//functions to get and print the history values
function getHistory(){
	return document.getElementById("history-value").innerText;
}
function printHistory(num){
	document.getElementById("history-value").innerText=num;
}

//function to get and print the output values
function getOutput(){
	return document.getElementById("output-value").innerText;
}
function printOutput(num){
	if(num==""){
		document.getElementById("output-value").innerText=num;
	}
	else{
		document.getElementById("output-value").innerText=getFormatted(num);
	}	
}

//function to format numbers into comma seperated after thousands
function getFormatted(num){

    //condition so that backspace works fine for negative numbers or else it gives NaN
    if(num == "-"){
        return "";
    }
    let n = Number(num);
    let value = n.toLocaleString("en");
    return value;
}

//tocalculate, we need to reverse number formats from comma to regular
function reverseNumberFormat(num){
    return Number(num.replace(/,/g,''));
}

//begin with operators & their operations
let operator = document.getElementsByClassName("operator");
for(let i = 0 ; i < operator.length; i++){
    operator[i].addEventListener('click',function(){
        if(this.id == "clear"){
            printHistory("");
            printOutput("");
        }
        else if(this.id == "backspace"){
            let output = reverseNumberFormat(getOutput()).toString();
            if(output){
                output = output.substr(0,output.length-1);
                printOutput(output);
            }
        }
        else{
            let output=getOutput();
            let history=getHistory();
            if(output==""&& history!==""){
                if(isNaN(history[history.length-1])){
                    history=history.substr(0,history.length-1);
                }
            }
            if(output!="" || history!=""){
                output = output == ""? output: reverseNumberFormat(output);
                history = history+output
                if(this.id=="="){
                    let result = eval(history);
                    printOutput(result);
                    printHistory("");
                }
                else{
                    history=history+this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }
    });
}


//work with numbers
let number = document.getElementsByClassName("number");
for(let i = 0 ; i < number.length; i++){
    number[i].addEventListener('click',function(){
        let output = reverseNumberFormat(getOutput());
        //if Output is a number
        if(output!=NaN){ 
            output = output + this.id;
            printOutput(output);
        }
    });
}


////////////////Voice recognition//////////////////////////
let microphone = document.getElementById('microphone');
microphone.onclick=function(){
    microphone.classList.add("record");
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();
    operations = {
        "plus": "+",
        "minus": "-",
        "dash": "-",
        "multiply": "*",
        "into": "*",
        "multiplied": "*",
        "multiply by": "*",
        "divide": "/",
        "divided by": "/",
        "remainder": "%",
    }
    recognition.onresult = function(event){
        var input = event.results[0][0].transcript;
        for(property in operations){
            input = input.replace(property,operations[property]);
        }
        document.getElementById("output-value").innerText=input;
        setTimeout(function(){
            calculate(input);
        },2000);
        microphone.classList.remove("record");
    }
   
}

function calculate(input){
    try {
        let result = eval(input);
        document.getElementById("output-value").innerText=result;
    } catch (error) {
        console.log(e);
        document.getElementById("output-value").innerText="There is some issue";
    }
}

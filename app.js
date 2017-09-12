// =========
// VARIABLES
// =========

var DOMChain = '';
// instead of dealing with dumb things, make it an array, push numbers to it 
// then iterate through it
// use isOperatorSymbol(arr[i])
// split up the DOM Chain by SPACES. WOW THAT WORKED OUT WELL
var calcChain = [];;
var result;

var maxDigits = 8;

// ===================
// AUXILIARY FUNCTIONS
// ===================

// takes in a string and returns true if equal to +, /, *, -,
function isOperatorSymbol(x){
	if ((x === '+') || (x === '/') || (x ==='-') || (x === '*')){
		return true;
	} else{
		return false
	}
}

// takes in two str numbers and a str operator ('/', '+', '-', '*')
// always run isOperatorSymbol first to make sure that it is an operator
function applyOperator(num1, strOperator, num2){
	if (strOperator === '/'){
		return Number(num1) / Number(num2);
	} else if (strOperator === '+'){
		return Number(num1) + Number(num2);
	} else if (strOperator === '-'){
		return Number(num1) - Number(num2);
	} else if (strOperator === '*'){
		return Number(num1) * Number(num2);
	}
}

function dynamicDecimals(num){
	// store the number as var rounded
	// convert to string
	// find the length of it
	// find the difference between the maxDigits and the length of it (including decimal)
	// return (num).toFixed(diff)
	var rounded = Math.round(num);
	var str = (rounded).toString();
	var length = str.length;
	if (length > maxDigits) {
		maxDigitsPopup();
	}
	var diff = maxDigits - length;
	return (num).toFixed(diff);
}

// ==============
// MAIN FUNCTIONS
// ==============

// however you store the DOMChain, reset it here
function resetDOM(){
	DOMChain = '';
	$('#screen').text('0');
	$('#chain').text('0');
}

// remove one thing from the DOMChain
// fix #DOM
function backspaceDOM(){
	var text = $('#screen').text();
	if (text.length === 1) {
		$('#screen').text('0');
		$('#chain').text('0');
	} else {
		text = text.substring(0, text.length - 1);
		DOMChain = DOMChain.substring(0, DOMChain.length - 1);
		$('#screen').text(text);
		$('#chain').text(DOMChain);
	}
}

function maxDigitsPopup(){
	$('.label').popup({on: 'manual'});
	$('.label').popup('show');
	setTimeout(function() {
        $('.label').popup('hide');
    }, 1500)

}

function numberButtonDOM(buttonClicked){
	var labelText = $('#screen').text();
	if (labelText === '0'){
		DOMChain = '';
		$('#screen').text('');
		labelText = $('#screen').text();		
	} 
	if (isOperatorSymbol(labelText)){
		$('#screen').text('');
		labelText = $('#screen').text();
	}
	if (labelText.length < maxDigits){
		var value = buttonClicked.text();
		$('#screen').text(labelText += value);
		DOMChain += value;
		$('#chain').text(DOMChain);
	// exceed max digits (maxDigits)
	} else {
		maxDigitsPopup();
	}
}

function numberButtonCalc(buttonClicked){
	var labelText = $('#screen').text();
	if (labelText === '0' || isOperatorSymbol(labelText)){
		$('#screen').text('');
		labelText = $('#screen').text();
	}
	if (labelText.length < maxDigits){
		var value = buttonClicked.text();
		$('#screen').text(labelText += value);
		DOMChain += value;
		$('#chain').text(DOMChain);
	// exceed max digits (maxDigits)
	} else {
		maxDigitsPopup();
	}
}

function operatorButtonDOM(buttonClicked){
	if (DOMChain.length > 1){
		var value = buttonClicked.text()
		$('#screen').text(value);
		DOMChain += ' ';
		DOMChain += value;
		DOMChain += ' ';
		$('#chain').text(DOMChain);
	}	
}

function equalsButtonCalc(){
	calcChain = DOMChain.split(' ');
	result = calcChain[0]
	for (var i = 1; i < calcChain.length; i+=2){
		var x = calcChain[i];
		if (isOperatorSymbol(x)){
			result = dynamicDecimals(applyOperator(result, x, calcChain[i + 1]));
		}
	}
}

function equalsButtonDOM(){
	$('#screen').text(result);
	var text = $('#chain').text();
	$('#chain').text(text + result);

}


function clickEvents(){
	$('#reset').on('click', function(e){
		resetDOM();
	});

	$('#backspace').on('click', function(e){
		backspaceDOM();
	});

	$('.ui.green.button').on('click', function(e){
		numberButtonDOM($(this));
	});

	$('.ui.blue.button').on('click', function(e){
		operatorButtonDOM($(this));

	});

	$('#equals').on('click', function(e){
		equalsButtonCalc();
		equalsButtonDOM();
	})
}

clickEvents();

// have a result variable that will have the final result
// have a currentOperation that will store what the current operation is (because it's sandwiched between 2 numbers)
// when you press an operation (blue button), if the last thing on the screen is an operation and a space, then replace that operation with the new one
// after you press a blue button, use parseInt to figure out what the number is

// have function to parse #chain and remove = signs if they keep chaining things on

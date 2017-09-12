// =========
// VARIABLES
// =========

var DOMChain = '';
var calcChain = [];
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

// takes in two string numbers ('1') and a str operator ('/', '+', '-', '*')
// always run isOperatorSymbol first to make sure that it is an operator
function applyOperator(num1, strOperator, num2){
	num1 = Number(num1);
	num2 = Number(num2);

	if (strOperator === '/'){
		return num1 / num2;
	} else if (strOperator === '+'){
		return num1 + num2;
	} else if (strOperator === '-'){
		return num1 - num2;
	} else if (strOperator === '*'){
		return num1 * num2;
	}
}

// prevents the numbers from being too long, displays message and resets DOM if needed
// only shows decimal if it needs to
function dynamicDecimals(num){
	var rounded = Math.round(num);
	var str = (rounded).toString();
	var length = str.length;
	if (length > maxDigits) {
		maxDigitsPopup();
		resetDOM();
	} else {
		if (rounded === num){
			return num;
		}
	}
	var diff = maxDigits - length;
	return (num).toFixed(diff);
}

// ==============
// MAIN FUNCTIONS
// ==============

function resetDOM(){
	DOMChain = '';
	$('#screen').text('0');
	$('#chain').text('0');
}

// remove one thing from the DOMChain
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

// CE button clear screen
function clearCurrentScreen(){
	$('#screen').text('0');
	// iterate through #chain, find the last operator, remove it
	var lastOperatorPosition = 0;
	for (var i = 0; i < DOMChain.length; i++){
		if (isOperatorSymbol(DOMChain[i])){
			lastOperatorPosition = i;
		}
	}
	DOMChain = DOMChain.substring(0, lastOperatorPosition - 1);
	$('#chain').text(DOMChain || '0');
}

// timed semantic popup
function maxDigitsPopup(){
	$('.label').popup({on: 'manual'});
	$('.label').popup('show');
	setTimeout(function() {
        $('.label').popup('hide');
    }, 2000)

}

function numberButtonDOM(buttonClicked){
	var labelText = $('#screen').text();
	// remove 0 before appending number
	if (labelText === '0'){
		DOMChain = '';
		$('#screen').text('');
		labelText = $('#screen').text();		
	}
	// clear screen when pressing operator
	if (isOperatorSymbol(labelText)){
		$('#screen').text('');
		labelText = $('#screen').text();
	}
	// add things to screen as long as there aren't too many
	if (labelText.length < maxDigits){
		var value = buttonClicked.text();
		$('#screen').text(labelText += value);
		DOMChain += value;
		$('#chain').text(DOMChain);
	// otherwise display message - exceed max digits
	} else {
		maxDigitsPopup();
	}
}

function operatorButtonDOM(buttonClicked){
	// don't allow operators before a number
	// use the chain instead of the screen because screen gets cleared a lot
	if ($('#chain').text() !== '0'){
		var value = buttonClicked.text()
		$('#screen').text(value);
		// add spaces so it wraps correctly (and serendipitously to split into an array to iterate on)
		DOMChain += ' ';
		DOMChain += value;
		DOMChain += ' ';
		$('#chain').text(DOMChain);
	}	
}

// calculate the result and set it
function equalsButtonCalc(){
	calcChain = DOMChain.split(' ');
	result = calcChain[0];
	var i = 1;
	calcChain.filter(function(item){
		return item !== '';
	})

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

// remove equals sign if they press an operator after pressing equals
function removeEqualsChainedOperator(){
	if (DOMChain.substring(DOMChain.length - 3) === ' = '){
		// remove the spaces and equals sign
		DOMChain = DOMChain.substring(0, DOMChain.length - 3); 
	}
}

function clickEvents(){
	$('#reset').on('click', function(e){
		resetDOM();
	});

	$('#backspace').on('click', function(e){
		backspaceDOM();
	});

	$('#clearScreen').on('click', function(e){
		clearCurrentScreen();
	});

	$('.ui.green.button').on('click', function(e){
		numberButtonDOM($(this));
	});

	$('.ui.blue.button').on('click', function(e){
		removeEqualsChainedOperator();
		operatorButtonDOM($(this));

	});

	$('#equals').on('click', function(e){
		equalsButtonCalc();
		equalsButtonDOM();
	})
}

clickEvents();
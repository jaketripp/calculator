// =========
// VARIABLES
// =========

var DOMChain = '';
var calcChain;
var result;

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

// takes in two numbers and a str operator ('/', '+', '-', '*')
// always run isOperatorSymbol first to make sure that it is an operator
function applyOperator(num1, strOperator, num2){
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
		$('#chain').text(text);
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
	if (labelText === '0' || isOperatorSymbol(labelText)){
		$('#screen').text('');
		labelText = $('#screen').text();
	}
	if (labelText.length < 8){
		var value = buttonClicked.text();
		$('#screen').text(labelText += value);
		DOMChain += value;
		$('#chain').text(DOMChain);
	// exceed max digits (8)
	} else {
		maxDigitsPopup();
	}
}

function operatorButtonDOM(buttonClicked){
	var value = buttonClicked.text()
	$('#screen').text(value);
	DOMChain += ' ';
	DOMChain += value;
	DOMChain += ' ';
	$('#chain').text(DOMChain);	
}

function equalsButtonDOM(){
	// var currentDOMChain = $('#DOMChain').text();
	// currentDOMChain += evaluateDOMChain();
	// $('#DOMChain').text(currentDOMChain);
	$('#screen').text('RESULT'); // currentDOMChain
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
		equalsButtonDOM();
	})
}

clickEvents();

// have a result variable that will have the final result
// have a currentOperation that will store what the current operation is (because it's sandwiched between 2 numbers)
// when you press an operation (blue button), if the last thing on the screen is an operation and a space, then replace that operation with the new one
// after you press a blue button, use parseInt to figure out what the number is
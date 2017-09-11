// =========
// VARIABLES
// =========

var chain = '';

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


// ==============
// MAIN FUNCTIONS
// ==============

// however you store the chain, reset it here
function reset(){
	chain = '';
	$('#screen').text('0');
	$('#chain').text('0');
}

// remove one thing from the chain
function backspace(){
	var text = $('#screen').text();
	if (text.length === 1) {
		$('#screen').text('0');
	} else {
		text = text.substring(0, text.length - 1);
		chain = chain.substring(0, chain.length - 1);
		$('#screen').text(text);
	}
}

function clickEvents(){
	$('#reset').on('click', function(e){
		reset();
	});

	$('#backspace').on('click', function(e){
		backspace();
	});

	$('.ui.green.button').on('click', function(e){
		var labelText = $('#screen').text();
		if (labelText === '0' || isOperatorSymbol(labelText)){
			$('#screen').text('');
			labelText = $('#screen').text();
		}
		if (labelText.length < 8){
			var value = $(this).text();
			$('#screen').text(labelText += value);
			chain += value;
			$('#chain').text(chain);
		} else {
			// show semantic (copied type message) saying 'max of 8 digits'
			// or get users attention somehow?
		}
	});

	$('.ui.blue.button').on('click', function(e){
		var value = $(this).text()
		$('#screen').text(value);
		chain += value;
		$('#chain').text(chain);
	});

	// $('.equals').on('click', function(e){
	// 	evaluateChain();
	// })
}

clickEvents();
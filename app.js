// =========
// VARIABLES
// =========

// ===================
// AUXILIARY FUNCTIONS
// ===================

// ==============
// MAIN FUNCTIONS
// ==============

// however you store the chain, reset it here
function reset(){
	$('label').text('0');
}

function clickEvents(){
	$('#reset').on('click', function(e){
		reset();
	});

	$('.ui.green.button').on('click', function(e){
		var labelText = $('label').text();
		if (labelText === '0'){
			$('label').text('');
			labelText = $('label').text();
		}
		if (labelText.length < 8){
			var value = $(this).text();
			$('label').text(labelText += value);			
		} else {
			// show semantic (copied type message) saying 'max of 8 digits'
			// or get users attention somehow?
		}
	})
}

clickEvents();
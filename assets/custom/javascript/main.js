$(document).ready(function(){

	var $input = $('#contact-form');
	var $contactsBox = $("#possible-contacts");
	var contactTemplate = _.template($('#contact-template').html());
	var notFoundTemplate = _.template($('#not-found-template').html());
	var downarrowCounter = 0
	hideBox();
	$input.keyup(showData);
	$input.keypress(checkForSelected);

	function checkForSelected(e){
		var keyvalue = e.which
		if (keyvalue === 13){
			var $contactSelected = $('.selected-contact');
			if ($contactSelected.length === 1){
				var email = $contactSelected.find('.email').text();
				removeParentheses(email);
			}
		}
	}

	function showData(e){
		var keyvalue = e.which
		if (keyvalue !== 13){
			if (keyvalue !== 40 && keyvalue !== 38) {
				downarrowCounter = 0
			}
			emptyBox();
			showBox();
			var text = $(this).val();
			var results = searchAndFilter(text);
			appendGuessDivs(results);
			arrowDown(keyvalue);
			arrowUp(keyvalue);	
		}

		addClickToContacts();
		nothingInInputform(text);
	}

	function appendGuessDivs(results){
		if (results.length === 0){
			$contactsBox.append(notFoundTemplate());
		}
		for (var index=0; index < results.length; index++){
			var newContactGuess = $contactsBox.append(contactTemplate({
				name: results[index].name,
				email: results[index].address
			}));
			if (index >= 3){ break; }
			// 4 divs will be appended
			// would have used forEach but forEach does not allow a loop break
		}
	}

	function searchAndFilter(text){
		var regex = createRegexObj("^"+text+"");
		var results = filter(EMAIL_DATA, regex);
		return results
	}

	function arrowDown(keyvalue){
		if (keyvalue === 40){
			$contactContainers = $('.single-contact')
			if (downarrowCounter > 0) {
				$($contactContainers[downarrowCounter - 1]).removeClass('selected-contact');
			}
			$($contactContainers[downarrowCounter]).addClass('selected-contact');
			if (downarrowCounter < 3){
				downarrowCounter = downarrowCounter + 1;
			}
		}
	}

	function arrowUp(keyvalue){
		if (keyvalue === 38){
			$contactContainers = $('.single-contact');
			if (downarrowCounter > 0 ) {
				$($contactContainers[downarrowCounter]).removeClass('selected-contact');
				downarrowCounter = downarrowCounter -1;
				$($contactContainers[downarrowCounter]).addClass('selected-contact');
			}
		}
	}

	function addClickToContacts(){
		var $contactContainers = $('.single-contact');
		$contactContainers.each(function(){
			$(this).click(function(){
				var email = $(this).find('.email').text();
				removeParentheses(email);
			})
			$(this).mouseover(addSelected);
			$(this).mouseout(removeSelected);
		})
	}

	function removeParentheses(email){
		email = email.replace('(', '');
		email = email.replace(')', '');
		$input.val(email);
		emptyBox();
		hideBox();
	}

	function removeSelected(){
		downarrowCounter = 0;
		$(this).removeClass('selected-contact');
	}

	function addSelected(){
		$('.selected-contact').removeClass('selected-contact');
		$(this).addClass('selected-contact');
	}

	function nothingInInputform(text){
		text.trim()
		if (text==="") {
			emptyBox();
			hideBox();
		}
	}

	function hideBox(){
		$contactsBox.hide();
	}

	function showBox(){
		$contactsBox.show();
	}

	function emptyBox(){
		$contactsBox.empty();
	}

})
	

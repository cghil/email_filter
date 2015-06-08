$(document).ready(function(){

	var $input = $('#contact-form');
	var $contactsBox = $("#possible-contacts");
	var contactTemplate = _.template($('#contact-template').html());

	hideBox();
	$input.keyup(showData);

	function showData(e){
		emptyBox();
		showBox();
		var text = $(this).val();
		var regex = createRegexObj("^"+text+"");
		var results = filter(EMAIL_DATA, regex);
		for (var index=0; index < results.length; index++){
			var newContactGuess = $contactsBox.append(contactTemplate({
				name: results[index].name,
				email: results[index].address
			}));
			if (index >= 3){ break; }
		// 4 divs will be appended
		// would have used forEach but forEach does not allow a loop break
		}
		addClickToContracts();
		nothingInInputform(text);
	}

	function addClickToContracts(){
		var $contactContainers = $('.single-contact')
		$contactContainers.each(function(){
			$(this).click(function(){
				var email = $(this).find('.email').text();
				email = email.replace('(', '');
				email = email.replace(')', '');
				$input.val(email);
				emptyBox();
				hideBox();
			})
		})
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
	

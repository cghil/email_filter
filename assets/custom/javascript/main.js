$(document).ready(function(){

	var $input = $('#contact-form');
	var $contactsBox = $("#possible-contacts")
	var contactTemplate = _.template($('#contact-template').html());
	
	$input.keyup(function(e){
		$contactsBox.empty()
		var text = $input.val();
		var regex = createRegexObj("^"+text+"");
		var results = filter(EMAIL_DATA, regex);
		for (var index=0; index < results.length; index++){
			$contactsBox.append(contactTemplate({name: results[index].name, email: results[index].address}));
			if (index >= 3){ break; }
		// 4 divs will be appended
		// would have used forEach but forEach does not allow a loop break
		}
		nothingInInputform(text);
	})

	function nothingInInputform(text){
		text.trim()
		if (text==="") {
			$contactsBox.empty();
		}
	}

})
	

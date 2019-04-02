$(document).ready(function() {

    $('.js-add-input').click(function() {
        var inputBox = $(this).siblings('.input-box');
        var inputBoxInputsCounter = inputBox.find('input').length;
        var inputBoxInputsName = 'FactoryContact' + inputBoxInputsCounter;
        $('<input name="' + inputBoxInputsName + '" type="text" class="form-control mb-3" required>').appendTo(inputBox);
    });

    $('.js-delete-input').click(function() {
    	var InputsCounter = $(this).closest('.form-group').find('input').length;
    	if (InputsCounter > 1) {
    		$(this).closest('.form-group').find('input').last().remove();
    	} else {
    		$('.toast-body').text('Наличие хотя бы 1 поля в контактах обязательно');
	    	$('.toast').toast('show');
    	}
    });
   
});
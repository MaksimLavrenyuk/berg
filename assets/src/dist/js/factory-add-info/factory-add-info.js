$(document).ready(function() {

    $('#factory-add-info').submit(function(e) {
    	e.preventDefault();
    	var submit = $("[type=submit]", this);
        var width = $("[type=submit]", this).css("width");
        var url = $(this).attr('action');
        var btnText = $("[type=submit]", this).text();

        $.ajax({
            beforeSend: $.proxy(function() {
                $(this).find('input').prop('disabled', true);
                submit.prop('disabled', true);
                submit.html("");
                submit.css('min-width', '' + width + '');
                $('<img class="preloader" src="dist/img/preloader-circular.svg" alt="preloader">').appendTo(submit);
           	}, this),
            url: url,
           	type: 'post',
            data: $(this).serialize(),
            dataType: 'json',
            success: $.proxy(function(data) {
          
                $('<li>', { class: 'page-factory-info__itm'}).appendTo('.page-factory-info');

                for (var i = 0, l = $(this).find('input').length; i < l; i++) {
                	var inputElem = $(this).find('input').eq(i);
                	var inputElemText = inputElem.val();
                	if (inputElem.attr('name') == 'factoryAddCaption') {
                		$('<h5>', { class: 'page-factory-info__caption', text: inputElemText}).appendTo($('.page-factory-info__itm').last());
                	} else {
                		if (inputElemText.indexOf("http") != -1) {

                			$('<a>', { href: inputElemText, class: 'page-factory-info__text', text: inputElemText}).appendTo($('.page-factory-info__itm').last());
                		} else {
                			$('<span>', { class: 'page-factory-info__text', text: inputElemText}).appendTo($('.page-factory-info__itm').last());
                		};
                	};
                };

                //поведение кнопок
                $(this).find('input').prop('disabled', false);
                $(this).find('input').val('');
                submit.html("");
                submit.css('min-width', 'none');
                submit.html(btnText);
                submit.prop('disabled', false);
                $('.toast-body').text('Информация добавлена к карточке завода');
                $('.toast').toast('show');

            }, this),
              	error: function(data) {
                    alert('Ошибка при отправке данных на сервер');
                }
            });
    });

});
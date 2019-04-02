$(document).ready(function() {

	// добавить поле изменения тоннажа
    $('#tonnage-add').click(function() {
        var inputBox = $('.tonnage-form__content');
        var inputBoxCounter = inputBox.find('.form-group').length + 1;
        console.log(inputBoxCounter)
        //var inputBoxInputsName = 'FactoryContact' + inputBoxCounter;

        $('<div class="form-group">' +
            '<label for="tonnageName'+inputBoxCounter+'">Ввведите тоннаж</label>' +
            '<input name="tonnageName'+inputBoxCounter+'" type="text" class="form-control mb-3" id="tonnageName'+inputBoxCounter+'" placeholder="Введите тоннаж" required>' +
            '<label for="tonnagePrice100km'+inputBoxCounter+'">Ввведите стоимость до 100 км в руб</label>' +
          	'<input name="tonnagePrice100km'+inputBoxCounter+'" type="text" class="form-control mb-3" id="tonnagePrice100km'+inputBoxCounter+'" placeholder="Введите стоимость в рублях" required>' +
            '<label for="tonnagePrice500km'+inputBoxCounter+'">Ввведите стоимость до 500 км в руб</label>' +
            '<input name="tonnagePrice500km'+inputBoxCounter+'" type="text" class="form-control mb-3" id="tonnagePrice500km'+inputBoxCounter+'" placeholder="Введите стоимость в рублях" required>' +
            '<label for="tonnagePrice1000km'+inputBoxCounter+'">Ввведите стоимость до 1000 км в руб</label>' +
            '<input name="tonnagePrice1000km'+inputBoxCounter+'" type="text" class="form-control mb-3" id="tonnagePrice1000km'+inputBoxCounter+'" placeholder="Введите стоимость в рублях" required>' +
          	'<button type="button" class="btn btn-sm btn-danger mt-2 mb-3 js-delete-tonnage-pos">Удалить поле</button>' +
        '</div>').appendTo('.tonnage-form__content');

         $('.js-delete-tonnage-pos').click(function() {
            $(this).closest('.form-group').remove();
            $('.toast-body').text('Поле изменено');
            $('.toast').toast('show');
         });
    });

    // удалить поле изменения тоннажа
     $('.js-delete-tonnage-pos').click(function() {
     	$(this).closest('.form-group').remove();
     	$('.toast-body').text('Поле изменено');
	    $('.toast').toast('show');
     });
    
    $('#tonnage').submit(function(e) {
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

            	if (data.msg == "Добавлен") {
            		
            		var tonnagePosCounter = $('.tonnage-form__content').find('.form-group').length;
            		$('#tonnage-table tbody').children().remove();


            		for (var j = 0, len = tonnagePosCounter; j < len; j++) {
            			var tonnageRow = '';
            			for (var k = 0, q = $('.tonnage-form__content').find('.form-group').eq(j).find('input').length; k < q; k++) {
            				var tonnageInput =  $('.tonnage-form__content').find('.form-group').eq(j).find('input').eq(k).val();
            				tonnageRow = tonnageRow + '<td>'+tonnageInput+'</td>'
            			}

            			console.log(tonnageRow);
            		
            			$(
	            			'<tr>' +
	                            tonnageRow +
	                    	'</tr>'
                    	).appendTo('#tonnage-table tbody');
            		};
            		

            		//поведение кнопок
	                $(this).find('input').prop('disabled', false);
	                submit.html("");
	                submit.css('min-width', 'none');
	                submit.html(btnText);
	                submit.prop('disabled', false);
	                $('.toast-body').text('Тарифная сетка изменена');
	                $('.toast').toast('show');
            	};

            }, this),
            error: function(data) {
                alert('Ошибка при отправке данных на сервер');
            }
        });
    });
});
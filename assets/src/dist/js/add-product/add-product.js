$(document).ready(function() {
    $('.js-add-product').submit(function(e) {
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
            		var productNumber = $('#product-groups-table tbody tr').last().find('td').first().text();
            		productNumber = +productNumber + 1;
            		$(
            			'<tr>' +
                            '<td>'+productNumber+'</td>' +
                            '<td>'+data.productGroupName+'</td>' +
                    	'</tr>'
                    ).appendTo('#product-groups-table tbody');


            		//поведение кнопок
	                $(this).find('input').prop('disabled', false);
	                $(this).find('input').val('');
	                submit.html("");
	                submit.css('min-width', 'none');
	                submit.html(btnText);
	                submit.prop('disabled', false);
	                $('.toast-body').text('Группа добавлена');
	                $('.toast').toast('show');
            	};

            }, this),
            error: function(data) {
                alert('Ошибка при отправке данных на сервер');
            }
        });
    });
});
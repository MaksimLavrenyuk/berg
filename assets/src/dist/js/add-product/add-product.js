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
            		var productGroupID = data.productGroupID;
            		$(
            			'<tr data-group-id="'+productGroupID+'">' +
                            '<td>'+productNumber+'</td>' +
                            '<td>'+data.productGroupName+'</td>' +
                            '<td  width="100">' +
                                '<button type="button" class="btn btn-danger btn-sm js-delete-product-group">Удалить</button>' +
                            '</td>'+
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
    $('.js-delete-product-group').click(function(e) {
        var submit = $(this);
        var width = $(this).css("width");
        var url = $('#productGroupAdd').attr('action');
        var btnText = $(this).text();
        var productGroupID = $(this).closest('[data-group-id]').data('group-id');
        $.ajax({
            beforeSend: $.proxy(function() {
                submit.prop('disabled', true);
                submit.html("");
                submit.css('min-width', '' + width + '');
                $('<img class="preloader" src="dist/img/preloader-circular.svg" alt="preloader">').appendTo(submit);
            }, this),
            url: url,
            type: 'post',
            data: {
                "productGroupID": productGroupID, // id товара
            },
            dataType: 'json',
            success: $.proxy(function(data) {
                if (data.msg == "Удален") {
                    $(this).closest('[data-group-id]').remove();
                    //поведение кнопок
                    submit.html("");
                    submit.css('min-width', 'none');
                    submit.html(btnText);
                    submit.prop('disabled', false);
                    $('.toast-body').text('Группа Удалена');
                    $('.toast').toast('show');
                };

            }, this),
            error: function(data) {
                alert('Ошибка при отправке данных на сервер');
            }
        });
    });
});
$(document).ready(function() {

    $('#add-factory-form').submit(function(e) {
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
            		$('.factory-link-title').remove();
            		$('.factory-link').remove();
            		jQuery('<h5/>', {class: 'mt-4 factory-link-title', text: 'Ссылка на страницу с заводом:'}).appendTo('#modal-add-factory .modal-body');
            		jQuery('<a/>', {class: 'd-inline-block mt-2 factory-link',  href: ''+data.factoryLink+'', text: ''+data.factoryName+''}).appendTo('#modal-add-factory .modal-body');

            		var factoryNumber = $('#plants-table tbody tr').last().find('td').first().text();
            		factoryNumber = +factoryNumber + 1;
            		
            		var factoryContactsUl = '';

            		for (var j = 0, k = data.factoryContacts.length; j < k; j++) {
							factoryContactsUl = factoryContactsUl + '<li>'+ data.factoryContacts[j]+'</li>';
					};

            		$(
            			'<tr>' +
                            '<td>'+factoryNumber+'</td>' +
                            '<td>'+data.factoryName+'</td>' +
                            '<td>'+data.factoryAddress+'</td>' +
                            '<td>'+data.factorySite+'</td>' +
                            '<td><ul>'+factoryContactsUl+'</ul></td>' +
                    	'</tr>'
                    ).appendTo('#plants-table tbody');

            		//поведение кнопок
	                $(this).find('input').prop('disabled', false);
	                $(this).find('input').val('');
	                submit.html("");
	                submit.css('min-width', 'none');
	                submit.html(btnText);
	                submit.prop('disabled', false);
	                $('.toast-body').text('Завод добавлен');
	                $('.toast').toast('show');
            	};

            }, this),
            error: function(data) {
                alert('Ошибка при отправке данных на сервер');
            }
        });
    });
});
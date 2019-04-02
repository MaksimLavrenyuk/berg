$(document).ready(function() {
    /*
	$('#factory-change-info').on('shown.bs.collapse', function () {

		$('.factory-change-info__group').children().remove();

		var factoryInfoList = $('.page-factory-info').children();

		for (var i = 0, l = factoryInfoList.length; i < l; i++) {

			var factoryInfoCaption = factoryInfoList.eq(i).children('.page-factory-info__caption');

			if (factoryInfoCaption.next().is('ul')) {

				var factoryInfoData =  factoryInfoList.eq(i).children('ul');
				var factoryInfoDataListInput = '';

				for (var j = 0, k = factoryInfoData.children('li').length; j < k; j++) {
					factoryInfoDataListInput = factoryInfoDataListInput + '<input type="text" class="form-control mt-2" value="'+factoryInfoData.children('li').eq(j).text().trim()+'">'
				};

				$('<div class="form-group">' +
					  '<label for="factoryInfoData'+i+'">'+factoryInfoCaption.text()+'</label>' + 
		              factoryInfoDataListInput +
		              '</div>').appendTo('.factory-change-info__group');

			} else {
				var factoryInfoData =  factoryInfoList.eq(i).children('.page-factory-info__text');

				$('<div class="form-group">' +
					'<label for="factoryInfoData'+i+'">'+factoryInfoCaption.text()+'</label>' + 
	              	'<input name="factoryAddCaption" type="text" class="form-control" id="factoryInfoData'+i+'" value="'+factoryInfoData.text()+'"' +
	              '</div>').appendTo('.factory-change-info__group');
			};
		}
	});
    */
	$('#factory-change-info').submit(function(e) {
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

                $('#h1-factory-name').text($(this).find('input[name="FactoryName"]').val());
                $('.page-factory-info__text_address').text($(this).find('input[name="FactoryAddress"]').val());
                $('.page-factory-info__text_site').text($(this).find('input[name="FactorySite"]').val());
                $('.page-factory-info__contacts').children().remove();

                var factoryInfoContactsList = '';
                for (var i = 0, l = $('#factoryContactsInputs').find('input').length; i < l; i++) {
                    factoryInfoContactsList = factoryInfoContactsList + '<li>'+$('#factoryContactsInputs').find('input').eq(i).val()+'</li>'
                };
                $(factoryInfoContactsList).appendTo('.page-factory-info__contacts');

                /*
            	// обнуляем информацию о заводе
            	$('.page-factory-info').children().remove();

                for (var i = 0, l = $(this).find('.form-group').length; i < l; i++) {

                	var inputCounter = $(this).find('.form-group').eq(i).find('input').length;
 					var inputElem = $(this).find('.form-group').eq(i).find('input');
                	var inputElemCaption = inputElem.prev().text();
                	var inputElemText = inputElem.val();
                	if (inputCounter > 1) {

                		var factoryInfoDataListUl = '';

						for (var j = 0, k = inputCounter; j < k; j++) {
							var factoryInfoDataText = $(this).find('.form-group').eq(i).find('input').eq(j).val();
							factoryInfoDataListUl = factoryInfoDataListUl + '<li><a href="">'+factoryInfoDataText+'</a></li>';
						};

                		$('<li>', { class: 'page-factory-info__itm'}).appendTo('.page-factory-info');
                		$('<h5>', {class: 'page-factory-info__caption', text: inputElemCaption}).appendTo($('.page-factory-info__itm').last());
                		$('<ul>' + factoryInfoDataListUl + '</ul>').appendTo($('.page-factory-info__itm').last());

                	} else {
                		
                		$('<li>', { class: 'page-factory-info__itm'}).appendTo('.page-factory-info');
                		$('<h5>', {class: 'page-factory-info__caption', text: inputElemCaption}).appendTo($('.page-factory-info__itm').last());

                		if (inputElemText.indexOf("http") != -1) {
                			$('<a>', { href: inputElemText, class: 'page-factory-info__text', text: inputElemText}).appendTo($('.page-factory-info__itm').last());
                		} else {
                			$('<span>', {class: 'page-factory-info__text', text: inputElemText}).appendTo($('.page-factory-info__itm').last());
                		};
                	};
                };

                */

                //поведение кнопок
                $(this).find('input').prop('disabled', false);
                submit.html("");
                submit.css('min-width', 'none');
                submit.html(btnText);
                submit.prop('disabled', false);
                $('.toast-body').text('Данные завода изменены');
                $('.toast').toast('show');
            }, this),
              	error: function(data) {
                    alert('Ошибка при отправке данных на сервер');
                }
            });
	});
});
$(document).ready(function() {
	var overlay =  $('#map-overlay');
	var contentBox =  $('.content__main_type_map');
	
	$('#map-search').submit(function(e) {
		e.preventDefault();
		var checkedNum = $('#map-search input[type="checkbox"]:checked').length;
		if (!checkedNum) {
			if (!$("div").is('#map-overlay')) {
		        overlay.appendTo(contentBox);
		    };
		    //закрытие меню дополнительной информации
		    if ($('.aside-info').hasClass('aside-info_type_open')) {
		        asideInfoOpen ();
		    };
			overlay.text('товарные группы не выбраны');
		} else {
			var submit = $("[type=submit]", this);
		    var width = $("[type=submit]", this).css("width");
		    var url = $(this).attr('action');

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
		            $(this).find('input').prop('disabled', false);
		            submit.html("");
		            submit.css('min-width', 'none');
		            submit.html("Найти");
		            submit.prop('disabled', false);

		            console.log(data.status);
		            if (data.status === 'error') {
		            	if (!$("div").is('#map-overlay')) {
					        overlay.appendTo(contentBox);
					    };

		            	overlay.text(data.msg);

		            	if ($('.aside-info').hasClass('aside-info_type_open')) {
		        			asideInfoOpen ();
		    			};
		            } else {

			            if ($("div").is('#map-overlay')) {
			            	overlay.detach();
			            };
					
			            $('.aside-info__content').children().remove();

			            var factoryCounter = 0;
			            var wayKm = 0;
			            var priceKm = data.priceKm;
			            var priceWay = 0;

			            for (var i = 0, l = data.factoryList.length; i < l; i++) {
			            	ymaps.route([ data.CityName, { type: 'wayPoint', point: data.factoryList[i].factoryСoordinates.split(', ') }], 
								{
									mapStateAutoApply: false

							    }).then(function (route) {
								    var points = route.getWayPoints(),
								    	lastPoint = points.getLength() - 1;
								    points.options.set('preset', 'islands#redStretchyIcon');
								    points.get(0).properties.set('iconContent', 'Точка доставки: '+data.CityName+'');
								    points.get(lastPoint).properties.set('iconContent', 'В наличии: '+data.factoryList[factoryCounter].factoryName+'');
								    


								// добавляем маршрут на карту
								myMap.geoObjects.add(route);

								wayKm = route.getLength();
								wayKm  = wayKm / 1000;
								wayKm = Math.round(wayKm * 100) / 100;

								priceWay = wayKm * priceKm;
								priceWay = Math.round(priceWay * 100) / 100;

								if ($('.aside-info__content').children().length = 0) {

								}
								var listItm = $('<ul class="product-info__list"></ul>');

								for (var j = 0, k = data.factoryList[factoryCounter].productStockName.length; j < k; j++) {
									$('<li class="product-info__itm">'+data.factoryList[factoryCounter].productStockName[j]+'</li>').appendTo(listItm);
								};

								listItm = listItm.prop('outerHTML');


								$('<div class="product-info">' + 
						            '<h5 class="product-info__title">'+data.factoryList[factoryCounter].factoryName+'</h5>' + 
					                '<h6 class="product-info__caption">Имеющиеся товары:</h6>' + 
					                listItm +
					                '<span class="product-info__text">Расстояние до адреса доставки: <span class="product-info__way">'+wayKm+'</span> км.</span>' +
					                '<br>' +
					                '<span class="product-info__text">Стоимость доставки: <span class="product-info__price">'+priceWay+'</span> руб.</span>' +
			        			'</div>').appendTo('.aside-info__content');

			        			factoryCounter++;
							});
				        };

						//открытие меню дополнительной информации
			           	if (!$('.aside-info').hasClass('aside-info_type_open')) {
			           		asideInfoOpen ();
			           	};
		            };

		        }, this),
		        error: function(data) {
		            alert('Ошибка при отправке данных на сервер');
		        }
		    });
		};

    });
});


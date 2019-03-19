$(document).ready(function() {
	$('#map-search').submit(function(e) {

        e.preventDefault();
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

	 			var factoryList = [ {factoryName: 'Завод №1', factoryСoordinates: '54.817224, 38.371901'}, { factoryName: 'Завод №2', factoryСoordinates: '55.034718, 40.927513'} ];

	            // добавление метки города
	            ymaps.geocode(data.CityName, {
	            /**
	             * Опции запроса
	             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml
	             */
	            // Сортировка результатов от центра окна карты.
	            // boundedBy: myMap.getBounds(),
	            // strictBounds: true,
	            // Вместе с опцией boundedBy будет искать строго внутри области, указанной в boundedBy.
	            // Если нужен только один результат, экономим трафик пользователей.
	            results: 1
		        }).then(function(res) {
		            // Выбираем первый результат геокодирования.
		            var firstGeoObject = res.geoObjects.get(0),
		                // Координаты геообъекта.
		                coords = firstGeoObject.geometry.getCoordinates(),
		                // Область видимости геообъекта.
		                bounds = firstGeoObject.properties.get('boundedBy');

		            firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
		            // Получаем строку с адресом и выводим в иконке геообъекта.
		            firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

		            // Добавляем первый найденный геообъект на карту.
		            myMap.geoObjects.add(firstGeoObject);
		            // Масштабируем карту на область видимости геообъекта.
		            myMap.setBounds(bounds, {
		                // Проверяем наличие тайлов на данном масштабе.
		                checkZoomRange: true
		            });       
		        });
		        var FactoryCoords = [];

		        for (var i = 0, l = factoryList.length; i < l; i++) {
		        	var coordinate = factoryList[i].factoryСoordinates.split(', ');
		        	FactoryCoords.push(coordinate);
		        };

		        console.log(FactoryCoords);
		     
		        FactoryCollection = new ymaps.GeoObjectCollection(null, {
			        preset: 'islands#yellowIcon'
			    });

			    for (var i = 0, l = FactoryCoords.length; i < l; i++) {
			        FactoryCollection.add(new ymaps.Placemark(FactoryCoords[i]));
			    };
			    myMap.geoObjects.add(FactoryCollection);

	        }, this),
	        error: function(data) {
	            alert('Ошибка при отправке данных на сервер');
	        }
	    });

    });
});


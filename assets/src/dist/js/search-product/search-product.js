$(document).ready(function() {
    var overlay = $('#map-overlay');
    var contentBox = $('.content__main_type_map');

    $('#map-search').submit(function(e) {
        e.preventDefault();

        // проверка заполнения checkbox
        var InputCityVal = $('#cityes-search-input').val().length;
        var checkedNum = $('#map-search input[type="checkbox"]:checked').length;
        if ((checkedNum != 0) && (InputCityVal != 0)) {
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
                    //поведение кнопок
                    $(this).find('input').prop('disabled', false);
                    submit.html("");
                    submit.css('min-width', 'none');
                    submit.html("Найти");
                    submit.prop('disabled', false);
                    // если товары не найдены нигде 
                    if (data.status === 'error') {
                        if (!$("div").is('#map-overlay')) {
                            overlay.appendTo(contentBox);
                        };
                        overlay.text(data.msg);
                        if ($('.aside-info').hasClass('aside-info_type_open')) {
                            asideInfoOpen();
                        };
                        // если товар найден
                    } else {
                        if ($("div").is('#map-overlay')) {
                            overlay.detach();
                        };
                        // обнуляем карточки товара
                        $('.aside-info__content').children().remove();
                        //var wayKm = 0;
                        var tonnage = data.tonnage;
                        var priceWay = 0;
                        // создам новый объект содержащий информацю о заводах
                        var FactoryData = {};
                        // скопируем в него все свойства 
                        for (var key in data.factoryList) {
                            FactoryData[key] = data.factoryList[key];
                        }
                        var dataMoscowRegionCoords = data.bookshelf;
                        // удалю старые маршруты и точки
                        myMap.geoObjects.removeAll();

                        // по длине массива данных о заводе создам маршруты
                        for (var key in FactoryData) {
                            var pointRoute = FactoryData[key].factoryСoordinates;
                            var dataFactoryName = FactoryData[key].factoryName;
                            var dataFactory__productStock = FactoryData[key].productStockName;
                            var dataFactory__contacts = FactoryData[key].factoryContacts;
                            createRoute('Москва', pointRoute, dataFactoryName, key, tonnage, dataFactory__productStock, dataFactory__contacts, dataMoscowRegionCoords);
                        };

                        //открытие меню дополнительной информации
                        if (!$('.aside-info').hasClass('aside-info_type_open')) {
                            asideInfoOpen();
                        };
                    };
                }, this),
                error: function(data) {
                    alert('Ошибка при отправке данных на сервер');
                }
            });
        } else {
            if (!$("div").is('#map-overlay')) {
                overlay.appendTo(contentBox);
            };
            //закрытие меню дополнительной информации
            if ($('.aside-info').hasClass('aside-info_type_open')) {
                asideInfoOpen();
            };
            overlay.text('Выберите город и товарную группу');
        };

    });
});

// функция добавления маршрута и информации о нем
function createRoute(firstPoint, secondPoint, factName, count, tonnage, stockInfo, contactsInfo, moscowRegionCoords) {
    ymaps.route([firstPoint, { type: 'wayPoint', point: secondPoint }], {
        mapStateAutoApply: false

    }).then(function(route) {
        myMap.geoObjects.add(route);
        // переименовываем точки

        var points = route.getWayPoints(),
            lastPoint = points.getLength() - 1,
            lastPointObj = points.get(lastPoint),
            deliveryPointCoords = points.get(0).geometry.getCoordinates(),
            pointID = points.get(lastPoint).properties.get('name');
        points.options.set('preset', 'islands#redStretchyIcon');
        points.get(0).properties.set('iconContent', 'Точка доставки: ' + firstPoint + '');
        lastPointObj.properties.set('iconContent', 'В наличии: ' + factName + '');
        lastPointObj.properties.set('name', 'point-' + count + '');

        // добавляем маршрут на карту
        myMap.geoObjects.add(route);


        // длина маршрута
        var wayKm = route.getLength();
        var priceConteiner = '';
        var ProductlistItm = $('<ul class="product-info__list"></ul>');
        var factoryContacts = $('<ul class="product-info-contacts"></ul>');
        var polygonMoscow = new ymaps.Polygon([moscowRegionCoords], {
            hintContent: "Московская область"
        }, {
            fillColor: '#6699ff',
            // Делаем полигон прозрачным для событий карты.
            interactivityModel: 'default#transparent',
            strokeWidth: 8,
            opacity: 0.5
        });
        //добавляем московскую область на карту
        var polygonMoscowResult = ymaps.geoQuery(polygonMoscow).addToMap(myMap);
        // проверяем попадает ли точка доставки в Московскую область
        var resultMoscow = polygonMoscowResult.searchContaining(deliveryPointCoords);


        wayKm = wayKm / 1000;
        wayKm = Math.round(wayKm * 100) / 100;

        // если попадает
        if (resultMoscow.getLength()) {

            // считаем стоимость пути
            for (var t = 0, tlen = tonnage.length; t < tlen; t++) {
                var tonnageName = tonnage[t].tonnageName;
                if (wayKm < 100) {
                    var tonnagePrice = +tonnage[t].tonnagePrice100km * wayKm * 1.1;
                    tonnagePrice = Math.round(tonnagePrice * 100) / 100;
                    priceConteiner = priceConteiner + '<li>Тоннаж: ' + tonnageName + '<br>Стоимость: <strong>' + tonnagePrice + ' руб.</strong></li>';
                } else if ((wayKm > 100) && (wayKm < 500)) {
                    var tonnagePrice = +tonnage[t].tonnagePrice500km * wayKm * 1.1;
                    tonnagePrice = Math.round(tonnagePrice * 100) / 100;
                    priceConteiner = priceConteiner + '<li>Тоннаж: ' + tonnageName + '<br>Стоимость: <strong>' + tonnagePrice + ' руб.</strong></li>';
                } else if ((wayKm > 500) && (wayKm < 1000)) {
                    var tonnagePrice = +tonnage[t].tonnagePrice500km * wayKm * 1.1;
                    tonnagePrice = Math.round(tonnagePrice * 100) / 100;
                    priceConteiner = priceConteiner + '<li>Тоннаж: ' + tonnageName + '<br>Стоимость: <strong>' + tonnagePrice + ' руб.</strong></li>';
                }
            };
        } else {

            // считаем стоимость пути
            for (var t = 0, tlen = tonnage.length; t < tlen; t++) {
                var tonnageName = tonnage[t].tonnageName;
                if (wayKm < 100) {
                    var tonnagePrice = +tonnage[t].tonnagePrice100km * wayKm;
                    tonnagePrice = Math.round(tonnagePrice * 100) / 100;
                    priceConteiner = priceConteiner + '<li>Тоннаж: ' + tonnageName + '<br>Стоимость: <strong>' + tonnagePrice + ' руб.</strong></li>';
                } else if ((wayKm > 100) && (wayKm < 500)) {
                    var tonnagePrice = +tonnage[t].tonnagePrice500km * wayKm;
                    tonnagePrice = Math.round(tonnagePrice * 100) / 100;
                    priceConteiner = priceConteiner + '<li>Тоннаж: ' + tonnageName + '<br>Стоимость: <strong>' + tonnagePrice + ' руб.</strong></li>';
                } else if ((wayKm > 500) && (wayKm < 1000)) {
                    var tonnagePrice = +tonnage[t].tonnagePrice500km * wayKm;
                    tonnagePrice = Math.round(tonnagePrice * 100) / 100;
                    priceConteiner = priceConteiner + '<li>Тоннаж: ' + tonnageName + '<br>Стоимость: <strong>' + tonnagePrice + ' руб.</strong></li>';
                }
            };

        };

        // формируем список товаров в наличии
        for (var j = 0, k = stockInfo.length; j < k; j++) {
            $('<li class="product-info__itm">' + stockInfo[j] + '</li>').appendTo(ProductlistItm);
        };

        // приводим объект в строку
        ProductlistItm = ProductlistItm.prop('outerHTML');

        // формируем список контактов
        for (var q = 0, w = contactsInfo.length; q < w; q++) {
            var factoryContactsText = contactsInfo[q];

            $('<li class="product-info-contacts__itm"><span>' + factoryContactsText + '</span></li>').appendTo(factoryContacts);
        };

        // приводим объект в строку
        factoryContacts = factoryContacts.prop('outerHTML');

        // создаем карточку
        $('<div class="product-info" data-product-name="' + pointID + '">' +
            '<h5 class="product-info__title">' + factName + '</h5>' +
            '<h6 class="product-info__caption">Имеющиеся товары:</h6>' +
            ProductlistItm +
            '<h6 class="product-info__caption">Контакты:</h6>' +
            factoryContacts +
            '<span class="product-info__text">Расстояние до адреса доставки: <span class="product-info__way">' + wayKm + '</span> км.</span>' +
            '<br>' +
            '<div class="product-info__text product-info__price">Стоимость доставки: <ul>' + priceConteiner + '</ul></div>' +
            '</div>').appendTo('.aside-info__content');

        //добавляем прокрутку спика информации до выбранной позиции
        points.get(lastPoint).events.add('click', function(e) {
            $(".aside-info").stop().animate({
                'scrollTop': $(".aside-info").find('[data-product-name="' + pointID + '"]').offset().top - 130,
            }, 300);
            $(".aside-info").find('.product-info').removeClass('product-info_select');
            $(".aside-info").find('[data-product-name="' + pointID + '"]').addClass('product-info_select');
        });

    });
}
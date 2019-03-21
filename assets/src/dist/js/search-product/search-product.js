$(document).ready(function() {
    var overlay = $('#map-overlay');
    var contentBox = $('.content__main_type_map');

    $('#map-search').submit(function(e) {
        e.preventDefault();

        // проверка заполнения checkbox
        var checkedNum = $('#map-search input[type="checkbox"]:checked').length;
        if (!checkedNum) {
            if (!$("div").is('#map-overlay')) {
                overlay.appendTo(contentBox);
            };
            //закрытие меню дополнительной информации
            if ($('.aside-info').hasClass('aside-info_type_open')) {
                asideInfoOpen();
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


                        var factoryCounter = 0;
                        var wayKm = 0;
                        var priceKm = data.priceKm;
                        var priceWay = 0;

                        for (var i = 0, l = data.factoryList.length; i < l; i++) {
                            // строим маршрут
                            ymaps.route([data.CityName, { type: 'wayPoint', point: data.factoryList[i].factoryСoordinates.split(', ') }], {
                                mapStateAutoApply: false

                            }).then(function(route) {

                                // переименовываем точки
                                var points = route.getWayPoints(),
                                    lastPoint = points.getLength() - 1;
                                points.options.set('preset', 'islands#redStretchyIcon');
                                points.get(0).properties.set('iconContent', 'Точка доставки: ' + data.CityName + '');
                                points.get(lastPoint).properties.set('iconContent', 'В наличии: ' + data.factoryList[factoryCounter].factoryName + '');

                                points.get(lastPoint).properties.set('name', 'point-'+factoryCounter+'');
                                var pointID = points.get(lastPoint).properties.get('name');
                                // добавляем маршрут на карту
                                myMap.geoObjects.add(route);

                                // расчитываем длину пути
                                wayKm = route.getLength();
                                wayKm = wayKm / 1000;
                                wayKm = Math.round(wayKm * 100) / 100;

                                // считаем стоимость пути
                                priceWay = wayKm * priceKm;
                                priceWay = Math.round(priceWay * 100) / 100;


                                // формируем список товаров в наличии
                                var ProductlistItm = $('<ul class="product-info__list"></ul>');

                                for (var j = 0, k = data.factoryList[factoryCounter].productStockName.length; j < k; j++) {
                                    $('<li class="product-info__itm">' + data.factoryList[factoryCounter].productStockName[j] + '</li>').appendTo(ProductlistItm);
                                };

                                ProductlistItm = ProductlistItm.prop('outerHTML');

                                var factoryContacts;

                                // формируем список контактов
                                if (data.factoryList[factoryCounter].factoryContacts != 0) {

                                    factoryContacts = $('<ul class="product-info-contacts"></ul>');

                                    for (var q = 0, w = data.factoryList[factoryCounter].factoryContacts.length; q < w; q++) {

                                        var factoryContactsText = data.factoryList[factoryCounter].factoryContacts[q];
                                        var factoryContactsLink;

                                        if (factoryContactsText.indexOf('@') !== -1) {
                                            factoryContactsLink = 'mailto:' + factoryContactsText;
                                        } else {
                                            factoryContactsLink = 'tel:+' + factoryContactsText.replace(/[^0-9]/g, "");

                                        };

                                        $('<li class="product-info-contacts__itm"><a href="' + factoryContactsLink + '">' + factoryContactsText + '</a></li>').appendTo(factoryContacts);
                                    };

                                    factoryContacts = factoryContacts.prop('outerHTML');
                                };

                                if (factoryContacts === undefined) {
                                    factoryContacts = "Контакты не заполнены <br><br>";
                                }
                                // создаем карточку

                                $('<div class="product-info" data-product-name="'+pointID+'">' +
                                    '<h5 class="product-info__title">' + data.factoryList[factoryCounter].factoryName + '</h5>' +
                                    '<h6 class="product-info__caption">Имеющиеся товары:</h6>' +
                                    ProductlistItm +
                                    '<h6 class="product-info__caption">Контакты:</h6>' +
                                    factoryContacts +
                                    '<span class="product-info__text">Расстояние до адреса доставки: <span class="product-info__way">' + wayKm + '</span> км.</span>' +
                                    '<br>' +
                                    '<span class="product-info__text">Стоимость доставки: <span class="product-info__price">' + priceWay + '</span> руб.</span>' +
                                    '</div>').appendTo('.aside-info__content');

                                points.get(lastPoint).events.add('click', function (e) {
                                	$(".aside-info").stop().animate({
					                	'scrollTop': $(".aside-info").find('[data-product-name="'+pointID+'"]').offset().top - 100,
					                }, 300);
					                $(".aside-info").find('.product-info').removeClass('product-info_select');
					                $(".aside-info").find('[data-product-name="'+pointID+'"]').addClass('product-info_select');
                                });

                               
                                factoryCounter++;
                            });
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
        };

    });
});
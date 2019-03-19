var myMap;
function init() {
    // Создание карты.    
    myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.76, 37.64],
        controls: [],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 7
    });

    var multiRoute = new ymaps.multiRouter.MultiRoute({
        // Описание опорных точек мультимаршрута.
        referencePoints: [
                [54.817224, 38.371901], 
                "Москва"
        ],
        // Параметры маршрутизации.
        params: {
            // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
            results: 1
        }
    },
     {
        // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
        boundsAutoApply: true
    });
    var multiRoute2 = new ymaps.multiRouter.MultiRoute({
        // Описание опорных точек мультимаршрута.
        referencePoints: [
                [55.034718, 40.927513], 
                "Москва"
        ],
        // Параметры маршрутизации.
        params: {
            // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
            results: 1
        }
    },
     {
        // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
        boundsAutoApply: true
    });
    myMap.geoObjects.add(multiRoute);
    myMap.geoObjects.add(multiRoute2);

    /*
            ymaps.route(['Москва, метро Смоленская', 'Москва, метро Арбатская'], {
                mapStateAutoApply: true
            }).then(function (route) {
                myMap.geoObjects.add(route);
                // Включаем редактор.
                route.editor.start({
                    addWayPoints: true
                });
            });
    */
};

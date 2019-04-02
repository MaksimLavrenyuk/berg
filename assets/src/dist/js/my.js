$(document).ready(function() {


    // функция давление в кеш браузера прелоудера
    function preloadImages(array) {
	    if (!preloadImages.list) {
	        preloadImages.list = [];
	    }
	    var list = preloadImages.list;
	    for (var i = 0; i < array.length; i++) {
	        var img = new Image();
	        img.onload = function() {
	            var index = list.indexOf(this);
	            if (index !== -1) {
	                list.splice(index, 1);
	            }
	        }
	        list.push(img);
	        img.src = array[i];
	    }
	}

	preloadImages(["dist/img/preloader.svg", "dist/img/preloader-circular.svg"]);
});


// Импортируем карту
//= map/map.js

// Импортируем поиск по городам
//= search-city/search-city.js

// Импортируем поиск товара
//= search-product/search-product.js

// Импортируем боковое информационное меню
//= aside-info/aside-info.js

// Импортируем добавление товарной группы
//= add-product/add-product.js

// Импортируем добавление информации о заводе
//= factory-add-info/factory-add-info.js

// Импортируем изменение информации о заводе
//= factory-change-info/factory-change-info.js

// Импортируем изменение списка групп
//= product-group-list/product-group-list.js

// Импортируем добавление завода
//= add-factory/add-factory.js

// Импортируем тосты
//= toast/toast.js

// Импортируем тоннаж
//= tonnage/tonnage.js

// Импортируем добавление поля (для всего кроме тоннажа)
//= add-input/add-input.js

// Импортируем формы
//= form/form.js

// Импортируем пароль
//= password/password.js
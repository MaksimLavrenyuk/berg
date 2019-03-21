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

	preloadImages(["dist/img/preloader-circular.svg"]);
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
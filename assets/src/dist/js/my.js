$(document).ready(function() {

	// маска на телефон
    $('[type="tel"]').mask("+7 (999) 999-99-99");

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

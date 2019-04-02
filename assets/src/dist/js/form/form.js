$(document).ready(function() {

    (function() {

        // Устанавливаем Валидацию формы
        $('.form_needs-validation input, .form_needs-validation textarea').keyup(function() {

            validationForm($(this));

        });

        $('.form_needs-validation input, .form_needs-validation textarea').change(function() {

            validationForm($(this));

        });

        $('.form_needs-validation input, .form_needs-validation textarea').blur(function() {
            var quantityFields = $(this).closest('.form_needs-validation').find('[required]');
            var quantityFieldsIsValid;
            var quantityFieldsIsInValid;

            quantityFieldsIsValid = quantityFields.filter('.is-valid');
            quantityFieldsIsInValid = quantityFields.not('.is-valid');


            // включение кнопки при полной валидации
            if (quantityFieldsIsValid.length == quantityFields.length) {

                $(this).closest('.form').find('[type=submit]').prop("disabled", false);

            } else {

                $(this).closest('.form').find('[type=submit]').prop("disabled", true);

            };

        });

        /*$('.form_needs-validation').submit(function(e) {

            submitForm(e, this);

        });
            */

    })();




    function validationForm(target) {

        // Для удобства записываем обращения к атрибуту и значению каждого поля в переменные 
        var name = target.attr('name');
        var val = target.val();
        // После того, как поле потеряло фокус, перебираем значения имени
        switch (name) {
            // Проверка поля "Имя"
            case 'name':
                var regexp_name = /^[a-zа-яё]+$/i; // используем регулярное выражение


                if (val.length > 2 && val != '' && regexp_name.test(val)) {
                    target.addClass('is-valid').removeClass('is-invalid');
                    target.next('.valid-message')
                        .removeClass('invalid-feedback')
                        .addClass('valid-feedback')
                        .text('Принято');
                } else {
                    target.removeClass('is-valid').addClass('is-invalid');
                    target.next('.valid-message')
                        .removeClass('valid-feedback')
                        .addClass('invalid-feedback')
                        .html('&bull; Длина имени должна составлять не менее двух символов<br> &bull; Поле должно содержать только русские или латинские буквы');
                }
                break;


                // Проверка телефона
            case 'tel':

                var regexp_tel = /^\+\d\s\(\d{3}?\)\s\d{3}-\d{2}-\d{2}$/i;

                if (regexp_tel.test(val)) {
                    target.addClass('is-valid').removeClass('is-invalid');
                    target.next('.valid-message')
                        .removeClass('invalid-feedback')
                        .addClass('valid-feedback')
                        .text('Принято');
                } else {
                    target.removeClass('is-valid').addClass('is-invalid');
                    target.next('.valid-message')
                        .removeClass('valid-feedback')
                        .addClass('invalid-feedback')
                        .html('&bull; Поле "Телефон" должно содержать ваш телефон в формате +7 (800) 000-00-00');
                }
                break;

                // Проверка электронной почты
            case 'email':

                var regexp_email = /^[A-z0-9._-]+@[A-z0-9.-]+\.[A-z]{2,4}$/i;

                if (val != '' && regexp_email.test(val)) {
                    target.addClass('is-valid').removeClass('is-invalid');
                    target.next('.valid-message')
                        .removeClass('invalid-feedback')
                        .addClass('valid-feedback')
                        .text('Принято');
                } else {
                    target.removeClass('is-valid').addClass('is-invalid');
                    target.next('.valid-message')
                        .removeClass('valid-feedback')
                        .addClass('invalid-feedback')
                        .html('&bull; Поле должно содержать правильный email-адрес формата example@mail.com');
                }
                break;

            case 'INN':

                var regexp_INN = /^\d{10,12}$/i;

                if ((val.length == 12 || val.length == 10) && regexp_INN.test(val)) {
                    target.addClass('is-valid').removeClass('is-invalid');
                    target.next('.valid-message')
                        .removeClass('invalid-feedback')
                        .addClass('valid-feedback')
                        .text('Принято');
                } else {
                    target.removeClass('is-valid').addClass('is-invalid');
                    target.next('.valid-message')
                        .removeClass('valid-feedback')
                        .addClass('invalid-feedback')
                        .html('&bull; Поле "ИНН" должно содержать информацию в формате: 1111111111 или 111111111111 <br> &bull; Длина строки - 10 или 12 символов');
                }
                break;

        };
    };


});

function submitForm(e, target) {
    e.preventDefault();
    var submit = $("[type=submit]", target);
    var width = $("[type=submit]", target).css("width");
    var url = $(target).attr('action');

    $.ajax({
        beforeSend: $.proxy(function() {
            $(target).find('input, textarea').prop('disabled', true);
            submit.prop('disabled', true);
            submit.html("");
            submit.css('min-width', '' + width + '');
            $('<img class="preloader" src="dist/img/preloader.svg" alt="preloader">').appendTo(submit);
        }, target),
        url: url,
        type: 'post',
        data: $(target).serialize(),
        dataType: 'text',
        success: $.proxy(function() {
            $(target).find('input, textarea').prop('disabled', true);
            submit.html("");
            submit.css('min-width', 'none');
            submit.html("Отправлено");
            submit.prop('disabled', true);
        }, target),
        error: function(data) {
            alert('Ошибка при отправке данных на сервер');
        }
    });
}
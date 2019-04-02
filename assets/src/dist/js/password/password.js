$(document).ready(function() {

    $('.password-box__btn').mousedown(function() {
        $(this).toggleClass('password-box__btn_show');
        $(this).prev().prop('type', 'text');
    });
    $('.password-box__btn').mouseup(function() {
        $(this).toggleClass('password-box__btn_show');
        $(this).prev().prop('type', 'password');
    });

    $('#signInForm').submit(function(e) {
        e.preventDefault();
        var submit = $("[type=submit]", this);
        var submitText = $("[type=submit]", this).text();
        var width = $("[type=submit]", this).css("width");
        var url = $(this).attr('action');
        var password = $(this).find('[type="password"]');
        $.ajax({
            beforeSend: $.proxy(function() {
                $(this).find('input').prop('disabled', true);
                submit.prop('disabled', true);
                submit.html("");
                submit.css('min-width', '' + width + '');
                $('<img class="preloader" src="dist/img/preloader.svg" alt="preloader">').appendTo(submit);
                password.removeClass('is-invalid');
                password.parent().next('.valid-message').removeClass('invalid-feedback').text('');
            }, this),
            url: url,
            type: 'post',
            data: $(this).serialize(),
            dataType: 'json',
            success: $.proxy(function(data) {
            	if (data.msg == 'error') {
            		password.addClass('is-invalid');
            		password.parent().next('.valid-message').addClass('invalid-feedback').text('Неверный пароль');
            		//поведение кнопок
	                $(this).find('input').prop('disabled', false);
	                submit.html("");
	                submit.css('min-width', 'none');
	                submit.html("Войти");
	                submit.prop('disabled', false);
            	} else {
            		window.location.href='/search-product.html';
            	}
            }, this),
            error: function(data) {
                alert('Ошибка при отправке данных на сервер');
            }
        });

    });

    $('#signInForm input').blur(function() {
        var quantityFields = $(this).closest('.form_needs-validation').find('[required]').not('[type="password"]');
        var quantityFieldsIsValid = quantityFields.filter('.is-valid');

        // включение кнопки при полной валидации
        if ((quantityFieldsIsValid.length == quantityFields.length) && ($(this).closest('.form').find('[type="password"]').val().length > 0)) {

            $(this).closest('.form').find('[type=submit]').prop("disabled", false);

        } else {

            $(this).closest('.form').find('[type=submit]').prop("disabled", true);

        };

    });
})
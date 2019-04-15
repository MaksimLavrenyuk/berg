$(document).ready(function () {


    $('.js-delete-tonnage-spec').click(function () {
        deleteTonnage($(this));
    });

    $('#tariffScale').submit(function (e) {
        e.preventDefault();
        var submit = $("[type=submit]", this);
        var width = $("[type=submit]", this).css("width");
        var url = $(this).attr('action');
        var btnText = $("[type=submit]", this).text();

        $.ajax({
            beforeSend: $.proxy(function () {
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
            success: $.proxy(function (data) {

                if (data.msg == "Добавлен") {
                    var tonnageLink = data.tonnageLink;
                    var tariffNumber = $('#tonnage-table tbody tr').last().find('td').first().text();
                    tonnageLink = String('window.location.href=\''+tonnageLink+'\'; return false');
                    tariffNumber = +tariffNumber + 1;
                    var tonnageID = data.tonnageID;

                    $(
                        '<tr' + ' onclick="'+ tonnageLink +'" ' + 'data-tonnage-id="' + tonnageID + '">' +
                            '<td>' + tariffNumber + '</td>' +
                            '<td>' + data.tonnageName + '</td>' +
                        '</tr>'
                    ).appendTo('#tonnage-table tbody');
                };


                //поведение кнопок
                $(this).find('input').prop('disabled', false);
                submit.html("");
                submit.css('min-width', 'none');
                submit.html(btnText);
                submit.prop('disabled', false);
                $('.toast-body').text('Тарифная сетка изменена');
                $('.toast').toast('show');
            }, this),
        error: function (data) {
            alert('Ошибка при отправке данных на сервер');
        }
    });

});
    $('#tonnage').submit(function (e) {
        e.preventDefault();
        var submit = $("[type=submit]", this);
        var width = $("[type=submit]", this).css("width");
        var url = $(this).attr('action');
        var btnText = $("[type=submit]", this).text();

        $.ajax({
            beforeSend: $.proxy(function () {
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
            success: $.proxy(function (data) {

                if (data.msg == "Добавлен") {
                    var tonnageSpecID = data.tonnageSpecID;
                    var tonnageSpecKm = data.tonnageSpecKm;
                    var tonnageSpecPrice = data.tonnageSpecPrice;

                    $(
                        '<tr data-tonnage-spec-id="' + tonnageSpecID + '">' +
                        '<td>' + tonnageSpecKm + '</td>' +
                        '<td>' + tonnageSpecPrice + '</td>' +
                        '<td  width="100">' +
                            '<button type="button" class="btn btn-danger btn-sm js-delete-tonnage-spec">Удалить</button>' +
                        '</td>'+
                        '</tr>'
                    ).appendTo('#tonnage-spec-table tbody');

                    $('.js-delete-tonnage-spec').click(function () {
                        deleteTonnage($(this));
                    });
                };


                //поведение кнопок
                $(this).find('input').prop('disabled', false);
                submit.html("");
                submit.css('min-width', 'none');
                submit.html(btnText);
                submit.prop('disabled', false);
                $('.toast-body').text('Характеристики тоннажа изменены');
                $('.toast').toast('show');
            }, this),
            error: function (data) {
                alert('Ошибка при отправке данных на сервер');
            }
        });

    });

    function deleteTonnage(target) {
        var submit = target;
        var width = target.css("width");
        var url = $('#tonnage').attr('action');
        var btnText = target.text();
        var tonnageSpecID = target.closest('[data-tonnage-spec-id]').data('tonnage-spec-id');
        $.ajax({
            beforeSend: $.proxy(function () {
                submit.prop('disabled', true);
                submit.html("");
                submit.css('min-width', '' + width + '');
                $('<img class="preloader" src="dist/img/preloader-circular.svg" alt="preloader">').appendTo(submit);
            }, this),
            url: url,
            type: 'post',
            data: {
                "tonnageSpecID": tonnageSpecID, // id товара
            },
            dataType: 'json',
            success: $.proxy(function (data) {
                if (data.msg == "Удален") {
                    target.closest('[data-tonnage-spec-id]').remove();
                    //поведение кнопок
                    submit.html("");
                    submit.css('min-width', 'none');
                    submit.html(btnText);
                    submit.prop('disabled', false);
                    $('.toast-body').text('Тоннаж Удален');
                    $('.toast').toast('show');
                };

            }, target),
            error: function (data) {
                alert('Ошибка при отправке данных на сервер');
            }
        });
    }

});
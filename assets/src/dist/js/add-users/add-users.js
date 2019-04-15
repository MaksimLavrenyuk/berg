$(document).ready(function() {
    $('#add-users-form').submit(function (e) {
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
            type: 'get',
            data: $(this).serialize(),
            dataType: 'json',
            success: $.proxy(function (data) {

                if (data.msg == "Добавлен") {
                    var UserID = data.UserID;
                    var userName = data.userName;
                    var userSecondName = data.userSecondName;
                    var usersEmail = data.usersEmail;
                    var usersPassword = data.usersPassword;

                    $(
                        '<tr data-user-id="' + UserID + '">' +
                            '<td>' + userName + '</td>' +
                            '<td>' + userSecondName + '</td>' +
                            '<td>' + usersEmail + '</td>' +
                            '<td>' + usersPassword + '</td>' +
                            '<td  width="100">' +
                            '<button type="button" class="btn btn-danger btn-sm js-delete-user">Удалить</button>' +
                            '</td>' +
                        '</tr>'
                    ).appendTo('#table-users tbody');
                    $('.js-delete-user').click(function(e) {
                        deleteUser($(this));
                    });


                    //поведение кнопок
                    $(this).find('input').prop('disabled', false);
                    $(this).find('input').val('');
                    submit.html("");
                    submit.css('min-width', 'none');
                    submit.html(btnText);
                    submit.prop('disabled', false);
                    $('.toast-body').text('Пользователь добавлен');
                    $('.toast').toast('show');
                };

            }, this),
            error: function (data) {
                alert('Ошибка при отправке данных на сервер');
            }
        });
    });

    $('.js-delete-user').click(function(e) {
        deleteUser($(this));
    });

    function deleteUser(target){
        var submit = target;
        var width = target.css("width");
        var url = $('#add-users-form').attr('action');
        var btnText = target.text();
        var userID = target.closest('[data-user-id]').data('user-id');
        $.ajax({
            beforeSend: $.proxy(function() {
                submit.prop('disabled', true);
                submit.html("");
                submit.css('min-width', '' + width + '');
                $('<img class="preloader" src="dist/img/preloader-circular.svg" alt="preloader">').appendTo(submit);
            }, this),
            url: url,
            type: 'post',
            data: {
                'userDelete': 'delete',
                "userID": userID, // id товара
            },
            dataType: 'json',
            success: $.proxy(function(data) {
                if (data.msg == "Удален") {
                    target.closest('[data-user-id]').remove();
                    //поведение кнопок
                    submit.html("");
                    submit.css('min-width', 'none');
                    submit.html(btnText);
                    submit.prop('disabled', false);
                    $('.toast-body').text('Группа Удалена');
                    $('.toast').toast('show');
                };

            }, target),
            error: function(data) {
                alert('Ошибка при отправке данных на сервер');
            }
        });
    };

    $('#add-users-password-1, #add-users-password-2').change(function() {
        var usersPass1 = $('#add-users-password-1').val();
        var usersPass2 = $('#add-users-password-2').val();
        if (usersPass1 == usersPass2) {
            $('#add-users-password-1, #add-users-password-2').addClass('is-valid').removeClass('is-invalid');
            $('#add-users-password-1, #add-users-password-2').next('.valid-message')
                .removeClass('invalid-feedback')
                .addClass('valid-feedback')
                .text('Пароль совпадает');
        } else {
            $('#add-users-password-1, #add-users-password-2').removeClass('is-valid').addClass('is-invalid');
            $('#add-users-password-1, #add-users-password-2').next('.valid-message')
                .removeClass('valid-feedback')
                .addClass('invalid-feedback')
                .html('&bull; Пароли не совпадают');
        }
    });
});
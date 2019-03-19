$(document).ready(function() {
    $(function() {
        // включаем автодополнение
        $("#cityes-search-input").autocomplete({
            source: availableTags
        });

    });
});
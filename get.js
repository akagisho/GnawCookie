$(document).ready(function () {

    $('#get').click(function () {
        var host = $('#host').val();

        chrome.cookies.getAll({}, function (cookies) {
            var length, i, regexp, result = [];
            length = cookies.length;
            regexp = new RegExp(host);
            for (i = 0; i < length; i += 1) {
                if (cookies[i].domain.match(regexp)) {
                    result.push(cookies[i]);
                }
            }
            result = result.length === 0 ? 'No cookie!'
                : JSON.stringify(result);
            $("#cookie").val(result);
        });
    });

});

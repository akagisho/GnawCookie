$(document).ready(function () {
    var vars = getUrlVars();
    if (typeof vars['host'] !== 'undefined') {
        $('#host').val(vars['host']);
        getCookie(vars['host']);
    }

    $('#get').click(function () {
        getCookie($('#host').val());
    });
});

function getCookie(host) {
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

        result = indent(result);
        $('#cookie').val(result);
    });
}

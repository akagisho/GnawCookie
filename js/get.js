$(document).ready(function () {
    var vars = getUrlVars();
    if (typeof vars['domain'] !== 'undefined') {
        $('#domain').val(vars['domain']);
        getCookie(vars['domain']);
    }
    $("#edit-page").click(function () {
        linkTo('edit.html');
    });
    $("#set-page").click(function () {
        linkTo('set.html');
    });

    $('#get').click(function () {
        getCookie($('#domain').val());
    });
//    $('form').submit(function () {
//        console.log("submit");
//        getCookie($('#domain').val());
//        return true;
//    });
});

function getCookie(domain) {
    chrome.cookies.getAll({}, function (cookies) {
        var length, i, regexp, result = [];
        length = cookies.length;
        regexp = new RegExp(domain);
        for (i = 0; i < length; i += 1) {
            if (cookies[i].domain.match(regexp)) {
                result.push(cookies[i]);
            }
        }
        result = result.length === 0 ? 'No cookie!'
            : JSON.stringify(result.sort(cookieSort));

        result = indent(result);
        $('#cookie').val(result);
    });
}

$(document).ready(function () {
    var vars = getUrlVars();
    if (typeof vars['domain'] !== 'undefined') {
        $('#domain').val(vars['domain']);
    }
    $("#edit-page").click(function () {
        linkTo('edit.html');
    });
    $("#get-page").click(function () {
        linkTo('get.html');
    });

    $('#set').click(function () {
        var cookies,
            length,
            cookie,
            i;

        cookies = JSON.parse($("#cookie").val());
        length  = cookies.length;
        for (i = 0; i < length; i += 1) {
            cookie = cookies[i];
            cookie.url = "http" + (cookie.secure ? 's' : '')
                + '://' + cookie.domain + cookie.path;
            delete cookie.hostOnly;
            delete cookie.session;
            chrome.cookies.set(cookie);
        }
        $("#result").html("Finished setting cookies.")
            .show().fadeOut(5 * 1000);
    });
});

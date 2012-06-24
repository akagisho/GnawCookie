$(document).ready(function () {
    var vars = getUrlVars();
    if (typeof vars['domain'] !== 'undefined') {
        $('#domain').val(vars['domain']);
    }
    $("#edit-page").click(function () {
        editPage();
    });
    $("#get-page").click(function () {
        getPage();
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
        $("#result").html("Maybe finished setting cookies...");
    });
});

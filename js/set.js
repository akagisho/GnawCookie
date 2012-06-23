$(document).ready(function () {
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

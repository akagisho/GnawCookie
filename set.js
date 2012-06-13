$(document).ready(function () {
    $('#set').click(function () {
        var cookies,
            domain,
            url,
            protocol,
            length,
            i;

        cookies = JSON.parse($("#cookie").val());
        length  = cookies.length;
        for (i = 0; i < length; i += 1) {
            domain = cookies[i].domain;
            protocol = cookies[i].secure ? 'https' : 'http';
            url = protocol + '://' + domain;
            cookies[i].url = url;
            delete cookies[i].hostOnly;
            delete cookies[i].session;
            chrome.cookies.set(cookies[i]);
        }
        $("#result").html("Maby finished setting cookies...");
    });
});

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
            i,
            e,
            $information;
        $information = $("#information");

        $information.removeClass("alert-success alert-error").text('').hide();
        try {
            cookies = JSON.parse($("#cookie").val());
        } catch(e) {
            $information.addClass("alert-error").text(e + "").show();
            return;
        }

        length  = cookies.length;
        if (length === undefined || length === 0) {
            return;
        }
        for (i = 0; i < length; i += 1) {
            cookie = cookies[i];
            cookie.url = "http" + (cookie.secure ? 's' : '')
                + '://' + cookie.domain + cookie.path;
            delete cookie.hostOnly;
            delete cookie.session;
            try {
                chrome.cookies.set(cookie, function (cookie) {
                    if (cookie === null) {
                        throw "Error: Cant't set cookie.";
                    }
                });
            }
            catch (e) {
                $information.addClass("alert-error").text(
                    "[cookie " + (i + 1) + "] " + e
                ).show();
                return;
            }
        }
        $information.addClass("alert-success").text(
            "Finished setting " + length + " cookie"
            + (length === 1 ? "" : "s") + "."
        ).show();
    });

});

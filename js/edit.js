$(document).ready(function () {
    var vars = getUrlVars();
    if (typeof vars['domain'] !== 'undefined') {
        $('#domain').val(vars['domain']);
        getCookie(vars['domain']);
    }

    $("#get-page").click(function () {
        getPage();
    });
    $("#set-page").click(function () {
        setPage();
    });
    $('#get').click(function () {
        getCookie($('#domain').val());
    });
});

function getCookie(domain) {
    $('<table id="cookie" border="1" cellspacing="0" cellpadding="3"></table>')
        .appendTo("#container");
    $('#cookie').html(
        '<tr>'
        + '<th></th>'
        + '<th>domain</th>'
        + '<th>path</th>'
        + '<th>name</th>'
        + '<th>expr</th>'
        + '<th>hostOnly</th>'
        + '<th>httpOnly</th>'
        + '<th>secure</th>'
        + '<th>session</th>'
        + '<th>storeId</th>'
        + '<th>value</th>'
        + '</tr>'
    );

    chrome.cookies.getAll({}, function (cookies) {
        var length, i, regexp;
        length = cookies.length;
        regexp = new RegExp(domain);

        for (i = 0; i < length; i += 1) {
            if (cookies[i].domain.match(regexp)) {
                $('#cookie').append(tr(i));
                $('#remove' + i).click(remove(i));
                $('#edit' + i).click(edit(i));
            }
        }
        $("tr:odd").css("background-color", "azure");

        function tr(i) {
            var cookie = cookies[i];
            var check = function (bool) {
                return bool ? '✔' : '';
            };
            return '<tr id="cookie' + i + '">'
                + '<td><input type="button" id="remove' + i + '" value="x"></td>'
                + '<td class="domain">' + cookie.domain + '</td>'
                + '<td class="path">' + cookie.path + '</td>'
                + '<td class="name">' + cookie.name + '</td>'
                + '<td class="expirationDate">' + cookie.expirationDate + '</td>'
                + '<td class="hostOnly">' + check(cookie.hostOnly) + '</td>'
                + '<td class="httpOnly">' + check(cookie.httpOnly) + '</td>'
                + '<td class="secure">' + check(cookie.secure) + '</td>'
                + '<td class="session">' + check(cookie.session) + '</td>'
                + '<td class="storeId">' + cookie.storeId + '</td>'
                + '<td class="value" style="white-space: nowrap;"><input size="40" type="text" value="' + cookie.value + '">'
                + '<input type="button" id="edit' + i + '" value="●"></td>'
                + '</tr>';
        }

        function remove(i) {
            var cookie = cookies[i];
            return function () {
                chrome.cookies.remove({
                    url: "http" + (cookie.secure ? 's' : '') + '://'
                        + cookie.domain + cookie.path,
                    name: cookie.name,
                    storeId: cookie.storeId
                });
                $("#cookie" + i).fadeOut(300);
            };
        };

        function edit(i) {
            return function () {
                var cookie = cookies[i];
                chrome.cookies.set({
                    url: "http" + (cookie.secure ? 's' : '') + '://'
                        + cookie.domain + cookie.path,
                    name: cookie.name,
                    value: $("#cookie" + i + ' .value input').val(),
                    domain: cookie.domain,
                    path: cookie.path,
                    secure: cookie.secure,
                    httpOnly: cookie.httpOnly,
                    expirationDate: cookie.expirationDate,
                    storeId: cookie.storeId
                });
            };
        };
    });
}

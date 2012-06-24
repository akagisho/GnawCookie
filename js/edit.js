$(document).ready(function () {
    var vars = getUrlVars();
    if (typeof vars['domain'] !== 'undefined') {
        $('#domain').val(vars['domain']);
        getCookie(vars['domain']);
    }

    $("#get-page").click(function () {
        linkTo('get.html');
    });
    $("#set-page").click(function () {
        linkTo('set.html');
    });
    $('#get').click(function () {
        $("#cookie").remove();
        getCookie($('#domain').val());
    });
});

function getCookie(domain) {
    var table = $(
        '<table id="cookie" cellspacing="0" cellpadding="3"></table>'
    );
    table.append(
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

    chrome.cookies.getAll({}, function (all_cookies) {
        var length, i, regexp, cookies = [];
        regexp = new RegExp(domain);

        length = all_cookies.length;
        for (i = 0; i < length; i += 1) {
            if (all_cookies[i].domain.match(regexp)) {
                cookies.push( all_cookies[i] );
            }
        }

        length = cookies.length;
        if (length === 0) {
            $("#container").text("No cookie!");
            return;
        }
        cookies.sort(cookieSort);

        for (i = 0; i < length; i += 1) {
            table.append(tr(i));
            table.find('#remove' + i).click(remove(i));
            table.find('#edit' + i).click(edit(i));
        }
        table.find("tr:odd").addClass("odd");
        table.appendTo("#container");

        function tr(i) {
            var cookie = cookies[i];
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
        function check(bool) {
            return bool ? '✔' : '';
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

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

        $('#cookie').html(
            '<tr>'
            + '<th></th>'
            + '<th>domain</th>'
            + '<th>expr</th>'
            + '<th>hostOnly</th>'
            + '<th>httpOnly</th>'
            + '<th>name</th>'
            + '<th>path</th>'
            + '<th>secure</th>'
            + '<th>session</th>'
            + '<th>storeId</th>'
            + '<th>value</th>'
            + '</tr>'
        );

        for (i = 0; i < length; i += 1) {
            if (cookies[i].domain.match(regexp)) {
                var cookie = cookies[i];


                $('#cookie').append(
                    '<tr id="cookie' + i + '">' 
                    + '<td><input type="button" id="remove' + i + '" value="x"></td>'
                    + '<td class="domain">' + cookie.domain + '</td>'
                    + '<td class="expirationDate">' + cookie.expirationDate + '</td>'
                    + '<td class="hostOnly">' + cookie.hostOnly + '</td>'
                    + '<td class="httpOnly">' + cookie.httpOnly + '</td>'
                    + '<td class="name">' + cookie.name + '</td>'
                    + '<td class="path">' + cookie.path + '</td>'
                    + '<td class="secure">' + cookie.secure + '</td>'
                    + '<td class="session">' + cookie.session + '</td>'
                    + '<td class="storeId">' + cookie.storeId + '</td>'
                    + '<td class="value" style="white-space: nowrap;"><input size="40" type="text" value="' + cookie.value + '">'
                    + '<input type="button" id="edit' + i + '" value="●"></td>'
                    + '</tr>'
                );

                var remove = function (i) {
                    var cookie = cookies[i];
                    return function () {
                        var cookie_number = '#cookie' + i;
                        chrome.cookies.remove({
                            url: ((cookie.secure) ? 'https://' : 'http://') + cookie.domain + cookie.path,
                            name: cookie.name,
                            storeId: cookie.storeId
                        });
                        $(cookie_number).fadeOut(300);
                    };
                };
                $('#remove' + i).click(remove(i));

                var edit = function (i) {
                    return function () {
                        var cookie = cookies[i];
                        var cookie_number = '#cookie' + i;
                        chrome.cookies.set({
                            url: ((cookie.secure) ? 'https://' : 'http://') + cookie.domain + cookie.path,
                            name: cookie.name,
                            value: $(cookie_number + ' .value input').val(),
							domain: cookie.domain,
							path: cookie.path,
							secure: cookie.secure,
							httpOnly: cookie.httpOnly,
							expirationDate: cookie.expirationDate,
                            storeId: cookie.storeId
                        });
                    };
                };
                $('#edit' + i).click(edit(i));
            }
        }
    });
}

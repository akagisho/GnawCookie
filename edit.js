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
                    + '<td class="cookie.domain">' + cookie.domain + '</td>'
                    + '<td class="cookie.expirationDate">' + cookie.expirationDate + '</td>'
                    + '<td class="cookie.hostOnly">' + cookie.hostOnly + '</td>'
                    + '<td class="cookie.httpOnly">' + cookie.httpOnly + '</td>'
                    + '<td class="cookie.name">' + cookie.name + '</td>'
                    + '<td class="cookie.path">' + cookie.path + '</td>'
                    + '<td class="cookie.secure">' + cookie.secure + '</td>'
                    + '<td class="cookie.session">' + cookie.session + '</td>'
                    + '<td class="cookie.storeId">' + cookie.storeId + '</td>'
                    + '<td class="cookie.value">' + cookie.value + '</td>'
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
            }
        }
    });
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('#!/') + 3).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function getPage() {
    location.href = 'get.html#!/host=' + $('#host').val();
}


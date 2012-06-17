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
        for (i = 0; i < length; i += 1) {
            if (cookies[i].domain.match(regexp)) {
                result.push(cookies[i]);
            }
        }
        result = result.length === 0 ? 'No cookie!'
            : JSON.stringify(result);

        result = indent(result);
        $('#cookie').val(result);
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

function indent(data) {
    data = data.replaceAll('{"', '{' + "\n\t\t" + '"');
    data = data.replaceAll('},{', "\n\t" + '},' + "\n\t" + '{');
    data = data.replaceAll(',"', ',' + "\n\t\t" + '"');
    data = data.replace(/:/g, ': ');
    data = data.replace(/^\[{/, '[' + "\n\t" + '{');
    data = data.replace(/}\]$/, "\n\t" + '}' + "\n" + ']');

    return data;
}

String.prototype.replaceAll = function(str1,str2){
    var temp = this;
    while (temp.indexOf(str1) != -1) {
        temp=temp.replace(str1,str2);
    }
    return temp;
};


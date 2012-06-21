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

function editPage() {
    location.href = 'edit.html#!/host=' + $('#host').val();
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

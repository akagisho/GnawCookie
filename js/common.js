function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('#!/') + 3).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = decodeURIComponent(hash[1]);
    }
    return vars;
}

function linkTo(page) {
    var domain = $('#domain').val();
    location.href = page
        + (domain === '' ? '' : '#!/domain=' + encodeURIComponent(domain));
}

function cookieSort(cookie1, cookie2) {
    var domain1 = cookie1.domain.split('.').reverse();
    var domain2 = cookie2.domain.split('.').reverse();
    var length1 = domain1.length;
    var length2 = domain2.length;
    var length  = Math.min(length1, length2);
    var i;
    for (i = 0; i < length; i += 1) {
        if (domain1[i] > domain2[i]) {
            return 1;
        }
        else if (domain1[i] < domain2[i]) {
            return -1;
        }
    }
    if (length1 > length2) {
        return 1;
    }
    else if (length1 < length2) {
        return -1;
    }
    else {
        return 0;
    }
}

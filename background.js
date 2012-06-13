chrome.contextMenus.create({
    title: "Show cookies of this site",
    onclick: function(info, tab) {
        var url = info.pageUrl;
        var domain = getDomain(url);
        domain.replace('.', '\\.');
        domain = '^\\.' + domain + '$';

        chrome.tabs.create({
            url: 'get.html#!/host=' + domain
        });
    }
});

function getDomain(url) {
    var domain;
    var host = url.replace(/https?:\/\/([^\/]+).*/, "$1");
    var tree = host.split(".");
    var parts = tree.length;

    if (parts == 1) {
        alert('Cannot get domain name.');
        return;
    } else if (parts == 2) { 
        domain = host;
    } else if (tree[parts - 1].length >= 3) {
        domain = tree[parts - 2] + '.' + tree[parts - 1];
    } else if (tree[parts - 2].length == 2) {
        domain = tree[parts - 3] + '.' + tree[parts - 2] + '.' + tree[parts - 1];
    } else {
        domain = tree[parts - 2] + '.' + tree[parts - 1];;
    }

    return domain;
}


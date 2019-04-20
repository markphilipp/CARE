window.document.onload = function () {
    removeFooterLinks();
    addHomeLink();
    highlightedAnimalNames();
};
var removeFooterLinks = function () {
    var linksToKeep = ['FAQs', 'About Us', 'Contact Us', 'Donation Info'];
    $('.menuBottomFirst > a, .menuBottom > a')
        .each(function (_, link) {
        var parent = $(link).parent();
        // Remove links we don't want to keep
        if (linksToKeep.indexOf(link.innerText) === -1) {
            parent.remove();
            return;
        }
        // Remove pipes from links
        if (parent.get(0).innerText.substring(0, 4) === " |  ") {
            parent.contents()
                .filter(function (_, e) { return e.nodeType === Node.TEXT_NODE; })
                .replaceWith('');
        }
    });
};
var addHomeLink = function () {
    $('#logoContainer')
        .on('click', function () { return window.location.pathname = '/'; });
};
var highlightedAnimalNames = function () {
    $('.highlighted img.animalimg')
        .each(function (_, element) {
        var name = $(element).attr('alt');
        $(element).closest('.highlighted')
            .find('.highlightedInfo')
            .prepend("<h2 class=\"highlightedPetName\">" + name + "</h2>");
    });
};
//# sourceMappingURL=customizations.js.map
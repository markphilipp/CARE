window.document.onload = function () {
    removeFooterLinks();
};
var removeFooterLinks = function () {
    var linksToKeep = ['FAQs', 'About Us', 'Contact Us', 'Donation Info'];
    var filter = linksToKeep.map(function (linkText) { return ":contains(\"" + linkText + "\")"; })
        .join(", ");
    $('.menuBottom > a')
        .filter(filter)
        .parent()
        .remove();
};
//# sourceMappingURL=customizations.js.map
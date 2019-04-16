window.document.onload = function () {
    removeFooterLinks();
    addHomeLink();
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
var addHomeLink = function () {
    $('#logoContainer').attr('href', '/');
};
// const highlightedAnimalNames = () => {
//   const animalNames = $('.highlightedPicture img')
//     .map((index, img) => img.getAttribute('alt'))
//   //TODO:
// }
//# sourceMappingURL=customizations.js.map
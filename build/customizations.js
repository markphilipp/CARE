// Author: Mark Philipp - mphilipp17{at}gmail.com
// These are all such ghetto hacks to make this website customized since it's running on RescueGroups.org's platform
/**
 * Removes all but the few wanted footer links
 */
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
/**
 *
 */
var replaceHead = function () {
    $('a[name="top"]')
        .after("<div class=\"header\">\n                  <div class=\"siteLogo\"><a href=\"/\"><img src=\"https://s3.amazonaws.com/imagesroot.rescuegroups.org/webpages/s627nkhwmolutwz.png\" alt=\"logo\" /></a></div>\n                  <div class=\"siteHeader\"><img src=\"https://s3.amazonaws.com/imagesroot.rescuegroups.org/webpages/s627nk4gnjoklfw.png\" alt=\"temp-header\" /></div>\n              </div>");
    $('#logoContainer')
        .on('click', function () { return window.location.pathname = '/'; });
};
/**
 * Create headers for the highlighted animals with their names
 */
var highlightedAnimalNames = function () {
    // Get the images
    $('.highlighted img.animalimg')
        .each(function (_, element) {
        // The alt text is the name of the animal which is the best we have
        var name = $(element).attr('alt');
        // Add the header with the name
        $(element).closest('.highlighted')
            .find('.highlightedInfo')
            .prepend("<h2 class=\"highlightedPetName\">" + name + "</h2>");
    });
};
// Run all customizations on load
jQuery(function () {
    removeFooterLinks();
    replaceHead();
    highlightedAnimalNames();
});
//# sourceMappingURL=customizations.js.map
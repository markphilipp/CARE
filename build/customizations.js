// Author: Mark Philipp - mphilipp17{at}gmail.com
// These are all such ghetto hacks to make this website customized since it's running on RescueGroups.org's platform.  I'm not proud.
/**
 * Removes all but the few wanted footer links
 */
var removeFooterLinks = function () {
    // Remove old footer because it is driven by the same data as the menu navigation which makes it so cluttered
    $('#footer').remove();
    // Add new footer
    $('<div class="site-footer"></div>').insertAfter('#content');
    // Add our four static links
    var footerLinks = [
        {
            text: 'About',
            link: 'https://www.caretoadopt.org/info/'
        },
        {
            text: 'Contact Us',
            link: 'https://www.caretoadopt.org/info/contact'
        },
        {
            text: 'Donate',
            link: 'https://www.caretoadopt.org/info/donate'
        },
        {
            text: 'FAQS',
            link: 'https://www.caretoadopt.org/info/display?PageID=3218'
        }
    ];
    footerLinks.forEach(function (link) {
        $('.site-footer')
            .append("<div class=\"menuBottom\"><a href=\"" + link.link + "\">" + link.text + "</a></div>");
    });
};
/**
 * Replaces the header with a normalized, updated one and updated user nav
 */
var replaceHeader = function () {
    var top = $('a[name="top"]');
    updateLogoAndPageTitle(top);
    addUserMenu(top);
};
/**
 * Update main logo and title
 * @param top {JQuery} - the top element to add the menu after
 */
var updateLogoAndPageTitle = function (top) {
    top
        .after("<div class=\"header\">\n                  <div class=\"siteLogo\"><a href=\"/\"><img src=\"https://s3.amazonaws.com/imagesroot.rescuegroups.org/webpages/s627nkhwmolutwz.png\" alt=\"logo\" /></a></div>\n                  <div class=\"siteHeader\"><img src=\"https://s3.amazonaws.com/imagesroot.rescuegroups.org/webpages/s627nk4gnjoklfw.png\" alt=\"temp-header\" /></div>\n              </div>");
    $('#logoContainer')
        .on('click', function () { return window.location.pathname = '/'; });
};
/**
 * Add login/logout/register menu in upper right
 * @param top {JQuery} - the top element to add the menu after
 */
var addUserMenu = function (top) {
    var userLoggedIn = getCookie('LoggedIn') === "Yes" &&
        getCookie('UserID') !== null;
    var contents = userLoggedIn
        ? "<a href=\"/user/logout\">Logout</a>"
        : "<a href=\"/user/login\">Login</a><a href=\"/user/register\">Register</a>";
    top.after("<div class=\"website-user-menu\">" + contents + "</div>");
};
/**
 * Make the header a link because it isn't for some dumb reason
 */
var fixHighlightedAnimalHeader = function () {
    // noinspection HtmlUnknownTarget
    $('div.contentSectionHeader a[href="/animals"]').parent()
        .html('<a href="/animals">Animals</a>');
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
        var link = $(element).parent().attr('href');
        // Add the header with the name
        $(element).closest('.highlighted')
            .find('.highlightedInfo')
            .prepend("<h2 class=\"highlightedPetName\"><a href=\"" + link + "\">" + name + "</a></h2>");
    });
};
/**
 * Flip the vertical nav into a normal horizontal tab bar
 */
var makeNavigationHorizontal = function () {
    // Copy menu to new position
    var header = $('.header');
    header.after($('#sideBarMenu'));
    // Update new menu to differentiate
    var newMenu = header.next();
    newMenu.attr('class', 'newMenu');
    newMenu.removeAttr('id');
    newMenu.find('.menuL1')
        .each(function (_, el) {
        var l1Menu = $(el);
        var subMenu = null;
        var nextMenuItem = l1Menu.next();
        while (nextMenuItem.length && !nextMenuItem.hasClass('menuL1')) {
            if (!subMenu)
                l1Menu.append('<ul></ul>');
            subMenu = l1Menu.find('ul');
            subMenu.append("<li>" + nextMenuItem.html() + "</li>");
            nextMenuItem = nextMenuItem.next();
        }
    });
};
/**
 * Credit to: https://gist.github.com/hunan-rostomyan/28e8702c1cecff41f7fe64345b76f2ca for this fn
 * @param name
 */
var getCookie = function (name) {
    var nameLenPlus = (name.length + 1);
    return document.cookie
        .split(';')
        .map(function (c) { return c.trim(); })
        .filter(function (cookie) { return cookie.substring(0, nameLenPlus) === name + "="; })
        .map(function (cookie) { return decodeURIComponent(cookie.substring(nameLenPlus)); })[0] || null;
};
// Run all customizations on load
jQuery(function () {
    replaceHeader();
    makeNavigationHorizontal();
    fixHighlightedAnimalHeader();
    highlightedAnimalNames();
    removeFooterLinks();
});
//# sourceMappingURL=customizations.js.map
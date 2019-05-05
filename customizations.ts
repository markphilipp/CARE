// Author: Mark Philipp - mphilipp17{at}gmail.com
// These are all such ghetto hacks to make this website customized since it's running on RescueGroups.org's platform

/**
 * Removes all but the few wanted footer links
 */
const removeFooterLinks = () => {
  // Remove old footer because it is driven by the same data as the menu navigation which makes it so cluttered
  $('#footer').remove();

  // Add new footer
  $('<div class="site-footer"></div>').insertAfter('#content');

  // Add our four static links
  const footerLinks = [
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

  footerLinks.forEach(link => {
    $('.site-footer')
      .append(`<div class="menuBottom"><a href="${link.link}">${link.text}</a></div>`);
  });
};

/**
 * Replaces the header with a normalized, updated one
 */
const replaceHead = () => {

  $('a[name="top"]')
    .after(`<div class="header">
                  <div class="siteLogo"><a href="/"><img src="https://s3.amazonaws.com/imagesroot.rescuegroups.org/webpages/s627nkhwmolutwz.png" alt="logo" /></a></div>
                  <div class="siteHeader"><img src="https://s3.amazonaws.com/imagesroot.rescuegroups.org/webpages/s627nk4gnjoklfw.png" alt="temp-header" /></div>
              </div>`);

  $('#logoContainer')
    .on('click', () => window.location.pathname = '/');
};

/**
 * Make the header a link because it isn't for some dumb reason
 */
const fixHighlightedAnimalHeader = () => {
  // noinspection HtmlUnknownTarget
  $('div.contentSectionHeader')
    .html('<a href="/animals">Animals</a>');
};

/**
 * Create headers for the highlighted animals with their names
 */
const highlightedAnimalNames = () => {
  // Get the images
  $('.highlighted img.animalimg')
    .each((_, element) => {

      // The alt text is the name of the animal which is the best we have
      const name = $(element).attr('alt');
      const link = $(element).parent().attr('href');

      // Add the header with the name
      $(element).closest('.highlighted')
        .find('.highlightedInfo')
        .prepend(`<h2 class="highlightedPetName"><a href="${link}">${name}</a></h2>`);
    });
};

/**
 * Flip the vertical nav into a normal horizontal tab bar
 */
const makeNavigationHorizontal = () => {
  // Copy menu to new position
  const header = $('.header');
  header.after($('#sideBarMenu'));

  // Update new menu to differentiate
  const newMenu = header.next();
  newMenu.attr('class', 'newMenu');
  newMenu.removeAttr('id');

  newMenu.find('.menuL1')
    .each((_, el) => {
      const l1Menu = $(el);

      let subMenu : JQuery = null;
      let nextMenuItem = l1Menu.next();
      while(nextMenuItem.length && !nextMenuItem.hasClass('menuL1')) {

        if (!subMenu)
          l1Menu.append('<ul></ul>');

        subMenu = l1Menu.find('ul');
        subMenu.append(`<li>${nextMenuItem.html()}</li>`);

        nextMenuItem = nextMenuItem.next();
      }
     });
};

// Run all customizations on load
jQuery(() => {
  replaceHead();
  makeNavigationHorizontal();
  fixHighlightedAnimalHeader();
  highlightedAnimalNames();
  removeFooterLinks();
});

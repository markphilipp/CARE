// Author: Mark Philipp - mphilipp17{at}gmail.com
// These are all such ghetto hacks to make this website customized since it's running on RescueGroups.org's platform

/**
 * Removes all but the few wanted footer links
 */
const removeFooterLinks = () => {
  const linksToKeep = ['FAQs', 'About Us', 'Contact Us', 'Donation Info'];

  $('.menuBottomFirst > a, .menuBottom > a')
    .each((_, link) => {
      const parent = $(link).parent();

      // Remove links we don't want to keep
      if (linksToKeep.indexOf(link.innerText) === -1) {
        parent.remove();
        return;
      }

      // Remove pipes from links
      if (parent.get(0).innerText.substring(0, 4) === " |  ") {
        parent.contents()
          .filter((_, e) => e.nodeType === Node.TEXT_NODE)
          .replaceWith('');
      }
    })
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

const makeNavigationHorizontal = () => {
  // Copy menu to new position
  const header = $('.header');
  header.after($('#sideBarMenu'));

  // Update new menu to differentiate
  const newMenu = header.next();
  newMenu.addClass('newMenu');
  newMenu.removeAttr('id');
};

// Run all customizations on load
jQuery(() => {
  replaceHead();
  makeNavigationHorizontal();
  fixHighlightedAnimalHeader();
  highlightedAnimalNames();
  removeFooterLinks();
});

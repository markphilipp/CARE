// Author: Mark Philipp - mphilipp17{at}gmail.com
// These are all such ghetto hacks to make this website customized since it's running on RescueGroups.org's platform.  I'm not proud.

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
 * Replaces the header with a normalized, updated one and updated user nav
 */
const replaceHeader = () => {

  const top = $('a[name="top"]');

  updateLogoAndPageTitle(top);
  addUserMenu(top);
};

/**
 * Update main logo and title
 * @param top {JQuery} - the top element to add the menu after
 */
const updateLogoAndPageTitle = (top : JQuery) => {
  top
    .after(`<div class="header">
                  <div class="siteLogo"><a href="/"><img src="https://s3.amazonaws.com/imagesroot.rescuegroups.org/webpages/s627nkhwmolutwz.png" alt="logo" /></a></div>
                  <div class="siteHeader">
                    <h1>Cullen's Archangel RescuE</h1>
                    <h2>
                      <span class="primaryLogoColor">iRescue</span>
                      <span class="secondaryLogoColor">iFoster</span>
                      <span class="primaryLogoColor">iDonate</span>
                      <span class="secondaryLogoColor">iAdopt</span>
                      <span class="primaryLogoColor">iCARE</span>
                    </h2>
                  </div>
              </div>`);

  $('#logoContainer')
    .on('click', () => window.location.pathname = '/');
};

/**
 * Add login/logout/register menu in upper right
 * @param top {JQuery} - the top element to add the menu after
 */
const addUserMenu = (top : JQuery) => {
  const userLoggedIn = getCookie('LoggedIn') === "Yes" &&
    getCookie('UserID') !== null;

  const contents = userLoggedIn
    ? `<a href="/user/logout">Logout</a>`
    : `<a href="/user/login">Login</a><a href="/user/register">Register</a>`;

  top.after(
    `<div class="website-user-menu">${contents}</div>`);
};

/**
 * Make the header a link because it isn't for some dumb reason
 */
const fixHighlightedAnimalHeader = () => {
  // noinspection HtmlUnknownTarget
  $('div.contentSectionHeader a[href="/animals"]').parent()
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

/**
 * Move Horizontal navigation for mobile
 */
const makeNavigationMobile = () => {

  $(window).on("resize", function () {
    const viewportWidth = $(window).width();
      if (viewportWidth < 720 && !$('.mobile').length){
        $('.newMenu').addClass('mobile').prependTo('#bodyContainer');
      }

      if (viewportWidth > 720 && $('.mobile').length){
        $('.newMenu').removeClass('mobile').insertAfter('.header');
      }
    }).resize();
};

/**
 * Credit to: https://gist.github.com/hunan-rostomyan/28e8702c1cecff41f7fe64345b76f2ca for this fn
 * @param name
 */
const getCookie = (name: string): string => {
  const nameLenPlus = (name.length + 1);
  return document.cookie
    .split(';')
    .map(c => c.trim())
    .filter(cookie => cookie.substring(0, nameLenPlus) === `${name}=`)
    .map(cookie => decodeURIComponent(cookie.substring(nameLenPlus)))
    [0] || null;
};

// Run all customizations on load
jQuery(() => {
  replaceHeader();
  makeNavigationHorizontal();
  fixHighlightedAnimalHeader();
  highlightedAnimalNames();
  removeFooterLinks();
  makeNavigationMobile();
});

jQuery(() => {
  removeFooterLinks();
  addHomeLink();
  highlightedAnimalNames();
});

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

const addHomeLink = () => {
  $('#logoContainer')
    .on('click', () => window.location.pathname = '/');
};

const highlightedAnimalNames = () => {
  $('.highlighted img.animalimg')
    .each((_, element) => {
      const name = $(element).attr('alt');

      $(element).closest('.highlighted')
        .find('.highlightedInfo')
        .prepend(`<h2 class="highlightedPetName">${name}</h2>`);
    });
};

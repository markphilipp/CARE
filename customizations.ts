window.document.onload = () => {
  removeFooterLinks();
  addHomeLink();
};

const removeFooterLinks = () => {
  const linksToKeep = ['FAQs', 'About Us', 'Contact Us', 'Donation Info'];

  const filter = linksToKeep.map(linkText => `:contains("${linkText}")`)
    .join(", ");

  $('.menuBottom > a')
    .filter(filter)
    .parent()
    .remove();
};

const addHomeLink = () => {
  $('#logoContainer').attr('href', '/');
};

// const highlightedAnimalNames = () => {
//   const animalNames = $('.highlightedPicture img')
//     .map((index, img) => img.getAttribute('alt'))
//   //TODO:
// }

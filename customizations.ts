window.document.onload = () => {
  removeFooterLinks();
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

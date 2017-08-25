const CATEGORIES = {
  ALL: 'All',
  JAVASCRIPT: 'JavaScript',
  SCALA: 'Scala',
  PERL: 'Perl'
};

var CATEGORY_VALUES = (function() {
  let categoriesArray = [];
  for(let category in CATEGORIES) {
    categoriesArray.push(CATEGORIES[category]);
  }
  return categoriesArray;
}());

module.exports = {
  CATEGORIES: CATEGORIES,
  CATEGORY_VALUES: CATEGORY_VALUES,
  VIDEOS_PER_PAGE: 10,
  MAX_PAGES: 3
};
const _ = require('underscore');

var formatVideoRequest = function(data) {
  // IMPROVMENT: Could reduce this into a few calls using _ in one line, but for readibility and time sake keeping as is
  let result = _.pick(data, 'nextPageToken', 'items');
  result.items = _.map(data.items, (video) => {
    return {
      id: video.id.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnails: video.snippet.thumbnails
    };
  });
  result.items = _.sortBy(result.items, 'title');
  return result;
};

module.exports = {
  formatVideoRequest
};
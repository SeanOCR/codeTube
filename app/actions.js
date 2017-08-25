

// Technically these are action creators and not actions themselves...
export function selectCategory(category) {
  return {
    type: 'SELECT_CATEGORY',
    category
  };
}

export function selectVideo(videoId) {
  return {
    type: 'SELECT_VIDEO',
    videoId
  };
}

export function increasePage() {
  return {
    type: 'INCREASE_SCROLL_PAGE'
  };
}

export function requestVideos(category) {
  return {
    type: 'REQUEST_VIDEOS',
    category
  };
}

export function requestVideosError(error) {
  return {
    type: 'REQUEST_VIDEOS_ERROR',
    error
  };
}

export function receivedVideos(videos) {
  return {
    type: 'RECEIVE_VIDEOS',
    videos
  };
}

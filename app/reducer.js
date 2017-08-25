import {Map} from 'immutable';
import {MAX_PAGES} from '../shared/constants.js';

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SELECT_CATEGORY':
      // #IMPROVEMENTS: the last to state changes here are to clear variables. Ideally we would have a seperate action for this
      return state.set('selectedCategory', action.category).set('retrievingVideos', true).set('scrollPage', 1).set('selectedVideoId', undefined);
    case 'SELECT_VIDEO':
      return state.set('selectedVideoId', action.videoId);
    case 'INCREASE_SCROLL_PAGE': {
      let scrollPage = Math.min(state.get('scrollPage') + 1, MAX_PAGES);
      return state.set('scrollPage', scrollPage);
    }
    case 'RECEIVE_VIDEOS':
      return state.set('videos', action.videos).set('retrievingVideos', false);
    default:
      return state;
  }
}
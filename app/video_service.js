import request from 'superagent';
import * as actions from './actions';

// eslint-disable-next-line no-unused-vars
const videoService = store => next => action => { 
  next(action);
  switch (action.type) {
    case 'SELECT_CATEGORY':
      request
        .get('http://localhost:3000/_getvideos/' + action.category)
        .end((err, res) => {
          if (err) {
            return next(actions.requestVideosError(err));
          }
          const data = JSON.parse(res.text);
          next(actions.receivedVideos(data));
        });
      break;
    case 'SELECT_VIDEO':
      request
        .get('http://localhost:3000/_getrelatedvideos/' + action.videoId)
        .end((err, res) => {
          if (err) {
            return next(actions.requestVideosError(err));
          }
          const data = JSON.parse(res.text);
          console.log(data);
          next(actions.receivedVideos(data));
        });
      break;
    default:
      break;
  }
};

export default videoService;
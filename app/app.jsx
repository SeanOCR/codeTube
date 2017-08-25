import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {Map} from 'immutable';
import reducer from './reducer';
import Banner from './components/banner';
import {CategoryBarContainer} from './components/category_bar';
import {VideoResultsContainer} from './components/video_results';


import * as actions from './actions';
import videoService from './video_service'

import {CATEGORIES} from '../shared/constants.js';

require('./style.css');

var initState =  Map({
  selectedCategory: CATEGORIES.ALL,
  retrievingVideos: false,
  scrollPage: 1,
  selectedVideoId: undefined,
  videos: {
    nextPageToken: undefined,
    items: []
  }
});

const store = createStore(reducer, initState, applyMiddleware(videoService));
store.dispatch(actions.selectCategory(CATEGORIES.ALL));

function renderApp() {
  ReactDOM.render(
    <Provider store={store}>
      <div className="app-container">
        <div className="menu-container">
          <Banner />
          <CategoryBarContainer />
        </div>
        <div className="body-container">
          <VideoResultsContainer />
        </div>
      </div>
    </Provider>,
    document.getElementById('app')
  );
}

renderApp();
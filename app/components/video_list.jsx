import React from 'react';
import {CATEGORY_VALUES} from '../../shared/constants.js';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {VIDEOS_PER_PAGE} from '../../shared/constants.js';
import Truncate from 'react-truncate';

// #DEV_NOTE Code do this by hand by adding eventListeners on scroll and doing basic math,
//           but do to time constraints and stability issues I'm going to use this helpful module
import InfiniteScroll from 'redux-infinite-scroll';

export default class VideoList extends React.Component {
  constructor(props) {
    super(props);
    this.videoClicked = this.videoClicked.bind(this);
    this.renderVideos = this.renderVideos.bind(this);
  }

  videoClicked(videoId) {
    this.props.onVideoSelected(videoId);
  }

  renderVideos() {
    let videos =[];
    // We start at 1 as first item is feature
    let limit = Math.min(this.props.scrollPage * VIDEOS_PER_PAGE, this.props.videos.items.length)
    for(let i = 1; i < limit; i++) {
      let video = this.props.videos.items[i];
      videos.push(
        <div className="video-item" key={video.id} onClick={() => this.videoClicked(video.id)}>
          <img className="video-thumbnail" src={video.thumbnails.medium.url}></img>
          <div className="video-item-copies">
            <h3 className="video-item-title">{video.title}</h3>
            <Truncate lines={4} ellipsis="...">
                {video.description}
            </Truncate>
          </div>
        </div>
      );
    }
    return videos;
  }

            // <div className="video-item-description">{video.description}</div>
  nextPage() {
    this.props.onPageIncrease();
  }

  render() {
    return <InfiniteScroll
             className="video-list"
             containerHeight="400px"
             elementIsScrollable={true}
             items={this.renderVideos()}
             loadMore={this.nextPage.bind(this)}
            />;
  }
};

function mapStateToProps(state) {
  return {
    videos: state.get('videos'),
    scrollPage: state.get('scrollPage')
  }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onVideoSelected: (videoId) => dispatch(actions.selectVideo(videoId)),
        onPageIncrease: () => dispatch(actions.increasePage())
    };
}

export const VideoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoList);

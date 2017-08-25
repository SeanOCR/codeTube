import React from 'react';
import {connect} from 'react-redux';
import IFrame from './iframe'; 
import * as actions from '../actions';

export default class FeaturedVideo extends React.Component {
  constructor(props) {
    super(props);
    this.videoClicked = this.videoClicked.bind(this);
  }

  videoClicked(videoId) {
    this.props.onVideoSelected(videoId);
  }

  render() {
    if(this.props.selectedVideoId) {
      let src = 'https:\/\/www.youtube.com\/embed\/' + this.props.selectedVideoId + '?autoplay=1&modestbranding=1&rel=0&showinfo=0';
      return <div className="feature-container">
              <iframe
                src={src}
                frameBorder='0'
                width="100%"
              />
             </div>
    }

    let video = this.props.videos.items[0];
    return <div className="feature-container" onClick={() => this.videoClicked(video.id)}>
             <img src={video.thumbnails.high.url}></img>
           </div>;
  }
};

function mapStateToProps(state) {
  return {
    videos: state.get('videos'),
    selectedVideoId: state.get('selectedVideoId')
  }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onVideoSelected: (videoId) => dispatch(actions.selectVideo(videoId))
    };
}

export const FeaturedVideoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FeaturedVideo);

import React from 'react';
import {connect} from 'react-redux';
import {FeaturedVideoContainer} from './featured';
import {VideoListContainer} from './video_list';

export default class VideoResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.retrievingVideos) {
      // #IMPROVMENTS: Given more time I'd create a loading spinner overlay
      return <div className="loading">Loading...</div>;
    } else if ( !this.props.videos || 
                !this.props.videos.items || 
                this.props.videos.items.length === 0) {
      // #IMPROVMENTS: Given more time I'd create a error component to render errors
      return <div>
               <h1>Unknown Error?</h1>
             </div>;
    } 

    return  <div className="video-results">
              <FeaturedVideoContainer /> 
              <hr/>
              <VideoListContainer />
            </div>;
  }
};

function mapStateToProps(state) {
  return {
    retrievingVideos: state.get('retrievingVideos'),
    videos: state.get('videos')
  }
}

export const VideoResultsContainer = connect(
  mapStateToProps,
)(VideoResults);
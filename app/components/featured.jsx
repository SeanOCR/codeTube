import React from 'react';
import {connect} from 'react-redux';
import IFrame from './iframe'; 
import * as actions from '../actions';

const VIDEO_RESOLUTIONS = [
  {width:'800', height:'450'},
  {width:'640', height:'360'},
  {width:'480', height:'270'}
]

export default class FeaturedVideo extends React.Component {
  constructor(props) {
    super(props);
    this.videoClicked = this.videoClicked.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
    this.state = {windowWidth: 700};
  }

  videoClicked(videoId) {
    this.props.onVideoSelected(videoId);
  }

  updateWidth() {
    this.setState({
      windowWidth: this.refs.feature.parentNode.clientWidth
    });
  }
  
  componentDidMount() {
    window.addEventListener("resize", this.updateWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth);
  }

  render() {
    if(this.props.selectedVideoId) {
      let src = 'https:\/\/www.youtube.com\/embed\/' + this.props.selectedVideoId + '?autoplay=1&modestbranding=1&rel=0&showinfo=0';

      var resolution = VIDEO_RESOLUTIONS[0].width;
      for(var i = 0;  i < VIDEO_RESOLUTIONS.length; i++) {
        if(this.state.windowWidth > VIDEO_RESOLUTIONS[i].width) {
          resolution = VIDEO_RESOLUTIONS[i];
          break;
        }
      }

      return <div ref="feature" className="feature-container">
              <iframe
                src={src}
                frameBorder='0'
                width={resolution.width}
                height={resolution.height}
              />
             </div>
    }

    let video = this.props.videos.items[0];
    return <div ref="feature" className="feature-container" onClick={() => this.videoClicked(video.id)}>
             <img width="480px" height="360px" className="feature-thumbnail" src={video.thumbnails.high.url}></img>
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

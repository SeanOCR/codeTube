import React from 'react';

export default class IFrame extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    let iframeVideo = React.createElement("iframe", {
        ref: "iframe",
        id: this.props.id,
        frameBorder: "0",
        src: this.props.src,
        type: this.props.type,
        target: "_parent",
        allowFullScreen: this.props.allowFullScreen || false,
        style: Object.assign({}, {
          position: this.props.position || "absolute",
          display: this.props.display || "block",
          height: this.props.height || "100%",
          width: this.props.width || "100%"
        }, this.props.styles || {}),
        height: this.props.height || "100%",
        width: this.props.width || "100%"
      });
    return <div className="iframe-react">
            {iframeVideo}
           </div>;
  }
};
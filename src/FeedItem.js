import React, { Component } from 'react';
import moment from 'moment';
import './styles.css';

class FeedItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    };
  }

  onMouseEnter() {
    this.setState({ hover: true });
  }

  onMouseLeave() {
    this.setState({ hover: false });
  }

  render() {
    // Render play or pause button depending on player conditions
    let playOrPause = ''
    if(this.props.currentEpisode && this.props.isPlaying) {
      playOrPause = <i className="far fa-pause-circle item-pause"></i>
    } else if (this.state.hover && !this.props.currenEpisode) {
      playOrPause = <i className="far fa-play-circle item-play"></i>
    }

    return (
      <div className="feed-item" onMouseEnter={ () => this.onMouseEnter()} onMouseLeave={ () => this.onMouseLeave()}
        onClick={ () => this.props.handleEpisodeClick(this.props.podcast) }>
        <div className="feed-item-play" >
          {playOrPause}
        </div>
        <div className="feed-item-title" >
          {this.props.podcast.title}
        </div>
        <div className="feed-item-info">
          <small><p>{moment(this.props.podcast.pubDate).format("MMM Do YY")}</p></small>
          <small><p>{this.props.formatTime(this.props.podcast.itunes.duration)}</p></small>
        </div>
      </div>
    );
  }
}

export default FeedItem;

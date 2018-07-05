import React, { Component } from 'react';

// import Components
import FeedItem from './FeedItem';
import PlayerControls from './PlayerControls';

import './styles/styles.css';

// Instantiate RSS-Parser to convert RSS feeds into JSON.
const RSSParser = require('rss-parser');

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedData: [],
      allEpisodes: [],
      currentEpisode: '',
      isPlaying: false,
      volume: 80,
      currentTime: 0,
      currentEpisodeDuration: 0,
      currentEpisodeDescription: '',
    };
    this.audioElement = document.createElement('audio');
    this.rssParser = new RSSParser();
  }

  componentWillMount() {
    this.fetchDataFromRssFeed(this.props.url);
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
    this.interval = setInterval(() => this.setState({ currentTime: this.audioElement.currentTime }), 1000);
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
    clearInterval(this.interval);
  }

  setEpisode(episode) {
    this.audioElement.src = episode.enclosure.url;
    this.setState({ currentEpisode: episode });
  }

  handleEpisodeClick(episode) {
    const isSameEpisode = this.state.currentEpisode === episode;
    if (this.state.isPlaying && isSameEpisode) {
      this.pause();
    } else {
      if (!isSameEpisode) {
        this.changeCurrentEpisode(episode);
        this.setEpisode(episode);
      }
      this.play();
    }
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });
  }

  changeCurrentEpisode(episode) {
    this.setState({
      currentEpisode: episode,
      currentEpisodeDuration: episode.enclosure.length,
      currentEpisodeDescription: episode.contentSnippet
    });
  }

  handleSkipForward15Seconds(e) {
    const newTime = this.audioElement.currentTime + 15;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleSkipBackwards15Seconds(e) {
    const newTime = this.audioElement.currentTime - 15;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  fetchDataFromRssFeed(url) {
    this.setState({ isLoading: true });
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    (async () => {
      let feed = await this.rssParser.parseURL(proxyurl + url);

      this.setState({
        feedData: feed,
        allEpisodes: feed.items,
        currentEpisode: feed.items[0],
        currentEpisodeDuration: feed.items[0].enclosure.length,
        currentEpisodeDescription: feed.items[0].contentSnippet
      });
      this.setState({ isLoading: false });
      this.audioElement.src = this.state.currentEpisode.enclosure.url;
    })().catch(alert);
  }

  formatTime(time) {
    if (!time) { return; }
    // Cleanse time input depending on in seconds or full format
    if (time.length >= 7) {
      if (time[1] === '0') {
        return time.slice(3);
      } else if (time[0] === '0') {
        return time.slice(1);
      }
    } else {

      if (isNaN(time)) { return "-:--" }
      let hours = Math.floor(time / 3600);
      let minutes = Math.floor((time - hours * 3600) / 60);
      let seconds = Math.floor(time % 60);

      if (seconds < 10) {
        seconds = '0' + seconds
      }

      if (hours > 0) {
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        return hours + ':' + minutes + ':' + seconds;
      } else {
        return minutes + ':' + seconds;
      }
    }
  }

  render() {
    const mainStyles = {
      maxWidth: this.props.maxWidth,
    };

    const playerStyles = {
      color: this.props.playerTextColor,
      backgroundColor: this.props.playerColor
    };

    const feedStyles = {
      maxHeight: this.props.feedMaxHeight,
      backgroundColor: this.props.feedColor,
      color: this.props.feedTextColor
    };

    const allEpisodes = this.state.allEpisodes.map((podcast) => {
      return <FeedItem
                key={podcast.guid}
                podcast={podcast}
                handleEpisodeClick={ () => this.handleEpisodeClick(podcast) }
                isPlaying={this.state.isPlaying}
                currentEpisode={this.state.currentEpisode === podcast}
                changeCurrentEpisode={ () => this.changeCurrentEpisode(podcast) }
                formatTime={ (time) => this.formatTime(time) }
              />
    });

    let emptyPlayer = ''
    if (!this.state.currentEpisode) {
      emptyPlayer = (
        <div className="player-top-section">
          <div className="empty-player">
            <div className="podcast-title empty-player empty-player-message">No media found. Enter an RSS feed to get started.</div>
          </div>
        </div>
      );
    } else {
      emptyPlayer = (
        <div className="player-top-section">
          <div className="podcast-info">
            <div className="podcast-image">
              <img alt="Podcast Logo" src={this.state.feedData.image.url} />
            </div>
              <div className="podcast-title">{this.state.feedData.title} </div>
              <div className="podcast-author">{this.state.feedData.author}</div>
          </div>
        </div>
      );
    }

    return (
      <div className="main" style={mainStyles}>

        <div className="player-container" style={playerStyles}>
          <section className="player">
            {/*}{this.state.isLoading ? <Spinner /> : emptyPlayer}*/}
            {emptyPlayer}


            <div className="player-controls-section" style={{'backgroundColor': this.props.playerControlsColor}}>
              <PlayerControls
                isPlaying={this.state.isPlaying}
                currentEpisode={this.state.currentEpisode}
                volume={this.audioElement.volume}
                handleEpisodeClick={ () => this.handleEpisodeClick(this.state.currentEpisode) }
                currentTime={this.audioElement.currentTime}
                currentEpisodeDuration={this.audioElement.duration}
                handleTimeChange={ (e) => this.handleTimeChange(e) }
                handleVolumeChange={ (e) => this.handleVolumeChange(e) }
                handleSkipForward15Seconds={ (e) => this.handleSkipForward15Seconds(e) }
                handleSkipBackwards15Seconds={ (e) => this.handleSkipBackwards15Seconds(e) }
                formatTime={ (time) => this.formatTime(time) }
              />
            </div>

            <div className="player-bottom-section">
              <div className="current-episode">
                <div className="current-episode-description">{this.state.currentEpisodeDescription}</div>
              </div>
            </div>
          </section>
        </div>

        <div className="feed-container">
          <section className="feed-section" style={feedStyles}>
            {allEpisodes}
          </section>
        </div>
      </div>
    );
  }
}

export default Player;

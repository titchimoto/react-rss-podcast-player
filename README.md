#React RSS Podcast Player

Snappy name, huh? The React RSS Podcast Player is a React component that, when provided with a valid RSS link, will create a fully functional HTML5 based Podcast player to utilize in your projects.


#Usage

###First, install...

	npm install react-rss-podcast-player --save
	# or
	yarn add react-rss-podcast-player  
	
	
<!-- -->

###Then...
	
	import React, { Component } from 'react';
	import PodcastPlayer from 'react-rss-podcast-player';

	class App extends Component {
  		render () {
	    	return <PodcastPlayer url={'https://rss.acast.com/eggchasers'} />
  		}
	}


#Demo

Here is a screenshot of the RSS Podcast Player in action with a demo podcast loaded. 

[Link to screenshot](https://s3.amazonaws.com/motoportfoliobucket/github/rss_podcast_player_screenshot.jpg)



Extended Demo Page: [https://podcastle.herokuapp.com/](https://podcastle.herokuapp.com/)

This site includes the RSS Podcast Player being used in more of a 'production' environment, and provides inspiration for a potential application of the player. Please note: the search and library functions are just provided for demo purposes and not included in this source code. 



#Props


| Prop          | Description     | Default |
|-------------- |-----------------| --------------|
| `url`		      | The RSS feed of a podcast. Pass it any valid .rss feed to start playing.       |          |
| `maxWidth`     | Set the `max-width` of the player.       |      `600px`     |
| `feedMaxHeight`  | Set the `max-height` of the items list.       | `600px` |
| `playerColor`	      | Sets the player section `background-color`     | `#f6f6f6` |
| `feedColor`    | Sets the feed list `backgroundcolor`     | `#f6f6f6` |
| `playerControlsColor` | Sets the player controls `background-color`   | `#e6e6e6` |
| `playerTextColor`    | Sets the text `color` of the player & controls.   |     `#404040`     |
| `feedTextColor`    | Sets the text `color` of the feed items.   |   `#404040`     |


#Contributions

If you would like to contribute to this open source project, please feel free to submit a PR. 

There is also a very basic test suite included for convenience, feel free to add your own tests for posterity, and run existing tests before submitting. 


#Code Of Conduct

For a more detailed look at our code of conduct, check it out [here](https://github.com/titchimoto/react-rss-podcast-component/blob/master/CODE_OF_CONDUCT.md)







 
import React from 'react';
import SanitizeHTML from '../sanitize/sanitize.component';

import './item.styles.scss';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameData: props.gameData,
      currentImage: props.gameData.header_image
        ? props.gameData.header_image
        : '',
      expanded: props.expanded
    };

    this.interval = null;
  }

  startSlideshow = () => {
    let i = 0;
    this.setState({
      currentImage: this.state.gameData.screenshots[i++].path_thumbnail
    });
    this.interval = setInterval(() => {
      if (i >= this.state.gameData.screenshots.length) i = 0;
      this.setState({
        currentImage: this.state.gameData.screenshots[i++].path_thumbnail
      });
    }, 2000);
  };

  endSlideshow = () => {
    this.setState({ currentImage: this.state.gameData.header_image });
    clearInterval(this.interval);
  };

  render() {
    const {
      expanded,
      currentImage,
      gameData: { short_description, background, detailed_description }
    } = this.state;
    return (
      <div className={`item-container ${expanded ? 'expanded' : ''}`}>
        <div
          className='item'
          style={{ backgroundImage: `url(${background})` }}
          onMouseEnter={this.startSlideshow}
          onMouseLeave={this.endSlideshow}
        >
          <img className='game-image' src={`${currentImage}`} alt='title' />
          <div className='text'>{short_description}</div>
          {expanded ? (
            <div className='info-container'>
              <div className='text'>Platforms</div>
              <div className='text'>Release Date</div>
              <div className='text'>Categories</div>
              <div className='text'>Genres</div>
            </div>
          ) : null}
        </div>
        {expanded ? (
          <div
            className='item expanded-item'
            style={{ backgroundImage: `url(${background})` }}
          >
            <div className='left'>
              <img
                className='game-image'
                src={`https://steamcdn-a.akamaihd.net/steam/apps/218620/ss_67979091e0441e3df7aa885eaa107e2032973869.600x338.jpg?t=1557419544`}
                alt='title'
              />
            </div>
            <div className='right'>
              <div className='game-description'>
                <div className='text-container'>
                  <SanitizeHTML
                    className='text'
                    html={`${detailed_description}`}
                  />
                </div>
              </div>
            </div>
            <div className='close-button text '>Close</div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Item;

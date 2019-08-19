import React, { useState, useEffect } from 'react';
import SanitizeHTML from '../sanitize/sanitize.component';

import './item.styles.scss';

const Item = ({ gameData }) => {
  const [currentImage, setCurrentImage] = useState('');
  const [expanded, setExpanded] = useState(false);

  const [interval, setIntervalObject] = useState(null);

  const startSlideshow = () => {
    let i = 0;
    setCurrentImage(gameData.screenshots[i++].path_thumbnail);
    setIntervalObject(
      setInterval(() => {
        if (i >= gameData.screenshots.length) i = 0;
        setCurrentImage(gameData.screenshots[i++].path_thumbnail);
      }, 2000)
    );
  };

  const endSlideshow = () => {
    setCurrentImage(gameData.header_image);
    clearInterval(interval);
  };

  useEffect(() => {
    setCurrentImage(gameData.header_image);
  }, [gameData]);

  const { short_description, background, detailed_description } = gameData;

  // console.log('item rerender');
  return (
    <div className={`item-container ${expanded ? 'expanded' : ''}`}>
      <div
        className='item'
        style={{ backgroundImage: `url(${background})` }}
        onMouseEnter={startSlideshow}
        onMouseLeave={endSlideshow}
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
};

export default Item;

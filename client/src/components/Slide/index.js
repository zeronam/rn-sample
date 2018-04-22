import React from 'react';
import ImageGallery from 'react-image-gallery';

class Slider extends React.Component {

  render() {

    const images = [
      {
        original: 'images/topads01.png'
      },
      {
        original: 'images/topads02.png'
      },
      {
        original: 'images/topads03.png'
      },
      {
        original: 'images/topads04.png'
      },
    ]

    return (
      <ImageGallery
        items={images}
        slideInterval={5000}
        autoPlay={true}
        showPlayButton={false}
        showThumbnails={false}
        showFullscreenButton={false}
        useBrowserFullscreen={false}
        />
    );
  }

}
export default Slider;

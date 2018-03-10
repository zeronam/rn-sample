import React from 'react';
import ImageGallery from 'react-image-gallery';

class Slider extends React.Component {

  handleImageLoad(event) {
  }

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
      {
        original: 'images/topads05.png'
      },
      {
        original: 'images/topads06.png'
      },
      {
        original: 'images/topads07.png'
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
        onImageLoad={this.handleImageLoad}/>
    );
  }

}
export default Slider;

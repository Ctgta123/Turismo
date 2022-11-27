import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const ImageSlider = () => 
        <div>
          <Carousel>
      <Carousel.Item>
        <img className="slider" src="https://i.ibb.co/6vSjKwr/6.jpg"/>
      </Carousel.Item>
      <Carousel.Item>
        <img className="slider"src="https://i.ibb.co/yfbdncX/12.jpg"/>
      </Carousel.Item>
      <Carousel.Item>
        <img className="slider" src="https://i.ibb.co/8gPK0sp/7.jpg"/>
      </Carousel.Item>
      <Carousel.Item>
        <img className="slider" src="https://i.ibb.co/BgCBBch/16.jpg"/>
      </Carousel.Item>
    </Carousel>
        </div>       
export default ImageSlider;

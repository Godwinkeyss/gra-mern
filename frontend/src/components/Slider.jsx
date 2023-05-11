import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { data } from '../data';

function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {data.slider.map((item) => (
        <Carousel.Item className='slide'key={item.id}>
          <img className="d-block " src={item.img} alt={item.title} />
          <Carousel.Caption>
            <h3>{item.title}</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

// render(<ControlledCarousel />);
export default Slider;

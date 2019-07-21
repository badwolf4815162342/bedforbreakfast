import React from 'react';
import { Images } from './ImageSlideStyle';

interface SimpleSliderProps {
  height: number;
  images: string[];
}

export default class SimpleSlider extends React.Component<SimpleSliderProps, {}> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Images>
        {this.props.images.map((image) => (
          <img key={Math.random()} src={image} style={{ height: this.props.height, marginLeft: '10px' }} alt="Card" />
        ))}
      </Images>
    );
  }
}

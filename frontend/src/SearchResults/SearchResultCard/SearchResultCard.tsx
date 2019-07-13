import React from 'react';
import { CardAccommodation, ImageAccommodation, ImageContainerAccommodation } from './SearchResultCardStyle';

interface CardProps {
  imageApartment: [string];
  descriptionApartment: string;
  numberOfBeds: number;
  district: string;
  name: string;
  descriptionHost: string;
  hometown: string;
  favoriteFood: string;
  positiveReviews: number;
  negativeReviews: number;
}

interface CardState {
  imageApartment: [string];
  descriptionApartment: string;
  /* numberOfBeds: number;
  district: string;
  name: string;
  descriptionHost: string;
  hometown: string;
  favoriteFood: string;
  positiveReviews: number;
  negativeReviews: number; */
}

class SearchResultCard extends React.Component<CardProps, CardState> {
  constructor(props: any) {
    super(props);
    this.state = {
      imageApartment: props.imageApartment,
      descriptionApartment: props.descriptionApartment,
    };
  }

  render() {
    return (
      <CardAccommodation>
        <ImageContainerAccommodation>
          <ImageAccommodation src={this.state.imageApartment[0]} />
        </ImageContainerAccommodation>
        <p>{this.state.descriptionApartment}</p>
      </CardAccommodation>
    );
  }
}

export default SearchResultCard;

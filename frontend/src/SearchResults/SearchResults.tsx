import React from 'react';

import { GridContainerMD, Section } from '../StyledComponents/StyledBasicItems';
import { StyledSearchResultCard } from './SearchResultsStyle';

const imageArray: [string] = [
  'https://user-images.githubusercontent.com/3694962/44681202-478f4280-aa40-11e8-8d6f-f8e3133ab067.png',
];

class SearchResults extends React.Component {
  render() {
    return (
      <Section>
        <GridContainerMD>
          <StyledSearchResultCard
            imageApartment={imageArray}
            descriptionApartment="Cozy apartment in the center of munich"
            numberOfBeds={3}
            district="Schwabing"
            name="Peter E."
            descriptionHost="I am a famous author from munich and enjoy food and art"
            hometown="Munich"
            favoriteFood="Sushi"
            positiveReviews={7}
            negativeReviews={2}
          />
        </GridContainerMD>
      </Section>
    );
  }
}

export default SearchResults;

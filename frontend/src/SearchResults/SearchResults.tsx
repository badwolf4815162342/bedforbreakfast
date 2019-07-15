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
            descriptionApartment="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
            numberOfBeds={3}
            district="Schwabing"
            name="Peter E."
            descriptionHost="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
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

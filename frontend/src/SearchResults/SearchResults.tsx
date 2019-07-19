import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { GridContainerMD, Section } from '../StyledComponents/StyledBasicItems';
import { Space, StyledSearchResultCard } from './SearchResultsStyle';

const ALL_ACCOMMODATIONS_QUERY = gql`
  query accommodations {
    accommodations {
      _id
      isActive
      country
      city
      streetName
      streetNumber
      zipCode
      description
      district
      numberOfBeds
      pictures
    }
  }
`;

interface Data {
  accommodations: Array<{
    _id: string;
    isActive: boolean;
    country: string;
    city: string;
    streetName: string;
    streetNumber: string;
    zipCode: string;
    description: string;
    district: string;
    numberOfBeds: number;
    pictures: [string];
  }>;
}

class SearchResults extends React.Component {
  render() {
    return (
      <Section>
        <Query<Data, {}> query={ALL_ACCOMMODATIONS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) {
              return <p>Loading...</p>;
            }
            if (error) {
              return <p>Error :(</p>;
            }
            if (!data) {
              return <p>No Data :(</p>;
            }

            return data.accommodations.map((accommodation) => (
              <GridContainerMD>
                <StyledSearchResultCard
                  key={accommodation._id}
                  imageApartment={accommodation.pictures}
                  descriptionApartment={accommodation.description}
                  numberOfBeds={accommodation.numberOfBeds}
                  district={accommodation.district}
                  name="Peter E."
                  descriptionHost="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
                  hometown="Munich"
                  favoriteFood="Sushi"
                  positiveReviews={7}
                  negativeReviews={2}
                />
                <Space />
              </GridContainerMD>
            ));
          }}
        </Query>
      </Section>
    );
  }
}

export default SearchResults;

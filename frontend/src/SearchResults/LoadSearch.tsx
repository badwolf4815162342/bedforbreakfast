import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { SearchResults, User } from './SearchResults';

const ACCOMMODATIONS_QUERY = gql`
  query accommodationsByCity($city: String!) {
    accommodationsByCity(city: $city) {
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
      user {
        firstName
        lastName
        description
        favoriteFood
        homeTown
        homeCountry
        profilePicture
      }
    }
  }
`;

interface LoadSearchProps {}
interface LoadSearchState {
  city: string;
}

interface DataAccommodation {
  accommodationsByCity: Array<{
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
    user: User;
  }>;
}

class LoadSearch extends React.Component<LoadSearchProps, LoadSearchState> {
  constructor(props: any) {
    super(props);
    this.state = {
      city: 'Munich',
    };
  }

  render() {
    return (
      <Query<DataAccommodation, {}> query={ACCOMMODATIONS_QUERY} variables={{ city: this.state.city }}>
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
          console.log(data.accommodationsByCity);
          return <SearchResults accommodations={data.accommodationsByCity} city={this.state.city}></SearchResults>;
        }}
      </Query>
    );
  }
}

export default LoadSearch;

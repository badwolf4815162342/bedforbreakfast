import React from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Section } from '../StyledComponents/StyledBasicItems';
import { SearchResults } from './SearchResults';
import { Results, Title } from './SearchResultsStyle';

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
        _id
        firstName
        lastName
        description
        favoriteFood
        homeTown
        homeCountry
        profilePicture
        gender
        birthday
        likedBy {
          _id
        }
        dislikedBy {
          _id
        }
        verified
      }
    }
  }
`;

interface LoadSearchProps {
  match: { params: { city: string } };
}
interface LoadSearchState {}

interface DataAccommodation {
  accommodationsByCity: Accommodation[];
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  description: string;
  favoriteFood: string;
  homeTown: string;
  homeCountry: string;
  profilePicture: string;
  likedBy: User[];
  dislikedBy: User[];
  verified: boolean;
  gender: string;
  birthday: string;
}

export interface Accommodation {
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
}

class LoadSearch extends React.Component<LoadSearchProps, LoadSearchState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Query<DataAccommodation, {}> query={ACCOMMODATIONS_QUERY} variables={{ city: this.props.match.params.city }}>
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
            return (
              <div>
                {data.accommodationsByCity.length !== 0 && (
                  <SearchResults
                    accommodations={data.accommodationsByCity}
                    city={this.props.match.params.city}
                  ></SearchResults>
                )}
                {data.accommodationsByCity.length === 0 && (
                  <Section>
                    <Results>
                      <Title>No search results for : {this.props.match.params.city}</Title>
                    </Results>
                  </Section>
                )}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default LoadSearch;

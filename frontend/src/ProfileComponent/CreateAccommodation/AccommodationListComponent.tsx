import { gql } from 'apollo-boost';
import React from 'react';
import { Query } from 'react-apollo';

const ALL_ACCOMMODATIONS_QUERY = gql`
  query accommodations {
    accommodations {
      country
      city
      streetName
      streetNumber
      zipCode
      description
      numberOfBeds
    }
  }
`;

interface Data {
  accommodations: Array<{
    country: string;
    city: string;
    streetName: string;
    streetNumber: string;
    zipCode: string;
    description: string;
    numberOfBeds: number;
  }>;
}

const style = {
  color: 'red',
};

export const AccommodationList = () => (
  <div>
    <p style={style}>This is only for debugging</p>
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

        return data.accommodations.map(
          ({ country, city, streetName, streetNumber, zipCode, description, numberOfBeds }) => (
            // this could be a "child" component thats beeing wrapped, for info on how to do this with class components see: https://www.apollographql.com/docs/react/recipes/static-typing/#classes-vs-functions
            <div key={country}>
              <p>
                {country} {city} {streetName} {streetNumber} {zipCode} {description} {numberOfBeds}
              </p>
            </div>
          ),
        );
      }}
    </Query>
  </div>
);

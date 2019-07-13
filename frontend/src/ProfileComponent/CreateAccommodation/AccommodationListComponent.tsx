import { gql } from 'apollo-boost';
import React from 'react';
import { Query } from 'react-apollo';

/* const ALL_ACCOMMODATIONS_QUERY = gql`
  query accommodations {
    accommodations {
      _id
      country
      city
      streetName
      streetNumber
      zipCode
      description
      numberOfBeds
    }
  }
`; */

const ACCOMMODATION_BY_ID = gql`
  query accommodationById($_id: String!) {
    accommodationById(_id: $_id) {
      _id
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
  accommodationById: {
    _id: string;
    country: string;
    city: string;
    streetName: string;
    streetNumber: string;
    zipCode: string;
    description: string;
    numberOfBeds: number;
  };
}

/* interface Data {
  accommodations: {
    _id: string;
    country: string;
    city: string;
    streetName: string;
    streetNumber: string;
    zipCode: string;
    description: string;
    numberOfBeds: number;
  };
} */

const style = {
  color: 'red',
};

export const AccommodationList = () => (
  <div>
    <p style={style}>This is only for debugging</p>
    {/* <Query<Data, {}> query={ALL_ACCOMMODATIONS_QUERY}>
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
          ({ _id, country, city, streetName, streetNumber, zipCode, description, numberOfBeds }) => (
            // this could be a "child" component thats beeing wrapped, for info on how to do this with class components see: https://www.apollographql.com/docs/react/recipes/static-typing/#classes-vs-functions
            <div key={_id}>
              <p>
                {_id} {country} {city} {streetName} {streetNumber} {zipCode} {description} {numberOfBeds}
              </p>
            </div>
          ),
        );
      }}
    </Query> */}
    <Query<Data, {}> query={ACCOMMODATION_BY_ID} variables={{ _id: '5d28973ece722c48c55bf0f5' }}>
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

        console.log(data);
        const accommodation = data.accommodationById;
        // {_id, streetName} = data.accommidationById;
        return (
          <div>
            {accommodation._id} {accommodation.city}
          </div>
        );
      }}
    </Query>
  </div>
);

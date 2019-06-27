import { gql } from 'apollo-boost';
import React from 'react';
import { Query } from 'react-apollo';

const ALL_ACCOMMODATIONS_QUERY = gql`
  query accommodations {
    accommodations {
      name
      city
    }
  }
`;

interface Data {
  accommodations: Array<{ name: string; city: string }>;
}

export const AccommodationList = () => (
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

      return data.accommodations.map(({ name, city }) => (
        // this could be a "child" component thats beeing wrapped, for info on how to do this with class components see: https://www.apollographql.com/docs/react/recipes/static-typing/#classes-vs-functions
        <div key={name}>
          <p>
            {name}: {city}
          </p>
        </div>
      ));
    }}
  </Query>
);

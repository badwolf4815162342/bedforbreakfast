import { gql } from 'apollo-boost';
import React from 'react';
import { Query } from 'react-apollo';

import { FeedItem } from './FeedItem/FeedItem';

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

export const Feed = () => (
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

      return data.accommodations.map((accommodation) => <FeedItem {...accommodation}></FeedItem>);
    }}
  </Query>
);

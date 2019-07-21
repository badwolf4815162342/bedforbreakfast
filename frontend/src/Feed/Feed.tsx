import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';

import { FeedItem } from './FeedItem/FeedItem';

const ALL_TRIP_REPORTS_QUERY = gql`
  query tripReports {
    tripReports {
      _id
      request {
        _id
      }
      receiver {
        _id
        firstName
        lastName
        homeTown
        homeCountry
        profilePicture
        verified
      }
      author {
        _id
        firstName
        lastName
        homeTown
        homeCountry
        profilePicture
        verified
      }
      receiverRole
      pictures
      description
      likedBy {
        _id
      }
    }
  }
`;

export interface RequestItem {
  _id: string;
  author: User;
  receiver: User;
  receiverRole: RoleType;
  pictures: string[];
  description: string;
}
interface Data {
  tripReports: RequestItem[];
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  homeTown: string;
  homeCountry: string;
  profilePicture: string;
  verified: boolean;
}

enum RoleType {
  MEAL,
  ACCOMMODATION,
}

export const Feed = () => (
  <Query<Data, {}> query={ALL_TRIP_REPORTS_QUERY}>
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

      return data.tripReports.map((tripReport) => <FeedItem key={tripReport._id} request={tripReport}></FeedItem>);
    }}
  </Query>
);

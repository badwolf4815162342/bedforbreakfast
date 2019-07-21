import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';

import { FeedItem } from './FeedItem/FeedItem';
import { FeedPage, FeedTitle } from './FeedStyle';

const ALL_TRIP_REPORTS_QUERY = gql`
  query tripReports {
    tripReports {
      _id
      request {
        _id
        start
        end
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

export interface TripReport {
  _id: string;
  author: User;
  receiver: User;
  receiverRole: RoleType;
  pictures: string[];
  description: string;
  request: Request;
  likedBy: string[];
}
interface Data {
  tripReports: TripReport[];
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

interface Request {
  start: Date;
  end: Date;
}

export enum RoleType {
  MEAL,
  ACCOMMODATION,
}

export const Feed = () => (
  <FeedPage>
    <FeedTitle>Explore the experiences of others:</FeedTitle>
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

        data.tripReports.reverse();

        return data.tripReports.map((tripReport) => <FeedItem key={tripReport._id} tripReport={tripReport}></FeedItem>);
      }}
    </Query>
  </FeedPage>
);

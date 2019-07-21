import { MenuItem } from '@material-ui/core';
import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { HeaderLink } from '../HeaderStyle';

const RECEIVE_REQUESTED_REQUEST = gql`
  query {
    receivedRequestedRequests {
      _id
      proposer {
        firstName
      }
    }
  }
`;

interface Data {
  receivedRequestedRequests: [
    {
      _id: string;
      proposer: { firstName: string };
    },
  ];
}

class NotificationList extends React.Component<{ onClick: () => void }, {}> {
  render() {
    return (
      <Query<Data, {}> query={RECEIVE_REQUESTED_REQUEST}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error.</p>;
          }
          if (data) {
            return data.receivedRequestedRequests.map((request) => (
              <HeaderLink key={request._id} to="/requests">
                <MenuItem onClick={this.props.onClick}>
                  You got a new request from {request.proposer.firstName}
                </MenuItem>
              </HeaderLink>
            ));
          }
        }}
      </Query>
    );
  }
}

export default NotificationList;

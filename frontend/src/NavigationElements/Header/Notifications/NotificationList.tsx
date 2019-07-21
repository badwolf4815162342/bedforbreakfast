import { MenuItem } from '@material-ui/core';
import gql from 'graphql-tag';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { HeaderLink } from '../HeaderStyle';

const RECEIVED_REQUESTED_REQUEST = gql`
  query {
    receivedRequestedRequests {
      _id
      proposer {
        firstName
      }
    }
  }
`;

const PROPOSED_UNSEE_ANSWERED_REQUESTS = gql`
  query {
    proposedUnseeAnsweredRequests {
      _id
      requestStatus
      receiver {
        firstName
      }
    }
  }
`;

const UPDATE_AS_SEEN = gql`
  mutation updateRequestAsSeen($_id: String!) {
    updateRequestAsSeen(requestSeenDto: { _id: $_id }) {
      _id
    }
  }
`;

interface ReceivedRequestsData {
  receivedRequestedRequests: [
    {
      _id: string;
      proposer: { firstName: string };
    },
  ];
}

interface ProposedUnseeAnsweredRequestsData {
  proposedUnseeAnsweredRequests: [
    {
      _id: string;
      requestStatus: string;
      receiver: {
        firstName: string;
      };
    },
  ];
}

class NotificationList extends React.Component<{ onClick: () => void }, {}> {
  render() {
    return (
      <>
        <Query<ReceivedRequestsData, {}> query={RECEIVED_REQUESTED_REQUEST}>
          {({ loading, error, data }) => {
            if (loading) {
              return <MenuItem onClick={this.props.onClick}>Loading...</MenuItem>;
            }
            if (error) {
              return <MenuItem onClick={this.props.onClick}>Error.</MenuItem>;
            }
            if (data && data.receivedRequestedRequests && data.receivedRequestedRequests.length > 0) {
              return data.receivedRequestedRequests.map((request) => (
                <HeaderLink key={request._id} to="/requests">
                  <MenuItem onClick={this.props.onClick}>
                    You got a new request from {request.proposer.firstName}
                  </MenuItem>
                </HeaderLink>
              ));
            } else {
              return <MenuItem onClick={this.props.onClick}>No open requests</MenuItem>;
            }
          }}
        </Query>
        <Query<ProposedUnseeAnsweredRequestsData, {}> query={PROPOSED_UNSEE_ANSWERED_REQUESTS}>
          {({ loading, error, data }) => {
            if (loading) {
              return <MenuItem onClick={this.props.onClick}>Loading...</MenuItem>;
            }
            if (error) {
              return <MenuItem onClick={this.props.onClick}>Error</MenuItem>;
            }
            if (data && data.proposedUnseeAnsweredRequests && data.proposedUnseeAnsweredRequests.length > 0) {
              return (
                <Mutation mutation={UPDATE_AS_SEEN}>
                  {(
                    updateSeenMutation: (arg0: {
                      variables: {
                        _id: string;
                      };
                    }) => void,
                    { mutationLoading, mutationError }: any,
                  ) => (
                    <>
                      {mutationLoading && <p>Loading...</p>}
                      {mutationError && <p>Error.</p>}
                      {data.proposedUnseeAnsweredRequests.map((request) => (
                        <MenuItem
                          key={request._id}
                          onClick={() => {
                            this.props.onClick();
                            updateSeenMutation({ variables: { _id: request._id } });
                          }}
                        >
                          {request.receiver.firstName} {request.requestStatus} your request.
                        </MenuItem>
                      ))}
                    </>
                  )}
                </Mutation>
              );
            } else {
              return <MenuItem onClick={this.props.onClick}>No new answers</MenuItem>;
            }
          }}
        </Query>
      </>
    );
  }
}

export default NotificationList;

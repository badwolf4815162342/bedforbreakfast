import gql from 'graphql-tag';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import Request from './Request/Request';
import { RequestPage, RequestTitle } from './RequestsStyle';

const RECEIVE_REQUESTED_REQUEST = gql`
  query {
    receivedRequestedRequests {
      _id
      start
      end
      description
      proposer {
        _id
        firstName
        lastName
        profilePicture
        phoneNumber
        email
      }
    }
  }
`;

const UPDATE_REQUEST_STATUS = gql`
  mutation updateRequestStatus($_id: String!, $requestStatus: requestStatus!) {
    updateRequestStatus(updateRequestStatusDto: { _id: $_id, requestStatus: $requestStatus }) {
      _id
      start
      end
      description
      proposer {
        _id
        firstName
        lastName
        profilePicture
        phoneNumber
        email
      }
    }
  }
`;

interface Data {
  receivedRequestedRequests: [
    {
      _id: string;
      start: string;
      end: string;
      description: string;
      proposer: {
        _id: string;
        firstName: string;
        lastName: string;
        profilePicture: string;
        phoneNumber: string;
        email: string;
      };
    },
  ];
}

class Requests extends React.Component<
  { onClick: () => void },
  { acceptedRequest: { requestId: string | undefined; accepted: boolean | undefined } }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      acceptedRequest: { requestId: undefined, accepted: undefined },
    };
  }

  render() {
    return (
      <Query<Data, {}> query={RECEIVE_REQUESTED_REQUEST} fetchPolicy="network-only">
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error.</p>;
          }
          if (data) {
            const dataIn = data;
            return (
              <RequestPage>
                <RequestTitle>Requests:</RequestTitle>
                <Mutation
                  mutation={UPDATE_REQUEST_STATUS}
                  onCompleted={() => {
                    window.location.reload();
                  }}
                >
                  {(
                    updateMutation: (arg0: {
                      variables: {
                        _id: string;
                        requestStatus: string;
                      };
                    }) => void,
                    { mutationLoading, mutationError }: any,
                  ) => (
                    <>
                      {mutationLoading && <p>Loading...</p>}
                      {mutationError && <p>Error.</p>}
                      {dataIn.receivedRequestedRequests.map((request) => (
                        <Request
                          key={request._id}
                          {...request}
                          onAccept={(accepted) => {
                            updateMutation({
                              variables: { _id: request._id, requestStatus: accepted ? 'ACCEPTED' : 'DENIED' },
                            });
                          }}
                        ></Request>
                      ))}
                    </>
                  )}
                </Mutation>
              </RequestPage>
            );
          }
        }}
      </Query>
    );
  }
}

export default Requests;

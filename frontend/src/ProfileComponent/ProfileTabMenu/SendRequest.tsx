import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { USER_ID } from '../../constants';

import {
  DateBox,
  Error,
  InputDate,
  RequestButtonBox,
  RequestDialog,
  RequestDialogActions,
  RequestDialogBox,
  RequestDialogButton,
  RequestDialogForm,
  RequestDialogTitle,
  RequestMessage,
  RequestMutation,
} from './SendRequestStyle';

const SEND_REQUEST_MUTATION = gql`
  mutation SendRequestMutation($receiver: String!, $from: DateTime!, $to: DateTime!, $description: String!) {
    createRequest(createRequestDto: { start: $from, end: $to, description: $description, receiver: $receiver }) {
      start
      end
      description
      requestStatus
      receiver {
        email
      }
      proposer {
        firstName
        email
      }
    }
  }
`;

const CAN_BE_REQUESTED = gql`
  query canBeRequested($hostId: String!) {
    canBeRequested(canBeRequestedDto: { hostId: $hostId })
  }
`;

interface CanBeRequested {
  canBeRequested: boolean;
}

interface SendRequestState {
  open: boolean;
  sentOpen: boolean;
  isLoaded: boolean;
  canRequest: boolean;
  from: Date;
  to: Date;
  description: string;
  receiver: string;
}

class SendRequest extends Component<{ userId: string; userName: string }, SendRequestState> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      sentOpen: false,
      isLoaded: false,
      canRequest: true,
      from: new Date(),
      to: new Date(),
      description: '',
      receiver: '',
    };
  }

  render() {
    const { receiver, from, to, description } = this.state;
    const loggedUserID = localStorage.getItem(USER_ID);
    const isThisMe = loggedUserID === this.props.userId;
    return (
      <RequestButtonBox>
        <Query<CanBeRequested, {}>
          query={CAN_BE_REQUESTED}
          variables={{ hostId: this.props.userId }}
          fetchPolicy="network-only"
        >
          {({ loading, error, data }) => {
            if (loading) {
              return <p></p>;
            }
            if (error) {
              return <p>Error</p>;
            }
            if (!data) {
              return <p></p>;
            }
            if (isThisMe) {
              return <p></p>;
            }
            return (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  this.setState({ open: true });
                }}
                disabled={!data.canBeRequested || !this.state.canRequest}
              >
                request
              </Button>
            );
          }}
        </Query>
        <RequestDialog
          open={this.state.open}
          onClose={() => {
            this.setState({ open: false });
          }}
          aria-labelledby="form-dialog-title"
          fullWidth
        >
          <RequestDialogBox>
            <RequestDialogTitle id="form-dialog-title">
              Send a request to stay with {this.props.userName}
            </RequestDialogTitle>
            <DialogContent>
              <DateBox>
                <InputDate
                  value={this.state.from}
                  onChange={(date) => {
                    if (date) {
                      this.setState({ from: date.toDate() });
                    }
                  }}
                  format="DD.MM.YYYY"
                  disablePast
                  label="From"
                />
                <InputDate
                  value={this.state.to}
                  onChange={(date) => {
                    if (date) {
                      this.setState({ to: date.toDate() });
                    }
                  }}
                  format="DD.MM.YYYY"
                  disablePast
                  label="To"
                />
              </DateBox>
              <RequestMessage
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
                id="message"
                label="Describe the purpose your trip"
                color="secondary"
                multiline={true}
                rowsMax="15"
                fullWidth
              />
            </DialogContent>
            <RequestDialogActions>
              <Mutation
                mutation={SEND_REQUEST_MUTATION}
                variables={{
                  receiver,
                  from,
                  to,
                  description,
                }}
                onCompleted={() => this.setState({ open: false, sentOpen: true, canRequest: false })}
              >
                {(createRequest: any, { loading, error, data }: any) => (
                  <RequestMutation>
                    {error && <Error>{error.message.replace('GraphQL error: ', '')}</Error>}
                    {loading && <p>Loading...</p>}
                    <RequestDialogForm
                      onSubmit={(e) => {
                        e.preventDefault();
                        createRequest({
                          variables: {
                            receiver: this.props.userId,
                            from: this.state.from,
                            to: this.state.to,
                            description: this.state.description,
                          },
                        });
                      }}
                    >
                      <RequestButtonBox>
                        <RequestDialogButton
                          onClick={() => {
                            this.setState({ open: false });
                          }}
                          color="secondary"
                        >
                          Cancel
                        </RequestDialogButton>
                        <RequestDialogButton variant="contained" color="secondary" type="submit">
                          Send
                        </RequestDialogButton>
                      </RequestButtonBox>
                    </RequestDialogForm>
                  </RequestMutation>
                )}
              </Mutation>
            </RequestDialogActions>
          </RequestDialogBox>
        </RequestDialog>
        <RequestDialog open={this.state.sentOpen} aria-labelledby="form-dialog-title" fullWidth>
          <RequestDialogBox>
            <RequestDialogTitle id="form-dialog-title">Your request has been sent!</RequestDialogTitle>
            <DialogContent>Now you can look for tickets for these dates on our partner's website!</DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  this.setState({ sentOpen: false });
                }}
                color="secondary"
              >
                Close
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  this.setState({ sentOpen: false });
                }}
                color="secondary"
              >
                Look for tickets
              </Button>
            </DialogActions>
          </RequestDialogBox>
        </RequestDialog>
      </RequestButtonBox>
    );
  }
}
export default SendRequest;

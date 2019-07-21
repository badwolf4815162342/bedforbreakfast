import { Button } from '@material-ui/core';
import gql from 'graphql-tag';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import Moment from 'react-moment';

import { Section } from '../StyledComponents/StyledBasicItems';
import { ReferenceTitle } from './FeedbackStyle';
import Rating from './Rating/Rating';
import TripReport from './TripReport/TripReport';

const REQUEST_BY_ID = gql`
  query request($requestId: String!) {
    request(requestId: $requestId) {
      start
      end
      receiver {
        firstName
        lastName
        verified
        profilePicture
        accommodation {
          city
        }
      }
    }
  }
`;

const CREATE_RATING = gql`
  mutation createRating($request: String!, $receiverRole: RoleType!, $description: String!, $rating: Boolean!) {
    createRating(
      createRatingDto: { request: $request, receiverRole: $receiverRole, description: $description, rating: $rating }
    ) {
      _id
    }
  }
`;

interface Data {
  request: {
    start: string;
    end: string;
    receiver: {
      firstName: string;
      lastName: string;
      profilePicture: string;
      verified: boolean;
      accommodation: { city: string };
    };
  };
}

class Feedback extends React.Component<
  {},
  {
    rating: { rating: boolean | undefined; description: string | undefined };
    writingRating: boolean;
    tripReport: { pictures: File[]; description: string | undefined };
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      rating: { rating: undefined, description: undefined },
      writingRating: false,
      tripReport: { pictures: [], description: undefined },
    };
  }

  handleRatingChange = (name: string) => (value: any) => {
    this.setState({ rating: { ...this.state.rating, [name]: value } });
  };

  handleTripReportChange = (name: string) => (value: any) => {
    this.setState({ tripReport: { ...this.state.tripReport, [name]: value } });
  };

  render() {
    const requestId = '5d33132c68706a54e547ff10'; // TODO: get from route parameter
    const {
      rating: { rating, description },
      tripReport: { pictures },
    } = this.state;

    return (
      <Query<Data, {}> query={REQUEST_BY_ID} variables={{ requestId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error.</p>;
          }
          if (data) {
            const startString = data.request.start;
            const endString = data.request.end;

            return (
              <Section>
                <ReferenceTitle>
                  How was your trip to {data.request.receiver.accommodation.city} from{' '}
                  <Moment format="MMMM Do">{startString}</Moment> to <Moment format="MMMM Do">{endString}</Moment>?
                </ReferenceTitle>
                {this.state.writingRating && (
                  <>
                    <Rating
                      receiver={data.request.receiver}
                      rating={rating}
                      onRatingChange={this.handleRatingChange('rating')}
                      onDescriptionChange={this.handleRatingChange('description')}
                    />
                    <Mutation
                      mutation={CREATE_RATING}
                      variables={{ request: requestId, receiverRole: 'ACCOMMODATION', description, rating }}
                      onCompleted={() => this.setState({ writingRating: false })}
                    >
                      {(mutation: any, { mutationLoading, mutationError }: any) => (
                        <>
                          {mutationLoading && <p>Loading...</p>}
                          {mutationError && <p>Error.</p>}
                          <Button onClick={() => mutation()}>Continue</Button>
                        </>
                      )}
                    </Mutation>
                  </>
                )}
                {!this.state.writingRating && (
                  <TripReport
                    pictures={pictures}
                    onPicturesChange={this.handleTripReportChange('pictures')}
                    onDescriptionChange={this.handleTripReportChange('description')}
                  ></TripReport>
                )}
              </Section>
            );
          }
        }}
      </Query>
    );
  }
}

export default Feedback;

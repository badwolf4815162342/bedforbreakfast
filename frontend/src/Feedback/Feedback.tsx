import gql from 'graphql-tag';
import React from 'react';
import { Mutation, Query } from 'react-apollo';
import Moment from 'react-moment';

import {
  ButtonContainer,
  ContinueButton,
  FeedbackCard,
  FeedbackPage,
  ReferenceTitle,
  SkipButton,
  SubmitButton,
  TripReportCard,
} from './FeedbackStyle';
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

const CREATE_TRIP_REPORT = gql`
  mutation createTripReport($request: String!, $receiverRole: RoleType!, $description: String!, $pictures: [Upload]!) {
    createTripReport(
      createTripReportDto: {
        request: $request
        receiverRole: $receiverRole
        description: $description
        pictures: $pictures
      }
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
  { history: any },
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
      writingRating: true,
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
    const requestId = '5d3445cf718e68162ca8b62d';
    const {
      rating: { rating, description: ratingDescription },
      tripReport: { pictures, description: tripReportDescription },
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
              <FeedbackPage>
                <ReferenceTitle>
                  How was your trip to {data.request.receiver.accommodation.city} from{' '}
                  <Moment format="MMMM Do">{startString}</Moment> to <Moment format="MMMM Do">{endString}</Moment>?
                </ReferenceTitle>
                {this.state.writingRating && (
                  <div>
                    <FeedbackCard>
                      <Rating
                        receiver={data.request.receiver}
                        rating={rating}
                        onRatingChange={this.handleRatingChange('rating')}
                        onDescriptionChange={this.handleRatingChange('description')}
                      />
                      <Mutation
                        mutation={CREATE_RATING}
                        variables={{
                          request: requestId,
                          receiverRole: 'ACCOMMODATION',
                          description: ratingDescription,
                          rating,
                        }}
                        onCompleted={() => this.setState({ writingRating: false })}
                      >
                        {(createRating: any, { mutationLoading, mutationError }: any) => (
                          <>
                            {mutationLoading && <p>Loading...</p>}
                            {mutationError && <p>Error.</p>}
                            <ContinueButton variant="contained" color="secondary" onClick={() => createRating()}>
                              Continue
                            </ContinueButton>
                          </>
                        )}
                      </Mutation>
                    </FeedbackCard>
                  </div>
                )}
                {!this.state.writingRating && (
                  <TripReportCard>
                    <TripReport
                      pictures={pictures}
                      onPicturesChange={this.handleTripReportChange('pictures')}
                      onDescriptionChange={this.handleTripReportChange('description')}
                    ></TripReport>
                    <Mutation
                      mutation={CREATE_TRIP_REPORT}
                      variables={{
                        request: requestId,
                        receiverRole: 'ACCOMMODATION',
                        description: tripReportDescription,
                        pictures,
                      }}
                      onCompleted={() => this.props.history.push('/')}
                    >
                      {(createTripReport: any, { mutationLoading, mutationError }: any) => (
                        <ButtonContainer>
                          {mutationLoading && <p>Loading...</p>}
                          {mutationError && <p>Error.</p>}
                          <SubmitButton variant="contained" color="secondary" onClick={() => createTripReport()}>
                            Submit
                          </SubmitButton>
                          <SkipButton color="default" onClick={() => this.props.history.push('/')}>
                            Skip
                          </SkipButton>
                        </ButtonContainer>
                      )}
                    </Mutation>
                  </TripReportCard>
                )}
              </FeedbackPage>
            );
          }
        }}
      </Query>
    );
  }
}

export default Feedback;

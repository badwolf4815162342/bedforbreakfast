import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { Section } from '../../../StyledComponents/StyledBasicItems';
import Reference from './Reference';
import { NoReferencesLabel } from './ReferenceStyle';

const GET_RECEIVED_REFERENCES_BY_USER_ID = gql`
  query receivedRatings($userId: String!) {
    receivedRatings(userId: $userId) {
      _id
      description
      receiverRole
      rating
      request {
        start
        end
      }
      author {
        _id
        firstName
        lastName
        homeTown
        homeCountry
        verified
        profilePicture
      }
    }
  }
`;

interface ReferenceListData {
  receivedRatings: Array<{
    _id: string;
    description: string;
    receiverRole: string;
    rating: boolean;
    request: {
      start: Date;
      end: Date;
    };
    author: {
      _id: string;
      firstName: string;
      lastName: string;
      homeTown: string;
      homeCountry: string;
      verified: boolean;
      profilePicture: string;
    };
  }>;
}

class ReferenceList extends React.Component<{ userId: string }> {
  render() {
    return (
      <Section>
        <Query<ReferenceListData, {}>
          query={GET_RECEIVED_REFERENCES_BY_USER_ID}
          variables={{ userId: this.props.userId }}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return <p>Loading...</p>;
            }
            if (error) {
              return <p>Error :( Fix me {error.message}</p>;
            }
            if (!data) {
              return <p>No data</p>;
            }
            if (data.receivedRatings.length === 0) {
              return <NoReferencesLabel>User has no references yet</NoReferencesLabel>;
            }
            return (
              <Section>
                {data.receivedRatings.map((reference) => (
                  <Reference
                    key={reference._id}
                    authorId={reference.author._id}
                    authorFirstName={reference.author.firstName}
                    authorLastName={reference.author.lastName}
                    aHomeTown={reference.author.homeTown}
                    aHomeCountry={reference.author.homeCountry}
                    receiverRole={reference.receiverRole}
                    dateStart={reference.request.start}
                    dateEnd={reference.request.end}
                    isPositive={reference.rating}
                    text={reference.description}
                    profilePicture={reference.author.profilePicture}
                  />
                ))}
              </Section>
            );
          }}
        </Query>
      </Section>
    );
  }
}

export default ReferenceList;

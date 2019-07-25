import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { Section } from '../../../StyledComponents/StyledBasicItems';
import TripReport from './TripReport';
import { NoReportsLabel } from './TripReportStyle';

const GET_PUBLISHED_TRIP_REPORTS_BY_USER_ID = gql`
  query publishedTripReports($userId: String!) {
    publishedTripReports(userId: $userId) {
      _id
      description
      receiverRole
      pictures
      request {
        start
        end
      }
      receiver {
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

interface TripReportListData {
  publishedTripReports: Array<{
    _id: string;
    description: string;
    receiverRole: string;
    pictures: string[];
    request: {
      start: Date;
      end: Date;
    };
    receiver: {
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

class TripReportList extends React.Component<{ userId: string }> {
  render() {
    return (
      <Section>
        <Query<TripReportListData, {}>
          query={GET_PUBLISHED_TRIP_REPORTS_BY_USER_ID}
          variables={{ userId: this.props.userId }}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return <p>Loading...</p>;
            }
            if (error) {
              window.location.reload();
              return <p></p>;
            }
            if (!data) {
              return <p>No data</p>;
            }
            if (data.publishedTripReports.length === 0) {
              return <NoReportsLabel>User has no trip reports yet</NoReportsLabel>;
            }
            return (
              <Section>
                {data.publishedTripReports.map((tripReport) => (
                  <TripReport
                    key={tripReport._id}
                    receiverId={tripReport.receiver._id}
                    receiverRole={tripReport.receiverRole}
                    receiverFirstName={tripReport.receiver.firstName}
                    receiverLastName={tripReport.receiver.lastName}
                    receiverHomeTown={tripReport.receiver.homeTown}
                    receiverHomeCountry={tripReport.receiver.homeCountry}
                    receiverVerified={tripReport.receiver.verified}
                    profilePicture={tripReport.receiver.profilePicture}
                    reportPictures={tripReport.pictures}
                    dateStart={tripReport.request.start}
                    dateEnd={tripReport.request.end}
                    description={tripReport.description}
                    //text={'Lorem ipsum dolor'}
                    likeCount={210}
                    liked={true}
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

export default TripReportList;

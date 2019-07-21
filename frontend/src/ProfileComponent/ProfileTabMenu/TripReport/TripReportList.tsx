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
  // tripReport1 = (
  //   <TripReport
  //     // eslint-disable-next-line
  //     receiverRole={'accommodation'}
  //     receiverName={'Peter E'}
  //     receiverHomeTown={'Madrid'}
  //     receiverHomeCountry={'Spain'}
  //     date={'May, 2019, 4 days'}
  //     description={
  //       'Lorem ipsum dolor sit abc, Lorem ipsum dolor sit abc, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' //tslint:disable-line
  //     }
  //     likeCount={210}
  //     liked={true}
  //   />
  // );

  // tripReport2 = (
  //   <TripReport
  //     // eslint-disable-next-line
  //     receiverRole={'quest'}
  //     receiverName={'Testuria Atest'}
  //     receiverHomeTown={'test'}
  //     receiverHomeCountry={'test'}
  //     date={'June, 2019, 2 days'}
  //     description={
  //       'Lorem met, consectdunt ut labore et doloiam, quis nostrud exo laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
  //     }
  //     //text={'Lorem ipsum dolor'}
  //     likeCount={210}
  //     liked={true}
  //   />
  // );

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
              return <p>Error :( Fix me {error.message}</p>;
            }
            if (!data) {
              return <p>No data</p>;
            }
            if (data.publishedTripReports.length === 0) {
              return <NoReportsLabel>User has no references yet</NoReportsLabel>;
            }
            return (
              <Section>
                {data.publishedTripReports.map((tripReport) => (
                  <TripReport
                    receiverRole={tripReport.receiverRole}
                    receiverFirstName={tripReport.receiver.firstName}
                    receiverLastName={tripReport.receiver.lastName}
                    receiverHomeTown={tripReport.receiver.homeTown}
                    receiverHomeCountry={tripReport.receiver.homeCountry}
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

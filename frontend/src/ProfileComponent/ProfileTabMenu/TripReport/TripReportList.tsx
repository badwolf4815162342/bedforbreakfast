import React from 'react';
import { Section } from '../../../StyledComponents/StyledBasicItems';
import TripReport from './TripReport';

// const GET_RECEIVED_REFERENCES_BY_USER_ID = gql`
//   query publishedTripReports($userId: String!) {
//     publishedTripReports(userId: $userId) {
//       _id
//       description
//       receiverRole
//       pictures
//       request {
//         start
//         end
//       }
//       receiver {
//         _id
//         firstName
//         lastName
//         homeTown
//         homeCountry
//         verified
//         profilePicture
//       }
//     }
//   }
// `;

// interface TripReportListData {
//   publishedTripReports: Array<{
//     _id: string;
//     description: string;
//     receiverRole: string;
//     pictures: string[];
//     request: {
//       start: Date;
//       end: Date;
//     };
//     receiver: {
//       _id: string;
//       firstName: string;
//       lastName: string;
//       homeTown: string;
//       homeCountry: string;
//       verified: boolean;
//       profilePicture: string;
//     };
//   }>;
// }

class TripReportList extends React.Component<{}> {
  tripReport1 = (
    <TripReport
      // eslint-disable-next-line
      role={'accommodation'}
      name={'Peter E'}
      homeTown={'Madrid'}
      homeCountry={'Spain'}
      date={'May, 2019, 4 days'}
      text={
        'Lorem ipsum dolor sit abc, Lorem ipsum dolor sit abc, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum' //tslint:disable-line
      }
      likeCount={210}
      liked={true}
    />
  );

  tripReport2 = (
    <TripReport
      // eslint-disable-next-line
      role={'quest'}
      name={'Testuria Atest'}
      homeTown={'test'}
      homeCountry={'test'}
      date={'June, 2019, 2 days'}
      text={
        'Lorem met, consectdunt ut labore et doloiam, quis nostrud exo laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
      }
      //text={'Lorem ipsum dolor'}
      likeCount={210}
      liked={true}
    />
  );

  render() {
    return (
      <Section>
        {this.tripReport1}
        {this.tripReport2}
      </Section>
    );
  }
}

export default TripReportList;

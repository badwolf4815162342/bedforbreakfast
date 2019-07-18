import React from 'react';
import { Section } from '../StyledComponents/StyledBasicItems';
import { ProfileBackgroundPaper, ProfileBox, StyledTabMenu, StyledUserDescription } from './ProfileComponentStyle';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_USER_BY_ID = gql`
  query user($userId: String!) {
    user(userId: $userId) {
      _id
      firstName
      lastName
      birthday
      gender
      description
      verified
      homeTown
      homeCountry
      favoriteFood
      likedBy
      dislikedBy
      accommodation {
        isActive
      }
    }
  }
`;

interface UserData {
  user: {
    _id: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    gender: string;
    description: string;
    verified: boolean;
    homeTown: string;
    homeCountry: string;
    favoriteFood: string;
    likedBy: string[];
    dislikedBy: string[];
    isActive: boolean;
  };
}

class ProfileComponent extends React.Component<{}> {
  userID = '5d2f2c78ac366f42ed527388';

  fullGenderLabel(gender: string) {
    switch (gender) {
      case 'm':
        return 'male';
      case 'f':
        return 'female';
      case 'd':
        return 'diverse';
      default:
        return 'not defined';
    }
  }

  render() {
    return (
      <Query<UserData, {}> query={GET_USER_BY_ID} variables={{ userId: this.userID }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error :( Fix me</p>;
          }
          if (!data) {
            return <p>No Data :(</p>;
          }

          console.log(data);
          const user = data.user;
          const gender = this.fullGenderLabel(user.gender);
          const pRating = user.likedBy.length;
          const nRating = user.dislikedBy.length;
          const status = user.isActive ? 'Accepting guests' : 'Not accepting guests';

          return (
            <Section>
              <ProfileBackgroundPaper></ProfileBackgroundPaper>
              <ProfileBox>
                <StyledUserDescription
                  firstName={user.firstName}
                  lastName={user.lastName}
                  birthday={user.birthday}
                  gender={gender}
                  pRating={pRating}
                  nRating={nRating}
                  status={status}
                  description={user.description}
                  verified={user.verified}
                  homeTown={user.homeTown}
                  homeCountry={user.homeCountry}
                  favFood={user.favoriteFood}
                />
                <StyledTabMenu />
              </ProfileBox>
            </Section>
          );
        }}
      </Query>
    );
  }
}
export default ProfileComponent;

import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { USER_ID } from '../constants';
import { Section } from '../StyledComponents/StyledBasicItems';
import { ProfileBackgroundPaper, ProfileBox, StyledTabMenu, StyledUserDescription } from './ProfileComponentStyle';

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
      profilePicture
      dislikedBy {
        firstName
      }
      likedBy {
        firstName
      }
      accommodation {
        _id
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
    profilePicture: string;
    dislikedBy: Array<{ firstName: string }>;
    likedBy: Array<{ firstName: string }>;
    accommodation: {
      _id: string;
      isActive: boolean;
    };
  };
}

class ProfileComponent extends React.Component<{ match: { params: any } }, { userId: string }> {
  loggedUserID = localStorage.getItem(USER_ID);

  constructor(props: any) {
    super(props);
    this.state = {
      userId: '',
    };
  }

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

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    console.log(params);

    this.setState({ userId: params.userId });
  }

  render() {
    const {
      match: { params: userId },
    } = this.props;
    console.log(userId);
    return (
      <Query<UserData, {}> query={GET_USER_BY_ID} variables={userId} fetchPolicy="network-only">
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error :( Fix me! {error.message}</p>;
          }
          if (!data) {
            return <p>No Data :(</p>;
          }

          console.log(data);
          const user = data.user;
          const gender = this.fullGenderLabel(user.gender);
          const pRating = user.likedBy.length;
          const nRating = user.dislikedBy.length;
          const status = user.accommodation
            ? user.accommodation.isActive
              ? 'Accepting guests'
              : 'Not accepting guests'
            : 'Not accepting guests';

          return (
            <Section>
              <ProfileBackgroundPaper></ProfileBackgroundPaper>
              <ProfileBox>
                <StyledUserDescription
                  userId={user._id}
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
                  profilePic={user.profilePicture}
                />
                <StyledTabMenu userId={user._id} userName={user.firstName} />
              </ProfileBox>
            </Section>
          );
        }}
      </Query>
    );
  }
}
export default ProfileComponent;

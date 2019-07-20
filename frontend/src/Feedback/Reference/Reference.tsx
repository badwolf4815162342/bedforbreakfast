import Icon from '@material-ui/core/Icon';
import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';

import { USER_ID } from '../../constants';
import { GridContainerXS, Section } from '../../StyledComponents/StyledBasicItems';
import { MainTheme } from '../../StyledComponents/Theme';
import {
  Description,
  DescriptionIcon,
  Divider,
  IconInText,
  Name,
  ProfilePic,
  ProfilePicBox,
  RatingStyle,
  RatingTitle,
  Verified,
} from './ReferenceStyle';

const USER_BY_ID_QUERY = gql`
  query user($userId: String!) {
    user(userId: $userId) {
      firstName
      lastName
      verified
      profilePicture
    }
  }
`;

interface Data {
  user: { firstName: string; lastName: string; verified: boolean; profilePicture: string };
}

class Reference extends React.Component<{}, {}> {
  // eslint-disable-next-line
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  // handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //   this.setState({ ...this.state, [name]: event.target.checked });
  // };

  // handleChangeTripReport = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //   this.setState({ ...this.state, rating: { ...this.state.rating, [name]: event.target.value } });
  // };

  render() {
    const userId = localStorage.getItem(USER_ID);

    return (
      userId && (
        <Query<Data, {}> query={USER_BY_ID_QUERY} variables={{ userId }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <p>Loading...</p>;
            }
            if (error) {
              return <p>Error.</p>;
            }
            if (data) {
              const { firstName, lastName, profilePicture } = data.user;
              return (
                <Section>
                  <GridContainerXS>
                    <RatingTitle>
                      How was your host {firstName} {lastName[0]}. and his guest room?
                    </RatingTitle>
                    <Divider />
                    <ProfilePicBox>
                      <ProfilePic>
                        {' '}
                        <img
                          src={profilePicture}
                          alt={`${firstName} ${lastName[0]}.`}
                          style={{ width: 185, height: 185, borderRadius: 180 }}
                        />{' '}
                      </ProfilePic>
                    </ProfilePicBox>
                    <Name>
                      {firstName} {lastName[0]}.
                      <Verified>
                        {' '}
                        <Icon>check_circle</Icon>{' '}
                      </Verified>
                    </Name>
                    <RatingStyle>
                      <IconInText>
                        {' '}
                        <Icon>thumb_up</Icon>{' '}
                      </IconInText>{' '}
                      <IconInText>
                        {' '}
                        <Icon>thumb_down</Icon>{' '}
                      </IconInText>{' '}
                    </RatingStyle>

                    <Description
                      multiline
                      label="Your report"
                      defaultValue="Explain your rating."
                      // onChange={this.handleChangeTripReport('description')}
                    />
                    <DescriptionIcon
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 512 600"
                      fill={MainTheme.grey.dark}
                    >
                      <path
                        d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
      c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
      C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
      L27.473,390.597L0.3,512.69z"
                      />
                    </DescriptionIcon>
                  </GridContainerXS>
                </Section>
              );
            }
          }}
        </Query>
      )
    );
  }
}

export default Reference;

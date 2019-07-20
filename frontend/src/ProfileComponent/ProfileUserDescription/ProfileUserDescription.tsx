import Icon from '@material-ui/core/Icon';
import React from 'react';
import Moment from 'react-moment';
import { Section } from '../../StyledComponents/StyledBasicItems';
import {
  Age,
  Description,
  FavoriteFood,
  Hometown,
  IconInText,
  Name,
  ProfileDescription,
  ProfilePic,
  ProfilePicBox,
  Rating,
  Status,
  Verified,
} from './ProfileUserDescriptionStyle';

interface ProfileProps {
  firstName: string;
  lastName: string;
  birthday: Date;
  gender: string;
  pRating: number;
  nRating: number;
  status: string;
  description: string;
  verified: boolean;
  homeTown: string;
  homeCountry: string;
  favFood: string;
  profilePic: string;
}

class ProfileUserDescription extends React.Component<ProfileProps, {}> {
  verified = this.props.verified ? (
    <Verified>
      {' '}
      <Icon>verified_user</Icon>{' '}
    </Verified>
  ) : (
    ''
  );

  render() {
    const profilePic = (
      <img src={this.props.profilePic} style={{ width: 205, height: 205, borderRadius: 180 }} alt="Profile" />
    );
    return (
      <Section>
        <ProfileDescription>
          <ProfilePicBox>
            <ProfilePic> {profilePic} </ProfilePic>
          </ProfilePicBox>
          <Name>
            {this.props.firstName} {this.props.lastName}
            {this.verified}
          </Name>
          <Age>
            <Moment date={this.props.birthday} fromNow ago titleFormat="YY" /> old , {this.props.gender}
          </Age>
          <Rating>
            <IconInText>
              {' '}
              <Icon>thumb_up</Icon>{' '}
            </IconInText>{' '}
            {this.props.pRating}
            <IconInText>
              {' '}
              <Icon>thumb_down</Icon>{' '}
            </IconInText>{' '}
            {this.props.nRating}
          </Rating>
          <Status>
            <IconInText>
              {' '}
              <Icon>play_circle_filled</Icon>{' '}
            </IconInText>
            {this.props.status}
          </Status>
          <Description> {this.props.description}</Description>
          <Hometown>
            <IconInText>
              {' '}
              <Icon>public</Icon>{' '}
            </IconInText>
            From: {this.props.homeTown}, {this.props.homeCountry}
          </Hometown>
          <FavoriteFood>
            <IconInText>
              {' '}
              <Icon>restaurant</Icon>{' '}
            </IconInText>
            Favorite food: {this.props.favFood}
          </FavoriteFood>
        </ProfileDescription>
      </Section>
    );
  }
}

export class User {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  pRating: number;
  nRating: number;
  status: string;
  description: string;
  verified: boolean;
  homeTown: string;
  homeCountry: string;
  favFood: string;
  picture: string;

  constructor(
    firstName: string,
    lastName: string,
    age: string,
    gender: string,
    pRating: number,
    nRating: number,
    status: string,
    description: string,
    verified: boolean,
    homeTown: string,
    homeCountry: string,
    favFood: string,
    picture: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.pRating = pRating;
    this.nRating = nRating;
    this.status = status;
    this.description = description;
    this.verified = verified;
    this.homeTown = homeTown;
    this.homeCountry = homeCountry;
    this.favFood = favFood;
    this.picture = picture;
  }
}

export default ProfileUserDescription;

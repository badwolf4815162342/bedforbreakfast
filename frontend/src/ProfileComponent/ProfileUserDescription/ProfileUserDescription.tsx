
import React from 'react';

import Icon from '@material-ui/core/Icon';
import pic from '../../images/profilePic.jpeg';
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

class ProfileUserDescription extends React.Component<{}> {
  user: User;
  profilePic = <img src={pic} style={{ width: 185, height: 185, borderRadius: 180 }} />;

  constructor(props: any) {
    super(props);
    this.user = new User(
      'Jonathan',
      'Foer',
      '26',
      'male',
      7,
      1,
      'Accepting guests',
      'I am a famous novelist, best known for novels Everything is Illuminated(2002), Extremely Loud Incredibly Close (2005), and for my non-fiction work Eating Animals (2009). My most recent novel, Here I Am, was published in 2016. I teach creative writing at New York University.',
      true,
      'Munich',
      'Germany',
      'Lasagna',
      pic,
    );
  }

  render() {
    return (
      <Section>
        <ProfileDescription>
          <ProfilePicBox>
            <ProfilePic> {this.profilePic} </ProfilePic>
          </ProfilePicBox>
          <Name>
            {this.user.firstName} {this.user.lastName}
            <Verified>
              {' '}
              <Icon>check_circle</Icon>{' '}
            </Verified>
            <Age>
              {this.user.age}, {this.user.gender}
            </Age>
          </Name>
          <Rating>
            <IconInText>
              {' '}
              <Icon>thumb_up</Icon>{' '}
            </IconInText>{' '}
            {this.user.pRating}
            <IconInText>
              {' '}
              <Icon>thumb_down</Icon>{' '}
            </IconInText>{' '}
            {this.user.nRating}
          </Rating>
          <Status>
            <IconInText>
              {' '}
              <Icon>play_circle_filled</Icon>{' '}
            </IconInText>
            {this.user.status}
          </Status>
          <Description> {this.user.description}</Description>
          <Hometown>
            <IconInText>
              {' '}
              <Icon>public</Icon>{' '}
            </IconInText>
            From: {this.user.homeTown}, {this.user.homeCountry}
          </Hometown>
          <FavoriteFood>
            <IconInText>
              {' '}
              <Icon>restaurant</Icon>{' '}
            </IconInText>
            Favorite food: {this.user.favFood}
          </FavoriteFood>
        </ProfileDescription>
      </Section>
    );
  }
}

class User {
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

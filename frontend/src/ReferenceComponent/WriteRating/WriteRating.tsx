import Icon from '@material-ui/core/Icon';
import React from 'react';
import pic from '../../images/profilePic.jpg';
import { GridContainerXS, Section } from '../../StyledComponents/StyledBasicItems';
import { MainTheme } from '../../StyledComponents/Theme';
import {
  Age,
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
} from './WriteRatingStyle';

class WriteRating extends React.Component<{}, { isEnabled: boolean; rating: Rating; user: User }> {
  // eslint-disable-next-line
  profilePic = <img src={pic} style={{ width: 185, height: 185, borderRadius: 180 }} />;

  constructor(props: any) {
    super(props);
    this.state = {
      isEnabled: false,
      rating: new Rating(7, 1, 'some description'),
      user: new User(
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
      ),
    };
  }

  handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  handleChangeTripReport = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, rating: { ...this.state.rating, [name]: event.target.value } });
  };

  render() {
    return (
      <Section>
        <GridContainerXS>
          <RatingTitle>How was your host xxxxxx and his appartment?</RatingTitle>
          <Divider />
          <ProfilePicBox>
            <ProfilePic> {this.profilePic} </ProfilePic>
          </ProfilePicBox>
          <Name>
            {this.state.user.firstName} {this.state.user.lastName}
            <Verified>
              {' '}
              <Icon>check_circle</Icon>{' '}
            </Verified>
            <Age>
              {this.state.user.age}, {this.state.user.gender}
            </Age>
          </Name>
          <RatingStyle>
            <IconInText>
              {' '}
              <Icon>thumb_up</Icon>{' '}
            </IconInText>{' '}
            {this.state.rating.pRating}
            <IconInText>
              {' '}
              <Icon>thumb_down</Icon>{' '}
            </IconInText>{' '}
            {this.state.rating.nRating}
          </RatingStyle>

          <Description
            multiline
            label="Your report"
            defaultValue={this.state.rating.description}
            onChange={this.handleChangeTripReport('description')}
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
}

class Rating {
  pRating: number;
  nRating: number;
  description: string;
  constructor(pRating: number, nRating: number, description: string) {
    this.pRating = pRating;
    this.nRating = nRating;
    this.description = description;
    //TODO: pictures
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

export default WriteRating;

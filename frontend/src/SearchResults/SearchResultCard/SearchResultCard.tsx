import { Icon } from '@material-ui/core';
import React from 'react';
import { Accommodation } from './../LoadSearch';
import {
  AccommodationDescription,
  AccommodationImage,
  AccommodationImageContainer,
  AccommodationTitle,
  AccommodationTreats,
  BorderNoSeparator,
  BoxSeparatorRight,
  CardResult,
  HostDescription,
  HostImage,
  HostImageBox,
  HostImageContainer,
  HostName,
  HostTreats,
  IconInText,
  Rating,
  RatingContainer,
} from './SearchResultCardStyle';

interface CardProps {
  accommodation: Accommodation;
}

interface CardState {}
class SearchResultCard extends React.Component<CardProps, CardState> {
  profilePic = (
    <img
      src={this.props.accommodation.user.profilePicture}
      style={{ width: 185, height: 185, borderRadius: 180 }}
      alt="Profile"
    />
  );

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <CardResult>
        <AccommodationImageContainer>
          <AccommodationImage
            src={
              this.props.accommodation.pictures
                ? this.props.accommodation.pictures[0]
                : 'https://techcrunch.com/wp-content/uploads/2019/03/blueground-apartment-2-2-2.jpg?w=730&crop=1'
            }
          />
        </AccommodationImageContainer>
        <BoxSeparatorRight>
          <AccommodationTitle>Description:</AccommodationTitle>
          <AccommodationDescription>{this.props.accommodation.description}</AccommodationDescription>
          <AccommodationTreats>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 14">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
              </svg>{' '}
              {this.props.accommodation.numberOfBeds}x available beds
            </p>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 20">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>{' '}
              {this.props.accommodation.district}
            </p>
          </AccommodationTreats>
        </BoxSeparatorRight>
        <HostImageContainer>
          <HostImageBox>
            <HostImage>{this.profilePic}</HostImage>
          </HostImageBox>
          <RatingContainer>
            <Rating>
              <IconInText>
                {' '}
                <Icon>thumb_up</Icon>{' '}
              </IconInText>{' '}
              {this.props.accommodation.user.likedBy.length}
              <IconInText>
                {' '}
                <Icon>thumb_down</Icon>{' '}
              </IconInText>{' '}
              {this.props.accommodation.user.dislikedBy.length}
            </Rating>
          </RatingContainer>
        </HostImageContainer>
        <BorderNoSeparator>
          <HostName>
            {this.props.accommodation.user.firstName} {this.props.accommodation.user.lastName}
          </HostName>
          <HostDescription>{this.props.accommodation.user.description}</HostDescription>
          <HostTreats>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 14">
                <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
                <path fill="none" d="M0 0h24v24H0z" />
              </svg>{' '}
              {this.props.accommodation.user.favoriteFood}
            </p>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 20">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>{' '}
              {this.props.accommodation.user.homeCountry}, {this.props.accommodation.user.homeCountry}
            </p>
          </HostTreats>
        </BorderNoSeparator>
      </CardResult>
    );
  }
}

export default SearchResultCard;

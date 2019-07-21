import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { USER_ID } from '../../../constants';
import SimpleSlider from '../../../StyledComponents/ImageSlider/ImageSlider';
import {
  AccommodationInProfileCard,
  CreateAccommodationBox,
  CreateAccommodationButton,
  Description,
  DescriptionPaper,
  ImagesCarousel,
  InfoLabel,
  Location,
  NoAccommodationLabel,
} from './AccommodationCardStyle';

const GET_ACCOMMODATION_BY_USER_ID = gql`
  query user($userId: String!) {
    user(userId: $userId) {
      _id
      accommodation {
        _id
        isActive
        country
        city
        streetName
        streetNumber
        zipCode
        description
        district
        numberOfBeds
        pictures
      }
    }
  }
`;

interface AccommodationData {
  user: {
    _id: string;
    accommodation: {
      _id: string;
      isActive: boolean;
      country: string;
      city: string;
      streetName: string;
      streetNumber: string;
      zipCode: string;
      description: string;
      district: string;
      numberOfBeds: number;
      pictures: string[];
    };
  };
}

class AccommodationCard extends React.Component<{ userId: string }> {
  render() {
    const loggedUserID = localStorage.getItem(USER_ID);
    const isThisMe = loggedUserID === this.props.userId;
    return (
      <Query<AccommodationData, {}> query={GET_ACCOMMODATION_BY_USER_ID} variables={{ userId: this.props.userId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error :( Fix me {error.message}</p>;
          }
          if (data && !data.user.accommodation && loggedUserID && isThisMe) {
            return (
              <CreateAccommodationBox>
                <CreateAccommodationButton variant="contained" color="secondary">
                  create accommodation
                </CreateAccommodationButton>
              </CreateAccommodationBox>
            );
          }
          if (!data || !data.user.accommodation) {
            return <NoAccommodationLabel>User doesn't offer accommodation </NoAccommodationLabel>;
          }
          const accommodation = data.user.accommodation;
          return (
            <AccommodationInProfileCard>
              <Location>
                Location: {accommodation.district} , {accommodation.city} , {accommodation.country}
              </Location>
              <ImagesCarousel>
                <SimpleSlider height={240} images={accommodation.pictures} />
              </ImagesCarousel>
              <InfoLabel> Number of beds: {accommodation.numberOfBeds} </InfoLabel>
              <DescriptionPaper>
                <Description>{accommodation.description}</Description>
              </DescriptionPaper>
            </AccommodationInProfileCard>
          );
        }}
      </Query>
    );
  }
}

export default AccommodationCard;

import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { USER_ID } from '../../../constants';
import SimpleSlider from '../../../StyledComponents/ImageSlider/ImageSlider';
import {
  AccommodationInProfileCard,
  Description,
  DescriptionPaper,
  ImagesCarousel,
  InfoLabel,
  Location,
  NoAccommodationLabel,
} from './AccommodationCardStyle';

const ACCOMMODATION_BY_ID = gql`
  query accommodationById($_id: ObjectId!) {
    accommodationById(_id: $_id) {
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
`;

interface AccommodationData {
  accommodationById: {
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
}

class AccommodationCard extends React.Component<{ userId: string; accommodationId: string }> {
  render() {
    const loggedUserID = localStorage.getItem(USER_ID);
    const isThisMe = loggedUserID === this.props.userId;

    return (
      <Query<AccommodationData, {}> query={ACCOMMODATION_BY_ID} variables={{ _id: this.props.accommodationId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error :( Fix me {error.message}</p>;
          }
          if (!data && loggedUserID && isThisMe) {
            return <NoAccommodationLabel>Create accommodation </NoAccommodationLabel>;
          }
          if (!data) {
            return <NoAccommodationLabel>User doesn't offer accommodation </NoAccommodationLabel>;
          }
          const accommodation = data.accommodationById;
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

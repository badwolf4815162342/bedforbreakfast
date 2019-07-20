import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import Accommodation from './Accommodation';
import CreateAccommodation from './CreateAccommodation';

const ACCOMMODATION_BY_ID = gql`
  query accommodationById($_id: String!) {
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

interface AccommodationLoadProps {}

interface AccommodationLoadState {
  accommodationId: string;
}

class AccommodationLoad extends React.Component<AccommodationLoadProps, AccommodationLoadState> {
  constructor(props: any) {
    super(props);
    this.state = {
      accommodationId: '5d2d9ef2c4615536f8829687',
    };
  }

  render() {
    return (
      <div>
        <p>{this.state.accommodationId}</p>
        <Query<Data, {}> query={ACCOMMODATION_BY_ID} variables={{ _id: this.state.accommodationId }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <p>Loading...</p>;
            }
            if (error) {
              return <p>Error :(</p>;
            }
            if (!data) {
              return <p>No Data :(</p>;
            }

            console.log(data);
            const accommodation = data.accommodationById;
            return (
              <div>
                <CreateAccommodation
                  accommodation={
                    new Accommodation(
                      accommodation._id,
                      accommodation.isActive,
                      accommodation.country,
                      accommodation.streetName,
                      accommodation.streetNumber,
                      accommodation.zipCode,
                      accommodation.city,
                      accommodation.description,
                      accommodation.district,
                      accommodation.numberOfBeds,
                      accommodation.pictures,
                    )
                  }
                />
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

interface Data {
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

export default AccommodationLoad;

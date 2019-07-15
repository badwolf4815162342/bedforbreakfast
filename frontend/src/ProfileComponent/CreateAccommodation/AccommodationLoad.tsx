import { gql } from 'apollo-boost';
import React from 'react';
import { Query } from 'react-apollo';
import Accommodation from './Accommodation';
import CreateAccommodation from './CreateAccommodation';

const ACCOMMODATION_BY_ID = gql`
  query accommodationById($_id: String!) {
    accommodationById(_id: $_id) {
      _id
      country
      city
      streetName
      streetNumber
      zipCode
      description
      numberOfBeds
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
      accommodationId: '5d2a0613e009d1c937f77293',
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
            // {_id, streetName} = data.accommidationById;
            return (
              <div>
                <CreateAccommodation
                  accommodation={
                    new Accommodation(
                      accommodation._id,
                      accommodation.country,
                      accommodation.streetName,
                      accommodation.streetNumber,
                      accommodation.zipCode,
                      accommodation.city,
                      accommodation.description,
                      accommodation.numberOfBeds,
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
    country: string;
    city: string;
    streetName: string;
    streetNumber: string;
    zipCode: string;
    description: string;
    numberOfBeds: number;
  };
}

export default AccommodationLoad;

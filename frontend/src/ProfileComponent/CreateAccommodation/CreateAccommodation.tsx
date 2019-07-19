import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { GridContainerXS, Section, SubmitButton } from '../../StyledComponents/StyledBasicItems';
import { MainTheme } from '../../StyledComponents/Theme';
import Accommodation from './Accommodation';
import {
  AccommodationTitle,
  AddressSubtitle,
  CityName,
  CityNameIcon,
  Country,
  CountryIcon,
  Description,
  DescriptionIcon,
  District,
  Divider,
  EnableSelector,
  EnableText,
  GeneralSubtitle,
  NrBedsIcon,
  NrBedsSelector,
  NrBedsText,
  StreetName,
  StreetNumber,
  StreetNumberIcon,
  SubmitArea,
  ZipCode,
} from './CreateAccommodationStyle';

const ALTER_ACCOMMODATION_MUTATION = gql`
  mutation alterAccommodation(
    $_id: String
    $isActive: Boolean!
    $country: String!
    $city: String!
    $streetName: String!
    $streetNumber: String!
    $zipCode: String!
    $description: String
    $district: String
    $numberOfBeds: Float!
    $pictures: [String]
  ) {
    alterAccommodation(
      accommodationDto: {
        _id: $_id
        isActive: $isActive
        country: $country
        city: $city
        streetName: $streetName
        streetNumber: $streetNumber
        zipCode: $zipCode
        description: $description
        district: $district
        numberOfBeds: $numberOfBeds
        pictures: $pictures
      }
    ) {
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

interface CreateAccommodationProps {
  accommodation: Accommodation;
}

interface CreateAccommodationState {
  accommodation: Accommodation;
}
class CreateAccommodation extends React.Component<CreateAccommodationProps, CreateAccommodationState> {
  constructor(props: any) {
    super(props);
    this.state = {
      accommodation:
        props.accommodation != null
          ? props.accommodation
          : new Accommodation(undefined, false, '', '', '', '', '', '', '', 0, [
              'https://miro.medium.com/max/244/1*JVFm_pqNLKi4sobJzicbww.png',
            ]),
    };
  }

  handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  handleChangeAccommodation = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'isActive') {
      if (event.target.value.length > 0) {
        try {
          const isActive = !this.state.accommodation.isActive;
          this.setState({
            ...this.state,
            accommodation: { ...this.state.accommodation, [name]: isActive },
          });
        } catch (error) {
          console.log('Number of beds was not a number');
        }
      }
    } else if (name === 'numberOfBeds') {
      if (event.target.value.length > 0) {
        try {
          const nrBeds = parseInt(event.target.value, 10);
          this.setState({
            ...this.state,
            accommodation: { ...this.state.accommodation, [name]: nrBeds },
          });
        } catch (error) {
          console.log('Number of beds was not a number');
        }
      }
    } else {
      this.setState({ ...this.state, accommodation: { ...this.state.accommodation, [name]: event.target.value } });
    }
  };

  render() {
    return (
      <Section>
        <GridContainerXS>
          <AccommodationTitle>Create an accommodation here</AccommodationTitle>
          <Divider />
          <GeneralSubtitle>General information</GeneralSubtitle>
          <Tooltip
            title="This will make your accommodation appear/disappear in a list when people are searching for accommodations in your area"
            placement="bottom-start"
          >
            <EnableText>Make your apartment visible for others</EnableText>
          </Tooltip>
          <EnableSelector
            checked={this.state.accommodation.isActive}
            onChange={this.handleChangeAccommodation('isActive')}
            value="isActive"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <NrBedsText>Specify how many beds are available for guests</NrBedsText>
          <NrBedsSelector
            type="number"
            required
            id="standard-required"
            label="Nr. beds"
            defaultValue={this.state.accommodation.numberOfBeds}
            onChange={this.handleChangeAccommodation('numberOfBeds')}
          />
          <NrBedsIcon
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={MainTheme.grey.dark}
          >
            <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
          </NrBedsIcon>
          <Description
            multiline
            label="Description of your accommodation"
            defaultValue={this.state.accommodation.description}
            onChange={this.handleChangeAccommodation('description')}
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
          <Tooltip
            title="The address will not be publicly shared, but is necessary to for the search functionality"
            placement="bottom-start"
          >
            <AddressSubtitle>Address </AddressSubtitle>
          </Tooltip>
          <StreetName
            required
            id="standard-required"
            label="Street name"
            defaultValue={this.state.accommodation.streetName}
            onChange={this.handleChangeAccommodation('streetName')}
          />
          <StreetNumber
            required
            id="standard-required"
            label="Street number"
            defaultValue={this.state.accommodation.streetNumber}
            onChange={this.handleChangeAccommodation('streetNumber')}
          />
          <StreetNumberIcon
            width="24"
            height="24"
            viewBox="0 0 512 600"
            xmlns="http://www.w3.org/2000/svg"
            fill={MainTheme.grey.dark}
          >
            <path d="m204.5 458.605469v51.855469l-12.539062-10.128907c-1.9375-1.566406-48.035157-38.992187-94.78125-92.660156-64.484376-74.035156-97.179688-140.492187-97.179688-197.519531v-5.652344c0-112.761719 91.738281-204.5 204.5-204.5s204.5 91.738281 204.5 204.5v5.652344c0 4.789062-.253906 9.652344-.714844 14.574218l-39.992187-36.484374c-8.191407-83.15625-78.519531-148.339844-163.792969-148.339844-90.757812 0-164.597656 73.839844-164.597656 164.597656v5.652344c0 96.367187 124.164062 213.027344 164.597656 248.453125zm122.699219-28.660157h59.851562v-59.851562h-59.851562zm-122.699219-310.238281c46.753906 0 84.792969 38.039063 84.792969 84.792969s-38.039063 84.792969-84.792969 84.792969-84.792969-38.039063-84.792969-84.792969 38.039063-84.792969 84.792969-84.792969zm0 39.902344c-24.753906 0-44.890625 20.136719-44.890625 44.890625 0 24.75 20.136719 44.890625 44.890625 44.890625 24.75 0 44.890625-20.140625 44.890625-44.890625 0-24.753906-20.140625-44.890625-44.890625-44.890625zm280.609375 243.222656-11.21875-10.234375v64.058594c0 29.828125-24.269531 54.09375-54.097656 54.09375h-126.332031c-29.828126 0-54.097657-24.265625-54.097657-54.09375v-64.058594l-11.21875 10.234375-26.890625-29.476562 155.371094-141.746094 155.375 141.746094zm-51.121094-46.636719-77.363281-70.574218-77.359375 70.574218v100.457032c0 7.828125 6.367187 14.195312 14.195313 14.195312h126.332031c7.828125 0 14.195312-6.367187 14.195312-14.195312zm0 0" />
          </StreetNumberIcon>
          <ZipCode
            required
            id="standard-required"
            label="ZIP-code"
            defaultValue={this.state.accommodation.zipCode}
            onChange={this.handleChangeAccommodation('zipCode')}
          />
          <District
            id="standard-required"
            label="District"
            defaultValue={this.state.accommodation.district}
            onChange={this.handleChangeAccommodation('district')}
          />
          <CityName
            required
            id="standard-required"
            label="City"
            defaultValue={this.state.accommodation.city}
            onChange={this.handleChangeAccommodation('city')}
          />
          <CityNameIcon
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={MainTheme.grey.dark}
          >
            <path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </CityNameIcon>

          <Country
            required
            id="standard-required"
            label="Country"
            defaultValue={this.state.accommodation.country}
            onChange={this.handleChangeAccommodation('country')}
          />
          <CountryIcon
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={MainTheme.grey.dark}
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"></path>
          </CountryIcon>
          <SubmitArea>
            <Mutation mutation={ALTER_ACCOMMODATION_MUTATION}>
              {(
                createAccommodation: (arg0: {
                  variables: {
                    _id: string | undefined;
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
                }) => void,
                { data }: any,
              ) => (
                <div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();

                      createAccommodation({
                        variables: {
                          _id: this.state.accommodation._id,
                          isActive: this.state.accommodation.isActive,
                          country: this.state.accommodation.country,
                          city: this.state.accommodation.city,
                          streetName: this.state.accommodation.streetName,
                          streetNumber: this.state.accommodation.streetNumber,
                          zipCode: this.state.accommodation.zipCode,
                          description: this.state.accommodation.description,
                          district: this.state.accommodation.district,
                          numberOfBeds: this.state.accommodation.numberOfBeds,
                          pictures: this.state.accommodation.pictures,
                        },
                      });
                    }}
                  >
                    <SubmitButton variant="contained" color="primary" type="submit">
                      Submit
                    </SubmitButton>
                  </form>
                </div>
              )}
            </Mutation>
          </SubmitArea>
        </GridContainerXS>
      </Section>
    );
  }
}

export default CreateAccommodation;

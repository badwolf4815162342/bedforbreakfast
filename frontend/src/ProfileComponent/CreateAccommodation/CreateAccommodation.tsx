import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { Section } from '../../StyledComponents/StyledBasicItems';
import { MainTheme } from '../../StyledComponents/Theme';
import {
  AccommodationGrid,
  AccommodationTitle,
  CityName,
  Divider,
  EnableSelector,
  EnableText,
  NrBedsIcon,
  NrBedsSelector,
  NrBedsText,
  StreetName,
  StreetNumber,
  Subtitle,
  ZipCode,
} from './CreateAccommodationStyle';

class CreateAccommodation extends React.Component<{}, { isEnabled: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      isEnabled: false,
    };
  }

  handleSwitchChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  render() {
    return (
      <Section>
        <AccommodationGrid>
          <AccommodationTitle>Create an accommodation here!</AccommodationTitle>
          <Divider />
          <Tooltip
            title="This will make your accommodation appear/disappear in a list when people are searching for accommodations in your area"
            placement="bottom-start"
          >
            <EnableText>Make your apartment visible for others</EnableText>
          </Tooltip>
          <EnableSelector
            checked={this.state.isEnabled}
            onChange={this.handleSwitchChange('isEnabled')}
            value="isEnabled"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          <NrBedsText>
            Specify how many beds are available for guests
          </NrBedsText>
          <NrBedsSelector />
          <NrBedsIcon
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={MainTheme.grey.dark}
          >
            <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />{' '}
          </NrBedsIcon>
          <Tooltip
            title="The address will not be publicly shared, but is necessary to for the search functionality"
            placement="bottom-start"
          >
            <Subtitle>Address </Subtitle>
          </Tooltip>
          <StreetName
            required
            id="standard-required"
            label="Street name"
            margin="normal"
          />
          <StreetNumber
            required
            id="standard-required"
            label="Street name"
            margin="normal"
          />
          <ZipCode
            required
            id="standard-required"
            label="ZIP-code"
            margin="normal"
          />
          <CityName
            required
            id="standard-required"
            label="City"
            margin="normal"
          />
        </AccommodationGrid>
      </Section>
    );
  }
}

export default CreateAccommodation;

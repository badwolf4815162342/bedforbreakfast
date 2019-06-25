import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import {
  Section,
  StyledSubtitle,
} from '../../StyledComponents/StyledBasicItems';
import {
  AccommodationGrid,
  AccommodationTitle,
  EnableSelector,
  EnableText,
  StreetName,
  StreetNumber,
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
          <Tooltip
            title="This will make your apartment appear/disappear in a list when people are searching for accommodations in your area"
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
          <StyledSubtitle>Address</StyledSubtitle>
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
        </AccommodationGrid>
      </Section>
    );
  }
}

export default CreateAccommodation;

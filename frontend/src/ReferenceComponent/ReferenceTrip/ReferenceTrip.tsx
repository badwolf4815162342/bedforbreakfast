import React from 'react';

import { GridContainerXS, Section } from '../../StyledComponents/StyledBasicItems';
import { MainTheme } from '../../StyledComponents/Theme';
import { Description, DescriptionIcon, Divider, TripReportTitle } from './ReferenceTripStyle';

class ReferenceTrip extends React.Component<{}, { isEnabled: boolean; tripReport: TripReport }> {
  constructor(props: any) {
    super(props);
    this.state = {
      isEnabled: false,
      tripReport: new TripReport('some description'),
    };
  }

  handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  handleChangeTripReport = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, tripReport: { ...this.state.tripReport, [name]: event.target.value } });
  };

  render() {
    return (
      <Section>
        <GridContainerXS>
          <TripReportTitle>Can you tell some stories about your trip?</TripReportTitle>
          <Divider />
          <Description
            multiline
            label="Your report"
            defaultValue={this.state.tripReport.description}
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

class TripReport {
  description: string;
  constructor(description: string) {
    this.description = description;
    //TODO: pictures
  }
}

export default ReferenceTrip;

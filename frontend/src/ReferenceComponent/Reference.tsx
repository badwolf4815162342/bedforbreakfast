import React from 'react';

import ReferenceTrip from './ReferenceTrip/ReferenceTrip';
import WriteRating from './WriteRating/WriteRating';
import { Section } from '../StyledComponents/StyledBasicItems';
import { ReferenceTitle } from './ReferenceStyle';

class Reference extends React.Component<{}, { isEnabled: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      isEnabled: false,
    };
  }

  handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  render() {
    return (
      <Section>
        <ReferenceTitle>How was your trip to xxx from x to x?</ReferenceTitle>
        <WriteRating />
        <ReferenceTrip />
      </Section>
    );
  }
}

export default Reference;

import React from 'react';

import { Section } from '../StyledComponents/StyledBasicItems';
import { ReferenceTitle } from './FeedbackStyle';
import Reference from './Reference/Reference';
// import WriteRating from './WriteRating/WriteRating';

class Feedback extends React.Component<{}, {}> {
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
        {/* <WriteRating /> */}
        <Reference />
      </Section>
    );
  }
}

export default Feedback;

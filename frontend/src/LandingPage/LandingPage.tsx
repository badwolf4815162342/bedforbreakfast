import React from 'react';
import { Link } from 'react-router-dom';

import { Title } from '../StyledComponents/StyledBasicItems';

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <Title>Welcome to BedForBreakfast</Title>
        <Link to={'createAccommodation'}>Create an accommodation here</Link>
        <br></br>
        <Link to={'createReference'}>Create a reference here</Link>
      </div>
    );
  }
}

export default LandingPage;

import React from 'react';
import { Link } from 'react-router-dom';

import { AccommodationList } from '../AccommodationListComponent/AccommodationListComponent';
import { Title } from '../StyledComponents/StyledBasicItems';

class LandingPage extends React.Component {
  /* constructor(props: any) {
    super(props);
  } */

  render() {
    return (
      <div>
        <Title>Welcome to BedForBreakfast</Title>
        <Link to={'createAccommodation'}>Create an accommodation here</Link>
        <AccommodationList></AccommodationList>
      </div>
    );
  }
}

export default LandingPage;

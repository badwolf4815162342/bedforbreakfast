import React from 'react';
import { Link } from 'react-router-dom';
import { AccommodationList } from '../AccommodationListComponent/AccommodationListComponent';
import { StyledTitle } from '../StyledComponents/StyledBasicItems';

class LandingPage extends React.Component {
  /* constructor(props: any) {
    super(props);
  } */

  render() {
    return (
      <div>
        <StyledTitle>Welcome to BedForBreakfast</StyledTitle>
        <Link to={'createAccommodation'}>Create an accommodation here</Link>
        <AccommodationList></AccommodationList>
      </div>
    );
  }
}

export default LandingPage;

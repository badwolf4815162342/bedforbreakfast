import React from 'react';
import { Link } from 'react-router-dom';
import { StyledTitle } from '../../StyledComponents/StyledBasicItems';

class CreateAccommodation extends React.Component {
  /* constructor(props: any) {
    super(props);
  } */

  render() {
    return (
      <div>
        <StyledTitle>Create an accommodation here!</StyledTitle>
        <Link to={'/'}>Back to the landing page</Link>
      </div>
    );
  }
}

export default CreateAccommodation;

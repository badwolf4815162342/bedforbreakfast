import React from 'react';
import { Link } from 'react-router-dom';

class CreateAccommodation extends React.Component {
  /* constructor(props: any) {
    super(props);
  } */

  render() {
    return (
      <div>
        <h1>Create an accommodation here!</h1>
        <Link to={'/'}>Back to the landing page</Link>
      </div>
    );
  }
}

export default CreateAccommodation;

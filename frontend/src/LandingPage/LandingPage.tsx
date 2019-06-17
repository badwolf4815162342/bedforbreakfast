import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

class LandingPage extends React.Component {
  /* constructor(props: any) {
    super(props);
  } */

  Title = styled.h1`
    font-size: 1.5em;
    color: #7986cb;
  `;

  render() {
    return (
      <div>
        <this.Title>Welcome to BedForBreakfast</this.Title>
        <Link to={'createAccommodation'}>Create an accommodation here</Link>
      </div>
    );
  }
}

export default LandingPage;

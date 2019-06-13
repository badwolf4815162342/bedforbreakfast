import React from "react";
import { withRouter, Link } from "react-router-dom";

class LandingPage extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Welcome to BedForBreakfast</h1>
        <Link to={"createAccommodation"}>Create an accommodation here</Link>
      </div>
    );
  }
}

export default LandingPage;

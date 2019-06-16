import React from 'react';

class Footer extends React.Component {
  /* constructor(props: any) {
    super(props);
  } */

  styleBox = {
    width: '100%',
    paddingTop: '30px',
    paddingBottom: '30px',
    backgroundColor: 'lightgrey',
    color: 'darkgrey',
    textAlign: 'center' as 'center',
    marginTop: '30px',
  };

  render() {
    return (
      <div style={this.styleBox}>
        <b>
          <a href="/">Legal details</a> • <a href="/">Contact</a>
        </b>
      </div>
    );
  }
}

export default Footer;

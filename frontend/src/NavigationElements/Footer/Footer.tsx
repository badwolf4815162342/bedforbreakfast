import React from 'react';

class Footer extends React.Component {
  /* constructor(props: any) {
    super(props);
  } */

  styleBox = {
    width: '100%',
    'padding-top': '30px',
    'padding-bottom': '30px',
    backgroundColor: 'lightgrey',
    color: 'darkgrey',
    'text-align': 'center',
    'margin-top': '30px',
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

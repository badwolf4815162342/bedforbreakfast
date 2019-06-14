import React from 'react';

class Footer extends React.Component {
  /* constructor(props: any) {
    super(props);
  } */

  styles = {
    width: '100%',
    height: '30px',
    backgroundColor: '#7986cb',
  };

  render() {
    return (
      <div style={this.styles}>
        <p>This is our footer</p>
      </div>
    );
  }
}

export default Footer;

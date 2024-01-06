import React, { Component } from 'react';

class FooterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const whiteBackground = {
      background: 'white',
    };

    const itemColor = {
      color: '#2E8B57',  
      fontWeight: 'bold',
    };

    const footerStyle = {
      ...whiteBackground,
      padding: '10px',
      textAlign: 'center',
      marginTop: '20px',
    };

    return (
      <div>
        <footer className="footer" style={footerStyle}>
          <span className="text-muted" style={itemColor}>
            Puskesmas_Farihatu
          </span>
        </footer>
      </div>
    );
  }
}

export default FooterComponent;

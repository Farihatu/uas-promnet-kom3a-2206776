import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const greenBackgroundWithShadow = {
      background: 'linear-gradient(to right, #2E8B57, #4CAF50)',
      borderRadius: '5px', 
      padding: '5px', 
      marginBottom: '20px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
    };

    const uniqueBoldFont = {
      fontFamily: 'YourUniqueFont', 
      fontWeight: 'bold',
    };

    const normalFont = {
    };

    return (
      <div>
        <header>
          <div className="container" style={greenBackgroundWithShadow}>
            <nav className="navbar navbar-dark">
              <div>
                <Link to="/patients" className="navbar-brand" style={uniqueBoldFont}>
                  PUSKESMAS
                </Link>
              </div>
              <div>
                <Link to="/add-patient/_add" className="btn btn-success" style={{ ...greenBackgroundWithShadow, ...normalFont, color: 'white', marginRight: '10px' }}>
                  Tambah Pasien
                </Link>
              </div>
            </nav>
          </div>
        </header>
      </div>
    );
  }
}

export default HeaderComponent;

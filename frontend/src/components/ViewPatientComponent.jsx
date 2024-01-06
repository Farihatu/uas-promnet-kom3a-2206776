import React, { Component } from 'react';
import PatientService from '../services/PatientService';

class ViewPatientComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      patient: {},
    };
  }

  componentDidMount() {
    PatientService.getPatientById(this.state.id).then((res) => {
      this.setState({ patient: res.data });
    });
  }

  render() {
    return (
      <div className="container">
        <br />
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center text-success" style={{ fontFamily: 'YourUniqueFont, cursive', fontWeight: 'bold' }}>
            Informasi Pasien
          </h3>
          <div className="card-body">
            <table className="table">
              <tbody>
                <tr>
                  <td><strong>Nama:</strong></td>
                  <td>{this.state.patient.nama}</td>
                </tr>
                <tr>
                  <td><strong>Usia:</strong></td>
                  <td>{this.state.patient.usia}</td>
                </tr>
                <tr>
                  <td><strong>Jenis Kelamin:</strong></td>
                  <td>{this.state.patient.jenis_kelamin}</td>
                </tr>
                <tr>
                  <td><strong>Alamat:</strong></td>
                  <td>{this.state.patient.alamat}</td>
                </tr>
                <tr>
                  <td><strong>Deskripsi:</strong></td>
                  <td>{this.state.patient.deskripsi}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewPatientComponent;

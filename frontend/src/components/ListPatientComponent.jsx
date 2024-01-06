import React, { Component } from 'react';
import PatientService from '../services/PatientService';

class ListPatientComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patients: [],
    };

    this.deletePatient = this.deletePatient.bind(this);
    this.viewPatient = this.viewPatient.bind(this);
  }

  componentDidMount() {
    PatientService.getPatients().then((res) => {
      if (res.data == null) {
        this.props.history.push('/add-patient/_add');
      }
      this.setState({ patients: res.data });
    });
  }

  deletePatient(id) {
    PatientService.deletePatient(id).then((res) => {
      this.setState({
        patients: this.state.patients.filter((patient) => patient.id !== id),
      });
    });
  }

  viewPatient(id) {
    this.props.history.push(`/view-patient/${id}`);
  }

  render() {
    return (
      <div className="container mt-4 p-4" style={{ background: '#FFFFFF', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', border: '1px solid #4CAF50' }}>
        <h1 className="text-center" style={{ color: '#4CAF50', fontWeight: 'bold', fontFamily: 'Quicksand, sans-serif' }}>
          Data Pasien
        </h1>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th style={{ backgroundColor: '#4CAF50', color: 'white' }}>Nama</th>
                <th style={{ backgroundColor: '#4CAF50', color: 'white' }}>Usia</th>
                <th style={{ backgroundColor: '#4CAF50', color: 'white' }}>Jenis Kelamin</th>
                <th style={{ backgroundColor: '#4CAF50', color: 'white' }}>Alamat</th>
                <th style={{ backgroundColor: '#4CAF50', color: 'white' }}>Deskripsi</th>
                <th style={{ backgroundColor: '#4CAF50', color: 'white' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.patients.map((patient) => (
                <tr key={patient.id}>
                  <td style={{ backgroundColor: '#E3F2FD' }}>{patient.nama}</td>
                  <td style={{ backgroundColor: '#E3F2FD' }}>{patient.usia}</td>
                  <td style={{ backgroundColor: '#E3F2FD' }}>{patient.jenis_kelamin}</td>
                  <td style={{ backgroundColor: '#E3F2FD' }}>{patient.alamat}</td>
                  <td style={{ backgroundColor: '#E3F2FD' }}>{patient.deskripsi}</td>
                  <td>
                    <button
                      onClick={() => this.props.history.push(`/add-patient/${patient.id}`)}
                      className="btn btn-info"
                      style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: '5px' }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => this.deletePatient(patient.id)}
                      className="btn btn-danger"
                      style={{ backgroundColor: '#FF5252', color: 'white', marginRight: '5px' }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => this.viewPatient(patient.id)}
                      className="btn btn-info"
                      style={{ backgroundColor: '#4CAF50', color: 'white' }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListPatientComponent;

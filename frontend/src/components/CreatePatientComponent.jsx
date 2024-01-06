import React, { Component } from "react";
import PatientService from "../services/PatientService";

class CreatePatientComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      nama: "",
      usia: "",
      jenis_kelamin: "",
      alamat: "",
      deskripsi: "",
    };

    this.changeNama = this.changeNama.bind(this);
    this.changeUsia = this.changeUsia.bind(this);
    this.incrementUsia = this.incrementUsia.bind(this);
    this.decrementUsia = this.decrementUsia.bind(this);
    this.changeJenisKelamin = this.changeJenisKelamin.bind(this);
    this.changeAlamat = this.changeAlamat.bind(this);
    this.changeDeskripsi = this.changeDeskripsi.bind(this);
    this.saveOrUpdatePatient = this.saveOrUpdatePatient.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    if (this.state.id !== "_add") {
      PatientService.getPatientById(this.state.id).then((res) => {
        let patient = res.data;
        this.setState({
          nama: patient.nama,
          usia: patient.usia,
          jenis_kelamin: patient.jenis_kelamin,
          alamat: patient.alamat,
          deskripsi: patient.deskripsi,
        });
      });
    }
  }

  saveOrUpdatePatient = async (e) => {
    e.preventDefault();
    let patient = {
      nama: this.state.nama,
      usia: this.state.usia,
      jenis_kelamin: this.state.jenis_kelamin,
      alamat: this.state.alamat,
      deskripsi: this.state.deskripsi,
    };

    try {
      if (this.state.id === "_add") {
        const response = await PatientService.createPatient(patient);
        console.log("Pasien berhasil ditambahkan:", response.data);

        this.setState({
          id: response.data.id, 
        });

        alert("Pasien berhasil ditambahkan ke database!");
      } else {
        await PatientService.updatePatient(patient, this.state.id);
        console.log("Pasien berhasil diperbarui");

        alert("Pasien berhasil diperbarui!");
      }

      this.props.history.push("/patients");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  changeNama = (event) => {
    this.setState({ nama: event.target.value });
  };

  changeUsia = (event) => {
    this.setState({ usia: event.target.value });
  };

  incrementUsia = () => {
    this.setState((prevState) => ({
      usia: Number(prevState.usia) + 1,
    }));
  };

  decrementUsia = () => {
    this.setState((prevState) => ({
      usia: Number(prevState.usia) - 1,
    }));
  };

  changeJenisKelamin = (event) => {
    this.setState({ jenis_kelamin: event.target.value });
  };

  changeAlamat = (event) => {
    this.setState({ alamat: event.target.value });
  };

  changeDeskripsi = (event) => {
    this.setState({ deskripsi: event.target.value });
  };

  cancel() {
    this.props.history.push("/patients");
  }

  getTitle() {
    const titleStyle = {
      fontFamily: "YourUniqueFont, cursive",
      fontWeight: "bold",
      color: "#4CAF50",
    };

    return this.state.id === "_add" ? (
      <h3 className="text-center" style={titleStyle}>
        Tambah Pasien
      </h3>
    ) : (
      <h3 className="text-center" style={titleStyle}>
        Perbarui Pasien
      </h3>
    );
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Nama: </label>
                    <input
                      placeholder="Nama"
                      name="nama"
                      className="form-control"
                      value={this.state.nama}
                      onChange={this.changeNama}
                    />
                  </div>
                  <div className="form-group">
                    <label> Usia: </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={this.decrementUsia}
                        >
                          -
                        </button>
                      </div>
                      <input
                        type="number"
                        placeholder="Usia"
                        name="usia"
                        className="form-control"
                        value={this.state.usia}
                        onChange={this.changeUsia}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={this.incrementUsia}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label> Jenis Kelamin: </label>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="laki-laki"
                        name="jenis_kelamin"
                        className="form-check-input"
                        value="L"
                        checked={this.state.jenis_kelamin === "L"}
                        onChange={this.changeJenisKelamin}
                      />
                      <label className="form-check-label" htmlFor="laki-laki">
                        Laki-laki
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="perempuan"
                        name="jenis_kelamin"
                        className="form-check-input"
                        value="P"
                        checked={this.state.jenis_kelamin === "P"}
                        onChange={this.changeJenisKelamin}
                      />
                      <label className="form-check-label" htmlFor="perempuan">
                        Perempuan
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label> Alamat: </label>
                    <input
                      placeholder="Alamat"
                      name="alamat"
                      className="form-control"
                      value={this.state.alamat}
                      onChange={this.changeAlamat}
                    />
                  </div>
                  <div className="form-group">
                    <label> Deskripsi: </label>
                    <input
                      placeholder="Deskripsi"
                      name="deskripsi"
                      className="form-control"
                      value={this.state.deskripsi}
                      onChange={this.changeDeskripsi}
                    />
                  </div>

                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.saveOrUpdatePatient}
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.cancel}
                    style={{ marginLeft: "10px" }}
                  >
                    Batal
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePatientComponent;
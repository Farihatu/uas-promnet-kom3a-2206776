import axios from 'axios';

const PATIENT_API_BASE_URL = "http://localhost:9080/patients"; 

class PatientService {

    getPatients(){
        return axios.get(PATIENT_API_BASE_URL);
    }

    createPatient(patient){
        return axios.post(PATIENT_API_BASE_URL, patient);
    }

    getPatientById(patientId){
        return axios.get(PATIENT_API_BASE_URL + '/' + patientId);
    }

    updatePatient(patient, patientId){
        return axios.put(PATIENT_API_BASE_URL + '/' + patientId, patient);
    }

    deletePatient(patientId){
        return axios.delete(PATIENT_API_BASE_URL + '/' + patientId);
    }
}

export default new PatientService();

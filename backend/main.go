package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
)

type Patient struct {
	ID           string `json:"id"`
	Nama         string `json:"nama"`
	Usia         string `json:"usia"`
	JenisKelamin string `json:"jenis_kelamin"`
	Alamat       string `json:"alamat"`
	Deskripsi    string `json:"deskripsi"`
}

var db *sql.DB
var err error

func InitDB() {
	db, err = sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/db_2206776_farihatu_uas")
	if err != nil {
		panic(err.Error())
	}
}

func Routers() {
	InitDB()
	defer db.Close()

	log.Println("Starting the HTTP server on port 9080")
	router := mux.NewRouter()
	router.HandleFunc("/patients", GetPatients).Methods("GET")
	router.HandleFunc("/patients", CreatePatient).Methods("POST")
	router.HandleFunc("/patients/{id}", GetPatient).Methods("GET")
	router.HandleFunc("/patients/{id}", UpdatePatient).Methods("PUT")
	router.HandleFunc("/patients/{id}", DeletePatient).Methods("DELETE")

	http.ListenAndServe(":9080", &CORSRouterDecorator{router})
}

func main() {
	Routers()
}

func GetPatients(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var patients []Patient

	result, err := db.Query("SELECT id, nama, usia, jenis_kelamin, alamat, deskripsi FROM pasien_puskesmas_farihatu")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()

	for result.Next() {
		var patient Patient
		err := result.Scan(&patient.ID, &patient.Nama, &patient.Usia, &patient.JenisKelamin, &patient.Alamat, &patient.Deskripsi)
		if err != nil {
			panic(err.Error())
		}
		patients = append(patients, patient)
	}

	json.NewEncoder(w).Encode(patients)
}

func CreatePatient(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	stmt, err := db.Prepare("INSERT INTO pasien_puskesmas_farihatu(nama, usia, jenis_kelamin, alamat, deskripsi) VALUES(?,?,?,?,?)")
	if err != nil {
		panic(err.Error())
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}

	var patient Patient
	err = json.Unmarshal(body, &patient)
	if err != nil {
		panic(err.Error())
	}

	_, err = stmt.Exec(patient.Nama, patient.Usia, patient.JenisKelamin, patient.Alamat, patient.Deskripsi)
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprintf(w, "New patient was created")
}

func GetPatient(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	result, err := db.Query("SELECT id, nama, usia, jenis_kelamin, alamat, deskripsi FROM pasien_puskesmas_farihatu WHERE id = ?", params["id"])
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()

	var patient Patient
	for result.Next() {
		err := result.Scan(&patient.ID, &patient.Nama, &patient.Usia, &patient.JenisKelamin, &patient.Alamat, &patient.Deskripsi)
		if err != nil {
			panic(err.Error())
		}
	}

	json.NewEncoder(w).Encode(patient)
}

func UpdatePatient(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("UPDATE pasien_puskesmas_farihatu SET nama=?, usia=?, jenis_kelamin=?, alamat=?, deskripsi=? WHERE id=?")
	if err != nil {
		panic(err.Error())
	}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}

	var patient Patient
	err = json.Unmarshal(body, &patient)
	if err != nil {
		panic(err.Error())
	}

	_, err = stmt.Exec(patient.Nama, patient.Usia, patient.JenisKelamin, patient.Alamat, patient.Deskripsi, params["id"])
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprintf(w, "Patient with ID = %s was updated", params["id"])
}

func DeletePatient(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	stmt, err := db.Prepare("DELETE FROM pasien_puskesmas_farihatu WHERE id = ?")
	if err != nil {
		panic(err.Error())
	}

	_, err = stmt.Exec(params["id"])
	if err != nil {
		panic(err.Error())
	}

	fmt.Fprintf(w, "Patient with ID = %s was deleted", params["id"])
}

type CORSRouterDecorator struct {
	R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers", "Accept, Accept-Language, Content-Type, YourOwnHeader")
	}

	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}

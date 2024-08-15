const jwt = require("jsonwebtoken");
const otentikasiDeleledMahasiswaModel = require("../models/otentikasiDeleledMahasiswaModel");
require('dotenv').config();

const deletedDataMahasiswa = (req, res) => {
    // cek headers
    const authHeader = req.get('Authorization');

    // cek parameter
    const namaParameter = req.params.nama;

    // jika authorization kosong
    if(!authHeader) {
        // status 401 unauthorize
        return res.status(401).json({
        timestamp: new Date().toISOString(),
        status: 0,
        message: "Authorization kosong, silahkan masukan input Authorization !!!",
        });
    }

    // jika parameter kosong
    if(!namaParameter) {
        // status 401 unauthorize
        return res.status(404).json({
        timestamp: new Date().toISOString(),
        status: 0,
        message: "Data id kosong, silahkan masukan input id di akhir endpoint !!!",
        });
    }

    otentikasiDeleledMahasiswaModel.getAllTableDosen( (err, responseGetAllTableDosen) => {
        // error saat query database dosen
        if (err) {
            console.error("Error querying dosens table:", err);
            // status 500 internal server error
            return res.status(500).json({
              timestamp: new Date().toISOString(),
              status: 0,
              message: "SERVER MENGALAMI GANGGUAN, SILAHKAN COBA LAGI NANTI !!!",
            });
          }

        jwt.verify(authHeader, process.env.credentialdosen, (err, decode) => {
            if (err) {
                console.error("Error verifying JWT token:", err);
                // status 500 Internal server error
                return res.status(500).json({
                  timestamp: new Date().toISOString(),
                  status: 0,
                  message: "SERVER MENGALAMI GANGGUAN, SILAHKAN COBA LAGI NANTI !!!",
                });
              }
            
            // Jika tokenApi tidak ada
            if (!decode) {
                // status 404 not found
                return res.status(404).json({
                    timestamp: new Date().toISOString(),
                    status: 0,
                    message: "Token kadaluarsa atau tidak valid !!!",
                });
            }

            // decode base64 apiToken
            const { tokenLogin } = decode;
            const tokenLoginDosen = Buffer.from(tokenLogin, 'base64').toString('utf8');
            const dosen = responseGetAllTableDosen.find(dosen => dosen.email === tokenLoginDosen);
            // console.log(dosen);

            // Jika dosen tidak di temukan
            if (!dosen) {
                // status 404 not found
                return res.status(404).json({
                    timestamp: new Date().toISOString(),
                    status: 0,
                    message: "Data dosen tidak di temukan !!!",
                });
            }

            otentikasiDeleledMahasiswaModel.getAllTableMahasiswas (dosen.id, (err, responseGetAllTableMahasiswas) => {
                // error saat query database mahasiswa
                if (err) {
                    console.error("Error querying mahasiswa table:", err);
                    // status 404 not found
                    return res.status(404).json({
                    timestamp: new Date().toISOString(),
                    status: 0,
                    message: "Data mahasiswa tidak di temukan !!!",
                    });
                }

                const mahasiswasNama = responseGetAllTableMahasiswas.find(nama => nama.nama === namaParameter);

                // jika data tidak di temukan
                if(!mahasiswasNama) {
                     // status 404 not found
                    return res.status(404).json({
                    timestamp: new Date().toISOString(),
                    status: 0,
                    message: "Data mahasiswa tidak di temukan !!!",
                    });
                }

                otentikasiDeleledMahasiswaModel.deletedMahasiswa(mahasiswasNama.nama, (err, responseUpdateTableMahasiswa) => {
                    // error saat query database mahasiswa
                    if (err) {
                        console.error("Error querying mahasiswa table:", err);
                        // status 404 not found
                        return res.status(404).json({
                        timestamp: new Date().toISOString(),
                        status: 0,
                        message: "Data mahasiswa tidak di temukan !!!",
                        });
                    }
    
                    // jika data responseGetAllTableMahasiswa tidak ada 
                    if(!responseUpdateTableMahasiswa) {
                        // status 404 not found
                        return res.status(404).json({
                            timestamp: new Date().toISOString(),
                            status: 0,
                            message: "Data mahasiswa tidak di temukan !!!",
                        });
                    }
    
                    // response berhasil
                    res.status(200).json(
                        {
                            timestamp: new Date().toISOString(),
                            status: 1,
                            message: "Berhasil Menghapus data mahasiswa !!!"
                        }
                    );
                });
            });
        });
    });
}

module.exports = {
    deletedDataMahasiswa
}
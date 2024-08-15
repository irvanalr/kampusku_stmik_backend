const jwt = require("jsonwebtoken");
const otentikasiGetDataMahasiswaModel = require("../models/otentikasiGetDataMahasiswaModel");
require('dotenv').config();

const getDataMahasiswa = (req, res) => {
    // cek headers
    const authHeader = req.get('Authorization');

    // jika authorization kosong
    if(!authHeader) {
        // status 401 unauthorize
        return res.status(401).json({
        timestamp: new Date().toISOString(),
        status: 0,
        message: "Authorization kosong, silahkan masukan input Authorization !!!",
        });
    }

    otentikasiGetDataMahasiswaModel.getAllTableDosen( (err, responseGetAllTableDosen) => {
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

            otentikasiGetDataMahasiswaModel.getAllTableMahasiswa(dosen.id, (err, responseGetAllTableMahasiswa) => {
                // error saat query database mahasiswa
                if (err) {
                    console.error("Error querying mahasiswa table:", err);
                    // status 500 internal server error
                    return res.status(500).json({
                    timestamp: new Date().toISOString(),
                    status: 0,
                    message: "SERVER MENGALAMI GANGGUAN, SILAHKAN COBA LAGI NANTI !!!",
                    });
                }
                // console.log(responseGetAllTableMahasiswa);
                
                // response berhasil
                res.status(200).json(
                    {
                        timestamp: new Date().toISOString(),
                        status: 1,
                        message: "Berhasil Mendapatkan data mahasiswa !!!",
                        data: responseGetAllTableMahasiswa
                    }
                );
            })
        });
    });
}

module.exports = {
    getDataMahasiswa
}
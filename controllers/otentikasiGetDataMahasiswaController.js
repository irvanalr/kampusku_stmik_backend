const jwt = require("jsonwebtoken");
const otentikasiGetDataMahasiswaModel = require("../models/otentikasiGetDataMahasiswaModel");
require('dotenv').config();

const getDataMahasiswa = (req, res) => {
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
                
                const mahasiswa = responseGetAllTableMahasiswa.find(nama => nama.nama == namaParameter);

                if(!mahasiswa) {
                    // status 404 not found
                    return res.status(404).json({
                        timestamp: new Date().toISOString(),
                        status: 0,
                        message: "Data mahasiswa tidak di temukan !!!",
                    });
                }

                responseData = {
                    nama: mahasiswa.nama,
                    nomer_handphone: mahasiswa.nomer_handphone,
                    tanggal_lahir: mahasiswa.tanggal_lahir.toISOString().split('T')[0],
                    jenis_kelamin: mahasiswa.jenis_kelamin,
                    alamat: mahasiswa.alamat,
                    npm: mahasiswa.npm
                };
                
                // response berhasil
                res.status(200).json(
                    {
                        timestamp: new Date().toISOString(),
                        status: 1,
                        message: "Berhasil Mendapatkan data mahasiswa !!!",
                        data: responseData
                    }
                );
            })
        });
    });
}

module.exports = {
    getDataMahasiswa
}
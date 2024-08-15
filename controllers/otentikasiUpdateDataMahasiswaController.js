const jwt = require("jsonwebtoken");
const otentikasiUpdateDataMahasiswaModel = require("../models/otentikasiUpdateDataMahasiswaModel");
require('dotenv').config();

const updateDataMahasiswa = (req, res) => {
    // cek headers
    const authHeader = req.get('Authorization');

    // cek parameter
    const namaParameter = req.params.nama;

    // ambil reques dari client
    const {nama, nomor_telephone, tanggal_lahir, jenis_kelamin, alamat, npm} = req.body;

    // Regular expression untuk mendeteksi backtick dan tanda dollar
    const forbiddenChars = /[`$]/;
    
     // Fungsi untuk validasi input
     const validateInput = (input, fieldName) => {
        if (forbiddenChars.test(input)) {
            return res.status(401).json({
                timestamp: new Date().toISOString(),
                status: 0,
                message: `${fieldName} tidak boleh mengandung karakter backtick atau tanda dollar!`,
            });
        }
    };

    // Validasi nama
    if (validateInput(nama, 'Nama')) return;
    if (nama.length < 3) {
        return res.status(400).json({
            timestamp: new Date().toISOString(),
            status: 0,
            message: "Nama tidak boleh berisikan kurang dari 3 kata",
        });
    }

    // Validasi nomor_telephone
    if (validateInput(nomor_telephone, 'Nomer Telephone')) return;
    if (nomor_telephone.length < 12) {
        return res.status(400).json({
            timestamp: new Date().toISOString(),
            status: 0,
            message: "Nomer Telephone minimal harus terdiri dari 12 angka!",
        });
    }

    // Validasi tanggal_lahir
    if (validateInput(tanggal_lahir, 'Tanggal Lahir')) return;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(tanggal_lahir)) {
        return res.status(400).json({
            timestamp: new Date().toISOString(),
            status: 0,
            message: "Format tanggal_lahir harus tahun-bulan-tanggal (YYYY-MM-DD)",
        });
    }

    // Validasi jenis_kelamin
    if (validateInput(jenis_kelamin, 'Jenis Kelamin')) return;
    if (jenis_kelamin !== "Laki-laki" && jenis_kelamin !== "Perempuan") {
        return res.status(400).json({
            timestamp: new Date().toISOString(),
            status: 0,
            message: "Jenis kelamin di tolak, Masukan kata 'Laki-laki' atau 'Perempuan' !!!",
        });
    }

    // Validasi alamat
    if (validateInput(alamat, 'Alamat')) return;
    if (alamat.length < 5) {
        return res.status(400).json({
            timestamp: new Date().toISOString(),
            status: 0,
            message: "Alamat minimal harus terdiri dari 5 kata !!!",
        });
    }

    // Validasi npm
    if (validateInput(npm, 'NPM')) return;
    if (npm.length <= 8) {
        return res.status(400).json({
            timestamp: new Date().toISOString(),
            status: 0,
            message: "NPM minimal harus terdiri dari 8 karakter !!!",
        });
    }

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

    otentikasiUpdateDataMahasiswaModel.getAllTableDosen( (err, responseGetAllTableDosen) => {
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

            otentikasiUpdateDataMahasiswaModel.getAllTableMahasiswas (dosen.id, (err, responseGetAllTableMahasiswas) => {
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

                otentikasiUpdateDataMahasiswaModel.updateDataMahasiswa(nama, nomor_telephone, tanggal_lahir, jenis_kelamin, alamat, npm, dosen.id, namaParameter, (err, responseUpdateTableMahasiswa) => {
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
    
                    otentikasiUpdateDataMahasiswaModel.getAllTableMahasiswa(namaParameter, (err, responseGetAllTableMahasiswa) => {
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
    
                        // response berhasil
                        res.status(200).json(
                            {
                                timestamp: new Date().toISOString(),
                                status: 1,
                                message: "Berhasil Mengupdate data mahasiswa !!!",
                                data: responseGetAllTableMahasiswa
                            }
                        );
                    });
                });
            });
        });
    });
}

module.exports = {
    updateDataMahasiswa
}
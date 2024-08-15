const jwt = require("jsonwebtoken");
const credentialLoginModel = require("../models/credentialLoginModel");
require('dotenv').config();

const login = (req, res) => {
    // ambil reques dari client
    const {email, password} = req.body;

    // Validasi apakah email dan password ada dalam req.body
    if (!email || !password) {
        return res.status(401).json({
            message: "Kesalahan anda lupa memasukan email dan password pada body anda"
        });
    }

    credentialLoginModel.getAllTables((err, responseAllTable) => {
        // error saat query database
        if (err) {
            console.error("Error querying dosens table:", err);
            // status 500 internal server error
            return res.status(500).json({
              timestamp: new Date().toISOString(),
              status: 0,
              message: "SERVER MENGALAMI GANGGUAN, SILAHKAN COBA LAGI NANTI !!!",
            });
          }

        // jika responseAllTable kosong
        if(!responseAllTable) {
            // status 404 not found
            return res.status(404).json({
            timestamp: new Date().toISOString(),
            status: 0,
            message: "SERVER MENGALAMI GANGGUAN, SILAHKAN COBA LAGI NANTI !!!",
            });
        }

        // mencari berdasarkan email
        const user = responseAllTable.find(user => user.email === email);

        // Jika email tidak ditemukan
        if(!user) {
            // status 404 not found
            return res.status(404).json({
            timestamp: new Date().toISOString(),
            status: 0,
            message: "email atau password anda salah !!!",
            }); 
        }

        // jika password tidak sama dengan user.password
        if(password !== user.password) {
            // status 401 unautorized
            return res.status(401).json({
            timestamp: new Date().toISOString(),
            status: 0,
            message: "email atau password anda salah !!!",
            }); 
        }

        // encode email menjadi base64
        const tokenLogin = Buffer.from(user.email).toString('base64');

        // generate email dengan jwt
        jwt.sign({tokenLogin}, process.env.credentialdosen, { expiresIn: '7d' }, (err, token) => {
          // status 500 internal server error
          if (err) {
            console.error('Error creating JWT token:', err);
            return res.status(500).json({
                timestamp: new Date().toISOString(),
                status: 0,
                message: "SERVER MENGALAMI GANGGUAN, SILAHKAN COBA LAGI NANTI !!!"
            });
          }

            // response berhasil
            res.status(200).json(
                {
                  timestamp: new Date().toISOString(),
                  status: 1,
                  token: token,
                  message: "Berhasil",
                }
            );
        });
    });
}

module.exports = {
    login,
}
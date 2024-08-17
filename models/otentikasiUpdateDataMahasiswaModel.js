const connection = require('../config/database');

const getAllTableDosen = (callback) => {
    const query = 'SELECT * FROM dosen';

    connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, results);
      });
};

const getAllTableMahasiswas = (dosen_id, callback) => {
    const query = 'SELECT * FROM mahasiswa WHERE dosen_id = ?';
    
    connection.query(query, [dosen_id], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, results);
      });
}

const getAllTableMahasiswa = (nama, callback) => {
    const query = 'SELECT * FROM mahasiswa where nama = ?';

    connection.query(query, [nama], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, results);
      });
}

const updateDataMahasiswa = (nama, nomer_handphone, tanggal_lahir, jenis_kelamin, alamat, npm, dosen_id, nama2, callback) => {
    const query = 'UPDATE mahasiswa SET nama = ?, nomer_handphone = ?, tanggal_lahir = ?, jenis_kelamin = ?, alamat = ?, npm = ? where dosen_id = ? AND nama = ?';

    connection.query(query, [nama, nomer_handphone, tanggal_lahir, jenis_kelamin, alamat, npm, dosen_id, nama2], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
}

module.exports = {
    getAllTableDosen,
    getAllTableMahasiswas,
    getAllTableMahasiswa,
    updateDataMahasiswa
}
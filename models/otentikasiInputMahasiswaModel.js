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

const getAllTableMahasiswa = (callback) => {
    const query = 'SELECT * FROM mahasiswa';

    connection.query(query, (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
}

const insertDataMahasiswa = (dosen_id, nama, tanggal_lahir, jenis_kelamin, alamat, npm, tanggal_dibuat, callback) => {
  const query = 'INSERT INTO mahasiswa (dosen_id, nama, tanggal_lahir, jenis_kelamin, alamat, npm, tanggal_dibuat) VALUES (?, ?, ?, ?, ?, ?, ?)';

  connection.query(query, [dosen_id, nama, tanggal_lahir, jenis_kelamin, alamat, npm, tanggal_dibuat], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
};

module.exports = {
    getAllTableDosen,
    getAllTableMahasiswa,
    insertDataMahasiswa
};
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

const deletedMahasiswa = (nama, callback) => {
    const query = 'DELETE FROM mahasiswa WHERE nama = ?';

    connection.query(query, [nama], (error, results) => {
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
    deletedMahasiswa
}
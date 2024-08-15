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

const getAllTableMahasiswa = (user_id, callback) => {
    const query = 'SELECT * FROM mahasiswa WHERE dosen_id = ?';

    connection.query(query, [user_id], (error, results) => {
        if (error) {
            return callback(error, null);
        }
        callback(null, results);
    });
}

module.exports = {
    getAllTableDosen,
    getAllTableMahasiswa
}
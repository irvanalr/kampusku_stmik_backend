const connection = require('../config/database');

const getAllTables = (callback) => {
    const query = 'SELECT * FROM dosen';

    connection.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, results);
      });
};

module.exports = {
    getAllTables,
};
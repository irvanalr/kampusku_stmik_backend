const express = require('express');

const credentialLoginRoutes = require('./routes/credentialLoginRoutes');
const otentikasiInputRoutes = require('./routes/otentikasiInputMahasiswaRoutes');
const otentikasiGetRoutes = require('./routes/otentikasiGetDataMahasiswaRoutes');
const otentikasiGetListRoutes = require('./routes/otentikasiListDataMahasiswaOnlyNameRoutes');
const otentikasiUpdateDataMahasiswaRoutes = require('./routes/otentikasiUpdateDataMahasiswaRoutes');
const otentikasiDeletedMahasiswaRoutes = require('./routes/otentikasiDeletedMahasiswaRoutes');

const app = express();

require('dotenv').config();

app.use(express.json());

app.use(credentialLoginRoutes);
app.use(otentikasiInputRoutes);
app.use(otentikasiGetRoutes);
app.use(otentikasiGetListRoutes);
app.use(otentikasiUpdateDataMahasiswaRoutes);
app.use(otentikasiDeletedMahasiswaRoutes);

// Middleware untuk menangani permintaan ke endpoint selain /login
const handleNotFound = (req, res, next) => {
    res.status(404).send('404 NOT FOUND !!!');
  };
  
  app.use(handleNotFound);

// Menjalankan Port http express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});
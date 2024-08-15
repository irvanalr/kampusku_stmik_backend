-- membuat database
CREATE DATABASE kampusku;

-- gunakan database
USE kampusku;

-- membuat table dosens
CREATE TABLE dosen (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- membuat table mahasiswa
CREATE TABLE mahasiswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dosen_id INT NOT NULL,
    nama VARCHAR(100) NOT NULL,
    nomer_handphone VARCHAR(15) NOT NULL,
    tanggal_lahir DATE NOT NULL,
    jenis_kelamin VARCHAR(10) NOT NULL,
    alamat VARCHAR(255) NOT NULL,
    npm VARCHAR(100) NOT NULL,
    tanggal_dibuat DATE NOT NULL,
    FOREIGN KEY (dosen_id) REFERENCES dosen(id)
);

-- memasukkan data ke table dosens
INSERT INTO dosen (email, password) 
VALUES ('abc@gmail.com', 'abc123'), 
       ('cda@gmail.com' , 'cda123');

-- memasukkan data ke table mahasiswa
INSERT INTO mahasiswa (dosen_id, nama, nomer_handphone, tanggal_lahir, jenis_kelamin, alamat, npm, tanggal_dibuat) VALUES
-- Data untuk dosen_id 1
(1, 'Irvan Al Rasyid', '081234567891', '2001-05-10', 'Laki-laki', 'Jl. Mataram No. 2, Tanggerang Selatan', '123456789', '2024-08-14'),
(1, 'Joko Susilo', '081234567892', '1998-05-10', 'Laki-laki', 'Jl. Melati No. 1, Jakarta', '123456790', '2024-08-14'),
(1, 'Nina Wulandari', '081234567893', '2000-01-25', 'Perempuan', 'Jl. STMIK', '123456791', '2024-08-14'),
(1, 'Andi Pratama', '081234567894', '1999-07-15', 'Laki-laki', 'Jl. Merdeka No. 5, Bandung', '123456792', '2024-08-14'),
(1, 'Sari Juminten', '081234567895', '2002-03-22', 'Perempuan', 'Jl. Kemuning No. 7, Surabaya', '123456793', '2024-08-14'),

-- Data untuk dosen_id 2
(2, 'Anwar Ibrahim', '081234567896', '1998-05-10', 'Laki-laki', 'Jl. Melati No. 1, Jakarta', '223456789', '2024-08-14'),
(2, 'Jane Sartika', '081234567897', '2000-12-05', 'Perempuan', 'Jl. Cempaka No. 3, Bogor', '223456790', '2024-08-14'),
(2, 'Rudi Hartono', '081234567898', '1997-09-30', 'Laki-laki', 'Jl. Pahlawan No. 8, Bekasi', '223456791', '2024-08-14'),
(2, 'Ayu Lestari', '081234567899', '2002-04-15', 'Perempuan', 'Jl. Raya No. 12, Depok', '223456792', '2024-08-14'),
(2, 'Rina Putri', '081234567900', '1996-11-21', 'Perempuan', 'Jl. Kuningan No. 4, Jakarta', '223456793', '2024-08-14');
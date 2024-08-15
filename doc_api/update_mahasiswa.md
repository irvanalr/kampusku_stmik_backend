# API Documentation

## update Data Mahasiswa

**Base URL**: `http://localhost:3000`  
**Endpoint**: `/sessions/mahasiswa/:1`  
**Method**: `PUT`  
**Description**: Endpoint ini digunakan untuk mengupdate data mahasiswa per 1 data. Token JWT diperlukan untuk autentikasi dan beberapa validasi input diterapkan.

### Headers

mobile-app : mobile-application  
Content-Type : application/json  
Accept : application/json  
Authorization : token-login

#### Body

- **nama**: `string` - Nama mahasiswa (min. 3 karakter, tanpa backtick atau tanda dollar).
- **nomer_telephone**: `string` - Nomor telepon mahasiswa (min. 12 angka, tanpa backtick atau tanda dollar).
- **tanggal_lahir**: `string` - Tanggal lahir mahasiswa dalam format `YYYY-MM-DD` (tanpa backtick atau tanda dollar).
- **jenis_kelamin**: `string` - Jenis kelamin mahasiswa (hanya "Laki-laki" atau "Perempuan").
- **alamat**: `string` - Alamat mahasiswa (min. 5 kata, tanpa backtick atau tanda dollar).
- **npm**: `string` - Nomor Pokok Mahasiswa (NPM) (min. 8 karakter, tanpa backtick atau tanda dollar).

### Response Codes

- **200 OK**
  - **Description**: Request berhasil, data dosen ditemukan dan dikembalikan.
  - **Example Response**:
    ```json
    {
      "timestamp": "2024-08-14T12:00:00.000Z",
      "status": 1,
      "message": "Berhasil Mendapatkan data dosen !!!",
      "data": [
        // Array of dosen objects
      ]
    }
    ```

- **404 Not found**
  - **Description**: Data tidak di temukan.
  - **Example Response**:
    ```json
    {
        "timestamp": "tanggal",
        "status": 0,
        "message": "message",
    }
    ```

- **400 Bad response**
  - **Description**: Data di tolak.
  - **Example Response**:
    ```json
    {
        "timestamp": "tanggal",
        "status": 0,
        "message": "message",
    }
    ```

- **401 Unauthorize**
  - **Description**: Data tidak lengkap atau tidak tersedia.
  - **Example Response**:
    ```json
    {
        "timestamp": "tanggal",
        "status": 0,
        "message": "message",
    }
    ```

- **500 Internal Server Error**
  - **Description**: Terjadi kesalahan pada server saat query database `mahasiswa`.
  - **Example Response**:
    ```json
    {
      "timestamp": "2024-08-14T12:00:00.000Z",
      "status": 0,
      "message": "SERVER MENGALAMI GANGGUAN, SILAHKAN COBA LAGI NANTI !!!"
    }
    ```
# API Documentation

## Input Mahasiswa

**Base URL**: `http://localhost:3000`  
**Endpoint**: `/sessions/input-mahasiswa`  
**Method**: `POST`  
**Description**: Endpoint ini digunakan untuk menambahkan data mahasiswa baru. Token JWT diperlukan untuk autentikasi dan beberapa validasi input diterapkan.

### Request

#### Headers

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

### Responses

- **200 OK**
  - **Description**: Request berhasil, data mahasiswa ditemukan dan dikembalikan.
  - **Example Response**:
    ```json
    {
    "timestamp": "string",
    "status": 1,
    "message": "Berhasil Menambahkan data mahasiswa !!!"
    }
    ```

#### 400 Bad Request
**Description**: Terjadi kesalahan dalam validasi input.

**Response Body**:

    ```json
    {
    "timestamp": "string",
    "status": 0,
    "message": "Nama tidak boleh berisikan kurang dari 3 kata"
    }
    ```
    ```json
    {
    "timestamp": "string",
    "status": 0,
    "message": "Nomer Telephone minimal harus terdiri dari 12 angka!"
    }
    ```
    ```json
    {
    "timestamp": "string",
    "status": 0,
    "message": "Format tanggal_lahir harus tahun-bulan-tanggal (YYYY-MM-DD)"
    }
    ```
    ```json
    {
    "timestamp": "string",
    "status": 0,
    "message": "Jenis kelamin di tolak, Masukan kata 'Laki-laki' atau 'Perempuan' !!!"
    }
    ```
    ```json
    {
    "timestamp": "string",
    "status": 0,
    "message": "Alamat minimal harus terdiri dari 5 kata !!!"
    }
    ```
    ```json
    {
    "timestamp": "string",
    "status": 0,
    "message": "NPM minimal harus terdiri dari 8 karakter !!!"
    }
    ```

#### 401 Unauthorized
**Description**: Authorization header tidak disertakan atau kosong, atau token JWT tidak valid.

**Response Body**:

    ```json
    {
    "timestamp": "string",
    "status": 0,
    "message": "Authorization kosong, silahkan masukan input Authorization !!!"
    }
    ```
    ```json
    {
    "timestamp": "string",
    "status": 0,
    "message": "Token kadaluarsa atau tidak valid !!!"
    }
    ```

#### 404 Not Found
**Description**: Data dosen tidak ditemukan.

**Response Body**:

    ```json
    {
    "timestamp": "string",
    "status": 0,
    "message": "Data dosen tidak di temukan !!!"
    }
    ```

#### 500 Internal Server Error
**Description**: Terjadi kesalahan pada server, misalnya saat melakukan query database atau memverifikasi token JWT.

**Response Body**:

    ```json
    {
    "timestamp": "string",
    "status": 0,
    "message": "SERVER MENGALAMI GANGGUAN, SILAHKAN COBA LAGI NANTI !!!"
    }
    ```
# API Documentation

## Get Data Mahasiswa by Name

**Base URL**: `http://localhost:3000`  
**Endpoint**: `/sessions/get-list-mahasiswa`  
**Method**: `GET`  
**Description**: Endpoint ini digunakan untuk mendapatkan data mahasiswa berdasarkan nama dosen yang terautentikasi. Token JWT diperlukan untuk autentikasi.

### Request

### Headers
mobile-app : mobile-application  
Content-Type : application/json  
Accept : application/json  
Authorization : token-login

### Responses

#### 200 OK

**Description**: Data mahasiswa berhasil diambil.

**Response Body**:

    ```json
    {
    "timestamp": "string",
    "status": 1,
    "message": "Berhasil Mendapatkan data mahasiswa !!!",
    "data": [
        // Array data mahasiswa
    ]
    }
    ```

#### 401 Unauthorized
**Description**: Authorization header tidak disertakan atau kosong.

**Response Body**:

    ```json
    {
    "timestamp": "string",
    "status": 0,
    "message": "Authorization kosong, silahkan masukan input Authorization !!!"
    }
    ```

#### 404 Not Found
**Description**:
Token JWT tidak valid atau kadaluarsa.
Data dosen tidak ditemukan.

**Response Body**:

    ```json
    {
    "timestamp": "string",
    "status": 0,
    "message": "Token kadaluarsa atau tidak valid !!!"
    }
    ```
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
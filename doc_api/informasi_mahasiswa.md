# API Documentation

## Get Data Mahasiswa

**Base URL**: `http://localhost:3000`  
**Endpoint**: `/sessions/get-mahasiswa`  
**Method**: `GET`  
**Description**: Endpoint ini digunakan untuk mendapatkan data mahasiswa per 1 data. Token JWT diperlukan untuk autentikasi dan beberapa validasi input diterapkan.

### Headers

mobile-app : mobile-application  
Content-Type : application/json  
Accept : application/json  
Authorization : token-login

### Response Codes

- **200 OK**
  - **Description**: Request berhasil, data mahasiswa ditemukan dan dikembalikan.
  - **Example Response**:
    ```json
    {
      "timestamp": "2024-08-14T12:00:00.000Z",
      "status": 1,
      "message": "Berhasil Mendapatkan data mahasiswa !!!",
      "data": [
        // Array of mahasiswa objects
      ]
    }
    ```

- **401 Unauthorized**
  - **Description**: Authorization header kosong atau tidak diberikan.
  - **Example Response**:
    ```json
    {
      "timestamp": "2024-08-14T12:00:00.000Z",
      "status": 0,
      "message": "Authorization kosong, silahkan masukan input Authorization !!!"
    }
    ```

- **404 Not Found**
  - **Description**: Token tidak valid atau kadaluarsa, atau data dosen tidak ditemukan.
  - **Example Responses**:
    - **Token Kadaluarsa atau Tidak Valid**:
      ```json
      {
        "timestamp": "2024-08-14T12:00:00.000Z",
        "status": 0,
        "message": "Token kadaluarsa atau tidak valid !!!"
      }
      ```
    - **Data Dosen Tidak Ditemukan**:
      ```json
      {
        "timestamp": "2024-08-14T12:00:00.000Z",
        "status": 0,
        "message": "Data dosen tidak di temukan !!!"
      }
      ```

- **500 Internal Server Error**
  - **Description**: Terjadi kesalahan pada server saat memproses permintaan, baik saat query database dosen maupun mahasiswa, atau saat verifikasi JWT token.
  - **Example Response**:
    ```json
    {
      "timestamp": "2024-08-14T12:00:00.000Z",
      "status": 0,
      "message": "SERVER MENGALAMI GANGGUAN, SILAHKAN COBA LAGI NANTI !!!"
    }
    ```

### Notes

- **Authorization Header** harus berisi JWT token yang valid.
- Token JWT akan diverifikasi terhadap `credentialdosen` dari environment variables.
- API akan mengembalikan data mahasiswa yang terkait dengan dosen yang diidentifikasi berdasarkan token.
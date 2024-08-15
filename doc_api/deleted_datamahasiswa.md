# API Documentation

## Delete Data Mahasiswa

**Base URL**: `http://localhost:3000`  
**Endpoint**: `/sessions/deleted-mahasiswa/:nama`  
**Method**: `DELETE`  
**Description**: Endpoint ini digunakan untuk menghapus data mahasiswa berdasarkan nama. Token JWT diperlukan untuk autentikasi dan beberapa validasi input diterapkan.

### Headers

- **mobile-app**: `mobile-application`  
- **Content-Type**: `application/json`  
- **Accept**: `application/json`  
- **Authorization**: `token-login`

### Response Codes

- **200 OK**
  - **Description**: Request berhasil, data mahasiswa berhasil dihapus.
  - **Example Response**:
    ```json
    {
      "timestamp": "2024-08-14T12:00:00.000Z",
      "status": 1,
      "message": "Berhasil Menghapus data mahasiswa !!!"
    }
    ```

- **404 Not Found**
  - **Description**: Data mahasiswa tidak ditemukan.
  - **Example Response**:
    ```json
    {
      "timestamp": "2024-08-14T12:00:00.000Z",
      "status": 0,
      "message": "Data mahasiswa tidak di temukan !!!"
    }
    ```

- **401 Unauthorized**
  - **Description**: Authorization header kosong atau tidak valid.
  - **Example Response**:
    ```json
    {
      "timestamp": "2024-08-14T12:00:00.000Z",
      "status": 0,
      "message": "Authorization kosong, silahkan masukan input Authorization !!!"
    }
    ```

- **500 Internal Server Error**
  - **Description**: Terjadi kesalahan pada server saat mengakses database mahasiswa.
  - **Example Response**:
    ```json
    {
      "timestamp": "2024-08-14T12:00:00.000Z",
      "status": 0,
      "message": "SERVER MENGALAMI GANGGUAN, SILAHKAN COBA LAGI NANTI !!!"
    }
    ```
# API Documentation

## Login

**base-url**: `http://localhost:3000`
**Endpoint**: `/sessions/login`  
**Method**: `POST`  
**Description**: Endpoint ini digunakan untuk autentikasi pengguna dengan email dan password. Jika berhasil, akan mengembalikan token JWT.

### Request

### Headers
mobile-app : mobile-application  
Content-Type : application/json  
Accept : application/json

#### Body

- **email**: `string` - Alamat email pengguna.
- **password**: `string` - Password pengguna.

### Responses

#### 200 OK

**Description**: Login berhasil. Token JWT dikembalikan.

**Response Body**:

    ```json
    {
    "timestamp": "string",
    "status": 1,
    "token": "string",
    "message": "Berhasil"
    }
    ```

#### 401 Unauthorized
**Description**: Email atau password salah, atau email dan password tidak disertakan dalam body request.

**Response Body**:

    ```json
    {
    "timestamp": "string",
    "status": 0,
    "message": "email atau password anda salah !!!"
    }
    ```

#### 404 Not Found
**Description**: Data tidak ditemukan (misalnya, tidak ada pengguna dengan email yang diberikan).

**Response Body**:

    ```json
    {
    "timestamp": "string",
    "status": 0,
    "message": "email atau password anda salah !!!"
    }
    ```

#### 500 Internal Server Error
**Description**: Terjadi kesalahan pada server, misalnya saat melakukan query database atau membuat token JWT.

**Response Body**:

    ```json
    {
    "timestamp": "string",
    "status": 0,
    "message": "SERVER MENGALAMI GANGGUAN, SILAHKAN COBA LAGI NANTI !!!"
    }
    ```
const checkUserAgent = (req, res, next) => {
    const userAgent = req.get('user-agent');
  
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Wellcome Admin</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          color: white;
          background-color: black;
          flex-direction: column;
        }
        .full-screen {
        width: 100vw;
        height: 100vh;
        display: none;
        }
      </style>
    </head>
    <body>
        <h1>You are detected as an admin, Welcome admin !!</h1>
    </body>
    </html>
    `;
    
    if (userAgent && (userAgent.toLowerCase().includes('postman') || userAgent.toLowerCase().includes('dart'))) {
      // Jika User-Agent mengandung 'postman' atau 'dart', lanjutkan ke handler berikutnya
      next();
    } else {
      // Jika bukan dari Postman atau Dart, kembalikan response "404 NOT FOUND"
      res.status(404).send(html);
    }
  };
  
  module.exports = checkUserAgent;
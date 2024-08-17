const checkHeaders1 = (req, res, next) => {
  const mobileAppHeader = req.get('mobile-app');
  const contentTypeHeader = req.get('Content-Type');
  const acceptHeader = req.get('accept');

  // Periksa keberadaan headers yang diperlukan
  if (
    !mobileAppHeader || 
    !contentTypeHeader || 
    !acceptHeader || 
    !contentTypeHeader.startsWith('application/json')  || 
    acceptHeader !== 'application/json' || 
    mobileAppHeader !== 'mobile-application'
  ) {
    return res.status(400).json({
      message: 'Masukkan headers yang diperlukan dengan benar!'
    });
  }

  // Jika semua headers valid, lanjutkan ke handler berikutnya
  next();
};

const checkHeaders2 = (req, res, next) => {
  const mobileAppHeader = req.get('mobile-app');
  const contentTypeHeader = req.get('Content-Type');
  const acceptHeader = req.get('accept');
  const authorizationHeader = req.get('Authorization');

  // Periksa keberadaan headers yang diperlukan
  if (
    !mobileAppHeader || 
    !contentTypeHeader || 
    !acceptHeader || 
    !authorizationHeader ||
    !contentTypeHeader.startsWith('application/json') || 
    acceptHeader !== 'application/json' || 
    mobileAppHeader !== 'mobile-application'
  ) {
    return res.status(400).json({
      message: 'Masukkan headers yang diperlukan dengan benar!'
    });
  }

  // Jika semua headers valid, lanjutkan ke handler berikutnya
  next();
};

module.exports = {
  checkHeaders1,
  checkHeaders2
};

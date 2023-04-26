const multer = require('multer');
const storage = multer.diskStorage({});
const limits = { fileSize: 500000 };
const upload = multer({ storage, limits });

module.exports = upload;
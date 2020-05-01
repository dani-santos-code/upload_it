const multer = require("multer");
const createHash = require("hash-generator");

const storage = multer.diskStorage({
  // destination: function(req, file, cb) {
  //   cb(null, "public/uploads/images");
  // },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}${createHash(8)}${file.originalname.replace(
      /\s/g,
      ""
    )}`;
    cb(null, fileName);
  },
});

const upload = multer({
  //storage: storage,
  limits: {
    fileSize: 2000000, // 2megabytes
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

module.exports = { upload, storage };

// IMAGE ROUTES
const express = require("express");
const router = new express.Router();
const { isAuth } = require("../middleware/auth");
const { upload } = require("../middleware/upload");
const {
  createImageOnUpload,
  getAllUsersImages,
  getImagesById,
  deleteImageById,
  getPublicImages,
  makeImagePublic,
} = require("../controllers/imagesController");

router
  .get("/images", isAuth, getAllUsersImages)
  .post(
    "/images/me/upload",
    isAuth,
    upload.array("upload", 6),
    createImageOnUpload,
    (error, req, res, next) => {
      res.status(400).send({
        error:
          error.message +
          ". You can only upload up to 6 images and max file size is 2MBs",
      });
    }
  )
  .get("/images/:id", isAuth, getImagesById)
  .delete("/images/:id", isAuth, deleteImageById)
  .get("/public/images", isAuth, getPublicImages)
  .put("/public/images/:id", isAuth, makeImagePublic);

module.exports = router;

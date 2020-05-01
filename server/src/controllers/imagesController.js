const { Image } = require("../models/Image");

const createImageOnUpload = async (req, res) => {
  const files = req.files;
  try {
    files.map((file) => {
      Image.create({
        owner: req.user._id,
        binary: file.buffer,
      });
    });
    res.send({
      message: `Successful upload of ${files.length} image(s)`,
    });
  } catch (e) {
    res.send({ error: e.message });
  }
};
const makeImagePublic = async (req, res) => {
  const { id } = req.params;
  try {
    const imageById = await Image.findOne({ _id: id });
    await imageById.updateOne({ isPrivate: false });
    //console.log(imageById);
    if (!imageById) {
      return res.status(404).send();
    }
    res.status(200).send({ message: "Successful update." });
  } catch (e) {
    console.log(e);
  }
};
const getAllUsersImages = async (req, res) => {
  try {
    const images = await Image.find({ owner: req.user._id });
    if (!images) {
      return res.status(404).send();
    }
    //const binaries = images.map((img) => img.binary);
    const imagesDetails = images.map((img) => {
      return { id: img._id, binary: img.binary };
    });
    res.send({ imagesDetails });
  } catch (e) {
    res.sendStatus(500).send({ error: e });
  }
};

const getPublicImages = async (req, res) => {
  try {
    const images = await Image.find({ isPrivate: false }).populate("owner");
    //console.log(images);
    if (!images) {
      return res.status(404).send();
    }
    const imagesDetails = images.map((img) => {
      return { id: img._id, binary: img.binary, owner: img.owner.name };
    });
    res.send({ imagesDetails });
  } catch (e) {
    res.sendStatus(500).send({ error: e });
  }
};

const getImagesById = async (req, res) => {
  const _id = req.params.id;
  try {
    const image = await Image.findOne({ _id, owner: req.user._id });
    if (!image) {
      return res.status(404).send();
    }
    res.send(image);
  } catch (e) {
    res.sendStatus(500).send();
  }
};

const deleteImageById = async (req, res) => {
  try {
    const imageByUserId = await Image.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!imageByUserId) {
      return res.sendStatus(404).send();
    }
    res.send({ message: "Successfully deleted." });
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  createImageOnUpload,
  getAllUsersImages,
  getPublicImages,
  makeImagePublic,
  getImagesById,
  deleteImageById,
};

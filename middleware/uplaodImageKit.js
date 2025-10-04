const ImageKit = require("imagekit");

var imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY ,
  privateKey: process.env.PRIVATE_KEY ,
  urlEndpoint: process.env.URL ,
});
const uploadImageKit = (isMultipleFiles) => {
  return async (req, res, next) => {
    try {
      if (
        (!isMultipleFiles && !req.file) ||
        (isMultipleFiles && (!req.files || req.files.length === 0))
      ) {
        return next();
      }

      const files = isMultipleFiles ? req.files : [req.file];
      console.log(files);

      const uploadPromises = files.map((file) =>
        imagekit.upload({
          file: file.buffer,
          fileName: `${Date.now()}-${file.originalname}`,
          folder: "uploads",
        })
      );

      const results = await Promise.all(uploadPromises);
      console.log(results);

      req.images = results.map((r) => r.url);

      next();
    } catch (error) {
      console.log("ImageKit Upload Error:", error);
      next(error);
    }
  };
};

module.exports = uploadImageKit;

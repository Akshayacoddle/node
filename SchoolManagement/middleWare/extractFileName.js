const extractFileName = (req, res, next) => {
  req.customFileName = req.headers['filename'];
  next();
};

module.exports = extractFileName;

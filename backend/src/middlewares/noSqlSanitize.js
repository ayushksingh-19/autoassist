const sanitizeObject = (value) => {
  if (!value || typeof value !== "object") {
    return value;
  }

  Object.keys(value).forEach((key) => {
    const cleanKey = key.replace(/^\$+/, "").replace(/\./g, "");

    if (cleanKey !== key) {
      value[cleanKey] = value[key];
      delete value[key];
    }

    sanitizeObject(value[cleanKey]);
  });

  return value;
};

module.exports = (req, res, next) => {
  sanitizeObject(req.body);
  sanitizeObject(req.params);
  sanitizeObject(req.query);
  next();
};

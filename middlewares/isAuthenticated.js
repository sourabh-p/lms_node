const verifyToken = require("../utils/verifyToken");

const isAuthenticated = (model) => {
  return async (req, res, next) => {
    // get header objects
    const headerObj = req.headers;
    const token = headerObj?.authorization?.split(" ")[1]; // using optional chaining

    //verify token
    const verifiedToken = verifyToken(token);

    if (verifiedToken.msg == "Invalid token") {
      const err = new Error("Token expired/invalid");
      next(err);
    } else {
      // find the admin
      const user = await model
        .findById(verifiedToken.id)
        .select("name email role");
      // save user into req.obj
      req.userAuth = user;
      next();
    }
  };
};

module.exports = isAuthenticated;
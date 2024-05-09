const Admin = require("../model/Staff/Admin");
const verifyToken = require("../utils/verifyToken");

const isLogin = async (req, res, next) => {
    // get header objects
    const headerObj = req.headers;
    /**
     * If the headerObj is there,
     * and has authorization attached,
     * and the authorization can be split
     * return the token from header
     */
    const token     = headerObj?.authorization?.split(" ")[1];// using optional chaining
    // const token = headerObj && headerObj.authorization && headerObj.authorization.split(" ")[1]; // using optional chaining
    //verify token
    const verifiedToken = verifyToken(token);

    if(verifiedToken.msg == "Invalid token") {
        const err = new Error("Token expired/invalid");
        next(err);
    } else {
        // find the admin
        const user = await Admin.findById(verifiedToken.id).select('name email role');
        // save user into req.obj
        req.userAuth = user;
        next();
    }
    
};

module.exports = isLogin;
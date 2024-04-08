const isLogin = (req, res, next) => {
    // check if req has user
    const isLogin = req.userAuth;
    console.log(req.userAuth);
    if(isLogin) {
        next();
    } else {
        const err = new Error("you are not logged in");
        next(err);
    }
};

module.exports = isLogin;
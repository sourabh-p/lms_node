/**
 * @description Check the role of the user and throw error if userAuth.role doesn't match
 * @param  {...any} roles 
 * @returns req.userAuth.role
 */
const roleRestriction = (...roles) => {
    // console.log(roles);
    return (req, res, next) => {
        // check the role of the user with array method
        console.log('resp', req.userAuth);
        if(!roles.includes(req.userAuth.role)) {
            throw new Error("You do not have permission to perform this action");
        };
        next();
    };
}

module.exports = roleRestriction;
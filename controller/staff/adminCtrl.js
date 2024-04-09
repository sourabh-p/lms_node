const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/Staff/Admin");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");

/**
 * @description Register admins
 * @route       GET /api/v1/admins/register
 * @access      Private
 */
exports.registerAdminCtrl = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if admin already exists in the database
    const adminFound = await Admin.findOne({ email });

    if(adminFound) return res.status(401).json({ msg: "Email is already registered"});
    
    // register user
    const user = await Admin.create({
        name,
        email,
        password
    });

    res.status(201).json({
        status: "success",
        data: user,
        message: "Admin registered successfully. Glad you are here.",
    }); 
});

/**
 * @description login admins
 * @route       POST /api/v1/admins/login
 * @access      Private
 */
exports.loginAdminCtrl = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user                = await Admin.findOne({email})

    if(!user) {
        return res.json({
            message: "Invalid login credentials. Please try again."
        });
    }

    if(user && (await user.verifyPassword(password))) {
        // send user data as a token
        return res.json({
            data: generateToken(user._id),
            message: "Admin logged in successfully.  Welcome back!"
        });
    } else {
        return res.json({
            message: "Invalid login credentials"
        });
    }
});
/**
 * @description Get all admins
 * @route       GET /api/v1/admins
 * @access      Private
 */
exports.getAdminsCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'All Registered Admins'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
};
/**
 * @description Get Admin Profile
 * @route       GET /api/v1/admins/profile
 * @access      Private
 */
exports.getAdminProfileCtrl = AsyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.userAuth._id).select('-password -createdAt -updatedAt');

    if (!admin) {
        throw new Error("Admin not found")
    } else {
        res.status(200).json({
            status: 'success',
            data: admin,
            message: "Admin Profile fetched successfully"
        });
    }
});
/**
 * @description Update Admin
 * @route       UPDATE /api/v1/admins/:id
 * @access      Private
 */
exports.updateAdminCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin has been updated successfully'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
};
/**
 * @description Delete Admin
 * @route       DELETE /api/v1/admins/:id
 * @access      Private
 */
exports.deleteAdminCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin has been Deleted successfully'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
};
/**
 * @description Admin suspends a teacher
 * @route       PUT /api/v1/admins/suspend/teacher:id
 * @access      Private
 */
exports.adminSuspendTeacherCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin has Suspended teacher successfully'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
};
/**
 * @description Admin unsuspends a teacher
 * @route       PUT /api/v1/admins/unsuspend/teacher:id
 * @access      Private
 */
exports.adminUnsuspendteacherCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin has Unsuspended teacher successfully'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
};
/**
 * @description Admin withdrawl a teacher
 * @route       PUT /api/v1/admins/withdraw/teacher:id
 * @access      Private
 */
exports.adminWithdrawTeacherCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin has withdrawn teacher successfully'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
};
/**
 * @description Admin Unwithdrawl a teacher
 * @route       PUT /api/v1/admins/withdraw/teacher:id
 * @access      Private
 */
exports.adminUnwithdrawTeacherCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin has Unwithdrawn teacher successfully'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
};
/**
 * @description Admin Publish Exam Results
 * @route       PUT /api/v1/admins/publish/exam:id
 * @access      Private
 */
exports.adminPublishResultsCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin has published exam result(s) successfully'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
};
/**
 * @description Admin Unpublish Exam Results
 * @route       PUT /api/v1/admins/unpublish/exam:id
 * @access      Private
 */
exports.adminUnpublishResultsCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Admin has Unpublished exam result(s) successfully'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
};
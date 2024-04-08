const Admin = require("../../model/Staff/Admin");

/**
 * @description Register admins
 * @route       GET /api/v1/admins/register
 * @access      Private
 */
exports.registerAdminCtrl = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if admin already exists in the database
        const adminFound = await Admin.findOne({ email });
        // if (adminFound) {
        //     res.json('Admin Exists');
        // }
        // register user
        const user = await Admin.create({
            name,
            email,
            password
        });

        res.status(201).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
};

/**
 * @description login admins
 * @route       POST /api/v1/admins/login
 * @access      Private
 */
exports.loginAdminCtrl = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Admin.findOne({email})

        if(!user) {
            return res.json({
                message: "Invalid login credentials"
            });
        }

        if(user && await user.verifyPassword(password)) {
            return res.json({
                data: user
            });
        } else {
            return res.json({
                message: "Invalid login credentials"
            });
        }
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
};
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
 * @description Get Single Admin
 * @route       GET /api/v1/admins/:id
 * @access      Private
 */
exports.getAdminCtrl = (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: 'Single Admin'
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message
        })
    }
};
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
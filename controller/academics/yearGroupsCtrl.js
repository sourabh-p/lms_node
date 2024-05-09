const AsyncHandler = require("express-async-handler");
const Admin        = require("../../model/Staff/Admin");
const YearGroup = require("../../model/Academic/YearGroup");

/**
 * @description Create Year Group
 * @route POST /api/admins/year-groups
 * @access Private
 */
exports.createYearGroup = AsyncHandler(async (req, res) => {
    const { name, academicYear } = req.body;
    // Check if exists
    const yearGroup = await YearGroup.findOne({ name });
    if(yearGroup){
        throw new Error("Year Group/Graduation Year already exists");
    }    
    // create year group obj
    const subjectYearGroup = await YearGroup.create({
        name,
        academicYear,
        createdBy: req.userAuth._id
    });
    // find the admin
    const admin = await Admin.findById(req.userAuth._id);
    if(!admin) {
        throw new Error("Admin not found");
    }
    // push year group into admin
    admin.yearGroups.push(subjectYearGroup._id);
    // save
    await admin.save();
    // return response
    res.status(201).json({
        status: "success",
        message: "Year Group Created Successfully",
        data: subjectYearGroup,
    });
});

/**
 * @description Get All Year Groups
 * @route GET /api/admins/year-groups
 * @access Private
 */
exports.getYearGroups = AsyncHandler(async (req, res) => {
    
    res.status(200).json(res.results);
});

/**
 * @description Get Single Year Group
 * @route GET /api/admins/year-groups/:id
 * @access Private
 */
exports.getYearGroup = AsyncHandler(async (req, res) => { 
    const singleYearGroup = await YearGroup.findById(req.params.id);
    console.log('singleYearGroup :>> ', singleYearGroup);
    res.status(201).json({
        status: "success",
        message: "Single Year Group fetched successfully",
        data: singleYearGroup
    });
});

/**
 * @description Update Year Group
 * @route PUT /api/admins/year-groups/:id
 * @access Private
 */
exports.updateYearGroup = AsyncHandler(async (req, res) => {
    const { name, academicYear } = req.body;
    const yearGroupFound = await YearGroup.findOne({name});

    if(yearGroupFound){
        throw new Error("Year Group already exists");
    }
    const yearGroup = await YearGroup.findByIdAndUpdate(
        req.params.id,
        {
            name,
            academicYear,
            createdBy: req.userAuth._id,
        }, {
            new: true, // return updated user instead of original one
        }
    );

    res.status(201).json({
        status: "success",
        message: "Year Group updated successfully",
        data: yearGroup,
    });
});

/**
 * @description Delete Year Group
 * @route DELETE /api/admins/year-groups/:id
 * @access Private
 */
exports.deleteYearGroup = AsyncHandler(async (req, res) => {
    await YearGroup.findByIdAndDelete(req.params.id);

    res.status(201).json({
        status: "success",
        message: "Year Group Deleted Successfully",
    });
});
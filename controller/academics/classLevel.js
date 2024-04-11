const AsyncHandler = require("express-async-handler");
const Admin        = require("../../model/Staff/Admin");
const ClassLevel = require("../../model/Academic/ClassLevel");

/**
 * @description Create Class Level
 * @route POST /api/admins/class-levels
 * @access Private
 */
exports.createClassLevel = AsyncHandler(async (req, res) => {
    const { name, description, duration } = req.body;
    // cehck if the year exists
    const classFound = await ClassLevel.findOne({name});
    if(classFound){
        throw new Error("Academic term already exists");
    }
    // create
    const classLevelCreated = await ClassLevel.create({
        name,
        description,
        createdBy: req.userAuth._id
    });
    // push class into Admin
    const admin = await Admin.findById(req.userAuth._id);

    admin.classLevels.push(classLevelCreated._id); // push the created term ID to the admin instance upon creation.
    await admin.save();

    res.status(201).json({
        status: 'success',
        message: "Class Level Created",
        data: classLevelCreated,
    });

});

/**
 * @description Get All Class Levels
 * @route GET /api/admins/class-levels
 * @access Private
 */
exports.getClassLevels = AsyncHandler(async (req, res) => {
    const allClassLevels = await ClassLevel.find();

    res.status(201).json({
        status: 'success',
        message: "Class levels fetched successfully",
        data: allClassLevels,
    });

});

/**
 * @description Get Single Class Level
 * @route GET /api/admins/class-levels/:id
 * @access Private
 */
exports.getClassLevel = AsyncHandler(async (req, res) => { 
    const oneClassLevel = await ClassLevel.findById(req.params.id);

    res.status(201).json({
        status: "success",
        message: "Class Level fetched successfully",
        data: oneClassLevel
    });
});

/**
 * @description Update Single Class Level
 * @route PUT /api/admins/class-levels/:id
 * @access Private
 */
exports.updateClassLevel = AsyncHandler(async (req, res) => {
    const { name, description }   = req.body;
    const classLevelFound = await ClassLevel.findOne({name});

    if(classLevelFound){
        throw new Error("Academic term already exists");
    }
    const updatedClassLevel = await ClassLevel.findByIdAndUpdate(
        req.params.id,
        {
            name,
            description,
            createdBy: req.userAuth._id,
        }, {
            new: true, // return updated user instead of original one
        }
    );

    res.status(201).json({
        status: "success",
        message: "Class Level updated successfully",
        data: updatedClassLevel,
    });
});

/**
 * @description Delete Class Level
 * @route DELETE /api/admins/class-levels/:id
 * @access Private
 */
exports.deleteClassLevel = AsyncHandler(async (req, res) => {
    await ClassLevel.findByIdAndDelete(req.params.id);

    res.status(201).json({
        status: "success",
        message: "Class Level Deleted Successfully",
    });
});
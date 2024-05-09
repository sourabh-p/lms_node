// model,populate

// high order function that returns another function
const advancedResults = (model, populate) => {
  // since req is here, we can use queries
  return async (req, res, next) => {
    console.log(req.res);
    let TeachersQuery = model.find(); // return all data via `query`, then do pagination using mongoose
    /**
     * query string - additional data passed to url (optional - controller will still run)
     * params /:id any value that comes after id and must match db
     *
     */

    // If the query string has the name property, search for the name
    if (req.query.name) {
      // filtering/searching
      TeachersQuery = TeachersQuery.find({
        name: { $regex: req.query.name, $options: "i" },
      });
    }

    /**
     * Convert query strings to numbers
     */
    const page = Number(req.query.page) || 1; // using number constructor, look for query params 'page'
    const limit = Number(req.query.limit) || 2; // using number constructor, look for query params 'limit'
    const skip = (page - 1) * limit; // page minus 1 times the limit
    const total = await model.countDocuments(); // get total records

    const startIndex = (page - 1) * limit; // start index of the current page
    const endIndex = page * limit; // end index of the current page

    // pagination results
    const pagination = {};
    // add next
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }
    // add prev
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    const teachers = await TeachersQuery.find().skip(skip).limit(limit);

    res.results = {
        total,
        pagination,
        results: teachers.length,
        status: "success",
        message: "Teachers fetched successfully",
        data: teachers,
    }

    next();
  };
};

module.exports = advancedResults;

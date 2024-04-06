const mongoose = require("mongoose");

const dbConnect = async() => {
    try {
        await mongoose.connect("url");
        console.log("MongoDB Connected...");
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error.message);
        
    }
};

dbConnect();
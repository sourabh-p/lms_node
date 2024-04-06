const mongoose = require("mongoose");

const dbConnect = async() => {
    try {
        await mongoose.connect("mongodb+srv://adamf04:tJfVmWwBtTd6qpaD@cluster0.pwvt4un.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0");
        console.log("MongoDB Connected...");
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error.message);
        
    }
};

dbConnect();
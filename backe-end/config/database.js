const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://ouahid:ouahid123@nodemongodb.jc171an.mongodb.net/?retryWrites=true&w=majority&appName=NodeMongoDB")
        .then(() => console.log("MongoDB connected..."))
       
    }
    catch (error) {
        console.log("error with connectionDB : ", error)
    }
}

module.exports = connectDb;
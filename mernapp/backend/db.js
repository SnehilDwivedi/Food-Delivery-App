const { Result } = require('express-validator');
const mongoose = require('mongoose');

// Encode special characters in username and password
const mongoURI = 'mongodb://Foodie-TheFoodApp:snehil%40123@cluster0-shard-00-00.pmpuk.mongodb.net:27017,cluster0-shard-00-01.pmpuk.mongodb.net:27017,cluster0-shard-00-02.pmpuk.mongodb.net:27017/Foodie-TheFoodApp?ssl=true&replicaSet=atlas-80qbuj-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        // Connect to MongoDB using async/await
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        // Fetch food items data
        const fetched_data = await mongoose.connection.db.collection("food_items");
        const food_items = await fetched_data.find({}).toArray();

        // Fetch food categories data
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategory.find({}).toArray();

        // Set the global variables
        global.food_items = food_items;
        global.foodCategory = catData;

        console.log("Data fetched successfully.");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

module.exports = mongoDB;

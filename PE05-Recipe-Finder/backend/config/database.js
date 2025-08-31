const { MongoClient } = require('mongodb');

let db;
const MONGODB_URI = 'mongodb+srv://jgopssec:jack@cs628jack.2595q46.mongodb.net/';

const connectDB = async () => {
    try {
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        db = client.db('recipeFinderDB');
        console.log('MongoDB Atlas connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const getDB = () => db;

module.exports = { connectDB, getDB };
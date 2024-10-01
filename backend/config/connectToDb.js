require('dotenv').config()

const mongoose = require('mongoose')
const uri = process.env.DB_URI || ""

async function connectToDb(){
    await mongoose.connect(uri);
    console.log('Connected to MongoDb');
}

module.exports = connectToDb
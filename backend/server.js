require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connectToDb = require('./config/connectToDb')
const app = express()
const PORT = process.env.PORT || '3000'



// MIDDLEWARE
app.use(express.json())
app.use(cors())

connectToDb()

app.listen(PORT, ()=>{
    console.log(`Express Server is listening on PORT: ${PORT}`);
})
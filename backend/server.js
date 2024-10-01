require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || '3000'

app.listen(PORT, ()=>{
    console.log(`Express Server is listening on PORT: ${PORT}`);
})
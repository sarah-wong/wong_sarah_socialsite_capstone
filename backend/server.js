require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connectToDb = require('./config/connectToDb')
const validateToken = require('./config/validateToken')
const userRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter')
const profileRouter = require('./routes/profileRouter')

const app = express()
const PORT = process.env.PORT || '3000'

connectToDb()

// MIDDLEWARE
app.use(express.json())
app.use(validateToken)
app.use(cors())


// ROUTES
app.use('/user', userRouter)
app.use('/post', postRouter)
app.use('/profile', profileRouter)

app.use((err, req, res, next)=>{
    if(err)
    {
        console.error(err);
        // 500 Internal Server Error
        res.status(500).send('Whoops...')
    }
   next()
})


app.listen(PORT, ()=>{
    console.log(`Express Server is listening on PORT: ${PORT}`);
})
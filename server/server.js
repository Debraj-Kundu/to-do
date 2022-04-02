const dbConn = require('./db')
const express = require('express')
const cors = require('cors')
const router = require('./routes')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/todo', router)



const start = async ()=>{
    try{
        await dbConn(process.env.MONGO_URL)
        app.listen(9000, ()=>console.log('runnin'))
    }catch(err){
        console.log(err)
    }
}

start()
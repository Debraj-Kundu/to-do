const mongoose = require('mongoose')

const conn = (url)=>{
    mongoose.connect(url)
}

module.exports = conn
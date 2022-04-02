const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = Schema({
    detail: {
        type: String,
        required: [true, 'required'],
        trim: true
    },
    done:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Todos", TaskSchema)
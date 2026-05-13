import mongoose from "mongoose"


//step -1:You need to create a Schema
//step-2:You would create a model

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    content: {
        type: String,
        required:true
    },
}, { timestamps: true })

const Note = mongoose.model("Note", noteSchema)

export default Note;
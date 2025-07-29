import mongoose, { Document, Schema } from "mongoose";
import { Comments } from "./Comments";
import { User } from "./User";

export interface Notes extends Document {
    title: string,
    description: string,
    fileURL: string,
    tags: string[],
    subject: string,
    likes: number,
    comments: mongoose.Types.ObjectId[] | Comments[],
    uploadedBy: mongoose.Types.ObjectId | User,
    createdAt: Date
}

const notesSchema: Schema<Notes> = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },

    description: {
        type: String,
        required: [true, "Description is required"]
    },

    fileURL: {
        type: String,
    },

    tags: {
        type: [String],
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    likes: {
        type: Number,
        default: 0
    },

    comments: [{
        type: mongoose.Types.ObjectId,
        ref: "Comments"
    }],

    uploadedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

const notesModel = (mongoose.models.Notes as mongoose.Model<Notes>) || (mongoose.model<Notes>("Notes", notesSchema));
export default notesModel;
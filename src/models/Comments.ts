import mongoose, { Document, Schema } from "mongoose";
import { User } from "./User";
import { Notes } from "./Notes";

export interface Comments extends Document {
    content: string,
    count: number,
    notesId: mongoose.Types.ObjectId | Notes,
    userId: mongoose.Types.ObjectId | User,
    createdAt: Date
}

const commentsSchema: Schema<Comments> = new Schema({
    content: {
        type: String,
        required: [true, "Please make some comments"]
    },

    count: {
        type: Number,
        default: 0
    },

    notesId: {
        type: mongoose.Types.ObjectId,
        ref: "Notes"
    },

    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

const commentsModel = (mongoose.models.Comments as mongoose.Model<Comments>) || (mongoose.model<Comments>("Comments", commentsSchema));
export default commentsModel;
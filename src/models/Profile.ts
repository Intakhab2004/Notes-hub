import mongoose, { Document, Schema } from "mongoose";


export interface Profile extends Document {
    firstName: string,
    lastName: string,
    gender: string,
    dateOfBirth: string,
    about: string,
    contactNumber: string
}

const profileSchema: Schema<Profile> = new Schema({
    firstName: {
        type: String,
        trim: true
    },

    lastName: {
        type: String,
        trim: true
    },
    
    gender: {
        type: String
    },

    dateOfBirth: {
        type: String
    },

    about: {
        type: String,
        trim: true
    },

    contactNumber: {
        type: String,
        trim: true
    }
})

const profileModel = (mongoose.models.Profile as mongoose.Model<Profile>) || mongoose.model<Profile>("Profile", profileSchema);
export default profileModel;
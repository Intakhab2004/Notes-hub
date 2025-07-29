import mongoose from "mongoose";

interface connectionType {
    isConnected?: number
}

const connection: connectionType = {};

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Database is already connected!");
        return ;
    }

    try{
        const response = await mongoose.connect(process.env.DB_URL || "");
        console.log("Database connected successfully");
        connection.isConnected = response.connections[0].readyState;
    }
    catch(error: unknown){
        console.log("Something went wrong while connecting to the database");
        if(error instanceof Error){
            console.log("An error occured: ", error.message);
        }
        else{
            console.log("An unknown error: ", error);
        }

        process.exit(1);
    }
}

export default dbConnect;
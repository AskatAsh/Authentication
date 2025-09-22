import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect("mongodb+srv://note_app:VODJATjcQcswbUtb@cluster01.d7f8blu.mongodb.net/authentication?retryWrites=true&w=majority&appName=Cluster01");

        console.log("Successfully connected to mongodb!");
        server = app.listen(5000, () => {
            console.log("Server listening to: http://localhost:5000")
        })

    } catch (error) {
        console.log(error);
    }
}

startServer();
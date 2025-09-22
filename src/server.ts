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

// unhandled rejection error
process.on('unhandledRejection', (error) => {
    console.log("Unhandled rejection detected! Server shutting down...\n", error);

    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1);
})
// Promise.reject("Forgot to catch this promise.");

// uncaught exception error
process.on('uncaughtException', (error) => {
    console.log("Uncaught exception detected! Server shutting down...\n", error);

    if (server) {
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1);
})
// throw new Error("Forgot to handle local errors.");
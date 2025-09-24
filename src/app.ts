import cors from 'cors';
import express, { Request, Response } from "express";
import { UserRoutes } from "./app/modules/user/user.route";

// create express app
const app = express();

// middleware to parse request body
app.use(express.json());

// middleware for cross origin resource sharing
app.use(cors());

// middleware for user routes
app.use('/api/v1/user', UserRoutes);

// root get api
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "Authentication server is running..."
    })
})

export default app;
import cors from 'cors';
import express, { Request, Response } from "express";
import { router } from './app/routes';

// create express app
const app = express();

// middleware to parse request body
app.use(express.json());

// middleware for cross origin resource sharing
app.use(cors());

// middleware for routes
app.use('/api/v1/', router);

// root get api
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: "Authentication server is running..."
    })
})

export default app;
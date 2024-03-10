import express, { Express, Router } from "express";
import dotenv from "dotenv";
// import { callthirdServer } from "../controllers/callthirdServer";
import { checkServerHealth } from "../server_health/checkServerHealth";
import { Request, Response } from "express";

dotenv.config();

export const server3: Express = express();

const router: Router = Router();

router.get("/health-check", checkServerHealth);

router.get("/", callthirdServer);

server3.use(router);

export function callthirdServer(req: Request, res: Response,) {
    try {
        const response: string = `Received request from ${req.method} ${req.protocol} host: ${req.hostname} --> "Hello from the third backend server !"`;
        return res.status(200).json(response);
    } catch (err) {
        console.log(err);
        return res.status(200).json("Error occured please try again later !");
    }
}
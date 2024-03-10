import express, { Express, Router } from "express";
import dotenv from "dotenv";
// import { callSecondServer } from "../controllers/callSecondServer";
import { checkServerHealth } from "../server_health/checkServerHealth";
import { Request, Response } from "express";

dotenv.config();

export const server2: Express = express();

const router: Router = Router();

router.get("/health-check", checkServerHealth);

router.get("/", callSecondServer);

server2.use(router);


export function callSecondServer(req: Request, res: Response,) {
    try {
        const response: string = `Received request from ${req.method} ${req.protocol} host: ${req.hostname} --> "Hello from the second backend server !"`;
        return res.status(200).json(response);
    } catch (err) {
        console.log(err);
        return res.status(200).json("Error occured please try again later !");
    }
}
import express, { Express, Router } from "express";
import dotenv from "dotenv";
import { checkServerHealth } from "../server_health/checkServerHealth";
import { Request, Response } from "express";

dotenv.config();

export const server5: Express = express();

const router: Router = Router();

router.get("/health-check", checkServerHealth);

router.get("/", callfifthServer);

server5.use(router);

export function callfifthServer(req: Request, res: Response,) {
    try {
        const response: string = `Received request from ${req.method} ${req.protocol} host: ${req.hostname} --> "Hello from the fifth backend server !"`;
        return res.status(200).json(response);
    } catch (err) {
        console.log(err);
        return res.status(200).json("Error occured please try again later !");
    }
}
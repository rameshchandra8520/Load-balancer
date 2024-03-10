import express, { Express, Router } from "express";
import dotenv from "dotenv";
import axios from "axios";
import { Request, Response } from "express-serve-static-core";
import { serversarray, servers } from "../index";
import { checkServerHealth,gracefulShutdown } from "../server_health/checkServerHealth";

dotenv.config();

export const loadBalancer: Express = express();

const router: Router = Router();

let index = 0;
let server: string;

const sendHttpRequest = async (endpoint: string): Promise<any> => {
    try {
        const serverResponse = await axios.get(endpoint);
        console.log()
        console.log(endpoint);
        return serverResponse.data;
    }
     catch (error) {
    //     console.error(`Error making request to ${endpoint}`);
        return null;
    }
};

const callLoadBalancer = async (req: Request, res: Response) => {
    const maxAttempts = serversarray.length;
    let attempts = 0;

    while (attempts < maxAttempts) {
        server = serversarray[index];
        const responseData = await sendHttpRequest(server);
        index = (index + 1) % serversarray.length;

        if (responseData) {
            console.log(`Request successfully processed by server: ${server}`);
            return res.status(200).json(responseData);
        }
        console.log()
        console.log(`Server ${server} did not respond. Trying the next server.`);
        attempts++;
    }

    console.log(`All servers failed to respond.`);
    return res.status(500).json({ error: 'All servers failed to respond' });
};

router.get("/", callLoadBalancer);
router.get("/health-check", checkServerHealth);
router.get("/shutdown",gracefulShutdown);

loadBalancer.use(router);

// Define a route for stopping a server by index
router.get("/stop/:index", (req: Request, res: Response) => {
  const indexToStop = parseInt(req.params.index, 10) - 1; // Convert to 0-based index
    // console.log(indexToStop);
  if (indexToStop >= 0 && indexToStop < servers.length) {
    const serverToStop = servers[indexToStop];

    if (serverToStop) {
      serverToStop.close(() => {
        console.log(`Server-${indexToStop + 1} has been stopped.`);
        res.send(`Server-${indexToStop + 1} has been stopped.`);
      });
    } else {
      res.status(404).send("Server not found.");
    }
  } else {
    res.status(400).send("Invalid server index.");
  }
});
 

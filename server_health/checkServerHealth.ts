import { Request, Response } from "express";
import { serversarray } from "..";

interface HealthCheck {
    timestamp: number;
    message: string;
    responseTime: Array<number>;
    uptime: any;
}
const healthCheckInterval = 1000; // 1 seconds
let performHealthChecks = true;

export const checkServerHealth = async (req: Request, res: Response) => {
    const healthcheck: HealthCheck = {
        timestamp: Date.now(),
        message: "OK",
        responseTime: process.hrtime(),
        uptime: process.uptime(),
    };
    performHealthChecks = true;

    const performHealthCheck = async (server: string) => {
        try {
            const response = await fetch(server);
            const result = await response.json();
            console.log(`${server} is active.`);
        } catch (error:any) {
            console.log();
            console.error(`Uh-oh! ${server} is not responding`);
            console.log();
        }
    };

    const runHealthChecksSequentially = async () => {
        for (const server of serversarray) {
            if (!performHealthChecks) {
                break; // Stop health checks if the flag is set to false
            }
            await performHealthCheck(server);
            await new Promise(resolve => setTimeout(resolve, healthCheckInterval));
        }
    };

    
    // Set up periodic health checks
    const healthCheckIntervalId = setInterval(async () => {
        await runHealthChecksSequentially();
    }, healthCheckInterval * serversarray.length); // Set interval for the total time to check all servers sequentially
    
    // Perform initial health check
    await runHealthChecksSequentially();

    // Handle cleanup when the server is closed
    const cleanup = () => {
        clearInterval(healthCheckIntervalId);
    };

    return res.status(200).json(healthcheck);
};


export const gracefulShutdown = async (req: Request, res: Response) => {
    console.log("Received shutdown signal. Health checks are being paused...");
    performHealthChecks = false; // Set the flag to stop health checks
    return res.send("Health checks are being paused...");
};

 
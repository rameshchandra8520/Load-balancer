import express, { Express, Request, Response } from "express";
import { loadBalancer } from "./servers/loadBalancer";
import { server1 } from "./servers/server1";
import { server2 } from "./servers/server2";
import { server3 } from "./servers/server3";
import { server4 } from "./servers/server4";
import { server5 } from "./servers/server5";
import dotenv from "dotenv";
import http from "http";

dotenv.config();

export let index: number = 0;


const port = process.env.LOAD_BALANCER_PORT;

// Individual server ports
const server1Port = process.env.SERVER_1_PORT;
const server2Port = process.env.SERVER_2_PORT;
const server3Port = process.env.SERVER_3_PORT;
const server4Port = process.env.SERVER_4_PORT;
const server5Port = process.env.SERVER_5_PORT;

export const servers: http.Server[] = [];
const serverPorts: Array<string | undefined> = [server1Port, server2Port, server3Port, server4Port, server5Port];
// Generate server URLs
export const serversarray: Array<string> = serverPorts.map((port, index) => {
    return port ? `http://localhost:${port}` : "";
  });


loadBalancer.listen(port, () => {
    console.log(`Load balancer is running at http://localhost:${port}`);
});

// Helper function to start an individual server
function startServer(server: Express, serverPort: string | undefined, serverName: string): http.Server | undefined {
    if (serverPort) {
      const httpServer = server.listen(serverPort, () => {
        console.log(`${serverName} is running at http://localhost:${serverPort}`);
      });
  
      servers.push(httpServer);
  
      return httpServer;
    }
  
    return undefined;
}
 

// Start individual servers
const httpServer1 = startServer(server1, server1Port, "Server-1");
const httpServer2 = startServer(server2, server2Port, "Server-2");
const httpServer3 = startServer(server3, server3Port, "Server-3");
const httpServer4 = startServer(server4, server4Port, "Server-4");
const httpServer5 = startServer(server5, server5Port, "Server-5");
  




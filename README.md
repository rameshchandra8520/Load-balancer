## Load balancer 

- A load balancer sits in front of a group of servers and routes client requests across all of the servers that are capable of handling those requests. Its purpose is to minimize response time and maximize utilization.

- To achieve minimal response time, the load balancer prevents any single server from slowing down the system, distributing the load evenly across multiple servers.
- Maximum utilization is achieved by ensuring that each server in the group is actively handling requests and the workload is evenly distributed.

Fault Tolerance:
- If a server becomes unavailable or goes offline, the load balancer redirects traffic to other available servers.

Automatic Scalling
- When new servers are added to the system, the load balancer automatically includes them in the distribution of incoming requests.

Health Checks:
- Load balancers often perform health checks on individual servers to assess their availability and performance.
- If a server is found to be unhealthy, the load balancer stops directing traffic to that server until it recovers.

<h2> How the project works  ?</h2> 

-   You have 5 "Express" servers and a "load balancer" sitting infront of them. <br />

-   This command "curl http://localhost:LOAD_BALANCER_PORT" calls the load balancer, then the load balancer will forward that request to servers according to RR (Round Robin) algorithm: <br/>

-   1st request => 1st server <br/>
-   2nd request => 2nd server <br/>
-   3rd request => 3rd server <br/> 
-   4th request => 4th server <br/>
-   5th request => 5th server <br/>
-   6th request => 1st server <br/>
- ....

<h1>How to run the project on your machine ?</h1>

-   Clone the repository
-   npm install 
-   Generate ".env" file and allocate these variables to unused ports on your local machine: <br />
    - LOAD_BALANCER_PORT=
    - SERVER-1_PORT=
    - SERVER-2_PORT=
    - SERVER-3_PORT=
    - SERVER-4_PORT=
    - SERVER-5_PORT=
-   npm run dev


- Once you run  the command "npm run dev". All the servers get started and the load balancer will be listening on the port you allocated in the ".env" file.
- When you send an HTTP request to the load balancer by: <br />
    - curl http://localhost:LOAD_BALANCER_PORT/<br />

- It will forward the request to the active servers and you will get message from server according to RR algorithm.
    - ```Request successfully processed by server: http://localhost:3003 ```

- This command checks the health of the server and provides a response containing details about it:<br />
    - curl http://localhost:LOAD_BALANCER_PORT/health-check <br />

- To stop any server, you can use the following command:
    - curl http://localhost:LOAD_BALANCER_PORT/stop/server_index
    - ```For example-> curl http://localhost:8000/stop/2 ```
        - And when you send a request to that server, then it will respond with `Server http://localhost:3002 did not respond. Trying the next server.`

- And to stop the health check, you can use the following
    - ``` curl http://localhost:LOAD_BALANCER_PORT/shutdown ```

- So, if all servers are down, then any request sent to the load balancer will send an error response
    - ``` "error":"All servers failed to respond" ```


## Docker Setup Instructions

To use Docker for your web app, follow these simple steps:

1. Install Docker
If you haven't already installed Docker, you can download and install it from the official website: [Docker Website](https://docs.docker.com/get-docker/)

2. Build Docker Image
Navigate to the root directory of your web app where the Dockerfile is located and run the following command to build your Docker image:

```
docker build -t my-web-app 
```
Replace my-web-app with a suitable name for your Docker image.

3. Run Docker Container
Once the Docker image is built, you can run a Docker container using the following command:
```
docker run -d -p 8000:8000 --name my-web-app-container my-web-app
```
Replace 8000 with the port number your web app is running on, and my-web-app-container with a suitable name for your Docker container.

4. Access Your Web App
You can now access your web app by navigating to http://localhost:8000 in your web browser.
<h1> How the project works  ?</h1> <br />

-   You have 5 "Express" servers and a "load balancer" sitting infront of them. <br />

-   This command "curl http://localhost:80" calls the load balancer, then the load balancer will forward that request to servers according to RR (Round Robin) algorithm: <br/>

-   1st request => 1st server <br/>
-   2nd request => 2nd server <br/>
-   3rd request => 3rd server <br/> 
-   4th request => 4th server <br/>
-   5th request => 5th server <br/><br /> <br />

<h1>How to run the project on your machine ?</h1>

<strong><h3>Follow these tips:</h3></strong>
-   clone the repo
-   npm install
-   Generate ".env" file and allocate these variables to unused ports on your local machine: <br />
    - LOAD_BALANCER_PORT=
    - SERVER-1_PORT=
    - SERVER-2_PORT=
    - SERVER-3_PORT=
    - SERVER-4_PORT=
    - SERVER-5_PORT=
-   npm run dev


<strong><h3>How to use the project works?</h3></strong>
- Once you run  the command "npm run dev".
- When you send an HTTP request to the load balancer by: <br />
    - curl http://localhost:LOAD_BALANCER_PORT/<br />

- It will forward the request to the active servers
and you will get hello from server... <br />
according to RR algorithm.
    - ```http://localhost:3003
Request successfully processed by server: http://localhost:3003 ```

- This command is responsible for checking the health of server: <br />
    - curl http://localhost:PORT_NUMBER/health-check <br />

- when you run the previous command you will get a response contains details abt you server.

- Try to kill one of the servers(by uncommenting "throw new Error()" in "healthChecker.ts")
and run this cmd: 
- curl http://localhost:PORT_NUMBER/health-check <br />
and the broken server will be out.

- To stop any server, you can use the following command:
    - curl http://localhost:PORT_NUMBER/stop/server_index
    - ```For example-> curl http://localhost:8000/stop/2 ```
        - And when you send a request to that server, then it will respond with `Server http://localhost:3002 did not respond. Trying the next server.`

- To check the server status, you can use the following command:
    - ``` curl http://localhost:8000/health-check```
- And to stop the health check, you can use the following
    - ``` curl http://localhost:8000/shutdown ```

- So, if all servers are down, then any request sent to the load balancer will send an error response
    - ``` "error":"All servers failed to respond" ```
import { createServer } from "http";
import express, { Express, urlencoded } from "express";
import helmet from "helmet";
import { getConfig } from "./config";

const port = getConfig("http:port", 5000);

const expressApp: Express = express();

expressApp.use(helmet());
expressApp.use(express.json());
expressApp.use(urlencoded({ extended: true }));

expressApp.get("/", (req, resp) => {
  resp.send("Hello, Digital Training Log App");
});

const server = createServer(expressApp);

server.listen(port, 
  () => console.log(`HTTP Server listening on port ${port}`)
);
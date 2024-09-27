import express from "express";
import http from 'node:http';
import { createBareServer } from "@nebula-services/bare-server-node";
import path from 'node:path';
import { hostname } from "node:os";
import { dynamicPath } from "@nebula-services/dynamic";

const server = http.createServer();
const __dirname = process.cwd();
const app = express(server);
const bareServer = createBareServer('/bare/');
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/dynamic/", express.static(dynamicPath));


server.on('request', (req, res) => {
    if (bareServer.shouldRoute(req)) {
      bareServer.routeRequest(req, res);
    } else {
      app(req, res);
    }
  });
  
  server.on('upgrade', (req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
      bareServer.routeUpgrade(req, socket, head);
    } else {
      socket.end();
    }
  });
  
  server.on('listening', () => {
    console.log(`Interscope`);
  console.log("Listening on:");
  console.log(`\thttp://localhost:${PORT}`);
  console.log(`\thttp://${hostname()}:${PORT}`);
  console.log(
    `\thttp://${
      server.address().family === "IPv6" ? `[${server.address().address}]` : server.address().address
    }:${PORT}`
  );
  });
  
  server.listen({
    port: PORT,
  });
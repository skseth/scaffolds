// server/server.ts
import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { App } from "../client/components/app";
import { error404, handleRouteErrors, makeError } from './errors'

const server = express();

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

server.use("/", express.static(path.join(__dirname, "static")));

const manifest = fs.readFileSync(
  path.join(__dirname, "static/manifest.json"),
  "utf-8"
);
const assets = JSON.parse(manifest);

server.get("/", (req, res) => {
  const component = ReactDOMServer.renderToString(React.createElement(App));
  res.render("client", { assets, component });
});

server.get("/", (req, res) => {
  res.send("Hello from Server");
});

server.get("/api/nodes", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  res.end(
    JSON.stringify({
      firstName: "John",
      lastName: "Doe",
    })
  );
});


/* provide 404 response if no routes match */
server.use(error404);

/* general error-handler: returns JSON with error info */
server.use(handleRouteErrors);

server.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});

import { RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import { app } from "./app";

// TODO: Initialize a MongoDB Service Client
const mongoClient = app.getServiceClient(
  RemoteMongoClient.factory,
  "mongodb-atlas"
);

// TODO: Instantiate a collection handle for todo.items
const stitchUsers = mongoClient.db("dbMERN1").collection("users");

export { stitchUsers };
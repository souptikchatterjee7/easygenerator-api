import express from "express";
import http from "http";
import cors from "cors";
const app = express();
import { Route } from "./route.js";
const route = new Route();
import { config } from "./constants.js";
import mongoose from "mongoose";
import "dotenv/config";

const mongoUri =
    "mongodb+srv://" +
    process.env.USERNAME +
    ":" +
    process.env.PASSWORD +
    "@" +
    config.mongo.dbConnect +
    "/" +
    config.mongo.databaseName +
    "?retryWrites=true&w=majority";

const mongoParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
route.register(app);

server.listen(config.port, async () => {
    // eslint-disable-next-line
    console.log("Server is now running on http://localhost:" + config.port);
    await startMongo();
});

async function startMongo() {
    mongoose
        .connect(mongoUri, mongoParams)
        .then(async () => {
            // eslint-disable-next-line
            console.log("Database connected successfully.");
        })
        .catch((e) => {
            // eslint-disable-next-line
            console.log(e);
        });
}

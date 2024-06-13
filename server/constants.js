const environment = process.argv[2] || "dev";
import { configuration } from "./config.js";

export const env = environment;

export const config = configuration[environment];

export const constants = {
    tokenValidityDays: 30
};

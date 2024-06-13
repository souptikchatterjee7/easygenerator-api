import User from "./schema.js";
import { ErrorClass } from "../../handlers/error.js";
const error = new ErrorClass();

export class ActivityController {
    constructor() {}

    async registerUser(req, res) {
        try {
            // code goes here
        } catch (e) {
            const { status, message, heading } = error.getError(e);
            return res
                .status(status)
                .json({ message: message, heading: heading });
        }
    }

    async loginUser(req, res) {
        try {
            // code goes here
        } catch (e) {
            const { status, message, heading } = error.getError(e);
            return res
                .status(status)
                .json({ message: message, heading: heading });
        }
    }

    async getUserProfile(req, res) {
        try {
            // code goes here
        } catch (e) {
            const { status, message, heading } = error.getError(e);
            return res
                .status(status)
                .json({ message: message, heading: heading });
        }
    }
}

import User from "./schema.js";
import { ErrorClass } from "../../handlers/error.js";
const error = new ErrorClass();
import { checkRegisterValidations } from "../../handlers/shared.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { constants } from "../../constants.js";

export class ActivityController {
    constructor() {}

    async registerUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const validationObj = checkRegisterValidations(
                name,
                email,
                password
            );
            if (!validationObj.success) {
                return res.status(400).json({ message: validationObj.error });
            }
            const salt = bcrypt.genSaltSync(constants.bycryptSaltRounds);
            const hash = bcrypt.hashSync(password, salt);
            const userPostData = {
                name,
                email,
                password: hash
            };
            await User.create(userPostData);
            return res
                .status(200)
                .json({ message: "You have been registered succesfully." });
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

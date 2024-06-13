import User from "./schema.js";
import { ErrorClass } from "../../handlers/error.js";
const error = new ErrorClass();
import {
    checkProfileValidations,
    comparePasswords,
    generatePassword
} from "../../handlers/shared.js";
import { SessionController } from "../sessions/controller.js";

export class ActivityController {
    constructor() {}

    async registerUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const validationObj = checkProfileValidations(
                name,
                true,
                email,
                password,
                null,
                false
            );
            if (!validationObj.success) {
                return res.status(400).json({ message: validationObj.error });
            }
            const userPostData = {
                name,
                email,
                password: generatePassword(password)
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
            const { email, password, device } = req.body;
            const validationObj = checkProfileValidations(
                "",
                false,
                email,
                password,
                device,
                true
            );
            if (!validationObj.success) {
                return res.status(400).json({ message: validationObj.error });
            }
            const userData = await User.findOne({ email: email });
            if (!userData) {
                return res.status(400).json({
                    message: "You have provided invalid login credentials."
                });
            }
            const flag = comparePasswords(password, userData.password);
            if (!flag) {
                return res.status(400).json({
                    message: "You have provided invalid login credentials."
                });
            }
            const tokenPostBody = {
                deviceId: device,
                user: userData._id
            };
            const sessionController = new SessionController();
            const tokenObj = await sessionController.generateNewToken(
                tokenPostBody
            );
            return res.status(200).json({ token: tokenObj.token });
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

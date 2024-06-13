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
            // check if given input data is valid or not
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
            // create new user
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
            // check if given input data is valid or not
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
            // get user data based on email id provided
            const userData = await User.findOne({ email: email });
            if (!userData) {
                return res.status(400).json({
                    message: "You have provided invalid login credentials."
                });
            }
            // check if password given is correct or not
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
            // return the name of the logged in user
            const { name, email } = req.user;
            return res.status(200).json({ name, email });
        } catch (e) {
            const { status, message, heading } = error.getError(e);
            return res
                .status(status)
                .json({ message: message, heading: heading });
        }
    }
}

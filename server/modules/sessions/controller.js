import { ErrorClass } from "../../handlers/error.js";
const error = new ErrorClass();
import Session from "./schema.js";
import { v4 as uuidv4 } from "uuid";
import { constants } from "../../constants.js";

export class SessionController {
    constructor() {}

    async generateNewToken(req, res) {
        try {
            let expiry = new Date(
                new Date().getTime() +
                    constants.tokenValidityDays * 24 * 60 * 60 * 1000
            );
            let sessionObj = {
                deviceId: req.body.deviceId,
                token: uuidv4(),
                expiry: expiry,
                user: req.body.user
            };
            let session = await Session.create(sessionObj);
            return res.status(200).json({ token: session.token });
        } catch (e) {
            error.getError(e);
            return res
                .status(401)
                .json({ message: "Invalid credentials provided." });
        }
    }

    async validateSession(token, deviceId) {
        try {
            let existingSession = await Session.findOne({
                token: token,
                deviceId: deviceId
            }).populate("user", "name email");
            if (existingSession) {
                if (new Date() < existingSession.token) {
                    return { success: true, user: existingSession.user };
                } else {
                    return {
                        success: false,
                        message: "Your token has expired. Please re-login."
                    };
                }
            }
            return { success: false, message: "Invalid credentials provided." };
        } catch (e) {
            error.getError(e);
            return { success: false, message: "Server error. Please re-try." };
        }
    }
}

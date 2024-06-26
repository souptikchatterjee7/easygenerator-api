import { ErrorClass } from "../../handlers/error.js";
const error = new ErrorClass();
import Session from "./schema.js";
import { v4 as uuidv4 } from "uuid";
import { constants } from "../../constants.js";

export class SessionController {
    constructor() {}

    // generate new token for logged in user
    async generateNewToken(data) {
        try {
            let expiry = new Date(
                new Date().getTime() +
                    constants.tokenValidityDays * 24 * 60 * 60 * 1000
            );
            let sessionObj = {
                deviceId: data.deviceId,
                token: uuidv4(),
                expiry: expiry,
                user: data.user
            };
            // create new session
            let session = await Session.create(sessionObj);
            return { token: session.token };
        } catch (e) {
            throw e;
        }
    }

    // check given token device combo to validate session for logged in user
    async validateSession(token, deviceId) {
        try {
            let existingSession = await Session.findOne({
                token: token,
                deviceId: deviceId
            }).populate("user", "name email");
            if (existingSession) {
                // check if the session has already expired
                if (new Date() < existingSession.expiry) {
                    return { success: true, user: existingSession.user };
                } else {
                    // delete expired session
                    await Session.deleteOne({ _id: existingSession._id });
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

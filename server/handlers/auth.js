import { SessionController } from "../modules/sessions/controller.js";
const sessionController = new SessionController();

export class AuthClass {
    constructor() {}

    validate() {
        return async (req, res, next) => {
            // Get token from header params
            const token = req.header("Token");
            // Get device from header params
            const device = req.header("Device");
            if (!token || token === "" || !device || device === "") {
                return res.status(401).json({
                    message: "You don't have sufficient permissions."
                });
            } else {
                // check if token and device combo is valid session or not
                let sessionObj = await sessionController.validateSession(
                    token,
                    device
                );
                if (!sessionObj.success) {
                    return res
                        .status(401)
                        .json({ message: sessionObj.message });
                }
                // set user info to req.user for access by the api flow
                req.user = sessionObj.user;
                next();
            }
        };
    }
}

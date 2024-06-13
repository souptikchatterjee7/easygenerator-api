import { SessionController } from "../modules/sessions/controller.js";
const sessionController = new SessionController();

export class AuthClass {
    constructor() {}

    validate() {
        return async (req, res, next) => {
            const token = req.header("Token");
            const device = req.header("Device");
            if (!token || token === "" || !device || device === "") {
                return res.status(401).json({
                    message: "You don't have sufficient permissions."
                });
            } else {
                let sessionObj = await sessionController.validateSession(
                    token,
                    device
                );
                if (!sessionObj.success) {
                    return res
                        .status(401)
                        .json({ message: sessionObj.message });
                }
                req.user = sessionObj.user;
                next();
            }
        };
    }
}

import { router as UserRoute } from "./modules/users/route.js";

export class Route {
    constructor() {}

    register(app) {
        app.use("/users", UserRoute);
    }
}

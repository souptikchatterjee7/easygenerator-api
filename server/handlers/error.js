export class ErrorClass {
    constructor() {}

    getError(error) {
        console.log(error);
        let message = "";
        let heading = "";
        let status = 400;
        switch (error.status) {
            case 400:
                status = 400;
                message += "Bad Request. Contact support.";
                break;
            case 401:
                status = 401;
                message += "Invalid Credentials. Please login again.";
                heading += "Logged out";
                break;
            case 404:
                status = 404;
                message += "Network Error. Contact support.";
                break;
            case 500:
                status = 500;
                message += "Server Error.  Contact support.";
                break;
            default:
                status = 400;
                message += "Error has occured. Contact support.";
                heading += "Error occurred";
        }
        return {
            status,
            message,
            heading
        };
    }

    showAxiosError(error) {
        return "Status " + error.status + " ==> " + error.data.message;
    }
}

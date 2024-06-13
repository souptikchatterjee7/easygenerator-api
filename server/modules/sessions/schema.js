import mongoose, { mongo } from "mongoose";

const SessionSchema = new mongoose.Schema(
    {
        deviceId: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        },
        expiry: {
            type: Date
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "modifiedAt"
        }
    }
);

export default mongoose.model("Session", SessionSchema);

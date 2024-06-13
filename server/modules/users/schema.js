import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            trim: true,
            required: true
        }
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "modifiedAt"
        }
    }
);

export default mongoose.model("User", UserSchema);

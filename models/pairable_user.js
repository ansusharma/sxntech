import mongoose from "mongoose";

// Create user schema
const PairableUserSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    topic: {
        type: String,
        required: false,
    },
    roomName: {
        type: String,
        required: false,
    },
    token: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: false,
    },
});

const PairableUser = mongoose.model("pairable_users", PairableUserSchema);

export default PairableUser;
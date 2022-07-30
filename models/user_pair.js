import mongoose from "mongoose";

// Create UserPair schema
const UserPairSchema = new mongoose.Schema({
    commonTopic: {
        type: String,
        required: false,
    },
    userid1: {
        type: String,
        required: true,
    },
    token1: {
        type: String,
        required: true,
    },
    userid2: {
        type: String,
        required: true,
    },
    token2: {
        type: String,
        required: true,
    },
    roomName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: false,
    },
});

const UserPair = mongoose.model("user_pair", UserPairSchema);

export default UserPair;
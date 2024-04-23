import mongoose, { Mongoose } from "mongoose";

const UserSchema = new mongoose.Schema({
    clerkId: String,
    wishlist: {
        type: Array,
        default: []
    },
}, {timestamps: true});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
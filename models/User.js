import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    developer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer',
        required: true,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
import mongoose from 'mongoose';

const developerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    apiKey: {
        type: String,
        unique: true,
    },
}, {
    timestamps: true,
});

const Developer = mongoose.model('Developer', developerSchema);

export default Developer;
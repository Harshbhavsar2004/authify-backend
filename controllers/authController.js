import User from '../models/User.js';
import Developer from '../models/Developer.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateApiKey } from '../utils/generateApiKey.js';

export const registerDeveloper = async (req, res) => {
    const { name, email } = req.body;

    try {
        const apiKey = generateApiKey();
        const developer = new Developer({ name, email, apiKey });
        await developer.save();

        res.status(201).json({ message: 'Developer registered successfully.', apiKey });
    } catch (error) {
        res.status(500).json({ message: 'Error registering developer', error });
    }
};

export const registerUser = async (req, res) => {
    const { email, password, apiKey, tokenExpiry = '1h' } = req.body;

    try {
        const developer = await Developer.findOne({ apiKey });
        if (!developer) {
            return res.status(401).send('Invalid API Key.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, developer: developer._id });
        await user.save();

        const token = jwt.sign({ userId: user._id }, apiKey, { expiresIn: tokenExpiry });
        user.token = token;
        await user.save();

        res.status(201).json({ message: 'User registered successfully.', token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

export const loginUser = async (req, res) => {
    const { email, password, apiKey, tokenExpiry = '1h' } = req.body;

    try {
        const user = await User.findOne({ email }).populate('developer');
        if (!user || !await bcrypt.compare(password, user.password) || user.developer.apiKey !== apiKey) {
            return res.status(401).send('Invalid email, password, or API Key.');
        }

        const token = jwt.sign({ userId: user._id }, apiKey, { expiresIn: tokenExpiry });
        user.token = token;
        await user.save();

        res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};
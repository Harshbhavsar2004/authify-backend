import Developer from '../models/Developer.js';

export const validateApiKey = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'] || req.body.apiKey;

    if (!apiKey) {
        return res.status(401).json({ message: 'API Key is missing.' });
    }

    try {
        const developer = await Developer.findOne({ apiKey });
        if (!developer) {
            return res.status(401).json({ message: 'Invalid API Key.' });
        }

        req.developer = developer; // Attach developer to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(500).json({ message: 'Error validating API Key', error });
    }
};
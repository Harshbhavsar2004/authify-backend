import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import debugLib from 'debug';

dotenv.config();
const debug = debugLib('auth-platform:AuthService');

class AuthService {
    constructor() {
        this.apiKeys = process.env.API_KEYS.split(',');
        this.users = new Map(); // In-memory user storage
        debug('AuthService initialized');
    }

    validateApiKey(apiKey) {
        return this.apiKeys.includes(apiKey);
    }

    generateToken(userId, apiKey) {
        return jwt.sign({ userId }, apiKey, { expiresIn: '1h' });
    }

    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }

    storeUser(email, password, token) {
        this.users.set(email, { password, token });
        debug(`Stored user with email: ${email}`);
    }

    getUser(email) {
        const user = this.users.get(email);
        debug(`Retrieved user with email: ${email}`);
        return user;
    }
}

export default AuthService;
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors package
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import debugLib from 'debug';

dotenv.config();
const debug = debugLib('auth-platform:backend');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Use CORS middleware
app.use(cors()); // Allow all origins by default

// If you want to allow specific origins, you can configure it like this:
// app.use(cors({
//   origin: ['http://example.com', 'http://anotherdomain.com']
// }));

app.use(express.json());

// Use routes
app.use('/api', authRoutes);

app.listen(PORT, () => {
    debug(`Auth platform backend running on port ${PORT}`);
    console.log(`Auth platform backend running on port ${PORT}`);
});
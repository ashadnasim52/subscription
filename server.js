const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
	console.error('MongoDB connection error:', error);
});

db.once('open', () => {
	console.log('Connected to MongoDB Atlas');
});

// Apply middleware
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(helmet()); // Set security headers
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(morgan('tiny'));
mongoose.set('debug', false);
app.use(passport.initialize());
require('./utils/userRole')(passport);
require('./utils/adminRole')(passport);

// Rate limiting middleware
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(limiter);
const authRoute = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const planRoutes = require('./routes/planRoutes');

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoutes);
app.use(
	'/api/plans',
	// passport.authenticate('admin-rule', { session: false }),
	planRoutes
);

// Sample route
app.get('/', (req, res) => {
	res.send('Hello, this is your Express server!');
});

// Other routes go here...

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

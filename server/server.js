require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

// Route files
const authController = require('./controllers/authController');
const imageController = require('./controllers/imageController');

const { protect } = require('./middleware/authMiddleware');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('DB Error:', err));

// Multer Config (Memory Storage)
const upload = multer({ storage: multer.memoryStorage() });

// Routes - Auth
const authRouter = express.Router();
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/forgotpassword', authController.forgotPassword);
authRouter.put('/verify/:token', authController.verifyEmail);
//authRouter.put('/resetpassword/:token', authController.resetPassword);
authRouter.post('/reset-password-otp', authController.resetPasswordWithOtp);
authRouter.get('/me', protect, authController.getMe);
app.use('/api/auth', authRouter);


// Routes - Image
const imgRouter = express.Router();
imgRouter.post('/optimize', protect, upload.single('image'), imageController.optimizeImage);
app.use('/api/image', imgRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
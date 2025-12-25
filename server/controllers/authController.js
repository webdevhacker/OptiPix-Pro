const User = require('../models/User');
const sendEmail = require('../utils/emailService');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const checkAndResetCredits = require('../utils/creditManager');
// ✅ Import the templates
const { verificationTemplate, otpTemplate } = require('../utils/emailTemplates');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register User
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (await User.findOne({ email })) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const verificationToken = crypto.randomBytes(20).toString('hex');

        await User.create({ email, password, verificationToken });

        // ✅ Send HTML Verification Email
        const verifyUrl = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
        await sendEmail({
            email,
            subject: 'Welcome to OptiPix! Verify your Email',
            html: verificationTemplate(verifyUrl)
        });

        res.status(201).json({ message: 'Registration successful! Check your email.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        if (!user.isVerified) {
            return res.status(401).json({ message: 'Please verify your email first' });
        }

        res.json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Verify Email
exports.verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ verificationToken: req.params.token });
        if (!user) return res.status(400).json({ message: 'Invalid token' });

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Forgot Password (OTP Version)
exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.resetPasswordOtp = otp;
        user.resetPasswordOtpExpire = Date.now() + 10 * 60 * 1000;
        await user.save();

        // ✅ Send HTML OTP Email
        await sendEmail({
            email: user.email,
            subject: 'Your Password Reset Code',
            html: otpTemplate(otp)
        });

        res.json({ message: 'OTP sent to email' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Reset Password with OTP
exports.resetPasswordWithOtp = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await User.findOne({
            email,
            resetPasswordOtp: otp,
            resetPasswordOtpExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or Expired OTP' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        user.resetPasswordOtp = undefined;
        user.resetPasswordOtpExpire = undefined;
        await user.save();

        res.json({ message: 'Password Reset Successful! Please login.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const user = await User.findById(req.user._id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.lastCreditReset) {
            user.lastCreditReset = Date.now();
            await user.save();
        }

        try {
            if (typeof checkAndResetCredits === 'function') {
                await checkAndResetCredits(user);
            } else {
                res.status(500).json({ message: "Critical: checkAndResetCredits is not a function" });
            }
        } catch (err) {
            res.status(500).json({ message: "Credit Reset Error: " + err.message });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};
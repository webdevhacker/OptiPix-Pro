const sharp = require('sharp');
const User = require('../models/User');
const checkAndResetCredits = require('../utils/creditManager');

exports.optimizeImage = async (req, res) => {
    try {
        console.log("Optimizing image for user:", req.user._id);

        // 1. Get User
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // 2. Auto-Renewal
        // If this line crashes, check if 'server/utils/creditManager.js' exists!
        if (typeof checkAndResetCredits === 'function') {
            await checkAndResetCredits(user);
        } else {
            console.error("❌ checkAndResetCredits is not a function");
        }

        // 3. Check Balance
        if (user.credits < 1) {
            return res.status(403).json({ message: 'Insufficient credits.' });
        }

        // 4. Validate File
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        // 5. Process Image
        const { width, quality = 80, format = 'webp' } = req.body;
        let pipeline = sharp(req.file.buffer);

        if (width) pipeline = pipeline.resize({ width: parseInt(width), withoutEnlargement: true });
        pipeline = pipeline.toFormat(format, { quality: parseInt(quality) });

        const buffer = await pipeline.toBuffer();
        const metadata = await sharp(buffer).metadata();
        const base64 = `data:image/${format};base64,${buffer.toString('base64')}`;

        // 6. Deduct Credit
        user.credits -= 1;
        await user.save();

        res.json({
            success: true,
            data: base64,
            originalSize: req.file.size,
            optimizedSize: metadata.size,
            details: metadata,
            remainingCredits: user.credits
        });

    } catch (error) {
        res.status(500).json({ message: 'Image processing failed: ' + error.message });
    }
};
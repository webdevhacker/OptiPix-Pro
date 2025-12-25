const checkAndResetCredits = async (user) => {
    const fifteenMinutes = 15 * 60 * 1000;
    const now = Date.now();
    const lastReset = new Date(user.lastCreditReset).getTime();

    if (now - lastReset > fifteenMinutes) {
        user.credits = 100;
        user.lastCreditReset = now;
        return true;
    }

    return false;
};

module.exports = checkAndResetCredits;
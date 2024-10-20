const expectedApiKey = process.env.API_KEY;

const authMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== expectedApiKey) {
        return res.status(403).json({ message: 'Invalid API Key' });
    }
    next();
};

module.exports = authMiddleware;

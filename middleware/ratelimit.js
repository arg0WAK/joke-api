import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 25,
    statusCode: 429,
    handler: (req, res) => {
        res.status(429).json({
            error: "Too many requests, please try again later.",
        });
    },
    skip: (req) => {
        const skipUrls = ["/any", "/health", "/docs", "/"];
        return skipUrls.some((url) => req.originalUrl === url);
    },
});

export default limiter;

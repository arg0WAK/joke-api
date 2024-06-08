import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 50,
    statusCode: 429,
    handler: (req, res) => {
        res.status(429).json({
            error: "Too many requests, please try again later.",
        });
    },
    skip: (req) => {
        const skipUrls = ["/joke/any", "/health", "/docs", "/"];
        return skipUrls.some((url) => req.originalUrl === url);
    },
});

export default limiter;

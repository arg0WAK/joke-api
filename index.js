import express from "express";
import dotenv from "dotenv";
import limiter from "./middleware/ratelimit.js";
import router from "./router/routes.js";
import swagger from "./middleware/swagger.js";
import favicon from "serve-favicon";

import colors from "./utils/colors.js";

const env = dotenv.config().parsed;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(favicon("public/favicon.ico"));

swagger(app);

const PORT = env.PORT;

app.listen(PORT, () => {
    console.log(
        `${colors.debug}Server is running on port ${colors.info}${PORT}`,
    );
    console.log(`${colors.reset}http://localhost:${PORT}`);
});

app.use(limiter);

app.use(
    "/",
    (req, res, next) => {
        if (req.rateLimit) {
            console.log(`
${colors.info}Rate Limit:${colors.reset}
${colors.debug} Limit: ${colors.warning}${req.rateLimit.limit}${colors.reset}
${colors.debug} Used: ${colors.warning}${req.rateLimit.used}${colors.reset}
${colors.debug} Remaining: ${colors.warning}${req.rateLimit.remaining}${colors.reset}
${colors.debug} Reset Time: ${colors.warning}${req.rateLimit.resetTime}${colors.reset}`);
        }
        next();
    },
    router,
);

app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

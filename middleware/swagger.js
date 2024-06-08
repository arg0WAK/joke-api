import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

const env = dotenv.config().parsed;
const PORT = env.PORT;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Joke API with Swagger",
            version: "0.1.0",
            description: "This is a simple Joke API application made with Express and documented with Swagger",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ["./router/routes.js"]
};

const specs = swaggerJSDoc(options);

const swagger = (app) => {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
};

export default swagger;

import {corsOrigins, nodeEnv} from "./index";

const corsOptions = {
    development: {
        origin: corsOrigins || "*",
        credentials: true,
        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    },
    production: {
        origin: corsOrigins || "*",
        credentials: true,
        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    }
};

export default corsOptions[nodeEnv];
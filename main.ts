import "./src/database";
import App from "./src/app";
import { apiPort } from "./src/config";

const WebServer: App = new App();

WebServer.app.listen(apiPort, () => {
    console.log(`Server is running at ${apiPort}`);
});

export const server = {
    app: WebServer.app
};
import "./src/database";
import App from "./src/app";
import { apiPort } from "./src/config";

const WebServer: App = new App();

WebServer.app.listen(apiPort, () => {
    console.log(`server running on port: ${apiPort} \n http://localhost:${apiPort}`);
});

export const server = {
    app: WebServer.app
};
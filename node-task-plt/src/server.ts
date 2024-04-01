import app from './app';
import { APP_PORT } from "./utils/secrets";
import logger from "./utils/logger";

app
    .listen(APP_PORT, () => {
        logger.info(`Server up and running on port : ${APP_PORT}`);
        console.log(`Server up and running on port : ${APP_PORT}`);
    })
    .on('error', (e) => logger.error(e));
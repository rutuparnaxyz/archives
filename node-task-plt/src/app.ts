import express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { CommonRouter } from './routes';
import { loadErrorHandlers } from './utils/error.handler';
import session from 'express-session';
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { SESSION_SECRET } from "./utils/secrets";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 60000
    },
    resave: false,
    saveUninitialized: false
}
));
app.use('/api', CommonRouter);

loadErrorHandlers(app);

export default app;
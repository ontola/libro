import express from 'express';

import { PORT } from '../app/config';
import routes, { listen } from './routes';

const app = express();

routes(app, PORT);
listen(app, PORT);

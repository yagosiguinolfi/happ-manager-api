import express from 'express';
import router from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';

const app = express();
app.use(express.json());

app.use('/api', router);
app.use(notFound);
app.use(errorHandler);

export default app;

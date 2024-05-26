/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';

import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { allRoutes } from './app/routes';
import notFound from './app/middlewares/not-found';

const app: Application = express();

app.use(express.json());
app.use(cors());
// routes
// student routes
app.use('/api/v1/' , allRoutes)


// health
app.get('/health', (req: Request, res: Response) => {
  res.send('Hello World. server is running!');
});

// app.all('*', (req: Request, res: Response) => {
//   res.status(500).json({
//     success: false,
//     message: 'route not found',
//   });
// });

app.use(notFound)
app.use(globalErrorHandler);

export default app;

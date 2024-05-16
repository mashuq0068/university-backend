import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.all('*', (req: Request, res: Response) => {
  res.status(500).json({
    success: false,
    message: 'route not found',
  });
});

// app.use((error , req, res , next)=>{

// })

export default app;

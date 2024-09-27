import express, { Application } from 'express';
import cors from 'cors';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cors());


// app.use(globalErrorHandler);

// api for all routes
app.use('/api/v1', router);


app.get('/', (req, res) => {
  res.send('Hey Buddy. Welcome to nature nest. Please Use valid api to get data');
});

export default app;

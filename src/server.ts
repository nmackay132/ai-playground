import express, { Request, Response, Application } from 'express';
import openAiRouter from './openAiController';
const app: Application = express();
const port: number = 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.get('/', (req: Request, res: Response) => {
    console.log('This server is meant to demo AI APIs.');
});

app.use('/api', openAiRouter);

export default app;


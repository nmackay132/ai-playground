import express, {Request, Response, Application} from 'express';
import {callOpenAIApi, callGooseAIApi} from './openAiService';

const router = express.Router();

const prompt = 'Translate the following text to Spanish: Brown Dog';

router.get('/gooseai/:prompt', async (req: Request, res: Response) => {
    try {
        const result = await callGooseAIApi(prompt);
        res.send(`GooseAI API Response:\n${result}`);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.get('/openai', async (req: Request, res: Response) => {
    try {
        const result = await callOpenAIApi(prompt);
        res.send(`OpenAI API Response:\n${result}`);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

export default router;
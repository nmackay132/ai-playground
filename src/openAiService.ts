// src/openaiApi.ts
import axios, { AxiosResponse, AxiosError } from 'axios';

async function callGooseAIApi(prompt: string): Promise<string> {
    const apiUrl = 'https://api.goose.ai/v1/engines/gpt-neo-125m/completions';
    return callApi(apiUrl, 'GOOSEAI_API_KEY', prompt, 5);
}

async function callOpenAIApi(prompt: string): Promise<string> {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    return callApi(apiUrl, 'OPENAI_API_KEY', prompt, 5, 'gpt-3.5-turbo');
}
async function callApi(apiUrl: string, apiKeyEnvVar: string, prompt: string, maxTokens: number, model?: string): Promise<string> {
    const apiKey = process.env[apiKeyEnvVar];
    if (!apiKey) {
        throw new Error(`${apiKeyEnvVar} environment variable is not set`);
    }
    try {
        let data: any = {
            prompt,
            max_tokens: maxTokens,
        };
        if(model){
            data.model = model;
        }
        console.log(`Calling ${apiUrl}.`);
        const response: AxiosResponse = await axios.post(
            apiUrl,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            }
        );

        return response.data.choices[0]?.text || '';
    } catch (error) {
        console.error(`Error calling ${apiUrl}: `, error);
        throw error;
    }
}

export {callOpenAIApi, callGooseAIApi};

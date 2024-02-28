"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callGooseAIApi = exports.callOpenAIApi = void 0;
// src/openaiApi.ts
const axios_1 = __importDefault(require("axios"));
function callGooseAIApi(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'https://api.goose.ai/v1/engines/gpt-neo-125m/completions';
        return callApi(apiUrl, 'GOOSEAI_API_KEY', prompt, 5);
    });
}
exports.callGooseAIApi = callGooseAIApi;
function callOpenAIApi(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'https://api.openai.com/v1/chat/completions';
        return callApi(apiUrl, 'OPENAI_API_KEY', prompt, 5, 'gpt-3.5-turbo');
    });
}
exports.callOpenAIApi = callOpenAIApi;
function callApi(apiUrl, apiKeyEnvVar, prompt, maxTokens, model) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const apiKey = process.env[apiKeyEnvVar];
        if (!apiKey) {
            throw new Error(`${apiKeyEnvVar} environment variable is not set`);
        }
        try {
            let data = {
                prompt,
                max_tokens: maxTokens,
            };
            if (model) {
                data.model = model;
            }
            console.log(`Calling ${apiUrl}.`);
            const response = yield axios_1.default.post(apiUrl, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
            });
            return ((_a = response.data.choices[0]) === null || _a === void 0 ? void 0 : _a.text) || '';
        }
        catch (error) {
            console.error(`Error calling ${apiUrl}: `, error);
            throw error;
        }
    });
}
//# sourceMappingURL=openAiService.js.map
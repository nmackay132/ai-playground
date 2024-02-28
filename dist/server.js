"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const openAiController_1 = __importDefault(require("./openAiController"));
const app = (0, express_1.default)();
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
app.get('/', (req, res) => {
    console.log('This server is meant to demo AI APIs.');
});
app.use('/api', openAiController_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map
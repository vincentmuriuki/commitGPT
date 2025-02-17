import openaiGenerator from './generators/openai.js';

export async function generateCommitMessage(diff) {
    const generator = openaiGenerator
    return await generator.generate(diff);
}

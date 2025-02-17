import { Logger } from '../utils/logger.js';
import openaiGenerator from './generators/openai.js';

Logger.info('Initializing commit message generator');

export async function generateCommitMessage(diff) {
    const generator = openaiGenerator
    return await generator.generate(diff);
}

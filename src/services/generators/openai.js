import inquirer from 'inquirer';
import { OpenAI } from 'openai';
import { Logger } from '../../utils/logger.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();

// const huggingFaceApiKey = process.env.HUGGINGFACE_API_KEY;

async function getApiKey() {
    if (!process.env.OPENAI_API_KEY) {
        process.stdout.write('\n');
        const { openaiApiKey } = await inquirer.prompt([
            {
                type: 'input',
                name: 'openaiApiKey',
                message: 'Please enter your OpenAI API key:',
                validate: input => (input ? true : 'API key cannot be empty'),
            },
        ]);

        process.env.OPENAI_API_KEY = openaiApiKey;

        const envFilePath = path.join(process.cwd(), '.env');
        let envContent = '';
        if (fs.existsSync(envFilePath)) {
            envContent = fs.readFileSync(envFilePath, 'utf8');
        }
        const newEnvContent = envContent.includes('OPENAI_API_KEY')
            ? envContent.replace(/OPENAI_API_KEY=.*/g, `OPENAI_API_KEY=${openaiApiKey}`)
            : envContent + `\nOPENAI_API_KEY=${openaiApiKey}`;
        fs.writeFileSync(envFilePath, newEnvContent);
        return openaiApiKey;
    }
    return process.env.OPENAI_API_KEY;
}

export const generateWithOpenAI = async (diff) => {
    try {
        const apiKey = await getApiKey();
        const openai = new OpenAI({ apiKey });
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'user',
                    content: `Kindly help in generating a commit message for the below changes:\n\n${diff}`,
                },
            ],
        });
        return response.choices[0].message.content;
    } catch (error) {
        Logger.error('Error generating Commit message:', error);
        throw new Error('Failed to generate response with OpenAI.');
    }
};

export default {
    generate: generateWithOpenAI,
};
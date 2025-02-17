// utils/apiKeyManager.js
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import dotenv from 'dotenv';
import chalk from 'chalk';

// Load existing environment variables from .env file
dotenv.config();

const ENV_FILE_PATH = path.resolve(process.cwd(), '.env');

export async function ensureApiKey() {
    if (!process.env.OPENAI_API_KEY) {
        console.log(chalk.yellow('OpenAI API key is not set.'));
        const { apiKey } = await inquirer.prompt({
            type: 'input',
            name: 'apiKey',
            message: 'Please enter your OpenAI API key:',
            validate: input => input ? true : 'API key cannot be empty.',
        });

        // Save the API key to the .env file
        let envContent = '';
        if (fs.existsSync(ENV_FILE_PATH)) {
            envContent = fs.readFileSync(ENV_FILE_PATH, 'utf8');
            if (envContent.includes('OPENAI_API_KEY')) {
                envContent = envContent.replace(/OPENAI_API_KEY=.*/, `OPENAI_API_KEY=${apiKey}`);
            } else {
                envContent += `\nOPENAI_API_KEY=${apiKey}`;
            }
        } else {
            envContent = `OPENAI_API_KEY=${apiKey}`;
        }
        fs.writeFileSync(ENV_FILE_PATH, envContent, 'utf8');
        console.log(chalk.green('\n✅ OpenAI API key has been saved successfully.'));

        // Update the environment variable for the current session
        process.env.OPENAI_API_KEY = apiKey;
    }
}

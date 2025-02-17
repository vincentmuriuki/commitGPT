import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const envFilePath = path.join(process.cwd(), '.env');

function keyExists() {
    if (!fs.existsSync(envFilePath)) return false;
    const envContent = fs.readFileSync(envFilePath, 'utf8');
    return /(^|\n)\s*OPENAI_API_KEY=/.test(envContent);
}

function updateEnvContent(envContent, key, value) {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    if (regex.test(envContent)) {
        return envContent.replace(regex, `${key}=${value}`);
    }
    return `${envContent}\n${key}=${value}`.trim();
}

export async function configureOpenAIKey() {
    try {
        const existingKey = keyExists();
        let actionMessage = 'Enter your OpenAI API key:';

        if (existingKey) {
            const { action } = await inquirer.prompt({
                type: 'list',
                name: 'action',
                message: 'An API key already exists:',
                choices: [
                    { name: 'Update existing key', value: 'update' },
                    { name: 'Keep current key', value: 'keep' }
                ]
            });

            if (action === 'keep') {
                console.log(chalk.green('Keeping existing API key'));
                return;
            }
            actionMessage = 'Enter new OpenAI API key:';
        }

        const { openaiApiKey } = await inquirer.prompt({
            type: 'input',
            name: 'openaiApiKey',
            message: actionMessage,
            validate: input => !!input || 'API key is required'
        });

        let envContent = fs.existsSync(envFilePath)
            ? fs.readFileSync(envFilePath, 'utf8')
            : '';

        const newContent = updateEnvContent(envContent, 'OPENAI_API_KEY', openaiApiKey);
        fs.writeFileSync(envFilePath, newContent);

        console.log(chalk.green(existingKey
            ? '\n✅ API key updated successfully!'
            : '\n🔑 API key saved successfully!'));

    } catch (error) {
        console.error(chalk.red('\n❌ Error configuring API key:'), error.message);
        process.exit(1);
    }
}
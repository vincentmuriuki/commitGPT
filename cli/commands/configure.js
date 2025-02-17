import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';

const envFilePath = path.join(process.cwd(), '.env');

function updateEnvContent(envContent, key, value) {
  const regex = new RegExp(`^${key}=.*$`, 'm');
  if (regex.test(envContent)) {
    // Replace existing key
    return envContent.replace(regex, `${key}=${value}`);
  } else {
    // Append new key
    return envContent ? `${envContent}\n${key}=${value}` : `${key}=${value}`;
  }
}

export async function configureOpenAIKey() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'openaiApiKey',
      message: 'Please enter your OpenAI API key:',
      validate: input => input ? true : 'API key cannot be empty',
    },
  ]);

  const { openaiApiKey } = answers;

  let envContent = '';
  if (fs.existsSync(envFilePath)) {
    envContent = fs.readFileSync(envFilePath, 'utf8');
  }

  const newEnvContent = updateEnvContent(envContent, 'OPENAI_API_KEY', openaiApiKey);

  fs.writeFileSync(envFilePath, newEnvContent);
  // console.log('OpenAI API key saved to .env file');
}

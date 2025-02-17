import { Command } from 'commander';
import { configureOpenAIKey } from './configure.js';
import { Logger } from '../../src/utils/logger.js';

const command = new Command('configure')
  .description('Configure your OpenAI API key')
  .action(async () => {
    try {
      await configureOpenAIKey();
    } catch (error) {
      console.error('Error configuring API key:', error.message);
      Logger
    }
  });

export default command;

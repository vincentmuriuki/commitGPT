import { Command } from 'commander';
import { fetchGitDiff } from '../../src/services/gitService.js';
import { generateCommitMessage } from '../../src/services/abstractionService.js';
import { showSpinner } from '../../src/utils/spinner.js';
import inquirer from 'inquirer';
import { exec } from 'child_process';
import { formatCommitMessage } from '../../src/utils/format.js';

const command = new Command('generate')
  .alias('g')
  .description('Generate a commit message based on git diff')
  .action(async () => {
    process.noDeprecation = true;
    // Start the spinner with the initial message.
    const spinner = showSpinner('Fetching git diff...');

    try {
      const diff = await fetchGitDiff();
      
      // Update the spinner text before moving on.
      spinner.text = 'Generating commit message...';
      
      const rawMessage = await generateCommitMessage(diff);
      
      // Mark the spinner as succeeded.
      spinner.succeed('Commit message generated successfully!');
      
      const formattedMessage = formatCommitMessage(rawMessage);
      console.log(`\nYour Commit Message:\n${formattedMessage}\n\n`);

      const { shouldCommit } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'shouldCommit',
          message: 'Do you want to commit with the above message?',
          default: true,
        },
      ]);

      if (shouldCommit) {
        exec(
          `git commit -m "${formattedMessage.replace(/"/g, '\\"')}"`,
          (err, stdout, stderr) => {
            if (err) {
              console.error('Error committing changes:', err);
              return;
            }
            console.log('Commit successful!');
          }
        );
      } else {
        console.log('Commit aborted by the user.');
      }
    } catch (error) {
      spinner.fail('Failed to generate commit message');
      console.error(error.message);
    }
  });

export default command;

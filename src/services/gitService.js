import simpleGit from 'simple-git';
import { Logger } from '../utils/logger.js';

const git = simpleGit();

export const fetchGitDiff = async () => {
  if (!(await git.checkIsRepo())) {
    throw new Error('Not a git repository.');
  }
  const diff = await git.diff(['--staged']);
  if (!diff) {
    throw new Error('No staged changes detected. Please stage your changes using `git add filename` then rerun the command');
  }
  Logger.info('Git diff fetched successfully');
  return diff;
};

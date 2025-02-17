# Commit AI :rocket:

AI-powered commit message generator powered by OpenAI. Get meaningful commit messages in seconds!

[![npm version](https://img.shields.io/npm/v/commit-ai)](https://www.npmjs.com/package/commit-ai)

## Installation

```bash
npx commit-ai generate  # Generate commit message
```
Usage

Generate Commit Message

bash
Copy
npx commit-ai
# or
git gpt  # If aliased
Configure OpenAI Key

```bash
npx commit-ai configure
npx commit-ai g  // use alias instead
```
Stores your API key securely in `~/.env`

# How It Works

1. Analyzes git staged changes
2. Sends diff to OpenAI API
3. Generates conventional commit message
4. Verifies with user before committing

# Security

Your OpenAI key is stored locally in `~/.env` and never transmitted elsewhere.

# Contributing

PRs welcome! See CONTRIBUTING.md

# License

MIT


# commitaai 🚀  

`commitaai` is a powerful npm package designed to automate the creation of commit messages. By leveraging AI, it analyzes the changes you've staged in your project and generates well-structured and meaningful commit messages. With just a simple command, commitaai identifies the differences in your code, then crafts a concise title and description for your commit. This helps you save time, maintain consistency, and adhere to conventional commit practices, making version control more efficient. Ideal for developers looking to simplify their workflow and ensure their commit messages are clear, relevant, and uniform.

Whether you're a solo developer or part of a team, `commitaai` helps improve your project’s version history by maintaining clean and descriptive commit messages. It’s the perfect tool for developers who want to boost their efficiency and keep their codebase organized. 
 

[![npm version](https://img.shields.io/npm/v/commitaai)](https://www.npmjs.com/package/commitaai)
[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) 
---

## ✨ Features  

✅ **AI-generated Commit Messages** – Get clear and structured commit messages based on your Git changes.  
✅ **Conventional Commit Format** – Generates messages following best practices.  
✅ **Interactive Workflow** – Review and confirm before committing.  
✅ **Secure API Key Storage** – Stores your OpenAI API key locally.  

---

## 🚀 Installation  

No need to install globally. Use it directly via `npx`:  

```bash
npx commitaai generate  # Generate commit message
```

Alternatively, install globally:

```bash
npm install -g commitaai
```

## 🔥 Usage
- When you run the generate command for the first time it will prompt you to add your OpenAI API key.

Generate a Commit Message

```bash
npx commitaai generate
// or
npx commitaai g
```

## Configure OpenAI API Key
```bash
npx commitaai configure
```

This securely stores your API key in `~/.env`.

Commit with AI-generated Message
```bash
git add .
npx commitaai generate
```
After generating the commit message, you’ll be asked to confirm before it is committed.

🔍 How It Works

1. Analyzes Git staged changes `(git diff --staged)`.
2. Sends the diff to the OpenAI API for analysis.
3. Generates a structured and meaningful commit message.
4. Prompts for user confirmation before committing.

## 🔒 Security

Your OpenAI API key is stored locally in `~/.env` and never shared or transmitted elsewhere.
The tool only analyzes staged Git changes, ensuring sensitive files remain untouched.

# 🤝 Contributing

PRs are welcome! If you’d like to improve the tool, check out `CONTRIBUTING.md` for guidelines.

## 📜 License

MIT © [Vincent Muriuki](https://github.com/vincentmuriuki). See [LICENSE](https://github.com/vincentmuriuki/commitaai/blob/master/LICENSE) for details.
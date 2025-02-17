# commitly 🚀  

AI-powered commit message generator using OpenAI. Get meaningful and structured commit messages in seconds!  
 

[![NPM Version](https://img.shields.io/npm/v/fireorm.svg?style=flat)](https://www.npmjs.com/package/commitly)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
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
npx commitly generate  # Generate commit message
```

Alternatively, install globally:

```bash
npm install -g commitly
```

## 🔥 Usage
- When you run the generate command for the first time it will prompt you to add your OpenAI API key.

Generate a Commit Message

```bash
npx commitly generate
// or
npx commitly g
```

## Configure OpenAI API Key
```bash
npx commitly configure
```

This securely stores your API key in `~/.env`.

Commit with AI-generated Message
```bash
git add .
npx commitly generate
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
🤝 Contributing

PRs are welcome! If you’d like to improve the tool, check out `CONTRIBUTING.md` for guidelines.

## 📜 License

This project is licensed under the MIT License. See LICENSE for details.
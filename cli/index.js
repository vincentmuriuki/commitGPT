#!/usr/bin/env node

import { Command } from "commander";
import generateCommand from "./commands/generate.js";
import { setupLogger } from "../src/utils/logger.js";
import dotenv from 'dotenv';
import { configureOpenAIKey } from "./commands/configureSetting.js";
import chalk from "chalk";

dotenv.config();

const program = new Command();
setupLogger();

program
  .name("commitaai")
  .description(chalk.blue("Generate AI-crafted commit messages"))
  .version("0.0.3")
  .addCommand(generateCommand)
  .command("configure")
  .description("Update or set OpenAI API key")
  .action(configureOpenAIKey);

program.parse(process.argv);

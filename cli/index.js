#!/usr/bin/env node

import { Command } from "commander";
import generateCommand from "./commands/generate.js";
import configureCommand from "./commands/configureCommand.js"
import { setupLogger } from "../src/utils/logger.js";
import dotenv from 'dotenv';
dotenv.config();

const program = new Command();
setupLogger();

program
  .name("commit-gpt")
  .description("Generate AI-crafted commit messages")
  // .option("-g, --generate", "Generate a commit message")
  .version("1.0.0");

program.addCommand(generateCommand);
program.addCommand(configureCommand)

program.parse(process.argv);

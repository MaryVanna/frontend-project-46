#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<path1> <path2>')
  .action((path1, path2, options) => {
    console.log(genDiff(path1, path2, options.format))
  });

program.parse();

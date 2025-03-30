import { existsSync } from 'fs';
import { Command } from 'commander';
import path from 'path';
import { readdir } from 'fs/promises';
import { execSync } from 'child_process';
import config from './examples.json' with { type: 'json' };

const program = new Command();

/**
 * Resolve the absolute path to the examples directory
 */
const examplesPath = path.resolve(import.meta.dirname, '../examples');

/**
 * Define command line interface
 * - Expects two arguments: directory (or alias) and example number
 */
program
  .arguments('<directory> <number>')
  .action(async (directoryOrAlias: string, number: string) => {
    /**
     * Resolve directory path from input
     * - Try direct path first
     * - Then check if it's an alias defined in config
     */
    const possibleDirectories = [
      directoryOrAlias,
      config['path-aliases'][directoryOrAlias as keyof (typeof config)['path-aliases']] ||
        'NOT_FOUND',
    ];

    /**
     * Find the first existing directory from possible paths
     */
    const directory = possibleDirectories
      .map((alias) => path.resolve(examplesPath, alias))
      .find((path) => existsSync(path));

    /**
     * Exit if no valid directory is found
     */
    if (!directory) {
      console.error(`Directory not found: ${directoryOrAlias}`);
      process.exit(1);
    }

    /**
     * Get all examples in the directory
     */
    const examples = await readdir(directory);

    /**
     * Find the example that starts with the specified number
     */
    const exampleToRun = examples.find((example) => {
      return example.startsWith(number);
    });

    /**
     * Exit if the specified example doesn't exist
     */
    if (!exampleToRun) {
      console.error(`Could not find example ${number} in ${directory}. Does it exist?`);
      process.exit(1);
    }

    /**
     * Warn if the example is marked as TODO
     */
    if (exampleToRun.endsWith('TODO')) {
      console.log(
        `Example ${number} in ${directory} is still in TODO state. Running it may produce unexpected results.`
      );
    }

    /**
     * Resolve the path to the main.ts file of the example
     */
    const mainFilePath = path.resolve(directory, exampleToRun, 'main.ts');

    /**
     * Exit if the main.ts file doesn't exist
     */
    if (!existsSync(mainFilePath)) {
      console.error(`Could not find main.ts file for example ${number} in ${directory}.`);
      process.exit(1);
    }

    /**
     * Execute the example using tsx with environment variables
     * - Inherits stdio to show output in the current terminal
     * - Catches and reports any execution errors
     */
    try {
      execSync(`pnpm tsx --env-file=.env ${mainFilePath}`, {
        stdio: 'inherit',
      });
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });

/**
 * Parse command line arguments and execute the program
 */
program.parse(process.argv);

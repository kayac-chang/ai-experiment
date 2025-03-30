import * as fs from 'fs/promises';
import * as toml from 'toml';

export interface TestCase {
  input: any;
  expected: any;
}

/**
 * Parses a TOML file containing test cases and converts them into a structured array.
 *
 * This function supports two different TOML formats:
 * 1. A TOML file with a "tests" array where each element has "input" and "expected" properties:
 *    ```toml
 *    [[tests]]
 *    input = "test input 1"
 *    expected = "expected output 1"
 *
 *    [[tests]]
 *    input = "test input 2"
 *    expected = "expected output 2"
 *    ```
 *
 * 2. A TOML file with separate sections for each test case:
 *    ```toml
 *    [test1]
 *    input = "test input 1"
 *    expected = "expected output 1"
 *
 *    [test2]
 *    input = "test input 2"
 *    expected = "expected output 2"
 *    ```
 *
 * @param filePath - The path to the TOML file containing test cases
 * @returns A Promise that resolves to an array of TestCase objects, each with input and expected properties
 * @throws Will throw an error if the file cannot be read or if the TOML content is invalid
 *
 * @example
 * // Example usage:
 * const testCases = await parseTomlTestCases('./tests/my-test-cases.toml');
 * for (const testCase of testCases) {
 *   const result = myFunction(testCase.input);
 *   assert.deepEqual(result, testCase.expected);
 * }
 */
export async function parseTomlTestCases(filePath: string): Promise<TestCase[]> {
  // Read the TOML file
  const fileContent = await fs.readFile(filePath, 'utf-8');

  // Parse the TOML content
  const parsedToml = toml.parse(fileContent);

  const testCases: TestCase[] = [];

  // Handle different possible TOML structures

  // Case 1: If the TOML has a "tests" array with input/expected properties
  if (Array.isArray(parsedToml.tests)) {
    return parsedToml.tests.map((test: any) => ({
      input: test.input,
      expected: test.expected,
    }));
  }

  // Case 2: If the TOML has a flat structure with test sections
  // like [test1], [test2], etc.
  for (const key in parsedToml) {
    const section = parsedToml[key];
    if (section && typeof section === 'object' && 'input' in section && 'expected' in section) {
      testCases.push({
        input: section.input,
        expected: section.expected,
      });
    }
  }

  return testCases;
}

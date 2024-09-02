import * as fs from "node:fs"
import * as path from "node:path"

import Ajv from 'ajv';
import addFormats from "ajv-formats";
import { expect, test } from 'vitest';

import mediaData from "../src/content/media/how-to-360-flip--en.json";
import languages from "../src/languages.ts"

const mediaItemSchema = {
  type: "object",
  properties: {
    title: { type: "string", pattern: "\\S+" }, // checks for non-empty String, at least one non-white space character
    commonId: { type: "string", pattern: "\\S+" },
    type: { type: "string", pattern: "\\S+" },
    dateCreated: { type: "string", pattern: "\\S+" },
    content: { type: "array" },
    author: { type: "string", pattern: "\\S+" },
    categories: {
      type: "array"
    },
    description: { type: "string" },
    language: { type: "string", pattern: "\\S+" },
    image: { type: "string", pattern: "\\S+" }
  },
  required: ["title", "commonId", "type", "dateCreated", "content", "language", "image"],
  additionalProperties: false
};

const ajv = new Ajv();
addFormats(ajv);

const validate = ajv.compile(mediaItemSchema);

test('validates media JSON structure is correct', () => {
  const valid = validate(mediaData);
  if (!valid) {
    console.error(validate.errors);
  }
  expect(valid).toBe(true);
});

test('returns correct language name for a known language key', () => {
  const languageKey = 'de';
  const expectedLanguage = 'Deutsch';
  const languagesAsAny = languages;

  if (languageKey in languagesAsAny) {
    expect(languages[languageKey]?.label).toBe(expectedLanguage);

    const jsonPath = path.join(__dirname, `../src/translations/${languageKey}.json`);
    try {
      fs.accessSync(jsonPath, fs.constants.F_OK);
    } catch (err) {
      // Improved error handling for TypeScript's `unknown` type
      if (err instanceof Error) {
        expect.fail(`Expected translation JSON for '${languageKey}' to exist, but it was not found. Details: ${err.message}`);
      } else {
        expect.fail(`An unexpected error occurred while checking for the translation JSON for '${languageKey}'.`);
      }
    }
  } else {
    expect.fail(`Language key '${languageKey}' is not defined in the supported languages.`);
  }
});


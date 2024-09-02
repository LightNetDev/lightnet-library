// import * as fs from 'fs';
// import * as path from 'path';
//
// const rootDir = path.resolve(__dirname, '..');
// const jsonFilePath = path.resolve(rootDir, 'examples/sk8-ministries/src/translations/en.json');
// const tsFilePath = path.resolve(rootDir, 'examples/sk8-ministries/src/i18next.d.ts');
//
// try {
//   const jsonContent = fs.readFileSync(jsonFilePath, 'utf8');
//   const keys = Object.keys(JSON.parse(jsonContent) as Record<string, unknown>);
//   const typesContent = `// This file is auto-generated. Do not edit directly.\n\nexport type TranslationKeys =\n${keys.map(key => `  | "${key}"`).join('\n')};\n`;
//
//   fs.writeFileSync(tsFilePath, typesContent);
//   console.log('TranslationKeys type definition generated successfully.');
// } catch (error) {
//   console.error('Failed to generate TranslationKeys type definition:', error);
// }

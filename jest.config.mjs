export default async () => {
  return {
    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: [
      'src/**/*.{mjs,js,jsx,ts,tsx}',
      '!<rootDir>/node_modules/',
    ],

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: 'v8',

    // Make calling deprecated APIs throw helpful error messages
    errorOnDeprecated: true,

    // The glob patterns Jest uses to detect test files
    testMatch: ['**\\__tests__\\**\\**.mjs', '**/?(*.)+(spec|test).mjs']
  };
};

module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "./tsconfig.test.json",
      isolatedModules: true
    }
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  testPathIgnorePatterns: ["<rootDir>/lib"],
  collectCoverageFrom: ["src/**/*.ts", "src/**/*.tsx"],
  coverageReporters: ["cobertura", "text", "html"],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  modulePathIgnorePatterns: ["<rootDir>[/\\\\](lib|docs|node_modules)[/\\\\]"]
};

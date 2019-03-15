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
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|js)$",
  testPathIgnorePatterns: ["<rootDir>/lib"],
  collectCoverageFrom: ["src/**/*.ts"],
  coverageReporters: ["cobertura", "text", "html"],
  moduleFileExtensions: ["ts", "js", "json"],
  modulePathIgnorePatterns: ["<rootDir>[/\\\\](lib|docs|node_modules)[/\\\\]"]
};

module.exports = {
  setupFilesAfterEnv: ['./enzyme.config.js'],
  coverageReporters: ['text', 'html'],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  moduleNameMapper: {
    '\\.(png)': '<rootDir>/test/assets.config.js'
  }
}
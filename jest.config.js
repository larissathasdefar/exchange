module.exports = {
  setupFilesAfterEnv: ['./enzyme.config.js'],
  coverageReporters: ['text', 'html'],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  moduleNameMapper: {
    '\\.(png)': '<rootDir>/test/assets.config.js',
    '^assets(.*$)': '<rootDir>/src/assets$1',
    '^components(.*$)': '<rootDir>/src/components$1',
    '^ui(.*$)': '<rootDir>/src/components/UI$1',
    '^reducers(.*$)': '<rootDir>/src/reducers$1',
    '^containers(.*$)': '<rootDir>/src/containers$1',
    '^actions(.*$)': '<rootDir>/src/actions$1',
    '^constants(.*$)': '<rootDir>/src/constants/action-types.js$1',
  }
}
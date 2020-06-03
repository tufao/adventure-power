module.exports = {
    'verbose': true,
    'preset': '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    'moduleFileExtensions': [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'vue',
    ],
    'setupFiles': [
        'jest-canvas-mock',
    ],
    'transform': {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    'moduleNameMapper': {
        '^@/$': '<rootDir>/src/$1',
    },
    'snapshotSerializers': [
        'jest-serializer-vue',
    ],
    'testMatch': [
        '**/__tests__/**/*.spec.(js|jsx|ts|tsx)',
    ],
    'testURL': 'http://localhost/',
    'collectCoverage': false,
    'collectCoverageFrom': ['src/**/*.{js,vue,ts}', '!**/node_modules/**'],
    'coverageReporters': ['lcov', 'text-summary'],
    'globals': {
    },
};

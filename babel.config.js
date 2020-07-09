// babel.config.js
module.exports = {
  "presets": [
    [
      '@babel/preset-env',
      {
        "targets": {
          "node": 'current',
        },
        // Allow importing core-js in entrypoint and use browserlist to select polyfills
        useBuiltIns: 'entry',
        // Set the corejs version we are using to avoid warnings in console
        // This will need to change once we upgrade to corejs@3
        corejs: 3,
        // Transform modules based on env support
        modules: 'auto',
        // Exclude transforms that make all code slower
        exclude: ['transform-typeof-symbol'],
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ],
  "env": {
    "test": {
      "plugins": [
        ["@babel/transform-runtime", {
          "regenerator": true
        }]
      ]
    }
  },
  "ignore": ['**/*.d.ts']
};
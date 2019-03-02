module.exports = api => {
  api.cache(false)
  return {
    env: {
      test: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
      },
      development: {
        presets: [
          [
            '@babel/preset-env',
            { modules: false, useBuiltIns: 'usage' },
            '@babel/preset-react',
          ],
        ],
        plugins: ['@babel/plugin-syntax-dynamic-import'],
      },
    },
  }
}

module.exports = (api, options) => {
  const { NODE_ENV } = options || process.env;
  const modules = NODE_ENV === 'esm' ? false : 'commonjs';

  if (api) {
    api.cache(() => NODE_ENV);
  }

  const plugins = [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-export-default-from',
    ['@babel/plugin-transform-runtime', { useESModules: !modules }]
  ];

  if (modules) {
    plugins.push('add-module-exports');
  }

  return {
    presets: [['@babel/preset-env', { modules, loose: true }], '@babel/preset-typescript'],
    plugins
  };
};

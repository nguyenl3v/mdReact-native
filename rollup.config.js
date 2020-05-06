import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import pkg from './package.json';


const cjs = {
  exports: 'named',
  format: 'cjs'
};

const esm = {
  format: 'esm'
};

const getCJS = override => ({ ...cjs, ...override });
const getESM = override => ({ ...esm, ...override });

const commonPlugins = [
  json(),
  nodeResolve({
    browser: true,
  }),
  babel({
    babelrc: false,
    exclude: 'node_modules/**',
    presets: [['@babel/env', { loose: true, modules: false }], '@babel/react'],
    plugins: ['@babel/plugin-proposal-class-properties', ['module-resolver', {
      root: ['./'],
      alias: {
        _tests_: './_tests_',
      },
    }]],
  }),
  commonjs({
    namedExports: {
      'react-native': ['View', 'Text']
    },
  }),
  replace({
    __VERSION__: JSON.stringify(pkg.version),
  }),
];

const configBase = {
  input: './index.js',
  external: id => !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/'),
  plugins: commonPlugins,
};

const globals = {
  react: 'React', 'react-native': 'reactNative',
};

const standaloneBaseConfig = {
  ...configBase,
  input: './index.js',
  output: {
    file: 'dist/react-native-sv.js',
    format: 'umd',
    globals,
    name: 'react-native-sv'
  },
  plugins: configBase.plugins.concat(
    replace({
      __SERVER__: JSON.stringify(false),
    }),
  ),
};

const standaloneConfig = {
  ...standaloneBaseConfig,
  plugins: standaloneBaseConfig.plugins.concat(
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ),
};

const standaloneProdConfig = {
  ...standaloneBaseConfig,
  output: {
    ...standaloneBaseConfig.output,
    file: 'dist/react-native-sv.min.js',
  },
};

const nativeConfig = {
  ...configBase,
  input: './index.js',
  output: [
    getCJS({
      file: 'dist/react-native-sv.cjs.js',
    }),
    getESM({
      file: 'dist/react-native-sv.esm.js',
    }),
  ],
};

export default [
  standaloneConfig,
  standaloneProdConfig,
  nativeConfig,
];

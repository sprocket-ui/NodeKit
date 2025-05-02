import process from "node:process";
import copy from 'rollup-plugin-copy';
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { Addon } from '@embroider/addon-dev/rollup';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

const plugins = [
  replace({
    preventAssignment: true,
    values: {
      '__PACKAGE_NAME__': 'sprocket'
    }
  }),

  // These are the modules that users should be able to import from your
  // addon. Anything not listed here may get optimized away.
  addon.publicEntrypoints([
    '**/*.{js,ts}',
    'index.js',
    'template-registry.js',
  ]),

  // These are the modules that should get reexported into the traditional
  // "app" tree. Things in here should also be in publicEntrypoints above, but
  // not everything in publicEntrypoints necessarily needs to go here.
  addon.appReexports(
    [
      'helpers/**/*.js',
      'components/**/!(*types).js'
    ]
  ),

  // Follow the V2 Addon rules about dependencies. Your code can import from
  // `dependencies` and `peerDependencies` as well as standard Ember-provided
  // package names.
  addon.dependencies(),

  // Ensure that standalone .hbs files are properly integrated as Javascript.
  addon.hbs(),

  addon.gjs(),

  terser({
    module: true,
    compress: {
      dead_code: true,
      conditionals: true,
      booleans: true,
    },
    format: {
      comments: false,
    },
  }),

  // This babel config should *not* apply presets or compile away ES modules.
  // It exists only to provide development niceties for you, like automatic
  // template colocation.
  //
  // By default, this will load the actual babel config from the file
  // babel.config.json.
  babel({
    extensions: ['.js', '.gjs', '.ts', '.gts'],
    babelHelpers: 'bundled',
  }),

  // Copy readme and license files into published package
  copy({
    targets: [
      { src: 'README.md', dest: 'dist' },
      { src: 'LICENSE.md', dest: 'dist' }
    ]
  })
];

if (!process.env.development) {
  // Remove leftover build artifacts when starting a new build.
  plugins.push(addon.clean());
}

export default {
  output: addon.output(),
  plugins: plugins
};
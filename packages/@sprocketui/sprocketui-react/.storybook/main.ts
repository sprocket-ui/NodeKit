import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

const packagesRoot = path.resolve(import.meta.dirname, '../../..');
const nectoutilRoot = path.resolve(packagesRoot, '../../../nectoutil/NodeKit/packages');

// Map workspace package names to their source entry points so Vite
// doesn't resolve to CJS dist/ bundles.
const workspaceAliases: Record<string, string> = {
  // @sprocketui-react packages
  '@sprocketui-react/button': path.join(packagesRoot, '@sprocketui-react/sprocketui-react-button/src/index.ts'),
  '@sprocketui-react/checkbox': path.join(packagesRoot, '@sprocketui-react/sprocketui-react-checkbox/src/index.ts'),
  '@sprocketui-react/input': path.join(packagesRoot, '@sprocketui-react/sprocketui-react-input/src/index.ts'),
  '@sprocketui-react/label': path.join(packagesRoot, '@sprocketui-react/sprocketui-react-label/src/index.ts'),
  '@sprocketui-react/popover': path.join(packagesRoot, '@sprocketui-react/sprocketui-react-popover/src/index.ts'),
  '@sprocketui-react/progress': path.join(packagesRoot, '@sprocketui-react/sprocketui-react-progress/src/index.ts'),
  '@sprocketui-react/tabs': path.join(packagesRoot, '@sprocketui-react/sprocketui-react-tabs/src/index.ts'),
  '@sprocketui-react/tooltip': path.join(packagesRoot, '@sprocketui-react/sprocketui-react-tooltip/src/index.ts'),

  // @sprocketui-types packages
  '@sprocketui-types/buttons': path.join(packagesRoot, '@sprocketui-types/sprocketui-types-buttons/src/index.ts'),
  '@sprocketui-types/checkbox': path.join(packagesRoot, '@sprocketui-types/sprocketui-types-checkbox/src/index.ts'),
  '@sprocketui-types/input': path.join(packagesRoot, '@sprocketui-types/sprocketui-types-input/src/index.ts'),
  '@sprocketui-types/label': path.join(packagesRoot, '@sprocketui-types/sprocketui-types-label/src/index.ts'),
  '@sprocketui-types/popover': path.join(packagesRoot, '@sprocketui-types/sprocketui-types-popover/src/index.ts'),
  '@sprocketui-types/progress': path.join(packagesRoot, '@sprocketui-types/sprocketui-types-progress/src/index.ts'),
  '@sprocketui-types/tabs': path.join(packagesRoot, '@sprocketui-types/sprocketui-types-tabs/src/index.ts'),
  '@sprocketui-types/tooltip': path.join(packagesRoot, '@sprocketui-types/sprocketui-types-tooltip/src/index.ts'),

  // @necto-react packages
  '@necto-react/hooks': path.join(nectoutilRoot, '@necto-react/necto-react-hooks/src/index.ts'),
  '@necto-react/helpers': path.join(nectoutilRoot, '@necto-react/necto-react-helpers/src/index.ts'),
  '@necto-react/components': path.join(nectoutilRoot, '@necto-react/necto-react-components/src/index.ts'),
  '@necto-react/types': path.join(nectoutilRoot, '@necto-react/necto-react-types/src/index.ts'),
  '@necto-react/popper': path.join(nectoutilRoot, '@necto-react/necto-react-popper/src/index.ts'),

  // @necto packages
  '@necto/mergers': path.join(nectoutilRoot, '@necto/necto-mergers/src/index.ts'),
  '@necto/strings': path.join(nectoutilRoot, '@necto/necto-strings/src/index.ts'),
  '@necto/dom': path.join(nectoutilRoot, '@necto/necto-dom/src/index.ts'),
  '@necto/popper': path.join(nectoutilRoot, '@necto/necto-popper/src/index.ts'),

  // shared
  'shared': path.join(packagesRoot, 'shared/src/index.ts'),
};

const config: StorybookConfig = {
  stories: [
    '../../../@sprocketui-react/**/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string> ?? {}),
      ...workspaceAliases,
    };

    // Allow Vite to serve files from the monorepo root and nectoutil
    const repoRoot = path.resolve(packagesRoot, '..');
    config.server = config.server ?? {};
    config.server.fs = config.server.fs ?? {};
    config.server.fs.allow = [
      ...(config.server.fs.allow ?? []),
      repoRoot,
      nectoutilRoot,
    ];

    // Add Tailwind CSS
    config.plugins = config.plugins ?? [];
    config.plugins.push(tailwindcss());

    return config;
  },
};

export default config;

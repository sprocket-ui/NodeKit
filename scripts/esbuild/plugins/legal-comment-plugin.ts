import type { Plugin, PluginBuild, BuildOptions } from 'esbuild';

export function legalCommentPlugin(): Plugin {
  return {
    name: 'legal-comment-plugin',
    setup(build: PluginBuild): void {
      const options: BuildOptions = build.initialOptions;
      options.legalComments = 'none';
    },
  };
}

import { defineConfig } from 'tsup';
import { reactConfig } from '../../../scripts/tsup/build-react';

export default defineConfig({
  ...reactConfig,
});

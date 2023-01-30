import { defineConfig } from 'rollup';

export default defineConfig({
  input: 'src/index.js',
  output: [
    {
      file: 'plugin.cjs',
      format: 'cjs',
      exports: 'named',
    },
  ],
});

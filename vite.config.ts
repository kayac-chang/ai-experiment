import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { reactRouter } from '@react-router/dev/vite';
import { lingui } from '@lingui/vite-plugin';
import macrosPlugin from 'vite-plugin-babel-macros';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), lingui(), macrosPlugin()],
});

// /// <reference types='vitest' />
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
// import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

// export default defineConfig({
//   root: __dirname,
//   cacheDir: './node_modules/.vite/auto-delovi-3sp',
//   server: {
//     port: 4200,
//     host: 'localhost',
//   },
//   plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
//   base: '/auto-delovi-3sp',
//   // Uncomment this if you are using workers.
//   // worker: {
//   //  plugins: [ nxViteTsPaths() ],
//   // },
//   build: {
//     outDir: './dist/auto-delovi-3sp',
//     emptyOutDir: true,
//     reportCompressedSize: true,
//     commonjsOptions: {
//       transformMixedEsModules: true,
//     },
//   },
//   test: {
//     watch: false,
//     globals: true,
//     environment: 'jsdom',
//     include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
//     reporters: ['default'],
//     coverage: {
//       reportsDirectory: './coverage/auto-delovi-3sp',
//       provider: 'v8',
//     },
//   },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',

  server: {
    port: 4202,
  },
});

/// <reference types='vitest' />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import basicSsl from '@vitejs/plugin-basic-ssl';
import path from 'node:path';
import { json } from 'node:stream/consumers';
import mksert from 'vite-plugin-mkcert';
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.join(__dirname, '../', '../.env'));
  console.log(env);
  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/frontend',
    server: {
      port: 4200,
      host: 'localhost',
      allowedHosts: true,
    },
    preview: {
      port: 4300,
    },
    plugins: [
      react(),
      nxViteTsPaths(),
      nxCopyAssetsPlugin(['*.md']),
      svgr(),
      mksert(),
    ],
    // envDir: '../../.env',
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    build: {
      outDir: '../../dist/apps/frontend',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    // define: {
    //   'import.meta.vitest': undefined,
    //   __APP_ENV__: JSON.stringify(env.APP_ENV),
    // },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
});

import react from '@vitejs/plugin-react';
import path from 'path';
// @ts-expect-error: TypeScript does not recognize this module
import fontmin from 'rollup-plugin-font-minify';
import { defineConfig } from 'vite';
import { Plugin as importToCDN } from 'vite-plugin-cdn-import';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler']
      }
    }),
    ViteImageOptimizer(),
    svgr({ include: '**/*.svg?react' }),
    fontmin(),
    importToCDN({
      modules: [
        {
          name: 'clsx',
          var: 'clsx',
          path: 'https://unpkg.com/clsx@2.1.1/dist/clsx.min.js'
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, './index.html')
      },
      output: {
        format: 'esm',
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig(({ command, mode }) => {
  const isLib = command === 'build' && mode === 'lib'

  if (isLib) {
    return {
      plugins: [
        react(),
        dts({
          insertTypesEntry: true,
          tsconfigPath: './tsconfig.json',
        }),
      ],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'ReactHeadlessOverlay',
          formats: ['es', 'umd'],
          fileName: (format) => `react-headless-overlay.${format === 'es' ? 'js' : 'umd.cjs'}`,
        },
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
      },
      resolve: {
        alias: {
          '@': resolve(__dirname, './src'),
        },
      },
    }
  }

  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true,
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  }
})

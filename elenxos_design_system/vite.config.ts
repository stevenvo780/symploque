import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Library build mode: npm run build:lib
  if (mode === 'lib') {
    return {
      plugins: [
        react(),
        dts({ include: ['src'], outDir: 'dist' }),
      ],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'ElenxosDesignSystem',
          formats: ['es', 'cjs'],
          fileName: (format) => `elenxos-design-system.${format}.js`,
        },
        rollupOptions: {
          external: ['react', 'react-dom', 'react/jsx-runtime'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
              'react/jsx-runtime': 'jsxRuntime',
            },
          },
        },
      },
    }
  }

  // Default: dev / app build (demo + render pages)
  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          render: resolve(__dirname, 'render.html'),
        },
      },
    },
  }
})

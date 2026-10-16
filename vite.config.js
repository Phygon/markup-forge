import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    base: '/markup-forge/',
    root: 'src',
    envDir: '..',
    publicDir: '../public',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rolldownOptions: {
            output: {
                codeSplitting: {
                    groups: [
                        { name: 'katex', test: /\/node_modules\/katex/ },
                        { name: 'mermaid', test: /\/node_modules\/mermaid/ },
                        { name: 'monaco', test: /\/node_modules\/(@monaco|monaco)/ },
                        { name: 'react', test: /\/node_modules\/react/ },
                        { name: 'tanstack', test: /\/node_modules\/@tanstack/ },
                        { name: 'commons', test: /\/node_modules\// },
                    ],
                },
            }
        }
    },
    plugins: [react()],
})


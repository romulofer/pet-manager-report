import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// relative URLs, so the build works under any path (GitHub Pages serves it from /<repo-name>/)
export default defineConfig({ base: './', plugins: [react()] });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // This line is crucial: it tells the plugin to process JSX in .js files too.
      include: '**/*.{js,jsx,ts,tsx}',
    }),
  ],
  // Keep any other Vite configurations you might have here.
});
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'skip-body-parser-for-api',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url.startsWith('/api/convert-image')) {
            // By changing the content-type, we prevent Vite's body parser from running
            // and let our API route handle the raw stream.
            req.headers['content-type'] = 'application/octet-stream';
          }
          next();
        });
      },
    },
  ],
})

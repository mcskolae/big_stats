import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                home: 'index.html',
                football: 'football.html',
                basketball: 'basketball.html',
                mma: 'mma.html',
            },
        },
    },
});

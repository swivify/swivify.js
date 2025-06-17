export default {
    plugins: [
        // Add real-world plugins here
    ],
    env: {
        files: ['./.env.development', './.env.shared'],
        prefix: 'REAL_' // Example: REAL_PORT, REAL_DB_URL
    }
};

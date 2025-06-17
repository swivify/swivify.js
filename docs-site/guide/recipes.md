# Recipes

Swivify provides official recipes for Docker, CI/CD, and cloud deployment, making it easy to take your project from local development to production.

## Docker

Containerize your Swivify project with the provided Dockerfile and docker-compose setup.

### Usage

1. Build the image:
   ```sh
   docker build -t swivify-app .
   ```
2. Run the container:
   ```sh
   docker run -p 3000:3000 swivify-app
   ```

Edit the Dockerfile as needed for production, multi-stage builds, or custom environments.

## CI/CD

Automate your Swivify project’s build, test, and deployment with the sample GitHub Actions workflow:

- Installs dependencies
- Builds the project
- Runs tests

You can extend this workflow for deployment, linting, or other automation. See `.github/workflows` in the recipe folder for examples.

## Cloud Deployment

Deploy your Swivify project to popular cloud providers like Vercel or AWS Lambda.

- **Vercel:** Use the provided `vercel.json` to deploy your API as a serverless function.
- **AWS Lambda:** Use the [Serverless Framework](https://www.serverless.com/) or AWS SAM. Add your handler entrypoint and configuration as needed.

Example `vercel.json`:

```json
{
  "version": 2,
  "builds": [{ "src": "src/server.ts", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "/src/server.ts" }]
}
```

See the `cloud` recipe folder for more provider-specific examples.

## Using Recipes

- Scaffold with the CLI or copy from `/templates/_recipes` in the monorepo.
- Customize as needed for your stack and deployment target.

---

[Back to Guide](./)

# Docker Recipe

This Dockerfile is a starting point for containerizing your Swivify project.

## Usage

1. Build the image:
   ```sh
   docker build -t swivify-app .
   ```
2. Run the container:
   ```sh
   docker run -p 3000:3000 swivify-app
   ```

Edit as needed for production, multi-stage builds, or custom environments.

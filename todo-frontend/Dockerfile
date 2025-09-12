
# ------------------------------------------------------------------------------
# Dockerfile for TodoApp React Frontend
# ------------------------------------------------------------------------------
# This Dockerfile builds and serves the React frontend for the TodoApp.
# It uses a multi-stage build for efficiency:
#   1. Build the React app with Node.js
#   2. Serve the static files with Nginx
# ------------------------------------------------------------------------------

# --- Stage 1: Build React App ---
FROM node:20-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy dependency manifests first for better build caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Build the React app (output goes to /app/dist)
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

# Copy built static files from previous stage to Nginx's web root
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start Nginx in the foreground (so the container stays alive)
CMD ["nginx", "-g", "daemon off;"]

# ------------------------------------------------------------------------------
# USAGE:
#   1. Build the image:
#        docker build -t todo-frontend .
#   2. Run the container:
#        docker run -p 3000:80 todo-frontend
#   3. Or use with docker-compose for full-stack orchestration.
# ------------------------------------------------------------------------------

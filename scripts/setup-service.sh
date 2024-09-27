#!/bin/bash

# Initialize npm project
npm init -y

# Install Fastify and @fastify/http-proxy
npm install fastify @fastify/http-proxy

# Create an empty index.js file
touch index.js

# Print success message
echo "Setup complete! Fastify API gateway is ready. You can add your code to index.js"

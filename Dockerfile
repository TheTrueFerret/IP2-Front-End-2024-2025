FROM node:18-alpine

WORKDIR /react-app/

# Copy the necessary files
COPY public/ /react-app/public
COPY src/ /react-app/src

# Copy the Configs
COPY package.json /react-app/

COPY tsconfig.json /react-app/
COPY tsconfig.app.json /react-app/
COPY tsconfig.node.json /react-app/

COPY postcss.config.cjs /react-app/
COPY tailwind.config.js /react-app/

COPY vite.config.ts /react-app/

# Copy the Index
COPY index.html /react-app/

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Use a lightweight HTTP server to serve the built files
RUN npm install -g serve

# Start the server to serve the build folder and keep the container running
CMD ["serve", "-s", "dist", "-l", "3000"]
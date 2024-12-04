FROM node:18-alpine

WORKDIR /react-app/

# Copying the necessary files
COPY public/ /react-app/public
COPY src/ /react-app/src

COPY .env.production /react-app/

# Copying the Configs
COPY package.json /react-app/

COPY tsconfig.json /react-app/
COPY tsconfig.app.json /react-app/
COPY tsconfig.node.json /react-app/

COPY postcss.config.cjs /react-app/
COPY tailwind.config.js /react-app/

COPY vite.config.ts /react-app/

# Copying the Index
COPY index.html /react-app/

# Installing dependencies
RUN npm install

# Building the application
RUN npm run build

# Exposing the port your app runs on
EXPOSE 3000

# Using a lightweight HTTP server to serve the built files
RUN npm install -g serve

# Starting the server to serve the build folder and keep the container running
CMD ["serve", "-s", "dist", "-l", "3000"]

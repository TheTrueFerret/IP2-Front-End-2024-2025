FROM node:hydrogen-alpine as build-env

WORKDIR /react-app


# Copy all configuration and project files
COPY package.json tsconfig*.json postcss.config.cjs tailwind.config.js vite.config.ts index.html ./
COPY .env.production ./
COPY public/* public/
COPY src/ src/


# Installing dependencies
RUN npm install

# Building the application
RUN npm run build


FROM nginx:mainline-alpine3.18-perl

# Expose port 3000
EXPOSE 3000


# Copy Nginx configuration
COPY .nginx/nginx.conf /etc/nginx/nginx.conf

# Clean up default Nginx content and copy built app
RUN rm -rf /usr/share/nginx/html/* 

# Correct the path for copying dist files
COPY --from=build-env /react-app/dist /usr/share/nginx/html/web-app
COPY --from=build-env /react-app/dist/* /tmpl/dist/web-app/


# Handeling environment script
COPY env.sh /docker-entrypoint.d/env.sh
RUN dos2unix /docker-entrypoint.d/env.sh && \
    chmod +x /docker-entrypoint.d/env.sh

CMD ["nginx", "-g", "daemon off;"]

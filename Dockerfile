
FROM node:18-alpine

WORKDIR /react-app/

COPY public/ /react-app/public
COPY src/ /react-app/src

COPY package.json /react-app/

COPY tsconfig.json /react-app/
COPY tsconfig.app.json /react-app/
COPY tsconfig.node.json /react-app/

COPY vite.config.ts /react-app/

COPY index.html /react-app/

RUN npm install

CMD ["npm", "run", "build"]

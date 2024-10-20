FROM node:12

WORKDIR /app
COPY . .

RUN npm install -g express-generator \
    && \
    npm install
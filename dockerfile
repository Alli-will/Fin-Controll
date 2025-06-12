FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run prisma:generate && npm run build
RUN npm prune --production
CMD sh -c "npx prisma migrate dev --name docker-init && npm start"
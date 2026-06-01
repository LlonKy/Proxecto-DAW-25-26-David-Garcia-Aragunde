FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY src ./src


EXPOSE 3001

COPY start.sh ./
RUN chmod +x start.sh
CMD ["./start.sh"]
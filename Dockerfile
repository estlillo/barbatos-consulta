# Install dependencies only when needed
FROM node:16.15.1

RUN mkdir -p /root/barbatos-consulta-doc

WORKDIR /root/barbatos-consulta-doc

COPY package*.json .

COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]

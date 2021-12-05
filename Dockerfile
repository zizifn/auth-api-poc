FROM node:16

ENV NODE_ENV=production

# Create app directory
WORKDIR /app

COPY . .

# RUN npm install
# If you are building your code for production
RUN npm ci --only=production

CMD [ "npm", "start" ]


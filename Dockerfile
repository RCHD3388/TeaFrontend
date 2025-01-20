# Base image
FROM node:18

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy application source code
COPY . .

# Expose the development server port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]
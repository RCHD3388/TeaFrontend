# Build stage
FROM node:18-alpine AS builder

# Direktori kerja untuk build
WORKDIR /app

# Salin file package dan install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Salin seluruh source code
COPY . .

# Build aplikasi frontend
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Salin hasil build ke direktori default Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 untuk akses HTTP
EXPOSE 5173

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]

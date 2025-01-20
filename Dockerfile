# Gunakan base image Node.js yang ringan
FROM node:18-alpine AS builder

# Direktori kerja untuk build
WORKDIR /app

# Salin file package dan install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Salin seluruh source code
COPY . .

# Build aplikasi (transpile TypeScript ke JavaScript)
RUN npm run build

# Gunakan base image ringan untuk runtime
FROM node:18-alpine

# Direktori kerja untuk runtime
WORKDIR /app

# Copy hanya hasil build dan dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose port untuk backend
EXPOSE 3000

# Jalankan backend dalam mode produksi
CMD ["node", "dist/main"]

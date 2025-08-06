# Use Node.js 20 Alpine (better compatibility with Vite)
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Generate production build
RUN npm run build


#Stage 2: serve the built app
# Use a lightweight web server to serve the production build
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist /app/dist

RUN npm install -g serve

# Expose port vite
EXPOSE 5173

# Start the server
CMD ["serve", "-s", "dist", "-l", "3000"]


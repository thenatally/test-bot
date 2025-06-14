# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install --production

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Use non-root user for security
RUN adduser -D appuser && chown -R appuser /usr/src/app
USER appuser

# Expose any ports if needed (none by default)
# EXPOSE 3000

# Start the bot
CMD ["npm", "start"]

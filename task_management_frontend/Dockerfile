# Use an official Bun image
FROM oven/bun:1

# Set the working directory
WORKDIR /app

# Copy package.json and bun.lockb
COPY package.json .
COPY bun.lockb .

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose the port
EXPOSE 5173

# Start the application
CMD ["bun", "run", "dev", "--host"]
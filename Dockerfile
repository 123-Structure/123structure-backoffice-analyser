# Use last Puppeteer image
FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the current directory in the container
COPY package.json pnpm-lock.yaml ./       

# Install dependencies using pnpm
RUN npx pnpm install --frozen-lockfile

# Copy all files from the current directory to the working directory in the container
COPY . ./

# Run the "start" script using pnpm
CMD ["npx", "pnpm", "start"]

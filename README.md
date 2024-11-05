# Sentry to Mattermost Adapter

![Sentry](https://img.shields.io/badge/sentry-%23362D59.svg?style=flat&logo=sentry&logoColor=white)
![Mattermost](https://img.shields.io/badge/mattermost-%232B2B8C.svg?style=flat&logo=mattermost&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

A small application built in TypeScript for integrating Sentry with Mattermost. This adapter reformats Sentry event messages to be compatible with Mattermost webhooks, enabling smooth, automated notifications and updates from Sentry to your Mattermost chats.

## Table of Contents

- [Problem Statement](#problem-statement)
- [Solution Overview](#solution-overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Production Deployment](#production-deployment)
- [Logging](#logging)
- [Contributing](#contributing)
- [License](#license)

## Problem Statement

- Sentry does not provide direct integration with Mattermost.
- Mattermost webhooks do not support the payload format sent by Sentry.

## Solution Overview

This adapter serves as an intermediary service to solve the above issues:

1. The adapter receives an event from Sentry.
2. It converts the message to a format compatible with Mattermost.
3. It sends the formatted message to a specified Mattermost channel using a webhook.

## Technologies Used

- TypeScript
- Express
- Winston 
- Axios

## Installation

To get started, clone the repository and install dependencies.

```bash
git clone https://github.com/your-username/adapter-mattermost-sentry.git
cd adapter-mattermost-sentry
npm install
```

## Usage

### Configuration

1. Set up environment variables by creating a `.env` file in the root directory:
   ```plaintext
   PORT=4045
   URL_WEBHOOK=https://mattermost.example.com/hooks/your-webhook-url
   ```
2. Adjust `PORT` and `URL_WEBHOOK` as necessary.

## Development

For local development:

```bash
npm run dev
```

This will start the server using `nodemon` on the specified port in `./src/app.ts`.

## Production Deployment

1. Install `pm2` globally for process management:
   ```bash
   npm install pm2 -g
   ```
2. Start the application in production mode:
   ```bash
   npm run start
   ```

To view running processes managed by `pm2`:

```bash
pm2 list
```

## Logging

Logs are stored in the `./logs` directory after the application starts.

- `all.log` - Contains all log messages.
- `error.log` - Contains only error messages.

## Contributing

We welcome contributions! Here’s how you can help:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them with descriptive messages.
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request and describe your changes.

Please ensure your code follows existing patterns and includes necessary tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

# 🤖 Transformers API

[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org)
[![Express](https://img.shields.io/badge/Express-4.0+-lightgrey.svg)](https://expressjs.com)

A modern, secure, and well-tested TypeScript API for Transformers character names (1984-2011). Built with Express.js, featuring comprehensive security middleware, rate limiting, structured logging, and full test coverage.

## ✨ Features

- 🔒 **Security First**: Helmet, CORS, rate limiting, input validation
- 📝 **TypeScript**: Full type safety and modern ES2022 features
- 🧪 **Well Tested**: Unit and integration tests with Jest
- 📊 **Structured Logging**: Custom logger with different log levels
- 🚀 **Modern Architecture**: Clean separation of concerns
- 🔧 **Developer Experience**: ESLint, Prettier, Husky, lint-staged
- 📖 **API Documentation**: Clear endpoint documentation
- 🐳 **Production Ready**: Environment-based configuration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd transformers-api

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

## 📚 API Endpoints

### Base URL

```
http://localhost:3009/api/v1
```

### Available Endpoints

| Method | Endpoint  | Description      | Parameters   |
| ------ | --------- | ---------------- | ------------ |
| GET    | `/health` | Health check     | -            |
| GET    | `/random` | Get random names | `?count=5`   |
| GET    | `/search` | Search names     | `?q=optimus` |
| GET    | `/all`    | Get all names    | -            |
| GET    | `/stats`  | API statistics   | -            |

### Example Responses

#### Get Random Names

```bash
curl "http://localhost:3009/api/v1/random?count=3"
```

```json
{
  "status": "SUCCESS",
  "data": {
    "names": ["Optimus Prime", "Bumblebee", "Megatron"],
    "total": 3
  },
  "message": "Retrieved 3 random transformer names"
}
```

#### Search Names

```bash
curl "http://localhost:3009/api/v1/search?q=optimus"
```

```json
{
  "status": "SUCCESS",
  "data": {
    "names": ["Optimus Prime"],
    "total": 1,
    "query": "optimus"
  },
  "message": "Found 1 transformer names matching \"optimus\""
}
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server

# Testing
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint         # Lint code
npm run lint:fix     # Fix linting issues
npm run format       # Format code with Prettier
npm run type-check   # Check TypeScript types
npm run validate     # Run all quality checks
```

### Project Structure

```
src/
├── controllers/     # Route handlers
├── services/       # Business logic
├── middleware/     # Express middleware
├── routes/         # Route definitions
├── types/          # TypeScript types
├── utils/          # Utility functions
├── config/         # Configuration
├── app.ts          # Express app setup
├── server.ts       # Server startup
└── index.ts        # Main entry point

tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
├── fixtures/       # Test data
└── setup.ts        # Test configuration
```

## 🔧 Configuration

Environment variables can be configured in `.env`:

```env
# Application
NODE_ENV=development
PORT=3009
API_VERSION=v1

# Security
CORS_ORIGIN=*
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Logging
LOG_LEVEL=info
```

## 🧪 Testing

The API includes comprehensive test coverage:

- **Unit Tests**: Test individual components in isolation
- **Integration Tests**: Test API endpoints end-to-end
- **Coverage Reports**: Generate detailed coverage reports

```bash
# Run all tests
npm test

# Generate coverage report
npm run test:coverage
```

## 🚀 Production Deployment

```bash
# Build the application
npm run build

# Start production server
NODE_ENV=production npm start
```

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Andres Castro** - [crac.dev](http://crac.dev)

---

_This API provides access to Transformers character names from the original series (1984-2011). All character names are property of their respective owners._

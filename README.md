# Fantasy Cards

A Premier League Fantasy football card game application.

## Project Structure

```
fantasy-cards/
├─ frontend/                      # React app (Vite)
├─ backend/                       # Node/Express API
├─ infra/                         # IaC, Docker, deploy, scripts
├─ docs/                          # API spec, decisions, runbooks
├─ .github/                       # CI/CD pipelines
├─ .env.example                   # root env samples (non-secrets)
├─ LICENSE
└─ README.md
```

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL
- Redis (optional, for caching)

### Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your values
3. Install dependencies:

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

4. Start the development servers:

   ```bash
   # Backend (from backend directory)
   npm run dev

   # Frontend (from frontend directory)
   npm run dev
   ```

## Development

- **Frontend**: React with Vite for fast development
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Deployment**: Docker containers with IaC

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

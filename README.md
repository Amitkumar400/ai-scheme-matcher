# AI Scheme Matcher

A full-stack demo that helps entrepreneurs discover Indian public business-finance schemes that may fit their profile. The React interface offers English and Hindi placeholder copy; the Express API performs profile validation, hard eligibility filtering, TF-IDF ranking, and anonymous feedback collection.

> Scheme descriptions and eligibility rules in this repository are illustrative demo data, not official advice. Rules, amounts, and application channels can change. Confirm details with each issuing body before acting. Match percentages are relative ranking scores, not approval probabilities.

## Requirements

- Node.js 20 or newer (npm included)
- MongoDB is optional for local development

## Run locally

1. Install dependencies at the workspace root: `npm install`
2. Start the API and frontend together: `npm run dev`
3. Open `http://localhost:5173`.

Without `MONGODB_URI`, the backend uses its built-in scheme dataset and stores feedback in memory for the process lifetime. To persist schemes and feedback, set `MONGODB_URI` in `backend/.env` using `backend/.env.example` as a template. The backend seeds the database on first run when it contains no schemes.

## API

- `GET /api/schemes` returns scheme records.
- `POST /api/match` accepts `{ gender, socialCategory, disability, sector, location, fundingNeed }` and returns eligible ranked matches.
- `POST /api/feedback` accepts `{ schemeId, outcome, message? }` where outcome is `applied`, `approved`, `rejected`, `not-eligible`, or `other`.
- `GET /api/health` returns API status.

Development requests from Vite are proxied to Express at port 4000. Configure `CLIENT_ORIGIN` when hosting the UI at a different origin.

## Matching and privacy

The backend normalizes text and encodes categorical values for profile comparison. Eligibility constraints are applied before TF-IDF cosine similarity ranks eligible schemes. Profile data is validated and used only during the request; it is not persisted or logged. Feedback records contain only a scheme identifier, outcome, optional short message, and timestamp. Add appropriate consent, retention rules, authentication, and deployment security review before collecting production feedback.

## Checks

Run the matcher unit tests with `npm test --workspace=backend`. Build the frontend with `npm run build`.
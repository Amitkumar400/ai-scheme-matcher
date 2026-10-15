# AI Scheme Matcher Workspace

## Setup Checklist
- [x] Clarify project requirements: React, Vite, Tailwind CSS, Node.js, Express, MongoDB optional.
- [x] Scaffold the project in the current workspace.
- [x] Implement bilingual profile matching, results, REST endpoints, and feedback.
- [x] Add README and workspace-specific instructions.
- [ ] Install dependencies and run tests/build: blocked because Node.js and npm are not available on PATH in the current environment.
- [ ] Launch in debug mode: not launched; install Node.js/npm and validate first.
- [x] Check editor diagnostics: no errors reported.

## Project
- `frontend/` contains the React browser experience; `backend/` contains the REST API and matching logic.
- Run `npm install` and then `npm run dev` from the workspace root to start both services.
- MongoDB is optional for local development; without `MONGODB_URI`, the API uses demo schemes and in-memory feedback.

## Implementation notes
- Use the existing scheme service, controller, model, and route boundaries.
- Keep applicant profile fields transient; do not add applicant profiles to persistence or logs.
- Scheme data is illustrative. Make applicants verify current eligibility with the issuing body.
- Apply explicit eligibility rules before semantic ranking. Ranking percentages are not approval probabilities.
- Follow existing React, Tailwind, Express, Zod, and Mongoose conventions in this workspace.

# HireReady

> AI-powered resume and interview preparation platform that evaluates a resume against a target job description and generates personalized interview preparation insights.

## Overview

ResumeForge AI helps job seekers understand how well their resume fits a specific role before applying or preparing for an interview.

The application combines a React frontend, Node.js/Express backend, MongoDB, and Google's Gemini API to turn a user's resume, self-description, and target job description into a structured interview report.

### What it does

- User registration and login
- Secure authentication using JWT stored in HTTP-only cookies
- Resume PDF upload
- PDF text extraction
- Resume-to-job-description analysis using Gemini
- Overall resume/job match score
- Technical interview questions with expected answer guidance
- Behavioral interview questions
- Identification of skill gaps
- Personalized preparation plan
- AI-generated resume PDF based on structured resume information
- Persistent interview reports stored in MongoDB

## How It Works

```text
User
  |
  v
React Frontend
  |
  | Resume PDF + Self Description + Job Description
  v
Express REST API
  |
  +---- Authentication / JWT
  |
  +---- PDF text extraction
  |
  +---- Gemini AI service
  |          |
  |          v
  |       Gemini API
  |
  v
Structured Interview Report
  |
  v
MongoDB
```

The current implementation is **not a vector-database RAG system**. Resume text, self-description, and job description are processed as context and sent to Gemini for generation. A retrieval/embedding layer can be added later if the project evolves into a full RAG architecture.

## Core Features

### 1. Authentication

The backend provides authentication endpoints for:

- Register
- Login
- Logout
- Get current user

Authentication is handled using JWT and cookies, with protected interview routes.

### 2. Resume Analysis

A user can provide:

- Resume PDF
- Self description
- Target job description

The backend extracts the resume text and sends the relevant information to the Gemini-powered AI service.

### 3. AI Interview Report

The generated report contains structured information such as:

- Match score
- Technical questions
- Behavioral questions
- Skill gaps
- Preparation plan

This makes the output easier for the frontend to display and easier for the backend to persist as structured data.

### 4. Resume Generation

The backend also contains a resume-generation flow that creates a formatted resume PDF from structured resume information using an HTML template and Puppeteer.

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- pdf-parse
- Puppeteer
- Zod
- Cookie Parser
- CORS

### AI

- Google Gemini API
- `@google/genai`

The backend currently uses Gemini for resume/job analysis and interview-report generation.

## Project Structure

```text
ResumeForge-AI/
│
├── BACKEND/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── interview.controller.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   └── file.middleware.js
│   │   ├── models/
│   │   │   ├── blacklist.model.js
│   │   │   ├── report.model.js
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── interview.route.js
│   │   ├── services/
│   │   │   └── ai.service.js
│   │   └── templates/
│   │       └── resume.template.js
│   │
│   └── server.js
│
├── FRONTEND/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── App.routes.jsx
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 20+
- MongoDB or a MongoDB Atlas database
- A Google Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/Tanmay175/AI_Resume_Analyser.git
cd AI_Resume_Analyser
```

### 2. Configure the backend

```bash
cd BACKEND
npm install
```

Create a `.env` file inside `BACKEND`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Do not commit your `.env` file.

### 3. Start the backend

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 4. Configure and start the frontend

Open another terminal:

```bash
cd FRONTEND
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

The backend is configured to accept requests from the Vite development server and credentials are enabled for cookie-based authentication.

## API Overview

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/getme
```

### Interview / Resume Analysis

```text
POST /api/interview/...
```

Interview endpoints are protected and use the authenticated user context.

## Example AI Input

The AI analysis is conceptually based on three pieces of information:

```text
Resume PDF
    +
Self Description
    +
Job Description
    ↓
Gemini
    ↓
Structured Interview Report
```

The structured report can include data similar to:

```json
{
  "matchScore": 82,
  "technicalQuestions": [
    {
      "question": "Explain REST APIs and the HTTP methods you used.",
      "intention": "Evaluate practical backend/API knowledge.",
      "answer": "..."
    }
  ],
  "behavioralQuestions": [],
  "skillGaps": [],
  "preparationPlan": []
}
```

## Security Notes

- Keep API keys in environment variables.
- Do not commit `.env` files.
- JWT authentication is handled using cookies.
- Passwords are hashed before storage.
- Protected routes use authentication middleware.

## Future Improvements

Planned directions include:

- Resume version/history management
- Better ATS-oriented analysis
- Job-specific resume recommendations
- More detailed keyword and skill matching
- Interview session tracking
- Streaming AI responses
- Resume section-level scoring
- Embeddings and vector search for a true RAG pipeline
- Support for multiple AI providers
- Production deployment with separate frontend/backend environments

## Why This Project?

Traditional resume checkers often provide a generic score without explaining what a candidate should actually do next.

ResumeForge AI focuses on connecting **resume analysis with interview preparation**. Instead of only asking whether a resume matches a job, the system can turn the identified strengths and weaknesses into technical questions, behavioral questions, skill gaps, and a preparation plan.

## Author

**Tanmay Saha**

- GitHub: [Tanmay175](https://github.com/Tanmay175)
- LinkedIn: [Tanmay Saha](https://linkedin.com/in/tanmay-saha-cse01)

## License

This project is currently for educational and portfolio purposes.

## 📌 Discusso — ML-Powered Discussion Platform

![E2E Tests](https://github.com/octoprakhar/Discusso/actions/workflows/deploy.yml/badge.svg)

Discusso is a high-performance, full-stack discussion platform engineered to prioritize **substance over noise**. By integrating custom Machine Learning models into the ranking algorithm, Discusso evaluates content based on semantic quality, intellectual effort, and discussion potential rather than simple engagement metrics.

### 🔗 [Live Demo](https://discusso-gules.vercel.app/) | [Author Portfolio](https://phantomsynth.com/)

> **Note**: The ML microservice is excluded from the live production URL to optimize hosting costs. Full system integration is verified via the automated Playwright suite in the CI/CD pipeline.

## 📸 Visual Demonstration

### 🧪 E2E Integration: Playwright + ML Ranking

<p align="center">
  <img src="./public/sample_video.gif" alt="Discusso E2E Demo" width="100%">
</p>

> **Note**: This demonstration shows the "Golden Run" where the robot creates a post, waits for ML analysis, and verifies the ranking position in the feed.

---

### 🖼️ Feature Gallery

|                         User Dashboard                         |                     Community Interface                      |
| :------------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="./public/screenshots/home-page-1.png" width="400" /> | <img src="./public/screenshots/community.png" width="400" /> |

---

## 🏗️ System Architecture

Discusso is built as a microservice-oriented architecture to separate concerns between user interaction, data persistence, and heavy ML computation.

```mermaid
graph TD
    A[Next.js Frontend] -->|Custom JWT Auth| B[Supabase / PostgreSQL]
    A -->|Asynchronous Requests| C[FastAPI ML Service]
    C -->|Feature Extraction| D[Transformer Models]
    D -->|Quality Scores| B
    B -->|Aggregated Data| A
```

- **Frontend**: Next.js (App Router) with TailwindCSS for a responsive, stateful UI.
- **Database**: Supabase (PostgreSQL) utilizing RPCs and JSONB aggregation for optimized data retrieval.
- **ML Service**: FastAPI-based microservice handling semantic analysis and automated tagging.
- **DevOps**: Dockerized environment with a GitHub Actions CI/CD "Quality Gate."

---

## 🔗 Related Repositories

Discusso is split into two primary services to ensure scalability and separation of concerns:

- **[Discusso Frontend (This Repo)](https://github.com/octoprakhar/Discusso)**: The Next.js web application, UI components, and E2E testing suite.
- **[Discusso ML Service](https://github.com/octoprakhar/discusso-ml)**: The FastAPI microservice handling NLP tasks, sentiment analysis, and the custom ranking algorithm.

> **Note**: Both services are designed to be orchestrated together using the `docker-compose.yml` file found in the root of this repository.

---

## 🔄 App Logic & User Flow

Instead of a simple list, here is how the data and user state flow through the platform:

**1. Discovery Phase**

- **Guest**: Browses high-quality feeds ranked by the "Effort + Openness" algorithm.
- **Search**: Utilizes PostgreSQL text-search (with planned semantic search integration).

**2. Engagement Phase (Authenticated)**

- **Identity**: Hybrid session management (Access + Refresh tokens) via custom JWT logic.
- **Participation**: Users join communities, vote on content, and engage in threaded comments.

**3. Content Creation & ML Analysis**

- **Drafting**: Markdown-supported editor with local save states.
- **Processing**: On submission, the **ML Service** intercepts the post to calculate an **Effort Score** and an **Openness Score**.
- **Tagging**: NLP models automatically generate semantic tags (e.g., `Productivity`, `Work-from-home`) based on context.

---

## 🧠 The Intelligence Layer (ML Integration)

The core differentiator of Discusso is its ranking philosophy. We move away from "clickbait" by using a calculated quality score:

$postQuality = 2 \times Openness + Effort$

$score = postQuality + \tanh(UserKarma)$

- **Effort**: Measures the depth and structural complexity of the post.
- **Openness**: Evaluates the post's potential to trigger meaningful dialogue.
- **Karma Tie-breaker**: User reputation only influences the ranking as a secondary factor, ensuring new, high-quality voices are heard.

---

## 🧪 Engineering Excellence & Testing

To ensure reliability in a distributed environment, Discusso employs a multi-layered testing strategy:

- **End-to-End (E2E)**: Powered by **Playwright**. We simulate real user journeys, including login, community selection, and post creation with a wait-state for ML tag generation.
- **Unit Testing**: Jest handles component-level logic and utility functions.
- **CI/CD Pipeline**:
  1.  Push to `main` triggers a GitHub Action.
  2.  Spins up a Docker Compose environment (Frontend + Backend).
  3.  Runs Playwright suite against the live containers.
  4.  **Quality Gate**: Only if tests pass is the new Frontend image pushed to Docker Hub.

---

## 🐳 Development & Deployment

### Run Locally (Docker)

```bash
# Clone the repository
git clone https://github.com/octoprakhar/Discusso.git

# Setup Environment Variables
# Create .env.local with SUPABASE_URL, SUPABASE_ANON_KEY, etc.

# Spin up the full stack
docker-compose up --build
```

---

## 🛠️ Configuration & Setup

### 🔑 Environment Variables

To run Discusso locally, create a `.env.local` file in the `discusso/` directory.

> **⚠️ Security Note**: Never commit your actual `.env.local` file to GitHub. A template `env.example` is provided in the repository for reference.

| Variable                        | Description                                                             |
| :------------------------------ | :---------------------------------------------------------------------- |
| `SUPABASE_URL`                  | Your project's base URL from the Supabase dashboard.                    |
| `NEXT_PUBLIC_SUPABASE_URL`      | Client-side alias for the Supabase URL.                                 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | The public 'anon' key for client-side database interactions.            |
| `SUPABASE_SERVICE_ROLE_KEY`     | **Secret**: Used for bypass-RLS operations on the server side.          |
| `ACCESS_TOKEN_SECRET`           | Secret string used to sign short-lived JWTs.                            |
| `REFRESH_TOKEN_SECRET`          | Secret string used to sign long-lived refresh tokens.                   |
| `ML_URL`                        | The endpoint for your FastAPI service (e.g., `http://localhost:8000`).  |
| `ML_INTERNAL_SECRET`            | Secure handshake key to authorize requests between Next.js and FastAPI. |

---

### Docker Hub Images

The latest stable images are automatically built and pushed to Docker Hub upon successful CI/CD runs:

- **Frontend**: `prakhar869/discusso-frontend:latest`
- **Backend**: `prakhar869/discusso-backend:latest`

---

## Tech Stack Summary

- **Frontend**: Next.js, TailwindCSS, Playwright
- **Backend**: FastAPI, PyTorch, Sentence-Transformers
- **Infrastructure**: Docker, GitHub Actions, Supabase, Vercel

---

## 🛠️ Engineering Challenges

- **Asynchronous State Syncing**: Resolved a critical race condition in E2E testing where Playwright attempted to post content before the ML service had assigned a `communityId` to the application state.
- **Container Health Orchestration**: Implemented custom Python-native health checks in Docker Compose to ensure the Next.js frontend only initializes after the heavy ML model weights are fully loaded in the FastAPI backend.

---

## 🎯 Vision

## To transform digital forums from "echo chambers of noise" into **hubs of thoughtful exchange**, where the quality of one's argument dictates their reach.

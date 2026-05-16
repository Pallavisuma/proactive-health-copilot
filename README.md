# Proactive Health Copilot

Proactive Health Copilot is an AI-powered health dashboard that synthesizes user data from wearables, medical records, and lab results. It uses advanced agentic workflows with Anthropic's Claude to infer health states, identify risks, and proactively alert users to potential health events before they escalate.

---

## 🏗 Architecture & Systems Thinking
*How we reason about the architecture and tradeoffs.*

The architecture is built as a robust Next.js (App Router) application. It separates data loading, risk calculation, context generation, and AI inference into distinct modular engines (`riskEngine`, `contextEngine`, `triggerEngine`, `alertEngine`, `aiEngine`).

**Tradeoffs & Decisions:**
- **Modular vs Monolithic AI:** Instead of passing all raw data directly into a single LLM prompt (which introduces high latency, cost, and hallucination risk), the system uses a pipeline. Hard algorithmic calculations (`riskEngine`, `healthTwinAgent`) preprocess physiological data (e.g., HRV, sleep efficiency) into deterministic states. The LLM (`aiEngine`) is then used strictly for *synthesis, empathy, and translation* of these states into human-readable, proactive coaching. This guarantees a bounded, deterministic risk assessment with the empathetic flexibility of a generative model.
- **Client vs Server State:** Agentic data processing happens securely in the Next.js server context (API routes). The client strictly handles visualization using Recharts and Tailwind. This ensures sensitive health data isn't unnecessarily exposed to the client bundle.

## 🧠 Agentic Reasoning
*How the system decides and acts on the user's behalf.*

The system utilizes a multi-agent orchestration pattern (`agentOrchestrator.ts`). 
- **Context Generation:** It builds a structured "Memory" of the user's historical triggers, recent behaviors (avg steps, resting HR), and active risks.
- **Autonomous Inference:** The AI engine synthesizes the user profile and physiological trends to *infer* the user's trajectory. For example, if sleep drops below 75% efficiency and Resting HR spikes, the system autonomously transitions the user's state to "Recovery Debt" or "Cardio Stress Pattern".
- **Proactive Intervention:** It doesn't wait for user queries. It autonomously generates personalized, motivational health summaries and preventive coaching based on detected threshold breaches. 

## 🎯 Product Sense
*What we chose to build, and why.*

**Problem:** Existing health apps display charts but require users to be their own doctors to interpret what the data means. 
**Solution:** We built a *Proactive Copilot*. It shifts the paradigm from retroactive reporting ("You slept 5 hours") to proactive intelligence ("Your recovery debt is high, which historically correlates with your migraine episodes. Let's adjust your activity today"). 

Features like the **Health Twin Panel** and **Longitudinal Intelligence Timeline** were prioritized because they provide immediate context. The user doesn't just see a heart-rate spike; they see *why* it matters and *what* to do about it.

## 🚀 Implementation
*What actually works at the end of the session.*

- **Fully functional Next.js Dashboard:** Built with Tailwind CSS and Lucide React.
- **Data Integration Pipeline:** Merges user profiles, wearable data, and medical history into a unified context.
- **Defensive Data Handling:** Graceful handling of missing mock data (null checks, optional chaining) to ensure the UI and Risk Engines don't crash when data streams drop.
- **Algorithmic Risk Engine:** Calculates derived scores for Sleep, Activity, Recovery, and Metabolic drift.
- **Live AI Integration:** Connected to Anthropic's `claude-3-5-sonnet-latest` via the `@anthropic-ai/sdk` to generate personalized coaching.
- **Interactive UI Components:** `HealthTwinPanel` for AI confidence, `TrendChart` for biometric visualization, and `TimelineFeed` for longitudinal history.

## 🤖 AI Fluency
*How AI tools were natively used to supercharge work.*

- **Rapid Prototyping:** Leveraged LLMs for fast iteration on Recharts components and Tailwind layouts, turning abstract design requirements into pixel-perfect components in minutes.
- **Debugging & Error Resolution:** Used AI agent capabilities to rapidly diagnose Next.js Server/Client component mismatches and to write defensive programming strategies to handle complex, deeply nested JSON data errors.
- **Git & Deployment Operations:** Utilized AI to seamlessly execute terminal commands for `gh` authentication, repo initialization, and commit management without breaking context flow.

---

## 💻 Getting Started

First, install dependencies:

```bash
npm install
```

Set up your environment variables by creating a `.env.local` file:

```env
ANTHROPIC_API_KEY=your-anthropic-api-key
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the dashboard.

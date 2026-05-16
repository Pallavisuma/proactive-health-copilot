# Proactive Health Copilot

Proactive Health Copilot is an AI-powered health dashboard that synthesizes user data from wearables, medical records, and lab results. It uses advanced agentic workflows with Anthropic's Claude to infer health states, identify risks, and proactively alert users to potential health events before they escalate.

## Features

- **Health Twin Panel**: Visualizes inferred health states, AI confidence, and the primary drivers of those states.
- **Trend Charts**: Interactive visualizations of physiological metrics (e.g., Sleep Efficiency, Resting Heart Rate) over time.
- **Longitudinal Intelligence**: A timeline feed providing contextual analysis of health patterns based on historical and current data.
- **Agentic Workflows**: Utilizes a multi-agent system (Risk Engine, Context Engine, Trigger Engine, Alert Layer) connected to an LLM for holistic health analysis.

## Getting Started

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

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS, Lucide React
- **Charts**: Recharts
- **AI Integration**: Anthropic SDK (Claude Models)
- **Language**: TypeScript

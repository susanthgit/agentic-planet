import { useState } from 'react';
import './PickYourStack.css';

interface Question {
  id: string;
  prompt: string;
  helper?: string;
  options: { id: string; label: string; hint?: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'kind',
    prompt: 'What are you building?',
    helper: 'Pick the closest match. We optimise for the dominant pattern.',
    options: [
      { id: 'coding', label: 'Coding agent', hint: 'IDE assistant, PR triage, refactor bot' },
      { id: 'workflow', label: 'Workflow / process agent', hint: 'Multi-step business process automation' },
      { id: 'chatbot', label: 'Conversational agent', hint: 'Customer-facing chat, support, Q&A' },
      { id: 'browser', label: 'Browser / web agent', hint: 'Form-fill, scrape, navigate web apps' },
      { id: 'multi', label: 'Multi-agent system', hint: 'Several specialised agents collaborating' },
    ],
  },
  {
    id: 'budget',
    prompt: "What's your monthly budget?",
    helper: 'Per developer for the agent stack itself (LLM + tools + hosting).',
    options: [
      { id: 'free', label: '$0 (free only)', hint: 'Local models, free tiers, OSS only' },
      { id: 'low', label: 'Under $50/mo', hint: 'Single subscription, cheap APIs' },
      { id: 'mid', label: '$50–200/mo', hint: 'Pro plan + reasonable API usage' },
      { id: 'high', label: '$200+/mo', hint: 'Heavy production usage, premium plans' },
    ],
  },
  {
    id: 'host',
    prompt: 'Where will users encounter the agent?',
    options: [
      { id: 'claude', label: 'Claude Desktop / Claude.ai' },
      { id: 'chatgpt', label: 'ChatGPT / OpenAI ecosystem' },
      { id: 'web', label: 'Custom web app (your own UI)' },
      { id: 'slack-teams', label: 'Slack or Microsoft Teams' },
      { id: 'cli-ide', label: 'CLI / IDE (developer-only)' },
      { id: 'internal-portal', label: 'Internal portal / intranet' },
    ],
  },
  {
    id: 'privacy',
    prompt: 'How sensitive is the data this agent will handle?',
    options: [
      { id: 'public', label: 'Public data only', hint: 'Public docs, scraped web data, no PII' },
      { id: 'internal', label: 'Internal but not regulated', hint: 'Company emails, project data' },
      { id: 'sensitive', label: 'Sensitive (PII, customer data)', hint: 'Financial records, health-adjacent' },
      { id: 'regulated', label: 'Regulated / compliance-critical', hint: 'HIPAA, finance, legal' },
    ],
  },
  {
    id: 'team',
    prompt: "What's your team size?",
    options: [
      { id: 'solo', label: 'Solo (just me)' },
      { id: 'small', label: '2–5 people' },
      { id: 'mid', label: '6–25 people' },
      { id: 'large', label: '25+ people' },
    ],
  },
];

interface Stack {
  llm: { primary: string; reason: string; alt?: string };
  host: string;
  tools: string[];
  framework?: string;
  hosting: string;
  notes: string[];
}

function recommend(answers: Record<string, string>): Stack {
  const { kind, budget, host, privacy, team } = answers;

  // LLM picker
  let llm: Stack['llm'];
  if (privacy === 'regulated' || (privacy === 'sensitive' && budget !== 'high')) {
    llm = {
      primary: 'Self-hosted (Llama 3.3 70B via Ollama) or Azure OpenAI with private endpoint',
      reason: 'Regulatory / sensitive data — keep inference inside your perimeter or use a vetted enterprise tier.',
      alt: 'Anthropic via AWS Bedrock if your compliance tier allows',
    };
  } else if (budget === 'free') {
    llm = {
      primary: 'Llama 3.3 70B via Ollama (local)',
      reason: 'Free, runs on your machine. Quality is around GPT-4 for most tasks.',
      alt: 'Qwen 2.5 32B if you have less RAM',
    };
  } else if (kind === 'coding') {
    llm = {
      primary: 'Claude Sonnet 4.5',
      reason: 'Best-in-class for coding tasks in 2026. Excellent tool calling, reliable JSON output.',
      alt: 'GPT-5 if you prefer OpenAI ecosystem',
    };
  } else if (kind === 'multi' || kind === 'workflow') {
    llm = {
      primary: 'Claude Sonnet 4.5 (orchestrator) + Claude Haiku 4.5 (workers)',
      reason: 'Mixed-model setup saves 50–70% on cost. Sonnet plans, Haiku executes.',
    };
  } else if (kind === 'chatbot') {
    llm = {
      primary: 'GPT-4.1 or Claude Sonnet 4.5',
      reason: 'Either works well for conversational agents. Pick based on existing vendor relationship.',
    };
  } else {
    llm = {
      primary: 'Claude Sonnet 4.5',
      reason: 'Strong default. Best tool-calling reliability across all major providers in 2026.',
      alt: 'GPT-5 or Gemini 2.5 Pro',
    };
  }

  // Host
  const hostMap: Record<string, string> = {
    'claude': 'Claude Desktop with MCP servers',
    'chatgpt': 'ChatGPT Custom GPT or Apps SDK',
    'web': 'Custom web UI — Next.js or Astro + Vercel AI SDK',
    'slack-teams': 'Slack app or Microsoft Copilot Studio agent',
    'cli-ide': 'Cline (VS Code) or custom CLI with MCP',
    'internal-portal': 'Custom web UI hosted on your intranet',
  };
  const hostRec = hostMap[host] || 'Custom web UI';

  // Tools (MCPs)
  const tools: string[] = [];
  if (kind === 'coding') tools.push('github-mcp', 'filesystem-mcp', 'playwright-mcp');
  if (kind === 'workflow') tools.push('slack-mcp', 'github-mcp', 'cloudflare-mcp');
  if (kind === 'chatbot') tools.push('postgres-mcp', 'web-search-mcp');
  if (kind === 'browser') tools.push('playwright-mcp', 'browserbase-mcp');
  if (kind === 'multi') tools.push('github-mcp', 'slack-mcp', 'filesystem-mcp', 'postgres-mcp');
  if (privacy !== 'public') tools.push('audit-log (custom)');

  // Framework
  let framework: string | undefined;
  if (kind === 'multi') framework = 'LangGraph or CrewAI';
  if (kind === 'workflow') framework = 'n8n or LangGraph';
  if (kind === 'browser') framework = 'Browser Use or Playwright MCP directly';

  // Hosting
  let hosting: string;
  if (budget === 'free') hosting = 'Cloudflare Pages (free) + GitHub Actions cron';
  else if (privacy === 'regulated') hosting = 'Azure App Service in your tenant + private endpoint';
  else if (team === 'large') hosting = 'AWS / Azure with proper IaC + CI/CD';
  else hosting = 'Cloudflare Pages or Workers + Cloudflare R2 storage';

  // Notes
  const notes: string[] = [];
  if (privacy === 'regulated') notes.push('Get a security review BEFORE building. Compliance is harder to retrofit.');
  if (kind === 'multi' && team === 'solo') notes.push('Multi-agent for solo is often overkill. Try a single agent first.');
  if (budget === 'free' && team === 'large') notes.push('Free tier won\'t scale across a large team. Plan to upgrade.');
  if (host === 'claude' && kind === 'workflow') notes.push('Claude Desktop is great for personal workflows. For team workflows, build a custom UI.');
  if (kind === 'chatbot' && privacy === 'sensitive') notes.push('Add a moderation layer (e.g. content filter) before responses go to users.');

  notes.push('Start with the smallest agent that solves your problem. Add complexity only when required.');

  return { llm, host: hostRec, tools, framework, hosting, notes };
}

export default function PickYourStack() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const total = QUESTIONS.length;
  const progress = done ? 100 : Math.round((step / total) * 100);

  function answer(qId: string, optId: string) {
    setAnswers((a) => ({ ...a, [qId]: optId }));
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setAnswers({});
    setStep(0);
    setDone(false);
  }

  function back() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  if (done) {
    const result = recommend(answers);
    return (
      <div className="pys">
        <div className="pys__progress">
          <div className="pys__progress-bar" style={{ width: '100%' }}></div>
          <div className="pys__progress-label">RESULT</div>
        </div>

        <div className="pys__result">
          <div className="pys__result-head">
            <span className="pys__kicker">▸ RECOMMENDED STACK</span>
            <h2 className="pys__result-title">Here's your shape.</h2>
          </div>

          <div className="pys__result-grid">
            <article className="pys__rec pys__rec--accent">
              <span className="pys__rec-label">PRIMARY LLM</span>
              <h3 className="pys__rec-val">{result.llm.primary}</h3>
              <p className="pys__rec-reason">{result.llm.reason}</p>
              {result.llm.alt && <p className="pys__rec-alt"><strong>Alt:</strong> {result.llm.alt}</p>}
            </article>

            <article className="pys__rec pys__rec--cyan">
              <span className="pys__rec-label">HOST</span>
              <h3 className="pys__rec-val">{result.host}</h3>
            </article>

            <article className="pys__rec pys__rec--green">
              <span className="pys__rec-label">TOOLS / MCPs</span>
              <ul className="pys__tools">
                {result.tools.map((t) => <li key={t}><code>{t}</code></li>)}
              </ul>
            </article>

            {result.framework && (
              <article className="pys__rec pys__rec--magenta">
                <span className="pys__rec-label">ORCHESTRATION</span>
                <h3 className="pys__rec-val">{result.framework}</h3>
              </article>
            )}

            <article className="pys__rec pys__rec--amber">
              <span className="pys__rec-label">HOSTING</span>
              <h3 className="pys__rec-val">{result.hosting}</h3>
            </article>
          </div>

          <div className="pys__notes">
            <h4 className="pys__notes-h">▸ NOTES</h4>
            <ul>
              {result.notes.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          </div>

          <div className="pys__answers-summary">
            <h4 className="pys__notes-h">▸ YOUR ANSWERS</h4>
            <dl>
              {QUESTIONS.map((q) => {
                const opt = q.options.find((o) => o.id === answers[q.id]);
                return (
                  <div key={q.id} className="pys__answer-row">
                    <dt>{q.prompt}</dt>
                    <dd>{opt?.label ?? '—'}</dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="pys__actions">
            <button className="pys__btn pys__btn--primary" onClick={reset}>Run again</button>
          </div>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[step];

  return (
    <div className="pys">
      <div className="pys__progress">
        <div className="pys__progress-bar" style={{ width: `${progress}%` }}></div>
        <div className="pys__progress-label">QUESTION {step + 1} OF {total}</div>
      </div>

      <div className="pys__step">
        <span className="pys__kicker">▸ Q.{String(step + 1).padStart(2, '0')}</span>
        <h2 className="pys__prompt">{q.prompt}</h2>
        {q.helper && <p className="pys__helper">{q.helper}</p>}

        <div className="pys__options">
          {q.options.map((opt) => (
            <button
              key={opt.id}
              className={`pys__option ${answers[q.id] === opt.id ? 'pys__option--selected' : ''}`}
              onClick={() => answer(q.id, opt.id)}
            >
              <span className="pys__option-label">{opt.label}</span>
              {opt.hint && <span className="pys__option-hint">{opt.hint}</span>}
              <span className="pys__option-arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </div>

        {step > 0 && (
          <button className="pys__btn pys__btn--ghost pys__back" onClick={back}>
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}

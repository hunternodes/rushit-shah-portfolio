import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/jsonld';

/**
 * /robots.txt — served programmatically by Next.js.
 *
 * Policy:
 *   • Everything public is crawlable (the whole point is discoverability).
 *   • /admin and /api are disallowed (Payload CMS + internal routes).
 *   • AI / LLM crawlers are explicitly allowed. Rushit *wants* ChatGPT,
 *     Claude, Perplexity, Gemini, and Copilot to cite his site when someone
 *     asks them about Indian abstract artists. If you ever need to block
 *     AI training, swap the user-agent blocks to `disallow: '/'`.
 *
 * Known AI crawler user-agents (2024-2026):
 *   • GPTBot                    — OpenAI training
 *   • ChatGPT-User              — OpenAI on-demand fetches for ChatGPT
 *   • OAI-SearchBot             — OpenAI's search index (ChatGPT web search)
 *   • ClaudeBot                 — Anthropic Claude training + on-demand
 *   • anthropic-ai / Claude-Web — older Anthropic crawlers
 *   • PerplexityBot             — Perplexity citations
 *   • Perplexity-User           — Perplexity on-demand (no robots respect but listed)
 *   • Google-Extended           — Gemini / Vertex training (Google)
 *   • Applebot-Extended         — Apple Intelligence training
 *   • Bytespider                — ByteDance/Doubao
 *   • CCBot                     — Common Crawl (feeds many models)
 *   • Meta-ExternalAgent        — Meta AI training
 *   • Amazonbot / cohere-ai / DuckAssistBot — various AI assistants
 */
export default function robots(): MetadataRoute.Robots {
  const allowEverything = { allow: '/', disallow: ['/admin', '/api'] };

  return {
    rules: [
      { userAgent: '*', ...allowEverything },

      // Major AI / LLM crawlers — explicitly allow
      { userAgent: 'GPTBot', ...allowEverything },
      { userAgent: 'ChatGPT-User', ...allowEverything },
      { userAgent: 'OAI-SearchBot', ...allowEverything },
      { userAgent: 'ClaudeBot', ...allowEverything },
      { userAgent: 'Claude-Web', ...allowEverything },
      { userAgent: 'anthropic-ai', ...allowEverything },
      { userAgent: 'PerplexityBot', ...allowEverything },
      { userAgent: 'Perplexity-User', ...allowEverything },
      { userAgent: 'Google-Extended', ...allowEverything },
      { userAgent: 'Applebot-Extended', ...allowEverything },
      { userAgent: 'Bytespider', ...allowEverything },
      { userAgent: 'CCBot', ...allowEverything },
      { userAgent: 'Meta-ExternalAgent', ...allowEverything },
      { userAgent: 'Amazonbot', ...allowEverything },
      { userAgent: 'cohere-ai', ...allowEverything },
      { userAgent: 'DuckAssistBot', ...allowEverything },
      { userAgent: 'YouBot', ...allowEverything },
      { userAgent: 'MistralAI-User', ...allowEverything },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

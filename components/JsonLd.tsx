/**
 * Server-rendered JSON-LD script tag.
 *
 * Why not `next/script`? We want the payload inside the HTML document on the
 * first byte so crawlers (Google, Bing, GPTBot, ClaudeBot, PerplexityBot)
 * pick it up without executing JS. The `id` is used for dedup + override and
 * also lets Next's React reconciler keep a stable key.
 *
 * `dangerouslySetInnerHTML` is the correct + idiomatic approach here —
 * JSON.stringify produces safe escaped output for a `<script>` element of
 * type `application/ld+json`. We still strip any `</` that would prematurely
 * close the script, defence in depth.
 */
export default function JsonLd({
  data,
  id,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
  id?: string;
}) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

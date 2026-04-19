'use client';

const items = [
  'VADODARA',
  'INDIA',
  'FRAGMENT',
  'CRACKLE NETWORKS',
  'GRADIENT · SPLATTER',
  'ACRYLIC · GOLD LEAF',
  'CANVAS',
  'STUDIO ARCHIVE',
  'COLLECTOR ENQUIRIES',
  'IN',
];

export default function Reel() {
  const content = [...items, ...items];
  return (
    <section
      className="relative py-4 overflow-hidden"
      style={{
        background: 'var(--lime)',
        color: 'var(--night)',
        borderTop: '1px solid var(--night)',
        borderBottom: '1px solid var(--night)',
      }}
    >
      <div className="ticker-track">
        {content.map((w, i) => (
          <span key={i} className="flex items-center shrink-0 gap-6 px-6">
            <span className="font-mono text-sm font-semibold tracking-[0.2em]">{w}</span>
            <span
              className="inline-block w-1.5 h-1.5"
              style={{ background: 'var(--night)' }}
            />
          </span>
        ))}
      </div>
    </section>
  );
}

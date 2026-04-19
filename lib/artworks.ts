export type Artwork = {
  id: string;
  no: string;              // catalogue number, e.g. "01 / SYS"
  title: string;
  year: string;
  medium: string;
  dimensions?: string;
  status: 'available' | 'in-progress';
  accent: 'lime' | 'coral' | 'ice' | 'amber' | 'plum';
  src: string;             // local file once user drops it in /public/artworks
  placeholder: string;     // picsum URL used as fallback
  seed: string;
  caption: string;
  tagline: string;         // short one-liner for grid
  tags: string[];
};

const picsum = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const artworks: Artwork[] = [
  {
    id: 'gradient-inversion',
    no: '01 / SYS',
    title: 'Gradient Inversion',
    year: '2026',
    medium: 'Acrylic & metal leaf on canvas',
    dimensions: '—',
    status: 'available',
    accent: 'amber',
    src: '/artworks/01-gold-silver.jpg',
    placeholder: picsum('shah-gradient-inversion', 1400, 1750),
    seed: 'shah-gradient-inversion',
    caption: 'Gold pulled toward silver — inverted black-and-white splatter holding the fall. The signature of the practice.',
    tagline: 'Gold, pulled toward silver.',
    tags: ['gradient', 'splatter', 'signature'],
  },
  {
    id: 'network-cobalt',
    no: '02 / SYS',
    title: 'Network / Cobalt',
    year: '2025',
    medium: 'Acrylic, crackle medium & gold leaf on canvas',
    dimensions: '—',
    status: 'available',
    accent: 'ice',
    src: '/artworks/02-blue-crackle.jpg',
    placeholder: picsum('shah-network-cobalt', 1400, 1400),
    seed: 'shah-network-cobalt',
    caption: 'A crackle network — cobalt skin split by gold fissures, red flares where the surface could not hold.',
    tagline: 'Where the surface could not hold.',
    tags: ['crackle', 'network', 'cobalt'],
  },
  {
    id: 'decay-map',
    no: '03 / SYS',
    title: 'Decay Map',
    year: '2025',
    medium: 'Acrylic on canvas',
    dimensions: '—',
    status: 'available',
    accent: 'coral',
    src: '/artworks/03-teal-red.jpg',
    placeholder: picsum('shah-decay-map', 1400, 1400),
    seed: 'shah-decay-map',
    caption: 'Teal laid thick, red pulled through — a weathered record of decision and reversal.',
    tagline: 'Decision and reversal.',
    tags: ['brushwork', 'decay', 'gesture'],
  },
  {
    id: 'constellation-field',
    no: '04 / SYS',
    title: 'Constellation Field',
    year: '2026',
    medium: 'Acrylic & ink on canvas',
    dimensions: '—',
    status: 'in-progress',
    accent: 'plum',
    src: '/artworks/04-constellation.jpg',
    placeholder: picsum('shah-constellation', 1400, 1400),
    seed: 'shah-constellation',
    caption: 'A map of small bright events — points that refuse to resolve into a picture and remain as weather.',
    tagline: 'Points that refuse to resolve.',
    tags: ['constellation', 'pattern', 'system'],
  },
  {
    id: 'residue-field',
    no: '05 / SYS',
    title: 'Residue Field',
    year: '2026',
    medium: 'Acrylic on canvas',
    dimensions: '—',
    status: 'in-progress',
    accent: 'lime',
    src: '/artworks/05-residue.jpg',
    placeholder: picsum('shah-residue-field', 1400, 1400),
    seed: 'shah-residue-field',
    caption: 'What a day in the studio leaves behind — pigment at rest, memory of gesture, no intent left at all.',
    tagline: 'What a day leaves behind.',
    tags: ['residue', 'field', 'quiet'],
  },
];

export const exhibitions = [
  {
    year: '2027',
    title: 'Fragment — Debut Solo (in preparation)',
    venue: 'Seeking representation',
    city: 'Mumbai / Delhi / Bangalore',
    type: 'Solo',
    status: 'upcoming',
  },
];

export const accentColor: Record<Artwork['accent'], string> = {
  lime: 'var(--lime)',
  coral: 'var(--coral)',
  ice: 'var(--ice)',
  amber: 'var(--amber)',
  plum: 'var(--plum)',
};

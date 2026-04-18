/**
 * Minimal helpers to produce Payload / Lexical-compatible rich-text JSON.
 * Used only during seeding; the admin editor handles real authoring.
 */

type LexicalText = {
  type: 'text';
  text: string;
  detail: 0;
  format: number; // bitmask: 1 bold, 2 italic, 4 underline, 8 strike, 16 code, 32 subscript, 64 superscript
  mode: 'normal';
  style: '';
  version: 1;
};

type LexicalParagraph = {
  type: 'paragraph';
  format: '';
  indent: 0;
  version: 1;
  children: LexicalText[];
  direction: 'ltr';
  textStyle: '';
  textFormat: 0;
};

export type LexicalRoot = {
  root: {
    type: 'root';
    format: '';
    indent: 0;
    version: 1;
    children: LexicalParagraph[];
    direction: 'ltr';
  };
};

const t = (text: string, format: number = 0): LexicalText => ({
  type: 'text',
  text,
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  version: 1,
});

const p = (children: LexicalText[]): LexicalParagraph => ({
  type: 'paragraph',
  format: '',
  indent: 0,
  version: 1,
  children,
  direction: 'ltr',
  textStyle: '',
  textFormat: 0,
});

/** One-paragraph root from a plain string. */
export function lex(text: string): LexicalRoot {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [p([t(text)])],
      direction: 'ltr',
    },
  };
}

/** Multi-paragraph root from an array of plain strings. */
export function lexParas(paragraphs: string[]): LexicalRoot {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: paragraphs.map((str) => p([t(str)])),
      direction: 'ltr',
    },
  };
}

/**
 * Root with a single paragraph that mixes roman and italic spans.
 * Pass segments like [{ text: 'A painter ', italic: false }, { text: 'between', italic: true }, ...]
 */
export function lexMixed(segments: Array<{ text: string; italic?: boolean }>): LexicalRoot {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      children: [p(segments.map((s) => t(s.text, s.italic ? 2 : 0)))],
      direction: 'ltr',
    },
  };
}

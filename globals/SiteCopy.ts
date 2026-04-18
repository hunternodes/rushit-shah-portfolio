import type { GlobalConfig } from 'payload';

export const SiteCopy: GlobalConfig = {
  slug: 'site-copy',
  label: 'Site Copy',
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  versions: {
    drafts: false,
    max: 20,
  },
  admin: {
    description:
      'Every editable piece of copy on the site. Organized by page. Changes go live within seconds of save.',
  },
  fields: [
    // Internal seed marker — used by the onInit seeder to avoid re-seeding
    {
      name: 'seeded',
      type: 'checkbox',
      admin: { hidden: true },
      defaultValue: false,
    },
    {
      type: 'tabs',
      tabs: [
        // ─── Home ───────────────────────────────────────────
        {
          label: 'Home',
          description: 'Copy shown on the homepage (/)',
          fields: [
            {
              name: 'home_subNavText',
              label: 'Sub-nav strip',
              type: 'text',
              admin: { description: 'The small label at the top of the hero.' },
            },
            {
              name: 'home_heroTagline',
              label: 'Hero tag strip',
              type: 'text',
            },
            {
              name: 'home_heroHeadline',
              label: 'Hero headline',
              type: 'richText',
              admin: { description: 'Supports inline italic — e.g. "Paintings that *hold their* breath."' },
            },
            {
              name: 'home_heroSubtext',
              label: 'Hero subtext',
              type: 'textarea',
            },
            {
              name: 'home_statementLines',
              label: 'Statement — three lines',
              type: 'array',
              minRows: 1,
              maxRows: 5,
              fields: [{ name: 'line', type: 'textarea' }],
            },
            {
              name: 'home_fiveRoomsIntro',
              label: 'Five Rooms intro',
              type: 'textarea',
            },
            {
              name: 'home_finalCallHeadline',
              label: 'Final Call headline',
              type: 'richText',
            },
            {
              name: 'home_finalCallSubtext',
              label: 'Final Call subtext',
              type: 'textarea',
            },
            {
              name: 'home_footerText',
              label: 'Final Call footer line',
              type: 'text',
              admin: { description: 'e.g. "Studio · Vadodara / Singapore / Berlin · 2026"' },
            },
          ],
        },
        // ─── Artist ───────────────────────────────────────
        {
          label: 'Artist',
          description: 'Copy shown on /artist',
          fields: [
            { name: 'artist_heroHeadline', type: 'richText' },
            { name: 'artist_heroSubtext', type: 'textarea' },
            { name: 'artist_portraitCaption', type: 'text' },
            { name: 'artist_noteOne', type: 'richText' },
            { name: 'artist_noteTwo', type: 'richText' },
            { name: 'artist_noteThree', type: 'richText' },
            {
              name: 'artist_biography',
              type: 'richText',
              admin: { description: 'Full long-form biography, multi-paragraph.' },
            },
            {
              name: 'artist_arcItems',
              label: 'Arc timeline',
              type: 'array',
              fields: [
                { name: 'year', type: 'text' },
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
              ],
            },
            { name: 'artist_techniqueOne_title', type: 'text' },
            { name: 'artist_techniqueOne_description', type: 'richText' },
            { name: 'artist_techniqueTwo_title', type: 'text' },
            { name: 'artist_techniqueTwo_description', type: 'richText' },
            { name: 'artist_representationText', type: 'richText' },
          ],
        },
        // ─── Shows ────────────────────────────────────────
        {
          label: 'Shows',
          description: 'Copy shown on /shows (formerly /exhibitions)',
          fields: [
            { name: 'shows_headline', type: 'richText' },
            { name: 'shows_subtext', type: 'textarea' },
            { name: 'shows_upcomingTitle', type: 'text' },
            { name: 'shows_upcomingDetails', type: 'richText' },
            {
              name: 'shows_pastShows',
              label: 'Past shows',
              type: 'array',
              fields: [
                { name: 'year', type: 'text' },
                { name: 'title', type: 'text' },
                { name: 'venue', type: 'text' },
                { name: 'city', type: 'text' },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },
        // ─── Archive ──────────────────────────────────────
        {
          label: 'Archive',
          description: 'Copy shown on /archive',
          fields: [
            { name: 'archive_headline', type: 'richText' },
            { name: 'archive_subtext', type: 'textarea' },
            { name: 'archive_footerNote', type: 'textarea' },
          ],
        },
        // ─── Contact ──────────────────────────────────────
        {
          label: 'Contact',
          description: 'Copy shown on /contact',
          fields: [
            { name: 'contact_headline', type: 'richText' },
            { name: 'contact_subtext', type: 'textarea' },
            { name: 'contact_email', type: 'text' },
            { name: 'contact_location', type: 'text' },
            { name: 'contact_instagram_url', type: 'text' },
            { name: 'contact_instagram_handle', type: 'text' },
            { name: 'contact_linkedin_url', type: 'text' },
            { name: 'contact_replyTimeText', type: 'text' },
          ],
        },
        // ─── Global ───────────────────────────────────────
        {
          label: 'Global',
          description: 'Copy used site-wide (SEO, footer, etc.)',
          fields: [
            { name: 'global_siteName', type: 'text' },
            { name: 'global_siteTagline', type: 'text' },
            { name: 'global_metaDescription', type: 'textarea' },
            {
              name: 'global_ogImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Open Graph social preview image.' },
            },
            { name: 'global_representationLine', type: 'text' },
            { name: 'global_studioLocations', type: 'text' },
          ],
        },
      ],
    },
  ],
};

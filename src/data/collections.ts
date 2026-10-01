export interface WObject {
  id: string;            // catalogue number, e.g. "014"
  title: string;
  collection: string;    // collection slug
  materials: string;
  year: number;
  dimensions?: string;
  note?: string;
  image?: string;        // path under /public/images, empty = placeholder
}

export interface Collection {
  slug: string;
  number: string;
  title: string;
  line: string;          // one-line description (from the concept)
  image?: string;
}

export const collections: Collection[] = [
  { slug: 'scars', number: 'I', title: 'Scars',
    line: 'Scars, fractures and sutures. Ceramic with visible damage, joined or framed in bronze.' },
  { slug: 'roots', number: 'II', title: 'Roots',
    line: 'Organic forms drawn from roots, bone structures, earth and the growth of nature.' },
  { slug: 'the-beautiful-monster', number: 'III', title: 'The Beautiful Monster',
    line: 'Forms that attract and unsettle at once: claw, organism, body and object.' },
  { slug: 'relics', number: 'IV', title: 'Relics',
    line: 'Found structures and nature imprints as artefacts from an imaginary future.' },
  { slug: 'body', number: 'V', title: 'Body',
    line: 'Objects for the body, conceived as autonomous sculptures.' },
  { slug: 'memory-objects', number: 'VI', title: 'Memory Objects',
    line: 'Small wearable monuments built from traces, imprints and found structures.' },
];

// Placeholder objects — replaced with the real catalogue once images arrive.
export const objects: WObject[] = collections.flatMap((c, ci) =>
  [1, 2, 3].map((n) => {
    const id = String(ci * 3 + n).padStart(3, '0');
    return {
      id,
      title: `${c.title} ${['I', 'II', 'III'][n - 1]}`,
      collection: c.slug,
      materials: n % 2 ? 'Ceramic, bronze' : 'Bronze, patinated',
      year: 2026,
      dimensions: '— × — × — mm',
    };
  }),
);

export const objectsIn = (slug: string) => objects.filter((o) => o.collection === slug);
export const collectionOf = (o: WObject) => collections.find((c) => c.slug === o.collection)!;

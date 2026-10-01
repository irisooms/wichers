import type { ImageMetadata } from 'astro';
import catalogue from './catalogue.json';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/works/*.jpg', { eager: true });
const img = (slug: string) => files[`../assets/works/${slug}.jpg`]?.default;

export interface WObject {
  id: string;            // catalogue number, e.g. "014"
  slug: string;
  title: string;
  collection: string;    // collection slug
  materials: string;     // TODO: confirm per object with the studio
  year?: number;
  dimensions?: string;
  note?: string;
  image?: ImageMetadata;
  // 'contain' for objects shot on white (shown in a vitrine), 'cover' for studio shots
  fit: 'contain' | 'cover';
  views: { image: ImageMetadata; fit: 'contain' | 'cover' }[]; // back, detail, worn
}

export interface Collection {
  slug: string;
  number: string;
  title: string;
  line: string;          // one-line description (from the concept)
  cover: string;         // object slug used as cover image
}

export const collections: Collection[] = [
  { slug: 'scars', number: 'I', title: 'Scars', cover: 'broken-lady',
    line: 'Scars, fractures and sutures. Ceramic with visible damage, joined or framed in metal.' },
  { slug: 'roots', number: 'II', title: 'Roots', cover: 'calyciphyta-longistipula',
    line: 'Organic forms drawn from roots, bone structures, earth and the growth of nature.' },
  { slug: 'the-beautiful-monster', number: 'III', title: 'The Beautiful Monster', cover: 'lotus-with-snakes',
    line: 'Forms that attract and unsettle at once: claw, organism, body and object.' },
  { slug: 'relics', number: 'IV', title: 'Relics', cover: 'botanical-wonder-z',
    line: 'Found structures and nature imprints as artefacts from an imaginary future.' },
  { slug: 'body', number: 'V', title: 'Body', cover: 'vanitas-body-with-flowers',
    line: 'Objects for the body, conceived as autonomous sculptures.' },
  { slug: 'memory-objects', number: 'VI', title: 'Memory Objects', cover: 'vanitas-bird-on-egg',
    line: 'Small wearable monuments built from traces, imprints and found structures.' },
];

export const objects: WObject[] = catalogue.map((o) => ({
  ...o,
  image: img(o.slug),
  fit: o.fit as WObject['fit'],
  views: o.views.flatMap((v) => {
    const image = img(v.slug);
    return image ? [{ image, fit: v.fit as WObject['fit'] }] : [];
  }),
}));

export const objectBySlug = (slug: string) => objects.find((o) => o.slug === slug);
export const objectsIn = (slug: string) => objects.filter((o) => o.collection === slug);
export const collectionOf = (o: WObject) => collections.find((c) => c.slug === o.collection)!;
export const coverOf = (c: Collection) => objectBySlug(c.cover)?.image;

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: 'Company' | 'Industry' | 'Global Trade' | 'Case Studies' | 'Technology';
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
};

export const articles: Article[] = [
  {
    id: 'a1',
    title: 'The new geometry of trans-Pacific freight',
    excerpt:
      'Carrier consolidation, blank sailings and the rise of Mexican nearshoring are redrawing the Pacific lane. We map the new lanes and what shippers should renegotiate before Q4.',
    category: 'Global Trade',
    date: '2026-07-22',
    readTime: '8 min',
    image:
      'https://images.pexels.com/photos/12530465/pexels-photo-12530465.jpeg?auto=compress&cs=tinysrgb&w=1600',
    featured: true,
  },
  {
    id: 'a2',
    title: 'Why your control tower should be a product, not a project',
    excerpt:
      'Teams that treat visibility as software ship faster, react sooner and retain institutional knowledge. A field guide to building a freight control tower that lasts.',
    category: 'Technology',
    date: '2026-07-08',
    readTime: '6 min',
    image:
      'https://images.pexels.com/photos/1267329/pexels-photo-1267329.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'a3',
    title: 'Moving a 62-tonne turbine: a route survey, annotated',
    excerpt:
      'A candid walkthrough of the structural analysis, permits and night-only transport windows behind our most complex project cargo move this year.',
    category: 'Case Studies',
    date: '2026-06-29',
    readTime: '11 min',
    image:
      'https://images.pexels.com/photos/36652844/pexels-photo-36652844.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    id: 'a4',
    title: 'Customs compliance is a margin lever, not a cost center',
    excerpt:
      'How reclassification and first-sale valuation recovered seven figures of duty for a single apparel importer — without changing a single shipment.',
    category: 'Industry',
    date: '2026-06-12',
    readTime: '5 min',
    image:
      'https://images.pexels.com/photos/14214416/pexels-photo-14214416.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
];

export const articleCategories = [
  'All',
  'Company',
  'Industry',
  'Global Trade',
  'Case Studies',
  'Technology',
] as const;

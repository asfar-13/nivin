export type Industry = {
  id: string;
  name: string;
  blurb: string;
};

export const industries: Industry[] = [
  { id: 'retail', name: 'Retail & E-commerce', blurb: 'Peak-season capacity and final-mile velocity for storefronts that cannot stock out.' },
  { id: 'energy', name: 'Energy & Infrastructure', blurb: 'Heavy-lift, project cargo and route-engineered moves for capital projects.' },
  { id: 'pharma', name: 'Pharmaceuticals', blurb: 'GDP-validated cold chain with continuous temperature logging and audit trails.' },
  { id: 'automotive', name: 'Automotive', blurb: 'Sequence-critical linefeed and knock-down kit logistics for assembly plants.' },
  { id: 'tech', name: 'Technology', blurb: 'High-value, high-velocity air freight with chain-of-custody and tamper-evident handling.' },
  { id: 'food', name: 'Food & Beverage', blurb: 'Reefer and bonded storage for perishables with shelf-life-aware dispatch.' },
];

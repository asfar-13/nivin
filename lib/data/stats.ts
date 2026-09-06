export type Stat = {
  value: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
  label: string;
  sublabel: string;
};

export const stats: Stat[] = [
  
  {
    value: 98.2,
    suffix: '%',
    decimals: 1,
    label: 'On-Time Delivery',
    sublabel: 'Rolling 12-month average',
  },
  {
    value: 100,
    suffix: '+',
    label: 'Countries Served',
    sublabel: 'With licensed customs brokers',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Operations Support',
    sublabel: 'Dedicated control tower',
  },
];

export type NetworkNode = {
  id: string;
  name: string;
  region: string;
  x: number; // 0-100 (SVG viewBox percent)
  y: number; // 0-100
  hub?: boolean;
};

export type NetworkRoute = {
  id: string;
  from: string;
  to: string;
  mode: 'air' | 'ocean' | 'land';
};

export const networkNodes: NetworkNode[] = [
  { id: 'shanghai', name: 'Shanghai', region: 'Asia', x: 82, y: 42, hub: true },
  { id: 'singapore', name: 'Singapore', region: 'Asia', x: 76, y: 62, hub: true },
  { id: 'hongkong', name: 'Hong Kong', region: 'Asia', x: 80, y: 46 },
  { id: 'tokyo', name: 'Tokyo', region: 'Asia', x: 87, y: 40 },
  { id: 'mumbai', name: 'Mumbai', region: 'Asia', x: 68, y: 52 },
  { id: 'dubai', name: 'Dubai', region: 'ME', x: 62, y: 50, hub: true },
  { id: 'rotterdam', name: 'Rotterdam', region: 'Europe', x: 49, y: 32, hub: true },
  { id: 'hamburg', name: 'Hamburg', region: 'Europe', x: 51, y: 30 },
  { id: 'frankfurt', name: 'Frankfurt', region: 'Europe', x: 52, y: 34 },
  { id: 'london', name: 'London', region: 'Europe', x: 47, y: 31 },
  { id: 'newyork', name: 'New York', region: 'N. America', x: 28, y: 38, hub: true },
  { id: 'losangeles', name: 'Los Angeles', region: 'N. America', x: 15, y: 44, hub: true },
  { id: 'chicago', name: 'Chicago', region: 'N. America', x: 22, y: 39 },
  { id: 'mexico', name: 'Mexico City', region: 'N. America', x: 19, y: 52 },
  { id: 'sao', name: 'São Paulo', region: 'S. America', x: 32, y: 70, hub: true },
  { id: 'sydney', name: 'Sydney', region: 'Oceania', x: 88, y: 78, hub: true },
  { id: 'lagos', name: 'Lagos', region: 'Africa', x: 50, y: 60 },
  { id: 'capetown', name: 'Cape Town', region: 'Africa', x: 53, y: 76 },
];

export const networkRoutes: NetworkRoute[] = [
  { id: 'r1', from: 'shanghai', to: 'rotterdam', mode: 'ocean' },
  { id: 'r2', from: 'shanghai', to: 'losangeles', mode: 'ocean' },
  { id: 'r3', from: 'shanghai', to: 'sydney', mode: 'ocean' },
  { id: 'r4', from: 'singapore', to: 'dubai', mode: 'ocean' },
  { id: 'r5', from: 'dubai', to: 'rotterdam', mode: 'ocean' },
  { id: 'r6', from: 'rotterdam', to: 'newyork', mode: 'ocean' },
  { id: 'r7', from: 'newyork', to: 'sao', mode: 'ocean' },
  { id: 'r8', from: 'losangeles', to: 'tokyo', mode: 'air' },
  { id: 'r9', from: 'hongkong', to: 'frankfurt', mode: 'air' },
  { id: 'r10', from: 'mumbai', to: 'dubai', mode: 'air' },
  { id: 'r11', from: 'newyork', to: 'london', mode: 'air' },
  { id: 'r12', from: 'losangeles', to: 'mexico', mode: 'land' },
  { id: 'r13', from: 'mexico', to: 'newyork', mode: 'land' },
  { id: 'r14', from: 'rotterdam', to: 'hamburg', mode: 'land' },
  { id: 'r15', from: 'capetown', to: 'lagos', mode: 'ocean' },
  { id: 'r16', from: 'dubai', to: 'mumbai', mode: 'air' },
];

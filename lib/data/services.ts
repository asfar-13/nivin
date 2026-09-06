import {
  Plane,
  Ship,
  FileCheck2,
  Warehouse,
  PackageSearch,
  Truck,
  type LucideIcon,
} from 'lucide-react';

export type Service = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: 'air',
    index: '',
    name: 'PROJECT CARGO',
    tagline: 'Speed where it matters',
    description:
      'Priority air cargo with guaranteed capacity on major lanes, charter options for oversized freight, and same-day hand-courier for critical parts.',
    features: ['Guaranteed capacity', 'Charters & AOG', 'Next-flight-out'],
    image:
      'https://images.pexels.com/photos/29358895/pexels-photo-29358895.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Plane,
  },
  {
    id: 'ocean',
    index: '',
    name: 'MULTIMODEL TRANSPOTATION',
    tagline: 'Scale with predictability',
    description:
      'FCL, LCL and reefer containers across 100+ ports with allocated vessel space, transparent sailing schedules and consolidation built around your rhythm.',
    features: ['FCL & LCL', 'Reefer & hazardous', 'Allocated space'],
    image:
      'https://images.pexels.com/photos/12530455/pexels-photo-12530455.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Ship,
  },
  {
    id: 'customs',
    index: '',
    name: 'Customs Brokerage',
    tagline: 'Cleared without friction',
    description:
      'Licensed customs brokers in 40 markets managing classification, duty optimization, bonded warehousing and compliance — so freight never waits at the border.',
    features: ['HS classification', 'Duty optimization', 'Bonded entries'],
    image:
      'https://images.pexels.com/photos/24702866/pexels-photo-24702866.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: FileCheck2,
  },
  {
    id: 'warehouse',
    index: '',
    name: 'Warehousing & 3PL',
    tagline: 'Inventory in motion',
    description:
      ' bonded and ambient distribution centers with pick-pack-ship, kitting, returns and real-time stock visibility wired into your storefront and ERPs.',
    features: ['Pick & pack', 'Bonded storage', 'Live WMS sync'],
    image:
      'https://images.pexels.com/photos/1267327/pexels-photo-1267327.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Warehouse,
  },
  {
    id: 'project',
    index: '',
    name: 'Project Cargo',
    tagline: 'Engineered for the extreme',
    description:
      'Heavy-lift, out-of-gauge and breakbulk moves engineered with route surveys, structural analysis and on-site rigging teams for energy, mining and infrastructure.',
    features: ['Heavy-lift', 'Route surveys', 'On-site rigging'],
    image:
      'https://images.pexels.com/photos/33587048/pexels-photo-33587048.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: PackageSearch,
  },
  {
    id: 'land',
    index: '',
    name: 'Domestic Transport',
    tagline: 'First to last mile',
    description:
      'Dedicated and shared trucking, intermodal rail and final-mile distribution with GPS-tracked power units and driver teams covering 48 states and the EU.',
    features: ['Dedicated fleets', 'Intermodal rail', 'Final-mile'],
    image:
      'https://images.pexels.com/photos/28264496/pexels-photo-28264496.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Truck,
  },
];

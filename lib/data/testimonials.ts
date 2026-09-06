export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'El-DoradoShipping rebuilt our trans-Pacific lane in six weeks. Lead times dropped 18% and we finally have a control tower that tells us where every container is, not where it was.',
    name: 'Elena Rasmussen',
    role: 'VP Global Supply Chain',
    company: 'Northwind Appliances',
    image:
      'https://images.pexels.com/photos/31869537/pexels-photo-31869537.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 't2',
    quote:
      'They moved a 62-tonne turbine across three borders with a route survey so thorough it felt over-engineered. It arrived a day early. That is the sentence I never thought I would write.',
    name: 'Marcus Bienias',
    role: 'Director of Project Logistics',
    company: 'Helix Power Systems',
    image:
      'https://images.pexels.com/photos/13111213/pexels-photo-13111213.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 't3',
    quote:
      'The visibility platform is the real product. My team stopped chasing freight and started optimizing it. The dashboards replaced four spreadsheets and a war room.',
    name: 'Priya Nair',
    role: 'Head of Operations',
    company: 'Lumen Beauty Group',
    image:
      'https://images.pexels.com/photos/37148308/pexels-photo-37148308.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export type HubLocation = {
  city: string;
  country: string;
  address: string;
  phone: string;
};

export const hubLocations: HubLocation[] = [
  { city: 'Tirupur', country: 'INDIA', address: 'Plot No 7/52, Angeripalayam 1st floor Tirupur 641 603, Tamilnadu, India.', phone: '+919677820304' },
  { city: 'Rostov-on-don', country: 'RUSSIA', address: 'No 158, Bldg. 13, Yuri Dubinina St. Rostov-on-Don, Rostov Oblast 344010 Russia.', phone: '+7(909)422-56-62' },
  
];

export const navLinks = [
  { label: 'project logistics', href: '#about' },
  { label: 'regular logistics', href: '#services' },
  { label: 'russia trade', href: '#industries' },
  
  { label: 'Insights', href: '#insights' },
  { label: 'Contact', href: '#contact' },
] as const;

export const socialLinks = [
  { label: 'LinkedIn', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'X', href: '#' },
  { label: 'YouTube', href: '#' },
] as const;

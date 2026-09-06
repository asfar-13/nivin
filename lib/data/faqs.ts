export type FAQ = {
  q: string;
  a: string;
};

export const faqs: FAQ[] = [
  {
    q: 'How quickly can Meridian onboard a new shipping lane?',
    a: 'Most lanes are live within 10 business days. We start with a lane diagnostic, then configure capacity, compliance and visibility in parallel rather than in sequence. For project cargo or regulated goods, we run a route survey first — typically two to four weeks depending on permits.',
  },
  {
    q: 'Do I get a single point of contact across air, ocean and land?',
    a: 'Yes. Every account is assigned a dedicated control-tower coordinator who owns your shipment from origin to delivered. Behind them is a 24/7 operations team, but you always have one named person accountable for the outcome.',
  },
  {
    q: 'What visibility tools come with the service?',
    a: 'Every shipment is tracked in the El-DoradoShipping Control platform with milestone updates, predictive ETAs and exception alerts. You get a live dashboard, API access for your ERP, and optional SMS or Slack notifications for critical milestones.',
  },
  {
    q: 'Can El-DoradoShipping handle hazardous, reefer or oversized cargo?',
    a: 'Yes. We are licensed for hazmat in 40 markets, operate reefer containers with continuous temperature monitoring, and run a dedicated project-cargo desk for heavy-lift and out-of-gauge moves with full route surveys.',
  },
  {
    q: 'How is pricing structured and is it transparent?',
    a: 'All-in rate quotes with itemized accessorials — no surprise destination charges. For recurring lanes we offer contracted index-linked rates; for spot we quote within four business hours. You always see the margin split.',
  },
  {
    q: 'What happens when a shipment is delayed?',
    a: 'The control tower is alerted the moment a milestone slips against its predictive ETA. We proactively notify you with the cause, a recovery plan and a revised ETA — not just a status update. The average exception is resolved in under 90 minutes.',
  },
];

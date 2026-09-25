import type { EmailItem, StatCard } from './types';

export const MOCK_STATS: StatCard[] = [
  { label: 'Total Scheduled', value: '12,847', trend: 14.2, trendUp: true },
  { label: 'Sent Today', value: '3,219', trend: 8.7, trendUp: true },
  { label: 'Active Senders', value: '24', trend: 3.1, trendUp: true },
  { label: 'Rate-Limit Hits', value: '47', trend: 12.4, trendUp: false },
];

const subjects = [
  'Following up on our conversation',
  'Quick question about your Q4 roadmap',
  'Thought you might find this useful',
  'Intro: scaling outbound without the spam',
  'Re: your interest in MailFlow',
  'A 2-minute idea for your growth team',
  'Checking in — any update on the proposal?',
  'How we cut bounce rates by 63%',
];

const names = [
  ['Alex Rivera', 'alex@northwind.io'],
  ['Priya Sharma', 'priya@brightlabs.co'],
  ['Marcus Chen', 'm.chen@vertexai.dev'],
  ['Sofia Almeida', 'sofia@quantumreach.com'],
  ['Jordan Park', 'jordan@heliosventures.io'],
  ['Elena Volkov', 'elena@orbitalhq.co'],
  ['Tobias Klein', 'tobias@meridianlabs.de'],
  ['Naomi Carter', 'naomi@fluxfoundry.com'],
  ['Daniel Osei', 'daniel@apexloop.io'],
  ['Mira Patel', 'mira@cadenceworks.com'],
];

const senders = ['outreach@acme.io', 'team@northwind.io', 'hello@brightlabs.co', 'sales@vertexai.dev'];
const statuses: EmailItem['status'][] = ['queued', 'delayed', 'sending', 'sent', 'failed', 'rescheduled', 'sent', 'sent', 'queued', 'delayed'];

function pad(n: number) { return n < 10 ? `0${n}` : `${n}`; }

export const MOCK_EMAILS: EmailItem[] = Array.from({ length: 14 }, (_, i) => {
  const [name, email] = names[i % names.length];
  const status = statuses[i % statuses.length];
  const day = 25 + (i % 3);
  const hour = 9 + (i % 8);
  return {
    id: `email_${i + 1}`,
    recipient: email,
    recipientName: name,
    subject: subjects[i % subjects.length],
    preview: 'Thanks for taking the time to chat earlier — I put together a quick summary of how we could…',
    status,
    scheduledFor: `2026-09-${pad(day)}T${pad(hour)}:${pad((i * 7) % 60)}:00Z`,
    sender: senders[i % senders.length],
    attempts: status === 'failed' ? 3 : status === 'sent' ? 1 : 0,
  };
});

import type { Contact } from '../../types';

export const MOCK_CONTACTS: Contact[] = [
  {
    id: 'contact-1',
    name: 'Maria Schmidt',
    phone: '+49 170 1234567',
    email: 'maria.schmidt@gmail.com',
    tags: ['Bewerbung', 'Onboarding'],
    notes: 'Bewerbung als Pflegefachkraft, Standort München',
    externalMeta: { whatsappProfileName: 'Maria S.' },
  },
  {
    id: 'contact-2',
    name: 'Dr. Klaus Richter',
    phone: '+49 171 9876543',
    email: 'k.richter@klinik-nord.de',
    company: 'Klinik Nord GmbH',
    tags: ['Interessent', 'Vertrag'],
    notes: 'Interessiert an Personalvermittlung, Q2 Start gewünscht',
  },
  {
    id: 'contact-3',
    name: 'Fatima Yilmaz',
    phone: '+49 176 5551234',
    tags: ['Bewerbung'],
    notes: 'Bewerbung Altenpflege, spricht Türkisch und Deutsch',
    externalMeta: { whatsappProfileName: 'Fatima' },
  },
  {
    id: 'contact-4',
    name: 'Stefan Bauer',
    phone: '+49 172 3334444',
    email: 's.bauer@example.de',
    tags: ['Mitarbeiter', 'Rückruf'],
    notes: 'Aktiver Mitarbeiter, Einsatz bei Klinik Süd',
  },
  {
    id: 'contact-5',
    name: 'Elena Petrova',
    phone: '+49 173 7778888',
    tags: ['Bewerbung', 'Dringend'],
    externalMeta: { whatsappProfileName: 'Elena P.' },
  },
  {
    id: 'contact-6',
    name: 'Jürgen Meier',
    email: 'j.meier@altenpflege-west.de',
    company: 'Altenpflege West',
    tags: ['Interessent'],
    notes: 'Anfrage Rahmenvertrag Zeitarbeit',
  },
  {
    id: 'contact-7',
    name: 'Systembenachrichtigung',
    tags: [],
  },
];

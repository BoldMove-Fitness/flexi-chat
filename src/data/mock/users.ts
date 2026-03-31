import type { User } from '../../types';

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Frank',
    email: 'frank@flexiholding.de',
    role: 'admin',
    isOnline: true,
  },
  {
    id: 'user-2',
    name: 'Sigrid',
    email: 'sigrid@flexiholding.de',
    role: 'teamlead',
    isOnline: true,
  },
  {
    id: 'user-3',
    name: 'Patrick',
    email: 'patrick@flexiholding.de',
    role: 'agent',
    isOnline: true,
  },
  {
    id: 'user-4',
    name: 'Maxim',
    email: 'maxim@flexiholding.de',
    role: 'agent',
    isOnline: true,
  },
  {
    id: 'user-5',
    name: 'Lukas',
    email: 'lukas@flexiholding.de',
    role: 'agent',
    isOnline: false,
  },
  {
    id: 'user-6',
    name: 'Natali',
    email: 'natali@flexiholding.de',
    role: 'agent',
    isOnline: true,
  },
];

/** The currently "logged in" user for mock purposes */
export const CURRENT_USER = MOCK_USERS[0]!;

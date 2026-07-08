import type { AuthCredentials, User } from '@shared';

const MOCK_USERS = [
  { email: 'admin@test.com', password: 'admin123', name: 'Admin User' },
  { email: 'user@test.com', password: 'user123', name: 'Regular User' },
  { email: 'editor@test.com', password: 'editor123', name: 'Editor User' },
];

export const loginRequest = async (credentials: AuthCredentials): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const userIndex = MOCK_USERS.findIndex(
    (u) => u.email === credentials.email && u.password === credentials.password,
  );

  if (userIndex === -1) {
    throw new Error('Неверный email или пароль');
  }

  const mockUser = MOCK_USERS[userIndex];
  return {
    id: userIndex + 1,
    email: mockUser.email,
    name: mockUser.name,
  };
};

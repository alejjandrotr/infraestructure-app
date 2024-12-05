import { faker } from "@faker-js/faker";
import { User } from "../Users/user";

function simpleHash(password: string) {
  // Uncomment and use a proper hashing function if needed
  // return createHash('sha256').update(password).digest('hex');
  return password; // For now, just return the plain password
}

async function generateUsers(numUsers: number) {
  const users = [];
  const password = "123456";

  for (let i = 0; i < numUsers; i++) {
    const hashedPassword = simpleHash(password); // Use simple hash instead of bcrypt

    const user = mockUser(i, hashedPassword);

    users.push(user);
  }

  return users;
}

export const fakeUsersGenerator = async () => {
  const users = await generateUsers(50);
  return users;
};

export function mockUser(i: number, hashedPassword: string): User {
  return {
    id: i + 1,
    usuario: faker.internet.username(),
    contraseña: hashedPassword,
    nombre_completo: faker.person.fullName(),
    telefono: Math.random() > 0.5 ? faker.phone.number() : undefined,
    direccion: {
      pais: faker.location.country(),
      estado: faker.location.state(),
      ciudad: faker.location.city(),
    },
  };
}

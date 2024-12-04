import { faker } from "@faker-js/faker";
//import { createHash } from "crypto";

function simpleHash(password: string) {
  return password//createHash('sha256').update(password).digest('hex');
}

async function generateUsers(numUsers: number) {
  const users = [];
  const password = "123456";

  for (let i = 0; i < numUsers; i++) {
    const hashedPassword = simpleHash(password); // Use simple hash instead of bcrypt

    const user = {
      id: i + 1,
      usuario: faker.internet.userName(),
      contraseña: hashedPassword,
      nombre_completo: faker.name.fullName(),
      telefono: Math.random() > 0.5 ? faker.phone.number() : null,
      direccion: {
        pais: faker.address.country(),
        estado: faker.address.state(),
        ciudad: faker.address.city(),
      },
    };

    users.push(user);
  }

  return users;
}

export const fakeUsersGenerator = async () => {
  const users = await generateUsers(50);
  return users;
};
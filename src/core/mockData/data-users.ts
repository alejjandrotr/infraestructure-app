import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

async function generateUsers(numUsers: number) {
  const users = [];
  const password = "123456";

  for (let i = 0; i < numUsers; i++) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      usuario: faker.internet.userName(),
      contraseña: hashedPassword,
      nombre_completo: faker.name.fullName(), // Updated to use fullName method
      telefono: Math.random() > 0.5 ? faker.phone.number() : null, // Updated to use number method
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
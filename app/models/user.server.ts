import type { User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { db } from "~/utils/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return db.user.findUnique({ where: { id } });
}

export async function getUserByUsername(username: User["username"]) {
  return db.user.findUnique({ where: { username } });
}

export async function createUser(username: User["username"], password: string) {
  const passwordHash = await bcrypt.hash(password, 10);

  return db.user.create({
    data: {
      username,
      passwordHash,
    },
  });
}

export async function deleteUserByUsernamel(username: User["username"]) {
  return db.user.delete({ where: { username } });
}

export async function verifyLogin(
  username: User["username"],
  passwordHash: string
) {
  const userWithPassword = await db.user.findUnique({
    where: { username },
  });

  if (!userWithPassword || !userWithPassword.passwordHash) {
    return null;
  }

  const isValid = await bcrypt.compare(
    passwordHash,
    userWithPassword.passwordHash
  );

  if (!isValid) {
    return null;
  }

  const { passwordHash: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

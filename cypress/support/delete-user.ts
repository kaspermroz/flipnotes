// Use this to delete a user by their email
// Simply call this with:
// npx ts-node --require tsconfig-paths/register ./cypress/support/delete-user.ts username@example.com
// and that user will get deleted

import { installGlobals } from "@remix-run/node/globals";
import { db } from "~/utils/db.server";

installGlobals();

async function deleteUser(username: string) {
  if (!username) {
    throw new Error("email required for login");
  }
  if (!username.endsWith("@example.com")) {
    throw new Error("All test emails must end in @example.com");
  }

  await db.user.delete({ where: { username } });
}

deleteUser(process.argv[2]);

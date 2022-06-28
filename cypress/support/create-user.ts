// Use this to create a new user and login with that user
// Simply call this with:
// npx ts-node --require tsconfig-paths/register ./cypress/support/create-user.ts username@example.com
// and it will log out the cookie value you can use to interact with the server
// as that new user.

import { parse } from "cookie";
import { installGlobals } from "@remix-run/node/globals";
import { createUserSession } from "~/utils/session.server";
import { createUser } from "~/models/user.server";

installGlobals();

async function createAndLogin(username: string) {
  if (!username) {
    throw new Error("email required for login");
  }
  if (!username.endsWith("@example.com")) {
    throw new Error("All test emails must end in @example.com");
  }

  const user = await createUser(username, "myreallystrongpassword");

  const response = await createUserSession(user.id, "/");

  const cookieValue = response.headers.get("Set-Cookie");
  if (!cookieValue) {
    throw new Error("Cookie missing from createUserSession response");
  }
  const parsedCookie = parse(cookieValue);
  // we log it like this so our cypress command can parse it out and set it as
  // the cookie value.
  console.log(
    `
<cookie>
  ${parsedCookie.__session}
</cookie>
  `.trim()
  );
}

createAndLogin(process.argv[2]);

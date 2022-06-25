import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Button, Text } from "@chakra-ui/react";

import { Header } from "~/components/header";
import { requireUserId } from "~/utils/session.server";
import { db } from "~/utils/db.server";

type LoaderData = {
  username?: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const id = await requireUserId(request);
  const user = await db.user.findUnique({ where: { id } });
  if (!user) {
    return json(null, { status: 500 });
  }

  const { username } = user;

  return json({ username });
};

type ActionData = {
  formError?: string;
  fieldErrors?: {
    name: string | undefined;
  };
  fields?: {
    name: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  console.log(request);
  const userId = await requireUserId(request);
  const form = await request.formData();
  const name = await form.get("name");

  if (typeof name !== "string") {
    return badRequest({ formError: "Form submitted incorrectly." });
  }
  const fields = { name };
  const group = await db.group.create({ data: { userId, name } });
  console.log(group);
  if (!group) {
    return badRequest({ fields, formError: "Failed to create user" });
  }

  return redirect(`/app/${group.id}`);
};

export default function App() {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <Header>
        {data?.username ? <Text mr={4}>Hi, {data.username}!</Text> : null}
        <form action="/logout" method="post">
          <Button type="submit" colorScheme="teal">
            Log out
          </Button>
        </form>
      </Header>
      <Outlet />
    </div>
  );
}

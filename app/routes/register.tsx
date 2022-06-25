import { Center, Box, Text, Button, Input } from "@chakra-ui/react";
import type {
  ActionFunction,
  MetaFunction,
  LoaderFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { Header } from "~/components/header";
import { createUserSession, getUserId, register } from "~/utils/session.server";
import { db } from "~/utils/db.server";

type ActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
  };
  fields?: {
    username: string;
    password: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const username = await form.get("username");
  const password = await form.get("password");

  if (typeof username !== "string" || typeof password !== "string") {
    return badRequest({ formError: "Form submitted incorrectly." });
  }

  const fields = { username, password };

  const userExists = await db.user.findFirst({
    where: { username },
  });
  if (userExists) {
    return badRequest({
      fields,
      formError: `User with username ${username} already exists`,
    });
  }

  const user = await register({ username, password });
  if (!user) {
    return badRequest({
      fields,
      formError: `Something went wrong trying to create a new user.`,
    });
  }
  return createUserSession(user.id, "/app");
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) {
    return redirect("/app");
  }

  return null;
};

export const meta: MetaFunction = () => {
  return {
    title: "Register | Flipnotes",
  };
};

export default function Login() {
  return (
    <div>
      <Header />
      <Box mt="120px">
        <Center>
          <Box
            w="500px"
            p="50px"
            border={{ base: "none", lg: "1px solid #CBD5E0" }}
            borderRadius={10}
          >
            <Text fontSize="2xl" mb={8}>
              <b>Sign up</b>
            </Text>
            <form method="post">
              <Input
                variant="outline"
                bg="gray.100"
                borderColor="#CBD5E0"
                mb={6}
                placeholder="Username"
                name="username"
              />
              <Input
                variant="outline"
                bg="gray.100"
                borderColor="#CBD5E0"
                mb={8}
                placeholder="Password"
                name="password"
                type="password"
              />
              <Button type="submit" w="full" colorScheme="teal" mb={4}>
                Sign up
              </Button>
            </form>
            <Center>
              <Link to="/login">
                <Button variant="link" color="gray.800">
                  I already have an account
                </Button>
              </Link>
            </Center>
          </Box>
        </Center>
      </Box>
    </div>
  );
}

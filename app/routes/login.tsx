import { Center, Box, Text, Button, Input } from "@chakra-ui/react";
import type {
  ActionFunction,
  MetaFunction,
  LoaderFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useSearchParams } from "@remix-run/react";

import { Header } from "~/components/header";
import { login, createUserSession, getUserId } from "~/utils/session.server";

function validateUrl(url: any) {
  let urls = ["/app", "/"];
  if (urls.includes(url)) {
    return url;
  }
  return "/app";
}

type ActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
  };
  fields?: {
    redirectTo: string;
    username: string;
    password: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const username = await form.get("username");
  const password = await form.get("password");
  const redirectTo = validateUrl(await form.get("redirectTo"));

  if (typeof username !== "string" || typeof password !== "string") {
    return badRequest({ formError: "Form submitted incorrectly." });
  }

  const fields = { username, password, redirectTo };

  const user = await login({ username, password });
  if (!user) {
    return badRequest({
      fields,
      formError: `Username/Password combination is incorrect`,
    });
  }

  return createUserSession(user.id, redirectTo);
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
    title: "Login | Flipnotes",
  };
};

export default function Login() {
  const [searchParams] = useSearchParams();

  return (
    <div>
      <Header />
      <Box mt="120px">
        <Center>
          <Box w="500px" p="50px" border="1px solid #CBD5E0" borderRadius={10}>
            <Text fontSize="2xl" mb={8}>
              <b>Log in</b>
            </Text>
            <form method="post">
              <input
                type="hidden"
                name="redirectTo"
                value={searchParams.get("redirectTo") ?? undefined}
              />
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
                Log in
              </Button>
            </form>
            <Center>
              <Link to="/register">
                <Button variant="link" color="gray.800">
                  Don't have an account?
                </Button>
              </Link>
            </Center>
          </Box>
        </Center>
      </Box>
    </div>
  );
}

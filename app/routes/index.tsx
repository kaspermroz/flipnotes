import { Text, Button, Flex, Box, Center, Show } from "@chakra-ui/react";
import { NavLink } from "@remix-run/react";
import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { Header } from "~/components/header";
import { getUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) {
    return redirect("/app");
  }

  return null;
};

export const meta: MetaFunction = () => {
  return {
    title: "Get to know! | Flipnotes",
  };
};

export default function Index() {
  return (
    <div>
      <Header>
        <NavLink to="/login">
          <Button variant="link" color="gray.800" mr={4}>
            Log in
          </Button>
        </NavLink>
        <NavLink to="/register">
          <Button colorScheme="teal">Sign up</Button>
        </NavLink>
      </Header>
      <Flex
        mt={{ base: 0, lg: 40 }}
        align={{ base: "center", lg: "stretch" }}
        w="full"
        pl={{ base: 8, lg: 120 }}
        pr={{ base: 8, lg: 0 }}
        direction={{ base: "column", lg: "row" }}
      >
        <Box w="full">
          <Text fontSize={{ base: "4xl", lg: "6xl" }}>
            <b>All you know in one place.</b>
          </Text>
          <Text fontSize={{ base: "4xl", lg: "6xl" }}>
            <b>Build your own knowledge base.</b>
          </Text>
          <Text fontSize={{ base: "4xl", lg: "6xl" }}>
            <b>Flip it untill you remember!</b>
          </Text>
        </Box>
        <Box w="full" position="relative">
          <Box
            position="absolute"
            left={{ base: 0, lg: "20px" }}
            top={0}
            bg="#FFFFF0"
            w={{ base: 320, lg: 500 }}
            h={{ base: 320, lg: 500 }}
            border="1px solid #F6E05E"
            borderRadius={25}
            zIndex={2}
          >
            <Center h="full">
              <Text fontSize="4xl">
                <b>React.useEffect()</b>
              </Text>
            </Center>
          </Box>
          <Box
            position="absolute"
            left={{ base: "15", lg: "40px" }}
            top="20px"
            bg="#F0FFF4"
            w={{ base: 320, lg: 500 }}
            h={{ base: 320, lg: 500 }}
            border="1px solid #68D391"
            borderRadius={25}
            zIndex={1}
          />
          <Box
            position="absolute"
            left={{ base: "30px", lg: "60px" }}
            top="40px"
            bg="#E6FFFA"
            w={{ base: 320, lg: 500 }}
            h={{ base: 320, lg: 500 }}
            border="1px solid #4FD1C5"
            borderRadius={25}
            zIndex={0}
          />
        </Box>
        <Show below="lg">
          <Flex
            direction="column"
            w="full"
            position="absolute"
            bottom={4}
            pl={12}
            pr={12}
          >
            <NavLink to="/register">
              <Button colorScheme="teal" w="full" mb={2}>
                Sign up
              </Button>
            </NavLink>
            <NavLink to="/login">
              <Button variant="outline" color="gray.800" w={"full"}>
                Log in
              </Button>
            </NavLink>
          </Flex>
        </Show>
      </Flex>
    </div>
  );
}

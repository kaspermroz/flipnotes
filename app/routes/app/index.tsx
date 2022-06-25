import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import type { Group } from "@prisma/client";
import { Flex, Box, Center, Input, Button, Show } from "@chakra-ui/react";

import { requireUserId } from "~/utils/session.server";
import { db } from "~/utils/db.server";

type LoaderData = {
  groups: Pick<Group, "id" | "name">[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const groups = await db.group.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
    },
  });

  return json({ groups });
};

export default function AppIndex() {
  const data = useLoaderData<LoaderData>();

  return (
    <Flex
      p={12}
      direction={{ base: "column", lg: "row" }}
      align={{ base: "center", lg: "start" }}
      overflowX="hidden"
      overflowY="auto"
    >
      {data?.groups.map(({ id, name }) => (
        <Link key={id} to={`/app/${id}`}>
          <Box
            w={240}
            h={240}
            borderRadius={25}
            mr={{ base: 0, lg: 10 }}
            mb={{ base: 4, lg: 0 }}
            bg="#FFFFF0"
            border="1px solid #F6E05E"
          >
            <Center h="full">{name}</Center>
          </Box>
        </Link>
      ))}
      <form method="post">
        <Box w={240} h={240} borderRadius={25} border="1px dashed grey" p={2}>
          <Center h="full">
            <Box>
              <Input
                variant="outline"
                bg="gray.100"
                borderColor="#CBD5E0"
                mb={6}
                name="name"
                placeholder="Group name"
              />
              <Button variant="link" color="grey.800" type="submit" w="full">
                Create new
              </Button>
            </Box>
          </Center>
        </Box>
      </form>
      <Show below="lg">
        <Box w={"full"} pl={12} pr={12} mt={4}>
          <form action="/logout" method="post">
            <Button type="submit" colorScheme="teal" w={"full"}>
              Log out
            </Button>
          </form>
        </Box>
      </Show>
    </Flex>
  );
}

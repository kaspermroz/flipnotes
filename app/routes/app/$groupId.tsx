import type { LoaderFunction, LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Outlet, Link } from "@remix-run/react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import type { Flipnote } from "@prisma/client";

import { db } from "~/utils/db.server";
import flipnoteStylesHref from "~/components/flipnote/flipnote.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: flipnoteStylesHref,
    },
  ];
};

type LoaderData = {
  name?: string;
  groupId?: string;
  flipnotes?: Pick<Flipnote, "id" | "title">[];
};

export const loader: LoaderFunction = async ({ params }) => {
  const { groupId } = params;

  const group = await db.group.findUnique({ where: { id: groupId } });
  if (!group) {
    return json(null, { status: 404 });
  }
  const { name } = group;

  const flipnotes = await db.flipnote.findMany({
    where: { groupId },
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return json({ name, flipnotes, groupId });
};

export default function GroupId() {
  const data = useLoaderData<LoaderData>();

  return (
    <Flex
      p={6}
      pl={12}
      pr={12}
      direction={{ base: "column-reverse", lg: "row" }}
    >
      <Box w={320}>
        <Flex
          direction="column"
          align={{ base: "center", lg: "start" }}
          mt={{ base: 4, lg: 0 }}
        >
          <Text fontSize="xl" mb={4}>
            <b>{data?.name}</b>
          </Text>
          <Link to="./new">
            <Button variant="link" color="grey.800" mb={4}>
              Add flipnote
            </Button>
          </Link>
          <ul style={{ paddingLeft: 24 }}>
            {data?.flipnotes?.map(({ id, title }) => (
              <li key={id}>
                <Link to={`./${id}`}>
                  <Button
                    variant="link"
                    color="gray.800"
                    w={{ base: "full", lg: "auto" }}
                  >
                    {title}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
          <form action={`/app/${data?.groupId}/delete`} method="post">
            <Button colorScheme="red" mt={4} type="submit" size="xs">
              Delete group
            </Button>
          </form>
        </Flex>
      </Box>
      <Box w="full">
        <Outlet />
      </Box>
    </Flex>
  );
}

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Outlet, Link } from "@remix-run/react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { Flipnote } from "@prisma/client";

import { db } from "~/utils/db.server";

type LoaderData = {
  name?: string;
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
    take: 5,
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return json({ name, flipnotes });
};

export default function GroupId() {
  const data = useLoaderData<LoaderData>();

  return (
    <Flex p={6} pl={12} pr={12}>
      <Box w={320}>
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
                <Button variant="link" color="gray.800">
                  {title}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Flex>
  );
}

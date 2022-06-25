import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Text, Center, Box } from "@chakra-ui/react";
import type { Flipnote } from "@prisma/client";

import { Flipnote as FlipnoteComponent } from "~/components/flipnote";
import { db } from "~/utils/db.server";

type LoaderData = {
  flipnote?: Flipnote;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { groupId } = params;
  const count = await db.flipnote.count({ where: { groupId } });
  const randomRowNumber = Math.floor(Math.random() * count);
  const [flipnote] = await db.flipnote.findMany({
    where: { groupId },
    take: 1,
    skip: randomRowNumber,
  });

  return json({ flipnote });
};

export default function GroupIdIndex() {
  const data = useLoaderData<LoaderData>();
  const title = data?.flipnote?.title ?? "";
  const content = data?.flipnote?.content ?? "";

  return (
    <Box w="full">
      {title && content ? (
        <Center pt={24}>
          <Box>
            <FlipnoteComponent title={title} content={content} />
            <Text fontSize="2xl" mt={28}>
              👈 This is a random flipnote.
            </Text>
            <Text fontSize="2xl">
              👈 Use menu on the left to manage your flipnotes in this group!
            </Text>
            <Link to=".">
              <Text fontSize="2xl">
                👈 Click me to get another random flipnote 😵‍💫
              </Text>
            </Link>
          </Box>
        </Center>
      ) : (
        <Box>
          <Text fontSize="2xl">👈 Nothing in here 💨</Text>
          <Text fontSize="2xl">
            👈 Use menu on the left to add your first flipnote!
          </Text>
        </Box>
      )}
    </Box>
  );
}

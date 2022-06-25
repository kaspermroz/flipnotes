import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Text, Center, Box, Show, Button } from "@chakra-ui/react";
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
        <Center pt={{ base: 8, lg: 24 }}>
          <Box>
            <FlipnoteComponent title={title} content={content} />
            <Show above="lg">
              <Link to=".">
                <Button variant="link" fontSize="2xl" mt={28} color="gray.800">
                  Random flipnote 😵‍💫
                </Button>
              </Link>
              <Text fontSize="2xl">👈 This is a random flipnote.</Text>
              <Text fontSize="2xl">
                👈 Use menu on the left to manage your flipnotes in this group!
              </Text>
            </Show>
            <Show below="lg">
              <Center>
                <Link to=".">
                  <Button variant="link" fontSize="lg" mt={8} color="gray.800">
                    Random flipnote 😵‍💫
                  </Button>
                </Link>
              </Center>
              <Text fontSize="lg">👇 This is a random flipnote.</Text>
              <Text fontSize="lg">
                👇 Use menu on the bottom to manage your flipnotes in this
                group!
              </Text>
            </Show>
          </Box>
        </Center>
      ) : (
        <Box>
          <Show above="lg">
            <Text fontSize="2xl">👈 Nothing in here 💨</Text>
            <Text fontSize="2xl">
              👈 Use menu on the left to add your first flipnote!
            </Text>
          </Show>
          <Show below="lg">
            <Text fontSize="lg">👇 Nothing in here 💨</Text>
            <Text fontSize="lg">
              👇 Use menu on the bottom to add your first flipnote!
            </Text>
          </Show>
        </Box>
      )}
    </Box>
  );
}

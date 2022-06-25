import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Center, Box, Button } from "@chakra-ui/react";
import type { Flipnote } from "@prisma/client";

import { Flipnote as FlipnoteComponent } from "~/components/flipnote";
import { db } from "~/utils/db.server";

type LoaderData = {
  flipnote?: Flipnote;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { flipnoteId } = params;
  const id = Number(flipnoteId);
  const flipnote = await db.flipnote.findUnique({ where: { id } });
  if (!flipnote) {
    return json(null, { status: 404 });
  }

  return json({ flipnote });
};

export default function GroupIdIndex() {
  const data = useLoaderData<LoaderData>();
  const title = data?.flipnote?.title ?? "";
  const content = data?.flipnote?.content ?? "";
  const id = data?.flipnote?.id;

  return (
    <Center w="full" pt={{ base: 8, lg: 24 }}>
      {title && content ? (
        <Box>
          <Center>
            <FlipnoteComponent title={title} content={content} />
          </Center>
          <Box>
            <Link to="..">
              <Button
                variant="link"
                fontSize={{ base: "lg", lg: "2xl" }}
                mt={{ base: 8, lg: 28 }}
                color="gray.800"
              >
                Random flipnote 😵‍💫
              </Button>
            </Link>
            <Center>
              <form action={`${id}/delete`} method="post">
                <Button colorScheme="red" mt={4} type="submit">
                  Delete flipnote
                </Button>
              </form>
            </Center>
          </Box>
        </Box>
      ) : null}
    </Center>
  );
}

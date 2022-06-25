import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
    <Center w="full" pt={24}>
      {title && content ? (
        <Box>
          <FlipnoteComponent title={title} content={content} />
          <Center>
            <form action={`${id}/delete`} method="post">
              <Button colorScheme="red" mt={28} type="submit">
                Delete flipnote
              </Button>
            </form>
          </Center>
        </Box>
      ) : null}
    </Center>
  );
}

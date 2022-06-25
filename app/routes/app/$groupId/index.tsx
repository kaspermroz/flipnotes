import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Text, Center } from "@chakra-ui/react";
import type { Flipnote } from "@prisma/client";

import { Flipnote as FlipnoteComponent } from '~/components/flipnote'
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
    <Center w="full" pt={24}>
      {title && content ? (
        <FlipnoteComponent title={title} content={content} />
      ) : null}
    </Center>
  );
}

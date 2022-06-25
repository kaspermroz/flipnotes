import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Text } from "@chakra-ui/react";
import type { Flipnote } from "@prisma/client";

import { db } from "~/utils/db.server";

type LoaderData = {
  flipnote?: Flipnote;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { groupId } = params;
  const count = await db.flipnote.count({ where: { groupId } });
  const randomRowNumber = Math.floor(Math.random() * count);
  const [flipnote] = await db.flipnote.findMany({
    take: 1,
    skip: randomRowNumber,
  });

  return json({ flipnote });
};

export default function GroupIdIndex() {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <Text>{data?.flipnote?.title}</Text>
    </div>
  );
}

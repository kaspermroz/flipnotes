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
  return (
    <div>
      <Text>{data?.flipnote?.title}</Text>
    </div>
  );
}

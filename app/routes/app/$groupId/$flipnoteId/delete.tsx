import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";

import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ params }) => {
  const flipnoteId = params.flipnoteId;
  const groupId = params.groupId ?? "";
  if (!flipnoteId) {
    return redirect(`/app/${groupId}`);
  }
  const id = Number(flipnoteId);
  const dropped = await db.flipnote.delete({ where: { id } });
  console.log(dropped);
  return redirect(`/app/${groupId}`);
};

export const loader: LoaderFunction = async ({ params }) => {
  const groupId = params.groupId ?? "";
  return redirect(`/app/${groupId}`);
};

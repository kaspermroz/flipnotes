import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";

import { db } from "~/utils/db.server";

export const action: ActionFunction = async ({ params }) => {
  const id = params.groupId;
  if (!id) {
    return redirect("/app");
  }
  const dropped = await db.group.delete({ where: { id } });
  console.log(dropped);
  return redirect("/app");
};

export const loader: LoaderFunction = async ({ params }) => {
  return redirect("/app");
};

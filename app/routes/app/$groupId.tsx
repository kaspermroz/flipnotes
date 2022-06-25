import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData, Outlet } from '@remix-run/react';
import { Text } from '@chakra-ui/react';
import { Flipnote } from '@prisma/client';

import { db } from '~/utils/db.server'

type LoaderData = {
  name?: string;
}

export const loader: LoaderFunction = async ({ params }) => {
  const { groupId } = params;

  const group = await db.group.findUnique({ where: { id: groupId } });
  if (!group) {
    return json(null, { status: 404 })
  }
  const { name } = group;
  return json({ name });
}

export default function GroupId() {
  const data = useLoaderData<LoaderData>();
  return (<div>
    {data?.name}
    <Outlet />
  </div>)
}
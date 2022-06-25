import { LoaderFunction, ActionFunction, json, redirect } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { Group } from '@prisma/client';
import { Flex, Box, Center, Input, Button } from '@chakra-ui/react';

import { requireUserId } from '~/utils/session.server';
import { db } from '~/utils/db.server';

type LoaderData = {
  groups: Pick<Group, 'id'|'name'>[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const groups = await db.group.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
    }
  })

  return json({ groups })
}

export default function AppIndex() {
  const data = useLoaderData<LoaderData>()

  return (
    <Flex p={12}>
      {data?.groups.map(({ id, name }) => (
        <Link key={id} to={`/app/${id}`}>
          <Box w={240} h={240} borderRadius={25} border="1px solid grey" mr={10}>
            <Center h="full">{name}</Center>
          </Box>
        </Link>
      ))}
      <form method="post">
        <Box w={240} h={240} borderRadius={25} border="1px dashed grey" p={2}>
          <Center h="full">
            <Box>
              <Input
                variant="outline"
                bg="gray.100"
                borderColor="#CBD5E0"
                mb={6}
                name="name"
                placeholder="Group name"
              />
              <Button variant="link" color="grey.800" type="submit" w="full">Create new</Button>
            </Box>
          </Center>
        </Box>
      </form>
    </Flex>
  )
}
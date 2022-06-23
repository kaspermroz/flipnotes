import { LoaderFunction, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Button } from '@chakra-ui/react'

import { Header } from '~/components/header'
import { requireUserId } from '~/utils/session.server'

type LoaderData = {
  userId: string
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)

  return json({ userId })
}

export default function App() {
  const data = useLoaderData<LoaderData>()

  return (
    <div>
      <Header>
        <form action="/logout" method="post">
          <Button type="submit" colorScheme="teal">Log out</Button>
        </form>
      </Header>
      {data.userId}
    </div>
  )
}
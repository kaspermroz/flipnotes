import { LoaderFunction, json } from '@remix-run/node'
import { useLoaderData, Outlet } from '@remix-run/react'
import { Button } from '@chakra-ui/react'

import { Header } from '~/components/header'
import { requireUserId } from '~/utils/session.server'

type LoaderData = {
  userId: string
}

export const loader: LoaderFunction = async ({ request }) => {
  const _ = await requireUserId(request)

  return null
}

export default function App() {
  return (
    <div>
      <Header>
        <form action="/logout" method="post">
          <Button type="submit" colorScheme="teal">Log out</Button>
        </form>
      </Header>
      <Outlet />
    </div>
  )
}
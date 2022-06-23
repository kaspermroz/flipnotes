import { LoaderFunction, redirect } from '@remix-run/node'

import { getUserId } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request)
  if (userId) {
    return redirect('/app')
  }

  return null
}

export default function Register() {
  return (
    <div>register</div>
  )
}
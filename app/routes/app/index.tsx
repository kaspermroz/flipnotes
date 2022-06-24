import { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async () => {
  return null
}

export default function AppIndex() {
  return (
    <div>hi</div>
  )
}
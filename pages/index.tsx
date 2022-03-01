import type { NextPage } from 'next'
import { PrismaClient, Flipnote } from "@prisma/client"

type HomePageProps = {
  flipnotes: Flipnote[];
}

const Home: NextPage<HomePageProps> = ({ flipnotes }) => {
  console.log(flipnotes);
  return <div>Hello next.js!</div>;
};

export const getServerSideProps = async () => {
  const db = new PrismaClient()
  const flipnotes = await db.flipnote.findMany()

  return {
    props: { flipnotes }
  }
}

export default Home
